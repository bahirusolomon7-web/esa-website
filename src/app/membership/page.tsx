import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpenCheck,
  Download,
  FileSignature,
  Globe2,
  GraduationCap,
  HandCoins,
  Mail,
  MessagesSquare,
  Newspaper,
  Search,
  Users2,
  Vote,
  Building,
  Star,
} from "lucide-react";
import { fmtBytes, members, memberTypes, org, publications } from "@/lib/content";
import { PageHero, SectionHeading } from "@/components/ui";
import { MemberTypeChart } from "@/components/charts";

export const metadata: Metadata = {
  title: "Membership",
  description: "Who can join the Ethiopian Seed Association, the benefits of membership and how to apply.",
};

const classes = [
  {
    icon: Vote,
    name: "Active members",
    who: "Public or private enterprises with seed as their core business: producing, supplying or marketing seed.",
    note: "Voting rights at the General Assembly",
  },
  {
    icon: Building,
    name: "Associate members",
    who: "Organisations with limited direct seed business: NGOs, service providers, government agencies, laboratories, equipment and facility providers.",
    note: "Access to services and events",
  },
  {
    icon: Star,
    name: "Honorary members",
    who: "Professionals and senior experts who are recognised supporters of the seed sector.",
    note: "By recognition",
  },
];

const benefits = [
  { icon: GraduationCap, t: "New knowledge", b: "Technical conferences, workshops, study tours and training." },
  { icon: Award, t: "Business growth", b: "Business and professional development for a sustainable supply of quality seed." },
  { icon: Users2, t: "Member network", b: "Contact details of other ESA members and access to the membership database." },
  { icon: BookOpenCheck, t: "Industry data", b: "Technical reports and seed industry data, including national seed statistics." },
  { icon: MessagesSquare, t: "Forums", b: "Connect with fellow members to discuss shared opportunities and obstacles." },
  { icon: Newspaper, t: "Policy updates", b: "News on public policy initiatives and actions through the newsletter." },
  { icon: Globe2, t: "International contacts", b: "Opportunities to meet the regional and global seed industry at annual events." },
  { icon: HandCoins, t: "Market linkages", b: "Partnerships with processors, exporters and cooperative unions." },
];

export default function MembershipPage() {
  const form = publications.find((p) => p.type === "Form")!;
  const byType = memberTypes.map((t) => ({ name: t, value: members.filter((m) => m.type === t).length }));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Membership" }]}
        eyebrow="Membership"
        title="Join Ethiopia's seed business community"
        intro="Membership is open to everyone involved in seed research, production, marketing, distribution and technology delivery, for all kinds of seeds and planting materials."
        image="/images/members/santen-sorghum.jpg"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#apply" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-wheat-400 px-6 font-bold text-forest-950 hover:bg-wheat-300">
            How to apply
          </a>
          <Link href="/membership/directory" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 font-bold hover:bg-white/10">
            <Search className="size-4" aria-hidden /> See who&apos;s a member
          </Link>
        </div>
      </PageHero>

      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Eligibility"
          title="Three membership classes"
          intro="Public and private, national and international companies, cooperative unions and individuals can join if they accept ESA's objectives and by-law and pay the subscription and annual fees."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {classes.map(({ icon: Icon, name, who, note }, i) => (
            <li key={name} className={`rounded-3xl border p-7 ${i === 0 ? "border-forest-900 bg-forest-900 text-cream" : "border-line bg-white"}`}>
              <Icon className={`size-8 ${i === 0 ? "text-wheat-400" : "text-leaf-500"}`} aria-hidden />
              <h3 className="mt-5 font-display text-2xl font-semibold">{name}</h3>
              <p className={`mt-2 leading-relaxed ${i === 0 ? "text-cream/80" : "text-muted"}`}>{who}</p>
              <p className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-bold ${i === 0 ? "bg-wheat-400 text-forest-950" : "bg-leaf-100 text-forest-700"}`}>
                {note}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Benefits" title="What members get" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, t, b }) => (
              <li key={t} className="rounded-3xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-wheat-300 to-wheat-400 text-forest-950">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-4 font-bold text-ink">{t}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Our members today" title={`${org.members} organisations and growing`} intro="From multinational breeders to farmer cooperative unions, ESA's members cover the formal seed value chain." />
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl">
            <Image src="/images/members/bumper-harvest.jpg" alt="Seed field of member company Bumper Harvest" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
        <MemberTypeChart data={byType} />
      </section>

      <section id="apply" className="scroll-mt-24 bg-forest-900 py-20 text-cream">
        <div className="container-x">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-wheat-400">How to apply</p>
          <h2 className="mt-3 font-display text-4xl font-semibold">Four steps to membership</h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              { icon: Download, t: "Download the form", b: `Membership application form (PDF, ${fmtBytes(form.bytes)}).` },
              { icon: FileSignature, t: "Fill in and sign", b: "Complete every section and sign on behalf of your organisation." },
              { icon: Mail, t: "Email it to ESA", b: org.contact.email },
              { icon: HandCoins, t: "Pay your fees", b: "Subscription and annual fees as set by the by-law. The secretariat will confirm amounts." },
            ].map(({ icon: Icon, t, b }, i) => (
              <li key={t} className="relative rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="font-display text-6xl font-semibold text-white/10">{i + 1}</span>
                <Icon className="mt-2 size-6 text-wheat-400" aria-hidden />
                <p className="mt-3 text-lg font-bold">{t}</p>
                <p className="mt-1 break-words text-sm text-cream/70">{b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-cream/60">Online application is planned for a later release (F11), once ESA&apos;s process is agreed.</p>
        </div>
      </section>

      {/* Sticky Apply / Contact bar (flow 5) */}
      <div className="sticky bottom-0 z-40 border-t border-line bg-white/90 backdrop-blur-xl">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="text-sm font-semibold text-ink">Not sure if you qualify? Ask the secretariat first.</p>
          <div className="flex gap-2">
            <Link href="/contact" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-bold hover:bg-sand">
              Contact us
            </Link>
            <a href={form.url} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest-900 px-5 text-sm font-bold text-cream hover:bg-forest-700">
              <Download className="size-4" aria-hidden /> Apply · PDF {fmtBytes(form.bytes)}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
