# Movie & TV Discovery Platform

A modern **Movie & TV Discovery Web Application** built with **Next.js 16, React 19, TypeScript, and the Watchmode API**.

The platform allows users to discover movies and TV shows, explore genres, search for titles, apply advanced filters, view title details, and manage their favorite and bookmarked titles.

The project focuses on practical frontend development concepts, including API integration, server-side API routes, data fetching and caching, state management, URL-based filtering, pagination, and reusable UI components.

---

## Features

- **Movie & TV Discovery** – Browse movies and TV series using Watchmode data.
- **Live Search** – Search for titles with autocomplete suggestions.
- **Advanced Search** – Filter titles by search term, genres, and content type.
- **Genre Categories** – Explore titles by genre.
- **Title Details** – View detailed information about individual movies and TV shows.
- **Favorites** – Save favorite titles.
- **Bookmarks** – Keep a personal list of bookmarked titles.
- **Authentication** – Login functionality using the DummyJSON authentication API.
- **User Dashboard** – Access personalized favorites and bookmarks.
- **Pagination** – Browse titles across multiple pages.
- **Data Caching** – Use TanStack Query to manage server data and reduce unnecessary requests.
- **Responsive UI** – Adapt the interface to desktop and mobile screens.
- **Reusable Components** – Modular components for navigation, search, movie cards, carousels, and UI elements.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| Data Fetching | TanStack React Query |
| HTTP Client | Axios |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Radix UI, Headless UI |
| Icons | Lucide React, Heroicons, React Icons |
| Carousel | Embla Carousel |
| Notifications | React Toastify, Sonner |
| API | Watchmode |
| Authentication API | DummyJSON |

---

## Project Structure

```text
app/
├── api/
│   ├── genres/
│   │   └── route.ts
│   ├── home/
│   │   └── route.ts
│   ├── search/
│   │   └── route.ts
│   └── title/
│       ├── route.ts
│       └── [id]/
│           └── route.ts
│
├── components/
│   ├── advSearch/
│   │   ├── advanceSearch.tsx
│   │   ├── dropdown.tsx
│   │   ├── LiveSearchResults.tsx
│   │   └── SelectedFilters.tsx
│   │
│   ├── heroSection/
│   │   ├── heroCallToAdvSearch.tsx
│   │   ├── heroCarousel.tsx
│   │   └── herosection.tsx
│   │
│   ├── movieSection/
│   │   ├── movielist.tsx
│   │   ├── moviesCard.tsx
│   │   └── moviesCarousel.tsx
│   │
│   ├── nav/
│   │   ├── mobileNavbar/
│   │   │   └── navBotton.tsx
│   │   ├── movieSearch.tsx
│   │   └── navbar.tsx
│   │
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── carousel.tsx
│   │
│   ├── avatar.tsx
│   ├── footer.tsx
│   ├── Loading.tsx
│   └── siteicon.tsx
│
├── api/                         # API route handlers
├── dashboard/
│   └── page.tsx
├── login/
│   ├── loginform.tsx
│   └── page.tsx
├── products/
│   ├── [id]/
│   │   ├── movieError.tsx
│   │   └── page.tsx
│   ├── category/
│   │   └── [genre]/
│   │       └── page.tsx
│   ├── results/
│   │   ├── ResultsClient.tsx
│   │   └── page.tsx
│   └── page.tsx
│
├── global-error.tsx
├── globals.css
├── layout.tsx
└── page.tsx

components/
└── ui/                          # Additional shared UI components

hooks/
├── useMe.ts
├── use-mobile.ts
├── usemovieFilters.ts
└── useMovies.ts

lib/
├── api-calls.ts
├── persistrdstate.ts
├── type.ts
└── utils.ts

providers/
├── context.tsx
└── query-provider.tsx

utils/
├── adv-filters.ts
└── clsx.ts
└── watchmode/
    └── api.ts

public/
└── img/
    └── icon.png

README.md
package.json
tsconfig.json
next.config.ts
```

---

## Architecture Overview

The application follows a separation-of-concerns approach.

### 1. API Layer

`utils/watchmode/api.ts`

Handles communication with the Watchmode API.

The API key is kept on the server and is not exposed directly to the browser.

### 2. Next.js API Routes

The application uses Next.js Route Handlers as an intermediary between the frontend and Watchmode.

| Endpoint | Purpose |
|---|---|
| `/api/home` | Fetch homepage titles |
| `/api/genres` | Retrieve available genres |
| `/api/search` | Search for titles |
| `/api/title` | Retrieve title listings |
| `/api/title/[id]` | Retrieve individual title details |

### 3. API Calls

`lib/api-calls.ts`

Contains frontend functions for communicating with the application's API routes using Axios.

### 4. Data Fetching and Caching

`hooks/useMovies.ts`

Contains reusable TanStack Query hooks for:

- Homepage titles
- Movie and TV listings
- Live search
- Individual title details
- Movie genres

TanStack Query handles loading states, error states, caching, and query management.

### 5. Global State

`providers/context.tsx`

Manages shared application state such as favorites and bookmarks.

`providers/query-provider.tsx`

Provides the TanStack Query client to the application.

### 6. UI Components

The `app/components/` directory contains reusable components for navigation, advanced search, movie cards, carousels, and page sections.

---

## Data Flow

```text
                  Watchmode API
                       |
                       v
              utils/watchmode/api.ts
                       |
                       v
              Next.js API Routes
                       |
                       v
                 Axios Requests
                       |
                       v
                TanStack Query
                       |
                       v
                 React Components
                       |
                       v
                    UI
```

The application separates external API communication from frontend components.

This makes the application easier to maintain and allows data fetching logic to be reused across different pages.

---

## Search and Filtering

The advanced search system supports:

- Search by title
- Multiple genre selection
- Movie and TV series filtering
- Configurable items per page
- URL-based filter parameters

Example:

```text
/products/results?q=batman&genres=1&type=movie&items=20
```

Filters are represented in URL query parameters, allowing users to share filtered result pages and preserve search criteria when navigating.

---

## Homepage and Discovery

The homepage provides a starting point for discovering movies and TV shows.

It includes:

- Hero carousel
- Search and advanced search access
- Movie and TV discovery sections
- Reusable title cards and carousels

The homepage uses a curated initial collection of popular titles rather than loading the entire Watchmode catalogue.

---

## Authentication and User Dashboard

The application includes a login flow using DummyJSON authentication.

The dashboard provides access to user-related functionality, including favorites and bookmarks.

Favorites and bookmarks are managed through the application's shared state and persistence utilities.

Note: Authentication and user data are currently based on external demo authentication and frontend state, not a production-grade backend authentication system.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
WATCHMODE_API_KEY=your_watchmode_api_key
```

Get an API key from:

https://api.watchmode.com/

**Important:** Keep your API key server-side. Do not prefix it with `NEXT_PUBLIC_` or expose it in client-side code.

Never commit `.env.local` to GitHub.

---

## Installation and Setup

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project:

```bash
cd YOUR_PROJECT_FOLDER
```

Install dependencies:

```bash
npm install
```

Create `.env.local` and configure your Watchmode API key.

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build the production application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Future Improvements

- More advanced filtering options
- Improved search across larger title collections
- Better pagination and discovery experience
- Production-ready authentication
- Backend persistence for favorites and bookmarks
- User profiles
- Reviews and ratings
- Automated testing
- Performance and accessibility improvements

---

## What This Project Demonstrates

- Next.js App Router architecture
- TypeScript in a React application
- REST API integration
- Server-side API key management
- TanStack Query and server-state caching
- Global state management with React Context
- URL-driven search and filtering
- Reusable component architecture
- Responsive UI development
- Authentication flow integration

---

## Author

**Mohsen Tebi**

Frontend Developer | React | Next.js | TypeScript
