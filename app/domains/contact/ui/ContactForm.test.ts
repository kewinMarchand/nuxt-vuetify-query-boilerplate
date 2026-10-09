import userEvent from '@testing-library/user-event'
import { screen, within } from '@testing-library/vue'

import { renderWithProviders } from '@/core/testing/renderWithProviders'

import ContactForm from './ContactForm.vue'

const field = (testId: string) => within(screen.getByTestId(testId)).getByRole('textbox')

describe('ContactForm', () => {
  it('lie le message d’erreur au champ invalide', async () => {
    renderWithProviders(ContactForm)
    await userEvent.click(screen.getByTestId('contact-submit'))

    const email = field('contact-email')
    await vi.waitFor(() => expect(email).toHaveAttribute('aria-invalid', 'true'))
    expect(email).toHaveAccessibleDescription(/adresse e-mail valide/)
  })

  it('confirme l’envoi quand le formulaire est valide', async () => {
    renderWithProviders(ContactForm)
    await userEvent.type(field('contact-name'), 'Ada')
    await userEvent.type(field('contact-email'), 'ada@exemple.fr')
    await userEvent.type(field('contact-message'), 'Bonjour, ceci est un message.')
    await userEvent.click(screen.getByTestId('contact-submit'))

    expect(await screen.findByTestId('contact-success')).toBeInTheDocument()
  })
})
