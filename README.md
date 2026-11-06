# Subhrojyoti Sarkar — Portfolio

Personal portfolio built with **React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Router and Lucide**. It is a static single-page app with per-project detail pages and no backend. All content lives in typed data files.

## Quick start

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload           |
| `npm run build`     | Type-check, then build to `dist/`              |
| `npm run preview`   | Serve the production build locally             |
| `npm run lint`      | Run ESLint                                     |
| `npm run typecheck` | Run the TypeScript compiler only               |

## Project structure

```
public/
  favicon.svg          Monogram favicon
  og-image.png         1200×630 social preview image
  resume.pdf           Downloadable resume (replace to update)
src/
  data/                ← all site content (edit these)
    profile.ts         name, intro, email, socials, about text, nav items
    projects.ts        projects, links, detail-page content
    skills.ts          skill categories
    experience.ts      leadership / experience timeline
    education.ts       education + certifications
  types/index.ts       content types every data file must match
  sections/            home-page sections (Hero, About, Projects, …)
  pages/               routes: Home, ProjectDetails, NotFound
  components/          reusable UI (Navbar, Footer, Button, ProjectCard,
                       FlagshipProject, ArchitectureDiagram, Timeline, …)
  hooks/               active-section tracking, scroll handling, page meta
  lib/                 small helpers (class names, motion presets, site constants)
  index.css            design tokens (colours, fonts, type scale)
```

The home page is a single scrolling page made of sections. Each project has its own route at `/projects/:slug`, rendered by one reusable template (`src/pages/ProjectDetails.tsx`).

## Updating content

### Personal information

Edit **`src/data/profile.ts`**: name, headline, intro, education label, location, email, About paragraphs and focus areas.

- **Phone number:** hidden by default. To show it in the Contact section, set `phone: '+91 …'` and `showPhone: true`.
- **Availability line** (under the hero buttons): edit `availability`, or delete it to hide the line.

### GitHub and LinkedIn

In `src/data/profile.ts` → `socials`:

```ts
socials: {
  github: 'https://github.com/SubhrojyotiSarkar',
  linkedin: 'https://www.linkedin.com/in/subhrojyoti-sarkar/',
},
```

Remove a key to hide that icon everywhere (hero, contact, footer).

### Project GitHub and demo links

In **`src/data/projects.ts`**, every project has:

```ts
links: {
  github: 'https://github.com/…',   // undefined → button hidden
  demo: undefined,                  // add a URL → "Live demo" button appears
},
```

Buttons only render when a URL is set, so no placeholder links ship. Current state:

| Project                   | GitHub | Demo |
| ------------------------- | ------ | ---- |
| Hybrid-Search RAG         | ✔      | —    |
| AI Resume Screener        | ✔      | —    |
| SkimLit                   | —      | —    |

### Project detail pages

Each project's `detail` object contains `overview`, `problem`, `features`, `architecture` (`summary` + `diagrams`), `implementation`, `challenges` and `testing`.

- **Empty sections are hidden automatically.** Fill in an empty array and the section and its table-of-contents entry appear.
- Gaps to fill are marked with `// TODO` in `projects.ts` (for example SkimLit's dataset, training setup and evaluation results).
- **Diagrams** are data, too. `stages` is a top-to-bottom list. A stage is either an array with a single node, or a group with several nodes shown side by side:

  ```ts
  stages: [
    [{ id: 'query', label: 'User Query' }],
    { label: 'parallel', nodes: [
      { id: 'bm25', label: 'BM25 Retrieval', detail: 'Sparse · lexical match' },
      { id: 'faiss', label: 'FAISS Retrieval', detail: 'Dense · semantic match' },
    ] },
    [{ id: 'answer', label: 'Final Answer' }],
  ]
  ```

### Adding, removing or reordering projects

Add an object to the `projects` array in `src/data/projects.ts`. The `slug` becomes the URL (`/projects/<slug>`). Order in the array is display order. Exactly one project should have `flagship: true`; it gets the large showcase card on the home page.

### Skills, experience and education

- `src/data/skills.ts`: categories and skills. Category icons are mapped in `src/components/SkillCard.tsx`. Adding a brand-new category also means adding its id to `SkillCategoryId` in `src/types/index.ts`.
- `src/data/experience.ts`: leadership and work entries (most recent first).
- `src/data/education.ts`: education entries and certifications (`credentialUrl` is optional).

TypeScript will flag any missing or misspelled fields.

### Resume

Replace **`public/resume.pdf`** with your latest PDF and keep the file name. The download name shown to visitors is `resumeFileName` in `profile.ts`.

> Note: the current `resume.pdf` includes your phone number. Use a version without it if you'd rather not publish it.

### Design tokens

Colours, fonts and the display type size are defined once in `src/index.css` under `@theme`, for example `--color-accent`. Tailwind utilities such as `text-accent` and `bg-surface` read from these tokens.

## SEO

- Default title, description, Open Graph and Twitter tags, plus theme colour, are set in `index.html`.
- Each route updates the title and description at runtime (`src/hooks/useDocumentMeta.ts`). Project pages use the project summary.
- Social previews need absolute URLs. At build time, `vite.config.ts` turns `og:image` into an absolute URL and adds `og:url`, using:
  1. the `SITE_URL` environment variable, if set (for example `https://subhrojyoti.dev`), otherwise
  2. Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel provides automatically.

  For a custom domain, set `SITE_URL` in Vercel → Project → Settings → Environment Variables.
- To change the preview image, replace `public/og-image.png` (1200×630).

## Deploying to Vercel

1. Push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/SubhrojyotiSarkar/<repo-name>.git
   git push -u origin main
   ```
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects Vite automatically: build command `npm run build`, output directory `dist`. No environment variables are required.
4. Deploy. Later pushes to `main` redeploy automatically.

`vercel.json` rewrites every non-file path to `index.html`, so deep links such as `/projects/skimlit` work on refresh. It also sets long-lived caching for hashed assets.

## Accessibility and motion

- Semantic landmarks, a skip link, labelled navigation, visible focus rings and keyboard-operable menus (Escape closes the mobile menu).
- Architecture diagrams have a screen-reader text equivalent.
- Animations respect `prefers-reduced-motion`, both through Framer Motion's `MotionConfig` and in CSS.

## Connecting a backend later

UI components read content only from `src/data/*`, through the types in `src/types/index.ts`. A FastAPI service that returns JSON in the same shapes can replace a data import with a fetch, without changing component markup.
