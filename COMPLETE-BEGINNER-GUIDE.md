# 👋 Complete Beginner's Guide to Nc E-Commerce Platform

**Welcome!** This guide is for you if you're completely new to programming and need everything explained step-by-step.

> 💡 **Don't worry!** Everyone starts somewhere. This guide assumes you know nothing and explains everything clearly.

---

## 📋 Table of Contents

1. [What is This?](#what-is-this)
2. [What You Need](#what-you-need)
3. [Installing Prerequisites](#installing-prerequisites)
4. [Step-by-Step Setup](#step-by-step-setup)
5. [Using the Platform](#using-the-platform)
6. [Troubleshooting](#troubleshooting)
7. [Glossary](#glossary)
8. [FAQ](#faq)

---

## 🤔 What is This?

**Nc** is an **e-commerce platform** - like Amazon or Flipkart, but built from scratch as a learning project.

### What You'll Be Running

An online shopping website with:
- 🛍️ **Customer store** - Browse and shop products
- 👔 **Vendor dashboard** - Manage products and orders
- 🔧 **Admin panel** - Control the whole platform
- 🔌 **Backend API** - Handles all the data

### What Makes It Special

- **India-First** - Built for Indian market (multi-language, GST, etc.)
- **Modern Design** - Neubrutalism style (bold, high-contrast)
- **Complete** - Has everything a real e-commerce site needs

---

## 💻 What You Need

Before starting, you need 4 things installed on your computer:

### 1. **Node.js** (JavaScript Runtime)
**What it is:** Software that lets you run JavaScript code on your computer  
**Why you need it:** The platform is built with JavaScript  
**Download:** https://nodejs.org/ (get the LTS version - the green button)

### 2. **Git** (Version Control)
**What it is:** Software that downloads code from the internet  
**Why you need it:** To get this project's code onto your computer  
**Download:** https://git-scm.com/downloads

### 3. **Docker Desktop** (Container Platform)
**What it is:** Software that runs databases (where data is stored)  
**Why you need it:** The platform needs databases to work  
**Download:** https://www.docker.com/products/docker-desktop/

### 4. **Code Editor** (Optional but Recommended)
**What it is:** A program to view and edit code  
**Why you need it:** Makes it easier to see the code  
**Download:** https://code.visualstudio.com/ (VS Code - free and popular)

---

## 🔧 Installing Prerequisites

### How to Check What You Already Have

#### Check Node.js

**Windows:**
1. Press `Windows Key + R`
2. Type `cmd` and press Enter
3. Type `node --version` and press Enter
4. If you see a version number (like `v20.x.x`), you have it! ✅

**Mac/Linux:**
1. Open Terminal (search for "Terminal" in Spotlight/Apps)
2. Type `node --version` and press Enter
3. If you see a version number, you have it! ✅

#### Check Git

Same process, but type: `git --version`

#### Check Docker

Same process, but type: `docker --version`

---

### Installing What You're Missing

#### Install Node.js

1. Go to https://nodejs.org/
2. Click the green "LTS" button (Long Term Support)
3. Download and run the installer
4. Click "Next" through all the steps (defaults are fine)
5. Restart your computer
6. Check again with `node --version`

#### Install Git

1. Go to https://git-scm.com/downloads
2. Download for your operating system
3. Run the installer
4. Click "Next" through all steps (defaults are fine)
5. Check with `git --version`

#### Install Docker Desktop

1. Go to https://www.docker.com/products/docker-desktop/
2. Download for your operating system
3. Run the installer
4. **Important:** After installation, start Docker Desktop
5. Wait for it to say "Docker is running"
6. Check with `docker --version`

---

## 🚀 Step-by-Step Setup

Now let's get the platform running! Follow these steps **exactly** as written.

### Step 1: Open Your Terminal/Command Prompt

**Windows:**
- Press `Windows Key + R`
- Type `cmd` and press Enter
- You'll see a black window with text

**Mac:**
- Press `Cmd + Space`
- Type "Terminal"
- Press Enter

**Linux:**
- Press `Ctrl + Alt + T`

### Step 2: Navigate to Where You Want the Project

**What this means:** Choose a folder where you want to save the project

**Example - Desktop:**

Windows:
```cmd
cd Desktop
```

Mac/Linux:
```bash
cd ~/Desktop
```

**What you'll see:** The path in your terminal changes

### Step 3: Clone the Repository

**What to type:**
```bash
git clone -b copilot/create-ecommerce-monorepo https://github.com/abhijeetraiiit/Nc.git
```

**What this does:** Downloads the project code from the internet to your computer

**What you'll see:**
```
Cloning into 'Nc'...
remote: Enumerating objects: 336, done.
remote: Counting objects: 100% (336/336), done.
Receiving objects: 100% (336/336), done.
```

**How long:** 30-60 seconds (depending on internet speed)

**⚠️ Common Mistake:**
- ❌ Forgetting the `-b copilot/create-ecommerce-monorepo` part
- ✅ Make sure to copy the whole command

### Step 4: Enter the Project Folder

**What to type:**
```bash
cd Nc
```

**What this does:** Moves you inside the project folder

**What you'll see:** The path changes to include `Nc`

### Step 5: Install Dependencies

**What to type:**
```bash
npm install
```

**What this does:** Downloads all the code libraries the project needs

**What you'll see:**
- Lots of text scrolling by
- Progress bars
- Package names being downloaded

**How long:** 2-5 minutes

**Expected output at the end:**
```
added 1616 packages in 2m
found 0 vulnerabilities
```

**⚠️ Common Mistakes:**
- ❌ Stopping it because there's too much text
- ✅ Let it run until it says "added 1616 packages"
- ❌ Worrying about warnings (warnings are OK, errors are not)

### Step 6: Start Docker Desktop

**What to do:**
1. Find "Docker Desktop" in your applications
2. Click to open it
3. Wait for it to say "Docker Desktop is running"

**Why:** The databases need Docker to work

**⚠️ Common Mistake:**
- ❌ Forgetting to start Docker Desktop
- ✅ Make sure you see "Docker Desktop is running"

### Step 7: Start the Databases

**What to type:**
```bash
docker-compose up -d postgres mongodb redis
```

**What this does:** Starts 3 databases in the background

**What you'll see:**
```
Creating postgres ... done
Creating mongodb  ... done
Creating redis    ... done
```

**How long:** 30-60 seconds

**What if it doesn't work?**
- Make sure Docker Desktop is running
- Make sure you're in the Nc folder (`cd Nc`)

### Step 8: Create Environment Configuration

**What to type:**

**Windows:**
```cmd
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

**What this does:** Creates a configuration file with settings

**What you'll see:** Nothing much - it just copies the file silently

### Step 9: Generate Database Client

**What to type:**
```bash
cd packages/database
npx prisma generate
```

**What this does:** Creates code to talk to the database

**What you'll see:**
```
✔ Generated Prisma Client
```

**How long:** 10-20 seconds

### Step 10: Run Database Migrations

**What to type:**
```bash
npx prisma migrate dev --name init
```

**What this does:** Creates tables in the database

**What you'll see:**
```
✔ Created database tables
Your database is now in sync with your schema.
```

**How long:** 5-10 seconds

**⚠️ If it asks "Do you want to create the database?"**
- Type `y` and press Enter

### Step 11: Seed Dummy Data

**What to type:**
```bash
npx ts-node seed.ts
npx ts-node seed-products.ts
```

**What this does:** Adds test users, products, and orders to the database

**What you'll see:**
```
✅ Seeded 6 users
✅ Seeded 6 vendors
✅ Seeded 2 orders
✅ Seeded 6 products
```

**How long:** 5-10 seconds

### Step 12: Go Back to Main Folder

**What to type:**
```bash
cd ../..
```

**What this does:** Moves back to the main Nc folder

**Why:** So we can start the whole platform from the right place

### Step 13: Start the Platform!

**What to type:**
```bash
npm run dev
```

**What this does:** Starts all the apps (web, vendor, admin, API)

**What you'll see:**
```
🔍 Checking dependencies...
✓ Dependencies installed

🚀 Starting development servers...

Applications will be available at:
  Web App:          http://localhost:3000
  Vendor Dashboard: http://localhost:3001
  Admin Panel:      http://localhost:3002
  API Gateway:      http://localhost:4000

• Running dev in 14 packages
```

**How long:** 20-30 seconds to fully start

**⚠️ Common Issues:**
- If you see "port already in use" - something else is using ports 3000-3002
- Solution: Close other programs or restart your computer

### Step 14: Open in Browser

**What to do:**
1. Open your web browser (Chrome, Firefox, Safari, Edge)
2. Type this in the address bar: `http://localhost:3000`
3. Press Enter

**What you'll see:**
- The Nc e-commerce homepage! 🎉
- Products, categories, trending items
- Login and Sign Up buttons

**✅ SUCCESS!** If you see the website, everything is working!

---

## 🎯 Using the Platform

### Test Credentials

You can login with these test accounts:

**Customer Account:**
- Email: `test@example.com`
- Password: `password123`

**Vendor Account:**
- Email: `vendor@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `password123`

### What You Can Do

#### As a Customer (Port 3000)

1. **Browse Products**
   - See 6 test products
   - Click on any product to see details

2. **View Categories**
   - Fashion, Electronics, Beauty, etc.
   - Click "Shop Fashion" to explore

3. **See Trending Items**
   - "Trending in Lucknow"
   - "Trending in Mumbai"
   - Real-time social proof

#### As a Vendor (Port 3001)

1. **View Dashboard**
   - See your sales stats
   - Check pending orders
   - View trust score

2. **Manage Products**
   - Add new products
   - Edit existing ones
   - Check inventory

3. **AI Insights**
   - Inventory predictions
   - Sales suggestions

#### As an Admin (Port 3002)

1. **Platform Overview**
   - Total vendors
   - Total products
   - GMV (Gross Merchandise Value)

2. **Vendor Management**
   - Approve new vendors
   - View vendor details

3. **Compliance Monitoring**
   - Check DPDP compliance
   - Monitor GST status
   - Legal metrology checks

---

## 🔧 Troubleshooting

### "npm: command not found"

**Problem:** Node.js isn't installed or not in PATH  
**Solution:** 
1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Try again

### "git: command not found"

**Problem:** Git isn't installed  
**Solution:**
1. Install Git from https://git-scm.com/downloads
2. Restart your terminal
3. Try again

### "docker: command not found"

**Problem:** Docker isn't installed or not running  
**Solution:**
1. Install Docker Desktop
2. Start Docker Desktop
3. Wait for "Docker is running"
4. Try again

### "Port 3000 is already in use"

**Problem:** Another program is using port 3000  
**Solution:**
1. Close any other web development programs
2. Or restart your computer
3. Try `npm run dev` again

### "Cannot connect to database"

**Problem:** Docker databases aren't running  
**Solution:**
1. Make sure Docker Desktop is running
2. Run: `docker-compose up -d postgres mongodb redis`
3. Wait 30 seconds
4. Try again

### "npm install" is taking forever

**Problem:** Slow internet or network issues  
**Solution:**
1. This can take 2-10 minutes - be patient
2. Make sure you have good internet
3. If it stops, press `Ctrl+C` and try again

### Website shows blank page

**Problem:** Platform not fully started  
**Solution:**
1. Wait 1-2 minutes after running `npm run dev`
2. Refresh the page in your browser
3. Check the terminal for any errors

---

## 📚 Glossary

**API** - Application Programming Interface. The backend that handles data.

**Backend** - The server-side code that manages data and logic.

**Branch** - A version of the code. We use `copilot/create-ecommerce-monorepo`.

**Clone** - Copying code from the internet to your computer.

**CMD / Terminal** - A text-based way to control your computer.

**Dependencies** - Code libraries that the project needs to work.

**Docker** - Software that runs databases and services in containers.

**Frontend** - The user interface you see in the browser.

**Git** - Software for downloading and managing code.

**localhost** - Your own computer (when accessed through browser).

**Migration** - Creating or updating database structure.

**Node.js** - Software that runs JavaScript on your computer.

**npm** - Node Package Manager. Downloads JavaScript libraries.

**Port** - A number that identifies different services (3000, 3001, etc).

**Repository (Repo)** - A project's code stored online.

**Seed** - Adding test data to a database.

**Terminal** - See CMD. A text interface to your computer.

---

## ❓ FAQ

### Q: Do I need to be a programmer?

**A:** No! This guide is designed for complete beginners. Just follow the steps.

### Q: How long does setup take?

**A:** First time: 30-60 minutes (mostly waiting for downloads)  
After that: 2-5 minutes to start the platform

### Q: Will this work on my computer?

**A:** Yes! Works on:
- ✅ Windows 10/11
- ✅ macOS (any recent version)
- ✅ Linux (Ubuntu, Mint, etc.)

### Q: Do I need to pay for anything?

**A:** No! Everything is free:
- Node.js - Free
- Git - Free
- Docker Desktop - Free for personal use
- VS Code - Free
- This project - Free and open source

### Q: What if I get stuck?

**A:** 
1. Read the troubleshooting section above
2. Check if you followed every step exactly
3. Google the error message
4. Ask in GitHub Issues
5. Ask a friend who codes

### Q: Can I break anything?

**A:** No! This is running on your computer only. You can:
- Delete it and start over
- Make mistakes - they're how you learn
- Experiment freely

### Q: What's the dummy data?

**A:** Test data so you can try features:
- 6 test users (can login)
- 6 vendors (with products)
- 6 products (can browse/shop)
- 2 sample orders (can view)

### Q: How do I stop the platform?

**A:** In the terminal where `npm run dev` is running:
- Press `Ctrl + C`
- Type `y` if asked
- Platform stops

### Q: How do I start it again later?

**A:**
1. Open terminal
2. `cd Nc` (navigate to folder)
3. `npm run dev` (start platform)

### Q: Do databases need to run every time?

**A:** Yes, but they start automatically if Docker Desktop is running.

### Q: Where is the data stored?

**A:** On your computer in Docker volumes. It persists between sessions.

---

## 🎓 Next Steps

After you have it running:

### 1. **Explore the Code** (Optional)

Open the project in VS Code:
```bash
code .
```

Look at:
- `apps/web/` - Customer website code
- `apps/vendor-dashboard/` - Vendor dashboard code
- `apps/admin/` - Admin panel code

### 2. **Try Making Changes** (Advanced)

Edit a file and see changes automatically:
- Open `apps/web/src/app/page.tsx`
- Change "Shop Like Never Before" to your own text
- Save the file
- Refresh browser - see your change!

### 3. **Learn More**

Resources for beginners:
- **JavaScript:** https://javascript.info/
- **React:** https://react.dev/learn
- **Next.js:** https://nextjs.org/learn
- **Node.js:** https://nodejs.org/en/learn

---

## 🎉 Congratulations!

You've successfully set up and run a complete e-commerce platform!

**What you accomplished:**
- ✅ Installed development tools
- ✅ Downloaded a real project
- ✅ Set up databases
- ✅ Started a full-stack application
- ✅ Accessed it in your browser

**This is no small feat!** Many professional projects have similar setup processes, and you just completed one successfully.

---

## 💡 Remember

- **Take your time** - No rush!
- **It's OK to not understand everything** - That comes with practice
- **Mistakes are learning opportunities** - Everyone makes them
- **Ask for help when stuck** - That's how we all learn
- **You can do this!** - If others can, so can you 💪

---

## 📞 Getting Help

If you're stuck:

1. **Re-read this guide** - The answer might be here
2. **Check troubleshooting** - Common issues listed
3. **Google the error** - Copy-paste error messages into Google
4. **Ask on GitHub** - Create an issue with:
   - What you were trying to do
   - What command you ran
   - What error you got
   - Screenshots if possible

**Good luck, and happy learning!** 🚀

---

*Made with ❤️ for beginners who want to learn*
