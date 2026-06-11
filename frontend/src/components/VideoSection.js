'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import styles from './VideoSection.module.css';

const progressStats = [
  { id: 1, target: 62, label: 'Architecture' },
  { id: 2, target: 40, label: 'Residencial' }, // spelling match image
  { id: 3, target: 82, label: 'Building Planning' },
  { id: 4, target: 61, label: 'Consultancy' }
];

function ProgressRing({ value, label }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={styles.ringCard}>
      <div className={styles.ringWrapper}>
        <svg className={styles.ringSvg} viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className={styles.ringBg}
            cx="50"
            cy="50"
            r={radius}
          />
          {/* Foreground progress circle */}
          <circle
            className={styles.ringProgress}
            cx="50"
            cy="50"
            r={radius}
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 1.5s ease-in-out'
            }}
          />
        </svg>
        <span className={styles.ringValue}>{value}%</span>
      </div>
      <span className={styles.ringLabel}>{label}</span>
    </div>
  );
}

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Progress values state
  const [progressValues, setProgressValues] = useState(
    progressStats.map(() => 0)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate progress counters when section comes into view
  useEffect(() => {
    if (!inView) return;

    progressStats.forEach((stat, idx) => {
      let current = 0;
      const step = Math.ceil(stat.target / 30); // update in 30 steps
      const timer = setInterval(() => {
        current += step;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        setProgressValues((prev) => {
          const next = [...prev];
          next[idx] = current;
          return next;
        });
      }, 30);
    });
  }, [inView]);

  return (
    <section ref={sectionRef} className={styles.videoSection} id="video-section">
      {/* Background outline text */}
      <div className={styles.outlineText}>WATCH VIDEO</div>

      {/* Main Promo card */}
      <div className={`container ${styles.container}`}>
        <div 
          className={styles.videoCard}
          style={{ backgroundImage: `url('/images/video_bg.png')` }}
        >
          <div className={styles.cardOverlay} />
          
          <div className={styles.cardContent}>
            <button 
              className={styles.playButton} 
              onClick={() => setIsPlaying(true)}
              aria-label="Play Video"
            >
              <Play size={24} fill="currentColor" />
            </button>
            <h2 className={styles.heading}>Great Experience for This Video</h2>
            <p className={styles.description}>
              Our approach has been simple. Provide 100% competitive price sing qualified plumbers with no hidden fees led by a 100% guarantee.
            </p>
            <button className="btn-primary" onClick={() => setIsPlaying(true)}>
              Video More
            </button>
          </div>
        </div>

        {/* Progress indicators grid */}
        <div className={styles.progressGrid}>
          {progressStats.map((stat, idx) => (
            <ProgressRing
              key={stat.id}
              value={progressValues[idx]}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      {/* Embedded Video Modal */}
      {isPlaying && (
        <div className={styles.modal}>
          <div className={styles.modalBackdrop} onClick={() => setIsPlaying(false)} />
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={() => setIsPlaying(false)} aria-label="Close Player">
              <X size={24} />
            </button>
            <div className={styles.iframeWrapper}>
              {/* Construction reel placeholder */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Buldex Promo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
