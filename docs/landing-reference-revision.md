# Revisión de estructura — 2 de octubre de 2026

## Coherencia de páginas interiores y redacción médica

Se extendió la cabecera, navegación y footer de la portada a todas las rutas públicas. El CSS compartido se carga desde el layout público; la tipografía, jerarquía y botones de las páginas interiores siguen el sistema de la landing. Portal, administración y autenticación conservan sus layouts.

La presentación del doctor ahora explica su especialidad, valoración individual, planificación, comunicación y acompañamiento con una redacción profesional. El contenido se centraliza en `src/content/site.ts` y se reutiliza en portada y Sobre el doctor. No se añaden años de experiencia, instituciones ni acreditaciones pendientes. La filosofía del bloque de enfoque tiene su propio texto para evitar repetir la biografía.

Sobre el doctor, Procedimientos y Contacto comparten un hero fotográfico sobre fondo oscuro. El catálogo utiliza el mismo carrusel de la portada, agrupado por categoría y manteniendo todos los enlaces. Los detalles conservan contenido CMS, beneficios, SEO, proceso y formulario; reutilizan el bloque FAQ y la franja tecnológica de la landing. La galería clínica sigue disponible en la presentación del doctor.

Se verificaron cuatro rutas —doctor, catálogo, detalle de lipoescultura VASER y contacto— en 360, 390, 430, 768, 1024, 1280 y 1440 px: 28 recorridos sin desbordamientos, imágenes rotas ni errores de consola. Se comprobó el menú móvil y el contraste de los títulos sobre fondo oscuro. Capturas de páginas completas en `qa/{doctor,catalog,detail,contact}-{390,1440}.png`. Build, lint y typecheck correctos; las 16 pruebas existentes siguen aprobadas.

Esta revisión sustituye la propuesta editorial del 1 de octubre. Se siguió la nueva instrucción de reproducir la estructura de HAV, manteniendo la paleta y el contenido real del Dr. Yamith.

Se comprobó la referencia en escritorio (1440 × 900) y móvil (390 × 844), incluyendo el orden visible de secciones, las franjas institucionales y las transiciones diagonales.

| Referencia | Implementación |
|---|---|
| Cabecera fotográfica grande, logo centrado y navegación inferior | HomeMasthead con imagen clínica propia, marca Yamith y rutas reales |
| Hero oscuro, texto a izquierda y retrato a derecha | Dr. Yamith, descripción actual y CTA a /contacto#agendar |
| Hero móvil con fotografía detrás del texto | Retrato de Yamith y contenido superpuesto con contraste oscuro |
| Introducción con dos imágenes verticales escalonadas y texto a derecha | Fotos de quirófano/valoración y contenido real de seguridad |
| Franja de técnicas y cierre diagonal | Principios existentes de atención, sin atribuir técnicas inventadas |
| Doctor a izquierda y biografía a derecha sobre fondo oscuro | Retrato, filosofía actual y enlace a Sobre el doctor |
| Carrusel de tres imágenes y CTA inferior | Resultados publicados; si no hay, catálogo de procedimientos con su nombre explícito |
| Franja de sociedades y cierre diagonal | Credenciales confirmadas; si no hay, sedes reales sin logos o membresías ficticias |
| FAQ con retrato a izquierda y acordeón a derecha | Preguntas actuales del catálogo y CTA de valoración |
| Franja tecnológica clara | VASER, Retraction, Tensamax y cámara hiperbárica |
| Footer oscuro, marca/navegación arriba y sedes debajo | PublicFooter, manteniendo enlaces legales, portal y contacto |

Se retiraron del montaje de inicio el recorrido sticky, el selector editorial, el bloque de clínica independiente, el CTA fotográfico adicional y el formulario dentro de la portada. El formulario permanece operativo en la ruta Contacto, a la que conducen los CTAs. No se eliminan sus componentes ni rutas.

No se reutilizan fotografías, textos, acreditaciones ni logos de HAV. No se introducen colores nuevos. Las proporciones se ajustan al formato de las fotografías reales disponibles de Yamith; no se simulan siluetas recortadas ni se modifica su identidad mediante generación de imágenes.

Las correcciones anteriores del backend permanecen intactas. No se realiza deploy, merge ni cambio de producción. Las capturas actualizadas de la landing se guardan en qa/landing-390.png y qa/landing-1440.png.

## Verificación de esta revisión

Build, lint y typecheck del frontend correctos. 16 pruebas aprobadas: siete anchuras, navegación móvil, carrusel, FAQ, CTA, formulario en Contacto, recuperación de sesión, orden exacto de bloques, reduced-motion, lectura sin JavaScript y semántica del fallback público.

QA visual en 390 × 844 y 1440 × 900 sobre `next start`. Sin desbordamientos, imágenes rotas ni errores de consola en el recorrido de la portada. Se corrigió la superposición del hero sobre el menú desplegado. Medición local sin throttling: LCP 296 ms / CLS 0 en móvil y LCP 212 ms / CLS 0 en escritorio; estos números no representan rendimiento de usuarios reales.
