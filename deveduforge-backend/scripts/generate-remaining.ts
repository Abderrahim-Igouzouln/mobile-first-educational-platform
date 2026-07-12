import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function gen(varName: string, techSlug: string, title: string, desc: string, level: string, minutes: number, lessons: Array<{title: string; dur: number; md: string}>) {
  const lines: string[] = [];
  lines.push(`import { Level } from '@prisma/client';`);
  lines.push(``);
  lines.push(`export const ${varName} = {`);
  lines.push(`  techSlug: "${techSlug}",`);
  lines.push(`  title: "${title}",`);
  lines.push(`  description: "${desc}",`);
  lines.push(`  level: ${level},`);
  lines.push(`  durationMin: ${minutes},`);
  lines.push(`  lessons: [`);

  for (const l of lessons) {
    lines.push(`    {`);
    lines.push(`      "title": "${l.title}",`);
    lines.push(`      "durationMin": ${l.dur},`);
    lines.push(`      "contentMarkdown": ${JSON.stringify(l.md)},`);
    lines.push(`    },`);
  }

  lines.push(`  ],`);
  lines.push(`};`);
  return lines.join('\n');
}

const base = resolve('prisma/content');

// ============ python-data-science ============
writeFileSync(resolve(base, 'backend/python-data-science/courses/python-data-science-courses.ts'), gen(
  'pythonDataScience', 'python',
  'Python Data Science',
  'Analyse de donnees, visualisation et machine learning avec Python, Pandas, NumPy, Matplotlib et Scikit-learn.',
  'Level.intermediate', 240,
  [
    {
      title: 'Introduction a Pandas et NumPy',
      dur: 60,
      md: `# Introduction a Pandas et NumPy

## Introduction

Pandas et NumPy sont les piliers de la data science en Python. NumPy fournit des tableaux multidimensionnels performants, tandis que Pandas offre des structures de donnees flexibles pour l'analyse de donnees.

---

## 1. Les tableaux NumPy

\`\`\`python
import numpy as np

# Creation de tableaux
arr = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 4))
ones = np.ones((2, 3))
identity = np.eye(4)
random_arr = np.random.randn(100)

# Operations vectorisees
arr * 2
arr + 10
np.sqrt(arr)
np.mean(arr), np.std(arr)
\`\`\`

---

## 2. Series et DataFrames Pandas

\`\`\`python
import pandas as pd

# Series
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])

# DataFrame
df = pd.DataFrame({
    'nom': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'salaire': [50000, 60000, 70000]
})

# Exploration
df.head()
df.info()
df.describe()
df['age'].mean()
\`\`\`

---

## 3. Lecture et Ecriture de Fichiers

\`\`\`python
# CSV
df = pd.read_csv('donnees.csv')
df.to_csv('export.csv', index=False)

# Excel
df = pd.read_excel('donnees.xlsx', sheet_name='Sheet1')

# JSON
df = pd.read_json('donnees.json')

# SQL
from sqlalchemy import create_engine
engine = create_engine('sqlite:///base.db')
df = pd.read_sql('SELECT * FROM table', engine)
\`\`\`

---

## 4. Nettoyage de Donnees

\`\`\`python
# Valeurs manquantes
df.isnull().sum()
df.dropna()
df.fillna(df.mean())

# Doublons
df.duplicated().sum()
df.drop_duplicates()

# Types
df['date'] = pd.to_datetime(df['date'])
df['categorie'] = df['categorie'].astype('category')

# Filtrage
df[df['age'] > 30]
df[(df['salaire'] > 50000) & (df['age'] < 40)]
\`\`\``
    },
    {
      title: 'Visualisation avec Matplotlib et Seaborn',
      dur: 60,
      md: `# Visualisation avec Matplotlib et Seaborn

## Introduction

La visualisation est essentielle pour comprendre les donnees. Matplotlib offre un controle fin sur les graphiques, tandis que Seaborn fournit des interfaces de haut niveau pour des graphiques statistiques elegants.

---

## 1. Graphiques de base avec Matplotlib

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)', color='blue', linewidth=2)
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Fonction sinus')
plt.legend()
plt.grid(True)
plt.show()
\`\`\`

---

## 2. Sous-graphiques et Personnalisation

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# Lineaire
axes[0, 0].plot(x, np.sin(x))
axes[0, 0].set_title('Sinus')

# Barres
axes[0, 1].bar(['A', 'B', 'C'], [3, 7, 2])
axes[0, 1].set_title('Barres')

# Nuage de points
axes[1, 0].scatter(np.random.randn(50), np.random.randn(50))
axes[1, 0].set_title('Nuage de points')

# Histogramme
axes[1, 1].hist(np.random.randn(1000), bins=30)
axes[1, 1].set_title('Histogramme')

plt.tight_layout()
\`\`\`

---

## 3. Visualisations avec Seaborn

\`\`\`python
import seaborn as sns

# Dataset integre
tips = sns.load_dataset('tips')

# Distribution
sns.histplot(tips['total_bill'], kde=True)

# Boxplot
sns.boxplot(x='day', y='total_bill', data=tips)

# Pairplot
sns.pairplot(tips, hue='sex')

# Heatmap de correlation
sns.heatmap(tips.corr(numeric_only=True), annot=True, cmap='coolwarm')
\`\`\`

---

## 4. Graphiques Interactifs avec Plotly

\`\`\`python
import plotly.express as px

df = px.data.gapminder().query("year == 2007")

fig = px.scatter(
    df, x='gdpPercap', y='lifeExp',
    size='pop', color='continent',
    hover_name='country', log_x=True,
    title='Esperance de vie vs PIB'
)
fig.show()
\`\`\``
    },
    {
      title: 'Analyse Statistique et Feature Engineering',
      dur: 60,
      md: `# Analyse Statistique et Feature Engineering

## Introduction

L'analyse statistique permet de comprendre les relations entre les variables et d'extraire des caracteristiques pertinentes pour le machine learning.

---

## 1. Statistiques Descriptives

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'age': np.random.randint(18, 65, 1000),
    'salaire': np.random.normal(50000, 15000, 1000),
    'annees_exp': np.random.exponential(10, 1000)
})

# Mesures de tendance centrale
print('Moyenne:', df.mean())
print('Mediane:', df.median())
print('Mode:', df.mode().iloc[0])

# Mesures de dispersion
print('Ecart-type:', df.std())
print('Variance:', df.var())
print('IQR:', df.quantile(0.75) - df.quantile(0.25))

# Asymetrie et aplatissement
print('Skewness:', df.skew())
print('Kurtosis:', df.kurtosis())
\`\`\`

---

## 2. Correlation et Covariance

\`\`\`python
# Matrice de correlation
corr = df.corr()

# Test de correlation (Pearson)
from scipy import stats
r, p_value = stats.pearsonr(df['age'], df['salaire'])
print(f'Correlation: {r:.3f}, p-value: {p_value:.3f}')

# Matrice de covariance
cov = df.cov()
\`\`\`

---

## 3. Feature Engineering

\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, LabelEncoder
from datetime import datetime

# Normalisation
scaler = StandardScaler()
df['salaire_normalise'] = scaler.fit_transform(df[['salaire']])

# Encodage de variables categoriques
le = LabelEncoder()
df['age_categorie'] = pd.cut(df['age'], bins=[0, 25, 40, 65], labels=['jeune', 'adulte', 'senior'])

# Creation de features temporelles
df['date'] = pd.date_range('2020-01-01', periods=len(df), freq='D')
df['mois'] = df['date'].dt.month
df['jour_semaine'] = df['date'].dt.dayofweek
df['est_weekend'] = df['jour_semaine'].isin([5, 6]).astype(int)

# Interaction
df['age_salaire'] = df['age'] * df['salaire']
\`\`\`

---

## 4. Tests Statistiques

\`\`\`python
from scipy import stats

# Test t (comparaison de deux groupes)
groupe_a = np.random.normal(50, 10, 100)
groupe_b = np.random.normal(55, 10, 100)
t_stat, p_val = stats.ttest_ind(groupe_a, groupe_b)
print(f'Test t: t={t_stat:.3f}, p={p_val:.3f}')

# ANOVA (comparaison de plusieurs groupes)
groups = [np.random.normal(50, 10, 30) for _ in range(3)]
f_stat, p_val = stats.f_oneway(*groups)
print(f'ANOVA: F={f_stat:.3f}, p={p_val:.3f}')

# Chi-square (independance)
from scipy.stats import chi2_contingency
table = pd.crosstab(df['est_weekend'], df['age_categorie'])
chi2, p_val, dof, expected = chi2_contingency(table)
\`\`\``
    },
    {
      title: 'Introduction au Machine Learning',
      dur: 60,
      md: `# Introduction au Machine Learning

## Introduction

Le machine learning permet aux ordinateurs d'apprendre a partir des donnees. Ce module couvre la regression, la classification et le clustering avec Scikit-learn.

---

## 1. Regression Lineaire

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Donnees synthetiques
X = np.random.randn(200, 1) * 10
y = 2 * X.squeeze() + 5 + np.random.randn(200) * 2

# Entrainement
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
print(f'R2: {r2_score(y_test, y_pred):.3f}')
print(f'MSE: {mean_squared_error(y_test, y_pred):.3f}')
print(f'Coefficient: {model.coef_[0]:.3f}, Intercept: {model.intercept_:.3f}')
\`\`\`

---

## 2. Classification avec KNN et Arbres

\`\`\`python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.datasets import load_iris

iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# KNN
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)
print(f'KNN Accuracy: {accuracy_score(y_test, knn.predict(X_test)):.3f}')

# Arbre de decision
tree = DecisionTreeClassifier(max_depth=3, random_state=42)
tree.fit(X_train, y_train)
print(f'Arbre Accuracy: {accuracy_score(y_test, tree.predict(X_test)):.3f}')
\`\`\`

---

## 3. Clustering avec K-Means

\`\`\`python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Generation de clusters
from sklearn.datasets import make_blobs
X, _ = make_blobs(n_samples=300, centers=4, cluster_std=1.0, random_state=42)

# Standardisation
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# K-Means
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
labels = kmeans.fit_predict(X_scaled)

# Elbow method
inertias = []
for k in range(1, 11):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_scaled)
    inertias.append(km.inertia_)

plt.plot(range(1, 11), inertias, marker='o')
plt.xlabel('Nombre de clusters')
plt.ylabel('Inertie')
plt.title('Methode du coude')
\`\`\`

---

## 4. Pipeline et Validation Croisee

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

# Pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('svm', SVC())
])

# Validation croisee
scores = cross_val_score(pipeline, X, y, cv=5)
print(f'Accuracy moyen: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})')

# Grid Search
param_grid = {'svm__C': [0.1, 1, 10], 'svm__kernel': ['linear', 'rbf']}
grid = GridSearchCV(pipeline, param_grid, cv=5)
grid.fit(X_train, y_train)
print(f'Meilleurs parametres: {grid.best_params_}')
print(f'Best score: {grid.best_score_:.3f}')
\`\`\``
    }
  ]
), 'utf-8');
console.log('Generated: python-data-science');

// ============ docker-production ============
writeFileSync(resolve(base, 'devops-cloud/docker-production/courses/docker-production-courses.ts'), gen(
  'dockerProduction', 'docker',
  'Docker en Production',
  'Orchestration avec Swarm, monitoring, securite et CI/CD pour Docker en environnement de production.',
  'Level.advanced', 240,
  [
    {
      title: 'Docker Swarm et Orchestration',
      dur: 60,
      md: `# Docker Swarm et Orchestration

## Introduction

Docker Swarm transforme un ensemble de machines en un cluster Docker unique. Il gere le deploiement, la mise a l'echelle et la haute disponibilite des services.

---

## 1. Initialisation du Swarm

\`\`\`bash
# Initialiser le manager
docker swarm init --advertise-addr 192.168.1.100

# Obtenir la commande pour les workers
docker swarm join-token worker

# Lister les noeuds
docker node ls
\`\`\`

---

## 2. Services et Tasks

\`\`\`bash
# Creer un service
docker service create --name web --replicas 3 -p 80:80 nginx

# Lister les services
docker service ls

# Voir les tasks (conteneurs) d'un service
docker service ps web

# Mettre a l'echelle
docker service scale web=5

# Supprimer un service
docker service rm web
\`\`\`

---

## 3. Overlay Networks

\`\`\`bash
# Creer un reseau overlay
docker network create --driver overlay mon-reseau

# Utiliser le reseau dans un service
docker service create --name api --network mon-reseau --replicas 2 mon-api

# Les services peuvent communiquer par nom
# api:3000 est accessible depuis tout le swarm
\`\`\`

---

## 4. Mise a Jour Rolling

\`\`\`bash
# Mise a jour avec controle
docker service update \\
  --image mon-api:2.0.0 \\
  --update-parallelism 2 \\
  --update-delay 10s \\
  --update-failure-action rollback \\
  api

# Rollback automatique
docker service rollback api

# Inspecter l'etat
docker service inspect --pretty api
\`\`\``
    },
    {
      title: 'Monitoring et Logging',
      dur: 60,
      md: `# Monitoring et Logging

## Introduction

En production, il est essentiel de surveiller l'etat de vos conteneurs et de centraliser les logs. Docker fournit des outils integres qui se combinent avec des solutions externes comme Prometheus et ELK.

---

## 1. Docker Events et Stats

\`\`\`bash
# Surveiller les evenements en temps reel
docker events

# Filtrer les evenements
docker events --filter 'type=container' --filter 'event=die'

# Statistiques des conteneurs
docker stats

# Statistiques d'un conteneur specifique
docker stats mon-conteneur --no-stream

# Historique des evenements
docker events --since '2024-01-01' --until '2024-01-02'
\`\`\`

---

## 2. Logging avec Docker

\`\`\`bash
# Voir les logs d'un conteneur
docker logs mon-conteneur

# Suivre les logs en temps reel
docker logs -f mon-conteneur

# Logs avec timestamp
docker logs --timestamps mon-conteneur

# Dernieres N lignes
docker logs --tail 100 mon-conteneur

# Driver de logging JSON (par defaut)
docker run --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 nginx
\`\`\`

---

## 3. Prometheus et Grafana

\`\`\`yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana

  node-exporter:
    image: prom/node-exporter
    ports:
      - "9100:9100"

volumes:
  grafana-data:
\`\`\`

---

## 4. ELK Stack pour Logs Centralises

\`\`\`yaml
# docker-compose.elk.yml
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.10.0
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:8.10.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5000:5000"

  kibana:
    image: docker.elastic.co/kibana/kibana:8.10.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
\`\`\``
    },
    {
      title: 'Securite des Conteneurs',
      dur: 60,
      md: `# Securite des Conteneurs

## Introduction

La securite est une preoccupation majeure en production. Docker propose plusieurs mecanismes pour isoler et proteger vos conteneurs.

---

## 1. Principes de Securite

\`\`\`bash
# Ne pas tourner en root
docker run --user 1000:1000 nginx

# Filesystem en lecture seule
docker run --read-only --tmpfs /tmp nginx

# Capacites reduites
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx

# Securite du kernel
docker run --security-opt no-new-privileges:true nginx
\`\`\`

---

## 2. Gestion des Secrets

\`\`\`bash
# Creer un secret (Swarm)
echo "mon-mot-de-passe" | docker secret create db_password -

# Lister les secrets
docker secret ls

# Utiliser un secret dans un service
docker service create \\
  --name api \\
  --secret db_password \\
  --secret api_key \\
  mon-api

# Les secrets sont montes dans /run/secrets/
\`\`\`

---

## 3. Scan d'Images

\`\`\`bash
# Scanner une image avec Docker Scout
docker scout quickview mon-image:latest

# Audit detaille
docker scout cves mon-image:latest

# Comparer deux versions
docker scout compare mon-image:v1 mon-image:v2

# Recommandations
docker scout recommendations mon-image:latest
\`\`\`

---

## 4. Reseaux Securises

\`\`\`bash
# Isoler les services
docker network create --internal backend
docker network create frontend

# Service backend sans acces externe
docker service create --name db --network backend postgres:16

# Service frontend avec acces
docker service create --name api \\
  --network backend \\
  --network frontend \\
  -p 80:80 \\
  mon-api

# Utiliser des proxies TLS
docker service create --name proxy \\
  -p 443:443 \\
  --network frontend \\
  --secret ssl_cert \\
  traefik:v3.0
\`\`\``
    },
    {
      title: 'CI/CD et Deploiement Continue',
      dur: 60,
      md: `# CI/CD et Deploiement Continue

## Introduction

L'automatisation du build, du test et du deploiement est essentielle pour livrer des applications Docker en production de maniere fiable.

---

## 1. Dockerfile Optimise

\`\`\`dockerfile
# Multi-stage build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]
\`\`\`

---

## 2. CI avec GitHub Actions

\`\`\`yaml
name: Docker CI
on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${'$'}{{ secrets.DOCKER_USERNAME }}
          password: ${'$'}{{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: user/app:${'$'}{{ github.sha }}
\`\`\`

---

## 3. Deploiement avec Portainer

\`\`\`bash
# Installer Portainer
docker volume create portainer_data
docker run -d \\
  -p 9000:9000 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v portainer_data:/data \\
  portainer/portainer-ce:2.21.0

# Stack via API
curl -X POST http://localhost:9000/api/stacks \\
  -H "Authorization: Bearer TOKEN" \\
  -d '{
    "name": "production",
    "fileContent": "version: \"3.8\"\\nservices:\\n  web:\\n    image: nginx"
  }'
\`\`\`

---

## 4. Blue-Green Deploiement

\`\`\`bash
# Deploiement blue (actuel)
docker service create --name app-blue --replicas 3 -p 8080:80 mon-app:1.0

# Deploiement green (nouveau)
docker service create --name app-green --replicas 3 mon-app:2.0

# Bascule du trafic
docker service update --publish-rm 8080:80 app-blue
docker service update --publish-add 8080:80 app-green

# Nettoyage apres validation
docker service rm app-blue
\`\`\``
    }
  ]
), 'utf-8');
console.log('Generated: docker-production');

// ============ aws-cloud-practitioner ============
writeFileSync(resolve(base, 'devops-cloud/aws-cloud-practitioner/courses/aws-cloud-practitioner-courses.ts'), gen(
  'awsCloudPractitioner', 'aws',
  'AWS Cloud Practitioner',
  'Fondamentaux du cloud AWS, services de base, securite, tarification et bonnes pratiques pour la certification Cloud Practitioner.',
  'Level.beginner', 180,
  [
    {
      title: 'Introduction au Cloud AWS',
      dur: 45,
      md: `# Introduction au Cloud AWS

## Introduction

Amazon Web Services (AWS) est la plateforme cloud la plus utilisee au monde. Ce module couvre les concepts fondamentaux du cloud computing et les services AWS de base.

---

## 1. Modeles de Cloud Computing

\`\`\`
IaaS (Infrastructure as a Service):
  - Controle sur l'OS, le reseau et le stockage
  - Exemple: EC2, VPC

PaaS (Platform as a Service):
  - Gere l'infrastructure sous-jacente
  - Exemple: Elastic Beanstalk, RDS

SaaS (Software as a Service):
  - Application complete gere par le fournisseur
  - Exemple: WorkMail, Chime
\`\`\`

---

## 2. Services AWS Fondamentaux

\`\`\`
Compute:
  - EC2: Machines virtuelles
  - Lambda: Serverless (FaaS)
  - ECS/EKS: Conteneurs

Stockage:
  - S3: Stockage d'objets
  - EBS: Stockage par blocs
  - Glacier: Archivage

Base de donnees:
  - RDS: Relationnel (MySQL, PostgreSQL)
  - DynamoDB: NoSQL
  - ElastiCache: Cache (Redis, Memcached)

Reseau:
  - VPC: Reseau prive virtuel
  - CloudFront: CDN
  - Route 53: DNS
\`\`\`

---

## 3. Regions et Zones de Disponibilite

\`\`\`
Regions AWS (exemples):
  - us-east-1 (Virginie du Nord)
  - eu-west-1 (Irlande)
  - eu-west-3 (Paris)
  - ap-southeast-1 (Singapour)

AZ (Availability Zones):
  - Chaque region a 3+ zones
  - Zones isolees en cas de panne
  - Connectees par fibre optique

Points de presence:
  - 400+ points de presence (Edge Locations)
  - Utilises par CloudFront et Route 53
\`\`\`

---

## 4. Modele de Responsabilite Partagee

\`\`\`
AWS est responsable de la SECURITE DU CLOUD:
  - Centres de donnees physiques
  - Reseau global
  - Hyperviseurs

Le client est responsable de la SECURITE DANS LE CLOUD:
  - Donnees au repos et en transit
  - Configuration des pare-feux
  - Gestion des identites (IAM)
  - Systemes d'exploitation

Chiffrement:
  - AES-256 pour le stockage
  - TLS 1.2+ pour le transit
  - KMS pour la gestion des cles
\`\`\``
    },
    {
      title: 'IAM et Securite',
      dur: 45,
      md: `# IAM et Securite

## Introduction

AWS Identity and Access Management (IAM) permet de gerer les acces aux services AWS de maniere securisee. C'est le fondement de la securite sur AWS.

---

## 1. Utilisateurs et Groupes IAM

\`\`\`json
// Exemple de politique IAM
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::mon-bucket",
        "arn:aws:s3:::mon-bucket/*"
      ]
    }
  ]
}
\`\`\`

\`\`\`bash
# Creer un utilisateur
aws iam create-user --user-name devops-user

# Attacher une politique
aws iam attach-user-policy \\
  --user-name devops-user \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

# Creer un groupe
aws iam create-group --group-name developers
aws iam add-user-to-group --group-name developers --user-name devops-user
\`\`\`

---

## 2. Roles IAM

\`\`\`json
// Politique de confiance pour un role EC2
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
\`\`\`

\`\`\`bash
# Creer un role
aws iam create-role \\
  --role-name EC2-S3-Access \\
  --assume-role-policy-document file://trust-policy.json

# Attacher une politique au role
aws iam attach-role-policy \\
  --role-name EC2-S3-Access \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
\`\`\`

---

## 3. Politiques et Permissions

\`\`\`json
// Principe du moindre privilege
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "Bool": {"aws:SecureTransport": "false"}
      }
    }
  ]
}
\`\`\`

**Types de politiques :**
- AWS Managed : creees par AWS
- Customer Managed : creees par vous
- Inline : attachees directement a un utilisateur/role

---

## 4. Bonnes Pratiques IAM

\`\`\`
1. Activer MFA pour le compte root
2. Utiliser des roles plutot que des cles d'acces
3. Principe du moindre privilege
4. Auditer regulierement avec IAM Access Analyzer
5. Utiliser des politiques basees sur les ressources
6. Rotation reguliere des cles d'acces
7. Ne jamais partager les cles d'acces
8. Utiliser AWS Organizations pour la gestion multi-comptes
\`\`\``
    },
    {
      title: 'Stockage et Base de Donnees',
      dur: 45,
      md: `# Stockage et Base de Donnees

## Introduction

AWS propose de nombreuses solutions de stockage et de base de donnees adaptees a differents cas d'usage, du stockage d'objets aux bases relationnelles et NoSQL.

---

## 1. Amazon S3

\`\`\`bash
# Creer un bucket
aws s3 mb s3://mon-bucket-unique

# Uploader un fichier
aws s3 cp fichier.txt s3://mon-bucket-unique/

# Classes de stockage
aws s3 cp fichier.txt s3://mon-bucket-unique/ \\
  --storage-class STANDARD_IA

# Versionnement
aws s3api put-bucket-versioning \\
  --bucket mon-bucket-unique \\
  --versioning-configuration Status=Enabled

# Cycle de vie
aws s3api put-bucket-lifecycle-configuration \\
  --bucket mon-bucket-unique \\
  --lifecycle-configuration file://lifecycle.json
\`\`\`

---

## 2. Amazon RDS

\`\`\`bash
# Creer une instance PostgreSQL
aws rds create-db-instance \\
  --db-instance-identifier ma-base \\
  --db-instance-class db.t3.micro \\
  --engine postgres \\
  --master-username admin \\
  --master-user-password password123 \\
  --allocated-storage 20

# Creer un read replica
aws rds create-db-instance-read-replica \\
  --db-instance-identifier ma-base-replica \\
  --source-db-instance-identifier ma-base

# Multi-AZ pour la haute disponibilite
aws rds modify-db-instance \\
  --db-instance-identifier ma-base \\
  --multi-az
\`\`\`

---

## 3. Amazon DynamoDB

\`\`\`bash
# Creer une table NoSQL
aws dynamodb create-table \\
  --table-name Utilisateurs \\
  --attribute-definitions AttributeName=id,AttributeType=S \\
  --key-schema AttributeName=id,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST

# Inserer des donnees
aws dynamodb put-item \\
  --table-name Utilisateurs \\
  --item '{
    "id": {"S": "user123"},
    "nom": {"S": "Alice"},
    "email": {"S": "alice@example.com"}
  }'

# Interroger la table
aws dynamodb query \\
  --table-name Utilisateurs \\
  --key-condition-expression "id = :id" \\
  --expression-attribute-values '{":id": {"S": "user123"}}'
\`\`\`

---

## 4. Comparaison des Services

\`\`\`
S3:
  - Stockage d'objets
  - 99.999999999% de durabilite
  - Ideal pour fichiers, images, backups

EBS:
  - Stockage par blocs pour EC2
  - Snapshots pour backup
  - Differents types: gp3, io2, st1

RDS:
  - Base relationnelle geree
  - MySQL, PostgreSQL, Oracle, SQL Server
  - Multi-AZ, Read Replicas

DynamoDB:
  - NoSQL serverless
  - Latence milliseconde
  - Auto-scaling
  - Ideal pour applications web
\`\`\``
    },
    {
      title: 'Tarification et Support',
      dur: 45,
      md: `# Tarification et Support

## Introduction

AWS propose un modele de tarification a l'utilisation (pay-as-you-go) avec plusieurs outils pour estimer et optimiser les couts.

---

## 1. Modeles de Tarification

\`\`\`
Pay-as-you-go:
  - Payer uniquement ce que vous utilisez
  - Pas d'engagement a long terme
  - Ideal pour les charges de travail variables

Savings Plans:
  - Engagement 1 ou 3 ans
  - Jusqu'a 72% d'economie
  - Flexible entre les services

Reserved Instances:
  - Engagement 1 ou 3 ans
  - Jusqu'a 75% d'economie
  - Standard ou convertible

Spot Instances:
  - Jusqu'a 90% d'economie
  - Instances interrompables
  - Ideal pour les batchs et tests
\`\`\`

---

## 2. AWS Pricing Calculator

\`\`\`
1. Aller sur https://calculator.aws
2. Ajouter les services necessaires
3. Configurer:
   - Region
   - Type d'instance
   - Stockage
   - Transfert de donnees
4. Generer l'estimation
5. Partager ou exporter l'estimation

Exemple d'estimation:
  - 2 x t3.medium (24/7) = ~$70/mois
  - 100GB S3 Standard = ~$2.30/mois
  - 20GB RDS PostgreSQL = ~$50/mois
  - Total estime: ~$122.30/mois
\`\`\`

---

## 3. AWS Cost Explorer

\`\`\`bash
# Activer Cost Explorer (Console)
# Outils disponibles:
#   - Cout par service
#   - Cout par compte
#   - Previsions de cout
#   - Recommendations d'optimisation

# Budgets AWS
aws budgets create-budget \\
  --account-id 123456789012 \\
  --budget file://budget.json \\
  --notifications-with-subscribers file://notifications.json

# Exemple de budget
{
  "BudgetName": "Budget-Mensuel",
  "BudgetLimit": {"Amount": "1000", "Unit": "USD"},
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST"
}
\`\`\`

---

## 4. Plans de Support

\`\`\`
Support Basic (inclus):
  - Ressources en libre-service
  - AWS Personal Health Dashboard
  - Documentation et forums

Support Developer ($29/mois):
  - Support par email
  - Reponse < 24h
  - Guide general

Support Business ($100/mois):
  - Support 24/7 par chat et telephone
  - Reponse < 1h (critique)
  - AWS Trusted Advisor

Support Enterprise ($15k+):
  - TAM dedie (Technical Account Manager)
  - Reponse < 15min (critique)
  - Concierge Support Team
  - Well-Architected Reviews
\`\`\``
    }
  ]
), 'utf-8');
console.log('Generated: aws-cloud-practitioner');

// ============ aws-solutions-architect ============
writeFileSync(resolve(base, 'devops-cloud/aws-solutions-architect/courses/aws-solutions-architect-courses.ts'), gen(
  'awsSolutionsArchitect', 'aws',
  'AWS Solutions Architect',
  'Architecture d-applications resilientes, haute disponibilite, microservices et serverless sur AWS.',
  'Level.advanced', 240,
  [
    {
      title: 'Architecture Haute Disponibilite',
      dur: 60,
      md: `# Architecture Haute Disponibilite

## Introduction

Une architecture haute disponibilite assure que votre application reste accessible meme en cas de panne d'un composant. AWS fournit les outils pour construire des systemes resilient.

---

## 1. Multi-AZ et Multi-Region

\`\`\`yaml
# CloudFormation: deploiement multi-AZ
Resources:
  AutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      AvailabilityZones:
        - us-east-1a
        - us-east-1b
        - us-east-1c
      MinSize: '2'
      MaxSize: '10'
      DesiredCapacity: '2'
      TargetGroupARNs:
        - !Ref TargetGroup

  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Scheme: internet-facing
      Subnets:
        - subnet-abc123
        - subnet-def456
        - subnet-ghi789
\`\`\`

---

## 2. Auto Scaling et Load Balancing

\`\`\`bash
# Creer un launch template
aws ec2 create-launch-template \\
  --launch-template-name web-template \\
  --launch-template-data file://template.json

# Creer un auto scaling group
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name web-asg \\
  --launch-template LaunchTemplateName=web-template \\
  --min-size 2 --max-size 10 --desired-capacity 2 \\
  --vpc-zone-identifier subnet-abc,subnet-def

# Scaling policies
aws autoscaling put-scaling-policy \\
  --auto-scaling-group-name web-asg \\
  --policy-name cpu-target \\
  --policy-type TargetTrackingScaling \\
  --target-tracking-configuration file://cpu-target.json
\`\`\`

---

## 3. RDS Multi-AZ et Read Replicas

\`\`\`bash
# Creer une instance Multi-AZ
aws rds create-db-instance \\
  --db-instance-identifier ma-base \\
  --multi-az \\
  --engine postgres \\
  --db-instance-class db.r6g.large \\
  --master-username admin \\
  --master-user-password password123 \\
  --allocated-storage 100 \\
  --storage-type gp3

# Creer un read replica dans une autre region
aws rds create-db-instance-read-replica \\
  --db-instance-identifier ma-base-dr \\
  --source-db-instance-identifier ma-base \\
  --region eu-west-3
\`\`\`

---

## 4. Route 53 et DNS Failover

\`\`\`json
// Configuration DNS failover
{
  "Comment": "Failover routing",
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "app.mon-site.com.",
        "Type": "A",
        "SetIdentifier": "primary",
        "Failover": "PRIMARY",
        "AliasTarget": {
          "HostedZoneId": "ZONE_ID_ALB_1",
          "DNSName": "alb-primary.elb.amazonaws.com"
        },
        "HealthCheckId": "hc-abc123"
      }
    },
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "app.mon-site.com.",
        "Type": "A",
        "SetIdentifier": "secondary",
        "Failover": "SECONDARY",
        "AliasTarget": {
          "HostedZoneId": "ZONE_ID_ALB_2",
          "DNSName": "alb-secondary.elb.amazonaws.com"
        }
      }
    }
  ]
}
\`\`\``
    },
    {
      title: 'Microservices et Conteneurs',
      dur: 60,
      md: `# Microservices et Conteneurs

## Introduction

Les microservices permettent de decomposer une application en services independants. AWS propose ECS, EKS et Fargate pour orchestrer les conteneurs.

---

## 1. Amazon ECS avec Fargate

\`\`\`json
// task-definition.json
{
  "family": "api-service",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "mon-api:latest",
      "portMappings": [{
        "containerPort": 3000,
        "protocol": "tcp"
      }],
      "environment": [
        {"name": "DB_HOST", "value": "database.cluster.us-east-1.rds.amazonaws.com"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/api",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
\`\`\`

---

## 2. Service Discovery

\`\`\`json
// Cloud Map service discovery
{
  "Service": {
    "Name": "api-service",
    "DnsConfig": {
      "NamespaceId": "ns-abc123",
      "DnsRecords": [
        {"Type": "A", "TTL": 60}
      ],
      "RoutingPolicy": "MULTIVALUE"
    },
    "HealthCheckCustomConfig": {
      "FailureThreshold": 1
    }
  }
}
\`\`\`

\`\`\`bash
# Creer un namespace
aws servicediscovery create-private-dns-namespace \\
  --name microservices.local \\
  --vpc vpc-abc123

# Enregistrer un service
aws servicediscovery create-service \\
  --name api-service \\
  --dns-config "NamespaceId=ns-abc123,DnsRecords=[{Type=A,TTL=60}]"
\`\`\`

---

## 3. API Gateway et Lambda

\`\`\`yaml
# SAM template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  ApiGateway:
    Type: AWS::Serverless::Api
    Properties:
      StageName: prod
      Auth:
        DefaultAuthorizer: CognitoAuthorizer
        Authorizers:
          CognitoAuthorizer:
            UserPoolArn: !GetAtt UserPool.Arn

  CreateOrderFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: orders.create
      Runtime: nodejs20.x
      Events:
        CreateOrder:
          Type: Api
          Properties:
            Path: /orders
            Method: POST
            RestApiId: !Ref ApiGateway
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref OrdersTable
\`\`\`

---

## 4. EKS et Kubernetes

\`\`\`yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: mon-api:latest
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  selector:
    app: api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
\`\`\``
    },
    {
      title: 'Serverless et Evenements',
      dur: 60,
      md: `# Serverless et Evenements

## Introduction

L'architecture serverless permet de construire des applications sans gerer d'infrastructure. AWS Lambda, Step Functions et EventBridge sont les piliers de cette approche.

---

## 1. AWS Lambda Avance

\`\`\`javascript
// lambda/index.js
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  // Lecture du corps de la requete API Gateway
  const body = JSON.parse(event.body);

  // Insertion dans DynamoDB
  const item = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
    ttl: Math.floor(Date.now() / 1000) + 86400 // 24h
  };

  await docClient.send(new PutCommand({
    TableName: process.env.TABLE_NAME,
    Item: item
  }));

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(item)
  };
};
\`\`\`

---

## 2. AWS Step Functions

\`\`\`json
// state-machine.json
{
  "Comment": "Workflow de traitement de commande",
  "StartAt": "ValiderCommande",
  "States": {
    "ValiderCommande": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:validate-order",
      "Next": "SelectionModePaiement"
    },
    "SelectionModePaiement": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.montant",
          "NumericLessThan": 100,
          "Next": "PaiementImmediat"
        }
      ],
      "Default": "ApprobationManuelle"
    },
    "PaiementImmediat": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:process-payment",
      "Next": "ConfirmerCommande",
      "Retry": [
        {
          "ErrorEquals": ["PaymentError"],
          "IntervalSeconds": 5,
          "MaxAttempts": 3,
          "BackoffRate": 2
        }
      ]
    },
    "ApprobationManuelle": {
      "Type": "Task",
      "Resource": "arn:aws:states:send-task-success",
      "TimeoutSeconds": 86400,
      "Next": "ConfirmerCommande"
    },
    "ConfirmerCommande": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:confirm-order",
      "End": true
    }
  }
}
\`\`\`

---

## 3. Amazon EventBridge

\`\`\`json
// Modele d'evenement
{
  "Source": ["com.monapp.orders"],
  "DetailType": ["OrderCreated", "OrderShipped", "OrderDelivered"],
  "Detail": {
    "orderId": [{"exists": true}],
    "customerId": [{"exists": true}]
  }
}
\`\`\`

\`\`\`bash
# Creer un bus d'evenements
aws events create-event-bus --name mon-app-bus

# Creer une regle
aws events put-rule \\
  --name order-created-rule \\
  --event-pattern file://pattern.json \\
  --event-bus-name mon-app-bus

# Cibler une fonction Lambda
aws events put-targets \\
  --rule order-created-rule \\
  --targets "Id"="1","Arn"="arn:aws:lambda:function:send-notification" \\
  --event-bus-name mon-app-bus
\`\`\`

---

## 4. Patterns Serverless

\`\`\`
Fan-out:
  SNS -> SQS -> Lambda
  Un evenement est distribue a plusieurs consommateurs

Event Sourcing:
  - Chaque changement est un evenement
  - Stocke dans DynamoDB ou EventBridge
  - Reconstruire l'etat en rejouant les evenements

CQRS:
  - Command: ecriture (DynamoDB)
  - Query: lecture (ElastiCache)
  - Separe les responsabilites

Saga Pattern:
  - Coordination de transactions distribuees
  - Step Functions pour l'orchestration
  - Compensation en cas d'echec
\`\`\``
    },
    {
      title: 'Securite et Optimisation des Cout',
      dur: 60,
      md: `# Securite et Optimisation des Cout

## Introduction

La securite et l'optimisation des couts sont deux piliers du Well-Architected Framework. AWS fournit des outils pour auditer, securiser et optimiser vos architectures.

---

## 1. AWS WAF et Shield

\`\`\`json
// WAF ACL
{
  "Name": "web-acl-production",
  "DefaultAction": { "Allow": {} },
  "Rules": [
    {
      "Name": "RateLimit",
      "Priority": 0,
      "Statement": {
        "RateBasedStatement": {
          "Limit": 2000,
          "AggregateKeyType": "IP"
        }
      },
      "Action": { "Block": {} }
    },
    {
      "Name": "AWSManagedRules",
      "Priority": 1,
      "Statement": {
        "ManagedRuleGroupStatement": {
          "VendorName": "AWS",
          "Name": "AWSManagedRulesCommonRuleSet"
        }
      },
      "OverrideAction": { "None": {} }
    }
  ]
}
\`\`\`

---

## 2. AWS KMS et Chiffrement

\`\`\`bash
# Creer une cle KMS
aws kms create-key \\
  --description "Cle pour le chiffrement S3" \\
  --key-usage ENCRYPT_DECRYPT \\
  --origin AWS_KMS

# Creer un alias
aws kms create-alias \\
  --alias-name alias/s3-encryption \\
  --target-key-id abc123

# Chiffrer une donnee
aws kms encrypt \\
  --key-id alias/s3-encryption \\
  --plaintext fileb://fichier-secret.txt \\
  --output text \\
  --query CiphertextBlob | base64 -d > fichier-chiffre.enc

# Activer le chiffrement par defaut sur S3
aws s3api put-bucket-encryption \\
  --bucket mon-bucket \\
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "aws:kms",
        "KMSMasterKeyID": "alias/s3-encryption"
      }
    }]
  }'
\`\`\`

---

## 3. AWS Config et Audit

\`\`\`json
// Regle AWS Config
{
  "ConfigRuleName": "s3-bucket-public-read-prohibited",
  "Source": {
    "Owner": "AWS",
    "SourceIdentifier": "S3_BUCKET_PUBLIC_READ_PROHIBITED"
  },
  "Scope": {
    "ComplianceResourceTypes": ["AWS::S3::Bucket"]
  },
  "MaximumExecutionFrequency": "TwentyFour_Hours"
}
\`\`\`

\`\`\`bash
# Activer AWS Config
aws configservice put-configuration-recorder \\
  --configuration-recorder name=default,roleARN=arn:aws:iam::role/config

# Creer une regle
aws configservice put-config-rule --config-rule file://rule.json

# Obtenir les resultats de conformite
aws configservice get-compliance-details-by-config-rule \\
  --config-rule-name s3-bucket-public-read-prohibited
\`\`\`

---

## 4. Optimisation des Couts

\`\`\`
Strategies d'optimisation:

Compute:
  - Utiliser Spot Instances pour les workloads flexibles
  - Graviton (ARM) est 20% moins cher
  - Rightsizing: utiliser Compute Optimizer

Stockage:
  - S3 Intelligent-Tiering pour les donnees a acces variable
  - S3 Lifecycle pour archiver automatiquement
  - EBS gp3 au lieu de gp2 (20% moins cher)

Base de donnees:
  - RDS Reserved Instances pour la production
  - Aurora Serverless pour les charges variables
  - DynamoDB On-Demand pour les nouvelles applications

Reseau:
  - CloudFront pour reduire le transfert de donnees
  - VPC Endpoints pour eviter les frais NAT
  - Data Transfer: comprimer les donnees

Outils:
  - AWS Cost Explorer
  - AWS Trusted Advisor
  - AWS Compute Optimizer
  - AWS Budgets avec alertes
\`\`\``
    }
  ]
), 'utf-8');
console.log('Generated: aws-solutions-architect');

console.log('\\nAll 4 courses generated!');
