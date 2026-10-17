import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { org } from "@/lib/content";
import { PageHero, SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Ethiopian Seed Association secretariat in Bole, Addis Ababa.",
};

const faqs = [
  { q: "How do I become a member?", a: "Download the application form on the Membership page, fill and sign it, and email it to ESA. The secretariat will confirm fees and next steps." },
  { q: "Can ESA help me find a certified seed supplier?", a: "Yes. Search the member directory by region and seed focus, or write to us and we will introduce you to a member." },
  { q: "Does ESA certify seed?", a: "No. Seed certification is done by the regulator. ESA represents seed businesses and works with regulators on standards and policy." },
  { q: "Can I use ESA publications?", a: "Yes. Resources are free to download; please acknowledge the authors and sources." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="Talk to the ESA secretariat"
        intro="Questions about membership, members, events or the seed sector. We read every message."
        image="/images/news/brazil-embassy.jpg"
      />

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: MapPin, t: "Office", lines: org.contact.address },
            { icon: Phone, t: "Phone", lines: [org.contact.office], href: "tel:+251116393385" },
            { icon: Mail, t: "Email", lines: [org.contact.email], href: `mailto:${org.contact.email}` },
            { icon: UserRound, t: "Secretariat Office Manager", lines: ["Dejene Jifar", "+251 911 850 512"], href: "tel:+251911850512" },
            { icon: Clock, t: "Office hours", lines: ["Monday to Friday", "Hours to be confirmed"] },
          ].map(({ icon: Icon, t, lines, href }) => (
            <div key={t} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-forest-700">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">{t}</p>
                {lines.map((l, i) =>
                  href && i === lines.length - 1 ? (
                    <a key={l} href={href} className="block break-words font-semibold text-ink hover:text-forest-700">
                      {l}
                    </a>
                  ) : (
                    <p key={l} className="font-semibold text-ink">
                      {l}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <SectionHeading title="Send a message" intro="Fields marked * are required." />
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="container-x grid gap-8 pb-20 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-line bg-white">
          <iframe
            title="Map of Bole Sub City, Addis Ababa"
            src="https://www.openstreetmap.org/export/embed.html?bbox=38.770%2C8.975%2C38.815%2C9.005&layer=mapnik"
            className="h-72 w-full"
            loading="lazy"
          />
          <div className="p-5 text-sm text-muted">
            <p className="font-bold text-ink">Directions</p>
            <p className="mt-1">
              ESA is in the Bole Michael Church Building, Woreda 1, Bole Sub City, Addis Ababa. The map shows Bole Sub City;
              call the office for directions to the building.
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold text-forest-900">Frequently asked</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-white p-5 open:shadow-md">
                <summary className="flex min-h-6 cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
                  {f.q}
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sand text-lg transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
