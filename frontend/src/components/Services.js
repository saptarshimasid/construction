'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, HelpCircle } from 'lucide-react';
import styles from './Services.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function Services({ onContactClick }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          throw new Error('Failed to load services');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        // Fallback data if API is down
        setServices([
          {
            id: 1,
            title: 'Building Project Service',
            description: 'Industrial engineering this Construction branch building this template.',
            features: ['This man for it for Building', 'Emergency Solution Anytime', 'Team Support Building'],
            indexText: '01'
          },
          {
            id: 2,
            title: 'Experienced of Team',
            description: 'Industrial engineering this Construction branch building this template.',
            features: ['This man for it for Building', 'Emergency Solution Anytime', 'Team Support Building'],
            indexText: '02'
          },
          {
            id: 3,
            title: 'Calculations Service',
            description: 'Industrial engineering this Construction branch building this template.',
            features: ['This man for it for Building', 'Emergency Solution Anytime', 'Team Support Building'],
            indexText: '03'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceImage = (id) => {
    if (id === 1) return '/images/service_building.png';
    if (id === 2) return '/images/service_team.png';
    return '/images/service_calc.png';
  };

  return (
    <section className={`section-padding ${styles.services}`} id="service">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>
            <Sparkles size={14} />
            OUR BEST SERVICE
          </span>
          <h2 className={styles.heading}>We Are Quality General Service</h2>
          <div className={styles.line} />
        </div>

        {/* Services Grid */}
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service) => {
            // Card 2 is the active orange highlight card by default in con.jpg
            const isActive = service.id === 2;
            
            return (
              <motion.div
                key={service.id}
                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                variants={cardVariants}
              >
                {/* Image */}
                <div 
                  className={styles.cardImage} 
                  style={{ backgroundImage: `url(${getServiceImage(service.id)})` }}
                />

                {/* Content */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>
                  
                  <ul className={styles.featuresList}>
                    {service.features.map((feat, index) => (
                      <li key={index} className={styles.featItem}>
                        <Check size={14} className={isActive ? styles.checkActive : styles.checkMuted} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Read More strip */}
                  <button 
                    onClick={onContactClick} 
                    className={`${styles.readMore} ${isActive ? styles.readMoreActive : ''}`}
                  >
                    <span>Read More</span>
                    <ArrowRight size={14} className={styles.readMoreArrow} />
                  </button>

                  {/* Absolute index overlay */}
                  <span className={styles.indexText}>{service.indexText}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <div className={styles.btnWrapper}>
          <button onClick={onContactClick} className="btn-primary">
            <span>View All Service</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
