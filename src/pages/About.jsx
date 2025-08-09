import {
  HelpCircle,
  CheckCircle,
  Calculator,
  Shield,
  TrendingDown,
} from 'lucide-react'

const About = () => {
  return (
    <div className='p-3 mx-auto max-w-4xl sm:p-6'>
      <div className='mb-6 sm:mb-8'>
        <h1 className='flex gap-2 items-center mb-2 text-xl font-bold text-gray-800 sm:text-2xl'>
          <HelpCircle className='text-blue-600' />
          How to Use Trading Risk Manager
        </h1>
        <p className='text-gray-600'>
          Complete guide to managing your trading risk effectively
        </p>
      </div>

      <div className='space-y-6'>
        {/* Overview */}
        <div className='p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='mb-4 text-lg font-semibold text-gray-800'>
            What This Tool Does
          </h2>
          <p className='mb-4 text-gray-700'>
            Trading Risk Manager helps you calculate position sizes, track daily
            limits, and monitor trailing drawdowns. It's designed to work with
            any account size - personal, prop firm, or institutional.
          </p>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='p-4 text-center bg-blue-50 rounded-lg'>
              <Calculator className='mx-auto mb-2 text-blue-600' size={24} />
              <h3 className='mb-1 font-medium text-blue-800'>
                Position Sizing
              </h3>
              <p className='text-sm text-blue-700'>
                Calculate how much to risk per trade
              </p>
            </div>
            <div className='p-4 text-center bg-green-50 rounded-lg'>
              <Shield className='mx-auto mb-2 text-green-600' size={24} />
              <h3 className='mb-1 font-medium text-green-800'>Risk Limits</h3>
              <p className='text-sm text-green-700'>
                Daily limits and trailing drawdown
              </p>
            </div>
            <div className='p-4 text-center bg-purple-50 rounded-lg'>
              <TrendingDown
                className='mx-auto mb-2 text-purple-600'
                size={24}
              />
              <h3 className='mb-1 font-medium text-purple-800'>
                Live Monitoring
              </h3>
              <p className='text-sm text-purple-700'>
                Track progress and get alerts
              </p>
            </div>
          </div>
        </div>

        {/* Position Sizing Guide */}
        <div className='p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='mb-4 text-lg font-semibold text-gray-800'>
            Position Sizing Calculator
          </h2>

          <div className='mb-4'>
            <h3 className='mb-2 font-medium text-gray-800'>
              What is "Amount to Risk"?
            </h3>
            <p className='mb-3 text-gray-700'>
              This is your <strong>maximum drawdown</strong> - the total amount
              you're willing to lose before stopping. It's NOT your account
              balance, but your risk budget.
            </p>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='p-4 bg-blue-50 rounded-lg'>
                <h4 className='mb-2 font-medium text-blue-800'>
                  For Prop Accounts
                </h4>
                <p className='text-sm text-blue-700'>
                  Use your drawdown limit. Example: $10,000 account with $1,000
                  drawdown limit → enter $1,000 as amount to risk.
                </p>
              </div>
              <div className='p-4 bg-green-50 rounded-lg'>
                <h4 className='mb-2 font-medium text-green-800'>
                  For Personal Accounts
                </h4>
                <p className='text-sm text-green-700'>
                  Use whatever you can afford to lose completely. Example:
                  $5,000 account → maybe risk $500 (10%) or $1,000 (20%) based
                  on your comfort level.
                </p>
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <h3 className='mb-2 font-medium text-gray-800'>
              Account Balance (Optional)
            </h3>
            <p className='mb-2 text-gray-700'>
              Adding your account balance provides helpful context:
            </p>
            <ul className='ml-4 space-y-1 text-sm text-gray-600'>
              <li>• Shows what percentage of your account you're risking</li>
              <li>
                • Suggests when to update your risk amount as account grows
              </li>
              <li>
                • Helps you understand if you're being too aggressive or
                conservative
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-2 font-medium text-gray-800'>
              Risk Models Explained
            </h3>
            <div className='space-y-3'>
              <div className='p-3 bg-gray-50 rounded-lg'>
                <h4 className='mb-1 font-medium text-gray-800'>
                  Simplified Model
                </h4>
                <p className='mb-2 text-sm text-gray-700'>
                  Start with 10% of your risk amount per trade. After X
                  consecutive losses, reduce to 50% of initial risk.
                </p>
                <div className='text-xs text-gray-600'>
                  <strong>Example:</strong> $100 risk budget → $10 per trade →
                  After 3 losses, reduce to $5 per trade
                </div>
              </div>

              <div className='p-3 bg-gray-50 rounded-lg'>
                <h4 className='mb-1 font-medium text-gray-800'>
                  Percentage Model
                </h4>
                <p className='mb-2 text-sm text-gray-700'>
                  Gradually reduce risk based on percentage of total amount
                  lost. More nuanced approach.
                </p>
                <div className='text-xs text-gray-600'>
                  <strong>Example:</strong> At 30% loss → reduce to 70% of
                  initial risk. At 60% loss → reduce to 50% of initial risk.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Limits & Tracking Guide */}
        <div className='p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='mb-4 text-lg font-semibold text-gray-800'>
            Risk Limits & Tracking
          </h2>

          <div className='mb-4'>
            <h3 className='mb-2 font-medium text-gray-800'>
              Daily Loss Management
            </h3>
            <p className='mb-3 text-gray-700'>
              Set daily loss limits to prevent emotional revenge trading and
              protect your account.
            </p>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
              <div className='p-3 text-center bg-purple-50 rounded-lg'>
                <div className='font-medium text-purple-800'>Conservative</div>
                <div className='text-sm text-purple-700'>3% of account</div>
              </div>
              <div className='p-3 text-center bg-blue-50 rounded-lg'>
                <div className='font-medium text-blue-800'>Standard</div>
                <div className='text-sm text-blue-700'>4-5% of account</div>
              </div>
              <div className='p-3 text-center bg-orange-50 rounded-lg'>
                <div className='font-medium text-orange-800'>Aggressive</div>
                <div className='text-sm text-orange-700'>
                  6%+ (not recommended)
                </div>
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <h3 className='mb-2 font-medium text-gray-800'>
              Trailing Drawdown Monitor
            </h3>
            <p className='mb-3 text-gray-700'>
              For accounts where your drawdown limit "trails" your high water
              mark (some prop firms, personal rules).
            </p>
            <div className='p-4 bg-yellow-50 rounded-lg'>
              <h4 className='mb-2 font-medium text-yellow-800'>
                How It Works:
              </h4>
              <div className='space-y-1 text-sm text-yellow-700'>
                <div>
                  • <strong>High Water Mark:</strong> Highest balance you've
                  reached
                </div>
                <div>
                  • <strong>Max Drawdown:</strong> Fixed dollar amount you can
                  lose from high water mark
                </div>
                <div>
                  • <strong>Safe Zone:</strong> High Water Mark - Max Drawdown
                </div>
                <div>
                  • <strong>Example:</strong> High water mark $105k, max
                  drawdown $8k → Safe zone $97k
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className='mb-2 font-medium text-gray-800'>
              Base Account Size vs Current Trading Balance
            </h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='p-3 bg-blue-50 rounded-lg'>
                <h4 className='mb-1 font-medium text-blue-800'>
                  Base Account Size
                </h4>
                <p className='text-sm text-blue-700'>
                  Fixed size for daily % calculations. Usually your initial prop
                  firm account size (e.g., $10k).
                </p>
              </div>
              <div className='p-3 bg-green-50 rounded-lg'>
                <h4 className='mb-1 font-medium text-green-800'>
                  Current Trading Balance
                </h4>
                <p className='text-sm text-green-700'>
                  Your actual current balance that changes with P&L. Used for
                  trailing drawdown calculations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Example Walkthrough */}
        <div className='p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='mb-4 text-lg font-semibold text-gray-800'>
            Complete Example
          </h2>
          <div className='p-4 bg-blue-50 rounded-lg'>
            <h3 className='mb-3 font-semibold text-blue-800'>
              Scenario: $10,000 Prop Account
            </h3>
            <div className='space-y-2 text-sm text-blue-700'>
              <div>
                <strong>Position Sizing:</strong>
              </div>
              <div>• Amount to risk: $1,000 (drawdown limit)</div>
              <div>• Initial risk per trade: $100 (10% of risk amount)</div>
              <div>• Maximum losing trades: ~17 with proper scaling</div>

              <div className='pt-2'>
                <strong>Daily Limits:</strong>
              </div>
              <div>• Base account size: $10,000</div>
              <div>• Daily loss limit: 4% = $400 max per day</div>
              <div>
                • Max trades per day: ~4 trades (assuming 1% risk per trade)
              </div>

              <div className='pt-2'>
                <strong>Trailing Drawdown:</strong>
              </div>
              <div>• High water mark: $10,500 (account grew)</div>
              <div>• Max drawdown: $1,000</div>
              <div>• Safe zone: $9,500 ($10,500 - $1,000)</div>
              <div>• Current balance: $10,200 → Safe (above $9,500)</div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className='p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='mb-4 text-lg font-semibold text-gray-800'>
            Best Practices
          </h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-3'>
              <div className='flex gap-3 items-start'>
                <CheckCircle className='mt-1 text-green-500' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>Use Stop Losses</h3>
                  <p className='text-sm text-gray-600'>
                    This tool manages position size, but you still need stop
                    losses on individual trades
                  </p>
                </div>
              </div>
              <div className='flex gap-3 items-start'>
                <CheckCircle className='mt-1 text-green-500' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>
                    Review Regularly
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Adjust your risk amount as your account grows or strategy
                    changes
                  </p>
                </div>
              </div>
              <div className='flex gap-3 items-start'>
                <CheckCircle className='mt-1 text-green-500' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>
                    Start Conservative
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Better to risk too little than too much when testing new
                    strategies
                  </p>
                </div>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='flex gap-3 items-start'>
                <CheckCircle className='mt-1 text-green-500' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>
                    Stay Disciplined
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Don't increase risk during losing streaks - that's revenge
                    trading
                  </p>
                </div>
              </div>
              <div className='flex gap-3 items-start'>
                <CheckCircle className='mt-1 text-green-500' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>Use Both Tools</h3>
                  <p className='text-sm text-gray-600'>
                    Combine position sizing with daily limits for complete risk
                    management
                  </p>
                </div>
              </div>
              <div className='flex gap-3 items-start'>
                <CheckCircle className='mt-1 text-green-500' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>
                    Track Your Progress
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Monitor how often you hit your limits and adjust accordingly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className='p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='mb-4 text-lg font-semibold text-gray-800'>
            Quick Start Guide
          </h2>
          <div className='space-y-4'>
            <div className='flex gap-3 items-start'>
              <div className='flex flex-shrink-0 justify-center items-center w-6 h-6 text-sm font-medium text-white bg-blue-600 rounded-full'>
                1
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>
                  Set Your Risk Budget
                </h3>
                <p className='text-sm text-gray-600'>
                  Go to Position Sizing page and enter your maximum drawdown
                  amount
                </p>
              </div>
            </div>
            <div className='flex gap-3 items-start'>
              <div className='flex flex-shrink-0 justify-center items-center w-6 h-6 text-sm font-medium text-white bg-blue-600 rounded-full'>
                2
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>Choose Your Model</h3>
                <p className='text-sm text-gray-600'>
                  Pick Simplified for easy use, or Percentage for more control
                </p>
              </div>
            </div>
            <div className='flex gap-3 items-start'>
              <div className='flex flex-shrink-0 justify-center items-center w-6 h-6 text-sm font-medium text-white bg-blue-600 rounded-full'>
                3
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>Set Daily Limits</h3>
                <p className='text-sm text-gray-600'>
                  Go to Risk Limits page and set your daily loss percentage
                  (start with 4%)
                </p>
              </div>
            </div>
            <div className='flex gap-3 items-start'>
              <div className='flex flex-shrink-0 justify-center items-center w-6 h-6 text-sm font-medium text-white bg-blue-600 rounded-full'>
                4
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>
                  Enable Trailing (Optional)
                </h3>
                <p className='text-sm text-gray-600'>
                  If your account has trailing drawdown rules, enable the
                  monitor
                </p>
              </div>
            </div>
            <div className='flex gap-3 items-start'>
              <div className='flex flex-shrink-0 justify-center items-center w-6 h-6 text-sm font-medium text-white bg-blue-600 rounded-full'>
                5
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>Start Trading</h3>
                <p className='text-sm text-gray-600'>
                  Use the calculated position sizes and respect your daily
                  limits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
