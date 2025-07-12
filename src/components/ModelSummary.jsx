import { BarChart3, AlertCircle } from 'lucide-react'
import { formatCurrency, getNumericValue } from '../utils/helpers'
import { RISK_CONSTANTS } from '../utils/constants'

export const ModelSummary = ({ calculations }) => {
  const {
    activeModel,
    hasValidData,
    results,
    lossTrigger,
    firstThreshold,
    secondThreshold,
    riskReduction1,
    riskReduction2,
  } = calculations

  return (
    <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
      <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2'>
        <BarChart3 className='text-green-600' />
        Model Summary
      </h2>

      <div className='space-y-4'>
        <div className='bg-green-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-green-800 mb-2'>Maximum Trades</h3>
          <p className='text-2xl font-bold text-green-600'>
            {hasValidData ? results.totalTrades : '-'}
          </p>
          <p className='text-sm text-green-700'>Total possible losing trades</p>
        </div>

        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-gray-800 mb-2'>Risk Breakdown</h3>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span>Initial Risk:</span>
              <span className='font-medium'>
                {hasValidData ? formatCurrency(results.initialRisk) : '-'}
              </span>
            </div>
            {activeModel === 'simplified' ? (
              <div className='flex justify-between'>
                <span>
                  After{' '}
                  {getNumericValue(
                    lossTrigger,
                    RISK_CONSTANTS.DEFAULT_LOSS_TRIGGER
                  )}{' '}
                  losses:
                </span>
                <span className='font-medium'>
                  {hasValidData
                    ? formatCurrency(
                        results.initialRisk *
                          (RISK_CONSTANTS.DEFAULT_REDUCTION_PERCENTAGE / 100)
                      )
                    : '-'}
                </span>
              </div>
            ) : (
              <>
                <div className='flex justify-between'>
                  <span>
                    At{' '}
                    {getNumericValue(
                      firstThreshold,
                      RISK_CONSTANTS.DEFAULT_FIRST_THRESHOLD
                    )}
                    % loss:
                  </span>
                  <span className='font-medium'>
                    {hasValidData
                      ? formatCurrency(
                          results.initialRisk *
                            (getNumericValue(
                              riskReduction1,
                              RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_1
                            ) /
                              100)
                        )
                      : '-'}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span>
                    At{' '}
                    {getNumericValue(
                      secondThreshold,
                      RISK_CONSTANTS.DEFAULT_SECOND_THRESHOLD
                    )}
                    % loss:
                  </span>
                  <span className='font-medium'>
                    {hasValidData
                      ? formatCurrency(
                          results.initialRisk *
                            (getNumericValue(
                              riskReduction2,
                              RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_2
                            ) /
                              100)
                        )
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
              ? `Initial risk = Total ÷ ${
                  RISK_CONSTANTS.DEFAULT_INITIAL_RISK_PERCENTAGE
                }. After ${getNumericValue(
                  lossTrigger,
                  RISK_CONSTANTS.DEFAULT_LOSS_TRIGGER
                )} losses, risk = Initial × ${
                  RISK_CONSTANTS.DEFAULT_REDUCTION_PERCENTAGE / 100
                }`
              : `Initial risk = Total ÷ ${
                  RISK_CONSTANTS.DEFAULT_INITIAL_RISK_PERCENTAGE
                }. At ${getNumericValue(
                  firstThreshold,
                  RISK_CONSTANTS.DEFAULT_FIRST_THRESHOLD
                )}% loss: × ${
                  getNumericValue(
                    riskReduction1,
                    RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_1
                  ) / 100
                }, At ${getNumericValue(
                  secondThreshold,
                  RISK_CONSTANTS.DEFAULT_SECOND_THRESHOLD
                )}% loss: × ${
                  getNumericValue(
                    riskReduction2,
                    RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_2
                  ) / 100
                }`}
          </p>
        </div>
      </div>
    </div>
  )
}
