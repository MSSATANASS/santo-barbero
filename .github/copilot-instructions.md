# GitHub Copilot Instructions - Santo Barbero

## Project Overview
PWA for a premium barbershop in Mexico City. Always respond in Spanish when generating user-facing text.

## Key Business Data
- **Location:** Roma Norte, CDMX, Mexico
- **Currency:** MXN (Mexican Pesos)
- **Hours:** Mon-Sat 10:00-20:00
- **Brand colors:** Gold #c5a47e, Dark #2a211c

## Services
- Ritual Esencial: $450 MXN
- Experiencia Santo: $650 MXN
- Tratamiento VIP: $900 MXN
- Corte Infantil: $300 MXN
- Tinte Barba: $200 MXN
- Rasurado: $250 MXN
- Cejas: $150 MXN

## Team
- Javier "El Maestro" (classic cuts)
- Marcos "El Artista" (fades, designs)
- Carlos "El Bárbaro" (beards)

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS + Framer Motion
- Google Gemini AI for chatbot
- PWA with Service Worker

## Code Conventions
- Mobile-first design (min 375px width)
- Touch targets minimum 44px
- Spanish for all UI text
- Use existing Tailwind classes from tailwind.config.cjs
- Follow patterns in components/ folder

## Important Files
- `App.tsx` - Main app with routing logic
- `components/AdminDashboard.tsx` - Admin panel for staff
- `components/LoyaltyCard.tsx` - Customer loyalty system
- `components/BookingForm.tsx` - Appointment booking
- `public/manifest.json` - PWA configuration

## Available Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run fb:post` - AI Facebook posting
- `npm run fb:schedule` - Weekly post scheduler

## localStorage Keys
- `santo_barbero_stamps` - Loyalty stamps count
- `santo_barbero_customer` - Customer data
- `santo_barbero_last_spin` - Daily wheel timestamp
- `santo_barbero_appointments` - Saved appointments
- `santo_barbero_admin_pin` - Admin PIN hash
