import React, { useState } from 'react';
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Toggle button */}
      <button 
        className="p-2 rounded-md text-foreground hover:bg-secondary/80 focus:outline-none z-[100] relative"
        onClick={toggleMenu} 
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile menu */}
      <div 
        className={`fixed top-16 left-0 right-0 bottom-0 z-50 border-t border-border ${isOpen ? 'block' : 'hidden'}`}
        style={{ backgroundColor: '#121218' }}
      >
        <div style={{ backgroundColor: '#121218' }} className="h-full w-full p-8">
          <nav className="flex flex-col gap-8 pt-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={handleLinkClick}
                className={
                  link.isButton
                    ? "bg-accent text-accent-foreground py-4 px-6 rounded-md font-semibold text-center text-2xl"
                    : "py-5 text-2xl font-semibold text-foreground hover:text-primary transition-colors border-b border-border/30 w-full"
                }
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};