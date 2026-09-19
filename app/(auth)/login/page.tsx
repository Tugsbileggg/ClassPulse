import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Нэвтрэх — ClassPulse",
  alternates: { canonical: "/login" },
};

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">ClassPulse-д тавтай морил</h1>
      <AuthForm initialMode="login" />
    </>
  );
}
