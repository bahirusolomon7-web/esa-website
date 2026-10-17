# Ethiopian Seed Association website (prototype)

Next.js 16 + Tailwind CSS 4 + Recharts build of the sitemap and requirements in
*ESA Phase 1 Requirement Analysis Report v1.0*.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (101 static pages)
```

## Where the content lives

- `src/lib/content.ts` – organisation facts, board, members, news, publications, navigation
- `src/lib/seed-data.ts` – national seed demand/supply/distribution 2014–2024 (from ESA's
  "11 years seed data" spreadsheet; quintals converted to tonnes)
- `public/images` – photos and partner logos from ESA's public website

All facts were taken from ESA's public website and partner sources in October 2026.
Under requirement C1 they still need sign-off in the Source-of-Truth Register before launch.

## Requirement coverage

F1 consistent menu · F2 About · F3 text-based org chart with mobile list view · F4 profiles
(biographies pending consent) · F5 membership · F6 directory with search, 3 filters and
"did you mean" · F7 news/events newest first · F8 publications with type, year, language,
size · F9 contact form with honeypot and confirmation (`/api/contact` is a stub to wire to the
mailbox) · N1 skip link, focus styles, table view for every chart, no zoom lock · N3 no sideways
scroll at 360 px, 44 px targets · N7 per-page titles, `sitemap.xml`, `robots.txt`.

Set `SITE_URL` in production so metadata, sitemap and robots use the real domain.
