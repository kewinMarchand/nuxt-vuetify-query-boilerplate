<script setup lang="ts">
const SELECT_ITEMS = ['Soleil', 'Mi-ombre', 'Ombre']
</script>

<template>
  <section aria-labelledby="charte-formulaires" data-testid="styleguide-forms">
    <h2 id="charte-formulaires">Formulaires</h2>
    <div class="form-grid">
      <v-text-field label="Texte" hint="Aide associée au champ" persistent-hint />
      <v-text-field
        label="E-mail"
        type="email"
        autocomplete="email"
        error-messages="Indiquez une adresse e-mail valide."
        aria-invalid="true"
      />
      <v-text-field label="Nombre" type="number" inputmode="numeric" />
      <v-text-field label="Désactivé" disabled model-value="Valeur figée" />
      <v-textarea label="Zone de texte" rows="3" />
      <v-select label="Liste de choix" :items="SELECT_ITEMS" />
      <v-checkbox label="Case à cocher" hide-details />
      <v-switch label="Interrupteur" color="primary" hide-details />
      <v-radio-group label="Boutons radio" inline hide-details>
        <v-radio label="Option A" value="a" />
        <v-radio label="Option B" value="b" />
      </v-radio-group>
    </div>
  </section>
</template>

<style scoped>
.form-grid {
  display: grid;
  gap: 16px;
}

@media (min-width: 960px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
