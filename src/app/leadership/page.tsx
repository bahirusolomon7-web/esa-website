import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Network, Users } from "lucide-react";
import { board } from "@/lib/content";
import { PageHero, SectionHeading } from "@/components/ui";
import { PersonCard } from "@/components/person-card";

export const metadata: Metadata = {
  title: "Leadership and governance",
  description: "ESA's Board of Directors, organisational structure and secretariat.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Leadership" }]}
        eyebrow="Leadership and governance"
        title="Led by the seed industry, for the seed industry"
        intro="ESA is governed by a seven-member Board of Directors elected every two years at the General Assembly. A secretariat runs day-to-day work."
        image="/images/news/forum-2024-2.jpg"
      />

      <section className="container-x -mt-10 grid gap-4 md:grid-cols-2">
        {[
          { href: "/leadership/structure", icon: Network, title: "Organisational structure", body: "How the General Assembly, Board and Secretariat fit together." },
          { href: "/leadership/secretariat", icon: Users, title: "Secretariat team", body: "The staff who run ESA's programmes and member services." },
        ].map(({ href, icon: Icon, title, body }) => (
          <Link
            key={href}
            href={href}
            className="group relative z-10 flex items-center gap-5 rounded-3xl border border-line bg-white p-6 shadow-lg shadow-forest-900/5 transition hover:-translate-y-1 hover:border-leaf-400"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-wheat-100 text-forest-800">
              <Icon className="size-6" aria-hidden />
            </span>
            <span className="flex-1">
              <span className="block text-lg font-bold text-ink">{title}</span>
              <span className="block text-sm text-muted">{body}</span>
            </span>
            <ArrowRight className="size-5 text-forest-700 transition group-hover:translate-x-1" aria-hidden />
          </Link>
        ))}
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="Board of Directors" title="Current board members" intro="Board members serve on behalf of their member organisations." />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {board.map((p, i) => (
            <li key={p.slug} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <PersonCard p={p} highlight={i === 0} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
