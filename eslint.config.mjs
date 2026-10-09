import withNuxt from './.nuxt/eslint.config.mjs'

const RELATIVE_DEPTH = { group: ['../../*'], message: 'Utiliser l’alias @/ au-delà d’un niveau.' }
const ICONS_WRAPPER = {
  group: ['@mdi/js'],
  message: 'Les icônes passent par le wrapper @/core/ui/ui-kit/Icon.',
}
const DOMAIN_PUBLIC_API = {
  group: ['@/domains/*/*', '~/domains/*/*'],
  message: "Un domaine s'importe uniquement via son index.ts public.",
}

export default withNuxt(
  {
    ignores: [
      '.output/**',
      'playwright-report/**',
      'test-results/**',
      '.lighthouseci/**',
      'app/core/api/schema.d.ts',
    ],
  },
  {
    settings: { 'import-x/internal-regex': '^[@~]/' },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          pathGroups: [{ pattern: '#*', group: 'external', position: 'after' }],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'no-restricted-imports': ['error', { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER] }],
    },
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'vue/require-default-prop': 'off',
      'vue/html-self-closing': 'off',
    },
  },
  {
    files: ['app/pages/**', 'app/core/**', 'app/features/**', 'app/*.vue', 'server/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER, DOMAIN_PUBLIC_API] },
      ],
    },
  },
  {
    files: ['app/core/ui/ui-kit/Icon.vue'],
    rules: { 'no-restricted-imports': 'off', 'vue/multi-word-component-names': 'off' },
  },
)
