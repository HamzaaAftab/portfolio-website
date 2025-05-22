
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showProgress, setShowProgress] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get scroll progress using framer motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    // Update document title
    document.title = "Hamza's Portfolio | Digital Masterpieces";
    
    // Remove the initial loader after component mounts
    const loader = document.querySelector('.initial-loader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }
    
    // Make content visible
    document.documentElement.style.visibility = 'visible';
    
    // Initialize scroll animations and progress tracker
    const handleScroll = () => {
      // Scroll reveal animation
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
      
      // Show progress indicator after scrolling down a bit
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowProgress(true);
      } else {
        setShowProgress(false);
      }
      
      // Update active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + (window.innerHeight / 3);
      
      // Set home as default when at the top
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }
      
      // Check other sections
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on page load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white" ref={containerRef}>
      {/* Progress bar at the top of the page */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple to-neon-blue z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      <Header />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* Enhanced floating nav indicator */}
      <motion.div 
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: showProgress ? 1 : 0, 
          x: showProgress ? 0 : 50 
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="h-[150px] w-1 bg-white/10 rounded-full relative overflow-hidden">
            <motion.div 
              className="absolute top-0 w-1 bg-gradient-to-b from-neon-purple to-neon-blue rounded-full"
              style={{ 
                scaleY: scrollYProgress,
                transformOrigin: "top" 
              }}
            ></motion.div>
            
            {/* Glowing dot that follows scroll progress */}
            <motion.div
              className="absolute w-3 h-3 -left-1 bg-neon-purple rounded-full shadow-[0_0_10px_rgba(139,92,246,0.7)]"
              style={{ 
                top: scrollYProgress.get() * 150 - 6,
              }}
            ></motion.div>
          </div>
          
          <div className="flex flex-col gap-3">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`w-3 h-3 rounded-full transition-all duration-300 relative group`}
                whileHover={{ scale: 1.3 }}
                initial={false}
              >
                <span 
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    activeSection === section 
                      ? 'bg-gradient-to-r from-neon-purple to-neon-blue scale-100' 
                      : 'bg-white/20 scale-100 group-hover:bg-white/40'
                  }`}
                ></span>
                
                {/* Label that appears on hover */}
                <motion.span 
                  className="absolute right-5 top-0 bg-black/80 text-white px-2 py-1 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.span>
                
                {/* Glow effect when active */}
                {activeSection === section && (
                  <span className="absolute inset-0 rounded-full bg-neon-purple/30 animate-pulse-slow blur-sm"></span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Fixed corner decoration elements */}
      <div className="fixed top-0 right-0 w-80 h-80 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-neon-purple/5 rounded-bl-full"></div>
      </div>
      <div className="fixed bottom-0 left-0 w-80 h-80 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-full bg-neon-blue/5 rounded-tr-full"></div>
      </div>
    </div>
  );
};

export default Index;
