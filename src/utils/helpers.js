/**
 * Safely converts a value to a numeric value with defaults
 * @param {any} value - The value to convert
 * @param {number} defaultVal - Default value if conversion fails
 * @param {number} min - Minimum allowed value
 * @returns {number} The converted numeric value
 */
export const getNumericValue = (value, defaultVal = 1, min = 1) => {
  if (value === null || value === undefined || value === '') return defaultVal
  const num = Number(value)
  return isNaN(num) ? defaultVal : Math.max(min, num)
}

/**
 * Formats a number as currency
 * @param {number} amount - The amount to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, decimals = 2) => {
  return `$${amount.toFixed(decimals)}`
}

/**
 * Calculates percentage with safety checks
 * @param {number} value - The current value
 * @param {number} total - The total value
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Percentage as string
 */
export const calculatePercentage = (value, total, decimals = 1) => {
  if (!total || total === 0) return '0.0'
  return ((value / total) * 100).toFixed(decimals)
}

/**
 * Clamps a value between min and max
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Handles input change for numeric fields with null support
 * @param {string} inputValue - The input value from the event
 * @param {function} setter - The state setter function
 * @param {object} options - Optional configuration
 * @param {number} options.min - Minimum value
 * @param {number} options.max - Maximum value
 */
export const handleNumericInput = (inputValue, setter, options = {}) => {
  const { min, max } = options

  if (inputValue === '') {
    setter(null)
    return
  }

  let numValue = Number(inputValue)
  if (isNaN(numValue)) return // Don't update if invalid

  if (min !== undefined) numValue = Math.max(min, numValue)
  if (max !== undefined) numValue = Math.min(max, numValue)

  setter(numValue)
}
