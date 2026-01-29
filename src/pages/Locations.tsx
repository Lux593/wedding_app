import { Sparkles } from 'lucide-react'
import { 
  MdLocationOn, 
  MdOpenInNew, 
  MdNavigation
} from 'react-icons/md'
import { useLanguage } from '../contexts/LanguageContext'

interface Location {
  nameKey: string
  address: string
  city: string
  postalCode: string
  country: string
  mapUrl?: string
}

export default function Locations() {
  const { t } = useLanguage()

  const locations: Location[] = [
    {
      nameKey: 'locations.ceremony',
      address: 'Schlossgarten',
      city: 'Zürich',
      postalCode: '8001',
      country: 'Schweiz',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
    },
    {
      nameKey: 'locations.reception',
      address: 'Grand Hotel',
      city: 'Zürich',
      postalCode: '8001',
      country: 'Schweiz',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 relative">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {t('locations.title')}
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
          <MdLocationOn className="w-4 h-4 text-gold-500 dark:text-gold-400" />
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
        </div>
      </div>

      <div className="space-y-8 md:space-y-12">
        {locations.map((location, index) => (
          <div
            key={index}
            className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl border-2 border-cream-300/30 dark:border-cream-600/50 hover:border-gold-400 dark:hover:border-gold-500 transition-all hover:-translate-y-2"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={index === 0 
                  ? 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80'
                  : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80'
                }
                alt={t(location.nameKey)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-[1px]"></div>
            </div>
            
            <div className="p-6 md:p-8 relative z-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl shadow-xl border-2 border-white/20">
                  <MdLocationOn className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-lg mb-2">
                    {t(location.nameKey)}
                  </h2>
                  <p className="text-lg text-white/90 mb-1 drop-shadow-md">
                    {location.address}
                  </p>
                  <p className="text-white/80 drop-shadow-md">
                    {location.postalCode} {location.city}, {location.country}
                  </p>
                </div>
              </div>

              {/* Map Embed */}
              {location.mapUrl && (
                  <div className="mt-6 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-md group-hover:border-cream-300 dark:group-hover:border-cream-600 transition-colors">
                  <iframe
                    src={location.mapUrl}
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title={t(location.nameKey)}
                  ></iframe>
                </div>
              )}

              {/* Directions Link */}
              <div className="mt-6 flex justify-center">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${location.address}, ${location.postalCode} ${location.city}, ${location.country}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 dark:bg-gold-600 dark:hover:bg-gold-700 text-white font-medium text-sm rounded-lg transition-all hover:shadow-lg hover:scale-105"
                >
                  <MdNavigation className="w-4 h-4" />
                  <span>{t('locations.directions')}</span>
                  <MdOpenInNew className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
