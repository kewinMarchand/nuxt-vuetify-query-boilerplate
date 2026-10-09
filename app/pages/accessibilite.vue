<script setup lang="ts">
import { usePageSeo } from '@/core/seo'
import { AccessibilityStatementView } from '@/domains/legal'

usePageSeo({
  title: 'Déclaration d’accessibilité',
  description:
    'Déclaration d’accessibilité RGAA 4.1.2 : état de conformité, résultats des tests, contact et voies de recours.',
})
</script>

<template>
  <AccessibilityStatementView />
</template>
