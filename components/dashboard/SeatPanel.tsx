"use client";

import { useEffect, useRef } from "react";
import { LayoutGrid, Plus, Trash2 } from "lucide-react";
import { SEAT_LIMITS, type Seat } from "@/lib/seats";

interface SeatPanelProps {
  seats: Seat[];
  selectedId: string | null;
  /** Шинээр зурсан суудлын сурагчийн нэрийн талбар руу focus шилжүүлнэ. */
  focusStudentId: string | null;
  onSelect: (id: string) => void;
  onChange: (id: string, patch: Partial<Pick<Seat, "label" | "student">>) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onClear: () => void;
}

export function SeatPanel({
  seats,
  selectedId,
  focusStudentId,
  onSelect,
  onChange,
  onDelete,
  onAdd,
  onClear,
}: SeatPanelProps) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!selectedId) return;
    listRef.current
      ?.querySelector(`[data-seat-item="${selectedId}"]`)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedId]);

  useEffect(() => {
    if (!focusStudentId) return;
    // Гар утсан дээр жагсаалт камерын доор байдаг тул хуудсыг гүйлгэхгүйгээр focus хийнэ.
    listRef.current
      ?.querySelector<HTMLInputElement>(`[data-student-input="${focusStudentId}"]`)
      ?.focus({ preventScroll: true });
  }, [focusStudentId]);

  const assigned = seats.filter((seat) => seat.student).length;

  return (
    <aside
      aria-labelledby="seats-title"
      className="flex flex-col rounded-2xl border border-slate-200 bg-white lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)]"
    >
      <div className="border-b border-slate-100 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="seats-title" className="font-bold text-slate-900">
              Суудлууд <span className="font-semibold text-slate-500">({seats.length})</span>
            </h2>
            <p className="text-xs text-slate-500">
              {seats.length > 0 ? `${assigned} суудалд сурагч оноосон` : "Суудал хараахан зураагүй байна"}
            </p>
          </div>
          <button
            type="button"
            onClick={onAdd}
            disabled={seats.length >= SEAT_LIMITS.maxSeats}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg whitespace-nowrap border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <Plus className="size-4" aria-hidden="true" />
            Суудал нэмэх
          </button>
        </div>
      </div>

      {seats.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <LayoutGrid className="size-6" aria-hidden="true" />
          </span>
          <p className="mt-4 font-semibold text-slate-800">Суудлын зураглал хоосон байна</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Камерын дүрс дээр «Суудал зурах» горимд хулганаар чирж суудал бүрийг тэмдэглэнэ үү. Дараа нь энд
            сурагчийн нэрийг оноож өгнө.
          </p>
        </div>
      ) : (
        <ol ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-3">
          {seats.map((seat, index) => {
            const selected = seat.id === selectedId;
            return (
              <li
                key={seat.id}
                data-seat-item={seat.id}
                onFocusCapture={() => onSelect(seat.id)}
                onClick={() => onSelect(seat.id)}
                className={`rounded-xl border p-2.5 transition-colors ${
                  selected ? "border-emerald-400 bg-emerald-50/60" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                      selected ? "bg-emerald-600" : "bg-brand-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <label htmlFor={`seat-label-${seat.id}`} className="sr-only">
                    {index + 1}-р суудлын нэр
                  </label>
                  <input
                    id={`seat-label-${seat.id}`}
                    value={seat.label}
                    maxLength={SEAT_LIMITS.label}
                    onChange={(event) => onChange(seat.id, { label: event.target.value })}
                    className="min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-1.5 py-1 text-sm font-semibold text-slate-800 hover:border-slate-200 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(seat.id);
                    }}
                    aria-label={`${seat.label} устгах`}
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <label htmlFor={`seat-student-${seat.id}`} className="sr-only">
                  {index + 1}-р суудлын сурагч
                </label>
                <input
                  id={`seat-student-${seat.id}`}
                  data-student-input={seat.id}
                  value={seat.student}
                  maxLength={SEAT_LIMITS.student}
                  placeholder="Сурагчийн нэр"
                  autoComplete="off"
                  onChange={(event) => onChange(seat.id, { student: event.target.value })}
                  className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
                />
              </li>
            );
          })}
        </ol>
      )}

      {seats.length > 0 ? (
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={onClear}
            className="w-full rounded-lg px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
          >
            Бүх суудлыг арилгах
          </button>
        </div>
      ) : null}
    </aside>
  );
}
