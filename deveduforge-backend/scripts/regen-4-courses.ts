import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

interface LessonDef { title: string; durationMin: number; contentMarkdown: string }
interface ProjectDef { title: string; instructions: string; evaluationCriteria: string[] }

// Course definitions
const courses: { dir: string; varName: string; techSlug: string; title: string; desc: string; level: string; durationMin: number; lessons: Omit<LessonDef, 'contentMarkdown'>[]; project: ProjectDef }[] = [
  {
    dir: 'backend/nodejs-microservices',
    varName: 'nodejsMicroservices',
    techSlug: 'nodejs',
    title: 'Node.js : Microservices',
    desc: "Concevez, déployez et orchestrez des architectures microservices robustes avec Node.js, Docker et les patterns de communication distribuée.",
    level: 'advanced',
    durationMin: 300,
    lessons: [
      { title: "Architecture Microservices", durationMin: 75 },
      { title: "API Gateway et Message Brokers", durationMin: 75 },
      { title: "Sécurité et Authentification Distribuée", durationMin: 75 },
      { title: "Monitoring et Déploiement", durationMin: 75 },
    ],
    project: JSON.parse(readFileSync(resolve('prisma/content/backend/nodejs-microservices/projects/nodejs-microservices-projects.ts'), 'utf-8').match(/\{[\s\S]*\}/)![0]),
  },
  {
    dir: 'mobile/react-native-advanced',
    varName: 'reactNativeAdvanced',
    techSlug: 'react-native',
    title: 'React Native Avancé',
    desc: "Animations fluides, performance optimale, mode hors-ligne et déploiement professionnel d'applications React Native.",
    level: 'advanced',
    durationMin: 300,
    lessons: [
      { title: "Animations et Gestes", durationMin: 80 },
      { title: "Performance et Optimisation", durationMin: 75 },
      { title: "Hors ligne et Stockage Local", durationMin: 75 },
      { title: "Déploiement et CI/CD", durationMin: 70 },
    ],
    project: JSON.parse(readFileSync(resolve('prisma/content/mobile/react-native-advanced/projects/react-native-advanced-projects.ts'), 'utf-8').match(/\{[\s\S]*\}/)![0]),
  },
  {
    dir: 'mobile/flutter-intro',
    varName: 'flutterIntro',
    techSlug: 'flutter',
    title: 'Flutter pour débutants',
    desc: "Découvrez Flutter et Dart pour créer de magnifiques applications mobiles cross-platform avec une seule codebase.",
    level: 'beginner',
    durationMin: 240,
    lessons: [
      { title: "Introduction à Dart et Flutter", durationMin: 65 },
      { title: "Layouts et Design", durationMin: 65 },
      { title: "Navigation et Gestion d'État", durationMin: 60 },
      { title: "Formulaires et API", durationMin: 50 },
    ],
    project: JSON.parse(readFileSync(resolve('prisma/content/mobile/flutter-intro/projects/flutter-intro-projects.ts'), 'utf-8').match(/\{[\s\S]*\}/)![0]),
  },
  {
    dir: 'mobile/flutter-advanced',
    varName: 'flutterAdvanced',
    techSlug: 'flutter',
    title: 'Flutter : Applications complexes',
    desc: "Maîtrisez le state management avec Bloc, intégrez Firebase, créez des animations fluides et déployez avec CI/CD.",
    level: 'intermediate',
    durationMin: 300,
    lessons: [
      { title: "State Management Avancé avec Bloc", durationMin: 80 },
      { title: "Firebase en Flutter", durationMin: 80 },
      { title: "Animations et Widgets Custom", durationMin: 75 },
      { title: "Tests et CI/CD", durationMin: 65 },
    ],
    project: JSON.parse(readFileSync(resolve('prisma/content/mobile/flutter-advanced/projects/flutter-advanced-projects.ts'), 'utf-8').match(/\{[\s\S]*\}/)![0]),
  },
];

// Lesson content templates
function generateContent(lessonTitle: string, tech: string, lessonNum: number): string {
  const markdowns: Record<string, string[]> = {
    'nodejs': [
      `# Architecture Microservices\n\n## Introduction\n\nLes microservices sont une approche architecturale qui décompose une application monolithique en petits services indépendants, chacun gérant une fonctionnalité spécifique. Cette leçon couvre les principes fondamentaux, les différences avec le monolithe et les concepts de bounded contexts.\n\n## 1. Monolithe vs Microservices\n\nUn monolithe est une application unique où tous les composants sont étroitement couplés et déployés ensemble. Une architecture microservices découpe ces composants en services autonomes.\n\n| Aspect | Monolithe | Microservices |\n|--------|-----------|---------------|\n| Déploiement | Un seul artefact | Un artefact par service |\n| Scaling | Vertical (plus de RAM/CPU) | Horizontal (plus d'instances) |\n| Isolation | Un bug peut tout casser | Pannes isolées |\n| Stack technique | Uniforme | Polyglotte |\n\n## 2. Bounded Contexts\n\nUn bounded context définit une frontière claire autour d'un sous-domaine métier. Chaque microservice correspond à un bounded context.\n\n## 3. Communication entre services\n\n- **Synchrone** : HTTP REST, gRPC (appels directs avec attente)\n- **Asynchrone** : Message brokers (RabbitMQ, Kafka), événements\n\n## Résumé\n\n- Microservices = services indépendants, chacun avec sa propre base de données\n- Bounded Context = frontière métier d'un service\n- Communication synchrone (HTTP/gRPC) ou asynchrone (événements)\n- Patterns : API Gateway, Service Discovery, Circuit Breaker`,
      `# API Gateway et Message Brokers\n\n## Introduction\n\nL'API Gateway est le point d'entrée unique d'un système microservices. Les message brokers (RabbitMQ, Redis Pub/Sub) gèrent la communication asynchrone entre services.\n\n## 1. API Gateway avec Express\n\nUn API Gateway gère le routage, l'authentification, le rate limiting et la transformation des requêtes avant qu'elles n'atteignent les microservices.\n\n## 2. RabbitMQ pour la communication asynchrone\n\nRabbitMQ implémente le protocole AMQP. Les producteurs envoient des messages vers des exchanges, qui les distribuent aux queues via des bindings.\n\n## 3. Redis Pub/Sub\n\nRedis Pub/Sub est plus léger que RabbitMQ mais ne persiste pas les messages. Idéal pour les notifications en temps réel.\n\n## 4. Patterns de résilience\n\nCircuit Breaker, Retry avec backoff exponentiel, Timeout, Bulkhead. Implémentez ces patterns pour éviter les pannes en cascade.\n\n## Résumé\n\n- API Gateway : routage, auth, rate limiting, transformation\n- RabbitMQ : persistant, routing complexe, exchanges/queues\n- Redis Pub/Sub : léger, temps réel, pas de persistance\n- Patterns résilience : Circuit Breaker, Retry, Timeout`,
      `# Sécurité et Authentification Distribuée\n\n## Introduction\n\nDans une architecture microservices, la sécurité doit être centralisée et cohérente. Chaque service doit pouvoir vérifier l'identité d'un utilisateur sans contacter une base de données à chaque requête.\n\n## 1. JWT avec clés RSA\n\nUtilisez des clés asymétriques : le service d'auth signe les tokens avec la clé privée, les autres services vérifient avec la clé publique.\n\n## 2. OAuth2 et SSO\n\nOAuth2 permet à un utilisateur de s'authentifier via un fournisseur tiers. Le SSO (Single Sign-On) permet d'utiliser la même session sur plusieurs services.\n\n## 3. Rate limiting centralisé\n\nL'API Gateway applique des limites de requêtes pour protéger les services contre les attaques DDoS et les abus.\n\n## 4. Sécurité des communications inter-services\n\nTLS mutuel (mTLS), tokens de service, réseau isolé en Docker. Chaque service doit avoir un identifiant unique.\n\n## Résumé\n\n- JWT RSA : signature asymétrique, pas de partage de secret\n- OAuth2 : flux standardisé pour l'authentification\n- Rate limiting : protection contre les abus\n- mTLS : communication chiffrée entre services`,
      `# Monitoring et Déploiement\n\n## Introduction\n\nLe monitoring et le déploiement sont essentiels pour maintenir la fiabilité d'une architecture microservices. Chaque service doit exposer des métriques, des logs et des health checks.\n\n## 1. Logs centralisés avec Winston\n\nUtilisez Winston avec des transports variés (console, fichier, ELK). Chaque log doit inclure un corrélation ID pour tracer une requête à travers les services.\n\n## 2. Métriques et alertes\n\nPrometheus collecte les métriques de chaque service. Grafana visualise les tableaux de bord. Des alertes sont configurées pour les anomalies.\n\n## 3. Health checks\n\nChaque service expose un endpoint /health qui vérifie la connexion à la base de données, Redis, et les dépendances.\n\n## 4. Docker Compose multi-service\n\nUn fichier docker-compose.yml orchestre tous les services avec leurs bases de données dédiées, réseaux isolés et variables d'environnement.\n\n## Résumé\n\n- Logs centralisés avec contexte de corrélation\n- Prometheus + Grafana pour les métriques\n- Health checks pour le service discovery\n- Docker Compose pour l'orchestration locale`,
    ],
    'react-native': [
      `# Animations et Gestes\n\n## Introduction\n\nLes animations et la gestion des gestes sont essentielles pour créer une expérience utilisateur fluide et naturelle dans une application React Native.\n\n## 1. React Native Reanimated 3\n\nReanimated 3 exécute les animations sur le thread UI au lieu du thread JS, garantissant des animations à 60fps même lorsque le thread JS est occupé.\n\n## 2. Gesture Handler\n\nGesture Handler remplace le système de gestes natif de React Native pour offrir des interactions plus fluides : tap, swipe, pinch, rotation, long press.\n\n## 3. Animations d'écran\n\nUtilisez react-navigation avec les transitions personnalisées pour créer des animations fluides entre les écrans.\n\n## 4. Performance des animations\n\nUtilisez useAnimatedStyle, useSharedValue et withSpring/withTiming pour des animations performantes sans re-rendu inutile.\n\n## Résumé\n\n- Reanimated 3 : animations sur le thread UI\n- Gesture Handler : gestes natifs fluides\n- Transitions d'écran personnalisées\n- useSharedValue, useAnimatedStyle, withSpring`,
      `# Performance et Optimisation\n\n## Introduction\n\nLes performances sont cruciales pour la rétention des utilisateurs mobiles. Une app React Native bien optimisée se lance rapidement, défile sans à-coups et consomme peu de batterie.\n\n## 1. Hermes Engine\n\nHermes est un moteur JavaScript optimisé pour React Native. Il réduit le temps de démarrage, la consommation mémoire et la taille du bundle.\n\n## 2. FlashList\n\nFlashList remplace FlatList pour les grandes listes. Il utilise le recyclage des vues et le calcul asynchrone de layout pour des performances optimales.\n\n## 3. Optimisation des images\n\nUtilisez des images aux bonnes dimensions, le format WebP, le lazy loading, et un cache disque avec react-native-fast-image.\n\n## 4. Profilage avec le Metro bundler\n\nUtilisez le profileur du Metro bundler et React DevTools pour identifier les goulots d'étranglement.\n\n## Résumé\n\n- Hermes : moteur JS optimisé\n- FlashList : listes hautes performances\n- Images optimisées (WebP, cache, lazy loading)\n- Profilage avec Metro et React DevTools`,
      `# Hors ligne et Stockage Local\n\n## Introduction\n\nUne application mobile de qualité doit fonctionner même sans connexion réseau. La gestion du mode hors ligne implique de détecter la connectivité, stocker les données localement et synchroniser quand le réseau revient.\n\n## 1. Détection de connectivité avec NetInfo\n\nNetInfo permet de détecter l'état de la connexion réseau (WiFi, cellulaire, aucun) et d'écouter les changements en temps réel.\n\n## 2. WatermelonDB\n\nWatermelonDB est une base de données performante pour React Native. Elle utilise SQLite sous le capot et supporte la synchronisation lazy avec un serveur.\n\n## 3. AsyncStorage avancé\n\nAsyncStorage est idéal pour les petites données (tokens, préférences). Pour les données complexes, utilisez WatermelonDB ou SQLite.\n\n## 4. Stratégies de synchronisation\n\nSynchronisation en arrière-plan, conflits de données (last-write-wins, merge), files d'attente d'opérations hors ligne.\n\n## Résumé\n\n- NetInfo : détection de connectivité\n- WatermelonDB : base de données locale avec sync lazy\n- AsyncStorage : données simples et préférences\n- Stratégies de sync : files d'attente, résolution de conflits`,
      `# Déploiement et CI/CD\n\n## Introduction\n\nLe déploiement d'une application React Native implique des outils spécifiques : EAS Build pour la compilation cloud, TestFlight et Play Store pour la distribution, et CodePush pour les mises à jour OTA.\n\n## 1. EAS Build\n\nEAS Build compile votre app dans le cloud sans configuration locale complexe. Supporte les builds iOS et Android avec des profils de configuration.\n\n## 2. TestFlight et Play Store\n\nDistribuez des versions bêta via TestFlight (iOS) et le Play Console (Android). Gérez les certificats et les profils de provisionnement.\n\n## 3. CodePush avec EAS Update\n\nLes mises à jour OTA permettent de déployer des modifications JavaScript et assets sans passer par l'App Store.\n\n## 4. GitHub Actions CI/CD\n\nAutomatisez les tests, la compilation et le déploiement avec GitHub Actions. Exécutez les tests unitaires avant chaque build.\n\n## Résumé\n\n- EAS Build : compilation cloud\n- TestFlight/Play Store : distribution bêta\n- CodePush/EAS Update : mises à jour OTA\n- GitHub Actions : CI/CD automatisé`,
    ],
    'flutter': [
      `# Introduction à Dart et Flutter\n\n## Introduction\n\nFlutter est un framework UI open-source créé par Google pour construire des applications compilées nativement à partir d'une seule codebase Dart.\n\n## 1. Syntaxe Dart essentielle\n\nDart est un langage orienté objet avec une syntaxe similaire à JavaScript et Java. Points clés : typage fort, null safety, async/await, collections.\n\n## 2. Widgets Stateless et Stateful\n\nTout est widget dans Flutter. StatelessWidget pour les composants statiques, StatefulWidget pour ceux qui ont un état mutable.\n\n## 3. Hot Reload\n\nLe hot reload injecte les modifications du code source dans la Dart VM en cours d'exécution sans perdre l'état de l'application.\n\n## 4. Structure d'un projet Flutter\n\nUn projet Flutter suit une structure standardisée : lib/ pour le code source, test/ pour les tests, pubspec.yaml pour les dépendances.\n\n## Résumé\n\n- Dart : langage moderne avec null safety\n- Widgets : StatelessWidget et StatefulWidget\n- Hot Reload : développement itératif rapide\n- Structure projet : lib/, test/, pubspec.yaml`,
      `# Layouts et Design\n\n## Introduction\n\nFlutter offre un système de layout puissant basé sur des widgets composables. Chaque widget définit sa propre contrainte de layout.\n\n## 1. Widgets de mise en page\n\nRow (horizontal), Column (vertical), Stack (superposition), Container (décoration + padding), Expanded/Flexible (ratios).\n\n## 2. ListView et GridView\n\nListView pour les listes défilantes, GridView pour les grilles. Supportent le chargement paresseux et les builders.\n\n## 3. Thèmes Material et Cupertino\n\nMaterial Design (Android) et Cupertino (iOS). Flutter adapte automatiquement le thème selon la plateforme.\n\n## 4. Responsive Design\n\nUtilisez LayoutBuilder, MediaQuery et les breakpoints pour adapter l'interface à différentes tailles d'écran.\n\n## Résumé\n\n- Row/Column/Stack : layouts de base\n- ListView/GridView : listes et grilles\n- Material/Cupertino : design systems\n- Responsive : LayoutBuilder, MediaQuery`,
      `# Navigation et Gestion d'État\n\n## Introduction\n\nLa navigation et la gestion d'état sont deux piliers du développement Flutter. Une bonne architecture rend l'application maintenable et scalable.\n\n## 1. Navigator 2.0 et routes\n\nNavigator 2.0 offre un contrôle déclaratif sur la pile de navigation. Les routes nommées simplifient la navigation entre écrans.\n\n## 2. Provider pour la gestion d'état\n\nProvider est la solution recommandée par l'équipe Flutter pour partager l'état entre les widgets. ChangeNotifier + Consumer.\n\n## 3. Passage de paramètres\n\nPassez des données entre écrans via les arguments du constructeur ou les paramètres de route.\n\n## 4. Architecture MVVM\n\nSéparez la logique métier (Model) de la vue (View) avec un ViewModel. Utilisez Provider pour lier le ViewModel à la vue.\n\n## Résumé\n\n- Navigator 2.0 : navigation déclarative\n- Provider : gestion d'état simple et puissante\n- Paramètres de route pour passer des données\n- MVVM : séparation des responsabilités`,
      `# Formulaires et API\n\n## Introduction\n\nLes formulaires et les appels API sont au cœur de toute application connectée. Flutter fournit des widgets et des packages pour gérer ces interactions.\n\n## 1. TextEditingController et validation\n\nContrôlez les champs de texte avec TextEditingController. Validez les entrées avec Form, GlobalKey et des validateurs personnalisés.\n\n## 2. HTTP et JSON\n\nUtilisez le package http pour les appels REST. Serialisez/déserialisez JSON avec dart:convert et les classes model.\n\n## 3. Gestion des erreurs et chargement\n\nAffichez des indicateurs de chargement pendant les appels API. Gérez les erreurs avec des messages utilisateur clairs.\n\n## 4. Images et téléchargements\n\nAffichez des images distantes avec Image.network. Gérez le cache et le chargement progressif.\n\n## Résumé\n\n- Formulaires avec validation\n- Appels HTTP et JSON\n- États de chargement et d'erreur\n- Images distantes et cache`,
    ],
    'flutter-adv': [
      `# State Management Avancé avec Bloc\n\n## Introduction\n\nBloc (Business Logic Component) est un pattern de state management qui sépare clairement la logique métier de l'interface utilisateur en utilisant des événements et des états.\n\n## 1. Cubit vs Bloc\n\nCubit est une version simplifiée de Bloc utilisant des fonctions. Bloc utilise des événements typés pour une traçabilité maximale.\n\n## 2. BlocProvider et BlocListener\n\nBlocProvider rend un Bloc accessible à tous les widgets enfants. BlocListener exécute des actions en réponse aux changements d'état.\n\n## 3. Architecture avec Bloc\n\nSéparez l'application en couches : Data (repositories, datasources), Business Logic (blocs), Presentation (widgets).\n\n## 4. Test des blocs\n\nLes blocs sont facilement testables unitairement. Utilisez blocTest pour tester les flux événements/états.\n\n## Résumé\n\n- Bloc : pattern événements/états\n- Cubit : version simplifiée\n- BlocProvider/BlocListener : intégration widgets\n- Architecture en couches avec blocs testables`,
      `# Firebase en Flutter\n\n## Introduction\n\nFirebase fournit une suite de services backend clés en main pour les applications mobiles : authentification, base de données, stockage et notifications.\n\n## 1. Firebase Auth\n\nAuthentifiez les utilisateurs avec email/mot de passe, Google, Apple ou anonyme. Gérez les sessions avec des tokens.\n\n## 2. Cloud Firestore\n\nBase de données NoSQL temps réel. Stockez des documents dans des collections. Sécurisez avec des règles Firestore.\n\n## 3. Firebase Storage\n\nStockez et récupérez des fichiers utilisateur (images, vidéos). Intégrez avec l'appareil photo et la galerie.\n\n## 4. Cloud Messaging (FCM)\n\nEnvoyez des notifications push aux utilisateurs. Gérez les permissions et les canaux de notification.\n\n## Résumé\n\n- Firebase Auth : authentification multiple\n- Cloud Firestore : base de données NoSQL temps réel\n- Firebase Storage : stockage de fichiers\n- FCM : notifications push`,
      `# Animations et Widgets Custom\n\n## Introduction\n\nLes animations rendent une application Flutter vivante et professionnelle. Maîtrisez AnimationController, Tween, Hero et CustomPainter.\n\n## 1. AnimationController et Tween\n\nAnimationController pilote l'animation dans le temps. Tween définit la plage de valeurs. ImplicitlyAnimatedWidget pour les animations simples.\n\n## 2. Hero et transitions\n\nHero crée des animations de transition entre deux écrans. PageRouteBuilder pour des transitions personnalisées.\n\n## 3. Staggered animations\n\nEnchaînez plusieurs animations avec AnimationController et Interval. Créez des effets complexes fluides.\n\n## 4. CustomPainter\n\nDessinez des formes personnalisées avec CustomPainter et Canvas. Créez des graphiques, des illustrations et des widgets originaux.\n\n## Résumé\n\n- AnimationController + Tween : animations pilotées\n- Hero : transitions entre écrans\n- Staggered : animations en cascade\n- CustomPainter : dessin personnalisé sur Canvas`,
      `# Tests et CI/CD\n\n## Introduction\n\nLes tests sont essentiels pour maintenir la qualité d'une application Flutter. Une stratégie de test complète inclut les tests unitaires, de widgets et d'intégration.\n\n## 1. Tests unitaires\n\nTestez les modèles, les repositories et les blocs isolément. Utilisez mockito pour simuler les dépendances.\n\n## 2. Tests de widgets\n\nTestez l'interface utilisateur avec WidgetTester. Vérifiez l'affichage, les interactions et la navigation.\n\n## 3. Tests d'intégration\n\nTestez l'application complète avec IntegrationTest. Simulez des parcours utilisateur complets.\n\n## 4. CI/CD avec Codemagic et Fastlane\n\nAutomatisez les tests et le déploiement avec Codemagic (CI cloud) et Fastlane (automatisation des stores).\n\n## Résumé\n\n- Tests unitaires : logique métier\n- Tests de widgets : UI et interactions\n- Tests d'intégration : parcours complets\n- Codemagic + Fastlane : CI/CD automatisé`,
    ],
  };

  const key = lessonNum === 0 && tech === 'flutter' ? 'flutter' :
    lessonNum >= 0 && tech === 'flutter-adv' ? 'flutter-adv' : tech;
  
  const key2 = tech === 'flutter' && lessonNum >= 2 ? 'flutter' : 
    tech === 'flutter-adv' ? 'flutter-adv' : tech;

  const contentKey = tech;
  
  if (!markdowns[contentKey] || !markdowns[contentKey][lessonNum]) {
    return `# ${lessonTitle}\n\n## Introduction\n\nCette leçon couvre les concepts avancés liés à ${lessonTitle.toLowerCase()}. Vous apprendrez les techniques et bonnes pratiques pour maîtriser ce sujet.\n\n## Contenu\n\nCette leçon explore en détail les aspects fondamentaux de ${lessonTitle.toLowerCase()} avec des exemples concrets et des exercices pratiques.\n\n## Résumé\n\n- Concepts clés de ${lessonTitle}\n- Bonnes pratiques et patterns\n- Mise en application avec des exemples`;
  }
  
  return markdowns[contentKey][lessonNum];
}

const base = resolve('prisma/content');

for (const course of courses) {
  const courseDir = resolve(base, course.dir);
  const outputFile = resolve(courseDir, 'courses', `${course.dir.split('/').pop()}-courses.ts`);
  
  const levelMap: Record<string, string> = { 'beginner': 'Level.beginner', 'intermediate': 'Level.intermediate', 'advanced': 'Level.advanced' };

  const tech = course.techSlug === 'react-native' ? 'react-native' : course.techSlug;
  const lessonContentKey = course.varName.startsWith('flutter') && course.varName !== 'flutterIntro' ? 'flutter-adv' : tech;

  const lessons = course.lessons.map((l, i) => ({
    title: l.title,
    durationMin: l.durationMin,
    contentMarkdown: generateContent(l.title, lessonContentKey, i),
  }));

  const output = `import { Level } from '@prisma/client';

export const ${course.varName} = {
  techSlug: ${JSON.stringify(course.techSlug)},
  title: ${JSON.stringify(course.title)},
  description: ${JSON.stringify(course.desc)},
  level: ${levelMap[course.level] || 'Level.advanced'},
  durationMin: ${course.durationMin},
  lessons: ${JSON.stringify(lessons, null, 2)},
  project: ${JSON.stringify(course.project, null, 2)},
};
`;

  writeFileSync(outputFile, output, 'utf-8');
  console.log(`Created: ${course.dir}/courses/${course.dir.split('/').pop()}-courses.ts`);
}
