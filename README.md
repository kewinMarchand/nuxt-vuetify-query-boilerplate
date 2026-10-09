# nuxt-vuetify-query-boilerplate

Point de départ pour une application **Nuxt 4** en rendu serveur avec **Vuetify**, **TanStack Query**, **vee-validate + zod**, et toute la chaîne qualité : lint, format, types, tests unitaires, end-to-end, accessibilité et Lighthouse.

Les pages de démonstration montrent chaque brique en situation :

| Page                | Ce qu'elle montre                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `/`                 | Hero pleine largeur, carrousel Embla accessible, articles chargés côté serveur avec TanStack Query          |
| `/taches`           | Chargement côté client avec TanStack Query et ses trois états : chargement, erreur avec relance, liste vide |
| `/contact`          | Formulaire validé par un schéma zod, erreurs liées aux champs, envoi par mutation TanStack Query            |
| `/catalogue/...`    | Liste à facettes : filtres, tri, pagination et vue dans l'URL, rendu serveur, fonctionne sans JavaScript    |
| Pages légales       | Mentions légales, données personnelles, déclaration d'accessibilité calculée depuis la config, plan du site |
| `/charte-graphique` | Charte graphique vivante (tokens, composants, icônes), en développement uniquement                          |

## Stack

| Brique                                    | Rôle                                                    |
| ----------------------------------------- | ------------------------------------------------------- |
| Nuxt 4 (SSR), Vue 3                       | Routage, rendu serveur, SEO, routes serveur             |
| TypeScript 6 (strict), vue-tsc            | Typage                                                  |
| Vuetify 4                                 | Design system, thème dans `app/core/theme/theme.ts`     |
| TanStack Vue Query 5                      | Cache et synchronisation des données, compatible SSR    |
| vee-validate + zod 4                      | Formulaires, validation et types dérivés du même schéma |
| Embla Carousel 8                          | Carrousel (glisser, swipe, molette), via `features/`    |
| @mdi/js                                   | Icônes, via le wrapper `Icon`                           |
| @nuxt/fonts                               | Police Inter servie localement                          |
| ESLint 10 (@nuxt/eslint), Prettier, Husky | Qualité du code, vérifiée à chaque commit               |
| Vitest 5 + Testing Library                | Tests unitaires et fonctionnels                         |
| Playwright + axe-core                     | Tests end-to-end et accessibilité, desktop et mobile    |
| Lighthouse CI                             | Performance, accessibilité, SEO, bonnes pratiques       |

## Prérequis

- Node.js 24.14 ou plus (`.nvmrc`)
- Yarn 1
- Docker, pour l'image de production (optionnel)

## Démarrage

```sh
git clone https://github.com/kewinMarchand/nuxt-vuetify-query-boilerplate.git
cd nuxt-vuetify-query-boilerplate
cp .env.example .env
make install   # dépendances + navigateur Chromium des tests e2e
make up        # http://localhost:3010
```

Variables d'environnement (`.env`) :

| Variable                | Rôle                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `NUXT_PUBLIC_SITE_URL`  | URL publique, utilisée pour les URL canoniques, Open Graph, le sitemap et le JSON-LD |
| `API_SCHEMA_URL`        | Schéma OpenAPI de l'API consommée, lu par `make api-types`                           |
| `MAINTENANCE`           | `1` pour servir la page de maintenance (503) sur toutes les routes                   |
| `NUXT_PUBLIC_DEV_TOOLS` | `true` pour ouvrir la charte graphique et la route de test de la 500 hors dev        |

## Commandes

`make help` liste toutes les commandes. Les principales :

| Commande                               | Effet                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------- |
| `make up`                              | Serveur de développement sur le port 3010                                         |
| `make build` / `make start`            | Build de production, puis le servir                                               |
| `make qa`                              | QA rapide : lint, format, types, tests unitaires                                  |
| `make qa-full`                         | QA complète : QA rapide, e2e, accessibilité, Lighthouse                           |
| `make test-unit`                       | Vitest                                                                            |
| `make test-e2e`                        | Playwright, desktop et mobile                                                     |
| `make test-a11y`                       | axe-core, WCAG 2.1 AA, sur chaque page, en mode normal et renforcé                |
| `make metrics`                         | Lighthouse CI : échoue sous 90 en performance ou sous 100 en accessibilité et SEO |
| `make api-types`                       | Génère `app/core/api/schema.d.ts` depuis `API_SCHEMA_URL`                         |
| `make docker-build` / `make docker-up` | Image de production, sur le port `PORT` (3010 par défaut)                         |

## Architecture

```
app/
  pages/       routeur uniquement : chaque page délègue à une vue de domains/
  error.vue    pages 404 et 500, dans le layout du site
  domains/     un dossier par domaine de page, avec sa logique métier
    catalog/
      api/               accès aux données (ici en mémoire)
      common/models/     types, schéma d'URL zod, fonctions pures de filtre et de tri
      common/exceptions/
      services/          règles métier (construction d'une page de catalogue)
      ui/                composants, dont la vue rendue par la page
      ui/composables/    état, effets et appels (useCatalog)
      index.ts           seul export public du domaine
  features/    briques agnostiques du métier : carrousel, adaptateur de formulaire
  core/        socle : config, thème, providers, SEO, mode renforcé, layouts, ui-kit
server/        robots.txt, sitemap.xml, maintenance, compression du HTML
tests/
  e2e/         un fichier par page ou par brique transverse
  a11y/        audit axe de chaque page, dans les deux modes
  support/     routes testées, ports, actions partagées
```

Le sens des dépendances est `domains/` vers `features/` vers `core/`, jamais l'inverse. Hors de son propre dossier, un domaine ne s'importe que par son `index.ts`, et une règle ESLint le vérifie.

Les conventions de code viennent du `CLAUDE.md` global de l'auteur. Le `CLAUDE.md` de ce dépôt note les choix propres au projet, les versions épinglées et les pièges connus.

## Recettes

### Ajouter une page

1. Créer le domaine `app/domains/<nom>/` avec sa vue `ui/<Nom>View.vue` et son `index.ts`.
2. Créer `app/pages/<route>.vue`, qui appelle `usePageSeo` et rend la vue.
3. Ajouter la route à `app/core/config/navigation.ts` (menu, plan du site, sitemap et fil d'Ariane) et à `tests/support/routes.ts` (tests de réponse, de SEO, d'accessibilité et de débordement).
4. Écrire `tests/e2e/<route>.e2e.ts` et ajouter l'URL à `.lighthouserc.json`.

### Charger des données avec TanStack Query

Le pattern est dans `app/domains/tasks/` :

- `api/tasksRepository.ts` fournit la donnée. Pour brancher une vraie API, remplacer son contenu par un appel typé, sans toucher à l'UI.
- `ui/composables/useTasks.ts` encapsule `useQuery`, avec une clé de cache exportée et une erreur métier (`TasksLoadError`).
- `ui/TaskList.vue` affiche les trois états à partir de props, ce qui le rend testable sans réseau.
- `ui/TasksPanel.vue` relie le composable au composant d'affichage.

Pour un contenu à indexer, ajouter `onServerPrefetch(() => query.suspense())` dans le composable (voir `useLatestArticles` et `useCatalog`) : la requête est faite au rendu serveur et réhydratée au démarrage.

### Ajouter un champ de formulaire

1. Ajouter le champ et son message d'erreur dans `app/domains/contact/common/models/contactSchema.ts`. Le type du formulaire en découle.
2. Ajouter `defineField('champ', FIELD_CONFIG)` dans `useContactForm.ts`, puis le `v-text-field` dans `ContactForm.vue` avec `v-model` et `v-bind`. Vuetify relie le message au champ par `aria-describedby`.

### Ajouter une icône

Importer l'icône `@mdi/js` dans `app/core/ui/ui-kit/Icon.vue` et l'ajouter à `ICONS`. Ne jamais importer `@mdi/js` ailleurs, ESLint le refuse.

### Ajouter une catégorie au catalogue

Modifier l'arbre `CATEGORY_TREE` de `app/core/config/categories.ts`. Menu, fil d'Ariane, plan du site et sitemap en découlent.

## Tests

- **Unitaires et fonctionnels** : fichiers `*.test.ts` à côté du code testé.
- **End-to-end** : Playwright sert le build de production sur le port 3110 (outils de dev activés) et 3111 (production stricte, pour vérifier les 404 de la charte et de la route de test). Les éléments sont ciblés par `data-testid`, préfixé par le domaine (`tasks-list`, `catalog-sort`). Chaque rendu conditionnel est testé présent et absent. Les tests attendent la fin de l'hydratation (`html[data-hydrated]`).
- **Accessibilité** : `tests/a11y/` passe axe-core sur chaque route, les pages d'erreur et le menu ouvert, en mode normal et renforcé. Axe ne couvre qu'une partie du RGAA, un audit manuel reste nécessaire.
- **Captures** : `tests/e2e/captures.e2e.ts` enregistre l'accueil et le catalogue à 375, 768 et 1280 px dans les deux modes, dans `test-results/`.

## Intégration continue

`.github/workflows/ci.yml` lance `make qa`, puis les tests e2e, accessibilité et Lighthouse, à chaque push sur `main` et sur chaque pull request. En cas d'échec, le rapport Playwright est joint au run.

## Licence

MIT
