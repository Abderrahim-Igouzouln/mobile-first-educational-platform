import { PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

const FOUR_LESSONS = [
  {
    title: 'JSX et Composants Fondamentaux',
    order: 1,
    durationMin: 45,
    contentMarkdown: `# JSX et Composants Fondamentaux

## Introduction

React est une bibliothèque JavaScript pour construire des interfaces utilisateur. Son cœur repose sur deux concepts fondamentaux : **JSX** et **les composants**.

---

## 1. Qu'est-ce que JSX ?

JSX est une extension syntaxique de JavaScript qui ressemble à du HTML. Il permet d'écrire la structure de l'interface utilisateur directement dans le code JavaScript.

\`\`\`tsx
const element = <h1>Bonjour, monde !</h1>;
\`\`\`

**Caractéristiques du JSX :**
- Il est transpilé par Babel en \`React.createElement()\`
- On peut y insérer des expressions JavaScript avec des accolades \`{}\`
- Les attributs utilisent le **camelCase** (\`className\`, \`onClick\`, \`htmlFor\`)

\`\`\`tsx
const name = 'Alice';
const element = <h1 className="title">Bonjour, {name} !</h1>;
\`\`\`

---

## 2. Composants Fonctionnels

Un composant est une fonction qui retourne du JSX. C'est l'unité de base d'une interface React.

\`\`\`tsx
function Greeting({ name }: { name: string }) {
  return <h1>Bonjour, {name} !</h1>;
}
\`\`\`

**Bonnes pratiques :**
- Nommer les composants en **PascalCase**
- Un composant = une responsabilité
- Utiliser TypeScript pour typer les props

---

## 3. Les Props

Les props sont les paramètres d'un composant. Elles permettent de passer des données du parent vers l'enfant.

\`\`\`tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
\`\`\`

---

## 4. Rendu Conditionnel

React permet d'afficher ou non des éléments selon des conditions.

\`\`\`tsx
function UserGreeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Bienvenue !</h1>
      ) : (
        <button onClick={handleLogin}>Se connecter</button>
      )}
      {isLoggedIn && <p>Vous êtes connecté</p>}
    </div>
  );
}
\`\`\`

**Patterns courants :**
- \`condition && <Element />\` pour afficher conditionnellement
- \`condition ? <A /> : <B />\` pour alterner entre deux vues
- Éviter les ternaires imbriquées (préférer un composant dédié)

---

## 5. Listes et Keys

Pour afficher une liste, on utilise \`map()\`. Chaque élément doit avoir une **key** unique et stable.

\`\`\`tsx
function TodoList({ items }: { items: { id: number; text: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
\`\`\`

**Règles importantes :**
- La \`key\` doit être unique parmi les frères
- Utiliser un ID, jamais l'index (sauf liste statique et non réordonnable)
- La \`key\` aide React à identifier les éléments modifiés

---

## Résumé

- JSX = syntaxe déclarative pour décrire l'UI
- Composants = fonctions qui retournent du JSX
- Props = données entrantes d'un composant
- Rendu conditionnel = \`&&\` et ternaire
- Listes = \`map()\` avec des \`key\` stables`,
  },
  {
    title: 'State et Gestion des Événements',
    order: 2,
    durationMin: 50,
    contentMarkdown: `# State et Gestion des Événements

## Introduction

L'état local (state) permet à un composant de mémoriser des informations qui changent dans le temps. C'est ce qui rend une interface **interactive**.

---

## 1. Le Hook useState

\`useState\` est le hook le plus fondamental. Il retourne un tableau avec deux éléments : la valeur actuelle et une fonction pour la modifier.

\`\`\`tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
\`\`\`

**Règles importantes :**
- Ne jamais modifier l'état directement (\`count++\` ne fonctionne pas)
- Utiliser la forme fonctionnelle quand la nouvelle valeur dépend de l'ancienne
- L'état est immuable : on remplace, on ne mute pas

\`\`\`tsx
// ✅ Correct : forme fonctionnelle
setCount((prev) => prev + 1);

// ❌ Incorrect : mutation directe
count += 1;
\`\`\`

---

## 2. État Objets et Tableaux

Quand l'état est un objet ou un tableau, il faut créer une nouvelle copie plutôt que de muter.

\`\`\`tsx
const [user, setUser] = useState({ name: '', age: 0 });

// ✅ Correct : spread operator
setUser((prev) => ({ ...prev, name: 'Alice' }));

const [todos, setTodos] = useState<string[]>([]);

// ✅ Ajout d'un élément
setTodos((prev) => [...prev, 'Nouvelle tâche']);
\`\`\`

---

## 3. Formulaires Contrôlés

Un input contrôlé a sa valeur liée à l'état React. Toute modification passe par \`onChange\`.

\`\`\`tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Connexion avec', email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}
\`\`\`

**Avantages des contrôles contrôlés :**
- Validation en temps réel
- Interface prévisible
- Debug facilité

---

## 4. Gestion des Événements

React utilise des événements **synthétiques** qui fonctionnent de manière identique sur tous les navigateurs.

\`\`\`tsx
function EventExample() {
  const handleClick = (e: React.MouseEvent) => {
    console.log('Position :', e.clientX, e.clientY);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('Enter pressé');
    }
  };

  return (
    <div onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0}>
      Cliquez ou tapez une touche
    </div>
  );
}
\`\`\`

---

## 5. State Lifting (Remontée d'État)

Quand deux composants frères ont besoin de partager un état, on remonte cet état à leur parent commun.

\`\`\`tsx
function Parent() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />
      <FilteredList search={search} />
    </div>
  );
}
\`\`\`

---

## Résumé

- \`useState\` = valeur + setter
- Ne jamais muter l'état directement
- Toujours copier objets/tableaux avec spread
- Formulaires contrôlés : valeur dans l'état, mise à jour via onChange
- State lifting : état partagé remonté au parent`,
  },
  {
    title: 'Effets de Bord et Cycle de Vie',
    order: 3,
    durationMin: 50,
    contentMarkdown: `# Effets de Bord et Cycle de Vie

## Introduction

Les composants React interagissent avec le monde extérieur : API, DOM, timers, stockage local. Ces interactions sont appelées **effets de bord**. Le hook \`useEffect\` permet de les gérer.

---

## 1. Le Hook useEffect

\`useEffect\` exécute une fonction après le rendu du composant. Il remplace les méthodes de cycle de vie des classes (\`componentDidMount\`, \`componentDidUpdate\`, \`componentWillUnmount\`).

\`\`\`tsx
import { useEffect, useState } from 'react';

function PageTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Compteur : \${count}\`;
  });

  return <button onClick={() => setCount(count + 1)}>Incrémenter</button>;
}
\`\`\`

---

## 2. Le Tableau de Dépendances

Le comportement d'\`useEffect\` change selon le tableau de dépendances :

| Dépendances | Comportement |
|-------------|-------------|
| Omis | Exécuté après **chaque** rendu |
| \`[]\` (vide) | Exécuté **une seule fois** (montage) |
| \`[a, b]\` | Exécuté quand **a** ou **b** change |

\`\`\`tsx
// Simulation de componentDidMount
useEffect(() => {
  console.log('Montage du composant');
}, []);

// Simulation de componentDidUpdate pour une valeur spécifique
useEffect(() => {
  console.log('search a changé :', search);
}, [search]);
\`\`\`

---

## 3. Appels API avec useEffect

Le cas d'usage le plus courant : charger des données depuis une API.

\`\`\`tsx
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
\`\`\`

---

## 4. Nettoyage des Effets

Certains effets doivent être nettoyés pour éviter les fuites mémoire (timers, subscriptions, écouteurs).

\`\`\`tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Fonction de nettoyage appelée au démontage
    return () => clearInterval(interval);
  }, []);

  return <p>Temps écoulé : {seconds}s</p>;
}
\`\`\`

---

## 5. AbortController pour les Requêtes

Pour annuler une requête lorsque le composant est démonté (évite les fuites mémoire et les erreurs sur composant démonté).

\`\`\`tsx
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then((res) => res.json())
    .then(setData)
    .catch((err) => {
      if (err.name !== 'AbortError') setError(err.message);
    });

  return () => controller.abort();
}, []);
\`\`\`

---

## Résumé

- \`useEffect(fn, deps)\` : exécute \`fn\` après le rendu
- Dépendances vides \`[]\` = une seule fois au montage
- Fonction de retour = nettoyage au démontage
- Toujours nettoyer les timers et les requêtes API
- \`AbortController\` pour annuler les fetch`,
  },
  {
    title: 'Context et Global State',
    order: 4,
    durationMin: 55,
    contentMarkdown: `# Context et Global State

## Introduction

Quand une application grandit, passer des props à travers plusieurs niveaux de composants (prop drilling) devient fastidieux. Le **Context API** permet de partager des données globalement sans les passer manuellement.

---

## 1. Le Problème du Prop Drilling

\`\`\`tsx
function App() {
  const [theme, setTheme] = useState('light');
  return <Header theme={theme} setTheme={setTheme} />;
}

function Header({ theme, setTheme }: HeaderProps) {
  return <Toolbar theme={theme} setTheme={setTheme} />;
}

function Toolbar({ theme, setTheme }: ToolbarProps) {
  return <ThemeToggle theme={theme} onToggle={setTheme} />;
}
\`\`\`

Chaque niveau intermédiaire doit transmettre des props qu'il n'utilise pas. C'est le **prop drilling**.

---

## 2. React.createContext et Provider

Le Context API résout ce problème en rendant des données disponibles à tous les composants d'un arbre.

\`\`\`tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Créer le contexte
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Créer le Provider
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

---

## 3. Consommer le Contexte avec useContext

\`\`\`tsx
function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('ThemeToggle doit être dans un ThemeProvider');

  const { theme, toggleTheme } = context;

  return (
    <button onClick={toggleTheme}>
      Thème actuel : {theme}
    </button>
  );
}

// Utilisation
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}
\`\`\`

---

## 4. Contexte avec useReducer

Pour des états complexes, on combine Context avec useReducer.

\`\`\`tsx
type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
\`\`\`

---

## 5. Performance et Mémoïsation

Quand la valeur du Provider change, **tous** les consommateurs sont re-rendus. Il faut mémoïser la valeur pour éviter des rendus inutiles.

\`\`\`tsx
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // ✅ useMemo pour éviter de créer un nouvel objet à chaque rendu
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

---

## Résumé

- Contexte = données partagées sans prop drilling
- \`createContext\` + \`Provider\` + \`useContext\`
- \`useReducer\` pour la logique d'état complexe
- Toujours mémoïser la valeur du Provider (\`useMemo\`)
- Le contexte n'est pas un remplacement universel de Redux — l'état serveur reste dans React Query`,
  },
];

const FOUR_EXERCISES = [
  {
    lessonTitle: 'JSX et Composants Fondamentaux',
    passingScorePercent: 70,
    questions: [
      {
        prompt: "Quelle syntaxe JSX est correcte pour afficher une variable name dans un paragraphe ?",
        explanation: "En JSX, les expressions JavaScript sont entourées d'accolades {}. Les guillemets {} sont utilisés pour les chaînes littérales, pas pour les expressions.",
        points: 2,
        options: [
          { label: '<p>{name}</p>', isCorrect: true, order: 0 },
          { label: '<p>{{name}}</p>', isCorrect: false, order: 1 },
          { label: '<p>"name"</p>', isCorrect: false, order: 2 },
          { label: '<p>name</p>', isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Comment passe-t-on des données d'un composant parent à un composant enfant ?",
        explanation: "Les props sont l'équivalent des arguments d'une fonction. Le parent transmet via des attributs JSX, l'enfant les reçoit en paramètre.",
        points: 2,
        options: [
          { label: "Via les props en attribut JSX", isCorrect: true, order: 0 },
          { label: "Via une variable globale", isCorrect: false, order: 1 },
          { label: "Via localStorage", isCorrect: false, order: 2 },
          { label: "Via l'import du composant enfant", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Quelle est la clé spéciale utilisée par React pour identifier les éléments d'une liste ?",
        explanation: "La prop key aide React à identifier quels éléments ont changé, été ajoutés ou supprimés. Elle doit être unique et stable parmi les frères.",
        points: 1,
        options: [
          { label: "key", isCorrect: true, order: 0 },
          { label: "ref", isCorrect: false, order: 1 },
          { label: "id", isCorrect: false, order: 2 },
          { label: "index", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Quelle expression JSX affiche conditionnellement <Logout /> quand isLogged est true ?",
        explanation: "L'opérateur && est la façon la plus concise en React : si la condition est vraie, l'élément est affiché. Si elle est fausse, rien n'est rendu.",
        points: 1,
        options: [
          { label: "{isLogged && <Logout />}", isCorrect: true, order: 0 },
          { label: "{isLogged ? <Logout /> : null}", isCorrect: false, order: 1 },
          { label: "{<Logout /> if isLogged}", isCorrect: false, order: 2 },
          { label: "{if (isLogged) <Logout />}", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Pourquoi ne faut-il pas utiliser l'index comme key dans une liste dynamique ?",
        explanation: "L'index change quand des éléments sont ajoutés/supprimés au milieu de la liste, ce qui cause des bugs de rendu. On préfère un ID unique et stable.",
        points: 1,
        options: [
          { label: "L'index peut changer et causer des bugs de rendu", isCorrect: true, order: 0 },
          { label: "L'index n'est pas unique", isCorrect: false, order: 1 },
          { label: "React n'accepte pas l'index comme key", isCorrect: false, order: 2 },
          { label: "L'index ralentit les performances", isCorrect: false, order: 3 },
        ],
      },
    ],
  },
  {
    lessonTitle: 'State et Gestion des Événements',
    passingScorePercent: 70,
    questions: [
      {
        prompt: "Quelle est la bonne façon de mettre à jour un état basé sur sa valeur précédente avec useState ?",
        explanation: "La forme fonctionnelle setCount(prev => prev + 1) garantit qu'on utilise toujours la valeur la plus récente, même en cas de mises à jour groupées (batching).",
        points: 2,
        options: [
          { label: "setCount((prev) => prev + 1)", isCorrect: true, order: 0 },
          { label: "setCount(count + 1)", isCorrect: false, order: 1 },
          { label: "count += 1", isCorrect: false, order: 2 },
          { label: "this.setState({ count: count + 1 })", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Que se passe-t-il si on met à jour un objet dans useState sans utiliser le spread operator ?",
        explanation: "useState remplace complètement l'ancienne valeur par la nouvelle. Sans spread, les propriétés non spécifiées sont perdues.",
        points: 2,
        options: [
          { label: "Les propriétés non spécifiées sont perdues", isCorrect: true, order: 0 },
          { label: "Les propriétés sont fusionnées automatiquement", isCorrect: false, order: 1 },
          { label: "React génère une erreur", isCorrect: false, order: 2 },
          { label: "Rien ne se passe, la mutation est silencieuse", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Comment récupère-t-on la valeur d'un input contrôlé au moment de la saisie ?",
        explanation: "Le onChange reçoit un événement synthétique. La valeur actuelle de l'input est accessible via e.target.value.",
        points: 1,
        options: [
          { label: "e.target.value", isCorrect: true, order: 0 },
          { label: "e.currentTarget.textContent", isCorrect: false, order: 1 },
          { label: "inputRef.current.value", isCorrect: false, order: 2 },
          { label: "this.input.value", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Quelle est la différence entre un champ contrôlé et non-contrôlé ?",
        explanation: "Un champ contrôlé stocke sa valeur dans l'état React et la met à jour via onChange. Un champ non-contrôlé gère sa propre valeur interne via le DOM.",
        points: 2,
        options: [
          { label: "Contrôlé : état React ; non-contrôlé : état DOM interne", isCorrect: true, order: 0 },
          { label: "Contrôlé : lecture seule ; non-contrôlé : modifiable", isCorrect: false, order: 1 },
          { label: "Contrôlé : sans validation ; non-contrôlé : avec validation", isCorrect: false, order: 2 },
          { label: "Ils sont identiques, seule la syntaxe change", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Comment passer une donnée d'un composant enfant à son parent ?",
        explanation: "Le parent passe une callback en prop à l'enfant. L'enfant appelle cette callback avec la donnée, et le parent la reçoit dans sa fonction de rappel.",
        points: 1,
        options: [
          { label: "Le parent passe une callback que l'enfant appelle avec la donnée", isCorrect: true, order: 0 },
          { label: "L'enfant modifie directement une variable du parent", isCorrect: false, order: 1 },
          { label: "Via une variable globale partagée", isCorrect: false, order: 2 },
          { label: "Les données ne peuvent pas remonter vers le parent", isCorrect: false, order: 3 },
        ],
      },
    ],
  },
  {
    lessonTitle: 'Effets de Bord et Cycle de Vie',
    passingScorePercent: 70,
    questions: [
      {
        prompt: "Que se passe-t-il si on omet complètement le tableau de dépendances de useEffect ?",
        explanation: "Sans tableau de dépendances, l'effet s'exécute après chaque rendu, ce qui peut causer des boucles infinies si l'effet modifie l'état.",
        points: 2,
        options: [
          { label: "L'effet s'exécute après chaque rendu", isCorrect: true, order: 0 },
          { label: "L'effet ne s'exécute qu'au montage", isCorrect: false, order: 1 },
          { label: "React ignore l'effet", isCorrect: false, order: 2 },
          { label: "Une erreur est levée", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Comment simuler componentDidMount (exécution unique au montage) avec useEffect ?",
        explanation: "Un tableau de dépendances vide [] indique à React que l'effet ne dépend d'aucune valeur et ne doit s'exécuter qu'au montage du composant.",
        points: 2,
        options: [
          { label: "useEffect(fn, [])", isCorrect: true, order: 0 },
          { label: "useEffect(fn, [fn])", isCorrect: false, order: 1 },
          { label: "useEffect(fn)", isCorrect: false, order: 2 },
          { label: "useEffect(fn, [null])", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Pourquoi retourner une fonction dans useEffect ?",
        explanation: "La fonction retournée est la fonction de nettoyage. React l'appelle au démontage du composant ou avant de ré-exécuter l'effet, pour éviter les fuites mémoire.",
        points: 2,
        options: [
          { label: "Pour nettoyer l'effet (timers, subscriptions)", isCorrect: true, order: 0 },
          { label: "Pour exécuter du code après le rendu", isCorrect: false, order: 1 },
          { label: "Pour mettre à jour l'état", isCorrect: false, order: 2 },
          { label: "C'est optionnel, React l'ignore", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Quel problème AbortController résout-il dans un useEffect avec fetch ?",
        explanation: "AbortController annule la requête fetch si le composant est démonté avant la réponse, évitant les erreurs 'setState sur composant démonté' et les fuites mémoire.",
        points: 1,
        options: [
          { label: "Annuler la requête si le composant est démonté", isCorrect: true, order: 0 },
          { label: "Améliorer les performances du fetch", isCorrect: false, order: 1 },
          { label: "Gérer les timeout des requêtes", isCorrect: false, order: 2 },
          { label: "Empêcher les doublons de requêtes", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Comment éviter une boucle infinie avec useEffect ?",
        explanation: "Une boucle infinie survient quand l'effet modifie une valeur présente dans ses dépendances. Il faut soit retirer la dépendance, soit utiliser la forme fonctionnelle du setter.",
        points: 1,
        options: [
          { label: "Ne mettre que les dépendances stables dans le tableau", isCorrect: true, order: 0 },
          { label: "Utiliser un setTimeout", isCorrect: false, order: 1 },
          { label: "Omettre le tableau de dépendances", isCorrect: false, order: 2 },
          { label: "Ajouter toutes les variables du composant", isCorrect: false, order: 3 },
        ],
      },
    ],
  },
  {
    lessonTitle: 'Context et Global State',
    passingScorePercent: 70,
    questions: [
      {
        prompt: "Quel hook remplace l'utilisation de Context.Consumer pour lire un contexte ?",
        explanation: "useContext est le hook moderne pour consommer un contexte. Il est plus lisible et s'intègre mieux avec le reste du code fonctionnel que le pattern render props de Context.Consumer.",
        points: 2,
        options: [
          { label: "useContext", isCorrect: true, order: 0 },
          { label: "useReducer", isCorrect: false, order: 1 },
          { label: "useState", isCorrect: false, order: 2 },
          { label: "useEffect", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Quand est-il approprié d'utiliser Context plutôt que des props ?",
        explanation: "Context est fait pour les données globales (thème, auth, langue) qui sont utilisées par beaucoup de composants à différents niveaux. Pour des données locales, les props restent préférables.",
        points: 2,
        options: [
          { label: "Pour des données globales utilisées par plusieurs niveaux", isCorrect: true, order: 0 },
          { label: "Pour toutes les données, remplacer complètement les props", isCorrect: false, order: 1 },
          { label: "Uniquement pour les données asynchrones", isCorrect: false, order: 2 },
          { label: "Pour les données qui changent rarement", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Comment optimiser la valeur passée à un Provider pour éviter des re-rendus inutiles ?",
        explanation: "useMemo mémoïse l'objet value pour qu'il conserve la même référence tant que ses dépendances (ici theme) n'ont pas changé. Sans useMemo, un nouvel objet est créé à chaque rendu du Provider.",
        points: 2,
        options: [
          { label: "useMemo pour mémoïser la valeur du Provider", isCorrect: true, order: 0 },
          { label: "useCallback sur les fonctions uniquement", isCorrect: false, order: 1 },
          { label: "Diviser le contexte en plusieurs petits contextes", isCorrect: false, order: 2 },
          { label: "Utiliser une variable globale en dehors de React", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Que se passe-t-il quand la valeur du Provider change ?",
        explanation: "Tous les consommateurs du contexte (composants qui utilisent useContext) sont re-rendus, même s'ils n'utilisent qu'une partie de la valeur. D'où l'importance de mémoïser et de séparer les contextes.",
        points: 1,
        options: [
          { label: "Tous les consommateurs sont re-rendus", isCorrect: true, order: 0 },
          { label: "Seuls les enfants directs du Provider sont re-rendus", isCorrect: false, order: 1 },
          { label: "Aucun re-rendu, React détecte automatiquement les changements", isCorrect: false, order: 2 },
          { label: "React lève une erreur si la valeur change", isCorrect: false, order: 3 },
        ],
      },
      {
        prompt: "Quelle combinaison de hooks React permet de gérer un état global complexe sans bibliothèque externe ?",
        explanation: "useReducer gère la logique d'état complexe (actions, transitions) tandis que useContext rend l'état accessible à tous les composants. Ensemble, ils remplacent Redux pour beaucoup de cas.",
        points: 2,
        options: [
          { label: "useContext + useReducer", isCorrect: true, order: 0 },
          { label: "useState + useEffect", isCorrect: false, order: 1 },
          { label: "useCallback + useMemo", isCorrect: false, order: 2 },
          { label: "useRef + useImperativeHandle", isCorrect: false, order: 3 },
        ],
      },
    ],
  },
];

async function main() {
  console.log('Mise à jour du contenu pédagogique...\n');

  const course = await prisma.course.findFirst({
    where: { title: 'Fondamentaux de React' },
    include: { lessons: { orderBy: { order: 'asc' } } },
  });

  if (!course) {
    console.error('❌ Cours "Fondamentaux de React" introuvable.');
    console.log('   Exécutez d\'abord la seed : npx prisma db seed');
    process.exit(1);
  }

  console.log(`✔ Cours trouvé : "${course.title}" (${course.lessons.length} leçons)\n`);

  for (let i = 0; i < FOUR_LESSONS.length; i++) {
    const lessonDef = FOUR_LESSONS[i];
    const existingLesson = course.lessons[i];

    if (!existingLesson) {
      console.log(`⚠️  Leçon ${i + 1} ("${lessonDef.title}") non trouvée dans le cours, création...`);
      const newLesson = await prisma.lesson.create({
        data: {
          courseId: course.id,
          title: lessonDef.title,
          contentMarkdown: lessonDef.contentMarkdown,
          order: lessonDef.order,
          durationMin: lessonDef.durationMin,
          isPublished: true,
        },
      });
      console.log(`  ✅ Créée : "${newLesson.title}"`);
    } else {
      await prisma.lesson.update({
        where: { id: existingLesson.id },
        data: {
          title: lessonDef.title,
          contentMarkdown: lessonDef.contentMarkdown,
          durationMin: lessonDef.durationMin,
        },
      });
      console.log(`  ✅ Mise à jour : "${lessonDef.title}"`);
    }
  }

  console.log('');

  const updatedLessons = await prisma.lesson.findMany({
    where: { courseId: course.id },
    orderBy: { order: 'asc' },
  });

  for (let i = 0; i < FOUR_EXERCISES.length; i++) {
    const exDef = FOUR_EXERCISES[i];
    const lesson = updatedLessons[i];

    if (!lesson) {
      console.log(`⚠️  Leçon pour l'exercice "${exDef.lessonTitle}" introuvable`);
      continue;
    }

    const existingExercise = await prisma.exercise.findFirst({
      where: { lessonId: lesson.id },
    });

    let exercise;
    if (existingExercise) {
      await prisma.answerOption.deleteMany({ where: { question: { exerciseId: existingExercise.id } } });
      await prisma.userAnswer.deleteMany({ where: { question: { exerciseId: existingExercise.id } } });
      await prisma.question.deleteMany({ where: { exerciseId: existingExercise.id } });
      exercise = await prisma.exercise.update({
        where: { id: existingExercise.id },
        data: { title: `Quiz - ${exDef.lessonTitle}`, passingScorePercent: exDef.passingScorePercent },
      });
    } else {
      exercise = await prisma.exercise.create({
        data: { lessonId: lesson.id, title: `Quiz - ${exDef.lessonTitle}`, passingScorePercent: exDef.passingScorePercent },
      });
    }

    for (let qi = 0; qi < exDef.questions.length; qi++) {
      const qDef = exDef.questions[qi];
      const question = await prisma.question.create({
        data: {
          exerciseId: exercise.id,
          type: QuestionType.mcq,
          prompt: qDef.prompt,
          explanation: qDef.explanation,
          order: qi + 1,
          points: qDef.points,
        },
      });

      for (const optDef of qDef.options) {
        await prisma.answerOption.create({
          data: {
            questionId: question.id,
            label: optDef.label,
            isCorrect: optDef.isCorrect,
            order: optDef.order,
          },
        });
      }
    }

    console.log(`  ✅ Exercice : "${exercise.title}" (${exDef.questions.length} questions)`);
  }

  console.log('');

  const existingProject = await prisma.project.findFirst({
    where: { courseId: course.id },
  });

  const projectInstructions = `# Tableau de Bord Interactif — React Dashboard

## Objectif

Créer une application React de tableau de bord (dashboard) qui affiche des statistiques et une liste d'utilisateurs.

## Consignes

### 1. Composants obligatoires

- **Sidebar** : navigation latérale avec des liens (Accueil, Utilisateurs, Statistiques, Paramètres). Doit être repliable.
- **Header** : barre supérieure avec le titre de la page active et une horloge live (qui affiche l'heure actuelle et se met à jour chaque seconde).
- **Dashboard** : page principale avec 4 cartes statistiques (Utilisateurs actifs, Revenus, Tâches complétées, Nouveaux inscrits). Les valeurs peuvent être statiques ou simulées.
- **Widget** : composant réutilisable pour afficher une métrique. Il prend en props : \`title\`, \`value\`, \`icon\`, \`color\`.
- **UserList** : liste d'utilisateurs récupérée depuis une API simulée (fichier JSON local ou via \`fetch\` vers \`https://jsonplaceholder.typicode.com/users\`). Afficher le nom, email, ville.

### 2. Hooks React

- **useState** : pour l'état local (liste d'utilisateurs, theme, sidebar ouverte/fermée)
- **useEffect** : pour charger les utilisateurs au montage + mettre à jour l'horloge
- **useContext** : pour le thème (clair/sombre)

### 3. Fonctionnalités bonus (optionnelles)

- Bouton de bascule thème clair/sombre (via Context)
- Animation de transition sur la sidebar
- Barre de recherche pour filtrer les utilisateurs
- Responsive design de base

## Contraintes techniques

- Utiliser Create React App ou Vite
- TypeScript obligatoire
- Composants fonctionnels uniquement (pas de classes)
- CSS Modules ou Tailwind CSS au choix

## Rendu

Déposer le code source sur GitHub et soumettre le lien du repository.`;

  const evaluationCriteria = JSON.stringify([
    'Fonctionnalités (tous les composants requis sont présents et fonctionnels)',
    "Gestion d'état (useState, useEffect, useContext utilisés correctement)",
    'Architecture (découpage en composants, props typées, structure du projet)',
    'Qualité du code (nommage, lisibilité, bonnes pratiques React)',
    'UI/UX (thème clair/sombre, responsive de base, propreté visuelle)',
  ]);

  if (existingProject) {
    await prisma.project.update({
      where: { id: existingProject.id },
      data: {
        title: 'Tableau de Bord Interactif — React Dashboard',
        instructions: projectInstructions,
        evaluationCriteria,
      },
    });
    console.log('  ✅ Projet mis à jour : "Tableau de Bord Interactif"');
  } else {
    await prisma.project.create({
      data: {
        courseId: course.id,
        title: 'Tableau de Bord Interactif — React Dashboard',
        instructions: projectInstructions,
        evaluationCriteria,
      },
    });
    console.log('  ✅ Projet créé : "Tableau de Bord Interactif"');
  }

  console.log('\n✅ Mise à jour terminée avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Mise à jour échouée :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
