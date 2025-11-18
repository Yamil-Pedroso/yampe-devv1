<p align="center">
  <!-- Change the path when uploading the image to your repo -->
  <img src="/portfolio-web/public/images/avatar/junger_pro.png" alt="Yampe.dev – Portfolio" width="500" />
</p>

<h1 align="center">Yampe-devv1</h1>

<p align="center">
  My personal portfolio: projects, smooth animations with Framer Motion, and a Node/Express backend for dynamic data.
</p>

<p align="center">
  <!-- Main stack badges -->
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=0A0A0A">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-🎞-000000?logo=framer&logoColor=white">
  <img alt="TanStack Router" src="https://img.shields.io/badge/TanStack%20Router-FF4154?logo=reactrouter&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white">
  <img alt="Express" src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white">
</p>

## ✨ Featured Sections
- **Works:** image + text entry with “image first” choreography and clipPath.
- **Services:** cards with hover and stagger on-view.
- **Skills:** category-based slider with responsive grid and animated progress bars.
- **Testimonials:** carousel with `react-fast-marquee`.
- **News & Blogs:** cards with staggered fade-up.
- **Get In Touch:** animated and accessible form.

## 🧰 Tech Stack
- **Frontend:** React + TypeScript, Tailwind CSS, Framer Motion, TanStack Router, Lucide/React Icons, `react-fast-marquee`.
- **Backend:** Node.js + Express + TypeScript (CORS, REST routes for content).

## 🚀 Demo / Preview
- *(add your deployment URL when you have it, e.g., Vercel/Netlify)*

## 📁 Project Structure
```
yampe-devv1/
├── portfolio-api/          # Backend API (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/         # Configuration files (DB, env)
│   │   ├── modules/        # Feature modules (home, about, projects, etc.)
│   │   ├── routes/         # API routes
│   │   ├── services/       # External services (OpenAI, etc.)
│   │   ├── utils/          # Utility functions
│   │   └── server/         # Server setup
│   ├── public/             # Static assets
│   └── package.json
│
├── portfolio-web/          # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── routes/         # Route definitions (TanStack Router)
│   │   ├── api/            # API integration
│   │   └── ...
│   ├── public/             # Static assets
│   └── package.json
│
├── scripts/                # Build and deployment scripts
├── MakeFile               # Make commands for deployment
└── README.md
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yamil-Pedroso/yampe-devv1.git
   cd yampe-devv1
   ```

2. **Set up the Backend (portfolio-api)**
   ```bash
   cd portfolio-api
   npm install
   
   # Create config.env from example
   cp src/config/config.env.example src/config/config.env
   
   # Edit src/config/config.env and add your MongoDB URI and other settings
   # Required: MONGO_URI
   # Optional: OPENAI_API_KEY (for AI assistant features)
   
   # Start development server
   npm run dev
   ```
   
   The API will be available at `http://localhost:3010`

3. **Set up the Frontend (portfolio-web)**
   ```bash
   cd portfolio-web
   npm install
   
   # Create .env from example
   cp .env.example .env
   
   # Edit .env if you need to change the API URL
   # Default: VITE_API_BASE_URL=http://localhost:3010/api
   
   # Start development server
   npm run dev
   ```
   
   The web app will be available at `http://localhost:5173`

## 📝 Available Scripts

### Backend (portfolio-api)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run import-data` - Import sample data
- `npm run import-data:clean` - Clean and re-import data

### Frontend (portfolio-web)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚧 Troubleshooting

**API not connecting?**
- Ensure MongoDB is running and the connection string in `config.env` is correct
- Check that the API is running on port 3010
- Verify CORS settings allow `http://localhost:5173`

**Frontend not loading data?**
- Verify the API is running at the URL specified in `.env`
- Check browser console for any CORS or network errors
- Ensure the API URL in `.env` matches your backend setup

## 🤝 Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests where applicable.

## 📄 License

This project is part of a personal portfolio. Feel free to use it as inspiration for your own portfolio, but please give appropriate credit.

## 👤 Author

**Yamil Pedroso**
- Website: [yampe.dev](https://yampe.dev)
- GitHub: [@Yamil-Pedroso](https://github.com/Yamil-Pedroso)

---

<p align="center">Made with ❤️ by Yamil Pedroso</p>

