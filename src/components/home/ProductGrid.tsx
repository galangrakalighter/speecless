import React from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  delay: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Oily Series",
    description: "Kendali penuh pada minyak berlebih tanpa mengorbankan hidrasi alami wajah.",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600",
    delay: "delay-1"
  },
  {
    id: 2,
    title: "Dry Series",
    description: "Kunci kelembapan mendalam untuk kulit yang senantiasa kenyal dan bercahaya.",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    delay: "delay-2"
  },
  {
    id: 3,
    title: "Sensitive Series",
    description: "Formula lembut yang memeluk kulit sensitif dengan perlindungan ekstra.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600",
    delay: "delay-3"
  }
];

const ProductGrid: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 liftoff">
          <h2 className="text-5xl text-gray-900 mb-6 italic font-[Arial,Helvetica,sans-serif]">Pilih Karakter Kulit Kamu</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-xl leading-relaxed font-[Arial,Helvetica,sans-serif]">
            Eksplorasi formula cerdas yang bekerja secara spesifik untuk hasil maksimal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {products.map((product) => (
            <div 
              key={product.id}
              className={`weightless-card group bg-[#FDFBF7] rounded-[3rem] overflow-hidden border border-gray-100 flex flex-col liftoff ${product.delay} cursor-pointer`}
            >
              {/* Image Section */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-1000 ease-out" />
              </div>

              {/* Content Section */}
              <div className="p-10 text-left flex-1 flex flex-col">
                <h3 className="text-3xl font-serif text-gray-900 mb-4 transition-colors duration-500 group-hover:text-[#C5A059] font-[Arial,Helvetica,sans-serif]">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-base font-light mb-10 flex-1 leading-relaxed font-[Arial,Helvetica,sans-serif]">
                  {product.description}
                </p>
                <button className="w-full py-5 rounded-2xl border border-gray-900 text-gray-900 font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-500 group-hover:bg-gray-900 group-hover:text-white group-hover:shadow-xl font-[Arial,Helvetica,sans-serif]">
                  Beli di Marketplace
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;