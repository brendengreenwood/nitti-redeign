"use client";

import { useState, useSyncExternalStore } from "react";
import { COMPANY, BULK_PICKUP, EVENT_BOXES, ROLLOFF_SIZES } from "@/lib/data";

const TABS = [
  { key: "quote", label: "Request a Quote" },
  { key: "bulk-pickup", label: "Bulk Pickup" },
  { key: "event-boxes", label: "Event Boxes" },
  { key: "general", label: "General Inquiry" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// Hydration-safe URL-hash read for the initial tab (server renders no hash)
const subscribeHash = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
};
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

export default function ContactPage() {
  const [chosenTab, setChosenTab] = useState<TabKey | null>(null);

  const hash = useSyncExternalStore(subscribeHash, getHash, getServerHash);
  const hashTab = TABS.some((t) => t.key === hash) ? (hash as TabKey) : null;
  const activeTab = chosenTab ?? hashTab ?? "general";

  function switchTab(key: TabKey) {
    setChosenTab(key);
    window.history.replaceState(null, "", `#${key}`);
  }

  return (
    <>
      <section className="bg-charcoal px-4 py-14">
        <div className="mx-auto max-w-4xl text-center xl:max-w-5xl">
          <h1 className="font-slab text-3xl font-bold text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-3 text-gray-400">
            Quotes, pickup requests, event orders, or general questions.
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-gray-700 bg-charcoal-light p-6">
                <h2 className="mb-4 font-slab font-semibold text-white">
                  Get in Touch
                </h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="text-gold hover:text-gold-hover"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-white">Hours</p>
                    <p className="text-gray-400">{COMPANY.hours}</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Billing questions</p>
                    <a
                      href={`mailto:${COMPANY.email.billing}`}
                      className="text-gold hover:text-gold-hover"
                    >
                      {COMPANY.email.billing}
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      Service &amp; support
                    </p>
                    <a
                      href={`mailto:${COMPANY.email.support}`}
                      className="text-gold hover:text-gold-hover"
                    >
                      {COMPANY.email.support}
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-white">Office</p>
                    <p className="text-gray-400">
                      {COMPANY.address.street}
                      <br />
                      {COMPANY.address.city}, {COMPANY.address.state}{" "}
                      {COMPANY.address.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-6 flex flex-wrap gap-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => switchTab(tab.key)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "bg-gold text-charcoal"
                        : "border border-gray-600 text-gray-400 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "quote" && <QuoteForm />}
              {activeTab === "bulk-pickup" && <BulkPickupForm />}
              {activeTab === "event-boxes" && <EventBoxForm />}
              {activeTab === "general" && <GeneralForm />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function QuoteForm() {
  return (
    <FormCard title="Request a Quote" description="Commercial, multi-family, or roll-off dumpster inquiries. We respond within one business day.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input type="text" className="form-input" />
        </Field>
        <Field label="Email" required>
          <input type="email" className="form-input" />
        </Field>
        <Field label="Phone">
          <input type="tel" className="form-input" />
        </Field>
        <Field label="Business name">
          <input type="text" className="form-input" />
        </Field>
        <Field label="Address" required>
          <input type="text" className="form-input" />
        </Field>
        <Field label="City" required>
          <input type="text" className="form-input" />
        </Field>
      </div>
      <Field label="Property type">
        <select className="form-input">
          <option value="">Select type</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Multi-family / Apartment</option>
          <option>Construction / Renovation</option>
        </select>
      </Field>
      <Field label="Roll-off dumpster size (if applicable)">
        <select className="form-input">
          <option value="">Not applicable</option>
          {ROLLOFF_SIZES.map((s) => (
            <option key={s.yards} value={s.yards}>
              {s.yards} yard ({s.dimensions})
            </option>
          ))}
        </select>
      </Field>
      <Field label="Additional details">
        <textarea rows={3} className="form-input" placeholder="Tell us about your needs..." />
      </Field>
      <SubmitButton>Submit Quote Request</SubmitButton>
    </FormCard>
  );
}

function BulkPickupForm() {
  return (
    <FormCard
      title="Bulk Item Pickup"
      description={`Pickups are on ${BULK_PICKUP.pickupDay}s only. Submit by ${BULK_PICKUP.deadlineTime} ${BULK_PICKUP.deadlineDay}. Residential: $${BULK_PICKUP.residentialTripFee} trip fee. Commercial: $${BULK_PICKUP.commercialTripFee} trip fee.`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input type="text" className="form-input" />
        </Field>
        <Field label="Email" required>
          <input type="email" className="form-input" />
        </Field>
        <Field label="Phone">
          <input type="tel" className="form-input" />
        </Field>
        <Field label="Service address" required>
          <input type="text" className="form-input" />
        </Field>
        <Field label="City" required>
          <input type="text" className="form-input" />
        </Field>
        <Field label="Type">
          <select className="form-input">
            <option>Residential ($25 trip fee)</option>
            <option>Commercial ($35 trip fee)</option>
          </select>
        </Field>
      </div>
      <Field label="Items to pick up" required>
        <textarea
          rows={4}
          className="form-input"
          placeholder="List items and their location (e.g., 'Couch on front porch, mattress in driveway')"
        />
      </Field>
      <div className="rounded-lg border border-gold/30 bg-gold/10 p-3">
        <p className="text-xs text-gray-300">
          Items must be outside your building by {BULK_PICKUP.itemsOutBy} on{" "}
          {BULK_PICKUP.pickupDay}. Drivers cannot enter buildings. Appliances
          and electronics may be scheduled on a different day.
        </p>
      </div>
      <SubmitButton>Request Bulk Pickup</SubmitButton>
    </FormCard>
  );
}

function EventBoxForm() {
  return (
    <FormCard
      title="Order Event Boxes"
      description={`Boxes: $${EVENT_BOXES.boxPrice} + tax each (${EVENT_BOXES.boxDimensions}). Bag pickup: $${EVENT_BOXES.bagPickupPrice} + tax each. You provide your own 55-gallon bags.`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input type="text" className="form-input" />
        </Field>
        <Field label="Email" required>
          <input type="email" className="form-input" />
        </Field>
        <Field label="Phone">
          <input type="tel" className="form-input" />
        </Field>
        <Field label="Service address" required>
          <input type="text" className="form-input" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Number of boxes" required>
          <input type="number" min={1} className="form-input" placeholder="4" />
        </Field>
        <Field label="Event date">
          <input type="date" className="form-input" />
        </Field>
      </div>
      <div className="rounded-lg border border-gray-700 bg-charcoal-light p-3">
        <p className="text-xs font-medium text-gray-300">How many do I need?</p>
        <ul className="mt-1 space-y-0.5 text-xs text-gray-500">
          {EVENT_BOXES.estimates.map((e) => (
            <li key={e.guests}>
              {e.guests} guests: {e.boxes} boxes ({e.totalRange})
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-gray-500">
        Pick up boxes at our Rosemount office ({COMPANY.hours}). Bags are
        collected on your next regular trash day.
      </p>
      <SubmitButton>Order Boxes</SubmitButton>
    </FormCard>
  );
}

function GeneralForm() {
  return (
    <FormCard title="General Inquiry" description="Questions, feedback, or anything else.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input type="text" className="form-input" />
        </Field>
        <Field label="Email" required>
          <input type="email" className="form-input" />
        </Field>
      </div>
      <Field label="Message" required>
        <textarea rows={5} className="form-input" placeholder="How can we help?" />
      </Field>
      <SubmitButton>Send Message</SubmitButton>
    </FormCard>
  );
}

function FormCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-xl border border-gray-700 bg-charcoal-light p-6">
      <div>
        <h2 className="font-slab text-lg font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {children}
    </div>
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

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="w-full rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:bg-gold-hover sm:w-auto"
    >
      {children}
    </button>
  );
}
