
import React from 'react';
import SectionTitle from './SectionTitle';

const packages = [
  {
    name: 'Ritual Esencial',
    price: '$450 MXN',
    description: 'La base de un estilo impecable. Precisión y cuidado para el hombre que valora los detalles.',
    features: ['Corte de autor con diagnóstico', 'Styling con productos premium', 'Masaje capilar express'],
    popular: false,
    icon: '✂️',
    color: 'from-amber-900/20 to-amber-800/10'
  },
  {
    name: 'Experiencia Santo',
    price: '$650 MXN',
    description: 'El servicio preferido por nuestros clientes. Una transformación completa que redefine tu presencia.',
    features: ['Todo del Ritual Esencial', 'Diseño y arreglo de barba con navaja', 'Toallas calientes y aromaterapia', 'Bebida de cortesía'],
    popular: true,
    icon: '👑',
    color: 'from-yellow-900/30 to-yellow-800/20'
  },
  {
    name: 'Tratamiento VIP',
    price: '$900 MXN',
    description: 'El máximo lujo en cuidado masculino. Un momento de relajación y renovación total para ti.',
    features: ['Todo de la Experiencia Santo', 'Tratamiento capilar de hidratación profunda', 'Exfoliación facial', 'Perfilado de ceja (opcional)'],
    popular: false,
    icon: '💎',
    color: 'from-purple-900/20 to-purple-800/10'
  },
];

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-20 bg-[#1f1a17] relative overflow-hidden">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a47e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
      }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="Nuestros Paquetes" />
        <p className="text-center text-gray-400 mt-4 mb-12 max-w-2xl mx-auto">
          Elige el servicio que mejor se adapte a tu estilo y necesidades. Todos incluyen atención personalizada de nuestros maestros barberos.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 items-stretch">
          {packages.map((pkg, index) => (
            <div
              key={`package-${index}`}
              className={`relative bg-gradient-to-br ${pkg.color} backdrop-blur-sm bg-[#2a211c]/90 p-8 border ${pkg.popular ? 'border-[#c5a47e] shadow-xl shadow-[#c5a47e]/20' : 'border-gray-700/50'} rounded-xl flex flex-col transition-all duration-500 hover:-translate-y-3 ${pkg.popular ? 'scale-105 md:scale-110' : 'hover:border-[#c5a47e] hover:shadow-lg'}`}
            >
              {pkg.popular && (
                <>
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c5a47e] to-[#d4b48e] text-gray-900 text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    ⭐ Más Popular
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c5a47e]/10 to-transparent rounded-xl pointer-events-none"></div>
                </>
              )}
              
              {/* Icono del paquete */}
              <div className="text-6xl text-center mb-4 filter drop-shadow-lg">
                {pkg.icon}
              </div>
              
              <h3 className="text-2xl font-semibold font-cinzel text-center text-[#e0e0e0] tracking-wide">{pkg.name}</h3>
              
              <div className="flex items-center justify-center my-4">
                <span className="text-4xl font-bold text-[#c5a47e]">{pkg.price}</span>
              </div>
              
              <p className="mt-2 text-center text-gray-400 flex-grow leading-relaxed">
                {pkg.description}
              </p>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>
              
              <ul className="space-y-3 text-gray-300 mb-8">
                {pkg.features.map((feature, i) => (
                    <li key={`feature-${index}-${i}`} className="flex items-start group">
                      <CheckIcon className="h-5 w-5 text-[#c5a47e] mr-3 flex-shrink-0 mt-1 transition-transform group-hover:scale-125" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                ))}
              </ul>
              
              <a 
                href="#contacto" 
                className={`mt-auto text-center ${pkg.popular ? 'bg-[#c5a47e] text-gray-900 hover:bg-[#b5946e]' : 'bg-transparent border-2 border-[#c5a47e] text-[#c5a47e] hover:bg-[#c5a47e] hover:text-gray-900'} font-bold py-3 px-8 rounded-lg tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                {pkg.popular ? '🔥 Agendar Ahora' : 'Agendar'}
              </a>
            </div>
          ))}
        </div>

        {/* Sección de servicios adicionales */}
        <div className="mt-20 pt-12 border-t border-gray-700/50">
          <h3 className="text-2xl md:text-3xl font-bold font-cinzel text-center text-[#e0e0e0] mb-8">
            Servicios Adicionales
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Corte Infantil', price: '$300', icon: '👦' },
              { name: 'Tinte de Barba', price: '$200', icon: '🎨' },
              { name: 'Rasurado Clásico', price: '$250', icon: '🪒' },
              { name: 'Cejas', price: '$150', icon: '👁️' },
            ].map((service, idx) => (
              <div 
                key={`addon-${idx}`}
                className="bg-[#2a211c]/50 border border-gray-700/50 rounded-lg p-4 text-center hover:border-[#c5a47e] transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <h4 className="text-[#e0e0e0] font-semibold mb-1">{service.name}</h4>
                <p className="text-[#c5a47e] font-bold">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
