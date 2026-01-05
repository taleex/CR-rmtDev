# RmtDev — Remote Developer Jobs (React + TypeScript + Vite)

## Project Overview

RmtDev is a small, modern React application bootstrapped with Vite and TypeScript. It provides a searchable, sortable list of developer job postings with bookmarking, pagination, and persistent client-side state. The UI is component-driven and designed for responsiveness and accessibility.

This repository is an exercise from the Professional React and Next.js Course by bytegrad; the app structure and lessons were derived from the course materials.

## Demo

- Local development: run the app locally (instructions below).

## Key Features

- Job search with live filtering
- Bookmarks: save and view favorite jobs
- Job list sorting and pagination controls
- Responsive layout with accessible controls
- Persistent bookmarks and some state in `localStorage`
- Clean component structure for learning and extension

## What This Project Teaches

- Building React apps with Vite and TypeScript
- Managing state with React Context (multiple providers)
- Component-driven UI design (reusable components)
- Patterns for search, pagination, and bookmarks
- Small utility libraries and TypeScript types

## Project Structure (high level)

- `src/` — application source code
   - `components/` — UI components (Header, Footer, JobList, JobListItem, BookmarksPopover, SearchForm, PaginationControls, etc.)
   - `contexts/` — React Context providers (Bookmarks, JobItems, ActiveId, SearchText)
   - `lib/` — project utilities, constants, hooks, and types
   - `main.tsx` — app entry and provider wiring

Use these files to explore behavior and learn how features are implemented.

## Technologies Used

- React 18+ with TypeScript
- Vite (fast dev server + build)
- Plain CSS (component-based styles) and modern CSS layout
- React Context API for application state

Note: The project intentionally uses small, focused libraries and React primitives for educational clarity rather than heavy third-party state managers.

## Getting Started

Requirements:

- Node.js (LTS recommended) and npm

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser to http://localhost:5173 (or the address printed by Vite).

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

These are the common npm scripts you can expect in a Vite + React TypeScript project. Check `package.json` for exact scripts configured in this repository:

- `dev` — start development server (Vite)
- `build` — produce production build
- `preview` — locally preview built production assets
- `lint` — run linters (if configured)

## Development Notes

- State Providers: The app uses several context providers to separate concerns:
   - `BookmarksContextProvider` — manages bookmarked job IDs and persistence
   - `JobItemsContextProvider` — supplies job data and list operations
   - `SearchTextContextProvider` — centralizes search text state
   - `ActiveIdContextProvider` — manages the currently active/expanded job item

- Components are intentionally lightweight and composable. Look in `src/components/` for patterns like `JobList`, `JobListItem`, `BookmarksPopover`, and `SearchForm`.

- Utilities: `src/lib/` contains shared helpers, constants, types, and hooks used across the app. These are good places to add small features or TypeScript refinements.

## Testing

This template does not include tests by default. If you want to add tests, consider using Jest with React Testing Library or Vitest to test components and hooks.

## Contributing

- Feel free to open a PR with improvements, bug fixes, or new features.
- Suggested small enhancements: add unit tests, add e2e tests, improve accessibility, or add theme support.

## Credits & Attribution

- Course: Professional React and Next.js Course by bytegrad — this repository is an exercise derived from the course materials.
- Author / Student: Project files in this workspace are from the course exercises.

If you are using this project as part of the course, please follow bytegrad's guidelines for sharing or publishing course code.

## License

This repository is for educational purposes. Follow the course / bytegrad guidance for licensing and redistribution. If you intend to publish or reuse this code beyond personal learning, check with the course terms or contact the course authors for permission.

---

If you'd like, I can also:

- commit these README changes for you
- add a short demo GIF or screenshots to the README
- generate a CONTRIBUTING.md and CODE_OF_CONDUCT

Which next step would you like? 
