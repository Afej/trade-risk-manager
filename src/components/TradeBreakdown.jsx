export const TradeBreakdown = ({ calculations }) => {
  const { hasValidData, results, activeModel } = calculations

  if (!hasValidData) {
    return (
      <div className='mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6'>
        <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800'>
          Trade-by-Trade Breakdown
        </h2>
        <div className='text-center py-8 text-gray-500'>
          <p>Enter valid values to see the trade breakdown</p>
        </div>
      </div>
    )
  }

  return (
    <div className='mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6'>
      <h2 className='text-lg sm:text-xl font-semibold mb-4 text-gray-800'>
        Trade-by-Trade Breakdown
      </h2>
      <div className='overflow-x-auto -mx-2 sm:mx-0'>
        <table className='w-full text-sm min-w-full'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='text-left py-2 px-2 sm:px-3'>Trade #</th>
              <th className='text-left py-2 px-2 sm:px-3'>Risk Amount</th>
              <th className='text-left py-2 px-2 sm:px-3'>Remaining</th>
              {activeModel === 'percentage' && (
                <th className='text-left py-2 px-2 sm:px-3'>Loss %</th>
              )}
              <th className='text-left py-2 px-2 sm:px-3'>Phase</th>
            </tr>
          </thead>
          <tbody>
            {results.trades.slice(0, 20).map((trade, index) => (
              <tr
                key={index}
                className='border-b border-gray-100 hover:bg-gray-50'>
                <td className='py-2 px-2 sm:px-3 font-medium'>{trade.trade}</td>
                <td className='py-2 px-2 sm:px-3'>${trade.risk.toFixed(2)}</td>
                <td className='py-2 px-2 sm:px-3'>
                  ${trade.remaining.toFixed(2)}
                </td>
                {activeModel === 'percentage' && (
                  <td className='py-2 px-2 sm:px-3'>{trade.lossPercentage}%</td>
                )}
                <td className='py-2 px-2 sm:px-3'>
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
                  className='py-2 px-2 sm:px-3 text-center text-gray-500'>
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
