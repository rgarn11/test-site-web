import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className="py-20 md:py-32 bg-[#F2F0E9]"
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
            Témoignages
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-6 text-balance">
            Ce que nos clients disent
          </h2>
          
          {/* Google Rating Badge */}
          <div
            data-testid="reviews-rating-badge"
            className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-md"
          >
            <div className="flex items-center gap-1">
              {renderStars(4)}
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" style={{ clipPath: 'inset(0 60% 0 0)' }} />
            </div>
            <div className="text-left">
              <p className="font-heading text-2xl font-medium text-charcoal">4,4 / 5</p>
              <p className="text-sm text-muted-foreground">558 avis Google</p>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`review-card-${index}`}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-cedar/20 mb-4" />
              
              {/* Review Text */}
              <p className="text-charcoal text-lg leading-relaxed mb-6">
                "{review.text}"
              </p>
              
              {/* Reviewer Info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading font-medium text-charcoal">
                    {review.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {review.badge}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.google.com/maps/place/Le+Gros+Arbre/@43.6114,1.4289"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="reviews-google-link"
            className="text-cedar hover:text-wood underline-offset-4 hover:underline transition-colors font-medium"
          >
            Voir tous les avis sur Google Maps →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
