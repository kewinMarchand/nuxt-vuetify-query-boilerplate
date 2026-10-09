<script setup lang="ts">
import { useHead } from '#imports'

import { SITE } from '@/core/config'
import { buildSources, buildSrcset } from '@/domains/home/services/imageSources'

const HERO_WIDTHS = [640, 828, 960, 1280, 1920]
const HERO_SIZES = '100vw'
const HERO_SOURCES = buildSources('hero', HERO_WIDTHS)

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      type: 'image/avif',
      imagesrcset: buildSrcset('hero', HERO_WIDTHS, 'avif'),
      imagesizes: HERO_SIZES,
      fetchpriority: 'high',
    },
  ],
})
</script>

<template>
  <section class="hero" data-testid="home-hero">
    <picture>
      <source
        v-for="source in HERO_SOURCES"
        :key="source.type"
        :type="source.type"
        :srcset="source.srcset"
        :sizes="HERO_SIZES"
      />
      <img
        src="/images/hero-1280.webp"
        alt=""
        width="1920"
        height="1080"
        fetchpriority="high"
        class="hero-image"
      />
    </picture>
    <div class="hero-veil" />
    <div class="hero-content app-container">
      <p class="hero-eyebrow text-label-large">Boilerplate Nuxt 4 · Vuetify · TanStack Query</p>
      <h1>{{ SITE.name }}</h1>
      <p class="hero-text">{{ SITE.description }}</p>
      <div class="d-flex flex-wrap ga-4">
        <v-btn to="/taches" color="primary" size="large" data-testid="home-tasks-link">
          Voir la démo TanStack Query
        </v-btn>
        <v-btn
          to="/contact"
          variant="outlined"
          color="white"
          size="large"
          data-testid="home-contact-link"
        >
          Voir le formulaire
        </v-btn>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 520px;
  color: #fff;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(0 0 0 / 0.78) 0%, rgb(0 0 0 / 0.58) 100%);
}

[data-a11y-mode='enhanced'] .hero-veil {
  background: rgb(0 0 0 / 0.85);
}

.hero-content {
  position: relative;
  padding-block: 48px;
}

.hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-text {
  max-width: 640px;
  font-size: calc(18px * var(--app-font-scale));
}

@media (min-width: 960px) {
  .hero {
    min-height: min(80vh, 720px);
  }
}
</style>
