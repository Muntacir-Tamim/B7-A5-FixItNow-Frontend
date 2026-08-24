# FixItNow - API Integration Documentation

This document maps the **FixItNow Frontend Client** (Next.js Application) to its corresponding **Backend REST API** endpoints. It lists all the endpoints consumed, the HTTP methods, required parameters/payload structures, authorization requirements, and references the specific frontend codebase location.

---

## Base API URL
All API calls are prefixed with the base API URL configured via environment variables:
- Local/Production base: `${process.env.NEXT_PUBLIC_API_URL}` (configured to `https://fixitnow-api-liart.vercel.app` in production).

---

## API Mappings Matrix

### 1. Authentication & Session Management

| Endpoint | HTTP Method | Frontend Function / File | Description | Request Headers & Payload |
|---|---|---|---|---|
| `/api/auth/register` | `POST` | [registerUser](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(auth)/_actions/registerUser.ts) | Registers a new Customer or Technician account. | **Headers:** `Content-Type: application/json`<br>**Payload:** `RegisterFormData` (name, email, password, phone, role) |
| `/api/auth/login` | `POST` | [loginUser](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(auth)/_actions/loginUser.ts) | Authenticates a user and sets HTTP-Only tokens. | **Headers:** `Content-Type: application/json`<br>**Payload:** `LoginFormData` (email, password)<br>**Action:** Sets `accessToken` & `refreshToken` cookies on success. |
| `/api/auth/me` | `GET` | [getMe](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/services/getMe.ts) | Retrieves currently authenticated user's details and profile. | **Headers:** `Cookie: accessToken={token}`<br>**Caching:** Tagged with `my-profile` for cache revalidation. |
| `/api/auth/refresh-token` | `POST` | [GetNewAccessToken](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/services/refreshToken.ts) | Requests a new Access Token using the valid Refresh Token. | **Headers:** `Cookie: refreshToken={token}`<br>**Description:** Executed automatically by middleware proxy when accessToken expires. |

---

### 2. Services Management

| Endpoint | HTTP Method | Frontend Function / File | Description | Request Headers & Payload |
|---|---|---|---|---|
| `/api/services` | `GET` | [getAllServicesss](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(public)/_actions/getAllServices.ts) | Retrieves a list of services, optionally filtered by search terms. | **Query Params:** `searchTerm`<br>**Caching:** Tagged with `premium-posts`. |
| `/api/services/:id` | `GET` | [getServiceById](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getServiceById.ts)<br>[serviceBooking](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(public)/services/_actions/serviceBooking.ts) | Fetches full details of a specific service by ID. | **Params:** `id` (Service UUID)<br>**Caching:** Revalidated/tagged by ID. |
| `/api/services/create` | `POST` | [createService](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/createService.ts) | Allows technicians to register a new service. | **Headers:** `Authorization: {accessToken}`<br>**Payload:** `CreateServicePayload` (categoryId, title, description, price, priceType, estimatedDuration, thumbnail, isAvailable) |
| `/api/services/technician/:technicianId/edit` | `PATCH` | [updateService](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/updateService.ts) | Updates an existing service listed by the technician. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Params:** `technicianId`<br>**Payload:** `UpdateServicePayload` (serviceId, categoryId, title, description, price, priceType, estimatedDuration, thumbnail, isAvailable) |
| `/api/services/technician/:technicianId/delete` | `DELETE` | [deleteServiceByTechnician](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/deleteServiceByTechnician.ts) | Removes/deletes a technician's service. | **Headers:** `Authorization: {accessToken}`<br>**Params:** `technicianId`<br>**Payload:** `{ serviceId }` |
| `/api/services/technician/:technicianId` | `GET` | [getTechnicianServices](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getTechnicianServices.ts) | Gets all services offered by a specific technician. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Params:** `technicianId`<br>**Caching:** Tagged with `technician-services`. |

---

### 3. Categories Management

| Endpoint | HTTP Method | Frontend Function / File | Description | Request Headers & Payload |
|---|---|---|---|---|
| `/api/categories` | `GET` | [getAllCategories](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(public)/_actions/getAllCategories.ts) | Fetches all available categories of services. | **Headers:** None<br>**Caching:** Tagged with `categories` for server-side cache invalidation. |

---

### 4. Technician & Availability Management

| Endpoint | HTTP Method | Frontend Function / File | Description | Request Headers & Payload |
|---|---|---|---|---|
| `/api/technicians` | `GET` | [getAllTechnicians](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getAllTechnicians.ts) | Fetches list of technicians with complex filtration and pagination. | **Query Params:** `page`, `limit`, `city`, `profession`, `isAvailable`, `isApproved`, `minRating`, `minExperience`, `maxHourlyRate` |
| `/api/technicians/:technicianId/profile` | `GET` | [getTechnicianById](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getTechnicianById.ts) (Dashboard) | Retrieves the dashboard profile details for a technician. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Params:** `technicianId` |
| `/api/technicians/:technicianId` | `GET` | [getTechnicianById](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(public)/_actions/getTechnicianById.ts) (Public) | Retrieves public details, rating, and bio for a technician. | **Headers:** `Authorization: Bearer {accessToken}` (Optional)<br>**Params:** `technicianId` |
| `/api/technician/availability` | `POST` | [createAvailability](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/createAvailability.ts) | Creates a technician availability slot. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Payload:** `CreateAvailabilityPayload` (serviceId, date, startsAt, endsAt, isAvailable, isBooked, note, bookingDeadline, maxBookings) |

---

### 5. Bookings Management

| Endpoint | HTTP Method | Frontend Function / File | Description | Request Headers & Payload |
|---|---|---|---|---|
| `/api/bookings/create` | `POST` | [serviceBooking](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(public)/services/_actions/serviceBooking.ts) | Initiates a booking reservation on a service with specific time slots. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Payload:** `BookingPayload` (technicianId, serviceId, note, bookingSlotIds) |
| `/api/bookings?customerId=true` | `GET` | [getAllBookings](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getAllBookings.tsx) | Retrieves booking history specifically filtered for the logged-in customer. | **Headers:** `Authorization: Bearer {accessToken}` |
| `/api/bookings/technician/:technicianId` | `GET` | [getBookingsByTechnician](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getAllBookingsByTechnician.ts) | Fetches a list of bookings assigned to a technician. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Params:** `technicianId` |
| `/api/bookings/:bookingId` | `GET` | [getBookingById](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getBookingById.tsx) | Retrieves complete info for a specific booking. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Params:** `bookingId` |
| `/api/bookings/:bookingId` | `PATCH` | [updateBookingStatus](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/updateBookingStatus.ts) | Modifies booking status (e.g. ACCEPTED, DECLINED, COMPLETED, CANCELLED). | **Headers:** `Authorization: Bearer {accessToken}`<br>**Params:** `bookingId`<br>**Payload:** `{ status }` |

---

### 6. Payments Management

| Endpoint | HTTP Method | Frontend Function / File | Description | Request Headers & Payload |
|---|---|---|---|---|
| `/api/payments/checkout` | `POST` | [createCheckoutSession](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/checkoutPayment.ts) | Generates a Stripe/SSLCommerz checkout URL for booking payments. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Payload:** `{ bookingId }` |
| `/api/payments/create` | `POST` | [createPayment](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/createPayment.ts) | Initializes payment logging for card/cash options in the db. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Payload:** `CreatePaymentPayload` (bookingId, amount, method, provider, currency) |
| `/api/payments` | `GET` | [getMyPayments](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getMyPayments.ts) | Fetches the payment history logs for the current user. | **Headers:** `Authorization: Bearer {accessToken}` |

---

### 7. Reviews & Ratings

| Endpoint | HTTP Method | Frontend Function / File | Description | Request Headers & Payload |
|---|---|---|---|---|
| `/api/reviews` | `POST` | [leaveReview](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/LeaveReview.ts) | Submits feedback and rating for a technician/service. | **Headers:** `Authorization: Bearer {accessToken}`<br>**Payload:** `CreateReviewPayload` (customerId, technicianId, bookingId, serviceId, rating, comment) |
| `/api/reviews` | `GET` | [getAllReviews](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getAllReviews.ts) | Retrieves a list of reviews. | **Headers:** `Authorization: Bearer {accessToken}` (Optional) |

---

### 8. Admin Operations

| Endpoint | HTTP Method | Frontend Function / File | Description | Request Headers & Payload |
|---|---|---|---|---|
| `/api/admin/users` | `GET` | [getAllUsers](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/getAllUsers.ts) | Allows administrators to list all platform users. | **Headers:** `Authorization: {accessToken}` |
| `/api/admin/users/:userId` | `PATCH` | [updateUserStatusByAdmin](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/app/(dashboard)/_actions/updateUserStatusByAdmin.ts) | Allows admin to toggle user state (ACTIVE, BLOCKED, BAN, UNBAN). | **Headers:** `Authorization: Bearer {accessToken}`<br>**Params:** `userId`<br>**Payload:** `{ userStatus: status }` |

---

## Authentication & Authorization Guarding Flow

The client application includes custom routing guards implemented at the Server level to ensure secure API consumption:
1. **Proxy Middleware Logic** ([proxy.ts](file:///e:/Programming%20Hero/Next%20Level/FixItNow/src/proxy.ts)):
   - Checks presence of `accessToken` and `refreshToken` cookies on incoming requests.
   - If `accessToken` is expired or invalid but `refreshToken` is valid, calls `/api/auth/refresh-token` automatically to issue and set a new `accessToken` cookie.
   - Redirects authenticated users from `/login` or `/register` to their respective dashboards.
   - Protects non-public routes by redirecting unauthenticated users to `/login`.
2. **Role-Based Layout Protection**:
   - `/customer-dashboard` routes assert user role is `CUSTOMER`.
   - `/admin-dashboard` routes assert user role is `ADMIN`.
   - `/technician-dashboard` routes assert user role is `TECHNICIAN`.
