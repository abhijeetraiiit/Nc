# 🌐 Running Nc Platform Online (No Local Installation Required)

**Yes! You can run the Nc platform directly through a website without installing anything locally.**

This guide shows you how to deploy and access the platform online using free cloud services.

---

## 🚀 Quick Answer

You have **3 options** to run this platform online:

### Option 1: Try Our Demo (Coming Soon)
Visit our hosted demo: **https://demo.nc-ecommerce.in** _(In development)_

### Option 2: Deploy Your Own Instance (Free)
Use one-click deployment to create your own version:
- **Frontend**: Deploy to Vercel (Free)
- **Backend**: Deploy to Railway (Free tier)
- **Databases**: Use managed services (Free tiers available)

### Option 3: Use Cloud Development Environment
Use GitHub Codespaces or Gitpod to run in browser.

---

## 📋 Option 1: Public Demo (Recommended for Testing)

### Coming Soon
We're working on hosting a public demo at:
- **Web App**: https://demo.nc-ecommerce.in
- **Vendor Dashboard**: https://vendor-demo.nc-ecommerce.in
- **Admin Panel**: https://admin-demo.nc-ecommerce.in
- **API Docs**: https://api-demo.nc-ecommerce.in/docs

**Status**: In development. Check back soon!

---

## 🎯 Option 2: Deploy Your Own Instance (Easiest)

Deploy your own version for free using cloud platforms. Total setup time: **15-20 minutes**.

### Step 1: Set Up Databases (Free Tier)

You need three databases. All offer free tiers:

#### A. PostgreSQL (Supabase - Free)

1. Go to https://supabase.com
2. Sign up (free)
3. Click "New Project"
4. Name it "nc-ecommerce"
5. Set a password
6. Wait 2 minutes for setup
7. Go to Settings → Database
8. Copy the "Connection String" (URI format)
   - Example: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`

#### B. MongoDB (MongoDB Atlas - Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Click "Create" → "Shared" (free tier)
4. Choose a cloud provider (AWS recommended)
5. Choose a region closest to you
6. Name cluster "nc-ecommerce"
7. Create a database user (username + password)
8. Add IP address: `0.0.0.0/0` (allow all - for testing)
9. Click "Connect" → "Connect your application"
10. Copy the connection string
    - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nc_ecommerce`

#### C. Redis (Upstash - Free)

1. Go to https://upstash.com
2. Sign up (free)
3. Click "Create Database"
4. Choose "Redis"
5. Name it "nc-redis"
6. Choose a region
7. Click "Create"
8. Copy the "Redis URL"
   - Example: `redis://:password@optimal-mantis-12345.upstash.io:6379`

**Save all three URLs - you'll need them!**

---

### Step 2: Deploy Frontend to Vercel (Free)

#### A. Deploy Web App

1. **Fork this repository** on GitHub
2. Go to https://vercel.com
3. Sign up with GitHub (free)
4. Click "New Project"
5. Import your forked `Nc` repository
6. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && npm install && npm run build --filter=@nc/web`
   - **Output Directory**: `.next`

7. Add Environment Variables:
   ```
   DATABASE_URL=<your-supabase-url>
   MONGODB_URI=<your-mongodb-url>
   REDIS_URL=<your-upstash-url>
   NEXT_PUBLIC_API_URL=<your-api-url-from-step-3>
   ```

8. Click "Deploy"
9. Wait 2-3 minutes
10. Your app is live! Copy the URL (e.g., `nc-web.vercel.app`)

#### B. Deploy Vendor Dashboard

Repeat the same process but use:
- **Root Directory**: `apps/vendor-dashboard`
- Different environment variables if needed

#### C. Deploy Admin Panel

Repeat for:
- **Root Directory**: `apps/admin`

---

### Step 3: Deploy Backend to Railway (Free)

#### A. Deploy API Gateway

1. Go to https://railway.app
2. Sign up with GitHub (free)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your forked `Nc` repository
6. Configure:
   - **Service Name**: `api-gateway`
   - **Root Directory**: `services/api-gateway`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`

7. Add Environment Variables:
   ```
   PORT=4000
   NODE_ENV=production
   DATABASE_URL=<your-supabase-url>
   MONGODB_URI=<your-mongodb-url>
   REDIS_URL=<your-upstash-url>
   JWT_SECRET=<generate-random-string>
   ALLOWED_ORIGINS=<your-vercel-urls>
   ```

8. Click "Deploy"
9. Railway will give you a URL (e.g., `api-gateway.railway.app`)

#### B. Deploy Other Services

Repeat for each service:
- `services/vendor-service`
- `services/product-service`
- `services/order-service`
- etc.

**Tip**: Railway's free tier includes $5/month credit, enough for testing!

---

### Step 4: Run Database Migrations

Once your API Gateway is deployed:

1. Go to Railway dashboard
2. Click on your `api-gateway` service
3. Click "Terminal" or "Deploy Logs"
4. Run migrations using Railway's CLI or through the dashboard:

```bash
# Option A: Use Railway CLI locally
railway run npx prisma migrate deploy

# Option B: Add to your start command
npm run migrate && npm run start:prod
```

Or use Supabase SQL Editor:
1. Go to Supabase dashboard
2. Click "SQL Editor"
3. Paste your Prisma migration SQL
4. Click "Run"

---

### Step 5: Access Your Deployed Apps

Visit your URLs:
- **Web App**: `https://your-project.vercel.app`
- **API Gateway**: `https://your-api.railway.app`
- **API Docs**: `https://your-api.railway.app/api/docs`

**🎉 Congratulations! Your platform is now live on the internet!**

---

## 🔧 Option 3: Cloud Development Environment

Run the entire platform in your browser without installing anything:

### A. GitHub Codespaces (Recommended)

1. Go to https://github.com/abhijeetraiiit/Nc
2. Click the green "Code" button
3. Click "Codespaces" tab
4. Click "Create codespace on main"
5. Wait 2-3 minutes for setup
6. In the terminal that opens, run:
   ```bash
   npm install
   docker-compose up -d postgres mongodb redis
   npm run dev
   ```
7. VS Code will prompt you to open ports
8. Click "Open in Browser" for port 3000

**Free tier**: 60 hours/month

### B. Gitpod

1. Go to https://gitpod.io
2. Enter: `https://github.com/abhijeetraiiit/Nc`
3. Click "Continue"
4. Wait for workspace to load
5. Run the same commands as above

**Free tier**: 50 hours/month

---

## 💰 Cost Breakdown (Free Tiers)

All these services offer free tiers perfect for testing:

| Service | Free Tier | Purpose |
|---------|-----------|---------|
| **Vercel** | 100 GB bandwidth/month | Frontend hosting |
| **Railway** | $5 credit/month | Backend services |
| **Supabase** | 500 MB database, 2 GB bandwidth | PostgreSQL |
| **MongoDB Atlas** | 512 MB storage | MongoDB |
| **Upstash** | 10,000 commands/day | Redis |
| **GitHub Codespaces** | 60 hours/month | Cloud IDE |

**Total Cost**: **$0/month** for testing and demos!

---

## 🚀 One-Click Deploy Buttons

### Deploy Frontend to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abhijeetraiiit/Nc&project-name=nc-ecommerce&repository-name=nc-ecommerce&root-directory=apps/web)

### Deploy Backend to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/nc-ecommerce)

### Open in Codespaces

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=abhijeetraiiit/Nc)

### Open in Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/abhijeetraiiit/Nc)

---

## 📊 Deployment Comparison

| Method | Time | Cost | Best For |
|--------|------|------|----------|
| **Public Demo** | 0 min | Free | Quick testing |
| **Deploy Your Own** | 20 min | Free tier | Personal projects |
| **Codespaces/Gitpod** | 5 min | Free tier | Development |
| **Local Setup** | 10 min | Free | Full control |

---

## 🔒 Security Notes

### For Public Deployments:

1. **Change JWT Secret**: Never use default secrets
   ```bash
   # Generate a secure secret
   openssl rand -base64 32
   ```

2. **Restrict Database Access**: 
   - Don't use `0.0.0.0/0` for production
   - Whitelist only your deployment IPs

3. **Use Environment Variables**: Never commit secrets to Git

4. **Enable SSL**: All platforms provide free SSL/HTTPS

5. **Set CORS Properly**: Only allow your frontend domains

---

## 🎓 Step-by-Step Video Guide

Watch our deployment tutorial: _(Coming Soon)_
- YouTube: https://youtube.com/nc-ecommerce-deploy
- Duration: 15 minutes
- Shows complete free deployment

---

## 🆘 Troubleshooting Deployments

### Vercel Build Fails

**Error**: "Cannot find module '@nc/ui'"

**Solution**: Update build command:
```bash
cd ../.. && npm install && npm run build --filter=@nc/web
```

### Railway Out of Memory

**Error**: "JavaScript heap out of memory"

**Solution**: Add environment variable:
```
NODE_OPTIONS=--max-old-space-size=512
```

### Database Connection Fails

**Error**: "Can't reach database server"

**Solution**: 
1. Check your connection strings
2. Ensure IP whitelist includes `0.0.0.0/0` or your deployment IPs
3. Verify database is running (check provider dashboard)

### CORS Errors

**Error**: "CORS policy: No 'Access-Control-Allow-Origin'"

**Solution**: Add frontend URL to `ALLOWED_ORIGINS` in backend:
```
ALLOWED_ORIGINS=https://your-app.vercel.app,https://another-app.vercel.app
```

---

## 📞 Need Help?

### Resources:
- **Platform Docs**: [/docs](/docs)
- **Deployment Guide**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Community:
- **GitHub Issues**: For bugs
- **GitHub Discussions**: For questions
- **Email**: support@nc-ecommerce.in

---

## 🎯 What's Next?

After deploying:

1. **Explore the platform** - Browse your live site
2. **Add custom domain** - Most platforms offer this free
3. **Set up monitoring** - Use Vercel Analytics or Railway monitoring
4. **Scale up** - Upgrade to paid tiers when ready
5. **Contribute** - Help improve the platform!

---

## ✅ Summary

**Question**: "Can I run directly through any website?"

**Answer**: **YES!** Three ways:

1. ✅ **Use our demo** (coming soon) - Zero setup
2. ✅ **Deploy your own** - 20 min, $0/month
3. ✅ **Cloud IDE** - 5 min, runs in browser

**Recommended**: Start with GitHub Codespaces for quickest results, or deploy your own for a permanent online version.

---

**Built with ❤️ for easy deployment**

*Last updated: February 2026*
