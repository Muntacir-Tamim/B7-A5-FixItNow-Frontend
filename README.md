# FixItNow - On-Demand Home Services Marketplace

FixItNow is a premium, state-of-the-art on-demand services marketplace designed to connect customers with skilled repair and maintenance technicians. Built on a modern technical stack, the system automates service discovery, real-time booking slots, secure digital payments, and transparent review processes.

---

## Project Objective
The primary objective of FixItNow is to streamline the fragmented home-services ecosystem. By providing a secure, transparent, and highly responsive platform, the application enables:
- **Customers** to effortlessly discover vetted services, schedule precise appointments, pay digitally, and rate their experience.
- **Technicians** to manage their service portfolios, configure real-time slot availability, process payouts, and build reputational trust.
- **Administrators** to oversee user behaviors, verify/block accounts, and maintain marketplace safety.

---

## Table of Contents
1. [Project Objective](#project-objective)
2. [5 Business Challenges Solved](#5-business-challenges-solved)
3. [Project Credentials](#project-credentials)
4. [Role Credentials](#role-credentials)
5. [Tech Stack](#tech-stack)
6. [Setup Guide](#setup-guide)
7. [API Integration Matrix](#api-integration-matrix)
8. [Project Conclusion](#project-conclusion)

---

## 5 Business Challenges Solved

### 1. Asymmetric Information & Trust Deficit (Mutual Reviews)
*   **The Challenge:** Customers hesitate to invite unknown technicians into their homes, and technicians suffer from lack of platforms to showcase their trustworthiness.
*   **The Solution:** Implemented a verified review system where customer reviews are bound to successful bookings. The dashboard review mechanism ([getAllReviews.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getAllReviews.ts) & [LeaveReview.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/LeaveReview.ts)) ensures reviews cannot be faked or duplicated, fostering trust.

### 2. Booking Conflicts & Billable Hour Leaks (Availability Slots)
*   **The Challenge:** Traditional scheduling relies on verbal agreements, leading to double bookings and lost hours for technicians.
*   **The Solution:** Built a real-time availability slot generator ([createAvailability.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/createAvailability.ts)). Technicians set exact, non-overlapping work windows that customers book instantly ([serviceBooking.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(public)/services/_actions/serviceBooking.ts)), preventing schedule overlaps.

### 3. Payment Insecurity & Unreliable Offline Cash (Stripe/SSLCommerz)
*   **The Challenge:** Offline payments often lead to unpaid invoices, awkward transaction dialogues, or payment disputes.
*   **The Solution:** Standardized secure transactions via multi-provider checkouts ([checkoutPayment.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/checkoutPayment.ts) & [createPayment.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/createPayment.ts)). It handles global payments (Stripe) and local gateways (SSLCommerz) to capture payment states securely.

### 4. Spam, Fraud & Abuse Mitigation (Moderator Controls)
*   **The Challenge:** Marketplace open access invites malicious behavior, bad actors, or unauthorized listings.
*   **The Solution:** Empowered administrators with status moderation ([updateUserStatusByAdmin.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/updateUserStatusByAdmin.ts) & [getAllUsers.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getAllUsers.ts)). Admins can ban, block, or approve users instantly, enforcing quality standards and protecting legitimate users.

### 5. Session Vulnerability & Slow Client State Shifts (Secure Middleware Proxy)
*   **The Challenge:** Storing raw JWT tokens in browser LocalStorage exposes applications to XSS attacks, while constant network roundtrips slow down user experience.
*   **The Solution:** Configured HttpOnly Cookie storage coupled with a Next.js middleware proxy ([proxy.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/proxy.ts)). The proxy refreshes expired tokens in the background ([refreshToken.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/services/refreshToken.ts)) without interrupting user navigation, guarding dashboards.

---

## Project Credentials

*   **Live Project:** [https://fixitnow-v1.vercel.app](https://fixitnow-v1.vercel.app)
*   **Live API:** [https://fixitnow-api-v1.vercel.app](https://fixitnow-api-v1.vercel.app)
*   **Backend Repo:** [https://github.com/AyanSujon/FixItNow-Server-Side](https://github.com/AyanSujon/FixItNow-Server-Side)
*   **Frontend Repo:** [https://github.com/AyanSujon/FixItNow](https://github.com/AyanSujon/FixItNow)

---

## Role Credentials
To verify specific dashboard access, layouts, and API boundaries, use the following pre-configured credentials:

| Role | Email | Password |
|---|---|---|
| **ADMIN** | `admin@fixitnow.com` | `Admin@12345` |
| **TECHNICIAN** | `TECHNICIAN@example.com` | `TECHNICIAN` |
| **CUSTOMER** | `CUSTOMER@example.com` | `CUSTOMER` |

> ⚠️ The ADMIN row above matches `prisma/seed.ts` on the backend. The TECHNICIAN/CUSTOMER
> rows are **not** created by the backend seed script — if those logins don't work on the
> deployed API, register fresh Technician/Customer accounts through `/register` and update
> this table with real working credentials before submission.

---

## Tech Stack

### Frontend & Core
- **Framework:** Next.js (v16.2.11 App Router)
- **Runtime Library:** React (v19.2.4)
- **Language:** TypeScript
- **Styling:** Vanilla CSS (TailwindCSS v4 compatible via custom layout classes)
- **State & Action handling:** Server Actions

### Utilities & Features
- **Animations:** Framer Motion, React CountUp, tw-animate-css
- **Icons:** Lucide React, React Icons
- **Forms & Validation:** React Hook Form & Zod Resolvers
- **Date Utilities:** date-fns, React Day Picker
- **Authentication:** JWT, Next.js Middleware Proxy, HttpOnly Cookies
- **Payment Processing:** Stripe and SSLCommerz APIs

---

## Setup Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.x or above) and `npm` installed.

### 1. Clone the Repository
```bash
git clone https://github.com/AyanSujon/FixItNow.git
cd FixItNow
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (refer to [.env.example](file:///e:/Programming%20Hero/Next%20Level/FixItNow/.env.example)) and specify the API URLs:
```env
NEXT_PUBLIC_API_URL=https://fixitnow-api-liart.vercel.app
JWT_ACCESS_SECRET=accessSecret
JWT_REFRESH_SECRET=refreshSecret
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 5. Build for Production
To test the production build locally:
```bash
npm run build
npm start
```

---

## API Integration Matrix
The application consumes backend endpoints via Next.js Server Actions and core services. Detailed components mapping can be found in the standalone [API_INTEGRATION.md](https://github.com/AyanSujon/FixItNow/blob/main/API_INTEGRATION.md) file.

---

## Project Conclusion
FixItNow demonstrates the power of combining modern server-side rendering (Next.js App Router) with secure session state management and API integration. By addressing critical challenges like trust deficits, payment security, and booking conflicts, the platform offers a robust, high-performance solution for the on-demand home services industry. The clean architecture, typed endpoints, and secure cookie validation provide a scalable foundation for future extensions.
# B7-A4-FixItNow-1
Documentation updated.
