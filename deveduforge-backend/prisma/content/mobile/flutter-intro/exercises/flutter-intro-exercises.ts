const exercises = [
  {
    "title": "Quiz - Introduction à Dart et Flutter",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est l'avantage principal de Flutter par rapport à React Native en termes de rendu ?",
        "explanation": "Flutter dessine chaque pixel à l'écran via son propre moteur grafique (Skia/Impeller), offrant une cohérence visuelle identique sur toutes les plateformes. React Native utilise des composants natifs sous-jacents, ce qui peut causer des différences visuelles.",
        "points": 2,
        "options": [
          { "label": "Flutter dessine chaque pixel via son propre moteur grafique", "isCorrect": true, "order": 0 },
          { "label": "Flutter utilise les composants natifs d'iOS et Android", "isCorrect": false, "order": 1 },
          { "label": "Flutter est plus lent mais plus flexible", "isCorrect": false, "order": 2 },
          { "label": "Flutter ne supporte pas le web", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la différence entre StatelessWidget et StatefulWidget en Flutter ?",
        "explanation": "StatelessWidget est immuable : une fois créé, il ne change pas. StatefulWidget a un état mutable via State et peut se reconstruire avec setState() quand l'état change.",
        "points": 2,
        "options": [
          { "label": "StatefulWidget a un état mutable via setState, Stateless est immuable", "isCorrect": true, "order": 0 },
          { "label": "StatelessWidget est plus rapide que StatefulWidget", "isCorrect": false, "order": 1 },
          { "label": "StatefulWidget ne peut pas avoir d'enfants", "isCorrect": false, "order": 2 },
          { "label": "Ils sont interchangeables", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel opérateur Dart gère les valeurs null de manière concise ?",
        "explanation": "L'opérateur ?? (null-aware) retourne la valeur de gauche si elle n'est pas null, sinon la valeur de droite. C'est un raccourci pour `x != null ? x : defaultValue`.",
        "points": 2,
        "options": [
          { "label": "?? (null-aware operator)", "isCorrect": true, "order": 0 },
          { "label": "? : (ternaire)", "isCorrect": false, "order": 1 },
          { "label": "|| (ou logique)", "isCorrect": false, "order": 2 },
          { "label": "??= (null-aware assign)", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Qu'est-ce que le hot reload en Flutter ?",
        "explanation": "Le hot reload insère le code modifié en cours d'exécution sans redémarrer l'application, en conservant l'état actuel. Il permet de voir les changements en < 1 seconde, accélérant considérablement le développement.",
        "points": 1,
        "options": [
          { "label": "Il met à jour le code en conservant l'état en < 1 seconde", "isCorrect": true, "order": 0 },
          { "label": "Il redémarre complètement l'application", "isCorrect": false, "order": 1 },
          { "label": "Il ne fonctionne que sur Android", "isCorrect": false, "order": 2 },
          { "label": "Il compile le code en bytecode", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans quel dossier se trouve le point d'entrée principal d'une app Flutter ?",
        "explanation": "Le fichier main.dart dans le dossier lib/ est le point d'entrée de toute application Flutter. C'est là qu'on définit la fonction main() et le widget racine.",
        "points": 1,
        "options": [
          { "label": "lib/main.dart", "isCorrect": true, "order": 0 },
          { "label": "src/index.dart", "isCorrect": false, "order": 1 },
          { "label": "app/main.dart", "isCorrect": false, "order": 2 },
          { "label": "bin/flutter.dart", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Layouts et Design",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la direction par défaut de Column en Flutter ?",
        "explanation": "Column dispose ses enfants verticalement, de haut en bas. La direction par défaut de Row est horizontale, de gauche à droite.",
        "points": 2,
        "options": [
          { "label": "Vertical, de haut en bas", "isCorrect": true, "order": 0 },
          { "label": "Horizontal, de gauche à droite", "isCorrect": false, "order": 1 },
          { "label": "Diagonal", "isCorrect": false, "order": 2 },
          { "label": "Selon l'axe principal", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel widget permet de superposer des éléments les uns par-dessus les autres ?",
        "explanation": "Stack place ses enfants en superposition. Avec Positioned, on peut placer chaque enfant à une position absolue dans le Stack (top, left, right, bottom).",
        "points": 2,
        "options": [
          { "label": "Stack", "isCorrect": true, "order": 0 },
          { "label": "Column", "isCorrect": false, "order": 1 },
          { "label": "Row", "isCorrect": false, "order": 2 },
          { "label": "Wrap", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel widget remplace Expanded pour occuper l'espace restant dans un Row ?",
        "explanation": "Spacer occupe tout l'espace restant sans contenu visible. Expanded est utilisé quand on veut un widget qui grandit pour remplir l'espace, tandis que Spacer crée simplement un espace vide flexible.",
        "points": 2,
        "options": [
          { "label": "Spacer (ou Expanded sans contenu)", "isCorrect": true, "order": 0 },
          { "label": "Container", "isCorrect": false, "order": 1 },
          { "label": "SizedBox avec double.infinity", "isCorrect": false, "order": 2 },
          { "label": "Align", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel widget est le plus approprié pour afficher une longue liste défilante ?",
        "explanation": "ListView.builder crée les éléments à la volée au fur et à mesure du défilement, offrant de bien meilleures performances que ListView(children: [...]) qui crée tous les éléments en mémoire.",
        "points": 1,
        "options": [
          { "label": "ListView.builder (construction paresseuse)", "isCorrect": true, "order": 0 },
          { "label": "ListView(children: [...]) (tout en mémoire)", "isCorrect": false, "order": 1 },
          { "label": "Column dans une SingleChildScrollView", "isCorrect": false, "order": 2 },
          { "label": "Wrap", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment appliquer un thème Material 3 dans Flutter ?",
        "explanation": "On passe useMaterial3: true dans ThemeData. Cela active le nouveau système de design Material You avec des couleurs dynamiques basées sur le fond d'écran de l'appareil.",
        "points": 1,
        "options": [
          { "label": "En définissant useMaterial3: true dans ThemeData", "isCorrect": true, "order": 0 },
          { "label": "En important le package material3", "isCorrect": false, "order": 1 },
          { "label": "En utilisant le widget Material3App", "isCorrect": false, "order": 2 },
          { "label": "En activant le mode dark", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Navigation et Gestion d'État",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel package est recommandé pour la navigation déclarative dans Flutter moderne ?",
        "explanation": "GoRouter est le package officiellement recommandé pour la navigation déclarative dans Flutter. Il supporte les routes nommées, les routes imbriquées (ShellRoute) et la gestion des erreurs de navigation.",
        "points": 2,
        "options": [
          { "label": "GoRouter", "isCorrect": true, "order": 0 },
          { "label": "Navigator 1.0 classique", "isCorrect": false, "order": 1 },
          { "label": "auto_route", "isCorrect": false, "order": 2 },
          { "label": "fluro", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans Provider, quelle méthode met à jour l'état et notifie les écouteurs ?",
        "explanation": "notifyListeners() dans un ChangeNotifier est appelée après chaque modification d'état. Elle notifie tous les widgets qui écoutent ce provider (via context.watch ou Consumer) pour qu'ils se reconstruisent.",
        "points": 2,
        "options": [
          { "label": "notifyListeners()", "isCorrect": true, "order": 0 },
          { "label": "updateState()", "isCorrect": false, "order": 1 },
          { "label": "setState()", "isCorrect": false, "order": 2 },
          { "label": "emit()", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la différence entre context.watch() et context.read() dans Provider ?",
        "explanation": "context.watch() écoute les changements et reconstruit le widget à chaque notification. context.read() accède à l'état sans écouter les changements — idéal pour les callbacks qui ne déclenchent pas de rebuild.",
        "points": 2,
        "options": [
          { "label": "watch reconstruit à chaque changement, read accède sans écouter", "isCorrect": true, "order": 0 },
          { "label": "Ils sont strictement identiques", "isCorrect": false, "order": 1 },
          { "label": "read est plus rapide que watch", "isCorrect": false, "order": 2 },
          { "label": "watch fonctionne uniquement dans les StatefulWidget", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment passer des paramètres avec GoRouter ?",
        "explanation": "On définit les paramètres dans le path (ex: /profil/:id) et on les récupère avec state.pathParameters['id'] dans le builder. C'est une approche déclarative et type-safe.",
        "points": 1,
        "options": [
          { "label": "En définissant des paramètres dans le path et en les récupérant via state.pathParameters", "isCorrect": true, "order": 0 },
          { "label": "En utilisant des arguments globaux", "isCorrect": false, "order": 1 },
          { "label": "En passant un Map en second paramètre de context.go()", "isCorrect": false, "order": 2 },
          { "label": "GoRouter ne supporte pas les paramètres", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi doit-on appeler dispose() sur les TextEditingController ?",
        "explanation": "TextEditingController alloue des ressources système. Sans dispose(), ces ressources ne sont jamais libérées, ce qui cause des fuites de mémoire (memory leaks), notamment dans les formulaires avec plusieurs champs.",
        "points": 1,
        "options": [
          { "label": "Pour libérer les ressources et éviter les fuites de mémoire", "isCorrect": true, "order": 0 },
          { "label": "C'est juste une convention de style", "isCorrect": false, "order": 1 },
          { "label": "Pour réinitialiser le texte du champ", "isCorrect": false, "order": 2 },
          { "label": "Pour afficher le clavier", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Formulaires et API",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel widget Flutter permet de valider un formulaire avec des règles personnalisées ?",
        "explanation": "Form avec un GlobalKey<FormState> et TextFormField avec la prop validator permettent de valider chaque champ. La méthode validate() du formKey déclenche tous les validateurs et retourne true si tous les champs sont valides.",
        "points": 2,
        "options": [
          { "label": "Form + TextFormField avec validator", "isCorrect": true, "order": 0 },
          { "label": "Container + Input", "isCorrect": false, "order": 1 },
          { "label": "TextField avec onChange", "isCorrect": false, "order": 2 },
          { "label": "Text + GestureDetector", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel package Dart est le standard pour les appels HTTP ?",
        "explanation": "Le package 'http' est le package officiel pour les requêtes HTTP dans Dart. Il fournit des fonctions simples pour GET, POST, PUT, DELETE et supporte la sérialisation JSON.",
        "points": 2,
        "options": [
          { "label": "Le package http (package:http/http.dart)", "isCorrect": true, "order": 0 },
          { "label": "axios", "isCorrect": false, "order": 1 },
          { "label": "fetch", "isCorrect": false, "order": 2 },
          { "label": "dio est le seul choix possible", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment Flutter affiche-t-il un état de chargement pendant un appel API asynchrone ?",
        "explanation": "FutureBuilder écoute un Future (comme un appel API) et affiche différents widgets selon l'état : waiting (circular progress), hasData (données), hasError (erreur). C'est le widget standard pour les opérations asynchrones.",
        "points": 2,
        "options": [
          { "label": "Avec FutureBuilder qui gère les états waiting/data/error du Future", "isCorrect": true, "order": 0 },
          { "label": "Avec un if/else classique", "isCorrect": false, "order": 1 },
          { "label": "Avec un try/catch dans build()", "isCorrect": false, "order": 2 },
          { "label": "Avec setState directement", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Pourquoi faut-il appeler dispose() sur les TextEditingController dans un StatefulWidget ?",
        "explanation": "Sans dispose(), les contrôleurs allouent des ressources qui ne sont jamais libérées, causant des fuites de mémoire. dispose() est appelé automatiquement quand le widget est démonté de l'arbre.",
        "points": 1,
        "options": [
          { "label": "Pour libérer les ressources et éviter les fuites de mémoire", "isCorrect": true, "order": 0 },
          { "label": "Pour réinitialiser le texte à chaque rebuild", "isCorrect": false, "order": 1 },
          { "label": "C'est optionnel et sans impact", "isCorrect": false, "order": 2 },
          { "label": "Pour activer la validation automatique", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment gérer les erreurs réseau dans un appel API Flutter ?",
        "explanation": "On utilise try/catch autour de l'appel http. Si le status code n'est pas 200, on lève une exception. Le FutureBuilder捕获 cette erreur via snapshot.hasError et affiche un message avec un bouton réessayer.",
        "points": 1,
        "options": [
          { "label": "try/catch + vérification du status code + UI d'erreur dans FutureBuilder", "isCorrect": true, "order": 0 },
          { "label": "Ignorer les erreurs silencieusement", "isCorrect": false, "order": 1 },
          { "label": "Utiliser un timer pour réessayer automatiquement", "isCorrect": false, "order": 2 },
          { "label": "Afficher les erreurs techniques à l'utilisateur", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  }
];

export default exercises;
