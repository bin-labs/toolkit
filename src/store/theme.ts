import { getData, setData } from "./local"

export type ThemeStoreData = {
  theme?: "dark" | "light" | "system"
}

export function getThemeData(): Promise<ThemeStoreData | null> {
  return getData('theme.config')
}

export function saveThemeData(data: ThemeStoreData) {
  return setData('theme.config', data)
}