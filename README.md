# QS Pallets

A full-stack Next.js monorepo containing the public-facing marketing site and an internal business dashboard for managing the day-to-day operations of a pallet sales company.

## Marketing Site

The company's first online presence, allowing clients to explore the product catalog, view detailed product information, and submit inquiries directly through the site.

### Features

- Server-side rendered pages for optimal SEO and performance
- Responsive layout for desktop and mobile devices
- Product catalog with detailed product pages
- Quote request form with validation
- Contact form for general inquiries
- API routes for form processing and business logic

### Tech Stack

Next.js · React · Next.js API Routes · Render

### Live Demo: [QS Pallets](https://www.qspallets.com)

## Dashboard (Internal)

An internal management platform built for QS Pallets staff to handle the full sales lifecycle — from quote generation and status tracking to order creation and fulfillment.

### Dashboard Features

- Quote management with status tracking and detail views
- Order creation flow with tax calculation
- Customer and inventory data management
- Protected routes with role-based access control
- Authentication via NextAuth.js with a Credentials Provider

### Dashboard Tech Stack

Next.js App Router · TypeScript · MongoDB · Mongoose · Tailwind CSS · NextAuth.js

## Screenshots

![Home](/public/Screenshots/Home.png)
![Products](/public/Screenshots/Products.png)
![Quote](/public/Screenshots/Quote.png)
![Contact](/public/Screenshots/Contact.png)
![Dashboard](/public/dashboard-orders.png)
