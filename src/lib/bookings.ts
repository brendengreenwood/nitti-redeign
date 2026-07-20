/**
 * Client-side booking storage: pickups ordered through the wizard land here
 * so the My Nitti dashboard can show them. Stands in for a real account
 * backend — the shape is what an API would return.
 */

export interface StoredBooking {
  id: string;
  service: "yard" | "bulk";
  cityName: string;
  dateISO: string;
  estimate: number;
  summary: string;
}

export const BOOKINGS_KEY = "nitti-bookings";
export const HOUSE_NAME_KEY = "nitti-house-name";

export function parseBookings(raw: string | null): StoredBooking[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: StoredBooking): void {
  const existing = parseBookings(localStorage.getItem(BOOKINGS_KEY));
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...existing, booking]));
}
