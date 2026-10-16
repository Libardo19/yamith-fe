# Dr. Yamith Cuello — auditoría y rediseño

La propuesta editorial de este informe fue sustituida por la revisión estructural del 2 de octubre: [landing-reference-revision.md](landing-reference-revision.md).

Fecha: 1 de octubre de 2026. Trabajo sobre la landing real y su API local. Sin despliegue ni merge.

## 1. Estado inicial

Next.js 16, React 19, App Router y Tailwind 4. Tipografías Bodoni Moda y Manrope. La página pública lee procedimientos, sedes y resultados desde Express/Prisma/PostgreSQL, con respaldo local cuando el API no está disponible. Conserva formulario de leads, portal, panel, WhatsApp, GA4, metadatos, sitemap y JSON-LD.

La secuencia anterior era Hero → diferenciadores → procedimientos → tecnología → doctor → proceso → resultados → galería → contacto. Predominaban grids, tarjetas, iconos, sombras y fotografías contenidas. El nombre del doctor tenía menor protagonismo que la promesa genérica. No había un sistema de movimiento ni FAQ en la portada. Las credenciales estaban pendientes y no debían publicarse como acreditaciones confirmadas.

Paleta conservada:

| Función | Colores existentes |
|---|---|
| Azul institucional | #050b18, #0b1426, #14213a, #22304d |
| Dorado | #7a5a1c, #946c24, #b8924a, #d9bf8c, #f3ead7 |
| Fondos | #fbf9f5, #f5f0e8, #ebe3d5, blanco |
| Texto y líneas | #1b1f27, #6b6f78, #e6e1d8 |
| Estados | #2f7d57, #b23b3b |

Se reforzó el contraste usando el dorado oscuro para botones y rótulos pequeños; las fotografías aportan el color complementario sin introducir una paleta nueva.

## 2. Referencia HAV

Referencia: https://havplasticsurgery.com/

Principios trasladados: retrato como estructura del viewport; jerarquía breve con identidad y CTA; serif de gran escala; composición asimétrica; espacios amplios; alternancia entre capítulos claros y clínicos oscuros; progresión de identidad → confianza → opciones → experiencia → contacto. La fotografía y los titulares reciben el protagonismo antes que elementos secundarios.

Se reinterpretan la escala, el contraste, el ritmo, la integración de fotografía y la distribución de CTAs. No se reutilizan textos, logos, técnicas, acreditaciones, fotografías, colores ni estructura pixel-perfect de HAV. La composición gira alrededor de la sesión real del Dr. Yamith y de la paleta existente.

## 3. Análisis fotográfico

Fuente: https://adobe.ly/4hqR8Qy. Se revisaron las 178 imágenes del álbum, incluyendo retratos, consultas, equipos, preparación y quirófano. Las opciones se valoraron por postura, mirada, luz, espacio negativo, orientación, recorte y función narrativa.

| Uso | Fotografía seleccionada | Archivo utilizado | Criterio |
|---|---|---|---|
| Hero | NAF07199.ARW, asset 49f9a29a311243459328095c4ce36125 | doctor-hero-editorial.webp | Mirada directa, manos y traje visibles; retrato vertical con presencia. Texto a la izquierda, recorte propio en móvil. |
| Autoridad / presentación | NAF07309.ARW, asset a19bedcf5ad840a3a6442f07304d5330 | doctor-scrubs-logo.webp | Uniforme médico, sonrisa y identidad de la clínica; mayor cercanía que el hero. |
| Valoración | NAF07157.ARW / sesión de consulta con tablet | valoracion-tablet.webp | Relación doctor–paciente y lenguaje humano, en formato horizontal. |
| Valoración secundaria | NAF07259.ARW, asset 67660960a3c2407bb876b07b2020e809 | valoracion-implantes.webp | Presentación profesional de la consulta, conservada como recurso del catálogo. |
| Capítulo clínico | IMG_9960.CR3, asset 3504a98d19e24ada8d2698528400334e | quirofano-oscuro.webp | Contraste natural con el fondo azul; doctor y luz quirúrgica permiten un titular integrado. |
| Recuperación | NAF06888.ARW, asset 2bf34eeeafb44e7085ca355b8abb5c5a | tec-hiperbarica.webp | Acompañamiento y contexto de recuperación, sin cifras ni promesas nuevas. |
| CTA final | NAF07171.ARW, asset 506f0002c0f743fba71c91e0463596d6 | doctor-cta.webp | Sonrisa, orientación corporal y amplio espacio negativo a la izquierda. |
| Entorno / equipo | Sesión de recepción y equipo existente | recepcion-logo.webp, equipo.webp | Capítulo breve de contexto humano y profesional. |

Alternativas útiles: IMG_9768.CR3 para retrato vertical institucional; IMG_9795.CR3 para preparación y asepsia; IMG_9666.CR3 para equipo aislado; IMG_0049.CR3 para detalle VASER/Retraction. No es necesario utilizar todas las imágenes.

Se descartó el encuadre de IMG_9736 con información visible en una pizarra. El archivo público antiguo tec-doctor-equipos.webp se sustituyó por la imagen segura de equipos, conservando su ruta para evitar romper referencias del CMS y otras páginas. Las fotografías de pacientes utilizadas son recursos ya existentes del proyecto; cualquier nueva publicación requiere la autorización correspondiente gestionada por la clínica. No se generan retratos ni se altera la identidad del doctor.

## 4. Las tres capturas: funciones y reinterpretación

| Captura | Función | Composición y razón visual | Versión Yamith y ubicación |
|---|---|---|---|
| 103448 | Técnicas propias / diferenciación | Titular dominante y firmas visuales de técnicas hacen reconocible una propuesta. | “Nuestro enfoque”: principios reales de ética, naturalidad y acompañamiento. Después de procedimientos. No se atribuyen técnicas inventadas. |
| 103456 | Sociedades / respaldo | Franja institucional limpia; logos funcionan como prueba verificable y pausa visual. | Bloque de formación y respaldo después de presentar al doctor, condicionado a credenciales confirmadas. Sin logos prestados ni membresías pendientes publicadas. |
| 103501 | Tecnología | Nombres/logos ordenados sobre fondo contrastante presentan recursos clínicos sin repetir tarjetas. | Capítulo clínico fotográfico y lista desplegable VASER, Retraction, Tensamax y cámara hiperbárica. Después del recorrido de atención. No se añade Renuvion ni una asociación comercial. |

## 5. Gap analysis

| Tenemos | Falta | Mejorar | Eliminar de la portada | Reutilizar |
|---|---|---|---|---|
| Fotos reales, catálogo y sedes | Dirección fotográfica coherente | Hero, recortes y escala | Tarjetas repetitivas, sombras decorativas | Sesión del doctor, paleta, fuentes |
| Filosofía y proceso de atención | Storytelling y movimiento | Secuencia y jerarquía | Grids de iconos | Textos y pasos existentes |
| Equipos documentados | Capítulo de tecnología editorial | Contexto y contraste | Galería extensa sin narrativa | Recursos y descripciones actuales |
| Credenciales pendientes | Confirmación de formación y sociedades | Publicación condicional | Afirmaciones provisionales visibles | Estructura de credenciales |
| Resultados desde CMS | Testimonios autorizados, si se desean | Presentación de resultados reales | Ejemplos ficticios | Solo resultados publicados |
| Formulario, tracking y APIs | FAQ en portada, recuperación ante error de sesión | Accesibilidad, contraste, fallback | Spinner indefinido | Lógica de formulario y rutas |

## 6. Arquitectura implementada

Header → Hero → Doctor → respaldo confirmado (condicional) → selector editorial de procedimientos → enfoque → recorrido de valoración/procedimiento/recuperación → capítulo clínico y tecnología → resultados publicados (condicional) → entorno/equipo → FAQ del catálogo → retrato y CTA final → formulario/sedes → footer.

Las preguntas se obtienen del detalle del primer procedimiento publicado y se contextualizan con su nombre. No se inventan testimonios, años de experiencia, volúmenes de pacientes ni acreditaciones.

## 7. Sistema de movimiento

| Capítulo | Entrada | Scroll / transición | Móvil y accesibilidad |
|---|---|---|---|
| Hero | Titular por dos máscaras escalonadas | Retrato pasa de escala 1.08 hacia 1, de forma moderada | Composición vertical; sin parallax móvil |
| Doctor | Máscara vertical del retrato y titular | Imagen y texto forman una composición amplia | Imagen completa y contenido debajo |
| Procedimientos | Apertura de imagen y encabezado | Cambio de imagen por selección/hover/foco | Selección mediante botón; enlace independiente |
| Enfoque | Revelación tipográfica al entrar | Pausa narrativa sin pin | Principios en lista vertical |
| Atención | Fotografía sticky | Tres etapas sincronizan fotografías | Secuencia normal con una imagen por etapa |
| Clínica | Titular sobre imagen de gran formato | Escala controlada y transición al azul oscuro | Recorte específico; detalles nativos accesibles |
| Entorno | Máscaras de fotografías asimétricas | Pausa de lectura | Dos imágenes compactas con captions |
| FAQ | Encabezado en máscara | Desplegables HTML nativos | Lectura y teclado sin animación obligatoria |
| CTA | Texto integrado con retrato horizontal | Acercamiento moderado | Retrato superior y texto sobre fondo crema |

Implementación: CSS, IntersectionObserver y un único requestAnimationFrame para fotografías visibles. Sin dependencia nueva de animación. Se observan secciones sin recortar para evitar que las máscaras oculten contenido indefinidamente. Foco de teclado revela el bloque correspondiente. Con prefers-reduced-motion se eliminan máscaras, parallax, transiciones y sticky; el recorrido se presenta de forma estática. Sin JavaScript el contenido sigue visible.

## 8. Componentes

Conservar: SiteHeader, SiteFooter, ContactForm, ContactSection, SedeCard, Results, JsonLd, Analytics, componentes de portal/admin y rutas.

Refactorizar: Hero, navegación móvil, contraste de Button, datos provisionales de sedes/credenciales, recuperación de sesión y lectura pública del API.

Crear: LandingMotion, ValuationLink, DoctorEditorial, ApproachEditorial, CareJourney, ClinicalEditorial, ClinicEditorial, EditorialFaq, FinalPortrait, ProcedureSelector y ProcedurePhoto.

Retirar del montaje de la portada: FeaturedProcedures, Differentiators, Process, Technology, Gallery y AboutDoctor. Sus archivos se conservan porque siguen siendo reutilizables o están utilizados por otras rutas.

## 9. Assets y datos pendientes

Solo se descargaron dos rendiciones seleccionadas de Adobe: hero (WebP ~179 KB) y CTA (~93 KB). El resto reutiliza WebP existentes. Next/Image genera tamaños responsivos para assets locales; únicamente el hero tiene preload. Las imágenes posteriores cargan de manera diferida, con tamaños reservados. Las URLs externas del CMS conservan su compatibilidad sin abrir un allowlist remoto irrestricto.

Pendiente de datos reales: institución y año de formación, sociedades verificadas, sus logos autorizados, trayectoria cuantificable, testimonios y direcciones/teléfonos si aún están provisionales. No impiden el funcionamiento del sitio; sus bloques no presentan datos ficticios.

## 10. Etapas y correcciones

1. Auditoría de código, HAV, capturas y galería; identificación de paleta y funciones.
2. Corrección de hallazgos: consumo atómico de tokens; bloqueo y control de cruces al reactivar citas; validación de consentimiento/perfil en API; reclamación persistente de notificaciones entre procesos; límites de fechas en Bogotá; recuperación de sesión; distinción entre 404 real y caída del API.
3. Arquitectura fotográfica, componentes y CSS editorial; selección y optimización de assets.
4. Movimiento progresivo, alternativas móviles, contraste, teclado y reducción de movimiento.
5. Migración local, compilación, lint, tipos, pruebas funcionales y QA visual.

También se cerró una carrera al reprogramar/cancelar citas: se comprueba el estado dentro del bloqueo. Las pruebas solo vacían la base local yamith_test y comprueban ese destino antes de truncar.

La cola utiliza leases, tokens de reclamación, intentos limitados y recuperación de trabajos abandonados. SMTP no garantiza entrega exactamente una vez: una caída después de aceptar el correo pero antes de registrar SENT aún puede producir un reintento. No se promete una garantía que el proveedor no ofrece.

## Verificación local

Comandos: `npm run build`, `npm run lint`, `npm run typecheck` en ambos repositorios; `npm test` en ambos. PostgreSQL de pruebas: `npm run test:db` en backend. Playwright usa Microsoft Edge/Chromium instalado; para otro entorno ajustar `channel` en playwright.config.ts.

Pruebas visuales: 360, 390, 430, 768, 1024, 1280 y 1440 px. Capturas locales en qa/: hero-390.png, hero-1440.png, landing-390.png y landing-1440.png. Se comprueban navegación, overflow, imágenes, selector, CTA, FAQ, formulario, sesión, contenido sin JavaScript y reduced-motion. El formulario visual está interceptado: no genera solicitudes de pacientes reales.

El navegador integrado no estaba conectado al runtime durante la ejecución. El QA se realizó en un navegador Chromium local aislado; no se afirma haber controlado el integrado.
