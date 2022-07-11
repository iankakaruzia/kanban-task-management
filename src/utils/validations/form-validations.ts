import { z } from 'zod'

type BoardFormValues = {
  name: string
  columns: string[]
}

export function boardFormValidation(values: BoardFormValues) {
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

type TaskFormValues = {
  title: string
  description: string
  status: { id: number; name: string }
  subtasks: string[]
}

export function taskFormValidation(values: TaskFormValues) {
  const schema = z.object({
    title: z
      .string({ required_error: "Can't be empty" })
      .min(1, { message: "Can't be empty" }),
    description: z.string({ required_error: "Can't be empty" }),
    status: z.object(
      {
        id: z.number(),
        name: z.string()
      },
      { required_error: "Can't be empty" }
    ),
    subtasks: z
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

  if (formattedErrors.title?._errors) {
    errors.title = formattedErrors.title._errors[0]
  }

  if (formattedErrors.description?._errors) {
    errors.description = formattedErrors.description._errors[0]
  }

  if (formattedErrors.subtasks) {
    Object.keys(formattedErrors.subtasks).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subtasksErrors = formattedErrors.subtasks as any
      if (key !== '_errors') {
        errors.subtasks = Object.assign(errors.columns || {}, {
          [key]: subtasksErrors[key]._errors[0]
        })
      }
    })
  }

  return {
    isValid: false,
    errors
  }
}
