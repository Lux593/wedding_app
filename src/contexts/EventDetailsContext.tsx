import { createContext, useContext, useState, type ReactNode } from 'react'

interface EventDetailsContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const EventDetailsContext = createContext<EventDetailsContextType | undefined>(undefined)

export function EventDetailsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <EventDetailsContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </EventDetailsContext.Provider>
  )
}

export function useEventDetails() {
  const context = useContext(EventDetailsContext)
  if (context === undefined) {
    throw new Error('useEventDetails must be used within EventDetailsProvider')
  }
  return context
}
