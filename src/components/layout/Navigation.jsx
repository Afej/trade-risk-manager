import { Calculator, Shield, HelpCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Risk Calculator', icon: Calculator },
    { path: '/daily-loss', label: 'Daily Loss', icon: Shield },
    { path: '/about', label: 'How to Use', icon: HelpCircle },
  ]

  return (
    <nav className='bg-white shadow-sm border-b sticky top-0 z-10'>
      <div className='max-w-6xl mx-auto px-3 sm:px-6'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-2'>
            <Calculator className='text-blue-600' size={24} />
            <span className='font-bold text-gray-800'>Trade Risk Manager</span>
          </div>

          <div className='flex space-x-1'>
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  location.pathname === path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                <Icon size={16} />
                <span className='hidden sm:inline'>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
