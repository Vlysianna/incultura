import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Nav() {
  const { data: session } = useSession()
  const [coins, setCoins] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(()=>{
    if (session?.user?.id) {
      fetch(`/api/coins?userId=${session.user.id}`).then(r=>r.json()).then(d=>setCoins(d.coins))
      fetch(`/api/profile?userId=${session.user.id}`).then(r=>r.json()).then(d=>setIsAdmin(!!d.user?.isAdmin)).catch(()=>{})
    }
  }, [session])

  return (
    <nav className="bg-red-700 text-white p-4 flex gap-4 items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="font-bold">Incultura</div>
        <Link href="/">Home</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/quiz">Quiz</Link>
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/leaderboard">Leaderboard</Link>
  <Link href="/profile">Profile</Link>
  {isAdmin && <Link href="/admin/articles">Admin</Link>}
      </div>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <div>{session.user.name || session.user.email} {coins !== null && <span>• {coins} koin</span>}</div>
            <button onClick={()=>signOut()} className="bg-white text-red-700 px-2 py-1 rounded">Sign out</button>
          </>
        ) : (
          <>
            <button onClick={()=>signIn()} className="bg-white text-red-700 px-2 py-1 rounded">Sign in</button>
            <Link href="/register" className="underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
