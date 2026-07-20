export const COMPANY = {
  name: "Nitti Sanitation, Inc.",
  shortName: "Nitti Sanitation",
  phone: "651-457-7497",
  phoneLightning: "651-457-4434",
  email: {
    billing: "billingnitti@nittisanitation.com",
    support: "supportnitti@nittisanitation.com",
  },
  address: {
    street: "16555 Clayton Ave E",
    city: "Rosemount",
    state: "MN",
    zip: "55068",
  },
  hours: "Mon–Fri, 7:00 AM – 4:30 PM",
  founded: 1993,
  paymentPortalUrl:
    "https://secure.lightningdisposal.com/TruxWeb/login.aspx",
  lightningDisposalUrl: "https://lightningdisposal.com/",
} as const;

export type CityKey =
  | "apple-valley"
  | "burnsville"
  | "eagan"
  | "inver-grove-heights"
  | "lakeville"
  | "mendota-heights"
  | "rosemount"
  | "south-st-paul";

export interface CityInfo {
  name: string;
  key: CityKey;
  pickupDays: string[];
}

export const SERVICE_CITIES: CityInfo[] = [
  { name: "Apple Valley", key: "apple-valley", pickupDays: ["Monday", "Friday"] },
  { name: "Burnsville", key: "burnsville", pickupDays: ["Friday"] },
  { name: "Eagan", key: "eagan", pickupDays: ["Tuesday", "Thursday"] },
  {
    name: "Inver Grove Heights",
    key: "inver-grove-heights",
    pickupDays: ["Wednesday"],
  },
  { name: "Lakeville", key: "lakeville", pickupDays: ["Monday", "Thursday"] },
  { name: "Mendota Heights", key: "mendota-heights", pickupDays: ["Wednesday"] },
  { name: "Rosemount", key: "rosemount", pickupDays: ["Tuesday", "Thursday"] },
  {
    name: "South St. Paul",
    key: "south-st-paul",
    pickupDays: ["Wednesday"],
  },
];

export const HOLIDAYS: { name: string; date: string }[] = [
  { name: "New Year's Day", date: "2026-01-01" },
  { name: "Memorial Day", date: "2026-05-25" },
  { name: "Independence Day", date: "2026-07-04" },
  { name: "Labor Day", date: "2026-09-07" },
  { name: "Thanksgiving", date: "2026-11-26" },
  { name: "Christmas Day", date: "2026-12-25" },
];

export interface TrashPlan {
  gallons: number;
  count: number;
  pricePerMonth: number;
  label: string;
  popular?: boolean;
}

export const TRASH_PLANS: TrashPlan[] = [
  { gallons: 35, count: 1, pricePerMonth: 30, label: "35 Gallon" },
  {
    gallons: 65,
    count: 1,
    pricePerMonth: 33,
    label: "65 Gallon",
    popular: true,
  },
  { gallons: 95, count: 1, pricePerMonth: 35, label: "95 Gallon" },
  { gallons: 95, count: 2, pricePerMonth: 45, label: "2× 95 Gallon" },
];

export const YARD_WASTE = {
  seasonStart: "April 14",
  seasonEnd: "November 14",
  seasonalPlanPrice: 195,
  onCallBagPrice: 6,
  seasonalPlanDescription: "95-gallon cart + up to 10 compostable bags/week",
  onCallDescription: "Per-bag pickup, 24-hour advance notice required",
} as const;

export const BULK_PICKUP = {
  residentialTripFee: 25,
  commercialTripFee: 35,
  deadlineDay: "Wednesday",
  deadlineTime: "11:00 AM",
  pickupDay: "Thursday",
  itemsOutBy: "7:00 AM",
} as const;

export const EVENT_BOXES = {
  boxPrice: 9.75,
  bagPickupPrice: 6.0,
  boxDimensions: '30" × 18" × 18"',
  estimates: [
    { guests: "15–25", boxes: "2–3", totalRange: "$30–50" },
    { guests: "25–50", boxes: "4–5", totalRange: "$60–80" },
    { guests: "50–100", boxes: "6–10", totalRange: "$95–160" },
  ],
} as const;

export const ROLLOFF_SIZES = [
  {
    yards: 10,
    dimensions: "16' × 7.5' × 3'",
    bestFor: "Small bathroom remodel, garage cleanout, deck removal",
  },
  {
    yards: 20,
    dimensions: "20' × 7.5' × 4'",
    bestFor: "Kitchen remodel, large basement cleanout, roofing (up to 25 sq)",
  },
  {
    yards: 30,
    dimensions: "20' × 7.5' × 6'",
    bestFor: "Whole-house cleanout, new construction, major renovation",
  },
  {
    yards: 40,
    dimensions: "22' × 7.5' × 8'",
    bestFor: "Commercial construction, large demolition projects",
  },
] as const;

export const RECYCLING_ACCEPTED = [
  { category: "Paper & Cardboard", items: ["Junk mail & magazines", "Newspapers", "Phone books", "Paper bags", "Cereal, chips, cake & cracker boxes", "Pop, beer & tissue boxes", "Egg cartons", "Corrugated cardboard (broken down)"] },
  { category: "Metal", items: ["Aluminum cans", "Tin cans", "Steel cans"] },
  { category: "Glass", items: ["Food jars (brown, green, clear)", "Beverage bottles"] },
  { category: "Plastic (#1, #2, #5)", items: ["Soda, juice & water bottles", "Milk & juice jugs", "Margarine & cottage cheese tubs", "Laundry detergent bottles", "Clear berry & produce containers"] },
];

export const RECYCLING_REJECTED = [
  "Aerosol cans",
  "Plastic bags",
  "Styrofoam",
  "Pizza boxes",
  "Mirrors & lightbulbs",
  "Batteries",
  "Used paper plates",
  "Hoses, cords & chains",
  "Plastic toys",
  "Ceramics & porcelain",
  "Wrapping paper",
  "Black-colored plastic",
  "Diapers",
  "Food waste",
  "Yard waste",
];

export const YARD_WASTE_ACCEPTED = [
  "Grass & garden clippings",
  "Leaves",
  "Branches under 2\" diameter",
  "Pumpkins",
];

export const YARD_WASTE_REJECTED = [
  "Apples, dirt, mulch, sod",
  "Branches over 2\" diameter",
  "Stumps, logs & firewood",
  "Walnuts",
  "Flower pots",
  "Rocks & ash",
  "Personal containers",
];

export const TESTIMONIALS = [
  {
    quote:
      "Good pricing, friendly service, and they're LOCAL. They really go above and beyond — picked up garbage on a Sunday after an ice storm when other haulers skipped the whole weekend.",
    name: "Satisfied Customer",
    city: "Eagan",
    title: "Service You Can Count On",
  },
  {
    quote:
      "They are the best and go above and beyond. Whenever people complain about their trash company on Nextdoor, Nitti comes up as the place to switch to.",
    name: "Loyal Customer",
    city: "Apple Valley",
    title: "Recommended by Neighbors",
  },
  {
    quote:
      "Best price, reliable service, never a problem with extra bags. Office staff is great to work with — extra costs for special pickups are always reasonable.",
    name: "Long-time Customer",
    city: "Rosemount",
    title: "Best Price & Reliable",
  },
];

export interface BulkItem {
  key: string;
  label: string;
  emoji: string;
  /** Typical per-item charge estimate; office confirms final price. */
  typicalPrice: number;
}

export const BULK_ITEMS: BulkItem[] = [
  { key: "couch", label: "Couch / sofa", emoji: "🛋️", typicalPrice: 30 },
  { key: "mattress", label: "Mattress / box spring", emoji: "🛏️", typicalPrice: 25 },
  { key: "chair", label: "Recliner / big chair", emoji: "🪑", typicalPrice: 20 },
  { key: "appliance", label: "Appliance", emoji: "🧊", typicalPrice: 35 },
  { key: "tv", label: "TV / electronics", emoji: "📺", typicalPrice: 30 },
  { key: "grill", label: "Grill / patio stuff", emoji: "🔥", typicalPrice: 20 },
  { key: "playset", label: "Swing set / kid gear", emoji: "🛝", typicalPrice: 25 },
  { key: "carpet", label: "Rolled carpet / rug", emoji: "🧻", typicalPrice: 15 },
  { key: "other", label: "Something else", emoji: "📦", typicalPrice: 25 },
];

/**
 * Life-moment entry points: nobody wakes up wanting "bulk item pickup" —
 * something happened at home and now stuff has to go. Each moment maps to a
 * service with sensible prefills the user can adjust in the wizard.
 */
export interface LifeMoment {
  key: string;
  emoji: string;
  label: string;
  description: string;
  service: "yard" | "bulk";
  items?: Record<string, number>;
  bags?: number;
}

export const LIFE_MOMENTS: LifeMoment[] = [
  {
    key: "outgrown",
    emoji: "🧸",
    label: "The kids outgrew it",
    description: "Crib, bunk bed, swing set, ride-on everything",
    service: "bulk",
    items: { mattress: 1, playset: 1 },
  },
  {
    key: "new-furniture",
    emoji: "📦",
    label: "New couch is coming",
    description: "The old one needs to be gone before the delivery truck",
    service: "bulk",
    items: { couch: 1 },
  },
  {
    key: "yard-day",
    emoji: "🍂",
    label: "Yard day got out of hand",
    description: "A wall of bags lined up on the driveway",
    service: "yard",
    bags: 5,
  },
  {
    key: "appliance-died",
    emoji: "🧊",
    label: "An appliance gave up",
    description: "Fridge, washer, dryer — we haul it, doors off please",
    service: "bulk",
    items: { appliance: 1 },
  },
  {
    key: "mattress-upgrade",
    emoji: "🛏️",
    label: "Mattress upgrade",
    description: "The old one's been leaning on the guest room wall",
    service: "bulk",
    items: { mattress: 1 },
  },
  {
    key: "garage-purge",
    emoji: "🚗",
    label: "Garage purge weekend",
    description: "The pile that was “going to Goodwill” since 2023",
    service: "bulk",
    items: { other: 1 },
  },
];

/** Side-by-side answers for households comparison-shopping haulers. */
export interface ComparisonRow {
  feature: string;
  nitti: string;
  typical: string;
}

export const COMPARISON: ComparisonRow[] = [
  {
    feature: "65-gallon cart, monthly",
    nitti: "$33 — recycling included",
    typical: "$40–55, recycling extra",
  },
  {
    feature: "Contract",
    nitti: "None. Leave anytime",
    typical: "1–2 years + cancellation fee",
  },
  {
    feature: "Fuel & “environmental” fees",
    nitti: "None",
    typical: "$10–20 sneaks onto each invoice",
  },
  {
    feature: "Price after year one",
    nitti: "Same flat, published price",
    typical: "Intro rate, then it creeps",
  },
  {
    feature: "Who answers the phone",
    nitti: "A person in Rosemount",
    typical: "A national call tree",
  },
  {
    feature: "Big-item pickup",
    nitti: "Book from your phone, Thursdays",
    typical: "Call during business hours for a quote",
  },
];

/** Sample billing history shown in the My Nitti portal preview. */
export const SAMPLE_INVOICES = [
  { period: "May – June 2026", amount: 66, status: "Paid · autopay" },
  { period: "Bulk pickup — couch & mattress", amount: 55, status: "Paid" },
  { period: "March – April 2026", amount: 66, status: "Paid · autopay" },
  { period: "January – February 2026", amount: 66, status: "Paid · autopay" },
];

export const NAV_LINKS = [
  { label: "My Nitti", href: "/account" },
  { label: "Services", href: "/services" },
  { label: "Schedule", href: "/schedule" },
  { label: "Contact", href: "/contact" },
] as const;

export function getNextPickupDate(
  pickupDays: string[],
  fromDate: Date = new Date()
): Date {
  const dayMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const targetDayNumbers = pickupDays.map((d) => dayMap[d]);
  const currentDay = fromDate.getDay();
  let minDaysUntil = 7;

  for (const target of targetDayNumbers) {
    let daysUntil = target - currentDay;
    if (daysUntil <= 0) daysUntil += 7;
    if (daysUntil < minDaysUntil) minDaysUntil = daysUntil;
  }

  const nextDate = new Date(fromDate);
  nextDate.setDate(nextDate.getDate() + minDaysUntil);
  return nextDate;
}

/**
 * Bulk pickups run on Thursdays; requests must be in by Wednesday 11:00 AM.
 * Returns the next bookable Thursday plus the request deadline it depends on.
 */
export function getNextBulkPickupDate(fromDate: Date = new Date()): {
  pickupDate: Date;
  requestDeadline: Date;
} {
  const deadline = new Date(fromDate);
  const daysToWednesday = (3 - fromDate.getDay() + 7) % 7;
  deadline.setDate(deadline.getDate() + daysToWednesday);
  deadline.setHours(11, 0, 0, 0);
  if (deadline.getTime() <= fromDate.getTime()) {
    deadline.setDate(deadline.getDate() + 7);
  }
  const pickupDate = new Date(deadline);
  pickupDate.setDate(pickupDate.getDate() + 1);
  return { pickupDate, requestDeadline: deadline };
}

/** On-call yard waste bags need 24-hour notice before the regular pickup day. */
export function getNextYardWastePickupDate(
  pickupDays: string[],
  fromDate: Date = new Date()
): Date {
  const earliest = new Date(fromDate.getTime() + 24 * 60 * 60 * 1000);
  return getNextPickupDate(pickupDays, earliest);
}

/** Yard waste season runs April 14 – November 14. */
export function isYardWasteSeason(date: Date = new Date()): boolean {
  const year = date.getFullYear();
  const start = new Date(year, 3, 14);
  const end = new Date(year, 10, 14, 23, 59, 59);
  return date >= start && date <= end;
}

export function getUpcomingHoliday(
  withinDays: number = 7,
  fromDate: Date = new Date()
): (typeof HOLIDAYS)[number] | null {
  const from = fromDate.getTime();
  const cutoff = from + withinDays * 24 * 60 * 60 * 1000;

  for (const holiday of HOLIDAYS) {
    const hDate = new Date(holiday.date + "T00:00:00").getTime();
    if (hDate >= from && hDate <= cutoff) {
      return holiday;
    }
  }
  return null;
}
