import Link from "next/link";
import PickupDayFinder from "@/components/pickup-day-finder";
import {
  BULK_PICKUP,
  COMPANY,
  TESTIMONIALS,
  TRASH_PLANS,
  YARD_WASTE,
} from "@/lib/data";

export default function Home() {
  const popularPlan = TRASH_PLANS.find((p) => p.popular) ?? TRASH_PLANS[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal px-4 pb-10 pt-14 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-slab text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            The couch is dead.
            <br />
            The leaves won.
            <br />
            <span className="text-gold">We&apos;ve got it.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-gray-400 sm:text-lg">
            Book a pickup from your phone in about a minute — no phone calls,
            no borrowing a truck. Family-owned in the south metro since{" "}
            {COMPANY.founded}.
          </p>
        </div>

        {/* Booking action cards */}
        <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
          <Link
            href="/book?service=yard"
            className="group rounded-2xl border border-gray-700 bg-charcoal-light p-5 transition-colors hover:border-gold active:scale-[0.99]"
          >
            <span className="text-4xl">🍂</span>
            <p className="mt-3 font-slab text-xl font-semibold text-white">
              Yard waste pickup
            </p>
            <p className="mt-1 text-sm text-gray-400">
              ${YARD_WASTE.onCallBagPrice}/bag, grabbed on your regular pickup
              day. Book by the night before.
            </p>
            <p className="mt-3 text-sm font-semibold text-gold group-hover:underline">
              Book bags →
            </p>
          </Link>
          <Link
            href="/book?service=bulk"
            className="group rounded-2xl border border-gray-700 bg-charcoal-light p-5 transition-colors hover:border-gold active:scale-[0.99]"
          >
            <span className="text-4xl">🛋️</span>
            <p className="mt-3 font-slab text-xl font-semibold text-white">
              Big stuff pickup
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Couches, mattresses, appliances, the swing set the kids outgrew.
              Gone on {BULK_PICKUP.pickupDay}.
            </p>
            <p className="mt-3 text-sm font-semibold text-gold group-hover:underline">
              Book big stuff →
            </p>
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Prefer a human? Call{" "}
          <a href={`tel:${COMPANY.phone}`} className="font-medium text-gold">
            {COMPANY.phone}
          </a>{" "}
          — a real person answers.
        </p>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-800 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-slab text-2xl font-semibold text-white">
            Three taps, then forget about it
          </h2>
          <div className="mt-8 space-y-5 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
            <HowStep number={1} title="Tell us what & where">
              Yard bags or big items, plus your city. We already know your
              pickup day.
            </HowStep>
            <HowStep number={2} title="We confirm the day">
              You see the exact pickup date before you book. Text reminder the
              night before, if you want it.
            </HowStep>
            <HowStep number={3} title="Curb it & carry on">
              Set it out by 6:30 AM (7:00 for big items). It disappears while
              you do the school run.
            </HowStep>
          </div>
        </div>
      </section>

      {/* Pickup finder */}
      <section id="pickup-finder" className="border-t border-gray-800 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <PickupDayFinder compact />
        </div>
      </section>

      {/* Weekly service upsell */}
      <section className="border-t border-gray-800 bg-charcoal-light px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-slab text-2xl font-semibold text-white">
            Need weekly trash too?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
            Most families run the {popularPlan.label.toLowerCase()} cart at $
            {popularPlan.pricePerMonth}/month — recycling cart included, no
            sorting drama.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="w-full rounded-xl bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover sm:w-auto"
            >
              Sign Up for Service
            </Link>
            <Link
              href="/services"
              className="w-full rounded-xl border border-gray-600 px-6 py-3.5 text-sm font-medium text-gray-300 transition-colors hover:border-gold hover:text-gold sm:w-auto"
            >
              See all services
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-gray-800 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-slab text-2xl font-semibold text-white">
            The neighbors already switched
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.title}
                className="rounded-xl border border-gray-700 bg-charcoal-light p-5"
              >
                <blockquote className="text-sm leading-relaxed text-gray-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-xs text-gray-500">
                  {t.name} · {t.city}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-800 px-4 py-14">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-slab text-2xl font-semibold text-white">
            That pile isn&apos;t going to haul itself
          </h2>
          <Link
            href="/book"
            className="mt-5 inline-block w-full rounded-xl bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover sm:w-auto"
          >
            Book a Pickup
          </Link>
        </div>
      </section>
    </>
  );
}

function HowStep({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 sm:block">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-slab text-base font-bold text-charcoal sm:mb-3">
        {number}
      </div>
      <div>
        <h3 className="font-slab text-base font-semibold text-white">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-400">{children}</p>
      </div>
    </div>
  );
}
