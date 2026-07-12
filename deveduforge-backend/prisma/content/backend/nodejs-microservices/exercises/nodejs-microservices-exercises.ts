const exercises = [
  {
    "title": "Quiz - Architecture Microservices",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la principale difference entre une architecture monolithique et microservices en termes de deploiement ?",
        "explanation": "Dans un monolithe, tous les composants sont deployes ensemble comme un seul artefact. Dans une architecture microservices, chaque service est deploye independamment, ce qui permet des mises a jour plus frequentes et un risque reduit.",
        "points": 2,
        "options": [
          { "label": "Les microservices sont deployes independamment les uns des autres", "isCorrect": true, "order": 0 },
          { "label": "Le monolithe est toujours plus lent a deployer", "isCorrect": false, "order": 1 },
          { "label": "Les microservices ne necessitent pas de base de donnees", "isCorrect": false, "order": 2 },
          { "label": "Un monolithe ne peut pas etre containerise", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Qu'est-ce qu'un bounded context dans le Domain-Driven Design ?",
        "explanation": "Un bounded context definit une frontiere claire autour d'un sous-domaine metier. Chaque microservice correspond generalement a un bounded context et a sa propre representation du domaine.",
        "points": 2,
        "options": [
          { "label": "Une frontiere metier qui delimite le perimetre d'un service", "isCorrect": true, "order": 0 },
          { "label": "Un type de base de donnees NoSQL", "isCorrect": false, "order": 1 },
          { "label": "Un pattern de design pour les API REST", "isCorrect": false, "order": 2 },
          { "label": "Un conteneur Docker dedie a un service", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel est l'avantage principal de la communication asynchrone (evenements) par rapport a la communication synchrone (HTTP) ?",
        "explanation": "La communication asynchrone decouple l'emetteur du recepteur. Si le service destinataire est temporairement indisponible, les messages restent dans le broker et seront traites quand le service sera de nouveau disponible.",
        "points": 2,
        "options": [
          { "label": "Elle decoupe les services et ameliore la resilience", "isCorrect": true, "order": 0 },
          { "label": "Elle est toujours plus rapide que HTTP", "isCorrect": false, "order": 1 },
          { "label": "Elle ne necessite aucune infrastructure", "isCorrect": false, "order": 2 },
          { "label": "Elle garantit l'ordre de traitement des messages", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel pattern protege un systeme microservices contre les pannes en cascade ?",
        "explanation": "Le circuit breaker detecte quand un service est en panne et arrete temporairement les appels vers celui-ci, evitant ainsi de surcharger le service en panne et de propager la panne a d'autres services.",
        "points": 1,
        "options": [
          { "label": "Circuit Breaker", "isCorrect": true, "order": 0 },
          { "label": "Load Balancer", "isCorrect": false, "order": 1 },
          { "label": "Rate Limiter", "isCorrect": false, "order": 2 },
          { "label": "Cache Invalidation", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un monolithe, un bug dans le module de gestion des commandes peut affecter le module d'authentification. Comment les microservices gèrent-ils ce probleme ?",
        "explanation": "Grace a l'isolation des processus, chaque microservice s'execute dans son propre processus. Un crash dans le service de commandes n'affecte pas le service d'authentification qui continue de fonctionner normalement.",
        "points": 1,
        "options": [
          { "label": "Chaque service est isole dans son propre processus", "isCorrect": true, "order": 0 },
          { "label": "Les microservices partagent tous la meme base de donnees", "isCorrect": false, "order": 1 },
          { "label": "Un monolithe est toujours plus stable", "isCorrect": false, "order": 2 },
          { "label": "Les bug sont impossibles dans les microservices", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - API Gateway et Message Brokers",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est le role principal d'un API Gateway dans une architecture microservices ?",
        "explanation": "L'API Gateway est le point d'entree unique du systeme. Il gere le routage vers les microservices, l'authentification centree, le rate limiting et parfois le load balancing.",
        "points": 2,
        "options": [
          { "label": "Point d'entree unique qui gere le routage, l'auth et le rate limiting", "isCorrect": true, "order": 0 },
          { "label": "Remplacer tous les microservices en un seul composant", "isCorrect": false, "order": 1 },
          { "label": "Gerer uniquement le load balancing entre services", "isCorrect": false, "order": 2 },
          { "label": "Stocker les donnees de tous les services", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans RabbitMQ, quel composant route les messages vers les bonnes files d'attente ?",
        "explanation": "L'exchange recoit les messages du publisher et les route vers les queues en fonction de la routing key et du type d'exchange (direct, fanout, topic).",
        "points": 2,
        "options": [
          { "label": "L'exchange", "isCorrect": true, "order": 0 },
          { "label": "La queue", "isCorrect": false, "order": 1 },
          { "label": "Le binding", "isCorrect": false, "order": 2 },
          { "label": "Le consumer", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la difference principale entre Redis Pub/Sub et RabbitMQ ?",
        "explanation": "Redis Pub/Sub est un systeme de messaging leger sans persistance (fire-and-forget), ideale pour le temps reel. RabbitMQ est un broker de messages avec persistance, garantie de livraison et routing flexible.",
        "points": 2,
        "options": [
          { "label": "Redis Pub/Sub est sans persistance ; RabbitMQ persiste les messages", "isCorrect": true, "order": 0 },
          { "label": "RabbitMQ est plus rapide que Redis", "isCorrect": false, "order": 1 },
          { "label": "Redis ne supporte pas le publish/subscribe", "isCorrect": false, "order": 2 },
          { "label": "Les deux sont identiques en termes de fonctionnalites", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi faut-il utiliser l'option { persistent: true } lors de l'envoi de messages RabbitMQ ?",
        "explanation": "L'option persistent: true declare le message comme durable, ce qui signifie qu'il sera sauvegarde sur le disque. Si RabbitMQ redemarre, les messages durables seront recuperes, contrairement aux messages non durables qui seront perdus.",
        "points": 1,
        "options": [
          { "label": "Pour que le message survive au redemarrage du broker", "isCorrect": true, "order": 0 },
          { "label": "Pour augmenter la vitesse de traitement", "isCorrect": false, "order": 1 },
          { "label": "Pour activer le chiffrement des messages", "isCorrect": false, "order": 2 },
          { "label": "C'est obligatoire pour tous les messages", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans le pattern Saga, que se passe-t-il si une etape echoue apres plusieurs etapes reussies ?",
        "explanation": "Le pattern Saga implique des operations de compensation. Si une etape echoue, les etapes precedentes sont compensees dans l'ordre inverse (par exemple, annuler le paiement puis liberer le stock).",
        "points": 1,
        "options": [
          { "label": "Des operations de compensation annulent les etapes precedentes", "isCorrect": true, "order": 0 },
          { "label": "Toutes les etapes sont automatiquement relancees", "isCorrect": false, "order": 1 },
          { "label": "Le systeme est bloque en attendant une intervention manuelle", "isCorrect": false, "order": 2 },
          { "label": "Les etapes reussies sont conservees telles quelles", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Securite et Authentification Distribuee",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Pourquoi utilise-t-on des cles asymetriques (RSA) pour JWT dans une architecture microservices plutot qu'un secret symetrique partage ?",
        "explanation": "Avec des cles asymetriques, seule la cle privee est secrete et utilisee pour signer. La cle publique peut etre partagee a tous les services sans risque, car elle ne permet pas de creer de tokens, seulement de les verifier.",
        "points": 2,
        "options": [
          { "label": "Seul le service d'auth possede la cle privee ; les autres verifient avec la cle publique", "isCorrect": true, "order": 0 },
          { "label": "Les cles RSA sont plus rapides que les cles symetriques", "isCorrect": false, "order": 1 },
          { "label": "Un secret symetrique ne fonctionne pas avec JWT", "isCorrect": false, "order": 2 },
          { "label": "C'est uniquement une convention sans avantage technique", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel flux OAuth2 est recommande pour une application web monopage (SPA) ?",
        "explanation": "Le flux Authorization Code avec PKCE (Proof Key for Code Exchange) est recommande pour les SPA. Il evite d'exposer le client_secret dans le code JavaScript du navigateur tout en maintenant la securite du flux.",
        "points": 2,
        "options": [
          { "label": "Authorization Code avec PKCE", "isCorrect": true, "order": 0 },
          { "label": "Client Credentials", "isCorrect": false, "order": 1 },
          { "label": "Implicit Grant", "isCorrect": false, "order": 2 },
          { "label": "Resource Owner Password Credentials", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un systeme SSO, qu'advient-il d'un refresh token lorsqu'un utilisateur se deconnecte ?",
        "explanation": "Lors de la deconnexion, le refresh token est revoque (supprime du store Redis ou de la base). Toute tentative d'utiliser ce token pour rafraichir un access token echouera,forcant la re-authentification.",
        "points": 2,
        "options": [
          { "label": "Le refresh token est revoque et ne peut plus etre utilise", "isCorrect": true, "order": 0 },
          { "label": "Le refresh token continue de fonctionner pendant 24h", "isCorrect": false, "order": 1 },
          { "label": "Seul l'access token est invalide", "isCorrect": false, "order": 2 },
          { "label": "Tous les tokens des autres services sont aussi supprimes", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans le pattern de rotation des refresh tokens, que se passe-t-il quand un refresh token est utilise ?",
        "explanation": "A chaque utilisation d'un refresh token, l'ancien est invalide et un nouveau est genere. Si quelqu'un reutilise un ancien refresh token (potentiellement vole), cela est detecte et toutes les sessions de l'utilisateur sont revoquees.",
        "points": 1,
        "options": [
          { "label": "L'ancien est invalide et un nouveau est genere ; une reutilisation declenche une alerte", "isCorrect": true, "order": 0 },
          { "label": "Le meme refresh token est reconduit avec une date d'expiration etendue", "isCorrect": false, "order": 1 },
          { "label": "Plusieurs refresh tokens coexistent indefiniment", "isCorrect": false, "order": 2 },
          { "label": "Le refresh token n'est jamais change pour des raisons de performance", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi appliquer un rate limiting plus strict sur les routes de connexion (login/register) que sur les autres routes ?",
        "explanation": "Les routes d'authentification sont des cibles privilegiees pour les attaques par force brute. Un rate limiting strict (5 req/min au lieu de 100 req/15 min) limite le nombre de tentatives de connexion possible, rendant ce type d'attaque peu efficace.",
        "points": 1,
        "options": [
          { "label": "Pour prevenir les attaques par force brute sur l'authentification", "isCorrect": true, "order": 0 },
          { "label": "Parce que ces routes sont plus lentes a traiter", "isCorrect": false, "order": 1 },
          { "label": "Par convention, toutes les routes ont le meme rate limit", "isCorrect": false, "order": 2 },
          { "label": "Pour eviter la surcharge de la base de donnees uniquement", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Monitoring et Deploiement",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est l'avantage d'utiliser Winston avec le format JSON pour les logs dans une architecture microservices ?",
        "explanation": "Les logs JSON sont structurees et faciles a parser par des outils centralises comme Elasticsearch/ELK. Chaque log contient des metadonnees (service, timestamp, niveau) permettant de filtrer et rechercher efficacement.",
        "points": 2,
        "options": [
          { "label": "Les logs JSON sont structurees et faciles a centraliser/analyser avec ELK", "isCorrect": true, "order": 0 },
          { "label": "Les logs JSON sont plus courts que les logs texte", "isCorrect": false, "order": 1 },
          { "label": "Winston est le seul logger compatible avec Docker", "isCorrect": false, "order": 2 },
          { "label": "Le format JSON est requis par la loi", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans OpenTelemetry, quelle est la difference entre un trace et un span ?",
        "explanation": "Un trace represente le parcours complet d'une requete a travers plusieurs services. Un span est une unite de travail individuelle dans ce parcours (ex: un appel de base de donnees, un appel HTTP inter-service).",
        "points": 2,
        "options": [
          { "label": "Un trace est le parcours complet ; un span est une unite de travail dans ce parcours", "isCorrect": true, "order": 0 },
          { "label": "Un span est la meme chose qu'un trace mais plus court", "isCorrect": false, "order": 1 },
          { "label": "Un trace est cote client ; un span est cote serveur", "isCorrect": false, "order": 2 },
          { "label": "Les deux termes sont interchangeables", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans Docker Compose, que signifie 'condition: service_healthy' dans depends_on ?",
        "explanation": "Cette option attend que le service dependant ait passe son healthcheck avant de demarrer. Cela evite qu'un service tente de se connecter a une base de donnees pas encore prete.",
        "points": 2,
        "options": [
          { "label": "Attendre que le service dependant soit pret (healthcheck OK) avant de demarrer", "isCorrect": true, "order": 0 },
          { "label": "Demarrer tous les services en meme temps sans attendre", "isCorrect": false, "order": 1 },
          { "label": "Redemarrer le service s'il n'est pas healthy", "isCorrect": false, "order": 2 },
          { "label": "Ignorer les erreurs de demarrage du service", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la difference entre un health check de type 'liveness' et 'readiness' ?",
        "explanation": "Le liveness verifie que le service est vivant (repond aux requetes). Le readiness verifie que le service est pret a recevoir du trafic (toutes les dependances sont OK). Un service peut etre vivant mais pas pret (ex: en cours de migration de base).",
        "points": 1,
        "options": [
          { "label": "Liveness = le service est vivant ; Readiness = le service est pret pour le trafic", "isCorrect": true, "order": 0 },
          { "label": "Liveness est cote client ; Readiness est cote serveur", "isCorrect": false, "order": 1 },
          { "label": "Ce sont les deux noms du meme type de health check", "isCorrect": false, "order": 2 },
          { "label": "Readiness verifie la base ; Liveness verifie le reseau", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi est-il important que chaque microservice ait sa propre base de donnees dediee ?",
        "explanation": "La base de donnees dediee garantit le decouplage total entre services. Un service peut changer son schema de donnees sans impacter les autres. C'est un principe fondamental des microservices : 'database per service'.",
        "points": 1,
        "options": [
          { "label": "Pour garantir le decouplage : chaque service gere ses propres donnees", "isCorrect": true, "order": 0 },
          { "label": "Pour reduire le cout de l'infrastructure", "isCorrect": false, "order": 1 },
          { "label": "Parce qu'un seul serveur ne peut pas gerer plusieurs bases", "isCorrect": false, "order": 2 },
          { "label": "C'est optionnel, on peut partager une base entre services", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  }
];

export default exercises;
