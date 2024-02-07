import { invoke } from "@tauri-apps/api/core"

export async function getData<T>(key: string): Promise<T | null> {
  const v = await invoke('settings_get', { key })
  console.info('setData', key, v)
  if (v) {
    return JSON.parse(v as string)
  }
  return null
}

export function setData<T>(key: string, data: T): Promise<void> {
  const item = JSON.stringify(data)
  console.log("settings_set;", item)
  return invoke('settings_set', { key, value: item })
}