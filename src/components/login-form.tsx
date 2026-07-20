"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { LOGIN_FLAG_KEY, SESSION_KEY, parseSession } from "@/lib/session";

// Passwordless login: phone number + texted code. In this demo the "texted
// code" is any 4 digits — a real backend would verify it.
const emptySubscribe = () => () => {};
const getSession = () => localStorage.getItem(SESSION_KEY);
const serverNull = () => null;

export default function LoginForm() {
  const router = useRouter();
  const existing = parseSession(
    useSyncExternalStore(emptySubscribe, getSession, serverNull)
  );

  const [phone, setPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function sendCode() {
    if (phone.replace(/\D/g, "").length < 7) {
      setError("That number looks short.");
      return;
    }
    setError(null);
    setCodeSent(true);
  }

  function verify() {
    if (code.replace(/\D/g, "").length !== 4) {
      setError("The code is 4 digits.");
      return;
    }
    // Log into the existing household if there is one (in the demo any
    // verified phone reaches it); otherwise start a household for this phone.
    if (!existing) {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ name: "", phone: phone.trim() })
      );
    }
    localStorage.setItem(LOGIN_FLAG_KEY, "1");
    router.push("/account");
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-center font-display text-3xl font-bold text-white">
        Welcome back 👋
      </h1>
      <p className="mt-2 text-center text-sm text-gray-400">
        Log in with your mobile number — no password to forget.
      </p>

      {!codeSent ? (
        <div className="mt-8 space-y-3">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendCode()}
            placeholder="Mobile number"
            autoComplete="tel"
            inputMode="tel"
            className="form-input py-3.5 text-center text-lg"
            autoFocus
          />
          <button
            onClick={sendCode}
            className="w-full rounded bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover"
          >
            Text Me a Code
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          <p className="text-center text-sm text-gray-400">
            We texted a code to{" "}
            <span className="font-semibold text-white">{phone}</span>
          </p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verify()}
            placeholder="• • • •"
            inputMode="numeric"
            maxLength={4}
            className="form-input py-3.5 text-center text-2xl tracking-[0.5em]"
            autoFocus
          />
          <button
            onClick={verify}
            className="w-full rounded bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:bg-gold-hover"
          >
            Log In
          </button>
          <button
            onClick={() => {
              setCodeSent(false);
              setCode("");
            }}
            className="w-full text-center text-xs text-gray-500 hover:text-gold"
          >
            Different number
          </button>
          <p className="text-center text-xs text-gray-600">
            Demo site — any 4 digits work.
          </p>
        </div>
      )}

      {error && (
        <p className="mt-3 text-center text-sm text-red-400">{error}</p>
      )}

      <p className="mt-10 text-center text-sm text-gray-500">
        New house?{" "}
        <Link href="/welcome" className="font-medium text-gold">
          Set up service in 2 minutes →
        </Link>
      </p>
    </div>
  );
}
