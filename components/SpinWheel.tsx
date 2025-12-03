import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SpinWheel: React.FC = () => {
  const [canSpin, setCanSpin] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const prizes = [
    { label: '10% Desc.', color: '#c5a47e' },
    { label: 'Nada', color: '#2a211c' },
    { label: 'Bebida Gratis', color: '#c5a47e' },
    { label: 'Nada', color: '#2a211c' },
    { label: 'Cera Gratis', color: '#c5a47e' },
    { label: 'Nada', color: '#2a211c' },
  ];

  useEffect(() => {
    const lastSpin = localStorage.getItem('santo_barbero_last_spin');
    if (!lastSpin) {
      setCanSpin(true);
    } else {
      const lastDate = new Date(parseInt(lastSpin));
      const today = new Date();
      if (lastDate.getDate() !== today.getDate() || lastDate.getMonth() !== today.getMonth()) {
        setCanSpin(true);
      }
    }
  }, []);

  const spin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    const newRotation = rotation + 1800 + Math.random() * 360;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setCanSpin(false);
      localStorage.setItem('santo_barbero_last_spin', Date.now().toString());
      
      // Calculate prize based on rotation
      const normalizedRotation = newRotation % 360;
      const segmentAngle = 360 / prizes.length;
      const prizeIndex = Math.floor(((360 - normalizedRotation) % 360) / segmentAngle);
      setPrize(prizes[prizeIndex].label);
    }, 5000);
  };

  return (
    <section className="py-20 bg-[#1a1a1a] overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-cinzel text-[#c5a47e] mb-4">Ruleta Diaria</h2>
        <p className="text-gray-400 mb-12">¡Prueba tu suerte y gana premios exclusivos cada día!</p>

        <div className="relative w-80 h-80 mx-auto mb-8">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-white"></div>

          {/* Wheel */}
          <motion.div
            className="w-full h-full rounded-full border-4 border-[#c5a47e] overflow-hidden relative"
            animate={{ rotate: rotation }}
            transition={{ duration: 5, ease: "circOut" }}
            style={{ background: `conic-gradient(
              ${prizes.map((p, i) => `${p.color} ${i * (360/prizes.length)}deg ${(i+1) * (360/prizes.length)}deg`).join(', ')}
            )` }}
          >
            {prizes.map((p, i) => (
              <div
                key={i}
                className="absolute w-full h-full text-xs font-bold text-white flex justify-center pt-4"
                style={{ 
                  transform: `rotate(${i * (360/prizes.length) + (360/prizes.length)/2}deg)`,
                }}
              >
                <span className="bg-black/50 px-1 rounded">{p.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="h-20">
          {isSpinning ? (
            <p className="text-xl text-[#c5a47e] animate-pulse">¡Girando!...</p>
          ) : prize ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-[#c5a47e]"
            >
              {prize === 'Nada' ? '¡Suerte para la próxima!' : `¡Ganaste: ${prize}!`}
            </motion.div>
          ) : !canSpin ? (
            <p className="text-gray-500">Vuelve mañana para girar de nuevo.</p>
          ) : (
            <button
              onClick={spin}
              className="bg-[#c5a47e] text-[#1f1a17] px-8 py-3 rounded-full font-bold text-lg hover:bg-[#b5946e] transition-transform hover:scale-105"
            >
              GIRAR AHORA
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpinWheel;
