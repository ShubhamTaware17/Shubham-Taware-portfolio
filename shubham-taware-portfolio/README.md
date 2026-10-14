# Shubham Taware · Portfolio

A premium, responsive portfolio for Shubham Taware, Frontend Developer. It is built with React 19, Vite, Framer Motion and Three.js, with plain modern CSS.

Everything personal lives in a few data files. Anything you have not provided yet is written as a `[bracketed placeholder]`, which the site highlights in amber so nothing unfinished goes live by accident.

## Quick start

```bash
npm install
npm run dev        # local development server
npm run check      # lint + production build (run this before deploying)
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

Requirements: Node.js `^20.19.0 || >=22.12.0` (required by Vite 8).

## Filling in the content

| What | Where |
| --- | --- |
| Name, role, hero copy, About bio and stats, contact copy, social links | `src/config/site.js` |
| Featured projects (titles, summaries, stack, live and GitHub URLs) | `src/data/projects.js` |
| Work history and education | `src/data/experience.js` |
| Technologies shown in Skills, grouped by category | `src/data/skills.js` |

Replace every `[placeholder]`. The data files are the main source: `grep -rn "\[" src/config src/data` lists them. Two more labels live in components and need real content too: `[Add portrait photo]` in `src/components/About.jsx` and the `[Screenshot]` label in `src/components/ProjectCard.jsx`. Project screenshots are not yet supported as images, so replace that label with a real preview when you have one.

### Links and the contact form

Copy `.env.example` to `.env.local` (git-ignored) and set what you have:

| Variable | Effect |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | Where the contact form POSTs its JSON. Leave empty and the form explains that messages cannot be sent yet, with no fake success. |
| `VITE_CONTACT_EMAIL` | Shown in the contact details and used for the mailto link. |
| `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL` | Footer social links. Until set, they show a dashed "not set up yet" state. |

Project buttons become live links only when `liveUrl` or `githubUrl` is a full `https://` URL. Until then they appear disabled.

Environment variables are read at build time, so rebuild after changing them.

### Contact form payload

The form sends `POST` with `Content-Type: application/json` and `Accept: application/json`. The body contains:

```json
{ "name": "...", "email": "...", "message": "...", "_subject": "Portfolio message from ..." }
```

This works with Formspree and Web3Forms, or with your own API. A hidden honeypot field named `website` catches bots. When it is filled in, the form reports success without sending anything.

## Sections and their animation concepts

| Section | Concept |
| --- | --- |
| Home | Lazy-loaded Three.js object that leans toward the pointer, a letter-by-letter name reveal, an outlined surname that fills on hover, a typed eyebrow, a sweeping role gradient, and a cursor spotlight |
| About | Portrait clip reveal and a bio whose words fill in as you scroll |
| Skills | Two-ring orbit of technology icons that pauses on hover or focus, plus magnetic tiles with a pointer spotlight |
| Projects | 3D tilt cards with a light that follows the pointer, a drifting grid on hover, and a featured layout |
| Experience | Timeline line drawn by scroll position, with entries that slide in |
| Contact | Drifting colour fields and grid, a form with floating labels, shake on invalid fields, a spinner while sending, and an animated success check |
| Footer | Scrolling ticker and magnetic social links |

## Accessibility

- Semantic landmarks, one `h1`, and a skip link as the first tab stop.
- Every control is reachable by keyboard, with a visible focus ring.
- The mobile menu keeps focus inside while it is open: Tab cycles through its links and the toggle, Escape closes it and returns focus to the toggle, and page scroll is locked until it closes.
- Form errors are tied to their fields with `aria-invalid` and `aria-describedby`, and the first invalid field receives focus on submit.
- Reduced motion is respected: CSS animations are shortened, Framer Motion disables transform animations (`MotionConfig reducedMotion="user"`), the 3D object renders one still frame, and the cursor glow is removed.
- Text contrast meets WCAG AA. The scroll-linked bio fades colour rather than opacity, to keep unread text readable.

## Performance

- Three.js is code-split into its own chunk and loaded only for the hero. It runs only while the hero is near the viewport, its pixel ratio is capped, and its resources are disposed on unmount.
- A device without WebGL gets a CSS fallback.
- No images, videos, or 3D model files are shipped. The visuals are generated in code.
- Google Fonts are the only external request, and `display=swap` keeps text visible while they load.

## Project structure

```
src/
  components/   One file per section, plus shared pieces (Navbar, Magnetic, SectionHeading ...)
  config/       site.js: personal content, socials, helpers
  data/         projects, experience, skills
  hooks/        useMediaQuery
  styles/       global.css (tokens, base, nav, footer) and sections.css
  utils/        contact validation and submission, placeholders, WebGL detection, motion tokens
```

## Deployment

The output of `npm run build` is a static site in `dist/`. Deploy it to any static host, such as Netlify, Vercel, Cloudflare Pages or GitHub Pages. Set the `VITE_*` variables in the host's build settings.
