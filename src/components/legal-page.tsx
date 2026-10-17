import { PageHero } from "./ui";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} title={title} intro={intro} />
      <section className="container-x py-16">
        <div className="mx-auto max-w-2xl space-y-10">
          <p className="rounded-2xl border border-wheat-300 bg-wheat-100 p-4 text-sm text-forest-950">
            Draft for legal review (C7). Final wording must be approved by ESA&apos;s legal adviser before launch.
          </p>
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-2xl font-semibold text-forest-900">{s.h}</h2>
              {s.p.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-ink">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
