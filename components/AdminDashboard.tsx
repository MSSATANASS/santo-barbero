import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Appointment {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  barber: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: number;
}

interface CustomerData {
  phone: string;
  name: string;
  stamps: number;
  visits: number;
  lastVisit: string;
}

const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'citas' | 'sellos' | 'facebook' | 'stats'>('citas');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [foundCustomer, setFoundCustomer] = useState<CustomerData | null>(null);
  const [showSuccess, setShowSuccess] = useState('');

  // PIN por defecto: 1234 (en producción usar hash)
  const ADMIN_PIN = '1234';

  useEffect(() => {
    // Cargar citas guardadas
    const saved = localStorage.getItem('santo_barbero_appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    } else {
      // Datos de ejemplo
      setAppointments([
        {
          id: '1',
          name: 'Juan Pérez',
          phone: '55 1234 5678',
          date: new Date().toISOString().split('T')[0],
          time: '11:00',
          service: 'Ritual Esencial ($450)',
          barber: 'Javier "El Maestro"',
          status: 'pending',
          createdAt: Date.now()
        },
        {
          id: '2',
          name: 'Carlos García',
          phone: '55 9876 5432',
          date: new Date().toISOString().split('T')[0],
          time: '14:30',
          service: 'Experiencia Santo ($650)',
          barber: 'Marcos "El Artista"',
          status: 'confirmed',
          createdAt: Date.now()
        }
      ]);
    }
  }, []);

  const handlePinSubmit = () => {
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
    } else {
      alert('PIN incorrecto');
      setPin('');
    }
  };

  const searchCustomer = () => {
    const cleanPhone = searchPhone.replace(/\s/g, '');
    const customers = JSON.parse(localStorage.getItem('santo_barbero_customers') || '{}');
    
    if (customers[cleanPhone]) {
      setFoundCustomer(customers[cleanPhone]);
    } else {
      // Crear nuevo cliente
      setFoundCustomer({
        phone: cleanPhone,
        name: '',
        stamps: 0,
        visits: 0,
        lastVisit: ''
      });
    }
  };

  const addStampToCustomer = () => {
    if (!foundCustomer) return;
    
    const customers = JSON.parse(localStorage.getItem('santo_barbero_customers') || '{}');
    const updatedCustomer = {
      ...foundCustomer,
      stamps: (foundCustomer.stamps + 1) % 11, // Reset a 0 después de 10
      visits: foundCustomer.visits + 1,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    
    customers[foundCustomer.phone] = updatedCustomer;
    localStorage.setItem('santo_barbero_customers', JSON.stringify(customers));
    setFoundCustomer(updatedCustomer);
    
    if (updatedCustomer.stamps === 0) {
      setShowSuccess('🎉 ¡Cliente completó 10 sellos! Próximo corte GRATIS');
    } else {
      setShowSuccess(`✅ Sello agregado (${updatedCustomer.stamps}/10)`);
    }
    
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const updated = appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    );
    setAppointments(updated);
    localStorage.setItem('santo_barbero_appointments', JSON.stringify(updated));
  };

  const sendWhatsAppReminder = (apt: Appointment) => {
    const message = encodeURIComponent(
      `¡Hola ${apt.name}! 👋\n\n` +
      `Te recordamos tu cita en *Santo Barbero*:\n` +
      `📅 Fecha: ${new Date(apt.date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}\n` +
      `🕐 Hora: ${apt.time}\n` +
      `✂️ Servicio: ${apt.service}\n` +
      `💈 Barbero: ${apt.barber}\n\n` +
      `📍 Roma Norte, CDMX\n\n` +
      `¿Confirmas tu asistencia? Responde SÍ o llámanos si necesitas cambiar la hora.`
    );
    const phone = apt.phone.replace(/\s/g, '').replace('+', '');
    window.open(`https://wa.me/52${phone}?text=${message}`, '_blank');
    
    updateAppointmentStatus(apt.id, 'confirmed');
  };

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments
      .filter(apt => apt.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  // Pantalla de PIN
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-[#1f1a17] z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#2a211c] p-8 rounded-2xl max-w-sm w-full border border-[#c5a47e]/30 text-center"
        >
          <h2 className="text-2xl font-bold text-[#c5a47e] mb-2">🔐 Acceso Admin</h2>
          <p className="text-gray-400 text-sm mb-6">Ingresa el PIN de 4 dígitos</p>
          
          <div className="flex justify-center gap-3 mb-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center text-2xl font-bold transition-all ${
                  pin.length > i 
                    ? 'border-[#c5a47e] bg-[#c5a47e]/20 text-[#c5a47e]' 
                    : 'border-gray-600 text-gray-600'
                }`}
              >
                {pin.length > i ? '●' : ''}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((num, i) => (
              <button
                key={i}
                onClick={() => {
                  if (num === '⌫') setPin(pin.slice(0, -1));
                  else if (num !== '' && pin.length < 4) setPin(pin + num);
                }}
                disabled={num === ''}
                className={`h-14 rounded-lg font-bold text-xl transition-all ${
                  num === '' 
                    ? 'invisible' 
                    : 'bg-[#1f1a17] text-white hover:bg-[#c5a47e] hover:text-[#1f1a17] active:scale-95'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500"
            >
              Cancelar
            </button>
            <button
              onClick={handlePinSubmit}
              disabled={pin.length !== 4}
              className="flex-1 py-3 bg-[#c5a47e] text-[#1f1a17] font-bold rounded-lg disabled:opacity-50 hover:bg-[#b5946e]"
            >
              Entrar
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#1f1a17] z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-[#2a211c] p-4 flex items-center justify-between border-b border-[#c5a47e]/20">
        <h1 className="text-xl font-bold text-[#c5a47e]">⚙️ Panel Admin</h1>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute top-20 left-4 right-4 bg-green-600 text-white p-4 rounded-lg text-center font-bold z-10"
          >
            {showSuccess}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="grid grid-cols-4 bg-[#2a211c] border-b border-[#c5a47e]/20">
        {[
          { id: 'citas', icon: '📅', label: 'Citas' },
          { id: 'sellos', icon: '⭐', label: 'Sellos' },
          { id: 'facebook', icon: '📱', label: 'Redes' },
          { id: 'stats', icon: '📊', label: 'Stats' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-4 text-center transition-all ${
              activeTab === tab.id 
                ? 'bg-[#c5a47e] text-[#1f1a17]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="text-2xl mb-1">{tab.icon}</div>
            <div className="text-xs font-medium">{tab.label}</div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* TAB: CITAS */}
        {activeTab === 'citas' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white mb-4">
              📅 Citas de Hoy ({getTodayAppointments().length})
            </h2>
            
            {getTodayAppointments().length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-4">📭</div>
                <p>No hay citas para hoy</p>
              </div>
            ) : (
              getTodayAppointments().map(apt => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-[#2a211c] p-4 rounded-xl border ${
                    apt.status === 'confirmed' 
                      ? 'border-green-500/50' 
                      : apt.status === 'completed'
                      ? 'border-gray-600'
                      : 'border-[#c5a47e]/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-xl font-bold text-white">{apt.time}</div>
                      <div className="text-[#c5a47e] font-medium">{apt.name}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      apt.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                      apt.status === 'completed' ? 'bg-gray-600/50 text-gray-400' :
                      apt.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {apt.status === 'confirmed' ? '✓ Confirmada' :
                       apt.status === 'completed' ? '✓ Completada' :
                       apt.status === 'cancelled' ? '✗ Cancelada' :
                       '⏳ Pendiente'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-3">
                    <div>📞 {apt.phone}</div>
                    <div>✂️ {apt.service}</div>
                    <div>💈 {apt.barber}</div>
                  </div>

                  {apt.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => sendWhatsAppReminder(apt)}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-green-500 active:scale-98"
                      >
                        📲 WhatsApp
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                        className="flex-1 bg-[#c5a47e] text-[#1f1a17] py-3 rounded-lg font-bold text-sm hover:bg-[#b5946e] active:scale-98"
                      >
                        ✓ Confirmar
                      </button>
                    </div>
                  )}

                  {apt.status === 'confirmed' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                      className="w-full bg-[#c5a47e] text-[#1f1a17] py-3 rounded-lg font-bold hover:bg-[#b5946e] active:scale-98"
                    >
                      ✓ Marcar Completada
                    </button>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* TAB: SELLOS */}
        {activeTab === 'sellos' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">⭐ Gestión de Sellos</h2>
            
            <div className="bg-[#2a211c] p-4 rounded-xl border border-[#c5a47e]/30">
              <label className="text-gray-400 text-sm mb-2 block">Teléfono del cliente</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  placeholder="55 1234 5678"
                  className="flex-1 bg-[#1f1a17] border border-gray-700 rounded-lg px-4 py-3 text-white text-lg"
                />
                <button
                  onClick={searchCustomer}
                  className="bg-[#c5a47e] text-[#1f1a17] px-6 py-3 rounded-lg font-bold hover:bg-[#b5946e]"
                >
                  🔍
                </button>
              </div>
            </div>

            {foundCustomer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#2a211c] p-6 rounded-xl border border-[#c5a47e]/30"
              >
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#c5a47e]">
                    {foundCustomer.stamps}/10 sellos
                  </div>
                  <div className="text-gray-400">
                    {foundCustomer.visits} visitas totales
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-3 mb-6">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-full flex items-center justify-center border-2 text-lg ${
                        i < foundCustomer.stamps
                          ? 'bg-[#c5a47e] border-[#c5a47e] text-[#1f1a17]'
                          : 'border-gray-600 text-gray-600'
                      }`}
                    >
                      {i < foundCustomer.stamps ? '✓' : i + 1}
                    </div>
                  ))}
                </div>

                <button
                  onClick={addStampToCustomer}
                  className="w-full bg-[#c5a47e] text-[#1f1a17] py-4 rounded-xl font-bold text-lg hover:bg-[#b5946e] active:scale-98"
                >
                  ⭐ AGREGAR SELLO
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* TAB: FACEBOOK */}
        {activeTab === 'facebook' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white mb-4">📱 Redes Sociales</h2>
            
            <div className="grid gap-4">
              <button
                onClick={() => {
                  alert('Ejecutar en terminal:\nnpm run fb:post\n\nEsto generará un post con IA y lo publicará.');
                }}
                className="bg-blue-600 text-white p-6 rounded-xl text-left hover:bg-blue-500 active:scale-98"
              >
                <div className="text-3xl mb-2">📝</div>
                <div className="font-bold text-lg">Publicar Ahora</div>
                <div className="text-sm text-blue-200">Genera un post con IA y publícalo</div>
              </button>

              <button
                onClick={() => {
                  alert('Ejecutar en terminal:\nnpm run fb:schedule weekly\n\nEsto programará posts para toda la semana.');
                }}
                className="bg-purple-600 text-white p-6 rounded-xl text-left hover:bg-purple-500 active:scale-98"
              >
                <div className="text-3xl mb-2">📅</div>
                <div className="font-bold text-lg">Programar Semana</div>
                <div className="text-sm text-purple-200">Crea el plan de publicaciones semanal</div>
              </button>

              <button
                onClick={() => {
                  alert('Ejecutar en terminal:\nnpm run fb:gallery web\n\nPublica fotos del día a Facebook.');
                }}
                className="bg-pink-600 text-white p-6 rounded-xl text-left hover:bg-pink-500 active:scale-98"
              >
                <div className="text-3xl mb-2">📸</div>
                <div className="font-bold text-lg">Subir Galería</div>
                <div className="text-sm text-pink-200">Publica fotos de trabajos recientes</div>
              </button>

              <a
                href="https://business.facebook.com/latest/inbox"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a211c] border border-[#c5a47e]/30 text-white p-6 rounded-xl text-left hover:border-[#c5a47e] active:scale-98"
              >
                <div className="text-3xl mb-2">💬</div>
                <div className="font-bold text-lg">Ver Mensajes</div>
                <div className="text-sm text-gray-400">Abrir inbox de Facebook</div>
              </a>
            </div>
          </div>
        )}

        {/* TAB: STATS */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white mb-4">📊 Estadísticas</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#2a211c] p-4 rounded-xl border border-[#c5a47e]/30 text-center">
                <div className="text-3xl font-bold text-[#c5a47e]">
                  {appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length}
                </div>
                <div className="text-gray-400 text-sm">Citas Hoy</div>
              </div>

              <div className="bg-[#2a211c] p-4 rounded-xl border border-[#c5a47e]/30 text-center">
                <div className="text-3xl font-bold text-green-400">
                  {appointments.filter(a => a.status === 'completed').length}
                </div>
                <div className="text-gray-400 text-sm">Completadas</div>
              </div>

              <div className="bg-[#2a211c] p-4 rounded-xl border border-[#c5a47e]/30 text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {appointments.filter(a => a.status === 'pending').length}
                </div>
                <div className="text-gray-400 text-sm">Pendientes</div>
              </div>

              <div className="bg-[#2a211c] p-4 rounded-xl border border-[#c5a47e]/30 text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {Object.keys(JSON.parse(localStorage.getItem('santo_barbero_customers') || '{}')).length}
                </div>
                <div className="text-gray-400 text-sm">Clientes</div>
              </div>
            </div>

            <div className="bg-[#2a211c] p-4 rounded-xl border border-[#c5a47e]/30 mt-6">
              <h3 className="font-bold text-white mb-4">💰 Estimado del Día</h3>
              <div className="text-3xl font-bold text-[#c5a47e]">
                ${getTodayAppointments().reduce((sum, apt) => {
                  const price = apt.service.match(/\$(\d+)/)?.[1];
                  return sum + (price ? parseInt(price) : 0);
                }, 0).toLocaleString()} MXN
              </div>
              <div className="text-gray-500 text-sm">Basado en citas programadas</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
