# CLAUDE.md — nuxt-vuetify-query-boilerplate

Boilerplate personnel, transposition Nuxt de `next-mui-query-boilerplate`. Les conventions générales sont dans `~/.claude/CLAUDE.md` : ce fichier ne note que les choix propres au projet.

## Choix du projet

- **Type** : application Nuxt 4 en rendu serveur. `srcDir` = `app/`, l'alias `@/` pointe sur `app/`.
- **Routage** : `app/pages/` ne contient que des fichiers qui délèguent à une vue de `app/domains/` (plus `definePageMeta` et l'appel SEO). `app/error.vue` sert la 404 et la 500.
- **Imports explicites** : `imports.autoImport: false`. Vue s'importe depuis `vue`, les composables Nuxt depuis `#imports`. Exception : `server/` garde les auto-imports Nitro (voir les pièges).
- **Design system** : Vuetify 4 branché à la main (plugin `app/core/providers/vuetify.ts` + `vite-plugin-vuetify` en `autoImport`). Thème dans `app/core/theme/theme.ts`, tokens CSS et mode renforcé dans `app/core/theme/global.css`. Thème clair forcé (`defaultTheme: 'light'`, Vuetify 4 suit sinon le système).
- **Données** : TanStack Vue Query. Un `QueryClient` par requête serveur et par navigateur (`app/core/providers/vueQuery.ts`), état déshydraté dans le payload Nuxt et réhydraté au démarrage. Les blocs SEO (articles de l'accueil, catalogue) sont préchargés côté serveur par `onServerPrefetch(() => query.suspense())`. Les tâches restent chargées côté client, comme dans le modèle.
- **Devtools TanStack** : rendus dans `app.vue`. Le paquet n'exporte qu'un stub vide hors condition `development`, ils n'existent donc qu'en `nuxt dev`.
- **Formulaires** : vee-validate + zod 4, schéma dans `common/models/` du domaine. L'adaptateur `app/features/forms/toTypedSchema.ts` remplace `@vee-validate/zod`. Les chemins d'erreur suivent la notation de vee-validate (`contacts[1].email`). Limites de l'adaptateur : ni `cast` (pas de valeurs par défaut tirées du schéma), ni `describe` (`meta.required` reste faux), et une erreur portée par une union ou un `refine` au niveau de l'objet arrive sur le chemin vide, donc au niveau du formulaire et non d'un champ.
- **Icônes** : `@mdi/js`, uniquement via `app/core/ui/ui-kit/Icon.vue` (règle ESLint). Les icônes internes de Vuetify passent par le jeu `mdi-svg`, qui embarque ses propres tracés.
- **Carrousel** : Embla Carousel 8 (`embla-carousel-vue` + `embla-carousel-wheel-gestures` pour la molette et le trackpad), importé uniquement dans `app/features/carousel/`.
- **Police** : Inter servie localement par `@nuxt/fonts` (téléchargée au build, `font-display: swap`, latin, graisses 400 à 700). Unité de police : `px`, multipliée par `--app-font-scale` (1 ou 1,25 en mode renforcé).
- **Conteneur** : 1440 px, gouttières 16/24/32 px (`.app-container` dans `global.css`).
- **Langue** : français uniquement, URLs en français.
- **API** : aucune. Les dépôts `api/` des domaines renvoient des données en mémoire avec 300 ms de latence simulée côté navigateur seulement (`import.meta.client`) : au rendu serveur, le dépôt est local et la latence n'allongerait que le TTFB. `make api-types` génère `app/core/api/schema.d.ts` quand `API_SCHEMA_URL` est renseigné.
- **Cibles tactiles** : 44 px minimum (`VBtn` `minHeight: 44`, liens et contrôles natifs à `min-height: 44px`).
- **Sans JavaScript** : le script de démarrage pose `html[data-js]`. Les classes `.requires-js` et `.no-js-only` basculent les variantes sans décalage à l'hydratation (bouton Catalogue ou lien, bouton Appliquer les filtres, panneau mobile).
- **Outils de développement** : `runtimeConfig.public.devTools` (vrai en `nuxt dev`, faux au build, réactivable par `NUXT_PUBLIC_DEV_TOOLS=true`) ouvre `/charte-graphique` et `/_erreur-test`. En production, les deux répondent 404.
- **Menu de catégories** : Tab et Maj+Tab ouvrent les colonnes au focus, Échap ferme et rend le focus au bouton, un clic extérieur ferme. Les flèches ne sont pas gérées (bonus de la spec non retenu).
- **Déclaration d'accessibilité** : libellée « Déclaration d’accessibilité » dans la navigation, le fil d'Ariane et le plan du site. L'état de conformité, calculé depuis `SITE.accessibility`, n'apparaît que dans le lien du footer (`footerLabel`).
- **Erreurs** : aucune n'est avalée. Les composables de données journalisent l'erreur d'origine (`console.error`) puis lèvent l'erreur métier avec `cause`. L'échec d'écriture du mode renforcé est journalisé en `console.warn`. Les `.catch()` du schéma d'URL zod ne sont pas des erreurs : ils appliquent la règle « valeurs invalides ignorées ».
- **Ciblage e2e** : les éléments interactifs sont trouvés par `data-testid`, complété par `href` quand plusieurs liens partagent le même identifiant (`linkTo` dans `tests/support/page.ts`), jamais par leur texte.
- **Maintenance** : `MAINTENANCE=1` à l'exécution fait répondre 503 sur toutes les routes, avec `Retry-After` et une page HTML autonome (`server/middleware/maintenance.ts`).

## Ports

| Usage                                                   | Port |
| ------------------------------------------------------- | ---- |
| `make up` (dev)                                         | 3010 |
| Playwright, build avec outils de dev                    | 3110 |
| Playwright, build de production (404 des routes de dev) | 3111 |
| Lighthouse CI                                           | 3210 |

## Versions épinglées, et pourquoi

Node imposé : 24.14 (`.nvmrc`). Plusieurs paquets récents exigent 24.15.

| Paquet                              | Version | Raison                                                                                                                                 |
| ----------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `nuxt`                              | `4.5.2` | Nuxt 4.6.0 exige Node `^24.15.0`                                                                                                       |
| `eslint-plugin-regexp` (résolution) | `3.1.1` | 3.2+ tire `jsdoc-type-pratt-parser` 9, qui exige Node 24.15. 3.1.1 satisfait le `^3.1.1` de `@nuxt/eslint-config`                      |
| `@vue/test-utils` (résolution)      | `2.4.6` | 2.5 tire `js-beautify` 2, puis `nopt` 10 et `abbrev` 5, qui exigent Node 24.15. Pas de dépendance directe : Testing Library l'embarque |
| `jsdom`                             | `^29`   | jsdom 30 exige Node 24.15                                                                                                              |
| `typescript`                        | `~6.0`  | typescript-eslint 8 ne supporte pas TypeScript 7 (`peer <6.1`)                                                                         |
| `vite`                              | `^8`    | peer de Vitest 5                                                                                                                       |
| `vee-validate`                      | `^4.15` | dernière stable. La 5 (Standard Schema) est en bêta                                                                                    |

`openapi-typescript` 7 déclare un peer `typescript@^5` : l'avertissement est sans effet, `make api-types` a été vérifié avec TypeScript 6.

## Dépendances ajoutées par rapport au modèle

- `embla-carousel`, `embla-carousel-vue`, `embla-carousel-wheel-gestures` : carrousel imposé par la spec commune (glisser, swipe, molette). `embla-carousel` est déclaré en direct parce que le plugin de molette l'attend en peer, il est dédupliqué avec celui de l'adaptateur Vue.
- `@nuxt/fonts` : équivalent de `next/font`, police servie localement.
- `vite-plugin-vuetify`, `@vitejs/plugin-vue` : import à la demande des composants Vuetify, au build et dans Vitest.

## Règles ESLint propres au projet

- `@typescript-eslint/no-namespace` avec `allowDeclarations` : les types sont en `export declare namespace Xxx {}`.
- `no-restricted-imports` : chemins relatifs au-delà d'un niveau interdits, `@mdi/js` interdit hors du wrapper `Icon.vue`, import profond d'un domaine (`@/domains/x/...`) interdit partout sauf dans ce domaine lui-même. Une entrée de configuration par domaine (lue dans `app/domains/`) autorise son propre dossier et bloque les autres.
- `import/order` (fourni par `eslint-plugin-import-x`, déjà inclus dans `@nuxt/eslint-config`) : externes, puis `#imports` et autres alias Nuxt, puis `@/`, puis relatifs, puis types.
- Règles TypeScript limitées aux fichiers `.ts` et `.vue` : sinon `consistent-type-imports` exige des informations de type sur `eslint.config.mjs`.
- `vue/multi-word-component-names` coupée pour `Icon.vue` seulement : le nom est imposé et ne masque aucun élément HTML.
- `vue/require-default-prop` coupée : une prop TypeScript optionnelle vaut déjà `undefined`.
- `vue/html-self-closing` coupée : Prettier écrit `<img />` et la règle réclame `<img>`, le formatage revient à Prettier.

## Pièges connus

- **`:global()` en CSS scopé Vue** : `:global(html[data-js]) .header-nav` se compile en `html[data-js]` seul et a masqué toute la page sous 1024 px. Un sélecteur d'ancêtre ordinaire suffit en CSS scopé (`html[data-js] .header-nav`), seul le dernier sélecteur reçoit l'attribut de portée.
- **Auto-imports serveur** : le projet TypeScript `app` vérifie aussi `server/routes/*` (les types de `$fetch` importent les handlers), avec le `#imports` de l'app. Les routes serveur utilisent donc les auto-imports Nitro (`nitro.imports.autoImport: true`). Conséquence : `defineEventHandler` et consorts sont visibles en type global côté app, sans exister à l'exécution.
- **Fil d'Ariane en SSR** : le layout est rendu avant la page, il ne peut pas attendre une donnée posée par la vue. Le fil est calculé depuis la route et la config (navigation + arbre des catégories, dans `core/config`), la 404 fournit son libellé à `AppShell`.
- **Vuetify et les attributs** : `VTextField` envoie les `data-*` sur sa racine et ne pose pas `aria-invalid`. Le `data-testid` est donc sur le conteneur du champ (les tests ciblent le `textbox` à l'intérieur), et `aria-invalid` est passé par `defineField`. `aria-describedby` vers le message d'erreur est posé par Vuetify.
- **`NuxtLink` et `aria-current`** : tout lien exactement actif reçoit `aria-current="page"`, y compris dans la pagination pendant le chargement de la page suivante. Les tests ciblent le `span` de la page courante.
- **Contraste Vuetify** : l'opacité « medium emphasis » par défaut (0,60) donne 3,97:1 sur les libellés de champs. Elle est montée à 0,74 dans le thème clair.
- **Spinner de `VBtn`** : sans nom accessible (`aria-progressbar-name`). Les boutons `loading` fournissent un slot `loader` avec `aria-label`.
- **jsdom** : pas de `ResizeObserver` (utilisé par `VTextarea`), stub dans `vitest.setup.ts`.
- **Hydratation et e2e** : un plugin client pose `html[data-hydrated]` à la fin de l'hydratation. Les tests l'attendent (`gotoHydrated`) au lieu de rejouer les clics.
- **Démarrage léger** : seuls les chunks d'entrée sont préchargés (hook `build:manifest`), les autres arrivent par le graphe d'import. Lighthouse compte les `modulepreload` de haute priorité comme bloquants pour le premier rendu : le FCP est passé de 2,7 s à 1,8 s. `NuxtLink` ne précharge qu'à l'interaction (`experimental.defaults.nuxtLink.prefetchOn`), sinon chaque lien visible télécharge et évalue une autre page pendant le chargement.
- **Hydratation différée** : footer et carrousel s'hydratent à la visibilité (`defineLazyHydrationComponent`). Les menus restent hydratés tout de suite : à l'interaction, le premier clic n'était pas rejoué de façon fiable. Avant le montage d'Embla, la piste du carrousel défile nativement et reste donc focalisable (`tabindex="0"`, règle axe `scrollable-region-focusable`).
- **Carrousel** : seule la première diapositive porte son image au rendu serveur. Les autres affichent une réserve au bon ratio jusqu'au montage d'Embla, puis leur `<picture>`. Sans cela, Chrome charge les images proches dans un conteneur défilant en même temps que le hero et retarde le LCP. Sans JavaScript, un `<noscript>` (`data-allow-mismatch="children"`) fournit les images.
- **Compression** : le serveur Node de Nitro ne compresse rien. Les assets sont précompressés au build (`compressPublicAssets`), le HTML est compressé par `server/plugins/compressHtml.ts`. Derrière un proxy qui compresse, ce plugin devient inutile.
- **Lighthouse** : 3 passages par URL, assertions sur la médiane (`aggregationMethod: "median-run"`). Par défaut lhci agrège en optimiste (meilleur passage), ce qui masquait les régressions. Les runners GitHub sont plus lents que le poste : mesurer en local avec `--throttling.cpuSlowdownMultiplier=8` pour s'en approcher.
- **Images responsives** : des variantes intermédiaires sont dérivées des médias partagés (`hero-828` et `hero-960`, `slide-N-750` et `slide-N-960`, `product-N-640`), avec une qualité calibrée pour reproduire la taille des originaux à résolution égale (AVIF q40 à q53, WebP q77). Les `sizes` décrivent la largeur réelle affichée. Sans ces variantes, le mobile (DPR 1,75) tirait les 1280 et 800, deux fois trop lourdes.
- **Lighthouse et Chrome** : lancés avec `--no-sandbox` (Ubuntu restreint les user namespaces). Les rapports restent en local (`.lighthouseci/`).
- **Mode renforcé** : les espacements WCAG 1.4.12 ne visent que le texte de contenu de `<main>` (`p`, `li`, `dd`, `dt`, `td`, `th` hors `nav` et `.a11y-chrome`). Le header garde sa structure (test : hauteur ≤ 1,4 fois la normale).
