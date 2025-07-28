import React from 'react';
import { ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-16 border-t border-white/10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="font-display font-bold text-2xl mb-2">
              <span className="text-gradient">PORTFOLIO</span>
            </h2>
            <p className="text-gray-400">Crafting digital masterpieces since 2023</p>
          </div>

          <div className="flex gap-8">
            <div>
              <p className="text-sm font-medium text-white mb-4">Navigation</p>
              <nav className="flex flex-col gap-2">
                <button onClick={() => scrollToSection('about')} className="text-sm text-gray-400 hover:text-white transition-colors text-left">About</button>
                <button onClick={() => scrollToSection('skills')} className="text-sm text-gray-400 hover:text-white transition-colors text-left">Skills</button>
                <button onClick={() => scrollToSection('projects')} className="text-sm text-gray-400 hover:text-white transition-colors text-left">Projects</button>
                <button onClick={() => scrollToSection('contact')} className="text-sm text-gray-400 hover:text-white transition-colors text-left">Contact</button>
              </nav>
            </div>

            <div>
              <p className="text-sm font-medium text-white mb-4">Connect</p>
              <nav className="flex flex-col gap-2">
                <a href="https://github.com" className="text-sm text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/hamza-aftab-8a5685302/" className="text-sm text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/5">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>

          <a
            href="#"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Back to top
            <ChevronUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
