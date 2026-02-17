
# 🎮 Game Info Platform

A modern **Game Discovery Web Application** built with **Next.js 14**, **React Query**, and the **RAWG API**.
It allows users to browse, search, filter, bookmark, and favorite games with authentication and a personalized dashboard.

This project demonstrates real-world frontend architecture including API integration, global state management, caching, authentication flows, pagination, filtering, and UI composition.

---

## 🚀 Live Features

* 🔍 Live Search with suggestions from rawg database
* 🎯 Advanced Filtering (Genres, Platforms, Tags, Items per page) using headlessui
* 📚 Game Categories by Genre
* ❤️ Favorites System
* 🔖 Bookmark System
* 👤 Authentication (DummyJSON API)
* 📊 User Dashboard
* 🧭 Pagination
* 💾 LocalStorage Caching
* ⚡ React Query Data Fetching for auth and live search in navbar
* 🎨 Tailwind UI + Shadcn Components

---

## 🛠 Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **State Management:** React Context + React Query
* **Styling:** Tailwind CSS + Shadcn UI
* **API:** RAWG Video Games API
* **Auth API:** DummyJSON Auth
* **HTTP Client:** Axios / Fetch
* **Icons:** Lucide React
* **Notifications:** React Toastify

---

## 📁 Project Structure

```text
app/
 ├── layout.tsx           # Root layout, providers, navbar, footer
 ├── page.tsx             # Home page
 ├── products/
 │   ├── page.tsx         # Products listing with pagination
 │   ├── results/         # Filtered results page
 │   ├── category/[slug]  # Genre pages
 │   └── [id]/            # Single game page
 ├── dashboard/           # User dashboard
 ├── login/               # Login page
 └── components/
     ├── heroSection/
     ├── gameSection/
     ├── nav/              # can search from api database
     ├── advSearch/
     └── ui/

providers/
 ├── context.tsx          # Global Game Context
 └── query-provider.tsx   # React Query Provider

hooks/
 └── useMe.ts             # Authentication hook

lib/
 └── api-calls.ts         # RAWG API calls
```

---

## 🧠 Architecture Overview

The app follows a **clean separation of concerns**:

* **API Layer** → `lib/api-calls.ts`
* **Global State** → `GameProvider (Context)`
* **Data Fetching** → React Query
* **UI Components** → Modular components
* **Pages** → Next.js App Router
* **Auth Handling** → `useMe` hook + token storage
* **Persistence** → LocalStorage caching

---

## 🌍 Data Flow

```text
RAWG API → fetchGames() → GameProvider → Components
```

* Games are fetched once and cached for **6 hours**.
* Cached games are stored in `localStorage`.
* Favorites & bookmarks persist locally.
* React Query manages authentication state.
* Context provides data across the app.

---

## 🔄 Game Context Logic

`GameProvider` handles:

* Fetching games
* Caching results
* Loading states
* Error handling
* Favorites
* Bookmarks
* Redirecting unauthenticated users

Example:

```ts
const { games, favorite, bookmark, handleFavorite, handleBookmark } = useGames();
```

It ensures consistent state across the entire application.

---

## 🔐 Authentication Flow

* Uses **DummyJSON Auth API**
* On login:

  * Token saved in `localStorage`
  * React Query cache updated
* `useMe()` fetches the current user
* Protected routes redirect unauthenticated users to `/login`

---

## 🔎 Advanced Search System

The search system supports:

* Search term
* Multiple genres
* Multiple platforms
* Multiple tags
* Pagination size

Filters update the URL:

```text
/products/results?q=doom&genres=action&platforms=pc&items=10
```

This allows:

* Sharable URLs
* SEO friendly routing
* Persistent filters

---

## ❤️ Favorites & 🔖 Bookmarks

* Only logged-in users can favorite/bookmark.
* Stored in `localStorage`.
* Displayed in the Dashboard.
* Toggle logic handled centrally inside `GameProvider`.

---

## 📊 Dashboard

The dashboard shows:

* Bookmarked games
* Favorite games
* User greeting
* Logout functionality

It demonstrates protected routing and personalized UI.

---

## 🎨 UI & UX

* Fully responsive layout
* Carousel sliders
* Hover animations
* Live search suggestions
* Dark themed gaming aesthetic

---

## ⚙️ Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key_here
```

Then run:

```bash
npm install
npm run dev
```

---

## 🧪 Demo Login

You can use:

```text
username: emilys
password: emilyspass
```

Or explore more users from:
[https://dummyjson.com/docs](https://dummyjson.com/docs)

---

## 🏆 What This Project Demonstrates

✅ Real-world frontend architecture
✅ API integration
✅ Authentication handling
✅ State management
✅ Performance caching
✅ URL-driven filtering
✅ Modular components
✅ Clean UI composition
✅ Production-ready patterns

---

## 📌 Future Improvements

* Backend persistence
* Server-side authentication
* Infinite scroll
* User profiles
* Reviews system
* Multiplayer filtering

---

## 👨‍💻 Author

Built by **mohsen tebi**
Frontend Developer | React | Next.js

---

