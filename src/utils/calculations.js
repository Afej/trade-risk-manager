import { getNumericValue } from './helpers'
import { RISK_CONSTANTS } from './constants'

/**
 * Calculates the simplified risk model
 * @param {object} params - Calculation parameters
 * @returns {object} Calculation results
 */
export const calculateSimplifiedModel = (params) => {
  const { totalAmount, lossTrigger = RISK_CONSTANTS.DEFAULT_LOSS_TRIGGER } =
    params

  const totalAmountValue = getNumericValue(totalAmount, 100)
  const lossTriggerValue = getNumericValue(
    lossTrigger,
    RISK_CONSTANTS.DEFAULT_LOSS_TRIGGER
  )

  const initialRisk =
    totalAmountValue / RISK_CONSTANTS.DEFAULT_INITIAL_RISK_PERCENTAGE
  const trades = []
  let remainingAmount = totalAmountValue
  let tradeCount = 0
  let currentRisk = initialRisk

  // First X trades at full risk
  for (let i = 0; i < lossTriggerValue && remainingAmount > 0; i++) {
    tradeCount++
    remainingAmount -= currentRisk
    trades.push({
      trade: tradeCount,
      risk: currentRisk,
      remaining: Math.max(0, remainingAmount),
      phase: 'Initial Risk',
    })
  }

  // Remaining trades at reduced risk
  currentRisk =
    initialRisk * (RISK_CONSTANTS.DEFAULT_REDUCTION_PERCENTAGE / 100)
  while (remainingAmount > 0 && remainingAmount >= currentRisk) {
    tradeCount++
    remainingAmount -= currentRisk
    trades.push({
      trade: tradeCount,
      risk: currentRisk,
      remaining: Math.max(0, remainingAmount),
      phase: `Reduced Risk (${RISK_CONSTANTS.DEFAULT_REDUCTION_PERCENTAGE}%)`,
    })
  }

  return { trades, totalTrades: tradeCount, initialRisk }
}

/**
 * Calculates the percentage-based risk model
 * @param {object} params - Calculation parameters
 * @returns {object} Calculation results
 */
export const calculatePercentageModel = (params) => {
  const {
    totalAmount,
    firstThreshold = RISK_CONSTANTS.DEFAULT_FIRST_THRESHOLD,
    secondThreshold = RISK_CONSTANTS.DEFAULT_SECOND_THRESHOLD,
    riskReduction1 = RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_1,
    riskReduction2 = RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_2,
  } = params

  const totalAmountValue = getNumericValue(totalAmount, 100)
  const firstThresholdValue = getNumericValue(
    firstThreshold,
    RISK_CONSTANTS.DEFAULT_FIRST_THRESHOLD
  )
  const secondThresholdValue = getNumericValue(
    secondThreshold,
    RISK_CONSTANTS.DEFAULT_SECOND_THRESHOLD
  )
  const riskReduction1Value = getNumericValue(
    riskReduction1,
    RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_1
  )
  const riskReduction2Value = getNumericValue(
    riskReduction2,
    RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_2
  )

  const initialRisk =
    totalAmountValue / RISK_CONSTANTS.DEFAULT_INITIAL_RISK_PERCENTAGE
  const trades = []
  let remainingAmount = totalAmountValue
  let tradeCount = 0
  let currentRisk = initialRisk
  let totalLost = 0

  while (remainingAmount > 0 && remainingAmount >= currentRisk) {
    tradeCount++

    // Calculate current phase BEFORE taking the trade
    let phase = 'Initial Risk (100%)'
    const currentLossPercentage = totalLost / totalAmountValue

    if (currentLossPercentage >= secondThresholdValue / 100) {
      currentRisk = initialRisk * (riskReduction2Value / 100)
      phase = `Heavy Loss (${riskReduction2Value}% risk)`
    } else if (currentLossPercentage >= firstThresholdValue / 100) {
      currentRisk = initialRisk * (riskReduction1Value / 100)
      phase = `Moderate Loss (${riskReduction1Value}% risk)`
    }

    remainingAmount -= currentRisk
    totalLost += currentRisk

    trades.push({
      trade: tradeCount,
      risk: currentRisk,
      remaining: Math.max(0, remainingAmount),
      lossPercentage: ((totalLost / totalAmountValue) * 100).toFixed(1),
      phase,
    })
  }

  return { trades, totalTrades: tradeCount, initialRisk }
}

/**
 * Calculates current risk based on model and current loss
 * @param {object} params - Calculation parameters
 * @returns {number} Current risk amount
 */
export const calculateCurrentRisk = (params) => {
  const {
    activeModel,
    totalAmount,
    currentLoss,
    lossTrigger,
    firstThreshold,
    secondThreshold,
    riskReduction1,
    riskReduction2,
  } = params

  const totalAmountValue = getNumericValue(totalAmount, 100)
  const currentLossValue = getNumericValue(currentLoss, 0, 0)
  const initialRisk =
    totalAmountValue / RISK_CONSTANTS.DEFAULT_INITIAL_RISK_PERCENTAGE

  if (activeModel === 'simplified') {
    const lossTriggerValue = getNumericValue(
      lossTrigger,
      RISK_CONSTANTS.DEFAULT_LOSS_TRIGGER
    )
    return currentLossValue >= initialRisk * lossTriggerValue
      ? initialRisk * (RISK_CONSTANTS.DEFAULT_REDUCTION_PERCENTAGE / 100)
      : initialRisk
  } else {
    const firstThresholdValue = getNumericValue(
      firstThreshold,
      RISK_CONSTANTS.DEFAULT_FIRST_THRESHOLD
    )
    const secondThresholdValue = getNumericValue(
      secondThreshold,
      RISK_CONSTANTS.DEFAULT_SECOND_THRESHOLD
    )
    const riskReduction1Value = getNumericValue(
      riskReduction1,
      RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_1
    )
    const riskReduction2Value = getNumericValue(
      riskReduction2,
      RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_2
    )

    const lossPercentage = currentLossValue / totalAmountValue

    if (lossPercentage >= secondThresholdValue / 100) {
      return initialRisk * (riskReduction2Value / 100)
    }
    if (lossPercentage >= firstThresholdValue / 100) {
      return initialRisk * (riskReduction1Value / 100)
    }
    return initialRisk
  }
}

/**
 * Calculates daily loss metrics
 * @param {object} params - Daily loss parameters
 * @returns {object} Daily loss calculations
 */
export const calculateDailyLossMetrics = (params) => {
  const { accountBalance, dailyLossLimit, currentDailyLoss } = params

  const accountBalanceValue = getNumericValue(accountBalance, 10000, 1)
  const dailyLossLimitValue = getNumericValue(dailyLossLimit, 4, 0.1)
  const currentDailyLossValue = getNumericValue(currentDailyLoss, 0, 0)

  const dailyLossAmount = (accountBalanceValue * dailyLossLimitValue) / 100
  const remainingDailyLimit = Math.max(
    0,
    dailyLossAmount - currentDailyLossValue
  )
  const initialRisk = accountBalanceValue / 100 // Assuming 1% per trade
  const maxTradesPerDay = Math.floor(dailyLossAmount / initialRisk)
  const remainingTrades = Math.floor(remainingDailyLimit / initialRisk)
  const usedPercentage = (
    (currentDailyLossValue / dailyLossAmount) *
    100
  ).toFixed(1)

  return {
    dailyLossAmount,
    remainingDailyLimit,
    maxTradesPerDay,
    remainingTrades,
    usedPercentage,
    shouldStop: currentDailyLossValue >= dailyLossAmount * 0.5,
    isDangerZone: currentDailyLossValue >= dailyLossAmount * 0.8,
  }
}
