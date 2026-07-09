# DevEduForge Backend

API REST de la plateforme d'apprentissage mobile-first pour développeurs.

## Stack

- **Runtime**: Node.js >= 20 + TypeScript
- **Framework**: Express 4
- **Base de données**: PostgreSQL 16 + Prisma ORM
- **Cache / Files**: Redis 7 + BullMQ
- **Auth**: JWT (access + refresh) + Passport (local, jwt)
- **Validation**: Zod
- **Paiement**: Stripe, CMI, PayPal
- **Docs**: Swagger (swagger-jsdoc + swagger-ui-express)
- **Logs**: Winston
- **Tests**: Jest + Supertest

## Prérequis

- Node.js >= 20
- PostgreSQL 16
- Redis 7 (optionnel — graceful fallback)
- Docker Desktop (optionnel — pour déploiement conteneurisé)

## Installation

```bash
cd deveduforge-backend
npm install
```

## Configuration

Copier le fichier d'environnement :

```bash
cp .env.example .env
```

Variables principales :

| Variable | Défaut | Description |
|---|---|---|
| `NODE_ENV` | `development` | Environnement |
| `PORT` | `4000` | Port du serveur |
| `DATABASE_URL` | — | URL de connexion PostgreSQL |
| `REDIS_URL` | — | URL de connexion Redis |
| `JWT_ACCESS_SECRET` | — | Clé de signature access token |
| `JWT_REFRESH_SECRET` | — | Clé de signature refresh token |
| `CORS_ALLOWED_ORIGINS` | — | Origines CORS (séparées par virgule) |
| `SMTP_*` | — | Configuration mail |

## Base de données

```bash
# Générer le client Prisma
npm run prisma:generate

# Appliquer les migrations
npm run prisma:migrate:deploy

# (Dev) Créer une migration
npm run prisma:migrate

# (Dev) Explorer avec Prisma Studio
npm run prisma:studio

# (Dev) Seed la base
npm run prisma:seed
```

## Lancement

### Local

```bash
# Mode développement (hot-reload)
npm run dev

# Mode production
npm run build
npm start
```

Le serveur démarre sur `http://localhost:4000`.

### Docker

```bash
# Build et démarrage
docker-compose up -d --build

# Arrêt
docker-compose down
```

## API Documentation

Une fois le serveur lancé :

- Swagger UI : `http://localhost:4000/api/docs`
- Spécification JSON : `http://localhost:4000/api/docs.json`

## Structure

```
src/
├── index.ts                         # Point d'entrée
├── app.ts                           # Configuration Express
├── config/                          # Database, Redis, JWT, CORS, Logger...
├── modules/                         # Modules fonctionnels
│   ├── auth/                        # Authentification (register, login, refresh...)
│   ├── user/                        # Gestion des utilisateurs
│   ├── course/                      # Cours, leçons, progression
│   ├── exercise/                    # Exercices, QCM, quiz
│   ├── project/                     # Projets, soumissions, revues
│   ├── certification/               # Certificats, QR code, PDF
│   ├── subscription/                # Plans, abonnements
│   ├── payment/                     # Paiements (Stripe, CMI, PayPal)
│   ├── progress/                    # Progression, streaks, achievements
│   ├── notification/                # Notifications push, email
│   ├── analytics/                   # Événements, statistiques
│   ├── community/                   # Forum, posts, leaderboard
│   ├── offline/                     # Sync hors-ligne
│   └── audit/                       # Journal d'audit
├── middleware/                       # Auth, validation, rate limiting, CORS...
├── utils/                           # JWT, email, crypto, pagination...
├── types/                           # Types globaux (Express, JWT...)
├── constants/                       # Rôles, codes d'erreur, statuts HTTP
└── cron/                            # Tâches planifiées (BullMQ)
```

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Dev avec hot-reload (nodemon) |
| `npm run build` | Compilation TypeScript |
| `npm start` | Lancement production |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | Vérification TypeScript |
| `npm test` | Tests Jest |
| `npm run test:coverage` | Tests avec couverture |
| `npm run prisma:migrate:deploy` | Appliquer les migrations |
| `npm run docker:dev` | Docker Compose développement |
