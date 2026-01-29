import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Language = 'de' | 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation keys
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    'nav.home': 'Home',
    'nav.timeline': 'Timeline',
    'nav.locations': 'Locations',
    'nav.outfits': 'Outfits',
    'nav.rsvp': 'RSVP',
    'nav.photos': 'Photos',
    
    // Home
    'home.title': 'Rahul & Simren',
    'home.wedding': 'Hochzeit',
    'home.subtitle': 'Wir freuen uns, dich an unserem besonderen Tag begrüßen zu dürfen',
    'home.discover': 'Entdecke unsere Hochzeit',
    'home.welcome': 'Willkommen',
    'home.welcomeText': 'Liebe Familie und Freunde, wir freuen uns sehr, dass du an unserem besonderen Tag dabei bist. Diese App hilft dir, alle wichtigen Informationen zu finden und unseren gemeinsamen Tag zu genießen.',
    'home.timelineDesc': 'Zeitplan der Veranstaltungen',
    'home.locationsDesc': 'Alle Veranstaltungsorte',
    'home.outfitsDesc': 'Outfit-Empfehlungen',
    'home.rsvpDesc': 'Zusage oder Absage',
    'home.photosDesc': 'Hochzeitsfotos',
    
    // Timeline
    'timeline.title': 'Timeline',
    'timeline.subheader': 'Zeitplan aller Veranstaltungen – von der Zeremonie bis zum Frühstück.',
    'timeline.ceremony': 'Zeremonie',
    'timeline.ceremonyDesc': 'Trauung im Garten',
    'timeline.cocktail': 'Cocktail Hour',
    'timeline.cocktailDesc': 'Champagner & Canapés',
    'timeline.photos': 'Hochzeitsfotos',
    'timeline.photosDesc': 'Fotoshooting mit dem Brautpaar',
    'timeline.gifts': 'Hochzeitsgeschenke',
    'timeline.giftsDesc': 'Geschenkübergabe',
    'timeline.dinner': 'Hochzeitsessen',
    'timeline.dinnerDesc': 'Fünf-Gänge-Menü',
    'timeline.party': 'Tanz & Feier',
    'timeline.partyDesc': 'Party bis in die Nacht',
    'timeline.breakfast': 'Hochzeits-Frühstück',
    'timeline.breakfastDesc': 'Gemeinsames Frühstück zum Ausklang',
    'timeline.more': 'Mehr',
    'timeline.date.nov27': '27. November 2026',
    'timeline.date.nov28': '28. November 2026',
    'timeline.date.nov29': '29. November 2026',
    'timeline.details.location': 'Location',
    'timeline.details.outfits': 'Outfit-Empfehlungen',
    'timeline.details.dj': 'DJ',
    'timeline.details.drinks': 'Getränke',
    'timeline.details.food': 'Essen',
    'timeline.details.expectations': 'Was dich erwartet',
    
    // Locations
    'locations.title': 'Locations',
    'locations.subheader': 'Alle Veranstaltungsorte mit Adressen und Karten – so findest du uns.',
    'locations.ceremony': 'Trauungszeremonie',
    'locations.reception': 'Hochzeitsfeier',
    'locations.breakfast': 'Frühstücksrestaurant',
    'locations.directions': 'Route anzeigen',
    
    // Outfits
    'outfits.title': 'Outfit-Empfehlungen',
    'outfits.subheader': 'Was anziehen? Hier findest du Stil-Tipps für jedes Event.',
    'outfits.men': 'Für Herren',
    'outfits.women': 'Für Damen',
    'outfits.colors': 'Empfohlene Farben',
    'outfits.formal': 'Formelle Kleidung für die Zeremonie',
    'outfits.smartCasual': 'Smart Casual für den Empfang',
    'outfits.festive': 'Festliche Kleidung für das Abendessen',
    'outfits.comfortable': 'Komfortable Kleidung zum Tanzen',
    'outfits.casual': 'Lässige Kleidung für das Frühstück',
    
    // RSVP
    'rsvp.title': 'RSVP',
    'rsvp.subheader': 'Gib uns bitte Bescheid, ob du dabei bist – und ob du Allergien oder Wünsche hast.',
    'rsvp.attending': 'Wirst du teilnehmen?',
    'rsvp.yes': 'Ja, ich komme',
    'rsvp.no': 'Nein, ich kann nicht',
    'rsvp.name': 'Name',
    'rsvp.namePlaceholder': 'Dein vollständiger Name',
    'rsvp.email': 'E-Mail-Adresse',
    'rsvp.emailPlaceholder': 'deine.email@beispiel.com',
    'rsvp.guests': 'Anzahl der Gäste',
    'rsvp.guestsDesc': 'Bitte gib die Gesamtzahl der Personen an (einschließlich dir)',
    'rsvp.allergies': 'Allergien',
    'rsvp.hasAllergies': 'Hast du oder einer deiner Gäste Allergien?',
    'rsvp.allergiesDetails': 'Bitte beschreibe die Allergien',
    'rsvp.allergiesPlaceholder': 'z.B. Nüsse, Gluten, Laktose...',
    'rsvp.message': 'Nachricht (optional)',
    'rsvp.messagePlaceholder': 'Hinterlasse uns eine Nachricht...',
    'rsvp.submit': 'Absenden',
    'rsvp.submitting': 'Wird gesendet...',
    'rsvp.thankYou': 'Vielen Dank!',
    'rsvp.success': 'Deine Antwort wurde erfolgreich übermittelt. Wir freuen uns auf dich!',
    
    // Photos
    'photos.title': 'Photos',
    'photos.subheader': 'Hochzeitsmomente zum Anschauen und später eigene Fotos hochladen.',
    'photos.moreComing': 'Weitere Fotos werden nach der Hochzeit hinzugefügt.',
    'photos.upload': 'Fotos hochladen',
    'photos.uploadNotAvailable': 'Diese Funktion ist noch nicht aktiviert.',
    
    // Footer
    'footer.text': 'Mit Liebe von Rahul & Simren',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.timeline': 'Timeline',
    'nav.locations': 'Locations',
    'nav.outfits': 'Outfits',
    'nav.rsvp': 'RSVP',
    'nav.photos': 'Photos',
    
    // Home
    'home.title': 'Rahul & Simren',
    'home.wedding': 'Wedding',
    'home.subtitle': 'We are delighted to welcome you on our special day',
    'home.discover': 'Discover our wedding',
    'home.welcome': 'Welcome',
    'home.welcomeText': 'Dear family and friends, we are so happy that you will be with us on our special day. This app helps you find all the important information and enjoy our shared day together.',
    'home.timelineDesc': 'Schedule of events',
    'home.locationsDesc': 'All venues',
    'home.outfitsDesc': 'Outfit recommendations',
    'home.rsvpDesc': 'RSVP',
    'home.photosDesc': 'Wedding photos',
    
    // Timeline
    'timeline.title': 'Timeline',
    'timeline.subheader': 'Schedule of all events – from the ceremony to breakfast.',
    'timeline.ceremony': 'Ceremony',
    'timeline.ceremonyDesc': 'Wedding in the garden',
    'timeline.cocktail': 'Cocktail Hour',
    'timeline.cocktailDesc': 'Champagne & Canapés',
    'timeline.photos': 'Wedding Photos',
    'timeline.photosDesc': 'Photo shoot with the couple',
    'timeline.gifts': 'Wedding Gifts',
    'timeline.giftsDesc': 'Gift presentation',
    'timeline.dinner': 'Wedding Dinner',
    'timeline.dinnerDesc': 'Five-course menu',
    'timeline.party': 'Dance & Celebration',
    'timeline.partyDesc': 'Party until the night',
    'timeline.breakfast': 'Wedding Breakfast',
    'timeline.breakfastDesc': 'Joint breakfast to wind down',
    'timeline.more': 'More',
    'timeline.date.nov27': 'November 27, 2026',
    'timeline.date.nov28': 'November 28, 2026',
    'timeline.date.nov29': 'November 29, 2026',
    'timeline.details.location': 'Location',
    'timeline.details.outfits': 'Outfit Recommendations',
    'timeline.details.dj': 'DJ',
    'timeline.details.drinks': 'Drinks',
    'timeline.details.food': 'Food',
    'timeline.details.expectations': 'What to Expect',
    
    // Locations
    'locations.title': 'Locations',
    'locations.subheader': 'All venues with addresses and maps – find your way to us.',
    'locations.ceremony': 'Wedding Ceremony',
    'locations.reception': 'Wedding Reception',
    'locations.breakfast': 'Breakfast Restaurant',
    'locations.directions': 'Get directions',
    
    // Outfits
    'outfits.title': 'Outfit Recommendations',
    'outfits.subheader': 'What to wear? Style tips for every event.',
    'outfits.men': 'For Gentlemen',
    'outfits.women': 'For Ladies',
    'outfits.colors': 'Recommended Colors',
    'outfits.formal': 'Formal attire for the ceremony',
    'outfits.smartCasual': 'Smart casual for the reception',
    'outfits.festive': 'Festive attire for dinner',
    'outfits.comfortable': 'Comfortable clothing for dancing',
    'outfits.casual': 'Casual clothing for breakfast',
    
    // RSVP
    'rsvp.title': 'RSVP',
    'rsvp.subheader': 'Please let us know if you can join – and any allergies or special requests.',
    'rsvp.attending': 'Will you be attending?',
    'rsvp.yes': 'Yes, I will attend',
    'rsvp.no': 'No, I cannot attend',
    'rsvp.name': 'Name',
    'rsvp.namePlaceholder': 'Your full name',
    'rsvp.email': 'Email Address',
    'rsvp.emailPlaceholder': 'your.email@example.com',
    'rsvp.guests': 'Number of Guests',
    'rsvp.guestsDesc': 'Please enter the total number of people (including yourself)',
    'rsvp.allergies': 'Allergies',
    'rsvp.hasAllergies': 'Do you or any of your guests have allergies?',
    'rsvp.allergiesDetails': 'Please describe the allergies',
    'rsvp.allergiesPlaceholder': 'e.g. Nuts, Gluten, Lactose...',
    'rsvp.message': 'Message (optional)',
    'rsvp.messagePlaceholder': 'Leave us a message...',
    'rsvp.submit': 'Submit',
    'rsvp.submitting': 'Sending...',
    'rsvp.thankYou': 'Thank You!',
    'rsvp.success': 'Your response has been successfully submitted. We look forward to seeing you!',
    
    // Photos
    'photos.title': 'Photos',
    'photos.subheader': 'Wedding moments to browse – and upload your own photos later.',
    'photos.moreComing': 'More photos will be added after the wedding.',
    'photos.upload': 'Upload Photos',
    'photos.uploadNotAvailable': 'This feature is not yet activated.',
    
    // Footer
    'footer.text': 'With love from Rahul & Simren',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.timeline': 'Programme',
    'nav.locations': 'Lieux',
    'nav.outfits': 'Tenues',
    'nav.rsvp': 'RSVP',
    'nav.photos': 'Photos',
    
    // Home
    'home.title': 'Rahul & Simren',
    'home.wedding': 'Mariage',
    'home.subtitle': 'Nous sommes ravis de vous accueillir en ce jour spécial',
    'home.discover': 'Découvrez notre mariage',
    'home.welcome': 'Bienvenue',
    'home.welcomeText': 'Chers famille et amis, nous sommes si heureux que vous soyez avec nous en ce jour spécial. Cette application vous aide à trouver toutes les informations importantes et à profiter de notre journée ensemble.',
    'home.timelineDesc': 'Calendrier des événements',
    'home.locationsDesc': 'Tous les lieux',
    'home.outfitsDesc': 'Recommandations de tenue',
    'home.rsvpDesc': 'RSVP',
    'home.photosDesc': 'Photos de mariage',
    
    // Timeline
    'timeline.title': 'Programme',
    'timeline.subheader': 'Calendrier de tous les événements – de la cérémonie au petit-déjeuner.',
    'timeline.ceremony': 'Cérémonie',
    'timeline.ceremonyDesc': 'Mariage dans le jardin',
    'timeline.cocktail': 'Cocktail',
    'timeline.cocktailDesc': 'Champagne & Canapés',
    'timeline.photos': 'Photos de mariage',
    'timeline.photosDesc': 'Séance photo avec le couple',
    'timeline.gifts': 'Cadeaux de mariage',
    'timeline.giftsDesc': 'Remise des cadeaux',
    'timeline.dinner': 'Dîner de mariage',
    'timeline.dinnerDesc': 'Menu cinq services',
    'timeline.party': 'Danse & Célébration',
    'timeline.partyDesc': 'Fête jusqu\'à la nuit',
    'timeline.breakfast': 'Petit-déjeuner de mariage',
    'timeline.breakfastDesc': 'Petit-déjeuner commun pour conclure',
    'timeline.more': 'Plus',
    'timeline.date.nov27': '27 novembre 2026',
    'timeline.date.nov28': '28 novembre 2026',
    'timeline.date.nov29': '29 novembre 2026',
    'timeline.details.location': 'Lieu',
    'timeline.details.outfits': 'Recommandations de tenue',
    'timeline.details.dj': 'DJ',
    'timeline.details.drinks': 'Boissons',
    'timeline.details.food': 'Nourriture',
    'timeline.details.expectations': 'À quoi s\'attendre',
    
    // Locations
    'locations.title': 'Lieux',
    'locations.subheader': 'Tous les lieux avec adresses et plans – pour nous retrouver.',
    'locations.ceremony': 'Cérémonie de mariage',
    'locations.reception': 'Réception de mariage',
    'locations.breakfast': 'Restaurant petit-déjeuner',
    'locations.directions': 'Obtenir l\'itinéraire',
    
    // Outfits
    'outfits.title': 'Recommandations de tenue',
    'outfits.subheader': 'Quoi porter? Conseils de style pour chaque moment.',
    'outfits.men': 'Pour les hommes',
    'outfits.women': 'Pour les femmes',
    'outfits.colors': 'Couleurs recommandées',
    'outfits.formal': 'Tenue formelle pour la cérémonie',
    'outfits.smartCasual': 'Smart casual pour la réception',
    'outfits.festive': 'Tenue festive pour le dîner',
    'outfits.comfortable': 'Vêtements confortables pour danser',
    'outfits.casual': 'Tenue décontractée pour le petit-déjeuner',
    
    // RSVP
    'rsvp.title': 'RSVP',
    'rsvp.subheader': 'Dites-nous si vous serez des nôtres – et allergies ou souhaits particuliers.',
    'rsvp.attending': 'Serez-vous présent?',
    'rsvp.yes': 'Oui, je serai présent',
    'rsvp.no': 'Non, je ne peux pas',
    'rsvp.name': 'Nom',
    'rsvp.namePlaceholder': 'Votre nom complet',
    'rsvp.email': 'Adresse e-mail',
    'rsvp.emailPlaceholder': 'votre.email@exemple.com',
    'rsvp.guests': 'Nombre d\'invités',
    'rsvp.guestsDesc': 'Veuillez indiquer le nombre total de personnes (y compris vous)',
    'rsvp.allergies': 'Allergies',
    'rsvp.hasAllergies': 'Avez-vous ou l\'un de vos invités des allergies?',
    'rsvp.allergiesDetails': 'Veuillez décrire les allergies',
    'rsvp.allergiesPlaceholder': 'p. ex. Noix, Gluten, Lactose...',
    'rsvp.message': 'Message (optionnel)',
    'rsvp.messagePlaceholder': 'Laissez-nous un message...',
    'rsvp.submit': 'Envoyer',
    'rsvp.submitting': 'Envoi en cours...',
    'rsvp.thankYou': 'Merci!',
    'rsvp.success': 'Votre réponse a été envoyée avec succès. Nous avons hâte de vous voir!',
    
    // Photos
    'photos.title': 'Photos',
    'photos.subheader': 'Moments du mariage à parcourir – et téléchargez vos photos plus tard.',
    'photos.moreComing': 'Plus de photos seront ajoutées après le mariage.',
    'photos.upload': 'Télécharger des photos',
    'photos.uploadNotAvailable': 'Cette fonctionnalité n\'est pas encore activée.',
    
    // Footer
    'footer.text': 'Avec amour de Rahul & Simren',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && ['de', 'en', 'fr'].includes(saved)) return saved
    
    // Detect browser language
    const browserLang = navigator.language.split('-')[0]
    if (browserLang === 'de' || browserLang === 'en' || browserLang === 'fr') {
      return browserLang as Language
    }
    return 'de'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
