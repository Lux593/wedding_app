/**
 * Zentrale Farbpalette für die Wedding App
 * Hochwertige, zeitlose Hochzeitsästhetik
 */

/** Empfohlene Outfit-Farben pro Event-Typ */
export const OUTFIT_COLORS = {
  formal: [
    { nameKey: 'outfits.color.navy', hex: '#1e3a5f' },
    { nameKey: 'outfits.color.charcoal', hex: '#4a5568' },
    { nameKey: 'outfits.color.sand', hex: '#c4a77d' },
    { nameKey: 'outfits.color.ivory', hex: '#faf8f5' },
  ],
  smartCasual: [
    { nameKey: 'outfits.color.blush', hex: '#e8d5d0' },
    { nameKey: 'outfits.color.champagne', hex: '#d4c4a8' },
    { nameKey: 'outfits.color.ivory', hex: '#faf8f5' },
  ],
  festive: [
    { nameKey: 'outfits.color.navy', hex: '#1e3a5f' },
    { nameKey: 'outfits.color.black', hex: '#1a1a1a' },
    { nameKey: 'outfits.color.champagne', hex: '#d4c4a8' },
    { nameKey: 'outfits.color.ivory', hex: '#faf8f5' },
  ],
  party: [
    { nameKey: 'outfits.color.allColors', hex: '#8b7355' },
    { nameKey: 'outfits.color.champagne', hex: '#d4c4a8' },
    { nameKey: 'outfits.color.blush', hex: '#e8d5d0' },
  ],
  casual: [
    { nameKey: 'outfits.color.sand', hex: '#c4a77d' },
    { nameKey: 'outfits.color.cream', hex: '#f5f0e6' },
    { nameKey: 'outfits.color.blush', hex: '#e8d5d0' },
    { nameKey: 'outfits.color.ivory', hex: '#faf8f5' },
  ],
} as const

/** Event-Gradienten für Timeline-Karten (Overlay + Button + Accent) */
export const EVENT_GRADIENTS = {
  ceremony: {
    bg: 'from-slate-900/50 to-slate-800/60',
    button: 'from-slate-400/90 to-slate-500/90 hover:from-slate-400 hover:to-slate-500',
    accent: 'from-slate-400 to-slate-500',
  },
  cocktail: {
    bg: 'from-amber-900/40 to-amber-800/50',
    button: 'from-amber-300/90 to-amber-400/90 hover:from-amber-300 hover:to-amber-400',
    accent: 'from-amber-300 to-amber-400',
  },
  photos: {
    bg: 'from-stone-900/50 to-stone-800/60',
    button: 'from-stone-400/90 to-stone-500/90 hover:from-stone-400 hover:to-stone-500',
    accent: 'from-stone-400 to-stone-500',
  },
  dinner: {
    bg: 'from-gray-900/60 to-gold-900/30',
    button: 'from-gold-400/90 to-gold-500/90 hover:from-gold-400 hover:to-gold-500',
    accent: 'from-gold-400 to-gold-500',
  },
  party: {
    bg: 'from-amber-900/50 to-rose-900/30',
    button: 'from-amber-300/90 to-rose-300/90 hover:from-amber-300 hover:to-rose-300',
    accent: 'from-amber-300 to-rose-300',
  },
  breakfast: {
    bg: 'from-amber-800/40 to-cream-600/50',
    button: 'from-amber-300/90 to-cream-400/90 hover:from-amber-300 hover:to-cream-400',
    accent: 'from-amber-300 to-cream-400',
  },
} as const
