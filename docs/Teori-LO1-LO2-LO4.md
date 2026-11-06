# Jawaban Teori — LO1, LO2, LO4

> Catatan penggunaan: Ini adalah draf jawaban yang disusun untuk membantu pemahaman.
> Sebelum dikumpulkan, baca ulang, pahami, dan tulis kembali dengan bahasa Anda
> sendiri pada lembar jawaban. Sesuaikan dengan ketentuan penggunaan AI dan lampirkan
> declaration form sesuai aturan mata kuliah.

---

## LO 1 — Arsitektur platform e-commerce (web admin/penjual + mobile pelanggan)

### A. Arsitektur dasar aplikasi web dan mobile

Untuk platform penjualan digital seperti pada soal, arsitektur yang sesuai adalah
**arsitektur berlapis berbasis client–server dengan backend API terpusat** (sering
disebut pola *API-first* / *headless*). Komponennya:

1. **Aplikasi web (administrator & penjual)** — dibangun sebagai *Single Page
   Application* (mis. React) atau aplikasi berbasis framework (mis. Next.js). Web ini
   dipakai untuk tugas berat data: mengelola katalog produk, stok, harga, memproses
   pesanan, dan melihat laporan. Karena penggunanya internal/penjual, fokusnya pada
   tabel data, form, dan dashboard.

2. **Aplikasi mobile (pelanggan)** — dibangun dengan React Native/Flutter. Fokusnya
   pada pengalaman belanja: pencarian produk, detail produk, keranjang, pembayaran,
   dan pelacakan pengiriman. Mobile dipilih untuk pelanggan karena mobilitas, push
   notification, dan akses cepat.

3. **Backend / API layer** — satu kumpulan layanan (REST atau GraphQL) yang diakses
   oleh **web dan mobile** melalui jaringan. Backend memegang logika bisnis,
   autentikasi, dan akses database. Dengan satu sumber kebenaran ini, web dan mobile
   selalu konsisten.

4. **Database** — menyimpan produk, pengguna, pesanan, transaksi. Dapat dipisah per
   domain bila memakai arsitektur microservices.

5. **Layanan eksternal** — *payment gateway* (mis. Midtrans/Stripe) dan *layanan
   logistik* diakses backend melalui API, bukan langsung dari aplikasi klien.

Pola arsitektur yang tepat untuk skala promosi adalah **microservices atau modular
monolith di belakang API gateway**, berjalan di infrastruktur cloud dengan
*load balancer* dan *auto-scaling*.

### B. Analisis pemenuhan persyaratan bisnis & teknis

- **Keamanan transaksi.** Backend terpusat menjadi satu titik untuk menerapkan
  autentikasi (JWT/OAuth2), otorisasi berbasis peran (admin, penjual, pelanggan),
  enkripsi **HTTPS/TLS** di semua jalur, dan validasi input. Data kartu/pembayaran
  **tidak disimpan** di sistem sendiri melainkan didelegasikan ke payment gateway
  (mengurangi beban kepatuhan PCI-DSS). Pemisahan klien–server mencegah logika
  sensitif bocor ke sisi klien.

- **Skalabilitas.** Karena klien *stateless* dan logika ada di backend, layanan bisa
  **di-scale horizontal** (menambah instance) saat lonjakan promosi. Microservices
  memungkinkan hanya bagian yang sibuk (mis. katalog, checkout) yang diperbesar.
  *Load balancer*, *caching* (Redis/CDN), dan *message queue* untuk order yang
  menumpuk menjaga sistem tetap responsif.

- **Integrasi layanan eksternal.** Payment gateway dan logistik diintegrasikan lewat
  **REST API + webhook** di sisi backend. Karena hanya backend yang berkomunikasi
  dengan pihak ketiga, kredensial pihak ketiga aman dan integrasi dapat diganti tanpa
  mengubah aplikasi klien.

- **Performa.** CDN untuk aset/gambar produk, caching hasil query populer, pagination,
  dan indeks database menjaga waktu respons. Mobile memakai *lazy loading* dan
  kompresi gambar.

- **Kemudahan pemeliharaan.** Pemisahan lapisan (klien, API, data) dan modularitas
  membuat fitur baru ditambah tanpa merusak bagian lain. Satu API dipakai dua klien
  → mengurangi duplikasi. Dokumentasi API (OpenAPI/Swagger) dan CI/CD mempercepat
  pengembangan berkelanjutan.

**Kesimpulan:** arsitektur client–server berlapis dengan backend API terpusat di
cloud (microservices + API gateway + auto-scaling) memenuhi kebutuhan keamanan,
skalabilitas, integrasi, performa, dan maintainability platform e-commerce tersebut.

---

## LO 2 — Backend service, REST API, dan UI/UX (platform hotel)

### A. Penjelasan konsep

**Backend service** adalah lapisan server yang menjalankan **logika bisnis** dan
**mengelola data** (kamar, reservasi, pelanggan, transaksi). Ia tidak menampilkan
antarmuka; tugasnya memproses permintaan dari aplikasi web/mobile, menegakkan aturan
(mis. kamar tidak boleh dipesan ganda), mengakses database, dan berinteraksi dengan
layanan luar. Backend menjadi **satu sumber kebenaran** bagi semua klien.

**REST API** (*Representational State Transfer*) adalah gaya arsitektur komunikasi
antar sistem melalui **HTTP**. Sumber daya (resource) seperti `rooms`, `reservations`
diakses lewat URL dan *HTTP method* standar: `GET` (baca), `POST` (buat), `PUT/PATCH`
(ubah), `DELETE` (hapus). Datanya biasanya **JSON**, bersifat *stateless* (tiap
permintaan membawa informasi lengkap, mis. token autentikasi), dan memakai kode status
HTTP (200, 201, 400, 401, 404, 500). REST menjadi "kontrak" agar web, mobile, dan
pihak ketiga bisa saling berkomunikasi.

**Prinsip UI/UX.** *UI* (User Interface) adalah tampilan visual (tata letak, warna,
tombol); *UX* (User Experience) adalah kualitas keseluruhan pengalaman memakai aplikasi.
Prinsip utamanya: **usability** (mudah dipakai), **consistency** (pola seragam),
**feedback** (sistem memberi respons jelas), **hierarchy** (informasi penting menonjol),
**accessibility** (dapat diakses semua pengguna), dan **error prevention** (mencegah
kesalahan serta memberi pesan yang membantu).

### B. Analisis peran tiap komponen

- **Mendukung proses reservasi.** Backend memvalidasi ketersediaan kamar, mengunci
  jadwal agar tidak bentrok, menyimpan reservasi, dan mencatat transaksi. REST API
  menjembatani alur: aplikasi tamu memanggil `GET /rooms?available=...`, lalu
  `POST /reservations`, kemudian `POST /payments`. UI/UX memastikan langkah-langkah
  (cari → pilih → bayar → konfirmasi) jelas sehingga tamu menyelesaikan reservasi
  tanpa bingung.

- **Kemudahan penggunaan aplikasi.** Prinsip UI/UX membuat fitur check-in/out digital
  dan room service dapat dilakukan dengan sedikit langkah, dengan umpan balik status
  (mis. "Check-in berhasil"). Konsistensi antara aplikasi web staf dan mobile tamu
  mengurangi kurva belajar.

- **Keamanan data pelanggan.** Backend menegakkan autentikasi (login tamu/staf),
  **otorisasi berbasis peran** (staf vs tamu), enkripsi (TLS saat transit, hashing
  password), serta validasi input untuk mencegah serangan (SQL/NoSQL injection, XSS).
  Data kartu didelegasikan ke payment gateway.

- **Integrasi dengan sistem eksternal.** REST API memungkinkan backend memanggil
  payment gateway dan layanan pihak ketiga (mis. channel manager/OTA) secara standar.
  *Webhook* dipakai agar status pembayaran/booking terupdate otomatis. Karena kontrak
  REST jelas, mengganti/menambah integrasi minim dampak.

- **Efisiensi komunikasi data.** JSON yang ringkas, pagination, caching, dan endpoint
  yang dirancang sesuai kebutuhan (menghindari *over-/under-fetching*) membuat lalu
  lintas data efisien antara web, mobile, backend, dan pihak ketiga. REST yang
  *stateless* memudahkan *scaling* dan *load balancing*.

**Kesimpulan:** backend service menjadi otak dan penjaga data, REST API menjadi
jembatan komunikasi yang terstandar dan aman, sedangkan prinsip UI/UX memastikan
seluruh alur reservasi mudah, konsisten, dan nyaman — ketiganya saling menopang untuk
platform layanan hotel yang andal dan interoperabel.

---

## LO 4 — Keamanan, cloud deployment, dan maintenance (platform pembelajaran online)

### A. Penjelasan

**Ancaman keamanan aplikasi.** Platform pembelajaran menyimpan data pribadi dan hasil
ujian, sehingga rawan terhadap:
- **Serangan autentikasi** (brute force, kredensial bocor, pembajakan sesi).
- **Injection** (SQL/NoSQL injection) dan **XSS/CSRF** pada antarmuka web.
- **Broken access control** — pengguna mengakses materi/hasil yang bukan haknya.
- **Kebocoran data** saat transit atau saat disimpan (data at rest/in transit).
- **Serangan ketersediaan** (DDoS), terutama berbahaya saat ujian berlangsung.
- **Kecurangan ujian** (akses soal tak sah, manipulasi jawaban/nilai).
Mitigasi: HTTPS/TLS, hashing password, autentikasi kuat (MFA), otorisasi berbasis
peran, validasi & sanitasi input, *rate limiting*, enkripsi data sensitif, pencatatan
(audit log), dan mengikuti praktik seperti **OWASP Top 10**.

**Deployment cloud.** Aplikasi di-*deploy* ke layanan cloud (IaaS/PaaS/kontainer)
agar dapat menampung jumlah pengguna yang terus bertambah. Konsep kunci:
- **Elastisitas / auto-scaling** — menambah/mengurangi sumber daya otomatis sesuai beban.
- **Load balancing** — membagi trafik ke banyak instance.
- **Managed services** — database terkelola, penyimpanan objek (video modul), dan CDN.
- **High availability** — multi-zona/replikasi agar tetap hidup saat satu node gagal.
- **Model tanggung jawab bersama** — penyedia cloud mengamankan infrastruktur, pengembang
  mengamankan aplikasi & konfigurasi.

**Maintenance sistem.** Pemeliharaan berkelanjutan agar platform tetap aman, cepat, dan
tersedia: *patching*/update dependensi, *backup* & uji *restore*, *monitoring* dan
*logging*, perbaikan bug, optimasi performa (indeks DB, caching), serta **deployment
tanpa downtime** (blue-green / rolling update) agar update tidak mengganggu pembelajaran.

### B. Evaluasi peran ketiga aspek

- **Melindungi data pengguna.** Praktik keamanan aplikasi (enkripsi, otorisasi, OWASP)
  ditambah fitur keamanan cloud (enkripsi penyimpanan, kontrol akses, jaringan privat,
  key management) melindungi data registrasi dan hasil ujian. Maintenance menjaga tambalan
  keamanan tetap terbaru sehingga celah baru cepat ditutup.

- **Menjaga performa & ketersediaan.** Auto-scaling dan load balancing cloud menjaga
  sistem responsif **saat ujian berlangsung** (beban puncak). Monitoring mendeteksi
  anomali sejak dini; strategi deployment tanpa downtime memastikan maintenance tidak
  memutus layanan. Backup/replikasi menjaga ketersediaan bila terjadi kegagalan.

- **Memenuhi ketentuan perlindungan data.** Kombinasi enkripsi, kontrol akses, audit log,
  kebijakan retensi, dan lokasi data membantu memenuhi regulasi perlindungan data pribadi
  (mis. UU PDP di Indonesia / prinsip serupa GDPR): data diproses sah, aman, dan dapat
  dipertanggungjawabkan. Audit log juga penting untuk investigasi insiden.

- **Mendukung keberlangsungan layanan.** Maintenance terjadwal, backup teruji, rencana
  pemulihan bencana (*disaster recovery*), dan infrastruktur cloud yang *highly available*
  memastikan proses belajar tidak terganggu dalam jangka panjang. Mitigasi DDoS dan
  kapasitas elastis menjaga layanan tetap jalan saat lonjakan pengguna.

**Kesimpulan:** keamanan aplikasi melindungi *kerahasiaan & integritas* data, deployment
cloud menyediakan *skalabilitas & ketersediaan*, dan maintenance menjaga *keberlanjutan
& kepatuhan*. Ketiganya harus diterapkan bersama dengan praktik terbaik mitigasi risiko
agar platform pembelajaran online aman, andal, patuh regulasi, dan berkelanjutan.
```
