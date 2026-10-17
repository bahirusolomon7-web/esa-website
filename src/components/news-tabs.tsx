"use client";

import { useState } from "react";
import { news } from "@/lib/content";
import { NewsCard } from "./cards";

const tabs = ["All", "News", "Events"] as const;

export function NewsTabs() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const items = [...news]
    .filter((n) => tab === "All" || (tab === "News" ? n.kind === "News" : n.kind === "Event"))
    .sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = items;

  return (
    <div>
      <div role="tablist" aria-label="Filter news and events" className="inline-flex rounded-full border border-line bg-white p-1">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`min-h-11 rounded-full px-5 text-sm font-bold transition ${
              tab === t ? "bg-forest-900 text-cream" : "text-muted hover:text-ink"
            }`}
          >
            {t}
            <span className="ml-1.5 opacity-60">
              {t === "All" ? news.length : news.filter((n) => (t === "News" ? n.kind === "News" : n.kind === "Event")).length}
            </span>
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lead && (
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <NewsCard item={lead} featured />
          </div>
        )}
        {rest.map((n) => (
          <NewsCard key={n.slug} item={n} />
        ))}
      </div>
    </div>
  );
}
