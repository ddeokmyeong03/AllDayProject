import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ScrollToTop from './components/ScrollToTop'
import TeamLanding from './pages/TeamLanding'
import MosaicGuard from './pages/mosaic-guard/MosaicGuard'
import Millog from './pages/Millog'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<TeamLanding />} />
        <Route path="/mosaic-guard" element={<MosaicGuard />} />
        <Route path="/millog" element={<Millog />} />
      </Routes>
    </BrowserRouter>
  )
}
