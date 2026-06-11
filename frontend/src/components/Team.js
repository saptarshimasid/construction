'use client';

import { useState, useEffect } from 'react';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Team.module.css';

const Facebook = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Twitter = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Instagram = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/team');
        if (response.ok) {
          const data = await response.json();
          setTeam(data);
        } else {
          throw new Error('Failed to load team');
        }
      } catch (err) {
        console.error('Error fetching team:', err);
        // Fallback data
        setTeam([
          {
            id: 1,
            name: 'Rebar Butae',
            role: 'Manager',
            image: '/images/team_1.png',
            socials: { facebook: '#', twitter: '#', instagram: '#' }
          },
          {
            id: 2,
            name: 'Latar Bara',
            role: 'Founder',
            image: '/images/team_2.png',
            socials: { facebook: '#', twitter: '#', instagram: '#' }
          },
          {
            id: 3,
            name: 'Rasel Kart',
            role: 'Manager',
            image: '/images/team_3.png',
            socials: { facebook: '#', twitter: '#', instagram: '#' }
          },
          {
            id: 4,
            name: 'Poral Meta',
            role: 'Manager',
            image: '/images/team_4.png',
            socials: { facebook: '#', twitter: '#', instagram: '#' }
          },
          {
            id: 5,
            name: 'Karl Werner',
            role: 'Senior Engineer',
            image: '/images/team_5.png',
            socials: { facebook: '#', twitter: '#', instagram: '#' }
          },
          {
            id: 6,
            name: 'Sarah Jenkins',
            role: 'Site Inspector',
            image: '/images/team_6.png',
            socials: { facebook: '#', twitter: '#', instagram: '#' }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 991) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent index from getting out of bounds when window resizes
  useEffect(() => {
    if (team.length > 0) {
      const maxIndex = Math.max(0, team.length - visibleCards);
      if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
      }
    }
  }, [visibleCards, team.length, currentIndex]);

  const nextSlide = () => {
    if (currentIndex < team.length - visibleCards) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const totalSteps = Math.max(1, team.length - visibleCards + 1);

  return (
    <section className={`section-padding ${styles.team}`} id="team">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>
            <Users size={14} />
            OUR TEAM MEMBER
          </span>
          <h2 className={styles.heading}>Our Dedicated Team Meeting</h2>
          <div className={styles.line} />
        </div>

        {/* Team Slider Window */}
        <div className={styles.sliderWindow}>
          {/* Team slider track */}
          <div 
            className={styles.sliderTrack}
            style={{
              transform: `translateX(calc(-${currentIndex} * (100% + 2rem) / ${visibleCards}))`
            }}
          >
            {team.map((member) => (
              <div key={member.id} className={styles.card}>
                {/* Image Frame */}
                <div className={styles.imageFrame}>
                  <div 
                    className={styles.image} 
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  
                  {/* Arched border overlay */}
                  <div className={styles.archBorder} />

                  {/* Social Overlay (pops up on hover) */}
                  <div className={styles.socialOverlay}>
                    <a href={member.socials.facebook || '#'} className={styles.socialLink} aria-label="Facebook">
                      <Facebook size={16} />
                    </a>
                    <a href={member.socials.twitter || '#'} className={styles.socialLink} aria-label="Twitter">
                      <Twitter size={16} />
                    </a>
                    <a href={member.socials.instagram || '#'} className={styles.socialLink} aria-label="Instagram">
                      <Instagram size={16} />
                    </a>
                  </div>
                </div>

                {/* Text Info */}
                <div className={styles.info}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls Row */}
        {team.length > visibleCards && (
          <div className={styles.controlsRow}>
            <button 
              className={`${styles.navBtn} ${currentIndex === 0 ? styles.disabled : ''}`} 
              onClick={prevSlide}
              disabled={currentIndex === 0}
              aria-label="Previous Team Members"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Carousel indicator dots */}
            <div className={styles.dots}>
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <span 
                  key={idx} 
                  className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>

            <button 
              className={`${styles.navBtn} ${currentIndex >= team.length - visibleCards ? styles.disabled : ''}`} 
              onClick={nextSlide}
              disabled={currentIndex >= team.length - visibleCards}
              aria-label="Next Team Members"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
