<script setup lang="ts">
import { ProductCard } from '@/domains/catalog'
import { BlogGrid } from '@/domains/home'

import type { Catalog } from '@/domains/catalog'

const ARTICLE = {
  id: 'exemple',
  title: 'Exemple de carte de blog',
  excerpt: 'Illustration, titre, extrait et date de publication.',
  publishedAt: '2026-10-01',
  illustration: 'blog-1',
}
const PRODUCT: Catalog.Product = {
  id: 'exemple',
  slug: 'exemple',
  name: 'Anthurium d’exemple',
  categorySlug: 'anthurium',
  price: 2990,
  exposure: 'mi-ombre',
  size: 'M',
  inStock: false,
  image: 2,
}
</script>

<template>
  <section aria-labelledby="charte-medias" data-testid="styleguide-media">
    <h2 id="charte-medias">Médias et cartes</h2>
    <h3>Carte de blog</h3>
    <BlogGrid status="success" :articles="[ARTICLE]" />
    <h3 class="mt-6">Carte produit, grille puis liste</h3>
    <div class="product-samples">
      <div class="grid-sample"><ProductCard :product="PRODUCT" /></div>
      <ProductCard :product="{ ...PRODUCT, id: 'exemple-liste', slug: 'exemple-liste' }" />
    </div>
    <h3 class="mt-6">Image au ratio 16:9</h3>
    <img
      src="/images/slide-2-640.webp"
      alt=""
      width="640"
      height="360"
      loading="lazy"
      class="ratio-sample rounded"
    />
  </section>
</template>

<style scoped>
.product-samples {
  display: grid;
  gap: 16px;
}

.grid-sample {
  max-width: 280px;
}

.ratio-sample {
  display: block;
  width: 100%;
  max-width: 640px;
  height: auto;
}
</style>
