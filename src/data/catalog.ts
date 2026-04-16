// Catálogo de servicios Aisis.
// Schema derivado de Especificaciones/contenido.md con dos extensiones pragmáticas:
//   - `products`: permite cruzar filtros producto×material sin duplicar items.
//   - `featured`: marca los servicios principales para el target B2B (óptica / importadores).
// Material `Cuero` agregado respecto al spec original por la carpeta Imagenes/Grabados en cueros.

export type Category = 'Laser' | 'Tampografia' | 'Integral';

export type Material =
  | 'Metal'
  | 'Madera'
  | 'Acetato'
  | 'Cuero'
  | 'Textil'
  | 'Plastico'
  | 'Vidrio/Lente';

export type Product = 'Anteojos' | 'Patillas' | 'Lentillas' | 'Estuches' | 'Franelas';

export type Service = {
  id: string;
  title: string;
  category: Category;
  target_material?: Material;
  products?: Product[];
  description: string;
  media: { src: string; alt: string };
  is_color_available: boolean;
  featured?: boolean;
};

export const CATEGORY_LABEL: Record<Category, string> = {
  Laser: 'Grabado Láser',
  Tampografia: 'Tampografía',
  Integral: 'Servicios Integrales',
};

export const catalog: Service[] = [
  // ──────────── Grabado Láser — por material ────────────
  {
    id: 'laser-metal',
    title: 'Grabado Láser en Metales',
    category: 'Laser',
    target_material: 'Metal',
    description:
      'Grabado sobre acero inoxidable, aluminio y latón con láser de fibra. Marca permanente y de profundidad calibrada, sin alterar la superficie del material. Enviamos muestra antes de cerrar la producción.',
    media: { src: '/images/catalog/laser-metal.jpg', alt: 'Placa de metal con grabado láser conmemorativo' },
    is_color_available: false,
  },
  {
    id: 'laser-madera',
    title: 'Grabado Láser en Madera',
    category: 'Laser',
    target_material: 'Madera',
    description:
      'Grabado sobre maderas duras y blandas con láser CO2 de potencia regulada. Borde limpio, sin carbonización, con profundidad uniforme en series extensas. Ideal para regalería, cajas y utilitarios.',
    media: { src: '/images/catalog/laser-madera.jpg', alt: 'Lápices de madera con grabado láser' },
    is_color_available: false,
  },
  {
    id: 'laser-acetato',
    title: 'Grabado Láser en Acetato',
    category: 'Laser',
    target_material: 'Acetato',
    products: ['Anteojos', 'Patillas'],
    description:
      'Grabado sobre acetato en plancha o pieza terminada. Marcado nítido que respeta color y terminación, pensado para armazones y componentes de óptica. Tolerancia mínima en la alineación del trazo.',
    media: { src: '/images/catalog/laser-acetato.jpg', alt: 'Plancha de acetato grabada con láser' },
    is_color_available: false,
  },
  {
    id: 'laser-cuero',
    title: 'Grabado Láser en Cuero',
    category: 'Laser',
    target_material: 'Cuero',
    description:
      'Grabado sobre cuero natural y sintético con ajuste fino de potencia para conservar la textura original. Marca de alto contraste visual en carteras, estuches y piezas de regalería premium.',
    media: { src: '/images/catalog/laser-cuero.jpg', alt: 'Grabado láser sobre pieza de cuero' },
    is_color_available: false,
  },

  // ──────────── Grabado Láser — por producto (óptica) ────────────
  {
    id: 'laser-anteojos',
    title: 'Grabado Láser en Anteojos',
    category: 'Laser',
    products: ['Anteojos'],
    description:
      'Marcado del logo y referencias técnicas directamente sobre anteojos terminados. Precisión sub-milimétrica y repetibilidad en serie, sin comprometer el tratamiento de la lente ni del armazón. Servicio principal para ópticas e importadores.',
    media: { src: '/images/catalog/laser-anteojos.jpg', alt: 'Anteojos con grabado láser en varilla' },
    is_color_available: false,
    featured: true,
  },
  {
    id: 'laser-patillas',
    title: 'Grabado Láser en Patillas',
    category: 'Laser',
    products: ['Patillas'],
    description:
      'Grabado de marca en patillas de acetato, metal o combinadas, con láser de fibra o CO2 según material. Disponible sin color o en láser color para impacto visual adicional. Alineación automática sobre patilla completa.',
    media: { src: '/images/catalog/laser-patillas.jpg', alt: 'Patillas de anteojos con grabado láser' },
    is_color_available: true,
    featured: true,
  },
  {
    id: 'laser-estuches',
    title: 'Grabado Láser en Estuches',
    category: 'Laser',
    products: ['Estuches'],
    description:
      'Personalización láser sobre estuches de óptica en cuero, símil cuero y materiales técnicos. Logo, nombre o código de modelo grabado de forma permanente, sin relieve que altere el cierre.',
    media: { src: '/images/catalog/laser-estuches.jpg', alt: 'Estuche de óptica con grabado láser' },
    is_color_available: false,
    featured: true,
  },
  {
    id: 'laser-franelas',
    title: 'Grabado Láser en Franelas',
    category: 'Laser',
    target_material: 'Textil',
    products: ['Franelas'],
    description:
      'Grabado sobre franelas técnicas y de limpieza de óptica. Marcado sutil que no afecta la función ni la textura del tejido. Apto para series cortas y largas con identificación de marca.',
    media: { src: '/images/catalog/laser-franelas.jpg', alt: 'Franela de limpieza de óptica con grabado' },
    is_color_available: false,
  },

  // ──────────── Tampografía ────────────
  {
    id: 'tampo-anteojos',
    title: 'Tampografía en Anteojos',
    category: 'Tampografia',
    products: ['Anteojos'],
    description:
      'Impresión sobre anteojos completos y componentes, incluso en superficies curvas y rebajes donde otras técnicas no llegan. Color preciso según pantone, ideal para marcado de marca en producción de volumen.',
    media: { src: '/images/catalog/tampo-anteojos.jpg', alt: 'Anteojos con marcado tampográfico' },
    is_color_available: true,
    featured: true,
  },
  {
    id: 'tampo-lentillas',
    title: 'Tampografía en Lentillas',
    category: 'Tampografia',
    products: ['Lentillas'],
    description:
      'Marcado tampográfico en lentillas plásticas para indicadores de modelo, ajuste y marca. Color legible, adherencia durable al tacto y a la limpieza habitual. Formato crítico para la experiencia de exhibición en óptica.',
    media: { src: '/images/catalog/tampo-lentillas.jpg', alt: 'Lentillas con impresión tampográfica' },
    is_color_available: true,
    featured: true,
  },
  {
    id: 'tampo-estuches',
    title: 'Tampografía en Estuches',
    category: 'Tampografia',
    products: ['Estuches'],
    description:
      'Impresión de logo, colección o mensaje personalizado sobre estuches rígidos y flexibles. Tinta resistente al uso diario. Compatible con series de alto volumen para marcas y cadenas de óptica.',
    media: { src: '/images/catalog/tampo-estuches.jpg', alt: 'Estuche de óptica con impresión tampográfica' },
    is_color_available: true,
    featured: true,
  },
  {
    id: 'tampo-franelas',
    title: 'Tampografía en Franelas',
    category: 'Tampografia',
    target_material: 'Textil',
    products: ['Franelas'],
    description:
      'Tampografía sobre franelas de microfibra y tejidos técnicos. Marca impresa con nitidez en formato pequeño, apta para entrega junto al armazón.',
    media: { src: '/images/catalog/tampo-franelas.jpg', alt: 'Franela con tampografía' },
    is_color_available: true,
  },

  // ──────────── Servicios Integrales ────────────
  {
    id: 'regaleria',
    title: 'Regalería Corporativa',
    category: 'Integral',
    description:
      'Producción integral de regalería promocional: selección de objeto, técnica aplicable y muestra antes de la entrega final. Combinamos grabado láser, tampografía y otros procesos según el material.',
    media: { src: '/images/catalog/regaleria.jpg', alt: 'Regalería corporativa con grabado' },
    is_color_available: true,
  },
  {
    id: 'personalizacion',
    title: 'Personalización de Objetos',
    category: 'Integral',
    description:
      'Personalización de objetos provistos por el cliente, previa evaluación de material y técnica óptima. Consultar antes de enviar la pieza.',
    media: { src: '/images/catalog/personalizacion.jpg', alt: 'Pieza personalizada en cuero grabado' },
    is_color_available: true,
  },
];
