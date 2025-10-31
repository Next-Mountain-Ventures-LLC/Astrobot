import React from 'react';
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  links: Array<{
    href: string;
    label: string;
    isButton?: boolean;
    variant?: string;
  }>;
}

// Super simple mobile menu with fixed styling
export const MobileMenu: React.FC<MobileMenuProps> = ({ links }) => {
  // We're using React's built-in state for simplicity
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Toggle menu open/closed
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="md:hidden relative">
      {/* Menu Button */}
      <button 
        onClick={toggleMenu} 
        className="p-2 text-white"
        aria-label="Toggle mobile menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Dropdown - Using conditional rendering for simplicity */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 64px)',
            backgroundColor: '#121218',
            zIndex: 50,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={closeMenu}
              style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 600,
                padding: link.isButton ? '1rem 1.5rem' : '1rem 0',
                borderRadius: link.isButton ? '0.375rem' : '0',
                backgroundColor: link.isButton ? '#ef4444' : 'transparent',
                textDecoration: 'none',
                textAlign: link.isButton ? 'center' : 'left',
                borderBottom: link.isButton ? 'none' : '1px solid rgba(255,255,255,0.1)',
                display: 'block',
                width: '100%'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};