import { useState, useEffect } from 'react'

export default function useFetch(url, opts) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    let cancelled = false
    setLoading(true)
    fetch(url, opts)
      .then((r) => r.json())
      .then((json) => !cancelled && setData(json))
      .catch((e) => !cancelled && setError(e))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [url, opts])

  return { data, loading, error }
}
