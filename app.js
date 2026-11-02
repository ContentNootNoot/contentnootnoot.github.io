// app.js: builds the pages from content.js and handles tab navigation.
(function () {
  var C = window.CONTENT;
  var esc = function (s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; };
  var head = function (t) { return '<h2>' + esc(t) + '</h2>'; };

  // ----- Blog helpers -----
  function fmtDate(d) { return new Date(d + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); }
  function attr(s) { return esc(s).replace(/"/g, '&quot;'); }
  function inline(s) {   // **bold**, *italic*, [link text](https://...)
    return esc(s)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, text, url) {
        if (/^javascript:/i.test(url)) return text;
        return '<a href="' + url.replace(/"/g, '%22') + '" target="_blank" rel="noopener">' + text + '</a>';
      })
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/\*([^*]+)\*/g, '<i>$1</i>');
  }
  function body(t) {   // blank line = paragraph; "## " = subheading; ![caption](images/pic.jpg) alone on a line = picture
    return t.trim().split(/\n\s*\n/).map(function (b) {
      b = b.trim();
      var img = b.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
      if (img) return '<figure class="fig"><img src="' + attr(img[2]) + '" alt="' + attr(img[1]) + '" loading="lazy">' +
                      (img[1] ? '<figcaption>' + esc(img[1]) + '</figcaption>' : '') + '</figure>';
      return b.indexOf('## ') === 0 ? '<h3>' + inline(b.slice(3)) + '</h3>' : '<p>' + inline(b) + '</p>';
    }).join('');
  }
  function tagList(p) {   // accepts ['A','B'] or the older 'A · B' text
    var t = Array.isArray(p.tags) ? p.tags : String(p.tags || '').split(/[·,]/);
    return t.map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function slug(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function renderPost(p) {
    var chips = tagList(p).map(function (t) { return '<a class="chip" href="#tag-' + slug(t) + '">' + esc(t) + '</a>'; }).join('');
    return '<article class="post"><a class="back" href="#blog">‹ All posts</a><h3 class="post-title">' + esc(p.title) +
           '</h3><p class="post-date">' + fmtDate(p.date) + '</p>' + (chips ? '<div class="chips">' + chips + '</div>' : '') + (p.image ? '<img class="cover" src="' + attr(p.image) + '" alt="">' : '') + body(p.body) + '</article>';
  }

  // ----- Project helpers -----
  function tagText(p) { return Array.isArray(p.tags) ? p.tags.join(' · ') : (p.tags || ''); }
  function renderProject(p) {
    var when = p.status === 'in-progress' ? 'In progress' : (p.year || '');
    var chips = tagList(p).map(function (t) { return '<a class="chip" href="#pf-__' + slug(t) + '">' + esc(t) + '</a>'; }).join('');
    var links = (p.links || []).filter(function (l) { return l.url; }).map(function (l) {
      return '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>';
    }).join('');
    return '<article class="post"><a class="back" href="#projects">‹ All projects</a><h3 class="post-title">' + esc(p.title) + '</h3>' +
           (when ? '<p class="post-date">' + esc(String(when)) + '</p>' : '') +
           (chips ? '<div class="chips">' + chips + '</div>' : '') +
           (p.image ? '<img class="cover" src="' + esc(p.image) + '" alt="' + esc(p.title) + '">' : '') +
           body(p.details || p.desc) + (links ? '<div class="btns">' + links + '</div>' : '') + '</article>';
  }

  // ----- SECTIONS: add, remove or reorder tabs here. `blurb` is the Home tile text. -----
  var SECTIONS = [
    { id: 'home', label: 'Home', render: function () {
      var tiles = SECTIONS.filter(function (s) { return s.blurb; }).map(function (s) {
        return '<a class="tile" href="#' + s.id + '"><b>' + esc(s.label) + '</b><span>' + esc(s.blurb) + '</span></a>';
      }).join('');
      return '<div class="home"><p class="hi">' + esc(C.tagline) + '</p><h3>' + esc(C.name) + '</h3>' +
             '<p class="role">' + esc(C.role) + '</p><hr><div class="tiles">' + tiles + '</div></div>';
    } },
    { id: 'about', label: 'About', blurb: 'Who I am', render: function () {
      return '<div class="hero"><div class="avatar" aria-hidden="true">' + esc(C.name.charAt(0)) + '</div><div><h3>' +
             esc(C.name) + '</h3><p>' + esc(C.role) + '</p></div></div>' + head('About me') + '<p>' + esc(C.about) + '</p>' +
             (C.interests ? head('Interests') + '<p>' + esc(C.interests) + '</p>' : '');
    } },
    { id: 'projects', label: 'Projects', blurb: 'Things I’ve built', render: function () {
      function row(p) {
        var thumb = p.image ? '<img class="thumb" src="' + esc(p.image) + '" alt="" loading="lazy">'
                            : '<div class="thumb ph" aria-hidden="true">' + esc(p.title.charAt(0)) + '</div>';
        return '<li data-tags="' + tagList(p).map(slug).join(' ') + '" data-year="' + esc(String(p.year || '')) + '" data-wip="' +
               (p.status === 'in-progress' ? '1' : '') + '"><a class="item with-thumb" href="#project-' + esc(p.slug) + '">' + thumb +
               '<div><b>' + esc(p.title) + '</b><span>' + esc(p.desc) + '</span><div class="meta">' + esc(tagText(p)) + '</div></div></a></li>';
      }
      var wip = C.projects.filter(function (p) { return p.status === 'in-progress'; });
      var years = [], seenY = {};   // every year used, newest first
      C.projects.forEach(function (p) { if (p.year && !seenY[p.year]) { seenY[p.year] = 1; years.push(p.year); } });
      years.sort(function (a, b) { return b - a; });
      var tags = [], seen = {};     // every tag used, in order of first use
      C.projects.forEach(function (p) { tagList(p).forEach(function (t) { if (!seen[slug(t)]) { seen[slug(t)] = 1; tags.push(t); } }); });
      var filters = '<div class="filters"><label>Year<select class="pfilter" id="pf-year"><option value="">All years</option>' +
        (wip.length ? '<option value="wip">In progress</option>' : '') +
        years.map(function (y) { return '<option value="' + esc(String(y)) + '">' + esc(String(y)) + '</option>'; }).join('') + '</select></label>' +
        '<label>Tag<select class="pfilter" id="pf-tag"><option value="">All tags</option>' +
        tags.map(function (t) { return '<option value="' + slug(t) + '">' + esc(t) + '</option>'; }).join('') + '</select></label>' +
        '<a class="clear" id="pf-clear" href="#projects" hidden>Clear</a></div>';
      // Groups: "In progress" first, then one group per year (newest first), then "Other" (no year)
      var groups = [], byYear = {};
      if (wip.length) groups.push(['In progress', wip]);
      C.projects.filter(function (p) { return p.status !== 'in-progress'; }).forEach(function (p) {
        var y = p.year || 'Other'; (byYear[y] = byYear[y] || []).push(p);
      });
      Object.keys(byYear).sort(function (a, b) { return a === 'Other' ? 1 : b === 'Other' ? -1 : b - a; })
        .forEach(function (y) { groups.push([y, byYear[y]]); });
      return head('Projects') + filters + groups.map(function (g) {
        return '<div class="pgroup"><h4 class="group">' + esc(String(g[0])) + '</h4><ul class="list">' + g[1].map(row).join('') + '</ul></div>';
      }).join('') + '<p class="empty" hidden>No projects match.</p>';
    } },
    { id: 'blog', label: 'Blog', blurb: 'Notes and writing', render: function () {
      var posts = (C.posts || []).slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
      var all = [], seen = {};   // every tag, in order of first use; spellings that differ only in case/spacing count once
      posts.forEach(function (p) { tagList(p).forEach(function (t) { if (!seen[slug(t)]) { seen[slug(t)] = 1; all.push(t); } }); });
      var chips = all.length ? '<div class="chips"><a class="chip" href="#blog" data-f="">All</a>' + all.map(function (t) {
        return '<a class="chip" href="#tag-' + slug(t) + '" data-f="' + slug(t) + '">' + esc(t) + '</a>';
      }).join('') + '</div>' : '';
      return head('Blog') + chips + (posts.length ? '<ul class="list" id="postlist">' + posts.map(function (p) {
        var t = tagList(p);
        return '<li data-tags="' + t.map(slug).join(' ') + '"><a class="item" href="#post-' + esc(p.slug) + '"><b>' + esc(p.title) + '</b><span>' + esc(p.summary) +
               '</span><div class="meta">' + fmtDate(p.date) + (t.length ? ' · ' + esc(t.join(' · ')) : '') + '</div></a></li>';
      }).join('') + '</ul><p class="empty" hidden>No posts with this tag.</p>' : '<p>No posts yet.</p>');
    } },
    { id: 'contact', label: 'Contact', blurb: 'Say hello', render: function () {
      return head('Get in touch') + '<p>' + esc(C.contactBlurb) + '</p><div class="btns"><a class="btn primary" href="mailto:' + esc(C.email) +
             '">Email me</a>' + C.socials.slice(0, 2).map(function (s) {
               return '<a class="btn" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>';
             }).join('') + '</div>';
    } }
  ];

  // ----- Build the page -----
  document.title = C.name + ' – Portfolio';
  var logo = document.getElementById('logo');
  if (C.logo) logo.innerHTML = '<img src="' + esc(C.logo) + '" alt="">'; else logo.textContent = C.initials;
  document.getElementById('site-name').textContent = C.name;
  document.getElementById('tabs').innerHTML = SECTIONS.map(function (s) {
    return '<a href="#' + s.id + '" role="tab" data-t="' + s.id + '">' + esc(s.label) + '</a>';
  }).join('');
  document.getElementById('main').innerHTML = SECTIONS.map(function (s) {
    return '<section id="' + s.id + '">' + s.render() + '</section>';
  }).join('') + '<section id="post"></section><section id="project"></section>';
  document.getElementById('footer').innerHTML = '<nav class="socials" aria-label="Social links">' + C.socials.map(function (s) {
    return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>';
  }).join('') + '</nav><p>© ' + new Date().getFullYear() + ' ' + esc(C.name) + '</p>';

  // ----- Navigation (#home, #about, ...) -----
  var ids = SECTIONS.map(function (s) { return s.id; });
  function show(keep) {   // keep === true: don't jump back to the top (used by the dropdowns)
    var h = location.hash.replace('#', ''), tab = null, filter = '', pyear = '', ptag = '';
    if (h.indexOf('tag-') === 0) { filter = h.slice(4); h = 'blog'; }   // #tag-design = blog filtered by tag
    if (h.indexOf('pf-') === 0) {   // projects filter: #pf-<year>__<tag>, e.g. #pf-2026__python, #pf-__python, #pf-wip__
      var parts = h.slice(3).split('__'); pyear = parts[0] || ''; ptag = parts[1] || ''; h = 'projects';
    }
    if (h.indexOf('post-') === 0) {   // a blog post: #post-<slug>
      var p = (C.posts || []).filter(function (x) { return 'post-' + x.slug === h; })[0];
      if (p) { document.getElementById('post').innerHTML = renderPost(p); h = 'post'; tab = 'blog'; }
    }
    if (h.indexOf('project-') === 0) {   // a project page: #project-<slug>
      var pr = (C.projects || []).filter(function (x) { return 'project-' + x.slug === h; })[0];
      if (pr) { document.getElementById('project').innerHTML = renderProject(pr); h = 'project'; tab = 'projects'; }
    }
    if (!tab) { if (ids.indexOf(h) < 0) h = ids[0]; tab = h; }
    ids.concat('post', 'project').forEach(function (i) { document.getElementById(i).classList.toggle('on', i === h); });
    document.querySelectorAll('.tabs a').forEach(function (a) { a.setAttribute('aria-selected', a.dataset.t === tab); });

    // Blog tag filter
    var rows = document.querySelectorAll('#postlist li'), shown = 0;
    rows.forEach(function (x) {
      var ok = !filter || (' ' + x.dataset.tags + ' ').indexOf(' ' + filter + ' ') >= 0;
      x.hidden = !ok; if (ok) shown++;
    });
    document.querySelectorAll('#blog .chips a[data-f]').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.f === filter)); });
    var em = document.querySelector('#blog .empty'); if (em) em.hidden = shown > 0;

    // Project filter: year and tag together (groups with no matching projects are hidden)
    var prow = document.querySelectorAll('#projects .pgroup li'), pshown = 0;
    prow.forEach(function (x) {
      var okY = !pyear || (pyear === 'wip' ? x.dataset.wip === '1' : x.dataset.year === pyear);
      var okT = !ptag || (' ' + x.dataset.tags + ' ').indexOf(' ' + ptag + ' ') >= 0;
      x.hidden = !(okY && okT); if (okY && okT) pshown++;
    });
    document.querySelectorAll('#projects .pgroup').forEach(function (g) { g.hidden = !g.querySelector('li:not([hidden])'); });
    var selY = document.getElementById('pf-year'), selT = document.getElementById('pf-tag'), clr = document.getElementById('pf-clear');
    if (selY) selY.value = pyear;
    if (selT) selT.value = ptag;
    if (clr) clr.hidden = !(pyear || ptag);
    var pem = document.querySelector('#projects .empty'); if (pem) pem.hidden = pshown > 0;

    if (keep !== true) window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', show);
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var t = a.getAttribute('href').slice(1);
    if (ids.indexOf(t) >= 0 || /^(post|tag|project|pf)-/.test(t)) { e.preventDefault(); try { history.replaceState(null, '', '#' + t); } catch (x) {} show(); }
  });
  // Project dropdowns: update the link, then re-filter without jumping to the top
  document.addEventListener('change', function (e) {
    if (!e.target.classList.contains('pfilter')) return;
    var y = document.getElementById('pf-year').value, t = document.getElementById('pf-tag').value;
    try { history.replaceState(null, '', (y || t) ? '#pf-' + y + '__' + t : '#projects'); } catch (x) {}
    show(true);
  });
  show();
})();
