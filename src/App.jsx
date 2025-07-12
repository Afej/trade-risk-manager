import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import DailyLoss from './pages/DailyLoss'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/daily-loss' element={<DailyLoss />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
