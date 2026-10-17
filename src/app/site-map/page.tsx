import type { Metadata } from "next";
import Link from "next/link";
import { members, news, people } from "@/lib/content";
import { staticRoutes } from "@/lib/routes";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Sitemap" };

const groups: [string, { href: string; label: string }[]][] = [
  ["Pages", staticRoutes.map((r) => ({ href: r.path, label: r.label }))],
  ["Leadership profiles", people.map((p) => ({ href: `/leadership/${p.slug}`, label: p.name }))],
  ["News and events", news.map((n) => ({ href: `/news/${n.slug}`, label: n.title }))],
  ["Members", members.map((m) => ({ href: `/membership/directory/${m.slug}`, label: m.name }))],
];

export default function SiteMapPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Sitemap" }]} title="Sitemap" intro="Every page on this website." />
      <section className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        {groups.map(([title, links]) => (
          <div key={title}>
            <h2 className="font-display text-xl font-semibold text-forest-900">{title}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted hover:text-forest-700 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
