export type Lang = "en" | "id";

export interface Strings {
  // brand / nav
  brandTag: string;
  home: string;
  favorites: string;
  profile: string;
  login: string;
  logout: string;
  signUp: string;
  assistance: string;
  // filters
  all: string;
  movies: string;
  tv: string;
  music: string;
  searchPlaceholder: string;
  // home
  greeting: string;
  spotlight: string;
  watchNow: string;
  addFavorite: string;
  moreDetail: string;
  latestReleases: string;
  topRated: string;
  noContent: string;
  // auth
  welcomeBack: string;
  loginSubtitle: string;
  email: string;
  password: string;
  name: string;
  namePlaceholder: string;
  loginCta: string;
  loggingIn: string;
  noAccount: string;
  createTitle: string;
  registerSubtitle: string;
  passwordHint: string;
  registerCta: string;
  creating: string;
  haveAccount: string;
  demoHint: string;
  vipBadge: string;
  loginFailed: string;
  registerFailed: string;
  passwordTooShort: string;
  // detail
  overview: string;
  watchTrailer: string;
  inFavorites: string;
  reviews: string;
  writeReview: string;
  yourRating: string;
  reviewPlaceholder: string;
  submitReview: string;
  reviewSaved: string;
  reviewError: string;
  ratingRange: string;
  loginToReview: string;
  noReviews: string;
  recommended: string;
  // favorites / profile
  yourFavorites: string;
  noFavorites: string;
  settings: string;
  language: string;
  theme: string;
  darkMode: string;
  lightMode: string;
  account: string;
  // rich home
  continueLabel: string;
  matchForYou: string;
  latestCinematic: string;
  latestCinematicSub: string;
  popularSeries: string;
  popularSeriesSub: string;
  musicTrending: string;
  musicTrendingSub: string;
  seeAll: string;
  seeAllSeries: string;
  watchNowFull: string;
  resume: string;
  // rich detail
  breadcrumbVault: string;
  breadcrumbPremiere: string;
  editorialNote: string;
  synopsis: string;
  castCreators: string;
  castCreatorsSub: string;
  similarTitles: string;
  similarTitlesSub: string;
  communityReviews: string;
  verifiedCommunity: string;
  outOfStars: string;
  recommendPct: string;
  mostPopular: string;
  newest: string;
  loadMore: string;
  specTitle: string;
}

const en: Strings = {
  brandTag: "Entertainment",
  home: "Home",
  favorites: "Favorites",
  profile: "Profile",
  login: "Login",
  logout: "Logout",
  signUp: "Sign up",
  assistance: "Assistance",
  all: "All",
  movies: "Movies",
  tv: "Series",
  music: "Music",
  searchPlaceholder: "Search titles, creators, soundtracks…",
  greeting: "Welcome",
  spotlight: "Weekly Spotlight",
  watchNow: "Watch Trailer",
  addFavorite: "Add to Favorites",
  moreDetail: "More Detail",
  latestReleases: "Latest Releases",
  topRated: "Top Rated",
  noContent: "No content found.",
  welcomeBack: "Welcome Back to BIONhub",
  loginSubtitle:
    "Access the premium catalog and continue your personal watching session.",
  email: "Email Address",
  password: "Password",
  name: "Full Name",
  namePlaceholder: "e.g. Reza Rahadian",
  loginCta: "Sign In Now",
  loggingIn: "Signing in…",
  noAccount: "Don't have an account?",
  createTitle: "Start Your Journey",
  registerSubtitle:
    "Join now and enjoy thousands of blockbusters, exclusive series, and original titles.",
  passwordHint: "Min. 6 characters",
  registerCta: "Register Now",
  creating: "Creating…",
  haveAccount: "Already have an account?",
  demoHint: "Demo: demo@bionhub.com / demo123",
  vipBadge: "ACCESS ALL CONTENT",
  loginFailed: "Login failed",
  registerFailed: "Registration failed",
  passwordTooShort: "Password must be at least 6 characters",
  overview: "Synopsis",
  watchTrailer: "Watch Official Trailer",
  inFavorites: "In Favorites",
  reviews: "Reviews",
  writeReview: "Write a Review",
  yourRating: "Your rating",
  reviewPlaceholder: "Share your thoughts about this title…",
  submitReview: "Submit Review",
  reviewSaved: "Your review was saved.",
  reviewError: "Could not save review.",
  ratingRange: "Rating must be between 1 and 10",
  loginToReview: "Log in to favorite & review",
  noReviews: "No reviews yet. Be the first!",
  recommended: "Recommended For You",
  yourFavorites: "Your Favorites",
  noFavorites: "You haven't added any favorites yet.",
  settings: "Settings",
  language: "Language",
  theme: "Theme",
  darkMode: "Dark",
  lightMode: "Light",
  account: "Account",
  continueLabel: "Continue",
  matchForYou: "98% Match For You",
  latestCinematic: "Latest Cinematic Releases",
  latestCinematicSub: "The most complete studio-grade cinema collection",
  popularSeries: "Popular TV Series",
  popularSeriesSub: "New seasons in lossless 4K HDR broadcast quality",
  musicTrending: "Soundtrack & Trending Music",
  musicTrendingSub: "Original cinematic scores with spatial audio",
  seeAll: "See all",
  seeAllSeries: "See all series",
  watchNowFull: "Watch Now",
  resume: "Resume",
  breadcrumbVault: "Cinema Vault",
  breadcrumbPremiere: "VIP Screening Premiere",
  editorialNote: "Editor's Curated Note",
  synopsis: "Narrative Synopsis",
  castCreators: "Characters & Key Creators",
  castCreatorsSub: "Cast & production leads",
  similarTitles: "Similar Titles Worth Watching",
  similarTitlesSub: "Related cinematic curation",
  communityReviews: "Verified & Community Reviews",
  verifiedCommunity: "Audience & Critics Voice",
  outOfStars: "OUT OF 10 STARS",
  recommendPct: "of users recommend this",
  mostPopular: "Most Popular",
  newest: "Newest",
  loadMore: "Load More Reviews",
  specTitle: "VIP Screening Specs",
};

const id: Strings = {
  brandTag: "Entertainment",
  home: "Beranda",
  favorites: "Favorit",
  profile: "Profil",
  login: "Masuk",
  logout: "Keluar",
  signUp: "Daftar",
  assistance: "Bantuan",
  all: "Semua",
  movies: "Film",
  tv: "Serial",
  music: "Musik",
  searchPlaceholder: "Cari judul, kreator, soundtrack…",
  greeting: "Selamat Datang",
  spotlight: "Sorotan Pekan Ini",
  watchNow: "Tonton Trailer",
  addFavorite: "Tambah ke Favorit",
  moreDetail: "Detail Selengkapnya",
  latestReleases: "Rilis Terbaru",
  topRated: "Rating Tertinggi",
  noContent: "Konten tidak ditemukan.",
  welcomeBack: "Selamat Datang Kembali di BIONhub",
  loginSubtitle:
    "Akses katalog premium dan lanjutkan sesi menonton personalmu.",
  email: "Alamat Email",
  password: "Kata Sandi",
  name: "Nama Lengkap",
  namePlaceholder: "cth. Reza Rahadian",
  loginCta: "Masuk Sekarang",
  loggingIn: "Masuk…",
  noAccount: "Belum punya akun?",
  createTitle: "Mulai Petualangan Menonton",
  registerSubtitle:
    "Bergabung sekarang dan nikmati ribuan blockbuster, serial eksklusif, dan tayangan original.",
  passwordHint: "Min. 6 karakter",
  registerCta: "Daftar Sekarang",
  creating: "Mendaftar…",
  haveAccount: "Sudah punya akun?",
  demoHint: "Demo: demo@bionhub.com / demo123",
  vipBadge: "AKSES SEMUA KONTEN",
  loginFailed: "Gagal masuk",
  registerFailed: "Gagal mendaftar",
  passwordTooShort: "Kata sandi minimal 6 karakter",
  overview: "Sinopsis",
  watchTrailer: "Tonton Trailer Resmi",
  inFavorites: "Sudah Difavoritkan",
  reviews: "Ulasan",
  writeReview: "Tulis Ulasan",
  yourRating: "Nilai kamu",
  reviewPlaceholder: "Bagikan kesanmu tentang judul ini…",
  submitReview: "Kirim Ulasan",
  reviewSaved: "Ulasanmu tersimpan.",
  reviewError: "Gagal menyimpan ulasan.",
  ratingRange: "Rating harus antara 1 dan 10",
  loginToReview: "Masuk untuk favorit & ulasan",
  noReviews: "Belum ada ulasan. Jadilah yang pertama!",
  recommended: "Rekomendasi Untukmu",
  yourFavorites: "Favoritmu",
  noFavorites: "Kamu belum menambahkan favorit.",
  settings: "Pengaturan",
  language: "Bahasa",
  theme: "Tema",
  darkMode: "Gelap",
  lightMode: "Terang",
  account: "Akun",
  continueLabel: "Lanjutkan",
  matchForYou: "98% Cocok Untukmu",
  latestCinematic: "Rilis Sinematik Terbaru",
  latestCinematicSub: "Koleksi sinema layar lebar kualitas studio terlengkap",
  popularSeries: "Serial TV Terpopuler",
  popularSeriesSub: "Musim baru dengan kualitas siaran 4K HDR lossless",
  musicTrending: "Soundtrack & Musik Trending",
  musicTrendingSub:
    "Aransemen orisinal komposer sinematik dengan audio spasial",
  seeAll: "Lihat semua",
  seeAllSeries: "Lihat semua serial",
  watchNowFull: "Tonton Sekarang",
  resume: "Lanjut",
  breadcrumbVault: "Sinema Vault",
  breadcrumbPremiere: "VIP Screening Premiere",
  editorialNote: "Catatan Kurasi Redaksi",
  synopsis: "Sinopsis Naratif",
  castCreators: "Karakter & Kreator Kunci",
  castCreatorsSub: "Pemeran & pengarah produksi",
  similarTitles: "Tayangan Serupa yang Wajib Ditonton",
  similarTitlesSub: "Kurasi sinematik terkait",
  communityReviews: "Ulasan Terverifikasi & Komunitas",
  verifiedCommunity: "Suara Penonton & Kritikus",
  outOfStars: "DARI 10 BINTANG",
  recommendPct: "pengguna merekomendasikan",
  mostPopular: "Terpopuler",
  newest: "Terbaru",
  loadMore: "Muat Lebih Banyak Ulasan",
  specTitle: "Spesifikasi Tayangan VIP",
};

export const translations: Record<Lang, Strings> = { en, id };
