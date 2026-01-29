import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Locations from './pages/Locations'
import Outfits from './pages/Outfits'
import RSVP from './pages/RSVP'
import Photos from './pages/Photos'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/outfits" element={<Outfits />} />
              <Route path="/rsvp" element={<RSVP />} />
              <Route path="/photos" element={<Photos />} />
            </Routes>
          </Layout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
