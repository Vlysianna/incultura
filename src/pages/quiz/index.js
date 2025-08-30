import Nav from '../components/Nav'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuizPage() {
  const { data: session } = useSession()
  const [q, setQ] = useState(null)
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')
  const [answerStatus, setAnswerStatus] = useState(null) // 'correct' | 'wrong' | null
  const { data: session } = useSession()

  const load = ()=> fetch('/api/quiz').then(r=>r.json()).then((data)=>{
    setQ(data)
    setSelected(null)
    setAnswerStatus(null)
    setMessage('')
  })

  useEffect(()=>{ load() }, [])

  const submit = async ()=>{
    if (!selected) return setMessage('Pilih salah satu jawaban dulu!')
    const userId = session?.user?.id
    if (!userId) return setMessage('Silakan login untuk ikut kuis')

    const res = await fetch('/api/quiz', { 
      method:'POST', 
      headers:{'content-type':'application/json'}, 
      body: JSON.stringify({ quizId: q.id, answer: selected, userId }) 
    })
    const j = await res.json()
    setAnswerStatus(j.correct ? 'correct' : 'wrong')
    setMessage(j.correct ? 'Benar! +20 koin' : 'Salah, coba lagi!')
    setTimeout(()=>{ load() }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col">
      <Nav />
      <main className="flex-1 pt-28 pb-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[#a92d23]">Kuis Budaya</h2>
        {q ? (
          <AnimatePresence mode="wait">
            <motion.div 
              key={q.id}
              initial={{ opacity:0, y:30 }} 
              animate={{ opacity:1, y:0 }} 
              exit={{ opacity:0, y:-30 }}
              transition={{ duration:0.4 }}
              className="p-6 bg-white rounded-xl shadow-md border border-[#f3d099]"
            >
              <p className="font-semibold text-lg text-[#a92d23]">{q.question}</p>
              <ul className="mt-4 space-y-3 text-[#a92d23]">
                {q.options.map(o=> (
                  <motion.li 
                    key={o} 
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selected===o 
                        ? 'bg-amber-200 border-amber-400' 
                        : 'hover:bg-amber-50'
                    }`}
                    onClick={()=>setSelected(o)}
                  >
                    {o}
                  </motion.li>
                ))}
              </ul>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-6 py-2 rounded shadow-md"
                onClick={submit}
              >
                Jawab
              </motion.button>

              {message && (
                <motion.div 
                  initial={{ opacity:0, y:20 }} 
                  animate={{ opacity:1, y:0 }} 
                  className={`mt-4 font-semibold flex items-center gap-2 ${
                    answerStatus==='correct' 
                      ? 'text-green-600' 
                      : answerStatus==='wrong'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {answerStatus==='correct' && (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {answerStatus==='wrong' && (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span>{message}</span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin h-8 w-8 border-4 border-amber-400 border-t-transparent rounded-full"></div>
            <span className="ml-3 text-amber-600 font-medium">Memuat soal...</span>
          </div>
        )}
      </main>
      <footer className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white py-6 px-4 mt-8">
        <div className="text-center">
          <p className="text-[#f3d099] text-sm md:text-base">
            © {new Date().getFullYear()} Incultura. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  )
}