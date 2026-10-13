# Netlify Deployment Guide

This application is ready for deployment on **Netlify**.

---

## Deployment Settings Summary

| Setting | Value |
| :--- | :--- |
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |
| **Node.js Version** | `18` or `20+` |
| **Configuration File** | `netlify.toml` (already configured in root) |
| **SPA Redirects** | Configured in `netlify.toml` and `public/_redirects` |

---

## Method 1: Deploy with Git (Recommended)

1. **Push to GitHub / GitLab / Bitbucket**:
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Log into Netlify**:
   - Go to [https://app.netlify.com](https://app.netlify.com).
   - Click **"Add new site"** → **"Import an existing project"**.

3. **Select Your Git Repository**:
   - Choose your repository.
   - Netlify will automatically detect the settings from `netlify.toml`:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`

4. **Click "Deploy Site"**:
   - Netlify will build the Vite React application and provide a free live URL (e.g., `https://bee-series-rlc.netlify.app`).
   - Every subsequent `git push` will trigger an automatic preview and production deployment!

---

## Method 2: Manual Drag & Drop (Netlify Drop)

If you want to deploy without linking Git:

1. **Build the production bundle locally**:
   ```bash
   npm run build
   ```
   This generates the optimized static files inside the `dist/` directory.

2. **Open Netlify Drop**:
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
   - Drag and drop your **`dist`** folder onto the page.
   - Your site will be published immediately!

---

## Method 3: Netlify CLI

If you use the Netlify command-line interface:

```bash
# 1. Install Netlify CLI globally (if not installed)
npm install -g netlify-cli

# 2. Login to your Netlify account
netlify login

# 3. Build the application
npm run build

# 4. Deploy to production
netlify deploy --prod --dir=dist
```

---

## Included Netlify Features

- **Client-Side SPA Routing (`/* -> /index.html 200`)**: Prevents 404 errors on browser refresh.
- **Cache Optimization**: Immutable caching configured for static assets in `assets/`.
- **Security Headers**: Standard headers (`X-Frame-Options`, `X-Content-Type-Options`) pre-configured in `netlify.toml`.
