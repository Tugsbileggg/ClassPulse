"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CircleAlert, LoaderCircle, PenLine, Plus, Power, Save, ShieldCheck, Trash2 } from "lucide-react";
import { CameraStage } from "@/components/dashboard/CameraStage";
import { SeatOverlay, type Box } from "@/components/dashboard/SeatOverlay";
import { SeatPanel } from "@/components/dashboard/SeatPanel";
import { useCamera } from "@/components/dashboard/useCamera";
import { SEAT_LIMITS, type Classroom, type Seat } from "@/lib/seats";

type Draft = {
  id: number | null;
  name: string;
  aspectRatio: number | null;
  seats: Seat[];
};

type SaveState = { kind: "idle" } | { kind: "saving" } | { kind: "saved" } | { kind: "error"; message: string };

const DEFAULT_ASPECT = 16 / 9;

const toDraft = (classroom: Classroom): Draft => ({
  id: classroom.id,
  name: classroom.name,
  aspectRatio: classroom.aspectRatio,
  seats: classroom.seats,
});

const newDraft = (count: number): Draft => ({
  id: null,
  name: count === 0 ? "Миний анги" : `Анги ${count + 1}`,
  aspectRatio: null,
  seats: [],
});

// Хадгалагдсан төлөвтэй харьцуулахад хэрэглэнэ (нэр, суудал л хамаарна).
const snapshot = (draft: Pick<Draft, "name" | "seats">) => JSON.stringify([draft.name.trim(), draft.seats]);

const makeSeatId = () => `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

function nextSeatLabel(seats: Seat[]) {
  const used = new Set(seats.map((seat) => seat.label));
  let n = seats.length + 1;
  while (used.has(`Суудал ${n}`)) n++;
  return `Суудал ${n}`;
}

export function ClassroomWorkspace({ initialClassrooms }: { initialClassrooms: Classroom[] }) {
  const uid = useId();
  const router = useRouter();
  const camera = useCamera();

  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [draft, setDraft] = useState<Draft>(() =>
    initialClassrooms[0] ? toDraft(initialClassrooms[0]) : newDraft(0),
  );
  const [savedSnapshot, setSavedSnapshot] = useState(() => snapshot(draft));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusStudentId, setFocusStudentId] = useState<string | null>(null);
  const [drawMode, setDrawMode] = useState(draft.seats.length === 0);
  const [saveState, setSaveState] = useState<SaveState>({ kind: "idle" });

  const dirty = snapshot(draft) !== savedSnapshot;
  const live = camera.status === "live";
  const cameraAspect = camera.size ? camera.size.width / camera.size.height : null;
  const aspectRatio = cameraAspect ?? draft.aspectRatio ?? DEFAULT_ASPECT;

  // --- Суудал засах -------------------------------------------------------

  const setSeats = useCallback((update: (seats: Seat[]) => Seat[]) => {
    setDraft((current) => ({ ...current, seats: update(current.seats) }));
    setSaveState((state) => (state.kind === "saved" ? { kind: "idle" } : state));
  }, []);

  const addSeat = useCallback(
    (box: Box) => {
      const id = makeSeatId();
      setSeats((seats) =>
        seats.length >= SEAT_LIMITS.maxSeats ? seats : [...seats, { id, label: nextSeatLabel(seats), student: "", ...box }],
      );
      setSelectedId(id);
      setFocusStudentId(id);
    },
    [setSeats],
  );

  const addCenteredSeat = () => {
    const offset = (draft.seats.length % 8) * 0.025;
    addSeat({ x: 0.4 + offset, y: 0.35 + offset, w: 0.14, h: 0.2 });
  };

  const updateSeatBox = useCallback(
    (id: string, box: Box) => setSeats((seats) => seats.map((seat) => (seat.id === id ? { ...seat, ...box } : seat))),
    [setSeats],
  );

  const updateSeatText = (id: string, patch: Partial<Pick<Seat, "label" | "student">>) =>
    setSeats((seats) => seats.map((seat) => (seat.id === id ? { ...seat, ...patch } : seat)));

  const deleteSeat = useCallback(
    (id: string) => {
      setSeats((seats) => seats.filter((seat) => seat.id !== id));
      setSelectedId((current) => (current === id ? null : current));
    },
    [setSeats],
  );

  const clearSeats = () => {
    if (!window.confirm("Энэ ангийн бүх суудлыг арилгах уу?")) return;
    setSeats(() => []);
    setSelectedId(null);
    setDrawMode(true);
  };

  // --- Анги солих, хадгалах -----------------------------------------------

  const confirmDiscard = () =>
    !dirty || window.confirm("Хадгалаагүй өөрчлөлт устах болно. Үргэлжлүүлэх үү?");

  const openDraft = (next: Draft) => {
    setDraft(next);
    setSavedSnapshot(snapshot(next));
    setSelectedId(null);
    setDrawMode(next.seats.length === 0);
    setSaveState({ kind: "idle" });
  };

  const switchClassroom = (value: string) => {
    if (!confirmDiscard()) return;
    const classroom = classrooms.find((item) => String(item.id) === value);
    openDraft(classroom ? toDraft(classroom) : newDraft(classrooms.length));
  };

  const save = useCallback(async () => {
    const name = draft.name.trim();
    if (!name) {
      setSaveState({ kind: "error", message: "Ангийн нэрийг оруулна уу." });
      document.getElementById(`${uid}-name`)?.focus();
      return;
    }

    const sent = { name, seats: draft.seats };
    setSaveState({ kind: "saving" });
    try {
      const response = await fetch(draft.id ? `/api/classrooms/${draft.id}` : "/api/classrooms", {
        method: draft.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...sent, aspectRatio: cameraAspect ?? draft.aspectRatio }),
      });
      if (response.status === 401) {
        router.replace("/login");
        return;
      }
      const data = (await response.json().catch(() => null)) as
        | { ok: true; classroom: Classroom }
        | { ok: false; message?: string }
        | null;

      if (!response.ok || !data?.ok) {
        const message = (data && !data.ok && data.message) || "Хадгалж чадсангүй. Дахин оролдоно уу.";
        setSaveState({ kind: "error", message });
        return;
      }

      const saved = data.classroom;
      setClassrooms((list) =>
        list.some((item) => item.id === saved.id)
          ? list.map((item) => (item.id === saved.id ? saved : item))
          : [...list, saved],
      );
      // Хадгалж байх хооронд хийсэн засварыг алдахгүйн тулд зөвхөн id, харьцааг шинэчилнэ.
      setDraft((current) => ({ ...current, id: saved.id, aspectRatio: saved.aspectRatio }));
      setSavedSnapshot(snapshot(sent));
      setSaveState({ kind: "saved" });
    } catch {
      setSaveState({ kind: "error", message: "Сүлжээний алдаа гарлаа. Интернэт холболтоо шалгана уу." });
    }
  }, [cameraAspect, draft, router, uid]);

  const deleteClassroom = async () => {
    if (!draft.id) {
      if (confirmDiscard()) openDraft(classrooms[0] ? toDraft(classrooms[0]) : newDraft(0));
      return;
    }
    if (!window.confirm(`«${draft.name}» ангийг суудлын зураглалтай нь устгах уу?`)) return;

    const response = await fetch(`/api/classrooms/${draft.id}`, { method: "DELETE" }).catch(() => null);
    if (!response?.ok) {
      setSaveState({ kind: "error", message: "Ангийг устгаж чадсангүй. Дахин оролдоно уу." });
      return;
    }
    const remaining = classrooms.filter((item) => item.id !== draft.id);
    setClassrooms(remaining);
    openDraft(remaining[0] ? toDraft(remaining[0]) : newDraft(0));
  };

  // Ctrl/⌘ + S — хадгалах. Хадгалаагүй өөрчлөлттэй хуудсаа хаах гэвэл анхааруулна.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        void save();
      }
    };
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [dirty, save]);

  const selectValue = draft.id === null ? "new" : String(draft.id);
  const statusText = useMemo(() => {
    if (saveState.kind === "saving") return "Хадгалж байна…";
    if (saveState.kind === "error") return saveState.message;
    if (dirty) return "Хадгалаагүй өөрчлөлт байна";
    if (draft.id === null) return "Шинэ анги — хадгалаагүй";
    return "Бүх өөрчлөлт хадгалагдсан";
  }, [dirty, draft.id, saveState]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Ангийн камер ба суудлын зураглал</h1>
        <p className="mt-1.5 max-w-3xl text-slate-600">
          Камераа холбоод шууд дүрс дээр суудал бүрийг тэмдэглэж, сурагчийн нэрийг онооно. ClassPulse сурагчийг
          царайгаар нь биш, энэ зураглалаар ялгана.
        </p>
      </div>

      {/* Анги сонгох, нэрлэх, хадгалах */}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 lg:flex-row lg:items-end">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
          <div className="sm:w-56">
            <label htmlFor={`${uid}-classroom`} className="block text-xs font-semibold text-slate-600">
              Анги
            </label>
            <select
              id={`${uid}-classroom`}
              value={selectValue}
              onChange={(event) => switchClassroom(event.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
            >
              {classrooms.map((classroom) => (
                <option key={classroom.id} value={classroom.id}>
                  {classroom.name}
                </option>
              ))}
              {draft.id === null ? <option value="new">{draft.name.trim() || "Шинэ анги"} (шинэ)</option> : null}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor={`${uid}-name`} className="block text-xs font-semibold text-slate-600">
              Ангийн нэр
            </label>
            <input
              id={`${uid}-name`}
              value={draft.name}
              maxLength={SEAT_LIMITS.classroomName}
              onChange={(event) => {
                setDraft((current) => ({ ...current, name: event.target.value }));
                setSaveState({ kind: "idle" });
              }}
              placeholder="7Б анги"
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (confirmDiscard()) openDraft(newDraft(classrooms.length));
              }}
              disabled={draft.id === null}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <Plus className="size-4" aria-hidden="true" />
              Шинэ анги
            </button>
            <button
              type="button"
              onClick={() => void deleteClassroom()}
              aria-label={draft.id ? `«${draft.name}» ангийг устгах` : "Шинэ ангийг цуцлах"}
              title={draft.id ? "Ангийг устгах" : "Цуцлах"}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 lg:justify-end lg:border-0 lg:pt-0">
          <p
            role="status"
            className={`flex items-center gap-1.5 text-sm ${
              saveState.kind === "error"
                ? "font-medium text-rose-700"
                : dirty || draft.id === null
                  ? "text-amber-700"
                  : "text-emerald-700"
            }`}
          >
            {saveState.kind === "saving" ? (
              <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" />
            ) : saveState.kind === "error" ? (
              <CircleAlert className="size-4" aria-hidden="true" />
            ) : dirty || draft.id === null ? null : (
              <Check className="size-4" aria-hidden="true" />
            )}
            {statusText}
          </p>
          <button
            type="button"
            onClick={() => void save()}
            disabled={saveState.kind === "saving" || (!dirty && draft.id !== null)}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="size-4" aria-hidden="true" />
            Хадгалах
          </button>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section aria-labelledby={`${uid}-camera-title`} className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 id={`${uid}-camera-title`} className="font-bold text-slate-900">
              Камерын шууд дүрс
            </h2>
            <button
              type="button"
              onClick={() => setDrawMode((value) => !value)}
              aria-pressed={drawMode}
              disabled={!live}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                drawMode && live
                  ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <PenLine className="size-4" aria-hidden="true" />
              {drawMode && live ? "Зурах горим асаалттай" : "Суудал зурах"}
            </button>
          </div>

          <CameraStage
            videoRef={camera.videoRef}
            status={camera.status}
            size={camera.size}
            onStart={() => void camera.start()}
            aspectRatio={aspectRatio}
          >
            <SeatOverlay
              seats={draft.seats}
              selectedId={selectedId}
              drawMode={drawMode}
              editable={live}
              onSelect={setSelectedId}
              onUpdate={updateSeatBox}
              onAdd={addSeat}
              onDelete={deleteSeat}
            />
          </CameraStage>

          {live ? (
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <label htmlFor={`${uid}-device`} className="text-sm font-medium text-slate-600">
                  Камер
                </label>
                <select
                  id={`${uid}-device`}
                  value={camera.deviceId}
                  onChange={(event) => void camera.start(event.target.value)}
                  className="max-w-64 min-w-0 truncate rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
                >
                  {camera.devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={camera.stop}
                className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:self-auto"
              >
                <Power className="size-4" aria-hidden="true" />
                Камер унтраах
              </button>
            </div>
          ) : null}

          <div className="mt-3 space-y-1.5 text-sm text-slate-600">
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
              Дүрс зөвхөн энэ хөтөч дотор харагдана. Сервер дээр зөвхөн суудлын байршил, сурагчийн нэр хадгалагдана.
            </p>
            {live ? (
              <p className="text-xs leading-relaxed text-slate-500">
                «Суудал зурах» горимд дүрс дээр чирж суудал зурна. Суудлыг чирж зөөж, ногоон булангаас нь чирж хэмжээг
                өөрчилнө. Гараар: сумтай товч — зөөх, Alt + сум — хэмжээ, Shift — том алхам, Delete — устгах.
              </p>
            ) : null}
          </div>
        </section>

        <SeatPanel
          seats={draft.seats}
          selectedId={selectedId}
          focusStudentId={focusStudentId}
          onSelect={setSelectedId}
          onChange={updateSeatText}
          onDelete={deleteSeat}
          onAdd={addCenteredSeat}
          onClear={clearSeats}
        />
      </div>
    </div>
  );
}
