import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Person } from "@/lib/content";
import { Initials } from "./ui";

export function PersonCard({ p, highlight }: { p: Person; highlight?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-900/10 ${
        highlight ? "border-forest-800 bg-forest-900 text-cream" : "border-line bg-white"
      }`}
    >
      <Initials name={p.name} className="size-16 rounded-2xl text-2xl" />
      <p className={`mt-5 text-xs font-bold uppercase tracking-[0.2em] ${highlight ? "text-wheat-400" : "text-leaf-500"}`}>{p.role}</p>
      <h3 className={`mt-1 font-display text-xl font-semibold ${highlight ? "text-cream" : "text-forest-900"}`}>
        <Link href={`/leadership/${p.slug}`} className="after:absolute after:inset-0">
          {p.name}
        </Link>
      </h3>
      {p.organisation && <p className={`mt-1 text-sm ${highlight ? "text-cream/70" : "text-muted"}`}>{p.organisation}</p>}
      <span className={`mt-auto flex items-center gap-1 pt-6 text-sm font-bold ${highlight ? "text-wheat-400" : "text-forest-700"}`}>
        View profile <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </span>
    </article>
  );
}
