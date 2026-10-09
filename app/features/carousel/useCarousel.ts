import emblaCarouselVue from 'embla-carousel-vue'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { A11Y_MODE_ENHANCED } from '@/core/a11y'

import type { EmblaCarouselVueType } from 'embla-carousel-vue'

type EmblaApi = NonNullable<EmblaCarouselVueType[1]['value']>

const DEFAULT_DURATION = 25
const REDUCED_DURATION = 1
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const prefersReducedMotion = () =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches ||
  document.documentElement.dataset.a11yMode === A11Y_MODE_ENHANCED

export const useCarousel = () => {
  const options = ref({
    align: 'start' as const,
    containScroll: 'trimSnaps' as const,
    duration: DEFAULT_DURATION,
  })
  const [viewport, api] = emblaCarouselVue(options, [WheelGesturesPlugin()])

  const isReady = ref(false)
  const snapCount = ref(0)
  const selectedIndex = ref(0)
  const canPrev = ref(false)
  const canNext = ref(true)

  const sync = (embla: EmblaApi) => {
    snapCount.value = embla.scrollSnapList().length
    selectedIndex.value = embla.selectedScrollSnap()
    canPrev.value = embla.canScrollPrev()
    canNext.value = embla.canScrollNext()
  }

  const applyMotionPreference = () => {
    const duration = prefersReducedMotion() ? REDUCED_DURATION : DEFAULT_DURATION
    if (options.value.duration !== duration) options.value = { ...options.value, duration }
  }

  watch(api, (embla) => {
    if (!embla) return
    isReady.value = true
    sync(embla)
    embla.on('select', sync).on('reInit', sync)
  })

  let attributeObserver: MutationObserver | undefined
  let motionQuery: MediaQueryList | undefined

  onMounted(() => {
    applyMotionPreference()
    attributeObserver = new MutationObserver(applyMotionPreference)
    attributeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-a11y-mode'],
    })
    motionQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    motionQuery.addEventListener('change', applyMotionPreference)
  })

  onBeforeUnmount(() => {
    attributeObserver?.disconnect()
    motionQuery?.removeEventListener('change', applyMotionPreference)
  })

  return {
    viewport,
    isReady,
    snapCount,
    selectedIndex,
    canPrev,
    canNext,
    prev: () => api.value?.scrollPrev(),
    next: () => api.value?.scrollNext(),
    goTo: (index: number) => api.value?.scrollTo(index),
  }
}
