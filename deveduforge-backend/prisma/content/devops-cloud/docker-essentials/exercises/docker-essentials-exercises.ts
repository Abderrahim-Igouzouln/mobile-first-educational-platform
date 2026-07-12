const exercises = [
  {
    "title": "Quiz - Conteneurisation",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la principale différence entre une machine virtuelle et un conteneur Docker ?",
        "explanation": "Les VM encapsulent un OS complet avec hyperviseur, tandis que les conteneurs partagent le noyau de l'hôte. C'est ce qui rend les conteneurs bien plus légers et rapides à démarrer.",
        "points": 2,
        "options": [
          {
            "label": "Les conteneurs partagent le noyau de l'hôte, les VM ont leur propre OS",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Les conteneurs sont plus lents mais plus sécurisés",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Les VM utilisent Docker et les conteneurs utilisent Hyper-V",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Il n'y a aucune différence, ce sont deux termes synonymes",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle commande lance un conteneur Node.js en arrière-plan sur le port 8080 ?",
        "explanation": "Le flag -d (detached) lance le conteneur en arrière-plan. Le flag -p mappe le port de l'hôte vers le conteneur (hôte:conteneur).",
        "points": 2,
        "options": [
          {
            "label": "docker run -d -p 8080:3000 node:20-alpine",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "docker start -p 8080 node:20-alpine",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "docker run -it node:20-alpine 8080",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "docker create node:20-alpine --port 8080",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Que fait la commande docker exec -it mon-app sh ?",
        "explanation": "docker exec exécute une commande dans un conteneur déjà en cours d'exécution. Le flag -it ouvre un terminal interactif. sh lance un shell dans le conteneur.",
        "points": 1,
        "options": [
          {
            "label": "Ouvre un shell interactif dans le conteneur en cours",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Crée un nouveau conteneur avec un shell",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Supprime le conteneur mon-app",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Redémarre le conteneur avec un shell",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi préfère-t-on les images Alpine (ex: node:20-alpine) aux images standard ?",
        "explanation": "Les images Alpine sont basées sur Alpine Linux, une distribution minimale. Elles pèsent environ 50 Mo contre 300+ Mo pour les images Debian, ce qui réduit le temps de téléchargement et la surface d'attaque.",
        "points": 2,
        "options": [
          {
            "label": "Elles sont beaucoup plus légères (environ 50 Mo vs 300+ Mo)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Elles contiennent plus de bibliothèques pré-installées",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Elles sont obligatoires pour Docker",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Elles n'utilisent pas de noyau Linux",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Que signifie docker stop mon-app par rapport à docker rm mon-app ?",
        "explanation": "docker stop arrête l'exécution du conteneur (il reste visible avec docker ps -a). docker rm supprime définitivement le conteneur du système. Il faut d'abord stopper avant de rm.",
        "points": 1,
        "options": [
          {
            "label": "stop arrête le processus, rm supprime le conteneur",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "stop et rm font exactement la même chose",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "rm arrête le conteneur, stop le supprime",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "stop supprime les données, rm arrête le processus",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Dockerfile",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la différence principale entre CMD et ENTRYPOINT dans un Dockerfile ?",
        "explanation": "CMD définit une commande par défaut qui peut être remplacée au docker run. ENTRYPOINT définit un exécutable fixe qui s'exécutera toujours ; les arguments de docker run sont ajoutés après.",
        "points": 2,
        "options": [
          {
            "label": "CMD est écrasable au docker run, ENTRYPOINT ne l'est pas",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "CMD est pour Linux, ENTRYPOINT pour Windows",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "ENTRYPOINT doit toujours être en premier dans le Dockerfile",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "CMD exécute la commande au runtime, ENTRYPOINT au build",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi copier package.json avant COPY . . dans un Dockerfile Node.js ?",
        "explanation": "package.json change moins souvent que le code source. En le copiant d'abord et en installant les dépendances, Docker met en cache cette couche. Seules les couches suivantes sont re-construites quand le code change.",
        "points": 2,
        "options": [
          {
            "label": "Pour profiter du cache Docker quand seul le code change",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Parce que COPY . . ne peut pas être utilisé en premier",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour éviter les erreurs de permissions",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Parce que npm ci a besoin de package.json en premier",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est l'avantage principal d'un multi-stage build ?",
        "explanation": "Les multi-stage builds séparent la compilation (qui nécessite des outils lourds) de l'image finale (qui ne contient que les artefacts). Cela réduit drastiquement la taille de l'image et la surface d'attaque.",
        "points": 2,
        "options": [
          {
            "label": "Réduire la taille de l'image finale en séparant build et production",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Permettre d'utiliser plusieurs bases d'OS",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Accélérer le téléchargement de l'image de base",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Permettre l'exécution de plusieurs conteneurs",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "À quoi sert le fichier .dockerignore ?",
        "explanation": ".dockerignore exclut des fichiers du contexte envoyé au daemon Docker. Sans lui, des dossiers lourds (node_modules) ou sensibles (.env) seraient copiés dans l'image.",
        "points": 1,
        "options": [
          {
            "label": "Exclure des fichiers du contexte de construction de l'image",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Ignorer les erreurs lors de la construction",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Filtrer les logs du conteneur",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Configurer les variables d'environnement du conteneur",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi la forme exec de CMD (CMD [\"node\", \"server.js\"]) est-elle préférée à la forme shell (CMD node server.js) ?",
        "explanation": "La forme exec lance le processus directement comme PID 1, recevant les signaux (SIGTERM) du Docker daemon. La forme shell passe par /bin/sh -c, interceptant les signaux et empêchant l'arrêt gracieux.",
        "points": 1,
        "options": [
          {
            "label": "Le processus reçoit directement les signaux SIGTERM pour un arrêt gracieux",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Elle est plus rapide à exécuter",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Elle consomme moins de mémoire",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Elle permet d'utiliser des variables d'environnement",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Docker Compose",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Dans docker-compose.yml, quelle clé définit les services du projet ?",
        "explanation": "La clé 'services' contient la définition de chaque conteneur du projet. C'est le cœur d'un fichier docker-compose.yml.",
        "points": 1,
        "options": [
          {
            "label": "services",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "containers",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "instances",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "apps",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment un conteneur API peut-il accéder à un conteneur PostgreSQL dans le même docker-compose.yml ?",
        "explanation": "Dans Compose, chaque service est accessible via son nom de service comme hostname. L'API peut se connecter à postgres://postgres:5432, le nom 'postgres' résolvant vers le conteneur correspondant via le réseau DNS interne de Docker.",
        "points": 2,
        "options": [
          {
            "label": "En utilisant le nom du service comme hostname (ex: postgres)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "En utilisant l'IP publique du conteneur",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "En montant un fichier de configuration partagé",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "En utilisant localhost",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre un volume nommé et un bind mount ?",
        "explanation": "Un volume nommé est géré par Docker et persiste indépendamment du cycle de vie des conteneurs. Un bind mount lie un dossier de l'hôte au conteneur, utile pour le développement avec hot-reload.",
        "points": 2,
        "options": [
          {
            "label": "Volume nommé : géré par Docker ; bind mount : lie un dossier local",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Volume nommé : temporaire ; bind mount : permanent",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Volume nommé : pour Windows ; bind mount : pour Linux",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Il n'y a aucune différence fonctionnelle",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Que fait docker compose down -v par rapport à docker compose down ?",
        "explanation": "docker compose down arrête les conteneurs et supprime les réseaux. L'option -v supprime également les volumes nommés, ce qui entraîne la perte des données persistées.",
        "points": 2,
        "options": [
          {
            "label": "-v supprime aussi les volumes nommés (perte de données)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "-v supprime les variables d'environnement",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "-v est plus lent mais plus sûr",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "-v ne fait rien de différent",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "À quoi sert un healthcheck dans un service Docker Compose ?",
        "explanation": "Le healthcheck permet à Docker de vérifier si un service est réellement opérationnel. Combiné à depends_on avec condition: service_healthy, il garantit qu'un service n'est démarré que quand ses dépendances sont prêtes.",
        "points": 1,
        "options": [
          {
            "label": "Vérifier qu'un service est opérationnel avant de démarrer les dépendants",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Monitorer les performances en production",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Redémarrer automatiquement un service en cas de crash",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Mesurer l'utilisation CPU du conteneur",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Registres et CI/CD",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Pourquoi déconseille-t-on d'utiliser le tag :latest en production ?",
        "explanation": "Le tag latest est non déterministe : il peut pointer vers n'importe quelle version. Un docker pull peut récupérer une version incompatible, rendant les rollbacks impossibles à tracer.",
        "points": 2,
        "options": [
          {
            "label": "Il est non déterministe et rend les rollbacks impossibles à tracer",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Il n'est pas supporté par Docker Hub",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Il est plus lent à télécharger",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Il contient plus de vulnérabilités que les autres tags",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un pipeline CI/CD GitHub Actions, comment se connecter à GHCR de manière sécurisée ?",
        "explanation": "GitHub Actions fournit GITHUB_TOKEN automatiquement. Il ne faut jamais le mettre en dur dans le workflow. docker/login-action permet de s'authentifier sans exposer le token.",
        "points": 2,
        "options": [
          {
            "label": "En utilisant ${{ secrets.GITHUB_TOKEN }} via docker/login-action",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "En écrivant le mot de passe directement dans le fichier YAML",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "En utilisant un fichier .env dans le repository",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "En générant un token manuellement avant chaque build",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "À quoi sert docker buildx dans un pipeline CI/CD ?",
        "explanation": "Docker Buildx étend les capacités de docker build : builds multi-plateformes (amd64, arm64), builds multi-stages avancés, et intégration avec le cache GitHub Actions.",
        "points": 1,
        "options": [
          {
            "label": "Construire des images multi-plateformes et activer le cache avancé",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Accélérer les conteneurs en production",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Scanner les vulnérabilités des images",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Déployer les conteneurs sur Kubernetes",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel outil recommande-t-on pour scanner les vulnérabilités d'une image Docker avant de la déployer ?",
        "explanation": "Trivy est un scanner open-source de vulnérabilités très populaire. Docker Scout est l'outil officiel de Docker. Les deux s'intègrent facilement dans un pipeline CI/CD.",
        "points": 1,
        "options": [
          {
            "label": "Trivy ou Docker Scout",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "npm audit",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Docker Scout uniquement (Trivy n'est plus maintenu)",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "curl vers une API de scan",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Que fait le cache-from et cache-to dans docker/build-push-action ?",
        "explanation": "Ces options configurent le cache de build GitHub Actions. cache-from réutilise une couche de cache existante pour accélérer le build. cache-to sauvegarde les nouvelles couches pour les builds futurs.",
        "points": 2,
        "options": [
          {
            "label": "Réutiliser et sauvegarder les couches de cache pour accélérer les builds",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Mettre en cache les images en production",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Sauvegarder les logs de build",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Archiver les anciennes versions d'images",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  }
];

export default exercises;
