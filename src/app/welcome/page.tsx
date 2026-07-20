import type { Metadata } from "next";
import OnboardingWizard from "@/components/onboarding-wizard";

export const metadata: Metadata = {
  title: "Set Up Your House",
  description:
    "New house? Set up trash, recycling, and yard waste service in about two minutes — no contract, flat pricing, autopay if you want it.",
};

export default function WelcomePage() {
  return <OnboardingWizard />;
}
