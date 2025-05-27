# Backend - Modern Beauty Spa

This is the RESTful API server for Modern Beauty Spa, built with NestJS.

## Features

- **Authentication:** JWT-based authentication for admin and users.
- **User Management:** Register, login, and manage users.
- **Booking Management:** Create, update, and manage bookings.
- **Service Management:** CRUD for spa services.
- **Staff Management:** Manage staff information and schedules.
- **MongoDB Integration:** Stores all data securely.

## Technology Stack

- NodeJS
- NestJS (TypeScript)
- MongoDB

## Getting Started

```bash
npm install
npm run start:dev
```

API runs at: [http://localhost:5000](http://localhost:5000)

## Folder Structure

```
/src
  /auth      # Authentication logic (JWT, guards, DTOs)
  /user      # User management
  /booking   # Booking management
  /service   # Service management
  /staff     # Staff management
  /common    # Shared modules, pipes, filters
  /revalidate# Revalidation logic for frontend
```

## Deploy Free on Render

1. Push your code to a public GitHub repository.
2. Go to [https://render.com/](https://render.com/) and sign up/log in.
3. Click "New Web Service" > Connect your repo > Select branch.
4. Set build command: `npm install && npm run build`
5. Set start command: `npm run start:prod`
6. Add environment variables (e.g. `MONGODB_URI`, `JWT_SECRET`, ...).
7. Click "Create Web Service" and wait for deployment.

> Render offers a free tier for small projects. See their docs for more details.

## Notes

- Configure your MongoDB URI and secrets in environment variables.
- Make sure to run the backend before using the admin or frontend.
