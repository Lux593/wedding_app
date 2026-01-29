import { useState, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Heart } from 'lucide-react'
import { 
  MdMenu, 
  MdClose, 
  MdLightMode, 
  MdDarkMode, 
  MdLanguage,
  MdHome,
  MdEventNote,
  MdLocationOn,
  MdCheckroom,
  MdMarkEmailRead,
  MdPhotoCamera
} from 'react-icons/md'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage, Language } from '../contexts/LanguageContext'

// Flag Image Components
const GermanFlag = ({ className }: { className?: string }) => (
  <img 
    src="/deutschland.png" 
    alt="Deutschland" 
    className={`${className || ''} rounded-full object-cover`}
    width="20" 
    height="20"
    style={{ borderRadius: '50%' }}
  />
)

const BritishFlag = ({ className }: { className?: string }) => (
  <img 
    src="/vereinigtes-konigreich.png" 
    alt="Vereinigtes Königreich" 
    className={`${className || ''} rounded-full object-cover`}
    width="20" 
    height="20"
    style={{ borderRadius: '50%' }}
  />
)

const FrenchFlag = ({ className }: { className?: string }) => (
  <img 
    src="/frankreich.png" 
    alt="Frankreich" 
    className={`${className || ''} rounded-full object-cover`}
    width="20" 
    height="20"
    style={{ borderRadius: '50%' }}
  />
)

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const location = useLocation()

  const navigation = [
    { name: t('nav.home'), path: '/', key: 'nav.home', icon: MdHome },
    { name: t('nav.timeline'), path: '/timeline', key: 'nav.timeline', icon: MdEventNote },
    { name: t('nav.locations'), path: '/locations', key: 'nav.locations', icon: MdLocationOn },
    { name: t('nav.outfits'), path: '/outfits', key: 'nav.outfits', icon: MdCheckroom },
    { name: t('nav.rsvp'), path: '/rsvp', key: 'nav.rsvp', icon: MdMarkEmailRead },
    { name: t('nav.photos'), path: '/photos', key: 'nav.photos', icon: MdPhotoCamera },
  ]

  const languages: { code: Language; name: string; flagComponent: ReactNode }[] = [
    { code: 'de', name: 'Deutsch', flagComponent: <GermanFlag /> },
    { code: 'en', name: 'English', flagComponent: <BritishFlag /> },
    { code: 'fr', name: 'Français', flagComponent: <FrenchFlag /> },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-[60] bg-gray-50/98 dark:bg-gray-950/98 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-gold-500 dark:text-gold-400 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white relative z-10">
                  R&S
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-serif font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-gold-500 text-white dark:bg-gold-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            {/* Right side: Language + Theme Toggle + Mobile Menu */}
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center space-x-1"
                  aria-label="Change language"
                >
                  <MdLanguage className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {languages.find(l => l.code === language)?.flagComponent || <MdLanguage className="w-4 h-4" />}
                  </span>
                </button>
                
                {/* Language Dropdown */}
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setIsLangMenuOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors ${
                          language === lang.code
                            ? 'bg-cream-50 dark:bg-cream-700/20 text-gold-600 dark:text-gold-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-3 flex items-center">
                          {lang.flagComponent}
                        </span>
                        <span className="flex-1">{lang.name}</span>
                        {language === lang.code && (
                          <span className="ml-auto text-gold-600 dark:text-gold-400">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <MdLightMode className="w-5 h-5" />
                ) : (
                  <MdDarkMode className="w-5 h-5" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <MdClose className="w-6 h-6" />
                ) : (
                  <MdMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop - nur unter dem Header */}
            <div 
              className="md:hidden fixed top-16 left-0 right-0 bottom-0 z-40 bg-black/20 dark:bg-black/30 mobile-menu-backdrop"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            {/* Sidebar Menu */}
            <div 
              className="md:hidden fixed right-0 top-16 z-50 w-64 bg-white dark:bg-gray-900 border-l-2 border-gray-300 dark:border-gray-600 shadow-2xl rounded-l-lg mobile-menu-sidebar"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="px-4 py-6 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-serif font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-gold-500 text-white dark:bg-gold-600'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive(item.path) ? 'text-white' : 'text-gold-500 dark:text-gold-400'}`} />
                      <span>{t(item.key)}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </>
        )}
      </header>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 min-h-[calc(100vh-12rem)] transition-all duration-300 ${isMenuOpen ? 'md:blur-none blur-md pointer-events-none md:pointer-events-auto' : ''}`}>
        <div key={location.pathname} className="page-transition page-enter">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 ${isMenuOpen ? 'pointer-events-none md:pointer-events-auto' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm font-serif text-gray-600 dark:text-gray-400 flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-gold-500 dark:text-gold-400" />
            <span>{t('footer.text')}</span>
            <Heart className="w-4 h-4 text-gold-500 dark:text-gold-400" />
          </p>
        </div>
      </footer>
    </div>
  )
}
