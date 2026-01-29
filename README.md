# R&S Wedding App

Eine professionelle Hochzeits-App für Rahul & Simren, entwickelt mit React, TypeScript und Vite.

## Features

- 🎨 **Modernes Design** - Clean, minimalistisches Design mit Gold-Akzenten
- 🌙 **Dark Mode** - Automatischer Dark Mode mit System-Präferenz-Erkennung
- 📱 **Mobile-First** - Optimiert für Smartphone-Nutzung (90%), responsive für alle Geräte
- 🗓️ **Timeline** - Übersichtlicher Zeitplan aller Veranstaltungen
- 📍 **Locations** - Karten-Integration für alle Veranstaltungsorte
- 👔 **Outfits** - Empfehlungen für verschiedene Events
- ✉️ **RSVP** - Zusage/Absage mit Gästeanzahl
- 📸 **Photos** - Galerie für Hochzeitsfotos
- 🍔 **Hamburger-Menü** - Mobile Navigation
- 🔄 **Supabase-Ready** - Vorbereitet für Datenbank-Integration

## Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Supabase** - (Vorbereitet für Integration)

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

## Projektstruktur

```
src/
├── components/       # Wiederverwendbare Komponenten
│   └── Layout.tsx   # Haupt-Layout mit Navigation
├── contexts/         # React Contexts
│   └── ThemeContext.tsx  # Dark Mode Management
├── pages/           # Seiten-Komponenten
│   ├── Home.tsx
│   ├── Timeline.tsx
│   ├── Locations.tsx
│   ├── Outfits.tsx
│   ├── RSVP.tsx
│   └── Photos.tsx
├── lib/             # Utilities & Services
│   └── supabase.ts  # Supabase Client & Types
├── App.tsx          # Haupt-App-Komponente
├── main.tsx         # Entry Point
└── index.css        # Globale Styles
```

## Supabase Integration

Die App ist vorbereitet für Supabase-Integration. Um Supabase zu aktivieren:

1. Installiere `@supabase/supabase-js`:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Erstelle eine `.env` Datei:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Aktiviere den Code in `src/lib/supabase.ts`

4. Erstelle die folgenden Tabellen in Supabase:
   - `rsvps` - Für RSVP-Einträge
   - `photos` - Für Hochzeitsfotos
   - `timeline_events` - Für Timeline-Events
   - `locations` - Für Veranstaltungsorte

## Design

- **Farben**: Gold-Akzente (#FFBF00), Weiß, Grau-Töne
- **Schriftarten**: Inter (Sans-Serif), Playfair Display (Serif für Überschriften)
- **Breakpoints**: Mobile-First, responsive für Tablet & Desktop

## Browser Support

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)

## License

Privat - Erstellt für Rahul & Simren
