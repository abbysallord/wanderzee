# 🌍 WanderZee — Master Project Document

> **AI-Powered Travel Companion for Karnataka, India**
> Version: 0.1.0 | Last Updated: 2026-04-16

---

## Table of Contents

1. [Vision & Mission](#1-vision--mission)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Feature Scope](#4-feature-scope)
5. [Tech Stack](#5-tech-stack)
6. [Architecture](#6-architecture)
7. [AI Strategy](#7-ai-strategy)
8. [Karnataka Scope](#8-karnataka-scope)
9. [Monetization](#9-monetization)
10. [Brand Identity](#10-brand-identity)
11. [Team Structure](#11-team-structure)
12. [Legal & Compliance](#12-legal--compliance)
13. [Development Roadmap](#13-development-roadmap)
14. [API Reference](#14-api-reference)
15. [Database Schema](#15-database-schema)
16. [Contributing Guidelines](#16-contributing-guidelines)

---

## 1. Vision & Mission

**Vision:** Make every trip in Karnataka (and eventually India and beyond) as smooth, safe, and memorable as possible for every kind of traveler.

**Mission:** To be the most reliable, AI-powered travel companion that understands WHO you are, WHY you're traveling, and WHAT you need — and plans every step accordingly.

### Core Principles
- **Trust & Reliability** — Users must trust our recommendations with their safety
- **Privacy First** — Sensitive data (health, ethnicity) encrypted and user-controlled
- **Offline-First** — Works without internet; syncs when available
- **Culturally Sensitive** — Respects and protects users across cultural contexts
- **Lightweight** — Under 25MB install, minimal data usage

---

## 2. Problem Statement

Travelers today face:
- **Information overload** — Too many apps, blogs, and conflicting advice
- **Generic recommendations** — No personalization for budget, health, culture, or trip purpose
- **Safety blind spots** — No warnings about cultural sensitivities in certain regions
- **Connectivity issues** — Most travel apps are useless without strong internet
- **Fragmented experience** — Separate apps for routes, places, budgets, itineraries

**WanderZee solves all of this in ONE lightweight, AI-powered app.**

---

## 3. Target Users

| Persona | Description | Key Needs |
|---------|-------------|-----------|
| 🧳 Business Traveler | Corporate trips, tight schedules | Efficient routes, meeting-friendly locations |
| 🎓 Student Explorer | Educational/research trips | Museums, universities, affordable options |
| 🛕 Pilgrim | Religious/spiritual journeys | Temple routes, cultural etiquette, dietary needs |
| 👨‍👩‍👧‍👦 Family Vacationer | Leisure with kids/elderly | Kid-friendly spots, accessibility, medical facilities |
| 🎒 Solo Backpacker | Budget adventure travel | Cheapest routes, hostels, safety alerts, hidden gems |
| ♿ Accessibility-First | Physical/health limitations | Wheelchair access, medical facilities, low-exertion routes |

---

## 4. Feature Scope

### MVP (v1.0)
- [x] User authentication (email + Google OAuth)
- [x] User profile with preferences, health notes, accessibility needs
- [x] AI Trip Planner (Gemini + Groq)
- [x] Day-by-day itinerary generation
- [x] Budget estimation and tracking
- [x] Safety advisories per district
- [x] Emergency contacts
- [x] Offline trip plan caching
- [ ] MapLibre integration with OSM
- [ ] Offline map downloads
- [ ] Multi-language (EN, KN, HI)
- [ ] SOS button

### v2.0 (Post-MVP)
- [ ] Community reviews
- [ ] Trip journal with photos
- [ ] Group trip collaboration
- [ ] Booking integration (hotels, transport)
- [ ] Voice assistant
- [ ] Smart notifications

### v3.0 (Long-term)
- [ ] AR navigation
- [ ] Local guide marketplace
- [ ] Travel insurance integration
- [ ] Visa & document assistant

---

## 5. Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| Flutter 3.x | Cross-platform (Android, iOS, Web) |
| Riverpod 2.x | State management |
| GoRouter | Navigation/routing |
| MapLibre GL | Maps (OpenStreetMap) |
| Hive + SQLite | Local storage |
| Dio | HTTP client |
| flutter_animate | Animations |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js 20 + TypeScript | Runtime |
| NestJS | Framework |
| PostgreSQL 16 + PostGIS | Database |
| Prisma | ORM |
| Redis | Caching |
| Passport.js + JWT | Authentication |
| Swagger | API documentation |

### AI
| Technology | Purpose |
|-----------|---------|
| Google Gemini 2.0 Flash | Primary AI (complex plans) |
| Groq (LLaMA 3.3 70B) | Secondary AI (fast queries) |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| Docker + Docker Compose | Containerization |
| GitHub Actions | CI/CD |
| Cloudflare | CDN + DNS |
| Let's Encrypt | SSL |

---

## 6. Architecture

```
┌──────────────────┐
│  Flutter App     │
│  (Mobile + Web)  │
└────────┬─────────┘
         │
┌────────▼──────────┐
│  NestJS API       │
│  (REST + Swagger) │
└───────────┬───────┘
            │
    ┌───────┼──────────┐
    │       │          │
┌───▼────┐┌─▼────┐ ┌───▼──────┐
│Prisma  ││Redis │ │AI Service│
│(PgSQL) ││Cache │ │Gemini /  │
│+PostGIS││      │ │Groq      │
└────────┘└──────┘ └──────────┘
```

---

## 7. AI Strategy

### Request Routing
- **Simple queries** (FAQs, tips): Cached responses (no API call)
- **Medium queries** (single-day plans): Groq (LLaMA 3.3 70B) — fast, free tier
- **Complex queries** (full trip plans): Gemini 2.0 Flash — detailed, accurate
- **Fallback chain**: Gemini → Groq → Cached templates

### Cost Management
- Cache similar trip plans (MD5 hash of key parameters)
- Template + AI hybrid approach
- Rate limit: 3 full plans/month for free users
- Track token usage daily

---

## 8. Karnataka Scope

### Phase 1 Launch Districts
1. Bengaluru Urban (business hub, starting point)
2. Kodagu / Coorg (weekend getaway)
3. Vijayanagara / Hampi (heritage tourism)
4. Uttara Kannada / Gokarna (beach tourism)
5. Chikkamagaluru (hill station + coffee)

### Phase 2 (Month 3)
6. Dakshina Kannada / Mangalore
7. Mysuru
8. Dharwad / Haveri (religious circuit)
9. Udupi

### Phase 3 (Month 6)
All 31 districts

---

## 9. Monetization

### Phase 1 (Months 1-6): Free
Everything free. Build user base.

### Phase 2 (Months 6-12): Freemium

**WanderZee Pro — ₹149/month or ₹999/year**
- Unlimited AI trip plans
- Advanced personalization
- Offline maps for all districts
- Priority AI responses
- Ad-free experience

**Local Business Partnerships**
- Hotels, restaurants, tour guides listed
- 8-15% commission per booking

---

## 10. Brand Identity

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Ocean Blue | #1A73B5 | Primary (buttons, headers) |
| Soft Teal | #2EC4B6 | Secondary (accents, highlights) |
| Cloud White | #F8FAFC | Main background |
| Mist Blue | #EEF4F9 | Cards, sections |
| Sunset Orange | #FF8C42 | Notifications, badges |
| Nature Green | #4CAF50 | Success, safe zones |
| Alert Red | #E53E3E | Safety warnings |

### Typography
- **Headings**: Poppins (600, 700 weight)
- **Body**: Poppins / Inter
- **Kannada/Hindi**: Noto Sans Kannada / Devanagari

---

## 11. Development Roadmap

| Sprint | Duration | Focus |
|--------|----------|-------|
| Sprint 0 | Week 1-2 | Setup, planning, wireframes |
| Sprint 1-2 | Week 3-6 | Auth, profiles, API scaffold, Flutter shell |
| Sprint 3-4 | Week 7-10 | AI trip planner, routing, itinerary UI |
| Sprint 5-6 | Week 11-14 | Safety module, offline mode, maps |
| Sprint 7-8 | Week 15-18 | Budget tracker, multi-language, polish |
| Sprint 9 | Week 19-20 | Testing, beta launch |
| Launch | Week 21-22 | Public launch (Play Store, App Store, Web) |

---

## 12. API Reference

Base URL: `http://localhost:3000/api/v1`
Full Swagger docs: `http://localhost:3000/api/docs`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Register new user | No |
| POST | /auth/login | Login | No |
| POST | /auth/refresh | Refresh token | No |
| GET | /users/me | Get profile | Yes |
| PUT | /users/me/profile | Update profile | Yes |
| DELETE | /users/me | Delete account | Yes |
| POST | /ai/generate-trip | Generate AI trip plan | Yes |
| GET | /trips | Get user's trips | Yes |
| GET | /trips/:id | Get trip by ID | Yes |
| PATCH | /trips/:id/status | Update trip status | Yes |
| DELETE | /trips/:id | Delete trip | Yes |
| GET | /places | Get places (filtered) | No |
| GET | /places/districts | Get Karnataka districts | No |
| GET | /places/nearby | Find nearby places | No |
| GET | /places/:id | Get place details | No |
| GET | /safety/advisories | Get safety advisories | No |
| GET | /safety/emergency-contacts | Get emergency contacts | No |
| POST | /trips/:id/expenses | Add expense | Yes |
| GET | /trips/:id/expenses | Get expenses | Yes |
| DELETE | /trips/:id/expenses/:eid | Delete expense | Yes |
| GET | /health | Health check | No |

---

## 13. Contributing Guidelines

### Branch Strategy
- `main` — Production-ready code
- `develop` — Integration branch
- `feature/*` — Feature branches
- `fix/*` — Bug fix branches

### Commit Convention
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

### Development Setup
1. Clone repo
2. Run `docker-compose up -d`
3. `cd apps/api && npm install && cp .env.example .env`
4. Fill in API keys in `.env`
5. `npm run db:push && npm run db:seed && npm run start:dev`
6. `cd apps/mobile && flutter pub get && flutter run`

---

*This document is the single source of truth for the WanderZee project.*
