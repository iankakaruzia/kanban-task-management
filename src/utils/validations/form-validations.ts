import { z } from 'zod'

type AddBoardFormValues = {
  name: string
  columns: string[]
}

export function addBoardFormValidation(values: AddBoardFormValues) {
  const schema = z.object({
    name: z
      .string({ required_error: "Can't be empty" })
      .min(1, { message: "Can't be empty" }),
    columns: z
      .array(
        z
          .string({ required_error: "Can't be empty" })
          .min(1, { message: "Can't be empty" })
      )
      .optional()
  })

  const validated = schema.safeParse(values)
  const errors: { [key: string]: string | Record<number, string> } = {}

  if (validated.success) {
    return { isValid: true, errors }
  }

  const formattedErrors = validated.error.format()

  if (formattedErrors.name?._errors) {
    errors.name = formattedErrors.name._errors[0]
  }

  if (formattedErrors.columns) {
    Object.keys(formattedErrors.columns).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const columnErrors = formattedErrors.columns as any
      if (key !== '_errors') {
        errors.columns = Object.assign(errors.columns || {}, {
          [key]: columnErrors[key]._errors[0]
        })
      }
    })
  }

  return {
    isValid: false,
    errors
  }
}
