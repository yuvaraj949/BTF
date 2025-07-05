# BITS Tech Fest 2025 – Project Documentation

## Overview

This repository contains the full-stack codebase for BITS Tech Fest 2025, including a modern React frontend (with Vite, shadcn-ui, and Tailwind CSS) and a Node.js/Express backend for registration and event management.

---

## Project Structure

```
├── api/                        # Backend (Node.js/Express API)
│   ├── import_registration_patch.ts  # (Patch utility for registration import)
│   ├── server.ts               # Main Express server entrypoint
│   ├── package.json            # Backend dependencies
│   ├── tsconfig.json           # Backend TypeScript config
│   ├── vercel.json             # Vercel deployment config (API)
│   ├── models/                 # Mongoose models (MongoDB schemas)
│   │   ├── HackathonTeam.ts    # Team registration schema
│   │   └── Registration.ts     # Individual registration schema
│   └── routes/                 # Express routes
│       └── registration.ts     # Registration API endpoints
├── bits/                       # Frontend (Vite + React)
│   ├── public/                 # Static assets (images, icons, robots.txt, etc)
│   ├── src/                    # Main source code
│   │   ├── components/         # Reusable React components
│   │   │   ├── ui/             # UI primitives (shadcn-ui based)
│   │   │   ├── BackgroundScene.tsx  # Animated background
│   │   │   ├── CountdownTimer.tsx   # Countdown component
│   │   │   ├── Footer.tsx           # Footer
│   │   │   ├── HeroSection.tsx      # Hero/landing section
│   │   │   ├── NavigationBar.tsx    # Top navigation bar
│   │   │   └── RegistrationLookup.tsx # Registration lookup UI
│   │   ├── data/                # Static data (e.g. events.json)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility functions
│   │   ├── pages/               # Main pages (routed via React Router)
│   │   │   ├── About.tsx
│   │   │   ├── ContactUs.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── Index.tsx
│   │   │   ├── Lookup.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── Pass.tsx
│   │   │   └── Registration.tsx
│   │   ├── App.tsx              # Main app entrypoint
│   │   ├── main.tsx             # React root renderer
│   │   ├── index.css            # Global styles (Tailwind + custom)
│   │   └── vite-env.d.ts        # Vite/TypeScript env types
│   ├── package.json             # Frontend dependencies
│   ├── tailwind.config.ts       # Tailwind CSS config
│   ├── vite.config.ts           # Vite config
│   └── ...                      # Other config/build files
├── README.md                    # This documentation
└── ...
```

---

## File & Folder Explanations

### Backend (`api/`)
- **server.ts**: Main Express server. Handles API endpoints, connects to MongoDB, manages CORS, and email sending.
- **routes/registration.ts**: All registration-related API endpoints (register, confirmation email, etc).
- **models/Registration.ts**: Mongoose schema for individual registrations.
- **models/HackathonTeam.ts**: Mongoose schema for hackathon team registrations.
- **import_registration_patch.ts**: Utility for importing registration data (patches).

### Frontend (`bits/`)
- **public/**: Static files (images, icons, robots.txt, etc).
- **src/components/**: All React components.
  - **ui/**: UI primitives (buttons, dialogs, forms, etc) based on shadcn-ui.
  - **BackgroundScene.tsx**: Animated background canvas for magical effect.
  - **CountdownTimer.tsx**: Countdown to event start.
  - **Footer.tsx**: Footer with contact/social links.
  - **HeroSection.tsx**: Main landing section with event info.
  - **NavigationBar.tsx**: Top navigation bar.
  - **RegistrationLookup.tsx**: UI for looking up registration status.
- **src/pages/**: Main pages (routed via React Router):
  - **Index.tsx**: Home page (landing, about, tracks, sponsors, etc).
  - **Events.tsx**: Event agenda and details.
  - **ContactUs.tsx**: Contact information.
  - **Registration.tsx**: Registration form/page.
  - **Pass.tsx**: Digital pass display.
  - **NotFound.tsx**: 404 page.
- **src/hooks/**: Custom React hooks (e.g. `useIsMobile` for responsive logic).
- **src/lib/**: Utility functions (e.g. `cn` for className merging).
- **src/data/**: Static data (e.g. events list).
- **App.tsx**: Main React app entrypoint (routing, providers).
- **main.tsx**: React root renderer.
- **index.css**: Global styles (Tailwind + custom animations).
- **vite.config.ts**: Vite build/config file.
- **tailwind.config.ts**: Tailwind CSS config.

---

## How to Run & Edit

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the frontend (Vite dev server):**
   ```sh
   cd bits
   npm run dev
   ```
4. **Start the backend (API server):**
   ```sh
   cd api
   npm run dev
   ```

---

## How it Works

- **Frontend**: Built with React, Vite, shadcn-ui, and Tailwind CSS. Handles all user interaction, registration forms, event display, and magical UI/UX.
- **Backend**: Node.js/Express API with MongoDB (via Mongoose). Handles registration submissions, stores data, sends confirmation emails, and provides endpoints for the frontend.
- **Deployment**: Designed for Vercel (see `vercel.json` in both `api/` and `bits/`).

---

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Express.js
- MongoDB (Mongoose)
- Nodemailer (email)

---

## Deployment

Deploy on Vercel or your preferred Node.js hosting. To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.


