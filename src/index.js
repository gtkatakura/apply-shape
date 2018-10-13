const isObject = (value) => value !== null && typeof value === 'object'

const isArray = (value) => value instanceof Array

const isFunction = (value) => value instanceof Function

const fromEntries = (entries) => entries.reduce((reduced, [key, value]) => {
  reduced[key] = value
  return reduced
}, {})

const mapValues = (transformation, object) => {
  if (isArray(object)) {
    return object.map(transformation)
  }

  const entries = Object.entries(object).map(([key, value]) => {
    return [key, transformation(value, key)]
  })

  return fromEntries(entries)
}

const applyShape = (shape, object) => {
  if (isObject(object)) {
    return mapValues((value, key) => applyShape(shape[key], value), object)
  }

  if (isFunction(shape)) {
    return shape(object)
  }

  return object
}

export default applyShape
