"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { focuses, members, memberTypes, regions, type Member } from "@/lib/content";
import { Initials } from "./ui";

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]/g, " ");

// Small edit-distance for "did you mean" on misspelt names
function distance(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

function suggest(q: string): Member[] {
  const nq = norm(q).trim();
  if (nq.length < 3) return [];
  return members
    .map((m) => {
      const words = norm(m.name).split(/\s+/);
      const best = Math.min(...words.map((w) => distance(nq, w.slice(0, Math.max(nq.length, 3)))));
      return { m, best };
    })
    .filter((x) => x.best <= Math.max(2, Math.floor(nq.length / 3)))
    .sort((a, b) => a.best - b.best)
    .slice(0, 4)
    .map((x) => x.m);
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const id = `f-${label.toLowerCase().replace(/\s/g, "-")}`;
  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-line bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2355645b%22 stroke-width=%223%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[position:right_14px_center] bg-no-repeat px-4 pr-10 text-sm font-medium text-ink focus:border-leaf-500"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function MemberDirectory() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [region, setRegion] = useState("");
  const [focus, setFocus] = useState("");

  const results = useMemo(() => {
    const nq = norm(q).trim();
    return members
      .filter((m) => (!nq || norm(`${m.name} ${m.location ?? ""} ${(m.crops ?? []).join(" ")}`).includes(nq)))
      .filter((m) => !type || m.type === type)
      .filter((m) => !region || m.region === region)
      .filter((m) => !focus || m.focus === focus)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [q, type, region, focus]);

  const active = [q && `“${q}”`, type, region, focus].filter(Boolean) as string[];
  const reset = () => {
    setQ("");
    setType("");
    setRegion("");
    setFocus("");
  };
  const suggestions = results.length === 0 ? suggest(q) : [];

  return (
    <div>
      <div className="rounded-3xl border border-line bg-white p-5 shadow-lg shadow-forest-900/5 sm:p-6">
        <div className="relative">
          <label htmlFor="member-search" className="sr-only">
            Search members by name, place or crop
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="member-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, place or crop…"
            className="h-14 w-full rounded-2xl border border-line bg-cream pl-12 pr-4 text-base text-ink placeholder:text-muted/70 focus:border-leaf-500 focus:bg-white"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Select label="Member type" value={type} onChange={setType} options={memberTypes} />
          <Select label="Region" value={region} onChange={setRegion} options={regions} />
          <Select label="Seed focus" value={focus} onChange={setFocus} options={focuses} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3" aria-live="polite">
        <p className="flex items-center gap-2 text-sm text-muted">
          <SlidersHorizontal className="size-4" aria-hidden />
          <span>
            <strong className="text-ink">{results.length}</strong> of {members.length} members
          </span>
          {active.map((a) => (
            <span key={a} className="rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-semibold text-forest-700">
              {a}
            </span>
          ))}
        </p>
        {active.length > 0 && (
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-forest-700 hover:bg-sand">
            <X className="size-4" aria-hidden /> Clear all
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-white p-10 text-center">
          <SearchX className="mx-auto size-10 text-muted" aria-hidden />
          <p className="mt-4 font-display text-2xl font-semibold text-forest-900">No members match</p>
          <p className="mx-auto mt-2 max-w-md text-muted">Try fewer filters, check the spelling, or search by region instead.</p>
          {suggestions.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-bold text-ink">Did you mean…</p>
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/membership/directory/${s.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold hover:border-leaf-500 hover:text-forest-700">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center rounded-full bg-forest-900 px-5 text-sm font-bold text-cream">
              Show all members
            </button>
            <Link href="/contact" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-bold">
              Ask the secretariat
            </Link>
          </div>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((m) => (
            <li key={m.slug}>
              <MemberCard m={m} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MemberCard({ m }: { m: Member }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:border-leaf-400 hover:shadow-xl hover:shadow-forest-900/10">
      {m.image ? (
        <div className="relative h-28 overflow-hidden">
          <Image src={m.image} alt="" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 to-transparent" />
        </div>
      ) : (
        <div className="h-28 bg-gradient-to-br from-leaf-50 via-cream to-wheat-100" aria-hidden />
      )}
      <div className="-mt-8 flex flex-1 flex-col px-5 pb-5">
        <Initials name={m.name} className="relative size-14 rounded-2xl text-lg ring-4 ring-white" />
        <h3 className="mt-3 font-bold leading-snug text-ink">
          <Link href={`/membership/directory/${m.slug}`} className="after:absolute after:inset-0">
            {m.name}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          {m.location ? `${m.location}, ${m.region}` : m.region}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-leaf-100 px-2.5 py-1 text-xs font-semibold text-forest-700">{m.type}</span>
          {m.crops?.map((c) => (
            <span key={c} className="rounded-full bg-wheat-100 px-2.5 py-1 text-xs font-semibold text-[#7a5a00]">
              {c}
            </span>
          ))}
          {m.boardSeat && <span className="rounded-full bg-forest-900 px-2.5 py-1 text-xs font-semibold text-cream">Board</span>}
        </div>
        <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-bold text-forest-700">
          View details <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </article>
  );
}
