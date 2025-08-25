import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import MarketplaceCard from '../../components/MarketplaceCard'
import { apiGet } from '../../services/api'

export default function MarketplacePage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiGet('/api/marketplace')
      .then(setItems)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">Error: {String(error)}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items && items.map((it) => <MarketplaceCard key={it.id} item={it} />)}
        </div>
      </div>
    </Layout>
  )
}
