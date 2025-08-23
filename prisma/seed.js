const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const pw = await bcrypt.hash('password', 10)
  const user = await prisma.user.upsert({ where: { email: 'demo@incultura.test' }, update: {}, create: { name: 'Demo User', email: 'demo@incultura.test', password: pw, coins: 0 } })

  await prisma.article.createMany({ data: [
    { title: 'Batik dari Jawa', content: '<p>Sejarah batik...</p>', region: 'Jawa' },
    { title: 'Tari Tor-Tor', content: '<p>Tari tradisional...</p>', region: 'Sumatera Utara' }
  ] })

  await prisma.quiz.createMany({ data: [
    { question: 'Apa motif batik tradisional?', options: JSON.stringify(['Parang','Polka','Chevron']), correctAnswer: 'Parang' }
  ] })

  await prisma.merchandise.createMany({ data: [
    { name: 'Syal Batik', description: 'Syal motif batik', cost: 100 },
    { name: 'Pin Wayang', description: 'Pin bertema wayang', cost: 50 }
  ] })

  console.log('Seeded — demo user:', user.email)
}

main().catch(e=>{ console.error(e); process.exit(1) }).finally(()=>prisma.$disconnect())
