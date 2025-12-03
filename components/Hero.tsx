import React from 'react';
import Logo from './Logo';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Imagen de fondo - barbería profesional */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transform scale-105 animate-slow-zoom"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070')",
          backgroundPosition: 'center 40%'
        }}
      ></div>
      
      {/* Overlay con gradiente más sofisticado */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      
      {/* Logo centrado con animación flotante */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <Logo size="hero" animate={true} />
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 p-4 max-w-4xl mx-auto animate-slide-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-cinzel mb-6 tracking-wider" 
            style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>
          SANTO BARBERO
        </h1>
        
        <div className="w-32 h-1 bg-[#c5a47e] mx-auto mb-8"></div>
        
        <p className="text-lg md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-light" 
           style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          Donde la tradición del barbero se encuentra con el estilo del hombre moderno.{' '}
          <span className="block mt-2 text-[#c5a47e] font-semibold">Tu imagen es nuestra obra maestra.</span>
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contacto"
            className="inline-block bg-[#c5a47e] text-gray-900 font-bold py-4 px-10 rounded-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#b5946e] hover:scale-105 hover:shadow-2xl"
          >
            📅 Reservar Cita
          </a>
          <a
            href="#servicios"
            className="inline-block bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105"
          >
            Ver Servicios
          </a>
        </div>
        
        {/* Indicador de scroll */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      
      {/* Añadir estilos de animación */}
      <style>{`
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
      `}</style>
    </section>
  );
};

export default Hero;