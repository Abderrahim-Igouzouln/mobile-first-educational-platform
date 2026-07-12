const exercises = [
  {
    "title": "Quiz — Premiers pas avec Vue.js",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle fonction utilise-t-on pour créer une instance d'application Vue.js 3 ?",
        "explanation": "createApp est la fonction d'entrée de Vue.js 3. Elle remplace new Vue() de la version 2 et permet de créer une instance d'application propre.",
        "points": 2,
        "options": [
          {
            "label": "createApp()",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "new Vue()",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "initApp()",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Vue.create()",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment accède-t-on à la valeur d'un ref() dans le script ?",
        "explanation": "ref() retourne un objet contenant la valeur dans la propriété .value. Dans le template, Vue déballe automatiquement les refs, mais en JavaScript il faut utiliser .value.",
        "points": 2,
        "options": [
          {
            "label": "Via la propriété .value",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Directement sans accesseur",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Via .data",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Via .get()",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle syntaxe de template Vue.js permet d'afficher la valeur d'une variable ?",
        "explanation": "Les doubles accolades {{ }} sont utilisées pour l'interpolation de données dans les templates Vue. On peut y mettre des expressions JavaScript valides.",
        "points": 1,
        "options": [
          {
            "label": "{{ variable }}",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "${variable}",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "<%= variable %>",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "[[ variable ]]",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est l'avantage principal de <script setup> par rapport à un script classique ?",
        "explanation": "<script setup> élimine le boilerplate (export default, return, defineComponent). Les variables déclarées sont automatiquement exposées au template, ce qui rend le code plus concis.",
        "points": 1,
        "options": [
          {
            "label": "Moins de boilerplate et exposition automatique au template",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Meilleures performances d'exécution",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Support exclusif de TypeScript",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Chargement plus rapide du composant",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel fichier est le composant racine par défaut d'un projet Vue.js créé avec create-vue ?",
        "explanation": "App.vue est le composant racine qui englobe tous les autres composants. C'est le point de montage principal de l'application.",
        "points": 1,
        "options": [
          {
            "label": "App.vue",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Main.vue",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Index.vue",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Root.vue",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz — Composition API",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la principale différence entre ref() et reactive() ?",
        "explanation": "ref() fonctionne avec n'importe quel type de valeur (primitives, objets) et utilise .value pour l'accès. reactive() ne fonctionne qu'avec les objets et tableaux mais n'a pas besoin de .value.",
        "points": 2,
        "options": [
          {
            "label": "ref() marche avec tous types, reactive() uniquement avec les objets",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "ref() est plus performant que reactive()",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "reactive() est obsolète en Vue 3",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Il n'y a aucune différence",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Dans quel cas utilisation-t-on computed() plutôt qu'une méthode simple ?",
        "explanation": "computed() mémoïse le résultat et ne recalcule que quand ses dépendances changent. Une méthode est rappelée à chaque rendu, ce qui est moins efficace pour des calculs coûteux.",
        "points": 2,
        "options": [
          {
            "label": "Quand on a besoin d'une valeur dérivée mémoïsée",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Quand on veut appeler une fonction au clic",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Quand on veut remplacer data()",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Quand on a besoin d'un timer",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre watch() et watchEffect() ?",
        "explanation": "watch() observe explicitement une source et fournit les anciennes et nouvelles valeurs. watchEffect() se ré-exécute automatiquement quand n'importe laquelle de ses dépendances réactives change.",
        "points": 2,
        "options": [
          {
            "label": "watch() observe des sources spécifiques, watchEffect() détecte ses dépendances auto",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "watchEffect() est plus rapide que watch()",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "watch() ne fonctionne qu'avec des refs, watchEffect() avec reactive()",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Ce sont deux noms pour la même fonction",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel hook de cycle de vie remplace componentDidMount dans le Composition API ?",
        "explanation": "onMounted() est appelé une fois que le composant est inséré dans le DOM. C'est l'équivalent exact de componentDidMount.",
        "points": 1,
        "options": [
          {
            "label": "onMounted()",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "onBeforeMount()",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "onCreated()",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "onReady()",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Qu'est-ce qu'un composable en Vue.js ?",
        "explanation": "Un composable est une fonction réutilisable qui utilise la Composition API pour encapsuler de la logique réactive. Il se reconnaît par le préfixe 'use' (useFetch, useAuth, etc.).",
        "points": 1,
        "options": [
          {
            "label": "Une fonction réutilisable qui encapsule de la logique réactive",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Un composant spécial sans template",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Un plugin pour étendre les fonctionnalités de Vue",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Un type de directive personnalisée",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz — Directives et Événements",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la différence principale entre v-if et v-show ?",
        "explanation": "v-if ajoute ou retire physiquement l'élément du DOM. v-show garde l'élément dans le DOM mais bascule sa propriété CSS display. v-show est plus efficace pour des toggles fréquents.",
        "points": 2,
        "options": [
          {
            "label": "v-if ajoute/retire du DOM, v-show utilise display: none",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "v-if est plus rapide que v-show",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "v-show ne fonctionne qu'avec les chaînes",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Il n'y a aucune différence",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi doit-on toujours fournir une key avec v-for ?",
        "explanation": "La key aide Vue à identifier quels éléments ont changé, été ajoutés ou supprimés. Sans key, Vue utilise l'index par défaut, ce qui peut causer des bugs de rendu avec des listes dynamiques.",
        "points": 2,
        "options": [
          {
            "label": "Pour identifier efficacement chaque élément dans le DOM virtuel",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "C'est une convention obligatoire sans impact réel",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour améliorer les performances du template",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Seulement si on utilise TypeScript",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est le raccourci de v-on:click ?",
        "explanation": "Le caractère @ est le raccourci officiel de v-on. @click est équivalent à v-on:click et rend le template plus lisible.",
        "points": 1,
        "options": [
          {
            "label": "@click",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "#click",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": ".click",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "$click",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel modificateur empêche le rechargement de page dans un formulaire ?",
        "explanation": "Le modificateur .prevent appelle preventDefault() sur l'événement, ce qui empêche le comportement par défaut du formulaire (rechargement de page).",
        "points": 2,
        "options": [
          {
            "label": "@submit.prevent",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "@submit.stop",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "@submit.self",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "@submit.once",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment fonctionne v-model sur un champ input texte ?",
        "explanation": "v-model est un sucre syntaxique qui combine v-bind:value (liaison de la valeur vers le DOM) et v-on:input (écoute des modifications pour mettre à jour la donnée réactive).",
        "points": 1,
        "options": [
          {
            "label": "C'est un raccourci pour v-bind:value et v-on:input",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "C'est une directive unique qui utilise MutationObserver",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "C'est un raccourci pour v-bind:href et v-on:change",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "C'est un composant interne de Vue",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz — Formulaires et Validation",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "À quel événement v-model est-il synchronisé avec le modificateur .lazy ?",
        "explanation": "Par défaut, v-model se synchronise sur l'événement 'input' (à chaque frappe). Le modificateur .lazy le fait se synchroniser sur l'événement 'change' (perte de focus ou validation).",
        "points": 2,
        "options": [
          {
            "label": "change (perte de focus)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "input (chaque frappe)",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "submit (soumission du formulaire)",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "blur (perte du focus)",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel modificateur v-model convertit la saisie en type number ?",
        "explanation": "Le modificateur .number analyse la valeur saisie et la convertit en nombre JavaScript. Si la valeur n'est pas un nombre valide, elle reste une chaîne.",
        "points": 1,
        "options": [
          {
            "label": ".number",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": ".numeric",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": ".int",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": ".parse",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment fonctionne v-model sur un composant personnalisé ?",
        "explanation": "Vue.js utilise modelValue comme prop et update:modelValue comme événement émis pour la liaison bidirectionnelle sur les composants personnalisés.",
        "points": 2,
        "options": [
          {
            "label": "Il utilise la prop modelValue et l'événement update:modelValue",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Il crée automatiquement un bridge DOM entre les deux",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Il ne fonctionne pas sur les composants personnalisés",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Il utilise modelData et change",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la bonne pratique pour le bouton de soumission pendant un appel API ?",
        "explanation": "Désactiver le bouton pendant le traitement empêche les doubles soumissions accidentelles. Le texte du bouton doit aussi changer pour indiquer l'état de chargement.",
        "points": 1,
        "options": [
          {
            "label": "Le désactiver et changer son texte en 'Envoi...'",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Le cacher complètement pendant le chargement",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Ne rien changer, gérer le double-côté côté serveur",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Ajouter un timeout pour empêcher les clics rapides",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel est l'avantage de centraliser la validation dans une fonction plutôt que dans le template ?",
        "explanation": "Une fonction de validation centralisée est plus maintenable, testable, et réutilisable. Elle permet d'ajouter des règles complexes sans surcharger le template.",
        "points": 2,
        "options": [
          {
            "label": "Meilleure maintenabilité et réutilisabilité des règles de validation",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Les validations dans le template ne fonctionnent pas",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "C'est plus rapide en termes de performance",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "C'est obligatoire quand on utilise TypeScript",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  }
];

export default exercises;
