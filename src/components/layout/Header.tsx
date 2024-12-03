"use client";

import { ModeToggle } from "@/components/layout/ModeToggle";
import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="mx-auto flex w-full items-center justify-between border-slate-900 border-b-2 px-6 pt-4 pb-4 dark:bg-slate-800">
      <div>
        <p>Logo Here</p>
      </div>
      <div className="flex items-center gap-4">
        <UserButton />
        <ModeToggle />
      </div>
    </header>
  );
}
