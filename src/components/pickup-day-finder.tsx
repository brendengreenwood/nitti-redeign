"use client";

import { useEffect, useState } from "react";
import {
  SERVICE_CITIES,
  getNextPickupDate,
  getUpcomingHoliday,
  type CityKey,
} from "@/lib/data";

const STORAGE_KEY = "nitti-selected-city";

interface PickupDayFinderProps {
  compact?: boolean;
}

export default function PickupDayFinder({ compact = false }: PickupDayFinderProps) {
  const [selectedCity, setSelectedCity] = useState<CityKey | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as CityKey | null;
    if (saved && SERVICE_CITIES.some((c) => c.key === saved)) {
      setSelectedCity(saved);
    }
  }, []);

  function selectCity(key: CityKey) {
    setSelectedCity(key);
    localStorage.setItem(STORAGE_KEY, key);
  }

  const city = SERVICE_CITIES.find((c) => c.key === selectedCity);
  const nextPickup = city ? getNextPickupDate(city.pickupDays) : null;
  const holiday = getUpcomingHoliday(7);

  if (!mounted) {
    return (
      <div className={compact ? "rounded-xl bg-charcoal p-6" : "rounded-xl bg-charcoal p-8"}>
        <h3 className="mb-4 font-slab text-lg font-semibold text-white">
          Find Your Pickup Day
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-5">
          {SERVICE_CITIES.map((c) => (
            <button
              key={c.key}
              className="rounded-lg border border-gray-700 bg-charcoal-light px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gold hover:text-gold"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "rounded-xl bg-charcoal p-6" : "rounded-xl bg-charcoal p-8"}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-slab text-lg font-semibold text-white">
          Find Your Pickup Day
        </h3>
        {selectedCity && (
          <button
            onClick={() => {
              setSelectedCity(null);
              localStorage.removeItem(STORAGE_KEY);
            }}
            className="text-xs text-gray-400 hover:text-gold"
          >
            Change city
          </button>
        )}
      </div>

      {!selectedCity ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-5">
          {SERVICE_CITIES.map((c) => (
            <button
              key={c.key}
              onClick={() => selectCity(c.key)}
              className="rounded-lg border border-gray-700 bg-charcoal-light px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gold hover:text-gold"
            >
              {c.name}
            </button>
          ))}
        </div>
      ) : city ? (
        <div className="space-y-3">
          <div className="rounded-lg bg-charcoal-light p-4">
            <p className="text-sm text-gray-400">
              Your pickup days in{" "}
              <span className="font-semibold text-white">{city.name}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {city.pickupDays.map((day) => (
                <span
                  key={day}
                  className="rounded-full bg-gold px-3 py-1 text-sm font-semibold text-charcoal"
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
            <div className="rounded-lg border border-gold/40 bg-gold-light p-3">
              <p className="text-sm font-medium text-gray-800">
                <span className="mr-1.5 inline-block">&#9888;&#65039;</span>
                {holiday.name} may affect your pickup. All pickups on or after
                the holiday are delayed one day.
              </p>
            </div>
          )}

          {!compact && (
            <div className="rounded-lg bg-charcoal-light p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
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
      ) : null}
    </div>
  );
}
