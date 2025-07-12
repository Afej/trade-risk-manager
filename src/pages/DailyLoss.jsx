import { useState } from 'react'
import {
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
} from 'lucide-react'

const DailyLoss = () => {
  const [accountBalance, setAccountBalance] = useState(10000)
  const [dailyLossLimit, setDailyLossLimit] = useState(4)
  const [currentDailyLoss, setCurrentDailyLoss] = useState(0)

  const getNumericValue = (value, defaultVal = 1, min = 0) => {
    if (value === null || value === undefined || value === '') return defaultVal
    const num = Number(value)
    return isNaN(num) ? defaultVal : Math.max(min, num)
  }

  const calculateDailyLoss = () => {
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
    }
  }

  const dailyCalc = calculateDailyLoss()

  return (
    <div className='max-w-6xl mx-auto p-3 sm:p-6'>
      <div className='mb-6 sm:mb-8'>
        <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2'>
          <Shield className='text-green-600' />
          Daily Loss Management
        </h1>
        <p className='text-gray-600'>
          Manage your daily risk limits and track your progress
        </p>
      </div>

      {/* Daily Loss Calculator */}
      <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6'>
        <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800'>
          Daily Loss Calculator
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Account Balance
            </label>
            <input
              type='number'
              value={
                accountBalance === null || accountBalance === undefined
                  ? ''
                  : accountBalance
              }
              onChange={(e) => {
                const val = e.target.value
                setAccountBalance(val === '' ? null : Number(val))
              }}
              placeholder='10000'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              min='1'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Daily Loss Limit (%)
            </label>
            <input
              type='number'
              value={
                dailyLossLimit === null || dailyLossLimit === undefined
                  ? ''
                  : dailyLossLimit
              }
              onChange={(e) => {
                const val = e.target.value
                setDailyLossLimit(val === '' ? null : Number(val))
              }}
              placeholder='4'
              step='0.5'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              min='0.1'
              max='20'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Current Daily Loss
            </label>
            <input
              type='number'
              value={
                currentDailyLoss === null || currentDailyLoss === undefined
                  ? ''
                  : currentDailyLoss
              }
              onChange={(e) => {
                const val = e.target.value
                setCurrentDailyLoss(
                  val === '' ? null : Math.max(0, Number(val) || 0)
                )
              }}
              placeholder='0'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              min='0'
            />
          </div>
        </div>

        {/* Quick Preset Buttons - Moved here */}
        <div className='mb-6 pb-4 border-b border-gray-200'>
          <h3 className='font-medium text-gray-800 mb-3 text-sm'>
            Quick Presets
          </h3>
          <div className='flex flex-wrap gap-2'>
            <button
              onClick={() => setDailyLossLimit(3)}
              className='px-3 py-2 text-sm bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors'>
              Conservative (3%)
            </button>
            <button
              onClick={() => setDailyLossLimit(4)}
              className='px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors'>
              Standard (4%)
            </button>
            <button
              onClick={() => setDailyLossLimit(5)}
              className='px-3 py-2 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors'>
              Aggressive (5%)
            </button>
            <button
              onClick={() => setCurrentDailyLoss(0)}
              className='px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors'>
              Reset Daily Loss
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
          <div className='bg-red-50 p-4 rounded-lg border border-red-200'>
            <h3 className='text-sm font-medium text-red-800 mb-1'>
              Daily Limit
            </h3>
            <p className='text-2xl font-bold text-red-600'>
              ${dailyCalc.dailyLossAmount.toFixed(2)}
            </p>
          </div>
          <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
            <h3 className='text-sm font-medium text-blue-800 mb-1'>
              Remaining Limit
            </h3>
            <p className='text-2xl font-bold text-blue-600'>
              ${dailyCalc.remainingDailyLimit.toFixed(2)}
            </p>
          </div>
          <div className='bg-green-50 p-4 rounded-lg border border-green-200'>
            <h3 className='text-sm font-medium text-green-800 mb-1'>
              Max Trades/Day
            </h3>
            <p className='text-2xl font-bold text-green-600'>
              {dailyCalc.maxTradesPerDay}
            </p>
          </div>
          <div className='bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
            <h3 className='text-sm font-medium text-yellow-800 mb-1'>
              Remaining Trades
            </h3>
            <p className='text-2xl font-bold text-yellow-600'>
              {dailyCalc.remainingTrades}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='mb-4'>
          <div className='flex justify-between text-sm text-gray-600 mb-2'>
            <span>Daily Limit Used</span>
            <span>{dailyCalc.usedPercentage}%</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                dailyCalc.usedPercentage > 80
                  ? 'bg-red-500'
                  : dailyCalc.usedPercentage > 50
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{
                width: `${Math.min(100, dailyCalc.usedPercentage)}%`,
              }}></div>
          </div>
        </div>

        {/* Alerts */}
        {dailyCalc.shouldStop && (
          <div className='bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4'>
            <div className='flex items-center gap-2 mb-2'>
              <AlertTriangle className='text-orange-500' size={20} />
              <h3 className='font-semibold text-orange-800'>
                Consider Stopping Trading
              </h3>
            </div>
            <p className='text-sm text-orange-700'>
              You've reached 50% of your daily loss limit. Many successful
              traders stop here to preserve capital and avoid emotional
              decisions.
            </p>
          </div>
        )}

        {dailyCalc.usedPercentage >= 100 && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
            <div className='flex items-center gap-2 mb-2'>
              <AlertCircle className='text-red-500' size={20} />
              <h3 className='font-semibold text-red-800'>
                Daily Limit Reached
              </h3>
            </div>
            <p className='text-sm text-red-700'>
              You've hit your daily loss limit. Step away from trading and come
              back tomorrow with a fresh perspective.
            </p>
          </div>
        )}
      </div>

      {/* Daily Trading Tips */}
      <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6'>
        <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800'>
          Daily Trading Tips
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='p-4 bg-blue-50 rounded-lg'>
            <div className='flex items-center gap-2 mb-3'>
              <Shield className='text-blue-500' size={20} />
              <h4 className='font-medium text-blue-800'>Set Daily Limits</h4>
            </div>
            <p className='text-sm text-blue-700 mb-3'>
              Most prop firms and successful traders use 4-5% daily loss limits
              to prevent emotional revenge trading.
            </p>
            <div className='space-y-1 text-xs text-blue-600'>
              <div>• Conservative: 3%</div>
              <div>• Standard: 4-5%</div>
              <div>• Aggressive: 6%+ (not recommended)</div>
            </div>
          </div>

          <div className='p-4 bg-green-50 rounded-lg'>
            <div className='flex items-center gap-2 mb-3'>
              <Clock className='text-green-500' size={20} />
              <h4 className='font-medium text-green-800'>
                Take Strategic Breaks
              </h4>
            </div>
            <p className='text-sm text-green-700 mb-3'>
              Step away when you hit certain thresholds to maintain objectivity.
            </p>
            <div className='space-y-1 text-xs text-green-600'>
              <div>• 25% of limit: Review strategy</div>
              <div>• 50% of limit: Consider stopping</div>
              <div>• 75% of limit: Mandatory break</div>
            </div>
          </div>

          <div className='p-4 bg-orange-50 rounded-lg'>
            <div className='flex items-center gap-2 mb-3'>
              <AlertTriangle className='text-orange-500' size={20} />
              <h4 className='font-medium text-orange-800'>
                Quality Over Quantity
              </h4>
            </div>
            <p className='text-sm text-orange-700 mb-3'>
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
            <div className='flex items-center gap-2 mb-3'>
              <CheckCircle className='text-purple-500' size={20} />
              <h4 className='font-medium text-purple-800'>
                Daily Reset Mindset
              </h4>
            </div>
            <p className='text-sm text-purple-700 mb-3'>
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
      <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6'>
        <div className='flex items-center gap-2 mb-3'>
          <AlertCircle className='text-yellow-600' size={24} />
          <h2 className='text-lg font-semibold text-yellow-800'>
            Golden Rule of Daily Trading
          </h2>
        </div>
        <p className='text-yellow-700 mb-3'>
          <strong>
            Never exceed 4-5% of your main account balance in daily losses.
          </strong>{' '}
          This single rule has saved more trading careers than any other risk
          management technique.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
          <div className='bg-white p-3 rounded border'>
            <div className='font-medium text-gray-800'>$10,000 Account</div>
            <div className='text-gray-600'>Max daily loss: $400-500</div>
          </div>
          <div className='bg-white p-3 rounded border'>
            <div className='font-medium text-gray-800'>$25,000 Account</div>
            <div className='text-gray-600'>Max daily loss: $1,000-1,250</div>
          </div>
          <div className='bg-white p-3 rounded border'>
            <div className='font-medium text-gray-800'>$100,000 Account</div>
            <div className='text-gray-600'>Max daily loss: $4,000-5,000</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyLoss
