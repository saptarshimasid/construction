'use client';

import styles from './Brands.module.css';

const brandLogos = [
  {
    name: 'Envato',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M16.24 3.56c-.66.66-1.57 1.04-2.5 1.04h-1.48c-.93 0-1.84-.38-2.5-1.04L7.54 1.34c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l2.22 2.22c.66.66.66 1.72 0 2.38l-2.22 2.22c-.66.66-1.72.66-2.38 0L1.53 7.35c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l2.22 2.22c.66.66 1.57 1.04 2.5 1.04h1.48c.93 0 1.84-.38 2.5-1.04l2.22-2.22c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-2.22 2.22c-.66.66-.66 1.72 0 2.38l2.22 2.22c.66.66 1.72.66 2.38 0l2.22-2.22c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-2.22 2.22c-.66.66-1.57 1.04-2.5 1.04" />
      </svg>
    )
  },
  {
    name: 'Framer',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M5 2h14v6H5V2zm0 6h14l-7 7-7-7zm0 7h7v7l-7-7z" />
      </svg>
    )
  },
  {
    name: 'Figma',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zm-4 10a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4zm8 0a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4z" />
      </svg>
    )
  },
  {
    name: 'Dribbble',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm8.16 8.3c-.66-.46-1.92-.81-3.6-.62 1.34-2.2 2.37-4.14 2.53-4.43.92 1.25 1.39 2.8 1.07 5.05z" />
      </svg>
    )
  },
  {
    name: 'Behance',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M8.2 4.3c2.3 0 3.7.9 3.7 2.8 0 1.3-.8 2.2-2.1 2.5 1.6.3 2.6 1.4 2.6 3 0 2.3-1.6 3.4-4.2 3.4H3V4.3h5.2zm-2 4.1h1.8c1 0 1.6-.3 1.6-1.1 0-.7-.5-1-1.5-1H6.2v2.1zm0 5.1h2c1.1 0 1.8-.4 1.8-1.2 0-.8-.7-1.2-1.7-1.2h-2.1v2.4zm14.8-2.6h-6.2c0 1.6 1.1 2.3 2.6 2.3 1.1 0 1.9-.4 2.3-1.1h1.9c-.6 1.7-2.1 2.6-4.2 2.6-3.2 0-4.8-2.1-4.8-5 0-3 1.7-5.1 4.7-5.1 3.1 0 4.5 2.1 4.5 4.7v1.6zm-1.8-1.4c0-1.1-.7-1.8-1.9-1.8-1.1 0-1.9.7-2 1.8h3.9zM14.2 6.2h5.5v1.1h-5.5V6.2z" />
      </svg>
    )
  },
  {
    name: 'Unsplash',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M8.5 2v5.5h7V2h-7zm7 8.5H22V22H2V10.5h6.5V16h7v-5.5z" />
      </svg>
    )
  },
  {
    name: 'Autodesk',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2L2 22h4.5l2.2-4.5h6.6l2.2 4.5H22L12 2zm1.2 11.5H10.8l1.2-2.5 1.2 2.5z" />
      </svg>
    )
  }
];

export default function Brands() {
  // Duplicate list to achieve continuous infinite sliding track
  const tickerLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section className={styles.brandsSection}>
      <div className="container">
        {/* Header decoration */}
        <div className={styles.header}>
          <div className={styles.line} />
          <span className={styles.title}>MORE OF BRANDS</span>
          <div className={styles.line} />
        </div>
      </div>

      {/* Infinite Horizontal Sliding Ticker */}
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          {tickerLogos.map((brand, idx) => (
            <div
              key={idx}
              className={styles.logoCard}
            >
              <div className={styles.brandIconWrapper}>
                {brand.icon}
              </div>
              <span className={styles.brandName}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
