# CLAUDE.md — nuxt-vuetify-query-boilerplate

Boilerplate personnel, transposition Nuxt de `next-mui-query-boilerplate`. Les conventions générales sont dans `~/.claude/CLAUDE.md` : ce fichier ne note que les choix propres au projet.

## Choix du projet

- **Type** : application Nuxt 4 en rendu serveur. `srcDir` = `app/`, l'alias `@/` pointe sur `app/`.
- **Architecture** : quatre racines, la couche de routage (`app/pages/`, `app/app.vue`, `app/error.vue`, `server/`), `app/views/` (pages sans métier ou qui composent des modules : `home`, `legal`, `errors`, `styleguide`), `app/modules/` (`catalog`, `blog`, `contact`, `task`, en forme réduite sans `application/` à cette étape), `app/shared/` (socle). Application du document d'architecture commun (D1 à D12), au plus près de la refonte SvelteKit. Le socle s'appelle `app/shared/` : Nuxt 4 réserve un dossier `shared/` **à la racine du projet** (code commun app et serveur), le nôtre est à l'intérieur de `app/` et n'a rien à voir avec lui.
- **Routage** : `app/pages/` ne contient que des fichiers qui délèguent à une vue de `app/views/` ou d'un module (plus `definePageMeta` et l'appel SEO). `app/error.vue` sert la 404 et la 500 et délègue l'affichage à `app/views/errors/`. Les dossiers scannés par Nuxt (`pages/`, et aucun `components/` ni `composables/`) restent ceux du framework : les auto-imports restent désactivés, rien n'est découvert par convention dans `views/`, `modules/` ni `shared/`.
- **Imports explicites** : `imports.autoImport: false`. Vue s'importe depuis `vue`, les composables Nuxt depuis `#imports`. Exception : `server/` garde les auto-imports Nitro (voir les pièges).
- **Design system** : Vuetify 4 branché à la main (plugin `app/shared/providers/vuetify.ts` + `vite-plugin-vuetify` en `autoImport`). Thème dans `app/shared/theme/theme.ts`, tokens CSS et mode renforcé dans `app/shared/theme/global.css`. Thème clair forcé (`defaultTheme: 'light'`, Vuetify 4 suit sinon le système).
- **Données** : TanStack Vue Query. Un `QueryClient` par requête serveur et par navigateur (`app/shared/providers/vueQuery.ts`), état déshydraté dans le payload Nuxt et réhydraté au démarrage. Les blocs SEO (articles de l'accueil, catalogue) sont préchargés côté serveur par `onServerPrefetch(() => query.suspense())`. Les tâches restent chargées côté client, comme dans le modèle.
- **Devtools TanStack** : rendus dans `app.vue`. Le paquet n'exporte qu'un stub vide hors condition `development`, ils n'existent donc qu'en `nuxt dev`.
- **Formulaires** : vee-validate + zod 4, schéma dans `domain/` du module. L'adaptateur `app/shared/forms/toTypedSchema.ts` remplace `@vee-validate/zod`. Les chemins d'erreur suivent la notation de vee-validate (`contacts[1].email`). Limites de l'adaptateur : ni `cast` (pas de valeurs par défaut tirées du schéma), ni `describe` (`meta.required` reste faux), et une erreur portée par une union ou un `refine` au niveau de l'objet arrive sur le chemin vide, donc au niveau du formulaire et non d'un champ.
- **Icônes** : `@mdi/js`, uniquement via `app/shared/ui/kit/Icon.vue` (règle ESLint). Les icônes internes de Vuetify passent par le jeu `mdi-svg`, qui embarque ses propres tracés.
- **Carrousel** : Embla Carousel 8 (`embla-carousel-vue` + `embla-carousel-wheel-gestures` pour la molette et le trackpad), importé uniquement dans `app/shared/ui/carousel/` (règle ESLint).
- **Police** : Inter servie localement par `@nuxt/fonts` (téléchargée au build, `font-display: swap`, latin, graisses 400 à 700). Unité de police : `px`, multipliée par `--app-font-scale` (1 ou 1,25 en mode renforcé).
- **Conteneur** : 1440 px, gouttières 16/24/32 px (`.app-container` dans `global.css`).
- **Langue** : français uniquement, URLs en français.
- **API** : aucune. Les dépôts `infrastructure/` des modules renvoient des données en mémoire avec 300 ms de latence simulée côté navigateur seulement (`import.meta.client`) : au rendu serveur, le dépôt est local et la latence n'allongerait que le TTFB. `make api-types` génère `app/shared/api/schema.d.ts` quand `API_SCHEMA_URL` est renseigné. Seule la couche `infrastructure/` des modules a le droit d'importer ces types (règle ESLint).
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

- `@boundaries/eslint-plugin` 7.2 (dev, aucun effet sur le bundle) : vérifie les règles de dépendance entre couches et modules (D6). Contrairement à `no-restricted-imports`, qui compare la chaîne d'import, il résout le chemin réel : un import relatif `../infrastructure/x` ne le contourne pas. Nouveau nom de `eslint-plugin-boundaries`. Même choix que la référence SvelteKit.
- `eslint-import-resolver-typescript` 4.4 (dev) : résolveur demandé par le plugin pour suivre l'alias `@/` via les tsconfig générés par Nuxt.
- `embla-carousel`, `embla-carousel-vue`, `embla-carousel-wheel-gestures` : carrousel imposé par la spec commune (glisser, swipe, molette). `embla-carousel` est déclaré en direct parce que le plugin de molette l'attend en peer, il est dédupliqué avec celui de l'adaptateur Vue.
- `@nuxt/fonts` : équivalent de `next/font`, police servie localement.
- `vite-plugin-vuetify`, `@vitejs/plugin-vue` : import à la demande des composants Vuetify, au build et dans Vitest.

## Règles ESLint propres au projet

- `@typescript-eslint/no-namespace` avec `allowDeclarations` : les types sont en `export declare namespace Xxx {}`.
- `boundaries/dependencies` (refus par défaut) : routage vers vues, index des modules et socle. Vues vers index des modules et socle. Index d'un module vers ses propres couches. `domain/` vers son module et les types du socle (`import type` seulement). `application/` vers domaine et infrastructure du module, et types du socle. `infrastructure/` vers domaine et infrastructure du module et `shared/api`. `ui/` vers domaine, application, interface du module et socle, plus infrastructure si le module n'a pas d'`application/` (liste calculée en lisant le disque). Socle vers socle seulement. La valeur capturée `module` interdit tout import d'un module à l'autre. Le résolveur lit les deux tsconfig générés par Nuxt (`.nuxt/tsconfig.app.json` et `.nuxt/tsconfig.server.json`) : le `tsconfig.json` racine n'a que des références et l'alias `@/` n'y est pas résolu, ce qui rendait les règles muettes sans erreur (l'auto-test l'a montré).
- Transitoire, retiré à l'étape suivante : `infrastructure/` peut importer des valeurs du socle, parce que l'arbre des catégories est encore dans `shared/config/categories.ts`.
- Le dossier `app` lui-même est déclaré comme routage, en dernier : les motifs d'éléments du plugin désignent des dossiers, `app/*.vue` n'est pas reconnu, et c'est la seule façon de classer `app.vue` et `error.vue` sans déplacer des fichiers que Nuxt attend à cet endroit. Les descripteurs plus précis (modules, socle, vues, pages) passent avant.
- `no-restricted-imports` :
  - frameworks interdits dans `domain/` (`vue`, `vue-router`, `nuxt`, `#app`, `#imports`, `#components`, `@tanstack/*`, `vuetify`, `vee-validate`). Les motifs `#...` sont écrits `\#...` : la syntaxe gitignore de la règle lit un `#` initial comme un commentaire, et la règle était muette sur les imports virtuels de Nuxt (l'auto-test l'a montré).
  - `@mdi/js` interdit hors du wrapper `Icon.vue`.
  - `embla-carousel*` interdit hors de `shared/ui/carousel/`.
  - chemins relatifs à plus d'un niveau interdits.
- `make arch-selftest` (`tools/archSelftest.ts`, lancé par `make qa`) : écrit une violation volontaire de chaque règle (domaine vers infrastructure par chemin relatif, domaine vers framework et vers `#imports`, module vers module, socle vers module en `.ts` et dans un composant `.vue`, vue vers l'intérieur d'un module, routage serveur et routage racine `app/*.vue` vers l'intérieur d'un module, types générés hors infrastructure), exige l'échec d'ESLint avec le message attendu, puis retire le fichier.
- `no-console` désactivé dans `tools/` : outils en ligne de commande dont la sortie est le résultat.
- `import/order` (fourni par `eslint-plugin-import-x`, déjà inclus dans `@nuxt/eslint-config`) : externes, puis `#imports` et autres alias Nuxt, puis `@/`, puis relatifs, puis types.
- Règles TypeScript limitées aux fichiers `.ts` et `.vue` : sinon `consistent-type-imports` exige des informations de type sur `eslint.config.mjs`.
- `vue/multi-word-component-names` coupée pour `Icon.vue` seulement : le nom est imposé et ne masque aucun élément HTML.
- `vue/require-default-prop` coupée : une prop TypeScript optionnelle vaut déjà `undefined`.
- `vue/html-self-closing` coupée : Prettier écrit `<img />` et la règle réclame `<img>`, le formatage revient à Prettier.

## Pièges connus

- **`:global()` en CSS scopé Vue** : `:global(html[data-js]) .header-nav` se compile en `html[data-js]` seul et a masqué toute la page sous 1024 px. Un sélecteur d'ancêtre ordinaire suffit en CSS scopé (`html[data-js] .header-nav`), seul le dernier sélecteur reçoit l'attribut de portée.
- **Auto-imports serveur** : le projet TypeScript `app` vérifie aussi `server/routes/*` (les types de `$fetch` importent les handlers), avec le `#imports` de l'app. Les routes serveur utilisent donc les auto-imports Nitro (`nitro.imports.autoImport: true`). Conséquence : `defineEventHandler` et consorts sont visibles en type global côté app, sans exister à l'exécution.
- **Fil d'Ariane en SSR** : le layout est rendu avant la page, il ne peut pas attendre une donnée posée par la vue. Le fil est calculé depuis la route et la config (navigation + arbre des catégories, dans `shared/config` à cette étape), la 404 fournit son libellé à `AppShell`.
- **Vuetify et les attributs** : `VTextField` envoie les `data-*` sur sa racine et ne pose pas `aria-invalid`. Le `data-testid` est donc sur le conteneur du champ (les tests ciblent le `textbox` à l'intérieur), et `aria-invalid` est passé par `defineField`. `aria-describedby` vers le message d'erreur est posé par Vuetify.
- **`NuxtLink` et `aria-current`** : tout lien exactement actif reçoit `aria-current="page"`, y compris dans la pagination pendant le chargement de la page suivante. Les tests ciblent le `span` de la page courante.
- **Contraste Vuetify** : l'opacité « medium emphasis » par défaut (0,60) donne 3,97:1 sur les libellés de champs. Elle est montée à 0,74 dans le thème clair.
- **Spinner de `VBtn`** : sans nom accessible (`aria-progressbar-name`). Les boutons `loading` fournissent un slot `loader` avec `aria-label`.
- **jsdom** : pas de `ResizeObserver` (utilisé par `VTextarea`), stub dans `vitest.setup.ts`.
- **Hydratation et e2e** : un plugin client pose `html[data-hydrated]` à la fin de l'hydratation. Les tests l'attendent (`gotoHydrated`) au lieu de rejouer les clics.
- **Démarrage léger** : seuls les chunks d'entrée sont préchargés (hook `build:manifest`), les autres arrivent par le graphe d'import. Lighthouse compte les `modulepreload` de haute priorité comme bloquants pour le premier rendu : le FCP est passé de 2,7 s à 1,8 s. `NuxtLink` ne précharge qu'à l'interaction (`experimental.defaults.nuxtLink.prefetchOn`), sinon chaque lien visible télécharge et évalue une autre page pendant le chargement.
- **Hydratation différée** : footer et carrousel s'hydratent à la visibilité (`defineLazyHydrationComponent`). Les menus restent hydratés tout de suite : à l'interaction, le premier clic n'était pas rejoué de façon fiable. Avant le montage d'Embla, la piste du carrousel défile nativement et reste donc focalisable (`tabindex="0"`, règle axe `scrollable-region-focusable`).
- **Carrousel** : seule la première diapositive porte son image au rendu serveur. Les autres affichent une réserve au bon ratio jusqu'au montage d'Embla, puis leur `<picture>`. Sans cela, Chrome charge les images proches dans un conteneur défilant en même temps que le hero et retarde le LCP. Sans JavaScript, un `<noscript>` (`data-allow-mismatch="children"`) fournit les images.
- **Police de repli ajustée (« Inter Fallback »)** : sans elle, la CI (Ubuntu, repli DejaVu Sans, bien plus large qu'Inter) mesurait un CLS de 0,33 à 0,36 : les textes changeaient de ligne à l'arrivée d'Inter. En local, le repli Noto Sans masquait le problème. `@nuxt/fonts` ne génère pas ce repli pour une famille `global: true` (`resolveFontFace` renvoie vide), et sans `global` il lit mal la variable `--v-font-body` (il retient `sans-serif` comme police de repli). Le `@font-face` est donc écrit dans `global.css`, avec des surcharges calculées par `fontaine` (bibliothèque de `@nuxt/fonts`) sur le fichier Inter servi et les métriques d'Arial, identiques à celles de Liberation Sans. À recalculer si la police change. Pour reproduire la CI en local : `FONTCONFIG_FILE` pointant vers une configuration qui force DejaVu Sans pour `sans-serif` et `system-ui`.
- **Compression** : le serveur Node de Nitro ne compresse rien. Les assets sont précompressés au build (`compressPublicAssets`), le HTML est compressé par `server/plugins/compressHtml.ts`. Derrière un proxy qui compresse, ce plugin devient inutile.
- **Lighthouse** : 3 passages par URL, assertions sur la médiane (`aggregationMethod: "median-run"`). Par défaut lhci agrège en optimiste (meilleur passage), ce qui masquait les régressions. Les runners GitHub sont plus lents que le poste : mesurer en local avec `--throttling.cpuSlowdownMultiplier=8` pour s'en approcher.
- **Images responsives** : des variantes intermédiaires sont dérivées des médias partagés (`hero-828` et `hero-960`, `slide-N-750` et `slide-N-960`, `product-N-640`), avec une qualité calibrée pour reproduire la taille des originaux à résolution égale (AVIF q40 à q53, WebP q77). Les `sizes` décrivent la largeur réelle affichée. Sans ces variantes, le mobile (DPR 1,75) tirait les 1280 et 800, deux fois trop lourdes.
- **Lighthouse et Chrome** : lancés avec `--no-sandbox` (Ubuntu restreint les user namespaces). Les rapports restent en local (`.lighthouseci/`).
- **Mode renforcé** : les espacements WCAG 1.4.12 ne visent que le texte de contenu de `<main>` (`p`, `li`, `dd`, `dt`, `td`, `th` hors `nav` et `.a11y-chrome`). Le header garde sa structure (test : hauteur ≤ 1,4 fois la normale).
