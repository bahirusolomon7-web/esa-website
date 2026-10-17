import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { PageHero } from "@/components/ui";
import { PublicationList } from "@/components/publication-list";

export const metadata: Metadata = {
  title: "Publications and resources",
  description: "Download ESA reports, position papers, seed laws, by-laws, manuals and national seed data.",
};

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Publications" }]}
        eyebrow="Publications and resources"
        title="Reports, laws, manuals and data"
        intro="Free to download with proper acknowledgement of the authors and sources. Each file lists its type, year, language and size."
        image="/images/news/variety-licensing.jpg"
      />
      <section className="container-x py-14">
        <Link
          href="/publications/seed-data"
          className="group mb-12 flex flex-col gap-5 overflow-hidden rounded-3xl bg-gradient-to-r from-forest-900 to-forest-700 p-7 text-cream sm:flex-row sm:items-center"
        >
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-wheat-400 text-forest-950">
            <BarChart3 className="size-6" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-wheat-400">Interactive</span>
            <span className="mt-1 block font-display text-2xl font-semibold">National seed data dashboard, 2014–2024</span>
            <span className="mt-1 block text-sm text-cream/70">Demand, supply and distribution by year, crop and region, with every chart available as a table.</span>
          </span>
          <ArrowRight className="size-6 transition group-hover:translate-x-1" aria-hidden />
        </Link>
        <PublicationList />
      </section>
    </>
  );
}
