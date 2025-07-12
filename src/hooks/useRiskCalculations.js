import { useState, useMemo } from 'react'
import {
  calculateSimplifiedModel,
  calculatePercentageModel,
  calculateCurrentRisk,
} from '../utils/calculations'
import { calculatePercentage } from '../utils/helpers'
import { DEFAULTS } from '../utils/constants'

export const useRiskCalculations = () => {
  const [totalAmount, setTotalAmount] = useState(DEFAULTS.TOTAL_AMOUNT)
  const [currentLoss, setCurrentLoss] = useState(DEFAULTS.CURRENT_LOSS)
  const [activeModel, setActiveModel] = useState('simplified')
  const [lossTrigger, setLossTrigger] = useState(3)
  const [firstThreshold, setFirstThreshold] = useState(30)
  const [secondThreshold, setSecondThreshold] = useState(60)
  const [riskReduction1, setRiskReduction1] = useState(70)
  const [riskReduction2, setRiskReduction2] = useState(50)

  const calculations = useMemo(() => {
    const params = {
      totalAmount,
      currentLoss,
      activeModel,
      lossTrigger,
      firstThreshold,
      secondThreshold,
      riskReduction1,
      riskReduction2,
    }

    const results =
      activeModel === 'simplified'
        ? calculateSimplifiedModel(params)
        : calculatePercentageModel(params)

    const currentRisk = calculateCurrentRisk(params)
    const totalAmountValue = totalAmount || DEFAULTS.TOTAL_AMOUNT
    const currentLossValue = currentLoss || 0
    const remainingAmount = totalAmountValue - currentLossValue
    const tradesRemaining =
      currentRisk > 0 ? Math.floor(remainingAmount / currentRisk) : 0
    const hasValidData = totalAmountValue > 0 && results.totalTrades > 0

    return {
      totalAmountValue,
      currentLossValue,
      currentRisk,
      lossPercentage: calculatePercentage(currentLossValue, totalAmountValue),
      remainingAmount,
      tradesRemaining,
      results,
      hasValidData,
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
