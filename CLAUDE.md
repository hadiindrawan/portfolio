# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional portfolio for Hadi Indrawan (Lead QA Engineer & Full-stack Software Engineer). Responsive single-page app with PWA capabilities.

**Tech Stack**: HTML5 + CSS3 (Tailwind CDN + custom) + Vanilla JavaScript (ES6 modules)
**No build system** — files served directly via a static server (Live Server / `python3 -m http.server`).

### Design System — "Cohere"

The site follows a Cohere-inspired system (see the source `DESIGN.md` the redesign was based on): white editorial canvas, deep-green (`#003c33`) and near-black (`#17171c`) bands, tight display headlines, mono uppercase labels, coral (`#ff7759`) taxonomy accents, flat depth with hairline (`#d9d9dd`) borders, rounded media cards.

- **Fonts**: `Space Grotesk` (display), `Inter` (body/UI), `Space Mono` (mono labels) — loaded via Google Fonts.
- **Colors**: defined twice and kept in sync — as Tailwind theme colors in `index.html` (the `tailwind.config` `<script>`) and as CSS variables in `style/app.css` `:root`. Legacy aliases (`cream`, `charcoal`, `soft-brown`, etc.) are remapped to Cohere values so older JS class references keep working.

## Architecture

### File Structure

```
portfolio/
├── index.html              # Main HTML (layout, structure, metadata)
├── manifest.json           # PWA configuration
├── sw.js                   # Service Worker (offline support, caching)
├── js/
│   ├── app.js             # Main entry point, orchestrates modules
│   ├── data/
│   │   └── portfolio-data.js    # Centralized content (all text, projects, skills, etc.)
│   └── modules/           # Functional modules (each handles one concern)
│       ├── navigation.js         # Desktop/mobile nav toggle, scroll-spy
│       ├── scroll-reveal.js      # (legacy helper; app.js uses its own IntersectionObserver on .reveal)
│       ├── data-renderer.js      # Renders data from portfolio-data.js into DOM
│       ├── image-optimizer.js    # Lazy loading, performance
│       ├── project-modal.js      # Project detail modal
│       ├── typing-effect.js      # (unused — no longer imported)
│       ├── carousel.js           # (unused — projects are now a static grid)
│       └── image-modal.js        # (unused)
├── style/
│   └── app.css            # Cohere design tokens, component styles, animations
└── asset/                 # Images, tool logos

```

> `app.js` imports only: `navigation`, `scroll-reveal`, `data-renderer`, `image-optimizer`, `project-modal`. The other module files remain on disk but are not wired in.

### Data Architecture

**Single source of truth**: `js/data/portfolio-data.js`

Exports `portfolioData` with these keys (each has a matching `render*` method in `data-renderer.js`, called from `app.js` → `renderContent()`):
- `personal` — name, roles, email, phone, website, resume link
- `stats` — hero metric tiles
- `navigation` — menu items
- `social` — LinkedIn, GitHub, Instagram, WhatsApp, Email
- `companies` — trust/logo strip names
- `about` — lead line, body paragraphs (`**bold**` supported via `emphasize()`), highlights
- `experience` — work timeline (expandable `<details>` rows)
- `skills` — capability cards; `icon` is a **key** into `data-renderer.getCapabilityIcon()` (inline SVG line icons, not image files)
- `projects` — product-card grid + modal (title, role, description, tech, image, status)
- `tools` — logo grid (uses PNGs in `asset/`)
- `stackList` — mono chip row of technologies
- `writing` / `speaking` / `libraries` / `education` — rule-separated list rows
- `languages`

**Content updates** → Edit only `portfolio-data.js`; `data-renderer.js` renders it. No image files needed for skill icons — they're inline SVGs keyed by `skill.icon`.
**Add a new section** → add data + a `render*` method, a call in `app.js`, and a container element in `index.html`.

### Module Responsibilities

| Module | Purpose |
|--------|---------|
| `navigation.js` | Mobile menu toggle, smooth scroll, scroll-spy active-nav (uses `text-deep-green`/`active`) |
| `data-renderer.js` | All DOM injection from `portfolioData`; owns inline SVG icon sets (`getCapabilityIcon`, `getSocialIcon`) |
| `project-modal.js` | Project detail modal; triggered by clicks on `[data-project-index]`, animates `.rounded-card` |
| `image-optimizer.js` | Lazy image loading |
| `scroll-reveal.js` | Legacy helper (not the reveal path in use) |

**Reveal animations**: `app.js` `initReveal()` runs its own `IntersectionObserver` over `.reveal` elements, adding `.active`. Any element needing a fade-in-on-scroll just needs the `reveal` class.

## Development

### Running

Live Server (port 5501):
```bash
# VS Code: Open index.html, right-click → "Open with Live Server"
# Or terminal: npx live-server --port=5501
```

Server required for:
- Service Worker registration (sw.js)
- Module imports (ES6)
- Local testing

### Editing Content

**Update hero text, skills, projects, tools** → Edit `js/data/portfolio-data.js`  
**Re-render happens automatically** → Changes visible on refresh (no build step)

### Styling

**Color system (Cohere)** — keep both definitions in sync:
- Tailwind theme colors in the `index.html` `tailwind.config` `<script>` (e.g. `canvas`, `ink`, `primary`, `deep-green`, `stone`, `coral`, `action-blue`, `hairline`, plus legacy aliases).
- CSS variables in `style/app.css` `:root` (same values), used by component styles.

**Custom CSS** in `style/app.css`: design tokens, component classes (`.skill-card`, `.project-card`, `.exp-row`, `.list-row`, `.stack-chip`, `.chip-coral`, `.tech-pill`, `.company-mark`, `.social-link`, `.agent-console`), `.reveal`/`.reveal.active`, `fadeInUp`, scrollbar + `prefers-reduced-motion`.

### Adding Features

1. **New section**:
   - Add data to `portfolio-data.js`
   - Add a `render*` method in `data-renderer.js`
   - Call it in `app.js` → `renderContent()`
   - Add a container element (with the matching `id`) in `index.html`; add `reveal` to anything that should fade in on scroll

2. **New capability icon**: add an SVG entry to `getCapabilityIcon()` in `data-renderer.js` and reference its key via `skill.icon` — no image file needed.

3. **New animation**: add `@keyframes` to `style/app.css`.

## Key Decisions

- **No build step** → Simplicity, fast iteration, PWA-friendly
- **Vanilla JS + ES6 modules** → No framework overhead, explicit control
- **Data-driven** → All content in one file, easy updates
- **PWA via Service Worker** → Offline support, installable (manifest.json)
- **Tailwind CDN** → Fast prototyping, no local build
- **Lazy reveal animations** → Performance (triggers on scroll)

## Performance Notes

- Images use native `loading="lazy"` plus `ImageOptimizer`
- Reveal animations are IntersectionObserver-driven and `unobserve` after firing (see `app.js` `initReveal()`)
- Service Worker caches static assets — **bump `CACHE_NAME` in `sw.js`** when shipping so returning visitors get fresh content, and keep `PRECACHE_ASSETS` aligned with the imported modules
- `prefers-reduced-motion` disables animations

## Testing the PWA

1. Open DevTools → Application tab
2. Check manifest.json loads (Manifest section)
3. Check Service Worker registers (Service Workers section)
4. Offline mode: DevTools → Network → Offline, reload
5. Should see cached content

## Common Tasks

| Task | Where |
|------|-------|
| Change name/roles/email/website | `personal` in `js/data/portfolio-data.js` |
| Add/remove/edit work experience | `experience` array |
| Add/remove capabilities | `skills` array (`icon` = key in `getCapabilityIcon()`) |
| Update projects | `projects` array |
| Edit articles / talks / libraries / education | `writing` / `speaking` / `libraries` / `education` arrays |
| Change colors | `index.html` `tailwind.config` **and** `style/app.css` `:root` (keep in sync) |
| Add social link | `social` array (icon key must exist in `getSocialIcon()`) |
| Edit hero headline | `index.html` `<h1>` in `#home` (static markup) |
| Update nav links | `navigation` array |
| Change résumé link | `personal.resumeUrl` |
| Ship a content/style change | bump `CACHE_NAME` in `sw.js` |

## Deployment

- GitHub Pages: Push to `main` branch, enable Pages in repo settings
- Netlify/Vercel: Connect repo, auto-deploy on push
- Any static host: Upload all files as-is (no build required)

Ensure `manifest.json` path is `/manifest.json` and `sw.js` is at root for PWA to work correctly.
