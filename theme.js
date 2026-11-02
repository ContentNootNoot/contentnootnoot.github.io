// theme.js: the Theme panel (light/dark mode + accent color). Saved in localStorage.
(function () {
  var root = document.documentElement;
  var panel = document.getElementById('panel'), btn = document.getElementById('theme');
  var swatchBox = document.getElementById('swatches');

  // Edit these: [name, color on dark, color on light]
  var ACCENTS = [
    ['Blue', '#33b5e5', '#0099cc'], ['Purple', '#aa66cc', '#9933cc'],
    ['Green', '#99cc00', '#669900'], ['Orange', '#ffbb33', '#ff8800'], ['Red', '#ff4444', '#cc0000']
  ];
  var DEFAULT = { mode: null, acc: 0, custom: null };
  var st = Object.assign({}, DEFAULT);
  try { st = Object.assign(st, JSON.parse(localStorage.getItem('pf-theme') || '{}')); } catch (e) {}

  function isLight() { return st.mode ? st.mode === 'light' : matchMedia('(prefers-color-scheme:light)').matches; }
  function rgba(h, a) { var n = parseInt(h.slice(1), 16); return 'rgba(' + (n >> 16) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')'; }

  function apply() {
    if (st.mode) root.dataset.theme = st.mode; else delete root.dataset.theme;
    var a = ACCENTS[st.acc] || ACCENTS[0], c = st.custom || a[isLight() ? 2 : 1];
    root.style.setProperty('--blue', c);
    root.style.setProperty('--glow', rgba(c, .25));
    document.querySelectorAll('.sw').forEach(function (s, i) { s.setAttribute('aria-pressed', String(!st.custom && i === st.acc)); });
    document.getElementById('mode').textContent = st.mode === 'light' ? 'Light' : st.mode === 'dark' ? 'Dark' : 'System (follows your device)';
    if (st.custom) document.getElementById('custom').value = st.custom;
    try { localStorage.setItem('pf-theme', JSON.stringify(st)); } catch (e) {}
  }
  function setPanel(open) { panel.hidden = !open; btn.setAttribute('aria-expanded', String(open)); }

  ACCENTS.forEach(function (a, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'sw'; b.style.background = a[1]; b.title = a[0]; b.setAttribute('aria-label', a[0]);
    b.addEventListener('click', function () { st.acc = i; st.custom = null; apply(); });
    swatchBox.appendChild(b);
  });
  document.getElementById('mode').addEventListener('click', function () {   // cycles System > Light > Dark
    st.mode = st.mode === null ? 'light' : st.mode === 'light' ? 'dark' : null; apply();
  });
  document.getElementById('custom').addEventListener('input', function (e) { st.custom = e.target.value; apply(); });
  document.getElementById('reset').addEventListener('click', function () { st = Object.assign({}, DEFAULT); document.getElementById('custom').value = '#33b5e5'; apply(); });
  btn.addEventListener('click', function (e) { e.stopPropagation(); setPanel(panel.hidden); });
  panel.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', function () { setPanel(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setPanel(false); btn.focus(); } });
  // Follow live changes to the system theme (only if the visitor hasn't picked a mode)
  matchMedia('(prefers-color-scheme:light)').addEventListener('change', function () { if (!st.mode) apply(); });
  apply();
})();
