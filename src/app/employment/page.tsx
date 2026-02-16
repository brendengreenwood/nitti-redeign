import type { Metadata } from "next";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Employment",
  description:
    "Join the Nitti Sanitation team. We're looking for experienced drivers in the south Twin Cities metro.",
};

export default function EmploymentPage() {
  return (
    <>
      <section className="bg-charcoal px-4 py-14">
        <div className="mx-auto max-w-3xl text-center xl:max-w-4xl">
          <h1 className="font-slab text-3xl font-bold text-white sm:text-4xl">
            Join Our Team
          </h1>
          <p className="mt-3 text-gray-400">
            We&apos;re looking for experienced drivers who thrive in a
            fast-paced environment. Family-owned company, south metro routes.
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-2xl xl:max-w-3xl">
          <div className="rounded-xl border border-gray-700 bg-charcoal-light p-6">
            <h2 className="font-slab text-lg font-semibold text-white">
              Driver Application
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill out the form below and we&apos;ll be in touch.
            </p>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" required>
                  <input type="text" className="form-input" />
                </Field>
                <Field label="Last name" required>
                  <input type="text" className="form-input" />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" required>
                  <input type="email" className="form-input" />
                </Field>
                <Field label="Phone" required>
                  <input type="tel" className="form-input" />
                </Field>
              </div>

              <Field label="Street address">
                <input type="text" className="form-input" />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Driver&apos;s license number" required>
                  <input type="text" className="form-input" />
                </Field>
                <Field label="License class" required>
                  <input type="text" className="form-input" placeholder="e.g., Class A, Class B" />
                </Field>
              </div>

              <Field label="Driving experience">
                <textarea
                  rows={3}
                  className="form-input"
                  placeholder="Describe your relevant driving experience..."
                />
              </Field>

              <Field label="Previous employers">
                <textarea
                  rows={3}
                  className="form-input"
                  placeholder="List previous employers and dates of employment..."
                />
              </Field>

              <Field label="Traffic accidents or violations">
                <textarea
                  rows={2}
                  className="form-input"
                  placeholder="List any accidents or violations in the past 5 years, or write 'None'..."
                />
              </Field>

              <Field label="Training or certifications">
                <textarea
                  rows={2}
                  className="form-input"
                  placeholder="CDL training, safety certifications, etc."
                />
              </Field>

              <button
                type="button"
                className="w-full rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:bg-gold-hover sm:w-auto"
              >
                Submit Application
              </button>

              <p className="text-xs text-gray-500">
                Questions about open positions? Call{" "}
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="font-medium text-gold"
                >
                  {COMPANY.phone}
                </a>{" "}
                during business hours.
              </p>
            </div>
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
