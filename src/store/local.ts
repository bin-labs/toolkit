export function getData<T>(key: string): Promise<T | null> {
  const item = localStorage.getItem(key)
  if (item) {
    return Promise.resolve(JSON.parse(item))
  }
  return Promise.resolve(null)
}

export function setData<T>(key: string, data: T): Promise<void> {
  const item = JSON.stringify(data)
  localStorage.setItem(key, item)
  return Promise.resolve()
}