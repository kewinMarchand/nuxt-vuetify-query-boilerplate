<script setup lang="ts">
import { Icon } from '@/core/ui/ui-kit'

import { useContactForm } from './composables/useContactForm'

const {
  name,
  nameProps,
  email,
  emailProps,
  message,
  messageProps,
  isPending,
  isSuccess,
  isError,
  onSubmit,
} = useContactForm()
</script>

<template>
  <form novalidate class="contact-form d-flex flex-column ga-4" @submit="onSubmit">
    <v-text-field
      v-model="name"
      v-bind="nameProps"
      label="Nom"
      autocomplete="name"
      required
      data-testid="contact-name"
    />
    <v-text-field
      v-model="email"
      v-bind="emailProps"
      label="E-mail"
      type="email"
      autocomplete="email"
      required
      data-testid="contact-email"
    />
    <v-textarea
      v-model="message"
      v-bind="messageProps"
      label="Message"
      rows="4"
      required
      data-testid="contact-message"
    />
    <v-btn type="submit" color="primary" :loading="isPending" data-testid="contact-submit">
      <template #prepend>
        <Icon name="email" />
      </template>
      Envoyer
      <template #loader>
        <v-progress-circular indeterminate size="20" width="2" aria-label="Envoi en cours" />
      </template>
    </v-btn>
    <div aria-live="polite">
      <v-alert v-if="isSuccess" type="success" variant="tonal" data-testid="contact-success">
        Merci, votre message a bien été envoyé.
      </v-alert>
      <v-alert v-if="isError" type="error" variant="tonal" data-testid="contact-error">
        L'envoi a échoué. Réessayez dans quelques instants.
      </v-alert>
    </div>
  </form>
</template>

<style scoped>
.contact-form {
  max-width: 560px;
}
</style>
