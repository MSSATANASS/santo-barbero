
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';

// Imágenes profesionales de barbería de Unsplash
const images = [
  {
    url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200',
    alt: 'Corte clásico con navaja',
    tall: false
  },
  {
    url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200',
    alt: 'Arreglo de barba profesional',
    tall: true
  },
  {
    url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200',
    alt: 'Interior de barbería premium',
    tall: false
  },
  {
    url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1200',
    alt: 'Corte fade moderno',
    tall: false
  },
  {
    url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1200',
    alt: 'Barbero en acción',
    tall: true
  },
  {
    url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200',
    alt: 'Detalles de corte',
    tall: false
  },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-20 bg-[#2a211c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Nuestra Galería" />
        <p className="text-center text-gray-400 mt-4 mb-12 max-w-2xl mx-auto">
          Cada corte es una obra de arte. Explora algunos de nuestros trabajos y deja que tu próximo estilo sea el siguiente.
        </p>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer ${img.tall ? 'row-span-2' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                loading="lazy"
              />
              {/* Overlay con texto al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de imagen ampliada */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white text-4xl hover:text-[#c5a47e] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full">
              {images[selectedImage].alt}
            </div>
          </div>
        )}

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Gallery;
