# BIONhub — Entertainment Hub (LO3 Project)

A mini **specialized platform** for browsing **movies, TV series, and music**. Users
register / log in, browse and search content, watch trailers, read & write reviews,
give ratings, and build a personal **favorites** list.

The project is a full stack across **three apps**:

| App          | Stack                                                       | Folder     |
| ------------ | ----------------------------------------------------------- | ---------- |
| **Backend**  | Node.js + Express.js + MongoDB (Mongoose) + JWT, TypeScript | `backend/` |
| **Web**      | Next.js (App Router) + React + TypeScript                   | `web/`     |
| **Mobile**   | React Native + Expo + TypeScript                            | `mobile/`  |
| **Database** | MongoDB Atlas (cloud)                                       | —          |

> Stack note: the exam requires **React JS, React Native, and Node JS/Express JS**.
> The web app uses **Next.js**, which is a React framework (so "React JS" is satisfied),
> while the backend remains a **separate Express.js API** exactly as required. Next.js
> is used only for the web client; it does **not** replace Express.

---

## Features (maps to the rubric)

- **Register** page, **Login** page, **Home** page, **Detail** page (the 4 required pages) + a **Favorites** page (bonus).
- Browse by type (Movies / TV / Music), **search**, and open a detail page with **trailer embed**, **rating**, **reviews**, and **favorite** toggle.
- JWT authentication; passwords hashed with bcrypt.
- Self-contained **seed data** (12 titles) — no external API keys needed.

---

## 0. Quick start (satu perintah dari root)

Dari folder root `BIONhub/`, Anda bisa menjalankan backend + web sekaligus:

```bash
npm install            # sekali saja, memasang "concurrently" di root
npm run install:all    # memasang dependency backend + web + mobile sekaligus
npm run seed           # mengisi database Atlas (jalankan setelah .env backend diisi)
npm run dev            # menjalankan backend (port 5000) + web (port 3000) bersamaan
```

Script root yang tersedia:

| Perintah              | Fungsi                                               |
| --------------------- | ---------------------------------------------------- |
| `npm run dev`         | Jalankan **backend + web** bersamaan                 |
| `npm run dev:all`     | Jalankan **backend + web + mobile (Expo)** bersamaan |
| `npm run dev:backend` | Hanya backend                                        |
| `npm run dev:web`     | Hanya web                                            |
| `npm run dev:mobile`  | Hanya mobile (Expo)                                  |
| `npm run seed`        | Isi database dengan data contoh + akun demo          |
| `npm run install:all` | Install dependency ketiga app                        |
| `npm run build`       | Build backend + web untuk produksi                   |

> Catatan: jika muncul error `EADDRINUSE` (port dipakai), berarti ada proses lama
> yang masih berjalan di port 3000/5000. Tutup proses tersebut (atau restart terminal)
> lalu jalankan ulang `npm run dev`.

---

## 1. Prerequisites

- **Node.js 18+** (tested on Node 24) and npm.
- A free **MongoDB Atlas** account + cluster.
- For mobile: the **Expo Go** app on your phone, or an Android/iOS emulator.

---

## 2. MongoDB Atlas setup (one time)

1. Create a free cluster at <https://www.mongodb.com/atlas>.
2. **Database Access** → add a database user (username + password).
3. **Network Access** → add IP `0.0.0.0/0` (allow from anywhere) for easy testing.
4. **Connect → Drivers** → copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Insert the database name `bionhub` before the `?`:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/bionhub?retryWrites=true&w=majority`

---

## 3. Backend — run it first

```bash
cd backend
npm install
# create your .env from the template, then paste your Atlas URI and a JWT secret
copy .env.example .env        # Windows  (use: cp .env.example .env on macOS/Linux)
# edit .env -> set MONGODB_URI and JWT_SECRET

# seed the database with sample content + a demo user
npm run seed

# start the API (dev mode with auto-reload)
npm run dev
# API is now at http://localhost:5000  (health check: http://localhost:5000/api/health)
```

Demo account created by the seed: **demo@bionhub.com** / **demo123**

Production build: `npm run build` then `npm start`.

### API endpoints

| Method | Route                       | Auth | Purpose                         |
| ------ | --------------------------- | ---- | ------------------------------- |
| POST   | `/api/auth/register`        | —    | Create account, returns JWT     |
| POST   | `/api/auth/login`           | —    | Log in, returns JWT             |
| GET    | `/api/auth/me`              | ✔    | Current user (with favorites)   |
| GET    | `/api/content`              | —    | List/search/filter content      |
| GET    | `/api/content/:id`          | —    | Content detail + reviews        |
| POST   | `/api/content/:id/reviews`  | ✔    | Add / update your review+rating |
| GET    | `/api/favorites`            | ✔    | Your favorites                  |
| POST   | `/api/favorites/:contentId` | ✔    | Toggle a favorite               |

---

## 4. Web (Next.js)

```bash
cd web
npm install
copy .env.example .env.local   # set NEXT_PUBLIC_API_URL (default http://localhost:5000/api)
npm run dev
# open http://localhost:3000
```

Pages: `/register`, `/login`, `/` (home), `/content/[id]` (detail), `/favorites`.

Production build (also used by hosts like Vercel): `npm run build`.

---

## 5. Mobile (React Native + Expo)

```bash
cd mobile
npm install
# IMPORTANT: set the API URL your phone can reach.
#   Edit src/config.ts -> API_URL
#   - Physical phone (Expo Go): use your PC's LAN IP, e.g. http://192.168.1.10:5000/api
#     (run `ipconfig` on Windows to find the IPv4 address)
#   - Android emulator: http://10.0.2.2:5000/api
#   - iOS simulator:    http://localhost:5000/api
npm start
# scan the QR code with Expo Go
```

Screens: Login, Register, Home, Detail, Favorites.

> Tip: for a backend your phone can always reach, deploy the backend (section 6) and
> point `API_URL` at the hosted URL.

---

## 6. Free hosting suggestions (for submission)

- **Backend** → Render.com (free web service). Set env vars `MONGODB_URI`, `JWT_SECRET`,
  `CLIENT_ORIGINS`. Build: `npm install && npm run build`. Start: `npm start`.
- **Web** → Vercel (connects to the `web/` folder). Set `NEXT_PUBLIC_API_URL` to the Render URL.
- **Mobile** → publish with `npx expo start` and share the **Expo Go QR**, or build an
  APK with `eas build -p android --profile preview`.

---

## 7. Project structure

```
BIONhub/
├─ backend/   Express + Mongoose REST API (TypeScript)
│  └─ src/  (config, models, controllers, routes, middleware, data, seed)
├─ web/       Next.js App Router web client (TypeScript)
│  └─ src/  (app/ routes, components, context, lib)
├─ mobile/    Expo React Native app (TypeScript)
│  └─ src/  (screens, context, api, config, theme)
└─ docs/      Documentation + theory answers (LO1, LO2, LO4)
```
