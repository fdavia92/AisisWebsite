// Canales de contacto + ubicación de Aisis.
// Todas las CTAs del sitio convergen acá. No hay formulario; el flujo es WhatsApp / mail / Instagram.

export const contact = {
  whatsapp: {
    display: '(11) 3455-0809',
    url: 'https://wa.me/5491134550809',
    subtitle: 'Consultas, muestras y pedidos.',
  },
  email: {
    address: 'aisislaser@gmail.com',
    url: 'mailto:aisislaser@gmail.com',
    subtitle: 'Para cotizaciones por escrito y envío de archivos.',
  },
  instagram: {
    handle: '@aisislaser',
    url: 'https://www.instagram.com/aisislaser/',
    subtitle: 'Trabajos del taller.',
  },
  location: {
    label: 'Villa Urquiza, CABA',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aisis+Laser+Villa+Urquiza+CABA',
  },
  hours: 'Lunes a viernes, 9:00 a 17:00',
} as const;
