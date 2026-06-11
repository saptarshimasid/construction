'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, ChevronLeft, ChevronRight, Briefcase, Users, Smile, UserCheck, Award } from 'lucide-react';
import styles from './Hero.module.css';

const slides = [
  {
    id: 1,
    subtitle: 'Building New World',
    title: 'Construction',
    description: 'Construction of the society where we success website robustly needs design to be one of the top 26+ IT companies Benefit.',
    bg: '/images/hero_bg.png'
  },
  {
    id: 2,
    subtitle: 'Crafting Modern Spaces',
    title: 'Architecture',
    description: 'Delivering structural engineering and architecture excellence across commercial and residential developments worldwide.',
    bg: '/images/hero_bg_2.png'
  }
];

const stats = [
  { id: 1, value: '256K+', label: 'Total Projects', icon: Briefcase },
  { id: 2, value: '365+', label: 'Team Support', icon: Users },
  { id: 3, value: '23K+', label: 'Happy Client', icon: Smile },
  { id: 4, value: '251+', label: 'Qualified Worker', icon: UserCheck },
  { id: 5, value: '20K+', label: 'Get Awards', icon: Award }
];

function Counter({ value }) {
  const [count, setCount] = useState(0);
  const numPart = parseInt(value);
  const suffix = value.replace(numPart.toString(), '');

  useEffect(() => {
    let start = 0;
    const end = numPart;
    if (isNaN(end)) return;

    const duration = 2000; // 2 seconds
    const stepTime = 30;
    const stepsCount = Math.ceil(duration / stepTime);
    const increment = end / stepsCount;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      start += increment;
      if (step >= stepsCount) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [value, numPart]);

  return <span>{count}{suffix}</span>;
}

export default function Hero({ onOpenVideo }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [magneticBtnStyle, setMagneticBtnStyle] = useState({});

  // Parallax Scroll Effect
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleMouseMoveBtn = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagneticBtnStyle({
      transform: `translate(${x * 0.35}px, ${y * 0.35}px)`
    });
  };

  const handleMouseLeaveBtn = () => {
    setMagneticBtnStyle({
      transform: 'translate(0px, 0px)'
    });
  };


  return (
    <section className={styles.hero} id="home">
      {/* Background Image Carousel with Fade & Parallax */}
      <div className={styles.bgWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={styles.bgImage}
            style={{ y: yBg, backgroundImage: `url(${slides[currentSlide].bg})` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className={styles.bgOverlay} />
      </div>

      <div className={`container ${styles.contentContainer}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={styles.textBlock}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.subtitle}>{slides[currentSlide].subtitle}</span>
            
            {/* Title with flanking brackets and horizontal lines */}
            <div className={styles.titleWrapper}>
              <div className={styles.lineLeft} />
              <span className={styles.bracket}>[</span>
              <h1 className={styles.title}>{slides[currentSlide].title}</h1>
              <span className={styles.bracket}>]</span>
              <div className={styles.lineRight} />
            </div>
            
            <p className={styles.description}>{slides[currentSlide].description}</p>
            
            <div className={styles.btnRow}>
              <a 
                href="#projects" 
                className="btn-primary"
                onMouseMove={handleMouseMoveBtn}
                onMouseLeave={handleMouseLeaveBtn}
                style={{ ...magneticBtnStyle, transition: magneticBtnStyle.transform === 'translate(0px, 0px)' ? 'transform 0.4s ease' : 'none' }}
              >
                <span>Get A Quote</span>
                <ArrowRight size={16} />
              </a>
              <button className={styles.playBtn} onClick={onOpenVideo}>
                <div className={styles.playIconWrapper}>
                  <Play size={14} fill="white" />
                </div>
                <span>Watching Video</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls (flanking screen edges) */}
      <button className={`${styles.sliderBtn} ${styles.prev}`} onClick={prevSlide} aria-label="Previous Slide">
        <ChevronLeft size={24} />
      </button>
      <button className={`${styles.sliderBtn} ${styles.next}`} onClick={nextSlide} aria-label="Next Slide">
        <ChevronRight size={24} />
      </button>

      {/* Stats Cards Overlay */}
      <div className={styles.statsOverlay}>
        <div className={`container ${styles.statsContainer}`}>
          <div className={styles.statsGrid}>
            {stats.map((stat) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={styles.statCard}
                >
                  <div className={styles.statIconWrapper}>
                    <IconComp size={20} />
                  </div>
                  <div className={styles.statText}>
                    <h3 className={styles.statVal}>
                      <Counter value={stat.value} />
                    </h3>
                    <p className={styles.statLbl}>{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
