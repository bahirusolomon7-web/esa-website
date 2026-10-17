import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { org } from "@/lib/content";

const cols = [
  {
    title: "Association",
    links: [
      { href: "/about", label: "About ESA" },
      { href: "/activities", label: "Activities and programmes" },
      { href: "/leadership", label: "Leadership" },
      { href: "/leadership/structure", label: "Organisational structure" },
    ],
  },
  {
    title: "Members",
    links: [
      { href: "/membership", label: "How to join" },
      { href: "/membership/directory", label: "Find a member" },
      { href: "/news", label: "News and events" },
      { href: "/publications", label: "Publications" },
    ],
  },
  {
    title: "Site",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy notice" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/terms", label: "Terms of use" },
      { href: "/site-map", label: "Sitemap" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream/80">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-3">
            <Image src="/images/esa-logo.png" alt="Ethiopian Seed Association" width={120} height={80} className="h-14 w-auto" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Promoting a vibrant seed business for domestic and international markets since {org.founded}. Member of the
            African Seed Trade Association since {org.afstaSince}.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-wheat-400" aria-hidden />
              <span>{org.contact.address.join(", ")}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-wheat-400" aria-hidden />
              <a href="tel:+251116393385" className="hover:text-white">{org.contact.office}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-wheat-400" aria-hidden />
              <a href={`mailto:${org.contact.email}`} className="break-all hover:text-white">{org.contact.email}</a>
            </li>
          </ul>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-wheat-400">{c.title}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-cream/60 sm:flex-row sm:justify-between">
          <p>© 2026 Ethiopian Seed Association. All rights reserved.</p>
          <p>Prototype for Phase 2 review · Facts sourced from public ESA materials, pending verification.</p>
        </div>
      </div>
    </footer>
  );
}
