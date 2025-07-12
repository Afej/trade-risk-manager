import { HelpCircle, CheckCircle } from 'lucide-react'

const About = () => {
  return (
    <div className='max-w-4xl mx-auto p-3 sm:p-6'>
      <div className='mb-6 sm:mb-8'>
        <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2'>
          <HelpCircle className='text-blue-600' />
          How to Use Risk Manager
        </h1>
        <p className='text-gray-600'>
          Complete guide to using this risk management calculator effectively
        </p>
      </div>

      <div className='space-y-6'>
        {/* What is Amount to Risk */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            What is "Amount to Risk"?
          </h2>
          <p className='text-gray-700 mb-4'>
            This is your <strong>maximum drawdown</strong> - the total amount
            you're willing to lose before stopping. It's not your account
            balance, but rather your risk budget.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-4 bg-blue-50 rounded-lg'>
              <h3 className='font-medium text-blue-800 mb-2'>
                For Prop Accounts
              </h3>
              <p className='text-sm text-blue-700'>
                Use your drawdown limit. For example, if you have a $10,000
                account with a $1,000 drawdown limit, enter $1,000 as your
                amount to risk.
              </p>
            </div>
            <div className='p-4 bg-green-50 rounded-lg'>
              <h3 className='font-medium text-green-800 mb-2'>
                For Personal Accounts
              </h3>
              <p className='text-sm text-green-700'>
                Use whatever amount you can afford to lose completely without
                affecting your lifestyle. This should be separate from your
                emergency fund.
              </p>
            </div>
          </div>
        </div>

        {/* Risk Models Explained */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            Risk Models Explained
          </h2>

          <div className='space-y-4'>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <h3 className='font-medium text-gray-800 mb-2'>
                Simplified Model
              </h3>
              <p className='text-sm text-gray-700 mb-3'>
                Start with 10% of your total risk amount per trade. After a set
                number of consecutive losses, reduce your risk to 50% of the
                initial amount.
              </p>
              <div className='text-xs text-gray-600'>
                <strong>Example:</strong> $100 risk budget → $10 per trade →
                After 3 losses, reduce to $5 per trade
              </div>
            </div>

            <div className='p-4 bg-gray-50 rounded-lg'>
              <h3 className='font-medium text-gray-800 mb-2'>
                Percentage Model
              </h3>
              <p className='text-sm text-gray-700 mb-3'>
                Gradually reduce risk based on percentage of total amount lost.
                More nuanced approach that scales risk down smoothly as losses
                mount.
              </p>
              <div className='text-xs text-gray-600'>
                <strong>Example:</strong> At 30% loss, reduce to 70% of initial
                risk. At 60% loss, reduce to 50% of initial risk.
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            Key Benefits
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-3'>
              <div className='flex items-start gap-3'>
                <CheckCircle className='text-green-500 mt-1' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>Portable</h3>
                  <p className='text-sm text-gray-600'>
                    Works on any account size - just adjust the total amount
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <CheckCircle className='text-green-500 mt-1' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>Simple Math</h3>
                  <p className='text-sm text-gray-600'>
                    Easy to calculate mentally during trading sessions
                  </p>
                </div>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='flex items-start gap-3'>
                <CheckCircle className='text-green-500 mt-1' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>
                    Capital Preservation
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Automatically reduces risk as losses accumulate
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <CheckCircle className='text-green-500 mt-1' size={16} />
                <div>
                  <h3 className='font-medium text-gray-800'>Predictable</h3>
                  <p className='text-sm text-gray-600'>
                    Know exactly how many trades you can take
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Walkthrough */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            Example Walkthrough
          </h2>
          <div className='bg-blue-50 p-4 rounded-lg'>
            <h3 className='font-semibold text-blue-800 mb-3'>
              Scenario: $100 Risk Budget
            </h3>
            <div className='space-y-2 text-sm text-blue-700'>
              <div>
                • <strong>Initial risk per trade:</strong> $10 (10% of $100)
              </div>
              <div>
                • <strong>Maximum losing trades:</strong> 16-20 (depending on
                model)
              </div>
              <div>
                • <strong>Perfect for:</strong> Testing new strategies without
                major capital risk
              </div>
              <div>
                • <strong>Scales to any size:</strong> $1,000 budget = $100 per
                trade, same number of trades
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            Best Practices
          </h2>
          <div className='space-y-3 text-gray-700'>
            <div className='flex items-start gap-3'>
              <div className='w-2 h-2 bg-blue-500 rounded-full mt-2'></div>
              <p>
                <strong>Use stop losses:</strong> This calculator manages
                position size, but you still need stop losses on individual
                trades
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-2 h-2 bg-blue-500 rounded-full mt-2'></div>
              <p>
                <strong>Combine with daily limits:</strong> Use the daily loss
                management page to set daily boundaries
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-2 h-2 bg-blue-500 rounded-full mt-2'></div>
              <p>
                <strong>Review regularly:</strong> Adjust your risk amount as
                your account grows or strategy changes
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-2 h-2 bg-blue-500 rounded-full mt-2'></div>
              <p>
                <strong>Stay disciplined:</strong> Don't increase risk during
                losing streaks - that's revenge trading
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
