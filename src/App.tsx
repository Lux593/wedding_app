import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { EventDetailsProvider } from './contexts/EventDetailsContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Locations from './pages/Locations'
import Outfits from './pages/Outfits'
import Tips from './pages/Tips'
import RSVP from './pages/RSVP'
import Photos from './pages/Photos'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/outfits" element={<Outfits />} />
      <Route path="/tips" element={<Tips />} />
      <Route path="/rsvp" element={<RSVP />} />
      <Route path="/photos" element={<Photos />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <EventDetailsProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
        </EventDetailsProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
