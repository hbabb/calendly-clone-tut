import { Header } from "@/components/layout/Header";
import type { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </>
  );
}
