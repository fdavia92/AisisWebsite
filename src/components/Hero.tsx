import { useEffect, useState } from 'react';
import { contact } from '../data/contact';

const slides = [
  { src: '/images/hero/hero-1-patilla', alt: 'Grabado láser en patilla de anteojo' },
  { src: '/images/hero/hero-2-estuche', alt: 'Estuche de óptica con grabado' },
  { src: '/images/hero/hero-3-lentilla', alt: 'Grabado láser sobre lentilla' },
  { src: '/images/hero/hero-4-metal', alt: 'Grabado láser sobre placa metálica' },
  { src: '/images/hero/hero-5-madera', alt: 'Grabado láser sobre madera' },
];

const ROTATE_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      <div className="relative h-[85svh] min-h-[520px] w-full bg-surface-graphite">
        {slides.map((slide, i) => (
          <picture key={slide.src}>
            <source type="image/webp" srcSet={`${slide.src}.webp`} />
            <img
              src={`${slide.src}.jpg`}
              alt={i === 0 ? slide.alt : ''}
              aria-hidden={i !== 0}
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding={i === 0 ? 'sync' : 'async'}
              className={
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-premium ' +
                (i === index ? 'opacity-100' : 'opacity-0')
              }
            />
          </picture>
        ))}

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-surface-graphite/90 via-surface-graphite/40 to-surface-graphite/10"
        />

        <div className="relative z-10 flex h-full items-end">
          <div className="max-w-content mx-auto w-full px-4 pb-12 md:px-8 md:pb-20">
            <p className="text-small uppercase text-brand-teal">
              14 años grabando anteojos · Villa Urquiza, CABA
            </p>
            <h1 className="mt-4 max-w-[20ch] font-display text-hero text-white">
              Grabado láser y tampografía para <em className="not-italic text-brand-teal">ópticas e importadores</em>.
            </h1>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#secciones"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand-blue px-6 py-4 text-caption text-white hover:bg-brand-blue-900 transition-colors duration-300 ease-premium"
              >
                Ver catálogo
                <span aria-hidden>→</span>
              </a>
              <a
                href={contact.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-pill border border-white/40 px-6 py-4 text-caption text-white hover:bg-white/10 transition-colors duration-300 ease-premium"
              >
                Pedir una muestra
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
