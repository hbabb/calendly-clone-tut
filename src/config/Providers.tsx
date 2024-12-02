"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// biome-ignore lint/style/useImportType: <explanation>
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
