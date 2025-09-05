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

  // Articles (in-depth, researched content)
  const articles = [
    {
      title: 'Candi Borobudur: Mandala Kosmis di Jantung Jawa',
      region: 'Jawa Tengah',
      status: 'APPROVED',
      content: `
        <p>Candi Borobudur, sebuah mahakarya arsitektur Buddha Mahayana, berdiri megah di Magelang, Jawa Tengah. Dibangun pada abad ke-9 oleh Dinasti Syailendra, candi ini bukan sekadar bangunan, melainkan representasi kosmologi Buddha dalam bentuk batu.</p>
        <p>Strukturnya terbagi menjadi tiga tingkatan utama yang melambangkan alam spiritual: <strong>Kamadhatu</strong> (alam nafsu), <strong>Rupadhatu</strong> (alam rupa), dan <strong>Arupadhatu</strong> (alam tak berwujud). Pengunjung secara simbolis bergerak dari alam duniawi di dasar menuju pencerahan di puncak.</p>
        <p>Dinding candi dihiasi oleh 2.672 panel relief yang membentang lebih dari 1.2 km. Relief di tingkat Rupadhatu menceritakan kisah-kisah Jataka (kehidupan Buddha sebelum lahir sebagai Pangeran Siddhartha) dan Lalitavistara (riwayat hidup Buddha Gautama). Puncaknya adalah Arupadhatu, di mana 72 stupa berlubang mengelilingi satu stupa induk yang masif, melambangkan nirwana.</p>
      `
    },
    {
      title: 'Tari Kecak: Drama Ramayana dalam Suara Manusia',
      region: 'Bali',
      status: 'APPROVED',
      content: `
        <p>Tari Kecak adalah salah satu pertunjukan seni paling ikonik dari Bali, yang unik karena tidak menggunakan iringan gamelan sama sekali. Seluruh musiknya dihasilkan secara akapela oleh paduan suara sekitar 50-70 pria yang duduk melingkar.</p>
        <p>Mereka menyerukan "cak-cak-cak" secara ritmis, menciptakan atmosfer yang intens. Suara ini melambangkan pasukan kera (Vanara) yang dipimpin oleh Hanuman dalam membantu Rama melawan Rahwana. Di tengah lingkaran, para penari utama memerankan fragmen dari epos <strong>Ramayana</strong>, biasanya berpusat pada kisah penculikan Sita oleh Rahwana.</p>
        <p>Meskipun berakar dari ritual Sanghyang (tarian untuk mengusir roh jahat), Kecak modern seperti yang kita kenal dikembangkan pada tahun 1930-an melalui kolaborasi antara seniman Bali I Wayan Limbak dan pelukis Jerman Walter Spies.</p>
      `
    },
    {
      title: 'Subak: Filosofi Tri Hita Karana dalam Irigasi Bali',
      region: 'Bali',
      status: 'APPROVED',
      content: `
        <p>Subak adalah sistem irigasi tradisional yang telah menghidupi persawahan terasering di Bali selama lebih dari seribu tahun. Namun, Subak lebih dari sekadar sistem pengairan; ia adalah manifestasi dari filosofi <strong>Tri Hita Karana</strong>.</p>
        <p>Filosofi ini menekankan keharmonisan hubungan antara tiga elemen: <em>Parahyangan</em> (Tuhan), <em>Pawongan</em> (manusia), dan <em>Palemahan</em> (alam). Air tidak diperlakukan sebagai komoditas, melainkan anugerah yang dikelola secara adil melalui ritual di pura-pura air (Pura Ulun Danu) dan musyawarah antar petani.</p>
        <p>Setiap Subak memiliki organisasinya sendiri, di mana petani bertemu untuk memutuskan jadwal tanam dan distribusi air. Karena integrasi unik antara praktik spiritual, sosial, dan ekologis ini, UNESCO mengakui Subak sebagai Situs Warisan Dunia pada tahun 2012.</p>
      `
    },
    {
      title: 'Rendang: Bukan Sekadar Makanan, Tapi Simbol Budaya',
      region: 'Sumatera Barat',
      status: 'PENDING',
      content: `
        <p>Rendang, yang sering dinobatkan sebagai salah satu hidangan terlezat di dunia, adalah masakan daging kaya rempah dari Minangkabau, Sumatera Barat. Proses memasaknya yang lambat (disebut <em>merandang</em>) membuat bumbu meresap sempurna dan berfungsi sebagai pengawet alami.</p>
        <p>Dalam budaya Minang, Rendang memiliki makna filosofis. Empat bahan utamanya melambangkan masyarakat Minangkabau: <strong>dagiang</strong> (daging) melambangkan Niniak Mamak (pemimpin adat), <strong>karambia</strong> (kelapa) melambangkan Cadiak Pandai (kaum intelektual), <strong>lado</strong> (cabai) melambangkan Alim Ulama (pemimpin agama), dan <strong>pemasak</strong> (bumbu) melambangkan keseluruhan masyarakat.</p>
        <p>Rendang secara tradisional disajikan dalam upacara adat dan acara-acara penting sebagai hidangan kehormatan.</p>
      `
    }
  ]

  for (const a of articles) {
    await prisma.article.create({ data: { ...a, authorId: a.status === 'PENDING' ? user.id : admin.id } })
  }

  // Quiz questions directly related to the articles above
  const quizData = [
    // Borobudur Quizzes
    { question: 'Tiga tingkatan kosmologi yang digambarkan dalam struktur Candi Borobudur adalah...', options: ['Dunia Bawah, Tengah, Atas', 'Kamadhatu, Rupadhatu, Arupadhatu', 'Swarga, Madya, Naraka', 'Bhur, Bhuva, Swah'], correctAnswer: 'Kamadhatu, Rupadhatu, Arupadhatu', category: 'budaya' },
    { question: 'Relief di Candi Borobudur yang menceritakan kehidupan Buddha sebelum lahir sebagai Pangeran Siddhartha dikenal sebagai?', options: ['Lalitavistara', 'Jataka', 'Avadana', 'Gandavyuha'], correctAnswer: 'Jataka', category: 'budaya' },
    
    // Kecak Quizzes
    { question: 'Paduan suara "cak-cak" dalam Tari Kecak melambangkan pasukan...', options: ['Raksasa', 'Dewa', 'Kera (Vanara)', 'Manusia'], correctAnswer: 'Kera (Vanara)', category: 'seni' },
    { question: 'Tari Kecak unik karena tidak menggunakan iringan musik dari...', options: ['Gamelan', 'Angklung', 'Manusia', 'Gendang'], correctAnswer: 'Gamelan', category: 'seni' },
    { question: 'Kisah yang paling sering diangkat dalam pertunjukan Tari Kecak berasal dari epos?', options: ['Mahabharata', 'Ramayana', 'Sutasoma', 'Arjuna Wiwaha'], correctAnswer: 'Ramayana', category: 'seni' },

    // Subak Quizzes
    { question: 'Filosofi yang mendasari sistem irigasi Subak di Bali adalah...', options: ['Bhinneka Tunggal Ika', 'Tri Hita Karana', 'Hasta Brata', 'Catur Muka'], correctAnswer: 'Tri Hita Karana', category: 'budaya' },
    { question: 'Lembaga sentral dalam pengelolaan air pada sistem Subak adalah...', options: ['Balai Desa', 'Pasar Adat', 'Pura Air', 'Banjar'], correctAnswer: 'Pura Air', category: 'budaya' },

    // Rendang Quizzes
    { question: 'Dalam filosofi Rendang, daging (dagiang) merupakan simbol dari?', options: ['Masyarakat', 'Kaum Intelektual', 'Pemimpin Adat (Niniak Mamak)', 'Ulama'], correctAnswer: 'Pemimpin Adat (Niniak Mamak)', category: 'makanan' },
    { question: 'Proses memasak Rendang yang lambat dan lama disebut...', options: ['Menggulai', 'Menumis', 'Merandang', 'Membakar'], correctAnswer: 'Merandang', category: 'makanan' },
    { question: 'Selain sebagai hidangan, fungsi asli dari bumbu Rendang yang dimasak hingga kering adalah sebagai...', options: ['Pewarna alami', 'Obat tradisional', 'Pengawet alami', 'Penambah aroma'], correctAnswer: 'Pengawet alami', category: 'makanan' }
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
