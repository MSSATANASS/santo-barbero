import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Store from './components/Store';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import LoyaltyCard from './components/LoyaltyCard';
import SpinWheel from './components/SpinWheel';
import BottomNavigation from './components/BottomNavigation';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);

  // Detectar parámetro ?admin=1 en URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1') {
      setShowAdmin(true);
    }
  }, []);

  // Guardar cita cuando se hace reserva (interceptar BookingForm)
  useEffect(() => {
    const handleReservation = (e: CustomEvent) => {
      const appointments = JSON.parse(localStorage.getItem('santo_barbero_appointments') || '[]');
      appointments.push({
        id: Date.now().toString(),
        ...e.detail,
        status: 'pending',
        createdAt: Date.now()
      });
      localStorage.setItem('santo_barbero_appointments', JSON.stringify(appointments));
    };

    window.addEventListener('newReservation' as any, handleReservation);
    return () => window.removeEventListener('newReservation' as any, handleReservation);
  }, []);

  return (
    <div className="bg-[#2a211c] min-h-screen text-gray-200">
      <Header />
      <main className="pb-24 md:pb-0">
        <Hero />
        <div id="servicios">
          <Services />
        </div>
        <div id="lealtad">
          <LoyaltyCard />
        </div>
        <SpinWheel />
        <div id="galeria">
          <Gallery />
        </div>
        <Team />
        <Store />
        <div id="contacto">
          <Contact />
        </div>
      </main>
      <Footer />
      <Chatbot />
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation 
        isVisible={showBottomNav && !showAdmin}
        onNavigate={(section) => console.log('Navigate to:', section)}
        onAdminClick={() => setShowAdmin(true)}
      />

      {/* Admin Dashboard */}
      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
};

export default App;