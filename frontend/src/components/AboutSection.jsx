import { motion } from 'framer-motion';
import { TreeDeciduous, Utensils, Heart, MapPin } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: TreeDeciduous,
      title: "Un cadre unique",
      description: "Un cèdre du Liban bicentenaire se mirant dans les eaux du Bassin des Filtres, ouvrage historique du Canal du Midi."
    },
    {
      icon: Utensils,
      title: "Cuisine maison",
      description: "Des plats préparés avec passion, des produits frais et locaux sélectionnés avec soin chaque jour."
    },
    {
      icon: Heart,
      title: "L'art de recevoir",
      description: "Une équipe chaleureuse et attentionnée pour une expérience gastronomique inoubliable."
    },
    {
      icon: MapPin,
      title: "Emplacement privilégié",
      description: "Au cœur du quartier des Amidonniers, un havre de paix à quelques pas du centre-ville."
    }
  ];

  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <img
                src="https://customer-assets.emergentagent.com/job_toulousedining/artifacts/lbe90nu3_image.png"
                alt="Cuisine du Gros Arbre"
                className="w-full h-[500px] object-cover rounded-lg shadow-xl"
              />
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-cedar/10 rounded-lg -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-wood/10 rounded-lg -z-10" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <span className="text-sm uppercase tracking-widest font-semibold text-cedar/60 mb-4 block">
              Notre Histoire
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-6 text-balance">
              À propos du<br />
              <span className="text-cedar">Gros Arbre</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Niché au bord du Bassin des Filtres, Le Gros Arbre vous accueille dans un cadre 
              exceptionnel où la nature rencontre la gastronomie. Notre maison, à l'ombre d'un 
              majestueux cèdre du Liban bicentenaire, est un véritable écrin de verdure en plein 
              cœur de Toulouse.
            </p>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              Notre chef et son équipe vous proposent une cuisine créative et généreuse, 
              élaborée à partir de produits frais et de saison, pour une expérience 
              gustative authentique et mémorable.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                  data-testid={`about-feature-${index}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-cedar/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-cedar" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-medium text-charcoal mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
