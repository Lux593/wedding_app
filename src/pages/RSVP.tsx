import { useState, FormEvent } from 'react'
import {
  ConfettiIcon,
  HeartIcon,
  HeartBreakIcon,
  WarningIcon,
  EnvelopeIcon,
  UsersIcon,
  ChatCircleIcon,
  PaperPlaneRightIcon,
  UserIcon,
} from '@phosphor-icons/react'
import { useLanguage } from '../contexts/LanguageContext'

interface RSVPFormData {
  attending: 'yes' | 'no' | ''
  name: string
  email: string
  numberOfGuests: number
  hasAllergies: boolean
  allergies: string
  message: string
}

export default function RSVP() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<RSVPFormData>({
    attending: '',
    name: '',
    email: '',
    numberOfGuests: 1,
    hasAllergies: false,
    allergies: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Integrate with Supabase
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    console.log('RSVP Data:', formData)
    
    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        attending: '',
        name: '',
        email: '',
        numberOfGuests: 1,
        hasAllergies: false,
        allergies: '',
        message: '',
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-cream-200/70 dark:bg-cream-800/40 border-2 border-cream-400/80 dark:border-cream-600/60 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rsvp-heart-pulse" aria-hidden>
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full text-red-500 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  pathLength="1"
                  className="rsvp-heart-outline"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
                <path
                  className="rsvp-heart-fill"
                  fill="currentColor"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
                <path
                  fill="none"
                  strokeWidth="0.42"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rsvp-heart-gold-frame stroke-gold-500 dark:stroke-gold-400"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {t('rsvp.thankYou')}
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="h-px w-12 bg-gold-300 dark:bg-gold-700"></div>
              <HeartIcon className="w-4 h-4 text-gold-500 dark:text-gold-400" />
              <div className="h-px w-12 bg-gold-300 dark:bg-gold-700"></div>
            </div>
            <p className="text-lg font-serif text-gray-700 dark:text-gray-300">
              {t('rsvp.success')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8 relative">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {t('rsvp.title')}
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-700"></div>
          <EnvelopeIcon className="w-4 h-4 text-gold-500 dark:text-gold-400" />
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-700"></div>
        </div>
        <p className="mt-4 text-base md:text-lg font-serif text-gray-600 dark:text-gray-400 w-full max-w-[650px] mx-auto px-2.5">
          {t('rsvp.subheader')}
        </p>
      </div>

      <div className="bg-cream-200/90 dark:bg-gray-800 border-2 border-cream-400/80 dark:border-gray-600 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {/* Attending */}
          <div>
            <label className="block text-base font-serif font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <ConfettiIcon className="w-5 h-5 text-gold-500 dark:text-gold-400" weight="duotone" />
              <span>{t('rsvp.attending')} *</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer group">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.attending === 'yes'}
                  onChange={(e) =>
                    setFormData({ ...formData, attending: e.target.value as 'yes' | 'no' })
                  }
                  className="sr-only"
                  required
                />
                <div
                  className={`h-32 p-6 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                    formData.attending === 'yes'
                      ? 'border-gold-500 bg-gold-300 dark:bg-gold-800/60 text-gold-900 dark:text-gold-200 shadow-lg scale-105 ring-2 ring-gold-400/50 dark:ring-gold-500/40 rsvp-option-selected'
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gold-300 dark:hover:border-gold-600'
                  }`}
                >
                  <HeartIcon className="w-8 h-8 mb-2 text-current" weight="fill" />
                  <div className="font-serif font-semibold">{t('rsvp.yes')}</div>
                </div>
              </label>
              <label className="cursor-pointer group">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === 'no'}
                  onChange={(e) =>
                    setFormData({ ...formData, attending: e.target.value as 'yes' | 'no' })
                  }
                  className="sr-only"
                  required
                />
                <div
                  className={`h-32 p-6 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                    formData.attending === 'no'
                      ? 'border-gold-500 bg-gold-300 dark:bg-gold-800/60 text-gold-900 dark:text-gold-200 shadow-lg scale-105 ring-2 ring-gold-400/50 dark:ring-gold-500/40 rsvp-option-selected'
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gold-300 dark:hover:border-gold-600'
                  }`}
                >
                  <HeartBreakIcon className="w-8 h-8 mb-2 text-current" weight="duotone" />
                  <div className="font-serif font-semibold">{t('rsvp.no')}</div>
                </div>
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-base font-serif font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <UserIcon className="w-5 h-5 text-gold-500 dark:text-gold-400" />
              <span>{t('rsvp.name')} *</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('rsvp.namePlaceholder')}
              className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-serif placeholder-gray-400 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-base font-serif font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <EnvelopeIcon className="w-5 h-5 text-gold-500 dark:text-gold-400" />
              <span>{t('rsvp.email')} *</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t('rsvp.emailPlaceholder')}
              className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-serif placeholder-gray-400 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all"
              required
            />
          </div>

          {/* Number of Guests */}
          {formData.attending === 'yes' && (
            <div>
              <label htmlFor="guests" className="block text-base font-serif font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                <UsersIcon className="w-5 h-5 text-gold-500 dark:text-gold-400" />
                <span>{t('rsvp.guests')} *</span>
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                max="10"
                value={formData.numberOfGuests}
                onChange={(e) =>
                  setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) || 1 })
                }
                className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-serif focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all"
                required
              />
              <p className="mt-2 text-sm font-serif text-gray-500 dark:text-gray-400">
                {t('rsvp.guestsDesc')}
              </p>
            </div>
          )}

          {/* Allergies */}
          {formData.attending === 'yes' && (
            <div>
              <label className="block text-base font-serif font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <WarningIcon className="w-5 h-5 text-gold-500 dark:text-gold-400" />
                <span>{t('rsvp.allergies')}</span>
              </label>
              <div className="mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={formData.hasAllergies}
                      onChange={(e) =>
                        setFormData({ ...formData, hasAllergies: e.target.checked, allergies: e.target.checked ? formData.allergies : '' })
                      }
                      className="w-5 h-5 appearance-none bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-gold-500 focus:ring-2 cursor-pointer checked:bg-gold-500 checked:border-gold-500"
                    />
                    {formData.hasAllergies && (
                      <svg className="absolute top-0 left-0 w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-serif text-gray-700 dark:text-gray-300">{t('rsvp.hasAllergies')}</span>
                </label>
              </div>
              {formData.hasAllergies && (
                <div>
                  <label htmlFor="allergies" className="block text-sm font-serif font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('rsvp.allergiesDetails')} *
                  </label>
                  <textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder={t('rsvp.allergiesPlaceholder')}
                    rows={3}
                    className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-serif placeholder-gray-400 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all resize-none"
                    required={formData.hasAllergies}
                  />
                </div>
              )}
            </div>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-base font-serif font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <ChatCircleIcon className="w-5 h-5 text-gold-500 dark:text-gold-400" />
              <span>{t('rsvp.message')}</span>
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t('rsvp.messagePlaceholder')}
              rows={5}
              className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-serif placeholder-gray-400 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 dark:from-gold-600 dark:to-gold-700 dark:hover:from-gold-700 dark:hover:to-gold-800 text-white font-serif font-bold py-4 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('rsvp.submitting')}</span>
              </>
            ) : (
              <>
                <PaperPlaneRightIcon className="w-5 h-5" />
                <span>{t('rsvp.submit')}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
