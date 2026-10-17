import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, ExternalLink, MapPin } from "lucide-react";
import { fmtDate, news } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui";
import { NewsCard } from "@/components/cards";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const n = news.find((x) => x.slug === slug);
  return n ? { title: n.title, description: n.summary, openGraph: { images: [n.image] } } : {};
}

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const n = news.find((x) => x.slug === slug);
  if (!n) notFound();
  const more = news.filter((x) => x.slug !== n.slug).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      <article>
        <header className="container-x pt-10">
          <Breadcrumbs items={[{ href: "/news", label: "News and events" }, { label: n.title }]} />
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold text-forest-700">{n.kind}</span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-forest-900 sm:text-5xl">{n.title}</h1>
            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-muted">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4 text-leaf-500" aria-hidden />
                <time dateTime={n.date}>
                  {fmtDate(n.date)}
                  {n.endDate && ` – ${fmtDate(n.endDate)}`}
                </time>
              </span>
              {n.place && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-leaf-500" aria-hidden /> {n.place}
                </span>
              )}
            </p>
          </div>
          <div className="relative mx-auto mt-10 aspect-[16/8] max-w-5xl overflow-hidden rounded-[2rem] bg-sand">
            <Image src={n.image} alt="" fill priority sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </header>

        <div className="container-x">
          <div className="mx-auto max-w-2xl py-14">
            <p className="font-display text-2xl leading-snug text-forest-900">{n.summary}</p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink">
              {n.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {n.bullets && (
              <ul className="mt-8 space-y-3 rounded-3xl bg-white p-7 shadow-sm">
                {n.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-leaf-500" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {n.gallery && (
              <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {n.gallery.map((g) => (
                  <li key={g} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={g} alt={`Photo from ${n.title}`} fill sizes="33vw" className="object-cover" />
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
              <Link href="/news" className="inline-flex items-center gap-2 font-bold text-forest-700 hover:text-forest-900">
                <ArrowLeft className="size-4" aria-hidden /> All news and events
              </Link>
              <a href={n.source} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-muted hover:text-forest-700">
                Original post <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-sand py-16">
        <div className="container-x">
          <h2 className="font-display text-3xl font-semibold text-forest-900">More from ESA</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((m) => (
              <NewsCard key={m.slug} item={m} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
