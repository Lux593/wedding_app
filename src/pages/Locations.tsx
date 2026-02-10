import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { 
  MdLocationOn, 
  MdOpenInNew, 
  MdNavigation
} from 'react-icons/md'
import { useLanguage } from '../contexts/LanguageContext'

interface Location {
  date: 'nov27' | 'nov28' | 'nov29'
  nameKey: string
  address: string
  city: string
  postalCode: string
  country: string
  mapUrl?: string
}

export default function Locations() {
  const { t } = useLanguage()
  const [openDates, setOpenDates] = useState<Set<'nov27' | 'nov28' | 'nov29'>>(new Set())

  const locations: Location[] = [
    {
      date: 'nov27',
      nameKey: 'locations.ceremony',
      address: 'Schlossgarten',
      city: 'Zürich',
      postalCode: '8001',
      country: 'Schweiz',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
    },
    {
      date: 'nov28',
      nameKey: 'locations.reception',
      address: 'Grand Hotel',
      city: 'Zürich',
      postalCode: '8001',
      country: 'Schweiz',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
    },
    {
      date: 'nov29',
      nameKey: 'locations.breakfast',
      address: 'Café Bellevue',
      city: 'Zürich',
      postalCode: '8001',
      country: 'Schweiz',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
    },
  ]

  // Group locations by date
  const locationsByDate = locations.reduce((acc, location) => {
    if (!acc[location.date]) {
      acc[location.date] = []
    }
    acc[location.date].push(location)
    return acc
  }, {} as Record<'nov27' | 'nov28' | 'nov29', Location[]>)

  const dateOrder: ('nov27' | 'nov28' | 'nov29')[] = ['nov27', 'nov28', 'nov29']

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header – gleiche Breite wie RSVP, damit Subheader einheitlich wirkt */}
      <div className="text-center mb-12 md:mb-16 relative max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {t('locations.title')}
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
          <MdLocationOn className="w-4 h-4 text-gold-500 dark:text-gold-400" />
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
        </div>
        <p className="mt-4 text-base md:text-lg font-serif text-gray-600 dark:text-gray-400 w-full max-w-[650px] mx-auto px-2.5">
          {t('locations.subheader')}
        </p>
      </div>

      {/* Locations grouped by date – Zeitstrahl verbindet die Kacheln inkl. oberer/unterer Verbindungspunkte */}
      <div className="relative pt-[36px] pb-[36px]">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 dark:from-gold-600 dark:via-gold-500 dark:to-gold-600 z-0" aria-hidden />
        <div className="space-y-6 md:space-y-8 relative z-10">
        {dateOrder.map((date, index) => {
          const dayLocations = locationsByDate[date] || []
          if (dayLocations.length === 0) return null

          const isOpen = openDates.has(date)
          const isFirst = index === 0

          const toggleDate = () => {
            const newOpenDates = new Set(openDates)
            if (isOpen) {
              newOpenDates.delete(date)
            } else {
              newOpenDates.add(date)
            }
            setOpenDates(newOpenDates)
          }

          return (
            <div key={date} className="relative space-y-4">
              {isFirst && (
                <div
                  className="absolute left-1/2 -top-[36px] -translate-x-1/2 z-20 w-4 h-4 rounded-full border-2 border-gold-500 bg-cream-200 dark:bg-gray-800 dark:border-gold-500 shadow-sm pointer-events-none"
                  aria-hidden
                />
              )}
              {/* Date Header */}
              <button
                onClick={toggleDate}
                className="relative w-full text-center p-6 rounded-2xl bg-cream-200/90 dark:bg-gray-800 border-2 border-cream-400/80 dark:border-gray-600 shadow-md hover:shadow-lg hover:border-gold-400 dark:hover:border-gold-600 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center space-x-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-0">
                    {t(`timeline.date.${date}`)}
                  </h2>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6 text-gold-600 dark:text-gold-400 transition-transform" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gold-600 dark:text-gold-400 transition-transform" />
                  )}
                </div>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  <div className="h-px w-12 bg-gold-300 dark:bg-gold-600"></div>
                  <MdLocationOn className="w-3 h-3 text-gold-500 dark:text-gold-400" />
                  <div className="h-px w-12 bg-gold-300 dark:bg-gold-600"></div>
                </div>
              </button>

              {/* Locations for this date - Only show if open */}
              {isOpen && (
                <div className="space-y-8 md:space-y-12 mt-6">
                {dayLocations.map((location, index) => (
          <div
            key={index}
            className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl border-2 border-cream-300/30 dark:border-cream-600/50 hover:border-gold-400 dark:hover:border-gold-500 transition-all hover:-translate-y-2"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={location.nameKey === 'locations.ceremony'
                  ? 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80'
                  : location.nameKey === 'locations.reception'
                  ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80'
                  : 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=80'
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
                  <p className="text-lg font-serif text-white/90 mb-1 drop-shadow-md">
                    {location.address}
                  </p>
                  <p className="font-serif text-white/80 drop-shadow-md">
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
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 dark:bg-gold-600 dark:hover:bg-gold-700 text-white font-serif font-medium text-sm rounded-lg transition-all hover:shadow-lg hover:scale-105"
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
              )}
            </div>
          )
        })}
        </div>
        {/* Knotenpunkt am Ende der Verbindungslinie – 36px unter letzter Karte, symmetrisch zum Startpunkt */}
        {dateOrder.length > 0 && (
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[16px] z-20 w-4 h-4 rounded-full border-2 border-gold-500 bg-gold-300 dark:bg-gold-500 dark:border-gold-600 shadow-sm pointer-events-none"
            aria-hidden
          />
        )}
      </div>
    </div>
  )
}
