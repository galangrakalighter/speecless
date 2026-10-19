import React from 'react';
import LogoFooter from '@/assets/Home/Logo_pensilvania.webp'; 
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok, FaShoppingBag } from 'react-icons/fa';

const Footer: React.FC = () => {
  // Masukkan link akun media sosial Anda di sini
  const socialIcons = [
    { 
      Icon: FaShoppingBag, 
      href: 'https://shopee.co.id/pencilvania', // Ganti dengan link Shopee Anda
      label: 'Shopee' 
    },
    { 
      Icon: FaYoutube, 
      href: 'https://www.youtube.com/@pabrik.pensil.terbaik', // Ganti dengan link YouTube Anda
      label: 'YouTube' 
    },
    { 
      Icon: FaFacebookF, 
      href: 'https://www.facebook.com/pensil.kayu.hotel.custom.terbaik', // Ganti dengan link Facebook Anda
      label: 'Facebook' 
    },
    { 
      Icon: FaInstagram, 
      href: 'https://www.instagram.com/pencil.vania_pva.official.logo?igsh=bnFmamYwNG5kZWs2', // Ganti dengan link Instagram Anda
      label: 'Instagram' 
    },
    { 
      Icon: FaTiktok, 
      href: 'https://www.tiktok.com/@pva.pabrik.toko.pensil',   // Ganti dengan link TikTok Anda
      label: 'TikTok' 
    },
  ];

  return (
    <footer className="bg-[#4b3621] py-12 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-8">
          
          {/* Sisi Kiri: Logo & Info */}
          <div className="flex flex-col space-y-6">
            <img 
              src={LogoFooter} 
              alt="Logo Pencilvania"
              className="h-auto w-full max-w-[350px] object-contain" 
            />

            <div className="space-y-1 pt-4">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-wider">
                Pencilvania Factory Supplier Indonesia
              </h3>
              <p className="text-sm md:text-base opacity-90 italic">
                Pabriknya Pensil Tulis & Pensil Warna Indonesia
              </p>
            </div>
          </div>

          {/* Sisi Kanan: Sosial Media dengan Link Aktif */}
          <div className="flex flex-wrap gap-4">
            {socialIcons.map(({ Icon, href, label }, idx) => (
              <a 
                key={idx} 
                href={href} 
                target="_blank"           // Membuka di tab baru
                rel="noopener noreferrer" // Keamanan tambahan saat membuka link luar
                aria-label={label}        // Aksesibilitas untuk pembaca layar
                className="w-12 h-12 bg-white text-[#4b3621] rounded-full flex items-center justify-center text-xl hover:bg-yellow-400 hover:scale-110 transition-all shadow-lg"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="border-t border-white/40 pt-6">
          <p className="text-sm md:text-base font-medium opacity-80">
            Copyright 2026 © Pensilvania Factory Supplier Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;