import { z } from 'zod'

import { toTypedSchema } from './toTypedSchema'

const schema = z.object({
  name: z.string().min(2, { error: 'Nom trop court.' }),
  contacts: z.array(z.object({ email: z.email({ error: 'E-mail invalide.' }) })),
})

describe('toTypedSchema', () => {
  it('renvoie la valeur validée sans erreur', async () => {
    const values = { name: 'Ada', contacts: [{ email: 'ada@exemple.fr' }] }
    expect(await toTypedSchema(schema).parse(values)).toEqual({ value: values, errors: [] })
  })

  it('formate les chemins d’erreur à la façon de vee-validate', async () => {
    const result = await toTypedSchema(schema).parse({
      name: 'A',
      contacts: [{ email: 'ada@exemple.fr' }, { email: 'invalide' }],
    })
    expect(result.errors).toEqual([
      { path: 'name', errors: ['Nom trop court.'] },
      { path: 'contacts[1].email', errors: ['E-mail invalide.'] },
    ])
  })
})
