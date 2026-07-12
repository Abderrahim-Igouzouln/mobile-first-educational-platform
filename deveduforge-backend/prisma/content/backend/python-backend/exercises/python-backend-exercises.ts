const exercises = [
  {
    "title": "Quiz - Introduction a Python et FastAPI",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est l'outil de documentation automatique integre a FastAPI ?",
        "explanation": "FastAPI genere automatiquement une interface Swagger UI sur /docs et ReDoc sur /redoc. Ces outils permettent de tester l'API directement depuis le navigateur sans outil externe.",
        "points": 2,
        "options": [
          { "label": "Swagger UI accessible sur /docs", "isCorrect": true, "order": 0 },
          { "label": "Postman genere automatiquement", "isCorrect": false, "order": 1 },
          { "label": "FastAPI ne genere aucune documentation", "isCorrect": false, "order": 2 },
          { "label": "GraphQL Playground", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel role joue Pydantic dans une application FastAPI ?",
        "explanation": "Pydantic valide et serialise automatiquement les donnees entrees et sorties. Si les donnees ne correspondent pas au schema defini, FastAPI renvoie une erreur 422 avec les details de validation.",
        "points": 2,
        "options": [
          { "label": "Validation et serialisation automatique des donnees", "isCorrect": true, "order": 0 },
          { "label": "Connexion a la base de donnees", "isCorrect": false, "order": 1 },
          { "label": "Gestion des templates HTML", "isCorrect": false, "order": 2 },
          { "label": "Authentification des utilisateurs", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la difference entre 'def' et 'async def' pour une route FastAPI ?",
        "explanation": "Avec 'async def', FastAPI gere la route dans un event loop et ne la bloque pas pendant les appels reseau. Avec 'def' classique, la route est bloquante. Utilisez async pour les appels HTTP, BDD, fichiers distants.",
        "points": 2,
        "options": [
          { "label": "async def ne bloque pas pendant les appels reseau ; def est bloquant", "isCorrect": true, "order": 0 },
          { "label": "async def est toujours plus rapide", "isCorrect": false, "order": 1 },
          { "label": "def n'est pas supporte par FastAPI", "isCorrect": false, "order": 2 },
          { "label": "Il n'y a aucune difference", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment lancez-vous un serveur FastAPI en mode rechargement automatique ?",
        "explanation": "L'option --reload de uvicorn surveille les fichiers source et redemarre automatiquement le serveur lors de modifications. Indispensable pendant le developpement.",
        "points": 1,
        "options": [
          { "label": "uvicorn main:app --reload", "isCorrect": true, "order": 0 },
          { "label": "python main.py run", "isCorrect": false, "order": 1 },
          { "label": "fastapi start --watch", "isCorrect": false, "order": 2 },
          { "label": "npm run dev", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans Pydantic, que fait le parametre 'ge=13' dans un champ Integer ?",
        "explanation": "ge signifie 'greater than or equal' (superieur ou egal). Field(age: int, ge=13) impose que la valeur d'age soit au minimum 13. Sinon, Pydantic leve une erreur de validation.",
        "points": 1,
        "options": [
          { "label": "Impose que la valeur soit superieure ou egale a 13", "isCorrect": true, "order": 0 },
          { "label": "Definit 13 comme valeur par defaut", "isCorrect": false, "order": 1 },
          { "label": "Limite la longueur du champ a 13 caracteres", "isCorrect": false, "order": 2 },
          { "label": "C'est un alias pour le champ age", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - CRUD avec SQLAlchemy et PostgreSQL",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est le role d'Alembic dans un projet SQLAlchemy ?",
        "explanation": "Alembic gere les migrations de base de donnees. Il detecte les changements dans le schema SQLAlchemy et genere les fichiers SQL correspondants pour mettre a jour la base sans perdre les donnees.",
        "points": 2,
        "options": [
          { "label": "Gerer les migrations du schema de la base de donnees", "isCorrect": true, "order": 0 },
          { "label": "Installer les dependances Python", "isCorrect": false, "order": 1 },
          { "label": "Conteneuriser l'application", "isCorrect": false, "order": 2 },
          { "label": "Genere automatiquement les routes API", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi utilise-t-on 'asyncpg' comme driver de base de donnees dans un projet async ?",
        "explanation": "asyncpg est un driver PostgreSQL asynchrone performant. Il evite de bloquer l'event loop pendant les operations de base de donnees, ce qui est essentiel pour les applications FastAPI asynchrones.",
        "points": 2,
        "options": [
          { "label": "C'est un driver async qui ne bloque pas l'event loop", "isCorrect": true, "order": 0 },
          { "label": "C'est le seul driver compatible avec SQLAlchemy", "isCorrect": false, "order": 1 },
          { "label": "Il est plus lent mais plus fiable", "isCorrect": false, "order": 2 },
          { "label": "Il remplace PostgreSQL", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que fait la commande 'alembic upgrade head' ?",
        "explanation": "Cette commande applique toutes les migrations non encore appliquees, amenant la base au dernier etat du schema (head). C'est equivalent a 'appliquer toutes les modifications en attente'.",
        "points": 2,
        "options": [
          { "label": "Applique toutes les migrations en attente jusqu'au dernier schema", "isCorrect": true, "order": 0 },
          { "label": "Supprime toutes les donnees de la base", "isCorrect": false, "order": 1 },
          { "label": "Cree une nouvelle base de donnees", "isCorrect": false, "order": 2 },
          { "label": "Mise a jour Python et ses dependances", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans SQLAlchemy, que fait 'await session.refresh(produit)' apres un commit ?",
        "explanation": "refresh() recharge les attributs de l'objet depuis la base de donnees. C'est utile apres un commit pour recuperer les valeurs generees automatiquement (id, timestamps, defaults).",
        "points": 1,
        "options": [
          { "label": "Recharge les attributs de l'objet depuis la base", "isCorrect": true, "order": 0 },
          { "label": "Annule la derniere modification", "isCorrect": false, "order": 1 },
          { "label": "Ferme la connexion a la base", "isCorrect": false, "order": 2 },
          { "label": "Cree un nouvel objet identique", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans une route FastAPI, que fait 'raise HTTPException(status_code=404, detail=\"...\")' ?",
        "explanation": "HTTPException interrompt l'execution de la route et renvoie une reponse HTTP avec le code et le detail specifies. FastAPI la convertit automatiquement en reponse JSON avec le bon code de statut.",
        "points": 1,
        "options": [
          { "label": "Interrompt la route et renvoie une erreur HTTP avec le code specifie", "isCorrect": true, "order": 0 },
          { "label": "Log l'erreur dans la console", "isCorrect": false, "order": 1 },
          { "label": "Redirige vers une page d'erreur", "isCorrect": false, "order": 2 },
          { "label": "Renvoie une reponse 200 avec un message d'erreur", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Authentification et Securite",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel package Python est utilise pour hasher les mots de passe avec l'algorithme bcrypt ?",
        "explanation": "passlib est le package qui fournit CryptContext, permettant d'utiliser bcrypt pour hasher les mots de passe. bcrypt ajoute un salt automatiquement et rend le cracking tres couteux en calcul.",
        "points": 2,
        "options": [
          { "label": "passlib avec CryptContext(schemes=['bcrypt'])", "isCorrect": true, "order": 0 },
          { "label": "hashlib.hash('bcrypt', password)", "isCorrect": false, "order": 1 },
          { "label": "bcrypt.hash(password)", "isCorrect": false, "order": 2 },
          { "label": "security.encrypt(password)", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que fait le parametre 'allow_origins' dans la configuration CORS de FastAPI ?",
        "explanation": "allow_origins definit la liste des domaines autorises a effectuer des requetes cross-origin vers votre API. En production, ne jamais utiliser ['*'] car cela ouvre l'API a tous les domaines.",
        "points": 2,
        "options": [
          { "label": "Definit les domaines autorises a faire des requetes cross-origin", "isCorrect": true, "order": 0 },
          { "label": "Definit les domaines bloques par le pare-feu", "isCorrect": false, "order": 1 },
          { "label": "Configure les redirections d'URL", "isCorrect": false, "order": 2 },
          { "label": "Gere les certificats SSL", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel est le contenu du header Authorization pour un token JWT ?",
        "explanation": "Le format standard est 'Bearer <token>'. Le schema Bearer est defini par OAuth 2.0. FastAPI avec OAuth2PasswordBearer attend ce format et extrait automatiquement le token.",
        "points": 1,
        "options": [
          { "label": "Bearer <token>", "isCorrect": true, "order": 0 },
          { "label": "Token <token>", "isCorrect": false, "order": 1 },
          { "label": "JWT <token>", "isCorrect": false, "order": 2 },
          { "label": "Auth <token>", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que se passe-t-il si un JWT est expire lors de la verification ?",
        "explanation": "python-jose (ou pyjwt) leve une exception JWTError lors de la verification d'un token expire. Dans le code, cette exception est catchee et une erreur 401 est renvoyee au client.",
        "points": 2,
        "options": [
          { "label": "Une exception JWTError est levee et une erreur 401 est renvoyee", "isCorrect": true, "order": 0 },
          { "label": "Le token est automatiquement rafraichi", "isCorrect": false, "order": 1 },
          { "label": "Le token est considere valide", "isCorrect": false, "order": 2 },
          { "label": "L'application plante", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi est-il deconseille d'utiliser SHA-256 directement pour hasher les mots de passe ?",
        "explanation": "SHA-256 est un hash rapide et sans salt. Les attaques par dictionnaire et rainbow tables sont tres efficaces contre SHA-256. bcrypt est intentionnellement lent et ajoute un salt, rendant le cracking bien plus difficile.",
        "points": 1,
        "options": [
          { "label": "SHA-256 est trop rapide et n'ajoute pas de salt", "isCorrect": true, "order": 0 },
          { "label": "SHA-256 n'est pas disponible en Python", "isCorrect": false, "order": 1 },
          { "label": "SHA-256 est trop lent pour la production", "isCorrect": false, "order": 2 },
          { "label": "SHA-256 est reserve aux certificats SSL", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Tests et Deploiement",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel outil Python est utilise pour executer les tests automatiquement ?",
        "explanation": "pytest est le framework de tests le plus populaire en Python. Il offre une syntaxe simple, le support des fixtures, la parametrisation et de nombreux plugins (pytest-cov, pytest-asyncio).",
        "points": 2,
        "options": [
          { "label": "pytest", "isCorrect": true, "order": 0 },
          { "label": "unittest only", "isCorrect": false, "order": 1 },
          { "label": "npm test", "isCorrect": false, "order": 2 },
          { "label": "python test.py", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un Dockerfile, que fait 'COPY requirements.txt . && pip install --no-cache-dir -r requirements.txt' ?",
        "explanation": "Ces commandes copient le fichier de dependances dans le conteneur et installent les packages Python. L'option --no-cache-dir evite de stocker les fichiers de cache pip, reduisant la taille de l'image Docker.",
        "points": 2,
        "options": [
          { "label": "Installe les dependances Python dans le conteneur sans cache", "isCorrect": true, "order": 0 },
          { "label": "Cree un environnement virtuel Python", "isCorrect": false, "order": 1 },
          { "label": "Compile le code Python en code machine", "isCorrect": false, "order": 2 },
          { "label": "Installe les dependances globales du systeme", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans FastAPI, que fait la classe TestClient du module fastapi.testclient ?",
        "explanation": "TestClient permet de tester des routes FastAPI sans demarrer un vrai serveur HTTP. Il simule des requetes HTTP et retourne des reponses, ce qui rend les tests rapides et isoles.",
        "points": 2,
        "options": [
          { "label": "Simule des requetes HTTP vers l'application sans serveur reseau", "isCorrect": true, "order": 0 },
          { "label": "Demarre un serveur de test sur un port different", "isCorrect": false, "order": 1 },
          { "label": "Genere automatiquement les tests a partir du code", "isCorrect": false, "order": 2 },
          { "label": "Teste uniquement les connexions base de donnees", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi installe-t-on 'gcc' et 'libpq-dev' dans le Dockerfile d'une application Python avec PostgreSQL ?",
        "explanation": "Ces packages sont necessaires pour compiler asyncpg (le driver PostgreSQL async) qui contient du code C. Sans eux, l'installation de pip echoue pendant la compilation.",
        "points": 1,
        "options": [
          { "label": "Necessaires pour compiler asyncpg qui contient du code C natif", "isCorrect": true, "order": 0 },
          { "label": "Pour accelerer le serveur FastAPI", "isCorrect": false, "order": 1 },
          { "label": "Ce sont des dependances Python caches", "isCorrect": false, "order": 2 },
          { "label": "Pour gerer les certificats SSL", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un projet avec pytest, que fait un decorateur '@pytest.fixture' ?",
        "explanation": "Un fixture est une fonction qui prepare des donnees ou des ressources avant un test. Elle peut etre partagee entre plusieurs tests et automatiquement appelee quand un test declare ce fixture comme parametre.",
        "points": 1,
        "options": [
          { "label": "Definit une ressource partagee utilisee par les tests comme parametre", "isCorrect": true, "order": 0 },
          { "label": "Marque un test comme etant obligatoire", "isCorrect": false, "order": 1 },
          { "label": "Active le mode verbose de pytest", "isCorrect": false, "order": 2 },
          { "label": "Definit un test a ignorer temporairement", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  }
];

export default exercises;
