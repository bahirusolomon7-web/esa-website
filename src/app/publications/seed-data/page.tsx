import type { Metadata } from "next";
import { Download, TrendingDown, TrendingUp } from "lucide-react";
import { national, SEED_DATA_SOURCE, regions2024 } from "@/lib/seed-data";
import { PageHero, SourceNote } from "@/components/ui";
import {
  CropGapChart,
  CropMixChart,
  CropTrendChart,
  FulfilmentChart,
  ProducersChart,
  RegionChart,
  SupplyDemandChart,
} from "@/components/charts";

export const metadata: Metadata = {
  title: "National seed data",
  description: "Ethiopia's certified seed demand, supply and distribution by year, crop and region, 2014–2024.",
};

export default function SeedDataPage() {
  const y23 = national.find((r) => r.year === 2023)!;
  const y24 = national.find((r) => r.year === 2024)!;
  const peak = national.reduce((a, b) => (b.supply > a.supply ? b : a));
  const oromia = regions2024[0];
  const oromiaShare = Math.round((oromia.demand / regions2024.reduce((a, b) => a + b.demand, 0)) * 100);

  const kpis = [
    { label: "Demand, 2024", value: `${Math.round(y24.demand / 1000)}k t`, note: "certified seed requested", trend: null },
    { label: "Supply, 2024", value: `${Math.round(y24.supply / 1000)}k t`, note: `${y24.fulfilment}% of demand · cleaned seed`, trend: "up" as const },
    { label: "Demand met, 2023", value: `${y23.fulfilment}%`, note: `${Math.round(y23.supply / 1000)}k of ${Math.round(y23.demand / 1000)}k t`, trend: "down" as const },
    { label: `Peak supply (${peak.year})`, value: `${Math.round(peak.supply / 1000)}k t`, note: "highest in 11 years", trend: null },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ href: "/publications", label: "Publications" }, { label: "National seed data" }]}
        eyebrow="Data dashboard"
        title="Ethiopia's certified seed system in numbers"
        intro="Eleven seasons of national seed demand, supply and distribution, compiled by ESA from Ministry of Agriculture figures."
        image="/images/members/santen-sorghum.jpg"
      >
        <a
          href={SEED_DATA_SOURCE}
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-wheat-400 px-6 font-bold text-forest-950 hover:bg-wheat-300"
        >
          <Download className="size-4" aria-hidden /> Download dataset · XLSX 33 KB
        </a>
      </PageHero>

      <section className="container-x relative z-10 -mt-10">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-3xl border border-line bg-white p-6 shadow-lg shadow-forest-900/5">
              <dt className="text-xs font-bold uppercase tracking-wider text-muted">{k.label}</dt>
              <dd className="mt-2 flex items-center gap-2 font-display text-4xl font-semibold text-forest-900">
                {k.value}
                {k.trend === "up" && <TrendingUp className="size-6 text-leaf-500" aria-label="up on 2023" />}
                {k.trend === "down" && <TrendingDown className="size-6 text-[#c4542b]" aria-label="lowest share in the series" />}
              </dd>
              <dd className="mt-1 text-sm text-muted">{k.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-x space-y-6 py-14">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <SupplyDemandChart height={360} />
          <FulfilmentChart />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <CropTrendChart />
          <CropMixChart />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <CropGapChart />
          <div className="flex flex-col justify-center rounded-3xl bg-forest-900 p-8 text-cream">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-wheat-400">Reading the data</p>
            <ul className="mt-5 space-y-4 leading-relaxed text-cream/85">
              <li>
                <strong className="text-cream">Wheat and maize dominate.</strong> Together they made up 88% of certified seed
                supplied in 2023, while teff, the country&apos;s largest cereal by area, was under 1%.
              </li>
              <li>
                <strong className="text-cream">Pulses lag furthest behind.</strong> Faba bean supply covered about one tenth of
                demand in 2023.
              </li>
              <li>
                <strong className="text-cream">Oromia drives demand.</strong> It accounted for {oromiaShare}% of regional
                demand in 2024; Amhara produced more seed than it requested.
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <RegionChart />
          <ProducersChart />
        </div>
        <SourceNote>
          Source: ESA, &ldquo;11 years seed data (2006/07 – 2016/17 EFY)&rdquo;, based on Ministry of Agriculture records. Figures
          converted from quintals (1 q = 100 kg) to tonnes. Years are shown as the Gregorian year in which the Ethiopian
          fiscal year (EFY) begins. 2024 figures are partial-season data reported to 09-12-2017 EFY, with supply measured as
          seed cleaned for planting. 2014–2023 supply is certified (C1) seed supplied.
        </SourceNote>
      </section>
    </>
  );
}
