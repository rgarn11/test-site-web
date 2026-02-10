import { useRef } from 'react';
import "@/App.css";
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import ReservationSection from './components/ReservationSection';
import AccessSection from './components/AccessSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const reservationRef = useRef(null);

  const scrollToReservation = () => {
    const element = document.querySelector('#reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App bg-bone min-h-screen">
      <Toaster 
        position="top-center" 
        richColors 
        toastOptions={{
          style: {
            fontFamily: 'Manrope, sans-serif',
          },
        }}
      />
      <Navbar onReserveClick={scrollToReservation} />
      <main>
        <HeroSection 
          onReserveClick={scrollToReservation} 
          onMenuClick={scrollToMenu}
        />
        <MenuSection />
        <AboutSection />
        <ReviewsSection />
        <ReservationSection ref={reservationRef} />
        <AccessSection />
        <ContactSection onReserveClick={scrollToReservation} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
