import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MenuSection = () => {
  const [menu, setMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState('entrees');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${API}/menu`);
        setMenu(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenu();
  }, []);

  const categories = [
    { key: 'entrees', label: 'Entrées', icon: '🥗' },
    { key: 'plats', label: 'Plats', icon: '🍽️' },
    { key: 'desserts', label: 'Desserts', icon: '🍰' },
    { key: 'boissons', label: 'Boissons', icon: '🍷' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section
      id="menu"
      data-testid="menu-section"
      className="py-20 md:py-32 bg-bone"
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
            Notre Carte
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-4 text-balance">
            Menu
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une cuisine de saison, préparée avec des produits frais et locaux
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              data-testid={`menu-tab-${category.key}`}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.key
                  ? 'bg-cedar text-white shadow-lg'
                  : 'bg-white text-charcoal hover:bg-cedar/10 border border-border'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {menu && (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {menu[activeCategory]?.map((item, index) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                data-testid={`menu-item-${index}`}
                className="bg-white p-8 border border-border/40 hover:border-wood/50 transition-all duration-300 group relative overflow-hidden rounded-lg"
              >
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cedar/5 to-transparent rounded-bl-full" />
                
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-medium text-charcoal mb-2 group-hover:text-cedar transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="font-heading text-2xl font-medium text-wood">
                      {item.price}€
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Price Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            Menu moyen : <span className="font-semibold text-charcoal">30–40 € par personne</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
