import type { Metadata } from "next";
import { Briefcase, Mail, Phone } from "lucide-react";
import { secretariat, secretariatRoles } from "@/lib/content";
import { PageHero, SectionHeading, SourceNote } from "@/components/ui";
import { PersonCard } from "@/components/person-card";

export const metadata: Metadata = {
  title: "Secretariat team",
  description: "The ESA secretariat runs day-to-day operations, member services and programmes.",
};

export default function SecretariatPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/leadership", label: "Leadership" }, { label: "Secretariat team" }]}
        eyebrow="Secretariat"
        title="The team behind member services"
        intro="An Executive Director with seed-business expertise, a membership and communication officer, an accountant and a cashier run ESA's day-to-day work from Addis Ababa."
        image="/images/news/stakeholder-2023.jpg"
      />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading eyebrow="Staff" title="Meet the secretariat" />
          <ul className="mt-8 grid gap-5">
            {secretariat.map((p) => (
              <li key={p.slug}>
                <PersonCard p={p} />
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 rounded-3xl bg-sand p-6 text-sm">
            <p className="font-bold text-ink">Reach the secretariat</p>
            <p className="flex items-center gap-2 text-muted">
              <Phone className="size-4 text-leaf-500" aria-hidden /> <a href="tel:+251911850512" className="hover:text-forest-700">+251 911 850 512</a>
            </p>
            <p className="flex items-center gap-2 text-muted">
              <Mail className="size-4 text-leaf-500" aria-hidden /> <a href="mailto:dejenejifar@gmail.com" className="hover:text-forest-700">dejenejifar@gmail.com</a>
            </p>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Roles" title="Secretariat positions" intro="Defined in the ESA by-law. Profiles are published only with written consent (C3)." />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {secretariatRoles.map((r, i) => (
              <li key={r} className="rounded-3xl border border-line bg-white p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-leaf-50 font-display text-lg font-semibold text-forest-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 flex items-center gap-2 font-bold text-ink">
                  <Briefcase className="size-4 text-wheat-500" aria-hidden /> {r}
                </p>
                <p className="mt-1 text-sm text-muted">Profile to be added once consent is on file.</p>
              </li>
            ))}
          </ul>
          <SourceNote>Source: ESA management team and contacts pages, checked October 2026.</SourceNote>
        </div>
      </section>
    </>
  );
}
