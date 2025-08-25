import Nav from '../components/Nav'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Articles() {
  const { data: session } = useSession()
  const [list, setList] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [region, setRegion] = useState('')
  useEffect(() => { fetch('/api/articles').then(r=>r.json()).then(setList) }, [])

  async function submit(e){
    e?.preventDefault()
    if (!session) return alert('Please sign in')
    const res = await fetch('/api/articles', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ title, content, region }) })
    const j = await res.json()
    setTitle(''); setContent(''); setRegion('')
    fetch('/api/articles').then(r=>r.json()).then(setList)
  }
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Artikel Budaya</h2>
        {session && (
          <form onSubmit={submit} className="mb-6 p-4 border rounded">
            <h3 className="font-semibold mb-2">Tulis Artikel (akan diajukan)</h3>
            <input placeholder="Judul" value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border mb-2" />
            <input placeholder="Region" value={region} onChange={e=>setRegion(e.target.value)} className="w-full p-2 border mb-2" />
            <textarea placeholder="Konten (HTML)" value={content} onChange={e=>setContent(e.target.value)} className="w-full p-2 border mb-2" rows={6} />
            <button className="bg-amber-600 text-white px-4 py-2">Ajukan</button>
          </form>
        )}
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
