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
  const errors: { [key: string]: string } = {}

  if (validated.success) {
    return { isValid: true, errors }
  }

  const formattedErrors = validated.error.format()

  if (formattedErrors.name?._errors) {
    errors.name = formattedErrors.name._errors[0]
  }

  if (formattedErrors.columns?._errors) {
    errors.columns = formattedErrors.columns._errors[0]
  }

  return {
    isValid: false,
    errors
  }
}
