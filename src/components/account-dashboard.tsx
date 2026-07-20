"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  COMPANY,
  SAMPLE_INVOICES,
  SERVICE_CITIES,
  getNextPickupDate,
  getUpcomingHoliday,
  type CityKey,
} from "@/lib/data";
import {
  BOOKINGS_KEY,
  HOUSE_NAME_KEY,
  parseBookings,
  type StoredBooking,
} from "@/lib/bookings";
import {
  AUTOPAY_KEY,
  LOGIN_FLAG_KEY,
  PLAN_KEY,
  parseAutopay,
  parsePlan,
  parseSession,
  type Autopay,
} from "@/lib/session";

const CITY_STORAGE_KEY = "nitti-selected-city";

// Hydration-safe localStorage reads (server renders the logged-out shell,
// client fills in the household's data after hydration).
const emptySubscribe = () => () => {};
const getSavedCity = () => localStorage.getItem(CITY_STORAGE_KEY);
const getSavedHouseName = () => localStorage.getItem(HOUSE_NAME_KEY);
const getSavedBookings = () => localStorage.getItem(BOOKINGS_KEY);
const getSavedSession = () => localStorage.getItem("nitti-session");
const getLoginFlag = () => localStorage.getItem(LOGIN_FLAG_KEY);
const getSavedPlan = () => localStorage.getItem(PLAN_KEY);
const getSavedAutopay = () => localStorage.getItem(AUTOPAY_KEY);
const serverNull = () => null;

function formatDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function AccountDashboard() {
  // Session: the household record plus a separate logged-in flag, so logging
  // out never erases the household.
  const sessionRaw = useSyncExternalStore(emptySubscribe, getSavedSession, serverNull);
  const loginFlag = useSyncExternalStore(emptySubscribe, getLoginFlag, serverNull);
  const [loggedOut, setLoggedOut] = useState(false);
  const session =
    loggedOut || loginFlag !== "1" ? null : parseSession(sessionRaw);

  // Plan & autopay
  const planRaw = useSyncExternalStore(emptySubscribe, getSavedPlan, serverNull);
  const plan = parsePlan(planRaw);
  const autopayRaw = useSyncExternalStore(emptySubscribe, getSavedAutopay, serverNull);
  const [autopayOverride, setAutopayOverride] = useState<Autopay | null>(null);
  const autopay = autopayOverride ?? parseAutopay(autopayRaw);
  const [enablingAutopay, setEnablingAutopay] = useState(false);
  const [cardDraft, setCardDraft] = useState("");

  // City (shared with the finder & wizard)
  const savedCityRaw = useSyncExternalStore(emptySubscribe, getSavedCity, serverNull);
  const [chosenCity, setChosenCity] = useState<CityKey | null>(null);
  const city =
    chosenCity ??
    (SERVICE_CITIES.some((c) => c.key === savedCityRaw)
      ? (savedCityRaw as CityKey)
      : null);
  const cityInfo = SERVICE_CITIES.find((c) => c.key === city);

  // House nickname
  const savedHouseName = useSyncExternalStore(emptySubscribe, getSavedHouseName, serverNull);
  const [nameOverride, setNameOverride] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const houseName = nameOverride ?? savedHouseName;

  // Bookings made through the wizard
  const bookingsRaw = useSyncExternalStore(emptySubscribe, getSavedBookings, serverNull);
  const [bookingsOverride, setBookingsOverride] = useState<StoredBooking[] | null>(null);
  const bookings = bookingsOverride ?? parseBookings(bookingsRaw);

  const nextPickup = cityInfo ? getNextPickupDate(cityInfo.pickupDays) : null;
  const holiday = getUpcomingHoliday(7);
  const firstName = session?.name?.trim().split(/\s+/)[0] || null;

  function commitHouseName() {
    const trimmed = nameDraft.trim();
    if (trimmed) {
      localStorage.setItem(HOUSE_NAME_KEY, trimmed);
      setNameOverride(trimmed);
    }
    setEditingName(false);
  }

  function cancelBooking(id: string) {
    const next = bookings.filter((b) => b.id !== id);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
    setBookingsOverride(next);
  }

  function selectCity(key: CityKey) {
    setChosenCity(key);
    localStorage.setItem(CITY_STORAGE_KEY, key);
  }

  function enableAutopay() {
    const digits = cardDraft.replace(/\D/g, "");
    if (digits.length < 12) return;
    const next: Autopay = { enabled: true, last4: digits.slice(-4) };
    localStorage.setItem(AUTOPAY_KEY, JSON.stringify(next));
    setAutopayOverride(next);
    setEnablingAutopay(false);
    setCardDraft("");
  }

  function logOut() {
    localStorage.removeItem(LOGIN_FLAG_KEY);
    setLoggedOut(true);
  }

  // ---------- Logged out ----------
  if (!session) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16 text-center">
        <p className="text-4xl">🏡</p>
        <h1 className="mt-4 font-slab text-2xl font-bold text-white">
          My Nitti
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Trash day, pickups, and the bill — your whole house, one screen.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover"
          >
            Log In
          </Link>
          <Link
            href="/welcome"
            className="rounded-xl border border-gray-600 px-6 py-4 text-sm font-medium text-gray-300 hover:border-gold hover:text-gold"
          >
            New house? Set up service →
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Logged in ----------
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {/* Header / house name */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            My Nitti{firstName ? ` · hi, ${firstName}` : ""}
          </p>
          {editingName ? (
            <div className="mt-1 flex items-center gap-2">
              <input
                autoFocus
                type="text"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && commitHouseName()}
                placeholder="e.g. The Maple St House"
                className="form-input py-2"
                maxLength={32}
              />
              <button
                onClick={commitHouseName}
                className="rounded-lg bg-gold px-3 py-2 text-xs font-semibold text-charcoal"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setNameDraft(houseName ?? "");
                setEditingName(true);
              }}
              className="mt-0.5 text-left"
            >
              <h1 className="font-slab text-2xl font-bold text-white">
                {houseName ?? "Welcome home"} <span className="text-base">🏡</span>
              </h1>
              <span className="text-xs text-gray-500 underline decoration-dotted">
                {houseName ? "rename your house" : "first house? name it — it's a big deal"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Next pickup */}
      <div className="mt-6 rounded-2xl bg-charcoal-light p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Next trash day
        </p>
        {cityInfo && nextPickup ? (
          <>
            <p className="mt-1 font-slab text-xl font-semibold text-white">
              {formatDate(nextPickup)}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {cityInfo.name} · carts out by 6:30 AM
            </p>
            {holiday && (
              <p className="mt-2 rounded-lg border border-gold/40 bg-gold-light p-2 text-xs font-medium text-gray-800">
                ⚠️ {holiday.name} may delay pickups by one day.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="mt-1 text-sm text-gray-400">
              Tell us your city once and we&apos;ll keep track of trash day for
              you.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {SERVICE_CITIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => selectCity(c.key)}
                  className="rounded-lg border border-gray-700 bg-charcoal px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-gold hover:text-gold"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Current plan */}
      {plan && (
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-charcoal-light p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Your service
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {plan.label} cart · weekly
              {plan.yardWaste && " · 🍂 yard waste pass"}
            </p>
          </div>
          <p className="font-slab text-xl font-bold text-white">
            ${plan.pricePerMonth}
            <span className="text-xs font-normal text-gray-500">/mo</span>
          </p>
        </div>
      )}

      {/* Quick order — the "honey, can you add a pickup?" row */}
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Add to a pickup
      </p>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <Link
          href="/book?service=bulk"
          className="rounded-xl border border-gray-700 bg-charcoal-light p-4 transition-colors hover:border-gold active:scale-[0.99]"
        >
          <span className="text-2xl">🛋️</span>
          <p className="mt-1 text-sm font-semibold text-white">Big item</p>
          <p className="text-xs text-gray-500">Gone Thursday</p>
        </Link>
        <Link
          href="/book?service=yard"
          className="rounded-xl border border-gray-700 bg-charcoal-light p-4 transition-colors hover:border-gold active:scale-[0.99]"
        >
          <span className="text-2xl">🍂</span>
          <p className="mt-1 text-sm font-semibold text-white">Yard bags</p>
          <p className="text-xs text-gray-500">On your trash day</p>
        </Link>
      </div>

      {/* Upcoming ordered pickups */}
      {bookings.length > 0 && (
        <>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Ordered pickups
          </p>
          <div className="mt-2 space-y-2">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-green-trust bg-green-trust/15 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-white">
                    {b.service === "yard" ? "🍂" : "🛋️"} {b.summary}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(b.dateISO)} · {b.cityName} · est. ${b.estimate}
                  </p>
                </div>
                <button
                  onClick={() => cancelBooking(b.id)}
                  className="text-xs text-gray-500 hover:text-red-400"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Billing */}
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Billing
      </p>
      <div className="mt-2 rounded-2xl bg-charcoal-light p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Current balance</p>
            <p className="font-slab text-2xl font-bold text-white">$0.00</p>
          </div>
          {autopay?.enabled ? (
            <span className="rounded-full bg-green-trust px-3 py-1 text-xs font-semibold text-white">
              Autopay on{autopay.last4 ? ` · •••${autopay.last4}` : ""} ✓
            </span>
          ) : (
            <span className="rounded-full border border-gray-600 px-3 py-1 text-xs font-semibold text-gray-400">
              Autopay off
            </span>
          )}
        </div>

        {!autopay?.enabled &&
          (enablingAutopay ? (
            <div className="mt-3 flex gap-2">
              <input
                autoFocus
                type="text"
                value={cardDraft}
                onChange={(e) => setCardDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enableAutopay()}
                placeholder="Card number (demo — last 4 kept)"
                inputMode="numeric"
                className="form-input py-2.5"
              />
              <button
                onClick={enableAutopay}
                className="shrink-0 rounded-lg bg-gold px-4 py-2 text-xs font-semibold text-charcoal"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEnablingAutopay(true)}
              className="mt-3 w-full rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
            >
              Turn on autopay — stop tracking due dates
            </button>
          ))}

        <a
          href={COMPANY.paymentPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-xl bg-gold px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover"
        >
          Pay / Manage Billing
        </a>

        <div className="mt-4 border-t border-gray-700 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Receipts <span className="normal-case text-gray-600">(sample)</span>
          </p>
          <ul className="mt-2 divide-y divide-gray-800">
            {SAMPLE_INVOICES.map((inv) => (
              <li
                key={inv.period}
                className="flex items-center justify-between py-2.5"
              >
                <div>
                  <p className="text-sm text-gray-300">{inv.period}</p>
                  <p className="text-xs text-green-500">{inv.status}</p>
                </div>
                <p className="text-sm font-semibold text-white">
                  ${inv.amount}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Household */}
      {session.partnerPhone && (
        <p className="mt-4 rounded-xl bg-charcoal-light p-3 text-center text-xs text-gray-500">
          👫 Two adults on this account — either number logs in and can order
          pickups.
        </p>
      )}

      {/* Reliability note */}
      <div className="mt-6 rounded-2xl border border-gray-700 p-5 text-center">
        <p className="font-slab text-lg font-semibold text-white">
          Same trucks. Same phone number. Since {COMPANY.founded}.
        </p>
        <p className="mt-1 text-sm text-gray-400">
          If anything&apos;s ever off, a person in {COMPANY.address.city} picks
          up:{" "}
          <a href={`tel:${COMPANY.phone}`} className="font-medium text-gold">
            {COMPANY.phone}
          </a>
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-gray-600">
        <button onClick={logOut} className="underline hover:text-gray-400">
          Log out
        </button>
      </p>
    </div>
  );
}
