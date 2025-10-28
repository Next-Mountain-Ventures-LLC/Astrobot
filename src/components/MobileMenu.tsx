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
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMenu} 
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Slide-out menu */}
      <div
        className={`fixed top-0 right-0 z-50 w-64 h-full bg-gradient-to-r from-background/80 to-background border-l border-primary/10 backdrop-blur-xl shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex flex-col px-4 py-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={handleLinkClick}
              className={
                link.isButton
                  ? "bg-accent text-accent-foreground py-3 px-4 my-2 rounded-md font-medium text-center"
                  : "py-3 border-b border-border/20 text-lg font-medium text-foreground hover:text-primary transition-colors bg-background/60 backdrop-blur-sm rounded px-2"
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