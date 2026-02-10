# Le Gros Arbre - Restaurant Website PRD

## Original Problem Statement
Create a modern, elegant and professional website for a French restaurant named "Le Gros Arbre" located in Toulouse, featuring integrated reservation system, menu display, customer reviews, and contact information.

## Restaurant Identity
- **Name**: Le Gros Arbre
- **Type**: Bistrot moderne / Restaurant gastronomique
- **Location**: 110 Rue des Amidonniers, 31000 Toulouse (Bassin des Filtres)
- **Phone**: 07 65 87 29 34
- **Price Range**: 30-40€ per person
- **Google Rating**: 4.4/5 (558 reviews)
- **Service**: Dine-in only

## User Personas
1. **Local Toulouse Residents** - Looking for quality dining experiences
2. **Tourists** - Visiting Toulouse, searching for authentic French cuisine
3. **Special Occasion Diners** - Celebrating birthdays, anniversaries
4. **Food Enthusiasts** - Aged 25-60, appreciate refined gastronomy

## Core Requirements (Static)
- [x] Hero section with immersive restaurant photo
- [x] Google rating badge prominently displayed
- [x] Menu display with categories (Entrées, Plats, Desserts, Boissons)
- [x] Integrated reservation system with date/time selection
- [x] About section highlighting the bicentennial Cedar tree
- [x] Customer reviews display
- [x] Google Maps integration
- [x] Contact section with clickable phone
- [x] 100% responsive mobile design
- [x] French language throughout

## What's Been Implemented (February 2026)
### Backend (FastAPI)
- `/api/menu` - Returns full menu with 4 categories
- `/api/reviews` - Returns customer testimonials
- `/api/info` - Returns restaurant information
- `/api/reservations` - CRUD operations for bookings
- `/api/available-times` - Returns available time slots per date
- `/api/contact` - Contact form submission

### Frontend (React)
- **Navbar** - Sticky navigation with glassmorphism effect
- **HeroSection** - Full-screen hero with rating badge and CTAs
- **MenuSection** - Tab-based menu display with Fraunces typography
- **AboutSection** - Restaurant story with feature cards
- **ReviewsSection** - Customer testimonials carousel
- **ReservationSection** - Complete booking form with calendar
- **AccessSection** - Google Maps embed and opening hours
- **ContactSection** - Phone, Facebook, reservation CTA
- **Footer** - Complete contact info and hours

### Design System
- **Colors**: Cedar Green (#2C4C3B), Warm Wood (#C68E5D), Bone (#F9F7F2)
- **Typography**: Fraunces (headings), Manrope (body), Caveat (accent)
- **Style**: Modern Guinguette - warm, authentic, elegant

## P0 - Completed
- [x] All core pages and sections
- [x] Reservation system with MongoDB storage
- [x] Menu display with pricing
- [x] Customer reviews display
- [x] Responsive design

## P1 - Future Enhancements
- [ ] Email confirmation for reservations
- [ ] SMS reminders for bookings
- [ ] Admin dashboard for reservation management
- [ ] Photo gallery section
- [ ] Seasonal menu updates

## P2 - Nice to Have
- [ ] English language toggle
- [ ] Newsletter subscription
- [ ] Gift card purchases
- [ ] Online menu PDF download
- [ ] Integration with TheFork/TripAdvisor

## Next Tasks
1. Add email confirmation for reservations (requires email service integration)
2. Create admin panel for restaurant staff
3. Add photo gallery with lightbox
4. Implement seasonal menu management
