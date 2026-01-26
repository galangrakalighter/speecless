import React from 'react';
import { ShieldCheck, Quote } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <>
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-16">
                <div className="h-72 rounded-3xl overflow-hidden shadow-2xl drift-left antigravity-float-subtle">
                  <img src="https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                </div>
                <div className="h-56 rounded-3xl overflow-hidden shadow-2xl drift-left delay-200 antigravity-float-subtle">
                  <img src="https://images.unsplash.com/photo-1590156221122-c748e78f2a7a?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-56 rounded-3xl overflow-hidden shadow-2xl drift-right delay-100 antigravity-float-subtle">
                  <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                </div>
                <div className="h-72 rounded-3xl overflow-hidden shadow-2xl drift-right delay-300 antigravity-float-subtle">
                  <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 liftoff">
              <h2 className="text-5xl font-serif text-gray-900 mb-10 leading-tight font-[Arial,Helvetica,sans-serif]">
                Gonta-ganti Skincare? <br />
                <span className="italic text-[#C5A059] font-[Arial,Helvetica,sans-serif]">Hentikan Ketidakpastian.</span>
              </h2>
              <div className="space-y-8 text-gray-500 font-light text-xl">
                <p className="font-[Arial,Helvetica,sans-serif]">Banyak yang terjebak dalam siklus mencoba tanpa hasil. La Flyderm hadir untuk memberikan kepastian melalui formula yang dirancang khusus.</p>
                <div className="flex items-start space-x-6 pt-6 liftoff">
                  <div className="mt-1 bg-[#FDFBF7] p-4 rounded-3xl shadow-sm text-[#C5A059]">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 font-serif text-2xl font-[Arial,Helvetica,sans-serif]">Anti-Gagal</h4>
                    <p className="text-base text-gray-400 font-[Arial,Helvetica,sans-serif]">Diformulasikan secara spesifik untuk memastikan hasil yang memuaskan dan kulit yang lebih sehat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-6 text-center liftoff">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-sm relative overflow-hidden antigravity-float-subtle">
            <Quote className="absolute top-10 left-10 text-[#C5A059]/10" size={30} />
            <h2 className="text-[#C5A059] font-[Arial,Helvetica,sans-serif] text-3xl md:text-4xl mb-12 font-bold leading-tight">
              La Flyderm, <br />
              <span className="text-gray-900 italic font-[Arial,Helvetica,sans-serif]">The Speechless Beauty Skin 👍</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light italic leading-relaxed font-[Arial,Helvetica,sans-serif]">
              "Kecantikan kulit yang membuatmu tidak bisa berkata-kata, karena sangat memuaskan dan membuatmu merasa percaya diri!"
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;