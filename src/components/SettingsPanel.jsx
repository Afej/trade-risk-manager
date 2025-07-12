export const SettingsPanel = ({ calculations, onSettingsChange }) => {
  const {
    activeModel,
    lossTrigger,
    firstThreshold,
    secondThreshold,
    riskReduction1,
    riskReduction2,
    totalAmount,
    currentLoss,
    getNumericValue,
  } = calculations

  return (
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
            onClick={() => onSettingsChange('activeModel', 'simplified')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              activeModel === 'simplified'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}>
            Simplified (50% after X losses)
          </button>
          <button
            onClick={() => onSettingsChange('activeModel', 'percentage')}
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
            onChange={(e) =>
              onSettingsChange(
                'lossTrigger',
                e.target.value === '' ? null : Number(e.target.value)
              )
            }
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
                onChange={(e) =>
                  onSettingsChange(
                    'firstThreshold',
                    e.target.value === '' ? null : Number(e.target.value)
                  )
                }
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
                onChange={(e) =>
                  onSettingsChange(
                    'riskReduction1',
                    e.target.value === '' ? null : Number(e.target.value)
                  )
                }
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
                onChange={(e) =>
                  onSettingsChange(
                    'secondThreshold',
                    e.target.value === '' ? null : Number(e.target.value)
                  )
                }
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
                onChange={(e) =>
                  onSettingsChange(
                    'riskReduction2',
                    e.target.value === '' ? null : Number(e.target.value)
                  )
                }
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
            totalAmount === null || totalAmount === undefined ? '' : totalAmount
          }
          onChange={(e) =>
            onSettingsChange(
              'totalAmount',
              e.target.value === '' ? null : Number(e.target.value)
            )
          }
          placeholder='100'
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          min='1'
        />
        <p className='text-xs text-gray-500 mt-1'>
          For prop accounts: your drawdown limit. For personal: amount you can
          afford to lose completely.
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
            currentLoss === null || currentLoss === undefined ? '' : currentLoss
          }
          onChange={(e) => {
            const val = e.target.value
            const numVal = val === '' ? null : Number(val)
            const maxVal = getNumericValue(totalAmount, 100)
            onSettingsChange(
              'currentLoss',
              numVal !== null ? Math.min(Math.max(0, numVal), maxVal) : null
            )
          }}
          placeholder='0'
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          min='0'
        />
      </div>
    </div>
  )
}
