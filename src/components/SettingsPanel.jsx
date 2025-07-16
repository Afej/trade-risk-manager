import { handleNumericInput } from '../utils/helpers'
import { DEFAULTS, RISK_CONSTANTS } from '../utils/constants'

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
    resetSettings,
  } = calculations

  return (
    <div className='p-4 bg-white rounded-lg shadow-lg sm:p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold text-gray-800 sm:text-xl'>
          Settings
        </h2>
        <button
          onClick={resetSettings}
          className='px-3 py-1 text-xs text-red-800 bg-red-100 rounded-lg transition-colors hover:bg-red-200'>
          Reset
        </button>
      </div>

      {/* Model Selection */}
      <div className='mb-6'>
        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Risk Model
        </label>
        <div className='flex flex-col gap-2 sm:flex-row sm:gap-4'>
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
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            Reduce risk after how many losses?
          </label>
          <input
            type='number'
            inputMode='numeric'
            pattern='[0-9]*'
            value={
              lossTrigger === null || lossTrigger === undefined
                ? ''
                : lossTrigger
            }
            onChange={(e) =>
              handleNumericInput(
                e.target.value,
                (value) => onSettingsChange('lossTrigger', value),
                { min: 1, max: 10 }
              )
            }
            placeholder={RISK_CONSTANTS.DEFAULT_LOSS_TRIGGER.toString()}
            className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            min='1'
            max='10'
          />
        </div>
      )}

      {activeModel === 'percentage' && (
        <div className='mb-6 space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-700'>
                First Threshold (%)
              </label>
              <input
                type='number'
                inputMode='numeric'
                pattern='[0-9]*'
                value={
                  firstThreshold === null || firstThreshold === undefined
                    ? ''
                    : firstThreshold
                }
                onChange={(e) =>
                  handleNumericInput(
                    e.target.value,
                    (value) => onSettingsChange('firstThreshold', value),
                    { min: 1, max: 99 }
                  )
                }
                placeholder={RISK_CONSTANTS.DEFAULT_FIRST_THRESHOLD.toString()}
                className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                min='1'
                max='99'
              />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-700'>
                Risk Reduction (%)
              </label>
              <input
                type='number'
                inputMode='numeric'
                pattern='[0-9]*'
                value={
                  riskReduction1 === null || riskReduction1 === undefined
                    ? ''
                    : riskReduction1
                }
                onChange={(e) =>
                  handleNumericInput(
                    e.target.value,
                    (value) => onSettingsChange('riskReduction1', value),
                    { min: 1, max: 100 }
                  )
                }
                placeholder={RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_1.toString()}
                className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                min='1'
                max='100'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-700'>
                Second Threshold (%)
              </label>
              <input
                type='number'
                inputMode='numeric'
                pattern='[0-9]*'
                value={
                  secondThreshold === null || secondThreshold === undefined
                    ? ''
                    : secondThreshold
                }
                onChange={(e) =>
                  handleNumericInput(
                    e.target.value,
                    (value) => onSettingsChange('secondThreshold', value),
                    { min: 1, max: 99 }
                  )
                }
                placeholder={RISK_CONSTANTS.DEFAULT_SECOND_THRESHOLD.toString()}
                className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                min='1'
                max='99'
              />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-700'>
                Risk Reduction (%)
              </label>
              <input
                type='number'
                inputMode='numeric'
                pattern='[0-9]*'
                value={
                  riskReduction2 === null || riskReduction2 === undefined
                    ? ''
                    : riskReduction2
                }
                onChange={(e) =>
                  handleNumericInput(
                    e.target.value,
                    (value) => onSettingsChange('riskReduction2', value),
                    { min: 1, max: 100 }
                  )
                }
                placeholder={RISK_CONSTANTS.DEFAULT_RISK_REDUCTION_2.toString()}
                className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                min='1'
                max='100'
              />
            </div>
          </div>
        </div>
      )}

      {/* Total Amount */}
      <div className='mb-6'>
        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Total Amount to Risk (Max Drawdown)
        </label>
        <input
          type='number'
          inputMode='numeric'
          pattern='[0-9]*'
          value={
            totalAmount === null || totalAmount === undefined ? '' : totalAmount
          }
          onChange={(e) =>
            handleNumericInput(
              e.target.value,
              (value) => onSettingsChange('totalAmount', value),
              { min: 1 }
            )
          }
          placeholder={DEFAULTS.TOTAL_AMOUNT.toString()}
          className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          min='1'
        />
        <p className='mt-1 text-xs text-gray-500'>
          For prop accounts: your drawdown limit. For personal: amount you can
          afford to lose completely.
        </p>
      </div>

      {/* Current Loss */}
      <div className='mb-6'>
        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Current Loss (Optional)
        </label>
        <input
          type='number'
          inputMode='numeric'
          pattern='[0-9]*'
          value={
            currentLoss === null || currentLoss === undefined ? '' : currentLoss
          }
          onChange={(e) =>
            handleNumericInput(
              e.target.value,
              (value) => onSettingsChange('currentLoss', value),
              { min: 0 }
            )
          }
          placeholder={DEFAULTS.CURRENT_LOSS.toString()}
          className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          min='0'
        />
      </div>
    </div>
  )
}
