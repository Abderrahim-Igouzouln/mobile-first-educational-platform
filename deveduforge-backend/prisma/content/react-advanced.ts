import { Level } from '@prisma/client';
import type { CourseContent } from './react-fundamentals';

export const reactAdvanced: CourseContent = {
  techSlug: 'react',
  title: 'React Avancé',
  description: 'Hooks, context, performance et patterns avancés',
  level: Level.advanced,
  durationMin: 240,
  lessons: [
    {
      title: 'Hooks personnalisés',
      durationMin: 60,
      contentMarkdown: `# Hooks personnalisés

## Introduction

Les hooks personnalisés sont des fonctions qui commencent par \`use\` et qui permettent d'extraire la logique d'état et d'effets de bord dans des fonctions réutilisables. Ils constituent le mécanisme fondamental de réutilisation de logique dans React moderne.

---

## 1. Anatomie d'un hook personnalisé

Un hook personnalisé est une fonction normale qui peut appeler d'autres hooks. Il ne contient aucun JSX — il retourne des valeurs et des fonctions.

\`\`\`tsx
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      return newValue;
    });
  };

  return [storedValue, setValue];
}

// Utilisation
function App() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <div>
      <p>Thème actuel : {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Basculer
      </button>
    </div>
  );
}
\`\`\`

---

## 2. useDebounce — retarder les exécutions

Le debounce est essentiel pour les recherches en temps réel ou les validations de formulaire. \`useDebounce\` retarde la mise à jour d'une valeur.

\`\`\`tsx
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

// Utilisation
function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      fetch(\`/api/search?q=\${debouncedQuery}\`).then((res) => res.json()).then(console.log);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Rechercher..."
    />
  );
}
\`\`\`

---

## 3. useMediaQuery — adapter l'UI au viewport

Ce hook réagit aux changements de taille d'écran et permet de créer des interfaces truly responsives en JavaScript.

\`\`\`tsx
import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Utilisation
function Layout() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
}
\`\`\`

---

## 4. Les règles des hooks

Les hooks doivent suivre deux règles strictes pour fonctionner correctement :

1. **Appeler uniquement au niveau supérieur** — jamais dans des conditions, boucles ou fonctions imbriquées.
2. **Appeler uniquement depuis des composants ou des hooks personnalisés** — pas depuis des fonctions normales.

\`\`\`tsx
// ❌ Incorrect : condition dans un hook
function BadComponent({ showExtra }: { showExtra: boolean }) {
  if (showExtra) {
    const [extra, setExtra] = useState(0); // Règle violée !
  }
  return <div>...</div>;
}

// ✅ Correct : hook toujours appelé
function GoodComponent({ showExtra }: { showExtra: boolean }) {
  const [extra, setExtra] = useState(0);
  // La condition s'applique à l'utilisation, pas à l'appel
  return showExtra ? <span>{extra}</span> : <div>...</div>;
}
\`\`\`

---

## 5. Composabilité et combinaison de hooks

Un hook personnalisé peut appeler d'autres hooks personnalisés, ce qui permet de construire des abstractions par couches.

\`\`\`tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`Erreur \${res.status}\`);
        return res.json();
      })
      .then((json) => setData(json as T))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}

// Hook composé qui combine useFetch + useDebounce
function useSearchUsers(query: string) {
  const debouncedQuery = useDebounce(query, 300);
  const { data, error, loading } = useFetch<User[]>(
    debouncedQuery ? \`/api/users?q=\${debouncedQuery}\` : '/api/users'
  );
  return { users: data, error, loading };
}
\`\`\`

---

## Pièges courants

- **Oublier la fonction de nettoyage** dans \`useDebounce\` : si le délai n'est pas nettoyé, l'ancien timer peut écraser la nouvelle valeur.
- **Créer un hook avec un nom qui ne commence pas par \`use\`** : React ne pourra pas vérifier les règles des hooks.
- **Muté directement les arguments** : un hook qui reçoit un objet doit le traiter comme immutable.
- **Ne pas typer la valeur de retour** : sans type générique \`<T>\`, le hook perd en réutilisabilité.
- **Oublier que localStorage est bloquant** : dans un SSR (Next.js), \`window\` n'existe pas — toujours vérifier l'environnement.

---

## Résumé

- Un hook personnalisé est une fonction \`use*\` qui peut appeler d'autres hooks
- \`useLocalStorage\` synchronise un état avec le navigateur
- \`useDebounce\` retarde une valeur pour limiter les appels
- \`useMediaQuery\` rend le responsive possible en JS
- Les hooks sont compositables : un hook peut en appeler d'autres`,
      exercise: {
        title: 'Quiz - Hooks personnalisés',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Qu'est-ce qui caractérise un hook personnalisé valide en React ?",
            explanation: "Un hook personnalisé doit commencer par 'use' pour que React puisse vérifier les règles des hooks. Il peut appeler d'autres hooks et retourne des valeurs ou des fonctions, mais ne contient pas de JSX.",
            points: 2,
            options: [
              { label: "C'est une fonction commençant par 'use' qui peut appeler d'autres hooks", isCorrect: true, order: 0 },
              { label: "C'est un composant sans JSX retourné", isCorrect: false, order: 1 },
              { label: "C'est un class qui étend Component", isCorrect: false, order: 2 },
              { label: "C'est un module ES6 exporté par défaut", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans useDebounce, pourquoi la fonction de nettoyage clearTimeout est-elle indispensable ?",
            explanation: "Sans clearTimeout, chaque frappe de clavier crée un nouveau timer. L'ancien timer peut encore se déclencher et écraser la valeur débounced avec une valeur obsolète, causant des résultats incohérents.",
            points: 2,
            options: [
              { label: "Pour éviter que l'ancien timer écrase la nouvelle valeur", isCorrect: true, order: 0 },
              { label: "Pour libérer la mémoire du composant", isCorrect: false, order: 1 },
              { label: "C'est une convention React sans impact fonctionnel", isCorrect: false, order: 2 },
              { label: "Pour empêcher les erreurs dans la console", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi le useState initializer dans useLocalStorage utilise-t-il une fonction ?",
            explanation: "L'initializer en fonction est évalué une seule fois au montage. Sans lui, JSON.parse serait appelé à chaque rendu même si la valeur initiale ne change jamais, ce qui gaspille de la performance.",
            points: 2,
            options: [
              { label: "Pour que l'initialisation ne se fasse qu'une seule fois au montage", isCorrect: true, order: 0 },
              { label: "Pour éviter les erreurs de typage TypeScript", isCorrect: false, order: 1 },
              { label: "Pour permettre l'accès à localStorage", isCorrect: false, order: 2 },
              { label: "Pour que React puisse nettoyer le state automatiquement", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est le risque principal d'appeler un hook à l'intérieur d'une condition ?",
            explanation: "React identifie les hooks par leur ordre d'appel. Si un hook est appelé conditionnellement, l'ordre change entre les rendus, et React associe les mauvais états aux mauvais hooks, causant des bugs imprévisibles.",
            points: 2,
            options: [
              { label: "L'ordre des hooks change et React associe les mauvais états", isCorrect: true, order: 0 },
              { label: "React ignore silencieusement le hook", isCorrect: false, order: 1 },
              { label: "Une erreur de compilation TypeScript est levée", isCorrect: false, order: 2 },
              { label: "Le composant ne se démonte plus correctement", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans useMediaQuery, pourquoi doit-on nettoyer l'écouteur d'événement change ?",
            explanation: "Si l'écouteur n'est pas retiré au démontage, il continue d'exister en mémoire et tente de mettre à jour l'état d'un composant démonté, provoquant une fuite mémoire et potentiellement des erreurs.",
            points: 1,
            options: [
              { label: "Pour éviter les fuites mémoire et les mises à jour sur composant démonté", isCorrect: true, order: 0 },
              { label: "Parce que React lève une erreur sans nettoyage", isCorrect: false, order: 1 },
              { label: "Pour que le prochain rendu soit plus rapide", isCorrect: false, order: 2 },
              { label: "Pour permettre un nouvel appel au prochain mount", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'useContext et Performance',
      durationMin: 60,
      contentMarkdown: `# useContext et Performance

## Introduction

Le Context API est puissant mais ses performances sont souvent mal comprises. Quand un Provider change de valeur, chaque composant consommateur est re-rendu — même si la partie du contexte qu'il utilise n'a pas changé. Cette leçon explore comment Context fonctionne en profondeur et comment optimiser les performances.

---

## 1. Séparer les contextes par fréquence de changement

Le problème principal est qu'un seul Context pour des données qui changent à des fréquences différentes provoque des re-rendus excessifs.

\`\`\`tsx
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// ❌ Mauvais : tout dans un seul contexte
const AppContext = createContext<{
  user: User | null;
  theme: 'light' | 'dark';
  locale: string;
} | undefined>(undefined);

// ✅ Bon : séparer par fréquence de changement
const UserContext = createContext<User | null>(null);
const ThemeContext = createContext<'light' | 'dark'>('light');
const LocaleContext = createContext('fr');
\`\`\`

---

## 2. useMemo pour mémoïser les sélecteurs

Quand un consommateur n'a besoin que d'une partie du contexte, \`useMemo\` et des sélecteurs fins permettent d'éviter les re-rendus inutiles.

\`\`\`tsx
function UserProfile() {
  const user = useContext(UserContext);
  // Pas de re-rendu si seul theme change
  return <h2>{user?.name}</h2>;
}

function ThemeIndicator() {
  const theme = useContext(ThemeContext);
  // Pas de re-rendu si seul user change
  return <span>Thème : {theme}</span>;
}
\`\`\`

La clé est que chaque consommateur ne se re-render que quand **sa** valeur de contexte change.

---

## 3. useCallback pour stabiliser les fonctions passées en contexte

Les fonctions créées dans le Provider sont recréées à chaque rendu. \`useCallback\` stabilise leur référence.

\`\`\`tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (credentials: Credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
\`\`\`

---

## 4. React.memo pour éviter les re-rendus des enfants

\`React.memo\` wrap un composant pour qu'il ne se re-render que si ses props changent. C'est particulièrement utile quand un parent rend de nombreux enfants.

\`\`\`tsx
import React from 'react';

const ExpensiveList = React.memo(function ExpensiveList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// ExpensiveList ne se re-render que si items change réellement
function Parent() {
  const [count, setCount] = useState(0);
  const items = useMemo(() => getHeavyItems(), []);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <ExpensiveList items={items} />
    </div>
  );
}
\`\`\`

---

## 5. Profiling avec React DevTools

React DevTools fournit un profiling intégré pour mesurer les re-rendus et identifier les goulots d'étranglement.

\`\`\`tsx
// Activer le profiling en mode développement
// Ouvrir React DevTools → Profiler → Record

// Identifier :
// - Composants qui se re-render fréquemment sans changement visible
// - Temps de rendu de chaque composant
// - Cause des re-rendus (props, state, context, hooks)
\`\`\`

**Métriques importantes à surveiller :**
- Nombre de re-rendus par seconde
- Temps moyen de rendu par composant
- Composants avec des renders « wasted » (inutiles)

---

## Pièges courants

- **Un seul Context pour tout l'état** : si \`theme\` et \`user\` sont dans le même contexte, tout le monde se re-render quand l'un des deux change.
- **Créer des fonctions inline dans le Provider sans useCallback** : chaque rendu crée une nouvelle référence, ce qui annule React.memo sur les enfants.
- **Utiliser React.memo partout sans raison** : le memo a un coût (comparaison shallow). Ne l'utiliser que pour les composants coûtant cher à rendre.
- **Confondre useMemo avec useCallback** : \`useCallback\` est juste \`useMemo\` pour les fonctions — les deux sont nécessaires dans le Provider.
- **Oublier que le Context est global** : un Provider trop haut dans l'arbre re-render toute la branche quand sa valeur change.

---

## Résumé

- Séparer les Contexts par fréquence de changement
- \`useMemo\` pour mémoïser la valeur du Provider
- \`useCallback\` pour stabiliser les fonctions dans le Provider
- \`React.memo\` pour empêcher les re-rendus non nécessaires des enfants
- Profiling avec React DevTools pour identifier les goulots d'étranglement`,
      exercise: {
        title: 'Quiz - useContext et Performance',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Pourquoi faut-il séparer les contextes en React pour optimiser les performances ?",
            explanation: "Quand la valeur d'un contexte change, tous ses consommateurs sont re-rendus. En séparant les données par fréquence de changement, un changement de thème ne re-rendera pas les consommateurs du contexte utilisateur, et inversement.",
            points: 2,
            options: [
              { label: "Pour que chaque consommateur ne se re-render que quand SA valeur change", isCorrect: true, order: 0 },
              { label: "Pour réduire le nombre de fichiers dans le projet", isCorrect: false, order: 1 },
              { label: "Pour que TypeScript valide les props plus rapidement", isCorrect: false, order: 2 },
              { label: "Pour éviter les erreurs de runtime", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans un Provider, pourquoi faut-il utiliser useCallback sur les fonctions passées en valeur ?",
            explanation: "Sans useCallback, chaque rendu du Provider crée une nouvelle référence de fonction. Même si React.memo est utilisé sur les enfants, la nouvelle référence de fonction force leur re-rendu.",
            points: 2,
            options: [
              { label: "Pour stabiliser la référence de la fonction entre les rendus", isCorrect: true, order: 0 },
              { label: "Pour que la fonction soit asynchrone", isCorrect: false, order: 1 },
              { label: "Pour que la fonction puisse accéder au state", isCorrect: false, order: 2 },
              { label: "Pour éviter les erreurs TypeScript", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Que fait React.memo exactement sur un composant ?",
            explanation: "React.memo effectue une comparaison shallow (comparaison superficielle) des props avant de re-render le composant. Si les props n'ont pas changé (même référence), le re-rendu est ignoré.",
            points: 2,
            options: [
              { label: "Il ignore le re-rendu si les props n'ont pas changé (comparaison shallow)", isCorrect: true, order: 0 },
              { label: "Il empêche tout re-render du composant", isCorrect: false, order: 1 },
              { label: "Il met en cache le JSX rendu", isCorrect: false, order: 2 },
              { label: "Il optimise automatiquement tous les hooks du composant", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle est la différence entre useMemo et useCallback ?",
            explanation: "useMemo mémoïse une valeur calculée (retourne le résultat), tandis que useCallback mémoïse une fonction (retourne la fonction elle-même). useCallback est essentiellement useMemo pour les fonctions.",
            points: 2,
            options: [
              { label: "useMemo mémoïse une valeur, useCallback mémoïse une fonction", isCorrect: true, order: 0 },
              { label: "Ils sont identiques, juste des alias", isCorrect: false, order: 1 },
              { label: "useMemo est pour les classes, useCallback pour les fonctions", isCorrect: false, order: 2 },
              { label: "useCallback est plus rapide que useMemo", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans React DevTools Profiler, qu'est-ce qu'un render 'wasted' ?",
            explanation: "Un render 'wasted' est un re-render qui n'a produit aucun changement visible dans le DOM. C'est un signal que le composant se re-render sans raison — il faut optimiser ses dépendances ou utiliser React.memo.",
            points: 1,
            options: [
              { label: "Un re-render qui n'a produit aucun changement visible dans le DOM", isCorrect: true, order: 0 },
              { label: "Un re-render qui utilise trop de mémoire", isCorrect: false, order: 1 },
              { label: "Un re-render déclenché par une erreur", isCorrect: false, order: 2 },
              { label: "Un re-render qui prend plus de 16ms", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Patterns de Composition',
      durationMin: 60,
      contentMarkdown: `# Patterns de Composition

## Introduction

React favorise la composition plutôt que l'héritage. Les patterns de composition permettent de créer des composants flexibles, réutilisables et faciles à maintenir en combinant de petits blocs plutôt qu'en créant des monolithes.

---

## 1. Compound Components — composants composés

Le pattern Compound Components crée une API implicite entre un parent et ses enfants. Les enfants héritent du contexte du parent sans props explicites.

\`\`\`tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab.* must be used within <Tabs>');
  return context;
}

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}
      className={activeTab === id ? 'tab active' : 'tab'}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const { activeTab } = useTabsContext();
  if (activeTab !== id) return null;
  return <div role="tabpanel">{children}</div>;
}

// Utilisation
<Tabs defaultTab="profile">
  <TabList>
    <Tab id="profile">Profil</Tab>
    <Tab id="settings">Paramètres</Tab>
  </TabList>
  <TabPanel id="profile"><ProfileForm /></TabPanel>
  <TabPanel id="settings"><SettingsForm /></TabPanel>
</Tabs>
\`\`\`

---

## 2. Render Props — passer le rendu en fonction

Le pattern Render Props passe une fonction de rendu en prop, permettant au parent de contrôler complètement le markup de l'enfant.

\`\`\`tsx
interface DataFetcherProps<T> {
  url: string;
  render: (data: T, loading: boolean, error: string | null) => ReactNode;
}

function DataFetcher<T>({ url, render }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`Erreur \${res.status}\`);
        return res.json();
      })
      .then((json) => setData(json as T))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return <>{render(data!, loading, error)}</>;
}

// Utilisation
<DataFetcher<User[]>
  url="/api/users"
  render={(users, loading, error) => {
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error} />;
    return <UserList users={users} />;
  }}
/>
\`\`\`

---

## 3. Higher-Order Components (HOC)

Un HOC est une fonction qui prend un composant et retourne un nouveau composant enrichi. C'est le pattern le plus ancien, avant les hooks.

\`\`\`tsx
function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuthContext();

    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/login" />;

    return <WrappedComponent {...props} />;
  };
}

// Utilisation
function Dashboard({ user }: { user: User }) {
  return <h1>Bienvenue, {user.name}</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);
\`\`\`

> **Note :** les HOC sont aujourd'hui moins courants grâce aux hooks personnalisés, qui offrent la même réutilisabilité avec une syntaxe plus lisible.

---

## 4. Slots — emplacements dynamiques

Le pattern Slots permet de définir des zones de rendu personnalisables, similaire aux \`<slot>\` de Web Components.

\`\`\`tsx
interface PageLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
}

function PageLayout({ header, sidebar, content, footer }: PageLayoutProps) {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <div className="layout-body">
        <aside className="layout-sidebar">{sidebar}</aside>
        <main className="layout-content">{content}</main>
      </div>
      {footer && <footer className="layout-footer">{footer}</footer>}
    </div>
  );
}

// Utilisation — le parent contrôle chaque zone
<PageLayout
  header={<AppHeader />}
  sidebar={<NavigationMenu />}
  content={<ArticleList />}
  footer={<AppFooter />}
/>
\`\`\`

---

## 5. Composants flexibles avec les props restantes

\`\`\`tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={\`btn btn-\${variant} btn-\${size} \${className ?? ''}\`}
      {...rest}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
}

// Utilisation
<Button variant="danger" size="lg" isLoading={isDeleting} onClick={handleDelete}>
  Supprimer
</Button>
\`\`\`

---

## Pièges courants

- **Compound Components sans Context** : transmettre des props manuellement entre le parent et les enfants casse l'abstraction. Le Context est la colonne vertébrale du pattern.
- **Render Props avec des fonctions inline** : chaque rendu crée une nouvelle fonction, ce qui force le re-render de l'enfant. Utiliser useCallback pour stabiliser.
- **HOC avec des noms génériques** : \`withAuth(withLogger(withTheme(Component)))\` devient illisible. Préférer les hooks personnalisés.
- **Oublier les types génériques** dans les HOC : le composant enrichi perd ses props d'origine sans une bonne contrainte de type.
- **Slots trop nombreux** : quand un composant a plus de 4-5 slots, il est souvent préférable de le décomposer en composants plus petits.

---

## Résumé

- **Compound Components** : API implicite via Context entre parent et enfants
- **Render Props** : fonction de rendu passée en prop pour contrôler le markup
- **HOC** : fonction qui enveloppe un composant pour l'enrichir
- **Slots** : emplacements de rendu personnalisables via des props ReactNode
- **Props restantes** :\`...rest\` pour hériter des attributs natifs du DOM`,
      exercise: {
        title: 'Quiz - Patterns de Composition',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quel pattern utilise un Context pour créer une API implicite entre un composant parent et ses enfants ?",
            explanation: "Compound Components utilisent un Context partagé pour que les enfants (Tab, TabPanel) puissent accéder à l'état du parent (Tabs) sans props explicites, créant une API naturelle et déclarative.",
            points: 2,
            options: [
              { label: "Compound Components", isCorrect: true, order: 0 },
              { label: "Higher-Order Components", isCorrect: false, order: 1 },
              { label: "Render Props", isCorrect: false, order: 2 },
              { label: "Slots", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans le pattern Render Props, que retourne le composant enfant ?",
            explanation: "Le Render Props passe une fonction (render) en prop. Le composant enfant appelle cette fonction avec son état interne, et la fonction retourne le JSX que le parent veut afficher.",
            points: 2,
            options: [
              { label: "Il appelle la fonction render reçue en prop avec ses données internes", isCorrect: true, order: 0 },
              { label: "Il retourne un composant React.memo", isCorrect: false, order: 1 },
              { label: "Il rend directement ses children", isCorrect: false, order: 2 },
              { label: "Il retourne un objet avec les données formatées", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi les HOC sont-ils moins utilisés aujourd'hui qu'avant ?",
            explanation: "Les hooks personnalisés offrent la même réutilisabilité de logique avec une syntaxe plus lisible, sans wrapper d'arbre ni problèmes de typage. Les HOC restent valides mais les hooks sont préférés dans le code moderne.",
            points: 2,
            options: [
              { label: "Les hooks personnalisés offrent la même chose avec une syntaxe plus lisible", isCorrect: true, order: 0 },
              { label: "Les HOC sont dépréciés par React depuis la version 18", isCorrect: false, order: 1 },
              { label: "Les HOC ne fonctionnent pas avec TypeScript", isCorrect: false, order: 2 },
              { label: "Les HOC causent des erreurs de performance systématiques", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans un composant Button flexible, à quoi servent les props restantes (...rest) ?",
            explanation: "Les props restantes permettent au composant Button d'hériter de tous les attributs natifs d'un élément button HTML (onClick, type, aria-*, data-*, etc.) sans les redéfinir un par un.",
            points: 2,
            options: [
              { label: "Hériter des attributs natifs du DOM (onClick, type, aria-*, etc.)", isCorrect: true, order: 0 },
              { label: "Passer les props aux hooks internes", isCorrect: false, order: 1 },
              { label: "Permettre l'héritage de classe", isCorrect: false, order: 2 },
              { label: "Stabiliser les références de fonctions", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est le principal avantage du pattern Slots pour un layout ?",
            explanation: "Slots séparent la structure du layout (grille, en-tête, sidebar) du contenu qui l'occupe. Le parent décide quoi mettre dans chaque zone, rendant le layout réutilisable pour différentes pages sans modifier le composant layout.",
            points: 1,
            options: [
              { label: "Le parent contrôle le contenu de chaque zone du layout sans modifier le layout", isCorrect: true, order: 0 },
              { label: "Les slots améliorent automatiquement les performances", isCorrect: false, order: 1 },
              { label: "Les slots permettent le SSR (server-side rendering)", isCorrect: false, order: 2 },
              { label: "Les slots éliminent le besoin de props", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Tests et Déploiement',
      durationMin: 60,
      contentMarkdown: `# Tests et Déploiement

## Introduction

Tester une application React garantit qu'elle fonctionne comme prévu et que les refactors ne cassent pas le comportement existant. Le déploiement optimisé assure que l'application est livrée rapidement et de manière fiable aux utilisateurs.

---

## 1. React Testing Library — tester comme un utilisateur

React Testing Library (RTL) teste les composants du point de vue de l'utilisateur : il interagit avec le DOM, pas avec l'implémentation interne.

\`\`\`tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
  it('affiche le compteur initial à 0', () => {
    render(<Counter />);
    expect(screen.getByText('Compteur : 0')).toBeInTheDocument();
  });

  it('incrémente le compteur au clic', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole('button', { name: /incrémenter/i }));
    expect(screen.getByText('Compteur : 1')).toBeInTheDocument();
  });

  it('incrémente deux fois', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const button = screen.getByRole('button', { name: /incrémenter/i });
    await user.click(button);
    await user.click(button);
    expect(screen.getByText('Compteur : 2')).toBeInTheDocument();
  });
});
\`\`\`

**Principes RTL :**
- \`render()\` crée le composant dans un conteneur DOM réel
- \`screen\` fournit des query getByRole, getByText, etc.
- \`userEvent\` simule les interactions utilisateur
- Tester le comportement visible, pas l'implémentation

---

## 2. Vitest — configuration et mocks

Vitest est le framework de test rapide qui remplace Jest dans les projets Vite. Il est compatible avec l'API Jest.

\`\`\`tsx
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
\`\`\`

**Mock d'un service API :**

\`\`\`tsx
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from './UserList';

// Mock de fetch
const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@test.com' },
  { id: 2, name: 'Bob', email: 'bob@test.com' },
];

describe('UserList', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('affiche la liste des utilisateurs après le chargement', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    } as Response);

    render(<UserList />);

    expect(screen.getByText('Chargement...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('affiche une erreur si le fetch échoue', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Réseau indisponible'));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Erreur : Réseau indisponible')).toBeInTheDocument();
    });
  });
});
\`\`\`

---

## 3. Test d'un hook personnalisé

RTL fournit \`renderHook\` pour tester les hooks isolément.

\`\`\`tsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initialise à la valeur passée', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('incrémente le compteur', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('réinitialise à la valeur initiale', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });
});
\`\`\`

---

## 4. Build optimization — Vite et le code splitting

La configuration du build influence directement la performance perçue par l'utilisateur.

\`\`\`tsx
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
\`\`\`

**Code splitting avec React.lazy :**

\`\`\`tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<div>Chargement de la page...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

---

## 5. Pipeline de CI/CD — GitHub Actions

\`\`\`yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test -- --coverage
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/
\`\`\`

---

## Pièges courants

- **Tester l'implémentation interne** : RTL teste le comportement visible. Ne pas interroger les hooks internes ou les variables d'état.
- **Ne pas attendre les opérations asynchrones** : \`waitFor\` ou \`findBy\` sont indispensables pour les appels API et les mises à jour d'état asynchrones.
- **Oublier \`beforeEach\` pour les mocks** : sans nettoyage, les mocks d'un test contaminent les suivants.
- **Mettre tout dans un seul chunk** : sans code splitting, le bundle initial contient toute l'application, ce qui ralentit le premier chargement.
- **Ne pas couvrir les cas d'erreur** : les tests ne doivent pas seulement tester le chemin heureux (happy path) mais aussi les erreurs réseau, les états vides et les timeouts.

---

## Résumé

- RTL teste du point de vue de l'utilisateur (queries DOM, userEvent)
- Vitest + jsdom pour les tests unitaires et d'intégration
- \`renderHook\` pour tester les hooks personnalisés isolément
- \`React.lazy\` + \`Suspense\` pour le code splitting
- CI/CD avec GitHub Actions : lint → typecheck → test → build`,
      exercise: {
        title: 'Quiz - Tests et Déploiement',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Pourquoi React Testing Library privilégie-t-il les query par rôle (getByRole) plutôt que par sélecteur CSS ?",
            explanation: "Les query par rôle testent l'accessibilité du composant. Un test qui passe avec getByRole garantit que l'élément est accessible aux technologies d'assistance, ce qui n'est pas le cas avec un sélecteur CSS qui peut être changé sans impact fonctionnel.",
            points: 2,
            options: [
              { label: "Elles testent l'accessibilité et sont plus stables que les sélecteurs CSS", isCorrect: true, order: 0 },
              { label: "Elles sont plus rapides en exécution", isCorrect: false, order: 1 },
              { label: "Elles ne nécessitent pas d'assertions supplémentaires", isCorrect: false, order: 2 },
              { label: "Elles fonctionnent uniquement avec TypeScript", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans Vitest, à quoi sert vi.restoreAllMocks() dans beforeEach ?",
            explanation: "restoreAllMocks restaure tous les mocks (spyOn, mock, etc.) à leur état d'origine avant chaque test. Sans cela, un mock d'un test peut contaminer les suivants, causant des tests instables (flaky tests).",
            points: 2,
            options: [
              { label: "Réinitialiser tous les mocks pour éviter qu'un test contamine le suivant", isCorrect: true, order: 0 },
              { label: "Supprimer les fichiers temporaires créés par les tests", isCorrect: false, order: 1 },
              { label: "Réinitialiser le store Redux entre les tests", isCorrect: false, order: 2 },
              { label: "Vider le cache du navigateur pour les tests E2E", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans un test RTL, que se passe-t-il si on ne wrap pas l'assertion dans waitFor pour un appel API ?",
            explanation: "Le composant est rendu avant la réponse de l'API. Sans waitFor, l'assertion vérifie l'état initial (loading) et échoue car les données ne sont pas encore affichées.",
            points: 2,
            options: [
              { label: "L'assertion vérifie l'état initial avant la réponse de l'API et échoue", isCorrect: true, order: 0 },
              { label: "Le test passe silencieusement sans vérifier quoi que ce soit", isCorrect: false, order: 1 },
              { label: "Une erreur de timeout est levée immédiatement", isCorrect: false, order: 2 },
              { label: "Le mock de fetch n'est pas exécuté", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est l'objectif principal du code splitting avec React.lazy ?",
            explanation: "React.lazy divise le bundle en morceaux (chunks) chargés à la demande. L'utilisateur ne télécharge que le code nécessaire pour la page actuelle, réduisant le temps de chargement initial.",
            points: 2,
            options: [
              { label: "Charger uniquement le code nécessaire pour la page actuelle", isCorrect: true, order: 0 },
              { label: "Réduire la taille du code source en minifiant les variables", isCorrect: false, order: 1 },
              { label: "Supprimer les dépendances non utilisées du bundle", isCorrect: false, order: 2 },
              { label: "Activer le server-side rendering", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans un pipeline CI, pourquoi le typecheck doit-il être exécuté avant le build ?",
            explanation: "Si le typecheck échoue, le build TypeScript peut néanmoins réussir (selon la configuration). Exécuter le typecheck en premier détecte les erreurs de type avant de gaspiller du temps sur un build qui échouera en production.",
            points: 1,
            options: [
              { label: "Pour détecter les erreurs de type avant de gaspiller du temps sur un build voué à échouer", isCorrect: true, order: 0 },
              { label: "Parce que le typecheck nécessite les fichiers de build en entrée", isCorrect: false, order: 1 },
              { label: "Pour générer automatiquement la documentation TypeScript", isCorrect: false, order: 2 },
              { label: "Parce que Vitest dépend du typecheck pour exécuter les tests", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
  ],
  project: {
    title: 'Tableau Kanban',
    instructions: `# Tableau Kanban — Kanban Board

## Objectif

Créer une application React de tableau Kanban permettant de gérer des tâches avec drag-and-drop entre colonnes.

---

## Consignes

### 1. Structure de base

- Trois colonnes par défaut : **À faire**, **En cours**, **Terminé**
- Chaque tâche contient : titre, description (optionnelle), date de création, couleur de priorité (rouge/verte/bleue)
- Possibilité d'ajouter, modifier et supprimer des tâches

### 2. Drag and Drop

- Utiliser \`@dnd-kit/core\` ou \`react-beautiful-dnd\` pour le glisser-déposer
- Permettre le déplacement d'une tâche entre colonnes
- Permettre le réordonnancement des tâches au sein d'une même colonne
- Afficher un feedback visuel pendant le drag (ombre, opacité, placeholder)

### 3. Filtrage et recherche

- Barre de recherche filtrant les tâches par titre
- Filtres par couleur de priorité (toutes, rouge, verte, bleue)
- Les filtres s'appliquent en temps réel sans recharger les données

### 4. Dark mode

- Bascule clair/sombre via Context API
- Le thème est persisté dans localStorage
- Appliquer des variables CSS pour la cohérence visuelle

### 5. Persistance localStorage

- Sauvegarder automatiquement les colonnes et tâches dans localStorage
- Charger les données au démarrage de l'application
- Ne jamais perdre les données en cas de rechargement de page

---

## Contraintes techniques

- **React + TypeScript** obligatoire
- **Vite** comme outil de build
- Composants fonctionnels uniquement
- Hooks personnalisés pour la logique métier
- Code bien structuré (dossier \`components/\`, \`hooks/\`, \`context/\`, \`types/\`)

---

## Critères d'évaluation (5 critères)

1. **Drag & Drop** : le glisser-déposer fonctionne entre colonnes et au sein d'une colonne, avec feedback visuel approprié
2. **CRUD complet** : ajout, modification et suppression de tâches fonctionnent correctement avec validation
3. **Architecture et hooks** : découpage en composants propres, hooks personnalisés réutilisables, contexte pour le thème
4. **Fonctionnalités transversales** : filtrage, recherche, dark mode et persistence localStorage tous fonctionnels
5. **Qualité du code** : typage TypeScript strict, code lisible, bonnes pratiques React, absence de tout/rebuts inutiles`,
    evaluationCriteria: [
      "Drag & Drop fonctionnel : déplacement entre colonnes et réordonnancement avec feedback visuel",
      'CRUD complet : ajout, modification et suppression de tâches avec validation',
      'Architecture et hooks : composants propres, hooks personnalisés, contexte pour le thème',
      'Fonctionnalités transversales : filtrage, recherche, dark mode, persistence localStorage',
      'Qualité du code : TypeScript strict, lisibilité, bonnes pratiques React',
    ],
  },
};
