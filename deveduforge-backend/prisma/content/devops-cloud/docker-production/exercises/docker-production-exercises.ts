const exercises = [
  {
    "title": "Quiz - Docker Swarm et Orchestration",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle commande initialise un manager dans un cluster Docker Swarm ?",
        "explanation": "docker swarm init crée le manager et génère un token pour que les workers rejoignent le cluster. Le paramètre --advertise-addr spécifie l'adresse IP communiquée aux autres nœuds.",
        "points": 2,
        "options": [
          { "label": "docker swarm init --advertise-addr <IP>", "isCorrect": true, "order": 0 },
          { "label": "docker swarm create --manager <IP>", "isCorrect": false, "order": 1 },
          { "label": "docker swarm start --mode manager", "isCorrect": false, "order": 2 },
          { "label": "docker swarm setup --role master", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un docker-stack.yml, quelle section définit le nombre de réplicas et la stratégie de mise à jour ?",
        "explanation": "La section 'deploy' du service contient replicas, update_config (rolling update) et restart_policy. C'est spécifique à Swarm et ignoré par docker compose standalone.",
        "points": 2,
        "options": [
          { "label": "deploy (avec replicas et update_config)", "isCorrect": true, "order": 0 },
          { "label": "scale (avec instances et rolling)", "isCorrect": false, "order": 1 },
          { "label": "replicas (avec update et policy)", "isCorrect": false, "order": 2 },
          { "label": "runtime (avec scaling et update)", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel est l'avantage de l'ordre 'start-first' lors d'un rolling update dans Swarm ?",
        "explanation": "start-first démarre les nouvelles tâches AVANT d'arrêter les anciennes. Cela garantit qu'il y a toujours suffisamment de réplicas actifs pendant la mise à jour, assurant la disponibilité continue.",
        "points": 2,
        "options": [
          { "label": "Les nouvelles tâches démarrent avant l'arrêt des anciennes, assurant la disponibilité", "isCorrect": true, "order": 0 },
          { "label": "Les mises à jour sont plus rapides car tout est parallélisé", "isCorrect": false, "order": 1 },
          { "label": "Cela réduit la consommation mémoire pendant l'update", "isCorrect": false, "order": 2 },
          { "label": "Cela permet de tester la nouvelle version avant de la déployer", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la différence entre les modes d'endpoint 'vip' et 'dnsrr' dans Swarm ?",
        "explanation": "vip résout vers une Virtual IP gérée par Swarm (load balancer L4 interne). dnsrr utilise le DNS round-robin, utile quand le service gère sa propre découverte. vip est le défaut car plus efficace pour la plupart des cas.",
        "points": 1,
        "options": [
          { "label": "vip utilise une VIP (load balancer interne), dnsrr résout en DNS round-robin", "isCorrect": true, "order": 0 },
          { "label": "vip est pour les protocoles HTTP, dnsrr pour TCP", "isCorrect": false, "order": 1 },
          { "label": "vip est plus lent mais plus sécurisé que dnsrr", "isCorrect": false, "order": 2 },
          { "label": "Il n'y a aucune différence, ce sont deux alias du même mode", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que fait docker service rollback en cas d'échec d'un rolling update ?",
        "explanation": "docker service rollback annule la dernière mise à jour et revient à la version précédente de l'image. C'est une sécurité essentielle, surtout combiné avec --update-failure-action rollback qui l'automatise.",
        "points": 1,
        "options": [
          { "label": "Annule la dernière mise à jour et revient à la version précédente", "isCorrect": true, "order": 0 },
          { "label": "Supprime le service et le recrée à zéro", "isCorrect": false, "order": 1 },
          { "label": "Redémarre tous les conteneurs du service", "isCorrect": false, "order": 2 },
          { "label": "Change le token d'accès au cluster", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Monitoring et Logging",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est le rôle de cAdvisor dans une architecture de monitoring Docker ?",
        "explanation": "cAdvisor (Container Advisor) est un outil Google qui expose les métriques de chaque conteneur (CPU, mémoire, réseau, disque) via un endpoint HTTP. Prometheus le scrape pour collecter ces métriques.",
        "points": 2,
        "options": [
          { "label": "Exposer les métriques de chaque conteneur (CPU, RAM, réseau) via HTTP", "isCorrect": true, "order": 0 },
          { "label": "Centraliser les logs de tous les conteneurs", "isCorrect": false, "order": 1 },
          { "label": "Scanner les vulnérabilités des images Docker", "isCorrect": false, "order": 2 },
          { "label": "Gérer les alertes par email et Slack", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans une stack ELK, quel composant transforme et enrichit les logs avant leur indexation ?",
        "explanation": "Logstash reçoit les logs bruts, les transforme (filtres, parsing JSON, géolocalisation) et les envoie à Elasticsearch pour indexation. C'est le composant de transformation du pipeline ELK.",
        "points": 2,
        "options": [
          { "label": "Logstash", "isCorrect": true, "order": 0 },
          { "label": "Elasticsearch", "isCorrect": false, "order": 1 },
          { "label": "Kibana", "isCorrect": false, "order": 2 },
          { "label": "Prometheus", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle commande Docker affiche les métriques CPU et mémoire en temps réel de tous les conteneurs ?",
        "explanation": "docker stats affiche en continu les métriques de tous les conteneurs actifs. L'option --no-stream affiche un snapshot unique (utile pour les scripts).",
        "points": 1,
        "options": [
          { "label": "docker stats --no-stream", "isCorrect": true, "order": 0 },
          { "label": "docker top --all", "isCorrect": false, "order": 1 },
          { "label": "docker monitor --metrics", "isCorrect": false, "order": 2 },
          { "label": "docker system df", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi séparer les métriques (Prometheus) et les logs (ELK) dans une architecture de monitoring ?",
        "explanation": "Séparer métriques et logs permet une scalabilité indépendante : les métriques sont des séries temporelles (haute fréquence, peu de stockage), les logs sont du texte structuré (volume important, recherche full-text). Chaque pipeline a ses propres besoins de performance.",
        "points": 2,
        "options": [
          { "label": "Permettre une scalabilité indépendante et des alertes précises sur chaque type de signal", "isCorrect": true, "order": 0 },
          { "label": "Parce que Prometheus ne peut pas stocker de logs texte", "isCorrect": false, "order": 1 },
          { "label": "Pour des raisons de sécurité uniquement", "isCorrect": false, "order": 2 },
          { "label": "C'est une convention qui n'a pas d'avantage technique", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans Prometheus, que signifie le 'pull model' (scrape) ?",
        "explanation": "Contrairement au push model où les applications envoient leurs métriques, Prometheus se connecte périodiquement aux targets (scrape) via HTTP pour récupérer les métriques. Cela simplifie la configuration côté application et permet à Prometheus de contrôler la fréquence de collecte.",
        "points": 1,
        "options": [
          { "label": "Prometheus se connecte aux cibles pour récupérer les métriques via HTTP", "isCorrect": true, "order": 0 },
          { "label": "Les conteneurs poussent leurs métriques vers Prometheus", "isCorrect": false, "order": 1 },
          { "label": "Prometheus utilise UDP pour la collecte", "isCorrect": false, "order": 2 },
          { "label": "Les métriques sont stockées en base de données SQL", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Sécurité des Conteneurs",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est le rôle de Trivy dans un pipeline CI/CD Docker ?",
        "explanation": "Trivy est un scanner open-source de vulnérabilités (CVE) pour les images Docker. Il analyse les paquets installés dans l'image et compare avec les bases de données CVE connues. Il est utilisé pour bloquer le déploiement d'images contenant des failles critiques.",
        "points": 2,
        "options": [
          { "label": "Scanner les vulnérabilités (CVE) d'une image Docker", "isCorrect": true, "order": 0 },
          { "label": "Chiffrer les secrets dans les images", "isCorrect": false, "order": 1 },
          { "label": "Gérer les accès aux registres Docker", "isCorrect": false, "order": 2 },
          { "label": "Monitorer les performances des conteneurs", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi les Docker Secrets sont-ils plus sécurisés que les variables d'environnement pour les mots de passe ?",
        "explanation": "Les Docker Secrets sont montés en fichiers dans /run/secrets/ (tmpfs, pas sur disque). Les variables d'environnement sont visibles via 'docker inspect' et peuvent fuiter dans les logs. Les secrets sont chiffrés en transit dans Swarm.",
        "points": 2,
        "options": [
          { "label": "Les secrets sont montés en fichiers tmpfs (pas sur disque) et invisibles via docker inspect", "isCorrect": true, "order": 0 },
          { "label": "Les variables d'environnement ne sont pas supportées par Docker", "isCorrect": false, "order": 1 },
          { "label": "Les secrets sont automatiquement chiffrés dans le code source", "isCorrect": false, "order": 2 },
          { "label": "Les variables d'environnement sont plus lentes à lire pour le conteneur", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un Dockerfile, quelle instruction force l'exécution du processus avec un utilisateur non-root ?",
        "explanation": "USER définit l'utilisateur sous lequel le processus tourne. Sans USER, Docker utilise root (UID 0) par défaut, ce qui est un risque de sécurité majeur si le conteneur est compromis.",
        "points": 2,
        "options": [
          { "label": "USER (après avoir créé l'utilisateur avec adduser/addgroup)", "isCorrect": true, "order": 0 },
          { "label": "RUN sudo su - appuser", "isCorrect": false, "order": 1 },
          { "label": "ENV USER=appuser", "isCorrect": false, "order": 2 },
          { "label": "CMD [\"su\", \"-\", \"appuser\"]", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "À quoi servent AppArmor et Seccomp dans la sécurité des conteneurs ?",
        "explanation": "Ce sont des mécanismes du noyau Linux qui restreignent les actions autorisées pour un conteneur. AppArmor contrôle l'accès aux fichiers/réseaux (MAC). Seccomp filtre les appels système autorisés, réduisant la surface d'attaque du noyau.",
        "points": 1,
        "options": [
          { "label": "Restreindre les actions autorisées au niveau du noyau Linux (fichiers, appels système)", "isCorrect": true, "order": 0 },
          { "label": "Scanner les vulnérabilités des images", "isCorrect": false, "order": 1 },
          { "label": "Gérer le chiffrement des conteneurs", "isCorrect": false, "order": 2 },
          { "label": "Monitorer les performances réseau des conteneurs", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi faut-il éviter de monter les secrets comme variables d'environnement dans les conteneurs ?",
        "explanation": "Les variables d'environnement sont exposées en clair via 'docker inspect' et dans les logs d'application. Les secrets montés en fichiers dans /run/secrets/ sont stockés en tmpfs (mémoire uniquement, pas sur disque) et disparaissent à l'arrêt du conteneur.",
        "points": 1,
        "options": [
          { "label": "Elles sont visibles via docker inspect et peuvent fuiter dans les logs", "isCorrect": true, "order": 0 },
          { "label": "Docker ne supporte pas les variables d'environnement pour les secrets", "isCorrect": false, "order": 1 },
          { "label": "Elles sont plus lentes à charger au démarrage du conteneur", "isCorrect": false, "order": 2 },
          { "label": "Elles ne fonctionnent qu'avec Docker Swarm pas avec Docker Compose", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - CI/CD avec Docker",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Dans un multi-stage build, pourquoi copier package.json AVANT le reste du code source ?",
        "explanation": "package.json change moins souvent que le code source. En le copiant et en installant les dépendances d'abord, Docker met en cache cette couche. Lorsque seul le code change, les couches de npm ci ne sont pas reconstruites, accélérant considérablement le build.",
        "points": 2,
        "options": [
          { "label": "Profiter du cache Docker quand seul le code source change", "isCorrect": true, "order": 0 },
          { "label": "Parce que COPY . . ne peut pas être utilisé en premier dans Dockerfile", "isCorrect": false, "order": 1 },
          { "label": "Pour éviter les erreurs de permissions sur node_modules", "isCorrect": false, "order": 2 },
          { "label": "Parce que npm ci nécessite un environnement Node.js installé", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans GitHub Actions, que font les options cache-from et cache-to dans docker/build-push-action ?",
        "explanation": "Ces options configurent le layer caching entre les builds GitHub Actions. cache-from réutilise les couches d'un build précédent. cache-to sauvegarde les couches du build actuel pour les futures exécutions, réduisant drastiquement les temps de build.",
        "points": 2,
        "options": [
          { "label": "Réutiliser et sauvegarder les couches de cache pour accélérer les builds futurs", "isCorrect": true, "order": 0 },
          { "label": "Mettre en cache les images en production", "isCorrect": false, "order": 1 },
          { "label": "Sauvegarder les logs de build dans S3", "isCorrect": false, "order": 2 },
          { "label": "Archiver les anciennes versions d'images Docker", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi le tag :latest est-il déconseillé en production ?",
        "explanation": "Le tag latest est non déterministe : il peut pointer vers n'importe quelle version. Un docker pull peut récupérer une version incompatible, rendant les rollbacks impossiles à tracer et les environnements non reproductibles.",
        "points": 2,
        "options": [
          { "label": "Il est non déterministe et rend les rollbacks impossibles à tracer", "isCorrect": true, "order": 0 },
          { "label": "Il n'est pas supporté par Docker Hub", "isCorrect": false, "order": 1 },
          { "label": "Il est plus lent à télécharger que les autres tags", "isCorrect": false, "order": 2 },
          { "label": "Il contient automatiquement plus de vulnérabilités", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel est l'avantage principal de Docker Buildx par rapport à docker build standard ?",
        "explanation": "Docker Buildx ajoute les builds multi-plateformes (amd64, arm64), l'intégration avec le cache GitHub Actions (type=gha), et les builders avancés. C'est essentiel pour les pipelines CI/CD modernes.",
        "points": 1,
        "options": [
          { "label": "Construire des images multi-plateformes et activer le cache GitHub Actions", "isCorrect": true, "order": 0 },
          { "label": "Accélérer l'exécution des conteneurs en production", "isCorrect": false, "order": 1 },
          { "label": "Scanner automatiquement les vulnérabilités des images", "isCorrect": false, "order": 2 },
          { "label": "Déployer les conteneurs sur Kubernetes", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi Harbor est-il préféré à Docker Hub en entreprise ?",
        "explanation": "Harbor offre un scan Trivy intégré, le RBAC (contrôle d'accès par projet), la rétention automatique des images, la réplication entre instances, et l'hébergement on-premises pour la conformité des données sensibles.",
        "points": 1,
        "options": [
          { "label": "Scan intégré, RBAC, rétention d'images et hébergement on-premises", "isCorrect": true, "order": 0 },
          { "label": "Harbor est plus rapide que Docker Hub", "isCorrect": false, "order": 1 },
          { "label": "Docker Hub ne supporte plus les images privées", "isCorrect": false, "order": 2 },
          { "label": "Harbor est le seul registre qui supporte les multi-stage builds", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  }
];

export default exercises;
