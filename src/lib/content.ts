// Site content. Facts are taken from ESA's public website (ethiopianseedassociation.wordpress.com)
// and partner sources, retrieved October 2026. Per requirement C1, each fact still needs sign-off
// in the Source-of-Truth Register before launch.

export const ESA_SITE = "https://ethiopianseedassociation.wordpress.com";
const UP = `${ESA_SITE}/wp-content/uploads`;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const org = {
  name: "Ethiopian Seed Association",
  acronym: "ESA",
  formerName: "Ethiopian Seed Growers and Processors Association (ESGPA)",
  founded: 2006,
  renamed: 2014,
  reorganised: 2008,
  afstaSince: 2005,
  members: 60,
  vision: "To be a leading association in promoting vibrant seed business for domestic and international markets.",
  mission:
    "Promote the interest of members by upholding high standards in seed business through advocacy, members' support, promotion of partnerships and ensuring business ethics and conduct, and thereby contributing to sustainable agricultural development.",
  values: [
    { letter: "S", word: "Support" },
    { letter: "E", word: "Excellence" },
    { letter: "E", word: "Ethical conduct" },
    { letter: "D", word: "Dynamism" },
    { letter: "S", word: "Synergy" },
  ],
  objectives: [
    "Provide a forum for information exchange and facilitate communication among members and seed chain actors.",
    "Represent the interest of members in national and international forums and promote partnership with relevant stakeholders.",
    "Upgrade knowledge and skills of members engaged in seed production, distribution and trade.",
    "Promote the use of high-quality improved seed and planting materials that conform to national and international standards.",
    "Promote high standards of business ethics and facilitate the settlement of disputes among members.",
    "Establish a transparent and equitable regulatory system for the seed industry through sustained dialogue with government.",
    "Promote harmonisation of seed policy, laws and regulation in the region through lobbying and dialogue.",
  ],
  services: [
    { title: "Members support", body: "Up-to-date information, member database access and contacts across the seed value chain." },
    { title: "Lobby and policy advocacy", body: "A single voice for members on seed law, regulation, EGS supply and counterfeit seed." },
    { title: "Capacity building", body: "Seminars, technical training, study tours and experience-sharing visits." },
    { title: "Partnerships and market linkage", body: "Links to research, regulators, processors, exporters and international seed bodies." },
  ],
  contact: {
    address: ["Bole Michael Church Building", "Bole Sub City, Woreda 1", "Addis Ababa, Ethiopia"],
    office: "+251 116 393 385",
    email: "ethiopianseedassociation@gmail.com",
  },
};

export const history = [
  { year: "2005", title: "Joins AFSTA", body: "ESA becomes a member of the African Seed Trade Association and later serves one term on its board." },
  { year: "2006", title: "Officially formed", body: "Established as the Ethiopian Seed Growers and Processors Association under Seed Proclamation No. 206/2000." },
  { year: "2008", title: "Reorganised as a trade association", body: "Restructured as a seed trade association with technical support from AFSTA." },
  { year: "2014", title: "Renamed ESA", body: "Becomes the Ethiopian Seed Association; by-laws revised to follow Seed Proclamation 782/2013." },
  { year: "2015", title: "29 members", body: "Membership grows from the 8 founding members to 29." },
  { year: "2024", title: "Second National Seed Forum", body: "Forum with ENSP produces a six-point position paper for the sector." },
  { year: "2025", title: "60 members", body: "Membership reaches 60 public, private, multinational and cooperative members." },
];

// ---------------------------------------------------------------- Leadership

export type Person = {
  slug: string;
  name: string;
  role: string;
  organisation?: string;
  group: "board" | "secretariat";
};

const person = (name: string, role: string, group: Person["group"], organisation?: string): Person => ({
  slug: slugify(name.replace(/^(Mr|Ms|Dr)\.?\s+/, "")),
  name,
  role,
  organisation,
  group,
});

export const board: Person[] = [
  person("Mr. Melaku Admasu", "Board Chairman", "board", "Pioneer Hybrid Seed Ethiopia PLC"),
  person("Dr. Tesfaye Kumsa", "Vice-Chairman", "board", "Anno Agro-Industry PLC"),
  person("Mr. Mekonen Gelaw", "Secretary", "board", "Bumper Harvest"),
  person("Mr. Zenebe Woldeselasie", "Auditor", "board", "Ethiopian Seed Enterprise"),
  person("Ms. Nolawit Shimelse", "Finance", "board", "Green Life"),
  person("Mr. Asefa Senbeta", "Board Member", "board", "Wama Private Seed Organization"),
  person("Mr. Yimam Tesema", "Board Member", "board", "Yimam Tesema Farm"),
];

export const secretariat: Person[] = [
  person("Mr. Dejene Jifar", "Secretariat Office Manager", "secretariat"),
];

export const secretariatRoles = [
  "Executive Director (seed business expert)",
  "Membership and Communication Officer",
  "Accountant",
  "Cashier",
];

export const people = [...board, ...secretariat];

// ---------------------------------------------------------------- Members

export type MemberType =
  | "Multinational company"
  | "National private producer"
  | "Seed and agro-input dealer"
  | "Vegetable seed importer"
  | "Public seed enterprise"
  | "Farmers' cooperative union";

export type SeedFocus = "Field crops" | "Vegetables" | "Forage" | "Agro-inputs";

export type Member = {
  slug: string;
  name: string;
  type: MemberType;
  region: string;
  location?: string;
  focus: SeedFocus;
  crops?: string[];
  image?: string;
  boardSeat?: string;
};

const m = (
  name: string,
  type: MemberType,
  region: string,
  extra: Partial<Omit<Member, "name" | "type" | "region" | "slug">> = {},
): Member => ({ slug: slugify(name), name, type, region, focus: "Field crops", ...extra });

export const members: Member[] = [
  m("Pioneer Hybrid Ethiopia PLC", "Multinational company", "National", { crops: ["Hybrid maize"], boardSeat: "Board Chairman" }),
  m("Bayer Crop Science PLC", "Multinational company", "National"),
  m("Bumper Harvest Seed Farm PLC", "Multinational company", "National", { image: "/images/members/bumper-harvest.jpg", boardSeat: "Secretary" }),
  m("Nunhems Ethiopia PLC", "Multinational company", "National", { focus: "Vegetables" }),

  m("Avallo International Research and Development PLC", "National private producer", "Amhara"),
  m("Bayhe Mekonnen Seed Producer Enterprise", "National private producer", "Amhara"),
  m("Ethio Agri-CEFT", "National private producer", "Amhara"),
  m("Nile Seed Enterprise", "National private producer", "Amhara"),
  m("Seid Hussen Pasture and Forage Seed Production Farm", "National private producer", "Amhara", { focus: "Forage" }),
  m("Yimam Tesema Farm", "National private producer", "Amhara", { boardSeat: "Board Member" }),
  m("AFRI Seed GPLC", "National private producer", "Amhara"),
  m("Tsega Tegegn Seed Grower", "National private producer", "Amhara"),
  m("Mandela Temesgen Seed Enterprise", "National private producer", "Amhara", { image: "/images/members/mandela.jpg" }),
  m("Awukamba Production and Selling of Plant Seed", "National private producer", "Amhara"),
  m("Bahir Dar Seed Enterprise", "National private producer", "Amhara", { location: "Bahir Dar" }),
  m("Abebaw and Demelew Seed Development Partnership", "National private producer", "Amhara"),
  m("Biniam Mulat Seed Enterprise", "National private producer", "Amhara", { crops: ["Hybrid maize"] }),
  m("Loma Enazemir PLC", "National private producer", "Amhara"),
  m("Yimam Tesema Seed Enterprise", "National private producer", "Amhara"),
  m("Enaget International", "National private producer", "Amhara"),
  m("Ayehu Zingini Farm PLC", "National private producer", "Amhara"),

  m("Amuari High Yield Varieties and Agricultural Product PLC", "National private producer", "Oromia"),
  m("Anno Agro-Industry PLC", "National private producer", "Oromia", { boardSeat: "Vice-Chairman" }),
  m("Gadissa Gobena Farm", "National private producer", "Oromia"),
  m("Fikremariam Fayisa Seed Producer", "National private producer", "Oromia"),
  m("Homa Seed PLC", "National private producer", "Oromia"),
  m("Nono Agricultural Development", "National private producer", "Oromia"),
  m("Taddesse Genna Farm", "National private producer", "Oromia"),
  m("Shayashone Trading PLC", "National private producer", "Oromia"),
  m("A/W/Adunya Seed Producer PLC", "National private producer", "Oromia"),
  m("Dembel Zer Abaze PLC", "National private producer", "Oromia"),
  m("ATM General Agriculture Work PLC", "National private producer", "Oromia"),
  m("Gudeta Gonfa Seed PLC", "National private producer", "Oromia"),
  m("Bale Green Spice and Grain Development PLC", "National private producer", "Oromia", { location: "Bale" }),

  m("Santen General Business PLC", "National private producer", "South Ethiopia", { location: "Basketo Zone", crops: ["Soybean", "Sorghum"], image: "/images/members/santen-soya.jpg" }),
  m("Mohammed Awel Oumer Farm", "National private producer", "Central Ethiopia", { location: "Walkite" }),
  m("Tsehay and Genet Farming Development PLC", "National private producer", "South Ethiopia", { location: "Halaba Zone" }),
  m("Zi-Andata", "National private producer", "South Ethiopia"),
  m("Hulume Crop Seed Multiplication and Marketing PLC", "National private producer", "Central Ethiopia", { location: "Durame" }),
  m("Borer Agricultural Development PLC", "National private producer", "Central Ethiopia", { location: "Walkite", image: "/images/members/borer.jpg" }),

  m("Deseta Berhe Farm", "National private producer", "Tigray"),
  m("Gashaw Redda Lema Mechanized Farm", "National private producer", "Tigray"),
  m("Tsegaye Hagos Farm", "National private producer", "Tigray"),
  m("ATM Trading PLC", "National private producer", "Tigray"),

  m("Markos PLC", "Seed and agro-input dealer", "Addis Ababa", { focus: "Agro-inputs" }),
  m("GWAT International Business PLC", "Seed and agro-input dealer", "Addis Ababa", { focus: "Agro-inputs" }),
  m("Kibran General Trading PLC", "Seed and agro-input dealer", "Addis Ababa", { focus: "Agro-inputs" }),
  m("Desta Berehe General Trading", "Seed and agro-input dealer", "Addis Ababa", { focus: "Agro-inputs" }),
  m("Chemtex PLC", "Seed and agro-input dealer", "Addis Ababa", { focus: "Agro-inputs" }),
  m("Getaneh General Business Trading", "Seed and agro-input dealer", "Addis Ababa", { focus: "Agro-inputs" }),

  m("Green Life Science", "Vegetable seed importer", "Addis Ababa", { focus: "Vegetables", boardSeat: "Finance" }),
  m("Masresha Minwuyelet Fruit and Vegetable", "Vegetable seed importer", "Addis Ababa", { focus: "Vegetables" }),

  m("Amhara Seed Enterprise", "Public seed enterprise", "Amhara"),
  m("Ethiopian Seed Enterprise", "Public seed enterprise", "National", { boardSeat: "Auditor" }),
  m("Oromia Seed Enterprise", "Public seed enterprise", "Oromia"),
  m("Southern Seed Enterprise", "Public seed enterprise", "South Ethiopia"),

  m("Meki-Batu Farmers Cooperatives Union", "Farmers' cooperative union", "Oromia", { location: "Meki" }),
  m("Burka Galeti Seed Multiplier Farmers Cooperative Union", "Farmers' cooperative union", "Oromia"),
];

export const memberTypes: MemberType[] = [
  "National private producer",
  "Multinational company",
  "Public seed enterprise",
  "Farmers' cooperative union",
  "Seed and agro-input dealer",
  "Vegetable seed importer",
];

export const regions = [...new Set(members.map((x) => x.region))].sort();
export const focuses: SeedFocus[] = ["Field crops", "Vegetables", "Forage", "Agro-inputs"];

export const typeBlurb: Record<MemberType, string> = {
  "Multinational company": "An international seed company operating in Ethiopia, bringing proprietary varieties and global breeding programmes to Ethiopian farmers.",
  "National private producer": "An Ethiopian private seed producer multiplying, processing and marketing certified seed of improved varieties.",
  "Seed and agro-input dealer": "A seed and agricultural-input trading company supplying seed, agrochemicals and inputs to farmers and cooperatives.",
  "Vegetable seed importer": "An importer and distributor of vegetable seed varieties for Ethiopian horticulture producers.",
  "Public seed enterprise": "A government seed enterprise producing and distributing certified seed of major crops at national or regional scale.",
  "Farmers' cooperative union": "A cooperative union whose member farmers multiply certified seed under contract for the formal seed system.",
};

// ---------------------------------------------------------------- News & events

export type NewsItem = {
  slug: string;
  kind: "News" | "Event";
  date: string; // ISO
  endDate?: string;
  title: string;
  place?: string;
  image: string;
  gallery?: string[];
  summary: string;
  body: string[];
  bullets?: string[];
  source: string;
};

export const news: NewsItem[] = [
  {
    slug: "eiar-invites-seed-multipliers-competitive-bid",
    kind: "News",
    date: "2026-03-31",
    title: "EIAR invites public and private seed multipliers to a competitive bid",
    image: "/images/news/variety-licensing.jpg",
    summary: "The Ethiopian Agricultural Research Institute has opened a competitive bid for public and private seed multipliers, with variety licensing terms attached.",
    body: [
      "The Ethiopian Agricultural Research Institute has invited public and private seed multipliers to take part in a competitive bid. The call is accompanied by a variety licensing document setting out the terms under which multipliers can access research varieties.",
      "ESA shared the call with members so that private companies can compete for access to new varieties alongside public enterprises.",
    ],
    source: `${ESA_SITE}/2026/03/31/ministry-of-agriculture-invited-public-and-private-seed-multipliers-for-competitive-bid/`,
  },
  {
    slug: "afsta-2026-congress-participation",
    kind: "Event",
    date: "2026-03-30",
    title: "ESA completes participation in the AFSTA 2026 Congress",
    place: "Cape Town, South Africa",
    image: "/images/news/afsta-meeting.jpg",
    summary: "ESA represented Ethiopian seed companies at the African Seed Trade Association's annual congress in South Africa.",
    body: [
      "ESA took part in the 2026 Congress of the African Seed Trade Association (AFSTA), the continent's main meeting point for seed companies, regulators and associations.",
      "ESA has been an AFSTA member since 2005 and has previously lobbied to bring the congress to Ethiopia.",
    ],
    source: `${ESA_SITE}/2026/03/30/afsta-2026-congress-participation-by-esa-was-successfully-completed/`,
  },
  {
    slug: "national-seed-forum-general-assembly-2026",
    kind: "Event",
    date: "2026-03-07",
    endDate: "2026-03-08",
    title: "National Seed Forum and General Assembly 2026",
    place: "Ministry of Agriculture meeting hall, Addis Ababa",
    image: "/images/news/seed-forum-2026.png",
    summary: "Two days on seed quality control, counterfeit seed, marketing and the sector's next steps, followed by ESA's General Assembly.",
    body: [
      "ESA's 2026 National Seed Forum brought members, regulators, researchers and partners together at the Ministry of Agriculture in Addis Ababa.",
      "Sessions covered seed quality control, counterfeit seed, seed marketing and future actions for the sector, along with crop potential and investment opportunities. The forum closed with ESA's General Assembly.",
      "The forum's priority issues and actionable recommendations are available in Publications.",
    ],
    source: `${ESA_SITE}/2026/03/09/ethiopian-national-seed-forum-and-general-assembly-held-on-march7-8-2026-at-moa-meeting-hall-addis-ababa-ethiopia/`,
  },
  {
    slug: "oil-crop-seed-production-workshop-asosa",
    kind: "Event",
    date: "2025-12-04",
    title: "Workshop on oil-crop seed production in Asosa",
    place: "Bamboo Paradise Hotel, Asosa, Benishangul-Gumuz",
    image: "/images/news/asosa-oilcrop-1.jpg",
    gallery: ["/images/news/asosa-oilcrop-1.jpg", "/images/news/asosa-oilcrop-2.jpg"],
    summary: "An awareness workshop on soybean seed production and contract farming schemes for farmers' cooperative unions.",
    body: [
      "ESA held an awareness-creation workshop on diversified crop seed production, with a focus on soybean seed and its market potential.",
      "Farmers' cooperative unions, private seed producers and government officials attended. With demand for oil crops rising, the workshop set out how contract farming schemes can link cooperative unions with seed producers, oilseed processors and exporters.",
      "Participants committed to working with ESA to establish these schemes in the region.",
    ],
    source: `${ESA_SITE}/2025/12/06/ethiopian-seed-association-esa-hosts-successful-workshop-on-oil-crop-seed-production/`,
  },
  {
    slug: "seed-business-management-training-haramaya",
    kind: "Event",
    date: "2025-11-18",
    endDate: "2025-11-28",
    title: "Seed Business Management Training for 18 member companies",
    place: "Haramaya University",
    image: "/images/news/haramaya-training.png",
    summary: "A ten-day course with the Ethiopian Seed Partnership covering everything from variety selection to seed law.",
    body: [
      "ESA and the Ethiopian Seed Partnership (ESP) ran a ten-day Seed Business Management Training at Haramaya University for 18 seed producer companies from across Ethiopia.",
      "The programme aims to strengthen members' capacity to produce high-quality seed and so contribute directly to food security.",
    ],
    bullets: [
      "Participatory variety selection, maintenance and community seed banks",
      "Seed processing of priority crops and warehouse management",
      "Seed quality analysis; national and international standards",
      "Seed business management and marketing strategies",
      "Ethiopian seed policies, laws and regulations",
    ],
    source: `${ESA_SITE}/2025/11/27/ethiopian-seed-association-esa-launches-seed-business-management-training/`,
  },
  {
    slug: "collaboration-discussion-brazil",
    kind: "News",
    date: "2025-10-27",
    title: "ESA board discusses collaboration with Brazil",
    image: "/images/news/brazil-embassy.jpg",
    summary: "Guests from the Brazilian Embassy met ESA's management board; a partnership with the Brazilian Seed Association was proposed.",
    body: [
      "ESA's management board hosted guests from the Brazilian Embassy to discuss collaboration between the two countries' seed sectors.",
      "A key outcome was a proposed partnership with the Brazilian Seed Association. The guests also invited ESA members to a Brazilian business exhibition at Millennium Hall, Addis Ababa, from 30 October 2025.",
    ],
    source: `${ESA_SITE}/2025/10/28/successful-collaboration-discussion-by-ethiopian-seed-association/`,
  },
  {
    slug: "pulses-seed-regulatory-workshop-2025",
    kind: "Event",
    date: "2025-07-03",
    title: "National workshop on seed regulatory frameworks and pulse seed production",
    place: "Desalegn Hotel, Addis Ababa",
    image: "/images/news/pulses-workshop-2025.jpg",
    summary: "With 2SCALE, ESA brought regulators, researchers and a cooperative union together on haricot bean seed and seed law.",
    body: [
      "ESA and the 2SCALE programme hosted a national workshop to raise awareness of seed regulatory frameworks and share knowledge on pulse seed production, protection and post-harvest management.",
      "A Melkasa Research Center researcher trained participants on agronomic practice for haricot bean seed. The Ethiopian Agricultural Authority briefed on recent seed regulations, directives and standards, and the Guna Seeds cooperative union from South Gondar shared its haricot bean experience.",
      "ESA also presented on the demand and supply gap in Ethiopia's seed market.",
    ],
    source: `${ESA_SITE}/2025/07/05/national-workshop-on-seed-regulatory-frameworks-and-pulses-seed-production-held-by-esa/`,
  },
  {
    slug: "afsta-board-visit-addis-2025",
    kind: "News",
    date: "2025-06-23",
    title: "AFSTA board visits ESA to discuss hosting the congress",
    place: "ESA office, Addis Ababa",
    image: "/images/news/afsta-meeting.jpg",
    summary: "The Kenya-based AFSTA board assessed ESA's readiness to host a future African seed congress.",
    body: [
      "The AFSTA board met ESA at its Addis Ababa office to evaluate the association's current status and potential as a congress host.",
      "ESA management set out its strong interest and capability to host the congress in Ethiopia.",
    ],
    source: `${ESA_SITE}/2025/06/24/esa-engages-with-afsta-board-to-discuss-hosting-congress/`,
  },
  {
    slug: "afsta-2025-congress-kigali",
    kind: "Event",
    date: "2025-03-03",
    endDate: "2025-03-05",
    title: "ESA at the AFSTA 2025 Congress in Kigali",
    place: "Kigali, Rwanda",
    image: "/images/members/field-2025.jpg",
    summary: "ESA met seed associations and companies from Zambia, Kenya, Korea, India, Singapore and Denmark.",
    body: [
      "Supported by the Ethiopian Seed Partnership, ESA management attended the AFSTA 2025 Congress in Kigali.",
      "ESA met the Zambian and Kenyan seed trade associations and companies including Joeun Seeds, Malav Seeds, Mahyco International and DLF Seeds, and took away lessons on resource mobilisation, membership growth and digital innovation.",
    ],
    source: "https://esp-seed.org/2025/03/10/ethiopian-seed-associations-participation-in-afsta-2025-congress-key-insights-and-take-aways/",
  },
  {
    slug: "second-national-seed-forum-2024",
    kind: "Event",
    date: "2024-05-09",
    title: "Second National Seed Forum sets six priorities for the sector",
    place: "Nexus Swiss Inn Hotel, Addis Ababa",
    image: "/images/news/forum-2024-1.jpg",
    gallery: ["/images/news/forum-2024-2.jpg", "/images/news/forum-2024-3.jpg", "/images/news/forum-2024-4.jpg"],
    summary: "Organised with the Ethiopia Netherlands Seed Partnership, the forum produced a six-point position paper.",
    body: [
      "ESA convened its second national seed forum with the Ethiopia Netherlands Seed Partnership (ENSP). Board chairman Melaku Admasu opened the day, and the forum was officially opened by the Ethiopian Agricultural Authority.",
      "Thematic sessions covered the new seed regulatory framework, access to finance, seed counterfeiting and Early Generation Seed (EGS) production and distribution.",
    ],
    bullets: [
      "Address illegal seed practices",
      "Implement and monitor new seed laws and regulations",
      "Resolve EGS supply and demand imbalances",
      "Expedite Plant Variety Protection regulations",
      "Prioritise financing for the seed sector",
      "Operationalise the new national seed data hub",
    ],
    source: `${ESA_SITE}/2024/05/16/advancing-ethiopias-seed-sector-highlights-from-the-second-national-seed-forum/`,
  },
  {
    slug: "stakeholder-engagement-workshop-2023",
    kind: "Event",
    date: "2023-11-21",
    title: "Stakeholder workshop tackles new seed policy and EGS supply",
    place: "Addis Ababa",
    image: "/images/news/stakeholder-2023.jpg",
    summary: "Members were briefed on the new seed policy, variety testing and early-generation seed access.",
    body: [
      "ESA and ENSP organised a stakeholder engagement workshop to raise awareness of the new seed policy, address input provision challenges and review the association's progress.",
      "The Ethiopian Agricultural Authority presented changes to variety testing (DUS and NPT) and the phasing out of old varieties. EIAR outlined its online system for EGS applications and opportunities for private companies to co-produce early-generation seed.",
    ],
    source: `${ESA_SITE}/2023/11/28/ethiopian-seed-associations-stakeholder-engagement-workshop-addresses-key-challenges-in-the-seed-sector/`,
  },
];

// ---------------------------------------------------------------- Publications

export type PubType = "Report" | "Policy and law" | "Governance" | "Manual" | "Dataset" | "Form";

export type Publication = {
  slug: string;
  title: string;
  type: PubType;
  year: number;
  language: string;
  bytes: number;
  format: "PDF" | "XLSX";
  url: string;
  summary: string;
  author?: string;
};

const pub = (p: Omit<Publication, "slug">): Publication => ({ slug: slugify(p.title), ...p });

export const publications: Publication[] = [
  pub({ title: "National Seed Forum 2026: Priority Issues and Actionable Recommendations", type: "Report", year: 2026, language: "English", bytes: 509410, format: "PDF", url: `${UP}/2026/04/esa-national-seed-forum-priority-issues-and-actionable-marchrecommendations.pdf`, summary: "Priority issues raised at the March 2026 forum with recommended actions for government and industry." }),
  pub({ title: "Member Companies Profile and National Seed Data 2024", type: "Report", year: 2025, language: "English", bytes: 2671596, format: "PDF", url: `${UP}/2025/09/some-of-ethiopian-seed-association-member-companies-profile-and-summarized-national-seed-data-of-2024.pdf`, summary: "Profiles of 24 member seed companies and producers, plus a summary of 2024 national seed data." }),
  pub({ title: "11 Years of National Seed Data (2006/07 – 2016/17 EFY)", type: "Dataset", year: 2025, language: "Amharic, English", bytes: 32839, format: "XLSX", url: `${UP}/2025/09/11years-seed-data-2006-07-20116-17-efy.xlsx`, summary: "Certified seed demand, supply and distribution by crop and region. Source of the charts on this site." }),
  pub({ title: "ESA Second National Seed Forum Position Paper", type: "Report", year: 2024, language: "English", bytes: 1217264, format: "PDF", url: `${UP}/2025/06/esa-second-national-seed-forum-position-paper-2.pdf`, summary: "Six-point position on illegal seed, regulation, EGS, PVP, finance and the seed data hub." }),
  pub({ title: "Membership Application Form", type: "Form", year: 2025, language: "English", bytes: 202358, format: "PDF", url: `${UP}/2025/06/membership_application_form_esa.pdf`, summary: "Fill, sign and email to ESA to apply for membership." }),
  pub({ title: "ESA Strategic Plan", type: "Governance", year: 2022, language: "English", bytes: 3144496, format: "PDF", url: `${UP}/2025/04/esa-sp-sep-2022m.pdf`, summary: "The association's strategic direction, priorities and targets." }),
  pub({ title: "ESA Updated By-law", type: "Governance", year: 2022, language: "English", bytes: 2231986, format: "PDF", url: `${UP}/2025/04/esa-updated-bylaw-08-sep-22m.pdf`, summary: "Rules on membership classes, the General Assembly, the Board and the Secretariat." }),
  pub({ title: "ESA Code of Ethics and Conduct", type: "Governance", year: 2022, language: "English", bytes: 3080941, format: "PDF", url: `${UP}/2025/04/esa-code-of-ethics-and-conducts-08-sep-22m.pdf`, summary: "Standards of business ethics that members commit to." }),
  pub({ title: "Ethiopian Seed Policy", type: "Policy and law", year: 2025, language: "English", bytes: 828390, format: "PDF", url: `${UP}/2025/04/ethiopian-seed-law-2.pdf`, summary: "National seed policy framework governing the seed sector." }),
  pub({ title: "Proclamation to Provide for Agricultural Production Contracts", type: "Policy and law", year: 2022, language: "Amharic, English", bytes: 357763, format: "PDF", url: `${UP}/2022/08/a-proclamation-to-provide-for-agricultural-production-contracts.pdf`, summary: "Legal basis for contract farming, including seed outgrower schemes." }),
  pub({ title: "Assessment of Policy Constraints to Private Seed Sector Development in Ethiopia", type: "Report", year: 2019, language: "English", bytes: 62786942, format: "PDF", url: `${UP}/2019/02/assement-of-policy-constraints-seed-sector-esa.pdf`, summary: "ESA study identifying the policy and regulatory barriers facing private seed companies." }),
  pub({ title: "Resilient Seed Systems Handbook", type: "Manual", year: 2019, language: "English", bytes: 3297187, format: "PDF", url: `${UP}/2022/04/resilient_seed_systems_handbook_2019.pdf`, summary: "Practical guide to building seed systems that withstand climate and market shocks.", author: "Bioversity International" }),
  pub({ title: "Seed Business Management in Africa", type: "Manual", year: 2009, language: "English", bytes: 2613855, format: "PDF", url: `${UP}/2022/04/seed-business-management-in-africa.pdf`, summary: "Reference text on running a seed company, from production planning to marketing.", author: "John F. MacRobert" }),
  pub({ title: "Resource Box for Seed Systems", type: "Manual", year: 2019, language: "English", bytes: 1375835, format: "PDF", url: `${UP}/2022/04/resource-box-for-seed-systems.pdf`, summary: "Curated tools and references for seed system practitioners." }),
  pub({ title: "Hybrid Maize Seed Production Manual", type: "Manual", year: 2015, language: "English", bytes: 4930735, format: "PDF", url: `${UP}/2015/05/hybrid-maize-seed-production-manual.pdf`, summary: "Field guide to producing quality hybrid maize seed." }),
  pub({ title: "Proceedings of the ESA Annual Conference 2014", type: "Report", year: 2014, language: "English", bytes: 2065219, format: "PDF", url: `${UP}/2015/03/esa-annual-onference-2014.pdf`, summary: "Papers and discussions from ESA's 2014 annual conference." }),
  pub({ title: "Awareness Workshop on Seed Law and Regulation", type: "Report", year: 2014, language: "English", bytes: 876422, format: "PDF", url: `${UP}/2015/03/awareness-froum.pdf`, summary: "Proceedings of the 29 July 2014 workshop in Addis Ababa on the new seed law." }),
];

export const pubTypes: PubType[] = ["Report", "Dataset", "Policy and law", "Governance", "Manual", "Form"];

export const fmtBytes = (b: number) =>
  b >= 1_000_000 ? `${(b / 1_000_000).toFixed(1)} MB` : `${Math.round(b / 1000)} KB`;

export const partners = [
  { name: "African Seed Trade Association", src: "/images/partners/afsta.jpg" },
  { name: "Ministry of Agriculture", src: "/images/partners/ministry-of-agriculture_50cm200dpi.png" },
  { name: "Ethiopian Institute of Agricultural Research", src: "/images/partners/eiar.jpg" },
  { name: "Ethiopia Netherlands Seed Partnership", src: "/images/partners/ensp-short_50cm_300dpi.png" },
  { name: "Wageningen University & Research", src: "/images/partners/wur_rgb_standard_2021-1.png" },
  { name: "FAO", src: "/images/partners/fao.png" },
  { name: "ICARDA", src: "/images/partners/icarda.png" },
  { name: "ASARECA", src: "/images/partners/asareca.jpg" },
];

export const nav = [
  { href: "/about", label: "About" },
  {
    href: "/leadership",
    label: "Leadership",
    children: [
      { href: "/leadership", label: "Leadership overview" },
      { href: "/leadership/structure", label: "Organisational structure" },
      { href: "/leadership/secretariat", label: "Secretariat team" },
    ],
  },
  {
    href: "/membership",
    label: "Membership",
    children: [
      { href: "/membership", label: "How to join" },
      { href: "/membership/directory", label: "Member directory" },
    ],
  },
  { href: "/news", label: "News & Events" },
  {
    href: "/publications",
    label: "Publications",
    children: [
      { href: "/publications", label: "All publications" },
      { href: "/publications/seed-data", label: "National seed data" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
