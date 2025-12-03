import React from 'react';
import SectionTitle from './SectionTitle';

const products = [
  {
    name: 'Cera de Peinar "Santo Fijado"',
    price: '$350 MXN',
    img: 'pomade-product/400/400',
  },
  {
    name: 'Aceite para Barba "Elixir Divino"',
    price: '$400 MXN',
    img: 'beard-oil-product/400/400',
  },
  {
    name: 'Camiseta Oficial Santo Barbero',
    price: '$500 MXN',
    img: 'barber-shirt/400/400',
  },
  {
    name: 'Peine de Sándalo Premium',
    price: '$250 MXN',
    img: 'sandalwood-comb/400/400',
  },
];

const Store: React.FC = () => {
  return (
    <section id="tienda" className="py-20 bg-[#2a211c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Nuestra Tienda" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {products.map((product, index) => (
            <div key={index} className="bg-[#1f1a17] rounded-lg overflow-hidden border border-gray-700/50 group flex flex-col transition-all duration-300 hover:shadow-xl hover:border-[#c5a47e]/70">
              <div className="overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${product.img}`}
                  alt={`Producto ${product.name}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold font-cinzel text-[#e0e0e0] flex-grow">{product.name}</h3>
                <p className="text-2xl font-bold text-[#c5a47e] my-3">{product.price}</p>
                <button className="mt-4 w-full bg-transparent border-2 border-[#c5a47e] text-[#c5a47e] font-bold py-2 px-4 rounded-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#c5a47e] hover:text-gray-900">
                  Comprar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Store;