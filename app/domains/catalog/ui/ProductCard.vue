<script setup lang="ts">
import { useHead } from '#imports'

import { EXPOSURE_LABELS, SIZE_LABELS } from '../common/models/catalogQuery'
import { formatPrice } from '../services/formatPrice'

import type { Catalog } from '../common/models/catalog'

const {
  product,
  eager = false,
  priority = false,
} = defineProps<{ product: Catalog.Product; eager?: boolean; priority?: boolean }>()

const FORMATS = ['avif', 'webp']
const PRODUCT_WIDTHS = [400, 640, 800]
const SIZES = '(min-width: 1024px) 280px, (min-width: 480px) 50vw, calc(100vw - 58px)'
const srcset = (format: string) =>
  PRODUCT_WIDTHS.map(
    (width) => `/images/product-${product.image}-${width}.${format} ${width}w`,
  ).join(', ')

if (priority) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        type: 'image/avif',
        imagesrcset: srcset('avif'),
        imagesizes: SIZES,
        fetchpriority: 'high',
      },
    ],
  })
}
</script>

<template>
  <article :id="`produit-${product.slug}`" class="product-card" data-testid="catalog-product">
    <div class="product-card-inner">
      <picture>
        <source
          v-for="format in FORMATS"
          :key="format"
          :type="`image/${format}`"
          :srcset="srcset(format)"
          :sizes="SIZES"
        />
        <img
          :src="`/images/product-${product.image}-800.webp`"
          :alt="product.name"
          width="800"
          height="800"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="priority ? 'high' : undefined"
          decoding="async"
          class="product-image rounded"
        />
      </picture>
      <div class="product-body">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price" data-testid="catalog-product-price">
          {{ formatPrice(product.price) }}
        </p>
        <dl class="product-specs">
          <div>
            <dt>Exposition</dt>
            <dd>{{ EXPOSURE_LABELS[product.exposure] }}</dd>
          </div>
          <div>
            <dt>Taille</dt>
            <dd>{{ SIZE_LABELS[product.size] }}</dd>
          </div>
        </dl>
        <p v-if="!product.inStock" class="product-badge">Rupture de stock</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  container-type: inline-size;
}

.product-card-inner {
  display: grid;
  align-content: start;
  gap: 12px;
  height: 100%;
  padding: 12px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
}

.product-image {
  display: block;
  width: 100%;
  height: auto;
}

.product-name {
  font-size: calc(18px * var(--app-font-scale));
  margin-bottom: 4px;
}

.product-price {
  font-weight: 600;
  margin-bottom: 8px;
}

.product-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin-bottom: 8px;
  font-size: calc(14px * var(--app-font-scale));
}

.product-specs div {
  display: flex;
  gap: 4px;
}

.product-specs dd {
  margin: 0;
}

.product-specs dt::after {
  content: ' :';
}

.product-badge {
  display: inline-block;
  padding: 2px 8px;
  border: 1px solid currentColor;
  border-radius: 4px;
  color: rgb(var(--v-theme-error));
  font-weight: 600;
  margin-bottom: 0;
}

@container (min-width: 560px) {
  .product-card-inner {
    grid-template-columns: 160px 1fr;
    align-items: start;
  }
}
</style>
