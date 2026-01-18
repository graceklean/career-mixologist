import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

// You'll need to add your Gemini API key in a .env file
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Glass type matching logic
const getGlassForCocktail = (name) => {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('martini') || nameLower.includes('cosmopolitan')) {
    return 'martini';
  }
  if (nameLower.includes('old fashioned') || nameLower.includes('negroni') || 
      nameLower.includes('manhattan') || nameLower.includes('sazerac')) {
    return 'rocks';
  }
  if (nameLower.includes('spritz') || nameLower.includes('fizz') || 
      nameLower.includes('collins') || nameLower.includes('mojito') || 
      nameLower.includes('highball')) {
    return 'highball';
  }
  if (nameLower.includes('sidecar') || nameLower.includes('daiquiri') || 
      nameLower.includes('aviation') || nameLower.includes('coupe')) {
    return 'coupe';
  }
  if (nameLower.includes('hurricane') || nameLower.includes('piña colada') || 
      nameLower.includes('mai tai') || nameLower.includes('tropical')) {
    return 'hurricane';
  }
  
  return 'martini';
};

// SVG Glass Components
const GlassSVG = ({ type, idPrefix = 'card' }) => {
  const gradientId = `${idPrefix}GlassGradient`;
  const strokeColor = idPrefix === 'title' ? '#eae7e0' : '#0f1626';
  const sparkleColor = idPrefix === 'title' ? '#eae7e0' : '#0f1626';
  
  const glasses = {
    martini: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:'#ed1260', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#f15a51', stopOpacity:1}} />
          </linearGradient>
        </defs>
        <rect x="48" y="60" width="4" height="25" fill="#ab987a" rx="2"/>
        <ellipse cx="50" cy="87" rx="12" ry="3" fill="#ab987a"/>
        <path d="M 20 20 L 50 60 L 80 20 Z" fill={`url(#${gradientId})`} opacity="0.9"/>
        <line x1="15" y1="20" x2="85" y2="20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="50" cy="40" r="4" fill="#8a7a62"/>
        <line x1="50" y1="15" x2="50" y2="45" stroke="#ab987a" strokeWidth="1.5"/>
        <circle cx="35" cy="35" r="2" fill={sparkleColor} opacity="0.4"/>
        <circle cx="65" cy="45" r="1.5" fill={sparkleColor} opacity="0.3"/>
      </svg>
    ),
    
    rocks: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:'#ed1260', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#f15a51', stopOpacity:1}} />
          </linearGradient>
        </defs>
        <rect x="28" y="85" width="44" height="4" rx="2" fill="#ab987a"/>
        <path d="M 30 40 L 32 85 L 68 85 L 70 40 Z" fill={`url(#${gradientId})`} opacity="0.9"/>
        <line x1="30" y1="40" x2="70" y2="40" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="38" y="50" width="8" height="8" fill={sparkleColor} opacity="0.3" rx="1"/>
        <rect x="52" y="58" width="6" height="6" fill={sparkleColor} opacity="0.25" rx="1"/>
        <circle cx="45" cy="68" r="3" fill={sparkleColor} opacity="0.2"/>
        <path d="M 32 42 L 30 47 L 70 47 L 68 42" fill={`url(#${gradientId})`} opacity="0.3"/>
      </svg>
    ),
    
    highball: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:'#ed1260', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#f15a51', stopOpacity:1}} />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="87" rx="14" ry="3" fill="#ab987a"/>
        <rect x="38" y="30" width="24" height="57" rx="2" fill={`url(#${gradientId})`} opacity="0.9"/>
        <line x1="38" y1="30" x2="62" y2="30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>
        <line x1="42" y1="40" x2="42" y2="75" stroke={sparkleColor} strokeWidth="1.5" opacity="0.3"/>
        <circle cx="50" cy="50" r="2" fill={sparkleColor} opacity="0.4"/>
        <circle cx="55" cy="65" r="2.5" fill={sparkleColor} opacity="0.35"/>
        <rect x="40" y="25" width="20" height="3" fill="#8a7a62" opacity="0.6" rx="1"/>
        <line x1="45" y1="20" x2="45" y2="28" stroke="#ab987a" strokeWidth="1.5"/>
      </svg>
    ),
    
    coupe: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:'#ed1260', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#f15a51', stopOpacity:1}} />
          </linearGradient>
        </defs>
        <rect x="48" y="65" width="4" height="20" fill="#ab987a" rx="2"/>
        <ellipse cx="50" cy="87" rx="12" ry="3" fill="#ab987a"/>
        <ellipse cx="50" cy="60" rx="26" ry="35" fill={`url(#${gradientId})`} opacity="0.9"/>
        <ellipse cx="50" cy="25" rx="24" ry="3" stroke={strokeColor} strokeWidth="2" fill="none"/>
        <circle cx="38" cy="40" r="2" fill={sparkleColor} opacity="0.4"/>
        <circle cx="60" cy="48" r="1.5" fill={sparkleColor} opacity="0.35"/>
        <path d="M 26 25 Q 50 28 74 25" stroke={strokeColor} strokeWidth="1.5" fill="none" opacity="0.5"/>
      </svg>
    ),
    
    hurricane: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:'#ed1260', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#f15a51', stopOpacity:1}} />
          </linearGradient>
        </defs>
        <rect x="48" y="75" width="4" height="10" fill="#ab987a" rx="2"/>
        <ellipse cx="50" cy="87" rx="13" ry="3" fill="#ab987a"/>
        <path d="M 35 30 Q 32 55 38 75 L 62 75 Q 68 55 65 30 Z" fill={`url(#${gradientId})`} opacity="0.9"/>
        <ellipse cx="50" cy="30" rx="15" ry="3" stroke={strokeColor} strokeWidth="2" fill="none"/>
        <circle cx="45" cy="45" r="3" fill="#8a7a62"/>
        <circle cx="55" cy="50" r="2.5" fill="#8a7a62"/>
        <line x1="42" y1="22" x2="42" y2="32" stroke="#ab987a" strokeWidth="1.5"/>
        <circle cx="40" cy="60" r="2" fill={sparkleColor} opacity="0.3"/>
        <circle cx="58" cy="65" r="1.5" fill={sparkleColor} opacity="0.25"/>
      </svg>
    )
  };
  
  return glasses[type] || glasses.martini;
};

function App() {
  const [formData, setFormData] = useState({
    baseSpirit: '',
    garnish: '',
    mixer: '',
    secretIngredient: '',
    style: 'stirred'
  });
  
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const cardRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStyleToggle = (style) => {
    setFormData(prev => ({ ...prev, style }));
  };

  const resetForm = () => {
    setFormData({
      baseSpirit: '',
      garnish: '',
      mixer: '',
      secretIngredient: '',
      style: 'stirred'
    });
    setCocktail(null);
    setError('');
  };

  const generateCocktail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const prompt = `You are a creative career cocktail mixologist. Generate a clever, humorous career cocktail based on these inputs:

Base Spirit (what they studied): ${formData.baseSpirit}
Garnish (weird job along the way): ${formData.garnish}
Mixer (current job): ${formData.mixer}
${formData.secretIngredient ? `Secret Ingredient (unexpected skill): ${formData.secretIngredient}` : ''}

Style: ${formData.style === 'stirred' ? 'STIRRED - Honest, reflective, humble tone. Acknowledges the non-linear path without diminishing it. Grounded, real, relatable energy. Example: "The scenic route taught me things the highway never would"' : 'SHAKEN - Bold, confident, empowering tone. Owns the unconventional path as intentional. Declarative, powerful energy. Example: "This combination is exactly why it works"'}

${formData.secretIngredient ? 'The tasting notes should highlight how the secret ingredient unexpectedly connects everything.' : 'The tasting notes should focus on the contrast between the career points.'}

IMPORTANT INSTRUCTIONS:
- The cocktail name MUST include a classic cocktail type (e.g., "Spritz", "Old Fashioned", "Martini", "Collins", "Negroni", "Manhattan", "Daiquiri", "Mojito", "Hurricane", "Mai Tai") so the glass can be matched
- The recipe should be detailed (50-60 words) with multiple bartending steps using verbs like: muddle, shake, stir, strain, top with, express, garnish, serve
- The tasting notes should be brief and punchy (10-15 words max) - like a tagline

Generate ONLY a JSON response (no markdown, no code blocks) with this exact structure:
{
  "name": "A creative cocktail name that includes a classic cocktail type (6-10 words)",
  "recipe": "Detailed recipe with multiple steps using bartending verbs (50-60 words)",
  "tastingNotes": "Brief, punchy tagline (10-15 words max). Match the ${formData.style} tone exactly."
}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature: 0.9,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate cocktail. Check your API key.');
      }

      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      
      const cleanedResponse = textResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      const cocktailData = JSON.parse(cleanedResponse);
      setCocktail(cocktailData);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#eae7e0',
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `${cocktail.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
    }
  };

  const shareCard = async () => {
    const shareData = {
      title: 'Career Mixologist',
      text: `Check out my career cocktail: ${cocktail.name}`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share error:', err);
      }
    }
  };

  const glassType = cocktail ? getGlassForCocktail(cocktail.name) : 'martini';

  return (
    <div className="app">
      <header className="header">
        <div className="title-icon">
          <GlassSVG type="martini" idPrefix="title" />
        </div>
        <h1>Career Mixologist</h1>
        <p className="subtitle">Craft your professional journey into an elegant recipe card</p>
      </header>

      <div className="container">
        <form onSubmit={generateCocktail} className="form">
          <div className="form-group">
            <label htmlFor="baseSpirit">Base Spirit</label>
            <input
              type="text"
              id="baseSpirit"
              name="baseSpirit"
              placeholder="e.g., Computer Science"
              value={formData.baseSpirit}
              onChange={handleInputChange}
              required
            />
            <div className="helper-text">What you studied</div>
          </div>

          <div className="form-group">
            <label htmlFor="garnish">Garnish</label>
            <input
              type="text"
              id="garnish"
              name="garnish"
              placeholder="e.g., Retail, Teaching"
              value={formData.garnish}
              onChange={handleInputChange}
              required
            />
            <div className="helper-text">A weird job along the way</div>
          </div>

          <div className="form-group">
            <label htmlFor="mixer">Mixer</label>
            <input
              type="text"
              id="mixer"
              name="mixer"
              placeholder="e.g., Software Engineer"
              value={formData.mixer}
              onChange={handleInputChange}
              required
            />
            <div className="helper-text">What you do now</div>
          </div>

          <div className="form-group">
            <label htmlFor="secretIngredient">
              Secret Ingredient <span style={{opacity: 0.5, fontWeight: 400}}>(optional)</span>
            </label>
            <input
              type="text"
              id="secretIngredient"
              name="secretIngredient"
              placeholder="e.g., Public speaking"
              value={formData.secretIngredient}
              onChange={handleInputChange}
            />
            <div className="helper-text">An unexpected skill that connects it all</div>
          </div>

          <div className="form-group">
            <span className="style-label">Style</span>
            <div className="toggle-group">
              <button
                type="button"
                className={`toggle-btn ${formData.style === 'stirred' ? 'active' : ''}`}
                onClick={() => handleStyleToggle('stirred')}
              >
                🥄 Stirred
                <small>Honest & Reflective</small>
              </button>
              <button
                type="button"
                className={`toggle-btn ${formData.style === 'shaken' ? 'active' : ''}`}
                onClick={() => handleStyleToggle('shaken')}
              >
                🧊 Shaken
                <small>Bold & Confident</small>
              </button>
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Mixing...' : 'Mix My Cocktail'}
          </button>
        </form>

        <div className="result-section">
          {cocktail ? (
            <>
              <div className="cocktail-card" ref={cardRef}>
                <div className="card-icon">
                  <GlassSVG type={glassType} idPrefix="card" />
                </div>
                <h2 className="cocktail-name">{cocktail.name}</h2>
                
                <div style={{textAlign: 'center', marginBottom: '16px'}}>
                  <span className="style-badge">{formData.style}</span>
                </div>
                
                <div className="card-divider"></div>
                
                <div className="recipe-section">
                  <h3>Recipe</h3>
                  <p className="recipe-text">{cocktail.recipe}</p>
                </div>
                
                <div className="tasting-section">
                  <h3>Tasting Notes</h3>
                  <p className="tasting-text">{cocktail.tastingNotes}</p>
                </div>
                
                <div className="card-footer">
                  <div className="creator-info">
                    <div className="creator-name">Grace Lean</div>
                    <div className="creator-title">Digital and marketing leader</div>
                  </div>
                  <div className="creator-links">
                    linkedin.com/in/gracelean<br/>
                    career-mixologist.vercel.app
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <button onClick={downloadCard} className="download-btn">
                  ⬇ Download Recipe Card
                </button>
                <button onClick={shareCard} className="share-btn">
                  🔗 Share
                </button>
              </div>
              
              <div className="reset-link">
                <a onClick={resetForm}>← Start over</a>
              </div>
            </>
          ) : (
            <div className="placeholder-card">
              <div className="placeholder-icon">
                <GlassSVG type="martini" idPrefix="placeholder" />
              </div>
              <h3>Ready to Mix?</h3>
              <p>Fill in your career ingredients and click "Mix My Cocktail" to create your unique recipe card.</p>
              <div className="placeholder-features">
                <div>🍸 5 unique glass styles</div>
                <div>✨ AI-powered recipes</div>
                <div>📥 Downloadable cards</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
