# rate_my_prof — Backend

## Quick start

1. cd backend
2. npm install
3. Copy `.env.example` to `.env` and set `MONGO_URI` for production, or leave empty to use an in-memory DB for development.
4. npm run scrape # to fetch professors
5. npm run dev # start server with nodemon

Server default: http://localhost:4000

API:

- GET /api/professors
- GET /api/professors/:id
- POST /api/professors/:id/rate

Note: real-time socket support has been removed; messages are now posted via REST.
