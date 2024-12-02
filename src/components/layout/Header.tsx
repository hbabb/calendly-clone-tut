"use client";

import { ModeToggle } from "@/components/layout/ModeToggle";

export function Header() {
  return (
    <header className="mx-auto flex w-full items-center justify-between border-slate-900 border-b-2 px-6 pt-4 pb-4 dark:bg-slate-800">
      <p>Logo Here</p>
      <ModeToggle />
    </header>
  );
}
