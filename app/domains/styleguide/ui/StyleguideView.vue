<script setup lang="ts">
import BrandSection from './sections/BrandSection.vue'
import ButtonsSection from './sections/ButtonsSection.vue'
import ColorsSection from './sections/ColorsSection.vue'
import FeedbackSection from './sections/FeedbackSection.vue'
import FormsSection from './sections/FormsSection.vue'
import MediaSection from './sections/MediaSection.vue'
import NavigationSection from './sections/NavigationSection.vue'
import SpacingSection from './sections/SpacingSection.vue'
import TypographySection from './sections/TypographySection.vue'
</script>

<template>
  <h1>Charte graphique</h1>
  <p>
    Composants et tokens réels du projet. Page disponible en développement uniquement. Le bouton «
    Accessibilité renforcée » de l'en-tête permet de comparer les deux modes.
  </p>
  <div class="d-flex flex-column ga-12">
    <ColorsSection />
    <TypographySection />
    <SpacingSection />
    <ButtonsSection />
    <FormsSection />
    <FeedbackSection />
    <NavigationSection />
    <MediaSection />
    <BrandSection />
  </div>
</template>
