import { formatCurrency } from '../utils/helpers'

export const TradeBreakdown = ({ calculations }) => {
  const { hasValidData, results, activeModel, totalAmountValue } = calculations

  if (!hasValidData) {
    return (
      <div className='p-4 mt-6 bg-white rounded-lg shadow-lg sm:mt-8 sm:p-6'>
        <h2 className='mb-4 text-lg font-semibold text-gray-800 sm:text-xl'>
          Trade-by-Trade Breakdown
        </h2>
        <div className='py-8 text-center text-gray-500'>
          <p>Enter valid values to see the trade breakdown</p>
        </div>
      </div>
    )
  }

  return (
    <div className='p-4 mt-6 bg-white rounded-lg shadow-lg sm:mt-8 sm:p-6'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-800 sm:text-xl'>
          Trade-by-Trade Breakdown
        </h2>
        <p className='mt-1 text-sm text-gray-600'>
          Based on {formatCurrency(totalAmountValue)} risk budget • Showing
          maximum {results.totalTrades} consecutive losing trades
        </p>
      </div>

      <div className='overflow-x-auto -mx-2 sm:mx-0'>
        <table className='w-full min-w-full text-sm'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='px-2 py-2 text-left sm:px-3'>Trade #</th>
              <th className='px-2 py-2 text-left sm:px-3'>Risk Amount</th>
              <th className='px-2 py-2 text-left sm:px-3'>Remaining Budget</th>
              {activeModel === 'percentage' && (
                <th className='px-2 py-2 text-left sm:px-3'>Loss %</th>
              )}
              <th className='px-2 py-2 text-left sm:px-3'>Phase</th>
            </tr>
          </thead>
          <tbody>
            {results.trades.slice(0, 20).map((trade, index) => (
              <tr
                key={index}
                className='border-b border-gray-100 hover:bg-gray-50'>
                <td className='px-2 py-2 font-medium sm:px-3'>{trade.trade}</td>
                <td className='px-2 py-2 sm:px-3'>
                  {formatCurrency(trade.risk)}
                </td>
                <td className='px-2 py-2 sm:px-3'>
                  {formatCurrency(trade.remaining)}
                </td>
                {activeModel === 'percentage' && (
                  <td className='px-2 py-2 sm:px-3'>{trade.lossPercentage}%</td>
                )}
                <td className='px-2 py-2 sm:px-3'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      trade.phase.includes('Initial')
                        ? 'bg-green-100 text-green-800'
                        : trade.phase.includes('Heavy')
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {trade.phase}
                  </span>
                </td>
              </tr>
            ))}
            {results.trades.length > 20 && (
              <tr>
                <td
                  colSpan='5'
                  className='px-2 py-2 text-center text-gray-500 sm:px-3'>
                  ... and {results.trades.length - 20} more trades
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
