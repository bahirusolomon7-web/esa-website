import { members, news, people } from "./content";

export const staticRoutes = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About ESA" },
  { path: "/activities", label: "Activities and programmes" },
  { path: "/leadership", label: "Leadership and governance" },
  { path: "/leadership/structure", label: "Organisational structure" },
  { path: "/leadership/secretariat", label: "Secretariat team" },
  { path: "/membership", label: "Membership" },
  { path: "/membership/directory", label: "Member directory" },
  { path: "/news", label: "News and events" },
  { path: "/publications", label: "Publications and resources" },
  { path: "/publications/seed-data", label: "National seed data" },
  { path: "/contact", label: "Contact" },
  { path: "/privacy", label: "Privacy notice" },
  { path: "/accessibility", label: "Accessibility statement" },
  { path: "/terms", label: "Terms of use" },
  { path: "/site-map", label: "Sitemap" },
];

export const allPaths = [
  ...staticRoutes.map((r) => r.path),
  ...people.map((p) => `/leadership/${p.slug}`),
  ...members.map((m) => `/membership/directory/${m.slug}`),
  ...news.map((n) => `/news/${n.slug}`),
];
