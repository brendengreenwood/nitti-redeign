"use client";

import { useState } from "react";
import type { Metadata } from "next";
import {
  COMPANY,
  TRASH_PLANS,
  YARD_WASTE,
  SERVICE_CITIES,
} from "@/lib/data";

const STEPS = ["Location", "Services", "Preferences", "Review"] as const;

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  trashSize: string;
  recycleSize: string;
  yardWaste: string;
  autopay: string;
  statements: string;
  deliveryDay: string;
  startDate: string;
  promoCode: string;
  referralSource: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  trashSize: "65",
  recycleSize: "65",
  yardWaste: "none",
  autopay: "yes",
  statements: "email",
  deliveryDay: "",
  startDate: "",
  promoCode: "",
  referralSource: "",
};

const DELIVERY_SCHEDULE = [
  { day: "Monday", cities: "Lakeville, Apple Valley" },
  { day: "Tuesday", cities: "Eagan, Rosemount" },
  { day: "Wednesday", cities: "Inver Grove Heights, South St. Paul, Mendota Heights" },
  { day: "Thursday", cities: "Eagan, Rosemount, Lakeville" },
  { day: "Friday", cities: "Apple Valley, Burnsville" },
];

export default function SignUpPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const selectedPlan = TRASH_PLANS.find(
    (p) => String(p.gallons) === form.trashSize && (form.trashSize !== "95" || p.count === 1)
  );
  const monthlyEstimate =
    (selectedPlan?.pricePerMonth ?? 0) +
    (form.yardWaste === "seasonal"
      ? Math.round(YARD_WASTE.seasonalPlanPrice / 12)
      : 0);

  const selectedCity = SERVICE_CITIES.find(
    (c) => c.name === form.city
  );

  if (submitted) {
    return (
      <section className="px-4 py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-trust-light">
            <svg className="h-8 w-8 text-green-trust" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="font-slab text-2xl font-bold text-white">
            You&apos;re all set!
          </h1>
          <p className="mt-3 text-gray-400">
            We&apos;ll send a confirmation to <strong>{form.email}</strong>.
            Your cart will be delivered on your scheduled delivery day.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Questions? Call{" "}
            <a href={`tel:${COMPANY.phone}`} className="font-semibold text-gold">
              {COMPANY.phone}
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-charcoal px-4 py-10">
        <div className="mx-auto max-w-2xl text-center xl:max-w-3xl">
          <h1 className="font-slab text-3xl font-bold text-white">
            Sign Up for Service
          </h1>
          <p className="mt-2 text-gray-400">
            Weekly trash and recycling pickup. Cart delivered to your door.
          </p>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-2xl xl:max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    i <= step
                      ? "bg-gold text-charcoal"
                      : "bg-gray-700 text-gray-500"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`hidden text-sm sm:inline ${
                    i <= step ? "font-medium text-white" : "text-gray-400"
                  }`}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="ml-2 hidden h-px w-8 bg-gray-700 sm:block lg:w-16" />
                )}
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-lg border border-gold/20 bg-gold/10 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Estimated monthly cost</span>
              <span className="text-xl font-bold text-white">
                ~${monthlyEstimate}/mo
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Recycling included. Billed every two months.
            </p>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <Field label="Full name" required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="form-input"
                  placeholder="Jane Smith"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="form-input"
                  placeholder="jane@example.com"
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="form-input"
                  placeholder="(651) 555-1234"
                />
              </Field>
              <Field label="Service address" required>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="form-input"
                  placeholder="123 Main St"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City" required>
                  <select
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select city</option>
                    {SERVICE_CITIES.map((c) => (
                      <option key={c.key} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Zip" required>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) => update("zip", e.target.value)}
                    className="form-input"
                    placeholder="55068"
                  />
                </Field>
              </div>
              {selectedCity && (
                <div className="rounded-lg border border-gold/20 bg-gold/10 p-3">
                  <p className="text-sm text-gray-300">
                    Your pickup day{selectedCity.pickupDays.length > 1 ? "s" : ""} in {selectedCity.name}:{" "}
                    <strong>{selectedCity.pickupDays.join(" & ")}</strong>
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <Field label="Trash cart size" required>
                <div className="grid gap-3 sm:grid-cols-2">
                  {TRASH_PLANS.map((plan) => (
                    <label
                      key={plan.label}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                        form.trashSize === String(plan.gallons) &&
                        (plan.count === 1 || form.trashSize === "95x2")
                          ? "border-gold bg-gold/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="trashSize"
                        value={String(plan.gallons)}
                        checked={form.trashSize === String(plan.gallons)}
                        onChange={(e) => update("trashSize", e.target.value)}
                        className="accent-[#F5A623]"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {plan.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${plan.pricePerMonth}/mo
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Recycling cart">
                <p className="text-sm text-gray-400">
                  65-gallon cart included at no charge. Call us to upgrade to 95
                  gallons.
                </p>
              </Field>

              <Field label="Yard waste (seasonal, Apr–Nov)">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                      form.yardWaste === "none"
                        ? "border-gold bg-gold/10"
                        : "border-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="yardWaste"
                      value="none"
                      checked={form.yardWaste === "none"}
                      onChange={(e) => update("yardWaste", e.target.value)}
                      className="accent-[#F5A623]"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">No thanks</p>
                      <p className="text-xs text-gray-500">
                        On-call bags at $6/bag still available
                      </p>
                    </div>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                      form.yardWaste === "seasonal"
                        ? "border-gold bg-gold/10"
                        : "border-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="yardWaste"
                      value="seasonal"
                      checked={form.yardWaste === "seasonal"}
                      onChange={(e) => update("yardWaste", e.target.value)}
                      className="accent-[#F5A623]"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Seasonal plan — ${YARD_WASTE.seasonalPlanPrice}/yr
                      </p>
                      <p className="text-xs text-gray-500">
                        Cart + up to 10 bags/week
                      </p>
                    </div>
                  </label>
                </div>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Field label="Autopay">
                <div className="flex gap-4">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="autopay"
                        value={v}
                        checked={form.autopay === v}
                        onChange={(e) => update("autopay", e.target.value)}
                        className="accent-[#F5A623]"
                      />
                      <span className="text-sm text-gray-300 capitalize">
                        {v}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Statements">
                <div className="flex gap-4">
                  {[
                    { value: "email", label: "Email" },
                    { value: "print", label: "Printed" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="statements"
                        value={opt.value}
                        checked={form.statements === opt.value}
                        onChange={(e) => update("statements", e.target.value)}
                        className="accent-[#F5A623]"
                      />
                      <span className="text-sm text-gray-300">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Cart delivery day" required>
                <select
                  value={form.deliveryDay}
                  onChange={(e) => update("deliveryDay", e.target.value)}
                  className="form-input"
                >
                  <option value="">Select delivery day</option>
                  {DELIVERY_SCHEDULE.map((d) => (
                    <option key={d.day} value={d.day}>
                      {d.day} — {d.cities}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Preferred start date">
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => update("startDate", e.target.value)}
                  className="form-input"
                />
              </Field>

              <Field label="Promo code">
                <input
                  type="text"
                  value={form.promoCode}
                  onChange={(e) => update("promoCode", e.target.value)}
                  className="form-input"
                  placeholder="Optional"
                />
              </Field>

              <Field label="How did you hear about us?">
                <select
                  value={form.referralSource}
                  onChange={(e) => update("referralSource", e.target.value)}
                  className="form-input"
                >
                  <option value="">Select one</option>
                  <option>Neighbor/friend</option>
                  <option>Saw our truck</option>
                  <option>Google search</option>
                  <option>Nextdoor</option>
                  <option>Facebook</option>
                  <option>Door hanger/flyer</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-700 bg-charcoal-light p-6">
                <h3 className="mb-4 font-slab font-semibold text-white">
                  Review your information
                </h3>
                <dl className="space-y-2 text-sm">
                  <ReviewRow label="Name" value={form.name} />
                  <ReviewRow label="Email" value={form.email} />
                  <ReviewRow label="Phone" value={form.phone || "—"} />
                  <ReviewRow label="Address" value={`${form.address}, ${form.city}, MN ${form.zip}`} />
                  <ReviewRow label="Trash" value={selectedPlan?.label ?? form.trashSize} />
                  <ReviewRow label="Recycling" value="65 Gallon (included)" />
                  <ReviewRow
                    label="Yard Waste"
                    value={
                      form.yardWaste === "seasonal"
                        ? `Seasonal plan ($${YARD_WASTE.seasonalPlanPrice}/yr)`
                        : "None (on-call available)"
                    }
                  />
                  <ReviewRow label="Delivery day" value={form.deliveryDay || "—"} />
                  <ReviewRow label="Autopay" value={form.autopay === "yes" ? "Yes" : "No"} />
                  <ReviewRow label="Statements" value={form.statements === "email" ? "Email" : "Printed"} />
                </dl>
              </div>

              <div className="rounded-lg border border-gold/20 bg-gold/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">
                    Estimated monthly cost
                  </span>
                  <span className="text-xl font-bold text-white">
                    ~${monthlyEstimate}/mo
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                All services are weekly. Billing is bi-monthly (every two
                months). By submitting, you agree to start service at the
                selected address.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="rounded-lg border border-gray-600 px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-charcoal-light"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:bg-gold-hover"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:bg-gold-hover"
              >
                Start Service
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-800 py-1.5">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium text-white">{value}</dd>
    </div>
  );
}
