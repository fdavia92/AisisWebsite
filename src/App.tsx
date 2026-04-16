import { type ReactNode } from 'react';
import { catalog, CATEGORY_LABEL, type Service } from './data/catalog';
import { contact } from './data/contact';
import { IconInstagram, IconWhatsapp, IconArrowRight } from './components/icons';

type Technique = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const techniques: Technique[] = [
  {
    eyebrow: '01 · Grabado láser',
    title: 'Precisión que respeta el material.',
    description:
      'Metal, madera, acetato o cuero: grabamos con detalle sub-milimétrico sin alterar la estructura original de la pieza.',
    image: '/images/catalog/laser-anteojos.jpg',
    imageAlt: 'Grabado láser de referencias técnicas en patilla de armazón de óptica',
  },
  {
    eyebrow: '02 · Tampografía',
    title: 'Color donde otras técnicas no llegan.',
    description:
      'Impresión indirecta sobre anteojos, lentillas, estuches y franelas. Ideal para logos de óptica y series de volumen.',
    image: '/images/estuche-barrivell.jpg',
    imageAlt: 'Estuche para anteojos Barrivell con logo tampografiado',
  },
  {
    eyebrow: '03 · Regalería',
    title: 'Objetos que se recuerdan.',
    description:
      'Regalos corporativos y personalización de objetos propios del cliente, sujeto a evaluación de material.',
    image: '/images/lapices-scout.jpg',
    imageAlt: 'Lápices de madera con grabado láser del grupo Scout',
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface-paper/85 backdrop-blur-md border-b border-surface-sand">
      <div className="max-w-content mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Aisis — Inicio">
          <img src="/logo.png" alt="" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
          <span className="font-display text-[1.25rem] md:text-[1.5rem] font-semibold tracking-tight text-ink">
            Aisis
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-body text-ink-soft">
          <a href="#tecnicas" className="hover:text-ink transition-colors">Técnicas</a>
          <a href="#catalogo" className="hover:text-ink transition-colors">Catálogo</a>
          <a href="#contacto" className="hover:text-ink transition-colors">Contacto</a>
        </nav>

        <a
          href="#contacto"
          className="inline-flex items-center gap-2 rounded-pill bg-brand-blue px-4 py-2 md:px-6 md:py-3 text-caption text-white hover:bg-brand-blue-900 transition-colors duration-300 ease-premium"
        >
          Cotizar
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      <div className="relative h-[85svh] min-h-[520px] w-full">
        <img
          src="/images/hero-grifo-cuero.jpg"
          alt="Grabado láser de un grifo sobre cuero natural — pieza de muestra Aisis"
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
          fetchPriority="high"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-surface-graphite/90 via-surface-graphite/40 to-surface-graphite/10"
        />

        <div className="relative z-10 flex h-full items-end">
          <div className="max-w-content mx-auto w-full px-4 pb-12 md:px-8 md:pb-20">
            <p className="text-small uppercase text-brand-teal animate-fade-up [animation-delay:100ms]">
              Grabado láser · Tampografía · Regalería
            </p>
            <h1 className="mt-4 max-w-[18ch] font-display text-hero text-white animate-fade-up [animation-delay:200ms]">
              Grabados que <em className="not-italic text-brand-teal">hablan</em> de precisión.
            </h1>
            <p className="mt-6 max-w-prose text-body text-white/80 animate-fade-up [animation-delay:350ms]">
              Trabajamos con ópticas, importadores y marcas que no aceptan un trazo torcido.
              Técnica industrial, acabado artesanal.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up [animation-delay:500ms]">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand-blue px-6 py-4 text-caption text-white hover:bg-brand-blue-900 transition-colors duration-300 ease-premium"
              >
                Ver catálogo
                <span aria-hidden>→</span>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 rounded-pill border border-white/40 px-6 py-4 text-caption text-white hover:bg-white/10 transition-colors duration-300 ease-premium"
              >
                Cotizar un pedido
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Techniques() {
  return (
    <section id="tecnicas" className="bg-surface-paper">
      <div className="max-w-content mx-auto px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-prose">
          <p className="text-small uppercase text-brand-teal">Tres líneas, un mismo estándar</p>
          <h2 className="mt-3 font-display text-section text-ink">
            De la idea a la pieza terminada, sin compromisos.
          </h2>
          <p className="mt-4 text-body text-ink-soft">
            Cada técnica está calibrada para su material. Mostramos muestras reales antes de producir en serie.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {techniques.map((t) => (
            <article
              key={t.eyebrow}
              className="group flex flex-col overflow-hidden rounded-card bg-surface-cream transition-colors duration-500 ease-premium hover:bg-brand-teal-50"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-sand">
                <img
                  src={t.image}
                  alt={t.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="text-small uppercase text-ink-soft">{t.eyebrow}</p>
                <h3 className="mt-3 font-display text-[1.5rem] leading-tight text-ink">{t.title}</h3>
                <p className="mt-3 text-body text-ink-soft">{t.description}</p>
                <a
                  href="#catalogo"
                  className="mt-6 inline-flex items-center gap-2 text-caption text-brand-blue hover:text-brand-blue-900 transition-colors"
                >
                  Ver trabajos
                  <span aria-hidden className="transition-transform duration-300 ease-premium group-hover:translate-x-1">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const chip = service.target_material ?? service.products?.[0];
  return (
    <article
      id={service.id}
      className="group flex flex-col overflow-hidden rounded-card bg-surface-cream transition-colors duration-500 ease-premium hover:bg-brand-teal-50"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-sand">
        <img
          src={service.media.src}
          alt={service.media.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
        />
        {service.featured && (
          <span className="absolute left-4 top-4 rounded-pill bg-surface-paper/95 px-3 py-1 text-small uppercase text-brand-blue">
            Óptica
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-small uppercase text-ink-soft">
          <span>{CATEGORY_LABEL[service.category]}</span>
          {chip && (
            <>
              <span aria-hidden className="text-ink-mute">·</span>
              <span>{chip}</span>
            </>
          )}
          {service.is_color_available && (
            <>
              <span aria-hidden className="text-ink-mute">·</span>
              <span className="text-brand-teal">color</span>
            </>
          )}
        </div>
        <h3 className="mt-3 font-display text-[1.375rem] leading-tight text-ink">{service.title}</h3>
        <p className="mt-3 flex-1 text-body text-ink-soft">{service.description}</p>
        <a
          href="#contacto"
          className="mt-6 inline-flex items-center gap-2 text-caption text-brand-blue hover:text-brand-blue-900 transition-colors"
        >
          Consultar
          <span
            aria-hidden
            className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </article>
  );
}

function Catalog() {
  const sorted = [...catalog].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured),
  );

  return (
    <section id="catalogo" className="bg-surface-cream">
      <div className="max-w-content mx-auto px-4 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-prose">
            <p className="text-small uppercase text-brand-teal">Catálogo</p>
            <h2 className="mt-3 font-display text-section text-ink">
              Catorce servicios, un mismo estándar técnico.
            </h2>
            <p className="mt-4 text-body text-ink-soft">
              Destacamos primero los servicios más solicitados por ópticas e importadores.
              Consultar por material o producto específico; toda pieza se valida con muestra previa.
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex w-fit items-center gap-2 rounded-pill bg-brand-blue px-6 py-4 text-caption text-white hover:bg-brand-blue-900 transition-colors duration-300 ease-premium"
          >
            Pedir cotización
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {sorted.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelCard({
  href,
  eyebrow,
  title,
  subtitle,
  icon,
  iconBg,
}: {
  href: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  iconBg: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between gap-8 rounded-card bg-surface-paper p-6 transition-colors duration-500 ease-premium hover:bg-brand-teal-50 md:p-8"
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${iconBg}`}>
          {icon}
        </div>
        <div>
          <p className="text-small uppercase text-ink-soft">{eyebrow}</p>
          <p className="font-display text-[1.5rem] leading-tight text-ink">{title}</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-4">
        <p className="max-w-[26ch] text-body text-ink-soft">{subtitle}</p>
        <IconArrowRight
          className="h-6 w-6 shrink-0 text-brand-blue transition-transform duration-300 ease-premium group-hover:translate-x-1"
          title=""
        />
      </div>
    </a>
  );
}

function Contact() {
  return (
    <section id="contacto" className="bg-surface-graphite">
      <div className="max-w-content mx-auto px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-prose">
          <p className="text-small uppercase text-brand-teal">Contacto</p>
          <h2 className="mt-3 font-display text-section text-white">
            Pieza, idea o referencia — respondemos por el canal que prefieras.
          </h2>
          <p className="mt-4 text-body text-white/70">
            WhatsApp es el canal más rápido para consultas de volumen, tiempos y muestras.
            En Instagram publicamos el trabajo reciente del taller.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <ChannelCard
            href={contact.whatsapp.url}
            eyebrow="WhatsApp"
            title={contact.whatsapp.display}
            subtitle={contact.whatsapp.subtitle}
            icon={<IconWhatsapp className="h-6 w-6" title="" />}
            iconBg="bg-brand-teal"
          />
          <ChannelCard
            href={contact.instagram.url}
            eyebrow="Instagram"
            title={contact.instagram.handle}
            subtitle={contact.instagram.subtitle}
            icon={<IconInstagram className="h-6 w-6" title="" />}
            iconBg="bg-brand-blue"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-graphite border-t border-white/10">
      <div className="max-w-content mx-auto flex flex-col items-start gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="h-7 w-7 object-contain opacity-90" />
          <span className="font-display text-body text-white">Aisis</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={contact.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
            aria-label={`WhatsApp ${contact.whatsapp.display}`}
          >
            <IconWhatsapp className="h-4 w-4" title="" />
          </a>
          <a
            href={contact.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
            aria-label={`Instagram ${contact.instagram.handle}`}
          >
            <IconInstagram className="h-4 w-4" title="" />
          </a>
        </div>

        <p className="text-small uppercase text-white/40">© {new Date().getFullYear()} Aisis</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Techniques />
        <Catalog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
