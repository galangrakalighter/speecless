import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FDFBF7]">
      <div className="orb w-96 h-96 -top-20 -left-20 antigravity-float absolute rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #C5A059 0%, transparent 70%)' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10 pt-20">
        <div>
          <h1 className="text-6xl md:text-8xl font-serif text-gray-900 mb-8 leading-[1.2]">
            {/* Tambahkan padding vertical (py-2 atau py-4) agar ada ruang untuk huruf yang tinggi */}
            <span className="block overflow-hidden py-2">
                <span className="block animate-[maskReveal_0.4s_ease-out_forwards] translate-y-full font-[Arial,Helvetica,sans-serif]">
                Speechless
                </span>
            </span>
            
            <span className="block overflow-hidden py-2 -mt-2">
                <span className="block italic text-[#C5A059] animate-[maskReveal_0.4s_ease-out_0.2s_forwards] translate-y-full font-[Arial,Helvetica,sans-serif]">
                Beauty Skin
                </span>
            </span>
            </h1>
          <p className="text-gray-500 text-lg md:text-xl font-light mb-12 max-w-lg liftoff active font-[Arial,Helvetica,sans-serif]">
            Membuat kulitmu berbicara tanpa kata-kata. Kecantikan luar biasa yang membuatmu merasa percaya diri dan puas.
          </p>
          <button className="bg-gray-900 text-white px-12 py-6 rounded-full text-xs tracking-widest font-bold uppercase hover:bg-black transition-all flex items-center group shadow-xl liftoff active font-[Arial,Helvetica,sans-serif]">
            Belanja Sekarang <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </div>

        <div className="relative liftoff active">
          <div className="aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl antigravity-float">
            <img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800" alt="Hero" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;