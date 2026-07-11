import { Level } from '@prisma/client';
import type { CourseContent } from './react-fundamentals';

export const vuejsIntro: CourseContent = {
  techSlug: 'vuejs',
  title: 'Introduction à Vue.js 3',
  description: 'Découvrez Vue.js et le Composition API',
  level: Level.beginner,
  durationMin: 150,
  lessons: [
    {
      title: 'Premiers pas avec Vue.js',
      durationMin: 35,
      contentMarkdown: `# Premiers pas avec Vue.js

## Introduction

Vue.js est un framework JavaScript progressif pour construire des interfaces utilisateur. Conçu pour être adopté progressivement, il excelle aussi bien dans de petits widgets que dans des applications complexes. Sa courbe d'apprentissage douce et sa documentation excellente en font un choix idéal pour débuter dans le développement front-end moderne.

---

## 1. Installation et Création d'un Projet

La manière la plus simple de démarrer un projet Vue.js 3 est d'utiliser \`create-vue\`, le scaffolding officiel :

\`\`\`bash
npm create vue@latest
\`\`\`

Cela vous propose un assistant interactif pour choisir TypeScript, Vue Router, Pinia, et d'autres options. Une fois le projet créé :

\`\`\`bash
cd mon-projet
npm install
npm run dev
\`\`\`

Votre application est accessible sur \`http://localhost:5173\`.

---

## 2. La Fonction createApp et le Montage

L'entrée d'une application Vue.js est la fonction \`createApp\`. Elle crée une instance d'application que l'on attache ensuite à un élément du DOM :

\`\`\`javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
\`\`\`

Le composant \`App.vue\` est le composant racine. Chaque composant Vue est un fichier \`.vue\` avec trois sections potentielles : \`<template>\`, \`<script>\` et \`<style>\`.

---

## 3. Syntaxe de Template

Vue utilise une syntaxe de template HTML enrichie. Pour afficher des données dynamiques, on utilise les doubles accolades \`{{ }}\` :

\`\`\`html
<template>
  <div>
    <h1>{{ titre }}</h1>
    <p>Bonjour {{ prenom }} !</p>
    <p>Double : {{ nombre * 2 }}</p>
  </div>
</template>
\`\`\`

On peut y insérer des expressions JavaScript valides : concaténations, appels de fonctions, opérateurs ternaires, etc.

---

## 4. Les Données Réactives avec ref()

Vue.js 3 introduit le Composition API. Pour créer des données réactives, on utilise la fonction \`ref()\` :

\`\`\`javascript
import { ref } from 'vue'

const compteur = ref(0)
console.log(compteur.value) // 0
compteur.value++
console.log(compteur.value) // 1
\`\`\`

\`ref()\` encapsule une valeur dans un objet réactif. On accède et modifie la valeur via la propriété \`.value\`. Dans le template, Vue déballe automatiquement les refs, donc on écrit \`{{ compteur }}\` sans \`.value\`.

**Exemple complet :**

\`\`\`html
<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue !')
const compteur = ref(0)

function incrementer() {
  compteur.value++
}
</script>

<template>
  <h1>{{ message }}</h1>
  <p>Compteur : {{ compteur }}</p>
  <button @click="incrementer">+1</button>
</template>
\`\`\`

---

## 5. Le Script Setup

La syntaxe \`<script setup>\` est la recommandée pour Vue.js 3. Elle offre plusieurs avantages :
- Moins de boilerplate (pas besoin de \`export default\`, de \`return\`)
- Les variables et fonctions déclarées sont automatiquement exposées au template
- Le typage TypeScript fonctionne de manière plus naturelle

\`\`\`html
<script setup>
import { ref, onMounted } from 'vue'

const nom = ref('Monde')

onMounted(() => {
  console.log('Composant monté !')
})
</script>

<template>
  <p>Bonjour {{ nom }} !</p>
</template>
\`\`\`

---

## Résumé

- \`createApp\` crée l'application, \`.mount()\` l'attache au DOM
- La syntaxe de template utilise \`{{ }}\` pour l'interpolation
- \`ref()\` crée une donnée réactives accessible via \`.value\`
- \`<script setup>\` est la syntaxe recommandée (moins de boilerplate)
- Vue est progressif : on peut l'adopter petit à petit`,
      exercise: {
        title: 'Quiz — Premiers pas avec Vue.js',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quelle fonction utilise-t-on pour créer une instance d'application Vue.js 3 ?",
            explanation: "createApp est la fonction d'entrée de Vue.js 3. Elle remplace new Vue() de la version 2 et permet de créer une instance d'application propre.",
            points: 2,
            options: [
              { label: 'createApp()', isCorrect: true, order: 0 },
              { label: 'new Vue()', isCorrect: false, order: 1 },
              { label: 'initApp()', isCorrect: false, order: 2 },
              { label: 'Vue.create()', isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment accède-t-on à la valeur d'un ref() dans le script ?",
            explanation: "ref() retourne un objet contenant la valeur dans la propriété .value. Dans le template, Vue déballe automatiquement les refs, mais en JavaScript il faut utiliser .value.",
            points: 2,
            options: [
              { label: "Via la propriété .value", isCorrect: true, order: 0 },
              { label: "Directement sans accesseur", isCorrect: false, order: 1 },
              { label: "Via .data", isCorrect: false, order: 2 },
              { label: "Via .get()", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle syntaxe de template Vue.js permet d'afficher la valeur d'une variable ?",
            explanation: "Les doubles accolades {{ }} sont utilisées pour l'interpolation de données dans les templates Vue. On peut y mettre des expressions JavaScript valides.",
            points: 1,
            options: [
              { label: "{{ variable }}", isCorrect: true, order: 0 },
              { label: "${variable}", isCorrect: false, order: 1 },
              { label: "<%= variable %>", isCorrect: false, order: 2 },
              { label: "[[ variable ]]", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est l'avantage principal de <script setup> par rapport à un script classique ?",
            explanation: "<script setup> élimine le boilerplate (export default, return, defineComponent). Les variables déclarées sont automatiquement exposées au template, ce qui rend le code plus concis.",
            points: 1,
            options: [
              { label: "Moins de boilerplate et exposition automatique au template", isCorrect: true, order: 0 },
              { label: "Meilleures performances d'exécution", isCorrect: false, order: 1 },
              { label: "Support exclusif de TypeScript", isCorrect: false, order: 2 },
              { label: "Chargement plus rapide du composant", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel fichier est le composant racine par défaut d'un projet Vue.js créé avec create-vue ?",
            explanation: "App.vue est le composant racine qui englobe tous les autres composants. C'est le point de montage principal de l'application.",
            points: 1,
            options: [
              { label: "App.vue", isCorrect: true, order: 0 },
              { label: "Main.vue", isCorrect: false, order: 1 },
              { label: "Index.vue", isCorrect: false, order: 2 },
              { label: "Root.vue", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Composition API',
      durationMin: 40,
      contentMarkdown: `# Composition API

## Introduction

La Composition API est le cœur de Vue.js 3. Elle permet d'organiser la logique d'un composant par fonctionnalité plutôt que par type de propriété (data, methods, computed, watch comme dans l'Options API). Cela rend le code plus lisible et réutilisable.

---

## 1. ref() et reactive()

Vue.js 3 offre deux façons principales de créer des données réactives :

\`\`\`javascript
import { ref, reactive } from 'vue'

// ref() : pour les primitives et les objets
const compteur = ref(0)
const utilisateur = ref({ nom: 'Alice', age: 25 })

// reactive() : uniquement pour les objets et tableaux
const etat = reactive({ nom: 'Alice', age: 25 })
\`\`\`

**Différences clés :**
- \`ref()\` fonctionne avec n'importe quel type de valeur et nécessite \`.value\` en JavaScript
- \`reactive()\` ne fonctionne qu'avec les objets et tableaux, mais pas besoin de \`.value\`
- \`ref()\` peut être remplacée entièrement, \`reactive()\` ne peut pas être reassignée

\`\`\`javascript
const count = ref(0)
count.value = 1 // OK

const state = reactive({ count: 0 })
state.count = 1 // OK
// state = reactive({ count: 1 }) // Erreur : reassignation interdite
\`\`\`

---

## 2. computed()

Les propriétés calculées dérivent automatiquement une valeur à partir de données réactives. Elles sont mémoïsées et ne se recalculent que quand leurs dépendances changent :

\`\`\`javascript
import { ref, computed } from 'vue'

const prenom = ref('Alice')
const nom = ref('Dupont')

const nomComplet = computed(() => \`\${prenom.value} \${nom.value}\`)
console.log(nomComplet.value) // "Alice Dupont"

prenom.value = 'Bob'
console.log(nomComplet.value) // "Bob Dupont"
\`\`\`

**Computed en écrit :**

\`\`\`javascript
const liste = ref([3, 1, 4, 1, 5])
const listeTriee = computed({
  get: () => [...liste.value].sort((a, b) => a - b),
  set: (nouvelleValeur) => { liste.value = nouvelleValeur }
})
\`\`\`

---

## 3. watch() et watchEffect()

Vue.js 3 offre deux fonctions d'observation pour réagir aux changements de données réactives :

\`\`\`javascript
import { ref, watch, watchEffect } from 'vue'

const recherche = ref('')

// watch : observe une source spécifique
watch(recherche, (nouvelleValeur, ancienneValeur) => {
  console.log(\`Recherche : "\${ancienneValeur}" -> "\${nouvelleValeur}"\`)
})

// watch : observer un tableau de sources
watch([prenom, nom], ([nouveauPrenom, nouveauNom]) => {
  document.title = \`\${nouveauPrenom} \${nouveauNom}\`
})

// watchEffect : se ré-exécute automatiquement quand ses dépendances changent
watchEffect(() => {
  console.log(\`Recherche en cours : \${recherche.value}\`)
})
\`\`\`

**Options importantes de \`watch\` :**

\`\`\`javascript
watch(recherche, callback, {
  immediate: true,  // exécuter immédiatement
  deep: true        // observer les changements imbriqués
})
\`\`\`

---

## 4. Lifecycle Hooks

Les hooks de cycle de vie dans le Composition API s'utilisent avec des fonctions préfixées par \`on\` :

\`\`\`javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// <script setup>
onMounted(() => {
  console.log('Composant monté dans le DOM')
})

onUpdated(() => {
  console.log('Composant mis à jour')
})

onUnmounted(() => {
  console.log('Composant démonté')
})
\`\`\`

---

## 5. Composables

Les composables sont des fonctions réutilisables qui encapsulent de la logique réactive. C'est le principal avantage de la Composition API :

\`\`\`javascript
import { ref, onMounted, onUnmounted } from 'vue'

export function useHorloge() {
  const heure = ref(new Date().toLocaleTimeString())

  let interval
  onMounted(() => {
    interval = setInterval(() => {
      heure.value = new Date().toLocaleTimeString()
    }, 1000)
  })

  onUnmounted(() => clearInterval(interval))

  return { heure }
}
\`\`\`

Utilisation dans un composant :

\`\`\`html
<script setup>
import { useHorloge } from './composables/useHorloge'
const { heure } = useHorloge()
</script>

<template>
  <p>Il est {{ heure }}</p>
</template>
\`\`\`

---

## Résumé

- \`ref()\` pour les primitives, \`reactive()\` pour les objets
- \`computed()\` pour les valeurs dérivées mémoïsées
- \`watch()\` pour observer des changements spécifiques
- \`watchEffect()\` pour des effets basés sur les dépendances
- Les composables permettent de réutiliser la logique réactive`,
      exercise: {
        title: 'Quiz — Composition API',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quelle est la principale différence entre ref() et reactive() ?",
            explanation: "ref() fonctionne avec n'importe quel type de valeur (primitives, objets) et utilise .value pour l'accès. reactive() ne fonctionne qu'avec les objets et tableaux mais n'a pas besoin de .value.",
            points: 2,
            options: [
              { label: "ref() marche avec tous types, reactive() uniquement avec les objets", isCorrect: true, order: 0 },
              { label: "ref() est plus performant que reactive()", isCorrect: false, order: 1 },
              { label: "reactive() est obsolète en Vue 3", isCorrect: false, order: 2 },
              { label: "Il n'y a aucune différence", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Dans quel cas utilisation-t-on computed() plutôt qu'une méthode simple ?",
            explanation: "computed() mémoïse le résultat et ne recalcule que quand ses dépendances changent. Une méthode est rappelée à chaque rendu, ce qui est moins efficace pour des calculs coûteux.",
            points: 2,
            options: [
              { label: "Quand on a besoin d'une valeur dérivée mémoïsée", isCorrect: true, order: 0 },
              { label: "Quand on veut appeler une fonction au clic", isCorrect: false, order: 1 },
              { label: "Quand on veut remplacer data()", isCorrect: false, order: 2 },
              { label: "Quand on a besoin d'un timer", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle est la différence entre watch() et watchEffect() ?",
            explanation: "watch() observe explicitement une source et fournit les anciennes et nouvelles valeurs. watchEffect() se ré-exécute automatiquement quand n'importe laquelle de ses dépendances réactives change.",
            points: 2,
            options: [
              { label: "watch() observe des sources spécifiques, watchEffect() détecte ses dépendances auto", isCorrect: true, order: 0 },
              { label: "watchEffect() est plus rapide que watch()", isCorrect: false, order: 1 },
              { label: "watch() ne fonctionne qu'avec des refs, watchEffect() avec reactive()", isCorrect: false, order: 2 },
              { label: "Ce sont deux noms pour la même fonction", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel hook de cycle de vie remplace componentDidMount dans le Composition API ?",
            explanation: "onMounted() est appelé une fois que le composant est inséré dans le DOM. C'est l'équivalent exact de componentDidMount.",
            points: 1,
            options: [
              { label: "onMounted()", isCorrect: true, order: 0 },
              { label: "onBeforeMount()", isCorrect: false, order: 1 },
              { label: "onCreated()", isCorrect: false, order: 2 },
              { label: "onReady()", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Qu'est-ce qu'un composable en Vue.js ?",
            explanation: "Un composable est une fonction réutilisable qui utilise la Composition API pour encapsuler de la logique réactive. Il se reconnaît par le préfixe 'use' (useFetch, useAuth, etc.).",
            points: 1,
            options: [
              { label: "Une fonction réutilisable qui encapsule de la logique réactive", isCorrect: true, order: 0 },
              { label: "Un composant spécial sans template", isCorrect: false, order: 1 },
              { label: "Un plugin pour étendre les fonctionnalités de Vue", isCorrect: false, order: 2 },
              { label: "Un type de directive personnalisée", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Directives et Événements',
      durationMin: 40,
      contentMarkdown: `# Directives et Événements

## Introduction

Les directives sont des attributs spéciaux préfixés par \`v-\` qui appliquent un comportement réactif au DOM. Elles constituent le système de liaison (data binding) de Vue.js et permettent de contrôler l'affichage, la structure et les interactions de vos composants.

---

## 1. v-if / v-else / v-else-if

Ces directives permettent un rendu conditionnel. Les éléments sont physiquement ajoutés ou retirés du DOM :

\`\`\`html
<template>
  <div>
    <p v-if="score >= 90">Excellent !</p>
    <p v-else-if="score >= 70">Bien joué</p>
    <p v-else-if="score >= 50">Passable</p>
    <p v-else>Échoué</p>

    <!-- v-if sur un <template> pour ne pas ajouter de noeud supplémentaire -->
    <template v-if="estConnecte">
      <h2>Bienvenue</h2>
      <p>Vous êtes connecté</p>
    </template>
    <p v-else>Connectez-vous pour continuer</p>
  </div>
</template>
\`\`\`

**v-show** est une alternative pour les affichages fréquents : il utilise \`display: none\` CSS au lieu de retirer l'élément du DOM.

---

## 2. v-for

La directive \`v-for\` permet de渲染 une liste d'éléments. On doit toujours fournir une \`key\` unique :

\`\`\`html
<template>
  <!-- Sur un tableau -->
  <ul>
    <li v-for="(fruit, index) in fruits" :key="fruit.id">
      {{ index + 1 }}. {{ fruit.nom }}
    </li>
  </ul>

  <!-- Sur un objet -->
  <div v-for="(valeur, cle) in utilisateur" :key="cle">
    {{ cle }} : {{ valeur }}
  </div>

  <!-- Plage numérique -->
  <span v-for="n in 5" :key="n">{{ n }} </span>
</template>
\`\`\`

\`\`\`javascript
import { ref } from 'vue'

const fruits = ref([
  { id: 1, nom: 'Pomme' },
  { id: 2, nom: 'Banane' },
  { id: 3, nom: 'Cerise' }
])

const utilisateur = ref({ nom: 'Alice', age: 25, ville: 'Paris' })
\`\`\`

---

## 3. v-bind

\`v-bind\` lie dynamiquement des attributs HTML, des props et des propriétés DOM. Le raccourci est le caractère \`:\` :

\`\`\`html
<template>
  <img v-bind:src="imageSrc" v-bind:alt="imageAlt" />

  <!-- Raccourci avec : -->
  <a :href="lien" :class="{ actif: estActif }">
    Lien dynamique
  </a>

  <!-- Liaison dynamique d'objets -->
  <div :style="{ color: couleur, fontSize: taille + 'px' }">
    Texte stylé dynamiquement
  </div>

  <!-- Liaison de classes -->
  <div :class="[estImportant ? 'important' : '', 'container']">
    Contenu
  </div>
</template>
\`\`\`

---

## 4. v-model

\`v-model\` crée un lien bidirectionnel entre un champ de formulaire et une donnée réactive. C'est un raccourci pour \`v-bind:value\` + \`v-on:input\` :

\`\`\`html
<template>
  <form @submit.prevent="soumettre">
    <!-- Texte -->
    <input v-model="nom" type="text" placeholder="Votre nom" />

    <!-- Multiligne -->
    <textarea v-model="message" placeholder="Votre message"></textarea>

    <!-- Checkbox -->
    <input type="checkbox" v-model="accord" id="accord" />
    <label for="accord">J'accepte les conditions</label>

    <!-- Radio -->
    <input type="radio" v-model="couleur" value="rouge" /> Rouge
    <input type="radio" v-model="couleur" value="bleu" /> Bleu
    <input type="radio" v-model="couleur" value="vert" /> Vert

    <!-- Select -->
    <select v-model="pays">
      <option value="">Choisir un pays</option>
      <option value="fr">France</option>
      <option value="be">Belgique</option>
      <option value="ch">Suisse</option>
    </select>

    <p>Nom : {{ nom }}, Couleur : {{ couleur }}, Pays : {{ pays }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const nom = ref('')
const message = ref('')
const accord = ref(false)
const couleur = ref('rouge')
const pays = ref('')

function soumettre() {
  console.log('Soumission', { nom: nom.value, message: message.value })
}
</script>
\`\`\`

---

## 5. Gestion des Événements avec v-on

La directive \`v-on\` écoute les événements DOM. Le raccourci est \`@\` :

\`\`\`html
<template>
  <div>
    <!-- Clic simple -->
    <button @click="compteur++">+1</button>
    <button @click="incrementer">+1</button>
    <p>Compteur : {{ compteur }}</p>

    <!-- Avec paramètres -->
    <button @click="ajouter(5)">Ajouter 5</button>

    <!-- Événements DOM -->
    <input @keyup.enter="soumettre" placeholder="Tapez et appuyez sur Entrée" />

    <!-- Modificateurs d'événements -->
    <form @submit.prevent="onSubmit">
      <button type="submit">Envoyer</button>
    </form>

    <!-- Click avec arrêt de propagation -->
    <div @click="clickParent">
      <button @click.stop="clickEnfant">Stop propagation</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const compteur = ref(0)

function incrementer() {
  compteur.value++
}

function ajouter(valeur) {
  compteur.value += valeur
}

function soumettre() {
  console.log('Entrée pressée')
}

function onSubmit() {
  console.log('Formulaire soumis')
}

function clickParent() { console.log('Parent') }
function clickEnfant() { console.log('Enfant') }
</script>
\`\`\`

**Modificateurs courants :** \`@click.stop\`, \`@submit.prevent\`, \`@keyup.enter\`, \`@click.once\`, \`@self\`.

---

## Résumé

- \`v-if\` / \`v-else\` : rendu conditionnel (ajout/retrait du DOM)
- \`v-for\` : rendu de liste avec \`key\` obligatoire
- \`v-bind\` (\`:\`) : liaison dynamique d'attributs
- \`v-model\` : liaison bidirectionnelle des formulaires
- \`v-on\` (\`@\`) : gestion des événements avec modificateurs`,
      exercise: {
        title: 'Quiz — Directives et Événements',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "Quelle est la différence principale entre v-if et v-show ?",
            explanation: "v-if ajoute ou retire physiquement l'élément du DOM. v-show garde l'élément dans le DOM mais bascule sa propriété CSS display. v-show est plus efficace pour des toggles fréquents.",
            points: 2,
            options: [
              { label: "v-if ajoute/retire du DOM, v-show utilise display: none", isCorrect: true, order: 0 },
              { label: "v-if est plus rapide que v-show", isCorrect: false, order: 1 },
              { label: "v-show ne fonctionne qu'avec les chaînes", isCorrect: false, order: 2 },
              { label: "Il n'y a aucune différence", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Pourquoi doit-on toujours fournir une key avec v-for ?",
            explanation: "La key aide Vue à identifier quels éléments ont changé, été ajoutés ou supprimés. Sans key, Vue utilise l'index par défaut, ce qui peut causer des bugs de rendu avec des listes dynamiques.",
            points: 2,
            options: [
              { label: "Pour identifier efficacement chaque élément dans le DOM virtuel", isCorrect: true, order: 0 },
              { label: "C'est une convention obligatoire sans impact réel", isCorrect: false, order: 1 },
              { label: "Pour améliorer les performances du template", isCorrect: false, order: 2 },
              { label: "Seulement si on utilise TypeScript", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est le raccourci de v-on:click ?",
            explanation: "Le caractère @ est le raccourci officiel de v-on. @click est équivalent à v-on:click et rend le template plus lisible.",
            points: 1,
            options: [
              { label: "@click", isCorrect: true, order: 0 },
              { label: "#click", isCorrect: false, order: 1 },
              { label: ".click", isCorrect: false, order: 2 },
              { label: "$click", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel modificateur empêche le rechargement de page dans un formulaire ?",
            explanation: "Le modificateur .prevent appelle preventDefault() sur l'événement, ce qui empêche le comportement par défaut du formulaire (rechargement de page).",
            points: 2,
            options: [
              { label: "@submit.prevent", isCorrect: true, order: 0 },
              { label: "@submit.stop", isCorrect: false, order: 1 },
              { label: "@submit.self", isCorrect: false, order: 2 },
              { label: "@submit.once", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment fonctionne v-model sur un champ input texte ?",
            explanation: "v-model est un sucre syntaxique qui combine v-bind:value (liaison de la valeur vers le DOM) et v-on:input (écoute des modifications pour mettre à jour la donnée réactive).",
            points: 1,
            options: [
              { label: "C'est un raccourci pour v-bind:value et v-on:input", isCorrect: true, order: 0 },
              { label: "C'est une directive unique qui utilise MutationObserver", isCorrect: false, order: 1 },
              { label: "C'est un raccourci pour v-bind:href et v-on:change", isCorrect: false, order: 2 },
              { label: "C'est un composant interne de Vue", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
    {
      title: 'Formulaires et Validation',
      durationMin: 35,
      contentMarkdown: `# Formulaires et Validation

## Introduction

Les formulaires sont au cœur de la plupart des applications web. Vue.js simplifie considérablement la gestion des formulaires grâce à \`v-model\` et ses modificateurs, ainsi qu'à la possibilité de créer des composants de formulaire réutilisables avec une validation intégrée.

---

## 1. v-model et ses Modificateurs

\`v-model\` propose plusieurs modificateurs pour adapter son comportement selon le type de champ :

\`\`\`html
<template>
  <form @submit.prevent="soumettre">
    <!-- .lazy : synchronise sur l'événement change au lieu de input -->
    <input v-model.lazy="recherche" placeholder="Recherche (mis à jour à la perte de focus)" />

    <!-- .number : convertit automatiquement en nombre -->
    <input v-model.number="age" type="number" placeholder="Votre âge" />

    <!-- .trim : supprime les espaces en début et fin -->
    <input v-model.trim="nom" type="text" placeholder="Votre nom (trim automatique)" />

    <!-- .capitalize (Vue 3.4+) : met la première lettre en majuscule -->
    <input v-model.capitalize="prenom" type="text" placeholder="Prénom" />

    <p>Nom: "{{ nom }}" | Âge: {{ age }} ({{ typeof age }}) | Recherche: "{{ recherche }}"</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const nom = ref('')
const prenom = ref('')
const age = ref(0)
const recherche = ref('')

function soumettre() {
  console.log('Données', { nom: nom.value, age: age.value })
}
</script>
\`\`\`

---

## 2. Validation Basique dans le Template

On peut valider les champs directement dans le template avec des directives conditionnelles :

\`\`\`html
<template>
  <form @submit.prevent="soumettre">
    <div>
      <label>Email</label>
      <input v-model="email" type="email" />
      <span v-if="email && !estEmailValide" class="erreur">
        Adresse email invalide
      </span>
    </div>

    <div>
      <label>Mot de passe (min. 8 caractères)</label>
      <input v-model="motDePasse" type="password" />
      <span v-if="motDePasse && motDePasse.length < 8" class="erreur">
        Le mot de passe doit contenir au moins 8 caractères
      </span>
    </div>

    <div>
      <label>Confirmer le mot de passe</label>
      <input v-model="confirmation" type="password" />
      <span v-if="confirmation && confirmation !== motDePasse" class="erreur">
        Les mots de passe ne correspondent pas
      </span>
    </div>

    <button type="submit" :disabled="!estValide">S'inscrire</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const motDePasse = ref('')
const confirmation = ref('')

const estEmailValide = computed(() => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value))

const estValide = computed(() =>
  estEmailValide.value &&
  motDePasse.value.length >= 8 &&
  motDePasse.value === confirmation.value
)

function soumettre() {
  if (estValide.value) {
    console.log('Inscription avec', { email: email.value })
  }
}
</script>
\`\`\`

---

## 3. Composants de Formulaire Réutilisables

La puissance de Vue.js réside dans la capacité de créer des composants de formulaire encapsulés. \`v-model\` fonctionne sur les composants personnalisés via la prop \`modelValue\` et l'événement \`update:modelValue\` :

\`\`\`html
<!-- ChampTexte.vue -->
<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  type: { type: String, default: 'text' },
  erreur: String,
  requis: Boolean
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="champ">
    <label>{{ label }} <span v-if="requis">*</span></label>
    <input
      :type="type"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      :class="{ 'champ-erreur': erreur }"
    />
    <span v-if="erreur" class="erreur">{{ erreur }}</span>
  </div>
</template>
\`\`\`

Utilisation dans un formulaire parent :

\`\`\`html
<template>
  <form @submit.prevent="soumettre">
    <ChampTexte v-model="nom" label="Nom" :requis="true" :erreur="erreurs.nom" />
    <ChampTexte v-model="email" label="Email" type="email" :requis="true" :erreur="erreurs.email" />
    <ChampTexte v-model="mdp" label="Mot de passe" type="password" :requis="true" :erreur="erreurs.mdp" />
    <button type="submit">Envoyer</button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ChampTexte from './ChampTexte.vue'

const nom = ref('')
const email = ref('')
const mdp = ref('')
const erreurs = reactive({ nom: '', email: '', mdp: '' })

function valider() {
  let valide = true
  erreurs.nom = nom.value ? '' : 'Le nom est requis'
  erreurs.email = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value) ? '' : 'Email invalide'
  erreurs.mdp = mdp.value.length >= 8 ? '' : 'Minimum 8 caractères'
  return !erreurs.nom && !erreurs.email && !erreurs.mdp
}

function soumettre() {
  if (valider()) {
    console.log('Formulaire valide')
  }
}
</script>
\`\`\`

---

## 4. Validation Structurée avec une Fonction dédiée

Pour les formulaires complexes, on crée une fonction de validation centralisée :

\`\`\`javascript
import { ref, reactive, computed } from 'vue'

const formulaire = reactive({
  nom: '',
  email: '',
  age: null,
  message: ''
})

const erreurs = reactive({
  nom: '',
  email: '',
  age: '',
  message: ''
})

const regles = {
  nom: { requis: true, minLength: 2 },
  email: { requis: true, pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ },
  age: { requis: true, min: 18, max: 120 },
  message: { requis: true, minLength: 10 }
}

function validerChamp(cle) {
  const valeur = formulaire[cle]
  const regle = regles[cle]
  let erreur = ''

  if (regle.requis && !valeur) {
    erreur = 'Ce champ est requis'
  } else if (regle.minLength && valeur.length < regle.minLength) {
    erreur = \`Minimum \${regle.minLength} caractères\`
  } else if (regle.pattern && !regle.pattern.test(valeur)) {
    erreur = 'Format invalide'
  } else if (regle.min && valeur < regle.min) {
    erreur = \`Minimum \${regle.min}\`
  }

  erreurs[cle] = erreur
  return !erreur
}

function validerTout() {
  return Object.keys(regles).every(validerChamp)
}
\`\`\`

---

## 5. Gestion de la Soumission et du Feedback

Un bon formulaire fournit un feedback clair à l'utilisateur :

\`\`\`html
<template>
  <div>
    <div v-if="soumissionReussie" class="succes">
      Le formulaire a été soumis avec succès !
    </div>
    <form v-else @submit.prevent="soumettre">
      <!-- champs ici -->
      <button type="submit" :disabled="estEnCours">
        {{ estEnCours ? 'Envoi...' : 'Envoyer' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const estEnCours = ref(false)
const soumissionReussie = ref(false)

async function soumettre() {
  estEnCours.value = true
  try {
    // simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1500))
    soumissionReussie.value = true
  } finally {
    estEnCours.value = false
  }
}
</script>
\`\`\`

---

## Résumé

- Les modificateurs \`.lazy\`, \`.number\`, \`.trim\` adaptent le comportement de \`v-model\`
- La validation peut se faire dans le template avec des computed ou dans une fonction dédiée
- \`v-model\` sur les composants utilise \`modelValue\` + \`update:modelValue\`
- Toujours désactiver le bouton de soumission pendant le traitement
- Fournir un feedback visuel clair (erreurs, succès, chargement)`,
      exercise: {
        title: 'Quiz — Formulaires et Validation',
        passingScorePercent: 70,
        questions: [
          {
            prompt: "À quel événement v-model est-il synchronisé avec le modificateur .lazy ?",
            explanation: "Par défaut, v-model se synchronise sur l'événement 'input' (à chaque frappe). Le modificateur .lazy le fait se synchroniser sur l'événement 'change' (perte de focus ou validation).",
            points: 2,
            options: [
              { label: "change (perte de focus)", isCorrect: true, order: 0 },
              { label: "input (chaque frappe)", isCorrect: false, order: 1 },
              { label: "submit (soumission du formulaire)", isCorrect: false, order: 2 },
              { label: "blur (perte du focus)", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel modificateur v-model convertit la saisie en type number ?",
            explanation: "Le modificateur .number analyse la valeur saisie et la convertit en nombre JavaScript. Si la valeur n'est pas un nombre valide, elle reste une chaîne.",
            points: 1,
            options: [
              { label: ".number", isCorrect: true, order: 0 },
              { label: ".numeric", isCorrect: false, order: 1 },
              { label: ".int", isCorrect: false, order: 2 },
              { label: ".parse", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Comment fonctionne v-model sur un composant personnalisé ?",
            explanation: "Vue.js utilise modelValue comme prop et update:modelValue comme événement émis pour la liaison bidirectionnelle sur les composants personnalisés.",
            points: 2,
            options: [
              { label: "Il utilise la prop modelValue et l'événement update:modelValue", isCorrect: true, order: 0 },
              { label: "Il crée automatiquement un bridge DOM entre les deux", isCorrect: false, order: 1 },
              { label: "Il ne fonctionne pas sur les composants personnalisés", isCorrect: false, order: 2 },
              { label: "Il utilise modelData et change", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quelle est la bonne pratique pour le bouton de soumission pendant un appel API ?",
            explanation: "Désactiver le bouton pendant le traitement empêche les doubles soumissions accidentelles. Le texte du bouton doit aussi changer pour indiquer l'état de chargement.",
            points: 1,
            options: [
              { label: "Le désactiver et changer son texte en 'Envoi...'", isCorrect: true, order: 0 },
              { label: "Le cacher complètement pendant le chargement", isCorrect: false, order: 1 },
              { label: "Ne rien changer, gérer le double-côté côté serveur", isCorrect: false, order: 2 },
              { label: "Ajouter un timeout pour empêcher les clics rapides", isCorrect: false, order: 3 },
            ],
          },
          {
            prompt: "Quel est l'avantage de centraliser la validation dans une fonction plutôt que dans le template ?",
            explanation: "Une fonction de validation centralisée est plus maintenable, testable, et réutilisable. Elle permet d'ajouter des règles complexes sans surcharger le template.",
            points: 2,
            options: [
              { label: "Meilleure maintenabilité et réutilisabilité des règles de validation", isCorrect: true, order: 0 },
              { label: "Les validations dans le template ne fonctionnent pas", isCorrect: false, order: 1 },
              { label: "C'est plus rapide en termes de performance", isCorrect: false, order: 2 },
              { label: "C'est obligatoire quand on utilise TypeScript", isCorrect: false, order: 3 },
            ],
          },
        ],
      },
    },
  ],
  project: {
    title: 'Gestionnaire de Tâches — Todo App',
    instructions: `# Gestionnaire de Tâches — Todo App

## Objectif

Créer une application complète de gestion de tâches (Todo App) en Vue.js 3 utilisant le Composition API, le stockage local (localStorage) et un thème sombre/clair.

---

## Consignes

### 1. Fonctionnalités principales (CRUD)

- **Ajouter** une tâche avec un titre (obligatoire, min. 2 caractères)
- **Afficher** la liste de toutes les tâches
- **Modifier** le titre d'une tâche en double-cliquant dessus (édition inline)
- **Supprimer** une tâche avec confirmation
- **Marquer** une tâche comme terminée (cocher/décocher)
- **Filtrer** les tâches par statut : Toutes, En cours, Terminées

### 2. Système de Catégories

- Chaque tâche peut avoir une **catégorie** : Travail, Personnel, Études, Loisirs
- Filtrer les tâches par catégorie
- Afficher un compteur de tâches par catégorie
- Les catégories doivent avoir des couleurs distinctes

### 3. Persistance des Données (localStorage)

- Sauvegarder automatiquement les tâches dans le \`localStorage\`
- Charger les tâches au démarrage de l'application
- Créer un composable \`useLocalStorage\` réutilisable

### 4. Thème Sombre / Clair

- Un bouton toggle pour basculer entre thème clair et sombre
- Utiliser le composable \`useTheme\` gérant un \`provide/inject\` ou un store
- Préférer la préférence système par défaut (\`prefers-color-scheme\`)
- Appliquer le thème à toute l'application via des variables CSS

### 5. Composants à créer

- **App.vue** : layout principal avec header et footer
- **TodoForm.vue** : formulaire d'ajout de tâche
- **TodoList.vue** : conteneur de la liste
- **TodoItem.vue** : un élément de la liste (édition, suppression, toggle)
- **TodoFilter.vue** : barre de filtrage (statut + catégorie)
- **ThemeToggle.vue** : bouton de bascule thème

### 6. Composables à créer

- \`useLocalStorage(key, valeurInitiale)\` : synchronise une ref avec le localStorage
- \`useTheme()\` : gère le thème clair/sombre avec persistance

---

## Contraintes techniques

- Vue.js 3 avec \`<script setup>\`
- Composition API uniquement (pas d'Options API)
- TypeScript obligatoire
- Pas de bibliothèque externe de state management (pas de Pinia/Vuex)
- CSS custom (variables CSS pour le thème)
- Les tâches doivent être générées avec des IDs uniques (\`crypto.randomUUID()\` ou similaire)

---

## Rendu

Déposer le code source sur GitHub et soumettre le lien du repository.`,
    evaluationCriteria: [
      'Fonctionnalités CRUD complètes (ajouter, modifier, supprimer, marquer terminé)',
      'Système de catégories fonctionnel avec filtrage et compteurs',
      'Persistance localStorage via composable personnalisé',
      'Thème sombre/clair avec préférence système détectée',
      'Architecture (composables réutilisables, découpage en composants, TypeScript)',
    ],
  },
};
