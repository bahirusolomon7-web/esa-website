"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import { BarChart3, Table2 } from "lucide-react";
import {
  CROP_KEYS,
  cropGap2023,
  cropMix2023,
  cropTrend,
  membershipGrowth,
  national,
  producers2024,
  regions2024,
} from "@/lib/seed-data";

// Categorical order validated for CVD separation (fixed order, never cycled)
export const CAT = ["#1f6b3a", "#d9a514", "#3a7fc1", "#c4542b", "#8e6bbf", "#8a948e"];
const GRID = "#e8e2d3";
const AXIS = { fontSize: 12, fill: "#55645b" };

const nf = (n: number) => n.toLocaleString("en-US");
const kt = (n: number) => (Math.abs(n) >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`);

function Tip({ active, payload, label, unit = "t" }: Partial<TooltipContentProps<number, string>> & { unit?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line bg-white/95 px-3.5 py-2.5 text-sm shadow-lg backdrop-blur">
      {label !== undefined && <p className="mb-1 font-bold text-ink">{label}</p>}
      <ul className="space-y-0.5">
        {payload.map((p) => (
          <li key={String(p.dataKey ?? p.name)} className="flex items-center gap-2 text-muted">
            <span className="size-2.5 rounded-full" style={{ background: (p.payload?.fill as string) ?? p.color }} />
            <span>{p.name}</span>
            <span className="ml-auto pl-4 font-semibold tabular-nums text-ink">
              {nf(Number(p.value))} {unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Col = { key: string; label: string; unit?: string };

export function ChartCard({
  title,
  subtitle,
  children,
  rows,
  cols,
  height = 320,
  dark,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  rows: Record<string, string | number>[];
  cols: Col[];
  height?: number;
  dark?: boolean;
}) {
  const [table, setTable] = useState(false);
  return (
    <figure
      className={`rounded-3xl border p-5 sm:p-7 ${
        dark ? "border-white/10 bg-white/[0.04] text-cream" : "border-line bg-white shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <figcaption>
          <p className={`font-display text-xl font-semibold ${dark ? "text-cream" : "text-forest-900"}`}>{title}</p>
          {subtitle && <p className={`mt-1 text-sm ${dark ? "text-cream/60" : "text-muted"}`}>{subtitle}</p>}
        </figcaption>
        <button
          type="button"
          onClick={() => setTable((v) => !v)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
            dark ? "border-white/20 hover:bg-white/10" : "border-line hover:bg-sand"
          }`}
          aria-pressed={table}
        >
          {table ? <BarChart3 className="size-3.5" aria-hidden /> : <Table2 className="size-3.5" aria-hidden />}
          {table ? "Chart" : "Table"}
        </button>
      </div>
      <div className="mt-5" style={{ minHeight: height }}>
        {table ? (
          <div className="max-h-[360px] overflow-auto rounded-xl border border-line text-ink">
            <table className="w-full bg-white text-left text-sm">
              <thead className="sticky top-0 bg-sand text-xs uppercase tracking-wide text-muted">
                <tr>
                  {cols.map((c) => (
                    <th key={c.key} scope="col" className="px-3 py-2 font-semibold">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-line">
                    {cols.map((c, j) => (
                      <td key={c.key} className={`px-3 py-2 ${j ? "tabular-nums" : "font-medium"}`}>
                        {typeof r[c.key] === "number" ? nf(r[c.key] as number) : r[c.key]}
                        {c.unit && typeof r[c.key] === "number" ? ` ${c.unit}` : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ height }} role="img" aria-label={`${title}. Use the Table button for the data.`}>
            {children}
          </div>
        )}
      </div>
    </figure>
  );
}

// --------------------------------------------------------------- National trend

export function SupplyDemandChart({ height = 340 }: { height?: number }) {
  return (
    <ChartCard
      title="Certified seed: demand vs supply"
      subtitle="National totals in tonnes, 2014–2024 (Gregorian; EFY in table)"
      rows={national.map((r) => ({ ...r, year: `${r.year} (${r.efy} EFY)` }))}
      cols={[
        { key: "year", label: "Year" },
        { key: "demand", label: "Demand", unit: "t" },
        { key: "supply", label: "Supply", unit: "t" },
        { key: "distribution", label: "Distributed", unit: "t" },
      ]}
      height={height}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={national} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="gSupply" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CAT[0]} stopOpacity={0.35} />
              <stop offset="100%" stopColor={CAT[0]} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="label" tick={AXIS} tickLine={false} axisLine={{ stroke: GRID }} />
          <YAxis tick={AXIS} tickLine={false} axisLine={false} tickFormatter={kt} />
          <Tooltip content={<Tip />} cursor={{ stroke: "#14211a", strokeOpacity: 0.2 }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
          <Area type="monotone" dataKey="supply" name="Supply" stroke={CAT[0]} strokeWidth={2.5} fill="url(#gSupply)" activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
          <Line type="monotone" dataKey="demand" name="Demand" stroke={CAT[1]} strokeWidth={2.5} strokeDasharray="6 4" dot={false} activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
          <Line type="monotone" dataKey="distribution" name="Distributed" stroke={CAT[2]} strokeWidth={2} dot={false} activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function FulfilmentChart() {
  return (
    <ChartCard
      title="Share of demand met"
      subtitle="Supply as % of demand each year"
      rows={national.map((r) => ({ year: r.label, fulfilment: r.fulfilment }))}
      cols={[
        { key: "year", label: "Year" },
        { key: "fulfilment", label: "Demand met", unit: "%" },
      ]}
      height={260}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={national} margin={{ top: 18, right: 4, left: -24, bottom: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="label" tick={AXIS} tickLine={false} axisLine={{ stroke: GRID }} interval={0} tickFormatter={(v) => `'${String(v).slice(2)}`} />
          <YAxis tick={AXIS} tickLine={false} axisLine={false} unit="%" domain={[0, 120]} ticks={[0, 50, 100]} />
          <Tooltip content={<Tip unit="%" />} cursor={{ fill: "#14211a", fillOpacity: 0.04 }} />
          <Bar dataKey="fulfilment" name="Demand met" radius={[4, 4, 0, 0]} maxBarSize={28}>
            {national.map((r) => (
              <Cell key={r.year} fill={r.fulfilment >= 100 ? CAT[0] : r.fulfilment >= 60 ? "#4cb86a" : CAT[3]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// --------------------------------------------------------------- Crops

export function CropTrendChart() {
  return (
    <ChartCard
      title="Supply of major crops"
      subtitle="Certified seed supplied, tonnes, 2014–2023"
      rows={cropTrend}
      cols={[{ key: "label", label: "Year" }, ...CROP_KEYS.map((k) => ({ key: k, label: k, unit: "t" }))]}
      height={320}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={cropTrend} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="label" tick={AXIS} tickLine={false} axisLine={{ stroke: GRID }} />
          <YAxis tick={AXIS} tickLine={false} axisLine={false} tickFormatter={kt} />
          <Tooltip content={<Tip />} cursor={{ stroke: "#14211a", strokeOpacity: 0.2 }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
          {CROP_KEYS.map((k, i) => (
            <Line key={k} type="monotone" dataKey={k} stroke={CAT[i]} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function CropMixChart() {
  const total = cropMix2023.reduce((a, b) => a + b.value, 0);
  return (
    <ChartCard
      title="2023 supply by crop"
      subtitle={`${total.toLocaleString("en-US")} tonnes of certified seed`}
      rows={cropMix2023.map((c) => ({ crop: c.name, tonnes: c.value, share: Math.round((c.value / total) * 100) }))}
      cols={[
        { key: "crop", label: "Crop" },
        { key: "tonnes", label: "Supplied", unit: "t" },
        { key: "share", label: "Share", unit: "%" },
      ]}
      height={300}
    >
      <div className="grid h-full grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_1fr]">
        <div className="relative h-[200px] sm:h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={cropMix2023} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="95%" paddingAngle={1.5} stroke="#fff" strokeWidth={2} cornerRadius={4}>
                {cropMix2023.map((c, i) => (
                  <Cell key={c.name} fill={CAT[i]} />
                ))}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-semibold text-forest-900">
              {Math.round(((cropMix2023[0].value + cropMix2023[1].value) / total) * 100)}%
            </span>
            <span className="text-xs text-muted">wheat + maize</span>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          {cropMix2023.map((c, i) => (
            <li key={c.name} className="flex items-center gap-2.5">
              <span className="size-3 rounded-full" style={{ background: CAT[i] }} />
              <span className="text-ink">{c.name}</span>
              <span className="ml-auto tabular-nums text-muted">{Math.round((c.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}

export function CropGapChart() {
  return (
    <ChartCard
      title="The seed gap by crop, 2023"
      subtitle="Demand vs certified seed supplied, tonnes"
      rows={cropGap2023.map((c) => ({ ...c, met: Math.round((c.supply / c.demand) * 100) }))}
      cols={[
        { key: "crop", label: "Crop" },
        { key: "demand", label: "Demand", unit: "t" },
        { key: "supply", label: "Supply", unit: "t" },
        { key: "met", label: "Met", unit: "%" },
      ]}
      height={320}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={cropGap2023} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }} barGap={2}>
          <CartesianGrid stroke={GRID} horizontal={false} />
          <XAxis type="number" tick={AXIS} tickLine={false} axisLine={false} tickFormatter={kt} />
          <YAxis type="category" dataKey="crop" tick={AXIS} tickLine={false} axisLine={false} width={92} />
          <Tooltip content={<Tip />} cursor={{ fill: "#14211a", fillOpacity: 0.04 }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
          <Bar dataKey="demand" name="Demand" fill={CAT[1]} radius={[0, 4, 4, 0]} maxBarSize={14} />
          <Bar dataKey="supply" name="Supply" fill={CAT[0]} radius={[0, 4, 4, 0]} maxBarSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// --------------------------------------------------------------- Regions & producers

export function RegionChart() {
  return (
    <ChartCard
      title="Regions, 2024 season"
      subtitle="Seed demand, production and distribution by region, tonnes"
      rows={regions2024}
      cols={[
        { key: "region", label: "Region" },
        { key: "demand", label: "Demand", unit: "t" },
        { key: "produced", label: "Produced", unit: "t" },
        { key: "distributed", label: "Distributed", unit: "t" },
      ]}
      height={420}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={regions2024} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }} barGap={2}>
          <CartesianGrid stroke={GRID} horizontal={false} />
          <XAxis type="number" tick={AXIS} tickLine={false} axisLine={false} tickFormatter={kt} />
          <YAxis type="category" dataKey="region" tick={AXIS} tickLine={false} axisLine={false} width={128} interval={0} />
          <Tooltip content={<Tip />} cursor={{ fill: "#14211a", fillOpacity: 0.04 }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
          <Bar dataKey="demand" name="Demand" fill={CAT[1]} radius={[0, 4, 4, 0]} maxBarSize={10} />
          <Bar dataKey="produced" name="Produced" fill={CAT[0]} radius={[0, 4, 4, 0]} maxBarSize={10} />
          <Bar dataKey="distributed" name="Distributed" fill={CAT[2]} radius={[0, 4, 4, 0]} maxBarSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ProducersChart() {
  return (
    <ChartCard
      title="Federal enterprises and companies, 2024"
      subtitle="Seed harvested by producers reported outside regional totals, tonnes"
      rows={producers2024.map((p) => ({ producer: p.name, tonnes: p.value }))}
      cols={[
        { key: "producer", label: "Producer" },
        { key: "tonnes", label: "Produced", unit: "t" },
      ]}
      height={260}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={producers2024} layout="vertical" margin={{ top: 0, right: 48, left: 8, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" tick={AXIS} tickLine={false} axisLine={false} width={170} interval={0} />
          <Tooltip content={<Tip />} cursor={{ fill: "#14211a", fillOpacity: 0.04 }} />
          <Bar
            dataKey="value"
            name="Produced"
            fill={CAT[0]}
            radius={[0, 4, 4, 0]}
            maxBarSize={22}
            label={{ position: "right", fontSize: 12, fill: "#14211a", formatter: (v: unknown) => nf(Number(v)) }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// --------------------------------------------------------------- Membership

export function MembershipGrowthChart({ dark }: { dark?: boolean }) {
  return (
    <ChartCard
      dark={dark}
      title="Membership growth"
      subtitle="Members in good standing"
      rows={membershipGrowth}
      cols={[
        { key: "year", label: "Year" },
        { key: "members", label: "Members" },
      ]}
      height={240}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={membershipGrowth} margin={{ top: 24, right: 8, left: -28, bottom: 0 }}>
          <XAxis dataKey="year" tick={{ ...AXIS, fill: dark ? "#faf7efaa" : AXIS.fill }} tickLine={false} axisLine={false} />
          <YAxis hide domain={[0, 70]} />
          <Tooltip content={<Tip unit="members" />} cursor={{ fill: "#ffffff", fillOpacity: 0.05 }} />
          <Bar
            dataKey="members"
            name="Members"
            fill={CAT[1]}
            radius={[6, 6, 0, 0]}
            maxBarSize={64}
            label={{ position: "top", fontSize: 14, fontWeight: 700, fill: dark ? "#faf7ef" : "#14211a" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function MemberTypeChart({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <ChartCard
      title="Who our members are"
      subtitle={`${total} listed members by type`}
      rows={data.map((d) => ({ type: d.name, members: d.value }))}
      cols={[
        { key: "type", label: "Type" },
        { key: "members", label: "Members" },
      ]}
      height={280}
    >
      <div className="grid h-full grid-cols-1 items-center gap-4 sm:grid-cols-2">
        <div className="h-[200px] sm:h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="95%" paddingAngle={1.5} stroke="#fff" strokeWidth={2} cornerRadius={4}>
                {data.map((d, i) => (
                  <Cell key={d.name} fill={CAT[i]} />
                ))}
              </Pie>
              <Tooltip content={<Tip unit="" />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-2 text-sm">
          {data.map((d, i) => (
            <li key={d.name} className="flex items-center gap-2.5">
              <span className="size-3 shrink-0 rounded-full" style={{ background: CAT[i] }} />
              <span className="text-ink">{d.name}</span>
              <span className="ml-auto pl-2 font-semibold tabular-nums text-ink">{d.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}
