export type Lang = "en" | "id";

// Keys shared across all screens. Keep them flat for simplicity.
export interface Strings {
  // generic
  appTagline: string;
  loading: string;
  retry: string;
  all: string;
  movies: string;
  tv: string;
  music: string;
  // auth - login
  welcomeBack: string;
  loginSubtitle: string;
  email: string;
  password: string;
  login: string;
  loggingIn: string;
  noAccount: string;
  signUp: string;
  demoHint: string;
  loginFailed: string;
  // auth - register
  createAccount: string;
  registerSubtitle: string;
  name: string;
  namePlaceholder: string;
  passwordHint: string;
  creating: string;
  haveAccount: string;
  registerFailed: string;
  passwordTooShort: string;
  vipBadge: string;
  // home
  greeting: string;
  searchPlaceholder: string;
  continueBrowsing: string;
  seeAll: string;
  trending: string;
  latestReleases: string;
  topContent: string;
  noContent: string;
  // detail
  overview: string;
  watchTrailer: string;
  addFavorite: string;
  inFavorites: string;
  reviews: string;
  addRating: string;
  ratingLabel: string;
  reviewPlaceholder: string;
  submitReview: string;
  reviewSaved: string;
  reviewError: string;
  ratingRange: string;
  loginToReview: string;
  noReviews: string;
  cast: string;
  // favorites
  yourFavorites: string;
  noFavorites: string;
  // tabs / nav
  home: string;
  favorites: string;
  profile: string;
  logout: string;
  settings: string;
  language: string;
  theme: string;
  darkMode: string;
  lightMode: string;
  // browse / hero
  watchNow: string;
  moreDetail: string;
  spotlight: string;
  popularSeries: string;
  musicTrending: string;
  browse: string;
}

const en: Strings = {
  appTagline: "Movies • TV • Music",
  loading: "Loading…",
  retry: "Retry",
  all: "All",
  movies: "Movies",
  tv: "TV",
  music: "Music",
  welcomeBack: "Welcome Back",
  loginSubtitle: "Sign in to continue streaming",
  email: "Email",
  password: "Password",
  login: "Sign In Now",
  loggingIn: "Signing in…",
  noAccount: "Don't have an account?",
  signUp: "Sign up",
  demoHint: "Demo: demo@bionhub.com / demo123",
  loginFailed: "Login failed",
  createAccount: "Start Your Journey",
  registerSubtitle: "Join and stream thousands of titles",
  name: "Full Name",
  namePlaceholder: "e.g. Reza Rahadian",
  passwordHint: "Min. 6 characters",
  creating: "Creating…",
  haveAccount: "Already have an account?",
  registerFailed: "Registration failed",
  passwordTooShort: "Password must be at least 6 characters",
  vipBadge: "ACCESS ALL CONTENT",
  greeting: "Welcome",
  searchPlaceholder: "Search movies, series, music…",
  continueBrowsing: "Recommended For You",
  seeAll: "See all",
  trending: "Trending",
  latestReleases: "Latest Releases",
  topContent: "Top Picks",
  noContent: "No content found.",
  overview: "Overview",
  watchTrailer: "Watch Official Trailer",
  addFavorite: "Add to Favorites",
  inFavorites: "In Favorites",
  reviews: "Reviews",
  addRating: "Add Your Rating",
  ratingLabel: "Rating (1–10)",
  reviewPlaceholder: "Write a short review (optional)…",
  submitReview: "Submit Review",
  reviewSaved: "Your review was saved.",
  reviewError: "Could not save review.",
  ratingRange: "Rating must be 1–10",
  loginToReview: "Log in to favorite & review",
  noReviews: "No reviews yet. Be the first!",
  cast: "Cast & Creators",
  yourFavorites: "Your Favorites",
  noFavorites: "You haven't added any favorites yet.",
  home: "Home",
  favorites: "Favorites",
  profile: "Profile",
  logout: "Logout",
  settings: "Settings",
  language: "Language",
  theme: "Theme",
  darkMode: "Dark",
  lightMode: "Light",
  watchNow: "Watch Now",
  moreDetail: "More Detail",
  spotlight: "Weekly Spotlight",
  popularSeries: "Popular TV Series",
  musicTrending: "Trending Music",
  browse: "Browse",
};

const id: Strings = {
  appTagline: "Film • Serial TV • Musik",
  loading: "Memuat…",
  retry: "Coba lagi",
  all: "Semua",
  movies: "Film",
  tv: "Serial",
  music: "Musik",
  welcomeBack: "Selamat Datang Kembali",
  loginSubtitle: "Masuk untuk lanjut menonton",
  email: "Alamat Email",
  password: "Kata Sandi",
  login: "Masuk Sekarang",
  loggingIn: "Masuk…",
  noAccount: "Belum punya akun?",
  signUp: "Daftar di sini",
  demoHint: "Demo: demo@bionhub.com / demo123",
  loginFailed: "Gagal masuk",
  createAccount: "Mulai Petualangan Menonton",
  registerSubtitle: "Bergabung dan nikmati ribuan tontonan",
  name: "Nama Lengkap",
  namePlaceholder: "cth. Reza Rahadian",
  passwordHint: "Min. 6 karakter",
  creating: "Mendaftar…",
  haveAccount: "Sudah punya akun?",
  registerFailed: "Gagal mendaftar",
  passwordTooShort: "Kata sandi minimal 6 karakter",
  vipBadge: "AKSES SEMUA KONTEN",
  greeting: "Selamat Datang",
  searchPlaceholder: "Cari film, serial, musik…",
  continueBrowsing: "Rekomendasi Untukmu",
  seeAll: "Lihat semua",
  trending: "Sedang Tren",
  latestReleases: "Rilis Terbaru",
  topContent: "Pilihan Teratas",
  noContent: "Konten tidak ditemukan.",
  overview: "Sinopsis",
  watchTrailer: "Tonton Trailer Resmi",
  addFavorite: "Tambah ke Favorit",
  inFavorites: "Sudah Difavoritkan",
  reviews: "Ulasan",
  addRating: "Beri Penilaianmu",
  ratingLabel: "Rating (1–10)",
  reviewPlaceholder: "Tulis ulasan singkat (opsional)…",
  submitReview: "Kirim Ulasan",
  reviewSaved: "Ulasanmu tersimpan.",
  reviewError: "Gagal menyimpan ulasan.",
  ratingRange: "Rating harus 1–10",
  loginToReview: "Masuk untuk favorit & ulasan",
  noReviews: "Belum ada ulasan. Jadilah yang pertama!",
  cast: "Pemeran & Kreator",
  yourFavorites: "Favoritmu",
  noFavorites: "Kamu belum menambahkan favorit.",
  home: "Beranda",
  favorites: "Favorit",
  profile: "Profil",
  logout: "Keluar",
  settings: "Pengaturan",
  language: "Bahasa",
  theme: "Tema",
  darkMode: "Gelap",
  lightMode: "Terang",
  watchNow: "Tonton Sekarang",
  moreDetail: "Detail Selengkapnya",
  spotlight: "Sorotan Pekan Ini",
  popularSeries: "Serial TV Terpopuler",
  musicTrending: "Musik Trending",
  browse: "Jelajah",
};

export const translations: Record<Lang, Strings> = { en, id };
