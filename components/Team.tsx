
import React from 'react';
import SectionTitle from './SectionTitle';

const barbers = [
  {
    name: 'Javier "El Maestro"',
    specialty: 'Cortes Clásicos y Navaja',
    img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=400',
    experience: '15+ años',
    description: 'Especialista en cortes tradicionales con navaja y técnicas clásicas de barbería.'
  },
  {
    name: 'Marcos "El Artista"',
    specialty: 'Diseños Modernos y Fade',
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=400',
    experience: '8+ años',
    description: 'Experto en fades, degradados y diseños contemporáneos que marcan tendencia.'
  },
  {
    name: 'Carlos "El Bárbaro"',
    specialty: 'Cuidado de Barba y Afeitado',
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=400',
    experience: '12+ años',
    description: 'Maestro en el arte del afeitado clásico y cuidado integral de barba.'
  },
];

const Team: React.FC = () => {
  return (
    <section id="barberos" className="py-20 bg-[#1f1a17]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Nuestros Maestros Barberos" />
        <p className="text-center text-gray-400 mt-4 mb-12 max-w-2xl mx-auto">
          Conoce a los artistas detrás de cada transformación. Profesionales apasionados dedicados a tu estilo.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {barbers.map((barber, index) => (
            <div 
              key={`barber-${barber.name}`}
              className="text-center group bg-[#2a211c]/50 rounded-xl p-6 border border-gray-700/30 hover:border-[#c5a47e] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#c5a47e]/10"
            >
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-[#c5a47e] transition-all duration-500 shadow-lg">
                <img
                  src={barber.img}
                  alt={`Retrato de ${barber.name}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
                {/* Overlay con años de experiencia */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[#c5a47e] font-bold text-sm">
                    ⭐ {barber.experience}
                  </p>
                </div>
              </div>
              
              <h3 className="mt-6 text-xl font-bold font-cinzel text-[#e0e0e0] tracking-wide">
                {barber.name}
              </h3>
              
              <p className="mt-2 text-md text-[#c5a47e] font-semibold">
                {barber.specialty}
              </p>
              
              <p className="mt-3 text-sm text-gray-400 leading-relaxed px-2">
                {barber.description}
              </p>
              
              <a 
                href="#contacto" 
                className="mt-6 inline-block bg-transparent border-2 border-gray-600 text-gray-300 font-semibold py-2 px-6 rounded-lg text-sm tracking-wide transition-all duration-300 hover:border-[#c5a47e] hover:text-[#c5a47e] hover:scale-105"
              >
                Reservar con {barber.name.split(' ')[0]}
              </a>
            </div>
          ))}
        </div>

        {/* Sección de valores/características del equipo */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: '🏆',
              title: 'Certificados',
              description: 'Todos nuestros barberos tienen certificación profesional'
            },
            {
              icon: '🧼',
              title: 'Higiene Total',
              description: 'Herramientas esterilizadas y protocolos sanitarios estrictos'
            },
            {
              icon: '💬',
              title: 'Consulta Gratis',
              description: 'Asesoramos tu estilo antes de cada corte'
            },
          ].map((feature, idx) => (
            <div 
              key={`feature-${idx}`}
              className="text-center p-6 bg-[#2a211c]/30 rounded-lg border border-gray-700/30 hover:border-[#c5a47e]/50 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h4 className="text-[#e0e0e0] font-bold text-lg mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
