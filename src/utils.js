/**
 * Debt Freedom Utility Functions
 * Formatting, calculations, and storage helpers
 */

export const saveData = (d) => {
  try {
    localStorage.setItem('dfv3', JSON.stringify(d));
  } catch(e) {}
};

export const loadData = () => {
  try {
    const d = localStorage.getItem('dfv3');
    return d ? JSON.parse(d) : null;
  } catch(e) {
    return null;
  }
};

/**
 * Format number as USD currency (no decimals)
 * @param {number} n - Value to format
 * @returns {string} Formatted currency string
 */
export const fmt = (n) => {
  return "$" + Math.abs(n||0).toLocaleString("en-US", {maximumFractionDigits:0});
};

/**
 * Format number as USD currency (2 decimals)
 * @param {number} n - Value to format
 * @returns {string} Formatted currency string
 */
export const fmtD = (n) => {
  return "$" + Math.abs(n||0).toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2});
};

/**
 * Calculate percentage
 * @param {number} a - Numerator
 * @param {number} b - Denominator
 * @returns {number} Rounded percentage
 */
export const pct = (a, b) => {
  return b === 0 ? 0 : Math.round((a / b) * 100);
};

/**
 * Calculate days until a date
 * @param {string} d - Target date (YYYY-MM-DD)
 * @returns {number} Days remaining (min 0)
 */
export const daysTo = (d) => {
  return Math.max(0, Math.round((new Date(d) - new Date()) / 86400000));
};
