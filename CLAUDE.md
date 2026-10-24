# CLAUDE.md

This file is Claude's memory of this project. It is loaded automatically at the
start of every session. **It exists so Claude does not have to read the codebase
to answer questions.**

---

## 1. Working agreement (read this first)

**Do not explore or read project files unless I explicitly ask you to.**

- Default: answer from this file plus your general coding knowledge. No `Read`,
  no `Grep`, no `Glob`, no `find`/`cat`, no search subagents.
- Read files **only** when I say so — e.g. "look at Banner.tsx", "search the
  repo", "check how X is implemented", "read the code first".
- Opening a file to **make an edit I asked for** is fine and always allowed.
  Reading in order to *understand* or *verify* is what needs permission.
- If this file genuinely lacks what you need, **say so and ask** — one line,
  e.g. *"CLAUDE.md doesn't cover the CSS layout rules — want me to read
  App.css?"* Then wait. Do not read first and ask later.
- If I ask a general question (React, TypeScript, CSS, browser APIs, tooling),
  just answer it. Do not tie it back to this repo unless I mention the repo.
- Prefer being briefly wrong and correctable over being slow and thorough.

### Keeping this file true

This file is only useful if it stays accurate. Update it **in the same turn**
as the change, without asking, whenever we:

- add, remove, or rename a file, component, hook, or helper,
- add, remove, or upgrade a dependency, or change a script,
- change routing, state ownership, or the device/viewport behaviour,
- change a convention, or finish / add a roadmap item.

Keep edits surgical — amend the affected lines, don't rewrite the file. Do not
record transient facts (bug-of-the-day, one-off commands); record the shape of
the project. If I tell you something about the project that isn't written here,
add it. If you discover this file is wrong, fix it and tell me.

---

## 2. What this project is

**Banner** — a web app that displays typed text as large as it can possibly fit
on the screen, so it can be read from a distance (holding a phone or laptop up
to be read across a room, at an airport pickup, a crowd, etc.).

The whole point is the **auto-sizing**: as you type, the font size is recomputed
so the message always fills the available area without overflowing.

- Status: learning project, actively developed, `v0.1.0`.
- Repo: `git@github.com:jaychillin2607/banner-app.git`
- Branches: `main` (stable) and `dev` (work). Work lands on `dev`, then merges
  to `main` via PR.
- Deployed on **Netlify**.
- Frontend-only. There is no backend and no database.

---

## 3. Layout

```
banner-app/                      <- repo root, this file lives here
├── CLAUDE.md
└── banner-app-frontend/         <- the entire app; run all npm commands here
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── netlify.toml
    ├── .oxlintrc.json
    ├── tsconfig{,.app,.node}.json
    ├── CHANGELOG.md             <- hand-written, per release
    ├── ToDo.md                  <- roadmap, P0–P3, ✅ marks done
    ├── public/                  favicon.svg, icons.svg
    └── src/
        ├── main.tsx             entry: StrictMode > BrowserRouter > App
        ├── index.css            html/body only (body is black)
        ├── App.css              all app styling (~157 lines, plain CSS)
        ├── components/
        │   ├── App.tsx          Header + Page(Routes)
        │   ├── Header.tsx       logo Link + Navigation
        │   ├── Navigation.tsx   NavLinks: /banner, /about
        │   ├── Page.tsx         <section class="page"> wrapper
        │   ├── Box.tsx          generic <div class="box ..."> wrapper
        │   ├── Banner.tsx       the main feature
        │   └── About.tsx        placeholder content (lorem ipsum)
        ├── hooks/
        │   ├── useKeyboardViewport.ts
        │   └── useDisplayOrientation.ts
        ├── helpers/
        │   ├── bannerHelpers.ts  sizing + viewport DOM helpers
        │   └── common.ts         cleanCSS(...names) -> className string
        ├── configurations/
        │   └── config.ts         DEVICE_TYPE constant
        └── types/
            └── types.ts          DeviceType, DisplayOrientation, PageType
```

`.netlify/` (local Netlify dev Postgres) and `node_modules/` are noise — never
search them.

---

## 4. Stack

| | |
|---|---|
| React | 19 |
| TypeScript | ~6.0 |
| Vite | 8 |
| Router | `react-router` v8 — import from `"react-router"`, **not** `react-router-dom` |
| Lint | **oxlint** (not ESLint) — `.oxlintrc.json` |
| Deploy | Netlify, via `@netlify/vite-plugin` |
| Styling | plain CSS, no framework, no CSS modules |
| Tests | **none** |

Scripts (run in `banner-app-frontend/`):

- `npm run dev` — Vite dev server, port 5173
- `npm run build` — `tsc -b && vite build` → `dist/`
- `npm run lint` — oxlint
- `npm run preview` — serve the build

---

## 5. How it works

### Routing

`main.tsx` wraps `<App/>` in `BrowserRouter`. `App.tsx` renders `Header` then
`Page` containing `Routes`:

- `/banner` → `Banner`
- `/about` → `About`
- `/*` (catch-all, includes `/`) → `Banner`

`netlify.toml` has a `/*` → `/index.html` 200 redirect so a hard refresh on
`/about` doesn't 404. That redirect must stay last in the file.

### Text auto-sizing — the core algorithm

Lives in `helpers/bannerHelpers.ts`:

- `getElementDimensions(selector)` → `[height, width]` in px from
  `getComputedStyle`, minus 10px padding. Returns `null` if the node is missing.
- `getTextSize(text, [H, W])` → the font size in px. It seeds a height-based and
  a width-based estimate, then **binary searches** between them for the largest
  size that still fits, using `isValidHeight` as the predicate.
- `isValidHeight(size, lineLength, textLength, H, W)` tries progressively longer
  line lengths (step 4) and checks the resulting block against `H`/`W`. The
  magic numbers are font-metric approximations: **line height ≈ 1.2 × size**,
  **character width ≈ 0.66 × size**.

`Banner.tsx` holds the state (`bannerInputValue`, `messageFontSize`,
`isBannerInputFocused`) and recomputes the size on every keystroke, and again
whenever the keyboard opens or closes.

### Mobile keyboard / viewport handling

This is the fiddly part of the app, mostly fighting mobile Safari.

- `useKeyboardViewport()` listens to `visualViewport` `resize`/`scroll` and
  reports `{ height, isKeyboardOpen }`. Keyboard is considered open when
  `|window.innerHeight − visualViewport.height| > 100`.
- `resizeBannerOnViewportUpdate()` sets `#app`'s height to the visual viewport
  height while the keyboard is open, `100%` otherwise.
- The real `<input id="banner-input">` is `visually-hidden`; tapping the banner
  focuses it. On SMARTPHONE/TABLET, while focused, it switches to
  `sticky-bottom` so there's a visible input widget above the keyboard.
- `useDisplayOrientation()` derives PORTRAIT/LANDSCAPE from the viewport aspect
  ratio (`width <= 0.76 * height` ⇒ portrait) rather than orientation events,
  because Safari doesn't fire them reliably.
- `removeHeaderInLandscape()` hides `.header` via direct DOM style in landscape
  on smartphones, to reclaim vertical space.

### Device detection

`configurations/config.ts` exports `DEVICE_TYPE`, computed **once at module
load** by sniffing `navigator.userAgent` → `DESKTOP | TABLET | SMARTPHONE`.
Default fallback is `SMARTPHONE`. Because it's a module constant, it never
changes during a session.

---

## 6. Conventions

- **Tabs** for indentation in `.ts`/`.tsx`; double-quoted strings; semicolons.
- One component per file, `function Foo() {}` + `export default Foo`.
- `let` is used freely for locals, including ones never reassigned. That's the
  existing style — match it, don't "fix" it.
- Styling is global CSS classes in `App.css`. Shared utilities:
  `flex-row-center`, `flex-column-center`, `visually-hidden`, `sticky-bottom`.
  Compose class names with `cleanCSS()` from `helpers/common.ts`.
- `Box` is the generic container; pass extra classes via its `className` prop.
- Types go in `types/types.ts`, imported with `import { type X }`.
- DOM is queried directly (`document.querySelector`) in helpers rather than
  through refs. That's deliberate for now.
- `CHANGELOG.md` is maintained by hand under Changed / Added / Removed / Fixed.
  `ToDo.md` is priority-bucketed P0–P3, items marked `✅` when done.

---

## 7. Known issues and roadmap

From `ToDo.md`, open items only:

- **P0** — in landscape on Safari, the navbar sometimes fails to disappear
  (event timing is unreliable).
- **P1** — orientation change on Safari occasionally fires no event at all;
  improve SEO; integrate pre-rendering.
- **P2** — improve navbar styling.
- **P3** — flesh out the About page (still lorem ipsum), add a footer with
  copyright, find a better site icon.

Other things worth knowing:

- `PageType` in `types.ts` is dead code, left over from before react-router.
- There are no tests, so "verify it works" means running `npm run dev` and
  checking in a browser — ideally real iOS Safari, since that's where the
  viewport bugs live.
