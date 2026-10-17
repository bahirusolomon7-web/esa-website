import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Info } from "lucide-react";
import { members, people } from "@/lib/content";
import { Breadcrumbs, Initials } from "@/components/ui";

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/leadership/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = people.find((x) => x.slug === slug);
  return p ? { title: `${p.name}, ${p.role}`, description: `${p.name} is ${p.role} of the Ethiopian Seed Association.` } : {};
}

export default async function ProfilePage({ params }: PageProps<"/leadership/[slug]">) {
  const { slug } = await params;
  const p = people.find((x) => x.slug === slug);
  if (!p) notFound();
  const memberOrg = p.organisation
    ? members.find((m) => m.name.toLowerCase().startsWith(p.organisation!.toLowerCase().split(" ").slice(0, 2).join(" ")))
    : undefined;
  const colleagues = people.filter((x) => x.group === p.group && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-forest-900 text-cream">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative py-14">
          <Breadcrumbs
            light
            items={[
              { href: "/leadership", label: "Leadership" },
              p.group === "secretariat" ? { href: "/leadership/secretariat", label: "Secretariat" } : { href: "/leadership/structure", label: "Board" },
              { label: p.name },
            ]}
          />
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end">
            <Initials name={p.name} className="size-32 rounded-[2rem] text-5xl shadow-2xl ring-4 ring-white/10" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-wheat-400">{p.role}</p>
              <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">{p.name}</h1>
              {p.organisation && (
                <p className="mt-3 flex items-center gap-2 text-cream/75">
                  <Building2 className="size-4" aria-hidden /> {p.organisation}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-forest-900">Biography</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink">
            {p.name} serves as {p.role} of the Ethiopian Seed Association
            {p.organisation ? `, representing ${p.organisation}` : ""}.
            {p.group === "board"
              ? " Board members are elected by the General Assembly for a two-year term and oversee ESA's strategy, finances and the Secretariat."
              : " The Secretariat Office Manager coordinates member services, events and day-to-day administration."}
          </p>
          {p.slug === "melaku-admasu" && (
            <p className="mt-4 text-lg leading-relaxed text-ink">
              Mr. Melaku opened the Second National Seed Forum in May 2024, calling for stronger collaboration and coordination
              among all actors in the seed sector.
            </p>
          )}
          <div className="mt-8 flex gap-3 rounded-2xl border border-wheat-300 bg-wheat-100 p-5 text-sm text-forest-950">
            <Info className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p>
              A full 80–150 word biography and photo will be published once supplied with written consent (requirement C3). No
              photo is shown until then.
            </p>
          </div>
          <Link href="/leadership/structure" className="mt-10 inline-flex items-center gap-2 font-bold text-forest-700 hover:text-forest-900">
            <ArrowLeft className="size-4" aria-hidden /> Back to organisational structure
          </Link>
        </div>
        <aside className="space-y-5">
          {memberOrg && (
            <Link href={`/membership/directory/${memberOrg.slug}`} className="block rounded-3xl border border-line bg-white p-6 transition hover:border-leaf-400">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-leaf-500">Member organisation</p>
              <p className="mt-2 font-bold text-ink">{memberOrg.name}</p>
              <p className="text-sm text-muted">{memberOrg.type}</p>
            </Link>
          )}
          {colleagues.length > 0 && (
            <div className="rounded-3xl bg-sand p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Also on the {p.group === "board" ? "board" : "team"}</p>
              <ul className="mt-4 space-y-3">
                {colleagues.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/leadership/${c.slug}`} className="flex items-center gap-3 hover:text-forest-700">
                      <Initials name={c.name} className="size-10 rounded-xl text-sm" />
                      <span>
                        <span className="block text-sm font-bold">{c.name}</span>
                        <span className="block text-xs text-muted">{c.role}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
