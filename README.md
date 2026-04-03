# SolvionTech

React + Vite frontend with an Express/Mongoose backend.

## Features

- React frontend powered by Vite
- Express API server with MongoDB (Mongoose)
- Netlify function wrapper for `/api/*`
- Tailwind-based UI

## Prerequisites

- Node.js 18+
- npm
- MongoDB (local service if using Compass)

## Local setup

1. Install dependencies:
```bash
npm install
npm --prefix server install
```

2. Create `server/.env`:
```env
MONGO_URL=mongodb://127.0.0.1:27017
MONGO_DB_NAME=app_db
JWT_SECRET=replace_with_a_strong_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=use_a_strong_password
```

3. Start the development server:
```bash
npm run dev
```

4. Verify API health:
```bash
http://127.0.0.1:5000/api/health/db
```

## Project structure

```
solvion/
  src/                  # React frontend
  server/               # Express + Mongoose API
  netlify/functions/    # Netlify serverless entry
  netlify.toml          # Redirects + build config
```

## Deploying while using MongoDB Compass (local DB)

Netlify cannot connect directly to your local MongoDB (`127.0.0.1`). If you want to keep your Compass/local database, expose your local backend using a tunnel and point Netlify frontend to that URL.

1. Start local backend:
```bash
npm --prefix server run dev
```

2. Start a tunnel (example with ngrok):
```bash
ngrok http 5000
```

3. Copy your HTTPS forwarding URL, for example:
```text
https://abcd-12-34-56-78.ngrok-free.app
```

4. In Netlify environment variables, set:
```env
VITE_API_BASE_URL=https://abcd-12-34-56-78.ngrok-free.app
```

5. Redeploy the Netlify site.

6. Verify:
- `https://your-netlify-site/api/health/db`
- `https://your-netlify-site/api/services`

If the tunnel is stopped or URL changes, update `VITE_API_BASE_URL` and redeploy again.