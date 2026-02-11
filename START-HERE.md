# 🚀 START HERE - How to Run Nc Platform

## Quick 3-Step Guide

### Step 1: Clone the Repository (Correct Branch!)

```bash
git clone -b copilot/create-ecommerce-monorepo https://github.com/abhijeetraiiit/Nc.git
cd Nc
```

> ⚠️ **IMPORTANT**: You MUST use the `-b copilot/create-ecommerce-monorepo` flag! The main branch only has a README.

### Step 2: Install Dependencies

```bash
npm install
```

This will:
- Install all 1,616 packages
- Take about 1-2 minutes
- Show "0 vulnerabilities" when complete ✅

### Step 3: Start the Platform

```bash
npm run dev
```

This starts all applications. Wait for:
```
✓ Dependencies installed
🚀 Starting development servers...
• Running dev in 14 packages
```

---

## 🌐 Access Your Applications

Once running, open these URLs in your browser:

| Application | URL | Description |
|-------------|-----|-------------|
| **Web App** | http://localhost:3000 | Customer-facing store |
| **Vendor Dashboard** | http://localhost:3001 | For vendors to manage products |
| **Admin Panel** | http://localhost:3002 | Platform administration |
| **API Gateway** | http://localhost:4000 | Backend API |

---

## 🎯 That's It!

You now have a fully functional e-commerce platform running locally!

**What you'll see:**
- Beautiful Neubrutalism design
- Bento Grid layout
- Product catalog with trending items
- India-first features (GST, regional trending, etc.)

![Nc Platform Screenshot](https://github.com/user-attachments/assets/2f1b1b4d-f78d-4f8f-9c5c-99bfb5cb261b)

---

## 📝 Common Issues

### "npm error Missing script: dev"
**Problem:** You're on the wrong branch (main)
**Solution:** 
```bash
git checkout copilot/create-ecommerce-monorepo
npm install
npm run dev
```

### "concurrency of 10 but need 15"
**Solution:** This is already fixed - just make sure you have the latest code:
```bash
git pull origin copilot/create-ecommerce-monorepo
npm install
npm run dev
```

### "3 vulnerabilities"
**Solution:** This is already fixed - you're using old code. Get latest:
```bash
git pull origin copilot/create-ecommerce-monorepo
npm install
```

---

## 📚 Want More Details?

- **First time with Node.js?** → See [QUICKSTART.md](./QUICKSTART.md)
- **Need troubleshooting?** → See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Want to deploy online?** → See [ONLINE-DEPLOYMENT.md](./ONLINE-DEPLOYMENT.md)
- **Using Windows?** → Run `setup.bat` instead of manual steps
- **Using Linux/Mac?** → Run `./setup.sh` for automated setup

---

## 🎉 Next Steps

Once it's running:

1. **Explore the Web App** at http://localhost:3000
   - Check out the Bento Grid layout
   - See the trending products
   - Try the product cards

2. **Check the Vendor Dashboard** at http://localhost:3001
   - View the AI inventory insights
   - See the Trust Score algorithm
   - Try the dark mode interface

3. **Look at the Admin Panel** at http://localhost:3002
   - See platform statistics
   - Check compliance monitoring
   - View vendor management

4. **Read the docs** in the `/docs` folder
   - Architecture details
   - API documentation
   - Compliance information

---

## 💡 Pro Tips

- **Stop the servers**: Press `Ctrl+C` in the terminal
- **Restart**: Run `npm run dev` again
- **Clean install**: Delete `node_modules` and `package-lock.json`, then run `npm install`
- **Check status**: Run `npm run check-install` to verify dependencies

---

**Need help?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or create an issue!

**Happy coding!** 🎊
