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

## Backend Data Models

### 1. Registration (`models/Registration.ts`)
- **Purpose:** Stores individual registrations for workshops/events (non-hackathon).
- **Fields:**
  - `firstName`, `lastName`: Name of the registrant
  - `email`: Email address
  - `phone`: Phone number
  - `affiliationType`: 'university', 'school', or 'company'
  - `institutionName`: Name of the college/school/company
  - `role`: Optional role (student, faculty, etc)
  - `year`, `branch`, `class`: Optional academic details
  - `interestedEvents`: Array of event names
  - `github`, `linkedin`, `portfolio`: Optional links
  - `skills`, `experience`, `expectations`: Optional text fields
  - `agreeTerms`: Boolean (must be true)
  - `registrationId`: Unique, ascending ID (e.g., BTF25-000001)
  - `registrationDate`: Timestamp

### 2. HackathonTeam (`models/HackathonTeam.ts`)
- **Purpose:** Stores Engenity hackathon team registrations (legacy/compatibility).
- **Fields:**
  - `teamName`: Name of the team
  - `teamId`: Unique, ascending team ID (e.g., ENG25-000001)
  - `university`: University name
  - `leader`: Object with member details (see below)
  - `teammates`: Array of member objects (see below)
  - `registrationDate`: Timestamp
- **Member Object:**
  - `memberId`: Unique, ascending member ID (e.g., ENGMEM-000001)
  - `name`, `email`, `phone`, `degree`

### 3. Team (`models/Team.ts`)
- **Purpose:** Stores Engenity hackathon team details (main model for teams).
- **Fields:**
  - `teamId`: Unique, ascending team ID (e.g., ENG25-000001)
  - `teamName`: Name of the team
  - `university`: University name
  - `leader`: Member object (see above)
  - `teammates`: Array of member objects (see above)
  - `registrationDate`: Timestamp

### 4. RegistrationLog (`models/RegistrationLog.ts`)
- **Purpose:** Logs every registration (workshop or Engenity), including all team members for Engenity.
- **Fields:**
  - `registrationId`: Unique, ascending registration ID (e.g., BTF25-000001)
  - `memberId`: Unique, ascending member ID (for Engenity, e.g., ENGMEM-000001)
  - `type`: 'workshop' or 'engunity'
  - `name`, `email`: Registrant/member details
  - `teamName`, `teamId`: If Engenity, the team info
  - `registrationDate`: Timestamp

### 5. Counter (`models/Counter.ts`)
- **Purpose:** Atomic counter for generating unique, strictly ascending member IDs for Engenity (prevents race conditions).
- **Fields:**
  - `_id`: Counter name (e.g., 'engunity_memberId')
  - `seq`: Current sequence number
- **Usage:**
  - Each time a team registers, the counter is atomically incremented by the number of members, and each member gets a unique, strictly ascending ID (ENGMEM-xxxxxx).

---

## Additional Notes for Developers

- **Member ID Uniqueness:**
  - Engenity member IDs (`ENGMEM-xxxxxx`) are globally unique and strictly ascending, even if multiple teams register at the same time. This is enforced by the Counter model and atomic MongoDB operations.
- **Team ID Uniqueness:**
  - Team IDs (`ENG25-xxxxxx`) are unique and strictly ascending, generated in order of registration.
- **Registration ID Uniqueness:**
  - Workshop/event registration IDs (`BTF25-xxxxxx`) are unique and strictly ascending.
- **Email Privacy:**
  - Registration lookup requires both registration ID and email for privacy.
- **Extensibility:**
  - The models are designed to be extensible for future event types, additional fields, or admin features.

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


