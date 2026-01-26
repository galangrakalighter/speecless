import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <span className="text-2xl font-serif tracking-widest text-[#C5A059] font-bold uppercase">LA FLYDERM</span>
        
        <div className="hidden md:flex space-x-10 items-center">
          {['Beranda', 'Produk', 'Artikel', 'Testimoni'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs tracking-[0.2em] uppercase hover:text-[#C5A059] transition-all font-semibold text-gray-700">{item}</a>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`absolute top-full left-0 w-full bg-white border-t p-8 flex flex-col space-y-8 md:hidden shadow-2xl transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
        <a href="#" className="text-xl font-light">Beranda</a>
        <a href="#products" className="text-xl font-light">Produk</a>
        <button className="bg-gray-900 text-white py-5 rounded-2xl font-bold uppercase text-xs tracking-widest">Belanja Sekarang</button>
      </div>
    </nav>
  );
};

export default Navbar;