import { Navigation } from './Navigation'
import { Footer } from '../Footer'

export const Layout = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navigation />
      <div className='min-h-[calc(100vh-4rem)]'>{children}</div>
      <Footer />
    </div>
  )
}
