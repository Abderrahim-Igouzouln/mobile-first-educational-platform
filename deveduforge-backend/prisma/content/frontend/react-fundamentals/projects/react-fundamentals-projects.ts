const project = {
  "title": "Tableau de Bord Interactif — React Dashboard",
  "instructions": "# Tableau de Bord Interactif — React Dashboard\n\n## Objectif\n\nCréer une application React de tableau de bord (dashboard) qui affiche des statistiques et une liste d'utilisateurs.\n\n## Consignes\n\n### 1. Composants obligatoires\n\n- **Sidebar** : navigation latérale avec des liens (Accueil, Utilisateurs, Statistiques, Paramètres). Doit être repliable.\n- **Header** : barre supérieure avec le titre de la page active et une horloge live (qui affiche l'heure actuelle et se met à jour chaque seconde).\n- **Dashboard** : page principale avec 4 cartes statistiques (Utilisateurs actifs, Revenus, Tâches complétées, Nouveaux inscrits). Les valeurs peuvent être statiques ou simulées.\n- **Widget** : composant réutilisable pour afficher une métrique. Il prend en props : `title`, `value`, `icon`, `color`.\n- **UserList** : liste d'utilisateurs récupérée depuis une API simulée (fichier JSON local ou via `fetch` vers `https://jsonplaceholder.typicode.com/users`). Afficher le nom, email, ville.\n\n### 2. Hooks React\n\n- **useState** : pour l'état local (liste d'utilisateurs, theme, sidebar ouverte/fermée)\n- **useEffect** : pour charger les utilisateurs au montage + mettre à jour l'horloge\n- **useContext** : pour le thème (clair/sombre)\n\n### 3. Fonctionnalités bonus (optionnelles)\n\n- Bouton de bascule thème clair/sombre (via Context)\n- Animation de transition sur la sidebar\n- Barre de recherche pour filtrer les utilisateurs\n- Responsive design de base\n\n## Contraintes techniques\n\n- Utiliser Create React App ou Vite\n- TypeScript obligatoire\n- Composants fonctionnels uniquement (pas de classes)\n- CSS Modules ou Tailwind CSS au choix\n\n## Rendu\n\nDéposer le code source sur GitHub et soumettre le lien du repository.",
  "evaluationCriteria": [
    "Fonctionnalités (tous les composants requis sont présents et fonctionnels)",
    "Gestion d'état (useState, useEffect, useContext utilisés correctement)",
    "Architecture (découpage en composants, props typées, structure du projet)",
    "Qualité du code (nommage, lisibilité, bonnes pratiques React)",
    "UI/UX (thème clair/sombre, responsive de base, propreté visuelle)"
  ]
};

export default project;
