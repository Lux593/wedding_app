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
    <div className="space-y-8 md:space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-4 md:py-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10 dark:opacity-5">
          <Sparkles className="w-full h-full text-gold-500" />
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10 dark:opacity-5">
          <Heart className="w-full h-full text-gold-500" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold-500 dark:text-gold-400 animate-pulse" />
            <span className="text-sm font-medium text-gold-600 dark:text-gold-500 uppercase tracking-wider">
              {new Date().getFullYear()}
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

      {/* Welcome Message */}
      <section className="max-w-[64.4rem] mx-auto text-center py-8 md:py-12 relative -mt-4 md:-mt-8">
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
          
          {/* Content */}
          <div className="relative bg-transparent rounded-3xl p-8 md:p-16">
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
            <p className="text-white leading-relaxed text-lg drop-shadow-xl">
              {t('home.welcomeText')}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="relative">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-center mb-4 md:mb-8 lg:mb-12 text-gray-900 dark:text-white">
          {t('home.discover')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group relative p-3 md:p-4 lg:p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl hover:border-gold-400 dark:hover:border-gold-500 transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="flex items-center space-x-3 md:space-x-4 relative z-10">
                  <div className="p-2 md:p-3 lg:p-4 bg-gradient-to-br from-cream-100 to-cream-200 dark:from-cream-700/30 dark:to-cream-600/30 rounded-lg md:rounded-xl group-hover:from-gold-500 group-hover:to-gold-600 dark:group-hover:from-gold-600 dark:group-hover:to-gold-700 transition-all shadow-md group-hover:shadow-lg group-hover:scale-110 flex-shrink-0">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-gold-600 dark:text-gold-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors truncate">
                      {t(link.key)}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                      {t(link.descKey)}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 hidden sm:block">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold-500" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
