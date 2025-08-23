import Nav from '../components/Nav'
import { useEffect, useState } from 'react'

export default function Marketplace() {
  const [items, setItems] = useState([])
  useEffect(()=>{ fetch('/api/marketplace').then(r=>r.json()).then(setItems) }, [])

  const buy = async (id)=>{
    const res = await fetch('/api/marketplace', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ userId: 1, itemId: id }) })
    const j = await res.json()
    alert(j.error || 'Berhasil ditukar')
  }

  return (
    <div>
      <Nav />
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
        <ul className="grid gap-4">
          {items.map(it=> (
            <li key={it.id} className="p-4 border rounded">
              <h3 className="font-semibold">{it.name} — {it.cost} koin</h3>
              <p className="text-sm">{it.description}</p>
              <button className="mt-2 bg-red-600 text-white px-3 py-1" onClick={()=>buy(it.id)}>Tukar</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
