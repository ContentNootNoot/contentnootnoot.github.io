// ===== EDIT YOUR CONTENT HERE =====
// Everything the site shows comes from this object. No HTML needed.
window.CONTENT = {
  name: 'Ryan Li',
  initials: 'RL',
  logo: 'images/test.png',   // header pict. (optional), e.g. 'images/me.jpg'. Leave ''for initials.
  role: 'Electrical Engineering undergraduate from UBC',
  tagline: 'Hi, I’m',
  about: 'My name is Ryan, and I am a recent graduate from UBC, with a bachelor\'s degree in electrical engineering. My passion is in software and electronics. I have experience with various programming languages, lab equipment, as well as CAD software. In the future, I aspire to work in the power electronics or transportation industry, aiming to make it more sustainable for the future.',
  interests: 'As for myself outside of academics and career aspects, I enjoy hardware and electronics tinkering, photography, 3D modelling, 3D printing, and of course video games.',
  email: 'lryan0954@gmail.com',
  contactBlurb: 'Open to new projects and conversations. The quickest way to reach me is email.',
  socials: [
    { label: 'GitHub',    url: 'https://github.com/ContentNootNoot' },
    { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/ryanduduli' }
  ],

  // Projects. Each one gets its own page when clicked.
  // slug: short unique id. sort of like discord discriminator . desc: one line shown in the list.
  // year order: New -> Old
  // status: 'in-progress' moves it to an "In progress" group at the top. DELETE WHEN DONE
  // image: a file path like 'images/my-project.jpg'. Using '' shows a placeholder.
  // details: the full write-up. Blank line = new paragraph, "## " = subheading, **bold**, *italic*,
  //   [link text](https://example.com), and ![caption](images/pic.jpg) on its own line = a picture.
  // links: buttons on the project page; entries with an empty url are skipped.
  projects: [
    {
      slug: 'macropad',
      year: 2026,
      status: 'in-progress',
      title: 'MacroPad',
      desc: 'Using a Raspberry Pi Pico for USB HID and KiCAD for designing a PCB for it.',
      tags: ['KiCAD', 'MicroPython', 'Raspberry Pi'],
      image: '',
      details: `Describe the project here: what you built, why, and what you learned.

## What? Why?

I was using my computer one day, and realized: I don't have enough buttons on my mouse for my macros. Plus, it would look cool on my desk.
Becides that, I also thought it would be a nice intro to PCB design and introduction to a new microcontroller. I'll update this page as the 
project progresses. This will be blogged too.
`,
      links: [
        { label: 'View live', url: '' },
        { label: 'Source code', url: '' }
      ]
    },

    {
      slug: 'ebike',
      year: 2026,
      status: 'in-progress',
      title: 'DIY Ebike',
      desc: 'Parting out an old ebike and rebuilding it with new features!',
      tags: ['Power Electronics'],
      image: '',
      details: 
      `I've always wanted a fancy ebike, but I've found none with the features I want. I figured, might as well build it myself.
      I'll update this page as the project progresses. I'll also blog about it too when I have time.

      `,
      links: [
        { label: 'Project Report', url: '' },
        { label: 'Source code', url: '' }
      ]
    },

    {
      slug: 'MEMS_CATA',
      year: 2026,
      title: 'MEMS In-plane catapult',
      desc: 'Using KLayout to design a catapult to fling micrometer scale projectiles. Very wise use of university resouces.',
      tags: ['KLayout', 'MEMS'],
      image: '',
      details: `We wanted to have some fun in our MEMS course, so we made an in-plane catapult! The design was slowly refined over the time of the course, 
      going from barely functional, to flinging things out of view of the microscope. We used KLayout to design the masks. Wafers were done using the UBC 
      in house specifications. `,
      links: [
        { label: 'Project Report', url: '' },
        { label: 'Source code', url: '' }
      ]
    },

    {
      slug: 'CMOS_ADC',
      year: 2026,
      title: 'CMOS Flash ADC',
      desc: 'Designing a Flash ADC, which turns analog signals into a crisp digital one using Cadence Virtuoso + ADE L',
      tags: ['Cadence Virtuoso', 'Analog Circuits'],
      image: '',
      details: `Using Cadence Virtuoso + ADE L, I along with my friend, designed a Flash ADC that takes a sinusoidal waveform 
      and spits out a crisp digital signal. We initially had some issues, but after adjusting parameters of transistors, and 
      changing some of the design, we achieved our goals. `,
      links: [
        { label: 'Project Report', url: 'https://drive.google.com/file/d/1xkDii8u37cWtjhK7TEXH03CSLI4R7-xZ/view' },
        { label: 'Source code', url: '' }
      ]
    },

    {
      slug: 'capstone',
      year: 2025,
      title: 'Capstone Project',
      desc: 'Using Arduinos, a RP4, microscope and some electronics, we can monitor the water quality!',
      tags: ['Python', 'Arduino', 'Raspberry Pi'],
      image: '',
      details: `In this project, we are doing automated data collection for use with water monitoring. 
      An Arduino controls the logic, while a Raspberry Pi collects the data and processes it.`,
      links: [
        { label: 'View live', url: '' },
        { label: 'Source code', url: '' }
      ]
    },

    {
      slug: 'oldsolarsite',
      year: 2024,
      title: 'Ogopogo Solar Website',
      desc: 'Using HTML/CSS, and a sprinkle of JS, a website was made.',
      tags: ['HTML/CSS', 'JS'],
      image: '',
      details: `For this website, I wanted to stay away from a website maker, and create from scratch for 
      learning purposes, as well as to keep the website snappy. The website uses HTML/CSS, with minimal JS. 
      It is no longer used, and has been replaced with a fancier website.`,
      links: [
        { label: 'View live', url: '' },
        { label: 'Source code', url: '' }
      ]
    },

    {
      slug: 'fback_converter',
      year: 2024,
      title: 'Flyback Converter',
      desc: 'Designing a charger using Altair PSIM',
      tags: ['Altair PSIM', 'Power Electronics'],
      image: '',
      details: `In my power electronics class, we learned all about different power converters such as buck converters, boost converter, buck-boost, and flyback converters. We applied knowledge we learned and desgined a 120-240V to 20V flyback converter, designed in PSIM. 
`,
      links: [
        { label: 'Project Report', url: 'https://drive.google.com/file/d/1ITnQe7un-q_MctqGkhN65ine6QOttOPi/view' }
      ]
    },

    {
      slug: 'flightg24',
      year: 2023,
      title: 'FlightGuessr24',
      desc: 'A Geoguessr like game, but with planes! Using JS, HTML/CSS, and Python for the logic!',
      tags: ['Python', 'HTML/CSS', 'JS'],
      image: '',
      details: `In this personal project, we spin Flightradar24 (flight tracking service) into a geoguessr like game. 
      This game is programmed in Python, with front-end in HTML/CSS. I'll probably update it in the future when I have time
      and polish it up.`,
      links: [
        { label: 'View live', url: '' },
        { label: 'Source code', url: '' }
      ]
    },
    
    {
      slug: 'discord_chatbot',
      year: 2022,
      title: 'Discord Chatbot',
      desc: 'Making the group chat funnier while away, with GPT-3 and some terrible prompts.',
      tags: ['Python', 'ChatGPT API'],
      image: '',
      details: `In this project, I wanted to have some fun pranking some friends using discord.py, and OpenAI's GPT3's API.  
      A flask web server is also set up to keep the webhost running.`,
      links: [
        { label: 'View live', url: '' },
        { label: 'Source code', url: '' }
      ]
    },

    {
      slug: 'lego_solidworks',
      year: 2021,
      title: 'APSC 171 Project',
      desc: 'LEGOs in SOLIDWORKS',
      tags: ['SOLIDWORKS','CAD'],
      image: '',
      details: `In this project, we used various features within SOLIDWORKS to create a LEGO excavator. 
      `,
      links: [
        { label: 'View live', url: '' },
        { label: 'Source code', url: '' }
      ]
    }
  ],
  // Blog posts. To add one, copy a block and change it. Newest date shows first.
  // slug: unique id/tag. date: YYYY-MM-DD.
  // tags: a list like ['Design', 'Notes']. turns into buttons automagically.
  // image (optional): a cover picture at the top of the post
  // body: same format as projects. Reminder: blank line = new paragraph, "## " = subheading, **bold**, *italic*,
  //   [link text](https://example.com), and ![caption](images/pic.jpg) on its own line = a picture.
  posts: [
    {
      slug: 'welcome',
      title: 'Welcome to my new portfolio + blog',
      date: '2026-11-02',
      tags: ['Site', '2026'],
      summary: 'New portfolio, new blog!',
      body: ` ## Hello!

      I've decided to create a new portfolio mainly because I was unhappy with the limitations of Google sites. With this new site, I can 
      also add in blogs, which I can use to document my various projects. I wanted a way to hold myself accountable for the 
      progress (or lack thereof) on my projects, and a blog seemed perfect for that. Currently, the projects paragraphs are a bit bare 
      right now, images may be missing, but I'll add it in whenever I have the time to. If you're here from the previous website, and 
      something big is missing, please let me know. 

      Some of you may have also noticed that the visual style of this site is reminiscent of the Holo design language used in Android ice 
      cream sandwich. I thought it would be neat, fun and I hate to say, nostalgic. 

      Anyways, if the site is in light mode and melting your eyes, press the theme button on the top right, and set it to your prefrences
      accordingly. 

      I'll try to keep posting on here regularly, maybe once every week, maybe once every two weeks. 

      PS: If you want to see the old old site, [it is still here.](old_index.html) It opens in a new tab. 
      `
    }
  ],
};
