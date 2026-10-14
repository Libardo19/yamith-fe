# QA local — 1 de octubre de 2026

Este informe corresponde a la versión anterior. La estructura vigente y su QA del 2 de octubre se documentan en [landing-reference-revision.md](landing-reference-revision.md).

Implementación en yamith-fe y yamith-be. Servidores activos en localhost:3000 y localhost:3001. Frontend comprobado también mediante `next start` sobre la compilación optimizada; esto no constituye un despliegue.

| Verificación | Resultado |
|---|---|
| Frontend build | Correcto; 63 páginas generadas |
| Frontend lint y typecheck | Correctos |
| Frontend pruebas | 16/16 correctas en Chromium/Edge local |
| Backend build, lint y typecheck | Correctos |
| Backend pruebas | 53/53 correctas, 7 archivos |
| Migraciones | Aplicadas en bases locales yamith y yamith_test |
| Envío de correo | Desactivado para ejecución local; trabajos permanecen pendientes |
| Producción / merge | Sin cambios |

Se revisaron 360, 390, 430, 768, 1024, 1280 y 1440 px. Ningún desbordamiento horizontal, fotografía rota, error de JavaScript o error de consola en los recorridos de la landing. QA de menú móvil, selector, FAQ, CTA, formulario interceptado, recuperación de sesión, sincronización de fotografías por scroll, reduced-motion y contenido sin JavaScript.

Capturas: qa/hero-390.png, qa/hero-1440.png, qa/landing-390.png y qa/landing-1440.png. Las capturas del hero esperan a que termine la animación tipográfica.

Medición local de carga inicial, sin throttling y con caché del servidor: LCP 280 ms / CLS 0 a 390 px; LCP 308 ms / CLS 0 a 1440 px. Son mediciones de laboratorio local, no datos de usuarios ni puntuación Lighthouse. Script reproducible: `node scripts/qa-vitals.mjs`; resultado en qa/vitals.json.

El navegador integrado no estaba conectado. Las pruebas utilizaron una instancia local aislada de Microsoft Edge/Chromium; no se controló el navegador integrado.

Los datos pendientes de formación, sociedades y trayectoria siguen sin publicarse. Resultados y FAQ conservan su origen en el catálogo/CMS. No se añadieron estadísticas ni testimonios ficticios.

El driver pg emitió una advertencia de deprecación sobre consultas concurrentes durante las pruebas; no hubo pruebas fallidas. La cola de notificaciones coordina workers mediante PostgreSQL, pero SMTP sigue sin garantizar entrega exactamente una vez frente a una caída entre aceptación y persistencia del estado.
