# SIH 26122 — AI Planning-to-Execution Bridge

An AI-powered system that connects **Project Schedules** with **Actual Site Work** using Google Gemini AI.

---

## 🧠 What This Does

| Stage | Who | What Happens |
|---|---|---|
| 1. Schedule | Project Manager | Uploads planned activities (what should be done, by when) |
| 2. Field Report | Site Engineer | Submits daily report of actual site work done |
| 3. AI Extraction | Gemini AI | Reads the report and extracts structured execution events |
| 4. AI Matching | Gemini AI | Matches extracted events to planned activities with a confidence score |
| 5. Progress Update | System | Updates progress % and flags delays automatically |

---

## 🖥️ Pages

| URL | Page | Purpose |
|---|---|---|
| `/` | Dashboard | Live KPIs and pipeline overview |
| `/schedule` | Schedule | View & upload planned activities |
| `/reports` | Field Reports | Submit daily site reports |
| `/review` | AI Review | Approve / reject AI matches |
| `/tables` | DB Tables | Live view of all 5 Supabase tables |

---

## ⚙️ Setup on a New Computer

### 1. Install Prerequisites

- **Node.js v18+** → https://nodejs.org
- A terminal (Mac: Terminal, Windows: Command Prompt or Git Bash)

---

### 2. Get the Project Files

Either:
- Extract the ZIP file: `unzip sih-26122-execution-bridge.zip`
- Or clone from GitHub (if available)

Then enter the folder:
```bash
cd sih-26122-execution-bridge
```

---

### 3. Install Dependencies

```bash
npm install
```

This installs all required packages (Next.js, Supabase, Tailwind, etc.)

---

### 4. Create the `.env.local` File ⚠️

This file holds your secret API keys. It is **NOT included in the ZIP** for security.

Create a file called `.env.local` in the root of the project folder and paste this:

```env
NEXT_PUBLIC_SUPABASE_URL=https://bbdgzydicgrsztmmevwb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZGd6eWRpY2dyc3p0bW1ldndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NTkyOTksImV4cCI6MjEwNDUzNTI5OX0.YUVq8UlmIKC-dlDmzSSLXRU_uSYOlybBlLTamyE6XW8
GEMINI_API_KEY=your_gemini_api_key_here
```

> 🔑 Get your Gemini API key for free at: https://aistudio.google.com/app/apikey

---

### 5. Run the App

```bash
npm run dev
```

Open your browser and go to: **http://localhost:3000**

---

## 🗄️ Database (Supabase)

The database is **cloud-hosted** — no local database setup needed.

All team members connect to the **same live Supabase database** automatically using the keys in `.env.local`.

### Tables in the Database

| Table | Description |
|---|---|
| `activities` | Planned project schedule items |
| `field_reports` | Daily field reports submitted by site engineers |
| `execution_events` | AI-extracted structured events from field reports |
| `matches` | AI-matched pairs of activities and execution events |
| `progress_updates` | Calculated progress % and delay status per activity |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Frontend + Backend API routes |
| TypeScript | Type-safe code |
| Tailwind CSS | Styling |
| Supabase (PostgreSQL) | Cloud database |
| Google Gemini API | AI extraction and matching |

---

## 📁 Project Structure

```
sih-26122-execution-bridge/
├── .env.local                  ← Secret keys (create this yourself)
├── app/                        ← All pages and API routes
│   ├── page.tsx                ← Dashboard
│   ├── schedule/page.tsx       ← Activities schedule
│   ├── reports/page.tsx        ← Field report submission
│   ├── review/page.tsx         ← AI match review
│   ├── tables/page.tsx         ← Live database viewer
│   └── api/                    ← Backend API endpoints
├── components/                 ← Reusable UI components
├── lib/                        ← AI engine, Supabase client, business logic
│   ├── supabase.ts             ← Supabase connection
│   ├── gemini/                 ← Gemini AI integration
│   ├── matching/               ← Matching algorithm
│   └── db/store.ts             ← Database read/write functions
├── types/                      ← TypeScript type definitions
└── supabase/schema.sql         ← Database schema reference
```

---

## 👥 Team Notes

- Each team member needs their own `.env.local` file with the same keys
- Never commit `.env.local` to GitHub — it is already in `.gitignore`
- The Supabase database is shared — all teammates see the same live data
- If AI matching fails, check that `GEMINI_API_KEY` is set correctly

---

## 🆘 Troubleshooting

| Problem | Fix |
|---|---|
| `npm install` fails | Make sure Node.js v18+ is installed: `node --version` |
| Page won't load | Make sure you ran `npm run dev` and visit `http://localhost:3000` |
| AI not working | Check your `GEMINI_API_KEY` in `.env.local` |
| Data not saving | Check your Supabase keys in `.env.local` |
| Port already in use | Run: `npx kill-port 3000` then `npm run dev` again |
