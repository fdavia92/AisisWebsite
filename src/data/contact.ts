// Canales de contacto de Aisis.
// Toda navegación comercial del sitio converge acá. No hay formulario de email ni
// página de "cotización online" — el flujo es: tarjeta → #contacto → WhatsApp o Instagram.

export const contact = {
  whatsapp: {
    display: '(11) 3455-0809',
    // Formato E.164 para wa.me — Argentina móvil: 54 + 9 + area + número.
    url: 'https://wa.me/5491134550809',
    subtitle: 'Consultas, muestras y pedidos. Respuesta en horario comercial.',
  },
  instagram: {
    handle: '@aisislaser',
    url: 'https://www.instagram.com/aisislaser/',
    subtitle: 'Trabajos recientes y detrás de escena del taller.',
  },
} as const;
