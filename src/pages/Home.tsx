import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  SparkleIcon,
  HeartIcon,
  CalendarBlankIcon,
  MapPinIcon,
  CoatHangerIcon,
  EnvelopeIcon,
  CameraIcon,
} from '@phosphor-icons/react'
import { useLanguage } from '../contexts/LanguageContext'

const WEDDING_DATE = new Date(2026, 10, 27, 9, 0, 0) // 27. Nov 2026, 09:00

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setIsFinished(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return { timeLeft, isFinished }
}

export default function Home() {
  const { t } = useLanguage()
  const { timeLeft, isFinished } = useCountdown(WEDDING_DATE)

  const quickLinks = [
    { icon: CalendarBlankIcon, path: '/timeline', key: 'nav.timeline', descKey: 'home.timelineDesc' },
    { icon: MapPinIcon, path: '/locations', key: 'nav.locations', descKey: 'home.locationsDesc' },
    { icon: CoatHangerIcon, path: '/outfits', key: 'nav.outfits', descKey: 'home.outfitsDesc' },
    { icon: EnvelopeIcon, path: '/rsvp', key: 'nav.rsvp', descKey: 'home.rsvpDesc' },
    { icon: CameraIcon, path: '/photos', key: 'nav.photos', descKey: 'home.photosDesc' },
  ]

  return (
    <div className="space-y-8 md:space-y-16 -mt-8 md:-mt-12">
      {/* Hero Section – weniger Abstand Kopfzeile→2026 */}
      <section className="text-center space-y-6 py-1 md:py-2 relative overflow-hidden">
        {/* Decorative elements – klein, Sparkle hinter „Rahul“, Herz hinter „Simren“ */}
        <div className="absolute left-[12%] top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 opacity-10 dark:opacity-5 pointer-events-none" aria-hidden>
          <SparkleIcon className="w-full h-full text-gold-500" />
        </div>
        <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 opacity-10 dark:opacity-5 pointer-events-none" aria-hidden>
          <HeartIcon className="w-full h-full text-gold-500" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 mb-4">
            <SparkleIcon className="w-5 h-5 text-gold-500 dark:text-gold-400 animate-pulse" />
            <span className="text-sm font-medium text-gold-600 dark:text-gold-500 uppercase tracking-wider">
              {t('home.wedding')} {new Date().getFullYear()}
            </span>
            <SparkleIcon className="w-5 h-5 text-gold-500 dark:text-gold-400 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-gold-600 to-gold-400 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
            <HeartIcon className="w-4 h-4 text-gold-500 dark:text-gold-400" />
            <div className="h-px w-16 bg-gold-300 dark:bg-gold-600"></div>
          </div>
        </div>
      </section>

      {/* Countdown – bis zum 27. Nov 2026, 09:00 Uhr */}
      <section className="flex justify-center -mt-6 md:-mt-10">
        {isFinished ? (
          <p className="text-lg md:text-xl font-serif font-semibold text-gold-600 dark:text-gold-400">
            {t('home.countdown.started')}
          </p>
        ) : (
          <div className="flex items-center gap-3 md:gap-4">
            {[
              { value: timeLeft.days, label: t('home.countdown.days') },
              { value: timeLeft.hours, label: t('home.countdown.hours') },
              { value: timeLeft.minutes, label: t('home.countdown.minutes') },
              { value: timeLeft.seconds, label: t('home.countdown.seconds') },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center min-w-[4rem] md:min-w-[5rem] px-3 py-1.5 rounded-xl bg-cream-100/80 dark:bg-gray-800/80 border border-cream-300/60 dark:border-gray-600/60 backdrop-blur-sm"
              >
                <span className="text-2xl md:text-3xl font-serif font-bold text-gold-600 dark:text-gold-400 tabular-nums">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs font-serif font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-0.5">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Welcome – Hochzeitsbild als fließender Hintergrund, ohne Kachel */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-20 md:-mt-28 min-h-[420px] md:min-h-[480px]">
        {/* Hintergrundbild – randlos, kein Box-Effekt */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
            alt="Rahul & Simren Wedding"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/50" />
        </div>

        {/* Content – über dem Hintergrund */}
        <div className="relative z-10 min-h-[420px] md:min-h-[480px] flex flex-col justify-center items-center text-center pt-14 pb-12 px-6 md:pt-20 md:pb-20 md:px-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 dark:bg-white/10 rounded-full backdrop-blur-sm border border-white/30">
              <HeartIcon className="w-8 h-8 text-white" weight="fill" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6 drop-shadow-2xl">
            {t('home.welcome')}
          </h2>
<div className="flex items-center justify-center space-x-2 mb-6">
              <div className="h-px w-12 bg-white/90 dark:bg-white/80" />
              <SparkleIcon className="w-4 h-4 text-white" />
              <div className="h-px w-12 bg-white/90 dark:bg-white/80" />
            </div>
          <p className="text-white font-serif leading-relaxed text-lg drop-shadow-xl max-w-2xl mx-auto">
            {t('home.welcomeText')}
          </p>
        </div>
      </section>

      {/* Entdecke unsere Hochzeit – elegante Kacheln im Hochzeits-Stil */}
      <section className="relative max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-2 text-gray-900 dark:text-white">
          {t('home.discover')}
        </h2>
        <div className="flex items-center justify-center space-x-2 mb-8 md:mb-10">
          <div className="h-px w-12 bg-gold-300 dark:bg-gold-600" />
          <HeartIcon className="w-4 h-4 text-gold-500 dark:text-gold-400" />
          <div className="h-px w-12 bg-gold-300 dark:bg-gold-600" />
        </div>
        <div className="space-y-4 md:space-y-5">
          {quickLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-rose-200 dark:bg-gray-800 border-2 border-gold-400 dark:border-gray-600 shadow-md hover:shadow-lg hover:border-gold-500 dark:hover:border-gold-600 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${index * 100}ms`, animationDuration: '400ms', animationFillMode: 'both' }}
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
                  <SparkleIcon className="w-5 h-5 text-gold-500 dark:text-gold-400" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
