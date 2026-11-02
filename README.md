# PON MURUGAN – Premium Fireworks Website (Full-Stack)

A complete, modern, premium fireworks business website and REST API backend for **PON MURUGAN (Sivakasi)**, inspired by Lord Murugan's victorious radiance and pyrotechnic excellence.

![Pon Murugan Fireworks](frontend/public/assets/pon_murugan_hero.jpg)

## 📁 Repository Architecture

The project is structured into clean **`frontend/`** and **`backend/`** folders:

```
Pon_murugan/
├── frontend/                     # React 18 + Vite + Tailwind CSS v4 Frontend
│   ├── public/                   # Logo, SVGs & public brand assets
│   │   ├── assets/
│   │   │   ├── pon_murugan_logo.jpg
│   │   │   └── pon_murugan_hero.jpg
│   │   └── logo.svg
│   ├── src/
│   │   ├── assets/               # Brand imagery and logo assets
│   │   ├── components/           # Navbar, Footer, Hero, ProductCard, CategoryCard, etc.
│   │   ├── context/              # CartContext with LocalStorage persistence
│   │   ├── data/                 # Sivakasi catalogue (sparklers, fountains, 240 shots)
│   │   ├── pages/                # All 11 pages (Home, About, Products, Details, etc.)
│   │   ├── services/             # Axios API client with local fallback
│   │   ├── App.jsx               # React Router navigation & Toaster
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Tailwind v4 styling & theme tokens
│   ├── .env                      # Frontend environment config
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite configuration
│
├── backend/                      # Node.js + Express REST API Backend
│   ├── config/
│   │   └── config.js             # Environment variables & store settings
│   ├── controllers/              # Products, Enquiries, Wholesale, Orders
│   ├── routes/                   # Express API routes
│   ├── data/                     # JSON database stores
│   ├── middleware/               # Error handler & CORS
│   ├── .env                      # Backend environment config
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server entry point (Port 5000)
│
├── package.json                  # Root monorepo script runner
└── README.md
```

---

## 🚀 Running the Project

### 1. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Runs at: **`http://localhost:5173/`**

### 2. Backend (Node.js + Express)
```bash
cd backend
npm install
npm run dev
```
Runs at: **`http://localhost:5000/`**

### Or run from the root directory:
```bash
# Start frontend
npm run dev:frontend

# Start backend
npm run dev:backend

# Build frontend for production
npm run build:frontend
```

---

## 🎆 Brand & Design Theme

- **Primary Background**: `#090A0D` (Pitch Black Night Sky)
- **Secondary Background**: `#151515` (Deep Charcoal Card Surfaces)
- **Primary Gold**: `#F5C45A` (Radiant Divine Vel & Golden Sparks)
- **Deep Red**: `#8B1018` (Sacred Crimson Festive Accents)
- **White**: `#FFFFFF` (Crisp Primary Typography)
- **Secondary Text**: `#B8B8B8` (Legible Soft Gray)

---

## 📞 Business Contact

- **Brand**: PON MURUGAN FIREWORKS
- **Factory**: Sivakasi Main Road, Virudhunagar District, Tamil Nadu - 626123, India
- **Hotline**: +91 80984 43633
- **WhatsApp**: +91 80984 43633
- **Email**: sales@ponmuruganfireworks.com
