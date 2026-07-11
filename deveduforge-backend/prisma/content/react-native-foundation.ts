import { Level } from '@prisma/client';
import type { CourseContent } from './react-fundamentals';

export const reactNativeFoundation: CourseContent = {
  techSlug: 'react-native',
  title: 'React Native Foundation',
  description: 'Construisez votre première app mobile cross-platform',
  level: Level.beginner,
  durationMin: 270,
  lessons: [
    {
      title: 'Environnement Expo',
      durationMin: 70,
      contentMarkdown: `# Environnement Expo

## Introduction

React Native permet de créer des applications mobiles native avec JavaScript et React. **Expo** est un framework et un outil CLI qui simplifie considérablement le développement React Native, en fournissant des outils, des bibliothèques préconfigurées et un flux de travail sans configuration native.

---

## 1. Installation d'Expo CLI

Pour démarrer, on installe l'outil en ligne de commande Expo :

\`\`\`bash
npm install -g expo-cli
\`\`\`

Ou, avec la version plus récente (Expo CLI en tant que package local) :

\`\`\`bash
npx create-expo-app@latest MonApp
cd MonApp
npx expo start
\`\`\`

Cela crée un projet complet avec une structure de fichiers prête à l'emploi. Lorsque vous lancez \`npx expo start\`, un serveur de développement démarre et affiche un QR code. Vous pouvez scanner ce QR code avec l'application **Expo Go** sur votre appareil physique ou lancer un simulateur.

---

## 2. Le Simulateur et l'Appareil

Expo supporte deux modes de développement :

- **Simulateur iOS** (macOS uniquement) : \`npx expo start --ios\`
- **Émulateur Android** : \`npx expo start --android\`
- **Appareil physique** : scanner le QR code avec Expo Go

Pour l'appareil physique, assurez-vous que votre téléphone et votre ordinateur sont sur le **même réseau Wi-Fi**. En cas de problème, Expo propose aussi un mode tunnel.

---

## 3. Structure du Projet

La structure de base d'un projet Expo :

\`\`\`
MonApp/
├── App.tsx              # Composant racine de l'application
├── app.json             # Configuration de l'application Expo
├── package.json         # Dépendances et scripts
├── tsconfig.json        # Configuration TypeScript
├── assets/              # Images, polices, icônes
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
└── src/
    ├── components/      # Composants réutilisables
    ├── screens/         # Écrans de navigation
    ├── navigation/      # Configuration de navigation
    └── services/        # Appels API et utilitaires
\`\`\`

Le fichier \`app.json\` contient la configuration de votre app, comme le nom, le slug, la version, et les permissions.

---

## 4. Les Composants de Base

React Native fournit des composants qui se rendent en vues native :

\`\`\`tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenue dans mon app !</Text>
      </View>
      <View style={styles.content}>
        <Text>Ceci est un composant Text dans un View.</Text>
        <Text>ScrollView permet le défilement vertical.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#3b82f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
});
\`\`\`

**Composants principaux :**
- **View** : conteneur de base (équivalent de div)
- **Text** : affichage de texte (obligatoire, pas de texte brut)
- **ScrollView** : conteneur défilant (pour peu d'éléments)
- **Image** : affichage d'images
- **TextInput** : champ de saisie

---

## 5. Différences avec le Web

Quelques différences clés à retenir :

| Web | React Native |
|-----|-------------|
| \`<div>\` | \`<View>\` |
| \`<span>\`, \`<p>\` | \`<Text>\` |
| \`<input>\` | \`<TextInput>\` |
| \`className\` | \`style\` (objet) |
| \`onclick\` | \`onPress\` |
| \`href\` (navigation) | React Navigation |

---

## Points communs (Pièges fréquents)

- **Tout texte doit être dans \`<Text>\`** : un string brut dans un \`<View>\` provoque une erreur
- **Pas de \`className\`** : on utilise un objet \`StyleSheet.create()\`
- **Pas de \`<div>\`** : c'est \`<View>\` partout
- **ScrollView vs FlatList** : ScrollView charge tout en mémoire, FlatList est virtualisé (préférer FlatList pour les longues listes)`,
      exercise: {
        title: "Quiz - Environnement Expo",
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quel outil simplifie la configuration d'un projet React Native ?",
            explanation: "Expo fournit une abstraction au-dessus de la configuration native, permettant de démarrer un projet sans Xcode ni Android Studio au début.",
            points: 2,
            options: [
              { label: "Expo CLI", isCorrect: true, order: 0 },
              { label: "Webpack", isCorrect: false, order: 1 },
              { label: "Create React App", isCorrect: false, order: 2 },
              { label: "Gradle", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel composant React Native remplace <div> du web ?",
            explanation: "View est le conteneur de base React Native. Il se rend en une vue native sur iOS (UIView) et Android (android.view.View).",
            points: 2,
            options: [
              { label: "View", isCorrect: true, order: 0 },
              { label: "Container", isCorrect: false, order: 1 },
              { label: "Box", isCorrect: false, order: 2 },
              { label: "Section", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi tout texte doit-il être wrappé dans <Text> ?",
            explanation: "React Native rend le texte via des composants natifs (UITextView / android.widget.TextView). Un string brut hors de <Text> ne peut pas être rendu nativement et provoque une erreur.",
            points: 2,
            options: [
              { label: "Parce que le texte doit être rendu via un composant natif", isCorrect: true, order: 0 },
              { label: "Parce que React l'exige pour le JSX", isCorrect: false, order: 1 },
              { label: "C'est juste une convention, pas une obligation", isCorrect: false, order: 2 },
              { label: "Pour des raisons de performance uniquement", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment styliser un composant React Native ?",
            explanation: "StyleSheet.create retourne un objet de styles optimisé. On passe un objet style (ou un tableau d'objets) à la prop style du composant.",
            points: 1,
            options: [
              { label: "Via un objet JavaScript passé à la prop style", isCorrect: true, order: 0 },
              { label: "Via className avec du CSS externe", isCorrect: false, order: 1 },
              { label: "Via des fichiers .css importés", isCorrect: false, order: 2 },
              { label: "Via Sass/SCSS", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel composant est recommandé pour afficher une longue liste de données ?",
            explanation: "FlatList utilise la virtualisation : seuls les éléments visibles sont rendus en mémoire, ce qui est beaucoup plus performant que ScrollView pour les grandes listes.",
            points: 1,
            options: [
              { label: "FlatList (virtualisé)", isCorrect: true, order: 0 },
              { label: "ScrollView (tout en mémoire)", isCorrect: false, order: 1 },
              { label: "List (composant natif)", isCorrect: false, order: 2 },
              { label: "SectionList (toujours)", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Composants de base',
      durationMin: 70,
      contentMarkdown: `# Composants de base

## Introduction

La maîtrise des composants de base et de la mise en page est essentielle pour créer des interfaces mobiles fonctionnelles et esthétiques. Nous allons explorer **StyleSheet**, **Flexbox**, **TouchableOpacity**, **TextInput** et **FlatList**.

---

## 1. StyleSheet

\`StyleSheet.create()\` optimise les objets de style en les envoyant une seule fois au thread natif :

\`\`\`tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    // Ombre iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Ombre Android
    elevation: 3,
  },
});
\`\`\`

**Propriétés CSS courantes non supportées** : \`display: grid\`, \`float\`, \`position: sticky\`.

---

## 2. Flexbox en React Native

Flexbox est le **mode de disposition par défaut** de tous les composants React Native (contrairement au web où il faut l'activer).

\`\`\`tsx
import { View, StyleSheet } from 'react-native';

export default function FlexExample() {
  return (
    <View style={styles.row}>
      <View style={[styles.box, { backgroundColor: '#3b82f6' }]}>
        <Text>1</Text>
      </View>
      <View style={[styles.box, { backgroundColor: '#ef4444' }]}>
        <Text>2</Text>
      </View>
      <View style={[styles.box, { backgroundColor: '#22c55e' }]}>
        <Text>3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  box: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
\`\`\`

**Différence majeure avec le web** : \`flexDirection\` est par défaut \`column\` (pas \`row\`).

---

## 3. TouchableOpacity et gestes

\`TouchableOpacity\` est l'équivalent d'un bouton React Native avec un effet de fondu à l'appui :

\`\`\`tsx
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

export default function MyButton() {
  const handlePress = () => {
    Alert.alert('Bonjour !', 'Vous avez appuyé sur le bouton.');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
      <Text style={styles.buttonText}>Appuyez ici</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
\`\`\`

**Autres composants d'interaction** :
- \`Pressable\` (plus flexible, recommandé par React Native)
- \`TouchableWithoutFeedback\` (pas de feedback visuel)
- \`TouchableHighlight\` (surlignage à l'appui)

---

## 4. TextInput

\`TextInput\` est le composant de saisie de texte, avec deux modes : contrôlé et non-contrôlé.

\`\`\`tsx
import { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher..."
        placeholderTextColor="#9ca3af"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      <Text style={styles.result}>Vous avez tapé : {query}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  result: {
    marginTop: 8,
    color: '#6b7280',
  },
});
\`\`\`

**Props utiles** : \`secureTextEntry\` (mot de passe), \`keyboardType\` (type de clavier), \`multiline\`.

---

## 5. FlatList

\`FlatList\` est la composante standard pour afficher des listes performantes.

\`\`\`tsx
import { FlatList, Text, View, StyleSheet } from 'react-native';

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const data: Todo[] = [
  { id: '1', title: 'Apprendre React Native', done: false },
  { id: '2', title: 'Créer un composant', done: true },
  { id: '3', title: 'Déployer sur le store', done: false },
];

export default function TodoList() {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={[styles.title, item.done && styles.done]}>
            {item.done ? '✅' : '⬜'} {item.title}
          </Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<Text>Aucune tâche</Text>}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
});
\`\`\`

**Props clés de FlatList** :
- \`data\` : tableau de données
- \`keyExtractor\` : fonction qui retourne la clé unique
- \`renderItem\` : fonction qui retourne le composant pour chaque élément
- \`onEndReached\` : callback pour le chargement infini (pagination)
- \`ListHeaderComponent\`, \`ListFooterComponent\`, \`ListEmptyComponent\`

---

## Points communs (Pièges fréquents)

- **Flexbox default** : \`flexDirection\` est \`column\`, pas \`row\`
- **Pas de \`className\`** : utiliser \`style\` avec un objet ou \`StyleSheet\`
- **FlatList nécessite \`keyExtractor\`** : sinon React affiche un warning
- **TextInput contrôlé** : toujours lier \`value\` et \`onChangeText\`, sinon le champ peut devenir incontrôlable
- **Ombre double syntaxe** : \`shadow*\` pour iOS, \`elevation\` pour Android`,
      exercise: {
        title: "Quiz - Composants de base",
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quelle est la direction par défaut de Flexbox en React Native ?",
            explanation: "Contrairement au web (row), React Native utilise column par défaut. Les enfants s'alignent verticalement, de haut en bas.",
            points: 2,
            options: [
              { label: "column (vertical)", isCorrect: true, order: 0 },
              { label: "row (horizontal)", isCorrect: false, order: 1 },
              { label: "grid", isCorrect: false, order: 2 },
              { label: "column-reverse", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est l'avantage principal de FlatList par rapport à ScrollView pour les longues listes ?",
            explanation: "FlatList virtualise la liste : seuls les éléments visibles (plus quelques buffer) sont rendus en mémoire, ce qui permet de gérer des milliers d'éléments sans crash.",
            points: 2,
            options: [
              { label: "La virtualisation : seuls les éléments visibles sont rendus", isCorrect: true, order: 0 },
              { label: "FlatList a un meilleur design visuel", isCorrect: false, order: 1 },
              { label: "ScrollView ne supporte pas les listes", isCorrect: false, order: 2 },
              { label: "FlatList ne nécessite pas de key", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment styliser un composant React Native ?",
            explanation: "On passe un objet JavaScript à la prop style. StyleSheet.create optimise l'envoi des styles au thread natif et améliore les performances.",
            points: 1,
            options: [
              { label: "Via un objet style (ou StyleSheet.create)", isCorrect: true, order: 0 },
              { label: "Via className avec du CSS", isCorrect: false, order: 1 },
              { label: "Via un fichier .css importé", isCorrect: false, order: 2 },
              { label: "Via inline CSS dans du HTML", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle prop de TextInput contrôle la valeur affichée ?",
            explanation: "Dans un TextInput contrôlé, value définit ce qui s'affiche, et onChangeText met à jour l'état à chaque frappe. Sans ces deux props, le champ peut devenir incontrôlable.",
            points: 1,
            options: [
              { label: "value et onChangeText", isCorrect: true, order: 0 },
              { label: "defaultValue et onChange", isCorrect: false, order: 1 },
              { label: "text et onInput", isCorrect: false, order: 2 },
              { label: "content et onTextChange", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle est la différence entre TouchableOpacity et Pressable ?",
            explanation: "Pressable est le composant recommandé par React Native pour les interactions. Il est plus flexible (supporte les états hover, pressed, etc.) et plus moderne que TouchableOpacity.",
            points: 1,
            options: [
              { label: "Pressable est plus récent et plus flexible, recommandé par React Native", isCorrect: true, order: 0 },
              { label: "TouchableOpacity est plus rapide en performance", isCorrect: false, order: 1 },
              { label: "Ils sont exactement identiques", isCorrect: false, order: 2 },
              { label: "Pressable ne fonctionne que sur iOS", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Navigation',
      durationMin: 65,
      contentMarkdown: `# Navigation

## Introduction

La navigation est un pilier fondamental des applications mobiles. **React Navigation** est la bibliothèque de navigation standard pour React Native. Elle gère les pileaux d'écrans (stack), les onglets (tabs), et les navigateurs imbriqués.

---

## 1. Installation

\`\`\`bash
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
\`\`\`

---

## 2. Stack Navigator (Pile d'écrans)

Un stack navigator gère la navigation de type pile : on empile des écrans et on peut revenir en arrière.

\`\`\`tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil</Text>
      <Button
        title="Voir les détails"
        onPress={() =>
          navigation.navigate('Details', { itemId: 42, title: 'Produit' })
        }
      />
    </View>
  );
}

function DetailsScreen({ route }: any) {
  const { itemId, title } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de {title}</Text>
      <Text>Item ID : {itemId}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
\`\`\`

---

## 3. Tab Navigator (Onglets)

\`\`\`bash
npm install @react-navigation/bottom-tabs
\`\`\`

\`\`\`tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function HomeTab() {
  return <View style={styles.container}><Text>Accueil</Text></View>;
}
function ProfileTab() {
  return <View style={styles.container}><Text>Profil</Text></View>;
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Home: 'home',
            Profile: 'person',
          };
          return <Ionicons name={icons[route.name] as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
}
\`\`\`

---

## 4. Passage de Paramètres

React Navigation offre un système de typage des paramètres pour la sécurité TypeScript :

\`\`\`tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: { darkMode: boolean };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

function ProfileScreen({ route, navigation }: Props) {
  const { userId } = route.params;
  return <Text>Profil de l'utilisateur {userId}</Text>;
}
\`\`\`

**Navigation entre écrans :**
- \`navigation.navigate('Details', { id: 1 })\` — aller à un écran
- \`navigation.goBack()\` — revenir en arrière
- \`navigation.popToTop()\` — retour à l'écran initial de la pile

---

## 5. Navigateurs Imbriqués

On peut combiner Stack et Tab pour créer une navigation hiérarchique :

\`\`\`tsx
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

**Typage des params avec un navigateur imbriqué :**

\`\`\`tsx
type RootStackParamList = {
  HomeTabs: undefined;
  Detail: { id: string };
  Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;
\`\`\`

---

## Points communs (Pièges fréquents)

- **Oublier \`NavigationContainer\`** : la navigation ne fonctionne pas sans le conteneur racine
- **Passer des objets complexes en params** : préférer des IDs simples et charger les données à l'arrivée
- **Confondre \`navigate\` et \`push\`** : \`navigate\` réutilise un écran existant dans la pile, \`push\` en crée toujours un nouveau
- **TypeScript non typé** : toujours typer \`RootStackParamList\` pour éviter les bugs
- **Oublier \`react-native-screens\`** : sans cette dépendance, la navigation est beaucoup plus lente`,
      exercise: {
        title: "Quiz - Navigation",
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quel est le rôle de NavigationContainer dans React Navigation ?",
            explanation: "NavigationContainer est le composant racine qui englobe toute l'arborescence de navigation. Sans lui, aucun écran ne peut être affiché via un navigateur.",
            points: 2,
            options: [
              { label: "C'est le conteneur racine qui gère l'état de navigation", isCorrect: true, order: 0 },
              { label: "C'est un composant pour afficher un menu", isCorrect: false, order: 1 },
              { label: "C'est une base de données pour stocker la navigation", isCorrect: false, order: 2 },
              { label: "C'est un gestionnaire de permissions", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle est la différence entre navigation.navigate() et navigation.push() ?",
            explanation: "navigate() réutilise un écran existant dans la pile s'il existe déjà. push() crée toujours une nouvelle instance, même si l'écran est déjà présent.",
            points: 2,
            options: [
              { label: "navigate() réutilise l'écran existant, push() en crée un nouveau", isCorrect: true, order: 0 },
              { label: "push() est plus rapide que navigate()", isCorrect: false, order: 1 },
              { label: "navigate() ne passe pas de paramètres", isCorrect: false, order: 2 },
              { label: "Ils sont strictement identiques", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment typer les paramètres de navigation en TypeScript ?",
            explanation: "On définit un type RootStackParamList qui associe chaque nom d'écran à son type de paramètres, puis on passe ce type à createNativeStackNavigator.",
            points: 2,
            options: [
              { label: "En définissant un type RootStackParamList passé à createNativeStackNavigator", isCorrect: true, order: 0 },
              { label: "En utilisant des PropTypes", isCorrect: false, order: 1 },
              { label: "React Navigation n'est pas compatible TypeScript", isCorrect: false, order: 2 },
              { label: "En créant un fichier routes.ts séparé", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi éviter de passer de gros objets en paramètres de navigation ?",
            explanation: "Les params sont sérialisés et passés par copie. De gros objets alourdissent la navigation. Il est préférable de passer un ID simple et de charger les données dans l'écran cible.",
            points: 1,
            options: [
              { label: "Les params sont sérialisés et alourdissent la mémoire", isCorrect: true, order: 0 },
              { label: "React Navigation ne supporte que les strings", isCorrect: false, order: 1 },
              { label: "Les objets ne peuvent pas être passés en params", isCorrect: false, order: 2 },
              { label: "C'est uniquement un problème de style", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel type de navigateur utilise-t-on pour la navigation par onglets ?",
            explanation: "createBottomTabNavigator (ou createMaterialTopTabNavigator) est le navigateur adapté aux interfaces à onglets. Il affiche une barre de navigation en bas de l'écran.",
            points: 1,
            options: [
              { label: "createBottomTabNavigator", isCorrect: true, order: 0 },
              { label: "createStackNavigator", isCorrect: false, order: 1 },
              { label: "createDrawerNavigator", isCorrect: false, order: 2 },
              { label: "createNativeStackNavigator", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'API natives',
      durationMin: 65,
      contentMarkdown: `# API natives

## Introduction

L'une des grandes forces de React Native est d'accéder aux fonctionnalités native du téléphone : caméra, géolocalisation, notifications, et plus encore. Nous allons explorer les modules Expo les plus courants pour intégrer ces fonctionnalités dans vos apps.

---

## 1. Camera avec expo-image-picker

\`expo-image-picker\` permet d'accéder à la caméra et à la galerie photos de l'appareil.

\`\`\`bash
npx expo install expo-image-picker
\`\`\`

\`\`\`tsx
import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraExample() {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Autorisez l\'accès à la caméra.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Prendre une photo" onPress={takePhoto} />
      <Button title="Choisir dans la galerie" onPress={pickFromGallery} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  image: { width: '100%', height: 300, borderRadius: 8, marginTop: 12 },
});
\`\`\`

---

## 2. Géolocalisation avec expo-location

\`expo-location\` fournit l'accès à la position GPS, la géolocalisation en arrière-plan, et le reverse geocoding.

\`\`\`bash
npx expo install expo-location
\`\`\`

\`\`\`tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

interface LocationData {
  latitude: number;
  longitude: number;
  city: string | null;
}

export default function LocationExample() {
  const [location, setLocation] = useState<LocationData | null>(null);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Autorisez l\'accès à la localisation.');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const [geocode] = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      city: geocode?.city ?? null,
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Obtenir ma position" onPress={getCurrentLocation} />
      {location && (
        <View style={styles.info}>
          <Text>Ville : {location.city ?? 'Inconnue'}</Text>
          <Text>Latitude : {location.latitude.toFixed(4)}</Text>
          <Text>Longitude : {location.longitude.toFixed(4)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  info: { marginTop: 20, padding: 16, backgroundColor: '#f3f4f6', borderRadius: 8 },
});
\`\`\`

---

## 3. Notifications avec expo-notifications

\`expo-notifications\` gère les notifications locales et push.

\`\`\`bash
npx expo install expo-notifications
\`\`\`

\`\`\`tsx
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function scheduleReminder() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Rappel',
      body: 'N\'oubliez pas de boire de l\'eau !',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60,
    },
  });
}
\`\`\`

---

## 4. Gestion des Permissions

Chaque API native nécessite une permission. Le pattern est toujours le même :

\`\`\`tsx
import { Camera } from 'expo-camera';

const checkPermission = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status === 'granted') {
    // Accès autorisé
  } else {
    Alert.alert(
      'Permission requise',
      'Activez la caméra dans les paramètres.'
    );
  }
};
\`\`\`

**Bonnes pratiques :**
- Toujours demander la permission **avant** d'utiliser l'API
- Expliquer à l'utilisateur **pourquoi** la permission est nécessaire
- Gérer le refus de permission avec un message clair et un lien vers les paramètres

---

## 5. Résumé des API Expo courantes

| Module | Fonctionnalité |
|--------|---------------|
| \`expo-image-picker\` | Caméra et galerie photos |
| \`expo-location\` | Géolocalisation GPS |
| \`expo-notifications\` | Notifications locales et push |
| \`expo-file-system\` | Lecture/écriture de fichiers |
| \`expo-contacts\` | Accès au carnet d'adresses |
| \`expo-haptics\` | Retour haptique (vibrations) |
| \`expo-sensors\` | Accéléromètre, gyroscope |
| \`expo-linking\` | Ouverture de liens externes |
| \`expo-sharing\` | Partage de contenu |
| \`expo-print\` | Impression de documents |

---

## Points communs (Pièges fréquents)

- **Demander la permission avant l'appel** : toujours vérifier \`requestPermissionsAsync()\`
- **Gérer le refus** : prévoir un message et un fallback
- **Permissions Android** : ajouter les permissions dans \`app.json\` sous \`expo.android.permissions\`
- **Test sur simulateur** : certaines API (caméra, GPS) ne fonctionnent pas sur simulateur
- **Ne pas surcharger les notifications** : les notifications push nécessitent un backend`,
      exercise: {
        title: "Quiz - API natives",
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quelle bibliothèque Expo permet d'accéder à la caméra et à la galerie photos ?",
            explanation: "expo-image-picker fournit des fonctions pour lancer la caméra (launchCameraAsync) et ouvrir la galerie (launchImageLibraryAsync).",
            points: 2,
            options: [
              { label: "expo-image-picker", isCorrect: true, order: 0 },
              { label: "expo-camera", isCorrect: false, order: 1 },
              { label: "expo-media", isCorrect: false, order: 2 },
              { label: "expo-photos", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi doit-on toujours demander une permission avant d'utiliser une API native ?",
            explanation: "Les systèmes iOS et Android exigent le consentement explicite de l'utilisateur pour des raisons de confidentialité. Sans permission, l'API lève une erreur ou retourne null.",
            points: 2,
            options: [
              { label: "Pour respecter la confidentialité et la législation (RGPD)", isCorrect: true, order: 0 },
              { label: "C'est juste une convention de codage", isCorrect: false, order: 1 },
              { label: "React Native l'exige pour le JSX", isCorrect: false, order: 2 },
              { label: "Pour améliorer les performances de l'API", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment obtenir la position GPS actuelle de l'utilisateur ?",
            explanation: "expo-location fournit getCurrentPositionAsync qui retourne les coordonnées GPS (latitude, longitude) avec un niveau de précision configurable.",
            points: 2,
            options: [
              { label: "Location.getCurrentPositionAsync()", isCorrect: true, order: 0 },
              { label: "Geolocation.getCurrentPosition()", isCorrect: false, order: 1 },
              { label: "navigator.geolocation.watchPosition()", isCorrect: false, order: 2 },
              { label: "Location.getPosition()", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment gérer le refus de permission par l'utilisateur ?",
            explanation: "Il faut vérifier le status retourné par requestPermissionsAsync(). Si le status est 'denied', afficher un message clair et éventuellement un lien vers les paramètres de l'appareil.",
            points: 1,
            options: [
              { label: "Vérifier le status et afficher un message avec lien vers les paramètres", isCorrect: true, order: 0 },
              { label: "Relancer la demande automatiquement en boucle", isCorrect: false, order: 1 },
              { label: "Ignorer et continuer sans permission", isCorrect: false, order: 2 },
              { label: "Afficher une erreur technique à l'utilisateur", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel module Expo permet de programmer des notifications locales ?",
            explanation: "expo-notifications offre scheduleNotificationAsync pour programmer des notifications futures avec un déclencheur (timer, date, ou condition).",
            points: 1,
            options: [
              { label: "expo-notifications", isCorrect: true, order: 0 },
              { label: "expo-alarms", isCorrect: false, order: 1 },
              { label: "expo-push", isCorrect: false, order: 2 },
              { label: "expo-reminders", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
  ],
  project: {
    title: 'Application Météo',
    instructions: `# Application Météo — Weather App

## Objectif

Créer une application React Native avec Expo qui affiche la météo actuelle et les prévisions sur 5 jours.

## Consignes

### 1. Fonctionnalités obligatoires

- **Météo actuelle** : afficher la température, la description, l'icône météo et le nom de la ville
- **Prévisions 5 jours** : liste défilante avec températures min/max et icônes pour chaque jour
- **Recherche de ville** : champ de texte pour chercher une ville et afficher sa météo
- **Pull-to-refresh** : \`RefreshControl\` sur la ScrollView/FlatList pour recharger les données
- **Géolocalisation** : au lancement, récupérer la position GPS et afficher la météo locale

### 2. Composants obligatoires

- **WeatherCard** : carte affichant la météo actuelle (température, description, icône, ville)
- **ForecastList** : liste des prévisions sur 5 jours
- **SearchBar** : champ de recherche de ville avec bouton
- **LoadingIndicator** : indicateur de chargement animé
- **ErrorMessage** : composant d'erreur avec bouton réessayer

### 3. API et Services

- Utiliser l'API OpenWeatherMap (clé API à fournir dans un fichier \`.env\`)
- Créer un service \`weatherService.ts\` avec les appels API
- Gérer les erreurs réseau et les erreurs API
- Stocker la dernière ville recherchée dans AsyncStorage

### 4. Navigation

- **Stack Navigator** : écran principal (météo) → écran de détails
- **Bottom Tab Navigator** : onglets Météo / Recherche / Paramètres

### 5. Fonctionnalités bonus (optionnelles)

- Thème sombre / clair (via Context)
- Animation de transition entre les écrans
- Graphique des températures sur 5 jours (avec react-native-chart-kit)
- Sauvegarde de villes favorites

## Contraintes techniques

- **Expo SDK 51+** avec TypeScript
- **React Navigation** pour la navigation
- **FlatList** pour la liste des prévisions (pas ScrollView)
- Composants fonctionnels uniquement
- Aucune donnée en dur : tout vient de l'API

## Rendu

Déposer le code source sur GitHub et soumettre le lien du repository.`,
    evaluationCriteria: [
      'Fonctionnalités : toutes les fonctionnalités obligatoires sont présentes et fonctionnelles (météo actuelle, prévisions 5 jours, recherche, pull-to-refresh, géolocalisation)',
      'Architecture : séparation des composants, service API isolé, navigation correctement configurée',
      "Gestion d'état : état local géré proprement, gestion des erreurs, loading states",
      'Qualité du code : nommage clair, TypeScript correct, pas de données en dur',
      'UI/UX : design soigné, indicateurs de chargement, messages d\'erreur explicites, responsive',
    ],
  },
};
