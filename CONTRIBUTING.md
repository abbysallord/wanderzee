# 🤝 Contributing to WanderZee

Thank you for your interest in contributing to WanderZee! We're excited to have you join our community of developers building the AI-powered travel companion for Karnataka and beyond.

This document will guide you through the contribution process, from setup to submitting your first pull request.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Branch Strategy](#branch-strategy)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Code Style Guide](#code-style-guide)
- [Testing](#testing)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Getting Help](#getting-help)

---

## 📖 Code of Conduct

By participating in this project, you agree to uphold our values of:

- **Respect** — Treat all community members with respect
- **Inclusivity** — Welcome contributors from all backgrounds and experience levels
- **Collaboration** — Work together constructively
- **Transparency** — Communicate openly and honestly

### We Do Not Tolerate

- Harassment, discrimination, or offensive language
- Spam or self-promotion
- Disruptive behavior

Violations may result in removal from the project. For concerns, contact: **conduct@wanderzee.in**

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR-USERNAME/wanderzee.git
cd wanderzee

# Add upstream remote to stay in sync
git remote add upstream https://github.com/ORIGINAL-OWNER/wanderzee.git
```

### 2. Check Your Environment

Ensure you have:

- Node.js 20+
- Flutter 3.x (for mobile work)
- Docker & Docker Compose
- Git 2.37+

```bash
# Verify installations
node --version
flutter --version
docker --version
git --version
```

### 3. Complete Development Setup

Follow the [Development Setup](#development-setup) section below.

---

## 💻 Development Setup

### Full Environment

```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/wanderzee.git
cd wanderzee

# Start Docker containers (PostgreSQL + Redis)
docker-compose up -d

# Verify containers are running
docker-compose ps
```

### Backend Setup (NestJS API)

```bash
cd apps/api

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# At minimum, you need:
# - DATABASE_URL (PostgreSQL connection)
# - REDIS_URL (Redis connection)
# - JWT_SECRET (any random string for local dev)
# - GEMINI_API_KEY and GROQ_API_KEY (optional for testing)

nano .env  # or use your favorite editor

# Setup database
npm run db:push        # Apply schema
npm run db:seed        # Seed initial data

# Start development server
npm run start:dev

# Server will run on http://localhost:3000
# Swagger docs: http://localhost:3000/api/docs
```

### Mobile Setup (Flutter)

```bash
cd apps/mobile

# Install dependencies
flutter pub get

# Run on emulator/device
flutter run

# Or run on web (for quick testing)
flutter run -d chrome

# Run tests
flutter test
```

### Verify Setup

```bash
# Backend health check
curl http://localhost:3000/health

# Should return: {"ok":true}
```

---

## 🌿 Branch Strategy

We follow a Git Flow-inspired branching strategy:

### Branch Types

| Branch Type | Format      | Example                     | Purpose                                |
| ----------- | ----------- | --------------------------- | -------------------------------------- |
| **Main**    | `main`      | `main`                      | Production-ready code, tagged releases |
| **Develop** | `develop`   | `develop`                   | Integration branch for features        |
| **Feature** | `feature/*` | `feature/trip-planner-ui`   | New features & enhancements            |
| **Bug Fix** | `fix/*`     | `fix/auth-token-issue`      | Bug fixes                              |
| **Docs**    | `docs/*`    | `docs/api-setup-guide`      | Documentation updates only             |
| **Chore**   | `chore/*`   | `chore/update-dependencies` | Maintenance, no code logic change      |

### Branch Naming Rules

- Use **lowercase** and **hyphens** (not underscores)
- Be **descriptive** but **concise** (max 50 chars)
- Prefix with **type/** (feature/fix/docs/chore)
- Reference **issue number** if applicable: `feature/add-budget-tracking-#123`

**Examples:**

```bash
✅ feature/budget-tracker
✅ fix/offline-sync-issue
❌ Feature/NewBudgetTracker
❌ feature_new_budget_tracker
❌ Feature-New-Budget-Tracker
```

### Creating a Feature Branch

```bash
# Update develop branch
git checkout develop
git pull upstream develop

# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Commit your changes (see Commit Conventions)
# Push when ready
git push origin feature/your-feature-name
```

---

## 📝 Commit Conventions

We follow **Conventional Commits** for clear, semantic commit messages.

### Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

| Type       | Use Case                                  |
| ---------- | ----------------------------------------- |
| `feat`     | New feature                               |
| `fix`      | Bug fix                                   |
| `docs`     | Documentation only                        |
| `style`    | Code style (formatting, lint, etc.)       |
| `refactor` | Code refactoring (no behavior change)     |
| `test`     | Adding/updating tests                     |
| `chore`    | Maintenance, deps, config (no code logic) |
| `perf`     | Performance improvement                   |
| `ci`       | CI/CD configuration                       |

### Scope

Relevant module or component affected:

- `auth` — Authentication
- `trip-planner` — AI trip planner
- `budget` — Budget tracking
- `safety` — Safety module
- `places` — Places/locations
- `mobile` — Flutter app
- `api` — Backend API

### Examples

```bash
✅ feat(trip-planner): add multi-day itinerary support
✅ fix(auth): resolve token refresh race condition
✅ docs(readme): update development setup instructions
✅ refactor(places): simplify district filtering logic
✅ test(budget): add expense calculation edge cases
✅ chore(deps): update TypeScript to 5.3

❌ Add feature
❌ Fixed bug
❌ Updated code
❌ Random changes
```

### Commit Guidelines

- **Atomic commits** — One logical change per commit
- **Meaningful messages** — Explain WHAT and WHY, not HOW
- **Reference issues** — Include issue number in footer: `Fixes #123`
- **Keep it concise** — Description under 50 chars

```bash
# Good commit
git commit -m "feat(budget): add expense categorization

- Add expense category dropdown selector
- Implement category filtering in expense list
- Store category metadata in database

Fixes #45"

# Avoid
git commit -m "Update stuff"
```

---

## 🔄 Pull Request Process

### Before You Start

1. Check [GitHub Issues](https://github.com/yourusername/wanderzee/issues) for existing work
2. Comment on the issue to claim it (avoid duplicate work)
3. If no issue exists, create one first to discuss your idea

### Creating a Pull Request

```bash
# 1. Ensure your branch is up to date
git fetch upstream
git rebase upstream/develop

# 2. Push your changes
git push origin feature/your-feature-name

# 3. Go to GitHub and create a Pull Request
# Click "New Pull Request" and select your branch
```

### PR Description Template

```markdown
## Description

Brief description of what this PR does.

## Related Issue

Fixes #123

## Type of Change

- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Refactoring

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

Describe testing performed:

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)

Include screenshots for UI changes.

## Checklist

- [ ] Code follows style guide
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Commit messages follow convention
```

### PR Review Process

1. **Automated Checks** — CI/CD tests must pass
2. **Code Review** — Maintainers review code quality and design
3. **Feedback** — Respond to reviewer comments
4. **Approval** — Requires 1-2 approvals minimum
5. **Merge** — Squash merge into develop (for clean history)

### Responding to Feedback

```bash
# Make requested changes
git add .
git commit -m "fix: address review feedback"
git push origin feature/your-feature-name

# Don't force push after review starts
# Maintainers need to see all changes
```

---

## 🎨 Code Style Guide

### TypeScript/NestJS (Backend)

```typescript
// Use 2 spaces for indentation
const calculateBudget = (days: number): number => {
  return days * 1000;
};

// Use const by default, let when needed
const fixedValue = 'immutable';
let counter = 0;

// Type annotations required
interface Trip {
  id: string;
  title: string;
  startDate: Date;
}

// Use PascalCase for classes/interfaces
// Use camelCase for functions/variables
// Use UPPER_SNAKE_CASE for constants

// ESLint and Prettier will auto-format
npm run lint       # Check for issues
npm run format     # Auto-fix formatting
```

### Dart/Flutter (Mobile)

```dart
// Use 2 spaces for indentation
class TripPlanner extends StatefulWidget {
  @override
  State<TripPlanner> createState() => _TripPlannerState();
}

// PascalCase for classes/enums
// camelCase for variables/functions
// UPPER_SNAKE_CASE for constants

const double defaultPadding = 16.0;

// Format with dartfmt
dart format lib/

// Analyze code
dart analyze
```

### General Rules

- **Comments** — Explain WHY, not WHAT. Code should speak for itself.
- **Functions** — Keep small and focused (single responsibility)
- **Variables** — Use descriptive names (`userEmail` not `ue`)
- **Constants** — Extract magic numbers/strings
- **Error Handling** — Always handle errors explicitly

---

## 🧪 Testing

### Backend Tests

```bash
cd apps/api

# Run unit tests
npm run test

# Run with coverage
npm run test:cov

# Run E2E tests
npm run test:e2e

# Watch mode (re-run on file changes)
npm run test:watch
```

### Mobile Tests

```bash
cd apps/mobile

# Run all tests
flutter test

# Run with coverage
flutter test --coverage

# Run specific test file
flutter test test/widget_test.dart

# Update golden files
flutter test --update-goldens
```

### Test Requirements

- **New features** need tests
- **Bug fixes** should include test for the bug
- **Minimum coverage** — 70% for new code
- **E2E tests** for critical user flows

**Example Test:**

```typescript
describe("Trip Planning (E2E)", () => {
  it("should generate a 3-day trip plan", async () => {
    const response = await request(app.getHttpServer())
      .post("/api/v1/ai/generate-trip")
      .send({
        duration: 3,
        budget: 5000,
        district: "Kodagu",
      })
      .expect(201);

    expect(response.body.days).toHaveLength(3);
    expect(response.body.totalBudget).toBeLessThanOrEqual(5000);
  });
});
```

---

## 🛠 Common Tasks

### Add Backend Dependency

```bash
cd apps/api
npm install package-name
# Or dev dependency
npm install --save-dev package-name
```

### Add Mobile Dependency

```bash
cd apps/mobile
flutter pub add package_name
# Or dev dependency
flutter pub add --dev package_name
```

### Run Database Migrations

```bash
cd apps/api

# Create migration
npm run db:migrate -- --name add_new_feature

# Push to database
npm run db:push

# Seed database
npm run db:seed
```

### Update Documentation

```bash
# Update README.md or create new docs files
# Commit with docs type
git commit -m "docs(setup): add debugging guide"
```

### Update Dependencies

```bash
# Backend
cd apps/api
npm update
npm audit fix

# Mobile
cd apps/mobile
flutter pub upgrade
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or change port in .env
PORT=3001
```

### Database Connection Error

```bash
# Check Docker containers
docker-compose ps

# Restart containers
docker-compose down
docker-compose up -d

# Verify connection
npm run db:push
```

### Flutter Build Issues

```bash
# Clean cache
flutter clean

# Get fresh dependencies
flutter pub get

# Run pub upgrade if needed
flutter pub upgrade
```

### Git Merge Conflicts

```bash
# Update from upstream
git fetch upstream
git rebase upstream/develop

# Resolve conflicts in your editor
# Then continue
git add .
git rebase --continue
```

---

## 💬 Getting Help

### Documentation

- [README.md](README.md) — Project overview
- [WANDERZEE_MASTER_DOC.md](docs/WANDERZEE_MASTER_DOC.md) — Complete documentation
- [API Docs](http://localhost:3000/api/docs) — Swagger UI (run server first)

### Community

- **GitHub Issues** — Report bugs or request features
- **GitHub Discussions** — Ask questions and discuss ideas
- **Discord** — (if applicable) Real-time chat with team

### Contact

- **Email:** dev-team@wanderzee.in
- **Issues:** [GitHub Issues](https://github.com/yourusername/wanderzee/issues)

### Before Asking

1. Check documentation
2. Search existing issues
3. Review commit history for similar changes
4. Try troubleshooting steps

---

## 🎓 Learning Resources

### Backend (NestJS)

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

### Mobile (Flutter)

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Language Guide](https://dart.dev/guides)
- [Riverpod State Management](https://riverpod.dev/)

### General

- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📈 Your First Contribution Checklist

- [ ] Read this CONTRIBUTING.md
- [ ] Set up development environment
- [ ] Fork and clone repository
- [ ] Create feature branch from `develop`
- [ ] Make changes with proper commits
- [ ] Add/update tests
- [ ] Verify all tests pass locally
- [ ] Push to your fork
- [ ] Create Pull Request with description
- [ ] Respond to review feedback
- [ ] Celebrate when merged! 🎉

---

## 🙏 Thank You!

We appreciate your contributions to making WanderZee better. Every contribution — from code to documentation to bug reports — helps us build a travel companion that everyone can rely on.

**Happy coding! 🚀**

---

_For detailed project information, see [WANDERZEE_MASTER_DOC.md](docs/WANDERZEE_MASTER_DOC.md)_
