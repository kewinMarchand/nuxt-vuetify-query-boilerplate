<script setup lang="ts">
import { defineLazyHydrationComponent } from '#imports'

import BlogSection from './BlogSection.vue'
import HomeHero from './HomeHero.vue'
import { HOME_SLIDES } from '../api/homeSlides'

const ScrollCarousel = defineLazyHydrationComponent('visible', () =>
  import('@/features/carousel').then((carousel) => carousel.ScrollCarousel),
)
</script>

<template>
  <HomeHero />
  <div class="app-container d-flex flex-column ga-12 py-12">
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
