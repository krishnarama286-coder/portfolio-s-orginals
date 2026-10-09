"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export type DropdownOption = {
  value: string;
  label: string;
  hint?: string;
};

type DropdownProps = {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  /** Custom content for the closed button; defaults to the selected label. */
  renderButton?: (selected: DropdownOption | undefined) => ReactNode;
  className?: string;
};

/**
 * Netflix-style select ("Season 4 ▾"). Accessible listbox: arrow keys move,
 * Enter/Space chooses, Esc closes, click outside closes.
 */
export default function Dropdown({ label, value, options, onChange, renderButton, className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)));
  const root = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    setCursor(Math.max(0, options.findIndex((o) => o.value === value)));
    listRef.current?.focus();
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, options, value]);

  const choose = (i: number) => {
    const opt = options[i];
    if (!opt) return;
    onChange(opt.value);
    setOpen(false);
    root.current?.querySelector<HTMLButtonElement>("button")?.focus();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(options.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setCursor(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCursor(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(cursor);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Escape") root.current?.querySelector<HTMLButtonElement>("button")?.focus();
    }
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${label}: ${selected?.label ?? ""}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="flex w-full items-center justify-between gap-3 rounded-md border border-white/20 bg-[#242424] px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-white/40"
      >
        <span className="min-w-0 flex-1 truncate">{renderButton ? renderButton(selected) : selected?.label}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            tabIndex={-1}
            aria-label={label}
            aria-activedescendant={`${id}-opt-${cursor}`}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full z-40 mt-2 max-h-80 origin-top overflow-auto rounded-md border border-white/10 bg-[#1b1b1b]/95 p-1 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md focus:outline-none"
          >
            {options.map((o, i) => {
              const isSel = o.value === value;
              return (
                <li
                  key={o.value}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={isSel}
                  onPointerEnter={() => setCursor(i)}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors ${
                    i === cursor ? "bg-white/10 text-white" : "text-zinc-300"
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate ${isSel ? "font-semibold text-white" : ""}`}>{o.label}</span>
                    {o.hint && <span className="block truncate text-xs text-zinc-500">{o.hint}</span>}
                  </span>
                  {isSel && <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
