import type { TypedSchema } from 'vee-validate'
import type { z } from 'zod'

export const toTypedSchema = <TSchema extends z.ZodType>(
  schema: TSchema,
): TypedSchema<z.input<TSchema>, z.output<TSchema>> => ({
  __type: 'VVTypedSchema',
  async parse(values) {
    const result = await schema.safeParseAsync(values)
    if (result.success) return { value: result.data, errors: [] }

    const errorsByPath = new Map<string, string[]>()
    for (const issue of result.error.issues) {
      const path = issue.path.join('.')
      errorsByPath.set(path, [...(errorsByPath.get(path) ?? []), issue.message])
    }
    return { errors: [...errorsByPath].map(([path, errors]) => ({ path, errors })) }
  },
})
