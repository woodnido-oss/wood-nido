# Wood Nido - Artisan Woodwork & Bespoke Furniture

A modern web application and management catalog for **Wood Nido** (Islamabad, Pakistan), built with React 19, TypeScript, Tailwind CSS, and Firebase Firestore (Free Spark tier).

---

## Features
- **Modern Responsive Customer Storefront**: Hero slider, product categories, interactive Islamabad workshop map, WhatsApp order integration, video showcase, and customer inquiries.
- **Admin Management Portal (`#/admin`)**: Product catalog manager, categories editor, project videos, gallery photos, and lead management.
- **Free Cloud Database (Firebase Firestore)**: Real-time synchronization of products, categories, and inquiries on the 100% free Spark plan.
- **Vercel-Ready SPA**: Includes `vercel.json` with SPA route rewrites for clean URL handling.

---

## 🚀 How to Deploy on GitHub & Vercel (Free)

### Step 1: Push to GitHub
1. In Google AI Studio, open the top-right menu and click **Export** → **Export to GitHub** (or download ZIP).
2. Alternatively, from your local terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Wood Nido with Firebase & Vercel config"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/wood-nido.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel (100% Free Hosting)
1. Go to [https://vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New Project"** and select your `wood-nido` repository.
3. Vercel will automatically detect:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.
5. Within 1 minute, your website will be live on a free `.vercel.app` domain (e.g. `wood-nido.vercel.app`) with free SSL/HTTPS!
