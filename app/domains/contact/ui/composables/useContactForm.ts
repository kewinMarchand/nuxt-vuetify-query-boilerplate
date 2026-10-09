import { useMutation } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'

import { sendContactMessage } from '@/domains/contact/api/sendContactMessage'
import { contactSchema } from '@/domains/contact/common/models/contactSchema'
import { toTypedSchema } from '@/features/forms'

import type { Contact } from '@/domains/contact/common/models/contactSchema'
import type { PublicPathState } from 'vee-validate'

const DEFAULT_VALUES: Contact.FormValues = { name: '', email: '', message: '' }

const FIELD_CONFIG = {
  validateOnModelUpdate: false,
  props: (state: PublicPathState) => ({
    'error-messages': state.errors,
    'aria-invalid': state.errors.length > 0 ? 'true' : 'false',
  }),
}

export const useContactForm = () => {
  const { defineField, handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(contactSchema),
    initialValues: DEFAULT_VALUES,
  })

  const [name, nameProps] = defineField('name', FIELD_CONFIG)
  const [email, emailProps] = defineField('email', FIELD_CONFIG)
  const [message, messageProps] = defineField('message', FIELD_CONFIG)

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => resetForm({ values: DEFAULT_VALUES }),
  })

  const onSubmit = handleSubmit((values) => mutate(values))

  return {
    name,
    nameProps,
    email,
    emailProps,
    message,
    messageProps,
    isPending,
    isSuccess,
    isError,
    onSubmit,
  }
}
