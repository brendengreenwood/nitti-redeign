import type { Metadata } from "next";
import PickupDayFinder from "@/components/pickup-day-finder";
import { COMPANY, SERVICE_CITIES, HOLIDAYS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Find your trash and recycling pickup day by city. Holiday schedule and service reminders for Nitti Sanitation customers.",
};

export default function SchedulePage() {
  return (
    <>
      <section className="bg-charcoal px-4 py-14">
        <div className="mx-auto max-w-4xl text-center xl:max-w-5xl">
          <h1 className="font-slab text-3xl font-bold text-white sm:text-4xl">
            Pickup Schedule
          </h1>
          <p className="mt-3 text-gray-400">
            Find your pickup day, check holiday closures, and know what to
            expect.
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl xl:max-w-4xl">
          <PickupDayFinder />
        </div>
      </section>

      <section className="border-t border-gray-800 bg-charcoal-light px-4 py-12">
        <div className="mx-auto max-w-3xl xl:max-w-4xl">
          <h2 className="mb-6 font-slab text-xl font-semibold text-white">
            Weekly Schedule by City
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-charcoal-light">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-white">
                    Day
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-white">
                    Cities
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {(
                  [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ] as const
                ).map((day) => {
                  const cities = SERVICE_CITIES.filter((c) =>
                    c.pickupDays.includes(day)
                  );
                  return (
                    <tr key={day}>
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-white">
                        {day}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {cities.map((c) => c.name).join(", ") || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800 px-4 py-12">
        <div className="mx-auto max-w-3xl xl:max-w-4xl">
          <h2 className="mb-2 font-slab text-xl font-semibold text-white">
            2026 Holiday Schedule
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            All pickups on or after a holiday are delayed one day, unless the
            holiday falls on a weekend.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {HOLIDAYS.map((h) => {
              const date = new Date(h.date + "T00:00:00");
              return (
                <div
                  key={h.date}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-charcoal-light px-4 py-3"
                >
                  <span className="font-medium text-white">{h.name}</span>
                  <span className="text-sm text-gray-500">
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800 bg-charcoal-light px-4 py-12">
        <div className="mx-auto max-w-3xl xl:max-w-4xl">
          <h2 className="mb-6 font-slab text-xl font-semibold text-white">
            Cart Placement Reminders
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ReminderCard title="Time" detail="Carts out by 6:30 AM" />
            <ReminderCard title="Direction" detail="Face carts toward the street" />
            <ReminderCard title="Spacing" detail="3 feet apart from other carts or obstacles" />
            <ReminderCard title="Lids" detail="Keep lids closed for pickup" />
          </div>
          <div className="mt-6 rounded-lg border border-gold/30 bg-gold/10 p-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold">Missed pickup?</span> Call{" "}
              <a
                href={`tel:${COMPANY.phone}`}
                className="font-semibold text-gold"
              >
                {COMPANY.phone}
              </a>{" "}
              during business hours ({COMPANY.hours}). A $25 service charge
              applies if carts were not out by 6:30 AM.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ReminderCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-charcoal-light p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </p>
      <p className="mt-1 text-sm font-medium text-white">{detail}</p>
    </div>
  );
}
