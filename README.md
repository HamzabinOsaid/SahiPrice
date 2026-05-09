# SahiPrice - Fair Price Checker for Pakistan

A Next.js app with Supabase authentication that lets users check if they're paying fair prices for goods and services across major Pakistani cities. Features include login/signup, 5 searches per hour rate limiting, and logout functionality.

## Features

- **User Authentication**: Secure email/password signup and login via Supabase
- **Rate Limiting**: Limited to 5 searches per hour per user
- **Logout**: Easy logout button in the dashboard header
- **City-Based Pricing**: Check fair prices in Rawalpindi, Lahore, Karachi, and Islamabad
- **Shop Recommendations**: Get local shop suggestions based on your search
- **Responsive Design**: Dark theme with clean, modern UI

## Setup Instructions

### 1. Clone & Install
```bash
npm install
```

### 2. Configure Supabase
Get your Supabase credentials from the Vercel integration or dashboard:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

Add them to `.env.local`:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you'll be redirected to the login page.

## Usage

1. **Sign Up**: Create a new account with email and password
2. **Confirm Email**: Check your email and click the confirmation link
3. **Login**: Sign in with your credentials
4. **Check Price**: 
   - Select a city
   - Choose a category
   - Pick a subcategory
   - Enter the price
   - Click "Check Price"
5. **View Results**: See if the price is fair and get local shop recommendations
6. **Logout**: Click the red "Logout" button in the top right

## Rate Limiting

- **5 searches per hour** per user
- Counter resets hourly
- Message appears when limit is reached
- All searches are logged in the database

## Database Schema

The `searches` table tracks:
- `user_id` - Reference to authenticated user
- `city` - Selected city
- `category` - Product/service category
- `subcategory` - Specific item type
- `price` - User-entered price
- `created_at` - Timestamp

Row Level Security (RLS) ensures users can only see their own data.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Styling**: Inline CSS + Tailwind utilities
- **Hosting**: Vercel (recommended)

## File Structure

```
app/
  auth/
    login/page.tsx
    signup/page.tsx
    signup-success/page.tsx
    callback/route.ts
    error/page.tsx
  dashboard/page.tsx
  page.tsx
  layout.tsx
  globals.css
lib/
  supabase/
    client.ts
    server.ts
middleware.ts
```

## Deployment

Deploy to Vercel:
```bash
vercel deploy
```

Make sure to add your Supabase environment variables in Vercel Settings → Environment Variables.
