# Deployment Guide for RecruiterHub

This guide will walk you through deploying the RecruiterHub application with the frontend on Vercel and backend on Railway (or Render).

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Railway account (free tier available) OR Render account (free tier available)
- Gmail account with App Password (for email sending)

---

## Part 1: Backend Deployment (Railway)

### Step 1: Prepare Backend for Deployment

The backend is already configured with:
- Dynamic PORT support
- Configurable CORS
- Build scripts

### Step 2: Push Code to GitHub

1. Initialize git (if not already done):
```bash
cd /Users/hustler_harcharan/Desktop/RecruiterHub
git init
git add .
git commit -m "Prepare for deployment"
```

2. Create a new repository on GitHub and push:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Railway

1. Go to [Railway.app](https://railway.app) and sign up/login
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect the backend folder. If not:
   - Click on the service
   - Go to Settings → Root Directory → Set to `backend`

6. **Set Environment Variables:**
   - Go to Variables tab
   - Add the following:
     ```
     GMAIL_USER=your-email@gmail.com
     GMAIL_PASS=your-app-password
     SENDER_NAME=Your Name
     RESUME_FILE_PATH=/path/to/resume.pdf (optional)
     DATABASE_FILE_PATH=/path/to/data.csv (optional)
     FRONTEND_URL=https://your-frontend.vercel.app
     NODE_ENV=production
     PORT=8000 (Railway will override this automatically)
     ```

7. **Deploy:**
   - Railway will automatically build and deploy
   - Note the deployment URL (e.g., `https://your-backend.railway.app`)

### Alternative: Deploy on Render

1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** recruiterhub-backend
   - **Root Directory:** backend
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

5. **Set Environment Variables:**
   - Same as Railway above

6. Click "Create Web Service"
   - Render will deploy automatically
   - Note the deployment URL (e.g., `https://your-backend.onrender.com`)

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

The frontend is already configured with:
- API configuration using environment variables
- Vercel configuration file

### Step 2: Deploy on Vercel

1. Go to [Vercel.com](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** frontend
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)

5. **Set Environment Variables:**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-backend.railway.app
     ```
     (Use your actual backend URL from Railway/Render)

6. Click "Deploy"
   - Vercel will build and deploy automatically
   - Note your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 3: Update Backend CORS

After getting your frontend URL, update the backend environment variable:

1. Go back to Railway/Render
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Redeploy the backend (or it will auto-redeploy)

---

## Part 4: Gmail App Password Setup

To send emails, you need a Gmail App Password:

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to "App passwords"
4. Generate a new app password for "Mail"
5. Use this password (not your regular Gmail password) for `GMAIL_PASS`

---

## Part 5: File Storage (Optional)

If you need to store files (resume, CSV data):

### Option 1: Use Platform Storage
- **Railway:** Use persistent volumes
- **Render:** Use persistent disk

### Option 2: Use Cloud Storage (Recommended)
- Upload files to AWS S3, Cloudinary, or similar
- Update `RESUME_FILE_PATH` and `DATABASE_FILE_PATH` to use URLs

---

## Environment Variables Summary

### Backend (Railway/Render):
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
SENDER_NAME=Your Name
RESUME_FILE_PATH=/path/to/resume.pdf (optional)
DATABASE_FILE_PATH=/path/to/data.csv (optional)
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=8000 (auto-set by platform)
```

### Frontend (Vercel):
```
VITE_API_URL=https://your-backend.railway.app
```

---

## Testing Deployment

1. Visit your frontend URL
2. Test sending an email
3. Check backend logs for any errors
4. Verify CORS is working (no CORS errors in browser console)

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Check that CORS is configured correctly in `backend/src/index.ts`

### Email Not Sending
- Verify Gmail App Password is correct
- Check backend logs for email errors
- Ensure `GMAIL_USER` and `GMAIL_PASS` are set correctly

### Build Failures
- Check that all dependencies are in `package.json`
- Verify TypeScript compilation succeeds locally: `cd backend && npm run build`
- Check platform logs for specific errors

### Port Issues
- Backend should use `process.env.PORT` (already configured)
- Railway/Render will automatically set the PORT

---

## Updating Your Deployment

After making code changes:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Automatic Deployment:**
   - Vercel and Railway/Render will automatically detect changes and redeploy
   - Monitor the deployment logs for any issues

---

## Cost Estimate

- **Vercel:** Free tier (generous limits)
- **Railway:** Free tier ($5 credit/month)
- **Render:** Free tier (spins down after inactivity)

For production, consider:
- Railway paid plan: ~$5-20/month
- Render paid plan: ~$7-25/month
- Vercel Pro: ~$20/month (if needed)

---

## Support

If you encounter issues:
1. Check platform logs (Railway/Render/Vercel dashboards)
2. Verify all environment variables are set correctly
3. Test locally first to isolate issues
4. Check browser console for frontend errors

---

## Next Steps

- Set up custom domains (optional)
- Configure monitoring and error tracking
- Set up CI/CD pipelines
- Add database if needed (currently using file storage)
