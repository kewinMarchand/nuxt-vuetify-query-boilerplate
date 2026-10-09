import { contrastLevel, contrastRatio } from './contrast'

describe('contrastRatio', () => {
  it('donne 21 pour le noir sur blanc et 1 pour une couleur sur elle-même', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(contrastRatio('#1d4ed8', '#1d4ed8')).toBeCloseTo(1, 5)
  })

  it('est symétrique et accepte la notation courte', () => {
    expect(contrastRatio('#fff', '#1d4ed8')).toBeCloseTo(contrastRatio('#1d4ed8', '#ffffff'), 5)
  })
})

describe('contrastLevel', () => {
  it('classe les ratios selon les seuils WCAG du texte normal', () => {
    expect(contrastLevel(7)).toBe('AAA')
    expect(contrastLevel(4.5)).toBe('AA')
    expect(contrastLevel(4.49)).toBe('insuffisant')
  })
})
