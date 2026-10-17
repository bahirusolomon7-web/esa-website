import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Download, FileSpreadsheet, FileText, MapPin } from "lucide-react";
import { fmtBytes, fmtDate, type NewsItem, type Publication } from "@/lib/content";
import { Pill } from "./ui";

export function NewsCard({ item, featured }: { item: NewsItem; featured?: boolean }) {
  const upcoming = new Date(item.endDate ?? item.date) >= new Date("2026-10-17");
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-900/10">
      <div className={`relative overflow-hidden bg-sand ${featured ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-forest-900 backdrop-blur">{item.kind}</span>
          {item.kind === "Event" && !upcoming && (
            <span className="rounded-full bg-forest-900/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">Past event</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-muted">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-leaf-500" aria-hidden />
            <time dateTime={item.date}>
              {fmtDate(item.date)}
              {item.endDate && ` – ${fmtDate(item.endDate)}`}
            </time>
          </span>
          {item.place && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-leaf-500" aria-hidden />
              {item.place.split(",").slice(-1)[0].trim()}
            </span>
          )}
        </p>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-forest-900">
          <Link href={`/news/${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.summary}</p>
        <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-bold text-forest-700">
          Read more <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}

export function PublicationRow({ pub }: { pub: Publication }) {
  const Icon = pub.format === "XLSX" ? FileSpreadsheet : FileText;
  return (
    <li className="group flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-leaf-400 hover:shadow-md sm:flex-row sm:items-center">
      <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-leaf-50 text-forest-700">
        <Icon className="size-6" aria-hidden />
        <span className="mt-0.5 text-[10px] font-bold">{pub.format}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold leading-snug text-ink">{pub.title}</h3>
        <p className="mt-1 text-sm text-muted">{pub.summary}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <Pill>{pub.type}</Pill>
          <Pill tone="sand">{pub.year}</Pill>
          <Pill tone="sand">{pub.language}</Pill>
          {pub.author && <Pill tone="sand">{pub.author}</Pill>}
        </div>
      </div>
      <a
        href={pub.url}
        target="_blank"
        rel="noopener"
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-forest-900 px-5 text-sm font-bold text-cream transition hover:bg-forest-700"
        aria-label={`Download ${pub.title} (${pub.format}, ${fmtBytes(pub.bytes)})`}
      >
        <Download className="size-4" aria-hidden />
        {pub.format} · {fmtBytes(pub.bytes)}
      </a>
    </li>
  );
}
