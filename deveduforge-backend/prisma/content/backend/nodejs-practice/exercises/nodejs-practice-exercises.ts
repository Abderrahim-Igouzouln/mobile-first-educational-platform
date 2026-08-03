const exercises = [
  {
    "title": "Quiz - Environnement Node.js",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle commande initialise un nouveau projet Node.js avec un package.json par défaut ?",
        "explanation": "npm init -y crée un package.json avec des valeurs par défaut. Sans -y, npm pose des questions interactives pour remplir chaque champ.",
        "points": 2,
        "options": [
          {
            "label": "npm init -y",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "npm create app",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "node init",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "npm new project",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un module ESM (\"type\": \"module\"), comment importer une fonction depuis un fichier local ?",
        "explanation": "Les imports ESM utilisent la syntaxe statique import ... from. L'extension .js est requise dans les imports locaux en Node.js, même si le fichier source est .ts.",
        "points": 2,
        "options": [
          {
            "label": "import { maFonction } from './mon-fichier.js'",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "const { maFonction } = require('./mon-fichier')",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "import maFonction from './mon-fichier'",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "load('./mon-fichier.js')",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre une dépendance (dependencies) et une dépendance de développement (devDependencies) ?",
        "explanation": "Les dependencies sont nécessaires en production (ex: express). Les devDependencies ne sont utiles que pendant le développement (ex: typescript, vitest) et ne sont pas installées en production avec --omit=dev.",
        "points": 2,
        "options": [
          {
            "label": "dependencies = runtime ; devDependencies = développement uniquement",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Il n'y a aucune différence, les deux sont identiques",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "devDependencies sont automatiquement installées en production",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "dependencies sont optionnelles, devDependencies sont obligatoires",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment lancer un débogueur Node.js qui s'ouvre dans Chrome DevTools ?",
        "explanation": "L'option --inspect-brk démarre le débogueur et pose un breakpoint au début du script, permettant d'inspecter le code pas à pas dans chrome://inspect.",
        "points": 1,
        "options": [
          {
            "label": "node --inspect-brk src/index.ts",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "node --debug src/index.ts",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "node --devtools src/index.ts",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "node --chrome src/index.ts",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel outil permet d'exécuter du TypeScript directement sans compilation préalable ?",
        "explanation": "tsx (TypeScript Execute) est un runner qui exécute du TypeScript nativement en se basant sur esbuild. Il est plus rapide que ts-node et supporte les imports ESM.",
        "points": 1,
        "options": [
          {
            "label": "tsx",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "ts-node only",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "tsc run",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "typescript-node",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Express et Routes",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel middleware intégré à Express permet de parser automatiquement les corps de requête JSON ?",
        "explanation": "express.json() est un middleware intégré depuis Express 4.16+. Il utilise body-parser en interne pour transformer le corps JSON en objet JavaScript accessible via req.body.",
        "points": 2,
        "options": [
          {
            "label": "express.json()",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "express.urlencoded()",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "express.bodyParser()",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "express.parse()",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment récupérer le paramètre d'URL d'une route comme /api/users/:id ?",
        "explanation": "req.params contient tous les paramètres de route. Dans /api/users/:id, req.params.id contient la valeur correspondante du segment d'URL.",
        "points": 2,
        "options": [
          {
            "label": "req.params.id",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "req.query.id",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "req.body.id",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "req.path.id",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quels sont les 4 paramètres d'un gestionnaire d'erreurs Express ?",
        "explanation": "Express identifie un gestionnaire d'erreurs par sa signature exacte (err, req, res, next). Si l'un de ces paramètres manque, Express le traitera comme un middleware standard.",
        "points": 2,
        "options": [
          {
            "label": "(err, req, res, next)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "(req, res, err, next)",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "(error, request, response)",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "(req, res, next, err)",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi faut-il déclarer la route /api/articles/featured avant /api/articles/:id ?",
        "explanation": "Express évalue les routes dans l'ordre de déclaration. Si :id est déclaré en premier, 'featured' sera interprété comme un paramètre :id au lieu d'un chemin littéral.",
        "points": 1,
        "options": [
          {
            "label": "Express matche les routes dans l'ordre de déclaration",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "featured est un mot réservé d'Express",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Les routes avec des paramètres ont toujours la priorité",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "C'est une convention sans impact technique",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est le rôle de la fonction next() dans un middleware Express ?",
        "explanation": "next() passe le contrôle au middleware suivant dans la chaîne. Sans appel à next(), la requête reste bloquée et le client ne reçoit jamais de réponse.",
        "points": 1,
        "options": [
          {
            "label": "Passer le contrôle au middleware ou route suivant(e)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Terminer la requête et envoyer la réponse",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Rediriger vers une autre route",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Rejeter la requête HTTP",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Prisma ORM",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle commande crée une nouvelle migration Prisma après une modification du schéma ?",
        "explanation": "prisma migrate dev crée un fichier SQL de migration, l'applique à la base de développement, et régénère le client Prisma. L'option --name permet de nommer la migration.",
        "points": 2,
        "options": [
          {
            "label": "npx prisma migrate dev --name nom-migration",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "npx prisma generate",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "npx prisma db push",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "npx prisma schema push",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre findUnique et findFirst chez Prisma ?",
        "explanation": "findUnique ne peut interroger que des champs marqués @unique et retourne un seul résultat. findFirst accepte n'importe quel filtre (where) et retourne le premier résultat correspondant.",
        "points": 2,
        "options": [
          {
            "label": "findUnique = champs @unique uniquement ; findFirst = n'importe quel filtre",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "findUnique est plus rapide que findFirst",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "findFirst retourne un tableau, findUnique retourne un objet",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Ils sont identiques, c'est juste un alias",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi doit-on utiliser $transaction quand on effectue plusieurs opérations liées ?",
        "explanation": "Une transaction garantit que toutes les opérations sont atomiques : soit elles réussissent toutes, soit aucune n'est appliquée. Sans transaction, une erreur partielle laisse la base dans un état incohérent.",
        "points": 2,
        "options": [
          {
            "label": "Pour garantir l'atomicité des opérations",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour améliorer les performances",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "C'est obligatoire pour toute opération Prisma",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour activer le cache du client",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment appliquer les migrations en environnement de production ?",
        "explanation": "prisma migrate deploy applique les migrations non exécutées sans interactif, ce qui est adapté aux pipelines CI/CD en production.",
        "points": 1,
        "options": [
          {
            "label": "npx prisma migrate deploy",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "npx prisma migrate dev",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "npx prisma migrate prod",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "npx prisma deploy",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment peupler la base de données avec des données de test via Prisma ?",
        "explanation": "Le seeding s'exécute avec npx prisma db seed. Le script doit être référencé dans la section prisma.seed de package.json. Il est idéal pour les données de démonstration.",
        "points": 1,
        "options": [
          {
            "label": "npx prisma db seed (avec un script dans prisma/seed.ts)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "npx prisma seed push",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "npx prisma db populate",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "npx prisma migrate seed",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - JWT et Authentification",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "De quelles parties est composé un JSON Web Token (JWT) ?",
        "explanation": "Un JWT est une chaîne de 3 segments encodés en Base64, séparés par des points : le header (algorithme + type), le payload (données) et la signature (intégrité).",
        "points": 2,
        "options": [
          {
            "label": "Header, Payload, Signature",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Username, Password, Token",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "ID, Secret, Expiry",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Key, Value, Hash",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi les access tokens sont-ils typiquement courts (15 min) et les refresh tokens longs (7 jours) ?",
        "explanation": "Un access token court limite la fenêtre d'exploitation en cas de vol. Le refresh token permet de renouveler l'accès sans déranger l'utilisateur, tout en pouvant être révoqué en cas de compromission.",
        "points": 2,
        "options": [
          {
            "label": "Limiter la fenêtre d'exploitation d'un token volé tout en restant pratique",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Parce que JWT ne supporte pas les durées longues",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "C'est uniquement une convention, pas technique",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour réduire la taille du token",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment s'appelle le type de requête HTTP pour l'authentification JWT ?",
        "explanation": "Le schéma Bearer dans le header Authorization est le standard OAuth 2.0. Le client envoie 'Authorization: Bearer <token>' pour chaque requête authentifiée.",
        "points": 1,
        "options": [
          {
            "label": "Authorization: Bearer <token>",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "X-Auth-Token: <token>",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Token: <token>",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Cookie: jwt=<token>",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi doit-on hasher les mots de passe avec bcrypt plutôt que les stocker en clair ?",
        "explanation": "bcrypt applique un hashing salté avec un facteur de coût configurable. Même si la base est compromise, les mots de passe hashés sont extrêmement difficiles à inverser grâce au salt et à la lenteur calcul intentionnelle.",
        "points": 2,
        "options": [
          {
            "label": "bcrypt applique un hashing salté et coûteux à inverser",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "bcrypt chiffre les mots de passe de manière réversible",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "bcrypt est plus rapide que SHA-256",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "C'est juste une convention, tout hash suffit",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est le rôle du middleware 'authenticate' dans une API Express ?",
        "explanation": "Le middleware authenticate intercepte chaque requête protégée, vérifie la validité du token JWT, extrait l'identifiant utilisateur et l'attache à l'objet req pour les routes suivantes.",
        "points": 1,
        "options": [
          {
            "label": "Vérifier le token et attacher userId à la requête",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Créer un nouveau token pour chaque requête",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Stocke les sessions côté serveur",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Génère automatiquement les refresh tokens",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  }
];

export default exercises;
