# Retratos integrados — 3 de octubre de 2026

Se adapta el tratamiento de la captura proporcionada: retrato sin fondo, composición continua con texto lateral, fondo de la paleta existente y cierre diagonal en el hero.

## Assets

- `doctor-suit-cutout.webp`: edición de fondo de `doctor-hero-editorial.webp`.
- `doctor-scrubs-cutout.webp`: edición de fondo de `doctor-scrubs-logo.webp`.

Se utilizó imagegen para aislar al doctor, solicitando preservar identidad, postura, expresión y vestuario. Los resultados se inspeccionaron visualmente y se optimizaron mediante Sharp en WebP con canal alfa. Los originales permanecen disponibles. Son derivados editados con IA, no nuevas fotografías de una sesión ni archivos originales con recorte manual.

## Aplicación

Hero, presentación del doctor, FAQ y cabeceras de doctor, catálogo y contacto. Las fotografías de procedimientos, consulta y quirófano conservan su contexto. La paleta y el contenido médico no se modifican.

El hero desktop utiliza un retrato cercano con recorte superior; móvil conserva el rostro completo y aplica una transición hacia el fondo detrás del texto. Las cabeceras interiores y los retratos secundarios utilizan ajuste contenido para mantener la postura.

## Revisión

Capturas locales en `qa/cutout-*.png`: hero y presentación del doctor a 390 × 844 y 1440 × 900. Sin desbordamiento horizontal en esas comprobaciones. QA automatizado mediante Edge porque el navegador integrado no está conectado.
