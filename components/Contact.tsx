import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import BookingForm from './BookingForm';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

const Contact: React.FC = () => {
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [mapsQuery, setMapsQuery] = useState('');
    const [mapsResult, setMapsResult] = useState<{ text: string; links: any[] }>({ text: '', links: [] });
    const [isMapsLoading, setIsMapsLoading] = useState(false);
    const [mapsError, setMapsError] = useState('');

    const handleMapsSearch = async () => {
        if (!mapsQuery.trim()) return;

        setIsMapsLoading(true);
        setMapsError('');
        setMapsResult({ text: '', links: [] });

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Considerando que estoy cerca de la barbería Santo Barbero, ${mapsQuery}`,
                    config: {
                        tools: [{ googleMaps: {} }],
                        toolConfig: {
                            retrievalConfig: {
                                latLng: { latitude, longitude }
                            }
                        }
                    },
                });

                const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                setMapsResult({ text: response.text, links: groundingChunks });

            } catch (error) {
                console.error("Maps Grounding Error:", error);
                setMapsError("No se pudo completar la búsqueda. Inténtalo de nuevo.");
            } finally {
                setIsMapsLoading(false);
            }
        }, (error) => {
            console.error("Geolocation error:", error);
            setMapsError("Por favor, permite el acceso a tu ubicación para usar esta función.");
            setIsMapsLoading(false);
        });
    };

  return (
    <section id="contacto" className="py-20 bg-[#2a211c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Contacto y Ubicación" />
        
        {/* Botón destacado de reserva */}
        <div className="text-center mt-8 mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowBookingForm(true)}
              className="inline-block bg-gradient-to-r from-[#c5a47e] to-[#d4b48e] text-gray-900 font-bold py-4 px-10 rounded-full tracking-wider uppercase transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#c5a47e]/50 text-lg"
              data-analytics="cta_reservar_contacto"
            >
              📅 Reservar Cita
            </button>
            <a
              href="https://wa.me/525512345678?text=Hola%20quiero%20reservar%20una%20cita%20en%20Santo%20Barbero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] text-gray-900 font-bold py-4 px-10 rounded-full tracking-wider uppercase transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              aria-label="Escribir por WhatsApp"
              data-analytics="cta_whatsapp"
            >
              💬 WhatsApp
            </a>
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            O llámanos directamente al <a href="tel:+525512345678" className="text-[#c5a47e] hover:underline font-semibold" data-analytics="cta_tel">55 1234 5678</a>
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <LocationIcon className="h-8 w-8 text-[#c5a47e] mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-[#e0e0e0]">Dirección</h3>
                <p className="text-gray-400">Av. de los Insurgentes Sur 453, Roma Nte., 06700 Ciudad de México, CDMX</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <PhoneIcon className="h-8 w-8 text-[#c5a47e] mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-[#e0e0e0]">Teléfono</h3>
                <a href="tel:+525512345678" className="text-gray-400 hover:text-[#c5a47e] transition-colors">
                  +52 55 1234 5678
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <ClockIcon className="h-8 w-8 text-[#c5a47e] mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-[#e0e0e0]">Horario</h3>
                <p className="text-gray-400">Lunes - Viernes: 10:00 - 20:00</p>
                <p className="text-gray-400">Sábado: 10:00 - 16:00</p>
                <p className="text-gray-400">Domingo: Cerrado</p>
              </div>
            </div>
             <a
              href="tel:+525512345678"
              className="mt-8 inline-block bg-[#c5a47e] text-gray-900 font-bold py-3 px-8 rounded-lg tracking-wider uppercase transition-all duration-300 hover:bg-[#b5946e] hover:scale-105 hover:shadow-lg"
            >
              📞 Llamar para Reservar
            </a>
          </div>
          <div className="h-80 lg:h-full rounded-lg overflow-hidden border-2 border-gray-700 shadow-xl">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.671353396269!2d-99.1652750850934!3d19.42672158688825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3a5a732165%3A0x625535560410a56!2sAv.%20de%20los%20Insurgentes%20Sur%20453%2C%20Roma%20Nte.%2C%20Cuauht%C3%A9moc%2C%2006700%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Google Maps Location"
            ></iframe>
          </div>
        </div>
        
        <div className="mt-20 pt-12 border-t border-gray-700/50">
            <div className="text-center">
                 <h3 className="text-3xl md:text-4xl font-bold font-cinzel text-[#e0e0e0] tracking-wider">Explora los Alrededores</h3>
                 <div className="mt-3 w-24 h-1 bg-[#c5a47e] mx-auto"></div>
                 <p className="mt-4 text-gray-400 max-w-2xl mx-auto">¿Buscas un lugar para comer o dónde estacionarte? Pregúntale a nuestro asistente de IA.</p>
            </div>
            <div className="max-w-xl mx-auto mt-8">
                <div className="flex items-center bg-[#1f1a17] border-2 border-gray-700 rounded-lg overflow-hidden focus-within:border-[#c5a47e] transition-colors">
                    <input 
                        type="text"
                        value={mapsQuery}
                        onChange={(e) => setMapsQuery(e.target.value)}
                        placeholder="Ej: 'restaurantes buenos y baratos cerca'"
                        className="w-full bg-transparent p-3 text-gray-200 focus:outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleMapsSearch()}
                    />
                    <button onClick={handleMapsSearch} disabled={isMapsLoading} className="bg-[#c5a47e] text-gray-900 font-bold py-3 px-6 transition-colors duration-300 hover:bg-[#b5946e] disabled:bg-gray-600">
                        {isMapsLoading ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>
                {mapsError && <p className="text-red-400 mt-4 text-center">{mapsError}</p>}
                {mapsResult.text && (
                    <div className="mt-6 bg-[#1f1a17] p-6 rounded-lg border border-gray-700/50 prose prose-invert max-w-none prose-p:text-gray-300 prose-a:text-[#c5a47e]">
                        <Markdown>{mapsResult.text}</Markdown>
                        {mapsResult.links.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-600">
                                <h4 className="font-semibold text-gray-200">Fuentes:</h4>
                                <ul className="list-disc pl-5">
                                    {mapsResult.links.map((link, index) => (
                                        <li key={`map-link-${index}`}>
                                            <a href={link.maps.uri} target="_blank" rel="noopener noreferrer" className="hover:underline">{link.maps.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
      
      {/* Modal de formulario de reserva */}
      {showBookingForm && <BookingForm onClose={() => setShowBookingForm(false)} />}
    </section>
  );
};

export default Contact;
