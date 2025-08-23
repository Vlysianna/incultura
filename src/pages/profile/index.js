import Nav from '../components/Nav'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [u, setU] = useState(null)
  useEffect(()=>{ fetch('/api/profile?userId=1').then(r=>r.json()).then(setU) }, [])
  if (!u) return <div><Nav /><main className="p-8">Loading...</main></div>
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p>Nama: {u.name}</p>
        <p>Email: {u.email}</p>
        <p>Saldo Koin: {u.coins}</p>
        <h3 className="mt-4 font-semibold">History</h3>
        <ul>
          {u.activities.map(a=> (
            <li key={a.id} className="p-2 border rounded mb-2">{a.type} — {a.coins} — {new Date(a.createdAt).toLocaleString()}</li>
          ))}
        </ul>
      </main>
    </div>
  )
}
