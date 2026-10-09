import { onMounted, ref } from 'vue'

import { A11Y_MODE_ENHANCED, A11Y_MODE_STORAGE_KEY } from './a11yModeBootScript'

const persist = (isEnhanced: boolean) => {
  try {
    if (isEnhanced) localStorage.setItem(A11Y_MODE_STORAGE_KEY, A11Y_MODE_ENHANCED)
    else localStorage.removeItem(A11Y_MODE_STORAGE_KEY)
  } catch (error) {
    console.warn('Mode accessibilité renforcée non mémorisé, stockage indisponible.', error)
  }
}

export const useA11yMode = () => {
  const isEnhanced = ref(false)

  onMounted(() => {
    isEnhanced.value = document.documentElement.dataset.a11yMode === A11Y_MODE_ENHANCED
  })

  const toggle = () => {
    isEnhanced.value = !isEnhanced.value
    const root = document.documentElement
    if (isEnhanced.value) root.dataset.a11yMode = A11Y_MODE_ENHANCED
    else delete root.dataset.a11yMode
    persist(isEnhanced.value)
  }

  return { isEnhanced, toggle }
}
