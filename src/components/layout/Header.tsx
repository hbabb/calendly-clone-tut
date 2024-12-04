"use client";

import { ModeToggle } from "@/components/layout/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { CalendarRangeIcon } from "lucide-react";
import { NavLink } from "./NavLink";

export function Header() {
  return (
    <header className="flex w-full border-b bg-card py-4 dark:bg-slate-800">
      <nav className="mx-8 flex w-full items-center gap-6 font-medium text-lg">
        <div className="mr-auto flex items-center gap-2 font-semibold">
          <CalendarRangeIcon className="size-10" />
          <span className="sr-only md:not-sr-only">Calendor</span>
        </div>

        <NavLink href={"/events"}>Events</NavLink>
        <NavLink href={"/schedule"}>Schedule</NavLink>

        <div className="ml-auto flex gap-4">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "size-12",
              },
            }}
          />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
