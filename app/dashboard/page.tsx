import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ClassroomWorkspace } from "@/components/dashboard/ClassroomWorkspace";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { getCurrentUser } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { CLASSROOM_COLUMNS, rowToClassroom, type ClassroomRow } from "@/lib/seats";

export const metadata: Metadata = {
  title: "Самбар — ClassPulse",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const db = await getDB();
  const { results } = await db
    .prepare(`SELECT ${CLASSROOM_COLUMNS} FROM classrooms WHERE user_id = ?1 ORDER BY id`)
    .bind(user.id)
    .all<ClassroomRow>();

  return (
    <div className="min-h-dvh bg-slate-50">
      <DashboardHeader user={{ name: user.name, email: user.email }} />
      <main>
        <ClassroomWorkspace initialClassrooms={results.map(rowToClassroom)} />
      </main>
    </div>
  );
}
