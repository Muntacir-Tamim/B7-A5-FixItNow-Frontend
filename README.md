# FixItNow — On-Demand Home Services Marketplace (Frontend)

FixItNow is a full-featured, production-grade frontend for an on-demand home services marketplace. It connects **customers** with verified **technicians** for repair and maintenance work, while giving **admins** full control over platform safety and quality. Built with Next.js App Router, TypeScript, and a secure cookie-based authentication flow.

**Live Site:** [fixitnow-v1.vercel.app](https://fixitnow-v1.vercel.app) · **Backend Repo:** [FixItNow-Server-Side](https://github.com/AyanSujon/FixItNow-Server-Side)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Role-Based Access](#role-based-access)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Home service platforms often struggle with trust, scheduling conflicts, insecure payments, and platform abuse. FixItNow solves this with a role-driven marketplace where:

- **Customers** discover services, book real-time available slots, pay securely, and leave verified reviews.
- **Technicians** manage service listings, set their own availability, track bookings, and view earnings.
- **Admins** moderate users, manage categories/services, and monitor platform-wide analytics.

---

## Key Features

- 🔐 **Secure Authentication** — JWT-based auth with HttpOnly cookies and a Next.js middleware proxy that silently refreshes expired tokens without interrupting the user session.
- 📅 **Real-Time Availability & Booking** — Technicians define non-overlapping time slots; customers book instantly with no double-booking risk.
- 💳 **Multi-Gateway Payments** — Integrated checkout supporting both **Stripe** (global) and **SSLCommerz** (local) payment flows.
- ⭐ **Verified Reviews** — Reviews are tied to completed bookings only, preventing fake or duplicate ratings.
- 🛠️ **Three Dashboards** — Dedicated, role-specific dashboards for Customers, Technicians, and Admins with independent layouts and permissions.
- 📊 **Admin Analytics & Moderation** — User status control (approve/block/ban), category & service management, and platform-wide analytics.
- 🎨 **Modern UI/UX** — Responsive design with Radix UI primitives, Framer Motion animations, and Tailwind CSS v4.
- ✅ **Type-Safe Forms** — React Hook Form + Zod schema validation across all forms.

---

## Tech Stack

| Category               | Technology                                              |
| ---------------------- | ------------------------------------------------------- |
| **Framework**          | Next.js 16 (App Router)                                 |
| **Library**            | React 19                                                |
| **Language**           | TypeScript                                              |
| **Styling**            | Tailwind CSS v4, tw-animate-css                         |
| **UI Components**      | Radix UI, shadcn                                        |
| **Forms & Validation** | React Hook Form, Zod                                    |
| **Animations**         | Framer Motion, React CountUp                            |
| **Charts**             | Recharts                                                |
| **Auth**               | JWT, Google OAuth, Next.js Middleware, HttpOnly Cookies |
| **Payments**           | Stripe, SSLCommerz                                      |
| **Date Handling**      | date-fns, React Day Picker                              |
| **Icons**              | Lucide React, React Icons                               |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login & registration
│   ├── (public)/            # Public-facing pages
│   │   ├── services/        # Service listings & details
│   │   ├── find-technicians/# Technician discovery
│   │   ├── payment/         # Payment success/cancel flows
│   │   └── about, contact, how-it-works, etc.
│   ├── (dashboard)/         # Role-protected dashboards
│   │   ├── dashboard/           # Customer dashboard
│   │   ├── technician-dashboard/# Technician dashboard
│   │   └── admin-dashboard/     # Admin dashboard
│   └── _components/         # Shared app-level components
├── components/common/       # Reusable UI components
├── services/                # API service layer
├── schemas/                 # Zod validation schemas
├── lib/                     # Utility libraries
├── types/                   # Shared TypeScript types
├── utils/                   # Helper functions
└── proxy.ts                 # Auth token refresh middleware
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (or your preferred package manager)

### Installation

```bash
git clone https://github.com/Muntacir-Tamim/B7-A5-FixItNow-Frontend.git
cd B7-A5-FixItNow-Frontend
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [ http://localhost:3000](https://fixitnow-frontend-sable.vercel.app ) to view the app.

### Build for Production

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://fixitnow-gamma.vercel.app

# JWT secrets — must match the backend's .env exactly
JWT_ACCESS_SECRET=access_secret
JWT_REFRESH_SECRET=refresh_secret
```

> ⚠️ Never commit your real `.env` file — it's already excluded via `.gitignore`.

---

## Available Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm start`     | Runs the production build     |
| `npm run lint`  | Runs ESLint checks            |

---

## Role-Based Access

The app supports three distinct roles, each with its own dashboard and permissions:

| Role           | Access                                                          |
| -------------- | --------------------------------------------------------------- |
| **Customer**   | Browse services, book slots, make payments, leave reviews       |
| **Technician** | Manage services, set availability, track bookings & earnings    |
| **Admin**      | Manage users, categories, services, and view platform analytics |

---

## API Integration

This frontend communicates with the FixItNow backend via typed Server Actions and a centralized service layer. For a detailed endpoint-by-endpoint mapping, see [`API_INTEGRATION.md`](./API_INTEGRATION.md).

---

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

---

## License

This project is open source. Add a `LICENSE` file to specify usage terms.
