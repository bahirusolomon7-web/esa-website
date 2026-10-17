// Public base URL. SITE_URL wins; on Vercel, fall back to the project's production domain.
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// While the site is an unapproved prototype, keep it out of search engines.
// Set ALLOW_INDEXING=true once ESA approves launch.
export const allowIndexing = process.env.ALLOW_INDEXING === "true";
