import { MapPin, Phone, Clock, Facebook, Star } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="bg-charcoal text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-medium mb-4">
              Le Gros Arbre
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Un havre de paix au cœur de Toulouse, où la gastronomie rencontre la nature sous l'ombre d'un cèdre bicentenaire.
            </p>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-white/90 font-medium">4,4 / 5</span>
              <span className="text-white/60 text-sm">• 558 avis</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0765872934"
                  data-testid="footer-phone"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  <span>07 65 87 29 34</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-facebook"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" strokeWidth={1.5} />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Adresse</h4>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=110+Rue+des+Amidonniers,+31000+Toulouse"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-address"
              className="flex items-start gap-3 text-white/70 hover:text-white transition-colors"
            >
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span>
                110 Rue des Amidonniers<br />
                31000 Toulouse<br />
                <span className="text-wood">Bassin des Filtres</span>
              </span>
            </a>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Horaires</h4>
            <div className="flex items-start gap-3 text-white/70">
              <Clock className="w-4 h-4 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <div className="text-sm space-y-1">
                <p><span className="text-red-400">Lun:</span> Fermé</p>
                <p><span className="text-white/90">Mar-Jeu:</span> 12h-14h30, 19h-22h</p>
                <p><span className="text-white/90">Ven-Sam:</span> 12h-14h30, 19h-22h30</p>
                <p><span className="text-white/90">Dim:</span> 12h-15h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} Le Gros Arbre. Tous droits réservés.
            </p>
            <p className="text-white/50 text-sm">
              Service : Repas sur place uniquement
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
