import type { Contact } from '../common/models/contactSchema'

const LATENCY_MS = import.meta.client ? 300 : 0

export const sendContactMessage = (values: Contact.FormValues): Promise<Contact.FormValues> =>
  new Promise((resolve) => setTimeout(() => resolve(values), LATENCY_MS))
