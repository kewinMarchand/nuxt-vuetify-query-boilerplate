<script setup lang="ts">
import { defineLazyHydrationComponent } from '#imports'

import { BlogSection } from '@/modules/blog'

import HomeHero from './HomeHero.vue'
import { HOME_SLIDES } from './homeSlides'

const ScrollCarousel = defineLazyHydrationComponent('visible', () =>
  import('@/shared/ui/carousel').then((carousel) => carousel.ScrollCarousel),
)
</script>

<template>
  <HomeHero />
  <div class="app-container home-sections">
    <ScrollCarousel
      :slides="HOME_SLIDES"
      labelledby="home-carousel-title"
      data-testid="home-carousel"
    >
      <h2 id="home-carousel-title">À la une</h2>
    </ScrollCarousel>
    <BlogSection />
  </div>
</template>

<style scoped>
.home-sections {
  display: flex;
  flex-direction: column;
  gap: var(--bui-space-12);
  padding-block: var(--bui-space-12);
}
</style>
