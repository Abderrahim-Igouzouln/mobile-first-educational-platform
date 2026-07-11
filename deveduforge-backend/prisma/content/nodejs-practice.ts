import { Level } from '@prisma/client';
import type { CourseContent } from './react-fundamentals';

export const nodejsPractice: CourseContent = {
  techSlug: 'nodejs',
  title: 'Node.js par la pratique',
  description: 'Créez des API REST avec Express et TypeScript',
  level: Level.beginner,
  durationMin: 210,
  lessons: [
    {
      title: 'Environnement Node.js',
      durationMin: 45,
      contentMarkdown: `# Environnement Node.js

## Introduction

Node.js est un runtime JavaScript qui permet d'exécuter du JavaScript côté serveur, en dehors du navigateur. Il repose sur le moteur V8 de Google et utilise un modèle d'E/S non bloquant qui le rend idéal pour les applications réseau.

---

## 1. Le Runtime Node.js

Node.js interprète le JavaScript via le moteur V8, compile-le en code machine et l'exécute. Contrairement au navigateur, Node.js a accès au système de fichiers, aux processus et au réseau.

\`\`\`typescript
// Exécution d'un script Node.js
// node mon-script.ts (avec tsx) ou node mon-script.js
console.log(process.version);   // v20.x.x
console.log(process.arch);      // x64
console.log(process.platform);  // win32
\`\`\`

Le moteur V8 compile le JavaScript en bytecode puis en code machine natif. Les API réseau et fichier sont gérées par le libuv, une couche d'abstraction multiplateforme.

---

## 2. Modules CommonJS vs ESM

Node.js supporte deux systèmes de modules :

| Système | Import | Export | Extension |
|---------|--------|--------|-----------|
| CommonJS | \`require()\` | \`module.exports\` | \`.js\` |
| ESM | \`import ... from\` | \`export\` | \`.mjs\` ou \`"type": "module"\` dans package.json |

\`\`\`typescript
// ── CommonJS (CJS) ──
const { calculer } = require('./math');
module.exports = { calculer };

// ── ECMAScript Modules (ESM) ──
import { calculer } from './math.js';
export function additionner(a: number, b: number): number {
  return a + b;
}
\`\`\`

**Quand utiliser quoi ?**
- **CJS** : scripts rapides, packages legacy, quand on a besoin de \`require\` dynamique
- **ESM** : projets TypeScript modernes, tree-shaking côté client, imports statiques

---

## 3. package.json et npm scripts

Le fichier \`package.json\` est le manifeste du projet. Il définit les dépendances, les scripts et la configuration.

\`\`\`json
{
  "name": "mon-projet-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src/",
    "test": "vitest run"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "vitest": "^1.2.0"
  }
}
\`\`\`

**Commandes npm essentielles :**
- \`npm init -y\` : initialiser un package.json
- \`npm install express\` : installer une dépendance
- \`npm install -D vitest\` : installer une dépendance de développement
- \`npm run dev\` : lancer le script "dev"

---

## 4. Le Debugger Node.js

Node.js intègre un débogueur qui peut s'interfacer avec Chrome DevTools.

\`\`\`typescript
// src/index.ts
function calculerFact(n: number): number {
  if (n <= 1) return 1; // ← Breakpoint ici
  return n * calculerFact(n - 1);
}

const resultat = calculerFact(5);
console.log('Résultat:', resultat);
\`\`\`

Lancer le débogueur :
\`\`\`bash
node --inspect-brk src/index.ts
# Puis ouvrir chrome://inspect dans Chrome
\`\`\`

Vous pouvez aussi poser des breakpoints programmatiques :
\`\`\`typescript
debugger; // Pose un breakpoint ici quand inspect-brk est actif
\`\`\`

---

## 5. Processus et Environnement

Node.js s'exécute dans un processus unique. Vous pouvez interagir avec lui via \`process\` :

\`\`\`typescript
// Variables d'environnement (via .env)
const port = parseInt(process.env.PORT || '3000', 10);
const dbUrl = process.env.DATABASE_URL;

// Signal handling (arrêt gracieux)
process.on('SIGTERM', () => {
  console.log('Arrêt demandé, nettoyage en cours...');
  server.close(() => process.exit(0));
});
\`\`\`

> **Bonnes pratiques :** ne jamais commiter de secrets dans \`package.json\`. Utilisez un fichier \`.env\` ajouté au \`.gitignore\`.

---

## Pièges courants

- **\`require()\` dans un module ESM** : impossible — utiliser \`import\` ou \`createRequire\` depuis \`node:module\`
- **Oublier \`"type": "module"\`** : les imports ESM seront refusés sans cette ligne dans package.json
- **Confondre \`node\` et \`tsx\`** : \`tsx\` gère TypeScript nativement, \`node\` nécessite un pré-compilage via \`tsc\`
- **Mutations du \`process.env\`** : elles sont globales et persistent entre les appels, provoquant des bugs subtils
- **Oublier \`node_modules\` dans le \`.gitignore\`** : le dossier pèse souvent plusieurs centaines de Mo`,
      exercise: {
        title: "Quiz - Environnement Node.js",
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quelle commande initialise un nouveau projet Node.js avec un package.json par défaut ?",
            explanation: "npm init -y crée un package.json avec des valeurs par défaut. Sans -y, npm pose des questions interactives pour remplir chaque champ.",
            points: 2,
            options: [
              { label: "npm init -y", isCorrect: true, order: 0 },
              { label: "npm create app", isCorrect: false, order: 1 },
              { label: "node init", isCorrect: false, order: 2 },
              { label: "npm new project", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans un module ESM (\"type\": \"module\"), comment importer une fonction depuis un fichier local ?",
            explanation: "Les imports ESM utilisent la syntaxe statique import ... from. L'extension .js est requise dans les imports locaux en Node.js, même si le fichier source est .ts.",
            points: 2,
            options: [
              { label: "import { maFonction } from './mon-fichier.js'", isCorrect: true, order: 0 },
              { label: "const { maFonction } = require('./mon-fichier')", isCorrect: false, order: 1 },
              { label: "import maFonction from './mon-fichier'", isCorrect: false, order: 2 },
              { label: "load('./mon-fichier.js')", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle est la différence entre une dépendance (dependencies) et une dépendance de développement (devDependencies) ?",
            explanation: "Les dependencies sont nécessaires en production (ex: express). Les devDependencies ne sont utiles que pendant le développement (ex: typescript, vitest) et ne sont pas installées en production avec --omit=dev.",
            points: 2,
            options: [
              { label: "dependencies = runtime ; devDependencies = développement uniquement", isCorrect: true, order: 0 },
              { label: "Il n'y a aucune différence, les deux sont identiques", isCorrect: false, order: 1 },
              { label: "devDependencies sont automatiquement installées en production", isCorrect: false, order: 2 },
              { label: "dependencies sont optionnelles, devDependencies sont obligatoires", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment lancer un débogueur Node.js qui s'ouvre dans Chrome DevTools ?",
            explanation: "L'option --inspect-brk démarre le débogueur et pose un breakpoint au début du script, permettant d'inspecter le code pas à pas dans chrome://inspect.",
            points: 1,
            options: [
              { label: "node --inspect-brk src/index.ts", isCorrect: true, order: 0 },
              { label: "node --debug src/index.ts", isCorrect: false, order: 1 },
              { label: "node --devtools src/index.ts", isCorrect: false, order: 2 },
              { label: "node --chrome src/index.ts", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel outil permet d'exécuter du TypeScript directement sans compilation préalable ?",
            explanation: "tsx (TypeScript Execute) est un runner qui exécute du TypeScript nativement en se basant sur esbuild. Il est plus rapide que ts-node et supporte les imports ESM.",
            points: 1,
            options: [
              { label: "tsx", isCorrect: true, order: 0 },
              { label: "ts-node only", isCorrect: false, order: 1 },
              { label: "tsc run", isCorrect: false, order: 2 },
              { label: "typescript-node", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Express et Routes',
      durationMin: 55,
      contentMarkdown: `# Express et Routes

## Introduction

Express.js est le framework web le plus populaire pour Node.js. Il fournit une couche d'abstraction au-dessus de l'HTTP natif pour créer des API REST de manière structurée et modulaire.

---

## 1. Mise en place du serveur

\`\`\`typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Middleware global : parser le body JSON
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API opérationnelle' });
});

app.listen(PORT, () => {
  console.log(\`Serveur démarré sur http://localhost:\${PORT}\`);
});
\`\`\`

\`express.json()\` est un middleware intégré qui parse automatiquement les corps de requête au format JSON. Sans lui, \`req.body\` serait \`undefined\`.

---

## 2. Routing et Paramètres

Express organise les routes par méthode HTTP et chemin :

\`\`\`typescript
// Routes CRUD pour des articles
app.get('/api/articles', async (req: Request, res: Response) => {
  const articles = await prisma.article.findMany();
  res.json(articles);
});

app.get('/api/articles/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) {
    return res.status(404).json({ error: 'Article non trouvé' });
  }
  res.json(article);
});

app.post('/api/articles', async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  const article = await prisma.article.create({
    data: { title, content, authorId },
  });
  res.status(201).json(article);
});

app.put('/api/articles/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });
  res.json(article);
});

app.delete('/api/articles/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await prisma.article.delete({ where: { id } });
  res.status(204).send();
});
\`\`\`

**Paramètres de requête :**
\`\`\`typescript
// GET /api/articles?page=2&limit=10
app.get('/api/articles', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  // ...
});
\`\`\`

---

## 3. Middleware

Un middleware est une fonction qui reçoit \`req\`, \`res\` et \`next\`. Il peut transformer la requête, l'authentifier ou logger.

\`\`\`typescript
// Middleware de logging
function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(\`\${req.method} \${req.originalUrl} \${res.statusCode} \${ms}ms\`);
  });
  next();
}

// Middleware d'authentification
function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }
}

// Application globale
app.use(logger);

// Application par route
app.get('/api/profil', authenticate, getProfil);
\`\`\`

---

## 4. Gestion centralisée des erreurs

Express identifie un gestionnaire d'erreurs par ses **4 paramètres** : \`err\`, \`req\`, \`res\`, \`next\`.

\`\`\`typescript
// Classe d'erreur personnalisée
class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

// Gestionnaire d'erreurs global
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error('Erreur inattendue:', err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
}

// Utilisation dans les routes
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!user) throw new AppError(404, 'Utilisateur non trouvé');
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);
\`\`\`

---

## 5. Structure modulaire avec Express Router

Pour éviter un fichier monolithique, on découpe les routes dans des fichiers séparés :

\`\`\`typescript
// src/routes/articles.routes.ts
import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as ctrl from '../controllers/articles.controller';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', authenticate, ctrl.create);
router.put('/:id', authenticate, ctrl.update);
router.delete('/:id', authenticate, ctrl.remove);

export default router;

// src/app.ts
import articleRoutes from './routes/articles.routes';
app.use('/api/articles', articleRoutes);
\`\`\`

---

## Pièges courants

- **Oublier \`express.json()\`** : \`req.body\` sera \`undefined\` pour les requêtes POST/PUT
- **Ne pas appeler \`next(err)\`** : l'erreur sera silencieusement ignorée et la requête restera en suspens
- **Routes définies dans le mauvais ordre** : \`/api/articles/featured\` doit être déclarée AVANT \`/api/articles/:id\` sinon Express interprétera "featured" comme un paramètre :id
- **Oublier le return avant \`res.status()\`** : le code continue de s'exécuter et peut provoquer des erreurs "headers already sent"
- **Ne pas centraliser les erreurs** : chaque route doit appeler \`next(err)\` en cas d'exception, sinon Express ne l'affichera pas`,
      exercise: {
        title: "Quiz - Express et Routes",
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quel middleware intégré à Express permet de parser automatiquement les corps de requête JSON ?",
            explanation: "express.json() est un middleware intégré depuis Express 4.16+. Il utilise body-parser en interne pour transformer le corps JSON en objet JavaScript accessible via req.body.",
            points: 2,
            options: [
              { label: "express.json()", isCorrect: true, order: 0 },
              { label: "express.urlencoded()", isCorrect: false, order: 1 },
              { label: "express.bodyParser()", isCorrect: false, order: 2 },
              { label: "express.parse()", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment récupérer le paramètre d'URL d'une route comme /api/users/:id ?",
            explanation: "req.params contient tous les paramètres de route. Dans /api/users/:id, req.params.id contient la valeur correspondante du segment d'URL.",
            points: 2,
            options: [
              { label: "req.params.id", isCorrect: true, order: 0 },
              { label: "req.query.id", isCorrect: false, order: 1 },
              { label: "req.body.id", isCorrect: false, order: 2 },
              { label: "req.path.id", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quels sont les 4 paramètres d'un gestionnaire d'erreurs Express ?",
            explanation: "Express identifie un gestionnaire d'erreurs par sa signature exacte (err, req, res, next). Si l'un de ces paramètres manque, Express le traitera comme un middleware standard.",
            points: 2,
            options: [
              { label: "(err, req, res, next)", isCorrect: true, order: 0 },
              { label: "(req, res, err, next)", isCorrect: false, order: 1 },
              { label: "(error, request, response)", isCorrect: false, order: 2 },
              { label: "(req, res, next, err)", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi faut-il déclarer la route /api/articles/featured avant /api/articles/:id ?",
            explanation: "Express évalue les routes dans l'ordre de déclaration. Si :id est déclaré en premier, 'featured' sera interprété comme un paramètre :id au lieu d'un chemin littéral.",
            points: 1,
            options: [
              { label: "Express matche les routes dans l'ordre de déclaration", isCorrect: true, order: 0 },
              { label: "featured est un mot réservé d'Express", isCorrect: false, order: 1 },
              { label: "Les routes avec des paramètres ont toujours la priorité", isCorrect: false, order: 2 },
              { label: "C'est une convention sans impact technique", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est le rôle de la fonction next() dans un middleware Express ?",
            explanation: "next() passe le contrôle au middleware suivant dans la chaîne. Sans appel à next(), la requête reste bloquée et le client ne reçoit jamais de réponse.",
            points: 1,
            options: [
              { label: "Passer le contrôle au middleware ou route suivant(e)", isCorrect: true, order: 0 },
              { label: "Terminer la requête et envoyer la réponse", isCorrect: false, order: 1 },
              { label: "Rediriger vers une autre route", isCorrect: false, order: 2 },
              { label: "Rejeter la requête HTTP", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Prisma ORM',
      durationMin: 55,
      contentMarkdown: `# Prisma ORM

## Introduction

Prisma est un ORM moderne pour Node.js et TypeScript. Il fournit un schéma déclaratif pour définir votre modèle de données, un client généré typé pour interagir avec la base de données, et un système de migrations pour versionner le schéma.

---

## 1. Définition du Schéma

Le fichier \`prisma/schema.prisma\` est la source de vérité de votre modèle de données :

\`\`\`prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(USER)
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  comments  Comment[]
  tags      Tag[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
  @@index([createdAt])
}

model Comment {
  id        Int      @id @default(autoincrement())
  text      String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    Int
  createdAt DateTime @default(now())
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}
\`\`\`

**Mots-clés importants :**
- \`@unique\` : contrainte d'unicité
- \`@default()\` : valeur par défaut
- \`@relation()\` : définit une relation entre deux modèles
- \`@@index()\` : crée un index de performance

---

## 2. Migrations

Les migrations schématisent les changements de votre base de données :

\`\`\`bash
# Créer une migration après modification du schéma
npx prisma migrate dev --name add-comments

# Appliquer les migrations en production
npx prisma migrate deploy

# Réinitialiser la base (⚠️ destructive)
npx prisma migrate reset
\`\`\`

Chaque migration crée un dossier dans \`prisma/migrations/\` contenant un fichier SQL. Ce fichier est versionné avec Git.

---

## 3. CRUD avec le Client Prisma

\`\`\`typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
const newUser = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    password: await bcrypt.hash('secret123', 10),
  },
});

// READ avec filtres
const publishedPosts = await prisma.post.findMany({
  where: {
    published: true,
    author: { role: 'ADMIN' },
  },
  include: {
    author: { select: { id: true, name: true } },
    _count: { select: { comments: true } },
  },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// READ avec pagination
const page = 2;
const limit = 10;
const posts = await prisma.post.findMany({
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { createdAt: 'desc' },
});

// UPDATE
const updated = await prisma.post.update({
  where: { id: 1 },
  data: { title: 'Titre modifié', published: true },
});

// DELETE (cascadant vers les comments grâce à onDelete: Cascade)
await prisma.post.delete({ where: { id: 1 } });

// UPSERT (create or update)
const upserted = await prisma.user.upsert({
  where: { email: 'alice@example.com' },
  update: { name: 'Alice M.' },
  create: {
    email: 'alice@example.com',
    name: 'Alice',
    password: await bcrypt.hash('secret123', 10),
  },
});
\`\`\`

---

## 4. Relations et Requêtes Avancées

\`\`\`typescript
// Transaction atomique
const [newPost, updatedUser] = await prisma.$transaction([
  prisma.post.create({
    data: { title: 'Mon post', content: '...', authorId: 1 },
  }),
  prisma.user.update({
    where: { id: 1 },
    data: { role: 'ADMIN' },
  }),
]);

// Recherche avec recherche textuelle
const searchResults = await prisma.post.findMany({
  where: {
    OR: [
      { title: { contains: 'node', mode: 'insensitive' } },
      { content: { contains: 'node', mode: 'insensitive' } },
    ],
  },
  include: { author: { select: { name: true } } },
});

// Agrégation
const stats = await prisma.post.aggregate({
  _count: { id: true },
  _avg: { id: true },
  where: { published: true },
});
\`\`\`

---

## 5. Seeding (Peuplement de la base)

Le seeding permet de remplir la base avec des données de test :

\`\`\`typescript
// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Dupont',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  await prisma.post.createMany({
    data: [
      { title: 'Intro à Node.js', content: 'Node.js est un runtime...', authorId: alice.id, published: true },
      { title: 'Express avancé', content: 'Middlewares, routing...', authorId: alice.id, published: false },
    ],
  });

  console.log('Seed terminé !');
}

main()
  .catch(console.error)
  .finally(() => prisma.\$disconnect());
\`\`\`

Ajouter dans \`package.json\` :
\`\`\`json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
\`\`\`

Puis exécuter : \`npx prisma db seed\`

---

## Pièges courants

- **Oublier \`await\` sur les opérations Prisma** : toutes les méthodes sont asynchrones et retournent des Promises
- **Confondre \`findUnique\` et \`findFirst\`** : \`findUnique\` ne fonctionne que sur des champs \`@unique\`, \`findFirst\` accepte n'importe quel filtre
- **N+1 queries** : chaque boucle avec une requête Prisma crée une connexion séparée — utiliser \`include\` ou \`findMany\` avec filtres
- **Ne pas utiliser de transactions** : les opérations atomiques nécessitent \`$transaction\`, sinon une erreur à mi-chemin laisse la base dans un état incohérent
- **Mots de passe en clair** : toujours hasher les mots de passe avec bcrypt avant de les stocker`,
      exercise: {
        title: "Quiz - Prisma ORM",
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quelle commande crée une nouvelle migration Prisma après une modification du schéma ?",
            explanation: "prisma migrate dev crée un fichier SQL de migration, l'applique à la base de développement, et régénère le client Prisma. L'option --name permet de nommer la migration.",
            points: 2,
            options: [
              { label: "npx prisma migrate dev --name nom-migration", isCorrect: true, order: 0 },
              { label: "npx prisma generate", isCorrect: false, order: 1 },
              { label: "npx prisma db push", isCorrect: false, order: 2 },
              { label: "npx prisma schema push", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle est la différence entre findUnique et findFirst chez Prisma ?",
            explanation: "findUnique ne peut interroger que des champs marqués @unique et retourne un seul résultat. findFirst accepte n'importe quel filtre (where) et retourne le premier résultat correspondant.",
            points: 2,
            options: [
              { label: "findUnique = champs @unique uniquement ; findFirst = n'importe quel filtre", isCorrect: true, order: 0 },
              { label: "findUnique est plus rapide que findFirst", isCorrect: false, order: 1 },
              { label: "findFirst retourne un tableau, findUnique retourne un objet", isCorrect: false, order: 2 },
              { label: "Ils sont identiques, c'est juste un alias", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi doit-on utiliser $transaction quand on effectue plusieurs opérations liées ?",
            explanation: "Une transaction garantit que toutes les opérations sont atomiques : soit elles réussissent toutes, soit aucune n'est appliquée. Sans transaction, une erreur partielle laisse la base dans un état incohérent.",
            points: 2,
            options: [
              { label: "Pour garantir l'atomicité des opérations", isCorrect: true, order: 0 },
              { label: "Pour améliorer les performances", isCorrect: false, order: 1 },
              { label: "C'est obligatoire pour toute opération Prisma", isCorrect: false, order: 2 },
              { label: "Pour activer le cache du client", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment appliquer les migrations en environnement de production ?",
            explanation: "prisma migrate deploy applique les migrations non exécutées sans interactif, ce qui est adapté aux pipelines CI/CD en production.",
            points: 1,
            options: [
              { label: "npx prisma migrate deploy", isCorrect: true, order: 0 },
              { label: "npx prisma migrate dev", isCorrect: false, order: 1 },
              { label: "npx prisma migrate prod", isCorrect: false, order: 2 },
              { label: "npx prisma deploy", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment peupler la base de données avec des données de test via Prisma ?",
            explanation: "Le seeding s'exécute avec npx prisma db seed. Le script doit être référencé dans la section prisma.seed de package.json. Il est idéal pour les données de démonstration.",
            points: 1,
            options: [
              { label: "npx prisma db seed (avec un script dans prisma/seed.ts)", isCorrect: true, order: 0 },
              { label: "npx prisma seed push", isCorrect: false, order: 1 },
              { label: "npx prisma db populate", isCorrect: false, order: 2 },
              { label: "npx prisma migrate seed", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'JWT et Authentification',
      durationMin: 55,
      contentMarkdown: `# JWT et Authentification

## Introduction

L'authentification est un pilier de toute API sécurisée. JSON Web Token (JWT) est un standard open-source pour créer des jetons d'accès signés qui permettent d'identifier un utilisateur sans maintenir de session côté serveur.

---

## 1. Le Flux d'Authentification JWT

Le fonctionnement en 3 étapes :

1. **Inscription** : l'utilisateur envoie email + mot de passe → le serveur hash le mot de passe et crée l'utilisateur
2. **Connexion** : l'utilisateur envoie email + mot de passe → le serveur vérifie et retourne un token JWT
3. **Requêtes protégées** : le client envoie le token dans le header \`Authorization: Bearer <token>\` → le serveur vérifie le token

\`\`\`typescript
// src/routes/auth.routes.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// INSCRIPTION
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: 'Email déjà utilisé' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '15m' });
  res.status(201).json({ user: { id: user.id, email: user.email }, token });
});

// CONNEXION
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }

  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '15m' });
  res.json({ user: { id: user.id, email: user.email }, token });
});
\`\`\`

---

## 2. Structure du Token JWT

Un JWT est composé de 3 parties séparées par des points : \`header.payload.signature\`

\`\`\`typescript
// Création d'un token
const token = jwt.sign(
  { sub: user.id, role: user.role },  // payload
  JWT_SECRET,                         // clé secrète
  { expiresIn: '15m' }               // options
);

// Vérification et décodage
interface JwtPayload {
  sub: number;
  role: string;
  iat: number;
  exp: number;
}

try {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  console.log(decoded.sub); // ID de l'utilisateur
} catch (err) {
  // Token expiré ou invalide
}
\`\`\`

---

## 3. Middleware Guard (Protection des routes)

Un middleware d'authentification vérifie le token de chaque requête :

\`\`\`typescript
// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: string;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: number; role: string };
    req.userId = payload.sub;
    req.userRole = payload.role;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
}

// Middleware d'autorisation basé sur le rôle
export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Accès interdit' });
    }
    next();
  };
}

// Utilisation
router.delete('/api/posts/:id', authenticate, requireRole('ADMIN'), deletePost);
\`\`\`

---

## 4. Refresh Tokens

Les access tokens expirent rapidement (15 min). Un refresh token (plus long, 7 jours) permet de régénérer un access token sans reconnecter l'utilisateur :

\`\`\`typescript
// Génération de deux tokens
const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '15m' });
const refreshToken = jwt.sign({ sub: user.id }, REFRESH_SECRET, { expiresIn: '7d' });

// Stocker le refresh token en base (optionnel mais recommandé)
await prisma.refreshToken.create({
  data: {
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

// Route de rafraîchissement
router.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token manquant' });
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { sub: number };

    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!stored || stored.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Refresh token invalide ou expiré' });
    }

    const newAccessToken = jwt.sign({ sub: payload.sub }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(401).json({ error: 'Refresh token invalide' });
  }
});
\`\`\`

---

## 5. Validation et Sécurité

\`\`\`typescript
// Validation avec zod (recommandé)
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit faire au moins 8 caractères'),
  name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
});

router.post('/register', async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }
  // result.data est typé et validé
});
\`\`\`

**Bonnes pratiques de sécurité :**
- Toujours hasher les mots de passe avec \`bcrypt.hash(password, 12)\`
- Ne jamais exposer le mot de passe hashé dans la réponse
- Utiliser des secrets forts (≥ 32 caractères) en production
- Implémenter un rate limiting sur les routes d'authentification
- Valider toutes les entrées avec un schéma (zod)

---

## Pièges courants

- **Utiliser le même secret pour access et refresh tokens** : si le secret est compromis, les deux types de tokens sont vulnérables
- **Ne pas vérifier l'expiration d'un JWT** : \`jwt.verify\` vérifie automatiquement \`exp\`, mais ne pas appeler cette fonction = vulnérabilité
- **Exposer le mot de passe hashé dans la réponse** : toujours utiliser \`select\` pour exclure \`password\` des réponses
- **Tokens sans expiration** : \`{ expiresIn }\` est obligatoire en production, sinon un token volé est valide indéfiniment
- **Ne pas invalider les refresh tokens** : stocker et vérifier les refresh tokens en base permet de les révoquer en cas de compromission`,
      exercise: {
        title: "Quiz - JWT et Authentification",
        passingScorePercent: 70,
        questions: [
          {
            prompt: "De quelles parties est composé un JSON Web Token (JWT) ?",
            explanation: "Un JWT est une chaîne de 3 segments encodés en Base64, séparés par des points : le header (algorithme + type), le payload (données) et la signature (intégrité).",
            points: 2,
            options: [
              { label: "Header, Payload, Signature", isCorrect: true, order: 0 },
              { label: "Username, Password, Token", isCorrect: false, order: 1 },
              { label: "ID, Secret, Expiry", isCorrect: false, order: 2 },
              { label: "Key, Value, Hash", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi les access tokens sont-ils typiquement courts (15 min) et les refresh tokens longs (7 jours) ?",
            explanation: "Un access token court limite la fenêtre d'exploitation en cas de vol. Le refresh token permet de renouveler l'accès sans déranger l'utilisateur, tout en pouvant être révoqué en cas de compromission.",
            points: 2,
            options: [
              { label: "Limiter la fenêtre d'exploitation d'un token volé tout en restant pratique", isCorrect: true, order: 0 },
              { label: "Parce que JWT ne supporte pas les durées longues", isCorrect: false, order: 1 },
              { label: "C'est uniquement une convention, pas technique", isCorrect: false, order: 2 },
              { label: "Pour réduire la taille du token", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment s'appelle le type de requête HTTP pour l'authentification JWT ?",
            explanation: "Le schéma Bearer dans le header Authorization est le standard OAuth 2.0. Le client envoie 'Authorization: Bearer <token>' pour chaque requête authentifiée.",
            points: 1,
            options: [
              { label: "Authorization: Bearer <token>", isCorrect: true, order: 0 },
              { label: "X-Auth-Token: <token>", isCorrect: false, order: 1 },
              { label: "Token: <token>", isCorrect: false, order: 2 },
              { label: "Cookie: jwt=<token>", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi doit-on hasher les mots de passe avec bcrypt plutôt que les stocker en clair ?",
            explanation: "bcrypt applique un hashing salté avec un facteur de coût configurable. Même si la base est compromise, les mots de passe hashés sont extrêmement difficiles à inverser grâce au salt et à la lenteur calcul intentionnelle.",
            points: 2,
            options: [
              { label: "bcrypt applique un hashing salté et coûteux à inverser", isCorrect: true, order: 0 },
              { label: "bcrypt chiffre les mots de passe de manière réversible", isCorrect: false, order: 1 },
              { label: "bcrypt est plus rapide que SHA-256", isCorrect: false, order: 2 },
              { label: "C'est juste une convention, tout hash suffit", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est le rôle du middleware 'authenticate' dans une API Express ?",
            explanation: "Le middleware authenticate intercepte chaque requête protégée, vérifie la validité du token JWT, extrait l'identifiant utilisateur et l'attache à l'objet req pour les routes suivantes.",
            points: 1,
            options: [
              { label: "Vérifier le token et attacher userId à la requête", isCorrect: true, order: 0 },
              { label: "Créer un nouveau token pour chaque requête", isCorrect: false, order: 1 },
              { label: "Stocke les sessions côté serveur", isCorrect: false, order: 2 },
              { label: "Génère automatiquement les refresh tokens", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
  ],
  project: {
    title: 'API REST de Blog',
    instructions: `# API REST de Blog

## Objectif

Créer une API REST complète pour un blog avec authentification, gestion des articles et commentaires. L'API doit être sécurisée et suivre les bonnes pratiques REST.

---

## Fonctionnalités requises

### 1. Authentification (JWT)

- **POST /api/auth/register** : inscription (email, password, name) — retourne un access token
- **POST /api/auth/login** : connexion — retourne un access token
- **POST /api/auth/refresh** : rafraîchir l'access token via un refresh token

Le mot de passe doit être hashé avec bcrypt (cost factor 12). L'access token expire après 15 minutes. Les mots de passe ne doivent jamais apparaître dans les réponses API.

### 2. Gestion des Articles (CRUD)

- **GET /api/posts** : liste paginée avec recherche par titre
- **GET /api/posts/:id** : détail d'un article avec auteur et commentaires
- **POST /api/posts** : créer un article (authentifié)
- **PUT /api/posts/:id** : modifier son propre article (authentifié)
- **DELETE /api/posts/:id** : supprimer son propre article (authentifié)
- **GET /api/posts/my** : liste des articles de l'utilisateur connecté (authentifié)

Chaque article a : id, title, content, published (booléen), authorId, createdAt, updatedAt.

### 3. Commentaires

- **GET /api/posts/:postId/comments** : liste des commentaires d'un article
- **POST /api/posts/:postId/comments** : ajouter un commentaire (authentifié)
- **DELETE /api/comments/:id** : supprimer son propre commentaire (authentifié)

### 4. Pagination et Recherche

- **GET /api/posts?page=1&limit=10&search=node** : paginer et filtrer par titre (case-insensitive)
- La réponse doit contenir : \`{ data: Post[], meta: { page, limit, total, totalPages } }\`

### 5. Gestion des erreurs

- Toutes les erreurs doivent retourner un objet JSON \`{ error: string }\` avec le code HTTP approprié
- Les erreurs 404, 401, 403, 409, 400, 500 doivent être gérées

---

## Contraintes techniques

- **Runtime** : Node.js avec Express
- **Language** : TypeScript
- **ORM** : Prisma avec PostgreSQL
- **Authentification** : JWT (jsonwebtoken) + bcrypt
- **Validation** : Zod pour valider les entrées
- **Structure** : séparation controllers / routes / middleware / prisma

### Structure de dossiers attendue

\`\`\`
src/
  index.ts
  app.ts
  routes/
    auth.routes.ts
    posts.routes.ts
    comments.routes.ts
  controllers/
    auth.controller.ts
    posts.controller.ts
    comments.controller.ts
  middleware/
    auth.ts
    errorHandler.ts
    validate.ts
  lib/
    prisma.ts
    jwt.ts
prisma/
  schema.prisma
  seed.ts
\`\`\`

---

## Données de test (Seed)

Le script de seed doit créer :
- Un utilisateur admin (admin@blog.com / admin123)
- Un utilisateur normal (user@blog.com / user123)
- 5 articles de test (3 publiés, 2 brouillons)
- 8 commentaires répartis sur les articles

---

## Évaluation

Le projet sera évalué sur les critères suivants :

1. **Fonctionnalités** : toutes les routes requises sont implémentées et fonctionnelles
2. **Sécurité** : mots de passe hashés, JWT correctement implémenté, routes protégées fonctionnelles, refresh tokens
3. **Architecture** : séparation controllers/routes/middleware, code modulaire, structure claire
4. **Qualité du code** : TypeScript strict, validation des entrées (Zod), gestion d'erreurs centralisée, code propre
5. **Base de données** : schéma Prisma bien structuré, migrations applicées, seed fonctionnel`,
    evaluationCriteria: [
      'Fonctionnalités (toutes les routes REST sont implémentées et testées)',
      'Sécurité (JWT, bcrypt, refresh tokens, routes protégées)',
      'Architecture (séparation controllers/routes/middleware, code modulaire)',
      'Qualité du code (TypeScript strict, validation Zod, gestion d\'erreurs)',
      'Base de données (schéma Prisma, migrations, seed, bonnes requêtes)',
    ],
  },
};
