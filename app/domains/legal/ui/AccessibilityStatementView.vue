<script setup lang="ts">
import { getComplianceLevel } from '@/core/a11y'
import { SITE } from '@/core/config'

const AUDIT = SITE.accessibility
const COMPLIANCE_LEVEL = getComplianceLevel(AUDIT)
</script>

<template>
  <h1>Déclaration d'accessibilité</h1>

  <p>
    {{ SITE.publisher.companyName }} s’engage à rendre son site accessible conformément à l’article
    47 de la loi n° 2005-102 du 11 février 2005. Cette déclaration s’applique au site
    {{ SITE.name }}.
  </p>

  <h2>État de conformité</h2>
  <p data-testid="legal-compliance-level">
    Le site est <strong>{{ COMPLIANCE_LEVEL }}</strong> avec le référentiel général d’amélioration
    de l’accessibilité (RGAA), version 4.1.2<template v-if="!AUDIT.auditDate">
      : aucun audit n’a encore été réalisé</template
    >.
  </p>

  <h2>Résultats des tests</h2>
  <p v-if="AUDIT.auditDate && AUDIT.complianceRate !== null">
    L’audit réalisé le {{ AUDIT.auditDate }} par {{ AUDIT.auditor }} révèle un taux de conformité de
    {{ AUDIT.complianceRate }} %.
  </p>
  <p>
    Des tests automatisés axe-core uniquement ont été menés (critères WCAG 2.1 niveaux A et AA, sur
    chaque page, en affichage ordinaire et en mode accessibilité renforcée). Ils ne valent pas
    audit.
  </p>

  <h2>Contenus non accessibles</h2>
  <p>À compléter après audit.</p>

  <h2>Mode accessibilité renforcée</h2>
  <p>
    Le bouton « Accessibilité renforcée » de l’en-tête agrandit le texte, augmente les espacements
    et les contrastes, souligne tous les liens, épaissit l’indicateur de focus et coupe les
    animations. Ce choix est mémorisé sur votre appareil.
  </p>

  <h2>Établissement de cette déclaration</h2>
  <p>Environnement de test : Chromium, en affichage ordinateur et mobile, avec axe-core.</p>

  <h2>Retour d’information et contact</h2>
  <p>
    Si vous ne pouvez pas accéder à un contenu ou à un service, contactez
    <a :href="`mailto:${SITE.publisher.email}`" class="text-primary">{{ SITE.publisher.email }}</a>
    pour être orienté vers une alternative accessible.
  </p>

  <h2>Voies de recours</h2>
  <p>
    Si vous constatez un défaut d’accessibilité qui vous empêche d’accéder à un contenu, que vous
    nous l’avez signalé et que vous n’avez pas obtenu de réponse satisfaisante, vous pouvez saisir
    le Défenseur des droits : par le
    <a href="https://formulaire.defenseurdesdroits.fr/" class="text-primary">formulaire en ligne</a
    >, auprès d’un délégué de votre région, ou par courrier gratuit, sans timbre, à Défenseur des
    droits, Libre réponse 71120, 75342 Paris CEDEX 07.
  </p>
</template>
