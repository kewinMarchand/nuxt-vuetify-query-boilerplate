import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/vue'

import { A11Y_MODE_STORAGE_KEY } from '@/core/a11y'
import { renderWithProviders } from '@/core/testing/renderWithProviders'

import A11yModeToggle from './A11yModeToggle.vue'

describe('A11yModeToggle', () => {
  afterEach(() => {
    delete document.documentElement.dataset.a11yMode
    localStorage.clear()
  })

  it('active puis désactive le mode renforcé', async () => {
    renderWithProviders(A11yModeToggle)
    const toggle = screen.getByTestId('a11y-mode-toggle')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement).toHaveAttribute('data-a11y-mode', 'enhanced')
    expect(localStorage.getItem(A11Y_MODE_STORAGE_KEY)).toBe('enhanced')

    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(document.documentElement).not.toHaveAttribute('data-a11y-mode')
    expect(localStorage.getItem(A11Y_MODE_STORAGE_KEY)).toBeNull()
  })

  it('reprend l’état posé avant le rendu par le script de démarrage', async () => {
    document.documentElement.dataset.a11yMode = 'enhanced'
    renderWithProviders(A11yModeToggle)
    await vi.waitFor(() =>
      expect(screen.getByTestId('a11y-mode-toggle')).toHaveAttribute('aria-pressed', 'true'),
    )
  })
})
