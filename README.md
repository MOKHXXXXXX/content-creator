# Content Writer Portfolio

A minimalist, manuscript-themed personal portfolio landing page for a professional content writer. Built with Next.js, Tailwind CSS, and TypeScript.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Fonts:** Fraunces (display), Inter (body), IBM Plex Mono (meta)
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Email:** Resend API
- **Icons:** Lucide React + custom SVGs
- **Deployment:** Vercel

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `FROM_EMAIL` | Verified sender email in Resend (e.g. `contact@yourdomain.com`) |
| `TO_EMAIL` | Where contact form submissions are sent |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── api/contact/route.ts     # Contact form API (Resend + validation)
├── portfolio/[slug]/page.tsx # Individual portfolio detail pages
├── sections/                # Landing page sections
│   ├── Hero.tsx             # Hero with EditReveal animation
│   ├── About.tsx            # Bio + expertise
│   ├── Services.tsx         # Service cards grid
│   ├── Portfolio.tsx        # Filterable portfolio grid
│   ├── Testimonials.tsx     # Client testimonials
│   ├── Contact.tsx          # Contact form + social links
│   └── Footer.tsx           # Site footer
├── privacy/page.tsx         # Privacy policy
├── sitemap.ts               # Auto-generated sitemap
├── robots.ts                # Robots config
└── layout.tsx               # Root layout (fonts, metadata, JSON-LD)

components/
├── ContactForm.tsx          # Form with React Hook Form + Zod
├── Navbar.tsx               # Sticky navigation
├── icon.tsx                 # Icon resolver (Lucide + custom SVGs)
└── ui/EditReveal.tsx        # Hero strike-through animation

data/                        # ✏️ Edit these files to update content
├── site.ts                  # Site metadata (name, URL, SEO)
├── about.ts                 # Bio, expertise, stats
├── portfolio.json           # Portfolio samples
├── services.json            # Services offered
├── testimonials.json        # Client testimonials
└── social.json              # Social media links
```

## Updating Content

All site content lives in the `data/` folder as TypeScript/JSON files. Edit them directly to update:

- **Your name/tagline/email:** `data/site.ts`
- **Bio + stats:** `data/about.ts`
- **Portfolio items:** `data/portfolio.json`
- **Services:** `data/services.json`
- **Testimonials:** `data/testimonials.json`
- **Social links:** `data/social.json`

No CMS or database required — just edit and redeploy.

## Building for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push to GitHub
2. Go to [vercel.com/import](https://vercel.com/import)
3. Import your repository
4. Add the environment variables from `.env.local`
5. Deploy

The site will be available at your Vercel subdomain. To use a custom domain, add it in Vercel project settings and verify your domain in Resend.

## Design System

| Token | Hex | Usage |
|---|---|---|
| `paper` | `#FBF6EC` | Primary background |
| `ink` | `#211E1B` | Primary text |
| `moss` | `#3F5A46` | Nav, footer, dark sections |
| `pen` | `#C1392B` | Editor's mark — used sparingly |
| `sand` | `#EDE3CF` | Card surfaces, dividers |
| `ink-60` | `#6B655C` | Muted text, captions |

The signature moment is the hero strike-through animation: a phrase gets struck through with a red pen stroke and replaced — mimicking an editor's correction.
