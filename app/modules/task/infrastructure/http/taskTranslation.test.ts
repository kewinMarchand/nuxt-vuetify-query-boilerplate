import { toTask } from './taskTranslation'

describe('toTask', () => {
  it('traduit l’identifiant numérique de l’API en identifiant du domaine', () => {
    expect(toTask({ id: 3, title: 'Lancer make qa', done: true })).toEqual({
      id: '3',
      title: 'Lancer make qa',
      done: true,
    })
  })
})
