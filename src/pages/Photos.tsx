import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CaretLeftIcon, CaretRightIcon, CameraIcon, XIcon } from '@phosphor-icons/react'
import { useLanguage } from '../contexts/LanguageContext'

// Wedding photos - später durch Supabase ersetzt
const weddingPhotos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Wedding ceremony' },
  { id: 2, url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', alt: 'Wedding couple' },
  { id: 3, url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', alt: 'Wedding reception' },
  { id: 4, url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', alt: 'Wedding dinner' },
  { id: 5, url: 'https://images.unsplash.com/photo-1606800053560-4b0c8e5c5c3e?w=800&q=80', alt: 'Wedding decorations' },
  { id: 6, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', alt: 'Wedding cake' },
  { id: 7, url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80', alt: 'Wedding flowers' },
  { id: 8, url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', alt: 'Wedding rings' },
  { id: 9, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Wedding ceremony 2' },
  { id: 10, url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', alt: 'Wedding couple 2' },
  { id: 11, url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', alt: 'Wedding reception 2' },
  { id: 12, url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', alt: 'Wedding dinner 2' },
]

export default function Photos() {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const currentIndex = selectedImage !== null
    ? weddingPhotos.findIndex((p) => p.id === selectedImage)
    : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < weddingPhotos.length - 1

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasPrev) setSelectedImage(weddingPhotos[currentIndex - 1].id)
  }
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasNext) setSelectedImage(weddingPhotos[currentIndex + 1].id)
  }

  useEffect(() => {
    if (selectedImage === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev(e as unknown as React.MouseEvent)
      if (e.key === 'ArrowRight') goToNext(e as unknown as React.MouseEvent)
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
    }
  }, [selectedImage, currentIndex])

  const handleUploadClick = () => {
    // Zeige Meldung, dass die Funktion noch nicht aktiviert ist
    alert(t('photos.uploadNotAvailable') || 'Diese Funktion ist noch nicht aktiviert.')
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header – gleiche Breite wie RSVP, damit Subheader einheitlich wirkt */}
      <div className="text-center mb-8 md:mb-12 relative max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {t('photos.title')}
        </h1>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-700"></div>
          <CameraIcon className="w-4 h-4 text-gold-500 dark:text-gold-400" />
          <div className="h-px w-16 bg-gold-300 dark:bg-gold-700"></div>
        </div>
        <p className="mt-2 mb-6 text-base md:text-lg font-serif text-gray-600 dark:text-gray-400 w-full max-w-[650px] mx-auto px-2.5">
          {t('photos.subheader')}
        </p>

        {/* Upload Button */}
        <div className="flex justify-center">
          <button
            onClick={handleUploadClick}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 dark:from-gold-600 dark:to-gold-700 dark:hover:from-gold-700 dark:hover:to-gold-800 text-white font-serif font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <CameraIcon className="w-5 h-5" />
            <span>{t('photos.upload') || 'Fotos hochladen'}</span>
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {weddingPhotos.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image.id)}
            className="group relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all shadow-lg hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-gold-400 dark:hover:border-gold-600"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal – Portal, damit nicht vom Layout abgeschnitten; scrollbar bei hohen Fotos */}
      {selectedImage !== null && createPortal(
        <div
          className="fixed inset-0 top-0 z-[110] bg-black/95 flex flex-col items-center justify-center min-h-screen overflow-hidden p-4 pt-16 pb-8 backdrop-blur-sm"
        >
          {/* Schließen-Button oben rechts, gleiches Design wie Vor/Zurück, fixiert */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm border border-white/20 z-10"
            aria-label="Schließen"
          >
            <XIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-center min-h-[70vh] w-full max-w-6xl flex-shrink-0 px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={weddingPhotos.find(img => img.id === selectedImage)?.url}
              alt={weddingPhotos.find(img => img.id === selectedImage)?.alt}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
            />
          </div>
          {/* Vor/Zurück-Buttons fixiert am unteren Bildschirmrand */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={goToPrev}
              disabled={!hasPrev}
              className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full transition-colors backdrop-blur-sm border border-white/20"
              aria-label="Vorheriges Foto"
            >
              <CaretLeftIcon className="w-8 h-8" />
            </button>
            <button
              onClick={goToNext}
              disabled={!hasNext}
              className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full transition-colors backdrop-blur-sm border border-white/20"
              aria-label="Nächstes Foto"
            >
              <CaretRightIcon className="w-8 h-8" />
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Info Message */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center space-x-3 px-6 py-4 bg-gold-50 dark:bg-gold-900/20 rounded-2xl border border-gold-200 dark:border-gold-800">
          <CameraIcon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
          <p className="text-gray-700 dark:text-gray-300 font-serif font-medium">
            {t('photos.moreComing')}
          </p>
          <CameraIcon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
        </div>
      </div>
    </div>
  )
}
