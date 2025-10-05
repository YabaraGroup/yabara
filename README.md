# 🚀 YABARA - Plateforme de Gestion des Candidatures

> **Yabara est une application moderne pour gérer les candidatures**, développée avec une architecture fullstack utilisant React et Node.js.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/YabaraGroup/yabara)
[![Node](https://img.shields.io/badge/node-22+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.8+-blue.svg)](https://www.typescriptlang.org/)

---

## 📋 Table des Matières

- [🏗️ Architecture du Projet](#️-architecture-du-projet)
- [⚡ Démarrage Rapide](#-démarrage-rapide)
- [🛠️ Stack Technique](#️-stack-technique)
- [📁 Structure du Projet](#-structure-du-projet)
- [🔧 Installation et Configuration](#-installation-et-configuration)
- [🚀 Commandes de Développement](#-commandes-de-développement)
- [🐳 Docker et Déploiement](#-docker-et-déploiement)
- [🗄️ Base de Données](#️-base-de-données)
- [🔗 API et Routes](#-api-et-routes)
- [🎨 Frontend](#-frontend)
- [📊 Monitoring et Logs](#-monitoring-et-logs)
- [🤝 Contribution](#-contribution)
- [📞 Contact](#-contact)

---

## 🏗️ Architecture du Projet

Yabara utilise une **architecture monorepo** avec npm workspaces, organisée comme suit :

```
yabara/
├── 📁 client/          # Application React (Frontend)
├── 📁 server/          # API Node.js/Express (Backend)
├── 📁 yabara_api/      # Tests API Bruno
├── 📁 docs/            # Documentation technique
├── 🐳 docker-compose.yml
├── 📦 package.json     # Configuration workspace
└── 🔧 Configuration files
```

### 🌐 Services Déployés

- **Frontend React** : Interface utilisateur moderne
- **Backend Node.js** : API REST avec Express
- **MySQL 8.0** : Base de données principale
- **PhpMyAdmin** : Interface d'administration DB
- **Traefik** : Reverse proxy avec HTTPS automatique

---

## ⚡ Démarrage Rapide

### Prérequis

- **Node.js** 22+ ([Télécharger](https://nodejs.org/))
- **npm** (inclus avec Node.js)
- **Docker & Docker Compose** (pour le déploiement)
- **Git** ([Télécharger](https://git-scm.com/))

### Installation Express

```bash
# 1. Cloner le repository
git clone https://github.com/YabaraGroup/yabara.git
cd yabara

# 2. Installer les dépendances
npm install

# 3. Lancer l'environnement de développement
npm run dev
```

🎉 **C'est tout !** L'application sera accessible sur :

- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:3310 (quand configuré)

---

## 🛠️ Stack Technique

### 🖥️ Frontend (Client)

| Technologie        | Version | Description                      |
| ------------------ | ------- | -------------------------------- |
| **React**          | 19.1.1  | Framework UI avec hooks modernes |
| **TypeScript**     | 5.8+    | Typage statique pour JavaScript  |
| **Vite**           | 7.1+    | Build tool ultra-rapide avec HMR |
| **Tailwind CSS**   | 4.1+    | Framework CSS utility-first      |
| **React Router**   | 7.8+    | Navigation SPA                   |
| **Axios**          | 1.12+   | Client HTTP pour API             |
| **Lucide React**   | 0.542+  | Icônes modernes                  |
| **React Toastify** | 11.0+   | Notifications utilisateur        |

### ⚙️ Backend (Serveur)

| Technologie            | Version | Description                        |
| ---------------------- | ------- | ---------------------------------- |
| **Node.js**            | 22+     | Runtime JavaScript                 |
| **Express**            | 4.19+   | Framework web minimaliste          |
| **TypeScript**         | 5.6+    | Développement typé                 |
| **MySQL**              | 8.0     | Base de données relationnelle      |
| **Argon2**             | 0.44+   | Hashage sécurisé des mots de passe |
| **JWT**                | 9.0+    | Authentification par tokens        |
| **Zod**                | 4.1+    | Validation de schémas              |
| **Winston**            | 3.17+   | Logging avancé                     |
| **Express Rate Limit** | 8.1+    | Protection anti-spam               |

### 🐳 Infrastructure

- **Docker** avec multi-stage builds
- **Traefik** pour le reverse proxy et HTTPS
- **MySQL 8.0** avec persistent volumes
- **PhpMyAdmin** pour l'administration DB

---

## 📁 Structure du Projet

<details>
<summary>🔍 Cliquez pour voir la structure détaillée</summary>

```
yabara/
├── 📦 package.json                 # Configuration workspace principale
├── 📜 package-lock.json           # Lock file des dépendances
├── 🔧 .prettierrc.json            # Configuration Prettier
├── 📝 README.md / WARP.md         # Documentation
├── 🐳 docker-compose.yml          # Orchestration des services
├── 🐳 Dockerfile.client           # Build image frontend
├── 🐳 Dockerfile.server           # Build image backend
├──
├── 📁 client/                      # 🌐 APPLICATION REACT
│   ├── 📦 package.json
│   ├── 🔧 vite.config.ts          # Configuration Vite
│   ├── 🔧 tsconfig.json           # TypeScript config
│   ├── 🔧 eslint.config.js        # Linting rules
│   └── 📁 src/
│       ├── 🎯 App.tsx              # Composant racine
│       ├── 🎯 main.tsx             # Point d'entrée
│       ├── 📁 components/          # Composants réutilisables
│       ├── 📁 context/             # Contextes React
│       │   ├── AuthContext.tsx     # Gestion authentification
│       │   └── StepContext.tsx     # Gestion des étapes
│       └── 📁 utils/               # Utilitaires
│           ├── fetch.ts            # Client API
│           ├── toast.ts            # Notifications
│           └── imgAvatar.ts        # Gestion avatars
│
├── 📁 server/                      # ⚙️ API NODE.JS
│   ├── 📦 package.json
│   ├── 🔧 tsconfig.json
│   ├── 🎯 server.ts                # Point d'entrée serveur
│   ├── 📁 src/
│   │   ├── 🎯 app.ts               # Configuration Express
│   │   ├── 📁 routes/              # Définition des routes API
│   │   ├── 📁 controllers/         # Logique métier
│   │   │   ├── auth/               # Authentification
│   │   │   ├── email/              # Gestion emails
│   │   │   ├── jobFamily/          # Familles de métiers
│   │   │   └── company/            # Secteurs entreprise
│   │   ├── 📁 middleware/          # Middlewares Express
│   │   │   ├── authMiddleware.ts   # Authentification
│   │   │   ├── validateEmail.ts    # Validation emails
│   │   │   ├── validateTalent.ts   # Validation talents
│   │   │   ├── verifyTurnstile.ts  # Anti-bot Cloudflare
│   │   │   └── antiBot.ts          # Protection anti-bot
│   │   ├── 📁 models/              # Repositories & Models
│   │   │   ├── AbstractRepository.ts
│   │   │   ├── AuthRepository.ts
│   │   │   ├── EmailRepositoryRepository.ts
│   │   │   ├── JobFamilyRepository.ts
│   │   │   └── CompanySectorRepository.ts
│   │   └── 📁 types/               # Définitions TypeScript
│   ├── 📁 database/                # Configuration DB
│   │   ├── client.ts               # Connexion MySQL
│   │   └── checkConnection.ts      # Vérification connexion
│   ├── 📁 security/                # Sécurité
│   │   └── rateLimit.ts            # Limitation de taux
│   ├── 📁 utils/                   # Utilitaires serveur
│   │   ├── logger.ts               # Winston logger
│   │   └── errorHandler.ts         # Gestion d'erreurs
│   └── 📁 bin/                     # Scripts utilitaires
│       └── migrate.ts              # Migration DB
│
├── 📁 yabara_api/                  # 🧪 TESTS API (BRUNO)
│   ├── bruno.json                  # Configuration Bruno
│   ├── send_mail.bru              # Test envoi emails
│   ├── GET emails.bru             # Test récupération emails
│   ├── 📁 auth/                    # Tests authentification
│   ├── 📁 company_sector/          # Tests secteurs entreprise
│   └── 📁 jobFamily/               # Tests familles métiers
│
├── 📁 docs/                        # 📚 DOCUMENTATION
│   ├── README.md                   # Guide technique
│   └── 📁 img/                     # Schémas et diagrammes
│       └── mcd.png                 # Modèle conceptuel données
│
└── 📁 bin/                         # 🔧 SCRIPTS GLOBAUX
    └── clean.js                    # Script de nettoyage
```

</details>

---

## 🔧 Installation et Configuration

### 1️⃣ Configuration du Workspace

```bash
# Installation des dépendances de tous les workspaces
npm install

# Installation pour un workspace spécifique
npm install --workspace=client
npm install --workspace=server
```

### 2️⃣ Configuration de l'Environnement

Créez un fichier `server/.env` avec les variables suivantes :

```bash
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=yabara

# JWT
JWT_SECRET=votre_secret_jwt_ultra_securise

# API
PORT=3310
NODE_ENV=development

# Cloudflare Turnstile (anti-bot)
TURNSTILE_SECRET_KEY=votre_cle_turnstile
```

### 3️⃣ Base de Données

```bash
# Démarrer MySQL (via Docker Compose)
docker-compose up mysql -d

# Exécuter les migrations
npm run db:migrate --workspace=server
```

---

## 🚀 Commandes de Développement

### 📊 Commandes Principales

```bash
# 🌟 Démarrer l'environnement complet de développement
npm run dev

# 🎯 Démarrer uniquement le frontend (port 3000)
npm run dev:client

# ⚙️ Démarrer uniquement le backend
npm run dev:server

# 🧹 Nettoyer tous les fichiers temporaires
npm run clean
```

### 🎨 Formatage et Qualité du Code

```bash
# ✨ Formater tout le code avec Prettier
npm run format

# 🔍 Vérifier le formatage sans modifier
npm run format:check

# 🔧 Linter le code React
npm run lint --workspace=client

# 🔍 Vérifier les types TypeScript
npm run build --workspace=client    # Frontend
npm run build --workspace=server    # Backend
```

### 🏗️ Build et Production

```bash
# 📦 Build du frontend pour production
npm run build --workspace=client

# 📦 Build du backend pour production
npm run build --workspace=server

# 👀 Prévisualiser le build de production
npm run preview --workspace=client

# ▶️ Démarrer le serveur en production
npm run start --workspace=server
```

### 🗄️ Base de Données

```bash
# 🔄 Exécuter les migrations
npm run db:migrate --workspace=server

# 🐳 Démarrer seulement MySQL
docker-compose up mysql -d

# 🌐 Accéder à PhpMyAdmin
# http://localhost:8080 (en mode Docker)
```

---

## 🐳 Docker et Déploiement

### 🚀 Déploiement Complet

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs en temps réel
docker-compose logs -f

# Arrêter tous les services
docker-compose down

# Rebuild et redémarrer
docker-compose up --build -d
```

### 🌍 Services Accessibles

| Service               | URL Local             | URL Production             |
| --------------------- | --------------------- | -------------------------- |
| **Frontend**          | http://localhost:3000 | https://app.yabara.com     |
| **API**               | http://localhost:3310 | https://api.yabara.com     |
| **PhpMyAdmin**        | http://localhost:8080 | https://db.yabara.com      |
| **Traefik Dashboard** | http://localhost:8080 | https://traefik.yabara.com |

### 🔐 Configuration SSL

Le projet utilise **Traefik** avec **Let's Encrypt** pour le SSL automatique en production :

- Certificats SSL automatiques
- Redirection HTTP → HTTPS
- Renouvellement automatique des certificats

---

## 🗄️ Base de Données

### 📊 Modèle de Données

La base de données est conçue pour gérer une plateforme de recrutement complète :

#### 🏢 Tables Principales

- **`comingsoon`** : Emails des utilisateurs intéressés (landing page)
- **`talent`** : Profils des candidats
- **`company`** : Entreprises clientes
- **`company_contact`** : Utilisateurs employeurs
- **`job_offer`** : Offres d'emploi
- **`application`** : Candidatures

#### 📚 Tables de Référence

- **`company_sector`** : Secteurs d'activité
- **`job_family`** : Familles de métiers
- **`skill`** : Compétences techniques
- **`language`** : Langues

#### 🔗 Tables de Relation

- **`talent_skill`** : Compétences des talents
- **`talent_language`** : Langues parlées par les talents
- **`experience`** : Expériences professionnelles
- **`education`** : Parcours scolaires

> 📋 **Documentation complète** : Voir `docs/README.md` pour le détail de chaque table et relation.

### 🔄 Migrations

```bash
# Exécuter les migrations
npm run db:migrate --workspace=server

# Fichiers de migration dans :
server/bin/migrate.ts
```

---

## 🔗 API et Routes

### 📡 Routes Authentification

```http
POST /api/auth/signup/user     # Inscription talent
POST /api/auth/signup/company  # Inscription entreprise
```

### 📧 Routes Email Marketing

```http
POST /api/comingsoon          # Inscription newsletter (avec protection anti-bot)
```

### 👔 Routes Métiers et Secteurs

```http
GET    /api/job-families           # Liste des familles de métiers
GET    /api/job-families/:id       # Métiers d'une entreprise
POST   /api/job-families           # Créer une famille de métier
PUT    /api/job-families/:id       # Modifier une famille
DELETE /api/job-families/:id       # Supprimer une famille

GET    /api/company-sectors        # Liste des secteurs
GET    /api/company-sectors/:id    # Secteur spécifique
POST   /api/company-sectors        # Créer un secteur
PUT    /api/company-sectors/:id    # Modifier un secteur
DELETE /api/company-sectors/:id    # Supprimer un secteur
```

### 🔒 Sécurité des Routes

- **Rate Limiting** : Protection contre le spam
- **Validation Zod** : Validation stricte des données
- **Middleware anti-bot** : Honeypot + délai minimum
- **Turnstile** : Protection Cloudflare contre les bots
- **Argon2** : Hashage sécurisé des mots de passe
- **JWT** : Authentification par tokens

### 📋 Tests API avec Bruno

Utilisez les collections Bruno dans `yabara_api/` pour tester l'API :

```bash
# Installer Bruno CLI (optionnel)
npm install -g @usebruno/cli

# Tests dans le dossier yabara_api/
- send_mail.bru : Test envoi emails
- auth/ : Tests authentification
- jobFamily/ : Tests familles métiers
- company_sector/ : Tests secteurs entreprise
```

---

## 🎨 Frontend

### ⚛️ Architecture React

**Composants Principaux :**

- `App.tsx` : Composant racine avec routage
- `Navbar.tsx` : Navigation principale
- `EmailInput.tsx` : Composant d'inscription newsletter
- `StepDot.tsx` : Indicateur d'étapes

**Contextes React :**

- `AuthContext.tsx` : Gestion de l'authentification globale
- `StepContext.tsx` : Gestion des étapes de l'onboarding

**Utilitaires :**

- `fetch.ts` : Client API avec intercepteurs Axios
- `toast.ts` : Configuration des notifications
- `imgAvatar.ts` : Génération d'avatars dynamiques

### 🎨 Styling avec Tailwind CSS

- **Version** : Tailwind CSS v4 (dernière version)
- **Plugin Vite** : `@tailwindcss/vite` pour une intégration optimale
- **JIT Mode** : Compilation à la demande pour un bundle optimisé
- **Configuration personnalisée** dans `tailwind.config.js` (si créé)

### 🔄 Hot Module Replacement (HMR)

- **Vite** assure un rechargement ultra-rapide (< 100ms)
- **React Fast Refresh** : Préserve l'état des composants lors des modifications
- **Port strict** : http://localhost:3000

### 📱 Responsive Design

- Design mobile-first avec Tailwind CSS
- Breakpoints standards : `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Composants adaptatifs selon la taille d'écran

---

## 📊 Monitoring et Logs

### 📝 Logging Backend (Winston)

```javascript
// Configuration dans server/utils/logger.ts
- Logs en fichier et console
- Niveaux : error, warn, info, debug
- Format JSON en production
- Rotation automatique des fichiers
```

### 🚨 Gestion d'Erreurs

```javascript
// Middleware global dans server/utils/errorHandler.ts
- Capture toutes les erreurs Express
- Logs détaillés avec contexte de requête
- Réponses JSON standardisées
- Codes d'erreur HTTP appropriés
```

### 📈 Métriques et Performance

- **Traefik Dashboard** : Métriques du reverse proxy
- **Rate Limiting** : Monitoring des tentatives de spam
- **Database Health Check** : Vérification connexion MySQL
- **Application Health** : Route `/` pour status API

---

## 🤝 Contribution

### 🔄 Workflow Git

```bash
# 1. Créer une branche feature
git checkout -b feature/nom-de-la-feature

# 2. Développer et tester
npm run dev
npm run format:check
npm run lint --workspace=client

# 3. Commit avec message explicite
git add .
git commit -m "feat: ajout du système d'authentification"

# 4. Push et Pull Request
git push origin feature/nom-de-la-feature
```

### ✅ Hooks Git (Husky)

Le projet utilise des hooks automatiques :

- **pre-commit** : Formatage automatique avec Prettier
- **pre-push** : Vérification du formatage avant push
- Configuration dans `.husky/` et `lint-staged`

### 📋 Standards de Code

- **Prettier** : Formatage automatique obligatoire
- **ESLint** : Règles TypeScript et React strictes
- **TypeScript** : Typage strict activé
- **Commits** : Format conventionnel recommandé (`feat:`, `fix:`, `docs:`, etc.)

### 🧪 Tests

```bash
# À venir : Tests unitaires avec Vitest
npm run test --workspace=client

# À venir : Tests d'intégration API
npm run test --workspace=server

# Tests manuels API avec Bruno
# Voir collections dans yabara_api/
```

---

## 📞 Contact

### 👨‍💻 Équipe de Développement

- **Auteur Principal** : Anthony Gorski
- **Email** : [Voir GitHub](https://github.com/YabaraGroup/yabara)
- **Repository** : https://github.com/YabaraGroup/yabara

### 🐛 Signaler un Bug

1. Créez une [issue GitHub](https://github.com/YabaraGroup/yabara/issues)
2. Décrivez le problème avec détail
3. Incluez les étapes de reproduction
4. Ajoutez des captures d'écran si nécessaire

### 💡 Demande de Fonctionnalité

1. Ouvrez une [issue GitHub](https://github.com/YabaraGroup/yabara/issues)
2. Utilisez le label `enhancement`
3. Décrivez la fonctionnalité souhaitée
4. Expliquez le cas d'usage

### 🤝 Contribuer

1. Forkez le projet
2. Créez votre branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

---

## 📋 Checklist pour Nouveaux Développeurs

### ✅ Setup Initial

- [ ] Node.js 22+ installé
- [ ] Git configuré avec vos identifiants
- [ ] Repository cloné : `git clone https://github.com/YabaraGroup/yabara.git`
- [ ] Dépendances installées : `npm install`
- [ ] Environnement de développement fonctionnel : `npm run dev`

### ✅ Configuration Environment

- [ ] Fichier `server/.env` créé avec les bonnes variables
- [ ] Base de données MySQL accessible
- [ ] Migrations exécutées : `npm run db:migrate --workspace=server`
- [ ] Tests API fonctionnels avec Bruno

### ✅ Compréhension Codebase

- [ ] Structure du projet comprise
- [ ] Documentation technique lue (`docs/README.md`)
- [ ] Modèle de données étudié (MCD)
- [ ] API testée via Bruno ou Postman

### ✅ Outils de Développement

- [ ] IDE configuré avec extensions TypeScript/React
- [ ] Prettier activé pour le formatage automatique
- [ ] ESLint configuré pour le linting
- [ ] Extensions recommandées installées

---

## 🎉 Félicitations !

Vous êtes maintenant prêt à contribuer au projet **Yabara** !

Cette plateforme va révolutionner la gestion des candidatures avec une approche moderne et sécurisée. N'hésitez pas à explorer le code, tester les fonctionnalités, et proposer des améliorations.

**Happy Coding!** 🚀

---

_Dernière mise à jour : Septembre 2024 - Version 1.0.0_
