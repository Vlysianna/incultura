import Nav from '../components/Nav'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Articles() {
  const [list, setList] = useState([])
  useEffect(() => { fetch('/api/articles').then(r=>r.json()).then(setList) }, [])
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Artikel Budaya</h2>
        <ul className="grid gap-4">
          {list.map(a => (
            <li key={a.id} className="p-4 border rounded">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.region} • {new Date(a.createdAt).toLocaleDateString()}</p>
              <Link href={`/articles/${a.id}`} className="text-blue-600">Baca</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
