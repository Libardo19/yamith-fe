# Página del doctor y tecnología — 6 de octubre de 2026

## Referencia y narrativa

Se revisó https://havplasticsurgery.com/drhugoaguilar/. Se reinterpreta su secuencia de presentación, trayectoria, técnicas, respaldo, práctica y cierre humano con datos propios. No se copian los textos, reconocimientos, cargos académicos, autorías, universidades ni técnicas originales del Dr. Hugo Aguilar.

La página `/sobre-el-doctor` elimina `ReferenceDoctor`, que repetía el hero con el mismo retrato. Ahora contiene:

1. Presentación única con retrato de traje.
2. Trayectoria y siete años de experiencia, con fotografía de consulta.
3. Técnicas de lipoabdominoplastia, con marcación prequirúrgica y tres desplegables.
4. Membresías confirmadas, cuando existan datos suficientes.
5. Valoración, planificación y seguimiento.
6. Atención en Colombia con fotografía del consultorio.
7. Información médica y referencias educativas.
8. Tecnología con fotos mejoradas y revelado al interactuar.
9. Cierre humano y CTA con retrato de brazos cruzados.

Los siete años y el manejo de las tres técnicas proceden de la confirmación del usuario en esta conversación. La formación y las sociedades siguen sin confirmar. `doctor.memberships` y `DoctorMemberships` permiten incorporar entidades y logos autorizados; la sección permanece oculta mientras no existan membresías confirmadas. Los enlaces educativos a ASPS no representan afiliación del doctor.

## Técnicas y CMS

La ficha de abdominoplastia añade las variantes efecto corset, 360° circunferencial/Body Lift y Flor de Lis. No atribuye una técnica de plicatura específica al término corset, ni denomina al doctor creador de estas técnicas.

Referencias educativas:

- https://www.plasticsurgery.org/cosmetic-procedures/body-lift
- https://www.plasticsurgery.org/news/articles/theres-more-than-one-type-of-tummy-tuck
- https://pubmed.ncbi.nlm.nih.gov/3158172/

Se ampliaron el catálogo inicial del backend y el respaldo del frontend. El script transaccional admite `--slug=abdominoplastia` y actualizó solo esa ficha en la base local, conservando metadatos y un respaldo en `yamith-be/storage/catalog-backups/procedures-2026-10-06T16-03-39-227Z.json`.

## Fotografías editadas con IA

Se utilizó imagegen sobre fotografías reales disponibles. Son derivados editados con IA; no se presentan como nuevas fotos originales del consultorio ni como prueba de propiedad o certificación de equipos. Las instrucciones solicitaron preservar diseño, controles, etiquetas e identidad. Los resultados se revisaron visualmente; una edición generativa no garantiza identidad de píxeles o detalle técnico exacto con el original.

- `tec-vaser-studio.webp`: consola azul aislada a partir de `tec-vaser-retraction.webp`; sin la pieza de mano Retraction ni otros equipos del encuadre.
- `tec-retraction-studio.webp`: consola negra aislada de `tec-retraction.webp`.
- `tec-tensamax-studio.webp`: equipo completo aislado de `tec-tensamax.webp`.
- `tec-hiperbarica-editorial.webp`: edición de luz y color de la foto clínica de cámara hiperbárica.

Todos se optimizan en WebP; los tres primeros conservan transparencia. `technology-images.ts` resuelve las fotografías anteriores del CMS hacia sus derivados al renderizar el catálogo, conservando los valores originales en la base de datos. La ficha individual también utiliza este mapeo. Las imágenes de producto utilizan `object-contain` para evitar recortar los controles.

MicroAire permanece sin imagen: no existe una foto identificada del equipo disponible y no se inventa un modelo para representar el utilizado por el doctor.

## QA visual

La página del doctor se revisó a 360, 390, 430, 768, 1024, 1280 y 1440 px sin desbordamiento horizontal. Se comprobó la eliminación del bloque repetido, los tres desplegables y las imágenes cargadas. Se verificaron las variantes en la ficha de abdominoplastia alimentada por la API local. Capturas en `qa/doctor-profile-*`, `qa/doctor-techniques-*` y `qa/vaser-studio-card.png`.

No se hizo deploy ni se modificó producción.

## Confirmación posterior de membresías

El usuario confirmó el 6 de octubre de 2026 que el doctor pertenece a las cuatro sociedades de la captura: ASPS, ISAPS, SCCP y FILACP. Se activó `DoctorMemberships` después de las técnicas, con enlaces oficiales y assets locales obtenidos de las propias sociedades. Esta confirmación reemplaza el estado pendiente de membresías descrito anteriormente; la formación universitaria continúa pendiente.

Logos: ASPS (`plasticsurgery.org/images/footer/ASPS-Logo-Footer.png`), ISAPS (SVG del encabezado de `isaps.org`), SCCP (`cirugiaplastica.org.co/wp-content/uploads/2022/07/logo-sccp.png`) y FILACP (`filacp.org/web26/wp-content/uploads/Logo-2026D.png`). No se utilizan logos generados con IA ni se copian assets de HAV.

Validación final: build frontend correcto, lint y typecheck frontend correctos, lint de archivos backend modificados y typecheck backend correctos. Las 19 pruebas existentes de Playwright pasaron. Se revisaron experiencia y referencias educativas en el servidor local compilado a 390 × 844 y 1440 × 900, sin desbordamiento.
