import { useEffect } from 'react';

export const useReveal = (): void => {
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.15, // Ditingkatkan sedikit agar elemen tidak muncul terlalu cepat di pinggir layar
      rootMargin: '0px 0px -50px 0px' // Memberi ruang agar mata user sudah fokus sebelum animasi mulai
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Menambahkan sedikit delay via RequestAnimationFrame agar sinkron dengan refresh rate monitor
          requestAnimationFrame(() => {
            entry.target.classList.add('active');
          });
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Menggunakan timeout kecil untuk memastikan DOM React sudah benar-benar ter-render
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('.liftoff, .drift-left, .drift-right');
      elements.forEach((el) => revealObserver.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      revealObserver.disconnect();
    };
  }, []);
};