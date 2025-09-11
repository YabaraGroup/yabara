# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## À propos du projet

Yabara est une application pour gérer les candidatures, développée avec une architecture monorepo utilisant npm workspaces. Le projet contient un client React et un serveur (en cours de développement).

## Commandes essentielles

### Développement
```bash
# Démarrer l'environnement de développement complet
npm run dev

# Démarrer uniquement le client (port 3000)
npm run dev:client

# Démarrer uniquement le serveur
npm run dev:server
```

### Formatage et qualité du code
```bash
# Formater tout le code avec Prettier
npm run format

# Vérifier le formatage
npm run format:check

# Linter le client React
npm run lint --workspace=client
```

### Build et production
```bash
# Build le client pour la production
npm run build --workspace=client

# Prévisualiser le build de production
npm run preview --workspace=client
```

### Maintenance
```bash
# Nettoyer les dépendances et fichiers temporaires
npm run clean
```

## Architecture du projet

### Structure des workspaces
- **Racine** : Configuration partagée, scripts globaux, et dépendances communes
- **client/** : Application React avec Vite, Tailwind CSS, et React Router
- **server/** : Serveur Node.js (en cours de développement)

### Stack technologique

#### Client (React)
- **Framework** : React 19 avec TypeScript
- **Build** : Vite avec plugins React et Tailwind CSS  
- **Styling** : Tailwind CSS v4
- **Routing** : React Router v7
- **Icons** : Lucide React
- **Linting** : ESLint avec TypeScript et React plugins

#### Configuration des outils
- **Prettier** : Formatage automatique avec hooks pre-commit
- **Husky** : Hooks Git pour maintenir la qualité du code
- **lint-staged** : Formater uniquement les fichiers modifiés

### Patterns d'organisation du code

#### Client React
- `/src/components/` : Composants réutilisables (Avatar, Modal, Navbar, etc.)
- `/src/pages/` : Pages de l'application avec Layout principal
- Structure de routage avec pages protégées et layout partagé

## Flux de développement

### Git Workflow
- Branches principales : `dev`, `staging`  
- CI/CD automatique avec vérification du formatage sur toutes les branches
- Hooks pre-commit et pre-push pour maintenir la qualité

### Standards de code
- Utiliser Prettier pour le formatage automatique
- Respecter la configuration ESLint pour TypeScript et React
- Maintenir la structure de workspace pour une séparation client/serveur claire

## Configuration du serveur de développement
- Client : http://localhost:3000 (port strict)
- Le serveur de développement Vite utilise HMR pour un rechargement rapide
