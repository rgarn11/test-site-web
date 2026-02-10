import { motion } from 'framer-motion';
import { Phone, Facebook, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const ContactSection = ({ onReserveClick }) => {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-20 md:py-32 bg-cedar text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-sm uppercase tracking-widest font-semibold text-white/60 mb-4 block">
              Contact
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-white mb-6 text-balance">
              Contactez-nous
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Une question ? Une demande particulière ? N'hésitez pas à nous contacter. 
              Notre équipe se fera un plaisir de vous répondre.
            </p>

            {/* Contact Options */}
            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:0765872934"
                data-testid="contact-phone"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Phone className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Téléphone</p>
                  <p className="text-white font-medium text-lg">07 65 87 29 34</p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-facebook"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Facebook className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Facebook</p>
                  <p className="text-white font-medium text-lg">Le Gros Arbre</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Content - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl"
          >
            <h3 className="font-heading text-3xl font-light text-white mb-4 text-balance">
              Réservez votre table
            </h3>
            <p className="text-white/80 mb-8">
              Pour garantir votre place dans notre restaurant, nous vous recommandons 
              de réserver à l'avance, particulièrement le week-end.
            </p>

            <div className="space-y-4">
              <Button
                data-testid="contact-reserve-btn"
                onClick={onReserveClick}
                className="w-full bg-white text-cedar hover:bg-white/90 rounded-full py-6 text-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 mr-2" strokeWidth={1.5} />
                Réserver en ligne
              </Button>

              <a
                href="tel:0765872934"
                className="block"
              >
                <Button
                  data-testid="contact-call-btn"
                  variant="outline"
                  className="w-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-cedar rounded-full py-6 text-lg transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" strokeWidth={1.5} />
                  Appeler le restaurant
                </Button>
              </a>
            </div>

            {/* Service Note */}
            <p className="text-white/60 text-sm mt-6 text-center">
              Service : Repas sur place uniquement
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
