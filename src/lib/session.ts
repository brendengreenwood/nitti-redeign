/**
 * Client-side account state: who's logged in, what plan the household picked,
 * and autopay status. Stands in for a real auth + billing backend — the
 * shapes are what an API would return, storage is localStorage.
 */

export interface Session {
  name: string;
  phone: string;
  partnerPhone?: string;
}

export interface Plan {
  label: string;
  pricePerMonth: number;
  yardWaste: boolean;
}

export interface Autopay {
  enabled: boolean;
  /** Only the last 4 digits are ever kept — even in a demo. */
  last4: string | null;
}

export const SESSION_KEY = "nitti-session";
export const PLAN_KEY = "nitti-plan";
export const AUTOPAY_KEY = "nitti-autopay";
/**
 * Logged-in flag, separate from the household record: logging out must not
 * erase the household — the partner logs back in to the same account.
 */
export const LOGIN_FLAG_KEY = "nitti-logged-in";

function parse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export const parseSession = (raw: string | null) => parse<Session>(raw);
export const parsePlan = (raw: string | null) => parse<Plan>(raw);
export const parseAutopay = (raw: string | null) => parse<Autopay>(raw);
