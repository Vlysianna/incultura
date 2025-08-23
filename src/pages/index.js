import Nav from './components/Nav'

export default function Home() {
  return (
    <div>
      <Nav />
      <header className="p-8 text-center bg-gradient-to-r from-yellow-400 via-red-500 to-amber-800 text-white">
        <h1 className="text-3xl font-bold">Baca Budaya, Kumpulkan Koin, Tukar Hadiah!</h1>
        <p className="mt-4">Platform gamifikasi budaya Indonesia — baca artikel, ikut kuis, kumpulkan koin, tukar merchandise.</p>
      </header>
      <main className="p-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded">Login / Register (NextAuth)</div>
          <div className="p-4 border rounded">Top Articles</div>
          <div className="p-4 border rounded">Leaderboard Snapshot</div>
        </section>
      </main>
    </div>
  )
}
