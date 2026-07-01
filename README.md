# Nomorgh

![App Preview](https://imgix.cosmicjs.com/0ab2f6d0-7545-11f1-a44c-d7f5892df684-autopilot-photo-1554224155-6726b3ff858f-1782907481781.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

Nomorgh is a modern, responsive panel for daily sales and purchases management built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Track your sales, purchases, and business contacts with a clean, professional dashboard that gives you real-time insights into your business operations.

## Features

- 📊 **Dashboard Overview** — Real-time metrics for sales, purchases, and net revenue
- 🛒 **Sales Management** — View, browse, and record daily sales with invoice tracking
- 📦 **Purchases Tracking** — Monitor supplier purchases and payment statuses
- 🤝 **Contact Directory** — Manage customers and suppliers in one place
- 💳 **Payment Status Badges** — Instantly see Paid, Pending, and Overdue statuses
- 📱 **Fully Responsive** — Beautiful on desktop, tablet, and mobile
- ⚡ **Server-Side Rendering** — Fast, secure data fetching with Cosmic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a450212bc97f04ea2185ff2&clone_repository=6a450304bc97f04ea218602c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Panel for daily sales and purchases management"

### Code Generation Prompt

> Build a Next.js application for a website called "Nomorgh". The content is managed in Cosmic CMS with the following object types: contacts, sales, purchases. Create a beautiful, modern, responsive design with a homepage and pages for each content type. Panel for daily sales and purchases management

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `contacts`, `sales`, and `purchases` object types

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

Fetching sales with connected customer data:

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'sales' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const sales = response.objects
```

Creating a new sale record:

```typescript
await cosmic.objects.insertOne({
  type: 'sales',
  title: 'INV-1001',
  metadata: {
    invoice_number: 'INV-1001',
    sale_date: '2024-01-15',
    item_description: 'Product A',
    quantity: 5,
    unit_price: 29.99,
    total_amount: 149.95,
    payment_status: 'Paid',
    notes: ''
  }
})
```

## Cosmic CMS Integration

This app uses three Cosmic object types:

- **contacts** — Customers and suppliers with contact details
- **sales** — Daily sales with invoice, customer, item, and payment info
- **purchases** — Supplier purchases with reference, cost, and payment info

All data is fetched server-side using the Cosmic SDK with the `depth` parameter to resolve connected objects. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to a Git repository
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Set build command to `bun run build`
3. Add the same environment variables
4. Deploy

<!-- README_END -->