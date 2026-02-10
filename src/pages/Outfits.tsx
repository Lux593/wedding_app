import { Sparkles, Palette, ChevronDown, ChevronUp } from 'lucide-react'
import { 
  MdCheckroom, 
  MdEventNote
} from 'react-icons/md'
import { 
  FaMale,
  FaFemale
} from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { useState } from 'react'

interface OutfitSuggestion {
  date: 'nov27' | 'nov28' | 'nov29'
  eventKey: string
  time: string
  descKey: string
  recommendations: {
    men: string[]   // Übersetzungsschlüssel
    women: string[]
  }
  colors: { nameKey: string; hex: string }[]
  tagKey: string
  menOutfitImage?: string
  womenOutfitImage?: string
}

export default function Outfits() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men')
  const [openDates, setOpenDates] = useState<Set<'nov27' | 'nov28' | 'nov29'>>(new Set())

  const outfitSuggestions: OutfitSuggestion[] = [
    {
      date: 'nov27',
      eventKey: 'timeline.ceremony',
      time: '09:00 - 10:00',
      descKey: 'outfits.formal',
      recommendations: {
        men: ['outfits.rec.suitJacket', 'outfits.rec.lightShirts', 'outfits.rec.elegantFootwear'],
        women: ['outfits.rec.dressOrSuit', 'outfits.rec.hatsOptional', 'outfits.rec.elegantShoes'],
      },
      colors: [
        { nameKey: 'outfits.color.blue', hex: '#3B82F6' },
        { nameKey: 'outfits.color.gray', hex: '#6B7280' },
        { nameKey: 'outfits.color.beige', hex: '#D4A574' },
        { nameKey: 'outfits.color.white', hex: '#FFFFFF' },
      ],
      tagKey: 'outfits.tag.formal',
      menOutfitImage: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
      womenOutfitImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    },
    {
      date: 'nov27',
      eventKey: 'timeline.cocktail',
      time: '10:00 - 11:30',
      descKey: 'outfits.smartCasual',
      recommendations: {
        men: ['outfits.rec.jacketNoTie', 'outfits.rec.lightShirts', 'outfits.rec.leatherSneakers'],
        women: ['outfits.rec.cocktailDress', 'outfits.rec.blouseSkirt', 'outfits.rec.wedgeSandals'],
      },
      colors: [
        { nameKey: 'outfits.color.pastel', hex: '#FBCFE8' },
        { nameKey: 'outfits.color.goldAccent', hex: '#FCD34D' },
        { nameKey: 'outfits.color.white', hex: '#FFFFFF' },
      ],
      tagKey: 'outfits.tag.smartCasual',
      menOutfitImage: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
      womenOutfitImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
    },
    {
      date: 'nov27',
      eventKey: 'timeline.photos',
      time: '11:30 - 12:30',
      descKey: 'outfits.formal',
      recommendations: {
        men: ['outfits.rec.suitJacket', 'outfits.rec.lightShirts', 'outfits.rec.elegantFootwear'],
        women: ['outfits.rec.dressOrSuit', 'outfits.rec.elegantAccessories', 'outfits.rec.elegantShoes'],
      },
      colors: [
        { nameKey: 'outfits.color.blue', hex: '#3B82F6' },
        { nameKey: 'outfits.color.gray', hex: '#6B7280' },
        { nameKey: 'outfits.color.beige', hex: '#D4A574' },
        { nameKey: 'outfits.color.white', hex: '#FFFFFF' },
      ],
      tagKey: 'outfits.tag.formal',
      menOutfitImage: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
      womenOutfitImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    },
    {
      date: 'nov28',
      eventKey: 'timeline.dinner',
      time: '13:00 - 18:00',
      descKey: 'outfits.festive',
      recommendations: {
        men: ['outfits.rec.darkSuit', 'outfits.rec.tieBow', 'outfits.rec.leatherShoes'],
        women: ['outfits.rec.festiveDress', 'outfits.rec.elegantAccessories', 'outfits.rec.heels'],
      },
      colors: [
        { nameKey: 'outfits.color.darkBlue', hex: '#1E3A8A' },
        { nameKey: 'outfits.color.black', hex: '#000000' },
        { nameKey: 'outfits.color.goldAccent', hex: '#FCD34D' },
        { nameKey: 'outfits.color.white', hex: '#FFFFFF' },
      ],
      tagKey: 'outfits.tag.festive',
      menOutfitImage: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
      womenOutfitImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    },
    {
      date: 'nov28',
      eventKey: 'timeline.party',
      time: '18:00 - 24:00',
      descKey: 'outfits.comfortable',
      recommendations: {
        men: ['outfits.rec.jacketOff', 'outfits.rec.comfortableShoes', 'outfits.rec.looseShirts'],
        women: ['outfits.rec.dancingShoes', 'outfits.rec.dressStays', 'outfits.rec.changeShoes'],
      },
      colors: [
        { nameKey: 'outfits.color.allColors', hex: '#9333EA' },
        { nameKey: 'outfits.color.goldAccent', hex: '#FCD34D' },
        { nameKey: 'outfits.color.festive', hex: '#EC4899' },
      ],
      tagKey: 'outfits.tag.party',
      menOutfitImage: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
      womenOutfitImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
    },
    {
      date: 'nov29',
      eventKey: 'timeline.breakfast',
      time: '10:00 - 13:00',
      descKey: 'outfits.casual',
      recommendations: {
        men: ['outfits.rec.casualJacket', 'outfits.rec.jeansChinos', 'outfits.rec.comfortableShoes'],
        women: ['outfits.rec.casualDress', 'outfits.rec.comfortableShoes', 'outfits.rec.casualAccessories'],
      },
      colors: [
        { nameKey: 'outfits.color.beige', hex: '#D4A574' },
        { nameKey: 'outfits.color.cream', hex: '#FFF2CC' },
        { nameKey: 'outfits.color.pastel', hex: '#FBCFE8' },
        { nameKey: 'outfits.color.white', hex: '#FFFFFF' },
      ],
      tagKey: 'outfits.tag.casual',
      menOutfitImage: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
      womenOutfitImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
    },
  ]

  // Group suggestions by date
  const suggestionsByDate = outfitSuggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.date]) {
      acc[suggestion.date] = []
    }
    acc[suggestion.date].push(suggestion)
    return acc
  }, {} as Record<'nov27' | 'nov28' | 'nov29', OutfitSuggestion[]>)

  const dateOrder: ('nov27' | 'nov28' | 'nov29')[] = ['nov27', 'nov28', 'nov29']

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header – gleiche Breite wie RSVP, damit Subheader einheitlich wirkt */}
      <div className="text-center mb-12 md:mb-16 relative max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {t('outfits.title')}
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
          <MdCheckroom className="w-4 h-4 text-gold-500 dark:text-gold-400" />
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
        </div>
        <p className="mt-4 text-base md:text-lg font-serif text-gray-600 dark:text-gray-400 w-full max-w-[650px] mx-auto px-2.5">
          {t('outfits.subheader')}
        </p>
      </div>

      {/* Tabs for Men/Women */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border-2 border-cream-200 dark:border-cream-600">
            <button
            onClick={() => setActiveTab('men')}
            className={`px-6 py-3 rounded-lg font-serif font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'men'
                ? 'bg-gold-500 text-white dark:bg-gold-600 shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <FaMale className="w-5 h-5" />
            <span>{t('outfits.men')}</span>
          </button>
          <button
            onClick={() => setActiveTab('women')}
            className={`px-6 py-3 rounded-lg font-serif font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'women'
                ? 'bg-gold-500 text-white dark:bg-gold-600 shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <FaFemale className="w-5 h-5" />
            <span>{t('outfits.women')}</span>
          </button>
        </div>
      </div>

      {/* Outfit Suggestions grouped by date – Zeitstrahl verbindet die Kacheln inkl. oberer/unterer Verbindungspunkte */}
      <div className="relative pt-[36px] pb-[36px]">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 dark:from-gold-600 dark:via-gold-500 dark:to-gold-600 z-0" aria-hidden />
        <div className="space-y-6 md:space-y-8 relative z-10">
        {dateOrder.map((date, index) => {
          const daySuggestions = suggestionsByDate[date] || []
          if (daySuggestions.length === 0) return null

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
                  <MdCheckroom className="w-3 h-3 text-gold-500 dark:text-gold-400" />
                  <div className="h-px w-12 bg-gold-300 dark:bg-gold-600"></div>
                </div>
              </button>

              {/* Outfit Suggestions for this date - Only show if open */}
              {isOpen && (
                <div className="space-y-8 md:space-y-12 mt-6">
                  {daySuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-cream-300 dark:hover:border-cream-500 transition-all relative overflow-hidden"
                  >
            {/* Header */}
            <div className="flex items-start space-x-4 mb-6 relative z-10">
              <div className="p-4 bg-gradient-to-br from-cream-100 to-cream-200 dark:from-cream-700/30 dark:to-cream-600/30 rounded-xl shadow-md">
                <MdCheckroom className="w-6 h-6 md:w-8 md:h-8 text-gold-600 dark:text-gold-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-2">
                  {t(suggestion.eventKey)}
                </h2>
                <span className="inline-block px-3 py-1 bg-cream-100 dark:bg-cream-700/30 text-gold-600 dark:text-gold-400 text-xs font-serif font-semibold rounded-full border border-cream-300 dark:border-cream-600 mb-2">
                  {t(suggestion.tagKey)}
                </span>
                <div className="flex items-center space-x-2 text-sm font-serif text-gray-600 dark:text-gray-400 mb-2">
                  <MdEventNote className="w-4 h-4" />
                  <span>{suggestion.time}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-serif text-lg">
                  {t(suggestion.descKey)}
                </p>
              </div>
            </div>

            {/* Outfit Image and Recommendations */}
            <div className="grid md:grid-cols-2 gap-6 mb-6 relative z-10">
              {/* Outfit Image */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
                <img
                  src={activeTab === 'men' ? suggestion.menOutfitImage : suggestion.womenOutfitImage}
                  alt={`${t(suggestion.eventKey)} - ${activeTab === 'men' ? t('outfits.men') : t('outfits.women')}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <ul className="space-y-3">
                  {(activeTab === 'men' ? suggestion.recommendations.men : suggestion.recommendations.women).map((itemKey, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Sparkles className="w-4 h-4 text-gold-500 dark:text-gold-400 mt-1 flex-shrink-0" />
                      <span className="font-serif text-gray-700 dark:text-gray-300">{t(itemKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Color Suggestions with Visual Colors */}
            <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6 relative z-10">
              <h3 className="font-serif font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5 text-gold-500 dark:text-gold-400" />
                <span>{t('outfits.colors')}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {suggestion.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <span className="text-sm font-serif font-semibold text-gray-700 dark:text-gray-300">
                      {t(color.nameKey)}
                    </span>
                  </div>
                ))}
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
