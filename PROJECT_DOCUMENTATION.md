# Dokumentasi Proyek: Incultura

## 1. Ringkasan Proyek

**Incultura** adalah sebuah aplikasi web yang dirancang untuk memperkenalkan dan melestarikan budaya Indonesia melalui pendekatan gamifikasi. Pengguna dapat belajar tentang berbagai aspek budaya dengan membaca artikel dan menguji pengetahuan mereka melalui kuis. Sebagai imbalan, mereka akan mendapatkan "koin" yang dapat ditukarkan dengan merchandise eksklusif.

**Fitur Utama:**
- **Artikel Budaya**: Pengguna dapat membaca artikel informatif tentang berbagai budaya di Indonesia.
- **Kuis Interaktif**: Menguji pengetahuan pengguna tentang konten yang telah mereka pelajari.
- **Sistem Koin**: Pengguna mendapatkan koin setelah menyelesaikan kuis atau aktivitas lainnya.
- **Marketplace**: Tempat untuk menukarkan koin dengan merchandise.
- **Leaderboard**: Menampilkan peringkat pengguna berdasarkan koin yang mereka kumpulkan.
- **Sistem Autentikasi**: Pengguna dapat mendaftar dan masuk ke akun mereka.

---

## 2. Tumpukan Teknologi (Tech Stack)

- **Framework**: **Next.js** (menggunakan App Router dan Pages Router secara hybrid).
- **Database**: **MySQL**.
- **ORM**: **Prisma**.
- **Autentikasi**: **NextAuth.js**.
- **Styling**: **TailwindCSS**.
- **Animasi**: **Framer Motion**.
- **Pustaka Ikon**: **Lucide React**.
- **Deployment**: Direkomendasikan menggunakan **Vercel**.

---

## 3. Arsitektur & Struktur Folder

Proyek ini mengadopsi struktur standar Next.js dengan beberapa kustomisasi untuk memisahkan logika dan komponen.

```
incultura/
├── prisma/                 # Skema database Prisma dan file seed
│   ├── schema.prisma
│   └── seed.js
├── public/                 # Aset statis (gambar, font, dll.)
├── src/
│   ├── app/                # Halaman utama menggunakan App Router
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/         # Komponen React yang dapat digunakan kembali
│   │   ├── common/         # Komponen umum (Card, Button, dll.)
│   │   ├── articles/       # Komponen spesifik untuk fitur artikel
│   │   └── ...
│   ├── lib/                # Kode utilitas dan konfigurasi
│   │   ├── auth/           # Logika terkait NextAuth
│   │   └── prisma.js       # Inisialisasi klien Prisma
│   ├── pages/              # Halaman dan API menggunakan Pages Router
│   │   ├── api/            # Endpoints API (e.g., /api/leaderboard)
│   │   └── ...
│   └── ...
├── package.json            # Daftar dependensi dan skrip proyek
└── README.md               # Panduan singkat proyek
```

- **`src/app`**: Berisi halaman-halaman utama yang dibangun dengan Next.js App Router. Ini adalah pendekatan modern untuk routing di Next.js.
- **`src/pages`**: Sebagian besar digunakan untuk **API Routes** (dalam `src/pages/api`). Ini memungkinkan backend berjalan di lingkungan yang sama dengan frontend.
- **`src/components`**: Semua komponen UI diorganisir di sini untuk modularitas.
- **`prisma`**: Direktori ini sangat penting karena mendefinisikan seluruh struktur data aplikasi.

---

## 4. Model Data (Skema Database)

Skema database didefinisikan dalam `prisma/schema.prisma` dan mencakup model-model berikut:

- **`User`**:
  - `id`: ID unik pengguna.
  - `name`, `email`, `password`: Informasi kredensial.
  - `coins`: Jumlah koin yang dimiliki pengguna (inti dari gamifikasi).
  - `isAdmin`: Menandakan apakah pengguna adalah admin.

- **`Article`**:
  - `id`: ID unik artikel.
  - `title`, `content`, `image`, `region`: Konten artikel.
  - `status`: Status moderasi (`PENDING`, `APPROVED`, `REJECTED`).

- **`Quiz`**:
  - `id`: ID unik kuis.
  - `question`, `options`, `correctAnswer`: Struktur pertanyaan kuis.
  - `category`: Kategori kuis.

- **`Merchandise`**:
  - `id`: ID unik merchandise.
  - `name`, `description`, `image`: Detail produk.
  - `price`: Harga dalam koin.
  - `inStock`: Ketersediaan stok.

- **`Activity`**:
  - `id`: ID unik aktivitas.
  - `userId`, `type`, `detail`, `coins`: Mencatat setiap aktivitas yang menghasilkan koin.

---

## 5. Panduan Instalasi & Setup Lokal

Untuk menjalankan proyek ini di lingkungan lokal, ikuti langkah-langkah berikut:

1.  **Clone Repository**:
    ```bash
    git clone <url-repository>
    cd incultura
    ```

2.  **Install Dependensi**:
    ```bash
    npm install
    ```

3.  **Konfigurasi Database**:
    - Buat file `.env` di root proyek.
    - Tambahkan URL koneksi database MySQL Anda ke dalam file `.env`:
      ```
      DATABASE_URL="mysql://<user>:<password>@<host>:<port>/<database>"
      ```

4.  **Migrasi dan Seed Database**:
    - Jalankan migrasi untuk membuat tabel-tabel sesuai skema Prisma.
    - Jalankan seed untuk mengisi data awal (pengguna, kuis, dll.).
    ```bash
    npx prisma db push
    node prisma/seed.js
    ```

5.  **Jalankan Server Development**:
    ```bash
    npm run dev
    ```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).
