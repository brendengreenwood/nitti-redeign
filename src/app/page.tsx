import Link from "next/link";
import PickupDayFinder from "@/components/pickup-day-finder";
import {
  BULK_PICKUP,
  COMPANY,
  LIFE_MOMENTS,
  TESTIMONIALS,
  TRASH_PLANS,
} from "@/lib/data";

export default function Home() {
  const popularPlan = TRASH_PLANS.find((p) => p.popular) ?? TRASH_PLANS[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal px-4 pb-10 pt-14 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-slab text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            Kids grow. Couches die.
            <br />
            The leaves keep coming.
            <br />
            <span className="text-gold">That&apos;s what we&apos;re for.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-gray-400 sm:text-lg">
            Life makes trash — that&apos;s normal. Book the pickup from your
            phone in about a minute, whenever life gives you a minute.
            Family-owned in the south metro since {COMPANY.founded}.
          </p>
        </div>

        {/* Life-moment entry points */}
        <div className="mx-auto mt-8 max-w-2xl">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
            Sound familiar?
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {LIFE_MOMENTS.map((m) => (
              <Link
                key={m.key}
                href={`/book?moment=${m.key}`}
                className="group flex items-center gap-3 rounded-xl border border-gray-700 bg-charcoal-light px-4 py-3.5 transition-colors hover:border-gold active:scale-[0.99]"
              >
                <span className="text-2xl">{m.emoji}</span>
                <span>
                  <span className="block text-sm font-semibold text-white group-hover:text-gold">
                    {m.label}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {m.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 text-sm sm:flex-row sm:gap-6">
            <Link href="/book?service=yard" className="font-medium text-gold hover:underline">
              Just need yard bags picked up →
            </Link>
            <Link href="/book?service=bulk" className="font-medium text-gold hover:underline">
              Something else big →
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Prefer a human? Call{" "}
          <a href={`tel:${COMPANY.phone}`} className="font-medium text-gold">
            {COMPANY.phone}
          </a>{" "}
          — a real person answers.
        </p>
      </section>

      {/* Built around her week, not our route map */}
      <section className="border-t border-gray-800 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-slab text-2xl font-semibold text-white">
            Built for the mental load
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-gray-400">
            You&apos;ve got 400 things in your head. This shouldn&apos;t be one
            of them.
          </p>
          <div className="mt-8 space-y-5 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
            <HowStep number={1} title="Book whenever">
              9:47 PM after bedtime works. Tell us what happened and where you
              live — we already know your pickup day.
            </HowStep>
            <HowStep number={2} title="Then stop thinking about it">
              Exact date and price before you tap “book.” Drop it on the family
              calendar, get a text the night before.
            </HowStep>
            <HowStep number={3} title="Curb it & carry on">
              Set it out by 6:30 AM ({BULK_PICKUP.itemsOutBy} for big items).
              It disappears while you do the school run.
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
