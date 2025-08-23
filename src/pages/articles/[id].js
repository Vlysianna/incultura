import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ArticleDetail() {
  const router = useRouter()
  const { id } = router.query
  const [article, setArticle] = useState(null)

  useEffect(()=>{
    if (!id) return
    fetch('/api/articles').then(r=>r.json()).then(list=>{
      const a = list.find(x=>String(x.id)===String(id))
      setArticle(a)
      const params = new URLSearchParams(window.location.search)
      const userId = params.get('userId')
      if (userId) fetch('/api/articles/view', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ articleId: id, userId: parseInt(userId) }) })
    })
  }, [id])

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
