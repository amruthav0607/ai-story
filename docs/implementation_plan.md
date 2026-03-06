# Life Chapters – AI Storybook Generator

A full-stack demo app where users create personal storybooks from people who influenced their lives.

**Tech Stack:** Node.js + Express, SQLite (via `better-sqlite3`), vanilla HTML/CSS/JS frontend, `jsPDF` for export.

## Proposed Changes

### Project Foundation

#### [NEW] [package.json](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/package.json)
- Express, `better-sqlite3`, `bcryptjs`, `express-session`, `uuid`
- Dev: `nodemon`

#### [NEW] [server.js](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/server.js)
- Express server on port 3000
- Session middleware, JSON body parser, static file serving from `public/`
- Mount route modules for auth, people, chapters, storybook

---

### Backend: Database & Auth

#### [NEW] [db.js](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/db.js)
- SQLite init with tables: `users` (id, username, email, password_hash), `people` (id, user_id, name, role, memory), `chapters` (id, person_id, user_id, title, narrative, style)

#### [NEW] [routes/auth.js](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/routes/auth.js)
- `POST /api/auth/register` – validate, hash password with bcrypt, create user
- `POST /api/auth/login` – verify credentials, set session
- `POST /api/auth/logout` – destroy session
- `GET /api/auth/me` – return current user from session

---

### Backend: People & Chapters API

#### [NEW] [routes/people.js](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/routes/people.js)
- `GET /api/people` – list user's people
- `POST /api/people` – add person (name, role, memory)
- `DELETE /api/people/:id` – remove entry

#### [NEW] [routes/chapters.js](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/routes/chapters.js)
- `POST /api/chapters/generate` – generate chapter for a person using AI logic
- `POST /api/chapters/deep-dive` – [NEW] transform a long life story into a multi-chapter storybook
- `GET /api/chapters` – list all user's chapters
- `GET /api/storybook` – return assembled storybook (ordered chapters)

---

### AI Story Generation

#### [NEW] [ai/generator.js](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/ai/generator.js)
- `generateChapter(person, style)` – builds a rich narrative chapter using template-based generation
- `expandDeepDive(person, storyText, style)` – [NEW] analyzes a long story, identifies phases, and generates multiple chapters
- Three style engines: **casual**, **poetic**, **inspirational**
- Generates: chapter title (role-based), opening hook, narrative body, closing reflection
- No external API key needed – works fully offline for the demo

---

### Frontend Pages

#### [NEW] [public/index.html](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/public/index.html)
- Landing page with app description, login/register nav

#### [NEW] [public/auth.html](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/public/auth.html)
- Login/register toggle form

#### [NEW] [public/dashboard.html](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/public/dashboard.html)
- Multi-entry form for adding people (name, role dropdown, memory textarea)
- Cards showing added people with delete/generate/deep-dive actions
- Style selector (casual/poetic/inspirational)
- Deep Dive modal for pasting long stories, redesigned to match the premium "Generate Your Storybook" aesthetic (centered layout, rich glassmorphism, large action button)
- "Generate All Chapters" and "View Storybook" buttons

#### [NEW] [public/storybook.html](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/public/storybook.html)
- Full storybook reader with chapter navigation (prev/next)
- Relationship map visualization (SVG/canvas-based radial diagram)
- Timeline view of people entries
- Export to PDF button, optional sharing toggle

---

### Frontend Assets

#### [NEW] [public/css/style.css](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/public/css/style.css)
- Dark theme with warm accent colors, glassmorphism cards
- Smooth page transitions, micro-animations
- Google Font (Inter/Outfit), responsive layout

#### [NEW] [public/js/app.js](file:///C:/Users/Amrutha.V/.gemini/antigravity/scratch/life-chapters/public/js/app.js)
- Auth flow (register/login/logout), API calls
- Dashboard: dynamic people cards, form handling, generation triggers
- Storybook: chapter reader, navigation, relationship map rendering
- PDF export using jsPDF (loaded from CDN)

---

## Verification Plan

### Automated (Browser Testing)
1. **Start server** – `cd C:\Users\Amrutha.V\.gemini\antigravity\scratch\life-chapters && npm start`
2. **Landing page** – navigate to `http://localhost:3000`, verify page loads
3. **Register** – create account, verify redirect to dashboard
4. **Add people** – add 2-3 entries, verify cards appear
5. **Generate chapters** – click generate, verify chapters are created
6. **View storybook** – navigate chapters, check relationship map
7. **Export PDF** – click export, verify download triggers

### Manual Verification
- Visual inspection of UI aesthetics (dark theme, animations, glassmorphism)
- PDF content review
