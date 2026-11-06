# Dokumentasi Proyek LO3 — BIONhub (Entertainment Hub)

> Dokumen ini adalah kerangka dokumentasi untuk dikumpulkan (simpan sebagai Word/PDF).
> Isi bagian bertanda **[ISI]** dengan link dan screenshot milik Anda.

## 1. Identitas

- **Nama / NIM:** [ISI] / 2802686885
- **Mata Kuliah:** COSC6014036 — Specialized Platform Development
- **Judul Aplikasi:** BIONhub — Entertainment Hub (film, serial TV, musik)

## 2. Ringkasan Aplikasi

BIONhub adalah platform hiburan yang menyediakan informasi film, serial TV, dan musik.
Pengguna dapat mencari konten, melihat detail beserta trailer/video, membaca dan menulis
ulasan, memberi rating, serta menyimpan konten favorit. Aplikasi tersedia dalam bentuk
**web** dan **mobile**, dengan **registrasi/login** wajib untuk fitur personalisasi.

Referensi gaya: IMDb, Letterboxd, Netflix Web, Spotify Web.

## 3. Teknologi yang Digunakan

| Komponen | Teknologi                                              |
| -------- | ------------------------------------------------------ |
| Web      | Next.js (App Router) + React + TypeScript              |
| Mobile   | React Native + Expo + TypeScript                       |
| Backend  | Node.js + Express.js + TypeScript (REST API, JWT auth) |
| Database | MongoDB Atlas (Mongoose ODM)                           |

> Catatan: persyaratan soal (React JS, React Native, Node JS/Express JS) terpenuhi.
> Next.js adalah framework React (memenuhi "React JS"), dan backend tetap memakai
> Express.js terpisah.

## 4. Alur Aplikasi (Application Flow)

1. **Register / Login** → pengguna membuat akun atau masuk. Backend mengeluarkan
   **JWT** yang disimpan di klien (localStorage di web, AsyncStorage di mobile).
2. **Home** → menampilkan daftar konten (grid poster). Pengguna dapat **mencari**
   (judul/artis) dan **memfilter** (All / Movies / TV / Music).
3. **Detail** → membuka satu konten: poster, sinopsis, genre, rating rata-rata,
   **trailer/video**, tombol **favorit**, form **rating + ulasan**, dan daftar ulasan.
4. **Favorites** → daftar konten yang disimpan pengguna (butuh login).
5. Semua data (konten, ulasan, favorit, user) tersimpan di **MongoDB Atlas** dan
   diakses melalui **REST API** backend.

Diagram alur sederhana:

```
[Mobile / Web Client]  --HTTP/JSON (REST)-->  [Express API]  -->  [MongoDB Atlas]
      |  (JWT di header Authorization)             |
      |                                            +--> auth, content, favorites
      +-- Register/Login -> Home -> Detail -> Favorites
```

## 5. Daftar Halaman (memenuhi minimal 4 halaman)

| #   | Halaman  | Web (route)     | Mobile (screen) |
| --- | -------- | --------------- | --------------- |
| 1   | Register | `/register`     | RegisterScreen  |
| 2   | Login    | `/login`        | LoginScreen     |
| 3   | Home     | `/`             | HomeScreen      |
| 4   | Detail   | `/content/[id]` | DetailScreen    |

### Fitur tambahan pada web & mobile (improvisasi desain)

Baik aplikasi **web (Next.js)** maupun **mobile (React Native)** mengadopsi gaya
**Glassmorphic Dark** dari desain Stitch/Figma "Entertainment Hub" (warna, font Syne +
Plus Jakarta Sans, kartu kaca, ambient glow, aksen merah & emas) dan menambahkan:

- **Mode Terang & Gelap (Light/Dark)** dan **Bahasa Inggris & Indonesia (EN/ID)** —
  bisa diganti dari header maupun halaman Profil, tersimpan otomatis.
- **Halaman Profil** (halaman ke-6 di web, ke-5 di mobile): info akun + pengaturan
  tema/bahasa + logout.
- Semua konten (daftar, hero, rating, ulasan, favorit) memakai **data nyata dari
  backend MongoDB**, bukan data statis.
- Halaman web: Home (spotlight + rekomendasi + rating tertinggi), Detail (hero sinematik
  - trailer + ulasan), Favorites, Profil, serta Login/Register bergaya split-screen.

### Fitur tambahan pada mobile (improvisasi desain)

Mobile app mengadopsi gaya **Glassmorphic Dark** dari desain Stitch/Figma dan menambahkan:

- **Mode Terang & Gelap (Light/Dark)** — bisa diganti dari halaman Profil, tersimpan otomatis.
- **Bahasa Inggris & Indonesia (EN/ID)** — toggle di header tiap halaman dan di Profil, tersimpan otomatis.
- **Halaman Profil** (screen ke-5) berisi info akun, pengaturan tema & bahasa, dan logout.
- **Bottom tab bar** (Beranda / Favorit / Profil), hero card konten rating tertinggi,
  baris horizontal "Rekomendasi", grid "Rilis Terbaru", dan daftar "Pilihan Teratas"
  bernomor — semuanya memakai data nyata dari backend.
- Elemen desain yang tidak didukung backend (login Google/Apple, Face ID, unduh offline)
  sengaja dihilangkan agar aplikasi tetap fungsional sesuai instruksi tugas.
  | 5 | Favorites\* | `/favorites` | FavoritesScreen |

\* Halaman tambahan (bonus) di luar syarat minimum.

## 6. Struktur Endpoint API

| Method | Route                       | Auth | Fungsi                      |
| ------ | --------------------------- | ---- | --------------------------- |
| POST   | `/api/auth/register`        | —    | Daftar akun                 |
| POST   | `/api/auth/login`           | —    | Login                       |
| GET    | `/api/auth/me`              | ✔    | Profil + favorit            |
| GET    | `/api/content`              | —    | List/cari/filter konten     |
| GET    | `/api/content/:id`          | —    | Detail konten + ulasan      |
| POST   | `/api/content/:id/reviews`  | ✔    | Tambah/ubah ulasan & rating |
| GET    | `/api/favorites`            | ✔    | Daftar favorit              |
| POST   | `/api/favorites/:contentId` | ✔    | Toggle favorit              |

## 7. Cara Menjalankan (Ringkas)

Lihat `README.md` di root untuk langkah lengkap. Singkatnya:

1. `backend`: isi `.env` (MONGODB_URI Atlas + JWT_SECRET) → `npm install` → `npm run seed` → `npm run dev`.
2. `web`: `npm install` → set `NEXT_PUBLIC_API_URL` → `npm run dev` → buka `http://localhost:3000`.
3. `mobile`: `npm install` → set `API_URL` di `src/config.ts` (IP LAN PC) → `npm start` → scan QR Expo Go.

Akun demo: **demo@bionhub.com** / **demo123**

## 8. Link Submission

- **Figma (desain UI/UX):** [ISI link Figma]
- **Web hosting (Vercel):** [ISI link]
- **Backend hosting (Render):** [ISI link]
- **Source code (zip/rar di online storage):** [ISI link Google Drive/dll]
- **Mobile (Expo Go QR / APK):** [ISI link / tempel gambar QR]

## 9. Screenshot Aplikasi

> Tempel screenshot di sini (web & mobile).

- [ ] Register (web) — [ISI screenshot]
- [ ] Login (web) — [ISI screenshot]
- [ ] Home (web) — [ISI screenshot]
- [ ] Detail + trailer (web) — [ISI screenshot]
- [ ] Favorites (web) — [ISI screenshot]
- [ ] Register (mobile) — [ISI screenshot]
- [ ] Login (mobile) — [ISI screenshot]
- [ ] Home (mobile) — [ISI screenshot]
- [ ] Detail (mobile) — [ISI screenshot]
- [ ] Favorites (mobile) — [ISI screenshot]

## 10. Checklist Penilaian

- [ ] **[10 pts]** Desain UI/UX di Figma (link aktif, dapat diakses dosen)
- [ ] **[15 pts]** Web — minimal 4 halaman, berjalan baik
- [ ] **[15 pts]** Mobile — minimal 4 halaman, berjalan baik (Expo Go/APK)
- [ ] **[15 pts]** Server + database — API + MongoDB Atlas berjalan
- [ ] Dokumentasi lengkap (alur, link, screenshot) dalam Word/PDF
- [ ] Source code dapat dieksekusi (web, backend, mobile)
- [ ] AI use declaration form (sesuai ketentuan)

```

```
