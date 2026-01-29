import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Sparkles, ArrowRight, Music, UtensilsCrossed, Wine, ChevronDown, ChevronUp } from 'lucide-react'
import { 
  MdEventNote, 
  MdAccessTime, 
  MdRestaurant, 
  MdCelebration, 
  MdCameraAlt,
  MdClose,
  MdLocationOn,
  MdCheckroom
} from 'react-icons/md'
import { useLanguage } from '../contexts/LanguageContext'

interface EventDetails {
  location?: {
    nameKey: string
    address: string
    city: string
    postalCode: string
    country: string
    mapUrl?: string
  }
  outfits?: {
    men: string[]
    women: string[]
    colors: { name: string; hex: string }[]
    tag: string
  }
  dj?: string
  drinks?: string[]
  food?: string[]
  expectations?: string[]
}

interface TimelineEvent {
  date: 'nov27' | 'nov28' | 'nov29'
  time: string
  titleKey: string
  descKey: string
  icon: React.ComponentType<{ className?: string }>
  imageUrl: string
  bgColor: string
  buttonColor: string
  details: EventDetails
}

export default function Timeline() {
  const { t } = useLanguage()
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [openDates, setOpenDates] = useState<Set<'nov27' | 'nov28' | 'nov29'>>(new Set())

  const events: TimelineEvent[] = [
    {
      date: 'nov27',
      time: '09:00',
      titleKey: 'timeline.ceremony',
      descKey: 'timeline.ceremonyDesc',
      icon: MdEventNote,
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      bgColor: 'from-blue-900/40 to-blue-800/50',
      buttonColor: 'from-blue-400/80 to-blue-500/80 hover:from-blue-400 hover:to-blue-500',
      details: {
        location: {
          nameKey: 'locations.ceremony',
          address: 'Schlossgarten',
          city: 'Zürich',
          postalCode: '8001',
          country: 'Schweiz',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
        },
        outfits: {
          men: ['Anzug oder Sakko', 'Helle Hemden', 'Eleganter Schuhwerk'],
          women: ['Kleid oder Kostüm', 'Hüte oder Fascinator optional', 'Elegante Schuhe'],
          colors: [
            { name: 'Blau', hex: '#3B82F6' },
            { name: 'Grau', hex: '#6B7280' },
            { name: 'Beige', hex: '#D4A574' },
            { name: 'Weiß', hex: '#FFFFFF' },
          ],
          tag: 'Formal',
        },
        expectations: [
          'Feierliche Zeremonie im Freien',
          'Dauer: ca. 45 Minuten',
          'Sitzplätze sind vorhanden',
          'Bei Regen findet die Zeremonie im Innenbereich statt',
        ],
      },
    },
    {
      date: 'nov27',
      time: '10:00',
      titleKey: 'timeline.cocktail',
      descKey: 'timeline.cocktailDesc',
      icon: MdCelebration,
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
      bgColor: 'from-pink-900/40 to-purple-900/50',
      buttonColor: 'from-pink-400/80 to-pink-500/80 hover:from-pink-400 hover:to-pink-500',
      details: {
        location: {
          nameKey: 'locations.reception',
          address: 'Grand Hotel',
          city: 'Zürich',
          postalCode: '8001',
          country: 'Schweiz',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
        },
        outfits: {
          men: ['Sakko ohne Krawatte', 'Helle Hemden', 'Leder-Sneaker'],
          women: ['Cocktail-Kleid', 'Elegante Bluse mit Rock', 'Wedge-Sandalen'],
          colors: [
            { name: 'Pastelltöne', hex: '#FBCFE8' },
            { name: 'Gold-Akzente', hex: '#FCD34D' },
            { name: 'Weiß', hex: '#FFFFFF' },
          ],
          tag: 'Smart Casual',
        },
        drinks: [
          'Champagner',
          'Weißwein',
          'Rotwein',
          'Aperol Spritz',
          'Softdrinks',
          'Wasser',
        ],
        food: [
          'Canapés',
          'Fingerfood',
          'Käseplatte',
          'Frisches Obst',
        ],
        expectations: [
          'Lockere Atmosphäre zum Netzwerken',
          'Musik im Hintergrund',
          'Stehplätze und einige Sitzgelegenheiten',
          'Dauer: ca. 1,5 Stunden',
        ],
      },
    },
    {
      date: 'nov27',
      time: '11:30',
      titleKey: 'timeline.photos',
      descKey: 'timeline.photosDesc',
      icon: MdCameraAlt,
      imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      bgColor: 'from-purple-900/40 to-indigo-900/50',
      buttonColor: 'from-purple-400/80 to-purple-500/80 hover:from-purple-400 hover:to-purple-500',
      details: {
        location: {
          nameKey: 'locations.reception',
          address: 'Grand Hotel',
          city: 'Zürich',
          postalCode: '8001',
          country: 'Schweiz',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
        },
        outfits: {
          men: ['Anzug oder Sakko', 'Helle Hemden', 'Eleganter Schuhwerk'],
          women: ['Kleid oder Kostüm', 'Elegante Accessoires', 'Elegante Schuhe'],
          colors: [
            { name: 'Blau', hex: '#3B82F6' },
            { name: 'Grau', hex: '#6B7280' },
            { name: 'Beige', hex: '#D4A574' },
            { name: 'Weiß', hex: '#FFFFFF' },
          ],
          tag: 'Formal',
        },
        expectations: [
          'Gruppenfotos mit allen Gästen',
          'Paar-Fotos',
          'Familienfotos',
          'Dauer: ca. 1 Stunde',
          'Bitte pünktlich sein',
        ],
      },
    },
    {
      date: 'nov28',
      time: '13:00',
      titleKey: 'timeline.dinner',
      descKey: 'timeline.dinnerDesc',
      icon: MdRestaurant,
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      bgColor: 'from-emerald-900/40 to-teal-900/50',
      buttonColor: 'from-emerald-300/80 to-emerald-400/80 hover:from-emerald-300 hover:to-emerald-400',
      details: {
        location: {
          nameKey: 'locations.reception',
          address: 'Grand Hotel',
          city: 'Zürich',
          postalCode: '8001',
          country: 'Schweiz',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
        },
        outfits: {
          men: ['Dunkler Anzug', 'Krawatte oder Fliege', 'Leder-Schuhe'],
          women: ['Festliches Kleid', 'Elegante Accessoires', 'Absätze'],
          colors: [
            { name: 'Dunkelblau', hex: '#1E3A8A' },
            { name: 'Schwarz', hex: '#000000' },
            { name: 'Gold-Akzente', hex: '#FCD34D' },
            { name: 'Weiß', hex: '#FFFFFF' },
          ],
          tag: 'Festive',
        },
        drinks: [
          'Weißwein',
          'Rotwein',
          'Champagner',
          'Bier',
          'Softdrinks',
          'Kaffee & Tee',
        ],
        food: [
          '3-Gänge-Menü',
          'Vegetarische Optionen verfügbar',
          'Vegan Optionen auf Anfrage',
          'Allergien bitte im Voraus mitteilen',
        ],
        expectations: [
          'Sitzplatz-Dinner',
          'Reden und Toasts',
          'Dauer: ca. 4-5 Stunden',
          'Musik während des Essens',
        ],
      },
    },
    {
      date: 'nov28',
      time: '18:00',
      titleKey: 'timeline.party',
      descKey: 'timeline.partyDesc',
      icon: MdCelebration,
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
      bgColor: 'from-cream-600/40 to-cream-500/50',
      buttonColor: 'from-pink-300/80 to-pink-400/80 hover:from-pink-300 hover:to-pink-400',
      details: {
        location: {
          nameKey: 'locations.reception',
          address: 'Grand Hotel',
          city: 'Zürich',
          postalCode: '8001',
          country: 'Schweiz',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
        },
        outfits: {
          men: ['Sakko ausziehen möglich', 'Bequeme Schuhe', 'Lockere Hemden'],
          women: ['Bequeme Schuhe zum Tanzen', 'Kleid bleibt festlich', 'Optional: Wechsel-Schuhe'],
          colors: [
            { name: 'Alle Farben', hex: '#9333EA' },
            { name: 'Gold-Akzente', hex: '#FCD34D' },
            { name: 'Festlich', hex: '#EC4899' },
          ],
          tag: 'Party',
        },
        dj: 'DJ Soundwave',
        drinks: [
          'Open Bar',
          'Cocktails',
          'Bier',
          'Wein',
          'Softdrinks',
          'Wasser',
        ],
        food: [
          'Mitternachtssnacks',
          'Fingerfood',
          'Süße Leckereien',
        ],
        expectations: [
          'Tanzfläche',
          'DJ spielt bis Mitternacht',
          'Erste Torte',
          'Bouquet-Toss',
          'Garter-Toss',
          'Party bis spät in die Nacht',
        ],
      },
    },
    {
      date: 'nov29',
      time: '10:00',
      titleKey: 'timeline.breakfast',
      descKey: 'timeline.breakfastDesc',
      icon: MdRestaurant,
      imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
      bgColor: 'from-orange-900/40 to-amber-900/50',
      buttonColor: 'from-orange-400/80 to-amber-500/80 hover:from-orange-400 hover:to-amber-500',
      details: {
        location: {
          nameKey: 'locations.breakfast',
          address: 'Café Bellevue',
          city: 'Zürich',
          postalCode: '8001',
          country: 'Schweiz',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.1234567890!2d8.5456!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMic0NC4yIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch',
        },
        outfits: {
          men: ['Casual Sakko oder Pullover', 'Jeans oder Chinos', 'Bequeme Schuhe'],
          women: ['Casual Kleid oder Bluse mit Jeans', 'Bequeme Schuhe', 'Lässige Accessoires'],
          colors: [
            { name: 'Beige', hex: '#D4A574' },
            { name: 'Creme', hex: '#FFF2CC' },
            { name: 'Pastelltöne', hex: '#FBCFE8' },
            { name: 'Weiß', hex: '#FFFFFF' },
          ],
          tag: 'Casual',
        },
        drinks: [
          'Kaffee',
          'Tee',
          'Frisch gepresste Säfte',
          'Champagner',
          'Mimosa',
        ],
        food: [
          'Vollständiges Frühstücksbuffet',
          'Eier nach Wahl',
          'Frisches Obst',
          'Croissants & Gebäck',
          'Waffeln & Pancakes',
        ],
        expectations: [
          'Entspannte Atmosphäre',
          'Dauer: ca. 2-3 Stunden',
          'Gemeinsamer Ausklang',
          'Abschied von den Gästen',
        ],
      },
    },
  ]

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = []
    }
    acc[event.date].push(event)
    return acc
  }, {} as Record<'nov27' | 'nov28' | 'nov29', TimelineEvent[]>)

  const dateOrder: ('nov27' | 'nov28' | 'nov29')[] = ['nov27', 'nov28', 'nov29']

  return (
    <>
      {!selectedEvent && (
        <div className="max-w-7xl mx-auto">
          {/* Header – gleiche Breite wie RSVP (max-w-3xl), damit Subheader gleich wirkt */}
          <div className="text-center mb-12 md:mb-16 relative max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {t('timeline.title')}
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
              <MdEventNote className="w-4 h-4 text-gold-500 dark:text-gold-400" />
              <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
            </div>
            <p className="mt-4 text-base md:text-lg font-serif text-gray-600 dark:text-gray-400 w-full max-w-[650px] mx-auto px-2.5">
              {t('timeline.subheader')}
            </p>
          </div>

      {/* Events grouped by date */}
      <div className="space-y-6 md:space-y-8">
        {dateOrder.map((date) => {
          const dayEvents = eventsByDate[date] || []
          if (dayEvents.length === 0) return null

          const isOpen = openDates.has(date)

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
            <div key={date} className="space-y-4">
              {/* Date Header – gleiches Design wie Mainpage „Entdecke unsere Hochzeit“ */}
              <button
                onClick={toggleDate}
                className="w-full text-center p-6 rounded-2xl bg-cream-200/90 dark:bg-gray-800 border-2 border-cream-400/80 dark:border-gray-600 shadow-md hover:shadow-lg hover:border-gold-400 dark:hover:border-gold-600 transition-all duration-300 group"
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
                  <MdEventNote className="w-3 h-3 text-gold-500 dark:text-gold-400" />
                  <div className="h-px w-12 bg-gold-300 dark:bg-gold-600"></div>
                </div>
              </button>

              {/* Events Grid for this date - Only show if open */}
              {isOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
                {dayEvents.map((event, index) => {
          return (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-cream-300/30 dark:border-cream-600/50 hover:border-gold-400 dark:hover:border-gold-500 hover:-translate-y-2"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={event.imageUrl}
                  alt={t(event.titleKey)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${event.bgColor}`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 min-h-[400px] flex flex-col">
                {/* Time - Top Right */}
                <div className="flex items-center justify-end space-x-2 mb-4">
                  <MdAccessTime className="w-4 h-4 text-white dark:text-cream-300" />
                  <span className="text-lg font-serif font-bold text-white drop-shadow-lg">
                    {event.time}
                  </span>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white dark:text-cream-300 mb-3 drop-shadow-lg group-hover:text-white dark:group-hover:text-cream-100 transition-colors">
                  {t(event.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-white/90 font-serif text-base md:text-lg leading-relaxed mb-6 drop-shadow-md line-clamp-2">
                  {t(event.descKey)}
                </p>

                {/* More Button with Pastel Colors */}
                <button 
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r ${event.buttonColor} text-white font-serif font-semibold text-sm rounded-lg transition-all shadow-lg hover:shadow-xl group-hover:scale-105 border-2 border-white/20 backdrop-blur-sm`}
                >
                  <span>{t('timeline.more') || 'More'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Bottom Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${event.buttonColor.replace('/80', '').replace('hover:', '')} shadow-lg`}></div>
            </div>
                )
              })}
                </div>
              )}
            </div>
          )
        })}
        </div>
        </div>
      )}

      {/* Event Details Modal - Portal, damit fixed nicht vom Layout-Transform abgeschnitten wird */}
      {selectedEvent && createPortal(
        <div className="fixed inset-0 top-16 md:top-20 z-50 bg-white dark:bg-gray-900 overflow-y-auto rounded-t-3xl">
          {/* Close Button */}
          <button
            onClick={() => setSelectedEvent(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-20 shadow-lg"
          >
            <MdClose className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Header with Image */}
          <div className="relative h-64 overflow-hidden rounded-t-3xl">
            <img
              src={selectedEvent.imageUrl}
              alt={t(selectedEvent.titleKey)}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedEvent.bgColor}`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <MdAccessTime className="w-5 h-5 text-cream-200" />
                <span className="text-lg font-serif font-semibold">{selectedEvent.time}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold drop-shadow-lg">
                {t(selectedEvent.titleKey)}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Location */}
            {selectedEvent.details.location && (
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl">
                      <MdLocationOn className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.location') || 'Location'}
                    </h3>
                  </div>
                  <div className="ml-14 space-y-2">
                    <p className="text-lg font-serif font-semibold text-gray-900 dark:text-white">
                      {t(selectedEvent.details.location.nameKey)}
                    </p>
                    <p className="font-serif text-gray-700 dark:text-gray-300">
                      {selectedEvent.details.location.address}
                    </p>
                    <p className="font-serif text-gray-700 dark:text-gray-300">
                      {selectedEvent.details.location.postalCode} {selectedEvent.details.location.city}, {selectedEvent.details.location.country}
                    </p>
                    {selectedEvent.details.location.mapUrl && (
                      <div className="mt-4 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                        <iframe
                          src={selectedEvent.details.location.mapUrl}
                          width="100%"
                          height="200"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full"
                          title={t(selectedEvent.details.location.nameKey)}
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Outfits */}
            {selectedEvent.details.outfits && (
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl">
                      <MdCheckroom className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.outfits') || 'Outfit Recommendations'}
                    </h3>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="inline-block px-3 py-1 bg-cream-100 dark:bg-cream-700/30 text-gold-600 dark:text-gold-400 text-sm font-serif font-semibold rounded-full border border-cream-300 dark:border-cream-600">
                      {selectedEvent.details.outfits.tag}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-serif font-semibold text-gray-900 dark:text-white mb-2">
                          {t('outfits.men') || 'For Men'}
                        </h4>
                        <ul className="space-y-2">
                          {selectedEvent.details.outfits.men.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300">
                              <Sparkles className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                              <span className="text-base font-serif">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-gray-900 dark:text-white mb-2">
                          {t('outfits.women') || 'For Women'}
                        </h4>
                        <ul className="space-y-2">
                          {selectedEvent.details.outfits.women.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300">
                              <Sparkles className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                              <span className="text-base font-serif">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-gray-900 dark:text-white mb-3">
                        {t('outfits.colors') || 'Suggested Colors'}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedEvent.details.outfits.colors.map((color, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm"
                          >
                            <div
                              className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                              style={{ backgroundColor: color.hex }}
                            ></div>
                            <span className="text-sm font-serif text-gray-700 dark:text-gray-300">{color.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* DJ */}
            {selectedEvent.details.dj && (
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.dj') || 'DJ'}
                    </h3>
                  </div>
                  <div className="ml-14">
                    <p className="text-lg font-serif text-gray-700 dark:text-gray-300">
                      {selectedEvent.details.dj}
                    </p>
                  </div>
                </div>
              )}

            {/* Drinks */}
            {selectedEvent.details.drinks && (
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                      <Wine className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.drinks') || 'Drinks'}
                    </h3>
                  </div>
                  <div className="ml-14">
                    <ul className="grid md:grid-cols-2 gap-2">
                      {selectedEvent.details.drinks.map((drink, i) => (
                        <li key={i} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                          <Sparkles className="w-4 h-4 text-gold-500 flex-shrink-0" />
                          <span className="text-base font-serif">{drink}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            {/* Food */}
            {selectedEvent.details.food && (
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                      <UtensilsCrossed className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.food') || 'Food'}
                    </h3>
                  </div>
                  <div className="ml-14">
                    <ul className="grid md:grid-cols-2 gap-2">
                      {selectedEvent.details.food.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                          <Sparkles className="w-4 h-4 text-gold-500 flex-shrink-0" />
                          <span className="text-base font-serif">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            {/* Expectations */}
            {selectedEvent.details.expectations && (
              <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.expectations') || 'What to Expect'}
                    </h3>
                  </div>
                  <div className="ml-14">
                    <ul className="space-y-3">
                      {selectedEvent.details.expectations.map((item, i) => (
                        <li key={i} className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
                          <Sparkles className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                          <span className="text-base font-serif">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
