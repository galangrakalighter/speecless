import React from 'react';
import Intan from '@/assets/Home/intan.webp';
import Nono from '@/assets/Home/nonojawe.webp';
import Amalia from '@/assets/Home/amalia.webp';

interface Testimonial {
  name: string;
  quote: string;
  avatar: string;
}

const TestimonialSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Intan Tri Amelia",
      quote: "Pencil nya bagus enak di pakai gak gampang patah jadi gak perlu sering sering nyerut pencil trus tebel juga gak tipis gak kalah bagus sama pencil pencil yang lain.",
      avatar: Intan
    },
    {
      name: "nonojawe",
      quote: "Memberi pelayanan dan saran baik serta profesional, semoga pencilvania bisa selalu d pakai oleh perusahaan dan hotel2 lain jgn sampai mengecewakan, sukses terus pencilvania.",
      avatar: Nono
    },
    {
      name: "Siti Nurul Amalia",
      quote: "cocok untuk menjadi branding produk atau perusahaan,karena memang kwalitas nya bagus dan bahannya juga bagus,banyak pilihan warna nya.",
      avatar: Amalia
    }
  ];

  return (
    <section className="bg-[#3d3013] py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 md:mb-20 italic tracking-tight">
          Ingin Lebih Yakin Lagi?
        </h2>
        
        {/* Grid Container: 1 kolom di mobile, 3 kolom di desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-stretch">
          {testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col h-full group">
              
              {/* Bagian Balon Percakapan */}
              <div className="relative w-full mb-6 md:mb-8 transition-transform duration-300 group-hover:-translate-y-2">
                <blockquote className="bg-[#fefce8] p-5 md:p-6 rounded-[2rem] text-gray-800 text-sm md:text-base font-medium shadow-2xl text-left relative z-10 leading-relaxed">
                  "{t.quote}"
                  {/* Segitiga Buntut Balon */}
                  <div className="absolute -bottom-4 left-8 w-0 h-0 
                    border-t-[20px] border-t-[#fefce8] 
                    border-r-[20px] border-r-transparent">
                  </div>
                </blockquote>
              </div>

              {/* Bagian Identitas - mt-auto menjaga posisi di bawah meski teks quote berbeda panjangnya */}
              <figcaption className="flex items-center gap-3 md:gap-4 w-full justify-start pl-2 md:pl-4 mt-auto">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-yellow-400 overflow-hidden shadow-md shrink-0">
                  <img 
                    src={t.avatar} 
                    alt={`Foto profil ${t.name}`} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white font-bold text-sm md:text-base tracking-wide">
                    {t.name}
                  </span>
                </div>
              </figcaption>
              
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;