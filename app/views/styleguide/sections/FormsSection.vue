<script setup lang="ts">
import {
  Checkbox,
  RadioGroup,
  Select,
  Switch,
  TextArea,
  TextField,
} from '@kewinmarchand/boilerplates-ui/vue'

const EXPOSURES = [
  { value: 'soleil', label: 'Soleil' },
  { value: 'mi-ombre', label: 'Mi-ombre' },
  { value: 'ombre', label: 'Ombre' },
]

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]
</script>

<template>
  <section aria-labelledby="charte-formulaires" data-testid="styleguide-forms">
    <h2 id="charte-formulaires">Formulaires</h2>
    <form novalidate class="form-grid" @submit.prevent>
      <TextField id="charte-texte" label="Texte" hint="Aide associée au champ" />
      <TextField
        id="charte-email"
        label="E-mail"
        type="email"
        autocomplete="email"
        error="Indiquez une adresse e-mail valide."
      />
      <div class="bui-field">
        <label class="bui-field__label" for="charte-nombre">Nombre</label>
        <input id="charte-nombre" class="bui-field__input" type="number" inputmode="numeric" />
      </div>
      <TextField id="charte-desactive" label="Désactivé" disabled model-value="Valeur figée" />
      <TextArea id="charte-zone" label="Zone de texte" :rows="3" />
      <Select id="charte-liste" label="Liste de choix" :options="EXPOSURES" />
      <div>
        <Checkbox id="charte-case" label="Case à cocher" />
        <Switch id="charte-interrupteur" label="Interrupteur" />
      </div>
      <RadioGroup id="charte-radio" legend="Boutons radio" name="charte-radio" :options="OPTIONS" />
    </form>
  </section>
</template>

<style scoped>
.form-grid {
  display: grid;
  gap: var(--bui-space-4);
}

@media (min-width: 1024px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
