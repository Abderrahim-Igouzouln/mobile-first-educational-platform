const exercises = [
  {
    "title": "Quiz - Pinia — State Management Moderne",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la différence fondamentale entre le Options Store et le Setup Store dans Pinia ?",
        "explanation": "Le Options Store utilise une syntaxe similaire à l'Options API de Vue (state, getters, actions comme propriétés d'un objet). Le Setup Store utilise la syntaxe de la Composition API avec ref(), computed() et des fonctions classiques, retournant tout à la fin.",
        "points": 2,
        "options": [
          {
            "label": "Le Setup Store utilise ref() et computed() de la Composition API, l'Options Store utilise state/getters/actions",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Le Setup Store est plus rapide en performance que l'Options Store",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "L'Options Store ne supporte pas TypeScript tandis que le Setup Store si",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Le Setup Store ne peut pas contenir d'actions asynchrones",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi doit-on utiliser `storeToRefs()` quand on déstructure un store Pinia dans un composant ?",
        "explanation": "Quand on déstructure directement un store, les propriétés réactives (state et getters) perdent leur réactivité car on extrait leurs valeurs primitives. storeToRefs() retourne des refs qui conservent la réactivité.",
        "points": 2,
        "options": [
          {
            "label": "Pour préserver la réactivité des state et getters lors de la déstructuration",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour que TypeScript puisse correctement inférer les types",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour réduire la consommation mémoire du store",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "C'est une convention de nommage, pas une obligation technique",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un Setup Store, comment implémenter le reset du state à sa valeur initiale ?",
        "explanation": "Le Setup Store n'a pas de $reset automatique comme l'Options Store. Il faut créer manuellement une fonction $reset qui remet toutes les ref à leur valeur initiale, puis la retourner avec les autres propriétés.",
        "points": 2,
        "options": [
          {
            "label": "Créer une fonction $reset qui remet les ref à leur valeur initiale et la retourner",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Appeler store.$reset() fonctionne directement comme pour l'Options Store",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Supprimer le store et le recréer avec createPinia()",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Utiliser store.$patch({}) avec un objet vide",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est le rôle du plugin `pinia-plugin-persistedstate` ?",
        "explanation": "Ce plugin automatise la persistance des stores Pinia dans le localStorage (ou sessionStorage). En ajoutant `persist: true` au store, l'état est automatiquement sauvegardé et restauré au chargement de la page.",
        "points": 2,
        "options": [
          {
            "label": "Sauvegarder automatiquement l'état du store dans localStorage",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Synchroniser l'état entre plusieurs onglets du navigateur en temps réel",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Compresser les données du store pour réduire la consommation mémoire",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Ajouter le support des stores asynchrones",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment accéder à un store Pinia depuis une action d'un autre store ?",
        "explanation": "On peut appeler le composable du store (useOtherStore) directement dans une action. Pinia gère correctement les appels croisés tant que le pinia instance est actif (setActivePinia ou createPinia au démarrage de l'app).",
        "points": 1,
        "options": [
          {
            "label": "En appelant le composable du store cible directement dans l'action",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "C'est impossible, les stores ne peuvent pas interagir entre eux",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "En important le state du store cible directement via un import ES6",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "En utilisant le bus d'événements global de Vue",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Vue Router Avancé",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Dans un navigation guard `beforeEach`, que se passe-t-il si on retourne un objet de route (ex: `{ name: 'Login' }`) ?",
        "explanation": "Retourner un objet de route dans un guard annule la navigation en cours et redirige vers la route spécifiée. C'est le mécanisme standard pour rediriger les utilisateurs non authentifiés vers la page de connexion.",
        "points": 2,
        "options": [
          {
            "label": "La navigation en cours est annulée et l'utilisateur est redirigé vers la route spécifiée",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "La route est ajoutée dynamiquement au routeur",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Une erreur est levée car on ne peut pas retourner de route dans un guard",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Le guard est ignoré et la navigation originale se poursuit",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre `beforeEach` et `beforeResolve` dans Vue Router ?",
        "explanation": "beforeEach se déclenche AVANT la résolution de la route (avant que le composant ne soit résolu). beforeResolve se déclenche APRÈS la résolution mais AVANT l'insertion dans le DOM. Utile pour charger des données nécessaires à la route.",
        "points": 2,
        "options": [
          {
            "label": "beforeEach se déclenche avant la résolution, beforeResolve après la résolution mais avant l'affichage",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "beforeEach est asynchrone, beforeResolve est synchrone",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "beforeEach ne peut pas rediriger, beforeResolve si",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Ils sont identiques, juste deux alias de la même fonction",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi utiliser `props: true` dans une définition de route avec un paramètre dynamique ?",
        "explanation": "Avec props: true, le paramètre de route (ex: :id) est directement passé en prop au composant. Cela découple le composant du routeur — il ne dépend plus de route.params mais d'une prop, ce qui le rend plus testable et réutilisable.",
        "points": 2,
        "options": [
          {
            "label": "Pour passer les params de route directement en props au composant, le découpant du routeur",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour que les params soient obligatoires et non optionnels",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour activer le lazy loading du composant",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour valider le type des params avec TypeScript automatiquement",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans `scrollBehavior(to, from, savedPosition)`, que retourne `savedPosition` ?",
        "explanation": "savedPosition contient la position de scroll que l'utilisateur avait avant de naviguer (grâce au bouton retour du navigateur). Si elle existe, la restaurer donne une expérience naturelle. Sinon, on peut retourner { top: 0 } pour scroller en haut.",
        "points": 2,
        "options": [
          {
            "label": "La position de scroll que l'utilisateur avait avant la navigation précédente",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "La position de scroll maximale de la page cible",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Un objet contenant les coordonnées de la souris au moment du clic",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "La taille totale du document en pixels",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est l'intérêt du lazy loading des routes avec `import()` dynamique ?",
        "explanation": "Le lazy loading divise le bundle JavaScript en plusieurs chunks. L'utilisateur ne télécharge que le code nécessaire pour la page visitée, ce qui réduit significativement le temps de chargement initial de l'application.",
        "points": 1,
        "options": [
          {
            "label": "Réduire la taille du bundle initial en chargeant le code à la demande",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Améliorer la sécurité en chargeant le code après authentification",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Permettre le Server-Side Rendering des routes",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Activer le hot module replacement pendant le développement",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Composables et Patterns de Composition",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Pourquoi les composables sont-ils préférés aux mixins dans Vue 3 ?",
        "explanation": "Les composables résolvent les problèmes des mixins : pas de conflits de noms (sources ambiguës), meilleur support TypeScript, meilleure lisibilité (on sait d'où viennent les données), et découplage plus fort. L'origine de chaque donnée est traçable.",
        "points": 2,
        "options": [
          {
            "label": "Pas de conflits de noms, meilleur typage, lisibilité et découplage supérieurs",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Les mixins sont dépréciés dans Vue 3 et génèrent des erreurs",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Les composables sont plus rapides en exécution que les mixins",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Les mixins ne peuvent pas accéder à la réactivité Vue",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un composable `useFetch`, pourquoi utilise-t-on `watchEffect` plutôt qu'un simple appel de fonction ?",
        "explanation": "watchEffect ré-exécute automatiquement la fonction de fetch quand les reactive dependencies (comme une URL qui change) sont modifiées. Un simple appel de fonction ne se relancerait qu'au montage du composant.",
        "points": 2,
        "options": [
          {
            "label": "Pour relancer le fetch automatiquement quand les dépendances réactives changent",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Parce que les appels de fonction directs sont interdits dans <script setup>",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour que le fetch soit exécuté de manière asynchrone",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour mettre en cache les résultats du fetch en mémoire",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans le pattern `provide/inject`, à quoi sert `InjectionKey` ?",
        "explanation": "InjectionKey est un type générique qui assure la correspondance de type entre le provide et l'inject. Sans lui, la valeur injectée serait de type 'unknown' ou 'any', perdant le typage TypeScript.",
        "points": 2,
        "options": [
          {
            "label": "Assurer la correspondance de type entre le provide et l'inject pour un typage sûr",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Créer un identifiant unique pour chaque provider dans l'arbre de composants",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Chiffrer les données transmises entre le provider et le consumer",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Limiter la portée du provide au composant parent direct",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un composable `useDebounce`, pourquoi faut-il appeler `clearTimeout` avant de créer un nouveau timer ?",
        "explanation": "Sans clearTimeout, chaque changement de valeur crée un nouveau timer sans annuler l'ancien. L'ancien timer peut se déclencher et écraser la valeur débounced avec une valeur obsolète, causant un comportement incohérent.",
        "points": 2,
        "options": [
          {
            "label": "Pour éviter que l'ancien timer écrase la valeur avec une donnée obsolète",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour libérer la mémoire allouée par le timer précédent",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Parce que JavaScript lève une erreur sans clearTimeout",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour que le debounce fonctionne uniquement dans un sens",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quand doit-on utiliser `shallowRef` au lieu de `ref` dans un composable ?",
        "explanation": "shallowRef n'observe pas les modifications profondes de l'objet. Il est utile pour de grandes structures de données (listes de 1000+ éléments) où la réactivité profonde serait coûteuse en performance. On utilise .value = nouveau pour forcer la mise à jour.",
        "points": 1,
        "options": [
          {
            "label": "Pour de grandes structures de données où la réactivité profonde est coûteuse en performance",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Quand on ne veut aucune réactivité du tout",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour les valeurs primitives comme les chaînes de caractères",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "shallowRef est toujours préférable à ref",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Tests et Optimisation des Performances",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Dans Vitest avec Vue Test Utils, quelle est la différence entre `mount` et `shallowMount` ?",
        "explanation": "mount rend le composant et tous ses enfants récursivement. shallowMount rend le composant mais remplace ses enfants par des stubs vides, isolant le test du comportement des composants enfants.",
        "points": 2,
        "options": [
          {
            "label": "mount rend les enfants réellement, shallowMount les remplace par des stubs",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "mount est pour les composants HTML, shallowMount pour les composants Vue",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "shallowMount est plus lent car il stubbe chaque enfant",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "mount ne supporte pas les props, shallowMount si",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi utilise-t-on `setActivePinia(createPinia())` dans le `beforeEach` d'un fichier de test de store ?",
        "explanation": "setActivePinia crée une nouvelle instance isolée de Pinia pour chaque test. Sans cela, les tests partagent le même store et les modifications d'un test affectent les suivants, créant des tests instables (flaky tests).",
        "points": 2,
        "options": [
          {
            "label": "Pour isoler chaque test avec une instance fraîche de Pinia",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour activer le mode développement de Pinia pendant les tests",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Parce que les stores Pinia ne fonctionnent pas sans appel explicite",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour activer le plugin de persistance dans les tests",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre `computed` et une méthode concernant les performances dans Vue ?",
        "explanation": "computed est mémoïisé : il ne recalcule que quand ses dépendances changent. Une méthode est rappelée à chaque re-render du composant, même si les données n'ont pas changé, ce qui gaspille de la CPU.",
        "points": 2,
        "options": [
          {
            "label": "computed est mémoïisé et ne recalcule que si les dépendances changent, une méthode non",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "computed est plus lisible mais les performances sont identiques",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Les méthodes sont automatiquement optimisées par le compilateur Vue",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "computed ne peut retourner que des primitives, les méthodes peuvent retourner des objets",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "À quoi sert `<Suspense>` en Vue 3 ?",
        "explanation": "Suspense affiche un contenu de fallback (template #fallback) pendant qu'un composant asynchrone se charge. Il simplifie la gestion des états de chargement sans besoin de variables isLoading manuelles.",
        "points": 2,
        "options": [
          {
            "label": "Afficher un fallback pendant le chargement de composants asynchrones",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Capturer les erreurs runtime dans les composants enfants",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Mettre en pause l'exécution des watchers pendant les transitions",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Activer le code splitting automatique de tous les composants",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans un test unitaire, que teste-t-on exactement avec `expect(wrapper.emitted('change')).toHaveLength(1)` ?",
        "explanation": "Cette assertion vérifie que l'événement 'change' a été émis exactement 1 fois par le composant. Cela teste le comportement du composant : vérifie qu'une interaction déclenche bien l'événement attendu en sortie.",
        "points": 1,
        "options": [
          {
            "label": "Que l'événement 'change' a été émis exactement une fois par le composant",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Que le composant a un compteur d'événements interne à 1",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Que le composant a changé d'état une fois",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Que le DOM a été mis à jour une seule fois",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  }
];

export default exercises;
