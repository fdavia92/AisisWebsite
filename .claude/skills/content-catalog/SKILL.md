---
name: content-catalog
description: Use when adding, removing or editing catalog entries (services, products) in AisisWebsite. Enforces the content taxonomy defined in Especificaciones/contenido.md — three top-level categories (Grabado Láser, Tampografía, Servicios Integrales), the material/product sub-taxonomy, and the required data schema (id, title, category, target_material, description, media, is_color_available).
---

# content-catalog

Responsable de que el catálogo de servicios respete la taxonomía del documento de contenido.

## Fuente de verdad

- **Datos:** [src/data/catalog.ts](../../../src/data/catalog.ts) — 14 items tipados. Es lo que renderiza la UI.
- **Spec original:** [Especificaciones/contenido.md](../../../Especificaciones/contenido.md) — taxonomía canónica. Releer si se agregan/quitan items.
- Si `catalog.ts` y `contenido.md` divergen, priorizar el código y actualizar el spec (no al revés).

## Taxonomía (no inventar categorías nuevas sin preguntar)

**3 categorías de nivel superior** — son la navegación principal del sitio:

1. **Grabado Láser** (`category: 'Laser'`)
2. **Tampografía** (`category: 'Tampografia'`)
3. **Servicios Integrales / Regalería** (`category: 'Integral'`)

**Materiales aceptados** (`target_material`, valores TS sin acentos):
`Metal` | `Madera` | `Acetato` | `Cuero` | `Textil` | `Plastico` | `Vidrio/Lente`

`Cuero` se agregó respecto al spec original porque la empresa tiene carpeta entera de trabajos en cuero y el hero usa un grabado en cuero.

Si aparece un material nuevo, pedir confirmación al usuario antes de agregarlo al enum.

**Productos aceptados** (`products[]`): `Anteojos` | `Patillas` | `Lentillas` | `Estuches` | `Franelas`.

## Schema requerido por entrada

El schema vivo está en [src/data/catalog.ts](../../../src/data/catalog.ts):

```ts
type Service = {
  id: string;                    // slug-kebab-case, único, estable (va a URL)
  title: string;                 // nombre visible, e.g. "Grabado Láser en Madera"
  category: 'Laser' | 'Tampografia' | 'Integral';
  target_material?: Material;    // opcional (algunos items son product-oriented)
  products?: Product[];          // productos a los que aplica el servicio
  description: string;           // 2-3 líneas, tono A+C neutro
  media: { src: string; alt: string };
  is_color_available: boolean;
  featured?: boolean;            // true = servicio core B2B (óptica); aparece primero en la grilla
};
```

**Campos agregados al spec:**
- `products[]` permite cruzar filtros producto×material sin duplicar entradas.
- `featured` marca servicios que son el core del negocio (óptica/importadores). La UI los ordena primero y les agrega un badge "Óptica".

## Reglas

1. **Slugs estables.** Una vez publicado un `id`, no se renombra — se deprecia con un redirect. Los IDs viven en URLs.
2. **Imágenes desde `Imagenes/`.** El repo tiene fotos organizadas por técnica/material. Copiar a `public/images/catalog/{id}.jpg` (slug matcheando el id) y mapear ahí. No referenciar rutas dentro de `Imagenes/` desde el código.
3. **Descripciones: tono A + C (aprobado 2026-04-16).**
   - Técnico / de pliego: vocabulario específico (láser CO2, fibra, pantone, profundidad calibrada, sub-milimétrica) sin caer en jerga innecesaria.
   - Cierre comercial directo cuando aplique ("Enviamos muestra antes de cerrar la producción", "Consultar antes de enviar la pieza").
   - 2–3 líneas. Sin adjetivos vacíos tipo "calidad superior", "excelencia", "lo mejor del mercado".
4. **Tratamiento neutro.** Sin voseo ("pedí", "mandá", "consultá") ni tuteo ("pide", "manda", "consulta") ni ustedeo ("pida", "mande"). Usar infinitivo ("Consultar", "Pedir muestra") o 1ª persona plural ("Enviamos", "Trabajamos", "Combinamos").
5. **Sin cifras comerciales en descripciones.** No mencionar MOQ, plazos de entrega, precios ni "muestra gratuita". Todo va por contacto — el objetivo de la descripción es que el cliente se contacte, no cerrarlo en la tarjeta.
6. **Énfasis en óptica.** El target B2B son ópticas e importadores de lentes. Los servicios con `featured: true` (todos los `products` que incluyen Anteojos/Patillas/Lentillas/Estuches en óptica) reciben la prioridad visual. Sus descripciones pueden mencionar "óptica", "importadores", "armazón", "lente" — en los no-featured evitar ese vocabulario para que no suene descontextualizado.
7. **`is_color_available`:**
   - Grabado láser: `true` si la variante color es parte del servicio, `false` para monocromo.
   - Tampografía: casi siempre `true` (la técnica permite color por definición).
   - Integral: `true` si la operación combina técnicas con color.

## Patrones comunes

- **Filtros en UI:** los filtros deben mapear 1:1 a los campos `category` y `target_material`. No crear filtros que no existan en el schema.
- **Agrupación visual:** en la home, agrupar por `category`. En una página de categoría, sub-agrupar por `target_material`.
- **Duplicación aparente:** "Grabado Láser en Anteojos" y "Grabado Láser en Patillas" son entradas separadas aunque compartan material (`Acetato`/`Metal`). Mantenerlas separadas — reflejan cómo el usuario busca.