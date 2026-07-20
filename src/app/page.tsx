import Link from "next/link";
import PickupDayFinder from "@/components/pickup-day-finder";
import Icon from "@/components/icons";
import {
  BULK_PICKUP,
  COMPANY,
  COMPARISON,
  LIFE_MOMENTS,
  TESTIMONIALS,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal px-4 pb-10 pt-14 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] text-white sm:text-6xl">
            Kids grow.
            <br />
            Couches die.
            <br />
            Leaves keep coming.
            <br />
            <span className="text-gold">We haul all of it.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base text-gray-400 sm:text-lg">
            Book a pickup from your phone in under a minute. Trucks, not call
            trees. Family-owned in the south metro since {COMPANY.founded}.
          </p>
        </div>

        {/* Life-moment entry points */}
        <div className="mx-auto mt-10 max-w-2xl">
          <p className="overline-label text-center">
            What happened at your house
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {LIFE_MOMENTS.map((m) => (
              <Link
                key={m.key}
                href={`/book?moment=${m.key}`}
                className="group flex items-center gap-4 border border-gray-800 bg-charcoal-light px-4 py-3.5 transition-colors hover:border-gold active:scale-[0.99]"
              >
                <Icon
                  name={m.icon}
                  className="h-7 w-7 shrink-0 text-gold"
                />
                <span>
                  <span className="block font-display text-base font-semibold uppercase tracking-wide text-white group-hover:text-gold">
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
              Just yard bags →
            </Link>
            <Link href="/book?service=bulk" className="font-medium text-gold hover:underline">
              Something else big →
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Rather talk? Call{" "}
          <a href={`tel:${COMPANY.phone}`} className="font-semibold text-gold">
            {COMPANY.phone}
          </a>
          . A person answers.
        </p>
      </section>

      <div className="stripe-rule" />

      {/* Built for the mental load */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-2xl">
          <p className="overline-label text-center">How it works</p>
          <h2 className="mt-1 text-center font-display text-3xl font-semibold uppercase text-white">
            Built for the mental load
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-gray-400">
            You&apos;ve got 400 things in your head. This shouldn&apos;t be one
            of them.
          </p>
          <div className="mt-10 space-y-6 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
            <HowStep number="01" title="Book whenever">
              9:47 PM after bedtime works. Tell us what happened and where you
              live — we already know your pickup day.
            </HowStep>
            <HowStep number="02" title="We confirm the day">
              Exact date and price before you tap book. On the family calendar,
              text the night before.
            </HowStep>
            <HowStep number="03" title="Curb it. Done.">
              Out by 6:30 AM ({BULK_PICKUP.itemsOutBy} for big items). Gone
              while you do the school run.
            </HowStep>
          </div>
        </div>
      </section>

      {/* For the first-house comparison shoppers */}
      <section className="border-t border-gray-800 bg-charcoal-light px-4 py-14">
        <div className="mx-auto max-w-2xl">
          <p className="overline-label text-center">Do the math</p>
          <h2 className="mt-1 text-center font-display text-3xl font-semibold uppercase text-white">
            First house? Congrats.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-gray-400">
            Picking a hauler is the least romantic part of homeownership, and
            you have ten tabs open. Here&apos;s ours, straight:
          </p>

          <div className="mt-8 overflow-hidden border border-gray-700">
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b-2 border-gold/60 bg-charcoal px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em]">
              <span className="text-gray-500">&nbsp;</span>
              <span className="text-gold">Nitti</span>
              <span className="text-gray-500">The big guys</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1fr_1fr_1fr] gap-2 px-4 py-3 text-xs sm:text-sm ${
                  i % 2 ? "bg-charcoal" : "bg-charcoal-light"
                }`}
              >
                <span className="font-medium text-gray-400">{row.feature}</span>
                <span className="font-semibold text-white">{row.nitti}</span>
                <span className="text-gray-500">{row.typical}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            No contract means we earn your house every single week. That&apos;s
            the deal.
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/welcome"
              className="inline-block bg-gold px-8 py-3.5 font-display text-base font-semibold uppercase tracking-widest text-charcoal transition-colors hover:bg-gold-hover"
            >
              Make It Official — 2 Min Setup
            </Link>
          </div>
        </div>
      </section>

      {/* Pickup finder */}
      <section id="pickup-finder" className="border-t border-gray-800 px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <PickupDayFinder compact />
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-gray-800 px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="overline-label text-center">South metro says</p>
          <h2 className="mt-1 text-center font-display text-3xl font-semibold uppercase text-white">
            The neighbors already switched
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.title}
                className="border border-gray-800 border-l-2 border-l-gold bg-charcoal-light p-5"
              >
                <blockquote className="text-sm leading-relaxed text-gray-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 font-display text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {t.name} · {t.city}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-800 px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-display text-3xl font-semibold uppercase text-white">
            That pile isn&apos;t going to haul itself
          </h2>
          <Link
            href="/book"
            className="mt-6 inline-block w-full bg-gold px-8 py-4 font-display text-base font-semibold uppercase tracking-widest text-charcoal transition-colors hover:bg-gold-hover sm:w-auto"
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
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 border-t-2 border-gold/60 pt-3 sm:block">
      <p className="font-display text-2xl font-bold text-gold">{number}</p>
      <div>
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-white">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-400">{children}</p>
      </div>
    </div>
  );
}
