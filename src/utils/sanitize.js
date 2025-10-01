import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} dirty - The unsanitized input
 * @param {object} options - DOMPurify options
 * @returns {string} - Sanitized output
 */
export const sanitizeHTML = (dirty, options = {}) => {
  if (typeof dirty !== 'string') {
    return dirty
  }

  const defaultOptions = {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  }

  return DOMPurify.sanitize(dirty, { ...defaultOptions, ...options })
}

/**
 * Sanitize an entire object recursively
 * @param {any} input - Input to sanitize
 * @returns {any} - Sanitized output
 */
export const sanitizeObject = (input) => {
  if (typeof input === 'string') {
    return sanitizeHTML(input)
  }

  if (Array.isArray(input)) {
    return input.map(sanitizeObject)
  }

  if (typeof input === 'object' && input !== null) {
    const sanitized = {}
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitized[key] = sanitizeObject(input[key])
      }
    }
    return sanitized
  }

  return input
}

/**
 * Validate and sanitize property data
 * @param {object} property - Property data to validate
 * @returns {object} - Validated and sanitized property
 */
export const validateProperty = (property) => {
  const errors = []

  // Required fields
  if (!property.title || property.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (typeof property.price !== 'number' || property.price < 0) {
    errors.push('Valid price is required')
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '))
  }

  // Sanitize all fields
  return sanitizeObject(property)
}
