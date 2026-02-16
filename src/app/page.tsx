import Link from "next/link";
import PickupDayFinder from "@/components/pickup-day-finder";
import {
  COMPANY,
  TRASH_PLANS,
  TESTIMONIALS,
  SERVICE_CITIES,
} from "@/lib/data";

export default function Home() {
  const cityList = SERVICE_CITIES.map((c) => c.name).join(", ");

  return (
    <>
      <section className="bg-charcoal px-4 py-20 sm:py-28 2xl:py-36">
        <div className="mx-auto max-w-4xl text-center xl:max-w-5xl">
          <h1 className="font-slab text-[2.75rem] font-bold leading-[1.1] text-white sm:text-[3.25rem] xl:text-[3.75rem]">
            Reliable trash &amp; recycling
            <br className="hidden sm:inline" /> for the south metro
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Weekly curbside pickup with recycling included. Family-owned since{" "}
            {COMPANY.founded}. Serving {cityList}.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-charcoal shadow-sm transition-colors hover:bg-gold-hover sm:w-auto"
            >
              Sign Up for Service
            </Link>
            <a
              href="#pickup-finder"
              className="w-full rounded-lg border border-gray-600 bg-transparent px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gold hover:text-gold sm:w-auto"
            >
              Find My Pickup Day
            </a>
          </div>
        </div>
      </section>

      <section id="pickup-finder" className="px-4 py-12">
        <div className="mx-auto max-w-3xl xl:max-w-4xl">
          <PickupDayFinder compact />
        </div>
      </section>

      <section className="border-t border-gray-800 px-4 py-16 2xl:px-8">
        <div className="mx-auto max-w-6xl xl:max-w-7xl">
          <h2 className="mb-10 text-center font-slab text-2xl font-semibold text-white">
            What We Offer
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <ServiceCard
              title="Trash & Recycling"
              description="Weekly curbside pickup. Multiple cart sizes. Recycling included with every plan — no sorting required."
              href="/services#trash"
              icon={
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              }
            />
            <ServiceCard
              title="Yard Waste"
              description="Seasonal collection, April through November. Annual cart plan or on-call bag pickup."
              href="/services#yard-waste"
              icon={
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              }
            />
            <ServiceCard
              title="Bulk & Special Pickup"
              description="Furniture, appliances, event cleanup, and roll-off dumpsters for renovations."
              href="/services#bulk-pickup"
              icon={
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800 bg-charcoal-light px-4 py-16">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          <h2 className="mb-2 text-center font-slab text-2xl font-semibold text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="mb-10 text-center text-gray-400">
            Recycling included with every plan. Billed every two months.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRASH_PLANS.map((plan) => (
              <div
                key={plan.label}
                className={`relative rounded-xl border p-6 text-center transition-shadow hover:shadow-md ${
                  plan.popular
                    ? "border-gold bg-gold/10"
                    : "border-gray-700 bg-charcoal"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-xs font-semibold text-charcoal">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-medium text-gray-400">
                  {plan.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  ${plan.pricePerMonth}
                  <span className="text-base font-normal text-gray-500">
                    /mo
                  </span>
                </p>
                <p className="mt-2 text-xs font-medium text-green-trust">
                  Recycling included
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link
              href="/services#trash"
              className="text-sm font-medium text-gold hover:text-gold-hover"
            >
              See all service details &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-gray-800 px-4 py-16 2xl:px-8">
        <div className="mx-auto max-w-6xl xl:max-w-7xl">
          <h2 className="mb-10 text-center font-slab text-2xl font-semibold text-white">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.title}
                className="rounded-xl border border-gray-700 bg-charcoal-light p-6"
              >
                <div className="mb-3 flex gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-sm font-semibold text-white">
                  {t.title}
                </p>
                <p className="text-sm leading-relaxed text-gray-400">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 text-xs text-gray-500">
                  &mdash; {t.name}, {t.city}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800 bg-charcoal-light px-4 py-16 text-white">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3 xl:max-w-5xl">
          <div className="text-center">
            <h3 className="font-slab text-lg font-semibold">Ready to start?</h3>
            <p className="mt-1 text-sm text-gray-400">
              Sign up online in minutes
            </p>
            <Link
              href="/sign-up"
              className="mt-4 inline-block rounded-lg bg-gold px-5 py-2 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover"
            >
              Sign Up
            </Link>
          </div>
          <div className="text-center">
            <h3 className="font-slab text-lg font-semibold">Commercial quote?</h3>
            <p className="mt-1 text-sm text-gray-400">
              Businesses &amp; multi-family properties
            </p>
            <Link
              href="/contact#quote"
              className="mt-4 inline-block rounded-lg border border-gold/40 px-5 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
            >
              Get a Quote
            </Link>
          </div>
          <div className="text-center">
            <h3 className="font-slab text-lg font-semibold">Need a dumpster?</h3>
            <p className="mt-1 text-sm text-gray-400">
              Roll-off rentals via Lightning Disposal
            </p>
            <a
              href={COMPANY.lightningDisposalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 rounded-lg border border-gold/40 px-5 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
            >
              Lightning Disposal
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-gray-700 bg-charcoal-light p-6 transition-all hover:border-gold hover:shadow-md"
    >
      <div className="mb-4 text-gold">{icon}</div>
      <h3 className="font-slab text-lg font-semibold text-white group-hover:text-gold">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        {description}
      </p>
      <span className="mt-4 inline-block text-sm font-medium text-gold">
        Learn more &rarr;
      </span>
    </Link>
  );
}
