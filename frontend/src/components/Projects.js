'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import styles from './Projects.module.css';

const categories = ['All', 'Building', 'Client Satisfied', 'Support', 'Architecture'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
          setFilteredProjects(data);
        } else {
          throw new Error('Failed to load projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        // Fallback data
        const fallback = [
          {
            id: 1,
            title: 'Modern Highrise Crane',
            category: 'Building',
            subtitle: 'Business / Growing',
            image: '/images/project_1.png',
            size: 'tall'
          },
          {
            id: 2,
            title: 'Site Engineering Review',
            category: 'Architecture',
            subtitle: 'Business / Growing',
            image: '/images/project_2.png',
            size: 'square'
          },
          {
            id: 3,
            title: 'Corporate HQ Planning',
            category: 'Client Satisfied',
            subtitle: 'Business / Growing',
            image: '/images/project_3.png',
            size: 'orange-block' // Specialized highlighted card
          },
          {
            id: 4,
            title: 'Structural Reinforcement',
            category: 'Support',
            subtitle: 'Business / Growing',
            image: '/images/project_4.png',
            size: 'square'
          },
          {
            id: 5,
            title: 'Urban Center Scaffold',
            category: 'Building',
            subtitle: 'Business / Growing',
            image: '/images/project_5.png',
            size: 'square'
          },
          {
            id: 6,
            title: 'Eco-Friendly Construction',
            category: 'Architecture',
            subtitle: 'Business / Growing',
            image: '/images/project_6.png',
            size: 'wide'
          }
        ];
        setProjects(fallback);
        setFilteredProjects(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === category));
    }
  };

  return (
    <section className={`section-padding ${styles.projectsSection}`} id="projects">
      <div className="container">
        {/* Header split row */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.tag}>
              <Sparkles size={14} />
              OUR BEST PROJECTS
            </span>
            <h2 className={styles.heading}>Our Work Recent Projects</h2>
          </div>
          <div className={styles.headerRight}>
            <p>
              Our approach has been simple. Provide 100% competitive price sing qualified plumbers with no hidden fees led by a 100% guarantee.
            </p>
          </div>
        </div>

        {/* Filter categories tabs */}
        <div className={styles.filterTabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Grid */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isOrangeBlock = project.id === 3; // The middle card styled orange
              
              if (isOrangeBlock) {
                return (
                  <motion.div
                    layout
                    key={project.id}
                    className={`${styles.gridCard} ${styles.orangeCard}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={styles.orangeContent}>
                      <span className={styles.orangeSubtitle}>{project.subtitle}</span>
                      <h3 className={styles.orangeTitle}>{project.title}</h3>
                      <div className={styles.orangeIconWrapper}>
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </motion.div>
                );
              }

              const sizeClass = styles[project.size] || styles.square;

              return (
                <motion.div
                  layout
                  key={project.id}
                  className={`${styles.gridCard} ${sizeClass}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <div 
                    className={styles.cardBg}
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className={styles.cardOverlay} />
                  
                  <div className={styles.cardContent}>
                    <span className={styles.cardSubtitle}>{project.category}</span>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <div className={styles.arrowIconWrapper}>
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
