import { useEffect, useState } from 'react';

type Cell = {
  src: string;
  alt: string;
  className: string;
  delay: string;
};

const photos: Cell[] = [
  {
    src: '/images/hero/hero-1-patilla',
    alt: 'Grabado láser en patilla de anteojo',
    className: 'sm:col-start-1 sm:row-start-2',
    delay: '120ms',
  },
  {
    src: '/images/hero/hero-3-lentilla',
    alt: 'Grabado láser sobre lentilla',
    className: 'sm:col-start-2 sm:row-start-2',
    delay: '180ms',
  },
  {
    src: '/images/hero/hero-2-estuche',
    alt: 'Estuche de óptica con grabado',
    className: 'sm:col-start-1 sm:row-start-3',
    delay: '240ms',
  },
  {
    src: '/images/hero/hero-5-madera',
    alt: 'Grabado láser sobre madera',
    className: 'sm:col-start-2 sm:row-start-3',
    delay: '300ms',
  },
];

export function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section id="inicio" className="bg-surface-paper">
      <div className="max-w-content mx-auto px-4 py-8 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-3 sm:[grid-auto-rows:minmax(0,1fr)] sm:h-[calc(100svh-140px)] sm:max-h-[840px] sm:min-h-[560px] md:gap-6 md:h-[calc(100svh-173px)]">
          <div
            style={{ animationDelay: '0ms' }}
            className="animate-fade-up relative overflow-hidden hidden sm:flex flex-col justify-end rounded-card bg-white p-8 text-ink sm:col-start-1 sm:col-span-2 sm:row-start-1 sm:h-full md:p-10"
          >
            <svg
              aria-hidden
              viewBox="0 0 200 200"
              className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 text-brand-teal-50 md:-right-20 md:-bottom-20 md:h-80 md:w-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="100" cy="100" r="30" />
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="90" />
              <path d="M100 10 L100 190 M10 100 L190 100 M29 29 L171 171 M171 29 L29 171" />
            </svg>

            <div className="relative">
              <p className="text-small uppercase tracking-wide text-brand-teal">
                Grabado láser · Tampografía
              </p>
              <h1 className="mt-4 font-display text-hero leading-none text-ink">Aisis</h1>
            </div>
          </div>

          <figure
            style={{ animationDelay: '60ms' }}
            className="animate-fade-up relative overflow-hidden rounded-card bg-surface-graphite aspect-[9/16] sm:aspect-auto sm:h-full sm:col-start-3 sm:col-span-2 sm:row-start-1 sm:row-span-3"
          >
            <video
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/videos/aisis-taller-poster.webp"
              className="h-full w-full object-cover"
            >
              <source src="/videos/aisis-taller.mp4" type="video/mp4" />
            </video>
          </figure>

          {photos.map((photo) => (
            <figure
              key={photo.src}
              style={{ animationDelay: photo.delay }}
              className={
                'group relative overflow-hidden rounded-card bg-surface-sand animate-fade-up ' +
                'shadow-[0_10px_30px_-8px_rgba(0,0,0,0.28)] ' +
                'hidden sm:block sm:h-full ' +
                photo.className
              }
            >
              <picture>
                <source type="image/webp" srcSet={`${photo.src}.webp`} />
                <img
                  src={`${photo.src}.jpg`}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                />
              </picture>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
