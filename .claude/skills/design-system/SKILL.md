---
name: design-system
description: Use when creating or editing React components, Tailwind config, or any UI styling in AisisWebsite. Enforces the approved Aisis design system — brand colors derived from the logo (deep royal blue + teal), warm editorial neutrals (paper/cream/sand/graphite), Fraunces display serif + Inter sans, and flat-design rules (no box-shadow for separation). The canonical tokens live in tailwind.config.ts; this file explains the *intent* behind them.
---

# design-system

Responsable de que todo lo visual respete el sistema aprobado para Aisis (premium / artisan, B2B para óptica e importadores de lentes, armonía con logo).

## Fuente de verdad

- **Tokens:** [tailwind.config.ts](../../../tailwind.config.ts) — única fuente autoritativa. Si falta un token, agregarlo ahí; no hardcodear.
- **Intent/historia:** [Especificaciones/estilo.md](../../../Especificaciones/estilo.md) — spec original (incluye decisiones que quedaron obsoletas tras la propuesta aprobada; usar como referencia histórica, no como verdad actual).

## Paleta aprobada

### Brand (del logo)
- `brand-blue` `#003098` — CTA primario, links, focus ring. Tal cual del logo (letras AISIS).
- `brand-blue-900` `#001f6b` — hover/active del blue.
- `brand-teal` `#30a090` — accent, success, hover cruzado. Tal cual del logo (mandala).
- `brand-teal-50` `#d9ebe6` — badges, fondos suaves de sección.

### Surface (cálida, editorial)
- `surface-paper` `#faf7f0` — fondo principal (crema amarillo suave).
- `surface-cream` `#f0ebe0` — divisores, hover de cards, secciones alternas.
- `surface-sand` `#e5e5e0` — cards inactivas / zonas neutras.
- `surface-graphite` `#1a1a1f` — footer, overlays sobre fotografía del hero.

### Ink (texto)
- `ink` (DEFAULT) `#1a1a1f` — titulares y body primario.
- `ink-soft` `#56564f` — texto secundario, metadatos, descripciones.
- `ink-mute` `#91918c` — disabled, helper text.

### Status
- `status-success` `#30a090` (= brand-teal) — validaciones ok.
- `status-warning` `#b87a2e` — alertas suaves.
- `status-danger` `#8a2a2a` — errores; burgundy premium, no rojo puro.

## Reglas duras (no se rompen)

1. **Sin `box-shadow` para separar contenedores.** La separación se logra con color de superficie (paper ↔ cream ↔ sand ↔ graphite) y spacing. Única excepción: el anillo de `:focus-visible` sólido (no blur).

2. **No Pinterest Red.** El rojo `#e60023` del spec original fue reemplazado por `brand-blue` como CTA. No lo reintroducir.

3. **Brand colors solo como se listan arriba.** No crear tonos intermedios sin pedir. Sí está permitido usar opacity (`/10`, `/40`, `/80`) sobre graphite o white para overlays.

4. **Spacing:** el spec dice múltiplos exclusivos de 4 — en la práctica el token scale incluye `48/64/80/96/128` para spacing de sección (layout), además del rango component-level `4/8/12/16/24/32`. No uses valores Tailwind default que caigan fuera (ej. `p-5`, `gap-10`). Si necesitás uno nuevo, agregalo al config.

5. **Border-radius:** solo `sm (12)`, `card (16)`, `lg (20)`, `xl (28)`, `pill (40)`, o `rounded-full`. Nunca `rounded-md`, `rounded-2xl` arbitrarios.

6. **Tipografía:**
   - `font-display` = **Fraunces** — solo para h1/h2/h3 y números grandes.
   - `font-sans` = **Inter** — body, UI, botones, meta.
   - Escala: `text-hero` (clamp 36→70px), `text-section` (clamp 24→28px), `text-body` (16), `text-caption` (14 bold), `text-small` (12 uppercase, tracked).

7. **Mobile-first siempre.** Clases sin prefijo = mobile (375px). `sm:/md:/lg:` agregan desktop. Ver skill [mobile-first-check](../mobile-first-check/SKILL.md).

## Botones

- **Primary:** `rounded-pill bg-brand-blue text-white hover:bg-brand-blue-900 px-6 py-4`.
- **Secondary / ghost sobre graphite:** `rounded-pill border border-white/40 text-white hover:bg-white/10`.
- **Ghost sobre paper:** `text-brand-blue hover:text-brand-blue-900` sin fondo, solo texto + flecha animada.
- Áreas táctiles mínimo 44x44px.

## Dinamismo permitido (spec dice "flat" pero movimiento sí)

- `animate-fade-up` para reveal on load/scroll (600ms, `ease-premium`).
- `animate-ken-burns` para imágenes de hero (18s, muy sutil).
- Hover: `scale-[1.04]` en imágenes de card (700ms), `translate-x-1` en flechas (300ms).
- Timing base: `ease-premium` = `cubic-bezier(0.22, 1, 0.36, 1)`. Durations típicas: 300ms (hover) / 600ms (reveal).
- Evitar bounces, overshoots o micro-animaciones "juguetonas". Tono: premium, sobrio.

## Anti-patterns

- ❌ `shadow-*`, `drop-shadow-*` en tarjetas, headers o contenedores.
- ❌ Colores hex inline en JSX (`style={{ color: '#...' }}`).
- ❌ Fuentes distintas de Fraunces/Inter.
- ❌ Values arbitrarios (`text-[15px]`, `bg-[#abc]`) salvo que ya exista en el config y no se haya podido expresar con token.
- ❌ `rounded-2xl`, `rounded-md` no mapeados.
- ❌ CTAs que no sean `brand-blue` (o su ghost equivalente).
- ❌ Reintroducir Pinterest Red.