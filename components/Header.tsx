import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#galeria', label: 'Galería' },
    { href: '#barberos', label: 'Barberos' },
    { href: '#tienda', label: 'Tienda' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1a1a1a]/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#inicio" className="flex items-center hover:scale-105 transition-transform duration-300">
            <img src="/logo.png" alt="Santo Barbero" className="h-10 md:h-14 w-auto" />
          </a>

          <nav className="hidden md:flex items-center space-x-8" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#c5a47e] transition-colors duration-300 font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="ml-4 inline-block bg-[#c5a47e] text-gray-900 font-bold py-2 px-4 rounded-md tracking-wider uppercase transition-all duration-300 hover:bg-[#b5946e] hover:scale-105"
              data-analytics="cta_reservar_header"
            >
              Reservar
            </a>
          </nav>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-[#c5a47e] focus:outline-none"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4" id="mobile-menu">
            <nav className="flex flex-col space-y-4" aria-label="Navegación móvil">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-[#c5a47e] transition-colors duration-300 font-medium text-center py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-900 bg-[#c5a47e] font-bold text-center py-2 rounded-md tracking-wider uppercase transition-all duration-300 hover:bg-[#b5946e]"
                data-analytics="cta_reservar_header_mobile"
              >
                Reservar
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
