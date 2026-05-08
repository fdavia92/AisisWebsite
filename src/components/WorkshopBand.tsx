export function WorkshopBand() {
  const src = '/images/sections/equipo-aisis';
  const alt = 'Equipo de Aisis en el taller';

  return (
    <section aria-label="El taller" className="bg-surface-cream">
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="relative aspect-[4/3] md:col-span-3 md:aspect-auto md:min-h-[520px]">
          <picture>
            <source type="image/webp" srcSet={`${src}.webp`} />
            <img
              src={`${src}.jpg`}
              alt={alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        </div>

        <div className="flex items-center px-6 py-12 md:col-span-2 md:px-12 md:py-20">
          <div className="max-w-prose">
            <h2 className="font-display text-section text-ink">El equipo</h2>
            <p className="mt-6 text-body text-ink-soft">
              Desde Villa Urquiza, trabajamos para ópticas e importadores de todo el país. Nuestro compromiso es lograr en cada pieza la prolijidad y calidad que nuestros clientes merecen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
