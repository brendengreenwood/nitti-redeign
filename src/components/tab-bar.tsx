"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/data";

const TABS = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/book", label: "Book", emoji: "➕" },
  { href: "/account", label: "My Nitti", emoji: "🏡" },
] as const;

export default function TabBar() {
  const pathname = usePathname();

  // The booking and onboarding wizards have their own sticky action bars —
  // stay out of their way.
  if (pathname.startsWith("/book") || pathname.startsWith("/welcome"))
    return null;

  return (
    <>
      {/* Spacer so page content isn't hidden behind the fixed bar */}
      <div className="h-16 md:hidden" />
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-gray-800 bg-charcoal/95 backdrop-blur md:hidden">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
                active ? "text-gold" : "text-gray-400"
              }`}
            >
              <span className="text-lg leading-none">{tab.emoji}</span>
              {tab.label}
            </Link>
          );
        })}
        <a
          href={COMPANY.paymentPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-gray-400"
        >
          <span className="text-lg leading-none">💳</span>
          Pay
        </a>
      </nav>
    </>
  );
}
