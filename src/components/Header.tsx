
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar transparency
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];
  
  const getSectionId = (href: string) => href.replace('#', '');
  
  return (
    <motion.header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-expo-out", 
        isScrolled ? "py-3 bg-black/80 backdrop-blur-md border-b border-white/5" : "py-6"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container flex justify-between items-center">
        <motion.a 
          href="#" 
          className="text-2xl font-display font-semibold group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-gradient relative inline-block">
            HAMZA
            <motion.span 
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-neon-purple to-neon-blue"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </span>
        </motion.a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => {
            const sectionId = getSectionId(item.href);
            return (
              <motion.a 
                key={item.name} 
                href={item.href}
                className={cn(
                  "text-sm transition-colors duration-300 relative",
                  activeSection === sectionId ? "text-white" : "text-gray-300"
                )}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                {activeSection === sectionId && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-purple"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              className="bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0 flex gap-1 items-center group relative overflow-hidden"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="relative z-10 flex items-center">
                Get in touch
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              
              {/* Animated gradient border on hover */}
              <span className="absolute inset-0 border border-transparent rounded-md overflow-hidden">
                <span className="absolute inset-x-0 -bottom-2 h-[2px] bg-gradient-to-r from-neon-purple via-white to-neon-blue opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" style={{ backgroundSize: '200% 100%' }}></span>
              </span>
            </Button>
          </motion.div>
        </nav>
        
        {/* Mobile menu button */}
        <motion.button 
          className="md:hidden text-white p-1 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      {/* Mobile menu with enhanced animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.name} 
                  href={item.href}
                  className={`text-gray-300 hover:text-white py-4 px-4 hover:bg-white/5 rounded-md transition-all duration-300 ${
                    activeSection === getSectionId(item.href) ? "text-white bg-white/5 border-l-2 border-neon-purple pl-6" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
              >
                <Button 
                  className="bg-gradient-to-r from-neon-purple to-neon-blue text-white mt-2 w-full py-6"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get in touch
                </Button>
              </motion.div>
              
              {/* Social links */}
              <motion.div
                className="mt-8 flex justify-center gap-6 border-t border-white/10 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 + 0.2 }}
              >
                {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map((social, i) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
