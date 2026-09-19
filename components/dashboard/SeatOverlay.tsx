"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { SEAT_LIMITS, type Seat } from "@/lib/seats";

export type Box = Pick<Seat, "x" | "y" | "w" | "h">;

type Drag =
  | { kind: "draw"; startX: number; startY: number }
  | { kind: "move"; id: string; dx: number; dy: number; w: number; h: number }
  | { kind: "resize"; id: string; x: number; y: number };

interface SeatOverlayProps {
  seats: Seat[];
  selectedId: string | null;
  /** Хоосон хэсэгт чирж шинэ суудал зурах горим. */
  drawMode: boolean;
  /** Камер асаалттай үед л суудлыг зурж, зөөж болно. */
  editable: boolean;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, box: Box) => void;
  onAdd: (box: Box) => void;
  onDelete: (id: string) => void;
}

const MIN = SEAT_LIMITS.minSize;
const ARROWS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function SeatOverlay({
  seats,
  selectedId,
  drawMode,
  editable,
  onSelect,
  onUpdate,
  onAdd,
  onDelete,
}: SeatOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const [preview, setPreview] = useState<Box | null>(null);

  const toPoint = (event: PointerEvent) => {
    const rect = rootRef.current!.getBoundingClientRect();
    return {
      x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
    };
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!editable || event.button !== 0) return;

    const target = event.target as HTMLElement;
    const seatId = target.closest<HTMLElement>("[data-seat-id]")?.dataset.seatId;
    const seat = seatId ? seats.find((item) => item.id === seatId) : undefined;
    const point = toPoint(event);

    if (seat) {
      onSelect(seat.id);
      dragRef.current = target.closest("[data-resize]")
        ? { kind: "resize", id: seat.id, x: seat.x, y: seat.y }
        : { kind: "move", id: seat.id, dx: point.x - seat.x, dy: point.y - seat.y, w: seat.w, h: seat.h };
    } else if (drawMode) {
      onSelect(null);
      dragRef.current = { kind: "draw", startX: point.x, startY: point.y };
      setPreview({ x: point.x, y: point.y, w: 0, h: 0 });
    } else {
      onSelect(null);
      return;
    }

    event.preventDefault();
    rootRef.current?.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const point = toPoint(event);

    if (drag.kind === "draw") {
      setPreview({
        x: Math.min(drag.startX, point.x),
        y: Math.min(drag.startY, point.y),
        w: Math.abs(point.x - drag.startX),
        h: Math.abs(point.y - drag.startY),
      });
    } else if (drag.kind === "move") {
      onUpdate(drag.id, {
        x: clamp(point.x - drag.dx, 0, 1 - drag.w),
        y: clamp(point.y - drag.dy, 0, 1 - drag.h),
        w: drag.w,
        h: drag.h,
      });
    } else {
      onUpdate(drag.id, {
        x: drag.x,
        y: drag.y,
        w: clamp(point.x - drag.x, MIN, 1 - drag.x),
        h: clamp(point.y - drag.y, MIN, 1 - drag.y),
      });
    }
  };

  const endDrag = () => {
    if (dragRef.current?.kind === "draw" && preview && preview.w >= MIN && preview.h >= MIN) onAdd(preview);
    dragRef.current = null;
    setPreview(null);
  };

  const onSeatKeyDown = (event: KeyboardEvent<HTMLDivElement>, seat: Seat) => {
    if (!editable) return;
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      onDelete(seat.id);
      return;
    }
    if (event.key === "Escape") {
      onSelect(null);
      (event.currentTarget as HTMLElement).blur();
      return;
    }

    const direction = ARROWS[event.key] as [number, number] | undefined;
    if (!direction) return;
    event.preventDefault();

    const step = event.shiftKey ? 0.02 : 0.005;
    const [dx, dy] = [direction[0] * step, direction[1] * step];
    if (event.altKey) {
      onUpdate(seat.id, {
        ...seat,
        w: clamp(seat.w + dx, MIN, 1 - seat.x),
        h: clamp(seat.h + dy, MIN, 1 - seat.y),
      });
    } else {
      onUpdate(seat.id, {
        ...seat,
        x: clamp(seat.x + dx, 0, 1 - seat.w),
        y: clamp(seat.y + dy, 0, 1 - seat.h),
      });
    }
  };

  return (
    <div
      ref={rootRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`absolute inset-0 select-none ${editable && drawMode ? "cursor-crosshair touch-none" : ""}`}
    >
      {seats.map((seat, index) => {
        const selected = seat.id === selectedId;
        return (
          <div
            key={seat.id}
            data-seat-id={seat.id}
            role="button"
            tabIndex={editable ? 0 : -1}
            aria-pressed={selected}
            aria-label={`${index + 1}. ${seat.label}${seat.student ? `, ${seat.student}` : ", сурагч оноогоогүй"}`}
            onFocus={() => onSelect(seat.id)}
            onKeyDown={(event) => onSeatKeyDown(event, seat)}
            className={`absolute rounded-md border-2 focus:outline-none ${
              selected
                ? "z-10 border-emerald-400 bg-emerald-400/20 ring-2 ring-emerald-300/70"
                : "border-brand-400 bg-brand-500/15 hover:bg-brand-500/25"
            } ${editable ? "cursor-move touch-none" : ""}`}
            style={{
              left: `${seat.x * 100}%`,
              top: `${seat.y * 100}%`,
              width: `${seat.w * 100}%`,
              height: `${seat.h * 100}%`,
            }}
          >
            <span
              className={`pointer-events-none absolute top-0 left-0 max-w-[calc(100%+4rem)] truncate rounded-br-md px-1.5 py-0.5 text-[11px] leading-tight font-semibold text-white ${
                selected ? "bg-emerald-600" : "bg-brand-600"
              }`}
            >
              {index + 1}. {seat.student || seat.label}
            </span>
            {selected && editable ? (
              <span
                data-resize
                aria-hidden="true"
                className="absolute -right-2 -bottom-2 size-4 cursor-nwse-resize rounded-sm border-2 border-white bg-emerald-500 shadow"
              />
            ) : null}
          </div>
        );
      })}

      {preview ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-md border-2 border-dashed border-white bg-white/20 shadow-[0_0_0_1px_rgba(15,23,42,0.4)]"
          style={{
            left: `${preview.x * 100}%`,
            top: `${preview.y * 100}%`,
            width: `${preview.w * 100}%`,
            height: `${preview.h * 100}%`,
          }}
        />
      ) : null}
    </div>
  );
}
