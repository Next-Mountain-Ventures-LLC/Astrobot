import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  links: Array<{
    href: string;
    label: string;
    isButton?: boolean;
    variant?: string;
  }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button 
        className="p-2 rounded-md text-foreground hover:bg-secondary/80 focus:outline-none z-[60] relative"
        onClick={toggleMenu} 
        aria-label="Toggle menu"
      >
        <Menu className={`h-6 w-6 transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
        <X className={`h-6 w-6 absolute top-2 left-2 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90'}`} />
      </button>

      {/* No overlay needed since we're using full page menu */}

      {/* Full-page menu */}
      <div
        className={`fixed inset-0 z-50 w-full h-full bg-[#121218] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/20 fixed top-0 w-full bg-[#121218] shadow-sm">
          <a href="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-1.5 rounded-md border border-primary/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            </div>
            <span className="font-heading font-bold tracking-widest">ASTROBOT.DESIGN</span>
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex flex-col px-6 pt-24 pb-8 space-y-8 flex-grow">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={handleLinkClick}
              className={
                link.isButton
                  ? "bg-accent text-accent-foreground py-4 px-6 rounded-md font-semibold text-center text-2xl"
                  : "py-4 text-2xl font-semibold text-foreground hover:text-primary transition-colors border-b border-border/10 w-full"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};