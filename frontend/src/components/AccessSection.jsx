import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Car } from 'lucide-react';
import { Button } from './ui/button';

const AccessSection = () => {
  const openGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/dir/?api=1&destination=110+Rue+des+Amidonniers,+31000+Toulouse',
      '_blank'
    );
  };

  const hours = [
    { day: 'Lundi', hours: 'Fermé' },
    { day: 'Mardi', hours: '12:00 - 14:30, 19:00 - 22:00' },
    { day: 'Mercredi', hours: '12:00 - 14:30, 19:00 - 22:00' },
    { day: 'Jeudi', hours: '12:00 - 14:30, 19:00 - 22:00' },
    { day: 'Vendredi', hours: '12:00 - 14:30, 19:00 - 22:30' },
    { day: 'Samedi', hours: '12:00 - 14:30, 19:00 - 22:30' },
    { day: 'Dimanche', hours: '12:00 - 15:00' },
  ];

  return (
    <section
      id="access"
      data-testid="access-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest font-semibold text-cedar/60 mb-4 block">
            Nous Trouver
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-4 text-balance">
            Accès & Horaires
          </h2>
          <p className="text-muted-foreground text-lg">
            Au cœur du quartier des Amidonniers, face au Bassin des Filtres
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden shadow-xl h-[400px] lg:h-full min-h-[400px]">
              <iframe
                data-testid="google-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.5!2d1.4289!3d43.6114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM2JzQxLjAiTiAxwrAyNSc0NC4wIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) contrast(95%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Le Gros Arbre"
              />
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address Card */}
            <div
              data-testid="address-card"
              className="bg-bone p-6 rounded-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cedar/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-cedar" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-medium text-charcoal mb-2">
                    Adresse
                  </h3>
                  <p className="text-charcoal font-medium">
                    110 Rue des Amidonniers
                  </p>
                  <p className="text-muted-foreground">
                    31000 Toulouse
                  </p>
                  <p className="text-wood font-medium mt-2">
                    Quartier : Bassin des Filtres
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div
              data-testid="hours-card"
              className="bg-bone p-6 rounded-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cedar/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cedar" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-medium text-charcoal pt-2">
                  Horaires d'ouverture
                </h3>
              </div>
              <div className="space-y-2 ml-16">
                {hours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className={`font-medium ${item.hours === 'Fermé' ? 'text-muted-foreground' : 'text-charcoal'}`}>
                      {item.day}
                    </span>
                    <span className={item.hours === 'Fermé' ? 'text-red-500' : 'text-muted-foreground'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parking Info */}
            <div className="bg-bone p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cedar/10 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-cedar" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-medium text-charcoal mb-2">
                    Accès
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Parking gratuit à proximité. Accessible en métro (ligne A, station Compans-Caffarelli) puis 10 minutes à pied.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              data-testid="directions-btn"
              onClick={openGoogleMaps}
              className="w-full bg-cedar hover:bg-cedar-dark text-white rounded-full py-6 text-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Navigation className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Obtenir l'itinéraire
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AccessSection;
