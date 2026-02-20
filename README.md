# 💊 MNA-MediStore (Frontend)

[![Deployment Status](https://img.shields.io/badge/Deployment-Vercel-success)](https://mna-medistore.vercel.app/)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

MNA-MediStore is a robust, full-stack healthcare e-commerce platform designed to bridge the gap between patients, local pharmacies (sellers), and administrators. Built with a focus on type safety, scalability, and modern UI/UX principles.

## 🔗 Project Links

- **Live Site:** [mna-medistore.vercel.app](https://mna-medistore.vercel.app/)
- **Backend Repository:** [MNA-MediStore Backend](https://github.com/nurulazam-dev/mna-medistore-backend)

---

## 🔑 Credentials (Testing)

| Role         | Email                    | Password      |
| :----------- | :----------------------- | ------------- |
| **Admin**    | `admin@medistore.com`    | `Admin123`    |
| **Seller**   | `seller@medistore.com`   | `Seller123`   |
| **Customer** | `customer@medistore.com` | `Customer123` |

---

## 🚀 Project Overview & Role Access

### 🌐 Public Access

- **Medicine Discovery:** Browse medicines by categories, search functionality.
- **Cart Management:** Add, update, and remove medicines seamlessly.
- **Responsive UI:** Optimized for mobile, tablet, and desktop views.

### 🛡️ Admin Dashboard

- **System Overview:** Comprehensive shop statistics and analytics charts.
- **Category Management:** Full CRUD access to medical categories.
- **Medicine Oversight:** View and update any medicine listed by any seller.
- **User Management:** Monitor users, update roles, and block/unblock accounts.
- **Order Control:** Global view of all orders and the ability to update delivery statuses.
- **Personalization:** Manage own admin profile settings.

### 👨‍⚕️ Seller Dashboard

- **Business Stats:** View personal sales information and stock status.
- **Inventory Management:** Add, update, or set medicines to 'Inactive' (Soft Delete).
- **Order Fulfillment:** Manage orders specifically linked to their own medicines.
- **Onboarding:** Dedicated registration and login flow for pharmacy owners.

### 👤 Customer Dashboard

- **Personal Activity:** View order history and spending stats.
- **Self-Service:** Cancel orders before they hit the 'processing' stage.
- **Secure Access:** Standardized authentication for safe shopping.

---

## 🛠️ Tech Stack

### Frontend Core

- **Next.js 16 (App Router):** Leveraging SSR/SSG for optimized SEO and performance.
- **TypeScript:** Ensuring strict type safety across the entire application.
- **Tailwind CSS:** For highly customizable and utility-first styling.
- **Better Auth:** Advanced authentication handling for multi-role sessions.

### State & Form Management

- **Redux Toolkit:** Managing global states such as Cart and User Sessions.
- **TanStack Form:** Handling complex form logic with high performance.
- **Zod:** Schema-based validation for all API payloads and forms.

### Visualization & Utilities

- **Recharts:** Interactive data visualization for dashboard statistics.
- **Cloudinary:** Cloud-based image management for medicine and profile photos.
- **T3-OSS/Env-Nextjs:** Safe environment variable management.
- **Sonner:** Sleek, high-performance toast notifications.
- **Sharp:** High-performance image processing for Next.js Image optimization.

---

## 💻 Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/yourusername/mna-medistore-frontend.git](https://github.com/yourusername/mna-medistore-frontend.git)
   cd mna-medistore-frontend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your backend URL and other credentials.

4. **Run the development:**

   ```bash
   pnpm run dev
   ```

   Open `http://localhost:3000` with your browser.

### 🛡️ Security Features

- **Role-Based Access Control (RBAC):** Middleware-protected routes for Admin, Seller, and Customer..
- **CSRF Protection:** Secure cookie handling and session validation.
- **Data Validation:** Strict Zod schema validation on both Client and Server Actions.

#### Developed with 💖 by Mohammad Nurul Azam(@nurulazam-dev)
