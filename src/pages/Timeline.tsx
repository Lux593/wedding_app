import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SparkleIcon,
  ArrowRightIcon,
  MusicNotesIcon,
  ForkKnifeIcon,
  WineIcon,
  CaretCircleDownIcon,
  CaretCircleUpIcon,
  CalendarBlankIcon,
  ClockIcon,
  CookingPotIcon,
  ConfettiIcon,
  CameraIcon,
  XIcon,
  MapPinIcon,
  CoatHangerIcon,
} from '@phosphor-icons/react'
import { useLanguage } from '../contexts/LanguageContext'
import { useEventDetails } from '../contexts/EventDetailsContext'
import { getOutfitRecIcon } from '../lib/outfitRecIcons'
import { EVENT_GRADIENTS, OUTFIT_COLORS } from '../lib/colors'

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
    colors: { nameKey: string; hex: string }[]
    tagKey: string
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
  accentColor: string
  details: EventDetails
}

export default function Timeline() {
  const { t } = useLanguage()
  const { setIsOpen: setEventDetailsOpen } = useEventDetails()
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [openDates, setOpenDates] = useState<Set<'nov27' | 'nov28' | 'nov29'>>(new Set())

  useEffect(() => {
    setEventDetailsOpen(selectedEvent !== null)
    return () => setEventDetailsOpen(false)
  }, [selectedEvent, setEventDetailsOpen])

  const events: TimelineEvent[] = [
    {
      date: 'nov27',
      time: '09:00',
      titleKey: 'timeline.ceremony',
      descKey: 'timeline.ceremonyDesc',
      icon: CalendarBlankIcon,
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      bgColor: EVENT_GRADIENTS.ceremony.bg,
      buttonColor: EVENT_GRADIENTS.ceremony.button,
      accentColor: EVENT_GRADIENTS.ceremony.accent,
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
          men: ['outfits.rec.suitJacket', 'outfits.rec.lightShirts', 'outfits.rec.elegantFootwear'],
          women: ['outfits.rec.dressOrSuit', 'outfits.rec.hatsOptional', 'outfits.rec.elegantShoes'],
          colors: [...OUTFIT_COLORS.formal],
          tagKey: 'outfits.tag.formal',
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
      icon: ConfettiIcon,
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
      bgColor: EVENT_GRADIENTS.cocktail.bg,
      buttonColor: EVENT_GRADIENTS.cocktail.button,
      accentColor: EVENT_GRADIENTS.cocktail.accent,
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
          men: ['outfits.rec.jacketNoTie', 'outfits.rec.lightShirts', 'outfits.rec.leatherSneakers'],
          women: ['outfits.rec.cocktailDress', 'outfits.rec.blouseSkirt', 'outfits.rec.wedgeSandals'],
          colors: [...OUTFIT_COLORS.smartCasual],
          tagKey: 'outfits.tag.smartCasual',
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
      icon: CameraIcon,
      imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      bgColor: EVENT_GRADIENTS.photos.bg,
      buttonColor: EVENT_GRADIENTS.photos.button,
      accentColor: EVENT_GRADIENTS.photos.accent,
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
          men: ['outfits.rec.suitJacket', 'outfits.rec.lightShirts', 'outfits.rec.elegantFootwear'],
          women: ['outfits.rec.dressOrSuit', 'outfits.rec.elegantAccessories', 'outfits.rec.elegantShoes'],
          colors: [...OUTFIT_COLORS.formal],
          tagKey: 'outfits.tag.formal',
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
      icon: CookingPotIcon,
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      bgColor: EVENT_GRADIENTS.dinner.bg,
      buttonColor: EVENT_GRADIENTS.dinner.button,
      accentColor: EVENT_GRADIENTS.dinner.accent,
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
          men: ['outfits.rec.darkSuit', 'outfits.rec.tieBow', 'outfits.rec.leatherShoes'],
          women: ['outfits.rec.festiveDress', 'outfits.rec.elegantAccessories', 'outfits.rec.heels'],
          colors: [...OUTFIT_COLORS.festive],
          tagKey: 'outfits.tag.festive',
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
      icon: ConfettiIcon,
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
      bgColor: EVENT_GRADIENTS.party.bg,
      buttonColor: EVENT_GRADIENTS.party.button,
      accentColor: EVENT_GRADIENTS.party.accent,
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
          men: ['outfits.rec.jacketOff', 'outfits.rec.comfortableShoes', 'outfits.rec.looseShirts'],
          women: ['outfits.rec.dancingShoes', 'outfits.rec.dressStays', 'outfits.rec.changeShoes'],
          colors: [...OUTFIT_COLORS.party],
          tagKey: 'outfits.tag.party',
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
      icon: CookingPotIcon,
      imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
      bgColor: EVENT_GRADIENTS.breakfast.bg,
      buttonColor: EVENT_GRADIENTS.breakfast.button,
      accentColor: EVENT_GRADIENTS.breakfast.accent,
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
          men: ['outfits.rec.casualJacket', 'outfits.rec.jeansChinos', 'outfits.rec.comfortableShoes'],
          women: ['outfits.rec.casualDress', 'outfits.rec.comfortableShoes', 'outfits.rec.casualAccessories'],
          colors: [...OUTFIT_COLORS.casual],
          tagKey: 'outfits.tag.casual',
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
          <div className="text-center mb-6 md:mb-8 relative max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {t('timeline.title')}
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
              <CalendarBlankIcon className="w-4 h-4 text-gold-500 dark:text-gold-400" />
              <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
            </div>
            <p className="mt-4 text-base md:text-lg font-serif text-gray-600 dark:text-gray-400 w-full max-w-[650px] mx-auto px-2.5">
              {t('timeline.subheader')}
            </p>
          </div>

      {/* Events grouped by date – Zeitstrahl verbindet die Kacheln inkl. oberer/unterer Verbindungspunkte */}
      <div className="relative pt-[24px] pb-[24px]">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 dark:from-gold-600 dark:via-gold-500 dark:to-gold-600 z-0" aria-hidden />
        <div className="space-y-3 md:space-y-4 relative z-10">
        {dateOrder.map((date, index) => {
          const dayEvents = eventsByDate[date] || []
          if (dayEvents.length === 0) return null

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
              {/* Knotenpunkt oberhalb der ersten Kachel */}
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
                  <CalendarBlankIcon className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                  <div className="h-px w-12 bg-gold-300 dark:bg-gold-600"></div>
                </div>
              </button>

              {/* Events Grid for this date - Only show if open */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6 transition-all duration-500 ease-in-out origin-top ${
                  isOpen ? 'opacity-100 scale-y-100 max-h-[10000px]' : 'opacity-0 scale-y-95 max-h-0 overflow-hidden'
                }`}
              >
                {dayEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-2 border-cream-300/30 dark:border-cream-600/50 hover:border-gold-400 dark:hover:border-gold-500"
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
                  <ClockIcon className="w-4 h-4 text-white dark:text-cream-300" />
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
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Bottom Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${event.accentColor} shadow-lg`}></div>
            </motion.div>
              ))}
              </div>
            </div>
          )
        })}
        </div>
        {/* Knotenpunkt am Ende der Verbindungslinie – 36px unter letzter Karte, symmetrisch zum Startpunkt über der ersten */}
        {dateOrder.length > 0 && (
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 w-4 h-4 rounded-full border-2 border-gold-500 bg-gold-300 dark:bg-gold-500 dark:border-gold-600 shadow-sm pointer-events-none"
            aria-hidden
          />
        )}
        </div>
        </div>
      )}

      {/* Event Details Modal - Portal mit AnimatePresence für sanftes Ein-/Ausblenden */}
      {createPortal(
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              key="timeline-modal"
              initial={{ opacity: 0, y: '10%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '10%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 top-16 md:top-20 z-50 bg-cream-50 dark:bg-gray-900 overflow-y-auto rounded-t-3xl"
            >
          {/* Close Button */}
          <button
            onClick={() => setSelectedEvent(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-20 shadow-lg"
          >
            <XIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
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
                <ClockIcon className="w-5 h-5 text-cream-200" />
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
                    <div className="p-3 bg-gradient-to-br from-cream-100 to-cream-200 dark:from-cream-700/30 dark:to-cream-600/30 rounded-xl shadow-md">
                      <MapPinIcon className="w-6 h-6 text-gold-600 dark:text-gold-400" />
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
                    <div className="p-3 bg-gradient-to-br from-cream-100 to-cream-200 dark:from-cream-700/30 dark:to-cream-600/30 rounded-xl shadow-md">
                      <CoatHangerIcon className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.outfits') || 'Outfit Recommendations'}
                    </h3>
                  </div>
                  <div className="ml-14 space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-serif font-semibold text-gray-900 dark:text-white mb-2">
                          {t('outfits.men')}
                        </h4>
                        <ul className="space-y-2">
                          {selectedEvent.details.outfits.men.map((itemKey, i) => {
                            const RecIcon = getOutfitRecIcon(itemKey)
                            return (
                              <li key={i} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300">
                                <RecIcon className="w-4 h-4 text-gold-500/70 dark:text-gold-400/70 mt-1 flex-shrink-0" />
                                <span className="text-base font-serif">{t(itemKey)}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-gray-900 dark:text-white mb-2">
                          {t('outfits.women')}
                        </h4>
                        <ul className="space-y-2">
                          {selectedEvent.details.outfits.women.map((itemKey, i) => {
                            const RecIcon = getOutfitRecIcon(itemKey)
                            return (
                              <li key={i} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300">
                                <RecIcon className="w-4 h-4 text-gold-500/70 dark:text-gold-400/70 mt-1 flex-shrink-0" />
                                <span className="text-base font-serif">{t(itemKey)}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-gray-900 dark:text-white mb-3">
                        {t('outfits.colors')}
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
                            <span className="text-sm font-serif text-gray-700 dark:text-gray-300">{t(color.nameKey)}</span>
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
                    <div className="p-3 bg-gradient-to-br from-cream-100 to-cream-200 dark:from-cream-700/30 dark:to-cream-600/30 rounded-xl shadow-md">
                      <MusicNotesIcon className="w-6 h-6 text-gold-600/90 dark:text-gold-400/90" />
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
                    <div className="p-3 bg-gradient-to-br from-cream-100 to-cream-200 dark:from-cream-700/30 dark:to-cream-600/30 rounded-xl shadow-md">
                      <WineIcon className="w-6 h-6 text-gold-600/90 dark:text-gold-400/90" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.drinks') || 'Drinks'}
                    </h3>
                  </div>
                  <div className="ml-14">
                    <ul className="grid md:grid-cols-2 gap-2">
                      {selectedEvent.details.drinks.map((drink, i) => (
                        <li key={i} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                          <SparkleIcon className="w-4 h-4 text-gold-500/70 dark:text-gold-400/70 flex-shrink-0" />
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
                    <div className="p-3 bg-gradient-to-br from-cream-100 to-cream-200 dark:from-cream-700/30 dark:to-cream-600/30 rounded-xl shadow-md">
                      <ForkKnifeIcon className="w-6 h-6 text-gold-600/90 dark:text-gold-400/90" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.food') || 'Food'}
                    </h3>
                  </div>
                  <div className="ml-14">
                    <ul className="grid md:grid-cols-2 gap-2">
                      {selectedEvent.details.food.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                          <SparkleIcon className="w-4 h-4 text-gold-500/70 dark:text-gold-400/70 flex-shrink-0" />
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
                    <div className="p-3 bg-gradient-to-br from-cream-100 to-cream-200 dark:from-cream-700/30 dark:to-cream-600/30 rounded-xl shadow-md">
                      <SparkleIcon className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                      {t('timeline.details.expectations') || 'What to Expect'}
                    </h3>
                  </div>
                  <div className="ml-14">
                    <ul className="space-y-3">
                      {selectedEvent.details.expectations.map((item, i) => (
                        <li key={i} className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
                          <SparkleIcon className="w-4 h-4 text-gold-500/70 dark:text-gold-400/70 mt-1 flex-shrink-0" />
                          <span className="text-base font-serif">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
          </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
