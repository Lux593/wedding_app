import { useState } from 'react'
import {
  CaretCircleDownIcon,
  CaretCircleUpIcon,
  MapPinIcon,
  ArrowSquareOutIcon,
} from '@phosphor-icons/react'
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
      <div className="text-center mb-6 md:mb-8 relative max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {t('locations.title')}
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
          <MapPinIcon className="w-4 h-4 text-gold-500 dark:text-gold-400" />
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
        </div>
        <p className="mt-4 text-base md:text-lg font-serif text-gray-600 dark:text-gray-400 w-full max-w-[650px] mx-auto px-2.5">
          {t('locations.subheader')}
        </p>
      </div>

      {/* Locations grouped by date – Zeitstrahl verbindet die Kacheln inkl. oberer/unterer Verbindungspunkte */}
      <div className="relative pt-[24px] pb-[24px]">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 dark:from-gold-600 dark:via-gold-500 dark:to-gold-600 z-0" aria-hidden />
        <div className="space-y-3 md:space-y-4 relative z-10">
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
                  className="absolute left-1/2 -top-[24px] -translate-x-1/2 z-20 w-4 h-4 rounded-full border-2 border-gold-500 bg-cream-200 dark:bg-gray-800 dark:border-gold-500 shadow-sm pointer-events-none"
                  aria-hidden
                />
              )}
              {/* Date Header */}
              <button
                onClick={toggleDate}
                className="relative z-10 w-full text-center p-6 rounded-2xl bg-cream-200 dark:bg-gray-800 border-2 border-gold-400 dark:border-gray-600 shadow-md hover:shadow-lg hover:border-gold-500 dark:hover:border-gold-600 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center">
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-0">
                    {t(`timeline.date.${date}`)}
                  </h2>
                  <div className="absolute right-6">
                    {isOpen ? (
                      <CaretCircleUpIcon className="w-7 h-7 text-gold-600/60 dark:text-gold-400/60 transition-transform" weight="fill" />
                    ) : (
                      <CaretCircleDownIcon className="w-7 h-7 text-gold-600/60 dark:text-gold-400/60 transition-transform" weight="fill" />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  <div className="h-px w-12 bg-gold-300 dark:bg-gold-600"></div>
                  <MapPinIcon className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                  <div className="h-px w-12 bg-gold-300 dark:bg-gold-600"></div>
                </div>
              </button>

              {/* Locations for this date - Only show if open */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 transition-all duration-500 ease-in-out origin-top ${
                  isOpen ? 'opacity-100 scale-y-100 max-h-[10000px]' : 'opacity-0 scale-y-95 max-h-0 overflow-hidden'
                }`}
              >
                {dayLocations.map((location, index) => (
          <div
            key={index}
            className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-cream-300 dark:border-gray-700 hover:border-gold-400 dark:hover:border-gold-500 hover:-translate-y-2 bg-white dark:bg-gray-800"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={location.nameKey === 'locations.ceremony'
                  ? 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80'
                  : location.nameKey === 'locations.reception'
                  ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
                  : 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80'
                }
                alt={t(location.nameKey)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/50"></div>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white">
                {t(location.nameKey)}
              </h3>

              {/* Details */}
              <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                {/* Location */}
                <div className="flex items-center space-x-2 text-sm">
                  <MapPinIcon className="w-4 h-4 text-gold-500 dark:text-gold-400 flex-shrink-0" />
                  <span className="font-serif text-gray-700 dark:text-gray-300">{location.address}</span>
                </div>

                {/* Address */}
                <div className="text-sm text-gray-600 dark:text-gray-400 font-serif ml-6">
                  {location.postalCode} {location.city}, {location.country}
                </div>

                {/* Map Embed */}
                {location.mapUrl && (
                  <div className="mt-4 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-md">
                    <iframe
                      src={`${location.mapUrl}&style=feature:poi|visibility:off&style=feature:transit|visibility:off&style=feature:road.highway|element:labels|visibility:simplified`}
                      width="100%"
                      height="134"
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
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${location.address}, ${location.postalCode} ${location.city}, ${location.country}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors font-serif font-medium"
                >
                  <ArrowSquareOutIcon className="w-4 h-4" />
                  <span>{t('locations.directions')}</span>
                </a>
              </div>
            </div>
          </div>
                ))}
              </div>
            </div>
          )
        })}
        </div>
        {/* Knotenpunkt am Ende der Verbindungslinie – 36px unter letzter Karte, symmetrisch zum Startpunkt */}
        {dateOrder.length > 0 && (
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 w-4 h-4 rounded-full border-2 border-gold-500 bg-gold-300 dark:bg-gold-500 dark:border-gold-600 shadow-sm pointer-events-none"
            aria-hidden
          />
        )}
      </div>
    </div>
  )
}
