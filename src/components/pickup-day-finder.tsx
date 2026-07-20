"use client";

import { useState, useSyncExternalStore } from "react";
import {
  SERVICE_CITIES,
  getNextPickupDate,
  getUpcomingHoliday,
  type CityKey,
} from "@/lib/data";

const STORAGE_KEY = "nitti-selected-city";

// Hydration-safe localStorage read: the server snapshot is null, and the
// client value only changes through our own setters, so no subscription is
// needed.
const emptySubscribe = () => () => {};
const getSavedCity = () => localStorage.getItem(STORAGE_KEY);
const getServerCity = () => null;

interface PickupDayFinderProps {
  compact?: boolean;
}

export default function PickupDayFinder({ compact = false }: PickupDayFinderProps) {
  // null = follow saved value; "none" = user explicitly cleared it
  const [override, setOverride] = useState<CityKey | "none" | null>(null);

  const saved = useSyncExternalStore(emptySubscribe, getSavedCity, getServerCity);
  const savedCity = SERVICE_CITIES.some((c) => c.key === saved)
    ? (saved as CityKey)
    : null;
  const selectedCity = override === "none" ? null : override ?? savedCity;

  function selectCity(key: CityKey) {
    setOverride(key);
    localStorage.setItem(STORAGE_KEY, key);
  }

  function clearCity() {
    setOverride("none");
    localStorage.removeItem(STORAGE_KEY);
  }

  const city = SERVICE_CITIES.find((c) => c.key === selectedCity);
  const nextPickup = city ? getNextPickupDate(city.pickupDays) : null;
  const holiday = getUpcomingHoliday(7);

  return (
    <div className={compact ? "rounded bg-charcoal p-6" : "rounded bg-charcoal p-8"}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">
          Find Your Pickup Day
        </h3>
        {selectedCity && (
          <button
            onClick={clearCity}
            className="text-xs text-gray-400 hover:text-gold"
          >
            Change city
          </button>
        )}
      </div>

      {!city ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-5">
          {SERVICE_CITIES.map((c) => (
            <button
              key={c.key}
              onClick={() => selectCity(c.key)}
              className="rounded border border-gray-700 bg-charcoal-light px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gold hover:text-gold"
            >
              {c.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded bg-charcoal-light p-4">
            <p className="text-sm text-gray-400">
              Your pickup days in{" "}
              <span className="font-semibold text-white">{city.name}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {city.pickupDays.map((day) => (
                <span
                  key={day}
                  className="bg-gold px-3 py-1 font-display text-sm font-semibold uppercase tracking-widest text-charcoal"
                >
                  {day}
                </span>
              ))}
            </div>

            {nextPickup && (
              <p className="mt-3 text-sm text-gray-400">
                Next pickup:{" "}
                <span className="font-semibold text-white">
                  {nextPickup.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            )}
          </div>

          {holiday && (
            <div className="rounded border border-gold/40 bg-gold-light p-3">
              <p className="text-sm font-medium text-gray-800">
                <span className="font-semibold">Holiday note:</span>{" "}
                {holiday.name} may affect your pickup. All pickups on or after
                the holiday are delayed one day.
              </p>
            </div>
          )}

          {!compact && (
            <div className="rounded bg-charcoal-light p-4">
              <p className="overline-label">
                Reminders
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-300">
                <li>Carts out by 6:30 AM</li>
                <li>Face carts toward the street</li>
                <li>3 feet apart from other carts or obstacles</li>
                <li>Keep lids closed</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
