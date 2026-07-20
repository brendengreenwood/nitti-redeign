"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import {
  BULK_ITEMS,
  BULK_PICKUP,
  COMPANY,
  LIFE_MOMENTS,
  SERVICE_CITIES,
  YARD_WASTE,
  getNextBulkPickupDate,
  getNextYardWastePickupDate,
  getUpcomingHoliday,
  isYardWasteSeason,
  type CityKey,
} from "@/lib/data";

const CITY_STORAGE_KEY = "nitti-selected-city";

type ServiceType = "yard" | "bulk";

const STEP_LABELS = ["What", "Where", "Details", "You"] as const;

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// All-day calendar event she can drop straight into the family calendar —
// the booking shouldn't have to live in her head until pickup day.
function calendarHref(date: Date, title: string, note: string): string {
  const fmt = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
      d.getDate()
    ).padStart(2, "0")}`;
  const dayAfter = new Date(date);
  dayAfter.setDate(dayAfter.getDate() + 1);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nitti Sanitation//Pickup//EN",
    "BEGIN:VEVENT",
    `UID:nitti-pickup-${fmt(date)}@nittisanitation.com`,
    `DTSTART;VALUE=DATE:${fmt(date)}`,
    `DTEND;VALUE=DATE:${fmt(dayAfter)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${note}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
}

// Read the remembered city (shared with the pickup-day finder) without a
// setState-in-effect: localStorage never changes underneath us in-page, so an
// empty subscription is enough for hydration-safe reads.
const emptySubscribe = () => () => {};
const getSavedCity = () => localStorage.getItem(CITY_STORAGE_KEY);
const getServerCity = () => null;

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("service");
  const urlMoment =
    LIFE_MOMENTS.find((m) => m.key === searchParams.get("moment")) ?? null;

  const initialService: ServiceType | null =
    urlMoment?.service ??
    (preselect === "yard" || preselect === "bulk" ? preselect : null);

  const [service, setService] = useState<ServiceType | null>(initialService);
  const [step, setStep] = useState(initialService ? 1 : 0);
  const [chosenMoment, setChosenMoment] = useState(urlMoment);
  const moment = chosenMoment;
  const [chosenCity, setChosenCity] = useState<CityKey | null>(null);
  const [bagCount, setBagCount] = useState(urlMoment?.bags ?? 3);
  const [items, setItems] = useState<Record<string, number>>(
    urlMoment?.items ? { ...urlMoment.items } : {}
  );
  const [otherNote, setOtherNote] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [textUpdates, setTextUpdates] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [attemptedNext, setAttemptedNext] = useState(false);

  const savedCity = useSyncExternalStore(
    emptySubscribe,
    getSavedCity,
    getServerCity
  );
  const city =
    chosenCity ??
    (SERVICE_CITIES.some((c) => c.key === savedCity)
      ? (savedCity as CityKey)
      : null);

  const cityInfo = SERVICE_CITIES.find((c) => c.key === city);

  const bulk = useMemo(() => getNextBulkPickupDate(), []);
  const yardDate = cityInfo
    ? getNextYardWastePickupDate(cityInfo.pickupDays)
    : null;
  const inSeason = isYardWasteSeason();
  const holiday = getUpcomingHoliday(7);

  const pickupDate = service === "bulk" ? bulk.pickupDate : yardDate;

  const itemCount = Object.values(items).reduce((a, b) => a + b, 0);
  const itemEstimate = Object.entries(items).reduce((sum, [key, qty]) => {
    const item = BULK_ITEMS.find((i) => i.key === key);
    return sum + (item ? item.typicalPrice * qty : 0);
  }, 0);
  const estimate =
    service === "yard"
      ? bagCount * YARD_WASTE.onCallBagPrice
      : BULK_PICKUP.residentialTripFee + itemEstimate;

  const detailsValid = service === "yard" ? bagCount > 0 : itemCount > 0;
  const contactValid =
    name.trim().length > 0 && phone.trim().length >= 7 && address.trim().length > 0;

  function toggleItem(key: string) {
    setItems((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = 1;
      return next;
    });
  }

  function bumpItem(key: string, delta: number) {
    setItems((prev) => {
      const qty = (prev[key] ?? 0) + delta;
      const next = { ...prev };
      if (qty <= 0) delete next[key];
      else next[key] = Math.min(qty, 6);
      return next;
    });
  }

  function selectCity(key: CityKey) {
    setChosenCity(key);
    localStorage.setItem(CITY_STORAGE_KEY, key);
    setStep(2);
  }

  function goNext() {
    if (step === 2 && !detailsValid) {
      setAttemptedNext(true);
      return;
    }
    if (step === 3) {
      if (!contactValid) {
        setAttemptedNext(true);
        return;
      }
      setSubmitted(true);
      return;
    }
    setAttemptedNext(false);
    setStep(step + 1);
  }

  // ---------- Confirmation ----------
  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-trust text-3xl">
          ✓
        </div>
        <h1 className="mt-5 font-slab text-3xl font-bold text-white">
          Done. That&apos;s one less thing.
        </h1>
        <p className="mt-3 text-gray-400">
          {service === "yard" ? (
            <>
              {bagCount} yard waste {bagCount === 1 ? "bag" : "bags"} in{" "}
              {cityInfo?.name}
            </>
          ) : (
            <>
              {itemCount} {itemCount === 1 ? "item" : "items"} in{" "}
              {cityInfo?.name}
            </>
          )}
          {pickupDate && (
            <>
              {" "}
              — pickup on{" "}
              <span className="font-semibold text-white">
                {formatDate(pickupDate)}
              </span>
            </>
          )}
          .
        </p>

        <div className="mt-6 rounded-xl bg-charcoal-light p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Before pickup day
          </p>
          <ul className="mt-2 space-y-2 text-sm text-gray-300">
            {service === "yard" ? (
              <>
                <li>🍂 Use compostable bags — no plastic</li>
                <li>🕕 Bags at the curb by 6:30 AM</li>
                <li>🚫 No dirt, sod, rocks, or branches over 2&quot;</li>
              </>
            ) : (
              <>
                <li>🕖 Items outside &amp; curb-accessible by {BULK_PICKUP.itemsOutBy}</li>
                <li>📱 We&apos;ll {textUpdates ? "text" : "call"} to confirm the final price</li>
                <li>❄️ Doors off fridges &amp; freezers, please</li>
              </>
            )}
          </ul>
        </div>

        {pickupDate && (
          <a
            href={calendarHref(
              pickupDate,
              service === "yard"
                ? "Nitti pickup — yard bags at curb by 6:30 AM"
                : `Nitti pickup — items at curb by ${BULK_PICKUP.itemsOutBy}`,
              `Estimated total $${estimate}. Questions? ${COMPANY.phone}`
            )}
            download="nitti-pickup.ics"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover sm:w-auto"
          >
            📅 Put it on the family calendar
          </a>
        )}

        <p className="mt-5 text-sm text-gray-500">
          Estimated total:{" "}
          <span className="font-semibold text-white">${estimate}</span>
          {service === "bulk" && " (office confirms exact per-item pricing)"}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Need to change something? Call{" "}
          <a href={`tel:${COMPANY.phone}`} className="font-medium text-gold">
            {COMPANY.phone}
          </a>
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg border border-gray-600 px-6 py-3 text-sm font-medium text-gray-300 hover:border-gold hover:text-gold"
        >
          Back to home
        </Link>
      </div>
    );
  }

  // ---------- Wizard ----------
  return (
    <div className="mx-auto max-w-lg px-4 pb-32 pt-6">
      {/* Progress */}
      <div className="mb-6 flex items-center gap-2">
        {STEP_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => i < step && setStep(i)}
            disabled={i > step}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-gold" : "bg-gray-700"
            } ${i < step ? "cursor-pointer" : ""}`}
            aria-label={`Step ${i + 1}: ${label}`}
          />
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mb-4 text-sm text-gray-400 hover:text-gold"
        >
          ← Back
        </button>
      )}

      {moment && step >= 1 && step <= 2 && (
        <div className="mb-5 flex items-start gap-3 rounded-xl bg-charcoal-light p-3">
          <span className="text-xl">{moment.emoji}</span>
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-white">{moment.label}.</span>{" "}
            We prefilled the usual suspects — adjust anything, no judgment.
          </p>
        </div>
      )}

      {/* Step 0: service */}
      {step === 0 && (
        <div>
          <h1 className="font-slab text-2xl font-bold text-white">
            What happened?
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Takes about a minute, whether it&apos;s 7 AM or way past bedtime.
          </p>

          <div className="mt-5 grid gap-2">
            {LIFE_MOMENTS.map((m) => (
              <button
                key={m.key}
                onClick={() => {
                  setService(m.service);
                  setChosenMoment(m);
                  if (m.items) setItems({ ...m.items });
                  if (m.bags) setBagCount(m.bags);
                  setStep(1);
                }}
                className="flex items-center gap-3 rounded-xl border border-gray-700 bg-charcoal-light px-4 py-3 text-left transition-colors hover:border-gold active:scale-[0.99]"
              >
                <span className="text-2xl">{m.emoji}</span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {m.label}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {m.description}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Or start from scratch
          </p>
          <div className="mt-3 grid gap-4">
            <button
              onClick={() => {
                setService("yard");
                setChosenMoment(null);
                setBagCount(3);
                setStep(1);
              }}
              className="rounded-2xl border border-gray-700 bg-charcoal-light p-5 text-left transition-colors hover:border-gold active:scale-[0.99]"
            >
              <span className="text-3xl">🍂</span>
              <p className="mt-2 font-slab text-lg font-semibold text-white">
                Yard waste bags
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Leaves, clippings, garden cleanup. ${YARD_WASTE.onCallBagPrice}
                /bag, picked up on your regular day.
              </p>
            </button>
            <button
              onClick={() => {
                setService("bulk");
                setChosenMoment(null);
                setItems({});
                setStep(1);
              }}
              className="rounded-2xl border border-gray-700 bg-charcoal-light p-5 text-left transition-colors hover:border-gold active:scale-[0.99]"
            >
              <span className="text-3xl">🛋️</span>
              <p className="mt-2 font-slab text-lg font-semibold text-white">
                Big stuff
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Couches, mattresses, appliances, the swing set nobody uses.
                Thursdays, ${BULK_PICKUP.residentialTripFee} trip fee + per
                item.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Step 1: city */}
      {step === 1 && (
        <div>
          <h1 className="font-slab text-2xl font-bold text-white">
            Where&apos;s home?
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            We&apos;ll figure out your pickup day for you.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {SERVICE_CITIES.map((c) => (
              <button
                key={c.key}
                onClick={() => selectCity(c.key)}
                className={`rounded-xl border px-3 py-4 text-sm font-medium transition-colors active:scale-[0.98] ${
                  city === c.key
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gray-700 bg-charcoal-light text-gray-300 hover:border-gold hover:text-gold"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Don&apos;t see your city? Call{" "}
            <a href={`tel:${COMPANY.phone}`} className="text-gold">
              {COMPANY.phone}
            </a>{" "}
            — we may still cover you.
          </p>
        </div>
      )}

      {/* Step 2: details */}
      {step === 2 && service === "yard" && (
        <div>
          <h1 className="font-slab text-2xl font-bold text-white">
            How many bags?
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Compostable bags only, ${YARD_WASTE.onCallBagPrice} each. Rough
            guess is fine — we count at the curb.
          </p>

          {!inSeason && (
            <div className="mt-4 rounded-lg border border-gold/40 bg-gold-light p-3 text-sm font-medium text-gray-800">
              ⚠️ Yard waste season is {YARD_WASTE.seasonStart} –{" "}
              {YARD_WASTE.seasonEnd}. You can still book — we&apos;ll schedule
              it for the start of the season.
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => setBagCount(Math.max(1, bagCount - 1))}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-600 text-2xl text-gray-300 active:scale-95"
              aria-label="Fewer bags"
            >
              −
            </button>
            <div className="w-24 text-center">
              <p className="text-5xl font-bold text-white">{bagCount}</p>
              <p className="mt-1 text-sm text-gray-400">
                {bagCount === 1 ? "bag" : "bags"}
              </p>
            </div>
            <button
              onClick={() => setBagCount(Math.min(20, bagCount + 1))}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-600 text-2xl text-gray-300 active:scale-95"
              aria-label="More bags"
            >
              +
            </button>
          </div>

          <div className="mt-8 rounded-xl bg-charcoal-light p-4 text-sm text-gray-400">
            <p>
              🍂 Doing this all season? The{" "}
              <span className="font-semibold text-white">
                seasonal cart plan
              </span>{" "}
              (${YARD_WASTE.seasonalPlanPrice}/season,{" "}
              {YARD_WASTE.seasonalPlanDescription.toLowerCase()}) usually pays
              for itself.{" "}
              <Link href="/sign-up" className="font-medium text-gold">
                Add it to your service →
              </Link>
            </p>
          </div>
        </div>
      )}

      {step === 2 && service === "bulk" && (
        <div>
          <h1 className="font-slab text-2xl font-bold text-white">
            What&apos;s going?
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Tap everything that applies. Prices are typical estimates — the
            office confirms before pickup.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {BULK_ITEMS.map((item) => {
              const qty = items[item.key] ?? 0;
              const selected = qty > 0;
              return (
                <div
                  key={item.key}
                  className={`rounded-xl border p-3 transition-colors ${
                    selected
                      ? "border-gold bg-gold/10"
                      : "border-gray-700 bg-charcoal-light"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.key)}
                    className="w-full text-left"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        selected ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      ~${item.typicalPrice} ea
                    </p>
                  </button>
                  {selected && (
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-charcoal px-2 py-1">
                      <button
                        onClick={() => bumpItem(item.key, -1)}
                        className="px-2 py-1 text-lg text-gray-300"
                        aria-label={`Fewer ${item.label}`}
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-white">
                        {qty}
                      </span>
                      <button
                        onClick={() => bumpItem(item.key, 1)}
                        className="px-2 py-1 text-lg text-gray-300"
                        aria-label={`More ${item.label}`}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {items.other && (
            <input
              type="text"
              value={otherNote}
              onChange={(e) => setOtherNote(e.target.value)}
              placeholder="Tell us what it is (e.g. trampoline frame)"
              className="form-input mt-4"
            />
          )}

          {attemptedNext && !detailsValid && (
            <p className="mt-3 text-sm text-red-400">
              Pick at least one item to continue.
            </p>
          )}

          {itemCount >= 6 && (
            <p className="mt-4 rounded-lg bg-charcoal-light p-3 text-sm text-gray-400">
              💡 That&apos;s a lot of stuff — a{" "}
              <Link href="/services#roll-off" className="font-medium text-gold">
                roll-off dumpster
              </Link>{" "}
              might be cheaper for a full cleanout.
            </p>
          )}
        </div>
      )}

      {/* Step 3: contact */}
      {step === 3 && (
        <div>
          <h1 className="font-slab text-2xl font-bold text-white">
            Almost done
          </h1>
          {pickupDate && (
            <div className="mt-4 rounded-xl border border-green-trust bg-green-trust/15 p-4">
              <p className="text-sm text-gray-300">
                {service === "yard" ? "🍂 Bags picked up" : "🛋️ Crew arrives"}{" "}
                <span className="font-semibold text-white">
                  {formatDate(pickupDate)}
                </span>
              </p>
              {service === "bulk" && (
                <p className="mt-1 text-xs text-gray-400">
                  Booking before {BULK_PICKUP.deadlineDay}{" "}
                  {BULK_PICKUP.deadlineTime} locks in this Thursday.
                </p>
              )}
              {holiday && (
                <p className="mt-1 text-xs text-gray-400">
                  ⚠️ {holiday.name} may push pickups back one day.
                </p>
              )}
            </div>
          )}

          <div className="mt-5 space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="form-input py-3"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number"
              autoComplete="tel"
              inputMode="tel"
              className="form-input py-3"
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`Street address, ${cityInfo?.name ?? "your city"}`}
              autoComplete="street-address"
              className="form-input py-3"
            />
            <label className="flex items-center gap-3 rounded-lg bg-charcoal-light p-3 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={textUpdates}
                onChange={(e) => setTextUpdates(e.target.checked)}
                className="h-5 w-5 accent-[#f5a623]"
              />
              Text me a reminder the night before 🙏
            </label>
          </div>

          {attemptedNext && !contactValid && (
            <p className="mt-3 text-sm text-red-400">
              Name, mobile number, and address — that&apos;s all we need.
            </p>
          )}
        </div>
      )}

      {/* Sticky bottom bar */}
      {step > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-800 bg-charcoal/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500">Estimate</p>
              <p className="text-lg font-bold text-white">
                ${estimate}
                {service === "bulk" && (
                  <span className="text-xs font-normal text-gray-500"> +/-</span>
                )}
              </p>
            </div>
            {step >= 2 && (
              <button
                onClick={goNext}
                className="flex-1 rounded-xl bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover active:scale-[0.98] disabled:opacity-40"
              >
                {step === 3 ? "Book it" : "Continue"}
              </button>
            )}
            {step === 1 && (
              <p className="flex-1 text-right text-sm text-gray-500">
                Pick your city to continue
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
