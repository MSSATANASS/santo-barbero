import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoyaltyCard: React.FC = () => {
  const [stamps, setStamps] = useState(0);
  const MAX_STAMPS = 10;

  useEffect(() => {
    const savedStamps = localStorage.getItem("santo_barbero_stamps");
    if (savedStamps) {
      setStamps(parseInt(savedStamps, 10));
    }
  }, []);

  const addStamp = () => {
    if (stamps < MAX_STAMPS) {
      const newStamps = stamps + 1;
      setStamps(newStamps);
      localStorage.setItem("santo_barbero_stamps", newStamps.toString());
    }
  };

  const resetCard = () => {
    setStamps(0);
    localStorage.setItem("santo_barbero_stamps", "0");
  };

  return (
    <section className="py-20 bg-[#1f1a17] text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-cinzel text-[#c5a47e] mb-8">
          Club de Lealtad
        </h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Premia tu preferencia. Completa tu tarjeta y obtén un corte gratis.
        </p>

        <div className="bg-[#2a211c] p-8 rounded-lg max-w-md mx-auto shadow-2xl border border-[#c5a47e]/20">
          <div className="grid grid-cols-5 gap-4 mb-8">
            {[...Array(MAX_STAMPS)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`aspect-square rounded-full flex items-center justify-center border-2 ${
                  index < stamps
                    ? "bg-[#c5a47e] border-[#c5a47e] text-[#1f1a17]"
                    : "border-gray-600 text-gray-600"
                }`}
              >
                {index < stamps ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            {stamps >= MAX_STAMPS ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#c5a47e] text-[#1f1a17] p-4 rounded-lg mb-4 font-bold"
              >
                ¡Felicidades! Tu próximo corte es GRATIS.
                <button
                  onClick={resetCard}
                  className="block w-full mt-2 bg-[#1f1a17] text-[#c5a47e] py-2 rounded hover:bg-black transition-colors"
                >
                  Canjear Recompensa
                </button>
              </motion.div>
            ) : (
              <p className="text-[#c5a47e] mb-4">
                Te faltan {MAX_STAMPS - stamps} visitas para tu recompensa.
              </p>
            )}

            {/* Dev helper - remove in production */}
            <button
              onClick={addStamp}
              className="text-xs text-gray-600 hover:text-gray-400 underline mt-4"
            >
              (Demo: Agregar Sello)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyCard;
