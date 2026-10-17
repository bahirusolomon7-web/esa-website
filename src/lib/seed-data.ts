// National certified seed demand, supply and distribution.
// Source: ESA, "11 years seed data (2006/07 – 2016/17 EFY)", compiled from Ministry of Agriculture figures.
// Values in the source are in quintals (1 q = 100 kg); helpers below convert to tonnes for display.

export const SEED_DATA_SOURCE =
  "https://ethiopianseedassociation.wordpress.com/wp-content/uploads/2025/09/11years-seed-data-2006-07-20116-17-efy.xlsx";

export type YearRow = {
  year: number;
  efy: string;
  demand: number;
  supply: number;
  distribution: number;
};

// Quintals
const NATIONAL_Q: YearRow[] = [
  { year: 2014, efy: "2006/07", demand: 3139498, supply: 2036043, distribution: 1478082 },
  { year: 2015, efy: "2007/08", demand: 2176167, supply: 2176234, distribution: 2048356 },
  { year: 2016, efy: "2008/09", demand: 1886382, supply: 2140141, distribution: 1959805 },
  { year: 2017, efy: "2009/10", demand: 1815677, supply: 979841, distribution: 833336 },
  { year: 2018, efy: "2010/11", demand: 1261501, supply: 882769, distribution: 770334 },
  { year: 2019, efy: "2011/12", demand: 1163672, supply: 747534, distribution: 721487 },
  { year: 2020, efy: "2012/13", demand: 1401566, supply: 995461, distribution: 674996 },
  { year: 2021, efy: "2013/14", demand: 1761845, supply: 944672, distribution: 794528 },
  { year: 2022, efy: "2014/15", demand: 1836832, supply: 1116432, distribution: 948275 },
  { year: 2023, efy: "2015/16", demand: 2279234, supply: 800916, distribution: 649114 },
  // 2024 (2016/17 EFY): partial-season data as of 09-12-2017 EFY; supply = seed cleaned for planting
  { year: 2024, efy: "2016/17", demand: 2000000, supply: 1628835, distribution: 1144360 },
];

const t = (q: number) => Math.round(q / 10);

export const national = NATIONAL_Q.map((r) => ({
  ...r,
  label: `${r.year}`,
  demand: t(r.demand),
  supply: t(r.supply),
  distribution: t(r.distribution),
  fulfilment: Math.round((r.supply / r.demand) * 100),
}));

// Supply (quintals) of the main crops, 2014 → 2023
const CROP_SUPPLY_Q: Record<string, number[]> = {
  Wheat: [1162396, 1140844, 1260821, 549542, 436268, 371248, 427283, 454435, 630513, 362040],
  Maize: [378565, 242990, 305594, 295540, 324337, 280342, 449556, 339460, 322838, 339070],
  Barley: [176777, 284571, 150257, 41591, 36278, 49934, 42517, 56820, 42871, 23607],
  Teff: [127271, 226714, 151411, 46479, 21899, 21169, 42419, 18758, 40029, 4190],
  "Haricot bean": [64880, 76416, 39070, 28486, 48853, 19187, 16330, 53699, 35878, 26190],
};

export const CROP_KEYS = Object.keys(CROP_SUPPLY_Q);

export const cropTrend = NATIONAL_Q.slice(0, 10).map((r, i) => {
  const row: Record<string, number | string> = { label: `${r.year}` };
  for (const k of CROP_KEYS) row[k] = t(CROP_SUPPLY_Q[k][i]);
  return row;
});

// 2023 (2015/16 EFY) supply by crop, quintals
export const cropMix2023 = [
  { name: "Wheat", value: t(362040) },
  { name: "Maize", value: t(339070) },
  { name: "Rice", value: t(34222) },
  { name: "Haricot bean", value: t(26190) },
  { name: "Barley", value: t(23607) },
  { name: "Other crops", value: t(800916 - 362040 - 339070 - 34222 - 26190 - 23607) },
];

// 2023 demand vs supply for selected crops, quintals
export const cropGap2023 = [
  { crop: "Wheat", demand: t(957263), supply: t(362040) },
  { crop: "Maize", demand: t(941182), supply: t(339070) },
  { crop: "Barley", demand: t(153342), supply: t(23607) },
  { crop: "Haricot bean", demand: t(67226), supply: t(26190) },
  { crop: "Teff", demand: t(53474), supply: t(4190) },
  { crop: "Faba bean", demand: t(28280), supply: t(2939) },
];

// 2024 (2016/17 EFY) by region, quintals: demand, produced, distributed
export const regions2024 = [
  { region: "Oromia", demand: 1216895, produced: 1154723, distributed: 676404 },
  { region: "Amhara", demand: 202725, produced: 362090, distributed: 302125 },
  { region: "Central Ethiopia", demand: 126250, produced: 26232, distributed: 54241 },
  { region: "South Ethiopia", demand: 116184, produced: 19054, distributed: 46891 },
  { region: "South West Ethiopia", demand: 106665, produced: 0, distributed: 26719 },
  { region: "Gambella", demand: 92361, produced: 0, distributed: 2250 },
  { region: "Sidama", demand: 86262, produced: 31964, distributed: 27635 },
  { region: "Benishangul-Gumuz", demand: 35240, produced: 0, distributed: 4402 },
  { region: "Tigray", demand: 8676, produced: 2157, distributed: 3091 },
  { region: "Afar", demand: 7374, produced: 0, distributed: 120 },
  { region: "Addis Ababa", demand: 1369, produced: 0, distributed: 482 },
].map((r) => ({ ...r, demand: t(r.demand), produced: t(r.produced), distributed: t(r.distributed) }));

// 2024 seed produced by federal enterprises and companies, quintals
export const producers2024 = [
  { name: "Ethiopian Agricultural Businesses Corp.", value: t(366983) },
  { name: "Corteva (Pioneer)", value: t(64775) },
  { name: "Southern Seed Enterprise", value: t(35573) },
  { name: "Bayer", value: t(30000) },
  { name: "Bumper Harvest", value: t(5831) },
];

export const membershipGrowth = [
  { year: "2006", members: 8 },
  { year: "2015", members: 29 },
  { year: "2025", members: 60 },
];

export const fmtT = (n: number) =>
  n >= 1000 ? `${(n / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })}k t` : `${n} t`;
