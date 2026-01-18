# Quick Start Guide for Grace

## Step 1: Get Your Gemini API Key (Do This First!)

1. Open your browser and go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Click "Create API key in new project"
5. **Copy the key and save it somewhere** - you'll need it in Step 3

---

## Step 2: Set Up the Project in WSL

Open your WSL terminal and run:

```bash
# Navigate to where you want the project
cd ~

# If you haven't already, move the career-cocktails folder to your home directory
# (The folder is in /home/claude/career-cocktails)

# Navigate into the project
cd career-cocktails

# Install dependencies
npm install
```

---

## Step 3: Add Your API Key

```bash
# Create your .env file from the example
cp .env.example .env

# Open it in VS Code
code .env
```

In the `.env` file that opens, replace `your_api_key_here` with your actual API key:

```
VITE_GEMINI_API_KEY=AIzaSyC...paste_your_key_here
```

Save the file (Ctrl+S).

---

## Step 4: Run It Locally

```bash
# Start the development server
npm run dev
```

You should see something like:
```
  ➜  Local:   http://localhost:5173/
```

Open that URL in your browser. Test it out!

---

## Step 5: Deploy to Vercel

Once you're happy with how it works locally:

```bash
# Build to make sure everything works
npm run build

# Install Vercel CLI if you don't have it
npm install -g vercel

# Deploy!
vercel
```

Answer the prompts:
- **Set up and deploy?** Y
- **Which scope?** Choose your account
- **Link to existing project?** N
- **Project name?** career-cocktails (or whatever you want)
- **Directory?** Just press Enter
- **Override settings?** N

---

## Step 6: Add API Key to Vercel

After deployment:

1. Go to https://vercel.com/dashboard
2. Click on your `career-cocktails` project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** Your Gemini API key (same one from Step 1)
   - **Environment:** Check "Production"
6. Click **Save**

---

## Step 7: Redeploy

Back in your terminal:

```bash
vercel --prod
```

That's it! Vercel will give you a live URL. Share it and start creating cocktails! 🍸

---

## Need to Update Later?

Just run:
```bash
vercel --prod
```

---

## Common Issues

**"Missing API key" error:**
- Make sure your `.env` file exists and has your key
- Restart the dev server after adding the key

**Downloaded image is blank:**
- This is a known issue with html2canvas sometimes
- Try a different browser or regenerate the cocktail

**Vercel app not working:**
- Did you add the environment variable in Vercel dashboard?
- Did you redeploy after adding it?

---

Good luck! 🎉
