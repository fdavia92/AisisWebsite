import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { Hero } from './components/Hero';
import { catalog, SECTION_LABEL, SECTION_SUBTITLE, type Section, type Service } from './data/catalog';
import { contact } from './data/contact';
import { IconInstagram, IconWhatsapp, IconArrowRight } from './components/icons';

// ───────────────────────── mini router (History API) ─────────────────────────

type Listener = (path: string) => void;
const listeners = new Set<Listener>();

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    for (const l of listeners) l(window.location.pathname);
  });
}

function navigate(to: string) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname === to) return;
  window.history.pushState({}, '', to);
  window.scrollTo({ top: 0, behavior: 'auto' });
  for (const l of listeners) l(to);
}

function useLocation() {
  const [pathname, setPathname] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/',
  );
  useEffect(() => {
    listeners.add(setPathname);
    return () => { listeners.delete(setPathname); };
  }, []);
  return pathname;
}

function Link({
  to,
  className,
  children,
  ariaLabel,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const onClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  }, [to]);
  return (
    <a href={to} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

// ───────────────────────── sección → URL ─────────────────────────

const PATH_FOR_SECTION: Record<Section, string> = {
  Grabados: '/grabados',
  Estuches: '/estuches',
  Acetato: '/acetato',
  Accesorios: '/accesorios',
};
const SECTION_FOR_PATH: Record<string, Section> = Object.fromEntries(
  Object.entries(PATH_FOR_SECTION).map(([k, v]) => [v, k as Section]),
);

const SECTION_ORDER: Section[] = ['Grabados', 'Estuches', 'Acetato', 'Accesorios'];

const SECTION_COVERS: Record<Section, { src: string; alt: string }> = {
  Grabados:   { src: '/images/sections/seccion-grabados',   alt: 'Patillas de anteojos con grabado' },
  Estuches:   { src: '/images/sections/seccion-estuches',   alt: 'Estuches para óptica' },
  Acetato:    { src: '/images/sections/seccion-acetato',    alt: 'Planchas de acetato Zilo' },
  Accesorios: { src: '/images/sections/seccion-accesorios', alt: 'Paños de limpieza para óptica' },
};

// ───────────────────────── layout ─────────────────────────

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface-paper/85 backdrop-blur-md border-b border-surface-sand">
      <div className="max-w-content mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Link to="/" className="flex items-center gap-3" ariaLabel="Aisis — Inicio">
          <img src="/logo.png" alt="" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
          <span className="font-display text-[1.25rem] md:text-[1.5rem] font-semibold tracking-tight text-ink">
            Aisis
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-body text-ink-soft">
          <Link to="/" className="hover:text-ink transition-colors">Inicio</Link>
          <a href="#contacto" className="hover:text-ink transition-colors">Contacto</a>
        </nav>

        <a
          href={contact.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-pill bg-brand-blue px-4 py-2 md:px-6 md:py-3 text-caption text-white hover:bg-brand-blue-900 transition-colors duration-300 ease-premium"
        >
          Pedir muestra
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
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
            href={contact.email.url}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
            aria-label={`Email ${contact.email.address}`}
          >
            <MailIcon className="h-4 w-4" />
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

// ───────────────────────── home ─────────────────────────

function CredibilityStrip() {
  const items = [
    '14 años grabando anteojos',
    'Villa Urquiza, CABA',
    'Envíos a todo el país',
  ];
  return (
    <section aria-label="Nosotros" className="bg-surface-paper border-b border-surface-sand">
      <div className="max-w-content mx-auto flex flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between md:gap-8 md:px-8 md:py-10">
        {items.map((text, i) => (
          <div key={text} className="flex items-center gap-4 md:flex-1 md:justify-center">
            {i > 0 && <span aria-hidden className="hidden md:inline text-ink-mute">·</span>}
            <p className="text-caption uppercase tracking-wide text-ink">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ section }: { section: Section }) {
  const cover = SECTION_COVERS[section];
  return (
    <Link
      to={PATH_FOR_SECTION[section]}
      className="group flex flex-col overflow-hidden rounded-card bg-surface-paper transition-colors duration-500 ease-premium hover:bg-brand-teal-50"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-sand">
        <picture>
          <source type="image/webp" srcSet={`${cover.src}.webp`} />
          <img
            src={`${cover.src}.jpg`}
            alt={cover.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
          />
        </picture>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-[1.375rem] leading-tight text-ink">{SECTION_LABEL[section]}</h3>
        <p className="mt-2 text-body text-ink-soft">{SECTION_SUBTITLE[section]}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-caption text-brand-blue transition-colors group-hover:text-brand-blue-900">
          Ver
          <span aria-hidden className="transition-transform duration-300 ease-premium group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

function Categories() {
  return (
    <section id="secciones" className="bg-surface-paper">
      <div className="max-w-content mx-auto px-4 py-16 md:px-8 md:py-20">
        <div className="max-w-prose">
          <p className="text-small uppercase text-brand-teal">Qué hacemos</p>
          <h2 className="mt-3 font-display text-section text-ink">
            Cuatro rubros, un mismo taller.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {SECTION_ORDER.map((section) => (
            <CategoryCard key={section} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <Categories />
      <Contact />
    </>
  );
}

// ───────────────────────── section page ─────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const base = service.media.src.replace(/\.jpg$/, '');
  return (
    <article
      id={service.id}
      className="group flex flex-col overflow-hidden rounded-card bg-surface-paper transition-colors duration-500 ease-premium hover:bg-brand-teal-50"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-sand">
        <picture>
          <source type="image/webp" srcSet={`${base}.webp`} />
          <img
            src={`${base}.jpg`}
            alt={service.media.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
          />
        </picture>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-[1.25rem] leading-tight text-ink">{service.title}</h3>
        <p className="mt-2 flex-1 text-body text-ink-soft">{service.description}</p>
        <a
          href="#contacto"
          className="mt-5 inline-flex items-center gap-2 text-caption text-brand-blue hover:text-brand-blue-900 transition-colors"
        >
          Consultar
          <span aria-hidden className="transition-transform duration-300 ease-premium group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}

function SectionPage({ section }: { section: Section }) {
  const items = catalog.filter((s) => s.section === section);
  return (
    <>
      <section className="bg-surface-paper border-b border-surface-sand">
        <div className="max-w-content mx-auto px-4 py-10 md:px-8 md:py-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-small uppercase text-ink-soft hover:text-ink transition-colors"
          >
            <span aria-hidden>←</span> Inicio
          </Link>
          <h1 className="mt-4 font-display text-section text-ink">{SECTION_LABEL[section]}</h1>
          <p className="mt-3 max-w-prose text-body text-ink-soft">{SECTION_SUBTITLE[section]}</p>
        </div>
      </section>

      <section className="bg-surface-cream">
        <div className="max-w-content mx-auto px-4 py-14 md:px-8 md:py-20">
          {items.length === 0 ? (
            <p className="text-body text-ink-soft">Pronto publicamos productos de esta sección.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {items.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Contact />
    </>
  );
}

// ───────────────────────── contact + footer pieces ─────────────────────────

function ChannelCard({
  href,
  eyebrow,
  title,
  subtitle,
  icon,
  iconBg,
  external = true,
}: {
  href: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  iconBg: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
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

function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function Contact() {
  return (
    <section id="contacto" className="bg-surface-graphite">
      <div className="max-w-content mx-auto px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-prose">
          <p className="text-small uppercase text-brand-teal">Contacto</p>
          <h2 className="mt-3 font-display text-section text-white">
            Escribinos por WhatsApp o mail.
          </h2>
          <p className="mt-4 text-body text-white/70">
            Para clientes del interior recibimos mercadería de proveedores locales, realizamos el servicio y despachamos al domicilio del cliente.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <ChannelCard
            href={contact.whatsapp.url}
            eyebrow="WhatsApp"
            title={contact.whatsapp.display}
            subtitle={contact.whatsapp.subtitle}
            icon={<IconWhatsapp className="h-6 w-6" title="" />}
            iconBg="bg-brand-teal"
          />
          <ChannelCard
            href={contact.email.url}
            eyebrow="Email"
            title={contact.email.address}
            subtitle={contact.email.subtitle}
            icon={<MailIcon className="h-6 w-6" />}
            iconBg="bg-brand-blue"
            external={false}
          />
          <ChannelCard
            href={contact.instagram.url}
            eyebrow="Instagram"
            title={contact.instagram.handle}
            subtitle={contact.instagram.subtitle}
            icon={<IconInstagram className="h-6 w-6" title="" />}
            iconBg="bg-ink"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-2">
          <div>
            <p className="text-small uppercase text-white/50">Ubicación</p>
            <a
              href={contact.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-display text-[1.25rem] text-white hover:text-brand-teal transition-colors"
            >
              {contact.location.label}
              <span aria-hidden className="text-small">→</span>
            </a>
          </div>
          <div>
            <p className="text-small uppercase text-white/50">Horario</p>
            <p className="mt-2 font-display text-[1.25rem] text-white">{contact.hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── app root ─────────────────────────

export default function App() {
  const pathname = useLocation();
  const section = SECTION_FOR_PATH[pathname];

  return (
    <>
      <Header />
      <main id="main">
        {section ? <SectionPage section={section} /> : <Home />}
      </main>
      <Footer />
    </>
  );
}
