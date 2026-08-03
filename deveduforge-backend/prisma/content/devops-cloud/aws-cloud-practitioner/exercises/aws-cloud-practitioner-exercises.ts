const exercises = [
  {
    "title": "Quiz - Fondamentaux AWS et IAM",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Qu'est-ce qu'une Availability Zone (AZ) dans AWS ?",
        "explanation": "Une AZ est un ou plusieurs data centres physiquement isolés dans une région AWS, avec alimentation, refroidissement et réseau indépendants. Elles sont interconnectées par des liaisons à faible latence pour la haute disponibilité.",
        "points": 2,
        "options": [
          { "label": "Un ou plusieurs data centres isolés physiquement dans une région, interconnectés à faible latence", "isCorrect": true, "order": 0 },
          { "label": "Un pays ou une zone géographique contenant toutes les ressources AWS", "isCorrect": false, "order": 1 },
          { "label": "Un serveur physique unique dans un datacenter AWS", "isCorrect": false, "order": 2 },
          { "label": "Un réseau privé isolé dans votre compte AWS", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans IAM, quelle est la différence entre une Policy et un Role ?",
        "explanation": "Une Policy est un document JSON qui définit les permissions (Allow/Deny sur des actions et ressources). Un Role est une identité IAM qui peut être assumée temporairement par un user, un service (EC2, Lambda) ou un compte externe, avec des policies attachées.",
        "points": 2,
        "options": [
          { "label": "Policy = permissions (JSON) ; Role = identité assumée temporairement avec des permissions", "isCorrect": true, "order": 0 },
          { "label": "Policy et Role sont exactement la même chose", "isCorrect": false, "order": 1 },
          { "label": "Role est une Policy qui s'applique à tous les users", "isCorrect": false, "order": 2 },
          { "label": "Policy est pour les utilisateurs, Role est pour les services uniquement", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi doit-on activer MFA sur le compte root AWS ?",
        "explanation": "Le compte root a un accès complet à tous les services et ressources AWS. Sans MFA, la compromission du mot de passe root donne un contrôle total. L'AWS Well-Architected Framework et les best practices imposent le MFA sur root.",
        "points": 2,
        "options": [
          { "label": "Le root a un accès total à tout AWS ; sans MFA, sa compromission donne un contrôle complet", "isCorrect": true, "order": 0 },
          { "label": "Le MFA est obligatoire pour toutes les connexions AWS", "isCorrect": false, "order": 1 },
          { "label": "Le root ne peut pas fonctionner sans MFA activé", "isCorrect": false, "order": 2 },
          { "label": "MFA empêche le root de créer d'autres comptes", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que retourne la commande aws sts get-caller-identity ?",
        "explanation": "Cette commande retourne l'ARN, l'Account ID et le User ID de l'identity IAM actuellement utilisée. C'est essentiel pour vérifier quel user ou role est utilisé, surtout quand on utilise des profils AWS CLI multiples.",
        "points": 1,
        "options": [
          { "label": "L'ARN, l'Account ID et le User ID de l'identity IAM actuelle", "isCorrect": true, "order": 0 },
          { "label": "La liste de tous les users IAM du compte", "isCorrect": false, "order": 1 },
          { "label": "Les credentials d'accès (Access Key ID et Secret Key)", "isCorrect": false, "order": 2 },
          { "label": "La configuration réseau de l'instance EC2 courante", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Selon le Shared Responsibility Model, qui est responsable du patch des systèmes d'exploitation sur les instances EC2 ?",
        "explanation": "Dans le modèle de responsabilité partagée, AWS sécurise l'infrastructure (datacenters, hyperviseur, réseau). Le client est responsable du contenu dans le cloud : OS, applications, données, security groups. Le patch OS est donc la responsabilité du client.",
        "points": 1,
        "options": [
          { "label": "Le client (responsabilité 'dans le cloud')", "isCorrect": true, "order": 0 },
          { "label": "AWS gère automatiquement tous les patchs", "isCorrect": false, "order": 1 },
          { "label": "C'est partagé 50/50 entre AWS et le client", "isCorrect": false, "order": 2 },
          { "label": "Le patch n'est nécessaire que pour les services managés (RDS, Lambda)", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Stockage et Base de Données",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle classe S3 est recommandée pour des données accédées une fois par mois ?",
        "explanation": "S3 Standard-IA (Infrequent Access) offre un stockage à moindre coût pour les données accédées moins fréquemment, avec une disponibilité de 99.9%. Le coût de stockage est réduit mais il y a des frais de récupération par Go.",
        "points": 2,
        "options": [
          { "label": "S3 Standard-IA (Infrequent Access)", "isCorrect": true, "order": 0 },
          { "label": "S3 Standard", "isCorrect": false, "order": 1 },
          { "label": "S3 Glacier Deep Archive", "isCorrect": false, "order": 2 },
          { "label": "S3 One Zone-IA", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans DynamoDB, quelle est la différence entre une table avec PAY_PER_REQUEST et DPROVISIONED ?",
        "explanation": "PAY_PER_REQUEST facture à l'unité (on-demand), idéal pour les charges de travail imprévisibles ou le développement. DPROVISIONED alloue des unités de capacité fixes, plus économique pour les charges stables et prévisibles avec auto-scaling.",
        "points": 2,
        "options": [
          { "label": "PAY_PER_REQUEST = facturation à l'unité (imprévisible) ; PROVISIONED = capacité fixe (prévisible)", "isCorrect": true, "order": 0 },
          { "label": "PAY_PER_REQUEST est toujours moins cher que PROVISIONED", "isCorrect": false, "order": 1 },
          { "label": "PROVISIONED ne fonctionne qu'avec des clés primaires simples", "isCorrect": false, "order": 2 },
          { "label": "PAY_PER_REQUEST impose une limite de 400 Ko par objet", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "À quoi sert l'option --multi-az lors de la création d'une instance RDS ?",
        "explanation": "--multi-az active la réplication synchrone vers une instance standby dans une autre AZ. En cas de panne de l'AZ primaire, RDS bascule automatiquement (failover) sur l'instance standby en ~60 secondes.",
        "points": 2,
        "options": [
          { "label": "Activer la réplication synchrone pour le failover automatique en cas de panne d'AZ", "isCorrect": true, "order": 0 },
          { "label": "Créer deux copies de la base dans la même AZ pour la performance", "isCorrect": false, "order": 1 },
          { "label": "Activer le load balancing entre deux instances de lecture", "isCorrect": false, "order": 2 },
          { "label": "Permettre l'accès à la base depuis deux régions différentes", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel objet S3 est idéal pour l'archivage à très long terme (10+ ans) à moindre coût ?",
        "explanation": "S3 Glacier Deep Archive est la classe la moins chère pour l'archivage long terme. La récupération prend 12-48 heures mais le coût de stockage est minimal. Idéal pour la conformité réglementaire (conservation de données obligatoire).",
        "points": 1,
        "options": [
          { "label": "S3 Glacier Deep Archive", "isCorrect": true, "order": 0 },
          { "label": "S3 Standard", "isCorrect": false, "order": 1 },
          { "label": "S3 Intelligent-Tiering", "isCorrect": false, "order": 2 },
          { "label": "EBS Cold HDD", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi doit-on bloquer l'accès public sur un bucket S3 en production ?",
        "explanation": "L'exposition accidentelle de données dans un bucket S3 public est l'une des erreurs de sécurité cloud les plus courantes. AWS Account Settings et les Public Access Block empêchent les configurations qui rendraient le bucket accessible publiquement.",
        "points": 1,
        "options": [
          { "label": "Prévenir l'exposition accidentelle de données sensibles au web", "isCorrect": true, "order": 0 },
          { "label": "Améliorer les performances de lecture des objets", "isCorrect": false, "order": 1 },
          { "label": "Réduire le coût du stockage S3", "isCorrect": false, "order": 2 },
          { "label": "Permettre l'utilisation de S3 Transfer Acceleration", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Compute et Mise à l'Échelle",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel type d'instance EC2 est recommandé pour les charges de travail avec une utilisation CPU burstable (dev/test) ?",
        "explanation": "Les instances t3/t3a offrent des performances CPU burstable : elles accumulent des crédits CPU quand elles sont sous-utilisés et les dépensent lors de pics. Idéal pour le dev/test et les charges de travail imprévisibles à faible coût.",
        "points": 2,
        "options": [
          { "label": "t3 ou t3a (burstable, généraliste)", "isCorrect": true, "order": 0 },
          { "label": "c5 ou c6i (CPU intensive)", "isCorrect": false, "order": 1 },
          { "label": "r5 ou r6i (mémoire intensive)", "isCorrect": false, "order": 2 },
          { "label": "g5 (GPU)", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un Security Group EC2, pourquoi doit-on suivre le principe du moindre privilège ?",
        "explanation": "Un Security Group est un pare-feu stateful. N'ouvrir que les ports strictement nécessaires réduit la surface d'attaque. Par exemple, si un serveur n'a pas besoin de SSH public, ne pas ouvrir le port 22 depuis 0.0.0.0/0.",
        "points": 2,
        "options": [
          { "label": "Réduire la surface d'attaque en n'ouvrant que les ports strictement nécessaires", "isCorrect": true, "order": 0 },
          { "label": "Améliorer les performances réseau du serveur", "isCorrect": false, "order": 1 },
          { "label": "Réduire le coût des instances EC2", "isCorrect": false, "order": 2 },
          { "label": "Permettre au serveur d'accéder à plus de services AWS", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel type de Load Balancer ELB est adapté pour routage de requêtes HTTP/HTTPS avec inspection au niveau applicatif ?",
        "explanation": "L'ALB (Application Load Balancer) opère au niveau couche 7 (HTTP/HTTPS). Il supporte le routage par path, hostname, header, et l'intégration avec Lambda. Le NLB opère au niveau 4 (TCP/UDP) sans inspection applicative.",
        "points": 2,
        "options": [
          { "label": "ALB (Application Load Balancer) - couche 7 HTTP/HTTPS", "isCorrect": true, "order": 0 },
          { "label": "NLB (Network Load Balancer) - couche 4 TCP/UDP", "isCorrect": false, "order": 1 },
          { "label": "GLB (Gateway Load Balancer) - couche 3", "isCorrect": false, "order": 2 },
          { "label": "CLB (Classic Load Balancer) - obsolète", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle politique d'Auto Scaling ajuste le nombre d'instances pour maintenir une métrique à une valeur cible (ex: CPU à 50%) ?",
        "explanation": "La politique Target Tracking maintient automatiquement une métrique à une cible. Si CPU dépasse 50%, Auto Scaling ajoute des instances. Si elle descend en dessous, il en supprime. C'est la politique la plus simple et recommandée.",
        "points": 1,
        "options": [
          { "label": "Target Tracking Scaling", "isCorrect": true, "order": 0 },
          { "label": "Step Scaling", "isCorrect": false, "order": 1 },
          { "label": "Scheduled Scaling", "isCorrect": false, "order": 2 },
          { "label": "Predictive Scaling", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la limite d'exécution maximale d'une fonction AWS Lambda ?",
        "explanation": "AWS Lambda a une limite de 15 minutes (900 secondes) par exécution. Pour des tâches plus longues, il faut décomposer en fonctions plus courtes (Step Functions) ou utiliser ECS/EKS.",
        "points": 1,
        "options": [
          { "label": "15 minutes (900 secondes)", "isCorrect": true, "order": 0 },
          { "label": "5 minutes (300 secondes)", "isCorrect": false, "order": 1 },
          { "label": "1 heure (3600 secondes)", "isCorrect": false, "order": 2 },
          { "label": "Pas de limite de temps", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Réseau et Architecture",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Qu'est-ce qu'une VPC dans AWS et quel est son rôle principal ?",
        "explanation": "Une VPC (Virtual Private Cloud) est un réseau virtuel isolé dans votre compte AWS. Elle vous donne le contrôle total sur le plan d'adressage IP, les sous-réseaux, les tables de routage et les passerelles pour isoler et connecter vos ressources.",
        "points": 2,
        "options": [
          { "label": "Un réseau virtuel isolé pour contrôler le routage et l'isolation des ressources AWS", "isCorrect": true, "order": 0 },
          { "label": "Un service de stockage pour les données sensibles", "isCorrect": false, "order": 1 },
          { "label": "Un pare-feu physique dans les datacenters AWS", "isCorrect": false, "order": 2 },
          { "label": "Un type d'instance EC2 optimisé pour le réseau", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "À quoi sert un NAT Gateway dans une architecture VPC ?",
        "explanation": "Le NAT Gateway permet aux instances en sous-réseau privé (sans IP publique) d'accéder à Internet (mises à jour, API externes) tout en empêchant les connexions entrantes. Il assure la sécurité des instances privées tout en gardant la connectivité sortante.",
        "points": 2,
        "options": [
          { "label": "Permettre aux instances privées d'accéder à Internet sans accepter de connexions entrantes", "isCorrect": true, "order": 0 },
          { "label": "Distribuer le trafic entrant vers plusieurs instances", "isCorrect": false, "order": 1 },
          { "label": "Chiffrer tout le trafic réseau dans la VPC", "isCorrect": false, "order": 2 },
          { "label": "Connecter deux VPC dans des régions différentes", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle politique de routing Route 53 permet de basculer automatiquement vers un site secondaire si le primaire échoue ?",
        "explanation": "Le routing Failover détecte les health check échoués sur l'endpoint primaire et route automatiquement le trafic vers l'endpoint secondaire. C'est le pattern HA standard pour le DNS avec haute disponibilité.",
        "points": 2,
        "options": [
          { "label": "Failover routing", "isCorrect": true, "order": 0 },
          { "label": "Weighted routing", "isCorrect": false, "order": 1 },
          { "label": "Latency routing", "isCorrect": false, "order": 2 },
          { "label": "Geolocation routing", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel service AWS distribue le contenu statique via un réseau mondial de edge locations ?",
        "explanation": "CloudFront est le CDN d'AWS. Il met en cache le contenu statique et dynamique dans des edge locations proches des utilisateurs, réduisant la latence. Il s'intègre nativement avec S3, ALB et Lambda@Edge.",
        "points": 1,
        "options": [
          { "label": "Amazon CloudFront", "isCorrect": true, "order": 0 },
          { "label": "Amazon Route 53", "isCorrect": false, "order": 1 },
          { "label": "Amazon VPC", "isCorrect": false, "order": 2 },
          { "label": "AWS Global Accelerator", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Combien de piliers comporte le AWS Well-Architected Framework ?",
        "explanation": "Le Well-Architected Framework comporte 6 piliers : Excellence opérationnelle, Sécurité, Fiabilité, Performance, Optimisation des coûts, et Durabilité. Chaque pilier contient des principes et des questions guides pour évaluer une architecture.",
        "points": 1,
        "options": [
          { "label": "6 piliers", "isCorrect": true, "order": 0 },
          { "label": "4 piliers", "isCorrect": false, "order": 1 },
          { "label": "5 piliers", "isCorrect": false, "order": 2 },
          { "label": "8 piliers", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  }
];

export default exercises;
