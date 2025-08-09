import { useRiskCalculations } from '../hooks/useRiskCalculations'
import { SettingsPanel } from '../components/SettingsPanel'
import { CurrentStatus } from '../components/CurrentStatus'
import { ModelSummary } from '../components/ModelSummary'
import { TradeBreakdown } from '../components/TradeBreakdown'

const Home = () => {
  const calculations = useRiskCalculations()

  const handleSettingsChange = (field, value) => {
    const setterMap = {
      activeModel: calculations.setActiveModel,
      lossTrigger: calculations.setLossTrigger,
      firstThreshold: calculations.setFirstThreshold,
      secondThreshold: calculations.setSecondThreshold,
      riskReduction1: calculations.setRiskReduction1,
      riskReduction2: calculations.setRiskReduction2,
      totalAmount: calculations.setTotalAmount,
      currentLoss: calculations.setCurrentLoss,
      accountBalance: calculations.setAccountBalance,
    }
    setterMap[field]?.(value)
  }

  return (
    <div className='p-3 mx-auto max-w-6xl sm:p-6'>
      <div className='mb-6 sm:mb-8'>
        <h1 className='mb-2 text-xl font-bold text-gray-800 sm:text-2xl'>
          Risk Management Calculator
        </h1>
        <p className='text-gray-600'>
          Calculate your risk per trade and see how many trades you can take
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8'>
        <div>
          <SettingsPanel
            calculations={calculations}
            onSettingsChange={handleSettingsChange}
          />
          <div className='mt-4'>
            <CurrentStatus calculations={calculations} />
          </div>
        </div>

        <ModelSummary calculations={calculations} />
      </div>

      <TradeBreakdown calculations={calculations} />
    </div>
  )
}

export default Home
