import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function AdminArticles(){
  const { data: session } = useSession()
  const [list, setList] = useState([])
  useEffect(()=>{ fetch('/api/articles').then(r=>r.json()).then(setList) }, [])

  async function takeAction(id, action){
    if (!session) return alert('Admin sign in required')
    const res = await fetch('/api/articles/approve', { method:'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ articleId: id, action }) })
    const j = await res.json()
    fetch('/api/articles').then(r=>r.json()).then(setList)
  }

  const pending = list.filter(a=>a.status==='PENDING')

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Moderasi Artikel (Admin)</h2>
      {!session && <p className="mb-4">Silakan sign in sebagai admin untuk melakukan moderasi.</p>}
      {pending.length===0 && <p>Tidak ada artikel menunggu persetujuan.</p>}
      <ul className="space-y-4">
        {pending.map(a=> (
          <li key={a.id} className="p-4 border rounded">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-gray-600">oleh {a.author?.name || a.authorId} - {a.region}</p>
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: a.content.slice(0,400) }} />
            <div className="mt-3 space-x-2">
              <button onClick={()=>takeAction(a.id,'APPROVED')} className="px-3 py-1 bg-green-600 text-white rounded">Setujui</button>
              <button onClick={()=>takeAction(a.id,'REJECTED')} className="px-3 py-1 bg-red-600 text-white rounded">Tolak</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
