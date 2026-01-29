import { Link } from 'react-router-dom'
import { Sparkles, Heart } from 'lucide-react'
import { 
  MdEventNote, 
  MdLocationOn, 
  MdCheckroom, 
  MdMarkEmailRead, 
  MdPhotoCamera
} from 'react-icons/md'
import { useLanguage } from '../contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  const quickLinks = [
    { icon: MdEventNote, path: '/timeline', key: 'nav.timeline', descKey: 'home.timelineDesc' },
    { icon: MdLocationOn, path: '/locations', key: 'nav.locations', descKey: 'home.locationsDesc' },
    { icon: MdCheckroom, path: '/outfits', key: 'nav.outfits', descKey: 'home.outfitsDesc' },
    { icon: MdMarkEmailRead, path: '/rsvp', key: 'nav.rsvp', descKey: 'home.rsvpDesc' },
    { icon: MdPhotoCamera, path: '/photos', key: 'nav.photos', descKey: 'home.photosDesc' },
  ]

  return (
    <div className="space-y-8 md:space-y-16 -mt-8 md:-mt-12">
      {/* Hero Section – weniger Abstand Kopfzeile→2026 */}
      <section className="text-center space-y-6 py-1 md:py-2 relative overflow-hidden">
        {/* Decorative elements – klein, Sparkle hinter „Rahul“, Herz hinter „Simren“ */}
        <div className="absolute left-[12%] top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 opacity-10 dark:opacity-5 pointer-events-none" aria-hidden>
          <Sparkles className="w-full h-full text-gold-500" />
        </div>
        <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 opacity-10 dark:opacity-5 pointer-events-none" aria-hidden>
          <Heart className="w-full h-full text-gold-500" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold-500 dark:text-gold-400 animate-pulse" />
            <span className="text-sm font-medium text-gold-600 dark:text-gold-500 uppercase tracking-wider">
              {t('home.wedding')} {new Date().getFullYear()}
            </span>
            <Sparkles className="w-5 h-5 text-gold-500 dark:text-gold-400 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-gold-600 to-gold-400 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
            <Heart className="w-4 h-4 text-gold-500 dark:text-gold-400" />
            <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
          </div>
        </div>
      </section>

      {/* Welcome Message – weniger Abstand Herz-Icon→Willkommens-Box */}
      <section className="max-w-[64.4rem] mx-auto text-center py-8 md:py-12 relative -mt-20 md:-mt-28">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-cream-300 dark:border-cream-600">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
              alt="Rahul & Simren Wedding"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/20"></div>
          </div>
          
          {/* Content – mehr Abstand oben, damit Herz-Icon nicht abgeschnitten */}
          <div className="relative bg-transparent rounded-3xl pt-14 pb-8 px-8 md:pt-20 md:pb-16 md:px-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 dark:bg-white/10 rounded-full backdrop-blur-sm border border-white/30">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6 drop-shadow-2xl">
              {t('home.welcome')}
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="h-px w-12 bg-white/90 dark:bg-white/80"></div>
              <Sparkles className="w-4 h-4 text-white" />
              <div className="h-px w-12 bg-white/90 dark:bg-white/80"></div>
            </div>
            <p className="text-white font-serif leading-relaxed text-lg drop-shadow-xl">
              {t('home.welcomeText')}
            </p>
          </div>
        </div>
      </section>

      {/* Entdecke unsere Hochzeit – elegante Kacheln im Hochzeits-Stil */}
      <section className="relative max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-2 text-gray-900 dark:text-white">
          {t('home.discover')}
        </h2>
        <div className="flex items-center justify-center space-x-2 mb-8 md:mb-10">
          <div className="h-px w-12 bg-gold-300 dark:bg-gold-600" />
          <Heart className="w-4 h-4 text-gold-500 dark:text-gold-400" />
          <div className="h-px w-12 bg-gold-300 dark:bg-gold-600" />
        </div>
        <div className="space-y-4 md:space-y-5">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-cream-200/90 dark:bg-gray-800 border-2 border-cream-400/80 dark:border-gray-600 shadow-md hover:shadow-lg hover:border-gold-400 dark:hover:border-gold-600 transition-all duration-300 overflow-hidden"
              >
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-cream-100 dark:bg-gray-700 border-2 border-gold-300 dark:border-gold-600 flex items-center justify-center shadow-inner group-hover:bg-gold-500 group-hover:border-gold-500 dark:group-hover:bg-gold-600 dark:group-hover:border-gold-500 transition-all duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-gold-600 dark:text-gold-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-serif font-semibold text-gray-900 dark:text-white tracking-tight group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors">
                    {t(link.key)}
                  </h3>
                  <p className="text-sm font-serif text-gray-600 dark:text-gray-400 mt-0.5">
                    {t(link.descKey)}
                  </p>
                </div>
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-5 h-5 text-gold-500 dark:text-gold-400" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
