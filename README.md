# 🍸 Career Mixologist

Craft your professional journey into an elegant, shareable cocktail recipe card.

## What It Does

Career Mixologist transforms your unconventional career path into a creative cocktail recipe card with AI-generated content you can download and share on LinkedIn.

**Inputs:**
- Base Spirit: What you studied
- Garnish: A weird job along the way
- Mixer: What you do now
- Secret Ingredient (optional): An unexpected skill
- Style: Stirred (honest & reflective) or Shaken (bold & confident)

**Output:**
A downloadable PNG recipe card with:
- Creative cocktail name (matched to appropriate glassware)
- Detailed recipe with bartending steps
- Punchy tasting notes tagline
- Your personal branding footer

## Features

✨ **5 Glass Types** - Automatic matching based on cocktail name (martini, rocks, highball, coupe, hurricane)
🎨 **Elegant Design** - Modern minimalist with speakeasy aesthetic touches
📱 **Mobile Optimized** - Responsive design that works beautifully on all devices
🔗 **Share Button** - Easy social sharing with Web Share API
🎯 **Two Tone Styles** - Choose between reflective or confident messaging
🤖 **AI-Powered** - Uses Gemini API to generate unique, creative cocktails

## Setup Instructions

### 1. Get Your Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API key in new project"
4. Copy the API key

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 4. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Deploying to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add your environment variable in Vercel:
   - Go to your project settings on vercel.com
   - Navigate to "Environment Variables"
   - Add `VITE_GEMINI_API_KEY` with your API key
   - Redeploy: `vercel --prod`

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub (make sure `.env` is in `.gitignore`)

2. Go to https://vercel.com and click "New Project"

3. Import your GitHub repository

4. Add environment variable:
   - In the deployment settings, add `VITE_GEMINI_API_KEY`
   - Paste your Gemini API key as the value

5. Click "Deploy"

## Project Structure

```
career-cocktails/
├── src/
│   ├── App.jsx          # Main app component
│   ├── App.css          # Styling
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
├── .env.example         # Environment variable template
└── README.md           # This file
```

## Tech Stack

- **Framework:** React 18 + Vite
- **AI:** Google Gemini API (free tier)
- **Image Generation:** html2canvas
- **Deployment:** Vercel (free tier)
- **Development:** WSL + VS Code

## Features

- 🎨 Modern minimalist design with speakeasy touches
- 🤖 AI-powered cocktail generation using Gemini
- 📥 Downloadable PNG recipe cards
- 🎭 Two tone styles: Stirred (reflective) or Shaken (bold)
- 📱 Mobile responsive
- ⚡ Fast Vite build system

## Tips

- **Free tier limits:** Gemini API has rate limits on the free tier. If you hit limits, wait a few minutes before trying again.
- **Best results:** Be specific with your inputs. "Marine Biology" works better than just "Biology"
- **Secret ingredient:** This is optional but adds an extra layer of humor when the AI connects unexpected dots

## Troubleshooting

**API Error?**
- Check that your `.env` file exists and has the correct API key
- Verify your API key at https://aistudio.google.com/app/apikey
- Make sure you're not hitting rate limits (wait a few minutes)

**Build Error?**
- Delete `node_modules` and run `npm install` again
- Check that you're using Node.js 18 or higher

**Deployment Error?**
- Make sure you added the environment variable in Vercel settings
- Check that `.env` is in your `.gitignore` (never commit API keys!)

## License

MIT - Feel free to use and modify!

## Credits

Created by Grace Lean
