import { createContext, useContext, useState, ReactNode } from 'react'

interface LightboxContextType {
  selectedImageId: number | null
  setSelectedImageId: (id: number | null) => void
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  return (
    <LightboxContext.Provider value={{ selectedImageId, setSelectedImageId }}>
      {children}
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  const context = useContext(LightboxContext)
  if (context === undefined) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}
