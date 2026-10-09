<script setup lang="ts">
import { SITE } from '@/core/config'
</script>

<template>
  <h1>Mentions légales</h1>

  <h2>Éditeur du site</h2>
  <p>
    {{ SITE.name }} est édité par {{ SITE.publisher.companyName }}, {{ SITE.publisher.address }},
    SIRET {{ SITE.publisher.siret }}. Contact :
    <a :href="`mailto:${SITE.publisher.email}`" class="text-primary">{{ SITE.publisher.email }}</a
    >.
  </p>

  <h2>Directeur de la publication</h2>
  <p>{{ SITE.publisher.publicationDirector }}.</p>

  <h2>Hébergeur</h2>
  <p>{{ SITE.host.name }}, {{ SITE.host.address }}.</p>

  <h2>Propriété intellectuelle</h2>
  <p>
    Les contenus de ce site (textes, images, code) sont protégés par le droit d’auteur. Toute
    reproduction sans autorisation de l’éditeur est interdite, sauf mention contraire. Le code
    source du boilerplate est distribué sous licence MIT.
  </p>
</template>
