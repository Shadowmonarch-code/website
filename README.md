# Toufik Mahata — Portfolio Website

A single-page, animation-driven portfolio for **Toufik Mahata** — B.Tech Biotechnology & Bioinformatics student at CBSH, Dr. Rajendra Prasad Central Agricultural University (RPCAU), and creator of **Bong Coder**.

**Live site:** (https://toufikmahata-xi.vercel.app/)

---

## Features

- **Hero** — animated preloader, typing effect, custom cursor, magnetic buttons
- **About** — profile summary and quick stats
- **Academic Journey** — a vertical timeline of education milestones
- **Achievements** — a card grid of awards, research, and projects
- **Gallery** — live Pinterest feed (pulled via RSS, with a fallback if it fails to load)
- **Contact / Footer** — social links and a CV download
- **Download CV** — buttons in the nav, hero, and footer, all pointing to one PDF
- Scroll-triggered reveals (AOS + GSAP ScrollTrigger), a sticky navbar, scroll-spy active-link highlighting, and a working slide-in mobile menu

## Tech Stack

| Layer      | Tools |
|------------|-------|
| Structure  | HTML5 |
| Styling    | CSS3 (custom properties, CSS Grid/Columns, no framework) |
| Behavior   | Vanilla JavaScript |
| Animation  | [GSAP](https://gsap.com/) + ScrollTrigger, [AOS](https://michalsnik.github.io/aos/) |
| Icons      | [Font Awesome 6](https://fontawesome.com/) |
| Fonts      | Syncopate (display), Space Grotesk (body) — via Google Fonts |
| Gallery    | Pinterest RSS feed, converted to JSON via [rss2json](https://rss2json.com/) |

No build step, no dependencies to install — it's plain static HTML/CSS/JS.

## Project Structure

```
website/
├── index.html      # All page markup and section content
├── style.css       # All styling (theme tokens live at the top as CSS variables)
├── script.js       # All behavior (animations, nav, mobile menu, Pinterest feed)
└── assets/
    └── Toufik_Mahata_CV.pdf   # Downloadable resume — see "Updating your CV" below
```

## Running Locally

No build tools required. Either:

- Open `index.html` directly in a browser, **or**
- Serve it locally so relative paths and the Pinterest fetch behave exactly like production:

```bash
cd website
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

The site is static, so any static host works (the live version is on Netlify). To deploy on Netlify:

1. Push this repo to GitHub.
2. In Netlify, **New site from Git** → select the repo.
3. Build command: *(leave blank)* — Publish directory: `/` (repo root).

GitHub Pages, Vercel, or Cloudflare Pages work the same way — no build step needed.

## Customizing Content

### Updating your CV
Export your resume as a PDF, name it **exactly** `Toufik_Mahata_CV.pdf`, and replace the file at `assets/Toufik_Mahata_CV.pdf`. All three download buttons already point to that path — no code changes needed.

### Editing the Academic Journey
In `index.html`, find `<section id="academics">`. Each milestone is a `.timeline-item` block:

```html
<div class="timeline-item" data-aos="fade-right">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <span class="timeline-year">2024 — Present</span>
        <h3>Degree / Class</h3>
        <h4>Institution Name</h4>
        <p>Short description.</p>
    </div>
</div>
```

Two entries are marked with an extra `placeholder` class (dashed border) for Class X and Class XII — fill in the real school name, board, and year, then remove `placeholder` from the class list.

### Editing Achievements
In `index.html`, find `<section id="achievements">`. Each card is an `.achievement-card` block — copy one, change the `<i>` icon (any [Font Awesome 6](https://fontawesome.com/search) class), title, and description. A blank `placeholder-card` template is included at the end of the grid for adding new entries.

### Theme colors
All colors are CSS variables at the top of `style.css`:

```css
:root {
    --bg: #050801;        /* background */
    --primary: #00ff41;   /* neon green accent */
    --accent: #d4af37;    /* gold accent */
    --text-white: #e0e0e0;
    --glass: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.1);
}
```

Changing these updates the whole site, since every component references the variables rather than hard-coded colors.

## Connect

- YouTube — [Bong Coder](https://youtube.com/@bongcoder_07)
- GitHub — [Shadowmonarch-code](https://github.com/Shadowmonarch-code)
- LinkedIn — [Toufik Mahata](https://www.linkedin.com/in/toufik-mahata-549376214/)
- Pinterest — [toufikmahata20](https://in.pinterest.com/toufikmahata20/)
