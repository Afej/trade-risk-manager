import React, { useState } from 'react'
import { Calculator, TrendingDown, AlertCircle, BarChart3 } from 'lucide-react'

const RiskCalculator = () => {
  const [totalAmount, setTotalAmount] = useState(100)
  const [currentLoss, setCurrentLoss] = useState(0)
  const [activeModel, setActiveModel] = useState('simplified')
  const [lossTrigger, setLossTrigger] = useState(3)
  const [firstThreshold, setFirstThreshold] = useState(30)
  const [secondThreshold, setSecondThreshold] = useState(60)
  const [riskReduction1, setRiskReduction1] = useState(70)
  const [riskReduction2, setRiskReduction2] = useState(50)
  const [showHowTo, setShowHowTo] = useState(false)

  // Helper function to safely get numeric values with defaults
  const getNumericValue = (value, defaultVal = 1, min = 1) => {
    if (value === null || value === undefined || value === '') return defaultVal
    const num = Number(value)
    return isNaN(num) ? defaultVal : Math.max(min, num)
  }

  // Simplified Model (configurable reduction after X losses)
  const calculateSimplified = () => {
    const totalAmountValue = getNumericValue(totalAmount, 100)
    const lossTriggerValue = getNumericValue(lossTrigger, 3)

    const initialRisk = totalAmountValue / 10
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

  // Percentage Model (configurable thresholds)
  const calculatePercentage = () => {
    const totalAmountValue = getNumericValue(totalAmount, 100)
    const firstThresholdValue = getNumericValue(firstThreshold, 30)
    const secondThresholdValue = getNumericValue(secondThreshold, 60)
    const riskReduction1Value = getNumericValue(riskReduction1, 70)
    const riskReduction2Value = getNumericValue(riskReduction2, 50)

    const initialRisk = totalAmountValue / 10
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

  // Calculate current risk based on input loss
  const getCurrentRisk = () => {
    const totalAmountValue = getNumericValue(totalAmount, 100)
    const currentLossValue = getNumericValue(currentLoss, 0, 0)
    const lossTriggerValue = getNumericValue(lossTrigger, 3)
    const firstThresholdValue = getNumericValue(firstThreshold, 30)
    const secondThresholdValue = getNumericValue(secondThreshold, 60)
    const riskReduction1Value = getNumericValue(riskReduction1, 70)
    const riskReduction2Value = getNumericValue(riskReduction2, 50)

    const initialRisk = totalAmountValue / 10
    const lossPercentage = currentLossValue / totalAmountValue

    if (activeModel === 'simplified') {
      return currentLossValue >= initialRisk * lossTriggerValue
        ? initialRisk * 0.5
        : initialRisk
    } else {
      if (lossPercentage >= secondThresholdValue / 100)
        return initialRisk * (riskReduction2Value / 100)
      if (lossPercentage >= firstThresholdValue / 100)
        return initialRisk * (riskReduction1Value / 100)
      return initialRisk
    }
  }

  const currentRisk = getCurrentRisk()
  const totalAmountValue = getNumericValue(totalAmount, 100)
  const currentLossValue = getNumericValue(currentLoss, 0, 0)
  const lossPercentage = ((currentLossValue / totalAmountValue) * 100).toFixed(
    1
  )
  const remainingAmount = totalAmountValue - currentLossValue
  const tradesRemaining =
    currentRisk > 0 ? Math.floor(remainingAmount / currentRisk) : 0

  const results =
    activeModel === 'simplified' ? calculateSimplified() : calculatePercentage()

  // Check if we have valid data to show breakdown
  const hasValidData = totalAmountValue > 0 && results.totalTrades > 0

  return (
    <div className='max-w-6xl mx-auto p-3 sm:p-6 bg-gray-50 min-h-screen'>
      <div className='mb-6 sm:mb-8'>
        <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2'>
          <Calculator className='text-blue-600' />
          Risk Management Calculator
        </h1>
        <p className='text-gray-600'>
          Calculate your risk per trade and see how many trades you can take
        </p>
      </div>

      {/* How to Use Section - Collapsible */}
      <div className='mb-6 sm:mb-8 bg-white rounded-lg shadow-lg'>
        <button
          onClick={() => setShowHowTo(!showHowTo)}
          className='w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors'>
          <h2 className='text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2'>
            <AlertCircle className='text-blue-600' />
            How to Use This Calculator
          </h2>
          <span
            className='text-gray-500 transform transition-transform duration-200'
            style={{
              transform: showHowTo ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>
            ▼
          </span>
        </button>

        {showHowTo && (
          <div className='px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 text-gray-700 border-t border-gray-100'>
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                What is "Amount to Risk"?
              </h3>
              <p>
                This is your <strong>maximum drawdown</strong> - the total
                amount you're willing to lose before stopping. For prop
                accounts, this is typically your drawdown limit (e.g., $1,000 on
                a $10,000 account). For personal accounts, it's whatever you can
                afford to lose completely.
              </p>
            </div>

            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Two Risk Models:
              </h3>
              <div className='ml-4 space-y-2'>
                <div>
                  <strong>Simplified Model:</strong> Start with 10% of total
                  amount per trade. After X consecutive losses, reduce to 50% of
                  initial risk.
                </div>
                <div>
                  <strong>Percentage Model:</strong> Reduce risk based on
                  percentage of total amount lost. More gradual scaling as
                  losses mount.
                </div>
              </div>
            </div>

            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Key Benefits:
              </h3>
              <ul className='ml-4 space-y-1'>
                <li>
                  • <strong>Portable:</strong> Works on any account size
                </li>
                <li>
                  • <strong>Simple Math:</strong> Easy to calculate mentally
                </li>
                <li>
                  • <strong>Capital Preservation:</strong> Reduces risk as
                  losses mount
                </li>
                <li>
                  • <strong>Predictable:</strong> Know exactly how many trades
                  you can take
                </li>
              </ul>
            </div>

            <div className='bg-blue-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-blue-800 mb-2'>Example:</h3>
              <p className='text-blue-700'>
                $100 account → $10 per trade initially → 16-20 maximum losing
                trades → Perfect for testing strategies without major capital
                risk
              </p>
            </div>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
        {/* Controls */}
        <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
          <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800'>
            Settings
          </h2>

          {/* Model Selection */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Risk Model
            </label>
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
              <button
                onClick={() => setActiveModel('simplified')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  activeModel === 'simplified'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}>
                Simplified (50% after X losses)
              </button>
              <button
                onClick={() => setActiveModel('percentage')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  activeModel === 'percentage'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}>
                Percentage (Threshold-based)
              </button>
            </div>
          </div>

          {/* Model-specific settings */}
          {activeModel === 'simplified' && (
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Reduce risk after how many losses?
              </label>
              <input
                type='number'
                value={
                  lossTrigger === null || lossTrigger === undefined
                    ? ''
                    : lossTrigger
                }
                onChange={(e) => {
                  const val = e.target.value
                  setLossTrigger(val === '' ? null : Number(val))
                }}
                placeholder='3'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                min='1'
                max='10'
              />
            </div>
          )}

          {activeModel === 'percentage' && (
            <div className='space-y-4 mb-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    First Threshold (%)
                  </label>
                  <input
                    type='number'
                    value={
                      firstThreshold === null || firstThreshold === undefined
                        ? ''
                        : firstThreshold
                    }
                    onChange={(e) => {
                      const val = e.target.value
                      setFirstThreshold(val === '' ? null : Number(val))
                    }}
                    placeholder='30'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    min='1'
                    max='99'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Risk Reduction (%)
                  </label>
                  <input
                    type='number'
                    value={
                      riskReduction1 === null || riskReduction1 === undefined
                        ? ''
                        : riskReduction1
                    }
                    onChange={(e) => {
                      const val = e.target.value
                      setRiskReduction1(val === '' ? null : Number(val))
                    }}
                    placeholder='70'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    min='1'
                    max='100'
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Second Threshold (%)
                  </label>
                  <input
                    type='number'
                    value={
                      secondThreshold === null || secondThreshold === undefined
                        ? ''
                        : secondThreshold
                    }
                    onChange={(e) => {
                      const val = e.target.value
                      setSecondThreshold(val === '' ? null : Number(val))
                    }}
                    placeholder='60'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    min='1'
                    max='99'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Risk Reduction (%)
                  </label>
                  <input
                    type='number'
                    value={
                      riskReduction2 === null || riskReduction2 === undefined
                        ? ''
                        : riskReduction2
                    }
                    onChange={(e) => {
                      const val = e.target.value
                      setRiskReduction2(val === '' ? null : Number(val))
                    }}
                    placeholder='50'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    min='1'
                    max='100'
                  />
                </div>
              </div>
            </div>
          )}

          {/* Total Amount */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Total Amount to Risk (Max Drawdown)
            </label>
            <input
              type='number'
              value={
                totalAmount === null || totalAmount === undefined
                  ? ''
                  : totalAmount
              }
              onChange={(e) => {
                const val = e.target.value
                setTotalAmount(val === '' ? null : Number(val))
              }}
              placeholder='100'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              min='1'
            />
            <p className='text-xs text-gray-500 mt-1'>
              For prop accounts: your drawdown limit. For personal: amount you
              can afford to lose completely.
            </p>
          </div>

          {/* Current Loss */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Current Loss (Optional)
            </label>
            <input
              type='number'
              value={
                currentLoss === null || currentLoss === undefined
                  ? ''
                  : currentLoss
              }
              onChange={(e) => {
                const val = e.target.value
                const numVal = val === '' ? null : Number(val)
                const maxVal = getNumericValue(totalAmount, 100)
                setCurrentLoss(
                  numVal !== null ? Math.min(Math.max(0, numVal), maxVal) : null
                )
              }}
              placeholder='0'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              min='0'
              max={totalAmountValue}
            />
          </div>

          {/* Current Status */}
          <div className='bg-blue-50 p-4 rounded-lg'>
            <h3 className='font-semibold text-blue-800 mb-2 flex items-center gap-2'>
              <TrendingDown size={18} />
              Current Status
            </h3>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Initial Risk per Trade:</span>
                <span className='font-medium'>
                  ${(totalAmountValue / 10).toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Current Risk per Trade:</span>
                <span className='font-medium text-blue-600'>
                  ${currentRisk.toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Loss Percentage:</span>
                <span className='font-medium'>{lossPercentage}%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Remaining Amount:</span>
                <span className='font-medium'>
                  ${remainingAmount.toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Trades Remaining:</span>
                <span className='font-medium text-green-600'>
                  {tradesRemaining}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
          <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2'>
            <BarChart3 className='text-green-600' />
            Model Summary
          </h2>

          <div className='space-y-4'>
            <div className='bg-green-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-green-800 mb-2'>
                Maximum Trades
              </h3>
              <p className='text-2xl font-bold text-green-600'>
                {hasValidData ? results.totalTrades : '-'}
              </p>
              <p className='text-sm text-green-700'>
                Total possible losing trades
              </p>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Risk Breakdown
              </h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span>Initial Risk:</span>
                  <span className='font-medium'>
                    {hasValidData ? `$${results.initialRisk.toFixed(2)}` : '-'}
                  </span>
                </div>
                {activeModel === 'simplified' ? (
                  <div className='flex justify-between'>
                    <span>After {getNumericValue(lossTrigger, 3)} losses:</span>
                    <span className='font-medium'>
                      {hasValidData
                        ? `$${(results.initialRisk * 0.5).toFixed(2)}`
                        : '-'}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className='flex justify-between'>
                      <span>
                        At {getNumericValue(firstThreshold, 30)}% loss:
                      </span>
                      <span className='font-medium'>
                        {hasValidData
                          ? `$${(
                              results.initialRisk *
                              (getNumericValue(riskReduction1, 70) / 100)
                            ).toFixed(2)}`
                          : '-'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>
                        At {getNumericValue(secondThreshold, 60)}% loss:
                      </span>
                      <span className='font-medium'>
                        {hasValidData
                          ? `$${(
                              results.initialRisk *
                              (getNumericValue(riskReduction2, 50) / 100)
                            ).toFixed(2)}`
                          : '-'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className='bg-yellow-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-yellow-800 mb-2 flex items-center gap-2'>
                <AlertCircle size={16} />
                Quick Formula
              </h3>
              <p className='text-sm text-yellow-700'>
                {activeModel === 'simplified'
                  ? `Initial risk = Total ÷ 10. After ${getNumericValue(
                      lossTrigger,
                      3
                    )} losses, risk = Initial × 0.5`
                  : `Initial risk = Total ÷ 10. At ${getNumericValue(
                      firstThreshold,
                      30
                    )}% loss: × ${
                      getNumericValue(riskReduction1, 70) / 100
                    }, At ${getNumericValue(secondThreshold, 60)}% loss: × ${
                      getNumericValue(riskReduction2, 50) / 100
                    }`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Breakdown Table */}
      {hasValidData ? (
        <div className='mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6'>
          <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800'>
            Trade-by-Trade Breakdown
          </h2>
          <div className='overflow-x-auto -mx-2 sm:mx-0'>
            <table className='w-full text-sm min-w-full'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='text-left py-2 px-2 sm:px-3'>Trade #</th>
                  <th className='text-left py-2 px-2 sm:px-3'>Risk Amount</th>
                  <th className='text-left py-2 px-2 sm:px-3'>Remaining</th>
                  {activeModel === 'percentage' && (
                    <th className='text-left py-2 px-2 sm:px-3'>Loss %</th>
                  )}
                  <th className='text-left py-2 px-2 sm:px-3'>Phase</th>
                </tr>
              </thead>
              <tbody>
                {results.trades.slice(0, 20).map((trade, index) => (
                  <tr
                    key={index}
                    className='border-b border-gray-100 hover:bg-gray-50'>
                    <td className='py-2 px-2 sm:px-3 font-medium'>
                      {trade.trade}
                    </td>
                    <td className='py-2 px-2 sm:px-3'>
                      ${trade.risk.toFixed(2)}
                    </td>
                    <td className='py-2 px-2 sm:px-3'>
                      ${trade.remaining.toFixed(2)}
                    </td>
                    {activeModel === 'percentage' && (
                      <td className='py-2 px-2 sm:px-3'>
                        {trade.lossPercentage}%
                      </td>
                    )}
                    <td className='py-2 px-2 sm:px-3'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          trade.phase.includes('Initial')
                            ? 'bg-green-100 text-green-800'
                            : trade.phase.includes('Heavy')
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {trade.phase}
                      </span>
                    </td>
                  </tr>
                ))}
                {results.trades.length > 20 && (
                  <tr>
                    <td
                      colSpan='5'
                      className='py-2 px-2 sm:px-3 text-center text-gray-500'>
                      ... and {results.trades.length - 20} more trades
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6'>
          <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800'>
            Trade-by-Trade Breakdown
          </h2>
          <div className='text-center py-8 text-gray-500'>
            <p>Enter valid values to see the trade breakdown</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className='mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600'>
        <p>
          Built for traders who want predictable, scalable risk management
          across any account size.
        </p>
        <p className='mt-1'>© 2025 Joshua Afekuro</p>
      </footer>
    </div>
  )
}

export default RiskCalculator
