# 🌍 WanderZee

> **AI-Powered Travel Companion for Karnataka, India**  
> Version: 0.1.0 | Status: Early Development

Make every trip in Karnataka as smooth, safe, and memorable as possible for every kind of traveler.

## 📋 Table of Contents

- [Vision & Mission](#vision--mission)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [API Documentation](#api-documentation)
- [Target Users](#target-users)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Vision & Mission

**Vision:** Make every trip in Karnataka (and eventually India and beyond) as smooth, safe, and memorable as possible for every kind of traveler.

**Mission:** To be the most reliable, AI-powered travel companion that understands WHO you are, WHY you're traveling, and WHAT you need — and plans every step accordingly.

### Core Principles
- **Trust & Reliability** — Users must trust our recommendations with their safety
- **Privacy First** — Sensitive data encrypted and user-controlled
- **Offline-First** — Works without internet; syncs when available
- **Culturally Sensitive** — Respects and protects users across cultural contexts
- **Lightweight** — Under 25MB install, minimal data usage

---

## ✨ Features

### MVP (v1.0) — Current Development
- [x] User authentication (email + Google OAuth)
- [x] User profile with preferences, health notes, accessibility needs
- [x] AI Trip Planner powered by Gemini & Groq
- [x] Day-by-day itinerary generation
- [x] Budget estimation and tracking
- [x] Safety advisories per district
- [x] Emergency contacts
- [x] Offline trip plan caching
- [ ] MapLibre integration with OpenStreetMap
- [ ] Offline map downloads
- [ ] Multi-language support (EN, KN, HI)
- [ ] SOS button

### v2.0 — Post-MVP
- Community reviews & ratings
- Trip journal with photo support
- Group trip collaboration
- Booking integrations (hotels, transport)
- Voice assistant
- Smart notifications

### v3.0 — Long-term Vision
- AR navigation
- Local guide marketplace
- Travel insurance integration
- Visa & document assistant

---

## 🛠 Tech Stack

### Frontend
- **Flutter 3.x** — Cross-platform (Android, iOS, Web)
- **Riverpod 2.x** — State management
- **GoRouter** — Navigation & routing
- **MapLibre GL** — Maps (OpenStreetMap)
- **Hive + SQLite** — Local storage
- **Dio** — HTTP client
- **flutter_animate** — Animations

### Backend
- **Node.js 20 + TypeScript** — Runtime
- **NestJS** — Framework
- **PostgreSQL 16 + PostGIS** — Database
- **Prisma** — ORM
- **Redis** — Caching
- **Passport.js + JWT** — Authentication
- **Swagger** — API documentation

### AI & LLMs
- **Google Gemini 2.0 Flash** — Primary AI (complex plans)
- **Groq (LLaMA 3.3 70B)** — Secondary AI (fast queries)

### Infrastructure
- **Docker + Docker Compose** — Containerization
- **GitHub Actions** — CI/CD
- **Cloudflare** — CDN & DNS
- **Let's Encrypt** — SSL certificates

---

## 📁 Project Structure

```
wanderzee/
├── apps/
│   ├── api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── modules/        # Feature modules
│   │   │   ├── common/         # Shared utilities
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── prisma/             # Database schema & migrations
│   │   ├── test/               # E2E tests
│   │   └── package.json
│   │
│   └── mobile/                 # Flutter App
│       ├── lib/
│       │   ├── core/           # Core functionality
│       │   ├── features/       # Feature modules
│       │   ├── shared/         # Shared widgets & utilities
│       │   └── main.dart
│       ├── android/            # Android native code
│       ├── ios/                # iOS native code
│       ├── web/                # Web build config
│       └── pubspec.yaml
│
├── docs/
│   └── WANDERZEE_MASTER_DOC.md # Complete project documentation
│
├── scripts/
│   ├── init-db.sql             # Database initialization
│   ├── dev-start.sh            # Start development environment
│   └── dev-stop.sh             # Stop development environment
│
├── docker-compose.yml          # Local dev infrastructure
└── README.md                   # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Flutter 3.x
- PostgreSQL 16+ (or use Docker)

### Clone & Setup
```bash
# Clone repository
git clone https://github.com/yourusername/wanderzee.git
cd wanderzee

# Start Docker containers (PostgreSQL + Redis)
docker-compose up -d

# Backend setup
cd apps/api
npm install
cp .env.example .env
# Edit .env with API keys and configuration

# Initialize database
npm run db:push
npm run db:seed

# Start development server
npm run start:dev
```

### Mobile App Setup
```bash
cd apps/mobile
flutter pub get
flutter run
```

---

## 💻 Development Setup

### Full Development Environment

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/wanderzee.git
cd wanderzee

# 2. Start infrastructure (Docker)
docker-compose up -d

# 3. Backend setup
cd apps/api
npm install

# Copy environment template and fill in your API keys
cp .env.example .env

# 4. Database setup
npm run db:push        # Apply schema migrations
npm run db:seed        # Seed initial data

# 5. Start API development server
npm run start:dev
# API available at: http://localhost:3000
# Swagger docs: http://localhost:3000/api/docs

# 6. In a new terminal, setup Flutter
cd apps/mobile
flutter pub get

# 7. Run on device/emulator
flutter run

# For web
flutter run -d chrome
```

### Environment Variables

Create `.env` in `apps/api/`:
```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/wanderzee

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=7d

# OAuth (Google)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# AI Services
GEMINI_API_KEY=your-gemini-key
GROQ_API_KEY=your-groq-key
```

### Useful Commands

```bash
# Backend
npm run start:dev       # Start dev server with hot reload
npm run build          # Build for production
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests
npm run db:push        # Sync database schema
npm run db:seed        # Seed database

# Mobile
flutter pub get        # Install dependencies
flutter run            # Run on device
flutter test           # Run unit tests
flutter build apk      # Build Android APK
flutter build ios      # Build iOS
flutter build web      # Build web
```

---

## 📡 API Documentation

**Base URL:** `http://localhost:3000/api/v1`  
**Swagger UI:** `http://localhost:3000/api/docs`

### Key Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| **Auth** |
| POST | /auth/register | Register new user | — |
| POST | /auth/login | Login with credentials | — |
| POST | /auth/refresh | Refresh access token | JWT |
| **User** |
| GET | /users/me | Get current user profile | JWT |
| PUT | /users/me/profile | Update user profile | JWT |
| DELETE | /users/me | Delete account | JWT |
| **Trip Planning** |
| POST | /ai/generate-trip | Generate AI trip plan | JWT |
| GET | /trips | Get user's trips | JWT |
| GET | /trips/:id | Get trip details | JWT |
| PATCH | /trips/:id/status | Update trip status | JWT |
| DELETE | /trips/:id | Delete trip | JWT |
| **Places** |
| GET | /places | List places (filtered) | — |
| GET | /places/districts | Get Karnataka districts | — |
| GET | /places/nearby | Find nearby places | — |
| GET | /places/:id | Get place details | — |
| **Budget** |
| POST | /trips/:id/expenses | Add expense | JWT |
| GET | /trips/:id/expenses | Get trip expenses | JWT |
| DELETE | /trips/:id/expenses/:eid | Delete expense | JWT |
| **Safety** |
| GET | /safety/advisories | Get safety advisories | — |
| GET | /safety/emergency-contacts | Get emergency contacts | — |
| **Health** |
| GET | /health | Health check | — |

See [WANDERZEE_MASTER_DOC.md](docs/WANDERZEE_MASTER_DOC.md) for comprehensive documentation.

---

## 👥 Target Users

| Persona | Description | Key Needs |
|---------|-------------|-----------|
| 🧳 Business Traveler | Corporate trips, tight schedules | Efficient routes, meeting-friendly locations |
| 🎓 Student Explorer | Educational/research trips | Museums, universities, affordable options |
| 🛕 Pilgrim | Religious/spiritual journeys | Temple routes, cultural etiquette, dietary needs |
| 👨‍👩‍👧‍👦 Family Vacationer | Leisure with kids/elderly | Kid-friendly spots, accessibility, medical facilities |
| 🎒 Solo Backpacker | Budget adventure travel | Cheapest routes, hostels, safety alerts, hidden gems |
| ♿ Accessibility-First | Physical/health limitations | Wheelchair access, medical facilities, low-exertion routes |

---

## 🤝 Contributing

We love contributions! Whether it's bug reports, features, or documentation, your help makes WanderZee better.

**Start here:** [CONTRIBUTING.md](CONTRIBUTING.md)

Quick overview:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow our [code conventions](CONTRIBUTING.md#commit-conventions)
4. Push to your branch and submit a Pull Request
5. Ensure all tests pass and CI checks succeed

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Community

- **Issues & Bugs:** [GitHub Issues](https://github.com/yourusername/wanderzee/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/wanderzee/discussions)
- **Email:** support@wanderzee.in

---

**Made with ❤️ for travelers in Karnataka and beyond.**
