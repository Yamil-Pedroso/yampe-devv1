<p align="center">
  <!-- Change the path when uploading the image to your repo -->
  <img src="/portfolio-web/public/images/avatar/junger_pro.png" alt="Yampe.dev – Portfolio" width="980" />
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

## 🛠️ Local Development
```bash
# Portfolio-api
cd porfolio-api
cp .env.example .env   # FRONTEND_ORIGIN=http://localhost:5173
npm i
npm run dev

# Portfolio-web
cd portfolio-web
cp .env.example .env   # VITE_API_URL=http://localhost:3010/api
npm i
npm run dev
