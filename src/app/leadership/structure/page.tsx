import type { Metadata } from "next";
import Link from "next/link";
import { board, secretariat, secretariatRoles } from "@/lib/content";
import { Initials, PageHero, SourceNote } from "@/components/ui";

export const metadata: Metadata = {
  title: "Organisational structure",
  description: "ESA's governance structure: General Assembly, Board of Directors and Secretariat.",
};

function Node({
  title,
  sub,
  href,
  tone = "white",
}: {
  title: string;
  sub?: string;
  href?: string;
  tone?: "dark" | "wheat" | "white";
}) {
  const tones = {
    dark: "bg-forest-900 text-cream border-forest-900",
    wheat: "bg-wheat-100 text-forest-950 border-wheat-300",
    white: "bg-white text-ink border-line",
  };
  const inner = (
    <>
      <span className="block font-bold leading-snug">{title}</span>
      {sub && <span className={`mt-0.5 block text-xs ${tone === "dark" ? "text-cream/70" : "text-muted"}`}>{sub}</span>}
      {href && <span className={`mt-1.5 block text-xs font-bold ${tone === "dark" ? "text-wheat-400" : "text-forest-700"}`}>View profile →</span>}
    </>
  );
  const cls = `block rounded-2xl border px-4 py-3 text-center text-sm shadow-sm ${tones[tone]}`;
  return href ? (
    <Link href={href} className={`${cls} transition hover:-translate-y-0.5 hover:shadow-md`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

const Connector = () => <div className="mx-auto h-8 w-0.5 bg-line" aria-hidden />;

export default function StructurePage() {
  const [chair, ...rest] = board;
  return (
    <>
      <PageHero
        crumbs={[{ href: "/leadership", label: "Leadership" }, { label: "Organisational structure" }]}
        eyebrow="Governance"
        title="Organisational structure"
        intro="Members elect the Board at the General Assembly. The Board appoints and oversees the Secretariat, led by an Executive Director."
      />

      <section className="container-x py-16">
        {/* Visual chart, desktop. Built as real text so every node is readable and reachable (F3, N1). */}
        <div className="hidden lg:block">
          <div className="mx-auto max-w-xs">
            <Node title="General Assembly" sub={`All ${60} member organisations`} tone="wheat" />
          </div>
          <Connector />
          <div className="mx-auto max-w-sm">
            <Node title="Board of Directors" sub="7 members · elected every two years" tone="dark" />
          </div>
          <Connector />
          <div className="relative mx-auto max-w-6xl">
            <div className="absolute left-[7%] right-[7%] top-0 h-0.5 bg-line" />
            <ul className="grid grid-cols-7 gap-3 pt-6">
              {[chair, ...rest].map((p) => (
                <li key={p.slug} className="relative">
                  <div className="absolute -top-6 left-1/2 h-6 w-0.5 -translate-x-1/2 bg-line" />
                  <Node title={p.name.replace(/^(Mr|Ms|Dr)\.\s/, "")} sub={p.role} href={`/leadership/${p.slug}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto h-10 w-0.5 bg-line" />
          <div className="mx-auto max-w-sm">
            <Node title="Executive Director" sub="Seed business expert · runs the Secretariat" tone="dark" />
          </div>
          <Connector />
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-[12%] right-[12%] top-0 h-0.5 bg-line" />
            <ul className="grid grid-cols-4 gap-3 pt-6">
              {[
                { title: secretariat[0].role, sub: secretariat[0].name, href: `/leadership/${secretariat[0].slug}` },
                { title: secretariatRoles[1] },
                { title: secretariatRoles[2] },
                { title: secretariatRoles[3] },
              ].map((n) => (
                <li key={n.title} className="relative">
                  <div className="absolute -top-6 left-1/2 h-6 w-0.5 -translate-x-1/2 bg-line" />
                  <Node {...n} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* List view for phones (F3) */}
        <div className="lg:hidden">
          <h2 className="font-display text-2xl font-semibold text-forest-900">Structure as a list</h2>
          <ul className="mt-6 space-y-3">
            <li className="rounded-2xl border border-wheat-300 bg-wheat-100 p-4">
              <p className="font-bold">General Assembly</p>
              <p className="text-sm text-muted">All member organisations; elects the Board every two years.</p>
              <ul className="mt-4 space-y-3 border-l-2 border-wheat-300 pl-4">
                <li className="rounded-2xl bg-forest-900 p-4 text-cream">
                  <p className="font-bold">Board of Directors (7)</p>
                  <ul className="mt-3 space-y-2">
                    {board.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/leadership/${p.slug}`} className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5 hover:bg-white/10">
                          <Initials name={p.name} className="size-10 rounded-lg text-sm" />
                          <span>
                            <span className="block text-sm font-bold">{p.name}</span>
                            <span className="block text-xs text-cream/70">
                              {p.role} · {p.organisation}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 space-y-2 border-l-2 border-white/20 pl-4">
                    <li className="rounded-xl bg-white p-3 text-ink">
                      <p className="font-bold">Executive Director</p>
                      <ul className="mt-2 space-y-1 text-sm text-muted">
                        <li>
                          <Link href={`/leadership/${secretariat[0].slug}`} className="font-semibold text-forest-700 underline underline-offset-2">
                            {secretariat[0].role}: {secretariat[0].name}
                          </Link>
                        </li>
                        {secretariatRoles.slice(1).map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <SourceNote>
          Source: ESA management team page and By-law (2022). Last checked against public sources: October 2026. Status in the
          Source-of-Truth Register: awaiting verification by the content owner.
        </SourceNote>
      </section>
    </>
  );
}
