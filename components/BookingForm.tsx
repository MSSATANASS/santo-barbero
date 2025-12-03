import React, { useState } from 'react';

interface BookingFormProps {
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    barber: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Ritual Esencial ($450)',
    'Experiencia Santo ($650)',
    'Tratamiento VIP ($900)',
    'Corte Infantil ($300)',
    'Tinte de Barba ($200)',
    'Rasurado Clásico ($250)',
    'Cejas ($150)'
  ];

  const barbers = [
    'Javier "El Maestro"',
    'Marcos "El Artista"',
    'Carlos "El Bárbaro"',
    'Sin preferencia'
  ];

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío de formulario
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Guardar cita en localStorage para el admin
    const appointments = JSON.parse(localStorage.getItem('santo_barbero_appointments') || '[]');
    const newAppointment = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: Date.now()
    };
    appointments.push(newAppointment);
    localStorage.setItem('santo_barbero_appointments', JSON.stringify(appointments));

    // Emitir evento para que App.tsx lo capture
    window.dispatchEvent(new CustomEvent('newReservation', { detail: formData }));

    // Abrir WhatsApp con mensaje pre-llenado
    const message = encodeURIComponent(
      `¡Hola Santo Barbero! 👋\n\n` +
      `Quiero confirmar mi reserva:\n\n` +
      `👤 Nombre: ${formData.name}\n` +
      `📞 Teléfono: ${formData.phone}\n` +
      `📅 Fecha: ${new Date(formData.date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}\n` +
      `🕐 Hora: ${formData.time}\n` +
      `✂️ Servicio: ${formData.service}\n` +
      `💈 Barbero: ${formData.barber || 'Sin preferencia'}\n` +
      (formData.notes ? `📝 Notas: ${formData.notes}\n` : '') +
      `\n¡Gracias!`
    );
    
    // Número de la barbería (cambiar por el real)
    const phoneNumber = '5255123456'; // Cambiar por número real
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

    console.log('Reserva enviada:', formData);

    setIsSubmitting(false);
    setSubmitted(true);

    // Cerrar modal después de 3 segundos
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Obtener fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-[#2a211c] rounded-2xl p-8 max-w-md w-full border-2 border-[#c5a47e] text-center animate-scale-in">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-[#c5a47e] mb-4">¡Reserva Confirmada!</h3>
          <p className="text-gray-300 mb-2">
            Gracias <span className="text-[#c5a47e] font-semibold">{formData.name}</span>
          </p>
          <p className="text-gray-400 text-sm">
            Recibirás un mensaje de confirmación al <br/>
            <span className="text-white">{formData.phone}</span>
          </p>
          <p className="text-gray-500 text-xs mt-4">
            Nos vemos el {new Date(formData.date).toLocaleDateString('es-MX', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} a las {formData.time}
          </p>
        </div>
        <style>{`
          @keyframes scale-in {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in {
            animation: scale-in 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#2a211c] rounded-2xl p-8 max-w-2xl w-full my-8 border border-gray-700 relative">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl transition-colors"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-cinzel text-[#c5a47e] mb-2">
            Reserva Tu Cita
          </h2>
          <p className="text-gray-400">
            Completa el formulario y nos pondremos en contacto contigo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-semibold">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1f1a17] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c5a47e] transition-colors"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-semibold">
                Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#1f1a17] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c5a47e] transition-colors"
                placeholder="55 1234 5678"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1f1a17] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c5a47e] transition-colors"
              placeholder="correo@ejemplo.com"
            />
          </div>

          {/* Fecha y Hora */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-semibold">
                Fecha *
              </label>
              <input
                type="date"
                name="date"
                required
                min={today}
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-[#1f1a17] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c5a47e] transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-semibold">
                Hora *
              </label>
              <select
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-[#1f1a17] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c5a47e] transition-colors"
              >
                <option value="">Selecciona una hora</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Servicio y Barbero */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-semibold">
                Servicio *
              </label>
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-[#1f1a17] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c5a47e] transition-colors"
              >
                <option value="">Selecciona un servicio</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-semibold">
                Barbero Preferido
              </label>
              <select
                name="barber"
                value={formData.barber}
                onChange={handleChange}
                className="w-full bg-[#1f1a17] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c5a47e] transition-colors"
              >
                <option value="">Selecciona un barbero</option>
                {barbers.map(barber => (
                  <option key={barber} value={barber}>{barber}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notas adicionales */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">
              Notas Adicionales
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#1f1a17] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c5a47e] transition-colors resize-none"
              placeholder="¿Alguna preferencia especial o consulta?"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-transparent border-2 border-gray-600 text-gray-300 font-bold py-3 px-6 rounded-lg tracking-wider uppercase transition-all duration-300 hover:border-gray-500 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              data-analytics="submit_reserva"
              className="flex-1 bg-[#c5a47e] text-gray-900 font-bold py-3 px-6 rounded-lg tracking-wider uppercase transition-all duration-300 hover:bg-[#b5946e] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : '📅 Confirmar Reserva'}
            </button>
          </div>
        </form>
      </div>

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
  );
};

export default BookingForm;
