# How to Run This Project on Any PC

## Prerequisites
- **Node.js**: v18.17 or higher (Recommended: Node v20+ or v24)
  - Download from: https://nodejs.org/

---

## Quick Setup Steps

1. **Extract / Unzip** this archive to any folder on the new computer.
2. **Open a terminal (PowerShell, Command Prompt, or VS Code Terminal)** in this folder.
3. **Install dependencies**:
   ```bash
   npm install
   ```
   *(Note: On Windows PowerShell if `npm` is blocked by execution policy, use `npm.cmd install`)*

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   *(or `npm.cmd run dev`)*

5. **Open in browser**:
   Visit **[http://localhost:3000](http://localhost:3000)**

---

## Login Credentials

| Role | Step 1 Card | Login ID | Password | Landing Page |
|---|---|---|---|---|
| **Head Engineer** | Select 👔 **Head Engineer** | `head.engineer` | `head@123` | **All Projects Registry** (`/projects`) |
| **Site Engineer** | Select 👷 **Site Engineer** | `site.engineer` | `site@123` | **Assigned Project Hub** (`/dashboard`) |

*(There is also an **Auto Fill** button on the login screen for quick demo access)*

---

## Project Structure
- `app/` — Next.js 14 App Router pages, APIs, and layouts
- `components/` — React UI components (Dashboard, Navbar, Review, Auth)
- `lib/` — Business logic, Authentication (`auth.js`), Data Store (`store.js`), Delay AI evaluator
- `.env.local` — Supabase database configuration & API keys
- `supabase/` — Database schema definitions
