import { BarChart3, AlertCircle } from 'lucide-react'

export const ModelSummary = ({ calculations }) => {
  const {
    activeModel,
    hasValidData,
    results,
    getNumericValue,
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
                  <span>At {getNumericValue(firstThreshold, 30)}% loss:</span>
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
                  <span>At {getNumericValue(secondThreshold, 60)}% loss:</span>
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
  )
}
