'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Brands from '@/components/Brands';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Team from '@/components/Team';
import CTA from '@/components/CTA';
import Projects from '@/components/Projects';
import VideoSection from '@/components/VideoSection';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Simple scroll reveal triggers
  useEffect(() => {
    // We can also let GSAP run here, but standard CSS reveals can act as reliable scroll indicators
    const revealElements = document.querySelectorAll('.section-padding, section');
    
    const handleScrollReveal = () => {
      const triggerBottom = window.innerHeight * 0.85;
      revealElements.forEach((el) => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
          el.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScrollReveal);
    // Initial check
    handleScrollReveal();
    
    return () => window.removeEventListener('scroll', handleScrollReveal);
  }, []);

  return (
    <>
      {/* Top Header */}
      <Navbar onContactClick={() => setIsContactOpen(true)} />

      {/* Main Content Sections */}
      <main style={{ overflowX: 'hidden' }}>
        <Hero onOpenVideo={() => setIsContactOpen(true)} />
        <AboutUs onOpenVideo={() => setIsContactOpen(true)} />
        <Brands />
        <Services onContactClick={() => setIsContactOpen(true)} />
        <WhyChooseUs />
        <Team />
        <CTA onContactClick={() => setIsContactOpen(true)} />
        <Projects />
        <VideoSection />
        <Blog onContactClick={() => setIsContactOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Contact / Get Quote Overlay Popup */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
