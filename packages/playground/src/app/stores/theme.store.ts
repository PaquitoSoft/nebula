import { signal } from "@preact/signals-react";

export type TTheme = "default" | "dark";

export const currentTheme = signal<TTheme>("default");

export const updateTheme = (theme: TTheme) => {
  currentTheme.value = theme;
}
