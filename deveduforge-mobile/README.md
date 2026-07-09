# DevEduForge Mobile

Application mobile d'apprentissage pour développeurs — React Native (Expo).

## Stack

- **Framework**: React Native 0.85 + Expo SDK 56
- **Langage**: TypeScript strict
- **Navigation**: React Navigation 7 (native-stack + bottom-tabs)
- **État**: Redux Toolkit + TanStack Query
- **Formulaires**: React Hook Form + Zod
- **i18n**: i18next (fr / ar)
- **Stockage**: expo-secure-store + AsyncStorage
- **Biométrie**: expo-local-authentication

## Prérequis

- Node.js >= 20
- npm >= 10
- Expo CLI (`npx expo`)
- Android Studio ou Xcode (pour builds natifs)

## Installation

```bash
cd deveduforge-mobile
npm install
```

## Configuration

Copier le fichier d'environnement :

```bash
cp .env.example .env
```

Variables principales :

| Variable | Valeur par défaut | Description |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | `http://localhost:4000/api/v1` | URL de l'API backend |
| `EXPO_PUBLIC_API_TIMEOUT` | `15000` | Timeout des requêtes (ms) |

## Lancement

```bash
# Web (développement rapide)
npx expo start --web

# Android
npx expo start --android

# iOS
npx expo start --ios
```

L'application est accessible sur `http://localhost:8082` (web).

## Structure

```
src/
├── App.tsx                     # Point d'entrée
├── core/
│   ├── auth/                   # Contexte et hooks d'authentification
│   ├── api/                    # Client Axios + intercepteurs + endpoints
│   ├── storage/                # SecureStorage, AsyncStorage, cache
│   ├── config/                 # Variables d'environnement, constantes
│   ├── navigation/             # Navigateurs (Auth, Main, Course)
│   ├── hooks/                  # Hooks globaux (useDebounce, useNetwork...)
│   └── utils/                  # Validateurs, formateurs
├── modules/                    # Modules fonctionnels
│   ├── auth/                   # Écrans de connexion, inscription
│   ├── home/                   # Tableau de bord, recherche
│   ├── courses/                # Domaines, technologies, leçons
│   ├── exercises/              # QCM, quiz, code challenges
│   ├── projects/               # Soumission de projets
│   ├── certification/          # Certificats et vérification
│   ├── profile/                # Profil, abonnement, paramètres
│   ├── subscription/           # Plans, checkout
│   └── community/              # Forum, leaderboard
├── shared/                     # Composants réutilisables
│   ├── components/ui/          # Button, Input, Card, Modal...
│   ├── components/forms/       # FormInput, FormSelect...
│   ├── components/layout/      # Container, ScreenWrapper, BottomTabBar
│   ├── constants/              # Couleurs, typographie, espacements
│   ├── hooks/                  # useTheme, useKeyboard...
│   └── styles/                 # Thèmes clair/sombre, global styles
├── services/                   # Paiement, analytics, i18n
├── lib/                        # Wrappers (Redux store, query client)
└── assets/                     # Polices, images, animations
```

## Scripts

| Commande | Description |
|---|---|
| `npm start` | Expo dev server |
| `npm run web` | Expo dev server (web) |
| `npm run android` | Build + run Android |
| `npm run ios` | Build + run iOS |
