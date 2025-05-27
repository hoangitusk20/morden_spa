# Modern Beauty Spa - Fullstack Web Application

A modern, high-performance, and SEO-optimized beauty spa management system.

---

## Live Demo

- **Frontend:** [https://ngocspa.vercel.app/](https://ngocspa.vercel.app/)

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Performance & SEO](#performance--seo)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- **Online Booking:** Customers can book spa services online.
- **Admin Dashboard:** Manage services, staff, and bookings.
- **SEO Optimized:** Achieves perfect scores on Google PageSpeed Insights.
- **Lightning Fast:** Utilizes Next.js with CSR, SSG, and on-demand revalidation for optimal user experience and load speed.
- **Mobile Responsive:** Fully responsive design for all devices.
- **Modern UI:** Clean, attractive, and user-friendly interface.

---

## Architecture

- **Frontend:** Next.js (TypeScript, TailwindCSS)
- **Admin:** ReactJS (Vite, TailwindCSS)
- **Backend:** NodeJS, NestJS (RESTful API, JWT Auth)
- **Database:** MongoDB

---

## Performance & SEO

This project is fully optimized for performance and SEO, achieving **100/100** scores in all categories on Google PageSpeed Insights.

> **Reference:** [PageSpeed Insights Report](https://pagespeed.web.dev/analysis/https-ngocspa-vercel-app/6cv4y78tgv?form_factor=desktop)

### Why is it so fast?

- **Next.js SSG & CSR:** Combines Static Site Generation (SSG) for public pages and Client-Side Rendering (CSR) for interactive features.
- **On-demand Revalidation:** Ensures content is always fresh without sacrificing speed.
- **Optimized Assets:** Images, fonts, and scripts are optimized and lazy-loaded.
- **Minimal JavaScript:** Only essential scripts are loaded for each page.

---

## Quick Start

### 1. Backend

```bash
cd backend
npm install
npm run start:dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Admin

```bash
cd admin
npm install
npm run dev
```

- **Frontend:** http://localhost:3000
- **Admin:** http://localhost:8080

---

## Project Structure

```
/admin      # Admin dashboard (ReactJS + Vite)
/frontend   # Customer-facing website (NextJS)
/backend    # API server (NestJS)
/database   # MongoDB (cloud/local)
```

---

**Demo:** [https://ngocspa.vercel.app/](https://ngocspa.vercel.app/)

**PageSpeed Insights:** [View Report](https://pagespeed.web.dev/analysis/https-ngocspa-vercel-app/6cv4y78tgv?form_factor=desktop)

---

**Note:**

- For more details on each subproject, see the `README.md` inside `/admin`, `/frontend`, and `/backend`.
- This project is built for both performance and maintainability, following best practices in modern web development.
