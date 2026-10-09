<script setup lang="ts">
import { Icon } from '@/core/ui/ui-kit'
import { formatPublishedAt } from '@/domains/home/services/formatPublishedAt'
import { buildSources } from '@/domains/home/services/imageSources'

import type { Article } from '../common/models/article'

defineProps<{
  status: 'pending' | 'error' | 'success'
  articles: Article.Entity[] | undefined
  errorMessage?: string
}>()

const emit = defineEmits<{ retry: [] }>()

const BLOG_WIDTHS = [480, 960]
const BLOG_SIZES = '(min-width: 960px) 33vw, (min-width: 600px) 50vw, 100vw'
</script>

<template>
  <div
    v-if="status === 'pending'"
    role="status"
    aria-busy="true"
    aria-label="Chargement des articles"
    class="blog-grid ga-6"
    data-testid="home-blog-loading"
  >
    <v-skeleton-loader v-for="key in 3" :key="key" type="article" aria-hidden="true" />
  </div>

  <v-alert
    v-else-if="status === 'error'"
    type="error"
    variant="tonal"
    data-testid="home-blog-error"
  >
    {{ errorMessage }}
    <template #append>
      <v-btn variant="text" data-testid="home-blog-retry" @click="emit('retry')">
        <template #prepend>
          <Icon name="refresh" />
        </template>
        Réessayer
      </v-btn>
    </template>
  </v-alert>

  <v-alert v-else-if="!articles?.length" type="info" variant="tonal" data-testid="home-blog-empty">
    Aucun article pour l'instant. Revenez bientôt.
  </v-alert>

  <div v-else class="blog-grid ga-6">
    <article
      v-for="article in articles"
      :key="article.id"
      class="blog-card"
      data-testid="home-blog-card"
    >
      <v-card variant="outlined" class="h-100">
        <picture>
          <source
            v-for="source in buildSources(article.illustration, BLOG_WIDTHS)"
            :key="source.type"
            :type="source.type"
            :srcset="source.srcset"
            :sizes="BLOG_SIZES"
          />
          <img
            :src="`/images/${article.illustration}-960.webp`"
            alt=""
            width="960"
            height="540"
            loading="lazy"
            decoding="async"
            class="blog-card-image"
          />
        </picture>
        <div class="blog-card-body">
          <h3>{{ article.title }}</h3>
          <p>{{ article.excerpt }}</p>
          <time :datetime="article.publishedAt" class="text-body-medium text-medium-emphasis">
            {{ formatPublishedAt(article.publishedAt) }}
          </time>
        </div>
      </v-card>
    </article>
  </div>
</template>

<style scoped>
.blog-grid {
  display: grid;
}

.blog-card {
  container-type: inline-size;
}

.blog-card-image {
  display: block;
  width: 100%;
  height: auto;
}

.blog-card-body {
  padding: 16px;
}

@container (min-width: 360px) {
  .blog-card-body {
    padding: 24px;
  }
}

@media (min-width: 600px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .blog-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
