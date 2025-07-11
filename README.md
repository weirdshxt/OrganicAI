# 🌱 OrganicAI - Organic Farming Assistant

A full-stack AI chatbot web application designed to help farmers with organic agriculture queries. Built with the MERN stack and featuring both local rule-based responses and Gemini AI integration.

## ✨ Features

### 🤖 Dual AI Modes

- **Local Mode**: Fast, predefined responses for common organic farming questions
- **Gemini AI Mode**: Advanced AI-powered responses using Google's Gemini API
- **Toggle Switch**: Easy switching between modes in real-time

### 🎨 Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smooth Animations**: GSAP-powered animations for professional feel
- **Dark Theme**: Eye-friendly dark interface
- **Real-time Chat**: Live message bubbles with typing indicators

### 🌿 Organic Farming Expertise

- **Soil Fertility**: Tips for improving soil health naturally
- **Pest Control**: Natural pest management solutions
- **Composting**: Various composting methods and techniques
- **Crop Rotation**: Sustainable farming practices

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **GSAP** - Professional animations
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### AI Integration

- **Google Gemini API** - Advanced AI responses
- **Local JSON Database** - Fast rule-based responses

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key (optional, for AI mode)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/weirdshxt/OrganicAI.git
   cd OrganicAI
   ```

2. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**

   ```bash
   # In the server directory, create .env file
   cd ../server
   touch .env
   ```

   Add your Gemini API key to server `.env`:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```

   ```bash
   # In the client directory, create .env file
   cd ../client
   touch .env
   ```

   Add your API URL to client `.env`:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the application**

   ```bash
   # Start backend server (from server directory)
   cd server
   npm start

   # Start frontend dev server (from client directory)
   cd client
   npm run dev
   ```

## 📁 Project Structure

```
OrganicAI/
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBot.jsx   # Main chat interface
│   │   │   └── Navbar.jsx    # Navigation component
│   │   ├── pages/
│   │   │   └── Hero.jsx      # Landing page
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── package.json
│   └── index.html
├── server/                   # Node.js Backend
│   ├── controller/
│   │   └── aiController.js   # AI logic handler
│   ├── routes/
│   │   └── chat.js           # API routes
│   ├── responses.json        # Local response database
│   ├── server.js             # Express server
│   ├── package.json
│   └── .env                  # Environment variables
└── README.md
```

### Getting Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

## 🧪 Testing

### Sample Queries

Try these questions in the chat:

**Local Mode:**

- "How do I improve soil fertility?"
- "What are natural methods for pest control?"
- "Tell me about composting methods."
- "What is crop rotation?"

**Gemini AI Mode:**

- "What are the best companion plants for tomatoes?"
- "How can I start a small organic garden?"
- "What are the benefits of organic farming?"
- "How do I make natural fertilizer?"

## 👨‍💻 About the Developer

**Kabir Khan** - Full Stack Developer

---

**Made with ❤️ by Kabir Khan**

_Empowering farmers with AI-driven organic farming solutions_
