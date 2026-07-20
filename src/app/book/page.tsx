import type { Metadata } from "next";
import { Suspense } from "react";
import BookingWizard from "@/components/booking-wizard";

export const metadata: Metadata = {
  title: "Book a Pickup",
  description:
    "Schedule yard waste bag pickup or big item removal in about a minute. Couches, mattresses, appliances, leaves — we handle it.",
};

export default function BookPage() {
  return (
    <Suspense>
      <BookingWizard />
    </Suspense>
  );
}
