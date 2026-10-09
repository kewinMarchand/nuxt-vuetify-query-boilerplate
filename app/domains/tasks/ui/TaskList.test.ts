import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/vue'

import { renderWithProviders } from '@/core/testing/renderWithProviders'

import TaskList from './TaskList.vue'

const TASKS = [
  { id: '1', title: 'Écrire les tests', done: false },
  { id: '2', title: 'Livrer', done: true },
]

describe('TaskList', () => {
  it('affiche un squelette pendant le chargement', () => {
    renderWithProviders(TaskList, { props: { status: 'pending', tasks: undefined } })
    expect(screen.getByTestId('tasks-loading')).toBeInTheDocument()
  })

  it("affiche le message d'erreur et relance au clic", async () => {
    const onRetry = vi.fn()
    renderWithProviders(TaskList, {
      props: { status: 'error', tasks: undefined, errorMessage: 'Oups', onRetry },
    })

    expect(screen.getByTestId('tasks-error')).toHaveTextContent('Oups')
    await userEvent.click(screen.getByTestId('tasks-retry'))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('affiche un message quand la liste est vide', () => {
    renderWithProviders(TaskList, { props: { status: 'success', tasks: [] } })
    expect(screen.getByTestId('tasks-empty')).toBeInTheDocument()
  })

  it('affiche chaque tâche avec son statut', () => {
    renderWithProviders(TaskList, { props: { status: 'success', tasks: TASKS } })
    expect(screen.getAllByTestId('tasks-item')).toHaveLength(2)
    expect(screen.getByText('Terminée')).toBeInTheDocument()
  })
})
