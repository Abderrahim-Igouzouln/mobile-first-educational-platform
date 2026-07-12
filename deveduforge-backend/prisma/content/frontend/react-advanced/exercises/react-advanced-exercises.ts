const exercises = [
  {
    "title": "Quiz - Hooks personnalisés",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Qu'est-ce qui caractérise un hook personnalisé valide en React ?",
        "explanation": "Un hook personnalisé doit commencer par 'use' pour que React puisse vérifier les règles des hooks. Il peut appeler d'autres hooks et retourne des valeurs ou des fonctions, mais ne contient pas de JSX.",
        "points": 2,
        "options": [
          {
            "label": "C'est une fonction commençant par 'use' qui peut appeler d'autres hooks",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "C'est un composant sans JSX retourné",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "C'est un class qui étend Component",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "C'est un module ES6 exporté par défaut",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans useDebounce, pourquoi la fonction de nettoyage clearTimeout est-elle indispensable ?",
        "explanation": "Sans clearTimeout, chaque frappe de clavier crée un nouveau timer. L'ancien timer peut encore se déclencher et écraser la valeur débounced avec une valeur obsolète, causant des résultats incohérents.",
        "points": 2,
        "options": [
          {
            "label": "Pour éviter que l'ancien timer écrase la nouvelle valeur",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour libérer la mémoire du composant",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "C'est une convention React sans impact fonctionnel",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour empêcher les erreurs dans la console",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi le useState initializer dans useLocalStorage utilise-t-il une fonction ?",
        "explanation": "L'initializer en fonction est évalué une seule fois au montage. Sans lui, JSON.parse serait appelé à chaque rendu même si la valeur initiale ne change jamais, ce qui gaspille de la performance.",
        "points": 2,
        "options": [
          {
            "label": "Pour que l'initialisation ne se fasse qu'une seule fois au montage",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour éviter les erreurs de typage TypeScript",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour permettre l'accès à localStorage",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour que React puisse nettoyer le state automatiquement",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est le risque principal d'appeler un hook à l'intérieur d'une condition ?",
        "explanation": "React identifie les hooks par leur ordre d'appel. Si un hook est appelé conditionnellement, l'ordre change entre les rendus, et React associe les mauvais états aux mauvais hooks, causant des bugs imprévisibles.",
        "points": 2,
        "options": [
          {
            "label": "L'ordre des hooks change et React associe les mauvais états",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "React ignore silencieusement le hook",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Une erreur de compilation TypeScript est levée",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Le composant ne se démonte plus correctement",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans useMediaQuery, pourquoi doit-on nettoyer l'écouteur d'événement change ?",
        "explanation": "Si l'écouteur n'est pas retiré au démontage, il continue d'exister en mémoire et tente de mettre à jour l'état d'un composant démonté, provoquant une fuite mémoire et potentiellement des erreurs.",
        "points": 1,
        "options": [
          {
            "label": "Pour éviter les fuites mémoire et les mises à jour sur composant démonté",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Parce que React lève une erreur sans nettoyage",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour que le prochain rendu soit plus rapide",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour permettre un nouvel appel au prochain mount",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - useContext et Performance",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Pourquoi faut-il séparer les contextes en React pour optimiser les performances ?",
        "explanation": "Quand la valeur d'un contexte change, tous ses consommateurs sont re-rendus. En séparant les données par fréquence de changement, un changement de thème ne re-rendera pas les consommateurs du contexte utilisateur, et inversement.",
        "points": 2,
        "options": [
          {
            "label": "Pour que chaque consommateur ne se re-render que quand SA valeur change",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour réduire le nombre de fichiers dans le projet",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour que TypeScript valide les props plus rapidement",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour éviter les erreurs de runtime",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un Provider, pourquoi faut-il utiliser useCallback sur les fonctions passées en valeur ?",
        "explanation": "Sans useCallback, chaque rendu du Provider crée une nouvelle référence de fonction. Même si React.memo est utilisé sur les enfants, la nouvelle référence de fonction force leur re-rendu.",
        "points": 2,
        "options": [
          {
            "label": "Pour stabiliser la référence de la fonction entre les rendus",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour que la fonction soit asynchrone",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour que la fonction puisse accéder au state",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour éviter les erreurs TypeScript",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Que fait React.memo exactement sur un composant ?",
        "explanation": "React.memo effectue une comparaison shallow (comparaison superficielle) des props avant de re-render le composant. Si les props n'ont pas changé (même référence), le re-rendu est ignoré.",
        "points": 2,
        "options": [
          {
            "label": "Il ignore le re-rendu si les props n'ont pas changé (comparaison shallow)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Il empêche tout re-render du composant",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Il met en cache le JSX rendu",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Il optimise automatiquement tous les hooks du composant",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre useMemo et useCallback ?",
        "explanation": "useMemo mémoïse une valeur calculée (retourne le résultat), tandis que useCallback mémoïse une fonction (retourne la fonction elle-même). useCallback est essentiellement useMemo pour les fonctions.",
        "points": 2,
        "options": [
          {
            "label": "useMemo mémoïse une valeur, useCallback mémoïse une fonction",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Ils sont identiques, juste des alias",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "useMemo est pour les classes, useCallback pour les fonctions",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "useCallback est plus rapide que useMemo",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans React DevTools Profiler, qu'est-ce qu'un render 'wasted' ?",
        "explanation": "Un render 'wasted' est un re-render qui n'a produit aucun changement visible dans le DOM. C'est un signal que le composant se re-render sans raison — il faut optimiser ses dépendances ou utiliser React.memo.",
        "points": 1,
        "options": [
          {
            "label": "Un re-render qui n'a produit aucun changement visible dans le DOM",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Un re-render qui utilise trop de mémoire",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Un re-render déclenché par une erreur",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Un re-render qui prend plus de 16ms",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Patterns de Composition",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel pattern utilise un Context pour créer une API implicite entre un composant parent et ses enfants ?",
        "explanation": "Compound Components utilisent un Context partagé pour que les enfants (Tab, TabPanel) puissent accéder à l'état du parent (Tabs) sans props explicites, créant une API naturelle et déclarative.",
        "points": 2,
        "options": [
          {
            "label": "Compound Components",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Higher-Order Components",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Render Props",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Slots",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans le pattern Render Props, que retourne le composant enfant ?",
        "explanation": "Le Render Props passe une fonction (render) en prop. Le composant enfant appelle cette fonction avec son état interne, et la fonction retourne le JSX que le parent veut afficher.",
        "points": 2,
        "options": [
          {
            "label": "Il appelle la fonction render reçue en prop avec ses données internes",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Il retourne un composant React.memo",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Il rend directement ses children",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Il retourne un objet avec les données formatées",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi les HOC sont-ils moins utilisés aujourd'hui qu'avant ?",
        "explanation": "Les hooks personnalisés offrent la même réutilisabilité de logique avec une syntaxe plus lisible, sans wrapper d'arbre ni problèmes de typage. Les HOC restent valides mais les hooks sont préférés dans le code moderne.",
        "points": 2,
        "options": [
          {
            "label": "Les hooks personnalisés offrent la même chose avec une syntaxe plus lisible",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Les HOC sont dépréciés par React depuis la version 18",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Les HOC ne fonctionnent pas avec TypeScript",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Les HOC causent des erreurs de performance systématiques",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un composant Button flexible, à quoi servent les props restantes (...rest) ?",
        "explanation": "Les props restantes permettent au composant Button d'hériter de tous les attributs natifs d'un élément button HTML (onClick, type, aria-*, data-*, etc.) sans les redéfinir un par un.",
        "points": 2,
        "options": [
          {
            "label": "Hériter des attributs natifs du DOM (onClick, type, aria-*, etc.)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Passer les props aux hooks internes",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Permettre l'héritage de classe",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Stabiliser les références de fonctions",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est le principal avantage du pattern Slots pour un layout ?",
        "explanation": "Slots séparent la structure du layout (grille, en-tête, sidebar) du contenu qui l'occupe. Le parent décide quoi mettre dans chaque zone, rendant le layout réutilisable pour différentes pages sans modifier le composant layout.",
        "points": 1,
        "options": [
          {
            "label": "Le parent contrôle le contenu de chaque zone du layout sans modifier le layout",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Les slots améliorent automatiquement les performances",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Les slots permettent le SSR (server-side rendering)",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Les slots éliminent le besoin de props",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Tests et Déploiement",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Pourquoi React Testing Library privilégie-t-il les query par rôle (getByRole) plutôt que par sélecteur CSS ?",
        "explanation": "Les query par rôle testent l'accessibilité du composant. Un test qui passe avec getByRole garantit que l'élément est accessible aux technologies d'assistance, ce qui n'est pas le cas avec un sélecteur CSS qui peut être changé sans impact fonctionnel.",
        "points": 2,
        "options": [
          {
            "label": "Elles testent l'accessibilité et sont plus stables que les sélecteurs CSS",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Elles sont plus rapides en exécution",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Elles ne nécessitent pas d'assertions supplémentaires",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Elles fonctionnent uniquement avec TypeScript",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans Vitest, à quoi sert vi.restoreAllMocks() dans beforeEach ?",
        "explanation": "restoreAllMocks restaure tous les mocks (spyOn, mock, etc.) à leur état d'origine avant chaque test. Sans cela, un mock d'un test peut contaminer les suivants, causant des tests instables (flaky tests).",
        "points": 2,
        "options": [
          {
            "label": "Réinitialiser tous les mocks pour éviter qu'un test contamine le suivant",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Supprimer les fichiers temporaires créés par les tests",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Réinitialiser le store Redux entre les tests",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Vider le cache du navigateur pour les tests E2E",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un test RTL, que se passe-t-il si on ne wrap pas l'assertion dans waitFor pour un appel API ?",
        "explanation": "Le composant est rendu avant la réponse de l'API. Sans waitFor, l'assertion vérifie l'état initial (loading) et échoue car les données ne sont pas encore affichées.",
        "points": 2,
        "options": [
          {
            "label": "L'assertion vérifie l'état initial avant la réponse de l'API et échoue",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Le test passe silencieusement sans vérifier quoi que ce soit",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Une erreur de timeout est levée immédiatement",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Le mock de fetch n'est pas exécuté",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est l'objectif principal du code splitting avec React.lazy ?",
        "explanation": "React.lazy divise le bundle en morceaux (chunks) chargés à la demande. L'utilisateur ne télécharge que le code nécessaire pour la page actuelle, réduisant le temps de chargement initial.",
        "points": 2,
        "options": [
          {
            "label": "Charger uniquement le code nécessaire pour la page actuelle",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Réduire la taille du code source en minifiant les variables",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Supprimer les dépendances non utilisées du bundle",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Activer le server-side rendering",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un pipeline CI, pourquoi le typecheck doit-il être exécuté avant le build ?",
        "explanation": "Si le typecheck échoue, le build TypeScript peut néanmoins réussir (selon la configuration). Exécuter le typecheck en premier détecte les erreurs de type avant de gaspiller du temps sur un build qui échouera en production.",
        "points": 1,
        "options": [
          {
            "label": "Pour détecter les erreurs de type avant de gaspiller du temps sur un build voué à échouer",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Parce que le typecheck nécessite les fichiers de build en entrée",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour générer automatiquement la documentation TypeScript",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Parce que Vitest dépend du typecheck pour exécuter les tests",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  }
];

export default exercises;
