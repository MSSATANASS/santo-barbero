import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isVisible: boolean;
  onNavigate: (section: string) => void;
  onAdminClick: () => void;
}

const BottomNavigation: React.FC<Props> = ({ isVisible, onNavigate, onAdminClick }) => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [tapCount, setTapCount] = useState(0);
  const [lastTap, setLastTap] = useState(0);

  const navItems = [
    { id: 'inicio', icon: '🏠', label: 'Inicio' },
    { id: 'servicios', icon: '✂️', label: 'Servicios' },
    { id: 'lealtad', icon: '⭐', label: 'Lealtad' },
    { id: 'reservar', icon: '📅', label: 'Reservar' },
  ];

  // Detectar scroll para resaltar sección activa
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'lealtad', 'galeria', 'contacto'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Easter egg: 5 taps en logo para abrir admin
  const handleLogoTap = () => {
    const now = Date.now();
    if (now - lastTap < 500) {
      setTapCount(prev => prev + 1);
      if (tapCount >= 4) {
        onAdminClick();
        setTapCount(0);
      }
    } else {
      setTapCount(1);
    }
    setLastTap(now);
  };

  const handleClick = (id: string) => {
    if (id === 'reservar') {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(id);
    onNavigate(id);
  };

  if (!isVisible) return null;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-[#1f1a17] border-t border-[#c5a47e]/30 z-40 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
    >
      <div className="flex justify-around items-center py-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all min-w-[56px] active:scale-95 ${
              activeSection === item.id
                ? 'text-[#c5a47e]'
                : 'text-gray-500'
            }`}
          >
            <span className="text-xl mb-0.5">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
        
        {/* Logo secreto para admin */}
        <button
          onClick={handleLogoTap}
          className="flex flex-col items-center py-2 px-3 text-gray-600 active:scale-95"
        >
          <span className="text-xl mb-0.5">⚙️</span>
          <span className="text-[10px] font-medium">Más</span>
        </button>
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
