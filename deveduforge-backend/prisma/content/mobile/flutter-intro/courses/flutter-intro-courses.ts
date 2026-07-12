import { Level } from '@prisma/client';

export const flutterIntro = {
  techSlug: "flutter",
  title: "Flutter pour débutants",
  description: "Découvrez Flutter et Dart pour créer de magnifiques applications mobiles cross-platform avec une seule codebase.",
  level: Level.beginner,
  durationMin: 240,
  lessons: [
  {
    "title": "Introduction à Dart et Flutter",
    "durationMin": 65,
    "contentMarkdown": "# Introduction à Dart et Flutter\n\n## Introduction\n\nFlutter est un framework UI open-source créé par Google pour construire des applications compilées nativement à partir d'une seule codebase Dart.\n\n## 1. Syntaxe Dart essentielle\n\nDart est un langage orienté objet avec une syntaxe similaire à JavaScript et Java. Points clés : typage fort, null safety, async/await, collections.\n\n## 2. Widgets Stateless et Stateful\n\nTout est widget dans Flutter. StatelessWidget pour les composants statiques, StatefulWidget pour ceux qui ont un état mutable.\n\n## 3. Hot Reload\n\nLe hot reload injecte les modifications du code source dans la Dart VM en cours d'exécution sans perdre l'état de l'application.\n\n## 4. Structure d'un projet Flutter\n\nUn projet Flutter suit une structure standardisée : lib/ pour le code source, test/ pour les tests, pubspec.yaml pour les dépendances.\n\n## Résumé\n\n- Dart : langage moderne avec null safety\n- Widgets : StatelessWidget et StatefulWidget\n- Hot Reload : développement itératif rapide\n- Structure projet : lib/, test/, pubspec.yaml"
  },
  {
    "title": "Layouts et Design",
    "durationMin": 65,
    "contentMarkdown": "# Layouts et Design\n\n## Introduction\n\nFlutter offre un système de layout puissant basé sur des widgets composables. Chaque widget définit sa propre contrainte de layout.\n\n## 1. Widgets de mise en page\n\nRow (horizontal), Column (vertical), Stack (superposition), Container (décoration + padding), Expanded/Flexible (ratios).\n\n## 2. ListView et GridView\n\nListView pour les listes défilantes, GridView pour les grilles. Supportent le chargement paresseux et les builders.\n\n## 3. Thèmes Material et Cupertino\n\nMaterial Design (Android) et Cupertino (iOS). Flutter adapte automatiquement le thème selon la plateforme.\n\n## 4. Responsive Design\n\nUtilisez LayoutBuilder, MediaQuery et les breakpoints pour adapter l'interface à différentes tailles d'écran.\n\n## Résumé\n\n- Row/Column/Stack : layouts de base\n- ListView/GridView : listes et grilles\n- Material/Cupertino : design systems\n- Responsive : LayoutBuilder, MediaQuery"
  },
  {
    "title": "Navigation et Gestion d'État",
    "durationMin": 60,
    "contentMarkdown": "# Navigation et Gestion d'État\n\n## Introduction\n\nLa navigation et la gestion d'état sont deux piliers du développement Flutter. Une bonne architecture rend l'application maintenable et scalable.\n\n## 1. Navigator 2.0 et routes\n\nNavigator 2.0 offre un contrôle déclaratif sur la pile de navigation. Les routes nommées simplifient la navigation entre écrans.\n\n## 2. Provider pour la gestion d'état\n\nProvider est la solution recommandée par l'équipe Flutter pour partager l'état entre les widgets. ChangeNotifier + Consumer.\n\n## 3. Passage de paramètres\n\nPassez des données entre écrans via les arguments du constructeur ou les paramètres de route.\n\n## 4. Architecture MVVM\n\nSéparez la logique métier (Model) de la vue (View) avec un ViewModel. Utilisez Provider pour lier le ViewModel à la vue.\n\n## Résumé\n\n- Navigator 2.0 : navigation déclarative\n- Provider : gestion d'état simple et puissante\n- Paramètres de route pour passer des données\n- MVVM : séparation des responsabilités"
  },
  {
    "title": "Formulaires et API",
    "durationMin": 50,
    "contentMarkdown": "# Formulaires et API\n\n## Introduction\n\nLes formulaires et les appels API sont au cœur de toute application connectée. Flutter fournit des widgets et des packages pour gérer ces interactions.\n\n## 1. TextEditingController et validation\n\nContrôlez les champs de texte avec TextEditingController. Validez les entrées avec Form, GlobalKey et des validateurs personnalisés.\n\n## 2. HTTP et JSON\n\nUtilisez le package http pour les appels REST. Serialisez/déserialisez JSON avec dart:convert et les classes model.\n\n## 3. Gestion des erreurs et chargement\n\nAffichez des indicateurs de chargement pendant les appels API. Gérez les erreurs avec des messages utilisateur clairs.\n\n## 4. Images et téléchargements\n\nAffichez des images distantes avec Image.network. Gérez le cache et le chargement progressif.\n\n## Résumé\n\n- Formulaires avec validation\n- Appels HTTP et JSON\n- États de chargement et d'erreur\n- Images distantes et cache"
  }
],
  project: {
  "title": "Application de Gestion de Notes",
  "instructions": "# Application de Gestion de Notes — Notes App\n\n## Objectif\n\nCréer une application Flutter pour gérer des notes personnelles avec des catégories, un système de recherche et un design Material 3 soigné.\n\n## Consignes\n\n### 1. Fonctionnalités obligatoires\n\n- **CRUD des notes** : créer, modifier, supprimer des notes (titre + contenu)\n- **Catégories** : chaque note a une catégorie (travail, personnel, idées, courses)\n- **Recherche** : filtrer les notes par titre ou contenu\n- **Tri** : par date de création (récent d'abord) ou par catégorie\n- **Persistance locale** : les notes sont sauvegardées dans le téléphone\n\n### 2. Composants obligatoires\n\n- **NoteCard** : carte de note avec titre, aperçu du contenu, catégorie et date\n- **CategoryFilter** : barre horizontale de filtres par catégorie\n- **NoteEditor** : écran de création/édition avec formulaire validé\n- **EmptyState** : état vide avec illustration quand il n'y a pas de notes\n- **SearchBar** : barre de recherche animée\n\n### 3. Écrans\n\n- **Accueil** : liste des notes avec filtres et recherche\n- **Édition** : formulaire de création/édition de note\n- **Détails** : lecture complète d'une note\n\n### 4. Navigation et État\n\n- **GoRouter** pour la navigation entre les écrans\n- **Provider** pour la gestion d'état globale du catalogue de notes\n- **TextEditingController** avec dispose() correct dans le formulaire\n\n### 5. Fonctionnalités bonus (optionnelles)\n\n- Thème sombre / clair\n- Notes favorites (étoile)\n- Export des notes en texte\n- Widget d'accueil avec les notes récentes\n\n## Contraintes techniques\n\n- **Flutter 3.19+** avec Dart (null safety)\n- **Material Design 3** (useMaterial3: true)\n- **Provider** pour la gestion d'état\n- **GoRouter** pour la navigation\n- **Package http** pour les appels API (si applicable)\n- **Validation** des formulaires avec Form + TextFormField\n- Les fichiers doivent être séparés dans `lib/` (models, screens, services, widgets)\n\n## Critères d'évaluation\n\n- **Fonctionnalités** : CRUD complet, catégories, recherche, tri et persistance fonctionnels\n- **UI/UX** : Material 3, design cohérent, indicateurs de chargement, état vide\n- **Formulaires** : validation correcte, gestion de TextEditingController\n- **Architecture** : séparation en dossiers, Provider utilisé correctement, code Dart propre\n- **Navigation** : GoRouter configuré, passage de paramètres, retour arrière",
  "evaluationCriteria": [
    "Fonctionnalités : CRUD complet, catégories, recherche, tri et persistance locale fonctionnels",
    "UI/UX : Material 3 appliqué, design cohérent, indicateurs de chargement, état vide géré",
    "Formulaires : validation avec Form, TextFormField, gestion correcte des contrôleurs",
    "Architecture : dossiers séparés (models, screens, services, widgets), Provider utilisé correctement",
    "Navigation : GoRouter configuré avec routes nommées, passage de paramètres, retour arrière"
  ]
},
};
