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
    'nav.language': 'Sprache',
    'nav.lightMode': 'Hell',
    'nav.darkMode': 'Dunkel',
    
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
    'home.countdown.days': 'Tage',
    'home.countdown.hours': 'Stunden',
    'home.countdown.minutes': 'Minuten',
    'home.countdown.seconds': 'Sekunden',
    'home.countdown.started': 'Die Hochzeit hat begonnen!',
    
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
    'outfits.tag.formal': 'Formell',
    'outfits.tag.smartCasual': 'Smart Casual',
    'outfits.tag.festive': 'Festlich',
    'outfits.tag.party': 'Party',
    'outfits.tag.casual': 'Casual',
    'outfits.rec.suitJacket': 'Anzug oder Sakko',
    'outfits.rec.lightShirts': 'Helle Hemden',
    'outfits.rec.elegantFootwear': 'Eleganter Schuhwerk',
    'outfits.rec.dressOrSuit': 'Kleid oder Kostüm',
    'outfits.rec.hatsOptional': 'Hüte oder Fascinator optional',
    'outfits.rec.elegantShoes': 'Elegante Schuhe',
    'outfits.rec.jacketNoTie': 'Sakko ohne Krawatte',
    'outfits.rec.leatherSneakers': 'Leder-Sneaker',
    'outfits.rec.cocktailDress': 'Cocktail-Kleid',
    'outfits.rec.blouseSkirt': 'Elegante Bluse mit Rock',
    'outfits.rec.wedgeSandals': 'Wedge-Sandalen',
    'outfits.rec.elegantAccessories': 'Elegante Accessoires',
    'outfits.rec.darkSuit': 'Dunkler Anzug',
    'outfits.rec.tieBow': 'Krawatte oder Fliege',
    'outfits.rec.leatherShoes': 'Leder-Schuhe',
    'outfits.rec.festiveDress': 'Festliches Kleid',
    'outfits.rec.heels': 'Absätze',
    'outfits.rec.jacketOff': 'Sakko ausziehen möglich',
    'outfits.rec.comfortableShoes': 'Bequeme Schuhe',
    'outfits.rec.looseShirts': 'Lockere Hemden',
    'outfits.rec.dancingShoes': 'Bequeme Schuhe zum Tanzen',
    'outfits.rec.dressStays': 'Kleid bleibt festlich',
    'outfits.rec.changeShoes': 'Optional: Wechsel-Schuhe',
    'outfits.rec.casualJacket': 'Casual Sakko oder Pullover',
    'outfits.rec.jeansChinos': 'Jeans oder Chinos',
    'outfits.rec.casualDress': 'Casual Kleid oder Bluse mit Jeans',
    'outfits.rec.casualAccessories': 'Lässige Accessoires',
    'outfits.color.blue': 'Blau',
    'outfits.color.gray': 'Grau',
    'outfits.color.beige': 'Beige',
    'outfits.color.white': 'Weiß',
    'outfits.color.pastel': 'Pastelltöne',
    'outfits.color.goldAccent': 'Gold-Akzente',
    'outfits.color.darkBlue': 'Dunkelblau',
    'outfits.color.black': 'Schwarz',
    'outfits.color.allColors': 'Alle Farben',
    'outfits.color.festive': 'Festlich',
    'outfits.color.cream': 'Creme',
    
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
    'nav.language': 'Language',
    'nav.lightMode': 'Light',
    'nav.darkMode': 'Dark',
    
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
    'home.countdown.days': 'Days',
    'home.countdown.hours': 'Hours',
    'home.countdown.minutes': 'Minutes',
    'home.countdown.seconds': 'Seconds',
    'home.countdown.started': 'The wedding has begun!',
    
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
    'outfits.tag.formal': 'Formal',
    'outfits.tag.smartCasual': 'Smart Casual',
    'outfits.tag.festive': 'Festive',
    'outfits.tag.party': 'Party',
    'outfits.tag.casual': 'Casual',
    'outfits.rec.suitJacket': 'Suit or jacket',
    'outfits.rec.lightShirts': 'Light shirts',
    'outfits.rec.elegantFootwear': 'Elegant footwear',
    'outfits.rec.dressOrSuit': 'Dress or suit',
    'outfits.rec.hatsOptional': 'Hats or fascinator optional',
    'outfits.rec.elegantShoes': 'Elegant shoes',
    'outfits.rec.jacketNoTie': 'Jacket without tie',
    'outfits.rec.leatherSneakers': 'Leather sneakers',
    'outfits.rec.cocktailDress': 'Cocktail dress',
    'outfits.rec.blouseSkirt': 'Elegant blouse with skirt',
    'outfits.rec.wedgeSandals': 'Wedge sandals',
    'outfits.rec.elegantAccessories': 'Elegant accessories',
    'outfits.rec.darkSuit': 'Dark suit',
    'outfits.rec.tieBow': 'Tie or bow tie',
    'outfits.rec.leatherShoes': 'Leather shoes',
    'outfits.rec.festiveDress': 'Festive dress',
    'outfits.rec.heels': 'Heels',
    'outfits.rec.jacketOff': 'Jacket can be removed',
    'outfits.rec.comfortableShoes': 'Comfortable shoes',
    'outfits.rec.looseShirts': 'Loose shirts',
    'outfits.rec.dancingShoes': 'Comfortable shoes for dancing',
    'outfits.rec.dressStays': 'Dress stays festive',
    'outfits.rec.changeShoes': 'Optional: change of shoes',
    'outfits.rec.casualJacket': 'Casual jacket or sweater',
    'outfits.rec.jeansChinos': 'Jeans or chinos',
    'outfits.rec.casualDress': 'Casual dress or blouse with jeans',
    'outfits.rec.casualAccessories': 'Casual accessories',
    'outfits.color.blue': 'Blue',
    'outfits.color.gray': 'Gray',
    'outfits.color.beige': 'Beige',
    'outfits.color.white': 'White',
    'outfits.color.pastel': 'Pastels',
    'outfits.color.goldAccent': 'Gold accents',
    'outfits.color.darkBlue': 'Dark blue',
    'outfits.color.black': 'Black',
    'outfits.color.allColors': 'All colors',
    'outfits.color.festive': 'Festive',
    'outfits.color.cream': 'Cream',
    
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
    'nav.language': 'Langue',
    'nav.lightMode': 'Clair',
    'nav.darkMode': 'Sombre',
    
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
    'home.countdown.days': 'Jours',
    'home.countdown.hours': 'Heures',
    'home.countdown.minutes': 'Minutes',
    'home.countdown.seconds': 'Secondes',
    'home.countdown.started': 'Le mariage a commencé !',
    
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
    'outfits.tag.formal': 'Formel',
    'outfits.tag.smartCasual': 'Smart casual',
    'outfits.tag.festive': 'Festif',
    'outfits.tag.party': 'Party',
    'outfits.tag.casual': 'Décontracté',
    'outfits.rec.suitJacket': 'Costume ou veste',
    'outfits.rec.lightShirts': 'Chemises claires',
    'outfits.rec.elegantFootwear': 'Chaussures élégantes',
    'outfits.rec.dressOrSuit': 'Robe ou tailleur',
    'outfits.rec.hatsOptional': 'Chapeaux ou fascinator en option',
    'outfits.rec.elegantShoes': 'Chaussures élégantes',
    'outfits.rec.jacketNoTie': 'Veste sans cravate',
    'outfits.rec.leatherSneakers': 'Baskets en cuir',
    'outfits.rec.cocktailDress': 'Robe cocktail',
    'outfits.rec.blouseSkirt': 'Blouse élégante avec jupe',
    'outfits.rec.wedgeSandals': 'Sandales compensées',
    'outfits.rec.elegantAccessories': 'Accessoires élégants',
    'outfits.rec.darkSuit': 'Costume sombre',
    'outfits.rec.tieBow': 'Cravate ou nœud papillon',
    'outfits.rec.leatherShoes': 'Chaussures en cuir',
    'outfits.rec.festiveDress': 'Robe de fête',
    'outfits.rec.heels': 'Talons',
    'outfits.rec.jacketOff': 'Veste retirable',
    'outfits.rec.comfortableShoes': 'Chaussures confortables',
    'outfits.rec.looseShirts': 'Chemises décontractées',
    'outfits.rec.dancingShoes': 'Chaussures confortables pour danser',
    'outfits.rec.dressStays': 'Robe reste festive',
    'outfits.rec.changeShoes': 'Optionnel: chaussures de rechange',
    'outfits.rec.casualJacket': 'Veste ou pull décontracté',
    'outfits.rec.jeansChinos': 'Jeans ou chinos',
    'outfits.rec.casualDress': 'Robe ou blouse décontractée avec jean',
    'outfits.rec.casualAccessories': 'Accessoires décontractés',
    'outfits.color.blue': 'Bleu',
    'outfits.color.gray': 'Gris',
    'outfits.color.beige': 'Beige',
    'outfits.color.white': 'Blanc',
    'outfits.color.pastel': 'Pastels',
    'outfits.color.goldAccent': 'Accents or',
    'outfits.color.darkBlue': 'Bleu marine',
    'outfits.color.black': 'Noir',
    'outfits.color.allColors': 'Toutes les couleurs',
    'outfits.color.festive': 'Festif',
    'outfits.color.cream': 'Crème',
    
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
