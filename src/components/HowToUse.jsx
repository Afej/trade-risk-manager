import { useState } from 'react'
import { AlertCircle } from 'lucide-react'

export const HowToUse = () => {
  const [showHowTo, setShowHowTo] = useState(false)

  return (
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
          style={{ transform: showHowTo ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </span>
      </button>

      {showHowTo && (
        <div className='px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 text-gray-700 border-t border-gray-100'>
          <div>
            <h3 className='font-semibold text-gray-800 my-2'>
              What is "Amount to Risk"?
            </h3>
            <p>
              This is your <strong>maximum drawdown</strong> - the total amount
              you're willing to lose before stopping. For prop accounts, this is
              typically your drawdown limit (e.g., $1,000 on a $10,000 account).
              For personal accounts, it's whatever you can afford to lose
              completely.
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
                percentage of total amount lost. More gradual scaling as losses
                mount.
              </div>
            </div>
          </div>

          <div>
            <h3 className='font-semibold text-gray-800 mb-2'>Key Benefits:</h3>
            <ul className='ml-4 space-y-1'>
              <li>
                • <strong>Portable:</strong> Works on any account size
              </li>
              <li>
                • <strong>Simple Math:</strong> Easy to calculate mentally
              </li>
              <li>
                • <strong>Capital Preservation:</strong> Reduces risk as losses
                mount
              </li>
              <li>
                • <strong>Predictable:</strong> Know exactly how many trades you
                can take
              </li>
            </ul>
          </div>

          <div className='bg-blue-50 p-4 rounded-lg'>
            <h3 className='font-semibold text-blue-800 mb-2'>Example:</h3>
            <p className='text-blue-700'>
              $100 account → $10 per trade initially → 16-20 maximum losing
              trades → Perfect for testing strategies without major capital risk
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
