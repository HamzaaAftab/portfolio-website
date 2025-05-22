
import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll-linked animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  // Rotating card effect based on mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
      setCardRotation({ 
        x: -y * 10, // Reversed for natural tilt effect
        y: x * 10 
      });
    };
    
    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
      cardRef.current.addEventListener('mouseleave', () => setCardRotation({ x: 0, y: 0 }));
    }
    
    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
        cardRef.current.removeEventListener('mouseleave', () => setCardRotation({ x: 0, y: 0 }));
      }
    };
  }, [cardRef]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const currentSection = sectionRef.current;
    const currentText = textRef.current;
    const currentImage = imageRef.current;
    
    if (currentSection) observer.observe(currentSection);
    if (currentText) observer.observe(currentText);
    if (currentImage) observer.observe(currentImage);
    
    return () => {
      if (currentSection) observer.unobserve(currentSection);
      if (currentText) observer.unobserve(currentText);
      if (currentImage) observer.unobserve(currentImage);
    };
  }, []);
  
  return (
    <motion.section 
      id="about" 
      className="py-24 relative reveal" 
      ref={sectionRef}
      style={{ opacity, y }}
    >
      {/* Enhanced background accent with pulsating animation */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-72 h-72 bg-neon-purple/20 rounded-full blur-[100px] opacity-50 animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 w-60 h-60 bg-neon-blue/20 rounded-full blur-[120px] opacity-40 animate-pulse-slow"></div>
      
      {/* Animated particles */}
      <div className="particle-container absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        ))}
      </div>
      
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div 
            className="order-2 lg:order-1 reveal delay-200" 
            ref={textRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Badge 
              variant="outline" 
              className="bg-white/5 text-gray-300 mb-6 border-white/10 px-4 py-1.5 reveal delay-100"
            >
              About me
            </Badge>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight reveal delay-200">
              Hi, I'm <span className="text-gradient">Hamza</span>
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <motion.p 
                className="reveal delay-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                I'm a passionate developer focused on creating elegant solutions to complex problems. With a background in both design and development, I bring a unique perspective to every project.
              </motion.p>
              <motion.p 
                className="reveal delay-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                My work is centered around the belief that great technology should feel invisible, enhancing the user's experience without getting in the way. I specialize in React, TypeScript, and Node.js, with a strong focus on performance and accessibility.
              </motion.p>
              <motion.p 
                className="reveal delay-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing and mentoring.
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 reveal delay-300 flex justify-center" 
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div 
              className="relative max-w-md w-full h-[400px] perspective"
              ref={cardRef}
            >
              {/* Enhanced image card with 3D hover effect */}
              <div className="absolute -inset-2.5 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg opacity-20 blur-lg animate-pulse-glow"></div>
              <motion.div 
                className="glass-panel relative overflow-hidden h-full w-full group transform-style-3d"
                style={{ 
                  rotateX: cardRotation.x,
                  rotateY: cardRotation.y,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-blue/10"></div>
                <div 
                  className="h-full w-full bg-cover bg-center transition-transform duration-10000 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url('/lovable-uploads/15c0dbbe-ddf9-48eb-940a-e632d6246e22.png')`, 
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                
                {/* Enhanced animated corner accents */}
                <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-neon-purple/80 group-hover:w-10 group-hover:h-10 transition-all duration-500"></div>
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-neon-blue/80 group-hover:w-10 group-hover:h-10 transition-all duration-500"></div>
                <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-neon-blue/80 group-hover:w-10 group-hover:h-10 transition-all duration-500"></div>
                <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-neon-purple/80 group-hover:w-10 group-hover:h-10 transition-all duration-500"></div>
                
                {/* Lighting effect that follows mouse */}
                <div 
                  className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ 
                    backgroundPosition: `${50 + mousePosition.x * 100}% ${50 + mousePosition.y * 100}%`,
                    backgroundSize: '200% 200%',
                  }}
                ></div>
              </motion.div>
              
              {/* Floating elements around the image */}
              <motion.div 
                className="absolute -right-10 -top-10 w-20 h-20 border-2 border-dashed border-neon-purple/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <motion.div 
                className="absolute -left-5 -bottom-5 w-10 h-10 border border-neon-blue/30 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
