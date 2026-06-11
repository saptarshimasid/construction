'use client';

import { ArrowRight } from 'lucide-react';
import styles from './CTA.module.css';

export default function CTA({ onContactClick }) {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.bgOverlay} />
      <div className={`container ${styles.container}`}>
        <h2 className={styles.text}>We Provided Best Industry Services For You</h2>
        <button className={styles.btn} onClick={onContactClick}>
          <span>Contact Us</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
