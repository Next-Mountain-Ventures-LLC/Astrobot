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

// Create menu styles using plain HTML/CSS for maximum compatibility
export const MobileMenu: React.FC<MobileMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  // Handle link clicks
  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="md:hidden">
      {/* Menu toggle button */}
      <button 
        className="p-2 rounded-md text-foreground hover:bg-secondary/80 focus:outline-none z-[100] relative"
        onClick={toggleMenu} 
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu overlay */}
      <div 
        id="mobile-menu"
        style={{
          display: isOpen ? 'block' : 'none',
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#121218',
          backgroundImage: 'none',
          zIndex: 50,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          overflow: 'auto'
        }}
      >
        {/* Menu content */}
        <nav style={{ padding: '2rem', paddingTop: '3rem' }}>
          {links.map((link, index) => (
            <div key={index} style={{ marginBottom: '2rem' }}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  padding: link.isButton ? '1rem 1.5rem' : '1.25rem 0',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'white',
                  textDecoration: 'none',
                  borderBottom: link.isButton ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  width: '100%',
                  backgroundColor: link.isButton ? 'rgb(239, 68, 68)' : 'transparent',
                  borderRadius: link.isButton ? '0.375rem' : '0',
                  textAlign: link.isButton ? 'center' : 'left'
                }}
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};