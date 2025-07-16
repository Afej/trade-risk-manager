import { useMemo } from 'react'
import { usePersistedSettings } from './usePersistedSettings'
import {
  calculateSimplifiedModel,
  calculatePercentageModel,
  calculateCurrentRisk,
} from '../utils/calculations'
import { calculatePercentage } from '../utils/helpers'
import { DEFAULTS } from '../utils/constants'

const RISK_CALCULATOR_DEFAULTS = {
  totalAmount: DEFAULTS.TOTAL_AMOUNT,
  currentLoss: DEFAULTS.CURRENT_LOSS,
  activeModel: 'simplified',
  lossTrigger: 3,
  firstThreshold: 30,
  secondThreshold: 60,
  riskReduction1: 70,
  riskReduction2: 50,
}

export const useRiskCalculations = () => {
  const [settings, updateSetting, resetSettings] = usePersistedSettings(
    'riskCalculatorSettings',
    RISK_CALCULATOR_DEFAULTS
  )

  const calculations = useMemo(() => {
    const params = {
      totalAmount: settings.totalAmount,
      currentLoss: settings.currentLoss,
      activeModel: settings.activeModel,
      lossTrigger: settings.lossTrigger,
      firstThreshold: settings.firstThreshold,
      secondThreshold: settings.secondThreshold,
      riskReduction1: settings.riskReduction1,
      riskReduction2: settings.riskReduction2,
    }

    const results =
      settings.activeModel === 'simplified'
        ? calculateSimplifiedModel(params)
        : calculatePercentageModel(params)

    const currentRisk = calculateCurrentRisk(params)
    const totalAmountValue = settings.totalAmount || DEFAULTS.TOTAL_AMOUNT
    const currentLossValue = settings.currentLoss || 0
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
  }, [settings])

  return {
    // Settings with individual getters for easy access
    totalAmount: settings.totalAmount,
    currentLoss: settings.currentLoss,
    activeModel: settings.activeModel,
    lossTrigger: settings.lossTrigger,
    firstThreshold: settings.firstThreshold,
    secondThreshold: settings.secondThreshold,
    riskReduction1: settings.riskReduction1,
    riskReduction2: settings.riskReduction2,

    // Setters
    setTotalAmount: (value) => updateSetting('totalAmount', value),
    setCurrentLoss: (value) => updateSetting('currentLoss', value),
    setActiveModel: (value) => updateSetting('activeModel', value),
    setLossTrigger: (value) => updateSetting('lossTrigger', value),
    setFirstThreshold: (value) => updateSetting('firstThreshold', value),
    setSecondThreshold: (value) => updateSetting('secondThreshold', value),
    setRiskReduction1: (value) => updateSetting('riskReduction1', value),
    setRiskReduction2: (value) => updateSetting('riskReduction2', value),

    // Reset function
    resetSettings,

    // Calculations
    ...calculations,
  }
}
