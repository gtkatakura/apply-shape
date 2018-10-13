import applyShape from '../src'

describe('applyShape', () => {
  const inc = (value) => value + 1

  test('is a function', () => {
    expect(applyShape).toBeInstanceOf(Function)
  })

  test('(inc, 100) => 101', () => {
    expect(applyShape(inc, 100)).toEqual(101)
  })

  test('({ value: inc }, { value: 1 }) => { value: 2 }', () => {
    const shape = {
      value: inc,
    }

    const object = {
      value: 1,
    }

    expect(applyShape(shape, object)).toEqual({
      value: 2,
    })
  })

  test('({ value: inc }, { value: 1, extra: 1 }) => { value: 2, extra: 1 }', () => {
    const shape = {
      value: inc,
    }

    const object = {
      value: 1,
      extra: 1,
    }

    expect(applyShape(shape, object)).toEqual({
      value: 2,
      extra: 1,
    })
  })

  test('({ context: { value: inc } }, { context: { value: 1, name: "extra" } }) => { context: { value: 2, name: "extra" } }', () => {
    const shape = {
      context: {
        value: inc,
      },
    }

    const object = {
      context: {
        value: 1,
        name: 'extra'
      },
    }

    expect(applyShape(shape, object)).toEqual({
      context: {
        value: 2,
        name: "extra",
      },
    })
  })

  test('([inc, inc], [1, 1]) => [2, 2]', () => {
    const shape = [inc, inc]
    const object = [1, 1]

    expect(applyShape(shape, object)).toEqual([2, 2])
  })

  test('([inc], [1, 100, -100]) => [2, 100, -100]', () => {
    const shape = [inc]
    const object = [1, 100, -100]

    expect(applyShape(shape, object)).toEqual([2, 100, -100])
  })

  test('([{ value: inc }], [{ value: 0 }, "extra"]) => [{ value: 1 }, "extra"]', () => {
    const shape = [{ value: inc }]
    const object = [{ value: 0 }, "extra"]

    expect(applyShape(shape, object)).toEqual([{ value: 1 }, "extra"])
  })
})
