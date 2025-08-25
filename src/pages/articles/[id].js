import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function ArticleDetail() {
  const router = useRouter()
  const { id } = router.query
  const [article, setArticle] = useState(null)
  const { data: session } = useSession()

  useEffect(()=>{
    if (!id) return
    fetch('/api/articles').then(r=>r.json()).then(list=>{
      const a = list.find(x=>String(x.id)===String(id))
      setArticle(a)
      // award coins to signed in user (server derives user from session)
      if (session?.user) {
        fetch('/api/articles/view', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ articleId: id }) })
          .then(r=>r.json()).then(j=>{
            if (j.success) alert('Kamu mendapat +10 koin untuk membaca!')
            else if (j.message) console.log(j.message)
          }).catch(()=>{})
      }
    })
  }, [id, session])

  if (!article) return <div><Nav /><main className="p-8">Loading...</main></div>
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">{article.title}</h1>
        <p className="text-sm text-gray-600">{article.region} • {new Date(article.createdAt).toLocaleDateString()}</p>
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: article.content }} />
      </main>
    </div>
  )
}
