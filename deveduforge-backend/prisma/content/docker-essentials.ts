import { Level } from '@prisma/client';
import type { CourseContent } from './react-fundamentals';

export const dockerEssentials: CourseContent = {
  techSlug: 'docker',
  title: 'Docker Essentials',
  description: 'Conteneurisation, Dockerfile, Compose',
  level: Level.beginner,
  durationMin: 150,
  lessons: [
    {
      title: 'Conteneurisation',
      durationMin: 40,
      contentMarkdown: `# Conteneurisation

## Introduction

La conteneurisation est une technologie de virtualisation légère qui permet de packager une application et toutes ses dépendances dans un conteneur standardisé. Contrairement aux machines virtuelles, les conteneurs partagent le noyau de l'hôte, ce qui les rend bien plus rapides et légers.

---

## 1. Conteneurs vs Machines Virtuelles

Les machines virtuelles (VM) encapsulent un système d'exploitation complet avec un hyperviseur. Chaque VM fonctionne de manière totalement isolée mais consomme beaucoup de ressources (Go de RAM, disque).

Les conteneurs, eux, partagent le noyau Linux de la machine hôte. Ils ne contiennent que l'application, ses dépendances et une petite couche d'abstraction. Un conteneur démarre en quelques secondes contre plusieurs minutes pour une VM.

**Avantages des conteneurs :**
- Démarrage quasi instantané (secondes vs minutes)
- Utilisation mémoire réduite (Mo vs Go)
- Portabilité identique entre développement, test et production
- Scalabilité horizontale rapide

---

## 2. Architecture Docker

Docker suit un modèle client-serveur :

- **Client Docker** : l'interface en ligne de commande (\`docker\`) qui envoie des requêtes
- **Docker Daemon (dockerd)** : le processus en arrière-plan qui gère les conteneurs, images et réseaux
- **Docker Registry** : le dépôt distant où sont stockées les images (Docker Hub par défaut)

\`\`\`
┌──────────┐      API       ┌──────────────┐     pull/push    ┌────────────┐
│  Client  │ ──────────────▶│    Docker    │ ◀──────────────▶ │  Registry  │
│  (CLI)   │                │   Daemon     │                   │ (Docker Hub)│
└──────────┘                └──────────────┘                   └────────────┘
                                  │
                          ┌───────┴───────┐
                          │   Conteneurs  │
                          │   & Images    │
                          └───────────────┘
\`\`\`

---

## 3. Images vs Conteneurs

Une **image** est un modèle en lecture seule contenant le système de fichiers, les configurations et les dépendances. C'est un template, pas un processus vivant.

Un **conteneur** est une instance exécutable d'une image. On peut créer plusieurs conteneurs à partir de la même image, chacun avec son propre état.

\`\`\`bash
# Télécharger une image
docker pull node:20-alpine

# Lister les images disponibles
docker images

# Supprimer une image
docker rmi node:20-alpine
\`\`\`

---

## 4. Commandes Essentielles

\`\`\`bash
# Lancer un conteneur (mode détaché)
docker run -d --name mon-app -p 3000:3000 node:20-alpine

# Lister les conteneurs en cours d'exécution
docker ps

# Lister tous les conteneurs (y compris arrêtés)
docker ps -a

# Arrêter un conteneur (graceful)
docker stop mon-app

# Supprimer un conteneur
docker rm mon-app

# Voir les logs d'un conteneur
docker logs mon-app

# Exécuter une commande dans un conteneur en cours
docker exec -it mon-app sh
\`\`\`

Le flag \`-d\` lance en mode détaché (arrière-plan). Le flag \`-it\` ouvre un terminal interactif. Le mapping \`-p 3000:3000\` redirige le port 3000 de l'hôte vers le port 3000 du conteneur.

---

## 5. Cycle de Vie d'un Conteneur

Un conteneur traverse plusieurs états : créé → en exécution → arrêté → supprimé. \`docker stop\` envoie un signal SIGTERM puis SIGKILL après un délai. \`docker rm\` supprime définitivement le conteneur et ses données.

---

## Écueils Courants

- **Ne pas confondre image et conteneur** : une image est statique, un conteneur est un processus vivant
- **Oublier le mapping de ports** : sans \`-p\`, le service n'est pas accessible depuis l'hôte
- **Ne pas nettoyer les conteneurs arrêtés** : \`docker ps -a\` montre les conteneurs arrêtés qui occupent de l'espace. Utilisez \`docker system prune\` périodiquement
- **Utiliser des images lourdes sans raison** : préférez toujours les variantes Alpine (\`node:20-alpine\`) pour des images de 5x plus légères
- **Exécuter des conteneurs en mode interactif en production** : en production, les conteneurs doivent tourner en mode détaché avec des commandes explicites`,
      exercise: {
        title: 'Quiz - Conteneurisation',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quelle est la principale différence entre une machine virtuelle et un conteneur Docker ?",
            explanation: "Les VM encapsulent un OS complet avec hyperviseur, tandis que les conteneurs partagent le noyau de l'hôte. C'est ce qui rend les conteneurs bien plus légers et rapides à démarrer.",
            points: 2,
            options: [
              { label: "Les conteneurs partagent le noyau de l'hôte, les VM ont leur propre OS", isCorrect: true, order: 0 },
              { label: "Les conteneurs sont plus lents mais plus sécurisés", isCorrect: false, order: 1 },
              { label: "Les VM utilisent Docker et les conteneurs utilisent Hyper-V", isCorrect: false, order: 2 },
              { label: "Il n'y a aucune différence, ce sont deux termes synonymes", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle commande lance un conteneur Node.js en arrière-plan sur le port 8080 ?",
            explanation: "Le flag -d (detached) lance le conteneur en arrière-plan. Le flag -p mappe le port de l'hôte vers le conteneur (hôte:conteneur).",
            points: 2,
            options: [
              { label: 'docker run -d -p 8080:3000 node:20-alpine', isCorrect: true, order: 0 },
              { label: 'docker start -p 8080 node:20-alpine', isCorrect: false, order: 1 },
              { label: 'docker run -it node:20-alpine 8080', isCorrect: false, order: 2 },
              { label: 'docker create node:20-alpine --port 8080', isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Que fait la commande docker exec -it mon-app sh ?",
            explanation: "docker exec exécute une commande dans un conteneur déjà en cours d'exécution. Le flag -it ouvre un terminal interactif. sh lance un shell dans le conteneur.",
            points: 1,
            options: [
              { label: "Ouvre un shell interactif dans le conteneur en cours", isCorrect: true, order: 0 },
              { label: "Crée un nouveau conteneur avec un shell", isCorrect: false, order: 1 },
              { label: "Supprime le conteneur mon-app", isCorrect: false, order: 2 },
              { label: "Redémarre le conteneur avec un shell", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi préfère-t-on les images Alpine (ex: node:20-alpine) aux images standard ?",
            explanation: "Les images Alpine sont basées sur Alpine Linux, une distribution minimale. Elles pèsent environ 50 Mo contre 300+ Mo pour les images Debian, ce qui réduit le temps de téléchargement et la surface d'attaque.",
            points: 2,
            options: [
              { label: "Elles sont beaucoup plus légères (environ 50 Mo vs 300+ Mo)", isCorrect: true, order: 0 },
              { label: "Elles contiennent plus de bibliothèques pré-installées", isCorrect: false, order: 1 },
              { label: "Elles sont obligatoires pour Docker", isCorrect: false, order: 2 },
              { label: "Elles n'utilisent pas de noyau Linux", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Que signifie docker stop mon-app par rapport à docker rm mon-app ?",
            explanation: "docker stop arrête l'exécution du conteneur (il reste visible avec docker ps -a). docker rm supprime définitivement le conteneur du système. Il faut d'abord stopper avant de rm.",
            points: 1,
            options: [
              { label: "stop arrête le processus, rm supprime le conteneur", isCorrect: true, order: 0 },
              { label: "stop et rm font exactement la même chose", isCorrect: false, order: 1 },
              { label: "rm arrête le conteneur, stop le supprime", isCorrect: false, order: 2 },
              { label: "stop supprime les données, rm arrête le processus", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Dockerfile',
      durationMin: 40,
      contentMarkdown: `# Dockerfile

## Introduction

Un Dockerfile est un fichier texte contenant des instructions séquentielles pour construire une image Docker. Chaque instruction crée une couche (layer) dans l'image, ce qui permet une mise en cache efficace lors des reconstructions.

---

## 1. Instructions Fondamentales

\`\`\`dockerfile
# Image de base
FROM node:20-alpine

# Métadonnées
LABEL maintainer="dev@example.com"
LABEL description="API Express"

# Répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]
\`\`\`

**Chaque instruction a un rôle précis :**

| Instruction | Rôle |
|-------------|------|
| \`FROM\` | Définit l'image de base (obligatoire, doit être première) |
| \`WORKDIR\` | Définit le répertoire de travail pour les instructions suivantes |
| \`COPY\` | Copie des fichiers de l'hôte vers l'image |
| \`RUN\` | Exécute une commande au moment de la construction |
| \`EXPOSE\` | Documente le port utilisé (ne l'ouvre pas réellement) |
| \`CMD\` | Définit la commande lancée au démarrage du conteneur |

---

## 2. CMD vs ENTRYPOINT

\`CMD\` définit la commande par défaut qui peut être écrasée lors du \`docker run\`. \`ENTRYPOINT\` définit une commande fixe qui s'exécutera toujours.

\`\`\`dockerfile
# CMD peut être remplacé
CMD ["node", "server.js"]
# => docker run mon-app python script.py  →  exécute python script.py

# ENTRYPOINT ne peut pas être remplacé
ENTRYPOINT ["node"]
CMD ["server.js"]
# => docker run mon-app app.js  →  exécute node app.js
# => docker run mon-app          →  exécute node server.js
\`\`\`

La bonne pratique est de combiner les deux : \`ENTRYPOINT\` pour le binaire, \`CMD\` pour les arguments par défaut.

---

## 3. Multi-Stage Builds

Les multi-stage builds permettent de séparer la phase de compilation de la phase d'exécution, réduisant considérablement la taille de l'image finale.

\`\`\`dockerfile
# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 : Production
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
RUN npm prune --omit=dev
EXPOSE 3000
CMD ["node", "dist/server.js"]
\`\`\`

Pour une application TypeScript, l'image de build contient les outils de compilation (typescript, webpack...) tandis que l'image finale ne contient que le code compilé et les dépendances de production. L'économie peut être de 70% sur la taille finale.

---

## 4. .dockerignore

Le fichier \`.dockerignore\` exclut des fichiers du contexte d'envoi au daemon Docker, accélérant la construction et évitant d'inclure des fichiers inutiles ou sensibles.

\`\`\`
node_modules
npm-debug.log
.env
.git
.gitignore
dist
coverage
*.md
.dockerignore
Dockerfile
docker-compose.yml
\`\`\`

Sans ce fichier, \`COPY . .\` copierait \`node_modules\` (qui peut faire des Go) dans l'image, pour ensuite les réinstaller par-dessus avec \`RUN npm ci\`.

---

## 5. Optimisations du Cache Docker

Docker exécute chaque instruction et met en cache le résultat. Si une couche n'a pas changé, Docker la réutilise. L'ordre des instructions est crucial :

\`\`\`dockerfile
# ✅ Bon : copier package.json d'abord (change rarement)
COPY package*.json ./
RUN npm ci
COPY . .  # Le code change souvent, mais le cache npm est préservé

# ❌ Mauvais : copier tout avant npm ci
COPY . .
RUN npm ci  # La couche COPY invalidée = npm ci recommencé
\`\`\`

---

## Écueils Courants

- **CMD en forme shell vs exec** : \`CMD node server.js\` (shell) vs \`CMD ["node", "server.js"]\` (exec). La forme exec est recommandée car elle ne passe pas par /bin/sh, ce qui permet un arrêt propre avec SIGTERM
- **Oublier .dockerignore** : sans ce fichier, les node_modules, .git et fichiers .env sont copiés dans l'image, gonflant sa taille et exposant potentiellement des secrets
- **RUN npm install en production** : \`npm install\` installe aussi les devDependencies. Utilisez \`npm ci --only=production\` ou \`npm prune --omit=dev\` en production
- **Trop de couches RUN** : chaque RUN crée une couche. Combiner les commandes avec \`&&\` et nettoyer dans la même couche (\`RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*\`)
- **Utiliser sudo dans les Dockerfiles** : le processus dans le conteneur tourne root par défaut. Utilisez \`USER node\` pour un utilisateur non-root en production`,
      exercise: {
        title: 'Quiz - Dockerfile',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quelle est la différence principale entre CMD et ENTRYPOINT dans un Dockerfile ?",
            explanation: "CMD définit une commande par défaut qui peut être remplacée au docker run. ENTRYPOINT définit un exécutable fixe qui s'exécutera toujours ; les arguments de docker run sont ajoutés après.",
            points: 2,
            options: [
              { label: "CMD est écrasable au docker run, ENTRYPOINT ne l'est pas", isCorrect: true, order: 0 },
              { label: "CMD est pour Linux, ENTRYPOINT pour Windows", isCorrect: false, order: 1 },
              { label: "ENTRYPOINT doit toujours être en premier dans le Dockerfile", isCorrect: false, order: 2 },
              { label: "CMD exécute la commande au runtime, ENTRYPOINT au build", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi copier package.json avant COPY . . dans un Dockerfile Node.js ?",
            explanation: "package.json change moins souvent que le code source. En le copiant d'abord et en installant les dépendances, Docker met en cache cette couche. Seules les couches suivantes sont re-construites quand le code change.",
            points: 2,
            options: [
              { label: "Pour profiter du cache Docker quand seul le code change", isCorrect: true, order: 0 },
              { label: "Parce que COPY . . ne peut pas être utilisé en premier", isCorrect: false, order: 1 },
              { label: "Pour éviter les erreurs de permissions", isCorrect: false, order: 2 },
              { label: "Parce que npm ci a besoin de package.json en premier", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est l'avantage principal d'un multi-stage build ?",
            explanation: "Les multi-stage builds séparent la compilation (qui nécessite des outils lourds) de l'image finale (qui ne contient que les artefacts). Cela réduit drastiquement la taille de l'image et la surface d'attaque.",
            points: 2,
            options: [
              { label: "Réduire la taille de l'image finale en séparant build et production", isCorrect: true, order: 0 },
              { label: "Permettre d'utiliser plusieurs bases d'OS", isCorrect: false, order: 1 },
              { label: "Accélérer le téléchargement de l'image de base", isCorrect: false, order: 2 },
              { label: "Permettre l'exécution de plusieurs conteneurs", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "À quoi sert le fichier .dockerignore ?",
            explanation: ".dockerignore exclut des fichiers du contexte envoyé au daemon Docker. Sans lui, des dossiers lourds (node_modules) ou sensibles (.env) seraient copiés dans l'image.",
            points: 1,
            options: [
              { label: "Exclure des fichiers du contexte de construction de l'image", isCorrect: true, order: 0 },
              { label: "Ignorer les erreurs lors de la construction", isCorrect: false, order: 1 },
              { label: "Filtrer les logs du conteneur", isCorrect: false, order: 2 },
              { label: "Configurer les variables d'environnement du conteneur", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi la forme exec de CMD (CMD [\"node\", \"server.js\"]) est-elle préférée à la forme shell (CMD node server.js) ?",
            explanation: "La forme exec lance le processus directement comme PID 1, recevant les signaux (SIGTERM) du Docker daemon. La forme shell passe par /bin/sh -c, interceptant les signaux et empêchant l'arrêt gracieux.",
            points: 1,
            options: [
              { label: "Le processus reçoit directement les signaux SIGTERM pour un arrêt gracieux", isCorrect: true, order: 0 },
              { label: "Elle est plus rapide à exécuter", isCorrect: false, order: 1 },
              { label: "Elle consomme moins de mémoire", isCorrect: false, order: 2 },
              { label: "Elle permet d'utiliser des variables d'environnement", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Docker Compose',
      durationMin: 40,
      contentMarkdown: `# Docker Compose

## Introduction

Docker Compose est un outil qui permet de définir et gérer des applications multi-conteneurs via un fichier YAML. Au lieu de lancer plusieurs \`docker run\` avec des flags complexes, Compose orchestre tout avec une seule commande : \`docker compose up\`.

---

## 1. Structure de docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
    depends_on:
      - postgres
    networks:
      - app-network

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  pgdata:

networks:
  app-network:
    driver: bridge
\`\`\`

Chaque service définit un conteneur. \`build\` construit l'image à partir du Dockerfile local. \`image\` utilise une image existante. \`depends_on\` contrôle l'ordre de démarrage.

---

## 2. Services

Un service correspond à un conteneur ou un groupe de conteneurs identiques. Pour monter en charge, on utilise \`deploy.replicas\` ou on lance plusieurs instances.

\`\`\`yaml
services:
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3
\`\`\`

Les \`healthcheck\` permettent à Docker de savoir quand un service est réellement prêt. \`depends_on\` avec \`condition: service_healthy\` garantit qu'un service attend que l'autre soit opérationnel.

---

## 3. Réseaux

Par défaut, Compose crée un réseau bridge pour le projet. Les services communiquent entre eux via leur nom de service comme hostname.

\`\`\`yaml
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # Pas d'accès Internet

services:
  nginx:
    networks:
      - frontend
      - backend
  api:
    networks:
      - backend
  db:
    networks:
      - backend  # Seul l'API peut atteindre la base
\`\`\`

Le réseau \`internal: true\` empêche les conteneurs d'accéder à Internet. Utile pour les bases de données qui ne doivent communiquer qu'avec l'API.

---

## 4. Volumes

Les volumes persistent les données au-delà du cycle de vie des conteneurs. Sans volume, les données de la base seraient perdues à chaque \`docker compose down\`.

\`\`\`yaml
volumes:
  pgdata:
    driver: local
  redis-data:

services:
  postgres:
    volumes:
      - pgdata:/var/lib/postgresql/data    # Volume nommé
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Fichier monté
  app:
    volumes:
      - ./src:/app/src  # Montage en développement (hot reload)
\`\`\`

**Types de montage :**
- **Volume nommé** (\`pgdata:/chemin\`) : géré par Docker, persistant, recommandé en production
- **Bind mount** (\`./src:/app/src\`) : lie un dossier local, idéal pour le développement
- **tmpfs** : stockage temporaire en RAM, pour les données sensibles

---

## 5. Variables d'Environnement

\`\`\`yaml
services:
  app:
    env_file:
      - .env
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - SECRET_KEY=\${SECRET_KEY}

  postgres:
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
\`\`\`

Le fichier \`.env\` à la racine du projet est automatiquement lu par Compose. Les variables de ce fichier sont accessibles via \`\${VAR}\`. En production, on passe les secrets via des variables d'environnement système ou des gestionnaires de secrets (Vault, AWS Secrets Manager).

---

## Commandes Essentielles

\`\`\`bash
# Démarrer tous les services (arrière-plan)
docker compose up -d

# Voir les logs en temps réel
docker compose logs -f app

# Arrêter et supprimer les conteneurs, réseaux
docker compose down

# Arrêter et supprimer volumes aussi
docker compose down -v

# Reconstruire les images
docker compose up -d --build

# Voir l'état des services
docker compose ps
\`\`\`

---

## Écueils Courants

- **Oublier depends_on** : sans \`depends_on\`, les services démarrent en parallèle. L'API peut démarrer avant la base et crasher. Utilisez \`condition: service_healthy\` pour une attente fiable
- **Données perdues sans volume** : sans volume nommé, \`docker compose down\` supprime les données. Ajoutez toujours un volume pour les bases de données
- **Mauvaise gestion des secrets** : ne jamais écrire de mots de passe en dur dans docker-compose.yml. Utilisez des fichiers \`.env\` ou des gestionnaires de secrets
- **Réseau par défaut trop permissif** : tous les services communiquent par défaut. Isolez les bases de données dans un réseau \`internal: true\`
- **Utiliser docker compose en production sans gestion d'état** : Compose n'est pas fait pour la haute disponibilité. En production, préférez Kubernetes ou Docker Swarm`,
      exercise: {
        title: 'Quiz - Docker Compose',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Dans docker-compose.yml, quelle clé définit les services du projet ?",
            explanation: "La clé 'services' contient la définition de chaque conteneur du projet. C'est le cœur d'un fichier docker-compose.yml.",
            points: 1,
            options: [
              { label: "services", isCorrect: true, order: 0 },
              { label: "containers", isCorrect: false, order: 1 },
              { label: "instances", isCorrect: false, order: 2 },
              { label: "apps", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment un conteneur API peut-il accéder à un conteneur PostgreSQL dans le même docker-compose.yml ?",
            explanation: "Dans Compose, chaque service est accessible via son nom de service comme hostname. L'API peut se connecter à postgres://postgres:5432, le nom 'postgres' résolvant vers le conteneur correspondant via le réseau DNS interne de Docker.",
            points: 2,
            options: [
              { label: "En utilisant le nom du service comme hostname (ex: postgres)", isCorrect: true, order: 0 },
              { label: "En utilisant l'IP publique du conteneur", isCorrect: false, order: 1 },
              { label: "En montant un fichier de configuration partagé", isCorrect: false, order: 2 },
              { label: "En utilisant localhost", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle est la différence entre un volume nommé et un bind mount ?",
            explanation: "Un volume nommé est géré par Docker et persiste indépendamment du cycle de vie des conteneurs. Un bind mount lie un dossier de l'hôte au conteneur, utile pour le développement avec hot-reload.",
            points: 2,
            options: [
              { label: "Volume nommé : géré par Docker ; bind mount : lie un dossier local", isCorrect: true, order: 0 },
              { label: "Volume nommé : temporaire ; bind mount : permanent", isCorrect: false, order: 1 },
              { label: "Volume nommé : pour Windows ; bind mount : pour Linux", isCorrect: false, order: 2 },
              { label: "Il n'y a aucune différence fonctionnelle", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Que fait docker compose down -v par rapport à docker compose down ?",
            explanation: "docker compose down arrête les conteneurs et supprime les réseaux. L'option -v supprime également les volumes nommés, ce qui entraîne la perte des données persistées.",
            points: 2,
            options: [
              { label: "-v supprime aussi les volumes nommés (perte de données)", isCorrect: true, order: 0 },
              { label: "-v supprime les variables d'environnement", isCorrect: false, order: 1 },
              { label: "-v est plus lent mais plus sûr", isCorrect: false, order: 2 },
              { label: "-v ne fait rien de différent", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "À quoi sert un healthcheck dans un service Docker Compose ?",
            explanation: "Le healthcheck permet à Docker de vérifier si un service est réellement opérationnel. Combiné à depends_on avec condition: service_healthy, il garantit qu'un service n'est démarré que quand ses dépendances sont prêtes.",
            points: 1,
            options: [
              { label: "Vérifier qu'un service est opérationnel avant de démarrer les dépendants", isCorrect: true, order: 0 },
              { label: "Monitorer les performances en production", isCorrect: false, order: 1 },
              { label: "Redémarrer automatiquement un service en cas de crash", isCorrect: false, order: 2 },
              { label: "Mesurer l'utilisation CPU du conteneur", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Registres et CI/CD',
      durationMin: 30,
      contentMarkdown: `# Registres et CI/CD

## Introduction

Un registre Docker est un dépôt pour stocker et distribuer des images. Docker Hub est le registre public par défaut, mais en entreprise on utilise souvent des registres privés. L'intégration avec un pipeline CI/CD permet d'automatiser la construction, le test et le déploiement des conteneurs.

---

## 1. Docker Hub

Docker Hub est le plus grand registre d'images Docker. Il propose des images officielles (node, postgres, nginx) et permet de stocker ses propres images.

\`\`\`bash
# Se connecter à Docker Hub
docker login

# Taguer une image pour Docker Hub
docker tag my-app:latest monuser/my-app:1.0.0

# Pousser l'image
docker push monuser/my-app:1.0.0

# Tirer l'image sur une autre machine
docker pull monuser/my-app:1.0.0
\`\`\`

**Convention de tag :** \`registry/namespace/image:tag\`. Sans tag, Docker utilise \`latest\`, ce qui est déconseillé en production car il ne documente pas la version.

---

## 2. GitHub Container Registry (GHCR)

GitHub propose son propre registre intégré aux repositories. Il est gratuit pour les packages publics et lié aux permissions du repository.

\`\`\`bash
# Connexion à GHCR
echo \$GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Taguer pour GHCR
docker tag my-app:latest ghcr.io/monuser/mon-repo/my-app:1.0.0

# Pousser
docker push ghcr.io/monuser/mon-repo/my-app:1.0.0
\`\`\`

GHCR utilise les mêmes tokens d'authentification que GitHub, ce qui simplifie la gestion des accès.

---

## 3. Registres Privés

AWS ECR, Google Container Registry et Azure Container Registry sont les solutions cloud principales. Elles offrent un chiffrement, un contrôle d'accès fine et l'intégration avec les services cloud.

\`\`\`bash
# AWS ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.eu-west-1.amazonaws.com
docker tag my-app:latest 123456789.dkr.ecr.eu-west-1.amazonaws.com/my-app:1.0.0
docker push 123456789.dkr.ecr.eu-west-1.amazonaws.com/my-app:1.0.0
\`\`\`

---

## 4. Docker dans un Pipeline CI/CD

Voici un exemple de pipeline GitHub Actions qui construit, teste et publie une image Docker :

\`\`\`yaml
name: Build & Push Docker Image

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/\${{ github.repository }}
          tags: |
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=sha

      - name: Build and Push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
\`\`\`

Ce pipeline se déclenche à chaque push sur main ou chaque tag \`v*\`. Il utilise Docker Buildx pour un build multi-plateforme et le cache GitHub Actions pour accélérer les constructions successives.

---

## 5. Stratégies de Tag et Sécurité

**Tag sémantique :** utilisez \`major.minor.patch\` (ex: \`1.2.3\`). Évitez \`latest\` en production car il rend les rollbacks impossibles à tracer.

**Scan de vulnérabilités :** utilisez \`docker scout\` ou \`trivy\` pour scanner les images avant de les pousser.

\`\`\`bash
# Scanner une image avec Trivy
trivy image my-app:latest

# Scanner avec Docker Scout
docker scout cves my-app:latest
\`\`\`

**Bonnes pratiques de sécurité :**
- Signez les images avec \`docker buildx build --sign\`
- Utilisez des tokens à durée de vie limitée pour les CI/CD
- Appliquez la stratégie \`least privilege\` sur les accès au registre
- Supprimez les images obsolètes régulièrement

---

## Écueils Courants

- **Utiliser :latest en production** : le tag \`latest\` est non déterministe. Un \`docker compose pull\` peut récupérer une version incompatible. Utilisez toujours des tags sémantiques
- **Pousser des images sans scanner** : des vulnérabilités connues dans les dépendances peuvent être exploitées. Intégrez un scan (Trivy, Scout) dans le pipeline CI
- **Tokens GitHub exposés dans les workflows** : ne jamais écrire de tokens en dur. Utilisez \${{ secrets.GITHUB_TOKEN }} qui est automatiquement géré par GitHub Actions
- **Oublier le cache Docker en CI** : sans \`cache-from\` et \`cache-to\`, chaque build recompile tout de zéro, ce qui rallonge les pipelines. Utilisez le cache GHA ou le cache registry
- **Mélanger les environnements avec les mêmes tags** : une image \`my-app:1.0\` ne doit exister que dans un seul registre/environnement. Préfixez les tags par l'environnement si nécessaire`,
      exercise: {
        title: 'Quiz - Registres et CI/CD',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Pourquoi déconseille-t-on d'utiliser le tag :latest en production ?",
            explanation: "Le tag latest est non déterministe : il peut pointer vers n'importe quelle version. Un docker pull peut récupérer une version incompatible, rendant les rollbacks impossibles à tracer.",
            points: 2,
            options: [
              { label: "Il est non déterministe et rend les rollbacks impossibles à tracer", isCorrect: true, order: 0 },
              { label: "Il n'est pas supporté par Docker Hub", isCorrect: false, order: 1 },
              { label: "Il est plus lent à télécharger", isCorrect: false, order: 2 },
              { label: "Il contient plus de vulnérabilités que les autres tags", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans un pipeline CI/CD GitHub Actions, comment se connecter à GHCR de manière sécurisée ?",
            explanation: "GitHub Actions fournit GITHUB_TOKEN automatiquement. Il ne faut jamais le mettre en dur dans le workflow. docker/login-action permet de s'authentifier sans exposer le token.",
            points: 2,
            options: [
              { label: "En utilisant ${{ secrets.GITHUB_TOKEN }} via docker/login-action", isCorrect: true, order: 0 },
              { label: "En écrivant le mot de passe directement dans le fichier YAML", isCorrect: false, order: 1 },
              { label: "En utilisant un fichier .env dans le repository", isCorrect: false, order: 2 },
              { label: "En générant un token manuellement avant chaque build", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "À quoi sert docker buildx dans un pipeline CI/CD ?",
            explanation: "Docker Buildx étend les capacités de docker build : builds multi-plateformes (amd64, arm64), builds multi-stages avancés, et intégration avec le cache GitHub Actions.",
            points: 1,
            options: [
              { label: "Construire des images multi-plateformes et activer le cache avancé", isCorrect: true, order: 0 },
              { label: "Accélérer les conteneurs en production", isCorrect: false, order: 1 },
              { label: "Scanner les vulnérabilités des images", isCorrect: false, order: 2 },
              { label: "Déployer les conteneurs sur Kubernetes", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel outil recommande-t-on pour scanner les vulnérabilités d'une image Docker avant de la déployer ?",
            explanation: "Trivy est un scanner open-source de vulnérabilités très populaire. Docker Scout est l'outil officiel de Docker. Les deux s'intègrent facilement dans un pipeline CI/CD.",
            points: 1,
            options: [
              { label: "Trivy ou Docker Scout", isCorrect: true, order: 0 },
              { label: "npm audit", isCorrect: false, order: 1 },
              { label: "Docker Scout uniquement (Trivy n'est plus maintenu)", isCorrect: false, order: 2 },
              { label: "curl vers une API de scan", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Que fait le cache-from et cache-to dans docker/build-push-action ?",
            explanation: "Ces options configurent le cache de build GitHub Actions. cache-from réutilise une couche de cache existante pour accélérer le build. cache-to sauvegarde les nouvelles couches pour les builds futurs.",
            points: 2,
            options: [
              { label: "Réutiliser et sauvegarder les couches de cache pour accélérer les builds", isCorrect: true, order: 0 },
              { label: "Mettre en cache les images en production", isCorrect: false, order: 1 },
              { label: "Sauvegarder les logs de build", isCorrect: false, order: 2 },
              { label: "Archiver les anciennes versions d'images", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
  ],
  project: {
    title: 'Stack Web Complète avec Docker Compose',
    instructions: `# Stack Web Complète avec Docker Compose

## Objectif

Créer une stack web complète contenant une API, une base de données et un reverse proxy, le tout orchestré avec Docker Compose.

## Consignes

### 1. API Node.js/Express

- Créer une API Express simple avec TypeScript
- Route GET /health qui retourne \`{ status: "ok", timestamp: "..." }\`
- Route GET /users qui retourne une liste d'utilisateurs depuis la base de données
- Route POST /users qui crée un utilisateur (nom, email)
- Connexion à PostgreSQL via le client \`pg\`
- Dockerfile multi-stage : une étape de build (compilation TypeScript) et une étape de production (exécution du code compilé)

### 2. Base de données PostgreSQL

- Service PostgreSQL 16 Alpine
- Volume nommé pour la persistance des données
- Fichier d'initialisation SQL (init.sql) qui crée la table users
- Healthcheck pour vérifier que PostgreSQL est prêt
- Variables d'environnement pour l'utilisateur, le mot de passe et la base

### 3. Nginx Reverse Proxy

- Service Nginx qui redirige les requêtes vers l'API
- Fichier de configuration nginx.conf personnalisé
- Proxy pass vers le service API sur le port 3000
- Les requêtes /api/* sont routées vers Express
- Le port 80 est exposé pour l'accès externe

### 4. Docker Compose Orchestration

- Fichier docker-compose.yml avec les 3 services (api, postgres, nginx)
- Réseau dédié pour la communication inter-services
- Variables d'environnement dans un fichier .env
- Commande docker compose up --build pour tout lancer
- docker compose down -v doit tout arrêter proprement

### 5. Documentation

- README.md expliquant comment lancer le projet
- Variables d'environnement documentées

## Contraintes techniques

- L'API doit être écrit en TypeScript
- Le Dockerfile de l'API doit utiliser un multi-stage build
- Le conteneur API doit tourner avec un utilisateur non-root
- Aucun mot de passe en dur dans docker-compose.yml (utiliser .env)

## Rendu

Déposer le code source sur GitHub et soumettre le lien du repository.`,
    evaluationCriteria: [
      "Multi-stage build fonctionnel (étape de build TypeScript séparée de l'image de production)",
      'Orchestration Compose correcte (3 services communiquent via les noms de service, healthcheck sur PostgreSQL)',
      'Persistance des données (volume nommé PostgreSQL, init.sql correctement monté)',
      'Nginx reverse proxy (proxy pass fonctionnel vers l\'API, configuration correcte)',
      'Sécurité et bonnes pratiques (utilisateur non-root, .env pour les secrets, .dockerignore)',
    ],
  },
};
