const exercises = [
  {
    "title": "Quiz - JSX et Composants Fondamentaux",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle syntaxe JSX est correcte pour afficher une variable name dans un paragraphe ?",
        "explanation": "En JSX, les expressions JavaScript sont entourées d'accolades {}. Les guillemets {} sont utilisés pour les chaînes littérales, pas pour les expressions.",
        "points": 2,
        "options": [
          {
            "label": "<p>{name}</p>",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "<p>{{name}}</p>",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "<p>\"name\"</p>",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "<p>name</p>",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment passe-t-on des données d'un composant parent à un composant enfant ?",
        "explanation": "Les props sont l'équivalent des arguments d'une fonction. Le parent transmet via des attributs JSX, l'enfant les reçoit en paramètre.",
        "points": 2,
        "options": [
          {
            "label": "Via les props en attribut JSX",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Via une variable globale",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Via localStorage",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Via l'import du composant enfant",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la clé spéciale utilisée par React pour identifier les éléments d'une liste ?",
        "explanation": "La prop key aide React à identifier quels éléments ont changé, été ajoutés ou supprimés. Elle doit être unique et stable parmi les frères.",
        "points": 1,
        "options": [
          {
            "label": "key",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "ref",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "id",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "index",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle expression JSX affiche conditionnellement <Logout /> quand isLogged est true ?",
        "explanation": "L'opérateur && est la façon la plus concise en React : si la condition est vraie, l'élément est affiché. Si elle est fausse, rien n'est rendu.",
        "points": 1,
        "options": [
          {
            "label": "{isLogged && <Logout />}",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "{isLogged ? <Logout /> : null}",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "{<Logout /> if isLogged}",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "{if (isLogged) <Logout />}",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi ne faut-il pas utiliser l'index comme key dans une liste dynamique ?",
        "explanation": "L'index change quand des éléments sont ajoutés/supprimés au milieu de la liste, ce qui cause des bugs de rendu. On préfère un ID unique et stable.",
        "points": 1,
        "options": [
          {
            "label": "L'index peut changer et causer des bugs de rendu",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "L'index n'est pas unique",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "React n'accepte pas l'index comme key",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "L'index ralentit les performances",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - State et Gestion des Événements",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la bonne façon de mettre à jour un état basé sur sa valeur précédente avec useState ?",
        "explanation": "La forme fonctionnelle setCount(prev => prev + 1) garantit qu'on utilise toujours la valeur la plus récente, même en cas de mises à jour groupées (batching).",
        "points": 2,
        "options": [
          {
            "label": "setCount((prev) => prev + 1)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "setCount(count + 1)",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "count += 1",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "this.setState({ count: count + 1 })",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Que se passe-t-il si on met à jour un objet dans useState sans utiliser le spread operator ?",
        "explanation": "useState remplace complètement l'ancienne valeur par la nouvelle. Sans spread, les propriétés non spécifiées sont perdues.",
        "points": 2,
        "options": [
          {
            "label": "Les propriétés non spécifiées sont perdues",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Les propriétés sont fusionnées automatiquement",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "React génère une erreur",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Rien ne se passe, la mutation est silencieuse",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment récupère-t-on la valeur d'un input contrôlé au moment de la saisie ?",
        "explanation": "Le onChange reçoit un événement synthétique. La valeur actuelle de l'input est accessible via e.target.value.",
        "points": 1,
        "options": [
          {
            "label": "e.target.value",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "e.currentTarget.textContent",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "inputRef.current.value",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "this.input.value",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle est la différence entre un champ contrôlé et non-contrôlé ?",
        "explanation": "Un champ contrôlé stocke sa valeur dans l'état React et la met à jour via onChange. Un champ non-contrôlé gère sa propre valeur interne via le DOM.",
        "points": 2,
        "options": [
          {
            "label": "Contrôlé : état React ; non-contrôlé : état DOM interne",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Contrôlé : lecture seule ; non-contrôlé : modifiable",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Contrôlé : sans validation ; non-contrôlé : avec validation",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Ils sont identiques, seule la syntaxe change",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment passer une donnée d'un composant enfant à son parent ?",
        "explanation": "Le parent passe une callback en prop à l'enfant. L'enfant appelle cette callback avec la donnée, et le parent la reçoit dans sa fonction de rappel.",
        "points": 1,
        "options": [
          {
            "label": "Le parent passe une callback que l'enfant appelle avec la donnée",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "L'enfant modifie directement une variable du parent",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Via une variable globale partagée",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Les données ne peuvent pas remonter vers le parent",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Effets de Bord et Cycle de Vie",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Que se passe-t-il si on omet complètement le tableau de dépendances de useEffect ?",
        "explanation": "Sans tableau de dépendances, l'effet s'exécute après chaque rendu, ce qui peut causer des boucles infinies si l'effet modifie l'état.",
        "points": 2,
        "options": [
          {
            "label": "L'effet s'exécute après chaque rendu",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "L'effet ne s'exécute qu'au montage",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "React ignore l'effet",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Une erreur est levée",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment simuler componentDidMount (exécution unique au montage) avec useEffect ?",
        "explanation": "Un tableau de dépendances vide [] indique à React que l'effet ne dépend d'aucune valeur et ne doit s'exécuter qu'au montage du composant.",
        "points": 2,
        "options": [
          {
            "label": "useEffect(fn, [])",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "useEffect(fn, [fn])",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "useEffect(fn)",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "useEffect(fn, [null])",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Pourquoi retourner une fonction dans useEffect ?",
        "explanation": "La fonction retournée est la fonction de nettoyage. React l'appelle au démontage du composant ou avant de ré-exécuter l'effet, pour éviter les fuites mémoire.",
        "points": 2,
        "options": [
          {
            "label": "Pour nettoyer l'effet (timers, subscriptions)",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour exécuter du code après le rendu",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Pour mettre à jour l'état",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "C'est optionnel, React l'ignore",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quel problème AbortController résout-il dans un useEffect avec fetch ?",
        "explanation": "AbortController annule la requête fetch si le composant est démonté avant la réponse, évitant les erreurs 'setState sur composant démonté' et les fuites mémoire.",
        "points": 1,
        "options": [
          {
            "label": "Annuler la requête si le composant est démonté",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Améliorer les performances du fetch",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Gérer les timeout des requêtes",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Empêcher les doublons de requêtes",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment éviter une boucle infinie avec useEffect ?",
        "explanation": "Une boucle infinie survient quand l'effet modifie une valeur présente dans ses dépendances. Il faut soit retirer la dépendance, soit utiliser la forme fonctionnelle du setter.",
        "points": 1,
        "options": [
          {
            "label": "Ne mettre que les dépendances stables dans le tableau",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Utiliser un setTimeout",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Omettre le tableau de dépendances",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Ajouter toutes les variables du composant",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Context et Global State",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quel hook remplace l'utilisation de Context.Consumer pour lire un contexte ?",
        "explanation": "useContext est le hook moderne pour consommer un contexte. Il est plus lisible et s'intègre mieux avec le reste du code fonctionnel que le pattern render props de Context.Consumer.",
        "points": 2,
        "options": [
          {
            "label": "useContext",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "useReducer",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "useState",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "useEffect",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quand est-il approprié d'utiliser Context plutôt que des props ?",
        "explanation": "Context est fait pour les données globales (thème, auth, langue) qui sont utilisées par beaucoup de composants à différents niveaux. Pour des données locales, les props restent préférables.",
        "points": 2,
        "options": [
          {
            "label": "Pour des données globales utilisées par plusieurs niveaux",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Pour toutes les données, remplacer complètement les props",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Uniquement pour les données asynchrones",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Pour les données qui changent rarement",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Comment optimiser la valeur passée à un Provider pour éviter des re-rendus inutiles ?",
        "explanation": "useMemo mémoïse l'objet value pour qu'il conserve la même référence tant que ses dépendances (ici theme) n'ont pas changé. Sans useMemo, un nouvel objet est créé à chaque rendu du Provider.",
        "points": 2,
        "options": [
          {
            "label": "useMemo pour mémoïser la valeur du Provider",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "useCallback sur les fonctions uniquement",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Diviser le contexte en plusieurs petits contextes",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "Utiliser une variable globale en dehors de React",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Que se passe-t-il quand la valeur du Provider change ?",
        "explanation": "Tous les consommateurs du contexte (composants qui utilisent useContext) sont re-rendus, même s'ils n'utilisent qu'une partie de la valeur. D'où l'importance de mémoïser et de séparer les contextes.",
        "points": 1,
        "options": [
          {
            "label": "Tous les consommateurs sont re-rendus",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "Seuls les enfants directs du Provider sont re-rendus",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "Aucun re-rendu, React détecte automatiquement les changements",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "React lève une erreur si la valeur change",
            "isCorrect": false,
            "order": 3
          }
        ]
      },
      {
        "prompt": "Quelle combinaison de hooks React permet de gérer un état global complexe sans bibliothèque externe ?",
        "explanation": "useReducer gère la logique d'état complexe (actions, transitions) tandis que useContext rend l'état accessible à tous les composants. Ensemble, ils remplacent Redux pour beaucoup de cas.",
        "points": 2,
        "options": [
          {
            "label": "useContext + useReducer",
            "isCorrect": true,
            "order": 0
          },
          {
            "label": "useState + useEffect",
            "isCorrect": false,
            "order": 1
          },
          {
            "label": "useCallback + useMemo",
            "isCorrect": false,
            "order": 2
          },
          {
            "label": "useRef + useImperativeHandle",
            "isCorrect": false,
            "order": 3
          }
        ]
      }
    ]
  }
];

export default exercises;
