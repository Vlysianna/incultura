import Nav from '../components/Nav'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function QuizPage() {
  const [q, setQ] = useState(null)
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')

  const { data: session } = useSession()
  const load = ()=> fetch('/api/quiz').then(r=>r.json()).then(setQ)
  useEffect(()=>{ load() }, [])

  const submit = async ()=>{
    const userId = session?.user?.id
    if (!userId) return setMessage('Please sign in to participate')
    const res = await fetch('/api/quiz', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ quizId: q.id, answer: selected, userId }) })
    const j = await res.json()
    setMessage(j.correct ? 'Benar! +20 koin' : 'Salah')
    setTimeout(()=>{ setMessage(''); load() }, 1500)
  }

  return (
    <div>
      <Nav />
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Kuis Budaya</h2>
        {q ? (
          <div className="p-4 border rounded">
            <p className="font-semibold">{q.question}</p>
            <ul className="mt-2">
              {q.options.map(o=> (
                <li key={o} className={`p-2 border ${selected===o? 'bg-yellow-200':''}`} onClick={()=>setSelected(o)}>{o}</li>
              ))}
            </ul>
            <button className="mt-4 bg-amber-600 text-white px-4 py-2" onClick={submit}>Jawab</button>
            <div className="mt-2">{message}</div>
          </div>
        ) : <div>Loading...</div>}
      </main>
    </div>
  )
}
