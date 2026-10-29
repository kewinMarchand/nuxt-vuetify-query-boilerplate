import { onBeforeUnmount, onMounted, ref } from 'vue'

import { abonnerOppositionMesure, changerOppositionMesure, mesureRefusee } from './oppositionMesure'

/** Refus de la mesure d'audience par le visiteur, et le moyen de le changer. Faux au rendu serveur. */
export const useOppositionMesure = () => {
  const refusee = ref(false)
  let desabonner: (() => void) | undefined

  onMounted(() => {
    const lire = () => {
      refusee.value = mesureRefusee()
    }
    lire()
    desabonner = abonnerOppositionMesure(lire)
  })

  onBeforeUnmount(() => desabonner?.())

  return { refusee, changer: changerOppositionMesure }
}
