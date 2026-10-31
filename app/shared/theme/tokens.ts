import generated from '@kewinmarchand/boilerplates-ui/tokens/tokens.json'

// Seul point d'entrée des jetons de boilerplates-ui côté script. Les variables CSS (dont le mode renforcé et le sombre)
// viennent de tokens.css, déclarée dans `css` de nuxt.config.

/** Jetons du mode clair, montrés par la charte graphique. */
export const TOKENS = generated.tokens

export const PRIMARY_COLOR = TOKENS.color.primary
