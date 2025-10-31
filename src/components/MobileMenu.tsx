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
        className="p-2 rounded-md text-foreground hover:bg-secondary/80 focus:outline-none z-[100] relative"
        onClick={toggleMenu} 
        aria-label="Toggle menu"
      >
        <Menu className={`h-6 w-6 transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
        <X className={`h-6 w-6 absolute top-2 left-2 transition-all duration-300 text-foreground ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90'}`} />
      </button>

      {/* Mobile menu that appears below the header */}
      {isOpen && (
        <div
          className="fixed top-16 left-0 right-0 bottom-0 z-50 w-full bg-background transform flex flex-col animate-slideDown border-t border-border/20"
        >
          <nav className="flex flex-col px-6 pt-8 pb-8 space-y-6 flex-grow">
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
      )}
    </div>
  );
};