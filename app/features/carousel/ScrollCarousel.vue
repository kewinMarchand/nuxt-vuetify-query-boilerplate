<script setup lang="ts">
import { useId } from 'vue'

import { Icon } from '@/core/ui/ui-kit'

import { useCarousel } from './useCarousel'

import type { Carousel } from './carousel'

const { slides, labelledby } = defineProps<{
  slides: Carousel.Slide[]
  labelledby: string
}>()

const SLIDE_SIZES =
  '(min-width: 960px) calc((min(100vw, 1440px) - 64px) / 3), (min-width: 600px) calc(50vw - 40px), calc(100vw - 32px)'

const trackId = useId()
const { viewport, isReady, snapCount, selectedIndex, canPrev, canNext, prev, next, goTo } =
  useCarousel()

const setViewport = (element: unknown) => {
  viewport.value = element instanceof HTMLElement ? element : undefined
}
</script>

<template>
  <section aria-roledescription="carrousel" :aria-labelledby="labelledby">
    <slot />
    <div
      :ref="setViewport"
      class="carousel-viewport"
      :class="{ 'is-ready': isReady }"
      :tabindex="isReady ? undefined : 0"
    >
      <div :id="trackId" class="carousel-track" data-testid="carousel-track">
        <div
          v-for="(slide, position) in slides"
          :key="slide.id"
          class="carousel-slide"
          role="group"
          aria-roledescription="diapositive"
          :aria-label="`${position + 1} sur ${slides.length}`"
          data-testid="carousel-slide"
        >
          <picture v-if="position === 0 || isReady">
            <source
              v-for="source in slide.image.sources"
              :key="source.type"
              :type="source.type"
              :srcset="source.srcset"
              :sizes="SLIDE_SIZES"
            />
            <img
              :src="slide.image.src"
              alt=""
              :width="slide.image.width"
              :height="slide.image.height"
              loading="lazy"
              decoding="async"
              draggable="false"
              class="carousel-image rounded"
            />
          </picture>
          <template v-else>
            <div
              class="carousel-placeholder rounded"
              :style="{ aspectRatio: `${slide.image.width} / ${slide.image.height}` }"
            />
            <noscript data-allow-mismatch="children">
              <img
                :src="slide.image.src"
                alt=""
                :width="slide.image.width"
                :height="slide.image.height"
                loading="lazy"
                class="carousel-image rounded"
              />
            </noscript>
          </template>
          <h3 class="mt-4">{{ slide.title }}</h3>
          <p>{{ slide.text }}</p>
        </div>
      </div>
    </div>
    <div class="carousel-controls d-flex flex-wrap align-center ga-2">
      <div class="d-flex flex-wrap ga-1 flex-grow-1">
        <button
          v-for="index in snapCount"
          :key="index"
          type="button"
          class="carousel-dot"
          :aria-label="`Aller à la diapositive ${index}`"
          :aria-current="selectedIndex === index - 1 ? 'true' : undefined"
          :aria-controls="trackId"
          data-testid="carousel-dot"
          @click="goTo(index - 1)"
        />
      </div>
      <v-btn
        variant="outlined"
        color="primary"
        :aria-controls="trackId"
        :disabled="!canPrev"
        data-testid="carousel-prev"
        @click="prev"
      >
        <template #prepend>
          <Icon name="chevron-left" />
        </template>
        Précédent
      </v-btn>
      <v-btn
        variant="outlined"
        color="primary"
        :aria-controls="trackId"
        :disabled="!canNext"
        data-testid="carousel-next"
        @click="next"
      >
        Suivant
        <template #append>
          <Icon name="chevron-right" />
        </template>
      </v-btn>
    </div>
  </section>
</template>

<style scoped>
.carousel-viewport {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel-viewport.is-ready {
  overflow: hidden;
  scroll-snap-type: none;
}

.carousel-track {
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: -16px;
}

.carousel-slide {
  flex: 0 0 100%;
  min-width: 0;
  padding-left: 16px;
  scroll-snap-align: start;
}

.carousel-image {
  display: block;
  width: 100%;
  height: auto;
  user-select: none;
}

.carousel-placeholder {
  background: rgba(var(--v-theme-on-surface), 0.06);
}

html:not([data-js]) .carousel-placeholder {
  display: none;
}

.carousel-controls {
  min-height: 44px;
}

.carousel-dot {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  position: relative;
}

.carousel-dot::after {
  content: '';
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  border: 2px solid rgb(var(--v-theme-primary));
}

.carousel-dot[aria-current='true']::after {
  background: rgb(var(--v-theme-primary));
}

.carousel-dot:focus-visible {
  outline: 3px solid rgb(var(--v-theme-primary));
}

@media (min-width: 600px) {
  .carousel-slide {
    flex-basis: 50%;
  }
}

@media (min-width: 960px) {
  .carousel-slide {
    flex-basis: calc(100% / 3);
  }
}
</style>
