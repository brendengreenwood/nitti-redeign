"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  COMPANY,
  SERVICE_CITIES,
  TRASH_PLANS,
  YARD_WASTE,
  getNextPickupDate,
  type CityKey,
} from "@/lib/data";
import { HOUSE_NAME_KEY } from "@/lib/bookings";
import {
  AUTOPAY_KEY,
  LOGIN_FLAG_KEY,
  PLAN_KEY,
  SESSION_KEY,
} from "@/lib/session";

const CITY_STORAGE_KEY = "nitti-selected-city";

const STEPS = ["Pitch", "Place", "Cart", "People", "Autopay"] as const;

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [city, setCity] = useState<CityKey | null>(null);
  const [address, setAddress] = useState("");
  const [houseName, setHouseName] = useState("");
  const [planLabel, setPlanLabel] = useState(
    TRASH_PLANS.find((p) => p.popular)?.label ?? TRASH_PLANS[0].label
  );
  const [yardWaste, setYardWaste] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("");
  const [autopayOn, setAutopayOn] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [done, setDone] = useState(false);

  const cityInfo = SERVICE_CITIES.find((c) => c.key === city);
  const plan = TRASH_PLANS.find((p) => p.label === planLabel) ?? TRASH_PLANS[0];
  const monthly =
    plan.pricePerMonth +
    (yardWaste ? Math.round(YARD_WASTE.seasonalPlanPrice / 12) : 0);

  const placeValid = city !== null && address.trim().length > 0;
  const peopleValid = name.trim().length > 0 && phone.trim().length >= 7;
  const cardDigits = cardNumber.replace(/\D/g, "");
  const autopayValid = !autopayOn || cardDigits.length >= 12;

  function finish() {
    if (!autopayValid) {
      setAttempted(true);
      return;
    }
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        ...(partnerPhone.trim() ? { partnerPhone: partnerPhone.trim() } : {}),
      })
    );
    localStorage.setItem(
      PLAN_KEY,
      JSON.stringify({ label: plan.label, pricePerMonth: monthly, yardWaste })
    );
    localStorage.setItem(
      AUTOPAY_KEY,
      JSON.stringify({
        enabled: autopayOn,
        last4: autopayOn ? cardDigits.slice(-4) : null,
      })
    );
    if (city) localStorage.setItem(CITY_STORAGE_KEY, city);
    if (houseName.trim())
      localStorage.setItem(HOUSE_NAME_KEY, houseName.trim());
    localStorage.setItem(LOGIN_FLAG_KEY, "1");
    setDone(true);
  }

  function goNext() {
    if (step === 1 && !placeValid) return setAttempted(true);
    if (step === 3 && !peopleValid) return setAttempted(true);
    if (step === 4) return finish();
    setAttempted(false);
    setStep(step + 1);
  }

  // ---------- Done ----------
  if (done) {
    const firstPickup = cityInfo ? getNextPickupDate(cityInfo.pickupDays) : null;
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <p className="text-5xl">🎉</p>
        <h1 className="mt-4 font-slab text-3xl font-bold text-white">
          Welcome home{houseName.trim() ? `, ${houseName.trim()}` : ""}.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-gray-400">
          You&apos;re set up in {cityInfo?.name}. Carts arrive within a week,
          and your pickup day is{" "}
          <span className="font-semibold text-white">
            {cityInfo?.pickupDays.join(" & ")}
          </span>
          {firstPickup && (
            <>
              {" "}
              — first eligible pickup{" "}
              <span className="font-semibold text-white">
                {firstPickup.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </>
          )}
          .
        </p>
        <div className="mt-4 rounded-xl bg-charcoal-light p-4 text-sm text-gray-400">
          {autopayOn ? (
            <>💳 Autopay is on — you&apos;ll never think about a due date.</>
          ) : (
            <>💳 Autopay is off — you can flip it on anytime in My Nitti.</>
          )}
          {partnerPhone.trim() && (
            <p className="mt-1">
              👫 Both of your numbers work — either of you can order pickups.
            </p>
          )}
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => router.push("/account")}
            className="rounded-xl bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover"
          >
            Open My Nitti
          </button>
          <Link
            href="/book"
            className="rounded-xl border border-gray-600 px-6 py-4 text-sm font-medium text-gray-300 hover:border-gold hover:text-gold"
          >
            Actually — there&apos;s already a couch to get rid of
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 pb-32 pt-6">
      {/* Progress */}
      <div className="mb-6 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <button
            key={label}
            onClick={() => i < step && setStep(i)}
            disabled={i > step}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-gold" : "bg-gray-700"
            }`}
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

      {/* Step 0: the problem pitch */}
      {step === 0 && (
        <div>
          <h1 className="font-slab text-3xl font-bold leading-tight text-white">
            You bought a house. 🥂
          </h1>
          <p className="mt-2 text-gray-400">
            Congrats — seriously, that&apos;s huge. Somewhere between the
            mortgage and the moving boxes, someone has to pick a trash company.
          </p>
          <div className="mt-5 space-y-3">
            {[
              ["📄", "The big guys want a 1–2 year contract before the boxes are even unpacked."],
              ["🕳️", "Then the “fuel & environmental fees” show up on invoice two."],
              ["☎️", "And when a pickup gets missed, you're arguing with a call tree."],
            ].map(([emoji, text]) => (
              <div
                key={text}
                className="flex items-start gap-3 rounded-xl bg-charcoal-light p-4"
              >
                <span className="text-xl">{emoji}</span>
                <p className="text-sm text-gray-300">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-gold/40 bg-gold/10 p-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">
                We&apos;re the local one.
              </span>{" "}
              Flat published prices, no contract, a person in{" "}
              {COMPANY.address.city} on the phone. Two minutes of setup, then it
              just&hellip; works.
            </p>
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">
            Already have service?{" "}
            <Link href="/login" className="font-medium text-gold">
              Log in
            </Link>
          </p>
        </div>
      )}

      {/* Step 1: the place */}
      {step === 1 && (
        <div>
          <h1 className="font-slab text-2xl font-bold text-white">
            Where&apos;s the new place?
          </h1>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {SERVICE_CITIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCity(c.key)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                  city === c.key
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gray-700 bg-charcoal-light text-gray-300 hover:border-gold"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street address"
            autoComplete="street-address"
            className="form-input mt-4 py-3"
          />
          <input
            type="text"
            value={houseName}
            onChange={(e) => setHouseName(e.target.value)}
            placeholder="Name your house — optional, but it's a big deal 🏡"
            maxLength={32}
            className="form-input mt-3 py-3"
          />
          {attempted && !placeValid && (
            <p className="mt-3 text-sm text-red-400">
              City and street address, please.
            </p>
          )}
        </div>
      )}

      {/* Step 2: pick the cart */}
      {step === 2 && (
        <div>
          <h1 className="font-slab text-2xl font-bold text-white">
            Pick your cart
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Recycling cart included with all of them. You can resize later.
          </p>
          <div className="mt-5 space-y-3">
            {TRASH_PLANS.map((p) => (
              <button
                key={p.label}
                onClick={() => setPlanLabel(p.label)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                  planLabel === p.label
                    ? "border-gold bg-gold/10"
                    : "border-gray-700 bg-charcoal-light hover:border-gray-500"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {p.label}
                    {p.popular && (
                      <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-charcoal">
                        MOST HOUSES
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {p.gallons === 35
                      ? "Couple, apartment habits"
                      : p.gallons === 65 && p.count === 1
                      ? "The family default"
                      : p.count === 2
                      ? "Big family, big output"
                      : "Diapers-and-everything stage"}
                  </span>
                </span>
                <span className="font-slab text-lg font-bold text-white">
                  ${p.pricePerMonth}
                  <span className="text-xs font-normal text-gray-500">/mo</span>
                </span>
              </button>
            ))}
          </div>
          <label className="mt-4 flex items-center justify-between rounded-xl border border-gray-700 bg-charcoal-light p-4">
            <span>
              <span className="block text-sm font-semibold text-white">
                🍂 Yard waste season pass
              </span>
              <span className="text-xs text-gray-500">
                {YARD_WASTE.seasonalPlanDescription} · ~$
                {Math.round(YARD_WASTE.seasonalPlanPrice / 12)}/mo
              </span>
            </span>
            <input
              type="checkbox"
              checked={yardWaste}
              onChange={(e) => setYardWaste(e.target.checked)}
              className="h-6 w-6 accent-[#f5a623]"
            />
          </label>
        </div>
      )}

      {/* Step 3: the household */}
      {step === 3 && (
        <div>
          <h1 className="font-slab text-2xl font-bold text-white">
            Who&apos;s on the account?
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            It&apos;s your house — both names work here.
          </p>
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
              placeholder="Your mobile — this is how you'll log in"
              autoComplete="tel"
              inputMode="tel"
              className="form-input py-3"
            />
            <input
              type="tel"
              value={partnerPhone}
              onChange={(e) => setPartnerPhone(e.target.value)}
              placeholder="Partner's mobile (optional)"
              inputMode="tel"
              className="form-input py-3"
            />
            <p className="rounded-lg bg-charcoal-light p-3 text-xs text-gray-500">
              👫 Add your partner and either of you can log in, order pickups,
              and see the bill. “Honey, handled” becomes a one-tap thing.
            </p>
          </div>
          {attempted && !peopleValid && (
            <p className="mt-3 text-sm text-red-400">
              Your name and mobile number, please.
            </p>
          )}
        </div>
      )}

      {/* Step 4: autopay */}
      {step === 4 && (
        <div>
          <h1 className="font-slab text-2xl font-bold text-white">
            Never think about a due date
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Bills land every two months. Autopay means they also leave on their
            own.
          </p>
          <label className="mt-5 flex items-center justify-between rounded-xl border border-gray-700 bg-charcoal-light p-4">
            <span className="text-sm font-semibold text-white">
              💳 Autopay {autopayOn ? "on" : "off"}
            </span>
            <input
              type="checkbox"
              checked={autopayOn}
              onChange={(e) => setAutopayOn(e.target.checked)}
              className="h-6 w-6 accent-[#f5a623]"
            />
          </label>
          {autopayOn ? (
            <>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card number"
                inputMode="numeric"
                autoComplete="cc-number"
                className="form-input mt-3 py-3"
              />
              <p className="mt-2 text-xs text-gray-600">
                Demo site — nothing is charged, and only the last 4 digits are
                kept.
              </p>
              {attempted && !autopayValid && (
                <p className="mt-2 text-sm text-red-400">
                  That card number looks short.
                </p>
              )}
            </>
          ) : (
            <p className="mt-3 rounded-lg bg-charcoal-light p-3 text-xs text-gray-500">
              No pressure — paper statements and the online portal still work.
              You can flip this on later in My Nitti.
            </p>
          )}
        </div>
      )}

      {/* Sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-800 bg-charcoal/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          {step >= 2 ? (
            <div>
              <p className="text-xs text-gray-500">Your monthly</p>
              <p className="text-lg font-bold text-white">${monthly}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-500">
              ~2 minutes · no contract, ever
            </p>
          )}
          <button
            onClick={goNext}
            className="flex-1 rounded-xl bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover active:scale-[0.98]"
          >
            {step === 0
              ? "Set Up My House"
              : step === 4
              ? "Finish Setup"
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
