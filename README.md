# LA FLYDERM Website

Website marketing dan katalog produk skincare LA FLYDERM. Project ini menampilkan informasi brand, rekomendasi produk, testimoni pelanggan, artikel edukasi, serta tautan pembelian melalui marketplace.

Project dibangun sebagai single-page application menggunakan React, TypeScript, Vite, Tailwind CSS, dan React Router.

## Fitur Project

### Beranda (`/`)

- Hero section brand dan tombol belanja.
- Informasi keunggulan produk.
- Pilihan karakter kulit.
- CTA menuju Shopee dan Tokopedia.
- Navigasi responsif desktop dan mobile.
- Footer dengan navigasi, marketplace, dan media sosial.
- Animasi reveal saat section masuk ke viewport.

### Halaman Produk (`/produk`)

- Hero katalog produk.
- Rekomendasi perawatan untuk kulit normal/kering.
- Daftar produk dengan tautan pembelian di Shopee.
- CTA pembelian melalui marketplace.

Komponen untuk kulit berminyak dan kulit sensitif tersedia di project, tetapi saat ini masih dinonaktifkan pada `src/pages/Produk.tsx`.

### Halaman Testimoni (`/testimoni`)

- Hero testimoni.
- Pembuka pengalaman pelanggan.
- Testimoni dan hasil penggunaan untuk kulit kering.
- Ringkasan manfaat produk.
- CTA menuju marketplace.

### Halaman Artikel (`/artikel`)

- Menampilkan daftar artikel dari WordPress REST API.
- Detail artikel berdasarkan slug melalui `/artikel/:slug`.
- Mendukung judul, excerpt, isi artikel, dan featured image.
- Memiliki loading dan fallback state.

Endpoint artikel yang digunakan:

```text
https://laflyderm.com/cms_artikel123123/index.php?rest_route=/wp/v2/posts&_embed&per_page=6&page=1
```

### Halaman 404

Route yang tidak ditemukan diarahkan ke halaman `NotFound` dengan tautan kembali ke beranda.

## Route

| Route | Keterangan | Status |
|---|---|---|
| `/` | Beranda | Aktif |
| `/produk` | Katalog produk | Aktif |
| `/testimoni` | Testimoni pelanggan | Aktif |
| `/artikel` | Daftar artikel | Aktif |
| `/artikel/:slug` | Detail artikel | Aktif |
| `*` | Halaman 404 | Aktif |
| `/terms-of-service` | Syarat dan ketentuan | Belum diaktifkan |
| `/privacy-policy` | Kebijakan privasi | Belum diaktifkan |

Route halaman legal masih dikomentari di `src/App.tsx`.

## Teknologi

- React 18
- TypeScript
- Vite 5
- React Router DOM
- Tailwind CSS
- Radix UI
- TanStack React Query
- Lucide React
- Font Awesome
- Motion
- WordPress REST API

## Persyaratan

- Node.js versi LTS
- npm atau Bun
- Koneksi internet untuk API WordPress, font, dan aset eksternal

## Instalasi

```bash
npm install
```

Atau:

```bash
bun install
```

## Menjalankan Project

### Development

```bash
npm run dev
```

Server development menggunakan port `3030`:

```text
http://localhost:3030
```

### Build Production

```bash
npm run build
```

Hasil build berada di folder `dist/`.

### Preview Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Struktur Folder

```text
.
├── public/                  # File statis publik
├── src/
│   ├── assets/               # Logo dan gambar lokal
│   ├── components/
│   │   ├── article/          # Komponen artikel
│   │   ├── home/             # Komponen beranda
│   │   ├── produk/           # Komponen halaman produk
│   │   ├── testimoni/        # Komponen halaman testimoni
│   │   └── ui/               # Komponen UI reusable
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utility
│   ├── pages/                # Halaman berdasarkan route
│   ├── App.tsx               # Konfigurasi provider dan routing
│   ├── App.css               # Style tambahan
│   └── index.css             # Style global dan animasi
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

Alias import `@` mengarah ke folder `src`.

Contoh:

```ts
import Navbar from "@/components/home/Navbar";
```

## Integrasi Eksternal

### Marketplace

- Shopee: `https://s.shopee.co.id/9pYT2lMgwD`
- Tokopedia: `https://www.tokopedia.com/speechlessbeautyinnovation`

Beberapa produk memiliki URL Shopee langsung di `src/components/produk/ListDry.tsx`.

### Media Sosial

- Instagram: `https://www.instagram.com/laflyderm/`
- TikTok: `https://www.tiktok.com/@laflyderm`

### WordPress

Konten artikel diambil dari WordPress REST API. Tipe data artikel didefinisikan di `src/components/article/wp.ts`.

Jika endpoint berubah, URL fetch dan konfigurasi proxy di `vite.config.ts` perlu diperbarui.

## Desain dan Animasi

- Font utama: Plus Jakarta Sans.
- Font heading: Playfair Display.
- Warna aksen utama: `#C5A059`.
- Animasi reveal menggunakan class `liftoff`, `drift-left`, dan `drift-right`.
- Hook `useReveal` digunakan untuk mengaktifkan animasi ketika elemen terlihat.
- Beberapa card menggunakan efek hover, floating, dan shadow.

## Cara Mengubah Konten

1. Ubah susunan section pada file di `src/pages/`.
2. Ubah isi section pada folder komponen terkait.
3. Ubah data produk dan URL pembelian di `src/components/produk/`.
4. Ubah navigasi pada `src/components/home/Navbar.tsx`.
5. Tambahkan route baru di `src/App.tsx` sebelum route `*`.
6. Jalankan `npm run lint` dan `npm run build` setelah perubahan.

## Catatan Deployment

Project menggunakan `BrowserRouter`, sehingga server production harus mengarahkan route yang tidak berupa file fisik kembali ke `index.html`. Tanpa konfigurasi fallback ini, route seperti `/produk` dan `/artikel` dapat menghasilkan 404 saat dibuka langsung.

Pastikan juga:

- Folder `dist/` digunakan sebagai document root.
- API WordPress mengizinkan request dari domain deployment.
- Font dan gambar eksternal dapat diakses.
- Semua tautan marketplace sudah benar.

## Keterbatasan Saat Ini

- Belum terdapat automated test.
- Konten artikel bergantung pada WordPress REST API.
- Sebagian gambar menggunakan URL eksternal.
- Halaman privacy policy dan terms belum aktif.
- Beberapa section produk/testimoni masih dinonaktifkan.
- Sebagian tautan footer masih menggunakan `#`.
- Tidak ada backend, database, autentikasi, cart, atau checkout internal.
- Transaksi dilakukan melalui marketplace eksternal.
