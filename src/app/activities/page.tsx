import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Handshake, Megaphone, Presentation } from "lucide-react";
import { news } from "@/lib/content";
import { PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Activities and programmes",
  description: "ESA's forums, training, policy advocacy and partnership programmes.",
};

const programmes = [
  {
    icon: Presentation,
    title: "National Seed Forum",
    body: "ESA's flagship annual forum brings government, regulators, research and industry together. The 2024 forum produced a six-point position paper; the 2026 forum set priority issues and actionable recommendations.",
    image: "/images/news/forum-2024-2.jpg",
    link: "/news/national-seed-forum-general-assembly-2026",
  },
  {
    icon: GraduationCap,
    title: "Capacity building",
    body: "Technical and business training for member companies, such as the ten-day Seed Business Management course for 18 companies at Haramaya University in 2025.",
    image: "/images/news/haramaya-training.png",
    link: "/news/seed-business-management-training-haramaya",
  },
  {
    icon: Megaphone,
    title: "Policy advocacy",
    body: "Sustained dialogue with the Ministry of Agriculture and the Ethiopian Agricultural Authority on seed law, variety release, Plant Variety Protection, EGS supply and counterfeit seed.",
    image: "/images/news/pulses-workshop-2025.jpg",
    link: "/news/pulses-seed-regulatory-workshop-2025",
  },
  {
    icon: Handshake,
    title: "Partnerships and market linkage",
    body: "Contract-farming links between cooperative unions and processors, and international ties through AFSTA and bilateral partners such as the Brazilian Seed Association.",
    image: "/images/news/asosa-oilcrop-2.jpg",
    link: "/news/oil-crop-seed-production-workshop-asosa",
  },
];

export default function ActivitiesPage() {
  const events = news.filter((n) => n.kind === "Event").sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        crumbs={[{ href: "/about", label: "About" }, { label: "Activities and programmes" }]}
        eyebrow="What we do"
        title="Activities and programmes"
        intro="Information, forums, training, experience-sharing visits and lobbying on the critical challenges of the seed sector."
        image="/images/news/asosa-oilcrop-1.jpg"
      />
      <section className="container-x space-y-20 py-20">
        {programmes.map(({ icon: Icon, title, body, image, link }, i) => (
          <div key={title} className="grid items-center gap-10 lg:grid-cols-2">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] ${i % 2 ? "lg:order-2" : ""}`}>
              <Image src={image} alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div>
              <span className="flex size-14 items-center justify-center rounded-2xl bg-forest-900 text-wheat-400">
                <Icon className="size-6" aria-hidden />
              </span>
              <h2 className="mt-6 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">{title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{body}</p>
              <Link href={link} className="mt-6 inline-flex items-center gap-2 font-bold text-forest-700 hover:text-forest-900">
                Read the story <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        ))}
      </section>
      <section className="bg-sand py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Track record" title="Recent events" action={{ href: "/news", label: "All news and events" }} />
          <ol className="mt-10 divide-y divide-line rounded-3xl bg-white">
            {events.map((e) => (
              <li key={e.slug}>
                <Link href={`/news/${e.slug}`} className="grid gap-2 p-6 transition hover:bg-leaf-50 sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-6">
                  <time dateTime={e.date} className="font-display text-lg font-semibold text-leaf-500">
                    {new Date(e.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  </time>
                  <span>
                    <span className="block font-bold text-ink">{e.title}</span>
                    <span className="block text-sm text-muted">{e.place}</span>
                  </span>
                  <ArrowRight className="hidden size-5 text-forest-700 sm:block" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
