import { VueQueryPlugin } from '@tanstack/vue-query'
import { render } from '@testing-library/vue'

import { makeQueryClient, makeVuetify } from '@/core/providers'

type RenderParameters = Parameters<typeof render>

export const renderWithProviders = (
  component: RenderParameters[0],
  options: RenderParameters[1] = {},
) =>
  render(component, {
    ...options,
    global: {
      plugins: [makeVuetify(), [VueQueryPlugin, { queryClient: makeQueryClient() }]],
    },
  })
