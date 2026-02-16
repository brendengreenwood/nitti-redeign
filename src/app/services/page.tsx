import type { Metadata } from "next";
import Link from "next/link";
import {
  COMPANY,
  TRASH_PLANS,
  YARD_WASTE,
  BULK_PICKUP,
  EVENT_BOXES,
  ROLLOFF_SIZES,
  RECYCLING_ACCEPTED,
  RECYCLING_REJECTED,
  YARD_WASTE_ACCEPTED,
  YARD_WASTE_REJECTED,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential & commercial trash, recycling, yard waste, bulk pickup, event boxes, and roll-off dumpster rental in the south Twin Cities metro.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-charcoal px-4 py-14">
        <div className="mx-auto max-w-4xl text-center xl:max-w-5xl">
          <h1 className="font-slab text-3xl font-bold text-white sm:text-4xl xl:text-5xl">
            Services
          </h1>
          <p className="mt-3 text-gray-400">
            Everything we offer, in one place. Residential, commercial, and
            everything in between.
          </p>
          <nav className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { label: "Trash", anchor: "#trash" },
              { label: "Recycling", anchor: "#recycling" },
              { label: "Yard Waste", anchor: "#yard-waste" },
              { label: "Bulk Pickup", anchor: "#bulk-pickup" },
              { label: "Commercial", anchor: "#commercial" },
              { label: "Roll-Off Dumpsters", anchor: "#roll-off" },
              { label: "Event Boxes", anchor: "#event-boxes" },
            ].map((s) => (
              <a
                key={s.anchor}
                href={s.anchor}
                className="rounded-full border border-gray-600 px-3 py-1 text-sm font-medium text-gray-300 transition-colors hover:border-gold hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="trash" className="scroll-mt-20 border-t border-gray-800 px-4 py-16">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          <SectionLabel>Residential</SectionLabel>
          <h2 className="mt-1 font-slab text-2xl font-semibold text-white">
            Curbside Trash Pickup
          </h2>
          <p className="mt-3 text-gray-400">
            Weekly pickup with your choice of cart size. Recycling cart included
            with every plan at no extra charge. Billed every two months.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRASH_PLANS.map((plan) => (
              <div
                key={plan.label}
                className={`relative rounded-xl border p-5 text-center ${
                  plan.popular
                    ? "border-gold bg-gold/10"
                    : "border-gray-700 bg-charcoal-light"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-xs font-semibold text-charcoal">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-medium text-gray-400">{plan.label}</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  ${plan.pricePerMonth}
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-gray-700 bg-charcoal-light p-5">
            <h3 className="font-slab text-sm font-semibold text-white">
              Pickup Rules
            </h3>
            <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm text-gray-400 sm:grid-cols-2">
              <li>Carts out by 6:30 AM on your pickup day</li>
              <li>Face carts toward the street</li>
              <li>3 feet apart from other carts or obstacles</li>
              <li>Keep lids closed — extra bags need advance notice</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:bg-gold-hover"
            >
              Sign Up for Service
            </Link>
            <Link
              href="/contact#quote"
              className="rounded-lg border border-gray-600 px-5 py-2.5 text-sm font-medium text-gray-300 hover:border-gold hover:text-gold"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <section id="recycling" className="scroll-mt-20 border-t border-gray-800 bg-charcoal-light px-4 py-16">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          <SectionLabel>Included with Trash</SectionLabel>
          <h2 className="mt-1 font-slab text-2xl font-semibold text-white">Recycling</h2>
          <p className="mt-3 text-gray-400">
            65-gallon recycling cart included with every trash plan. Single-stream
            — mix everything together, no sorting required. Just rinse your
            containers.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-700 bg-charcoal p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-green-trust">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Accepted
              </h3>
              <div className="space-y-4">
                {RECYCLING_ACCEPTED.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {group.category}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm text-gray-400">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-red-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Not Accepted
              </h3>
              <ul className="columns-2 gap-x-4 space-y-0.5">
                {RECYCLING_REJECTED.map((item) => (
                  <li key={item} className="text-sm text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-gray-700 bg-charcoal p-5">
            <h3 className="font-slab text-sm font-semibold text-white">
              Common Questions
            </h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="font-medium text-gray-300">Pizza boxes?</dt>
                <dd className="text-gray-500">
                  No — food-contaminated cardboard can&apos;t be recycled.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-300">Bottle caps?</dt>
                <dd className="text-gray-500">
                  Leave them on the bottle. They&apos;ll be sorted at the facility.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-300">Plastic bags?</dt>
                <dd className="text-gray-500">
                  No — they tangle sorting machinery. Return them to grocery
                  store drop-offs.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-300">Need a bigger cart?</dt>
                <dd className="text-gray-500">
                  Call us to upgrade from 65 to 95 gallons.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="yard-waste" className="scroll-mt-20 border-t border-gray-800 px-4 py-16">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          <SectionLabel>Seasonal: {YARD_WASTE.seasonStart} – {YARD_WASTE.seasonEnd}</SectionLabel>
          <h2 className="mt-1 font-slab text-2xl font-semibold text-white">Yard Waste</h2>
          <p className="mt-3 text-gray-400">
            Composting collection runs mid-April through mid-November. Two
            options to fit your needs.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gold bg-gold/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                Seasonal Plan
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                ${YARD_WASTE.seasonalPlanPrice}
                <span className="text-sm font-normal text-gray-500">/year</span>
              </p>
              <p className="mt-2 text-sm text-gray-400">
                {YARD_WASTE.seasonalPlanDescription}
              </p>
              <p className="mt-3 text-xs text-gray-500">
                Best for homeowners with regular lawn maintenance. Pays for
                itself at about 1 bag per week.
              </p>
            </div>
            <div className="rounded-xl border border-gray-700 bg-charcoal-light p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                On-Call Bags
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                ${YARD_WASTE.onCallBagPrice}
                <span className="text-sm font-normal text-gray-500">/bag</span>
              </p>
              <p className="mt-2 text-sm text-gray-400">
                {YARD_WASTE.onCallDescription}
              </p>
              <p className="mt-3 text-xs text-gray-500">
                Best for occasional cleanups or mid-season start.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <AcceptedRejectedList
              title="Accepted"
              items={YARD_WASTE_ACCEPTED}
              variant="accepted"
            />
            <AcceptedRejectedList
              title="Not Accepted"
              items={YARD_WASTE_REJECTED}
              variant="rejected"
            />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Compostable paper bags required. Available at most hardware stores.
          </p>
        </div>
      </section>

      <section id="bulk-pickup" className="scroll-mt-20 border-t border-gray-800 bg-charcoal-light px-4 py-16">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          <SectionLabel>Episodic</SectionLabel>
          <h2 className="mt-1 font-slab text-2xl font-semibold text-white">
            Bulk Item Pickup
          </h2>
          <p className="mt-3 text-gray-400">
            Furniture, mattresses, large items you can&apos;t fit in your cart. We
            handle it on Thursdays.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Step number={1} title={`Request by ${BULK_PICKUP.deadlineDay}`}>
              Submit your request by {BULK_PICKUP.deadlineTime} on{" "}
              {BULK_PICKUP.deadlineDay}. List items and location.
            </Step>
            <Step number={2} title="Place items outside">
              Items must be outside your building by {BULK_PICKUP.itemsOutBy}{" "}
              on {BULK_PICKUP.pickupDay}. Accessible from the curb.
            </Step>
            <Step number={3} title="We pick them up">
              Our crew collects everything on {BULK_PICKUP.pickupDay}. Appliances
              and electronics may be scheduled separately.
            </Step>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-700 bg-charcoal p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Residential Trip Fee
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                ${BULK_PICKUP.residentialTripFee}
              </p>
              <p className="text-xs text-gray-500">+ per-item charges</p>
            </div>
            <div className="rounded-xl border border-gray-700 bg-charcoal p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Commercial Trip Fee
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                ${BULK_PICKUP.commercialTripFee}
              </p>
              <p className="text-xs text-gray-500">+ per-item charges</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            More than 5–6 large items?{" "}
            <a href="#roll-off" className="font-medium text-gold hover:text-gold-hover">
              A roll-off dumpster
            </a>{" "}
            may be more cost-effective.
          </p>

          <div className="mt-6">
            <Link
              href="/contact#bulk-pickup"
              className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:bg-gold-hover"
            >
              Schedule a Bulk Pickup
            </Link>
          </div>
        </div>
      </section>

      <section id="commercial" className="scroll-mt-20 border-t border-gray-800 px-4 py-16">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          <SectionLabel>Businesses & Properties</SectionLabel>
          <h2 className="mt-1 font-slab text-2xl font-semibold text-white">
            Commercial &amp; Multi-Family
          </h2>
          <p className="mt-3 text-gray-400">
            Custom waste and recycling solutions for businesses, apartment
            complexes, townhomes, and condominiums. We provide container options
            from 35-gallon carts through 8-yard dumpsters.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-700 bg-charcoal-light p-6">
              <h3 className="font-slab font-semibold text-white">For Businesses</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                <li>Restaurants, retail, offices, industrial sites</li>
                <li>Flexible pickup frequency</li>
                <li>Single-stream recycling available</li>
                <li>Local team — not a national call center</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-700 bg-charcoal-light p-6">
              <h3 className="font-slab font-semibold text-white">
                For Multi-Family Properties
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                <li>Apartments, townhomes, condominiums</li>
                <li>Scalable containers as occupancy changes</li>
                <li>Bulk item service for tenant move-outs</li>
                <li>Recycling included — no sorting for residents</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-gold/30 bg-gold/10 p-5">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-gold">Why local matters:</span> When
              you call, you reach our Rosemount office — not a call center in
              another state. Flexible contracts, responsive service, and a team
              that knows the south metro.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/contact#quote"
              className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:bg-gold-hover"
            >
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      <section id="roll-off" className="scroll-mt-20 border-t border-gray-800 bg-charcoal-light px-4 py-16">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          <SectionLabel>Via Lightning Disposal</SectionLabel>
          <h2 className="mt-1 font-slab text-2xl font-semibold text-white">
            Roll-Off Dumpster Rental
          </h2>
          <p className="mt-3 text-gray-400">
            Construction, renovation, and cleanout dumpsters delivered to your
            site. Same-day delivery often available. Provided through{" "}
            <a
              href={COMPANY.lightningDisposalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold hover:text-gold-hover"
            >
              Lightning Disposal
            </a>
            , our sister company.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ROLLOFF_SIZES.map((size) => (
              <div
                key={size.yards}
                className="rounded-xl border border-gray-700 bg-charcoal p-5"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {size.yards}
                  </span>
                  <span className="text-sm text-gray-500">yard</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{size.dimensions}</p>
                <p className="mt-3 text-sm text-gray-400">{size.bestFor}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-gold/30 bg-gold/10 p-5">
            <p className="text-sm font-medium text-gray-300">
              Need it today? Same-day delivery is often available. Call{" "}
              <a
                href={`tel:${COMPANY.phone}`}
                className="font-semibold text-gold"
              >
                {COMPANY.phone}
              </a>
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/contact#quote"
              className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:bg-gold-hover"
            >
              Get a Dumpster Quote
            </Link>
          </div>
        </div>
      </section>

      <section id="event-boxes" className="scroll-mt-20 border-t border-gray-800 px-4 py-16">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          <SectionLabel>Parties & Events</SectionLabel>
          <h2 className="mt-1 font-slab text-2xl font-semibold text-white">
            Trash Event Boxes
          </h2>
          <p className="mt-3 text-gray-400">
            Hosting a graduation party, BBQ, or block party? Get sturdy trash
            boxes. We pick up the full bags after your event.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <Step number={1} title="Order boxes">
              Use our order form or call.
            </Step>
            <Step number={2} title="Pick up at office">
              Grab them from our Rosemount office during business hours.
            </Step>
            <Step number={3} title="Set up at event">
              Line with your own 55-gallon bags.
            </Step>
            <Step number={4} title="Bag the trash">
              After your event, tie up the full bags.
            </Step>
            <Step number={5} title="We pick up bags">
              Collected on your next regular trash day.
            </Step>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-700 bg-charcoal-light p-5">
              <p className="font-slab text-sm font-semibold text-white">Pricing</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-400">
                <li>
                  Boxes: ${EVENT_BOXES.boxPrice} + tax each ({EVENT_BOXES.boxDimensions})
                </li>
                <li>Bag pickup: ${EVENT_BOXES.bagPickupPrice} + tax each</li>
                <li>You provide your own 55-gallon bags</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-700 bg-charcoal-light p-5">
              <p className="font-slab text-sm font-semibold text-white">
                How many do I need?
              </p>
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500">
                    <th className="pb-1">Guests</th>
                    <th className="pb-1">Boxes</th>
                    <th className="pb-1">Est. Total</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  {EVENT_BOXES.estimates.map((e) => (
                    <tr key={e.guests}>
                      <td className="py-0.5">{e.guests}</td>
                      <td className="py-0.5">{e.boxes}</td>
                      <td className="py-0.5">{e.totalRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/contact#event-boxes"
              className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:bg-gold-hover"
            >
              Order Event Boxes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
      {children}
    </p>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-700 bg-charcoal p-4">
      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-charcoal">
        {number}
      </div>
      <p className="font-slab text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs text-gray-500">{children}</p>
    </div>
  );
}

function AcceptedRejectedList({
  title,
  items,
  variant,
}: {
  title: string;
  items: readonly string[];
  variant: "accepted" | "rejected";
}) {
  const isAccepted = variant === "accepted";
  return (
    <div
      className={`rounded-xl border p-6 ${
        isAccepted
          ? "border-gray-700 bg-charcoal-light"
          : "border-red-900/50 bg-red-950/30"
      }`}
    >
      <h3
        className={`mb-3 flex items-center gap-2 text-sm font-semibold ${
          isAccepted ? "text-green-trust" : "text-red-400"
        }`}
      >
        {isAccepted ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {title}
      </h3>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
