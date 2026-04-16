Aquí tienes una especificación orientada al contenido, diseñada para estructurar la información de los servicios en tu repositorio. 

Esta estructura no solo lista los servicios, sino que los organiza en una **taxonomía lógica** (categorías, materiales y productos). Esto facilitará la creación de bases de datos, menús de navegación, filtros de búsqueda y tarjetas en la interfaz de usuario.

***

# Especificación de Contenido: Catálogo de Servicios

Este documento define la estructura de contenido para los servicios ofrecidos por la empresa. La información está categorizada para facilitar su implementación en la arquitectura de la base de datos (CMS) y en la navegación del usuario (UI).

## 01 / Categorías Principales (Técnicas)

El modelo de negocio se divide en tres líneas de acción principales. Estas deben usarse como la navegación de nivel superior (Top-level navigation) en la plataforma.

1.  **Grabado Láser**
2.  **Tampografía**
3.  **Servicios Integrales (Regalería)**

---

## 02 / Taxonomía: Grabado Láser

Esta categoría es la más amplia y debe permitir a los usuarios filtrar tanto por el acabado deseado como por el material o producto específico.

### A. Por Tipo de Acabado
Opciones que definen el resultado visual del grabado. Ideal para etiquetas (tags) o filtros.
* Grabado Láser Sin Color
* Grabado Láser Color

### B. Por Material Base
Ideal para guiar al usuario según el material que necesita grabar.
* Grabado Láser en Metales
* Grabado Láser en Madera
* Grabado Láser en Acetato

### C. Por Producto Específico (Enfoque en Óptica y Accesorios)
Servicios directos aplicados a productos terminados.
* Grabado Láser en Anteojos (General)
* Grabado Láser en Patillas
* Grabado Láser en Estuches
* Grabado Láser en Franelas

---

## 03 / Taxonomía: Tampografía

Servicio de impresión indirecta, fuertemente enfocado en la industria óptica y de empaque.

### A. Aplicaciones por Producto
* Tampografía en Anteojos
* Tampografía en Lentillas
* Tampografía en Estuches
* Tampografía en Franelas

---

## 04 / Taxonomía: Servicios Integrales

Categoría enfocada en el usuario final o empresas que buscan soluciones completas, más allá de la técnica específica.

* **Regalería:** Producción de artículos promocionales o regalos corporativos/personales.
* **Personalización de Objetos:** Servicio abierto para que el cliente traiga su propio artículo (sujeto a evaluación de material).

---

## 05 / Estructura de Datos Recomendada (Esquema de Contenido)

Para implementar este catálogo en el frontend o en un CMS, cada servicio debe contar como mínimo con los siguientes campos de datos (Content Model):

* **`id`**: Identificador único.
* **`title`**: Nombre del servicio (Ej: "Grabado Láser en Madera").
* **`category`**: Técnica principal (`Laser`, `Tampografia`, `Integral`).
* **`target_material`**: Etiqueta del material (`Metal`, `Madera`, `Acetato`, `Textil`, `Plástico`, `Vidrio/Lente`).
* **`description`**: (A redactar) Breve texto explicativo de 2-3 líneas sobre el servicio.
* **`media`**: Imagen de referencia aplicando las reglas de diseño (Ej: Tarjeta de "Pin photo").
* **`is_color_available`**: Booleano (`true`/`false`) para indicar si admite color.