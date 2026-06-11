'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play, Award, Zap, ShieldCheck } from 'lucide-react';
import styles from './AboutUs.module.css';

const tabContent = {
  'DESIGN BUILDING': {
    heading: 'Modern Engineering & Design Integrity',
    description: 'We integrate building design and planning into a seamless, high-performance process, ensuring structure viability, sustainability, and visual elegance.',
    checklist: [
      'How industrial process work?',
      'Optimal alignments for tuitive?',
      'Building alignments for tuitive?'
    ]
  },
  'PROJECT MANAGEMENT': {
    heading: 'Timely and Budget-Conscious Executions',
    description: 'Our project managers orchestrate supply chains, site schedules, and quality inspections to keep construction on track and eliminate hidden fees.',
    checklist: [
      'Comprehensive progress audits',
      'Milestone-driven project trackers',
      'Strict quality safety measures'
    ]
  },
  'TEAM SUPPORT': {
    heading: 'Experienced On-Site Engineering Support',
    description: 'We provide specialized teams of certified civil, structural, and electrical engineers to oversee complex operations and resolve issues instantly.',
    checklist: [
      '24/7 emergency site support',
      'Certified safety supervisors',
      'Continuous technical diagnostics'
    ]
  }
};

export default function AboutUs({ onOpenVideo }) {
  const [activeTab, setActiveTab] = useState('DESIGN BUILDING');

  return (
    <section className={`section-padding ${styles.about}`} id="about">
      <div className={`container ${styles.grid}`}>
        {/* Left Side: Worker Image & Rotating Badge */}
        <motion.div 
          className={styles.imageCol}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.imageWrapper}>
            <img 
              src="/images/about_worker.png" 
              alt="Construction Manager" 
              className={styles.mainImage}
            />
            {/* Arched border accent */}
            <div className={styles.archedBorder} />
            
            {/* Rotating Badge Overlay */}
            <div className={styles.badgeOverlay}>
              <div className={`${styles.badgeCircle} animate-spin-slow`}>
                <svg viewBox="0 0 100 100">
                  <path
                    id="badgeTextPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text className={styles.badgeText}>
                    <textPath href="#badgeTextPath" startOffset="0%">
                      QUALITY CONTROL CERTIFIED • QUALITY CONTROL CERTIFIED •
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className={styles.badgeInner}>
                <ShieldCheck size={28} className={styles.badgeIcon} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Copy & Interactive Tabs */}
        <motion.div 
          className={styles.contentCol}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.header}>
            <span className={styles.sectionTag}>
              <Zap size={14} className={styles.tagIcon} />
              OUR ABOUT US
            </span>
            <h2 className={styles.heading}>
              Building Revolution For This About Save <span className={styles.accent}>Facility.</span>
            </h2>
            <div className={styles.headingUnderline} />
          </div>

          <p className={styles.leadParagraph}>
            Our approach has been simple. Provide 100% competitive price using qualified plumbers with no hidden fees led by a 100% guarantee on workmanship Provide.
          </p>

          {/* Interactive Tabs */}
          <div className={styles.tabBar}>
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Panel Content with Animations */}
          <div className={styles.tabPanel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={styles.tabHeading}>{tabContent[activeTab].heading}</h3>
                <p className={styles.tabDescription}>{tabContent[activeTab].description}</p>
                
                <ul className={styles.checklist}>
                  {tabContent[activeTab].checklist.map((item, index) => (
                    <li key={index} className={styles.checkItem}>
                      <div className={styles.checkIconWrapper}>
                        <Check size={14} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Founder overlay block & CTA */}
          <div className={styles.footerRow}>
            <div className={styles.founderCard}>
              <div className={styles.avatar}>BM</div>
              <div className={styles.founderMeta}>
                <h4>Betara Morta</h4>
                <p>Founder & Architect</p>
              </div>
              <div className={styles.signature}>Betara Morta</div>
            </div>

            <div className={styles.ctaActions}>
              <a href="#contact" className="btn-primary">
                About More
              </a>
              <button className={styles.watchingBtn} onClick={onOpenVideo}>
                <div className={styles.watchingPlay}>
                  <Play size={12} fill="white" />
                </div>
                <span>Watching Video</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
