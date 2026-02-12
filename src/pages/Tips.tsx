import { useState } from 'react'
import {
  CaretDownIcon,
  CaretUpIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  CurrencyCircleDollarIcon,
  LinkIcon,
  ForkKnifeIcon,
  BinocularsIcon,
  TrendUpIcon,
} from '@phosphor-icons/react'
import { useLanguage } from '../contexts/LanguageContext'

interface Tip {
  category: 'restaurant' | 'activity' | 'sightseeing'
  nameKey: string
  descriptionKey: string
  location: string
  address?: string
  priceLevel?: number // 1-4 ($, $$, $$$, $$$$)
  duration?: string
  website?: string
  imageUrl?: string
}

export default function Tips() {
  const { t } = useLanguage()
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['restaurant']))

  const tips: Tip[] = [
    // Restaurants
    {
      category: 'restaurant',
      nameKey: 'tips.restaurant.name1',
      descriptionKey: 'tips.restaurant.desc1',
      location: 'Zürich Altstadt',
      address: 'Münsterhof 8, 8001 Zürich',
      priceLevel: 3,
      website: 'https://example.com',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    },
    {
      category: 'restaurant',
      nameKey: 'tips.restaurant.name2',
      descriptionKey: 'tips.restaurant.desc2',
      location: 'Zürich See',
      address: 'Seestrasse 100, 8002 Zürich',
      priceLevel: 2,
      website: 'https://example.com',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    },
    // Activities
    {
      category: 'activity',
      nameKey: 'tips.activity.name1',
      descriptionKey: 'tips.activity.desc1',
      location: 'Zürichsee',
      duration: '2-3 Stunden',
      priceLevel: 2,
      website: 'https://example.com',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    },
    {
      category: 'activity',
      nameKey: 'tips.activity.name2',
      descriptionKey: 'tips.activity.desc2',
      location: 'Uetliberg',
      duration: '3-4 Stunden',
      priceLevel: 1,
      website: 'https://example.com',
      imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    },
    // Sightseeing
    {
      category: 'sightseeing',
      nameKey: 'tips.sightseeing.name1',
      descriptionKey: 'tips.sightseeing.desc1',
      location: 'Zürich Zentrum',
      address: 'Grossmünsterplatz, 8001 Zürich',
      duration: '1-2 Stunden',
      priceLevel: 1,
      imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',
    },
    {
      category: 'sightseeing',
      nameKey: 'tips.sightseeing.name2',
      descriptionKey: 'tips.sightseeing.desc2',
      location: 'Zürich Altstadt',
      address: 'Bahnhofstrasse, 8001 Zürich',
      duration: '2-3 Stunden',
      priceLevel: 2,
      imageUrl: 'https://images.unsplash.com/photo-1559564765-23eb41ffc78f?w=800&q=80',
    },
  ]

  const categories = [
    {
      id: 'restaurant',
      nameKey: 'tips.restaurants',
      icon: ForkKnifeIcon,
      color: 'from-rose-500/40 to-pink-500/50',
    },
    {
      id: 'activity',
      nameKey: 'tips.activities',
      icon: TrendUpIcon,
      color: 'from-blue-500/40 to-cyan-500/50',
    },
    {
      id: 'sightseeing',
      nameKey: 'tips.sightseeing',
      icon: BinocularsIcon,
      color: 'from-purple-500/40 to-indigo-500/50',
    },
  ]

  const tipsByCategory = tips.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = []
    }
    acc[tip.category].push(tip)
    return acc
  }, {} as Record<string, Tip[]>)

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories)
    if (openCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId)
    } else {
      newOpenCategories.add(categoryId)
    }
    setOpenCategories(newOpenCategories)
  }

  const renderPriceLevel = (level: number) => {
    return Array.from({ length: 4 }).map((_, i) => (
      <CurrencyCircleDollarIcon
        key={i}
        className={`w-4 h-4 ${i < level ? 'text-gold-500 dark:text-gold-400' : 'text-gray-300 dark:text-gray-600'}`}
        weight={i < level ? 'fill' : 'regular'}
      />
    ))
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8 relative max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {t('tips.title') || 'Empfehlungen'}
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
          <StarIcon className="w-4 h-4 text-gold-500 dark:text-gold-400" weight="fill" />
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
        </div>
        <p className="mt-4 text-base md:text-lg font-serif text-gray-600 dark:text-gray-400 w-full max-w-[650px] mx-auto px-2.5">
          {t('tips.subheader') || 'Unsere Tipps für Restaurants, Aktivitäten und Sehenswürdigkeiten in Zürich'}
        </p>
      </div>

      {/* Categories with Tips */}
      <div className="relative pt-[18px] pb-[36px]">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 dark:from-gold-600 dark:via-gold-500 dark:to-gold-600 z-0" aria-hidden />
        <div className="space-y-6 md:space-y-8 relative z-10">
          {categories.map((category, index) => {
            const categoryTips = tipsByCategory[category.id] || []
            if (categoryTips.length === 0) return null

            const isOpen = openCategories.has(category.id)
            const isFirst = index === 0
            const CategoryIcon = category.icon

            return (
              <div key={category.id} className="relative space-y-4">
                {isFirst && (
                  <div
                    className="absolute left-1/2 -top-[18px] -translate-x-1/2 z-20 w-4 h-4 rounded-full border-2 border-gold-500 bg-rose-200 dark:bg-gray-800 dark:border-gold-500 shadow-sm pointer-events-none"
                    aria-hidden
                  />
                )}
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="relative z-10 w-full text-center p-6 rounded-2xl bg-rose-200 dark:bg-gray-800 border-2 border-gold-400 dark:border-gray-600 shadow-md hover:shadow-lg hover:border-gold-500 dark:hover:border-gold-600 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center space-x-4">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-0">
                      {t(category.nameKey)}
                    </h2>
                    {isOpen ? (
                      <CaretUpIcon className="w-6 h-6 text-gold-600 dark:text-gold-400 transition-transform" />
                    ) : (
                      <CaretDownIcon className="w-6 h-6 text-gold-600 dark:text-gold-400 transition-transform" />
                    )}
                  </div>
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <div className="h-px w-12 bg-gold-300 dark:bg-gold-600"></div>
                    <CategoryIcon className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                    <div className="h-px w-12 bg-gold-300 dark:bg-gold-600"></div>
                  </div>
                </button>

                {/* Tips Grid for this category - Only show if open */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 transition-all duration-500 ease-in-out origin-top ${
                    isOpen ? 'opacity-100 scale-y-100 max-h-[10000px]' : 'opacity-0 scale-y-95 max-h-0 overflow-hidden'
                  }`}
                >
                  {categoryTips.map((tip, tipIndex) => (
                    <div
                      key={tipIndex}
                      className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-rose-200 dark:border-gray-700 hover:border-gold-400 dark:hover:border-gold-500 hover:-translate-y-2 bg-white dark:bg-gray-800"
                    >
                      {/* Image */}
                      {tip.imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={tip.imageUrl}
                            alt={t(tip.nameKey)}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`}></div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white">
                          {t(tip.nameKey)}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-700 dark:text-gray-300 font-serif text-sm leading-relaxed">
                          {t(tip.descriptionKey)}
                        </p>

                        {/* Details */}
                        <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                          {/* Location */}
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPinIcon className="w-4 h-4 text-gold-500 dark:text-gold-400 flex-shrink-0" />
                            <span className="font-serif text-gray-700 dark:text-gray-300">{tip.location}</span>
                          </div>

                          {/* Address */}
                          {tip.address && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-serif ml-6">
                              {tip.address}
                            </div>
                          )}

                          {/* Duration */}
                          {tip.duration && (
                            <div className="flex items-center space-x-2 text-sm">
                              <ClockIcon className="w-4 h-4 text-gold-500 dark:text-gold-400 flex-shrink-0" />
                              <span className="font-serif text-gray-700 dark:text-gray-300">{tip.duration}</span>
                            </div>
                          )}

                          {/* Price Level */}
                          {tip.priceLevel && (
                            <div className="flex items-center space-x-2">
                              {renderPriceLevel(tip.priceLevel)}
                            </div>
                          )}

                          {/* Website */}
                          {tip.website && (
                            <a
                              href={tip.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 text-sm text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors font-serif font-medium"
                            >
                              <LinkIcon className="w-4 h-4" />
                              <span>Website besuchen</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        {/* Endpoint */}
        {categories.length > 0 && (
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[16px] z-20 w-4 h-4 rounded-full border-2 border-gold-500 bg-gold-300 dark:bg-gold-500 dark:border-gold-600 shadow-sm pointer-events-none"
            aria-hidden
          />
        )}
      </div>
    </div>
  )
}
