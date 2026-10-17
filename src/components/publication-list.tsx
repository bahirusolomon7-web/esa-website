"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { publications, pubTypes } from "@/lib/content";
import { PublicationRow } from "./cards";

export function PublicationList() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("");
  const [lang, setLang] = useState("");

  const languages = ["English", "Amharic"];
  const results = useMemo(() => {
    const nq = q.toLowerCase().trim();
    return publications
      .filter((p) => !nq || `${p.title} ${p.summary} ${p.author ?? ""}`.toLowerCase().includes(nq))
      .filter((p) => !type || p.type === type)
      .filter((p) => !lang || p.language.includes(lang))
      .sort((a, b) => b.year - a.year);
  }, [q, type, lang]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="relative">
          <label htmlFor="pub-search" className="sr-only">
            Search publications
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="pub-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles…"
            className="h-12 w-full rounded-xl border border-line bg-white pl-12 pr-4 text-sm focus:border-leaf-500"
          />
        </div>
        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-wider text-muted">Type</legend>
          <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
            {["", ...pubTypes].map((t) => {
              const count = t ? publications.filter((p) => p.type === t).length : publications.length;
              return (
                <button
                  key={t || "all"}
                  type="button"
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                  className={`flex min-h-11 items-center justify-between gap-3 rounded-xl px-4 text-sm font-semibold transition ${
                    type === t ? "bg-forest-900 text-cream" : "bg-white text-ink hover:bg-leaf-50"
                  }`}
                >
                  {t || "All types"}
                  <span className="opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-wider text-muted">Language</legend>
          <div className="mt-3 flex gap-2">
            {["", ...languages].map((l) => (
              <button
                key={l || "any"}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`min-h-11 flex-1 rounded-xl px-3 text-sm font-semibold ${lang === l ? "bg-forest-900 text-cream" : "bg-white hover:bg-leaf-50"}`}
              >
                {l || "Any"}
              </button>
            ))}
          </div>
        </fieldset>
      </aside>

      <div>
        <p className="text-sm text-muted" aria-live="polite">
          Showing <strong className="text-ink">{results.length}</strong> of {publications.length} publications · newest first
        </p>
        {results.length ? (
          <ul className="mt-4 space-y-3">
            {results.map((p) => (
              <PublicationRow key={p.slug} pub={p} />
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-3xl border border-dashed border-line bg-white p-10 text-center">
            <SearchX className="mx-auto size-10 text-muted" aria-hidden />
            <p className="mt-3 font-display text-2xl font-semibold text-forest-900">No publications found</p>
            <p className="mt-1 text-muted">Try a different word or clear the filters.</p>
            <button
              type="button"
              onClick={() => {
                setQ("");
                setType("");
                setLang("");
              }}
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-forest-900 px-5 text-sm font-bold text-cream"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
