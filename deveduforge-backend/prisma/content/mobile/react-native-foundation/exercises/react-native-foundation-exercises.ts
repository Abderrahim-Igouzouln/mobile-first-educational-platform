const exercises = [
  {
    "title": "Quiz - Environnement Expo",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel outil simplifie la configuration d'un projet React Native ?",
        "explanation": "Expo fournit une abstraction au-dessus de la configuration native, permettant de démarrer un projet sans Xcode ni Android Studio au début.",
        "points": 2,
        "options": [
          {
            "label": "Expo CLI",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Webpack",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Create React App",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Gradle",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel composant React Native remplace <div> du web ?",
        "explanation": "View est le conteneur de base React Native. Il se rend en une vue native sur iOS (UIView) et Android (android.view.View).",
        "points": 2,
        "options": [
          {
            "label": "View",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Container",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Box",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Section",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi tout texte doit-il être wrappé dans <Text> ?",
        "explanation": "React Native rend le texte via des composants natifs (UITextView / android.widget.TextView). Un string brut hors de <Text> ne peut pas être rendu nativement et provoque une erreur.",
        "points": 2,
        "options": [
          {
            "label": "Parce que le texte doit être rendu via un composant natif",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Parce que React l'exige pour le JSX",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "C'est juste une convention, pas une obligation",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour des raisons de performance uniquement",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment styliser un composant React Native ?",
        "explanation": "StyleSheet.create retourne un objet de styles optimisé. On passe un objet style (ou un tableau d'objets) à la prop style du composant.",
        "points": 1,
        "options": [
          {
            "label": "Via un objet JavaScript passé à la prop style",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Via className avec du CSS externe",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Via des fichiers .css importés",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Via Sass/SCSS",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel composant est recommandé pour afficher une longue liste de données ?",
        "explanation": "FlatList utilise la virtualisation : seuls les éléments visibles sont rendus en mémoire, ce qui est beaucoup plus performant que ScrollView pour les grandes listes.",
        "points": 1,
        "options": [
          {
            "label": "FlatList (virtualisé)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "ScrollView (tout en mémoire)",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "List (composant natif)",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "SectionList (toujours)",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Composants de base",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la direction par défaut de Flexbox en React Native ?",
        "explanation": "Contrairement au web (row), React Native utilise column par défaut. Les enfants s'alignent verticalement, de haut en bas.",
        "points": 2,
        "options": [
          {
            "label": "column (vertical)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "row (horizontal)",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "grid",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "column-reverse",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est l'avantage principal de FlatList par rapport à ScrollView pour les longues listes ?",
        "explanation": "FlatList virtualise la liste : seuls les éléments visibles (plus quelques buffer) sont rendus en mémoire, ce qui permet de gérer des milliers d'éléments sans crash.",
        "points": 2,
        "options": [
          {
            "label": "La virtualisation : seuls les éléments visibles sont rendus",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "FlatList a un meilleur design visuel",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "ScrollView ne supporte pas les listes",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "FlatList ne nécessite pas de key",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment styliser un composant React Native ?",
        "explanation": "On passe un objet JavaScript à la prop style. StyleSheet.create optimise l'envoi des styles au thread natif et améliore les performances.",
        "points": 1,
        "options": [
          {
            "label": "Via un objet style (ou StyleSheet.create)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Via className avec du CSS",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Via un fichier .css importé",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Via inline CSS dans du HTML",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle prop de TextInput contrôle la valeur affichée ?",
        "explanation": "Dans un TextInput contrôlé, value définit ce qui s'affiche, et onChangeText met à jour l'état à chaque frappe. Sans ces deux props, le champ peut devenir incontrôlable.",
        "points": 1,
        "options": [
          {
            "label": "value et onChangeText",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "defaultValue et onChange",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "text et onInput",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "content et onTextChange",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre TouchableOpacity et Pressable ?",
        "explanation": "Pressable est le composant recommandé par React Native pour les interactions. Il est plus flexible (supporte les états hover, pressed, etc.) et plus moderne que TouchableOpacity.",
        "points": 1,
        "options": [
          {
            "label": "Pressable est plus récent et plus flexible, recommandé par React Native",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "TouchableOpacity est plus rapide en performance",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Ils sont exactement identiques",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pressable ne fonctionne que sur iOS",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Navigation",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel est le rôle de NavigationContainer dans React Navigation ?",
        "explanation": "NavigationContainer est le composant racine qui englobe toute l'arborescence de navigation. Sans lui, aucun écran ne peut être affiché via un navigateur.",
        "points": 2,
        "options": [
          {
            "label": "C'est le conteneur racine qui gère l'état de navigation",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "C'est un composant pour afficher un menu",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "C'est une base de données pour stocker la navigation",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "C'est un gestionnaire de permissions",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre navigation.navigate() et navigation.push() ?",
        "explanation": "navigate() réutilise un écran existant dans la pile s'il existe déjà. push() crée toujours une nouvelle instance, même si l'écran est déjà présent.",
        "points": 2,
        "options": [
          {
            "label": "navigate() réutilise l'écran existant, push() en crée un nouveau",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "push() est plus rapide que navigate()",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "navigate() ne passe pas de paramètres",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Ils sont strictement identiques",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment typer les paramètres de navigation en TypeScript ?",
        "explanation": "On définit un type RootStackParamList qui associe chaque nom d'écran à son type de paramètres, puis on passe ce type à createNativeStackNavigator.",
        "points": 2,
        "options": [
          {
            "label": "En définissant un type RootStackParamList passé à createNativeStackNavigator",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "En utilisant des PropTypes",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "React Navigation n'est pas compatible TypeScript",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "En créant un fichier routes.ts séparé",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi éviter de passer de gros objets en paramètres de navigation ?",
        "explanation": "Les params sont sérialisés et passés par copie. De gros objets alourdissent la navigation. Il est préférable de passer un ID simple et de charger les données dans l'écran cible.",
        "points": 1,
        "options": [
          {
            "label": "Les params sont sérialisés et alourdissent la mémoire",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "React Navigation ne supporte que les strings",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Les objets ne peuvent pas être passés en params",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "C'est uniquement un problème de style",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel type de navigateur utilise-t-on pour la navigation par onglets ?",
        "explanation": "createBottomTabNavigator (ou createMaterialTopTabNavigator) est le navigateur adapté aux interfaces à onglets. Il affiche une barre de navigation en bas de l'écran.",
        "points": 1,
        "options": [
          {
            "label": "createBottomTabNavigator",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "createStackNavigator",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "createDrawerNavigator",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "createNativeStackNavigator",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - API natives",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle bibliothèque Expo permet d'accéder à la caméra et à la galerie photos ?",
        "explanation": "expo-image-picker fournit des fonctions pour lancer la caméra (launchCameraAsync) et ouvrir la galerie (launchImageLibraryAsync).",
        "points": 2,
        "options": [
          {
            "label": "expo-image-picker",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "expo-camera",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "expo-media",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "expo-photos",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi doit-on toujours demander une permission avant d'utiliser une API native ?",
        "explanation": "Les systèmes iOS et Android exigent le consentement explicite de l'utilisateur pour des raisons de confidentialité. Sans permission, l'API lève une erreur ou retourne null.",
        "points": 2,
        "options": [
          {
            "label": "Pour respecter la confidentialité et la législation (RGPD)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "C'est juste une convention de codage",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "React Native l'exige pour le JSX",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour améliorer les performances de l'API",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment obtenir la position GPS actuelle de l'utilisateur ?",
        "explanation": "expo-location fournit getCurrentPositionAsync qui retourne les coordonnées GPS (latitude, longitude) avec un niveau de précision configurable.",
        "points": 2,
        "options": [
          {
            "label": "Location.getCurrentPositionAsync()",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Geolocation.getCurrentPosition()",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "navigator.geolocation.watchPosition()",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Location.getPosition()",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment gérer le refus de permission par l'utilisateur ?",
        "explanation": "Il faut vérifier le status retourné par requestPermissionsAsync(). Si le status est 'denied', afficher un message clair et éventuellement un lien vers les paramètres de l'appareil.",
        "points": 1,
        "options": [
          {
            "label": "Vérifier le status et afficher un message avec lien vers les paramètres",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Relancer la demande automatiquement en boucle",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Ignorer et continuer sans permission",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Afficher une erreur technique à l'utilisateur",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel module Expo permet de programmer des notifications locales ?",
        "explanation": "expo-notifications offre scheduleNotificationAsync pour programmer des notifications futures avec un déclencheur (timer, date, ou condition).",
        "points": 1,
        "options": [
          {
            "label": "expo-notifications",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "expo-alarms",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "expo-push",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "expo-reminders",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  }
];

export default exercises;
