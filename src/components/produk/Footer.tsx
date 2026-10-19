import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="flex flex-col">
            <span className="text-xl font-serif tracking-[0.2em] text-[#C5A059] font-bold uppercase mb-6 block">
              La Flyderm
            </span>
            <p className="text-gray-400 font-light text-[10px] leading-relaxed max-w-xs uppercase">
              Designed for Speechless Beauty Skin
            </p>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-[10px] tracking-[0.2em] uppercase mb-6">
              Marketplace
            </h4>
            <ul className="space-y-4 text-gray-500 text-xs font-light">
              <li>
                <a href="#" className="hover:text-[#C5A059] transition-colors duration-300">
                  Shopee Official
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A059] transition-colors duration-300">
                  Tokopedia Store
                </a>
              </li>
            </ul>
          </div>

          {/* Help/Bantuan Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-[10px] tracking-[0.2em] uppercase mb-6">
              Bantuan
            </h4>
            <ul className="space-y-4 text-gray-500 text-xs font-light">
              <li>
                <a href="#" className="hover:text-[#C5A059] transition-colors duration-300">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A059] transition-colors duration-300">
                  Kontak Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-[10px] tracking-[0.2em] uppercase mb-6">
              Social
            </h4>
            <div className="flex space-x-6 text-gray-400">
              <a 
                href="#" 
                aria-label="Instagram"
                className="hover:text-[#C5A059] transition-all duration-300 hover:-translate-y-1"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                aria-label="Email"
                className="hover:text-[#C5A059] transition-all duration-300 hover:-translate-y-1"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[8px] text-gray-300 uppercase tracking-[0.4em] font-bold pt-8 border-t border-gray-50">
          <p>&copy; {currentYear} LA FLYDERM INDONESIA. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;