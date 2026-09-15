# Portfolio

Portfolio personnel open source d’un développeur web avec cinq ans d’expérience. Le projet met l’accent sur une direction artistique éditoriale, une base technique lisible et une expérience rapide sur tous les écrans.

## Aperçu

La page présente le profil, une sélection de projets, le parcours professionnel, les compétences, les sujets techniques explorés et les moyens de contact. Une section Hobbies complète l’ensemble avec une liste d’articles et des vues détaillées.

## Stack

- Next.js 16 et React 19
- TypeScript strict
- App Router et Server Components par défaut
- Sass et CSS Modules
- APIs natives pour les interactions et animations
- Déploiement prévu pour Vercel

## Prérequis

- Node.js 20.9 ou plus récent
- npm 10 ou plus récent

## Installation

```bash
git clone <repository-url>
cd portfolio-2026
npm install
cp .env.example .env.local
```

Sous PowerShell, utiliser `Copy-Item .env.example .env.local` pour créer la configuration locale.

## Développement

```bash
npm run dev
```

Le site est ensuite disponible sur [http://localhost:3000](http://localhost:3000).

## Vérifications et production

```bash
npm run lint
npm run typecheck
npm run test:a11y
npm run build
npm start
```

La suite d’accessibilité utilise Playwright et axe-core. Sur une machine sans navigateur Chromium compatible, lancer une première fois `npm run test:a11y:install`.

Elle contrôle notamment les violations WCAG détectables automatiquement, la navigation au clavier, le lien d’évitement, les indicateurs de focus, les annonces dynamiques, les nouveaux onglets, le reflow à 320 px, la réduction des animations et l’accès au contenu sans JavaScript. Ces tests constituent un filet de sécurité et ne remplacent pas une recette humaine avec un lecteur d’écran.

## Structure

```text
src/
├── app/          # Routes, métadonnées, sitemap et robots
├── components/   # Sections et interactions de l’interface
├── data/         # Profil, expériences et projets
├── styles/       # Fondations SCSS, variables et mixins
└── types/        # Types TypeScript partagés
public/           # Icônes et manifeste
```

## Personnalisation

1. Copier `.env.example` vers `.env.local`.
2. Renseigner le profil, les liens publics et les textes de présentation.
3. Fournir les expériences, compétences, centres d’intérêt, projets et articles Hobbies sous forme de tableaux JSON.
4. Définir `PORTFOLIO_SITE_URL` avec l’adresse canonique du site.
5. Utiliser `PORTFOLIO_INDEXING_ENABLED="false"` pour empêcher l’indexation d’un déploiement privé ou personnel.
6. Remplacer les visuels CSS par des captures optimisées avec `next/image` si nécessaire.

Les valeurs de démonstration intégrées au code permettent toujours de lancer le projet sans fichier d’environnement. `.env.local` est ignoré par Git et ne doit jamais être publié.

## Déploiement sur Vercel

Importer le repository dans Vercel. Le framework et les commandes sont détectés automatiquement :

- Build : `npm run build`
- Dossier de sortie : géré par Next.js
- Version de Node.js : 20.9 minimum

Ajouter les variables `PORTFOLIO_*` dans les paramètres du projet Vercel. Sans `PORTFOLIO_SITE_URL`, le site utilise automatiquement `VERCEL_PROJECT_PRODUCTION_URL` pour les métadonnées, le sitemap et le fichier robots.

L’indexation reste active par défaut. Pour la désactiver sur un déploiement précis sans modifier le projet générique, ajouter `PORTFOLIO_INDEXING_ENABLED=false` dans Vercel puis redéployer.

## Licence

Le code source est distribué sous licence MIT. Les contenus personnels, textes de projets et éléments de marque ajoutés ultérieurement restent la propriété de leur auteur.
