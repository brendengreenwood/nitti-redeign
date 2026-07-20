import Image from "next/image";
import Link from "next/link";
import { COMPANY, SERVICE_CITIES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-gray-300">
      <div className="stripe-rule" />
      <div className="mx-auto max-w-7xl px-4 py-12 2xl:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/nitti-logo.svg"
              alt="Nitti Sanitation, Inc."
              width={782}
              height={345}
              className="mb-3 h-12 w-auto"
            />
            <p className="text-sm leading-relaxed">
              {COMPANY.address.street}
              <br />
              {COMPANY.address.city}, {COMPANY.address.state}{" "}
              {COMPANY.address.zip}
            </p>
            <p className="mt-3 text-sm">
              <a
                href={`tel:${COMPANY.phone}`}
                className="font-semibold text-white hover:text-gold"
              >
                {COMPANY.phone}
              </a>
            </p>
            <p className="mt-1 text-sm">{COMPANY.hours}</p>
          </div>

          <div>
            <h4 className="overline-label mb-3">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400">Billing: </span>
                <a
                  href={`mailto:${COMPANY.email.billing}`}
                  className="hover:text-white"
                >
                  {COMPANY.email.billing}
                </a>
              </li>
              <li>
                <span className="text-gray-400">Support: </span>
                <a
                  href={`mailto:${COMPANY.email.support}`}
                  className="hover:text-white"
                >
                  {COMPANY.email.support}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={COMPANY.paymentPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold hover:text-gold-hover"
                >
                  Pay Online &rarr;
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="overline-label mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/book" className="font-medium text-gold hover:text-gold-hover">
                  Book a Pickup
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-white">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-white">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/employment" className="hover:text-white">
                  Employment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="overline-label mb-3">
              Service Area
            </h4>
            <ul className="space-y-1 text-sm">
              {SERVICE_CITIES.map((city) => (
                <li key={city.key}>{city.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {COMPANY.name} &mdash; Reliable
          service since {COMPANY.founded}.
        </div>
      </div>
    </footer>
  );
}
