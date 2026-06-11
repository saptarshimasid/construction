'use client';

import { motion } from 'framer-motion';
import { Cpu, Hammer, Factory, Building2, HelpCircle } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const features = [
  {
    id: 1,
    title: 'Robot Work Service',
    description: 'Industrial engineering this Construction branch building this template.',
    icon: Cpu
  },
  {
    id: 2,
    title: 'Woaker Man Bulding',
    description: 'Industrial engineering this Construction branch building this template.',
    icon: Hammer
  },
  {
    id: 3,
    title: 'Industrial & Service',
    description: 'Industrial engineering this Construction branch building this template.',
    icon: Factory
  },
  {
    id: 4,
    title: 'Building Best Service',
    description: 'Industrial engineering this Construction branch building this template.',
    icon: Building2
  }
];

export default function WhyChooseUs() {
  return (
    <section className={`section-padding ${styles.chooseUs}`} id="why-choose-us">
      <div className={`container ${styles.grid}`}>
        {/* Left Side: Text and Features Grid */}
        <motion.div 
          className={styles.contentCol}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.header}>
            <span className={styles.tag}>
              <HelpCircle size={14} />
              OUR CHOOSE US
            </span>
            <h2 className={styles.heading}>Choose Central since 2023 Construction Region</h2>
            <div className={styles.line} />
          </div>

          <p className={styles.description}>
            Our approach has been simple. Provide 100% competitive price sing qualified plumbers with no hidden fees led by a 100% guarantee on workmanship.
          </p>

          <div className={styles.featuresGrid}>
            {features.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div key={feat.id} className={styles.featCard}>
                  <div className={styles.iconWrapper}>
                    <IconComp size={22} />
                  </div>
                  <div className={styles.featContent}>
                    <h3 className={styles.featTitle}>{feat.title}</h3>
                    <p className={styles.featDesc}>{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side: Welder Image */}
        <motion.div 
          className={styles.imageCol}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.imageFrame}>
            <img
              src="/images/choose_welder.png"
              alt="Welding Steel Fabrication"
              className={styles.mainImage}
            />
            {/* Thematic framing overlays */}
            <div className={styles.frameDecoration} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
