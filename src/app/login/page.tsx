import type { Metadata } from "next";
import LoginForm from "@/components/login-form";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to My Nitti with your mobile number.",
};

export default function LoginPage() {
  return <LoginForm />;
}
