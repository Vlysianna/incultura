/*
  Development seed script.
  WARNING: This script truncates core tables (articles, quiz, merchandise, activity) for a clean dev dataset.
  Run ONLY in a development environment.
*/
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  // Safety check (optional) – comment out if using in CI seed on fresh DB
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Do not run this seed in production!')
  }

  // Clean tables (order matters due to FKs)
  await prisma.activity.deleteMany()
  await prisma.article.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.merchandise.deleteMany()

  // Users
  const pw = await bcrypt.hash('password', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@incultura.test' },
    update: {},
    create: { name: 'Admin', email: 'admin@incultura.test', password: pw, coins: 500, isAdmin: true }
  })
  const user = await prisma.user.upsert({
    where: { email: 'demo@incultura.test' },
    update: {},
    create: { name: 'Demo User', email: 'demo@incultura.test', password: pw, coins: 120 }
  })

  // Articles (short factual summaries; rewritten to avoid copyright issues)
  const articles = [
    {
      title: 'Batik Tulis: Warisan Budaya dari Jawa',
      region: 'Jawa',
      status: 'APPROVED',
      content: '<p>Batik tulis adalah teknik menghias kain dengan malam panas memakai canting. Motif klasik seperti Parang dan Kawung memiliki makna filosofi tentang keselarasan, kekuatan, dan kebijaksanaan.</p>'
    },
    {
      title: 'Angklung: Harmoni Bambu dari Sunda',
      region: 'Jawa Barat',
      status: 'APPROVED',
      content: '<p>Angklung terbuat dari bambu dan menghasilkan nada ketika digetarkan. UNESCO menetapkannya sebagai Warisan Budaya Takbenda pada 2010.</p>'
    },
    {
      title: 'Rendang: Kuliner Minangkabau Mendunia',
      region: 'Sumatera Barat',
      status: 'APPROVED',
      content: '<p>Rendang dimasak perlahan dalam santan dan rempah hingga kering. Hidangan ini melambangkan kesabaran dan kehormatan dalam budaya Minang.</p>'
    },
    {
      title: 'Wayang Kulit: Teater Bayangan Filosofis',
      region: 'Jawa Tengah',
      status: 'APPROVED',
      content: '<p>Wayang kulit memadukan sastra, musik gamelan, dan filosofi Jawa. Kisah diambil dari epos Mahabharata dan Ramayana yang diserap ke konteks lokal.</p>'
    },
    {
      title: 'Ulos: Simbol Kehangatan Batak',
      region: 'Sumatera Utara',
      status: 'PENDING',
      content: '<p>Ulos adalah kain tenun tangan yang dipakai pada upacara adat Batak sebagai simbol restu, persatuan, dan perlindungan.</p>'
    }
  ]

  for (const a of articles) {
    await prisma.article.create({ data: { ...a, authorId: a.status === 'PENDING' ? user.id : admin.id } })
  }

  // Quiz questions with categories (budaya, makanan, musik, pakaian, general)
  const quizData = [
    { question: 'Motif batik klasik yang bergelombang diagonal disebut?', options: ['Parang', 'Mega Mendung', 'Kawung', 'Lereng'], correctAnswer: 'Parang', category: 'budaya' },
    { question: 'Alat musik bambu dari Jawa Barat yang digetarkan?', options: ['Sasando', 'Angklung', 'Talempong', 'Kolintang'], correctAnswer: 'Angklung', category: 'musik' },
    { question: 'Makanan Minangkabau yang dimasak lama hingga kering?', options: ['Pempek', 'Gudeg', 'Rendang', 'Rawon'], correctAnswer: 'Rendang', category: 'makanan' },
    { question: 'Kain tenun khas Batak disebut?', options: ['Songket', 'Lurik', 'Ulos', 'Endek'], correctAnswer: 'Ulos', category: 'pakaian' },
    { question: 'Tokoh pewayangan Punakawan yang gemuk dan lucu?', options: ['Semar', 'Gareng', 'Petruk', 'Bagong'], correctAnswer: 'Bagong', category: 'budaya' },
    { question: 'Alat musik petik dari Nusa Tenggara Timur berbahan daun lontar?', options: ['Sasando', 'Siter', 'Kecapi', 'Celempung'], correctAnswer: 'Sasando', category: 'musik' },
    { question: 'Kuliner fermentasi kedelai dari Jawa Tengah?', options: ['Tempe', 'Tape', 'Lempok', 'Oncom'], correctAnswer: 'Tempe', category: 'makanan' },
    { question: 'Pakaian adat pria Bali berupa kain lilit bawah?', options: ['Jarik', 'Kamen', 'Sarung', 'Songket'], correctAnswer: 'Kamen', category: 'pakaian' },
    { question: 'Motif awan pada batik Cirebon dikenal sebagai?', options: ['Parang', 'Kawung', 'Mega Mendung', 'Truntum'], correctAnswer: 'Mega Mendung', category: 'budaya' },
    { question: 'Musik tradisional Minangkabau menggunakan alat pukul logam kecil?', options: ['Talempong', 'Gamelan', 'Gong', 'Rebana'], correctAnswer: 'Talempong', category: 'musik' }
  ]
  await prisma.quiz.createMany({ data: quizData.map(q => ({ ...q, options: JSON.stringify(q.options) })) })

  // Merchandise (sample cultural items) — price unit: coins
  const merchandise = [
    { name: 'Kain Batik Tulis Parang', description: 'Kain batik tulis motif Parang klasik.', price: 300, category: 'Souvenir', inStock: true },
    { name: 'Mini Wayang Kulit', description: 'Replika wayang kulit ukuran kecil.', price: 180, category: 'Kerajinan', inStock: true },
    { name: 'Angklung Mini Dekoratif', description: 'Angklung bambu hias untuk meja.', price: 150, category: 'Kerajinan', inStock: true },
    { name: 'Topeng Barong Mini', description: 'Miniatur topeng Barong dari Bali.', price: 220, category: 'Souvenir', inStock: true },
    { name: 'Pin Enamel Motif Mega Mendung', description: 'Pin enamel motif batik Mega Mendung.', price: 60, category: 'Aksesori', inStock: true },
    { name: 'Gelang Manik Dayak', description: 'Gelang manik warna-warni khas Dayak.', price: 90, category: 'Aksesori', inStock: true },
    { name: 'Ulos Tenun Mini', description: 'Potongan kecil kain Ulos dekoratif.', price: 140, category: 'Tekstil', inStock: true },
    { name: 'Kuliner Kering Rendang (Vacuum)', description: 'Paket kecil rendang kering (simulasi item).', price: 200, category: 'Kuliner', inStock: true }
  ]
  await prisma.merchandise.createMany({ data: merchandise })

  console.log('Seed complete:')
  console.log(`  Admin: ${admin.email}`)
  console.log(`  User:  ${user.email}`)
  console.log(`  Articles: ${articles.length}`)
  console.log(`  Quizzes: ${quizData.length}`)
  console.log(`  Merchandise: ${merchandise.length}`)
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
