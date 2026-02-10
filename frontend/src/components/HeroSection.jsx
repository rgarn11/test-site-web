import { motion } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = ({ onReserveClick, onMenuClick }) => {
  const scrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
          alt="Le Gros Arbre restaurant terrace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto">
        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-lg"
          data-testid="hero-rating-badge"
        >
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold text-charcoal">4,4 / 5</span>
          <span className="text-muted-foreground">— 558 avis Google</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight leading-[0.9] text-balance"
          data-testid="hero-title"
        >
          Le Gros Arbre
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 mb-4 font-light"
          data-testid="hero-subtitle"
        >
          Restaurant à Toulouse, Bassin des Filtres
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-accent text-2xl md:text-3xl text-wood-light mb-10"
        >
          Une expérience culinaire raffinée au cœur de Toulouse
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            data-testid="hero-menu-btn"
            onClick={onMenuClick || scrollToMenu}
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-charcoal rounded-full px-8 py-6 text-lg transition-all duration-300"
          >
            Voir le menu
          </Button>
          <Button
            data-testid="hero-reserve-btn"
            onClick={onReserveClick}
            className="bg-cedar hover:bg-cedar-dark text-white rounded-full px-8 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Réserver une table
          </Button>
        </motion.div>

        {/* Price indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-white/70 text-sm mt-8"
        >
          Menu moyen : 30–40 € par personne
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60"
        >
          <ChevronDown className="w-8 h-8" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
