---
name: mobile-first-check
description: Use when reviewing or writing responsive React/Tailwind components in AisisWebsite. Verifies that base styles target mobile (375px) and that desktop adaptations are layered on via sm:/md:/lg: breakpoints — never the other way around. Also checks that the component is usable with thumb reach, readable at small sizes, and doesn't break at 1280px+ desktop.
---

# mobile-first-check

Tu trabajo es asegurar que cada componente se piense **primero para celular** y que desktop sea una capa encima, no la base.

## Principios

1. **Las clases sin prefijo son mobile.** Todo `className` base debe funcionar a 375px de ancho. Las variantes `sm:`, `md:`, `lg:`, `xl:` agregan comportamiento para pantallas más grandes — nunca al revés.

   ✅ Correcto: `<div class="flex flex-col gap-4 md:flex-row md:gap-8">`
   ❌ Incorrecto: `<div class="flex flex-row gap-8 md:flex-col md:gap-4">` (mobile recibe layout desktop)

2. **Áreas táctiles:** botones y enlaces clickeables deben tener al menos `44x44px` de área interactiva (guía WCAG / Apple HIG). En Tailwind eso equivale aprox. a `h-11 w-11` mínimo o padding generoso.

3. **Tipografía legible:** body mínimo 16px (ya definido en estilo.md). Nunca bajes de 12px ni para metadatos. Line-height >= 1.4 en párrafos.

4. **Layouts que no rompan:**
   - Grids de tarjetas: `grid-cols-1` en mobile → `sm:grid-cols-2` → `lg:grid-cols-3` o `4`. Nunca arranques en `grid-cols-4`.
   - Navegación: menú hamburguesa / drawer en mobile; menú horizontal en desktop.
   - Imágenes: `w-full` con `aspect-[ratio]` para evitar saltos de layout.

5. **Performance mobile:** imágenes con `loading="lazy"` salvo el hero, formatos modernos (webp/avif), `srcset` para densidades.

## Breakpoints de referencia

Tailwind por defecto (mantener salvo que el usuario pida otra cosa):
- `sm:` >= 640px
- `md:` >= 768px
- `lg:` >= 1024px
- `xl:` >= 1280px
- `2xl:` >= 1536px

## Checklist antes de dar por terminado un componente

- [ ] Se lee y navega bien a **375px** (iPhone SE).
- [ ] Áreas táctiles mínimo 44px.
- [ ] A **768px** (tablet) no hay zonas vacías desproporcionadas.
- [ ] A **1280px** (desktop) el contenido tiene ancho máximo razonable (`max-w-screen-xl` o similar), no se estira infinito.
- [ ] No hay scroll horizontal en ningún breakpoint.
- [ ] Imágenes tienen `alt` descriptivo y dimensiones reservadas (no causan CLS).

## Cuando dudes

Si un diseño visto en desktop no se traduce limpio a mobile, **priorizá la versión mobile** y simplificá desktop. Decile al usuario que el diseño original no se sostiene a 375px y proponé una variante. No comprometas la experiencia mobile para que desktop se vea más rico.