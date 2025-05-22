import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, ChevronDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, 50]);

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
    if (currentSection) {
      observer.observe(currentSection);
    }

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  const projects: Project[] = [
    {
      title: "Furniro E Commerce Platform",
      category: "Web Application",
      description: "An online furniture store with modern design, real-time cart updates, and Sanity CMS integration for dynamic content.",
      image: "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
      link: "https://marketplace-hackathon-ecommerce-project.vercel.app/ ",
      technologies: ["Nextjs", "TypeScript", "Tailwind CSS", "Sanity CMS", "Stripe"]
    },
    {
      title: "AI Chatbot Assistant",
      category: "AI Integration",
      description: "An Agentic AI Chatbot using Streamlit, FastAPI and OpenAI API, GrokAPI",
      image: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
      link: "https://github.com/HamzaaAftab/ai-chatbot-with-streamlit-fastAPI-langGraph",
      technologies: ["Python", "OpenAI API", "FastAPI", "Streamlit", "Grok"]
    },
    {
      title: "Music School Platform",
      category: "Next.js Project",
      description: "A Comprehensive and Innovative UI Design for a Music School Platform",
      image: "https://music-school-hamza.vercel.app/ ",
      link: "#",
      technologies: ["Next.js", "Tailwind CSS", "Animated", "TypeScript", "Aeternity UI"]
    },
    {
      title: "AI Powered Code Reviewer",
      category: "MERN Stack Project",
      description: "MERN Stack Based AI Code Reviewer to help out developers in their coding journey.",
      image: "https://plus.unsplash.com/premium_photo-1683121718643-fb18d2668d53?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
      link: "https://github.com/HamzaaAftab/ai-code-reviewer-mern-geminiAPI",
      technologies: ["MERN Stack", "OpenAI", "Gemini"]
    }
  ];

  return (
    <motion.section 
      id="projects" 
      className="py-24 relative reveal"
      ref={sectionRef}
      style={{ opacity, y }}
    >
      {/* Background accent with animation */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-neon-blue/10 rounded-full blur-[100px] animate-pulse-slow"></div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgY3g9IjMwIiBjeT0iMzAiIHI9IjIiLz48L2c+PC9zdmc+')",
          backgroundSize: "30px 30px",
        }}></div>
      </div>

      <div className="container">
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
            My work
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight reveal delay-200">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-300 reveal delay-300">
            A selection of my recent work, showcasing my skills and passion for creating
            exceptional digital experiences.
          </p>
        </motion.div>

        {/* Mobile view: Carousel */}
        <div className="block lg:hidden mb-10">
          <Carousel className="w-full">
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="glass-panel overflow-hidden">
                      <div 
                        className="h-48 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.image})` }}
                      ></div>
                      <div className="p-5">
                        <Badge className="mb-2">{project.category}</Badge>
                        <h3 className="font-display font-semibold text-xl mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full">{tech}</span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs bg-white/5 px-2 py-1 rounded-full">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full">
                            View Project
                          </Button>
                        </a>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 bg-black/50 hover:bg-black/70 border-white/10" />
            <CarouselNext className="absolute right-2 bg-black/50 hover:bg-black/70 border-white/10" />
          </Carousel>
        </div>

        {/* Desktop view: Interactive project showcase */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          <div className="col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                ref={(el) => el && (itemRefs.current[index] = el)}
                className={`cursor-pointer py-6 px-4 lg:px-6 border-l-2 transition-all duration-500 reveal delay-${(index + 1) * 100} relative ${index === activeIndex ? 'border-neon-purple bg-white/5' : 'border-white/10'}`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Badge className={`mb-2 transition-all duration-300 ${index === activeIndex ? 'bg-white/10' : 'bg-transparent'}`}>
                  {project.category}
                </Badge>
                <h3 className={`font-display font-semibold text-xl mb-1 transition-all duration-300 ${index === activeIndex ? 'text-white' : 'text-gray-400'}`}>
                  {project.title}
                </h3>
                <p className={`text-sm transition-all duration-300 ${index === activeIndex ? 'text-gray-300' : 'text-gray-500'}`}>
                  {project.description}
                </p>
                {/* Indicator arrow that appears when active */}
                {index === activeIndex && (
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neon-purple"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="col-span-7 order-1 lg:order-2 reveal delay-200">
            <div className="sticky top-32">
              <motion.div 
                className="relative group perspective"
                layoutId="projectCard"
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <div className="absolute -inset-2.5 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <Card className="glass-panel relative overflow-hidden h-[400px] lg:h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="h-full"
                    >
                      <a
                        href={projects[activeIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-blue/10"></div>
                        <motion.div 
                          className="h-full w-full bg-cover bg-center transition-transform duration-10000 group-hover:scale-105"
                          style={{ backgroundImage: `url(${projects[activeIndex].image})` }}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.7 }}
                        ></motion.div>
                        <motion.div 
                          className="absolute inset-0 bg-black/30 flex items-end"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <div className="p-8 w-full transform transition-transform duration-500">
                            <h4 className="font-display text-2xl font-bold mb-2">{projects[activeIndex].title}</h4>
                            <p className="text-gray-200 mb-4">{projects[activeIndex].description}</p>
                            {/* Technology tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {projects[activeIndex].technologies.map((tech, i) => (
                                <motion.span 
                                  key={i} 
                                  className="text-xs bg-white/10 px-2 py-1 rounded-full"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                            <div className="flex gap-3">
                              <Button 
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm group animated-border relative"
                                onClick={() => setShowDetails(!showDetails)}
                              >
                                <span className="relative z-10 flex items-center">
                                  {showDetails ? 'Hide details' : 'View details'} 
                                  <motion.div
                                    animate={{ rotate: showDetails ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                  </motion.div>
                                </span>
                              </Button>
                              <Button 
                                className="bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0 group relative overflow-hidden"
                                asChild
                              >
                                <a href={projects[activeIndex].link} target="_blank" rel="noopener noreferrer">
                                  <span className="relative z-10 flex items-center">
                                    Visit project 
                                    <ExternalLink className="w-4 h-4 ml-1" />
                                  </span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          className="flex justify-center mt-16 reveal delay-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/5 px-8 py-6 relative overflow-hidden group"
          >
            <a href='https://github.com/HamzaaAftab?tab=repositories' target='_blank' className="relative z-10 flex items-center">
              View all projects
              <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-r from-neon-purple to-neon-blue opacity-20 group-hover:h-full transition-all duration-300"></span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;