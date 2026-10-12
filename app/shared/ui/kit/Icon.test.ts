import { render, screen } from '@testing-library/vue'

import Icon from './Icon.vue'

describe('Icon', () => {
  it('pointe vers le symbole du sprite et reste masquée sans libellé', () => {
    const { container } = render(Icon, { props: { name: 'mail' } })
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.querySelector('use')).toHaveAttribute('href', '/icons.svg#mail')
  })

  it('porte un nom accessible quand un libellé est fourni', () => {
    render(Icon, { props: { name: 'x', label: 'Fermer' } })

    expect(screen.getByRole('img', { name: 'Fermer' })).toBeInTheDocument()
  })
})
