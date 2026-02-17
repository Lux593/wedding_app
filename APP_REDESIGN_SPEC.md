# Wedding App Redesign Spezifikation (Funktionsgleichheit erzwingen)

## Ziel dieses Dokuments

Dieses Dokument beschreibt die bestehende Wedding-App vollständig (Architektur, Datenmodelle, Seitenlogik, UI-Zustände, Interaktionen, Edge Cases, technische Rahmenbedingungen), damit eine KI die App in einem **komplett neuen Design** neu implementieren kann, aber **alle Funktionen und Abläufe** beibehält.

Kernanforderung:

- Neues visuelles Design ist erlaubt/gewünscht.
- Funktionale Parität ist zwingend.
- **Wichtig:** Informationsarchitektur, UI-Struktur, Navigationsmuster, Animationsverhalten und Interaktionsdesign dürfen vollständig neu gedacht werden.
- Verpflichtend ist nur, dass die fachlichen Funktionen und Datenanforderungen erhalten bleiben.

---

## 1) Produktüberblick

Die App ist eine mobile-first Wedding-Begleit-App für Gäste mit folgenden Kernmodulen:

- Startseite mit Countdown
- Event-Timeline (inkl. Detail-Modal)
- Locations mit Maps und Routenlinks
- Outfit-Empfehlungen (nach Datum + Geschlecht, inkl. Detail-Modal)
- Tipps/Empfehlungen für Zürich
- RSVP-Formular
- Fotogalerie mit Lightbox
- Global: Mehrsprachigkeit (DE/EN/FR), Dark Mode, responsive Navigation

Technischer Stack:

- React 18 + TypeScript + Vite
- Tailwind CSS
- Framer Motion
- React Router
- Phosphor Icons
- Supabase nur vorbereitet (nicht produktiv integriert)

---

## 2) Harte Vorgaben (nur Funktion, kein UI-Zwang)

Diese Punkte müssen bei einem Redesign erhalten bleiben:

1. Alle fachlichen Features bleiben erhalten (Home, Timeline, Locations, Outfits, Tips, RSVP, Photos).
2. Alle notwendigen Datenfelder und Datenabhängigkeiten bleiben erhalten.
3. Mehrsprachigkeit DE/EN/FR bleibt inkl. Persistenz.
4. Dark/Light Mode bleibt inkl. Persistenz.
5. RSVP-Formlogik bleibt erhalten (inkl. bedingter Felder und Validierungen).
6. Foto-Galerie bleibt mit Lightbox-Navigation (inkl. Prev/Next/Escape).
7. Event-/Outfit-Detailinformationen bleiben vollständig zugänglich.
8. Routing bleibt funktionsfähig (alle Seiten erreichbar).

Explizit **nicht** vorgeschrieben:

- keine Pflicht zur Beibehaltung von Timeline-, Accordion-, Tab-, Sidebar- oder Modal-Designmustern
- kein Pflicht-Layout, keine Pflicht-Komponentenstruktur
- kein Pflicht-Animationsverhalten
- kein Pflicht-Navigationsverhalten (solange alle Funktionen erreichbar und nutzbar bleiben)

---

## 3) Routing & App-Shell

Datei: `src/App.tsx`

## Routen

- `/` -> Home
- `/timeline` -> Timeline
- `/locations` -> Locations
- `/outfits` -> Outfits
- `/tips` -> Tips
- `/rsvp` -> RSVP
- `/photos` -> Photos

## App-Wrapper-Reihenfolge

- `ThemeProvider`
- `LanguageProvider`
- `EventDetailsProvider`
- `Router`
- `Layout`
- `AppRoutes`

## Globales Verhalten

- `ScrollToTop` setzt bei jeder Route `window.scrollTo(0,0)`.

---

## 4) Globale State-Container (Contexts)

## 4.1 ThemeContext

Datei: `src/contexts/ThemeContext.tsx`

- State: `theme: 'light' | 'dark'`
- Init:
  - `localStorage.theme`, sonst `prefers-color-scheme`
- Side effect:
  - toggelt `document.documentElement.classList` mit `dark`
  - persisted in `localStorage`
- API:
  - `theme`
  - `toggleTheme()`

## 4.2 LanguageContext

Datei: `src/contexts/LanguageContext.tsx`

- Unterstützte Sprachen: `de`, `en`, `fr`
- Translation-Map enthält umfangreiche Keys für alle Seiten.
- Init:
  - `localStorage.language`, sonst Browser-Sprache (de/en/fr), fallback de
- API:
  - `language`
  - `setLanguage(lang)`
  - `t(key)` (Fallback: key selbst)

Wichtig:

- Einige Seiten nutzen korrekt `t(...)`, `Tips.tsx` nutzt derzeit teils harte deutsche Texte.
- Bei Redesign ggf. vollständige i18n-Harmonisierung einplanen, ohne Features zu entfernen.

## 4.3 EventDetailsContext

Datei: `src/contexts/EventDetailsContext.tsx`

- State: `isOpen`
- Wird primär von Timeline genutzt, um global zu signalisieren, dass Event-Detail-Overlay offen ist.
- Layout blendet Footer aus, wenn `isOpen === true`.

## 4.4 LightboxContext

Datei: `src/contexts/LightboxContext.tsx`

- Vorhanden, aber aktuell nicht aktiv in Seiten eingebunden.
- State: `selectedImageId`.
- Bei Redesign kann aktiv genutzt werden, aber keine bestehende Funktion entfernen.

---

## 5) Layout, Navigation, Overlays

Datei: `src/components/Layout.tsx`

## Header

- Sticky/fixed Kopfbereich in Desktop+Mobile.
- Desktop:
  - Hauptnavigation als horizontale Links
  - Sprachumschalter (Dropdown mit Flaggen)
  - Theme-Toggle
- Mobile:
  - Hamburger-Menü
  - Sidebar mit Navigation
  - Sprache + Theme im Sidebar-Footer

## Overlay-/Menu-Logik

- `isMenuOpen` und `isLangMenuOpen` sind gegenseitig exklusiv (`openMenu`/`openLangMenu`).
- Wenn Sidebar offen:
  - `document.body.overflow = hidden`
  - Main Content wird geblurrt/interaction-restricted (mobile)
- Bei Route-Wechsel:
  - Sidebar + Sprachmenü werden geschlossen.

## Main Container

- Vollbildlayout (`h-screen`, `flex`, `overflow-hidden`)
- Scroll findet im Main-Container statt (`overflow-y-auto`), nicht im gesamten Body.
- Seitenwechsel animiert via `AnimatedPage` + `AnimatePresence`.

## Footer

- Standard sichtbar.
- Versteckt, wenn Timeline-Eventdetail offen (`EventDetailsContext.isOpen`).

---

## 6) Animationssystem

## 6.1 Page Transition

Datei: `src/components/AnimatedPage.tsx`

- Framer Motion:
  - enter: opacity + y
  - exit: opacity + y
- `initial={false}` zur Vermeidung leerer Initial-Frames beim ersten Render.

## 6.2 Utility-Komponenten

- `StaggerContainer` + `StaggerItem`: gestaffelte Reveal-Animation.
- `AnimatedCard`: einfache Card-Entry + optional hover-lift.

## 6.3 CSS-Animationen

Datei: `src/index.css`

- mobile menu fade/slide
- mehrere utility keyframes
- RSVP-spezifische Herz-Animationssequenzen
- custom scrollbar

---

## 7) Design-Tokens & visuelle Sprache

## 7.1 Tailwind-Konfiguration

Datei: `tailwind.config.js`

- `darkMode: 'class'`
- Erweiterte Farbpaletten:
  - `gold.*`
  - `cream.*`
  - `ivory.*`
- Font families:
  - sans: Inter
  - serif: Playfair Display

## 7.2 Domänenspezifische Tokens

Datei: `src/lib/colors.ts`

- `OUTFIT_COLORS`:
  - Farbsets je Outfit-Typ: formal, smartCasual, festive, party, casual
- `EVENT_GRADIENTS`:
  - Event-spezifische Overlay-/Button-/Accent-Gradients (ceremony, cocktail, photos, dinner, party, breakfast)

---

## 8) Seiten-Spezifikation (funktional vollständig)

## 8.1 Home (`src/pages/Home.tsx`)

### Funktionen

1. Countdown bis Hochzeitstermin (`27.11.2026 09:00`).
2. Countdown aktualisiert sekündlich.
3. Wenn Ziel erreicht: Status-Text statt Zahlen.
4. Hero/Welcome-Sektion mit Hintergrundbild und Text.
5. Quicklink-Kacheln zu den Hauptseiten:
   - Timeline, Locations, Outfits, RSVP, Photos
6. Mehrsprachige Texte via `t(...)`.
7. Stagger-Animation für Link-Kacheln.

### Datenlogik

- `WEDDING_DATE` konstant.
- Hook `useCountdown` mit `setInterval`.

---

## 8.2 Timeline (`src/pages/Timeline.tsx`)

### Hauptfunktionen

1. Events sind statisch im Code definiert (`events[]`) inkl.:
   - Datum, Uhrzeit, Titel, Beschreibung, Icon
   - Bild, Farbgradienten
   - Detaildaten: Location, Outfits, DJ, Drinks, Food, Expectations
2. Events werden nach Datum gruppiert.
3. Datumskacheln funktionieren als Accordion (auf/zu pro Datum).
4. Karten zeigen Event-Infos + "More"-Button.
5. Klick auf Event öffnet Detail-Modal (Full Overlay, Portal).
6. Detail-Modal zeigt sections (falls vorhanden):
   - Location inkl. optional embedded Google Map iframe
   - Outfit-Empfehlungen (Männer/Frauen, Farben)
   - DJ
   - Drinks
   - Food
   - Expectations
7. Bei offenem Detail setzt Seite `EventDetailsContext.isOpen = true` (Footer-Visibility-Steuerung).

### Redesign-Pflicht

- Diese Detailtiefe und Datenfelder müssen erhalten bleiben.
- Nicht vorhandene Sections dürfen weiterhin konditional ausblenden.
- Die visuelle und interaktive Darstellung dieser Details ist frei.

---

## 8.3 Locations (`src/pages/Locations.tsx`)

### Hauptfunktionen

1. Statische Liste von 3 Locations (pro Hochzeitstag).
2. Gruppierung nach Datum.
3. Datumskacheln als Accordion.
4. Pro Location-Karte:
   - Titel, Adresse, Stadt/PLZ/Land
   - Embedded Google Map iframe (wenn `mapUrl` vorhanden)
   - Externer Google Maps Routenlink (`locations.directions`)
5. Timeline-ähnliche vertikale Linien-/Knotenoptik.

---

## 8.4 Outfits (`src/pages/Outfits.tsx`)

### Hauptfunktionen

1. Zwei Tabs:
   - Herren
   - Damen
2. Outfit-Daten statisch, nach Datum/Event:
   - Event-Key, Zeitfenster, Beschreibung
   - Empfehlungen getrennt für men/women
   - Farbswatches
   - Bilder men/women
3. Fehlerbehandlung bei Bild-Laden:
   - `failedImages` Set
   - visuelles Fallback (CoatHangerIcon), wenn Bild fehlschlägt
4. Datumsauswahl in Timeline-Orientierung:
   - Datumsknoten anklickbar
   - aktiver Tag hebt sich hervor
5. **Wichtige aktuelle UX-Anforderung**:
   - Outfit-Karten erscheinen zwischen Datumsknoten des gewählten Tages (nicht separat unten).
6. Klick auf Outfit-Karte öffnet Detail-Modal (Portal).
7. Detail-Modal Inhalte:
   - großes Headerbild
   - Eventtitel, Zeit, Subtext
   - Empfehlungsliste (tababhängig men/women)
   - Farbchips

### Hinweise für Rebuild

- Datumsauswahl + Zuordnung muss klar erkennbar sein.
- Die Darstellung darf vollständig neu sein (kein Timeline-Zwang).
- Funktionsziel bleibt:
  - Datum wählen
  - zugehörige Outfits laden
  - Detailansicht beibehalten

---

## 8.5 Tips (`src/pages/Tips.tsx`)

### Hauptfunktionen

1. Kategorien:
   - restaurant
   - activity
   - sightseeing
2. Kategorien als Accordion-Kacheln (Timeline-artig).
3. Je Kategorie mehrere Tipp-Karten mit:
   - Name, Beschreibung, Location
   - optional Adresse
   - optional Dauer
   - optional Website-Link
   - optional Bild
4. Keine externe API, alles statisch im File.

### Wichtig

- Derzeit sind einige Texte hart codiert (Deutsch) und nicht aus `LanguageContext`.
- Funktionalität bleibt trotzdem: Kategorien öffnen/schließen und Details anzeigen.

---

## 8.6 RSVP (`src/pages/RSVP.tsx`)

### Hauptfunktionen

1. Formularfelder:
   - attending (yes/no, Pflicht)
   - name (Pflicht)
   - email (Pflicht)
   - numberOfGuests (nur wenn attending=yes)
   - guestNames[] (nur wenn numberOfGuests > 1, alle Pflicht)
   - hasAllergies (Checkbox)
   - allergies (Pflicht, wenn hasAllergies=true)
   - message (optional)
2. Submit-Flow:
   - simulated async (1 Sekunde)
   - `console.log` mit Formdaten
   - Success-State
3. Success als Fullscreen-Portal-Modal mit animiertem Herz.
4. Nach ~3 Sekunden:
   - Formular wird zurückgesetzt
   - Success-State wird geschlossen

### Datenpersistenz

- Keine echte DB-Submission aktuell.
- Supabase-Hooks nur vorbereitet.

---

## 8.7 Photos (`src/pages/Photos.tsx`)

### Hauptfunktionen

1. Statische Galerie (`weddingPhotos`) als Grid.
2. Upload-Button vorhanden, derzeit Stub:
   - zeigt `alert` ("noch nicht aktiviert")
3. Lightbox-Modal via Portal:
   - ausgewähltes Bild groß
   - Close-Button
   - Prev/Next Buttons
   - Keyboard:
     - Left/Right navigieren
     - Escape schließen
4. Beim Öffnen Lightbox:
   - `document.body.overflow = hidden`
5. Info-Banner am Ende: "More photos coming"

---

## 9) Datenmodelle (kanonische Strukturen)

## 9.1 TimelineEvent (Timeline-Seite)

- date: `'nov27' | 'nov28' | 'nov29'`
- time: string
- titleKey / descKey: i18n key
- icon: React component
- imageUrl
- bgColor / buttonColor / accentColor
- details:
  - location?
  - outfits?
  - dj?
  - drinks?
  - food?
  - expectations?

## 9.2 Location (Locations-Seite)

- date
- nameKey
- address, city, postalCode, country
- mapUrl?

## 9.3 OutfitSuggestion (Outfits-Seite)

- date
- eventKey
- time
- descKey
- recommendations: men[] + women[]
- colors[]
- tagKey (aktuell visuell meist entfernt, aber Datenfeld vorhanden)
- menOutfitImage / womenOutfitImage

## 9.4 Tip

- category
- name
- description
- location
- address?
- duration?
- website?
- imageUrl?

## 9.5 RSVPFormData

- attending
- name
- email
- numberOfGuests
- guestNames[]
- hasAllergies
- allergies
- message

---

## 10) Externe Abhängigkeiten & Integrationsstatus

Aktiv:

- `react`, `react-dom`, `react-router-dom`
- `framer-motion`
- `@phosphor-icons/react`
- `tailwindcss`, `clsx`, `tailwind-merge`

Nicht aktiv, aber vorbereitet:

- Supabase (`src/lib/supabase.ts`) mit Typen und Stub-Hooks:
  - `useRSVP().submitRSVP`
  - `usePhotos().getPhotos`

---

## 11) Technische Nebenbedingungen

- TS strict mode aktiv.
- Path alias: `@/* -> src/*`.
- SPA-Rewrite via `vercel.json`.
- Build: Vite.
- Lint: ESLint + TS + React hooks.

---

## 12) Bekannte Besonderheiten / Stolperfallen

1. Outfits-Seite ist aktiv in Umbau (Timeline-Selection + inline Karten).
2. Tips nutzt teilweise harte Texte statt LanguageContext.
3. RSVP und Photos sind funktional vorhanden, aber Backend-los.
4. Mehrere Seiten nutzen ähnliche Timeline/Accordion-Muster; Redesign sollte einheitliches Komponentenmuster einführen, ohne Verhalten zu verlieren.
5. Einige Google Maps URLs sind Platzhalter-artig; Funktion (Embed + Directions Link) muss trotzdem bleiben.

---

## 13) Redesign-Briefing für KI (direkt verwendbar)

Nutze diesen Abschnitt als Prompt-Basis:

1. Baue die App komplett neu – **ohne visuelle oder interaktive Bindung an das aktuelle UI**.
2. Du darfst Navigationskonzept, Seitenstruktur, Komponenten, Animationen und Flows vollständig neu entwerfen.
3. Behalte ausschließlich die fachliche Funktionsgleichheit bei:
   - alle Features bleiben nutzbar
   - alle relevanten Datenfelder bleiben vorhanden
   - alle Kernabläufe bleiben möglich (z. B. RSVP ausfüllen, Eventdetails öffnen, Bilder in Lightbox navigieren)
4. Inhalte und Daten dürfen nicht verloren gehen; Darstellung und Verhalten sind frei.
5. Erstelle ein konsistentes neues Designsystem (Farben, Typografie, Spacing, Motion) von Grund auf.
6. Mobile-first bleibt empfohlen, aber konkrete UX-Patterns sind frei.
7. Stelle sicher, dass keine Funktion regressiert.

---

## 14) Funktionale Abnahme-Checkliste (MUSS erfüllt sein)

- [ ] Alle 7 Routen funktionieren.
- [ ] Sprache (DE/EN/FR) ist umschaltbar und persistent.
- [ ] Dark/Light Toggle funktioniert und bleibt persistent.
- [ ] Mobile Sidebar inkl. Overlay funktioniert.
- [ ] Home-Countdown läuft korrekt.
- [ ] Timeline-Daten nach Datum gruppiert, Eventdetail-Modal vollständig.
- [ ] Locations mit Karten + Directions Links funktionieren.
- [ ] Outfits nach Datum/Tab korrekt, Detail-Modal vollständig.
- [ ] Tips-Kategorien auf-/zuklappbar, Kartendetails sichtbar.
- [ ] RSVP-Bedingungslogik vollständig inkl. Success-Flow.
- [ ] Photos-Lightbox inkl. Keyboard/Prev/Next/Escape funktioniert.
- [ ] Scroll-/Overflow-Verhalten bei Overlays ist korrekt.

---

## 15) Empfohlene Refactor-Ziele (optional, aber sinnvoll)

Diese Punkte verbessern Qualität, ohne bestehende Funktionen zu verlieren:

1. Gemeinsame Timeline/Accordion-Komponente für Timeline/Locations/Tips/Outfits.
2. Einheitliche Modal-Basis-Komponente (Portal, Overlay, Close, Animation).
3. Vollständige i18n-Abdeckung für `Tips.tsx`.
4. Supabase-Integration produktiv anschließen:
   - RSVP Persistenz
   - Foto-Upload + Foto-Liste
5. Daten aus statischen Files in konfigurierbare Content-Layer auslagern.

---

## 16) Datei-Referenz (wichtige Kernfiles)

- Routing/App: `src/App.tsx`
- Einstieg: `src/main.tsx`
- Layout/Nav: `src/components/Layout.tsx`
- Theme: `src/contexts/ThemeContext.tsx`
- Sprache: `src/contexts/LanguageContext.tsx`
- Event-Modal-Signal: `src/contexts/EventDetailsContext.tsx`
- Seiten:
  - `src/pages/Home.tsx`
  - `src/pages/Timeline.tsx`
  - `src/pages/Locations.tsx`
  - `src/pages/Outfits.tsx`
  - `src/pages/Tips.tsx`
  - `src/pages/RSVP.tsx`
  - `src/pages/Photos.tsx`
- Tokens/Utils:
  - `src/lib/colors.ts`
  - `src/lib/outfitRecIcons.tsx`
  - `src/lib/utils.ts`
  - `src/lib/supabase.ts`
- Styles:
  - `src/index.css`
  - `tailwind.config.js`

