# Quick Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free)
- Railway or Render account (free)

## Quick Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy Backend (Railway - Recommended)

1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Select your repo
3. Set Root Directory to `backend`
4. Add Environment Variables:
   - `GMAIL_USER` = your-email@gmail.com
   - `GMAIL_PASS` = your-gmail-app-password
   - `SENDER_NAME` = Your Name
   - `FRONTEND_URL` = (leave empty for now, update after frontend deploy)
   - `NODE_ENV` = production
5. Copy the backend URL (e.g., `https://xxx.railway.app`)

### 3. Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) → Add New Project
2. Import your GitHub repo
3. Set Root Directory to `frontend`
4. Add Environment Variable:
   - `VITE_API_URL` = your-backend-url-from-railway
5. Deploy and copy the frontend URL

### 4. Update Backend CORS

1. Go back to Railway
2. Update `FRONTEND_URL` = your-vercel-frontend-url
3. Backend will auto-redeploy

### 5. Get Gmail App Password

1. Google Account → Security → 2-Step Verification (enable)
2. App Passwords → Generate → Mail
3. Use this password (not your regular password) for `GMAIL_PASS`

## Done! 🎉

Your app should now be live. Visit your Vercel URL to test.

## Need Help?

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.
