import Nav from '../components/Nav'
import { useEffect, useState } from 'react'

export default function Leaderboard() {
  const [list, setList] = useState([])
  useEffect(()=>{ fetch('/api/leaderboard').then(r=>r.json()).then(setList) }, [])
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <ol>
          {list.map(u=> (
            <li key={u.id} className="p-2 border rounded mb-2">{u.name || u.email} — {u.coins} koin</li>
          ))}
        </ol>
      </main>
    </div>
  )
}
