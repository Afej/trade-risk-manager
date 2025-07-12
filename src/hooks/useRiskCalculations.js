import { useState, useMemo } from 'react'

export const useRiskCalculations = () => {
  const [totalAmount, setTotalAmount] = useState(100)
  const [currentLoss, setCurrentLoss] = useState(0)
  const [activeModel, setActiveModel] = useState('simplified')
  const [lossTrigger, setLossTrigger] = useState(3)
  const [firstThreshold, setFirstThreshold] = useState(30)
  const [secondThreshold, setSecondThreshold] = useState(60)
  const [riskReduction1, setRiskReduction1] = useState(70)
  const [riskReduction2, setRiskReduction2] = useState(50)

  // Helper function to safely get numeric values with defaults
  const getNumericValue = (value, defaultVal = 1, min = 1) => {
    if (value === null || value === undefined || value === '') return defaultVal
    const num = Number(value)
    return isNaN(num) ? defaultVal : Math.max(min, num)
  }

  // Memoized calculations
  const calculations = useMemo(() => {
    const totalAmountValue = getNumericValue(totalAmount, 100)
    const currentLossValue = getNumericValue(currentLoss, 0, 0)
    const lossTriggerValue = getNumericValue(lossTrigger, 3)
    const firstThresholdValue = getNumericValue(firstThreshold, 30)
    const secondThresholdValue = getNumericValue(secondThreshold, 60)
    const riskReduction1Value = getNumericValue(riskReduction1, 70)
    const riskReduction2Value = getNumericValue(riskReduction2, 50)

    const initialRisk = totalAmountValue / 10

    // Simplified Model calculation
    const calculateSimplified = () => {
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
      currentRisk = initialRisk * 0.5
      while (remainingAmount > 0 && remainingAmount >= currentRisk) {
        tradeCount++
        remainingAmount -= currentRisk
        trades.push({
          trade: tradeCount,
          risk: currentRisk,
          remaining: Math.max(0, remainingAmount),
          phase: 'Reduced Risk (50%)',
        })
      }

      return { trades, totalTrades: tradeCount, initialRisk }
    }

    // Percentage Model calculation
    const calculatePercentage = () => {
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

    // Get current risk
    const lossPercentage = currentLossValue / totalAmountValue
    let currentRisk

    if (activeModel === 'simplified') {
      currentRisk =
        currentLossValue >= initialRisk * lossTriggerValue
          ? initialRisk * 0.5
          : initialRisk
    } else {
      if (lossPercentage >= secondThresholdValue / 100) {
        currentRisk = initialRisk * (riskReduction2Value / 100)
      } else if (lossPercentage >= firstThresholdValue / 100) {
        currentRisk = initialRisk * (riskReduction1Value / 100)
      } else {
        currentRisk = initialRisk
      }
    }

    const results =
      activeModel === 'simplified'
        ? calculateSimplified()
        : calculatePercentage()
    const hasValidData = totalAmountValue > 0 && results.totalTrades > 0
    const remainingAmount = totalAmountValue - currentLossValue
    const tradesRemaining =
      currentRisk > 0 ? Math.floor(remainingAmount / currentRisk) : 0

    return {
      totalAmountValue,
      currentLossValue,
      lossTriggerValue,
      firstThresholdValue,
      secondThresholdValue,
      riskReduction1Value,
      riskReduction2Value,
      currentRisk,
      lossPercentage: ((currentLossValue / totalAmountValue) * 100).toFixed(1),
      remainingAmount,
      tradesRemaining,
      results,
      hasValidData,
      getNumericValue,
    }
  }, [
    totalAmount,
    currentLoss,
    activeModel,
    lossTrigger,
    firstThreshold,
    secondThreshold,
    riskReduction1,
    riskReduction2,
  ])

  return {
    // State
    totalAmount,
    setTotalAmount,
    currentLoss,
    setCurrentLoss,
    activeModel,
    setActiveModel,
    lossTrigger,
    setLossTrigger,
    firstThreshold,
    setFirstThreshold,
    secondThreshold,
    setSecondThreshold,
    riskReduction1,
    setRiskReduction1,
    riskReduction2,
    setRiskReduction2,

    // Calculations
    ...calculations,
  }
}
