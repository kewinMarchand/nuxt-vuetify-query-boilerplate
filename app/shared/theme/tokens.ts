import vuetify from '@kewinmarchand/boilerplates-ui/tokens/vuetify.json'

// Seul point d'entrée des tokens de boilerplates-ui côté script : couleurs du thème Vuetify généré.
// Les tailles, le conteneur et le mode renforcé passent par tokens.css, déclarée dans `css` de nuxt.config.
export const LIGHT_COLORS = vuetify.theme.themes.light.colors

export const ENHANCED_COLORS = vuetify.theme.themes.enhanced.colors

export const PRIMARY_COLOR = LIGHT_COLORS.primary
