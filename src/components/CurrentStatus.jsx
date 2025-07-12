import { TrendingDown } from 'lucide-react'

export const CurrentStatus = ({ calculations }) => {
  const {
    totalAmountValue,
    currentRisk,
    lossPercentage,
    remainingAmount,
    tradesRemaining,
  } = calculations

  return (
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
          <span className='font-medium'>${remainingAmount.toFixed(2)}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Trades Remaining:</span>
          <span className='font-medium text-green-600'>{tradesRemaining}</span>
        </div>
      </div>
    </div>
  )
}
