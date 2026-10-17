import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Eye, MessageCircle, Target } from "lucide-react";
import { history, org, partners } from "@/lib/content";
import { PageHero, SectionHeading } from "@/components/ui";
import { MembershipGrowthChart } from "@/components/charts";

export const metadata: Metadata = {
  title: "About ESA",
  description: "Vision, mission, values, history and partners of the Ethiopian Seed Association.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About ESA"
        title="Advancing a vibrant, ethical seed business in Ethiopia"
        intro={`Formerly the ${org.formerName}, ESA has represented the formal seed sector since ${org.founded}.`}
        image="/images/members/santen-3.jpg"
      />

      <section className="container-x grid gap-6 py-20 md:grid-cols-2">
        <div className="rounded-3xl bg-forest-900 p-8 text-cream sm:p-10">
          <Eye className="size-8 text-wheat-400" aria-hidden />
          <h2 className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-wheat-400">Vision</h2>
          <p className="mt-3 font-display text-2xl leading-snug sm:text-3xl">{org.vision}</p>
        </div>
        <div className="rounded-3xl border border-line bg-white p-8 sm:p-10">
          <Target className="size-8 text-leaf-500" aria-hidden />
          <h2 className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-leaf-500">Mission</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink">{org.mission}</p>
        </div>
      </section>

      <section className="container-x pb-20">
        <SectionHeading eyebrow="Core values" title="SEEDS" intro="The five values that guide how members do business." />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {org.values.map((v, i) => (
            <li key={i} className="group rounded-3xl border border-line bg-white p-6 text-center transition hover:-translate-y-1 hover:border-wheat-400">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-forest-700 to-leaf-500 font-display text-3xl font-semibold text-wheat-300 transition group-hover:rotate-6">
                {v.letter}
              </span>
              <p className="mt-4 font-bold text-ink">{v.word}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Objectives" title="What ESA works for" />
            <ul className="mt-8 space-y-4">
              {org.objectives.map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-leaf-500 text-white">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="leading-relaxed text-ink">{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <MembershipGrowthChart />
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
              <Image src="/images/news/forum-2024-3.jpg" alt="Participants at the Second National Seed Forum in Addis Ababa, May 2024" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="History" title="Two decades of growth" />
        <ol className="relative mt-12 space-y-10 border-l-2 border-dashed border-line pl-8 sm:ml-4">
          {history.map((h) => (
            <li key={h.year + h.title} className="relative">
              <span className="absolute -left-[45px] top-0 flex size-7 items-center justify-center rounded-full border-4 border-cream bg-wheat-400" aria-hidden />
              <p className="font-display text-2xl font-semibold text-leaf-500">{h.year}</p>
              <h3 className="mt-1 text-lg font-bold text-ink">{h.title}</h3>
              <p className="mt-1 max-w-2xl text-muted">{h.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Partners" title="Who we work with" intro="Government, research, regional and international organisations that support ESA's programmes." />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {partners.map((p) => (
              <li key={p.name} className="flex flex-col items-center gap-3 rounded-2xl border border-line p-5 text-center">
                <Image src={p.src} alt="" width={140} height={70} className="h-14 w-auto object-contain" />
                <span className="text-xs font-semibold text-muted">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-forest-900 p-10 text-cream md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold">Want to know more?</h2>
            <p className="mt-2 text-cream/75">See our programmes, or talk to the secretariat directly.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/activities" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 font-bold hover:bg-white/10">
              Activities <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-wheat-400 px-6 font-bold text-forest-950 hover:bg-wheat-300">
              <MessageCircle className="size-4" aria-hidden /> Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
