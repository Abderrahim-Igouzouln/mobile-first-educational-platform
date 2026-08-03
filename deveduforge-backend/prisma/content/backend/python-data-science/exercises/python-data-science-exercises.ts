const exercises = [
  {
    "title": "Quiz - Manipulation de Donnees avec Pandas",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la difference entre .loc et .iloc dans Pandas ?",
        "explanation": ".loc selectonne par label (nom de ligne/colonne), tandis que .iloc selectonne par position entiere (index numerique). .loc est inclusif de la borne finale, .iloc est exclusif comme les slices Python.",
        "points": 2,
        "options": [
          { "label": ".loc = par label, .iloc = par position entiere", "isCorrect": true, "order": 0 },
          { "label": ".loc = rapide, .iloc = lent", "isCorrect": false, "order": 1 },
          { "label": ".loc = pour les Series, .iloc = pour les DataFrame", "isCorrect": false, "order": 2 },
          { "label": "Les deux sont identiques", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que retourne la methode .groupby().agg() sur un DataFrame ?",
        "explanation": "groupby() regroupe les lignes par valeurs d'une colonne, puis agg() applique des fonctions d'agregation (sum, mean, count...) a chaque groupe. Le resultat est un DataFrame avec les groupes comme index.",
        "points": 2,
        "options": [
          { "label": "Un DataFrame avec les resultats d'agregation par groupe", "isCorrect": true, "order": 0 },
          { "label": "Un dictionnaire avec les groupes comme cles", "isCorrect": false, "order": 1 },
          { "label": "Une liste de DataFrames separes", "isCorrect": false, "order": 2 },
          { "label": "Un tableau NumPy", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment fusionner deux DataFrames sur une colonne commune ?",
        "explanation": "La fonction pd.merge() permet de joindre deux DataFrames. Le parametre 'on' specifie la colonne de jointure, et 'how' definit le type de jointure (inner, left, right, outer).",
        "points": 2,
        "options": [
          { "label": "pd.merge(df1, df2, on='colonne_commune', how='inner')", "isCorrect": true, "order": 0 },
          { "label": "df1.join(df2) sans parametre", "isCorrect": false, "order": 1 },
          { "label": "pd.concat(df1, df2, merge=True)", "isCorrect": false, "order": 2 },
          { "label": "df1.concat(df2, on='colonne')", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que fait la methode .fillna() sur un DataFrame contenant des NaN ?",
        "explanation": "fillna() remplace les valeurs manquantes (NaN) par la valeur specifiee. On peut passer un dictionnaire pour remplacer differemment selon la colonne, ou une valeur unique pour toutes les colonnes.",
        "points": 1,
        "options": [
          { "label": "Remplace les NaN par la valeur specifiee", "isCorrect": true, "order": 0 },
          { "label": "Supprime les lignes contenant des NaN", "isCorrect": false, "order": 1 },
          { "label": "Convertit les NaN en chaines vides", "isCorrect": false, "order": 2 },
          { "label": "Compte le nombre de NaN", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel parametre de pd.read_csv() permet de ne charger que certaines colonnes ?",
        "explanation": "Le parametre usecols accepte une liste de noms de colonnes a charger. Cela reduit la memoire utilisee et accelere le chargement quand on n'a besoin que de quelques colonnes.",
        "points": 1,
        "options": [
          { "label": "usecols=['col1', 'col2']", "isCorrect": true, "order": 0 },
          { "label": "columns=['col1', 'col2']", "isCorrect": false, "order": 1 },
          { "label": "select=['col1', 'col2']", "isCorrect": false, "order": 2 },
          { "label": "include=['col1', 'col2']", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Calcul Scientifique avec NumPy",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Pourquoi les operations NumPy sont-elles plus rapides que les boucles Python classiques ?",
        "explanation": "NumPy effectue des operations vectorisees en C sous-jacent, evitant l'interpreteur Python pour chaque element. Le code est execute en bloc sur tout le tableau, ce qui est considerablement plus rapide qu'une boucle Python element par element.",
        "points": 2,
        "options": [
          { "label": "Les operations sont vectorisees et executees en C sous-jacent", "isCorrect": true, "order": 0 },
          { "label": "NumPy utilise le GPU par defaut", "isCorrect": false, "order": 1 },
          { "label": "Python est naturellement lent", "isCorrect": false, "order": 2 },
          { "label": "NumPy compile le Python en code machine", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quelle est la difference entre np.dot(A, B) et A * B pour deux matrices ?",
        "explanation": "np.dot() (ou A @ B) effectue le produit matriciel (algebre lineaire), tandis que A * B effectue la multiplication element par element (broadcasting). Les resultats sont differents pour des matrices.",
        "points": 2,
        "options": [
          { "label": "np.dot = produit matriciel ; * = multiplication element par element", "isCorrect": true, "order": 0 },
          { "label": "Les deux font exactement la meme chose", "isCorrect": false, "order": 1 },
          { "label": "np.dot est plus rapide que *", "isCorrect": false, "order": 2 },
          { "label": "* est le produit matriciel, np.dot est element par element", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que retourne np.random.seed(42) ?",
        "explanation": "seed() ne retourne rien (None). Son role est de fixer la graine du generateur aleatoire pour garantir la reproductibilite. Les memes nombres aleatoires seront generes a chaque execution avec la meme seed.",
        "points": 2,
        "options": [
          { "label": "Rien — elle fixe la graine pour la reproductibilite", "isCorrect": true, "order": 0 },
          { "label": "Un tableau de 42 nombres aleatoires", "isCorrect": false, "order": 1 },
          { "label": "Le chiffre 42", "isCorrect": false, "order": 2 },
          { "label": "Un generateur aleatoire configure", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment creer une matrice identite 3x3 avec NumPy ?",
        "explanation": "np.eye(3) cree une matrice carree 3x3 avec des 1 sur la diagonale et des 0 partout ailleurs. C'est la matrice identite en algebre lineaire.",
        "points": 1,
        "options": [
          { "label": "np.eye(3)", "isCorrect": true, "order": 0 },
          { "label": "np.ones((3, 3))", "isCorrect": false, "order": 1 },
          { "label": "np.identity(3, 3)", "isCorrect": false, "order": 2 },
          { "label": "np.matrix(3)", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que fait np.linspace(0, 1, 5) ?",
        "explanation": "linspace genere 5 valeurs equidistantes entre 0 et 1 (inclus). Contrairement a arange qui specifie le pas, linspace specifie le nombre de points.",
        "points": 1,
        "options": [
          { "label": "Genere [0, 0.25, 0.5, 0.75, 1.0] — 5 valeurs equidistantes", "isCorrect": true, "order": 0 },
          { "label": "Genere [0, 1, 2, 3, 4] — 5 entiers", "isCorrect": false, "order": 1 },
          { "label": "Genere 5 fois la valeur 0", "isCorrect": false, "order": 2 },
          { "label": "Genere un tableau de zeros de taille 5", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Visualisation avec Matplotlib et Seaborn",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Quelle est la difference principale entre Matplotlib et Seaborn ?",
        "explanation": "Matplotlib est la bibliotheque de base, tres flexible mais necessitant plus de code. Seaborn est construit au-dessus de Matplotlib et offre des graphiques statistiques preconfigures avec une esthetique soignee par defaut.",
        "points": 2,
        "options": [
          { "label": "Seaborn est construit sur Matplotlib avec des graphiques statistiques preconfigures", "isCorrect": true, "order": 0 },
          { "label": "Matplotlib est plus recent que Seaborn", "isCorrect": false, "order": 1 },
          { "label": "Seaborn ne peut pas creer de graphiques personnalises", "isCorrect": false, "order": 2 },
          { "label": "Matplotlib ne supporte pas les graphiques en Python", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans plt.subplots(2, 3), combien de graphiques sont crees et comment y accede-t-on ?",
        "explanation": "plt.subplots(2, 3) cree une grille de 2 lignes et 3 colonnes, soit 6 graphiques. On y accede via axes[0, 0] jusqu'a axes[1, 2]. C'est la methode standard pour creer des dashboards multi-graphiques.",
        "points": 2,
        "options": [
          { "label": "6 graphiques, accessibles via axes[ligne, colonne]", "isCorrect": true, "order": 0 },
          { "label": "2 graphiques cotes a cotes", "isCorrect": false, "order": 1 },
          { "label": "3 graphiques empiles verticalement", "isCorrect": false, "order": 2 },
          { "label": "5 graphiques en grille", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel type de graphique est le plus approprie pour visualiser la correlation entre deux variables numeriques ?",
        "explanation": "Un nuage de points (scatter plot) montre la relation entre deux variables numeriques. Chaque point represente une observation avec ses coordonnees (x, y). On peut ajouter une droite de regression pour mieux visualiser la tendance.",
        "points": 1,
        "options": [
          { "label": "Un scatter plot (nuage de points)", "isCorrect": true, "order": 0 },
          { "label": "Un pie chart", "isCorrect": false, "order": 1 },
          { "label": "Un histogramme", "isCorrect": false, "order": 2 },
          { "label": "Un barplot", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que fait la fonction sns.heatmap() sur une matrice de correlation ?",
        "explanation": "heatmap() represente visuellement les valeurs d'une matrice par des couleurs. Pour une matrice de correlation, les couleurs chaudes (proches de 1) indiquent une correlation positive forte, les couleurs froides (proches de -1) une correlation negative.",
        "points": 2,
        "options": [
          { "label": "Represente visuellement les valeurs par des couleurs dans une matrice", "isCorrect": true, "order": 0 },
          { "label": "Cree une carte geographique", "isCorrect": false, "order": 1 },
          { "label": "Calcule automatiquement les correlations", "isCorrect": false, "order": 2 },
          { "label": "Cree un graphique 3D", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Comment sauvegarder un graphique Matplotlib en haute resolution ?",
        "explanation": "plt.savefig('nom.png', dpi=200, bbox_inches='tight') sauvegarde le graphique. dpi=200 donne une resolution de 200 pixels par pouce (haute resolution). bbox_inches='tight' evite de couper les labels.",
        "points": 1,
        "options": [
          { "label": "plt.savefig('graph.png', dpi=200, bbox_inches='tight')", "isCorrect": true, "order": 0 },
          { "label": "plt.export('graph.png')", "isCorrect": false, "order": 1 },
          { "label": "plt.save('graph.png')", "isCorrect": false, "order": 2 },
          { "label": "plt.write('graph.png')", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  },
  {
    "title": "Quiz - Introduction au Machine Learning avec scikit-learn",
    "passingScorePercent": 70,
    "questions": [
      {
        "prompt": "Pourquoi separe-t-on les donnees en train et test avant d'entraîner un modele ?",
        "explanation": "Le split train/test simule des donnees jamais vues. Si on evalue le modele sur les memes donnees d'entrainement, le score sera artificiellement eleve (overfitting). Le test set mesure la capacite de generalisation.",
        "points": 2,
        "options": [
          { "label": "Pour evaluer la capacite de generalisation sur des donnees inedites", "isCorrect": true, "order": 0 },
          { "label": "Pour accelerer l'entrainement du modele", "isCorrect": false, "order": 1 },
          { "label": "C'est obligatoire techniquement", "isCorrect": false, "order": 2 },
          { "label": "Pour reduire la taille du modele", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans la regression lineaire, que represente le score R2 ?",
        "explanation": "R2 mesure la proportion de la variance de la variable cible expliquee par le modele. R2=1.0 signifie que le modele explique 100% de la variance (parfait). R2=0.0 signifie que le modele n'explique rien (aussi bon que la moyenne).",
        "points": 2,
        "options": [
          { "label": "La proportion de la variance expliquee par le modele (1.0 = parfait)", "isCorrect": true, "order": 0 },
          { "label": "Le nombre d'erreurs du modele", "isCorrect": false, "order": 1 },
          { "label": "Le pourcentage de predictions correctes", "isCorrect": false, "order": 2 },
          { "label": "La vitesse d'execution du modele", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Quel est l'interet de la validation croisee (cross_val_score) par rapport a un simple train/test split ?",
        "explanation": "La validation croisee a K plis entraine et evalue le modele K fois sur des splits differents. Cela donne une estimation plus robuste des performances, car le score ne depend pas d'un seul split aleatoire.",
        "points": 2,
        "options": [
          { "label": "Elle entraine le modele sur plusieurs splits pour une evaluation plus fiable", "isCorrect": true, "order": 0 },
          { "label": "Elle est plus rapide qu'un simple split", "isCorrect": false, "order": 1 },
          { "label": "Elle reduit la taille du jeu de donnees", "isCorrect": false, "order": 2 },
          { "label": "Elle remplace le besoin de train_test_split", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Dans un Pipeline scikit-learn, pourquoi standardiser les donnees avant un SVM ?",
        "explanation": "Le SVM calcule les distances entre les points. Si les features ont des echelles tres differentes (ex: age 0-100, salaire 0-100000), la feature avec la plus grande echelle domine le calcul. StandardScaler centre et reduit pour harmoniser les echelles.",
        "points": 1,
        "options": [
          { "label": "Pour harmoniser les echelles des features avant le calcul de distances", "isCorrect": true, "order": 0 },
          { "label": "Pour accelerer le calcul du SVM", "isCorrect": false, "order": 1 },
          { "label": "C'est uniquement esthetique", "isCorrect": false, "order": 2 },
          { "label": "Pour reduire le nombre de features", "isCorrect": false, "order": 3 }
        ]
      },
      {
        "prompt": "Que mesure le F1-score dans un modele de classification ?",
        "explanation": "Le F1-score est la moyenne harmonique de la precision et du recall. Il est utile quand les classes sont desequilibrees, car il punit a la fois les faux positifs (precision) et les faux negatifs (recall).",
        "points": 1,
        "options": [
          { "label": "La moyenne harmonique de la precision et du recall", "isCorrect": true, "order": 0 },
          { "label": "Le pourcentage de predictions correctes", "isCorrect": false, "order": 1 },
          { "label": "Le nombre de vrais positifs", "isCorrect": false, "order": 2 },
          { "label": "La vitesse du modele", "isCorrect": false, "order": 3 }
        ]
      }
    ]
  }
];

export default exercises;
