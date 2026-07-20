import type { Metadata } from "next";
import AccountDashboard from "@/components/account-dashboard";

export const metadata: Metadata = {
  title: "My Nitti",
  description:
    "Your household's trash dashboard: next pickup day, order big-item or yard waste service, pay the bill, see receipts.",
};

export default function AccountPage() {
  return <AccountDashboard />;
}
