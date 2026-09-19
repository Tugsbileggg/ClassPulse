import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Бүртгүүлэх — ClassPulse",
  alternates: { canonical: "/register" },
};

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">ClassPulse-д бүртгүүлэх</h1>
      <AuthForm initialMode="register" />
    </>
  );
}
