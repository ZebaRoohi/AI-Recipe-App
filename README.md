# Recipe App — Login scaffold

This workspace contains a minimal scaffold for the login functionality.

Backend (Express + Node): d:/Aiprojects/ReceipeApp/backend
- create a Postgres database and set `DATABASE_URL` in `.env`
- copy `.env.example` to `.env` and adjust
- run `npm install` then `npm run dev`

Frontend (React + Vite): d:/Aiprojects/ReceipeApp/frontend
- run `npm install` then `npm run dev`

API endpoints:
- POST `/api/auth/register` { email, password }
- POST `/api/auth/login` { email, password }

Next steps: run DB migration (`backend/db/init.sql`), then start backend and frontend.
