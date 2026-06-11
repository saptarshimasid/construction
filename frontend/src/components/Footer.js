'use client';

import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

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

const Youtube = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const Instagram = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function Footer() {
  const servicesList = [
    'Why choose us',
    'Our solutions',
    'Partners',
    'Core values',
    'Our projects'
  ];

  const quickLinksList = [
    'Residents',
    'Business',
    'Online Service',
    'Visiting',
    'Employment'
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'We round Solution york Blog',
      date: '23 Jun 2023',
      image: '/images/blog_1.png'
    },
    {
      id: 2,
      title: 'We round Solution york Blog',
      date: '23 Jun 2023',
      image: '/images/blog_2.png'
    }
  ];

  return (
    <footer className={styles.footer} id="contact">
      {/* Upper footer content grid */}
      <div className={`container ${styles.footerGrid}`}>
        {/* Info Column */}
        <div className={styles.colInfo}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <span>B</span>
            </div>
            <span className={styles.logoText}>Buldex</span>
          </div>
          
          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <Clock className={styles.infoIcon} size={16} />
              <div>
                <strong>Open Hours of Government:</strong>
                <p>Mon - Fri: 8.00 am - 6.00 pm</p>
              </div>
            </li>
            <li className={styles.infoItem}>
              <MapPin className={styles.infoIcon} size={16} />
              <div>
                <p>13/A, Miranda Halim City</p>
              </div>
            </li>
            <li className={styles.infoItem}>
              <Phone className={styles.infoIcon} size={16} />
              <div>
                <p>099 695 695 35</p>
              </div>
            </li>
          </ul>

          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" className={styles.socialLink} aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" className={styles.socialLink} aria-label="Youtube"><Youtube size={16} /></a>
            <a href="#" className={styles.socialLink} aria-label="Instagram"><Instagram size={16} /></a>
          </div>
        </div>

        {/* Services Column */}
        <div className={styles.colLinks}>
          <h3 className={styles.title}>Service</h3>
          <ul className={styles.linksList}>
            {servicesList.map((item) => (
              <li key={item}>
                <a href="#service" className={styles.linkItem}>
                  <ArrowRight size={12} className={styles.arrow} />
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Link Column */}
        <div className={styles.colLinks}>
          <h3 className={styles.title}>Quick Link</h3>
          <ul className={styles.linksList}>
            {quickLinksList.map((item) => (
              <li key={item}>
                <a href="#" className={styles.linkItem}>
                  <ArrowRight size={12} className={styles.arrow} />
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Posts Column */}
        <div className={styles.colPosts}>
          <h3 className={styles.title}>Recent Posts</h3>
          <div className={styles.postsList}>
            {recentPosts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <div 
                  className={styles.postThumb} 
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className={styles.postMeta}>
                  <span className={styles.postDate}>{post.date}</span>
                  <a href="#blog" className={styles.postTitle}>{post.title}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <p className={styles.copyright}>
            Copyright © {new Date().getFullYear()} <span className={styles.highlight}>Buldex</span>. All Rights Reserved.
          </p>
          <ul className={styles.bottomNav}>
            <li><a href="#about">About Us</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#blog">News</a></li>
            <li><a href="#projects">Portfolio</a></li>
          </ul>
        </div>
      </div>

      {/* Safety Stripe bottom decoration */}
      <div className={styles.safetyStripe} />
    </footer>
  );
}
