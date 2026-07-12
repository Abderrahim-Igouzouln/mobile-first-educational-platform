const exercises = [
  {
    "title": "Quiz - Animations et Gestes",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est l'avantage principal de React Native Reanimated 3 par rapport à l'API Animated classique ?",
        "explanation": "Reanimated 3 exécute les animations sur le thread UI (thread natif), ce qui garantit 60 fps même quand le thread JS est chargé. L'API Animated classique exécute les calculs sur le thread JS, ce qui peut causer des ralentissements.",
        "points": 2,
        "options": [
          { "label": "Les animations s'exécutent sur le thread UI natif", "isCorrect": true, "order": 0 },
          { "label": "Reanimated utilise moins de mémoire", "isCorrect": false, "order": 1 },
          { "label": "Reanimated supporte plus de propriétés CSS", "isCorrect": false, "order": 2 },
          { "label": "Reanimated est inclus dans React Native par défaut", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que retourne useAnimatedStyle() dans Reanimated 3 ?",
        "explanation": "useAnimatedStyle retourne un objet de style React Native dont les propriétés sont recalculées automatiquement sur le thread UI à chaque frame lorsque les shared values changent.",
        "points": 2,
        "options": [
          { "label": "Un objet de style dont les propriétés sont recalculées sur le thread UI", "isCorrect": true, "order": 0 },
          { "label": "Un composant React Native animé", "isCorrect": false, "order": 1 },
          { "label": "Une fonction qui démarre l'animation", "isCorrect": false, "order": 2 },
          { "label": "Un string CSS dynamique", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle méthode de Reanimated crée une animation basée sur la physique d'un ressort ?",
        "explanation": "withSpring simule un ressort physique avec des paramètres comme la fréquence et l'amortissement, produisant un mouvement naturel qui dépasse légèrement la cible avant de se stabiliser.",
        "points": 2,
        "options": [
          { "label": "withSpring()", "isCorrect": true, "order": 0 },
          { "label": "withBounce()", "isCorrect": false, "order": 1 },
          { "label": "withElastic()", "isCorrect": false, "order": 2 },
          { "label": "withPhysics()", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel package fournit des gestes natifs performants pour React Native ?",
        "explanation": "react-native-gesture-handler remplace les vues tactiles natives de React Native pour capturer les gestes (tap, pan, pinch, etc.) directement sur le thread natif, offrant de bien meilleures performances que les gestes basés sur JavaScript.",
        "points": 1,
        "options": [
          { "label": "react-native-gesture-handler", "isCorrect": true, "order": 0 },
          { "label": "react-native-touch-events", "isCorrect": false, "order": 1 },
          { "label": "react-native-swipe", "isCorrect": false, "order": 2 },
          { "label": "react-native-gestures", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment composer deux gestes simultanés (par exemple pan et pinch) avec Gesture Handler ?",
        "explanation": "Gesture.Simultaneous() permet de détecter plusieurs gestes en même temps. Chaque geste est exécuté indépendamment, ce qui est idéal pour des interactions multi-touch.",
        "points": 2,
        "options": [
          { "label": "Gesture.Simultaneous(gesture1, gesture2)", "isCorrect": true, "order": 0 },
          { "label": "Gesture.Merge(gesture1, gesture2)", "isCorrect": false, "order": 1 },
          { "label": "Gesture.Combine(gesture1, gesture2)", "isCorrect": false, "order": 2 },
          { "label": "gesture1.together(gesture2)", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Performance et Optimisation",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est le rôle du moteur Hermes dans React Native ?",
        "explanation": "Hermes est un moteur JavaScript optimisé par Meta qui compile le code JS en bytecode lors du build (build-time compilation). Cela réduit significativement le temps de démarrage et l'empreinte mémoire par rapport à JavaScriptCore.",
        "points": 2,
        "options": [
          { "label": "Compiler le JavaScript en bytecode au moment du build pour améliorer le démarrage", "isCorrect": true, "order": 0 },
          { "label": "Remplacer React Native par un moteur natif", "isCorrect": false, "order": 1 },
          { "label": "Gérer le rendu des composants natifs", "isCorrect": false, "order": 2 },
          { "label": "Optimiser uniquement les animations", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi FlashList est-il plus performant que FlatList pour les grandes listes ?",
        "explanation": "FlashList réutilise les vues existantes (cellule recycling) au lieu de les recréer, et utilise un système de virtualisation agressif. Il faut cependant fournir estimatedItemSize pour que le layout soit calculé efficacement.",
        "points": 2,
        "options": [
          { "label": "Il réutilise les vues (cellule recycling) et utilise une virtualisation agressive", "isCorrect": true, "order": 0 },
          { "label": "FlashList charge les données plus rapidement depuis le réseau", "isCorrect": false, "order": 1 },
          { "label": "FlashList utilise un moteur de rendu natif différent", "isCorrect": false, "order": 2 },
          { "label": "FlashList n'affiche que les 10 premiers éléments", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la différence principale entre React.memo et useMemo ?",
        "explanation": "React.memo mémoise un composant entier (évite le re-render si les props ne changent pas), tandis que useMemo mémoise une valeur calculée dans un composant pour éviter de recalculer à chaque render.",
        "points": 2,
        "options": [
          { "label": "React.memo mémoise un composant, useMemo mémoise une valeur calculée", "isCorrect": true, "order": 0 },
          { "label": "Ils sont strictement identiques", "isCorrect": false, "order": 1 },
          { "label": "useMemo est utilisé pour les class components uniquement", "isCorrect": false, "order": 2 },
          { "label": "React.memo est plus rapide que useMemo", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi doit-on fournir estimatedItemSize à FlashList ?",
        "explanation": "estimatedItemSize permet à FlashList de calculer efficacement le layout sans attendre le rendu réel des items. Sans cette valeur, FlashList doit rendre chaque item une première fois pour mesurer sa taille, ce qui dégrade les performances.",
        "points": 1,
        "options": [
          { "label": "Pour optimiser le calcul du layout avant le rendu réel", "isCorrect": true, "order": 0 },
          { "label": "C'est obligatoire pour que FlashList fonctionne", "isCorrect": false, "order": 1 },
          { "label": "Pour limiter le nombre d'éléments affichés", "isCorrect": false, "order": 2 },
          { "label": "Pour configurer le type de scroll", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel outil intégré à React Native permet de mesurer le temps de rendu des composants ?",
        "explanation": "React.Profiler est un composant natif de React qui mesure le temps de rendu d'un sous-arbre de composants. Il fournit des métriques comme actualDuration (temps du dernier render) et commitCount (nombre de renders).",
        "points": 1,
        "options": [
          { "label": "React.Profiler", "isCorrect": true, "order": 0 },
          { "label": "React.Performance", "isCorrect": false, "order": 1 },
          { "label": "React.Metrics", "isCorrect": false, "order": 2 },
          { "label": "React.Benchmark", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Hors ligne et Stockage Local",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel package détecte l'état de connectivité réseau dans React Native ?",
        "explanation": "@react-native-community/netinfo fournit des informations sur le type de réseau (Wi-Fi, cellular, none) et permet d'écouter les changements de connectivité en temps réel.",
        "points": 2,
        "options": [
          { "label": "@react-native-community/netinfo", "isCorrect": true, "order": 0 },
          { "label": "react-native-network", "isCorrect": false, "order": 1 },
          { "label": "react-native-connectivity", "isCorrect": false, "order": 2 },
          { "label": "expo-network", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la taille maximale de stockage d'AsyncStorage sur iOS ?",
        "explanation": "AsyncStorage est limité à environ 6 MB sur iOS et 8 MB sur Android. Ce n'est pas adapté pour stocker de grandes quantités de données — WatermelonDB ou SQLite sont de meilleurs choix pour les bases de données volumineuses.",
        "points": 2,
        "options": [
          { "label": "Environ 6 MB sur iOS, 8 MB sur Android", "isCorrect": true, "order": 0 },
          { "label": "100 MB sur les deux plateformes", "isCorrect": false, "order": 1 },
          { "label": "Illimité", "isCorrect": false, "order": 2 },
          { "label": "1 MB sur iOS, 2 MB sur Android", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans WatermelonDB, comment définit-on une relation parent-enfant entre deux modèles ?",
        "explanation": "On utilise le décorateur @children('table_name') sur le modèle parent et @text('foreign_key') sur l'enfant. WatermelonDB gère automatiquement les jointures et la synchronisation.",
        "points": 2,
        "options": [
          { "label": "Avec @children sur le parent et @text pour la clé étrangère sur l'enfant", "isCorrect": true, "order": 0 },
          { "label": "Avec @relation('parent') sur l'enfant", "isCorrect": false, "order": 1 },
          { "label": "En définissant un schéma SQL brut", "isCorrect": false, "order": 2 },
          { "label": "WatermelonDB ne supporte pas les relations", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la bonne stratégie pour gérer un cache avec expiration dans AsyncStorage ?",
        "explanation": "On stocke les données avec un timestamp d'expiration. À la lecture, on vérifie si Date.now() dépasse l'expiry. Si oui, on supprime l'entrée et on retourne null pour forcer un rechargement.",
        "points": 1,
        "options": [
          { "label": "Stocker les données avec un timestamp d'expiry et vérifier à la lecture", "isCorrect": true, "order": 0 },
          { "label": "Utiliser setTimeout pour supprimer après un délai", "isCorrect": false, "order": 1 },
          { "label": "Remplacer les données à chaque lancement", "isCorrect": false, "order": 2 },
          { "label": "AsyncStorage gère automatiquement l'expiration", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans une architecture hors ligne, que doit contenir une file d'attente de synchronisation ?",
        "explanation": "La file d'attente stocke les actions effectuées hors ligne (type d'action, données, timestamp). Quand le réseau revient, on rejoue les actions dans l'ordre pour synchroniser avec le serveur.",
        "points": 2,
        "options": [
          { "label": "Le type d'action, les données et le timestamp de chaque mutation", "isCorrect": true, "order": 0 },
          { "label": "Uniquement les identifiants des éléments modifiés", "isCorrect": false, "order": 1 },
          { "label": "Les données complètes de la base locale", "isCorrect": false, "order": 2 },
          { "label": "Uniquement le nombre d'actions en attente", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Déploiement et CI/CD",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel service permet de builder des apps React Native dans le cloud sans Xcode ni Android Studio en local ?",
        "explanation": "EAS Build (Expo Application Services) compile les apps iOS et Android dans le cloud. Il supporte les builds de développement, preview et production, et peut automatiquement soumettre aux stores.",
        "points": 2,
        "options": [
          { "label": "EAS Build (Expo Application Services)", "isCorrect": true, "order": 0 },
          { "label": "CloudBuild", "isCorrect": false, "order": 1 },
          { "label": "React Native Cloud", "isCorrect": false, "order": 2 },
          { "label": "Expo Cloud", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel est le principal avantage de CodePush par rapport à un build classique ?",
        "explanation": "CodePush permet de pousser des mises à jour JavaScript et de ressources sans repasser par les stores (App Store / Play Store). C'est idéal pour corriger des bugs rapidement sans attendre la validation des stores.",
        "points": 2,
        "options": [
          { "label": "Mise à jour OTA sans repasser par les stores", "isCorrect": true, "order": 0 },
          { "label": "CodePush compile plus rapidement", "isCorrect": false, "order": 1 },
          { "label": "CodePush remplace EAS Build", "isCorrect": false, "order": 2 },
          { "label": "CodePush fonctionne sans connexion internet", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la limitation principale de CodePush ?",
        "explanation": "CodePush ne peut mettre à jour que le JavaScript et les ressources (images, polices). Il ne peut pas modifier le code natif (Swift, Kotlin, modules C++), ni ajouter de nouvelles dépendances natives.",
        "points": 2,
        "options": [
          { "label": "Il ne peut pas modifier le code natif (Swift, Kotlin, C++)", "isCorrect": true, "order": 0 },
          { "label": "Il ne fonctionne que sur iOS", "isCorrect": false, "order": 1 },
          { "label": "Il est limité à 10 mises à jour par mois", "isCorrect": false, "order": 2 },
          { "label": "Il nécessite un serveur dédié", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans le fichier eas.json, que signifie le profile \"distribution\": \"internal\" ?",
        "explanation": "Le profile 'internal' signifie que le build est destiné à un usage interne (tests), pas à la publication sur les stores. Il génère un APK (Android) ou un build testable via TestFlight (iOS) sans requirements de production.",
        "points": 1,
        "options": [
          { "label": "Le build est pour les tests internes, pas pour les stores", "isCorrect": true, "order": 0 },
          { "label": "Le build utilise un serveur interne", "isCorrect": false, "order": 1 },
          { "label": "Le build est chiffré", "isCorrect": false, "order": 2 },
          { "label": "Le build est optimisé pour la taille", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un pipeline CI/CD, quelle étape doit être exécutée en premier ?",
        "explanation": "Le linting et les tests unitaires doivent être exécutés avant le build pour détecter les erreurs de code, les bugs de logique et les violations de style dès le début du pipeline, réduisant les coûts de build inutiles.",
        "points": 1,
        "options": [
          { "label": "Lint et tests unitaires", "isCorrect": true, "order": 0 },
          { "label": "Le build de production", "isCorrect": false, "order": 1 },
          { "label": "La publication sur les stores", "isCorrect": false, "order": 2 },
          { "label": "La compilation des assets", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  }
];

export default exercises;
