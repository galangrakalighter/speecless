import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-32 pb-16 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24 text-left">
          {/* Brand Info */}
          <div>
            <span className="text-2xl font-serif tracking-[0.2em] text-[#C5A059] font-bold uppercase mb-8 block">
              La Flyderm
            </span>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs">
              Dedikasi kami adalah menghadirkan kecantikan yang membuatmu speechless melalui formula spesifik.
            </p>
          </div>

          {/* Explorasi Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-xs tracking-widest uppercase mb-8">
              Eksplorasi
            </h4>
            <ul className="space-y-5 text-gray-500 text-sm font-light">
              <li>
                <a href="#" className="hover:text-[#C5A059] transition-colors">Beranda</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#C5A059] transition-colors">Koleksi Produk</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A059] transition-colors">Artikel Kecantikan</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#C5A059] transition-colors">Hasil Nyata</a>
              </li>
            </ul>
          </div>

          {/* Layanan Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-xs tracking-widest uppercase mb-8">
              Layanan
            </h4>
            <ul className="space-y-5 text-gray-500 text-sm font-light">
              <li>
                <a href="#" className="hover:text-[#C5A059] transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A059] transition-colors">Kebijakan Privasi</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A059] transition-colors">Hubungi Kami</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-xs tracking-widest uppercase mb-8">
              Social
            </h4>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#C5A059] transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#C5A059] transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#C5A059] transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-400 uppercase tracking-[0.3em] font-bold space-y-4 md:space-y-0">
          <p>&copy; 2026 LA FLYDERM INDONESIA. ALL RIGHTS RESERVED.</p>
          <p>Designed for Speechless Beauty Skin</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;