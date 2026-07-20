"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { COMPANY, NAV_LINKS } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-charcoal">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 2xl:px-8">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/nitti-logo.svg"
            alt="Nitti Sanitation, Inc."
            width={782}
            height={345}
            className="h-10 w-auto sm:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/welcome"
            className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            Get Started
          </Link>
          <Link
            href="/book"
            className="bg-gold px-4 py-2 font-display text-sm font-semibold uppercase tracking-widest text-charcoal transition-colors hover:bg-gold-hover"
          >
            Book a Pickup
          </Link>
          <a
            href={COMPANY.paymentPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-gold"
          >
            Pay Online
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="bg-gold px-3 py-1.5 font-display text-sm font-semibold uppercase tracking-widest text-charcoal"
          >
            Book
          </Link>
          <a
            href={`tel:${COMPANY.phone}`}
            className="border border-gray-600 px-3 py-1.5 font-display text-sm font-medium uppercase tracking-widest text-gray-300"
          >
            Call
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-gray-400"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gray-800 bg-charcoal px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="bg-gold px-4 py-2 text-center font-display text-sm font-semibold uppercase tracking-widest text-charcoal"
            >
              Book a Pickup
            </Link>
            <Link
              href="/welcome"
              onClick={() => setOpen(false)}
              className="border border-gray-600 px-4 py-2 text-center font-display text-sm font-semibold uppercase tracking-widest text-gray-300"
            >
              New House? Get Started
            </Link>
            <a
              href={COMPANY.paymentPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500"
            >
              Pay Online
            </a>
            <Link
              href="/employment"
              onClick={() => setOpen(false)}
              className="text-sm text-gray-500"
            >
              Employment
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
