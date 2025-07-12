// Risk calculation constants
export const RISK_CONSTANTS = {
  DEFAULT_INITIAL_RISK_PERCENTAGE: 10, // 10% of total amount
  DEFAULT_REDUCTION_PERCENTAGE: 50, // Reduce to 50% after trigger
  DEFAULT_LOSS_TRIGGER: 3, // After 3 losses
  DEFAULT_FIRST_THRESHOLD: 30, // 30% loss threshold
  DEFAULT_SECOND_THRESHOLD: 60, // 60% loss threshold
  DEFAULT_RISK_REDUCTION_1: 70, // Reduce to 70% at first threshold
  DEFAULT_RISK_REDUCTION_2: 50, // Reduce to 50% at second threshold
}

// Daily loss constants
export const DAILY_LOSS_CONSTANTS = {
  CONSERVATIVE_PERCENTAGE: 3,
  STANDARD_PERCENTAGE: 4,
  AGGRESSIVE_PERCENTAGE: 5,
  WARNING_THRESHOLD: 50, // Warn at 50% of daily limit
  DANGER_THRESHOLD: 80, // Danger at 80% of daily limit
  TRADES_PER_DAY_RISK_PERCENTAGE: 1, // Assume 1% risk per trade for daily calculations
}

// UI Constants
export const UI_CONSTANTS = {
  MOBILE_BREAKPOINT: 640,
  TABLET_BREAKPOINT: 768,
  DESKTOP_BREAKPOINT: 1024,
}

// Default values
export const DEFAULTS = {
  TOTAL_AMOUNT: 100,
  ACCOUNT_BALANCE: 10000,
  CURRENT_LOSS: 0,
  DAILY_LOSS_LIMIT: 4,
}
