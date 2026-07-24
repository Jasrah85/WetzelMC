"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export interface CalendarEvent {
  title: string;
  slug: string;
  startDate: string;
  endDate?: string;
  category?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  party: "bg-orange-600",
  music: "bg-purple-600",
  games: "bg-blue-600",
  charity: "bg-green-600",
  other: "bg-zinc-600",
};

function toDateOnly(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function EventCalendar({ events }: { events: CalendarEvent[] }) {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const { cells, monthLabel } = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingBlanks = firstDay.getDay(); // Sunday-start

    const cells: { date: Date | null; events: CalendarEvent[] }[] = [];
    for (let i = 0; i < leadingBlanks; i++) cells.push({ date: null, events: [] });

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = events.filter((e) => {
        const start = toDateOnly(new Date(e.startDate));
        const end = e.endDate ? toDateOnly(new Date(e.endDate)) : start;
        return date >= start && date <= end;
      });
      cells.push({ date, events: dayEvents });
    }

    const monthLabel = cursor.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    return { cells, monthLabel };
  }, [cursor, events]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="rounded px-3 py-1.5 text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700"
        >
          ← Prev
        </button>
        <h2 className="text-xl font-bold text-white">{monthLabel}</h2>
        <button
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="rounded px-3 py-1.5 text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px rounded-lg overflow-hidden border border-zinc-800 bg-zinc-800 text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="bg-zinc-900 px-2 py-2 text-center font-bold text-zinc-400 text-xs uppercase">
            {d}
          </div>
        ))}
        {cells.map((cell, i) => {
          const isToday =
            cell.date && toDateOnly(cell.date).getTime() === toDateOnly(today).getTime();
          return (
            <div
              key={i}
              className={`min-h-20 bg-zinc-950 p-1.5 ${cell.date ? "" : "opacity-40"}`}
            >
              {cell.date && (
                <>
                  <span
                    className={`inline-block h-6 w-6 text-center leading-6 text-xs rounded-full ${
                      isToday ? "bg-orange-600 text-white font-bold" : "text-zinc-400"
                    }`}
                  >
                    {cell.date.getDate()}
                  </span>
                  <div className="mt-1 space-y-1">
                    {cell.events.map((e) => (
                      <Link
                        key={e.slug}
                        href={`/events#${e.slug}`}
                        className={`block truncate rounded px-1.5 py-0.5 text-[11px] font-semibold text-white ${
                          CATEGORY_COLORS[e.category ?? "other"] ?? CATEGORY_COLORS.other
                        }`}
                        title={e.title}
                      >
                        {e.title}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
