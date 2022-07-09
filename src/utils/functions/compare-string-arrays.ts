export function compareStringArrays(
  array1: string[],
  array2: string[]
): boolean {
  if (array1.length !== array2.length) {
    return false
  }

  array1.forEach((item) => {
    if (!array2.includes(item)) {
      return false
    }
  })

  return true
}
