import React from 'react';
import Pensil from '@/assets/Home/pensilkayu1.webp';

const WorkflowSection: React.FC = () => {
  return (
    <section className="bg-[#3d3013] py-16 md:py-24 px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex justify-center">
        {/* Container Utama - Rounded disesuaikan per breakpoint */}
        <div className="bg-[#f4e4d4] w-full max-w-5xl rounded-[60px] sm:rounded-[100px] md:rounded-[250px] shadow-2xl p-8 sm:p-12 md:p-24 flex flex-col md:flex-row items-center relative border-4 md:border-8 border-yellow-800/10 min-h-auto md:min-h-[600px]">
          
          {/* Bagian Gambar Pensil - Responsif Scale & Rotation */}
          <div className="w-full md:w-2/5 flex justify-center mb-10 md:mb-0 relative">
            <div className="relative z-10">
              {/* Komentar harus di sini (di luar tag img) */}
              <img 
                src={Pensil} 
                alt="Pensil Kayu" 
                className="w-auto h-[280px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-contain transform -rotate-20 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Bagian Teks */}
          <div className="w-full md:w-3/5 text-gray-900 md:pl-16 relative z-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-8 md:mb-12 leading-tight uppercase tracking-tighter text-center md:text-left">
              Cara Kerja Mitra <br className="md:hidden" /> Dengan Kami:
            </h2>
            
            <ul className="space-y-4 sm:space-y-6 md:space-y-8 text-base sm:text-lg font-bold">
              {[
                "Kami akan sediakan Relationship Manager (RM) VIP buat Mitra sesuai areanya agar fast respon dan cepat membantu Anda.",
                "Kabari kebutuhan Anda kepada RM Anda, supaya kami bisa segera proses.",
                "Konsultasikan custom nama & jenis pensil yang Anda mau.",
                "Beres sudah!!"
              ].map((text, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#8d6e63] rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></span>
                  <p className="leading-snug">{text}</p>
                </li>
              ))}
            </ul>
            
            <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-yellow-800/10 md:border-none text-center md:text-left">
              <p className="text-xl sm:text-2xl md:text-3xl font-black italic text-amber-900 leading-tight">
                Makin Banyak dibeli <br className="sm:hidden" /> Harga Grosir Makin Murah!!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;