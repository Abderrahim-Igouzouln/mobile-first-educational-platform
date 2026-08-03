const exercises = [
  {
    "title": "Quiz - Architectures Hautement Disponibles",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la différence fondamentale entre le déploiement Multi-AZ et Multi-Région ?",
        "explanation": "Multi-AZ déploye dans plusieurs zones de disponibilité d'une même région, protégeant contre les pannes de datacenter. Multi-Région déploye dans des régions géographiquement séparées, protégeant contre les pannes de région entière (catastrophe naturelle, panne réseau majeure).",
        "points": 2,
        "options": [
          { "label": "Multi-AZ = protecteur datacenter ; Multi-Région = protection de région entière", "isCorrect": true, "order": 0 },
          { "label": "Multi-AZ est plus cher que Multi-Région", "isCorrect": false, "order": 1 },
          { "label": "Il n'y a aucune différence, ce sont deux termes synonymes", "isCorrect": false, "order": 2 },
          { "label": "Multi-Région est automatiquement activé avec Multi-AZ", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans RDS, quelle est la différence entre Multi-AZ et Read Replica ?",
        "explanation": "Multi-AZ utilise la réplication synchrone pour la haute disponibilité (failover automatique en ~60s). Read Replica utilise la réplication asynchrone pour la scalabilité en lecture. Multi-AZ est pour la résilience, Read Replica pour le débit.",
        "points": 2,
        "options": [
          { "label": "Multi-AZ = HA avec réplication synchrone ; Read Replica = scalabilité lecture avec réplication asynchrone", "isCorrect": true, "order": 0 },
          { "label": "Multi-AZ est pour les lectures, Read Replica pour les écritures", "isCorrect": false, "order": 1 },
          { "label": "Read Replica est toujours synchronisé avec la source", "isCorrect": false, "order": 2 },
          { "label": "Multi-AZ ne fonctionne qu'avec Aurora, pas avec PostgreSQL standard", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un routing Route 53 Failover, que se passe-t-il quand le health check de l'endpoint primaire échoue ?",
        "explanation": "Route 53 surveille périodiquement l'endpoint primaire via des health checks. Si l'endpoint échoue (3 checks consécutifs par défaut), Route 53 retire automatiquement l'enregistrement DNS primaire et redirige le trafic vers l'endpoint secondaire.",
        "points": 2,
        "options": [
          { "label": "Route 53 redirige automatiquement le trafic vers l'endpoint secondaire", "isCorrect": true, "order": 0 },
          { "label": "Route 53 supprime complètement l'enregistrement DNS", "isCorrect": false, "order": 1 },
          { "label": "L'endpoint primaire est automatiquement redémarré", "isCorrect": false, "order": 2 },
          { "label": "Les clients reçoivent une erreur DNS直到 la résolution manuelle", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel est l'avantage d'Aurora Global Database pour une architecture multi-région ?",
        "explanation": "Aurora Global Database réplique les données entre régions avec une latence de réplication < 1 seconde. Il permet la lecture locale dans chaque région (latence réduite) et le disaster recovery avec promotion automatique en cas de panne de région.",
        "points": 1,
        "options": [
          { "label": "Réplication < 1s entre régions et lecture locale dans chaque région", "isCorrect": true, "order": 0 },
          { "label": "Il élimine le besoin de Read Replicas", "isCorrect": false, "order": 1 },
          { "label": "Il synchronise automatiquement les schémas entre régions", "isCorrect": false, "order": 2 },
          { "label": "Il fonctionne uniquement avec MySQL, pas PostgreSQL", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans une architecture HA avec ALB, pourquoi faut-il au moins 2 AZ ?",
        "explanation": "Si une seule AZ est utilisée et qu'elle tombe, le service est entièrement indisponible. Avec 2+ AZ, le trafic est automatiquement routé vers les instances des AZ restantes. L'ALB détecte les instances saines et répartit le trafic.",
        "points": 1,
        "options": [
          { "label": "Pour qu'en cas de panne d'une AZ, le trafic soit routé vers les AZ restantes", "isCorrect": true, "order": 0 },
          { "label": "Pour doubler la capacité de calcul", "isCorrect": false, "order": 1 },
          { "label": "Pour réduire les coûts de 50%", "isCorrect": false, "order": 2 },
          { "label": "C'est une recommandation optionnelle, pas une nécessité", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Microservices et Serverless",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la différence principale entre ECS et EKS ?",
        "explanation": "ECS est le service de conteneurs managé par AWS, plus simple à configurer et maintenir. EKS est Kubernetes managé, offrant l'écosystème complet K8s (Helm, operators, CRD) mais avec plus de complexité. ECS convient aux équipes < 100 services.",
        "points": 2,
        "options": [
          { "label": "ECS = simple, managé par AWS ; EKS = Kubernetes complet avec écosystème riche", "isCorrect": true, "order": 0 },
          { "label": "ECS utilise Docker, EKS utilise Podman", "isCorrect": false, "order": 1 },
          { "label": "EKS est toujours moins cher qu'ECS", "isCorrect": false, "order": 2 },
          { "label": "ECS ne supporte pas Fargate, uniquement EKS", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un ECS task definition avec Fargate, comment passe-t-on un secret (mot de passe) de manière sécurisée ?",
        "explanation": "Le champ 'secrets' dans le containerDefinition résout les secrets depuis Secrets Manager ou SSM Parameter Store et les injecte comme variables d'environnement au démarrage. Les secrets ne sont jamais stockés dans la task definition ou les logs.",
        "points": 2,
        "options": [
          { "label": "Via le champ 'secrets' résolvant depuis Secrets Manager ou SSM Parameter Store", "isCorrect": true, "order": 0 },
          { "label": "En dur dans le champ 'environment' de la task definition", "isCorrect": false, "order": 1 },
          { "label": "Dans un fichier .env monté via Docker volume", "isCorrect": false, "order": 2 },
          { "label": "Via les tags de l'instance EC2 sous-jacente", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans SQS, quelle est la différence entre une Standard queue et une FIFO queue ?",
        "explanation": "Standard queue offre un débit maximal (messages illimités) sans garantie d'ordre. FIFO queue garantit l'ordre exact des messages et la déduplication, avec un débit limité à 3000 msg/s (300 avec batch). FIFO est pour les transactions financières.",
        "points": 2,
        "options": [
          { "label": "Standard = débit maximal sans ordre ; FIFO = ordre garanti avec débit limité", "isCorrect": true, "order": 0 },
          { "label": "Standard est plus cher que FIFO", "isCorrect": false, "order": 1 },
          { "label": "FIFO ne supporte pas le traitement batch", "isCorrect": false, "order": 2 },
          { "label": "Standard garantit l'exactement une fois, FIFO non", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un workflow Step Functions, quel type d'état permet de prendre une décision basée sur la sortie d'une état précédente ?",
        "explanation": "Le type 'Choice' évalue des conditions sur les variables de sortie (JSONPath) et route vers différentes branches du workflow. C'est l'équivalent d'un if/else dans un programme. Les autres types sont Task, Pass, Wait, Succeed, Fail, Parallel.",
        "points": 1,
        "options": [
          { "label": "Choice (évalue des conditions et route vers différentes branches)", "isCorrect": true, "order": 0 },
          { "label": "Task (exécute un travail)", "isCorrect": false, "order": 1 },
          { "label": "Pass (transmet les données sans exécution)", "isCorrect": false, "order": 2 },
          { "label": "Wait (attend un temps défini)", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel service AWS permet de router des événements entre services de manière découplée avec des règles basées sur le contenu ?",
        "explanation": "Amazon EventBridge (anciennement CloudWatch Events) route les événements entre services via des bus d'événements et des règles. Les règles matchent le contenu des événements (source, type, détail) et les routent vers Lambda, SQS, Step Functions, etc.",
        "points": 1,
        "options": [
          { "label": "Amazon EventBridge", "isCorrect": true, "order": 0 },
          { "label": "Amazon SQS", "isCorrect": false, "order": 1 },
          { "label": "Amazon SNS", "isCorrect": false, "order": 2 },
          { "label": "AWS Step Functions", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Sécurité et Conformité",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel service AWS gère les clés de chiffrement pour les données au repos (S3, RDS, EBS) ?",
        "explanation": "AWS KMS (Key Management Service) crée et gère les clés de chiffrement. Il s'intègre nativement avec S3, RDS, EBS, Secrets Manager et de nombreux autres services. Les clés peuvent être AWS-managed ou customer-managed.",
        "points": 2,
        "options": [
          { "label": "AWS KMS (Key Management Service)", "isCorrect": true, "order": 0 },
          { "label": "AWS IAM", "isCorrect": false, "order": 1 },
          { "label": "AWS Shield", "isCorrect": false, "order": 2 },
          { "label": "AWS Config", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel service enregistre chaque action API AWS (creates, deletes, modifies) pour l'audit de sécurité ?",
        "explanation": "CloudTrail enregistre automatiquement chaque appel API AWS (via console, CLI, SDK) dans un bucket S3. C'est essentiel pour l'audit, la conformité et le diagnostic de sécurité. Les logs sont conservés 90 jours par défaut.",
        "points": 2,
        "options": [
          { "label": "AWS CloudTrail", "isCorrect": true, "order": 0 },
          { "label": "AWS CloudWatch", "isCorrect": false, "order": 1 },
          { "label": "AWS Config", "isCorrect": false, "order": 2 },
          { "label": "AWS GuardDuty", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel service utilise le machine learning pour détecter les menaces de sécurité (activités suspectes, IPs malveillantes) ?",
        "explanation": "GuardDuty analyse les logs CloudTrail, VPC Flow Logs et DNS avec des modèles ML pour détecter les anomalies : mineur de crypto, IPs C2, compromission de credentials, reconnaissance non autorisée.",
        "points": 2,
        "options": [
          { "label": "Amazon GuardDuty", "isCorrect": true, "order": 0 },
          { "label": "AWS WAF", "isCorrect": false, "order": 1 },
          { "label": "AWS Shield", "isCorrect": false, "order": 2 },
          { "label": "AWS Inspector", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel service protège les applications web contre les attaques OWASP Top 10 (injection SQL, XSS) ?",
        "explanation": "AWS WAF (Web Application Firewall) filtre le trafic HTTP/HTTPS au niveau couche 7. Il bloque les injection SQL, XSS, et les attaques par déni de service applicatif. Il s'intègre avec ALB, CloudFront et API Gateway.",
        "points": 1,
        "options": [
          { "label": "AWS WAF (Web Application Firewall)", "isCorrect": true, "order": 0 },
          { "label": "AWS Shield", "isCorrect": false, "order": 1 },
          { "label": "Amazon GuardDuty", "isCorrect": false, "order": 2 },
          { "label": "AWS Network Firewall", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans le Shared Responsibility Model, qui est responsable du chiffrement des données dans S3 ?",
        "explanation": "AWS fournit les mécanismes de chiffrement (SSE-S3, SSE-KMS) mais c'est au client de les activer et gérer les clés. Le chiffrement des données est la responsabilité du client dans le modèle 'dans le cloud'.",
        "points": 1,
        "options": [
          { "label": "Le client (AWS fournit les mécanismes, le client les active)", "isCorrect": true, "order": 0 },
          { "label": "AWS chiffre automatiquement toutes les données S3", "isCorrect": false, "order": 1 },
          { "label": "C'est partagé également entre AWS et le client", "isCorrect": false, "order": 2 },
          { "label": "Le chiffrement n'est pas nécessaire avec S3", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Optimisation des Coûts et Migration",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel outil AWS visualise les dépenses par service, région et tag avec des graphiques historiques ?",
        "explanation": "AWS Cost Explorer fournit une interface graphique pour analyser les coûts AWS. Il permet de filtrer par service, région, tag, et de visualiser les tendances. Il génère aussi des prédictions de coûts futurs.",
        "points": 2,
        "options": [
          { "label": "AWS Cost Explorer", "isCorrect": true, "order": 0 },
          { "label": "AWS Budgets", "isCorrect": false, "order": 1 },
          { "label": "AWS Trusted Advisor", "isCorrect": false, "order": 2 },
          { "label": "AWS Compute Optimizer", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel type de Savings Plan offre la plus grande flexibilité (appliqué à EC2, Lambda et Fargate) ?",
        "explanation": "Compute Savings Plans s'appliquent à n'importe quel type d'instance (toutes familles, toutes régions), Lambda et Fargate. Ils offrent jusqu'à 66% de réduction. EC2 Instance Savings Plans sont plus restrictifs (famille spécifique) mais offrent jusqu'à 72%.",
        "points": 2,
        "options": [
          { "label": "Compute Savings Plans (flexible : toutes instances, Lambda, Fargate)", "isCorrect": true, "order": 0 },
          { "label": "EC2 Instance Savings Plans (spécifique à une famille)", "isCorrect": false, "order": 1 },
          { "label": "Reserved Instances (identique aux Savings Plans)", "isCorrect": false, "order": 2 },
          { "label": "Spot Savings Plans (pour les Spot Instances uniquement)", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel service AWS transfère de gros volumes de données entre stockages on-premises et S3 ?",
        "explanation": "AWS DataSync transfère automatiquement de grandes quantités de données entre stockages (NFS, SMB, HDFS) et S3/EFS. Il gère le chiffrement, la vérification d'intégrité et peut programmer les transferts. Pour les péta-octets, AWS Snowball est physique.",
        "points": 2,
        "options": [
          { "label": "AWS DataSync", "isCorrect": true, "order": 0 },
          { "label": "AWS S3 Transfer Acceleration", "isCorrect": false, "order": 1 },
          { "label": "AWS Direct Connect", "isCorrect": false, "order": 2 },
          { "label": "AWS Storage Gateway", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi est-il important de taguer TOUTES les ressources AWS en production ?",
        "explanation": "Les tags sont essentiels pour l'allocation de coûts (Cost allocation tags dans Cost Explorer), la gestion des environnements (dev/staging/prod), l'automatisation (Terraform), et la conformité. Sans tags, il est impossible de savoir qui dépense quoi.",
        "points": 1,
        "options": [
          { "label": "Allocation des coûts par équipe/projet et gestion automatisée des environnements", "isCorrect": true, "order": 0 },
          { "label": "Pour améliorer les performances des ressources", "isCorrect": false, "order": 1 },
          { "label": "Les tags sont obligatoires pour tous les services AWS", "isCorrect": false, "order": 2 },
          { "label": "Pour chiffrer automatiquement les données", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel service AWS aide à identifier les instances EC2 sous-utilisées pour réduire les coûts ?",
        "explanation": "AWS Compute Optimizer utilise le machine learning pour analyser l'utilisation historique des instances EC2 et recommande les types d'instances optimaux. Il détecte les instances sur-dimensionnées et recommande des types moins coûteux.",
        "points": 1,
        "options": [
          { "label": "AWS Compute Optimizer", "isCorrect": true, "order": 0 },
          { "label": "AWS Cost Explorer", "isCorrect": false, "order": 1 },
          { "label": "AWS Trusted Advisor", "isCorrect": false, "order": 2 },
          { "label": "AWS Inspector", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  }
];

export default exercises;
