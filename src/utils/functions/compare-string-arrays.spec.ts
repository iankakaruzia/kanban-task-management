import { compareStringArrays } from './compare-string-arrays'

describe('compareStringArrays tests', () => {
  it.each([
    [['a', 'b', 'c'], ['a', 'b', 'c'], true],
    [['a', 'b', 'c'], ['c', 'a', 'b'], true],
    [['a', 'b', 'c'], ['a', 'b'], false],
    [[], [], true]
  ])('compareStringArrays(%p, %p) should return %p', (a, b, expected) => {
    expect(compareStringArrays(a, b)).toBe(expected)
  })
})
