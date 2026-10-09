<script setup lang="ts">
import { SITE } from '@/core/config'
</script>

<template>
  <h1>Données personnelles</h1>

  <h2>Responsable de traitement</h2>
  <p>{{ SITE.publisher.companyName }}, {{ SITE.publisher.address }}.</p>

  <h2>Finalité</h2>
  <p>
    Le formulaire de contact collecte votre nom, votre adresse e-mail et votre message, dans le seul
    but de répondre à votre demande.
  </p>

  <h2>Base légale</h2>
  <p>Le traitement repose sur votre consentement, exprimé par l’envoi du formulaire.</p>

  <h2>Durée de conservation</h2>
  <p>Les messages sont conservés trois ans au plus après le dernier échange, puis supprimés.</p>

  <h2>Vos droits</h2>
  <p>
    Vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition sur vos
    données. Pour l’exercer, écrivez à
    <a :href="`mailto:${SITE.publisher.email}`" class="text-primary">{{ SITE.publisher.email }}</a
    >.
  </p>

  <h2>Réclamation</h2>
  <p>
    Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la
    CNIL (<a href="https://www.cnil.fr/fr/plaintes" class="text-primary">cnil.fr/fr/plaintes</a>).
  </p>

  <h2>Cookies</h2>
  <p>Ce site ne dépose aucun cookie de mesure d’audience.</p>
</template>
