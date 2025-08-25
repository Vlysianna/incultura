// Small API client wrapper
export const apiGet = async (path) => {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}
