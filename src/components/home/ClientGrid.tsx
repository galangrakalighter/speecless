import React from 'react';

// Import aset menggunakan alias @/
import LogoCordela from '@/assets/Home/cordelia.webp';
import Platinum from '@/assets/Home/platinum.webp';
import GinoFeruci from '@/assets/Home/gino_feruci.webp';
import GrandPapua from '@/assets/Home/grand_papua.webp';
import KrisnaBeach from '@/assets/Home/krisna_beach.webp';
import Horison from '@/assets/Home/horison.webp';
import GrandTjokro from '@/assets/Home/grand_tjokro.webp';
import GrandSahid from '@/assets/Home/grand_sahid.webp';
import NewPuri from '@/assets/Home/new_puri_garden.webp';
import Fraser from '@/assets/Home/fraser_residence.webp';
import HotelJasmine from '@/assets/Home/hotel_jasmine.webp';
import Dunamis from '@/assets/Home/dunamis.webp';
import NoorHotel from '@/assets/Home/noor_hotel.webp';
import Adua from '@/assets/Home/adua.webp';
import TokoUma from '@/assets/Home/toko_uma.webp';
import Nabati from '@/assets/Home/nabati.webp';

const CLIENTS = [
  { name: "Cordela Suites", logo: LogoCordela },
  { name: "Platinum Hotel", logo: Platinum },
  { name: "Gino Feruci", logo: GinoFeruci },
  { name: "Grand Papua", logo: GrandPapua },
  { name: "Krisna Beach", logo: KrisnaBeach },
  { name: "Horison", logo: Horison },
  { name: "Grand Tjokro", logo: GrandTjokro },
  { name: "Grand Sahid", logo: GrandSahid },
  { name: "New Puri Garden", logo: NewPuri },
  { name: "Fraser Residence", logo: Fraser },
  { name: "Hotel Jasmine", logo: HotelJasmine },
  { name: "Dunamis", logo: Dunamis },
  { name: "Noor Hotel", logo: NoorHotel },
  { name: "Adua", logo: Adua },
  { name: "Toko Uma", logo: TokoUma },
  { name: "Nabati", logo: Nabati },
];

const ClientGrid: React.FC = () => {
  return (
    <section className="relative py-12 pb-20 px-4 bg-[#3d3013] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Grid Client Logo dengan Kartu Putih */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 pt-16">
          {CLIENTS.map((client, i) => (
            <div 
              key={i} 
              className="rounded-2xl p-4 md:p-6 flex items-center justify-center transition-all duration-300 hover:scale-105 group h-28 md:h-36"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-white mt-16 text-xl md:text-2xl font-black italic tracking-tight">
          Masih banyak lagi lainnya!
        </p>
      </div>
    </section>
  );
};

export default ClientGrid;