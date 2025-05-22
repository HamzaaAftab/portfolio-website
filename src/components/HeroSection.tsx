
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
      
      heroRef.current.style.setProperty('--mouse-x', String(x * 20));
      heroRef.current.style.setProperty('--mouse-y', String(y * 20));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Trigger animation after a small delay for smoother entry
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center py-20 overflow-hidden"
      style={{
        backgroundPosition: 'calc(50% + var(--mouse-x, 0) * 1px) calc(50% + var(--mouse-y, 0) * 1px)',
      }}
    >
      {/* Enhanced 3D parallax effect based on mouse position */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-hero-glow opacity-70 animate-pulse-glow"></div>
      </div>
      
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"
        style={{
          transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/30"></div>
      </div>
      
      {/* Enhanced animated particles with varying speeds and parallax effect */}
      <div className="particle-container absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => {
          // Calculate varying speeds and delays for more natural movement
          const speed = 5 + Math.random() * 20;
          const delay = Math.random() * 5;
          const size = Math.random() * 4 + 1;
          const depth = Math.random(); // Use for parallax effect
          
          return (
            <motion.div 
              key={i}
              className={`absolute rounded-full ${i % 3 === 0 ? 'bg-neon-purple/30' : i % 3 === 1 ? 'bg-neon-blue/30' : 'bg-white/20'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                filter: `blur(${Math.random() * 2}px)`,
                x: mousePosition.x * -20 * depth,
                y: mousePosition.y * -20 * depth,
              }}
              animate={{
                y: ["0%", "100%", "0%"],
                x: [`${-10 + Math.random() * 20}%`, `${-10 + Math.random() * 20}%`, `${-10 + Math.random() * 20}%`],
              }}
              transition={{
                duration: speed,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
      
      <motion.div 
        className="container relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="font-display font-bold text-4xl md:text-5xl lg:text-7xl mb-6 tracking-tight"
          variants={itemVariants}
        >
          <span className="block">
            Hi, I'm <span className="text-gradient animate-text-shimmer">Hamza</span>
          </span>
          <motion.span 
            className="block text-gradient mt-1"
            variants={itemVariants}
            style={{ animationDuration: '3s' }}
          >
            Crafting Digital Masterpieces
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="max-w-xl mx-auto text-gray-300 text-lg md:text-xl mb-10"
          variants={itemVariants}
        >
          I'm a fullstack developer specializing in building exceptional digital experiences that blend creativity with technical excellence.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <Button 
            className="bg-gradient-to-r from-neon-purple to-neon-blue text-white px-8 py-6 border-0 hover:shadow-neon-glow transition-all duration-300 transform hover:scale-105 relative group overflow-hidden"
            onClick={scrollToAbout}
          >
            <span className="relative z-10">View my work</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -inset-x-full bottom-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer"></span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon-purple to-neon-blue opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></span>
          </Button>
         
        </motion.div>
      </motion.div>
      
      <motion.a 
        href="#about"
        className="absolute bottom-4 left-3/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-gray-400 hover:text-white transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="mb-2">Scroll to explore</span>
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
      
      {/* Decorative corner elements that respond to mouse movement */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-neon-purple/30 opacity-40"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-neon-blue/30 opacity-40"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
    </section>
  );
};

export default HeroSection;
