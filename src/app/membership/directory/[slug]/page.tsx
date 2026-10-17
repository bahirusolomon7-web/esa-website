import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, MapPin, Sprout, Tag, Users } from "lucide-react";
import { board, members, typeBlurb } from "@/lib/content";
import { Breadcrumbs, Initials } from "@/components/ui";

export function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/membership/directory/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = members.find((x) => x.slug === slug);
  return m ? { title: m.name, description: `${m.name}: ${m.type}, ${m.region}. Member of the Ethiopian Seed Association.` } : {};
}

export default async function MemberPage({ params }: PageProps<"/membership/directory/[slug]">) {
  const { slug } = await params;
  const m = members.find((x) => x.slug === slug);
  if (!m) notFound();
  const rep = m.boardSeat
    ? board.find((b) => b.organisation && m.name.toLowerCase().startsWith(b.organisation.toLowerCase().split(" ").slice(0, 2).join(" ")))
    : undefined;
  const related = members.filter((x) => x.slug !== m.slug && (x.region === m.region || x.type === m.type)).slice(0, 4);

  const facts = [
    { icon: Tag, label: "Member type", value: m.type },
    { icon: MapPin, label: "Region", value: m.location ? `${m.location}, ${m.region}` : m.region },
    { icon: Sprout, label: "Seed focus", value: m.crops?.join(", ") ?? m.focus },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-900 text-cream">
        {m.image && <Image src={m.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-40" />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-900/80 to-forest-900/40" aria-hidden />
        <div className="container-x py-14">
          <Breadcrumbs light items={[{ href: "/membership", label: "Membership" }, { href: "/membership/directory", label: "Directory" }, { label: m.name }]} />
          <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-end">
            <Initials name={m.name} className="size-24 rounded-3xl text-3xl ring-4 ring-white/15" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-wheat-400">{m.type}</p>
              <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{m.name}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <dl className="grid gap-4 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-line bg-white p-5">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                  <Icon className="size-4 text-leaf-500" aria-hidden /> {label}
                </dt>
                <dd className="mt-2 font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-10 font-display text-2xl font-semibold text-forest-900">About</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink">{typeBlurb[m.type]}</p>
          {m.boardSeat && (
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-leaf-50 p-4 text-forest-800">
              <Users className="mt-0.5 size-5 shrink-0" aria-hidden />
              <span>
                Represented on the ESA Board of Directors ({m.boardSeat})
                {rep && (
                  <>
                    {" "}by{" "}
                    <Link href={`/leadership/${rep.slug}`} className="font-bold underline underline-offset-2">
                      {rep.name}
                    </Link>
                  </>
                )}
                .
              </span>
            </p>
          )}
          {m.image && (
            <figure className="mt-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                <Image src={m.image} alt={`Seed field of ${m.name}`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-2 text-xs text-muted">Photo: ESA member profile, 2025.</figcaption>
            </figure>
          )}
          <Link href="/membership/directory" className="mt-10 inline-flex items-center gap-2 font-bold text-forest-700 hover:text-forest-900">
            <ArrowLeft className="size-4" aria-hidden /> Back to directory
          </Link>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-line bg-white p-6">
            <p className="flex items-center gap-2 font-bold text-ink">
              <Lock className="size-4 text-wheat-500" aria-hidden /> Contact details
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              This member&apos;s phone and email will appear here once they consent to publication. Meanwhile the ESA secretariat
              can put you in touch.
            </p>
            <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center rounded-full bg-forest-900 px-5 text-sm font-bold text-cream hover:bg-forest-700">
              Request an introduction
            </Link>
          </div>
          {related.length > 0 && (
            <div className="rounded-3xl bg-sand p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Related members</p>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/membership/directory/${r.slug}`} className="flex items-center gap-3 hover:text-forest-700">
                      <Initials name={r.name} className="size-10 shrink-0 rounded-xl text-sm" />
                      <span>
                        <span className="block text-sm font-bold leading-snug">{r.name}</span>
                        <span className="block text-xs text-muted">{r.region}</span>
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
