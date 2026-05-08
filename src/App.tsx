import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { Hero } from './components/Hero';
import { WorkshopBand } from './components/WorkshopBand';
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

const SECTION_ORDER: Section[] = ['Grabados', 'Estuches', 'Acetato'];

const SECTION_COVERS: Record<Section, { src: string; alt: string; objectClass?: string }> = {
  Grabados:   { src: '/images/sections/seccion-grabados',   alt: 'Patillas de anteojos con grabado', objectClass: 'object-top' },
  Estuches:   { src: '/images/sections/seccion-estuches',   alt: 'Estuches para óptica' },
  Acetato:    { src: '/images/sections/seccion-acetato',    alt: 'Planchas de acetato Zilo' },
  Accesorios: { src: '/images/sections/seccion-accesorios', alt: 'Paños de limpieza para óptica' },
};

// ───────────────────────── layout ─────────────────────────

function NavLink({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={
        'group relative py-1 transition-colors ' +
        (active ? 'text-ink' : 'text-ink-soft hover:text-ink')
      }
    >
      {label}
      <span
        aria-hidden
        className={
          'pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 bg-brand-teal origin-left transition-transform duration-300 ease-premium ' +
          (active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')
        }
      />
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const navItems: Array<{ label: string; to?: string; href?: string }> = [
    ...SECTION_ORDER.map((s) => ({ label: SECTION_LABEL[s], to: PATH_FOR_SECTION[s] })),
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface-paper/85 backdrop-blur-md border-b border-surface-sand">
      <div className="relative max-w-content mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Link to="/" className="flex items-center" ariaLabel="Aisis — Inicio">
          <img src="/logo.png" alt="Aisis" className="h-9 w-9 md:h-11 md:w-11 object-contain" />
        </Link>

        <Link
          to="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[1.5rem] leading-none text-ink lg:hidden"
        >
          Aisis
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-small uppercase tracking-wide">
          {navItems.map((item) =>
            item.to ? (
              <NavLink
                key={item.label}
                to={item.to}
                label={item.label}
                active={pathname === item.to}
              />
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-ink-soft hover:text-ink transition-colors"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center gap-2 rounded-pill bg-brand-blue px-6 py-3 text-caption uppercase tracking-wide text-white hover:bg-brand-blue-900 transition-colors duration-300 ease-premium"
          >
            Hablemos
            <IconArrowRight className="h-4 w-4" title="" />
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={
          'lg:hidden overflow-hidden border-t border-surface-sand bg-surface-paper transition-[max-height,opacity] duration-300 ease-premium ' +
          (open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0')
        }
      >
        <nav className="max-w-content mx-auto flex flex-col px-4 py-4 md:px-8">
          {navItems.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className={
                  'py-3 font-display text-[1.25rem] border-b border-surface-sand last:border-b-0 transition-colors ' +
                  (pathname === item.to ? 'text-brand-teal' : 'text-ink')
                }
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="py-3 font-display text-[1.25rem] text-ink border-b border-surface-sand last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ),
          )}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-pill bg-brand-blue px-6 py-3 text-caption uppercase tracking-wide text-white sm:hidden"
          >
            Hablemos
            <IconArrowRight className="h-4 w-4" title="" />
          </a>
        </nav>
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

function CategoryCard({ section }: { section: Section }) {
  const cover = SECTION_COVERS[section];
  return (
    <Link
      to={PATH_FOR_SECTION[section]}
      className="group flex flex-col"
    >
      <div className="relative aspect-[9/8] overflow-hidden rounded-[8px] bg-surface-sand">
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
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-[1.25rem] leading-tight text-ink md:text-[1.375rem]">{SECTION_LABEL[section]}</h3>
        <p className="mt-2 text-body text-ink-soft">{SECTION_SUBTITLE[section]}</p>
      </div>
    </Link>
  );
}

function Categories() {
  return (
    <section id="secciones" className="bg-surface-paper">
      <div className="max-w-content mx-auto px-4 pt-4 pb-12 md:px-8 md:py-24">
        <div className="max-w-prose">
          <h2 className="mt-3 font-display text-section text-ink">
            Nuestros productos y servicios.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
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
      <Categories />
      <WorkshopBand />
      <Contact />
    </>
  );
}

// ───────────────────────── section page ─────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const base = service.media.src.replace(/\.jpg$/, '');
  return (
    <article id={service.id} className="flex flex-col">
      <div className="relative aspect-[9/8] overflow-hidden bg-surface-sand">
        <picture>
          <source type="image/webp" srcSet={`${base}.webp`} />
          <img
            src={`${base}.jpg`}
            alt={service.media.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-[1.375rem] leading-tight text-ink">{service.title}</h3>
      </div>
    </article>
  );
}

function SectionHeader({ section }: { section: Section }) {
  return (
    <section className="bg-brand-teal-50">
      <div className="max-w-content mx-auto flex flex-col gap-3 px-4 py-5 md:flex-row md:items-baseline md:gap-8 md:px-8 md:py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-small uppercase text-ink-soft hover:text-ink transition-colors"
        >
          <span aria-hidden>←</span> Inicio
        </Link>
        <h1 className="font-display text-section leading-tight text-ink">
          {SECTION_LABEL[section]}
        </h1>
      </div>
    </section>
  );
}

function SectionPage({ section }: { section: Section }) {
  const items = catalog.filter((s) => s.section === section);
  return (
    <>
      <SectionHeader section={section} />

      {section === 'Acetato' ? (
        <AcetatoEditorial />
      ) : (
        <section className="bg-surface-cream">
          <div className="max-w-content mx-auto px-4 py-12 md:px-8 md:py-28">
            {items.length === 0 ? (
              <p className="text-body text-ink-soft">Pronto publicamos productos de esta sección.</p>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
                {items.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Contact />
    </>
  );
}

const ACETATO_USOS = [
  {
    title: 'Fabricación de armazones',
    desc: 'Frentes y patillas para anteojos en cellulose acetate de calidad óptica.',
  },
  {
    title: 'Colecciones a medida',
    desc: 'Colores y patrones específicos para una marca o línea propia.',
  },
  {
    title: 'Reposiciones y service',
    desc: 'Stock de planchas Zilo para reparaciones y reemplazos.',
  },
  {
    title: 'Prototipado',
    desc: 'Material de calidad óptica para muestras y desarrollos de producto.',
  },
];

function AcetatoEditorial() {
  const item = catalog.find((s) => s.id === 'venta-planchas-acetato');
  if (!item) return null;
  const base = item.media.src.replace(/\.jpg$/, '');

  return (
    <section className="bg-surface-cream">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[640px]">
          <picture>
            <source type="image/webp" srcSet={`${base}.webp`} />
            <img
              src={`${base}.jpg`}
              alt={item.media.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        </div>

        <div className="flex items-center px-6 py-12 md:px-12 md:py-24 lg:px-16">
          <div className="max-w-prose">
            <p className="text-small uppercase text-brand-teal">Planchas Zilo</p>
            <h2 className="mt-4 font-display text-section text-ink">
              Material para fabricar anteojos.
            </h2>
            <p className="mt-6 text-body text-ink-soft">{item.description}</p>

            <ul className="mt-12 divide-y divide-surface-sand border-t border-surface-sand">
              {ACETATO_USOS.map((uso) => (
                <li key={uso.title} className="py-6">
                  <h3 className="font-display text-[1.25rem] leading-tight text-ink">{uso.title}</h3>
                  <p className="mt-2 text-body text-ink-soft">{uso.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
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
      className="group flex flex-col justify-between gap-8 rounded-card bg-surface-paper p-6 transition-colors duration-500 ease-premium md:p-8"
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
      <div className="max-w-content mx-auto px-4 py-12 md:px-8 md:py-24">
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
              className="mt-2 inline-flex items-center font-display text-[1.25rem] text-white underline-offset-4 hover:underline"
            >
              {contact.location.label}
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
