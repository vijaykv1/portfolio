# Varun Vijaykumar — Personal Portfolio

A personal portfolio built with **Next.js 16**, featuring an AI chatbot representative (Herald), an interactive constellation knowledge graph, and full dark/light mode support.

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero with constellation graph, role cycling, and skills marquee |
| `/Experience` | Professional timeline — 4 roles, 2 degrees |
| `/Projects` | Project showcase |
| `/Skills` | Skill groups, certifications, and language proficiency |
| `/Ask-Me` | Chat with **Herald**, my AI representative (auth required) |
| `/Contact` | Contact form via Formspree |
| `/Legal` | Legal disclaimers |

---

## Tech Stack

- **Framework** — Next.js 16 (App Router) + React 19
- **Styling** — Tailwind CSS v4
- **Auth** — NextAuth v5 (Google & GitHub OAuth)
- **Icons** — Lucide React + React Icons
- **AI Chat** — Herald backend (Railway) via REST API
- **Forms** — Formspree
- **Compiler** — React Compiler (Babel plugin)
- **Deployment** — Vercel

---

## Key Features

**Constellation Graph**
An animated SVG knowledge graph on the home page that grows node-by-node from CV keywords. Nodes are color-coded by category (Architecture, Cloud & DevOps, AI & Vision, Languages, Domain), have spring-bounce pop animations on spawn, respond to hover and drag, and adapt to dark/light mode in real time via MutationObserver.

**Herald — AI Chat**
An AI representative that answers questions about my work, decisions, and experience. Protected by Google/GitHub OAuth. Session history is persisted per user.

**Animations**
Fade-up on scroll (IntersectionObserver), floating background orbs, infinite skills marquee, role text cycling, and name shimmer effect.

**Responsive**
Mobile-first layout. Constellation graph shown on tablet (md+) and desktop. Skill pills strip shown on mobile. Navbar collapses to a hamburger on small screens.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Google OAuth app and/or GitHub OAuth app
- [Formspree](https://formspree.io) account for the contact form
- Herald backend running locally or pointed at the deployed Railway instance

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
# Herald AI backend
NEXT_PUBLIC_HERALD_API_URL=http://localhost:8000

# Formspree contact form
NEXT_PUBLIC_FORMSPREE_ID=your_form_id

# NextAuth
AUTH_SECRET=your_openssl_secret          # openssl rand -base64 32

# Google OAuth
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# GitHub OAuth
AUTH_GITHUB_ID=your_github_app_id
AUTH_GITHUB_SECRET=your_github_app_secret
```

### Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

---

## Deployment

The project deploys to **Vercel** — connect the repo and add environment variables in the Vercel dashboard. The React Compiler is enabled in `next.config.ts` for build-time optimisation.

Herald's AI backend is hosted separately on **Railway**.
