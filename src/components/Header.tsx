"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/wetzelland", label: "Wetzelland 2026" },
  { href: "/events", label: "Event Calendar" },
  { href: "/news", label: "News" },
  { href: "/history", label: "History" },
  { href: "/directions", label: "Directions" },
  { href: "/flyers", label: "Past Flyers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur border-b border-orange-600/40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tight text-white">
              WETZEL <span className="text-orange-500">MC</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-semibold rounded transition-colors ${
                  pathname === item.href
                    ? "text-orange-500"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://ticketstripe.com/wetzelland2026"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-500 transition-colors"
            >
              Get Tickets
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="lg:hidden pb-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 font-semibold rounded ${
                  pathname === item.href ? "text-orange-500" : "text-zinc-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://ticketstripe.com/wetzelland2026"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded bg-orange-600 px-4 py-2 text-center font-bold text-white"
            >
              Get Tickets
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
