# KuhyaKuya Studio – Dokumentasi Fitur Website

## 1. Deskripsi Umum
KuhyaKuya Studio adalah website jasa editing video dengan fokus pada transparansi harga dan kemudahan pemesanan. Proyek ini dibangun menggunakan HTML, CSS, dan JavaScript murni serta di-deploy sebagai situs statis melalui GitHub Pages.

## 2. Struktur Folder
- `/assets` – skrip utama untuk paket harga dan portofolio.
- `/config` – konfigurasi berupa `prices.json`, `portfolio.json`, dan `promo.json`.
- `/img` – ikon status pembayaran, favicon, dan aset gambar lain.
- `index.html` – halaman utama yang menampilkan paket layanan, portofolio, dan kebijakan global.
- `order.html` – form pemesanan yang menghitung harga otomatis dan mengirim pesan WhatsApp.

## 3. Fitur Utama
- **Paket Layanan**
  - Menampilkan daftar paket dalam bentuk card beserta harga, rincian, dan tombol pemesanan.
  - Paket rekomendasi diberi label khusus.
- **Detail Paket**
  - Card dapat di-flip untuk menampilkan kebijakan khusus setiap paket.
- **Portfolio**
  - Tombol "Tampilkan" dengan indikator diamond; portofolio disembunyikan secara default.
  - Saat ditampilkan, item portofolio muncul dengan animasi fade-in satu per satu.
  - Tombol yang sama dapat menyembunyikan portofolio dengan animasi fade-out.
  - Status ikon `Free`, `Paid`, dan `Unpaid` ditampilkan bersama tooltip penjelasan.
  - Deskripsi mendukung highlight nama paket dengan sintaks `(:pkgID:)` yang diganti menjadi badge.
- **Kebijakan Global**
  - Ditampilkan dalam popup modal dengan background blur dan konten scrollable.
  - Berisi kebijakan lengkap (revisi, hak portofolio, DP, dll.).
  - Terdapat panduan simbol status proyek beserta ikon.
  - Modal muncul dengan animasi slide-up dari bawah layar.

## 4. Animasi dan Interaksi
- Portofolio memakai kelas `show` dan `hide` untuk efek fade-in dan fade-out.
- Modal kebijakan menggunakan `opacity` dan `transform: translateY()` untuk animasi slide-up.
- Fungsi JavaScript mengatur flip card paket, memuat portofolio, serta menyembunyikan/menampilkan item dengan jeda bertahap.

## 5. Cara Menambah / Update Konten
1. **Menambah Paket** – edit `config/prices.json`, tambahkan objek baru di array `packages` dengan detail paket.
2. **Menambah Portofolio** – edit `config/portfolio.json`, tambahkan objek pada array `items` dengan `title`, `description`, `video`, dan `paymentStatus`.
3. **Mengubah Kebijakan Global** – ubah konten di bagian `#policyModal` dalam `index.html`.

## 6. Deployment
1. Commit perubahan ke repositori GitHub.
2. Push ke branch utama yang terhubung ke GitHub Pages.
3. GitHub Pages otomatis menyajikan versi terbaru sebagai situs statis.

