import { z } from 'zod'

const defaultRequiredStringFormat = z
  .string({ required_error: "Can't be empty" })
  .min(1, { message: "Can't be empty" })

const defaultStringArrayFormat = z.array(defaultRequiredStringFormat).optional()

type BoardFormValues = {
  name: string
  columns: string[]
}

export function boardFormValidation(values: BoardFormValues) {
  const schema = z.object({
    name: defaultRequiredStringFormat,
    columns: defaultStringArrayFormat
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
    errors.columns = formatStringArrayErrors(formattedErrors.columns)
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
    title: defaultRequiredStringFormat,
    description: z.string({ required_error: "Can't be empty" }),
    status: z.object(
      {
        id: z.number(),
        name: z.string()
      },
      { required_error: "Can't be empty" }
    ),
    subtasks: defaultStringArrayFormat
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
    errors.subtasks = formatStringArrayErrors(formattedErrors.subtasks)
  }

  return {
    isValid: false,
    errors
  }
}

function formatStringArrayErrors(errors: object) {
  let formattedErrors: Record<number, string> = {}
  Object.keys(errors).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = errors as any
    if (key !== '_errors') {
      formattedErrors = Object.assign(formattedErrors || {}, {
        [key]: error[key]._errors[0]
      })
    }
  })

  return formattedErrors
}
