✨ Features
🎯 Smart Queue Analysis - Automatically evaluates prompt quality (clarity, structure, constraints)
🔄 PCV Pipeline - Proposer-Critic-Verifier loop for systematic improvement
🌊 D/S Cycle - Diversification and Stabilization iterations for optimal results
⚡ Real-time Progress - Live updates for each optimization stage via Server-Sent Events
🌓 Dark/Light Theme - Beautiful UI with theme switcher
🔐 Secure Storage - API keys stored locally in browser (localStorage)
📊 Quality Metrics - Detailed evaluation of original vs optimized prompts
🤖 Multi-LLM Support - Works with Google Gemini and xAI Grok
🎬 Demo
Before Optimization:

I want to create a simple API documentation, but I'm not sure how to structure it...
After Optimization (443 words):

Clear hierarchical structure
Explicit constraints and requirements
Detailed placeholder system
Professional formatting guidelines
Complete section breakdown
Processing Time: ~180 seconds
Quality Improvement: +0.66 to +1.0 across all metrics

🏗️ Architecture
┌─────────────────┐
│   Frontend      │  React-like vanilla JS, real-time SSE
│   (HTML/CSS/JS) │
└────────┬────────┘
         │
         │ HTTP/SSE
         │
┌────────▼────────┐
│   FastAPI       │  Python async backend
│   Backend       │
└────────┬────────┘
         │
         ├──► Smart Queue → PCV → D/S Cycle → Evaluation
         │
         └──► Gemini API / Grok API
Pipeline Stages:
Smart Queue - Quality analysis (clarity, structure, constraints)
Proposer - Rewrites prompt with better structure
Critic - Identifies issues and suggests improvements
Verifier - Creates final polished version
D/S Iterations - Expands and stabilizes (1-6 cycles)
Evaluation - Compares original vs optimized
🚀 Quick Start
Prerequisites
Python 3.11 or higher
API key from one of:
Google Gemini
xAI Grok
Local Installation
Clone the repository
git clone https://github.com/aisarus/promptenhancer.git
cd promptenhancer
Install dependencies
cd backend
pip install -r requirements.txt
Run the application
Windows:

# Run backend + frontend together
start_all.bat

# Or separately:
start_backend.bat  # Backend on port 8001
start_frontend.bat # Frontend on port 8081
Linux/Mac:

# Backend
cd backend
python -m uvicorn app.main:app --reload --port 8001

# Frontend (new terminal)
cd frontend
python -m http.server 8081
Open in browser
Frontend: http://localhost:8081
API Docs: http://localhost:8001/docs
☁️ Deploy to Railway
Deploy your own instance in 5 minutes:

Deploy on Railway

Detailed deployment guide: See DEPLOY_RAILWAY_FOR_DUMMIES.md

Quick Railway Deploy:
Fork this repository
Sign up on Railway.app
Create new project → Deploy from GitHub
Select your forked repo
Wait 2-3 minutes → Get your URL! 🎉
Cost: $5 free credits/month (~500 hours runtime)

📖 Usage
Web Interface
Open the application in your browser
Select your LLM backend (Gemini or Grok)
Enter your API key (stored securely in browser)
Paste your prompt
Click "Optimize Prompt"
Watch real-time progress as each stage completes
Copy your optimized prompt!
API Usage
Streaming endpoint (recommended):

import requests

response = requests.post(
    "http://localhost:8001/api/optimize-stream",
    json={
        "prompt": "Your prompt here",
        "backend": "gemini",
        "gemini_api_key": "your_api_key",
        "max_iterations": 3,
        "convergence_threshold": 0.05
    },
    stream=True
)

for line in response.iter_lines():
    if line.startswith(b'data: '):
        data = json.loads(line[6:])
        print(f"Stage: {data['stage']}, Status: {data.get('status')}")
Standard endpoint:

response = requests.post(
    "http://localhost:8001/api/optimize",
    json={
        "prompt": "Your prompt here",
        "backend": "gemini",
        "gemini_api_key": "your_api_key"
    }
)

result = response.json()
print(result['final_prompt'])
Full API documentation: http://localhost:8001/docs

🎨 Screenshots
Main Interface
Dark/Light theme toggle
Real-time progress indicators
Expandable stage results
Optimization Pipeline
Smart Queue metrics
PCV outputs (Proposer, Critic, Verifier)
D/S iteration tracking
Quality evaluation comparison
🛠️ Tech Stack
Backend
FastAPI - Modern Python web framework
Pydantic - Data validation
Server-Sent Events - Real-time streaming
Uvicorn - ASGI server
Frontend
Vanilla JavaScript - No framework dependencies
CSS Variables - Dynamic theming
LocalStorage - Secure key storage
EventSource API - SSE client
LLM Providers
Google Gemini 2.5 Flash
xAI Grok 4
📁 Project Structure
promptenhancer/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── config.py            # Configuration
│   │   ├── models/              # Pydantic schemas
│   │   ├── services/
│   │   │   ├── llm_provider.py  # LLM integrations
│   │   │   └── optimizer.py     # Core optimization logic
│   │   ├── api/
│   │   │   └── routes.py        # API endpoints
│   │   └── utils/
│   │       └── json_parser.py   # JSON utilities
│   └── requirements.txt
├── frontend/
│   ├── index.html               # Main UI
│   ├── components/              # Modular display components
│   │   ├── smart-queue.js
│   │   ├── pcv-display.js
│   │   ├── ds-display.js
│   │   ├── evaluation-display.js
│   │   └── metrics-display.js
│   └── static/
│       ├── css/
│       │   ├── main.css
│       │   └── components.css
│       └── js/
│           ├── api-client.js
│           └── app.js
├── Dockerfile                   # Docker configuration
├── railway.json                 # Railway deployment config
└── README.md
⚙️ Configuration
Environment Variables
Create .env file in backend/ directory:

# Optional - can be provided via UI
GEMINI_API_KEY=your_gemini_key_here
XAI_API_KEY=your_xai_key_here

# Server config
HOST=0.0.0.0
PORT=8001
DEBUG=True

# Model settings
GEMINI_MODEL=gemini-2.5-flash
GROK_MODEL=grok-4

# Pipeline defaults
MAX_DS_ITERATIONS=3
CONVERGENCE_THRESHOLD=0.05
Customization
Change default iterations:

# backend/app/config.py
MAX_DS_ITERATIONS: int = 5  # Default: 3
Change theme colors:

/* frontend/static/css/main.css */
:root {
    --primary-color: #10b981;  /* Change to your color */
}
🔒 Security
✅ API keys stored in browser localStorage only (never sent to server logs)
✅ HTTPS enforced in production
✅ CORS configured for security
✅ No sensitive data persistence
✅ Rate limiting ready (can be enabled)
Note: For production use, implement proper API key management and rate limiting.

📊 Performance
Optimization Speed
Smart Queue: ~5 seconds
PCV Pipeline: ~30-60 seconds
D/S Cycle (3 iterations): ~90-120 seconds
Total: ~150-200 seconds for complete optimization
Cost Estimation (per optimization)
Gemini API: ~$0.01-0.02
Grok API: ~$0.02-0.03
Railway Hosting: ~$0.01 (included in $5/month)
🗺️ Roadmap
 Database Integration - Save optimization history
 User Authentication - Multi-user support
 Prompt Templates - Pre-built prompt structures
 A/B Testing - Compare multiple optimizations
 Export Options - PDF, DOCX, Markdown
 Batch Processing - Optimize multiple prompts
 WebSocket Support - Two-way real-time communication
 Prompt Library - Community-shared optimizations
 Analytics Dashboard - Usage statistics
 API Rate Limiting - Built-in protection
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Built with FastAPI
Powered by Google Gemini and xAI Grok
Inspired by prompt engineering best practices
UI design influenced by modern SaaS applications
📞 Support
Documentation: Full docs
Deployment Guide: Railway deployment
Issues: GitHub Issues
Changelog: Version history
⭐ Star History
If you find this project useful, please consider giving it a star! ⭐

Made with ❤️ for better prompts

Transform your ideas into professional instructions with AI-powered optimization
