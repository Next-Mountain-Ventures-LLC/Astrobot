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

const menuStyles = {
  container: {
    position: 'fixed',
    top: '64px', // Adjust based on your header height
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#121218',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column' as const,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '3rem 2rem 2rem',
    gap: '2rem'
  },
  link: {
    padding: '1.25rem 0',
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    transition: 'color 0.2s'
  },
  buttonLink: {
    backgroundColor: 'rgb(239, 68, 68)',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '0.375rem',
    fontWeight: 600,
    fontSize: '1.5rem',
    textAlign: 'center' as const
  }
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
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

      {isOpen && (
        <div style={menuStyles.container}>
          <nav style={menuStyles.nav}>
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={handleLinkClick}
                style={link.isButton ? menuStyles.buttonLink : menuStyles.link}
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