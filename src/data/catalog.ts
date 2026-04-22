// Catálogo Aisis — reorganizado por sección de home (Grabados / Estuches / Acetato / Accesorios).
// `category` se mantiene como tag técnico para uso futuro (filtros, SEO); no se usa en render.
// Descripciones: placeholder factual de una línea. El cliente reescribe en la próxima ronda.

export type Category = 'Laser' | 'Tampografia' | 'Integral';

export type Section = 'Grabados' | 'Estuches' | 'Acetato' | 'Accesorios';

export type Service = {
  id: string;
  title: string;
  section: Section;
  category: Category;
  description: string;
  media: { src: string; alt: string };
};

export const SECTION_LABEL: Record<Section, string> = {
  Grabados: 'Grabados',
  Estuches: 'Venta de estuches',
  Acetato: 'Venta de planchas de acetato',
  Accesorios: 'Venta de accesorios',
};

export const SECTION_SUBTITLE: Record<Section, string> = {
  Grabados: 'Grabado láser y tampografía sobre anteojos, estuches, metal, madera, cuero y franelas.',
  Estuches: 'Estuches rígidos, flexibles e infantiles para óptica.',
  Acetato: 'Planchas de acetato para la industria óptica.',
  Accesorios: 'Paños de limpieza y otros accesorios para óptica.',
};

export const catalog: Service[] = [
  // ──────────── Grabados ────────────
  {
    id: 'laser-anteojos',
    title: 'Grabado láser en anteojos',
    section: 'Grabados',
    category: 'Laser',
    description: 'Grabado láser sobre anteojos terminados. Servicio principal para ópticas.',
    media: { src: '/images/catalog/laser-anteojos.jpg', alt: 'Anteojos con grabado láser' },
  },
  {
    id: 'laser-patillas',
    title: 'Grabado láser en patillas',
    section: 'Grabados',
    category: 'Laser',
    description: 'Grabado de marca en patillas de anteojos, con o sin color.',
    media: { src: '/images/catalog/laser-patillas.jpg', alt: 'Patillas de anteojos con grabado láser' },
  },
  {
    id: 'laser-lentillas',
    title: 'Láser en lentillas',
    section: 'Grabados',
    category: 'Laser',
    description: 'Marcado láser sobre lentillas plásticas.',
    media: { src: '/images/catalog/laser-lentillas.jpg', alt: 'Lentillas con grabado láser' },
  },
  {
    id: 'tampo-anteojos',
    title: 'Tampografía en anteojos',
    section: 'Grabados',
    category: 'Tampografia',
    description: 'Impresión tampográfica sobre anteojos y componentes.',
    media: { src: '/images/catalog/tampo-anteojos.jpg', alt: 'Anteojos con marcado tampográfico' },
  },
  {
    id: 'tampo-estuches',
    title: 'Tampografía en estuches',
    section: 'Grabados',
    category: 'Tampografia',
    description: 'Impresión de logo o colección sobre estuches.',
    media: { src: '/images/catalog/tampo-estuches.jpg', alt: 'Estuche con tampografía' },
  },
  {
    id: 'laser-estuches',
    title: 'Grabado láser en estuches',
    section: 'Grabados',
    category: 'Laser',
    description: 'Grabado láser permanente sobre estuches de óptica.',
    media: { src: '/images/catalog/laser-estuches.jpg', alt: 'Estuche con grabado láser' },
  },
  {
    id: 'laser-metal',
    title: 'Grabado láser en metal',
    section: 'Grabados',
    category: 'Laser',
    description: 'Grabado sobre acero, aluminio y latón con láser de fibra.',
    media: { src: '/images/catalog/laser-metal.jpg', alt: 'Pieza metálica con grabado láser' },
  },
  {
    id: 'laser-madera',
    title: 'Grabado láser en madera',
    section: 'Grabados',
    category: 'Laser',
    description: 'Grabado sobre madera con láser CO2.',
    media: { src: '/images/catalog/laser-madera.jpg', alt: 'Objeto de madera con grabado láser' },
  },
  {
    id: 'laser-cuero',
    title: 'Grabado láser en cuero',
    section: 'Grabados',
    category: 'Laser',
    description: 'Grabado sobre cuero natural y sintético.',
    media: { src: '/images/catalog/laser-cuero.jpg', alt: 'Cuero con grabado láser' },
  },
  {
    id: 'laser-franelas',
    title: 'Grabado láser en franelas',
    section: 'Grabados',
    category: 'Laser',
    description: 'Grabado sobre franelas de microfibra para óptica.',
    media: { src: '/images/catalog/laser-franelas.jpg', alt: 'Franela con grabado láser' },
  },
  {
    id: 'tampo-franelas',
    title: 'Tampografía en franelas',
    section: 'Grabados',
    category: 'Tampografia',
    description: 'Tampografía sobre franelas de microfibra.',
    media: { src: '/images/catalog/tampo-franelas.jpg', alt: 'Franela con tampografía' },
  },

  // ──────────── Estuches ────────────
  {
    id: 'venta-estuches-infantil',
    title: 'Estuches infantiles',
    section: 'Estuches',
    category: 'Integral',
    description: 'Estuches para anteojos infantiles.',
    media: { src: '/images/catalog/venta-estuches-1.jpg', alt: 'Estuches infantiles para óptica' },
  },
  {
    id: 'venta-estuches-rigidos',
    title: 'Estuches rígidos',
    section: 'Estuches',
    category: 'Integral',
    description: 'Estuches rígidos para anteojos de óptica.',
    media: { src: '/images/catalog/venta-estuches-3.jpg', alt: 'Estuche rígido para óptica' },
  },
  {
    id: 'venta-estuches-flex',
    title: 'Estuches flexibles',
    section: 'Estuches',
    category: 'Integral',
    description: 'Estuches flexibles para óptica.',
    media: { src: '/images/catalog/venta-estuches-2.jpg', alt: 'Estuche flexible para óptica' },
  },

  // ──────────── Acetato ────────────
  {
    id: 'venta-planchas-acetato',
    title: 'Planchas de acetato',
    section: 'Acetato',
    category: 'Integral',
    description: 'Planchas de acetato Zilo. Consultar stock y medidas.',
    media: { src: '/images/catalog/venta-planchas-acetato.jpg', alt: 'Planchas de acetato Zilo' },
  },

  // ──────────── Accesorios ────────────
  {
    id: 'venta-panios-limpieza',
    title: 'Paños de limpieza',
    section: 'Accesorios',
    category: 'Integral',
    description: 'Paños de microfibra para óptica.',
    media: { src: '/images/catalog/venta-panios-limpieza.jpg', alt: 'Paños de limpieza para óptica' },
  },
];
