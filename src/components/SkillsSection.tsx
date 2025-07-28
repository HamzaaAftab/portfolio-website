
import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SkillCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card 
        className={`glass-panel p-6 hover:shadow-neon-glow transition-all duration-300 thin-border group reveal delay-${index * 100 + 200}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-start relative overflow-hidden h-full z-10">
          <motion.div 
            className="bg-white/5 p-3 rounded-lg mb-4 text-neon-purple transition-transform duration-300"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -5, 5, 0] : 0
            }}
            transition={{ 
              scale: { duration: 0.3 },
              rotate: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            {icon}
          </motion.div>
          <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
          
          {/* Animated gradient on hover */}
          <motion.div 
            className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-r from-neon-purple/0 to-neon-blue/0 rounded-full blur-xl transition-all duration-500"
            animate={{ 
              width: isHovered ? '100%' : '12px',
              height: isHovered ? '100%' : '12px',
              opacity: isHovered ? 0.3 : 0
            }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          
          {/* Skill level indicator that appears on hover */}
          {isHovered && (
            <motion.div 
              className="absolute bottom-0 right-0 flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  className={`w-1.5 h-6 rounded-full ${i < 4 ? 'bg-neon-purple' : 'bg-white/20'}`}
                  initial={{ height: 0 }}
                  animate={{ height: 6 + i * 3 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                ></motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Create a scroll-linked animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
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
    if (currentSection) observer.observe(currentSection);
    
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);
  
  const skills = [
  {
    icon: "⚛️",
    title: "Frontend Development",
    description: "Expertise in React, Next.js, TypeScript, and modern CSS frameworks like Tailwind."
  },
  {
    icon: "🚀",
    title: "Backend Development",
    description: "Building robust APIs and services using FastAPI, Node.js, Express, and databases."
  },
  {
    icon: "🤖",
    title: "AI Integration",
    description: "Using AI tools like Langchain, Langgraph to build smart and helpful applications."
  },
  {
    icon: "🧠",
    title: "Agentic AI",
    description: "Working with AI agents to automate simple tasks and actions."
  },
  {
    icon: "🛠️",
    title: "Performance Optimization",
    description: "Ensuring applications run smoothly with optimized rendering and efficient algorithms."
  }
];

  return (
    <section id="skills" className="py-24 bg-black/50 relative reveal" ref={sectionRef}>
      {/* Parallax background effect */}
      <motion.div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMyIDAgMTQgNi4yNjggMTQgMTRIMzZ6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')",
          backgroundSize: "60px 60px",
          y: backgroundY 
        }}
      />
      
      {/* Background accent with animation */}
      <div className="absolute bottom-0 left-0 translate-y-1/2 w-64 h-64 bg-neon-blue/20 rounded-full blur-[100px] opacity-50 animate-pulse-glow"></div>
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-neon-purple/20 rounded-full blur-[80px] opacity-30 animate-pulse-slow"></div>
      
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
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        ))}
      </div>
      
      <div className="container relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14 reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Badge 
            variant="outline" 
            className="bg-white/5 text-gray-300 mb-6 border-white/10 px-4 py-1.5 reveal delay-100"
          >
            My expertise
          </Badge>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight reveal delay-200">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          
          <p className="text-gray-300 reveal delay-300">
            I've spent years refining my skills across various technologies, focusing on creating
            scalable, accessible, and performant applications.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              index={index}
            />
          ))}
        </div>
        
        {/* Floating tech icons in the background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['</', '{...}', '()', '[]', '=>', '&&', '||'].map((symbol, i) => (
            <motion.div
              key={i}
              className="absolute text-white/5 font-mono text-xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative horizontal line with animated gradient */}
      <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
        <motion.div 
          className="w-full h-full bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
