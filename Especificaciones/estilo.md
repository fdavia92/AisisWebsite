Aquí tienes una especificación de diseño formateada en Markdown, lista para ser copiada y pegada en tu repositorio de GitHub (por ejemplo, en un archivo `DESIGN_SYSTEM.md` o dentro de tu `README.md`).

Está estructurada para ser clara, directa y fácil de leer para cualquier desarrollador o diseñador que contribuya al proyecto.

***

# Especificación del Sistema de Diseño (Estilo Pinterest)

Este documento define las características de diseño, tokens y componentes principales para la interfaz de usuario del proyecto. El diseño se basa en una estética limpia, cálida y centrada en el contenido visual.

## 01 / Paleta de Colores

Los colores están divididos según su propósito en la interfaz.

### Marca y Texto Principal
| Color | Hex | Uso |
| :--- | :--- | :--- |
| **Pinterest Red** | `#e60023` | Call to Action (CTA) principal, elementos de marca. |
| **Plum Black** | `#211922` | Texto principal, títulos, alto contraste. |
| **Green 700** | `#103c25` | Mensajes de éxito, estados positivos. |

### Neutros Cálidos y Superficies
| Color | Hex | Uso |
| :--- | :--- | :--- |
| **Olive Gray** | `#62625b` | Texto secundario, descripciones. |
| **Warm Silver** | `#91918c` | Bordes por defecto, elementos silenciados (muted). |
| **Sand Gray** | `#e5e5e0` | Botones secundarios, fondos inactivos. |
| **Warm Light** | `#e0e0d9` | Fondos para botones circulares o iconos. |
| **Fog** | `#f6f6f3` | Superficies claras, fondos de tarjetas/secciones. |
| **Dark** | `#33332e` | Footer, fondos oscuros de contraste. |

### Interactivos y Estados
| Color | Hex | Uso |
| :--- | :--- | :--- |
| **Focus Blue** | `#435ee5` | Anillos de enfoque (accesibilidad/navegación por teclado). |
| **Link Blue** | `#2b48d4` | Enlaces de texto. |
| **Purple** | `#6845ab` | Indicadores de rendimiento / analíticas. |

---

## 02 / Tipografía

La familia tipográfica principal es **Pin Sans**. La escala tipográfica está definida para mantener la jerarquía visual.

* **Display Hero:** `70px` | Peso: `600` | Familia: *Pin Sans*
* **Section Heading:** `28px` | Peso: `700` | Letter-spacing: `-1.2px`
* **Body:** `16px` | Peso: `400` | Line-height: `1.40` | Familia: *Pin Sans* (Ej: "Descubre ideas creativas que inspiran".)
* **Caption Bold:** `14px` | Peso: `700` (Ej: "Tendencias actuales")
* **Small:** `12px` | Peso: `500` (Ej: metadatos, "1,234 pines")

---

## 03 / Botones

Componentes de acción clasificados por jerarquía.

1.  **Primary Red:** Botón principal de la aplicación (Ej: "Sign up" / "Guardar"). Fondo `#e60023`, texto blanco.
2.  **Secondary Sand:** Acciones secundarias (Ej: "Log in" / "Cancelar"). Fondo `#e5e5e0`, texto `#211922`.
3.  **Circular:** Botones de acción rápida basados en iconos (Ej: Icono de corazón "❤"). Fondo `#e0e0d9`.
4.  **Ghost / Transparent:** Acciones de baja prioridad. Sin fondo visible hasta el hover.

---

## 04 / Tarjetas (Cards)

Las tarjetas son el contenedor principal de contenido. Su estructura debe priorizar la imagen ("Pin photo") seguida del contexto textual.

**Estructura Base:**
1.  **Media:** Imagen destacada (Pin photo).
2.  **Título:** Texto principal (Body o Caption Bold).
3.  **Subtítulo:** Texto descriptivo (Small u Olive Gray).

**Ejemplos de Casos de Uso:**
* **Cena entre semana:** Imagen + *Quick recipes for busy evenings*
* **Decoración del hogar:** Imagen + *Inspiration for every room*
* **Ideas de viaje:** Imagen + *Destinations worth exploring*
* **Moda:** Imagen + *Outfit ideas for every season*

---

## 05 / Formularios

Los elementos de entrada de datos (Inputs) responden visualmente a la interacción del usuario.

* **Default:** Borde estándar utilizando **Warm Silver** (`#91918c`).
* **Focus:** Al seleccionar el campo, el borde cambia y se añade un anillo exterior usando **Focus Blue** (`#435ee5`).
* **Error:** Borde y texto de ayuda en rojo para indicar validaciones fallidas.
* **Tipos de campos base:** Email, Username, Password, Textarea ("About you").

---

## 06 / Espaciado (Spacing)

Sistema de espaciado basado en múltiplos de 4 y 8 para márgenes (margin) y rellenos (padding). Usar exclusivamente los siguientes valores en píxeles:

`4` | `8` | `12` | `16` | `24` | `32`

---

## 07 / Radio de Borde (Border Radius)

Curvaturas estandarizadas para contenedores, botones e imágenes.

* `12px`: Elementos pequeños.
* `16px`: Tarjetas estándar.
* `20px`: Tarjetas grandes o modales.
* `28px`: Elementos contenedores amplios.
* `40px`: Botones redondeados.
* `50%`: Elementos perfectamente circulares (avatares, botones de icono).

---

## 08 / Elevación y Profundidad (Elevation)

**Filosofía de diseño plano (Flat Design):**
* **Flat (Sin sombras):** El diseño está impulsado por el contenido. No se deben usar sombras (`box-shadow`) para separar contenedores básicos. La separación visual se logra mediante el uso de los colores de superficie cálidos (Fog, Sand Gray) y el espaciado.
* **Focus:** La profundidad interactiva se indica mediante anillos de enfoque de color sólido (Blue focus ring), no mediante sombras difuminadas.
* **Excepción:** La profundidad debe provenir de la fotografía del contenido en sí, manteniendo la interfaz lo más plana e invisible posible.