# Admin - Modern Beauty Spa

This is the administration dashboard for Modern Beauty Spa.

## Features

- **Authentication:** Secure admin login.
- **Service Management:** Add, edit, delete spa services.
- **Staff Management:** Manage staff profiles and schedules.
- **Booking Management:** View and manage customer bookings.
- **Dashboard:** Overview of bookings, revenue, and staff performance.

## Technology Stack

- ReactJS (Vite)
- TypeScript
- TailwindCSS
- Redux Toolkit

## Getting Started

```bash
npm install
npm run dev
```

Visit: [http://localhost:8080](http://localhost:8080) (or the port specified in your config)

## Folder Structure

```
/src
  /pages        # Main admin pages (Dashboard, Services, Staff, Bookings, Login)
  /components   # Reusable UI components
  /redux        # State management
  /shared       # Shared utilities and types
  /lib          # API and helper functions
  /hooks        # Custom React hooks
```

## Notes

- Make sure the backend server is running for API connectivity.
- Only authorized users can access the admin dashboard.
