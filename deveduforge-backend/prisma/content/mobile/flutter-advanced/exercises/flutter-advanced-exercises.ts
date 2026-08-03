const exercises = [
  {
    "title": "Quiz - State Management Avancé avec Bloc",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la différence fondamentale entre un Cubit et un Bloc ?",
        "explanation": "Un Cubit émet des états directement depuis des méthodes, tandis qu'un Bloc utilise des événements : les événements entrent dans le Bloc, qui les traite et émet de nouveaux états. Le Bloc offre un audit trail complet de tous les changements d'état.",
        "points": 2,
        "options": [
          { "label": "Le Bloc utilise des événements, le Cubit émet des états depuis des méthodes", "isCorrect": true, "order": 0 },
          { "label": "Le Cubit est plus performant que le Bloc", "isCorrect": false, "order": 1 },
          { "label": "Ils sont strictement identiques", "isCorrect": false, "order": 2 },
          { "label": "Le Bloc ne supporte pas les états asynchrones", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel package fournit les widgets BlocBuilder, BlocListener et BlocConsumer ?",
        "explanation": "Le package flutter_bloc fournit tous les widgets nécessaires pour consommer un BLoC dans l'arbre de widgets. Il inclut aussi BlocProvider pour fournir le BLoC aux descendants.",
        "points": 2,
        "options": [
          { "label": "flutter_bloc", "isCorrect": true, "order": 0 },
          { "label": "bloc_provider", "isCorrect": false, "order": 1 },
          { "label": "provider_bloc", "isCorrect": false, "order": 2 },
          { "label": "flutter_state", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans le pattern BLoC, quelle est la bonne pratique pour définir les états ?",
        "explanation": "Les états doivent être immutables et utiliser Equatable pour la comparaison. Chaque état est une classe distincte (Initial, Chargement, Charge, Erreur) ce qui rend le code explicite et testable.",
        "points": 2,
        "options": [
          { "label": "Des classes immutables basées sur Equatable, une classe par état", "isCorrect": true, "order": 0 },
          { "label": "Des Map<String, dynamic> pour flexibilité", "isCorrect": false, "order": 1 },
          { "label": "Un seul état avec des booléens (isLoading, isError)", "isCorrect": false, "order": 2 },
          { "label": "Des enum pour tous les cas", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quand utiliser BlocConsumer plutôt que BlocBuilder seul ?",
        "explanation": "BlocConsumer combine un BlocBuilder (reconstruit l'UI) et un BlocListener (exécute des side-effects comme des SnackBars). On l'utilise quand on veut reconstruire l'interface ET exécuter une action au changement d'état.",
        "points": 1,
        "options": [
          { "label": "Quand on veut reconstruire l'UI ET exécuter des side-effects", "isCorrect": true, "order": 0 },
          { "label": "Quand on veut uniquement reconstruire l'UI", "isCorrect": false, "order": 1 },
          { "label": "Pour des raisons de performance uniquement", "isCorrect": false, "order": 2 },
          { "label": "BlocConsumer est toujours préférable à BlocBuilder", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans flutter_bloc, comment fournit-on un BLoC aux widgets descendants ?",
        "explanation": "BlocProvider( create: (context) => MonBloc() ) doit être placé au-dessus dans l'arbre de widgets. Les descendants peuvent ensuite accéder au BLoC via context.read<MonBloc>() ou context.watch<MonBloc>().",
        "points": 2,
        "options": [
          { "label": "Avec BlocProvider placé au-dessus dans l'arbre de widgets", "isCorrect": true, "order": 0 },
          { "label": "En important le BLoC directement dans chaque widget", "isCorrect": false, "order": 1 },
          { "label": "Avec un global key", "isCorrect": false, "order": 2 },
          { "label": "Via une variable globale", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Firebase en Flutter",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel package Firebase gère l'authentification email/mot de passe dans Flutter ?",
        "explanation": "firebase_auth fournit des méthodes comme createUserWithEmailAndPassword() et signInWithEmailAndPassword() pour gérer l'authentification. Il s'intègre avec Firebase Core pour l'initialisation.",
        "points": 2,
        "options": [
          { "label": "firebase_auth", "isCorrect": true, "order": 0 },
          { "label": "firebase_login", "isCorrect": false, "order": 1 },
          { "label": "firebase_auth_service", "isCorrect": false, "order": 2 },
          { "label": "firebase_user", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment écouter les changements d'état d'authentification dans Firebase ?",
        "explanation": "FirebaseAuth.instance.authStateChanges() retourne un Stream<User?>. On peut l'utiliser avec un StreamBuilder pour réagir automatiquement à la connexion/déconnexion de l'utilisateur.",
        "points": 2,
        "options": [
          { "label": "Avec FirebaseAuth.instance.authStateChanges() qui retourne un Stream<User?>", "isCorrect": true, "order": 0 },
          { "label": "Avec un poll toutes les secondes", "isCorrect": false, "order": 1 },
          { "label": "Avec un callback onAuthStateChanged", "isCorrect": false, "order": 2 },
          { "label": "En vérifiant localStorage à chaque frame", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans Cloud Firestore, comment structurer les données pour qu'elles soient isolées par utilisateur ?",
        "explanation": "La bonne pratique est d'utiliser une collection imbriquée : users/{uid}/expenses. Cela garantit que chaque utilisateur ne peut accéder qu'à ses propres données via les Security Rules de Firestore.",
        "points": 2,
        "options": [
          { "label": "Collection imbriquée users/{uid}/expenses", "isCorrect": true, "order": 0 },
          { "label": "Une seule collection 'expenses' avec un champ userId", "isCorrect": false, "order": 1 },
          { "label": "Un seul document par utilisateur avec toutes les données", "isCorrect": false, "order": 2 },
          { "label": "Des fichiers JSON séparés", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel est le rôle de Firebase.initializeApp() au démarrage ?",
        "explanation": "Firebase.initializeApp() configure la connexion Firebase avec les paramètres de l'appareil (google-services.json pour Android, GoogleService-Info.plist pour iOS). Sans cet appel, aucun service Firebase ne peut fonctionner.",
        "points": 1,
        "options": [
          { "label": "Initialiser la connexion Firebase avec la configuration de l'appareil", "isCorrect": true, "order": 0 },
          { "label": "Créer une nouvelle base de données Firebase", "isCorrect": false, "order": 1 },
          { "label": "Installer les packages Firebase", "isCorrect": false, "order": 2 },
          { "label": "Connecter l'app à internet", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment Firebase Storage gère-t-il l'upload de fichiers avec progression ?",
        "explanation": "putFile() retourne un UploadTask. On peut écouter snapshotEvents pour obtenir la progression (bytesTransferred / totalBytes). Une fois terminé, getDownloadURL() retourne l'URL du fichier uploadé.",
        "points": 1,
        "options": [
          { "label": "Via putFile() et l'écoute de snapshotEvents pour la progression", "isCorrect": true, "order": 0 },
          { "label": "Via un simple POST avec fetch", "isCorrect": false, "order": 1 },
          { "label": "Via upload() qui retourne directement l'URL", "isCorrect": false, "order": 2 },
          { "label": "Firebase Storage ne supporte pas la progression", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Animations et Widgets Custom",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel mixin doit-on ajouter à une StatefulWidget pour utiliser AnimationController ?",
        "explanation": "TickerProviderStateMixin fournit un Ticker nécessaire au AnimationController pour synchroniser les animations avec les frames de l'écran (vsync). SingleTickerProviderStateMixin est utilisé pour un seul controller.",
        "points": 2,
        "options": [
          { "label": "TickerProviderStateMixin", "isCorrect": true, "order": 0 },
          { "label": "AnimationMixin", "isCorrect": false, "order": 1 },
          { "label": "StateMixin", "isCorrect": false, "order": 2 },
          { "label": "ControllerMixin", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que fait Tween dans le système d'animations Flutter ?",
        "explanation": "Tween (short for 'in-betweening') définit la plage de valeurs entre le début et la fin d'une animation. Par exemple, Tween<double>(begin: 0, end: 100) interpolate de 0 à 100. Tween ne contient pas la durée — c'est le AnimationController qui la gère.",
        "points": 2,
        "options": [
          { "label": "Il définit la plage de valeurs (begin → end) d'une animation", "isCorrect": true, "order": 0 },
          { "label": "Il définit la durée de l'animation", "isCorrect": false, "order": 1 },
          { "label": "Il démarre l'animation", "isCorrect": false, "order": 2 },
          { "label": "Il dessine les frames", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment fonctionne le widget Hero en Flutter ?",
        "explanation": "Hero crée une animation de transition entre deux écrans en identifiant le widget source et cible via un 'tag' identique. Quand on navigue, Flutter anime automatiquement le widget du point de départ vers le point d'arrivée.",
        "points": 2,
        "options": [
          { "label": "Il anime un widget d'une position à une autre via un tag identique sur deux écrans", "isCorrect": true, "order": 0 },
          { "label": "Il ajoute un effet de super-héros sur les boutons", "isCorrect": false, "order": 1 },
          { "label": "Il crée une animation de fondu entre les écrans", "isCorrect": false, "order": 2 },
          { "label": "Il redimensionne automatiquement les widgets", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "À quoi sert CustomPainter en Flutter ?",
        "explanation": "CustomPainter permet de dessiner du contenu personnalisé directement sur un Canvas avec des outils comme drawLine, drawRect, drawCircle, etc. C'est idéal pour les graphiques, les formes personnalisées et les décorations uniques.",
        "points": 1,
        "options": [
          { "label": "Dessiner du contenu personnalisé sur un Canvas (graphiques, formes, etc.)", "isCorrect": true, "order": 0 },
          { "label": "Créer des animations complexes", "isCorrect": false, "order": 1 },
          { "label": "Remplacer les widgets Material", "isCorrect": false, "order": 2 },
          { "label": "Gérer la navigation entre écrans", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Qu'est-ce qu'une animation staggered (décalée) ?",
        "explanation": "Une animation staggered déclenche plusieurs animations en séquence avec des délais différents. Chaque animation a un interval de début/fin différent, créant un effet cascadé ou séquentiel.",
        "points": 1,
        "options": [
          { "label": "Plusieurs animations lancées en séquence avec des délais décalés", "isCorrect": true, "order": 0 },
          { "label": "Une animation qui se répète en boucle", "isCorrect": false, "order": 1 },
          { "label": "Une animation qui accélère puis ralentit", "isCorrect": false, "order": 2 },
          { "label": "Un type de courbe d'accélération", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Tests et CI/CD",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel type de test simule les interactions utilisateur sans émulateur ?",
        "explanation": "Les widget tests utilisent le widget test runner de Flutter pour simuler des taps, des entrées de texte, et vérifier l'arbre de widgets. Ils sont plus rapides que les tests d'intégration car ils n'exigent pas d'émulateur.",
        "points": 2,
        "options": [
          { "label": "Widget tests (flutter_test)", "isCorrect": true, "order": 0 },
          { "label": "Integration tests", "isCorrect": false, "order": 1 },
          { "label": "Unit tests", "isCorrect": false, "order": 2 },
          { "label": "E2E tests uniquement", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle commande lance tous les tests d'un projet Flutter ?",
        "explanation": "flutter test exécute tous les tests unitaires et widget tests trouvés dans le dossier test/. Les integration tests sont lancés séparément avec flutter test integration_test/.",
        "points": 2,
        "options": [
          { "label": "flutter test", "isCorrect": true, "order": 0 },
          { "label": "flutter run --tests", "isCorrect": false, "order": 1 },
          { "label": "dart test --flutter", "isCorrect": false, "order": 2 },
          { "label": "flutter check", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un test widget, que fait la méthode tester.pump() ?",
        "explanation": "pump() déclenche un rebuild de l'arbre de widgets, simulant un frame de rendu. pumpAndSettle() attend que toutes les animations et timers soient terminés avant de continuer.",
        "points": 2,
        "options": [
          { "label": "Déclenche un rebuild de l'arbre de widgets (un frame de rendu)", "isCorrect": true, "order": 0 },
          { "label": "Lance l'application", "isCorrect": false, "order": 1 },
          { "label": "Nettoie les ressources du test", "isCorrect": false, "order": 2 },
          { "label": "Compile le code", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel est le rôle de Codemagic dans le développement Flutter ?",
        "explanation": "Codemagic est un service CI/CD cloud spécialement conçu pour Flutter. Il automatise les étapes de build, test et publication sur les stores (Play Store, App Store) à chaque push dans le dépôt.",
        "points": 1,
        "options": [
          { "label": "Service CI/CD cloud qui automatise les builds, tests et publications Flutter", "isCorrect": true, "order": 0 },
          { "label": "Un éditeur de code pour Flutter", "isCorrect": false, "order": 1 },
          { "label": "Un outil de debug Flutter", "isCorrect": false, "order": 2 },
          { "label": "Un package Dart pour les tests", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un pipeline CI/CD, quelle étape doit toujours précéder le build ?",
        "explanation": "Les tests (unitaires, widget) et le linting doivent être exécutés avant le build pour détecter les erreurs tôt. Un build qui échoue après les tests coûte moins cher qu'un build publication qui contient des bugs.",
        "points": 1,
        "options": [
          { "label": "L'exécution des tests et du linting", "isCorrect": true, "order": 0 },
          { "label": "La publication sur les stores", "isCorrect": false, "order": 1 },
          { "label": "La génération de la documentation", "isCorrect": false, "order": 2 },
          { "label": "Le commit des changements", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  }
];

export default exercises;
