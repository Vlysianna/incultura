import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="bg-red-700 text-white p-4 flex gap-4 items-center">
      <div className="font-bold">Incultura</div>
      <Link href="/">Home</Link>
      <Link href="/articles">Articles</Link>
      <Link href="/quiz">Quiz</Link>
      <Link href="/marketplace">Marketplace</Link>
      <Link href="/leaderboard">Leaderboard</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  )
}
