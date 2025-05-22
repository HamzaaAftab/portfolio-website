
import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Circle, ExternalLink } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create a scroll-linked animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);
  
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
    const currentForm = formRef.current;
    const currentCard = cardRef.current;
    
    if (currentSection) observer.observe(currentSection);
    if (currentForm) observer.observe(currentForm);
    if (currentCard) observer.observe(currentCard);
    
    return () => {
      if (currentSection) observer.unobserve(currentSection);
      if (currentForm) observer.unobserve(currentForm);
      if (currentCard) observer.unobserve(currentCard);
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      
      // In a real application, this would send the form data to a backend service
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out! I'll get back to you soon.",
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  // Fancy input field animation variants
  const inputVariants = {
    focus: { scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.5)' },
    blur: { scale: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }
  };
  
  return (
    <motion.section 
      id="contact" 
      className="py-24 relative reveal" 
      ref={sectionRef}
      style={{ opacity, y }}
    >
      {/* Enhanced animated background accent */}
      <div className="absolute bottom-0 right-0 translate-y-1/2 w-72 h-72 bg-neon-blue/20 rounded-full blur-[100px] opacity-50 animate-pulse-glow"></div>
      <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-neon-purple/20 rounded-full blur-[100px] opacity-30 animate-pulse-slow"></div>
      
      {/* Animated particles */}
      <div className="particle-container absolute inset-0">
        {[...Array(20)].map((_, i) => (
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
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        ))}
      </div>
      
      {/* Decorative grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full" style={{ 
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkgMEgxYy0uNiAwLTEgLjQtMSAxdjU4YzAgLjYuNCAxIDEgMWg1OGMuNiAwIDEtLjQgMS0xVjFjMC0uNi0uNC0xLTEtMXptLTEgNThIMlYyaDU2djU2eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwxKSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+Cg==')",
          backgroundSize: "30px 30px",
        }}></div>
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
            Get in touch
          </Badge>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight reveal delay-200">
            Let's <span className="text-gradient">collaborate</span>
          </h2>
          
          <p className="text-gray-300 reveal delay-300">
            Have a project in mind or want to discuss potential opportunities? 
            I'm always open to new challenges and collaborations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative reveal delay-300" 
            ref={cardRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple/50 to-neon-blue/50 rounded-lg opacity-20 blur-md"></div>
            <Card className="glass-panel p-8 relative group">
              <motion.h3 
                className="font-display text-2xl font-semibold mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Contact Information
              </motion.h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="transform transition-transform duration-500 hover:translate-x-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-white font-medium">hamzaaftab992@gmail.com</p>
                </motion.div>
                <motion.div 
                  className="transform transition-transform duration-500 hover:translate-x-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="text-white font-medium">Karachi, Pakistan</p>
                </motion.div>
                <motion.div 
                  className="transform transition-transform duration-500 hover:translate-x-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-gray-400 mb-1">Availability</p>
                  <p className="text-white font-medium">Open for freelance & full-time opportunities</p>
                </motion.div>
                <motion.div 
                  className="transform transition-all duration-500"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-gray-400 mb-1">Social</p>
                  <div className="flex gap-4 mt-2">
                    {['GitHub', 'LinkedIn'].map((social, index) => (
                      <motion.a 
                        key={social} 
                        href="https://github.com/HamzaaAftab?tab=repositories" 
                        className="text-gray-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-neon-purple hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1 group"
                        whileHover={{ y: -2 }}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {social}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Animated corner accents */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-neon-purple/30 group-hover:border-neon-purple/50 transition-colors duration-300"></div>
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-neon-blue/30 group-hover:border-neon-blue/50 transition-colors duration-300"></div>
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-neon-blue/30 group-hover:border-neon-blue/50 transition-colors duration-300"></div>
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-neon-purple/30 group-hover:border-neon-purple/50 transition-colors duration-300"></div>
              
              {/* Status indicator */}
              <div className="absolute top-8 right-8 flex items-center gap-2">
                <div className="relative">
                  <Circle className="w-3 h-3 text-green-500 fill-green-500" />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-green-500 blur-sm"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <span className="text-xs text-green-400">Available for work</span>
              </div>
            </Card>
          </motion.div>
          
          <motion.div 
            className="reveal delay-400"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  className="reveal delay-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <motion.div
                    initial="blur"
                    whileFocus="focus"
                    animate="blur"
                    variants={inputVariants}
                  >
                    <Input 
                      id="name" 
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Your name" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-neon-purple/50 transition-all duration-300 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.3)]"
                      required
                    />
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="reveal delay-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <motion.div
                    initial="blur"
                    whileFocus="focus"
                    animate="blur"
                    variants={inputVariants}
                  >
                    <Input 
                      id="email" 
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      type="email" 
                      placeholder="your@email.com" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-neon-purple/50 transition-all duration-300 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.3)]"
                      required
                    />
                  </motion.div>
                </motion.div>
              </div>
              
              <motion.div 
                className="reveal delay-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <motion.div
                  initial="blur"
                  whileFocus="focus"
                  animate="blur"
                  variants={inputVariants}
                >
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-neon-purple/50 transition-all duration-300 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.3)]"
                    required
                  />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="reveal delay-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <motion.div
                  initial="blur"
                  whileFocus="focus"
                  animate="blur"
                  variants={inputVariants}
                >
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..." 
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-neon-purple/50 transition-all duration-300 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.3)] min-h-[150px]"
                    required
                  />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="reveal delay-900"
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-white py-6 relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                  
                  {/* Animated ripple effect on click */}
                  {isSubmitting && (
                    <motion.span
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/30"
                      animate={{ 
                        scale: [0, 10],
                        opacity: [1, 0]
                      }}
                      transition={{ duration: 1 }}
                    />
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
