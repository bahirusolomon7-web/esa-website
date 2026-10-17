import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Download,
  Handshake,
  Megaphone,
  Search,
  Sprout,
  UserPlus,
  Users,
  GraduationCap,
  Network,
} from "lucide-react";
import { news, org, partners, publications } from "@/lib/content";
import { national } from "@/lib/seed-data";
import { NewsCard, PublicationRow } from "@/components/cards";
import { SectionHeading } from "@/components/ui";
import { SupplyDemandChart } from "@/components/charts";

const tasks = [
  { href: "/about", icon: Sprout, title: "Learn about ESA", body: "Mission, history and what we do" },
  { href: "/membership/directory", icon: Search, title: "Find a member", body: "Search 60 seed businesses" },
  { href: "/publications", icon: Download, title: "Download a publication", body: "Reports, laws and manuals" },
  { href: "/membership", icon: UserPlus, title: "Become a member", body: "Eligibility, benefits, steps" },
];

const serviceIcons = [Users, Megaphone, GraduationCap, Network];

export default function Home() {
  const y23 = national.find((r) => r.year === 2023)!;
  const y24 = national.find((r) => r.year === 2024)!;
  const peak = national.reduce((a, b) => (b.supply > a.supply ? b : a));
  const latest = news.filter((n) => !n.slug.startsWith("eiar")).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const featured = publications.slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------ Hero */}
      <section className="relative isolate overflow-hidden bg-forest-950 text-cream">
        <Image
          src="/images/members/santen-soya.jpg"
          alt="Rows of soybean seed crop on a member farm in Basketo Zone"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/20" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-forest-950/80 to-transparent" aria-hidden />

        <div className="container-x grid gap-12 pb-28 pt-20 sm:pt-28 lg:grid-cols-[1.25fr_1fr] lg:pb-36">
          <div>
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur">
              <span className="size-2 rounded-full bg-wheat-400" aria-hidden />
              Since {org.founded} · Member of AFSTA
            </p>
            <h1 className="animate-rise mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight [animation-delay:80ms] sm:text-6xl lg:text-7xl">
              Quality seed for every <span className="italic text-wheat-400">Ethiopian</span> farm.
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-cream/80 [animation-delay:160ms]">
              The Ethiopian Seed Association brings together {org.members} seed producers, enterprises, cooperative unions
              and importers to grow a vibrant, ethical seed business for domestic and international markets.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-3 [animation-delay:240ms]">
              <Link
                href="/membership/directory"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-wheat-400 px-6 font-bold text-forest-950 transition hover:bg-wheat-300"
              >
                <Search className="size-4" aria-hidden /> Find a member
              </Link>
              <Link
                href="/membership"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 font-bold backdrop-blur transition hover:bg-white/10"
              >
                Join ESA <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="animate-rise hidden self-end [animation-delay:320ms] lg:block">
            <div className="ml-auto max-w-sm rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-wheat-400">National seed supply · 2024</p>
              <p className="mt-3 font-display text-5xl font-semibold">
                {Math.round(y24.supply / 1000)}k<span className="text-2xl text-cream/70"> tonnes</span>
              </p>
              <p className="mt-1 text-sm text-cream/70">certified seed cleaned for planting, against {Math.round(y24.demand / 1000)}k t demand</p>
              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-gradient-to-r from-leaf-400 to-wheat-400" style={{ width: `${y24.fulfilment}%` }} />
              </div>
              <p className="mt-2 text-xs text-cream/70">{y24.fulfilment}% of demand met</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Top tasks */}
      <section aria-labelledby="tasks-title" className="relative z-10 -mt-16">
        <h2 id="tasks-title" className="sr-only">Quick links</h2>
        <div className="container-x">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tasks.map(({ href, icon: Icon, title, body }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-lg shadow-forest-900/5 transition hover:-translate-y-1 hover:border-leaf-400"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-forest-700 transition group-hover:bg-forest-900 group-hover:text-wheat-400">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{title}</span>
                    <span className="block text-sm text-muted">{body}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Facts */}
      <section className="container-x py-20">
        <dl className="grid grid-cols-2 gap-y-10 border-y border-line py-10 md:grid-cols-4">
          {[
            { v: org.members, l: "Member organisations", s: "public, private and cooperative" },
            { v: org.founded, l: "Year established", s: "under Proclamation 206/2000" },
            { v: 7, l: "Elected board members", s: "elected by the General Assembly" },
            { v: "6", l: "Member categories", s: "from multinationals to unions" },
          ].map((f) => (
            <div key={f.l} className="px-2 text-center md:border-l md:border-line md:first:border-l-0">
              <dt className="sr-only">{f.l}</dt>
              <dd className="font-display text-5xl font-semibold text-forest-900 sm:text-6xl">{f.v}</dd>
              <dd className="mt-2 text-sm font-bold text-ink">{f.l}</dd>
              <dd className="text-xs text-muted">{f.s}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ------------------------------------------------ About teaser */}
      <section className="container-x grid items-center gap-14 pb-24 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:w-4/5">
            <Image src="/images/members/borer.jpg" alt="Haricot bean seed field at Borer Agricultural Development, Walkite" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 right-0 hidden aspect-[4/3] w-1/2 overflow-hidden rounded-3xl border-8 border-cream shadow-xl sm:block">
            <Image src="/images/news/forum-2024-1.jpg" alt="Delegates at the Second National Seed Forum, Addis Ababa, 2024" fill sizes="25vw" className="object-cover" />
          </div>
          <div className="animate-drift absolute -left-4 top-8 rounded-2xl bg-wheat-400 px-5 py-4 text-forest-950 shadow-lg">
            <p className="font-display text-3xl font-semibold">20+</p>
            <p className="text-xs font-bold">years serving the sector</p>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Who we are" title="One voice for Ethiopia's formal seed sector" />
          <p className="mt-5 text-lg leading-relaxed text-muted">{org.mission}</p>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Core values: SEEDS">
            {org.values.map((v, i) => (
              <span key={i} className="flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold">
                <span className="flex size-7 items-center justify-center rounded-full bg-forest-900 font-display text-wheat-400">{v.letter}</span>
                {v.word}
              </span>
            ))}
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {org.services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <li key={s.title} className="flex gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-leaf-500" aria-hidden />
                  <div>
                    <p className="font-bold text-ink">{s.title}</p>
                    <p className="text-sm text-muted">{s.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link href="/about" className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-forest-900 px-6 font-bold text-cream hover:bg-forest-700">
            More about ESA <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ Data */}
      <section className="relative overflow-hidden bg-forest-900 py-24 text-cream">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-wheat-400">The seed gap</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Demand for certified seed still outruns supply.
            </h2>
            <p className="mt-5 text-cream/75">
              In 2023 farmers asked for {Math.round(y23.demand / 1000)}k tonnes of certified seed. The formal system supplied{" "}
              {Math.round(y23.supply / 1000)}k, just <strong className="text-wheat-400">{y23.fulfilment}%</strong> of demand. Closing
              that gap is why ESA lobbies on EGS supply, counterfeit seed and access to finance.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 p-5">
                <dt className="text-xs text-cream/60">Peak supply ({peak.year})</dt>
                <dd className="mt-1 font-display text-3xl font-semibold">{Math.round(peak.supply / 1000)}k t</dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-5">
                <dt className="text-xs text-cream/60">Wheat + maize share, 2023</dt>
                <dd className="mt-1 font-display text-3xl font-semibold">88%</dd>
              </div>
            </dl>
            <Link href="/publications/seed-data" className="mt-8 inline-flex items-center gap-2 font-bold text-wheat-400 hover:text-wheat-300">
              Explore national seed data <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="text-ink">
            <SupplyDemandChart />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ News */}
      <section className="container-x py-24">
        <SectionHeading eyebrow="Latest activity" title="News and events" action={{ href: "/news", label: "All news and events" }} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((n) => (
            <NewsCard key={n.slug} item={n} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ Publications */}
      <section className="bg-sand py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <SectionHeading eyebrow="Resources" title="Featured publications" intro="Every file shows its type, year, language and size before you download, so you know what to expect on a slow connection." />
            <Link href="/publications" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-forest-900 px-6 font-bold text-forest-900 hover:bg-forest-900 hover:text-cream">
              <BookOpen className="size-4" aria-hidden /> Browse all {publications.length}
            </Link>
          </div>
          <ul className="space-y-3">
            {featured.map((p) => (
              <PublicationRow key={p.slug} pub={p} />
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Partners */}
      <section className="container-x py-20" aria-labelledby="partners-title">
        <h2 id="partners-title" className="text-center text-xs font-bold uppercase tracking-[0.25em] text-muted">
          Working with
        </h2>
        <ul className="mt-10 grid grid-cols-2 items-center gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {partners.map((p) => (
            <li key={p.name} className="flex h-20 items-center justify-center rounded-2xl bg-white p-3 grayscale transition hover:grayscale-0">
              <Image src={p.src} alt={p.name} width={140} height={70} className="max-h-14 w-auto object-contain" />
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ Join band */}
      <section className="container-x pb-24">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-wheat-400 via-wheat-300 to-leaf-400 p-10 sm:p-16">
          <Image src="/images/members/santen-sorghum.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-15 mix-blend-multiply" />
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
                Grow with Ethiopia&apos;s seed community.
              </h2>
              <p className="mt-4 max-w-xl text-forest-900/80">
                Membership is open to seed producers, enterprises, cooperative unions, importers, service providers and seed
                professionals. Get training, market linkages and a voice in national policy.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/membership" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-forest-950 px-6 font-bold text-cream hover:bg-forest-800">
                <Handshake className="size-4" aria-hidden /> How to join
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-forest-950/30 bg-white/40 px-6 font-bold text-forest-950 backdrop-blur hover:bg-white/70">
                <Building2 className="size-4" aria-hidden /> Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
