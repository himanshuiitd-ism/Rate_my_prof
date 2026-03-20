# Rate My Prof — Copilot Instructions

**Project:** MVP rating platform for IIT ISM faculty with anonymous ratings, messaging, and community features.

## Architecture

### Tech Stack

- **Backend:** Express.js, MongoDB (Mongoose), Clerk auth
- **Frontend:** React 18 (Vite), Redux Toolkit, React Router, Tailwind CSS
- **Deployment:** Vercel (frontend), Node.js hosting (backend)
- **Data Scraping:** Cheerio (web scraping)
- **File uploads:** Multer

### Backend (`/backend`)

- **Entry:** `src/index.js` — Express server on port 4000
- **Models:** Mongoose schemas in `src/models/` (Professor, Rating, ChatMessage, Community, CommunityMessage, Ad)
- **Routes:** `src/routes/` (professors.js, communities.js, ads.js)
- **Database:**
  - Production: MongoDB via `MONGO_URI` env var
  - Development: In-memory MongoDB Memory Server (default)
- **Authentication:** Clerk middleware (`@clerk/express`) — attached to `req.auth`
- **Scripts:**
  - `npm run dev` — Start with nodemon (auto-restart on changes)
  - `npm run scrape` — Fetch faculty from https://www.iitism.ac.in/all-faculty
  - `npm start` — Start production server
- **CORS:** Configured for `localhost:5173`, `localhost:4001`, and `https://rate-my-prof-mu.vercel.app`

### Frontend (`/frontend`)

- **Entry:** `src/main.jsx` with React Router and Redux store
- **App Structure:**
  - `src/App.jsx` — Main app with navigation shell (Rate mode vs. Community mode)
  - `src/pages/` — Page components (ProfList, ProfPage, CommunityHome, CommunityPage, LandingPage, etc.)
  - `src/redux/` — Redux slices (ProfessorSlice, leaderboardSlice)
  - `src/api.js` — Axios API client for backend calls
  - `src/Appcontext.jsx` — React Context if needed
- **Styling:** Tailwind CSS (`tailwind.config.js`, `postcss.config.js`)
- **Build:** Vite (fast dev server, optimized production build)
- **Scripts:**
  - `npm run dev` — Vite dev server on port 5173
  - `npm run build` — Production build
  - `npm run preview` — Preview built app

## Key Conventions

### Backend

- **ES Modules:** `type: "module"` in package.json
- **Logging:** Use `console.log` with emojis for readability (e.g., `📥`, `🏠`, `❌`)
- **Error handling:** Should include try-catch blocks and proper HTTP status codes
- **Env vars:** `MONGO_URI`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- **File uploads:** Stored in `backend/uploads/` with unique IDs as filenames

### Frontend

- **Component structure:** Functional components with hooks
- **State management:** Redux Toolkit used for global state (professor data, leaderboard)
- **Routing:** React Router v6 with path-based navigation
- **API calls:** Centralized in `src/api.js` using Axios
- **Styling:** Tailwind classes (no separate CSS files except for page-specific overrides like `ProfList.css`)
- **Authentication:** Clerk (`SignedIn`, `UserButton`, `useAuth` hook available)
- **Env vars:** `VITE_CLERK_PUBLISHABLE_KEY`, backend API URL
- **Community Page Design:**
  - Light color scheme: cream/white background (`from-amber-50 to-orange-50`)
  - Sidebar: white cards with light gray borders
  - Messages: Reddit-style white cards that hover on dark backgrounds
  - Community name: large bold heading (text-3xl font-bold)
  - Delete functionality: message senders can delete own messages, admins can delete any
  - Action buttons: emoji-based (👍 for upvote, 🚩 for report, Delete in red)

### Features

- **Two modes:** "Rate mode" (professors) and "Community mode" (messaging/ads)
- **Anonymous ratings:** Users can rate professors without sign-in
- **Authentication:** Optional Clerk integration for enhanced features
- **Messaging:** REST-based chat (no real-time sockets)
- **Web scraping:** Backend scrapes IIT ISM faculty directory on demand
- **Sponsored Ads:**
  - Click tracking: stores number of clicks on each ad
  - Redirect on click: user directed to ad's website link
  - Positioned left/right sidebars on landing page
  - Admin panel: only Priya (priyadarshihimanshu6@gmail.com) can create/manage ads
  - Form includes: title, description, website/logo URL, page, position, badge, custom colors
  - Live preview while editing ads
- **Community Features:**
  - Members can post text, GIFs, files, and emojis
  - Like/upvote messages (👍 button)
  - Report inappropriate content (🚩 button)
  - Message deletion: senders can delete their own messages, community admins can delete any
  - Light UI design with Reddit-like card layout
  - Community-specific sidebar with joined/discover sections

## Development Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env  # Set MONGO_URI for production, leave empty for dev
npm run scrape        # Optional: fetch professors first
npm run dev           # Start server
```

### Frontend

```bash
cd frontend
npm install
npm run dev           # Vite dev server
```

### Full Stack (Parallel)

- Backend: http://localhost:4000 (`npm run dev` in `/backend`)
- Frontend: http://localhost:5173 (`npm run dev` in `/frontend`)

## Common Tasks

### Adding a new API endpoint

1. Create/modify route in `backend/src/routes/`
2. Add model if needed in `backend/src/models/`
3. Add CORS exceptions if accessing from new domain
4. Call from frontend via `src/api.js`

### Adding a new page

1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Link from navigation or other pages
4. Style with Tailwind classes

### Managing state

- Use Redux for shared professor/leaderboard data
- Fetch actions trigger API calls via `src/api.js`
- Update reducers in `frontend/src/redux/`

### Admin Tasks (Priya only)

- **Access Admin Panel:** Sign in and click "⚙️ Admin" button in header (only visible for priyadarshihimanshu6@gmail.com)
- **Create New Ad:**
  1. Go to `/admin/ads`
  2. Fill form: title, description, website URL, logo URL, page, position, badge, color
  3. Preview displays in real-time
  4. Submit to create ad in database
  5. Ad appears on site immediately with click tracking
- **Track Ad Performance:** Check `clickCount` field in MongoDB Ad collection

### Deployment

- **Frontend:** Push to repo, Vercel auto-deploys from git (see `vercel.json`)
- **Backend:** Deploy to Node.js host (Heroku, Railway, etc.)
- **Environment:** Set `MONGO_URI`, `CLERK_*` keys in deployment platform

## Debug Tips

- **Frontend issues:** Check browser DevTools, Redux DevTools (if installed), network tab
- **Backend issues:** Check `console.log` output and `/api/professors` endpoint directly
- **Mongo issues:** Verify `MONGO_URI` format and connection timeout settings
- **Auth issues:** Verify `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set correctly
- **CORS errors:** Add domain to `app.use(cors({ origin: [...] }))` in `backend/src/index.js`

## Pitfalls & Tips

- **Remember:** In-memory DB resets on backend restart — use `npm run scrape` each time if developing
- **Env files:** Both backend and frontend need separate `.env` files
- **Vite env vars:** Frontend must use `import.meta.env.VITE_*` prefix (not `process.env`)
- **Relative imports:** Check that imports use correct relative paths (`.js` extension needed for ES modules)
- **Hot reload:** Backend uses nodemon, frontend uses Vite HMR — both should auto-reload
