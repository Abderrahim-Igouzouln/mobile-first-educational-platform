import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

interface LessonSpec {
  title: string;
  durationMin: number;
  contentMarkdown: string;
}

// Course specs based on existing corrupted files - extract title/description/level from file
const courses: Array<{ file: string; varName: string; techSlug: string; title: string; description: string; level: string; durationMin: number; lessons: LessonSpec[] }> = [];

// Read each corrupted file to extract course metadata and exercise references
const base = resolve('prisma/content');
const filePaths = [
  'backend/python-backend/courses/python-backend-courses.ts',
  'backend/python-data-science/courses/python-data-science-courses.ts',
  'devops-cloud/aws-cloud-practitioner/courses/aws-cloud-practitioner-courses.ts',
  'devops-cloud/aws-solutions-architect/courses/aws-solutions-architect-courses.ts',
  'devops-cloud/docker-production/courses/docker-production-courses.ts',
];

// Generate course files with fresh content, using JSON-string format
function makeCourseFile(course: typeof courses[0]): string {
  const lines: string[] = [];
  lines.push(`import { Level } from '@prisma/client';`);
  lines.push(``);
  lines.push(`export const ${course.varName} = {`);
  lines.push(`  techSlug: "${course.techSlug}",`);
  lines.push(`  title: "${course.title}",`);
  lines.push(`  description: "${course.description}",`);
  lines.push(`  level: ${course.level},`);
  lines.push(`  durationMin: ${course.durationMin},`);
  lines.push(`  lessons: [`);

  for (const lesson of course.lessons) {
    lines.push(`    {`);
    lines.push(`      "title": "${lesson.title}",`);
    lines.push(`      "durationMin": ${lesson.durationMin},`);
    lines.push(`      "contentMarkdown": ${JSON.stringify(lesson.contentMarkdown)},`);
    lines.push(`    },`);
  }

  lines.push(`  ],`);
  lines.push(`};`);
  return lines.join('\n');
}

// =============== COURSE 1: python-backend ===============
courses.push({
  file: filePaths[0],
  varName: "pythonBackend",
  techSlug: "python",
  title: "Python pour le Backend",
  description: "Decouvrez comment creer des API modernes et performantes avec Python, FastAPI, SQLAlchemy et PostgreSQL. Du premier endpoint au deploiement en production.",
  level: "Level.beginner",
  durationMin: 180,
  lessons: [
    {
      title: "Introduction a Python et FastAPI",
      durationMin: 45,
      contentMarkdown: `# Introduction a Python et FastAPI

## Introduction

FastAPI est un framework web moderne pour Python, construit au-dessus de Starlette et Pydantic. Il est concu pour etre rapide, facile a utiliser et offrir une documentation automatique. Ce module couvre le typage, l'asynchronisme et la creation de votre premier endpoint.

---

## 1. Environnement Python et Typage

Python 3.10+ supporte le typage statique grace aux annotations de type. FastAPI en tire parti pour la validation automatique.

\`\`\`python
# Typage de base en Python
def calculer_prix_ht(prix_ttc: float, taux_tva: float = 0.20) -> float:
    \"\"\"Calcule le prix hors taxes a partir du prix TTC.\"\"\"
    return round(prix_ttc / (1 + taux_tva), 2)

# Types complexes avec dataclasses
from dataclasses import dataclass
from typing import Optional

@dataclass
class Utilisateur:
    id: int
    nom: str
    email: str
    age: Optional[int] = None
\`\`\`

**Types utiles pour FastAPI :**
- \`str, int, float, bool\` : types primitifs
- \`Optional[str]\` : valeur pouvant etre None
- \`list[str]\` : liste de chaines
- \`dict[str, Any]\` : dictionnaire a cles string

---

## 2. Premier endpoint avec FastAPI

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title=\"Mon API\", version=\"1.0.0\")

@app.get(\"/\")
def accueil():
    return {\"message\": \"Bienvenue sur mon API\"}

@app.post(\"/items\")
async def creer_item(item: ItemCreate):
    total = item.price + item.tax
    return {\"id\": 1, \"name\": item.name, \"price\": item.price, \"total\": total}
\`\`\`

---

## 3. Async/Await en Python

FastAPI supporte nativement l'asynchronisme. Les routes async permettent de gerer plusieurs requetes simultanement sans bloquer.

\`\`\`python
import httpx
import asyncio
from fastapi import FastAPI

app = FastAPI()

@app.get(\"/async\")
async def route_asynchrone():
    async with httpx.AsyncClient() as client:
        response = await client.get(\"https://jsonplaceholder.typicode.com/todos/1\")
        return response.json()
\`\`\`

---

## 4. Validation avec Pydantic

Pydantic valide automatiquement les donnees. Il genere des erreurs claires si les donnees ne sont pas conformes.

\`\`\`python
from pydantic import BaseModel, Field
from datetime import datetime

class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: str = Field(..., pattern=r\"^[\\\\w.-]+@[\\\\w.-]+\\\\.\\\\w+$\")
    age: int = Field(..., ge=13, le=120)
\`\`\``
    },
    {
      title: "CRUD avec SQLAlchemy et PostgreSQL",
      durationMin: 45,
      contentMarkdown: `# CRUD avec SQLAlchemy et PostgreSQL

## Introduction

SQLAlchemy est l'ORM le plus populaire de Python. Couple a une base PostgreSQL, il permet de manipuler des donnees relationnelles de maniere elegante et typee.

---

## 1. Configuration et Modeles

\`\`\`python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Float

DATABASE_URL = \"postgresql+asyncpg://user:password@localhost:5432/mydb\"
engine = create_async_engine(DATABASE_URL, echo=True)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__ = \"products\"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    price: Mapped[float] = mapped_column(Float)
    stock: Mapped[int] = mapped_column(default=0)
\`\`\`

---

## 2. CRUD Asynchrone

\`\`\`python
from sqlalchemy import select
from database import Product, async_session

async def creer_produit(name: str, price: float) -> Product:
    async with async_session() as session:
        produit = Product(name=name, price=price)
        session.add(produit)
        await session.commit()
        await session.refresh(produit)
        return produit

async def lister_produits() -> list[Product]:
    async with async_session() as session:
        result = await session.execute(select(Product))
        return list(result.scalars().all())
\`\`\`

---

## 3. Migrations avec Alembic

\`\`\`bash
pip install alembic
alembic init alembic
alembic revision --autogenerate -m \"add products table\"
alembic upgrade head
\`\`\`

---

## 4. Routes CRUD avec FastAPI

\`\`\`python
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional

@app.get(\"/products\", response_model=list[ProductResponse])
async def list_products(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1, le=100)):
    return await crud.lister_produits(skip=skip, limit=limit)

@app.get(\"/products/{product_id}\", response_model=ProductResponse)
async def get_product(product_id: int):
    produit = await crud.obtenir_produit(product_id)
    if not produit:
        raise HTTPException(status_code=404, detail=\"Produit non trouve\")
    return produit
\`\`\``
    },
    {
      title: "Authentification et Securite",
      durationMin: 45,
      contentMarkdown: `# Authentification et Securite

## Introduction

La securite d'une API est essentielle. Ce module couvre l'authentification JWT, OAuth2 avec FastAPI et le hashage des mots de passe.

---

## 1. JWT avec FastAPI

\`\`\`python
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = \"votre-cle-secrete\"
ALGORITHM = \"HS256\"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=[\"bcrypt\"], deprecated=\"auto\")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=\"/auth/login\")

def creer_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({\"exp\": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
\`\`\`

---

## 2. Middleware d'Authentification

\`\`\`python
async def get_current_user(token: str = Depends(oauth2_scheme)):
    return verifier_token(token)

@app.get(\"/protected\")
async def route_protegee(current_user = Depends(get_current_user)):
    return {\"message\": f\"Bienvenue {current_user.email}\"}
\`\`\`

---

## 3. Inscription et Connexion

\`\`\`python
@app.post(\"/auth/register\")
async def register(user_data: UserCreate):
    hashed = pwd_context.hash(user_data.password)
    user = User(email=user_data.email, password=hashed, name=user_data.name)
    session.add(user)
    await session.commit()
    return user

@app.post(\"/auth/login\")
async def login(email: str, password: str):
    user = await get_user_by_email(email)
    if not user or not pwd_context.verify(password, user.password):
        raise HTTPException(status_code=401, detail=\"Email ou mot de passe incorrect\")
    token = creer_access_token(data={\"sub\": str(user.id), \"email\": user.email})
    return {\"access_token\": token, \"token_type\": \"bearer\"}
\`\`\`

---

## 4. Configuration CORS

\`\`\`python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[\"http://localhost:3000\", \"https://mon-app.com\"],
    allow_credentials=True,
    allow_methods=[\"GET\", \"POST\", \"PUT\", \"DELETE\"],
    allow_headers=[\"*\"],
)
\`\`\``
    },
    {
      title: "Tests et Deploiement",
      durationMin: 45,
      contentMarkdown: `# Tests et Deploiement

## Introduction

Ecrire des tests et automatiser le deploiement sont des etapes indispensables pour une API de qualite production.

---

## 1. Tests avec pytest et TestClient

\`\`\`python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_creer_produit():
    response = client.post(\"/products\", json={\"name\": \"Clavier\", \"price\": 89.99, \"stock\": 10})
    assert response.status_code == 201
    assert response.json()[\"name\"] == \"Clavier\"

def test_lister_produits():
    response = client.get(\"/products\")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
\`\`\`

---

## 2. Tests Asynchrones

\`\`\`python
import pytest
from httpx import AsyncClient, ASGITransport
from main import app

@pytest.mark.anyio
async def test_creer_produit_async():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url=\"http://test\") as ac:
        response = await ac.post(\"/products\", json={\"name\": \"Souris\", \"price\": 49.99})
        assert response.status_code == 201
\`\`\`

---

## 3. Dockerfile et Deploiement

\`\`\`dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]
\`\`\`

---

## 4. Structure du Projet

\`\`\`
app/
  main.py
  database.py
  models/
  routes/
  tests/
Dockerfile
requirements.txt
\`\`\``
    }
  ]
});

// Write all course files
for (const course of courses) {
  const content = makeCourseFile(course);
  writeFileSync(resolve(base, course.file), content, 'utf-8');
  console.log(`Generated: ${course.file} (${course.lessons.length} lessons)`);
}

console.log('\\nDone! All courses generated with JSON-string format.');
