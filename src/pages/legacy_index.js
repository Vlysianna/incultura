import Nav from './components/Nav'

export default function LegacyHome() {
  return (
    <div>
      <Nav />
      <header className="p-8 text-center batik-pattern" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.15), rgba(178,34,34,0.15))' }}>
        <h1 className="text-3xl font-bold" style={{ color: '#5a2b1b' }}>Baca Budaya, Kumpulkan Koin, Tukar Hadiah! (legacy)</h1>
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
