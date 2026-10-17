import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, light }: { items: Crumb[]; light?: boolean }) {
  const all: Crumb[] = [{ href: "/", label: "Home" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${light ? "text-cream/70" : "text-muted"}`}>
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 opacity-60" aria-hidden />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className={light ? "hover:text-white" : "hover:text-forest-700"}>
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={light ? "font-semibold text-cream" : "font-semibold text-ink"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 text-cream">
      {image && (
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-35" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-forest-950/95 via-forest-900/85 to-forest-700/60" aria-hidden />
      <div className="grain absolute inset-0 -z-10" aria-hidden />
      <div
        className="animate-drift absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-wheat-400/20 blur-3xl"
        aria-hidden
      />
      <div className="container-x py-14 sm:py-20">
        <Breadcrumbs items={crumbs} light />
        {eyebrow && (
          <p className="animate-rise mt-8 text-xs font-bold uppercase tracking-[0.25em] text-wheat-400">{eyebrow}</p>
        )}
        <h1 className="animate-rise mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && <p className="animate-rise mt-5 max-w-2xl text-lg leading-relaxed text-cream/80">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.25em] text-leaf-500">{eyebrow}</p>}
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-base leading-relaxed text-muted">{intro}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-forest-700 hover:text-forest-900"
        >
          {action.label}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </div>
  );
}

const palette = [
  "from-forest-700 to-leaf-500",
  "from-wheat-500 to-wheat-300",
  "from-forest-800 to-forest-600",
  "from-leaf-500 to-wheat-400",
];

export function Initials({ name, className = "" }: { name: string; className?: string }) {
  const clean = name.replace(/^(Mr|Ms|Dr)\.?\s+/, "");
  const parts = clean.split(/\s+/).filter((p) => /^[A-Za-z]/.test(p));
  const letters = ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
  const idx = [...clean].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center bg-gradient-to-br font-display font-semibold text-white ${palette[idx]} ${className}`}
    >
      {letters}
    </div>
  );
}

export function Pill({ children, tone = "leaf" }: { children: React.ReactNode; tone?: "leaf" | "wheat" | "sand" }) {
  const tones = {
    leaf: "bg-leaf-100 text-forest-700",
    wheat: "bg-wheat-100 text-[#7a5a00]",
    sand: "bg-sand text-muted",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function SourceNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-xs leading-relaxed text-muted">{children}</p>;
}
