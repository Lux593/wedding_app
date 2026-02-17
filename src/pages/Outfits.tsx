import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PaletteIcon,
  XIcon,
  CoatHangerIcon,
  GenderMaleIcon,
  GenderFemaleIcon,
  ClockIcon,
} from '@phosphor-icons/react'
import { useLanguage } from '../contexts/LanguageContext'
import { getOutfitRecIcon } from '../lib/outfitRecIcons'
import { OUTFIT_COLORS } from '../lib/colors'
import { cn } from '../lib/utils'

interface OutfitSuggestion {
  date: 'nov27' | 'nov28' | 'nov29'
  eventKey: string
  time: string
  descKey: string
  recommendations: { men: string[]; women: string[] }
  colors: { nameKey: string; hex: string }[]
  tagKey: string
  menOutfitImage?: string
  womenOutfitImage?: string
}

// Hochzeitsoutfit-Bilder von Unsplash (Herren: Anzug/Tuxedo, Damen: Brautkleid/festliche Kleidung)
const OUTFIT_IMAGES = {
  men: {
    formal: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80', // Groom in Anzug mit Blumenstrauß
    smartCasual: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', // Mann in Sakko (Hochzeitsgast)
    festive: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80', // Formeller Anzug
    party: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', // Sakko
    casual: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80', // Lässiger Herren-Look
  },
  women: {
    formal: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80', // Brautkleid
    smartCasual: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', // Festliches Kleid (Cocktail)
    festive: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80', // Brautkleid
    party: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', // Festliches Kleid
    casual: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', // Lässiges Kleid
  },
}

const dateOrder: ('nov27' | 'nov28' | 'nov29')[] = ['nov27', 'nov28', 'nov29']

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
    colors: [...OUTFIT_COLORS.formal],
    tagKey: 'outfits.tag.formal',
    menOutfitImage: OUTFIT_IMAGES.men.formal,
    womenOutfitImage: OUTFIT_IMAGES.women.formal,
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
    colors: [...OUTFIT_COLORS.smartCasual],
    tagKey: 'outfits.tag.smartCasual',
    menOutfitImage: OUTFIT_IMAGES.men.smartCasual,
    womenOutfitImage: OUTFIT_IMAGES.women.smartCasual,
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
    colors: [...OUTFIT_COLORS.formal],
    tagKey: 'outfits.tag.formal',
    menOutfitImage: OUTFIT_IMAGES.men.formal,
    womenOutfitImage: OUTFIT_IMAGES.women.formal,
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
    colors: [...OUTFIT_COLORS.festive],
    tagKey: 'outfits.tag.festive',
    menOutfitImage: OUTFIT_IMAGES.men.festive,
    womenOutfitImage: OUTFIT_IMAGES.women.festive,
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
    colors: [...OUTFIT_COLORS.party],
    tagKey: 'outfits.tag.party',
    menOutfitImage: OUTFIT_IMAGES.men.party,
    womenOutfitImage: OUTFIT_IMAGES.women.party,
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
    colors: [...OUTFIT_COLORS.casual],
    tagKey: 'outfits.tag.casual',
    menOutfitImage: OUTFIT_IMAGES.men.casual,
    womenOutfitImage: OUTFIT_IMAGES.women.casual,
  },
]

export default function Outfits() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men')
  const [selectedDate, setSelectedDate] = useState<'nov27' | 'nov28' | 'nov29'>('nov27')
  const [selectedSuggestion, setSelectedSuggestion] = useState<OutfitSuggestion | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src))
  }

  const suggestionsByDate = outfitSuggestions.reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = []
    acc[s.date].push(s)
    return acc
  }, {} as Record<'nov27' | 'nov28' | 'nov29', OutfitSuggestion[]>)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Header */}
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          {t('outfits.title')}
        </h1>
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-12 bg-gold-300 dark:bg-gold-600" />
          <CoatHangerIcon className="w-5 h-5 text-gold-500 dark:text-gold-400" weight="duotone" />
          <div className="h-px w-12 bg-gold-300 dark:bg-gold-600" />
        </div>
        <p className="text-lg md:text-xl font-serif text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          {t('outfits.subheader')}
        </p>
      </header>

      {/* Gender Tabs – refined pill */}
      <div className="flex justify-center mb-10">
        <div
          role="tablist"
          className="inline-flex p-1 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60"
        >
          {(['men', 'women'] as const).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative px-8 py-3 rounded-xl font-serif font-semibold text-sm transition-all duration-300 flex items-center gap-2',
                activeTab === tab
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 dark:from-gold-600 dark:to-gold-700 text-white shadow-lg shadow-gold-500/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                {tab === 'men' ? (
                  <GenderMaleIcon className="w-5 h-5" weight={activeTab === tab ? 'fill' : 'regular'} />
                ) : (
                  <GenderFemaleIcon className="w-5 h-5" weight={activeTab === tab ? 'fill' : 'regular'} />
                )}
                {t(`outfits.${tab}`)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline – vertikale Linie, Datum wählen, Outfits laden */}
      <div className="relative">
        {/* Vertikale Timeline-Linie – durchgehend */}
        <div
          className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 dark:from-gold-600 dark:via-gold-500 dark:to-gold-600 z-0"
          aria-hidden
        />

        {/* Timeline – Datum-Knoten mit Outfit-Karten dazwischen */}
        <div className="relative z-10">
          {dateOrder.map((date, index) => {
            const suggestions = suggestionsByDate[date] || []
            if (suggestions.length === 0) return null

            const isSelected = selectedDate === date
            const isLeft = index % 2 === 0

            return (
              <div key={date} className="relative">
                {/* Datum-Knoten */}
                <div className="relative flex items-center min-h-[72px] py-3">
                  {/* Linke Hälfte */}
                  <div className="hidden md:flex w-1/2 justify-end pr-6">
                    {isLeft && (
                      <button
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          'flex flex-col gap-0.5 px-5 py-3 rounded-xl transition-all duration-300 text-right min-w-[160px]',
                          isSelected
                            ? 'bg-gradient-to-r from-gold-500 to-gold-600 dark:from-gold-600 dark:to-gold-700 text-white shadow-lg shadow-gold-500/25'
                            : 'bg-cream-200 dark:bg-gray-800 border-2 border-gold-300 dark:border-gray-600 hover:border-gold-500 dark:hover:border-gold-500 text-gray-900 dark:text-white hover:shadow-md'
                        )}
                      >
                        <span className="font-serif font-bold text-base md:text-lg">
                          {t(`timeline.date.${date}`)}
                        </span>
                        <span className={cn(
                          'text-xs md:text-sm font-serif font-medium',
                          isSelected ? 'text-white/90' : 'text-gold-600 dark:text-gold-400'
                        )}>
                          {suggestions.length} {suggestions.length === 1 ? t('outfits.oneOutfit') : t('outfits.outfits')}
                        </span>
                      </button>
                    )}
                  </div>
                  {/* Knotenpunkt auf der Linie */}
                  <div
                    className={cn(
                      'absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 z-20 -translate-x-1/2 flex-shrink-0',
                      isSelected
                        ? 'bg-gold-500 border-gold-600 dark:border-gold-400 shadow-lg shadow-gold-500/40'
                        : 'bg-cream-200 dark:bg-gray-800 border-gold-500 dark:border-gold-500'
                    )}
                    aria-hidden
                  />
                  {/* Rechte Hälfte / Mobile */}
                  <div className={cn(
                    'flex md:w-1/2 md:justify-start pl-14 md:pl-6',
                    isLeft && 'md:pl-0'
                  )}>
                    <button
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        'flex flex-col gap-0.5 px-5 py-3 rounded-xl transition-all duration-300 text-left min-w-[160px]',
                        isLeft && 'md:hidden',
                        isSelected
                          ? 'bg-gradient-to-r from-gold-500 to-gold-600 dark:from-gold-600 dark:to-gold-700 text-white shadow-lg shadow-gold-500/25'
                          : 'bg-cream-200 dark:bg-gray-800 border-2 border-gold-300 dark:border-gray-600 hover:border-gold-500 dark:hover:border-gold-500 text-gray-900 dark:text-white hover:shadow-md'
                      )}
                    >
                      <span className="font-serif font-bold text-base md:text-lg">
                        {t(`timeline.date.${date}`)}
                      </span>
                      <span className={cn(
                        'text-xs md:text-sm font-serif font-medium',
                        isSelected ? 'text-white/90' : 'text-gold-600 dark:text-gold-400'
                      )}>
                        {suggestions.length} {suggestions.length === 1 ? t('outfits.oneOutfit') : t('outfits.outfits')}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Outfit-Karten – direkt unter dem Datum, zwischen den Datum-Karten */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key={`outfits-${date}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="py-6 md:py-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                          {suggestions.map((suggestion, cardIndex) => (
                            <motion.article
                              key={`${suggestion.eventKey}-${suggestion.time}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: cardIndex * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                              whileHover={{ y: -6 }}
                              className="group cursor-pointer"
                              onClick={() => setSelectedSuggestion(suggestion)}
                            >
                              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 shadow-lg ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 group-hover:shadow-xl group-hover:ring-gold-400/30 dark:group-hover:ring-gold-500/30">
                                {(() => {
                                  const imgSrc =
                                    activeTab === 'men'
                                      ? suggestion.menOutfitImage
                                      : suggestion.womenOutfitImage
                                  const hasFailed = imgSrc ? failedImages.has(imgSrc) : true
                                  return hasFailed ? (
                                    <div
                                      className="absolute inset-0 flex items-center justify-center"
                                      aria-hidden
                                    >
                                      <CoatHangerIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                                    </div>
                                  ) : (
                                    <img
                                      src={imgSrc}
                                      alt=""
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      loading="lazy"
                                      onError={() => imgSrc && handleImageError(imgSrc)}
                                    />
                                  )
                                })()}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-lg">
                                    {t(suggestion.eventKey)}
                                  </h3>
                                  <p className="text-base md:text-lg font-serif text-white/90 flex items-center gap-1.5 mt-1.5">
                                    <ClockIcon className="w-5 h-5" weight="duotone" />
                                    {suggestion.time}
                                  </p>
                                </div>
                              </div>
                            </motion.article>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detail Modal – Portal zu body, z-[110] über Kopfzeile (z-[100]) */}
      {createPortal(
        <AnimatePresence>
          {selectedSuggestion && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm"
                onClick={() => setSelectedSuggestion(null)}
                aria-hidden
              />
              <motion.div
                key="outfit-detail"
                initial={{ opacity: 0, y: '20%', scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: '20%', scale: 0.98 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-0 md:inset-8 lg:inset-12 z-[110] md:rounded-3xl overflow-hidden bg-cream-50 dark:bg-gray-900 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
              <button
                onClick={() => setSelectedSuggestion(null)}
                className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-[120] p-2.5 rounded-full bg-white/90 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-colors"
                aria-label="Schließen"
              >
                <XIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              <div className="flex-1 overflow-y-auto">
                {/* Image Header – mehr Höhe, weniger Weißraum unten */}
                <div className="relative min-h-[45vh] md:min-h-[50vh] lg:min-h-[55vh] bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600">
                  {(() => {
                    const imgSrc =
                      activeTab === 'men'
                        ? selectedSuggestion.menOutfitImage
                        : selectedSuggestion.womenOutfitImage
                    const hasFailed = imgSrc ? failedImages.has(imgSrc) : true
                    return hasFailed ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CoatHangerIcon className="w-20 h-20 text-gray-400 dark:text-gray-500" />
                      </div>
                    ) : (
                      <img
                        src={imgSrc}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={() => imgSrc && handleImageError(imgSrc)}
                      />
                    )
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-cream-50 dark:from-gray-900 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">
                      {t(selectedSuggestion.eventKey)}
                    </h2>
                    <p className="text-lg md:text-xl font-serif text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
                      <ClockIcon className="w-5 h-5" />
                      {selectedSuggestion.time}
                    </p>
                    <p className="text-base md:text-lg font-serif text-gray-500 dark:text-gray-400 mt-2">
                      {t(selectedSuggestion.descKey)}
                    </p>
                  </div>
                </div>

                {/* Content – kompakter, weniger Abstand unten */}
                <div className="p-6 md:p-8 pb-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <CoatHangerIcon className="w-5 h-5 text-gold-500" weight="duotone" />
                      {t('outfits.recommendations')}
                    </h3>
                    <ul className="space-y-3">
                      {(activeTab === 'men'
                        ? selectedSuggestion.recommendations.men
                        : selectedSuggestion.recommendations.women
                      ).map((itemKey, i) => {
                        const RecIcon = getOutfitRecIcon(itemKey)
                        return (
                          <li
                            key={i}
                            className="flex items-center gap-3 py-2 px-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50"
                          >
                            <RecIcon className="w-5 h-5 text-gold-500 dark:text-gold-400 flex-shrink-0" />
                            <span className="font-serif text-gray-700 dark:text-gray-300">{t(itemKey)}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Color Swatches */}
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <PaletteIcon className="w-5 h-5 text-gold-500" weight="duotone" />
                      {t('outfits.colors')}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {selectedSuggestion.colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 hover:border-gold-300 dark:hover:border-gold-600 transition-colors"
                        >
                          <div
                            className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-600 ring-offset-2 dark:ring-offset-gray-900 shadow-inner"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="font-serif font-medium text-gray-700 dark:text-gray-300">
                            {t(color.nameKey)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
