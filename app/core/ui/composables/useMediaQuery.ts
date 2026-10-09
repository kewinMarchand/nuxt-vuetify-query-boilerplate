import { onBeforeUnmount, onMounted, ref } from 'vue'

export const useMediaQuery = (query: string) => {
  const matches = ref(false)
  const isMounted = ref(false)
  let media: MediaQueryList | undefined

  const update = () => {
    matches.value = media?.matches ?? false
  }

  onMounted(() => {
    media = window.matchMedia(query)
    update()
    media.addEventListener('change', update)
    isMounted.value = true
  })

  onBeforeUnmount(() => media?.removeEventListener('change', update))

  return { matches, isMounted }
}
