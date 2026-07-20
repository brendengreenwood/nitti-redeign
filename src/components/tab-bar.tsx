"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/icons";
import { COMPANY } from "@/lib/data";

const TABS = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/book", label: "Book", icon: "plus" },
  { href: "/account", label: "My Nitti", icon: "truck" },
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
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t-2 border-gold/60 bg-charcoal/95 backdrop-blur md:hidden">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-2.5 font-display text-[11px] font-semibold uppercase tracking-widest ${
                active ? "text-gold" : "text-gray-400"
              }`}
            >
              <Icon name={tab.icon} className="h-5 w-5" />
              {tab.label}
            </Link>
          );
        })}
        <a
          href={COMPANY.paymentPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 font-display text-[11px] font-semibold uppercase tracking-widest text-gray-400"
        >
          <Icon name="card" className="h-5 w-5" />
          Pay
        </a>
      </nav>
    </>
  );
}
