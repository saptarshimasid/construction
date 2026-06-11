'use client';

import { useState, useEffect } from 'react';
import { Search, Phone, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar({ onContactClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [magneticStyle, setMagneticStyle] = useState({});

  const menuItems = [
    { name: 'Home', hasDropdown: false },
    { name: 'About', hasDropdown: false },
    { name: 'Service', hasDropdown: true },
    { name: 'Team', hasDropdown: false },
    { name: 'Blog', hasDropdown: true },
    { name: 'Contact', hasDropdown: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy logic to automatically underline items
  useEffect(() => {
    const sectionIds = ['home', 'about', 'service', 'team', 'blog', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const match = menuItems.find(item => item.name.toLowerCase() === id);
          if (match) {
            setActiveItem(match.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // magnetic pull ratio
    setMagneticStyle({
      transform: `translate(${x * 0.3}px, ${y * 0.3}px)`
    });
  };

  const handleMouseLeave = () => {
    setMagneticStyle({
      transform: 'translate(0px, 0px)'
    });
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navbarContainer}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <span>B</span>
          </div>
          <span className={styles.logoText}>Buldex</span>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.name} className={styles.navItem}>
                <a
                  href={`#${item.name.toLowerCase()}`}
                  className={`${styles.navLink} ${activeItem === item.name ? styles.active : ''}`}
                  onClick={() => {
                    setActiveItem(item.name);
                    if (item.name === 'Contact') {
                      onContactClick && onContactClick();
                    }
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.actionBtn} aria-label="Search">
            <Search size={20} />
          </button>
          <button 
            className={styles.contactBtn} 
            onClick={onContactClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ ...magneticStyle, transition: magneticStyle.transform === 'translate(0px, 0px)' ? 'transform 0.4s ease' : 'none' }}
          >
            <span>Contact Now</span>
            <div className={styles.phoneIconWrapper}>
              <Phone size={14} />
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.menuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={`#${item.name.toLowerCase()}`}
                  className={`${styles.mobileNavLink} ${activeItem === item.name ? styles.mobileActive : ''}`}
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsMobileMenuOpen(false);
                    if (item.name === 'Contact') {
                      onContactClick && onContactClick();
                    }
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <button 
            className={styles.mobileContactBtn}
            onClick={() => {
              setIsMobileMenuOpen(false);
              onContactClick && onContactClick();
            }}
          >
            <Phone size={16} />
            <span>Contact Now</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
