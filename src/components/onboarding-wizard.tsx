"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  SERVICE_CITIES,
  TRASH_PLANS,
  YARD_WASTE,
  getNextPickupDate,
  type CityKey,
} from "@/lib/data";
import { HOUSE_NAME_KEY } from "@/lib/bookings";
import Icon from "@/components/icons";
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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-trust">
          <Icon name="check" className="h-8 w-8 text-white" />
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase text-white">
          You&apos;re set up.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-gray-400">
          Carts arrive within a week. Pickup day in {cityInfo?.name}:{" "}
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
        <div className="mt-4 rounded bg-charcoal-light p-4 text-sm text-gray-400">
          {autopayOn ? (
            <>Autopay is on.</>
          ) : (
            <>Autopay is off — turn it on anytime in My Nitti.</>
          )}
          {partnerPhone.trim() && (
            <p className="mt-1">
              Both numbers can log in and order pickups.
            </p>
          )}
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => router.push("/account")}
            className="bg-gold px-6 py-4 font-display text-base font-semibold uppercase tracking-widest text-charcoal transition-colors hover:bg-gold-hover"
          >
            Open My Nitti
          </button>
          <Link
            href="/book"
            className="rounded border border-gray-600 px-6 py-4 text-sm font-medium text-gray-300 hover:border-gold hover:text-gold"
          >
            Book a pickup now
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
          <h1 className="font-display text-4xl font-bold uppercase leading-none text-white">
            Set up trash service.
          </h1>
          <p className="mt-2 text-gray-400">Two minutes.</p>
          <div className="mt-5 space-y-3">
            {[
              ["doc", "No contracts. Leave anytime."],
              ["card", "No fuel or environmental fees. The price is the price."],
              ["phone", "A person in Rosemount answers the phone."],
            ].map(([icon, text]) => (
              <div
                key={text}
                className="flex items-start gap-3 rounded bg-charcoal-light p-4"
              >
                <Icon name={icon} className="h-6 w-6 shrink-0 text-gold" />
                <p className="text-sm text-gray-300">{text}</p>
              </div>
            ))}
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
          <h1 className="font-display text-3xl font-bold uppercase text-white">
            Where&apos;s the new place?
          </h1>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {SERVICE_CITIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCity(c.key)}
                className={`rounded border px-3 py-3 text-sm font-medium transition-colors ${
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
            placeholder="House nickname (optional)"
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
          <h1 className="font-display text-3xl font-bold uppercase text-white">
            Pick your cart
          </h1>
          <p className="mt-1 text-sm text-gray-400">Recycling included.</p>
          <div className="mt-5 space-y-3">
            {TRASH_PLANS.map((p) => (
              <button
                key={p.label}
                onClick={() => setPlanLabel(p.label)}
                className={`flex w-full items-center justify-between rounded border p-4 text-left transition-colors ${
                  planLabel === p.label
                    ? "border-gold bg-gold/10"
                    : "border-gray-700 bg-charcoal-light hover:border-gray-500"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {p.label}
                    {p.popular && (
                      <span className="ml-2 bg-gold px-2 py-0.5 font-display text-[10px] font-bold tracking-widest text-charcoal">
                        POPULAR
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {p.gallons === 35
                      ? "1–2 people"
                      : p.gallons === 65 && p.count === 1
                      ? "Most popular size"
                      : p.count === 2
                      ? "Maximum capacity"
                      : "Large households"}
                  </span>
                </span>
                <span className="font-display text-lg font-bold text-white">
                  ${p.pricePerMonth}
                  <span className="text-xs font-normal text-gray-500">/mo</span>
                </span>
              </button>
            ))}
          </div>
          <label className="mt-4 flex items-center justify-between rounded border border-gray-700 bg-charcoal-light p-4">
            <span>
              <span className="block text-sm font-semibold text-white">
                Yard waste season pass
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
          <h1 className="font-display text-3xl font-bold uppercase text-white">
            Who&apos;s on the account?
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Second number optional — both can log in.
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
              placeholder="Your mobile (used to log in)"
              autoComplete="tel"
              inputMode="tel"
              className="form-input py-3"
            />
            <input
              type="tel"
              value={partnerPhone}
              onChange={(e) => setPartnerPhone(e.target.value)}
              placeholder="Second mobile (optional)"
              inputMode="tel"
              className="form-input py-3"
            />
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
          <h1 className="font-display text-3xl font-bold uppercase text-white">
            Autopay
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Billed every two months. Autopay is optional.
          </p>
          <label className="mt-5 flex items-center justify-between rounded border border-gray-700 bg-charcoal-light p-4">
            <span className="text-sm font-semibold text-white">
              Autopay {autopayOn ? "on" : "off"}
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
            <p className="mt-3 rounded bg-charcoal-light p-3 text-xs text-gray-500">
              Paper statements and the online portal still work. You can turn
              this on later in My Nitti.
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
              About 2 minutes
            </p>
          )}
          <button
            onClick={goNext}
            className="flex-1 bg-gold px-6 py-3.5 font-display text-base font-semibold uppercase tracking-widest text-charcoal transition-colors hover:bg-gold-hover active:scale-[0.98]"
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
