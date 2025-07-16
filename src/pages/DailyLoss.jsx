import {
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
} from 'lucide-react'
import { usePersistedSettings } from '../hooks/usePersistedSettings'
import { calculateDailyLossMetrics } from '../utils/calculations'
import { handleNumericInput, formatCurrency } from '../utils/helpers'
import { DEFAULTS, DAILY_LOSS_CONSTANTS } from '../utils/constants'

const DAILY_LOSS_DEFAULTS = {
  accountBalance: DEFAULTS.ACCOUNT_BALANCE,
  dailyLossLimit: DEFAULTS.DAILY_LOSS_LIMIT,
  currentDailyLoss: DEFAULTS.CURRENT_LOSS,
}

const DailyLoss = () => {
  const [settings, updateSetting, resetSettings] = usePersistedSettings(
    'dailyLossSettings',
    DAILY_LOSS_DEFAULTS
  )

  const dailyCalc = calculateDailyLossMetrics({
    accountBalance: settings.accountBalance,
    dailyLossLimit: settings.dailyLossLimit,
    currentDailyLoss: settings.currentDailyLoss,
  })

  return (
    <div className='p-3 mx-auto max-w-6xl sm:p-6'>
      <div className='mb-6 sm:mb-8'>
        <h1 className='flex gap-2 items-center mb-2 text-xl font-bold text-gray-800 sm:text-2xl'>
          <Shield className='text-green-600' />
          Daily Loss Management
        </h1>
        <p className='text-gray-600'>
          Manage your daily risk limits and track your progress
        </p>
      </div>

      {/* Daily Loss Calculator */}
      <div className='p-4 mb-6 bg-white rounded-lg shadow-lg sm:p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold text-gray-800 sm:text-xl'>
            Daily Loss Calculator
          </h2>
          <button
            onClick={resetSettings}
            className='px-3 py-1 text-xs text-red-800 bg-red-100 rounded-lg transition-colors hover:bg-red-200'>
            Reset
          </button>
        </div>

        <div className='grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3'>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-700'>
              Account Balance
            </label>
            <input
              type='number'
              inputMode='numeric'
              pattern='[0-9]*'
              value={
                settings.accountBalance === null ||
                settings.accountBalance === undefined
                  ? ''
                  : settings.accountBalance
              }
              onChange={(e) =>
                handleNumericInput(
                  e.target.value,
                  (value) => updateSetting('accountBalance', value),
                  { min: 1 }
                )
              }
              placeholder={DEFAULTS.ACCOUNT_BALANCE.toString()}
              className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              min='1'
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-700'>
              Daily Loss Limit (%)
            </label>
            <input
              type='number'
              inputMode='numeric'
              pattern='[0-9]*'
              value={
                settings.dailyLossLimit === null ||
                settings.dailyLossLimit === undefined
                  ? ''
                  : settings.dailyLossLimit
              }
              onChange={(e) =>
                handleNumericInput(
                  e.target.value,
                  (value) => updateSetting('dailyLossLimit', value),
                  { min: 0.1, max: 20 }
                )
              }
              placeholder={DEFAULTS.DAILY_LOSS_LIMIT.toString()}
              step='0.5'
              className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              min='0.1'
              max='20'
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-700'>
              Current Daily Loss
            </label>
            <input
              type='number'
              inputMode='numeric'
              pattern='[0-9]*'
              value={
                settings.currentDailyLoss === null ||
                settings.currentDailyLoss === undefined
                  ? ''
                  : settings.currentDailyLoss
              }
              onChange={(e) =>
                handleNumericInput(
                  e.target.value,
                  (value) => updateSetting('currentDailyLoss', value),
                  { min: 0 }
                )
              }
              placeholder={DEFAULTS.CURRENT_LOSS.toString()}
              className='px-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              min='0'
            />
          </div>
        </div>

        {/* Quick Preset Buttons */}
        <div className='pb-4 mb-6 border-b border-gray-200'>
          <h3 className='mb-3 text-sm font-medium text-gray-800'>
            Quick Presets
          </h3>
          <div className='flex flex-wrap gap-2'>
            <button
              onClick={() =>
                updateSetting(
                  'dailyLossLimit',
                  DAILY_LOSS_CONSTANTS.CONSERVATIVE_PERCENTAGE
                )
              }
              className='px-3 py-2 text-sm text-purple-800 bg-purple-100 rounded-lg transition-colors hover:bg-purple-200'>
              Conservative ({DAILY_LOSS_CONSTANTS.CONSERVATIVE_PERCENTAGE}%)
            </button>
            <button
              onClick={() =>
                updateSetting(
                  'dailyLossLimit',
                  DAILY_LOSS_CONSTANTS.STANDARD_PERCENTAGE
                )
              }
              className='px-3 py-2 text-sm text-blue-800 bg-blue-100 rounded-lg transition-colors hover:bg-blue-200'>
              Standard ({DAILY_LOSS_CONSTANTS.STANDARD_PERCENTAGE}%)
            </button>
            <button
              onClick={() =>
                updateSetting(
                  'dailyLossLimit',
                  DAILY_LOSS_CONSTANTS.AGGRESSIVE_PERCENTAGE
                )
              }
              className='px-3 py-2 text-sm text-green-800 bg-green-100 rounded-lg transition-colors hover:bg-green-200'>
              Aggressive ({DAILY_LOSS_CONSTANTS.AGGRESSIVE_PERCENTAGE}%)
            </button>
            <button
              onClick={() => updateSetting('currentDailyLoss', 0)}
              className='px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg transition-colors hover:bg-gray-200'>
              Reset Daily Loss
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='p-4 bg-red-50 rounded-lg border border-red-200'>
            <h3 className='mb-1 text-sm font-medium text-red-800'>
              Daily Limit
            </h3>
            <p className='text-2xl font-bold text-red-600'>
              {formatCurrency(dailyCalc.dailyLossAmount)}
            </p>
          </div>
          <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
            <h3 className='mb-1 text-sm font-medium text-blue-800'>
              Remaining Limit
            </h3>
            <p className='text-2xl font-bold text-blue-600'>
              {formatCurrency(dailyCalc.remainingDailyLimit)}
            </p>
          </div>
          <div className='p-4 bg-green-50 rounded-lg border border-green-200'>
            <h3 className='mb-1 text-sm font-medium text-green-800'>
              Max Trades/Day
            </h3>
            <p className='text-2xl font-bold text-green-600'>
              {dailyCalc.maxTradesPerDay}
            </p>
          </div>
          <div className='p-4 bg-yellow-50 rounded-lg border border-yellow-200'>
            <h3 className='mb-1 text-sm font-medium text-yellow-800'>
              Remaining Trades
            </h3>
            <p className='text-2xl font-bold text-yellow-600'>
              {dailyCalc.remainingTrades}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='mb-4'>
          <div className='flex justify-between mb-2 text-sm text-gray-600'>
            <span>Daily Limit Used</span>
            <span>{dailyCalc.usedPercentage}%</span>
          </div>
          <div className='w-full h-3 bg-gray-200 rounded-full'>
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                dailyCalc.usedPercentage > DAILY_LOSS_CONSTANTS.DANGER_THRESHOLD
                  ? 'bg-red-500'
                  : dailyCalc.usedPercentage >
                    DAILY_LOSS_CONSTANTS.WARNING_THRESHOLD
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{
                width: `${Math.min(100, dailyCalc.usedPercentage)}%`,
              }}></div>
          </div>
        </div>

        {/* Alerts */}
        {dailyCalc.shouldStop && !dailyCalc.isDangerZone && (
          <div className='p-4 mb-4 bg-orange-50 rounded-lg border border-orange-200'>
            <div className='flex gap-2 items-center mb-2'>
              <AlertTriangle className='text-orange-500' size={20} />
              <h3 className='font-semibold text-orange-800'>
                Consider Stopping Trading
              </h3>
            </div>
            <p className='text-sm text-orange-700'>
              You've reached {DAILY_LOSS_CONSTANTS.WARNING_THRESHOLD}% of your
              daily loss limit. Many successful traders stop here to preserve
              capital and avoid emotional decisions.
            </p>
          </div>
        )}

        {dailyCalc.isDangerZone && (
          <div className='p-4 mb-4 bg-red-50 rounded-lg border border-red-200'>
            <div className='flex gap-2 items-center mb-2'>
              <AlertCircle className='text-red-500' size={20} />
              <h3 className='font-semibold text-red-800'>
                Danger Zone - Stop Trading
              </h3>
            </div>
            <p className='text-sm text-red-700'>
              You've reached {DAILY_LOSS_CONSTANTS.DANGER_THRESHOLD}% of your
              daily loss limit. You should stop trading immediately to protect
              your account.
            </p>
          </div>
        )}

        {dailyCalc.usedPercentage >= 100 && (
          <div className='p-4 mb-4 bg-red-50 rounded-lg border border-red-200'>
            <div className='flex gap-2 items-center mb-2'>
              <AlertCircle className='text-red-500' size={20} />
              <h3 className='font-semibold text-red-800'>
                Daily Limit Exceeded
              </h3>
            </div>
            <p className='text-sm text-red-700'>
              You've exceeded your daily loss limit. Step away from trading and
              come back tomorrow with a fresh perspective.
            </p>
          </div>
        )}
      </div>

      {/* Daily Trading Tips */}
      <div className='p-4 mb-6 bg-white rounded-lg shadow-lg sm:p-6'>
        <h2 className='mb-4 text-lg font-semibold text-gray-800 sm:text-xl'>
          Daily Trading Tips
        </h2>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='p-4 bg-blue-50 rounded-lg'>
            <div className='flex gap-2 items-center mb-3'>
              <Shield className='text-blue-500' size={20} />
              <h4 className='font-medium text-blue-800'>Set Daily Limits</h4>
            </div>
            <p className='mb-3 text-sm text-blue-700'>
              Most prop firms and successful traders use 4-5% daily loss limits
              to prevent emotional revenge trading.
            </p>
            <div className='space-y-1 text-xs text-blue-600'>
              <div>
                • Conservative: {DAILY_LOSS_CONSTANTS.CONSERVATIVE_PERCENTAGE}%
              </div>
              <div>
                • Standard: {DAILY_LOSS_CONSTANTS.STANDARD_PERCENTAGE}-
                {DAILY_LOSS_CONSTANTS.AGGRESSIVE_PERCENTAGE}%
              </div>
              <div>• Aggressive: 6%+ (not recommended)</div>
            </div>
          </div>

          <div className='p-4 bg-green-50 rounded-lg'>
            <div className='flex gap-2 items-center mb-3'>
              <Clock className='text-green-500' size={20} />
              <h4 className='font-medium text-green-800'>
                Take Strategic Breaks
              </h4>
            </div>
            <p className='mb-3 text-sm text-green-700'>
              Step away when you hit certain thresholds to maintain objectivity.
            </p>
            <div className='space-y-1 text-xs text-green-600'>
              <div>• 25% of limit: Review strategy</div>
              <div>
                • {DAILY_LOSS_CONSTANTS.WARNING_THRESHOLD}% of limit: Consider
                stopping
              </div>
              <div>
                • {DAILY_LOSS_CONSTANTS.DANGER_THRESHOLD}% of limit: Mandatory
                break
              </div>
            </div>
          </div>

          <div className='p-4 bg-orange-50 rounded-lg'>
            <div className='flex gap-2 items-center mb-3'>
              <AlertTriangle className='text-orange-500' size={20} />
              <h4 className='font-medium text-orange-800'>
                Quality Over Quantity
              </h4>
            </div>
            <p className='mb-3 text-sm text-orange-700'>
              Focus on fewer, high-probability trades rather than many impulsive
              ones.
            </p>
            <div className='space-y-1 text-xs text-orange-600'>
              <div>• Plan trades before market open</div>
              <div>• Stick to your watchlist</div>
              <div>• Avoid FOMO trades</div>
            </div>
          </div>

          <div className='p-4 bg-purple-50 rounded-lg'>
            <div className='flex gap-2 items-center mb-3'>
              <CheckCircle className='text-purple-500' size={20} />
              <h4 className='font-medium text-purple-800'>
                Daily Reset Mindset
              </h4>
            </div>
            <p className='mb-3 text-sm text-purple-700'>
              Each trading day is independent. Yesterday's results don't
              determine today's limits.
            </p>
            <div className='space-y-1 text-xs text-purple-600'>
              <div>• Fresh start every day</div>
              <div>• Don't chase yesterday's losses</div>
              <div>• Celebrate small wins</div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Daily Rule */}
      <div className='p-4 bg-yellow-50 rounded-lg border border-yellow-200 sm:p-6'>
        <div className='flex gap-2 items-center mb-3'>
          <AlertCircle className='text-yellow-600' size={24} />
          <h2 className='text-lg font-semibold text-yellow-800'>
            Golden Rule of Daily Trading
          </h2>
        </div>
        <p className='mb-3 text-yellow-700'>
          <strong>
            Never exceed {DAILY_LOSS_CONSTANTS.STANDARD_PERCENTAGE}-
            {DAILY_LOSS_CONSTANTS.AGGRESSIVE_PERCENTAGE}% of your main account
            balance in daily losses.
          </strong>{' '}
          This single rule has saved more trading careers than any other risk
          management technique.
        </p>
        <div className='grid grid-cols-1 gap-4 text-sm sm:grid-cols-3'>
          <div className='p-3 bg-white rounded border'>
            <div className='font-medium text-gray-800'>$10,000 Account</div>
            <div className='text-gray-600'>Max daily loss: $400-500</div>
          </div>
          <div className='p-3 bg-white rounded border'>
            <div className='font-medium text-gray-800'>$25,000 Account</div>
            <div className='text-gray-600'>Max daily loss: $1,000-1,250</div>
          </div>
          <div className='p-3 bg-white rounded border'>
            <div className='font-medium text-gray-800'>$100,000 Account</div>
            <div className='text-gray-600'>Max daily loss: $4,000-5,000</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyLoss
