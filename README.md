# yamith-fe

Sitio del Dr. Yamith Cuello: landing pública, portal del paciente y panel admin.
Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Consume `yamith-be` en `NEXT_PUBLIC_API_URL`.

Plan de ejecución: `Desktop\Documento\yamith\docs\Plan_Ejecucion_Dr_Yamith_Cuello.md`.

## Arranque local

```bash
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000 (el API corre en :3001)
```

## Estructura

```
src/app/            rutas (público · (auth) · portal · admin)
src/components/     ui/ · layout/ · landing/ · portal/ · admin/ · calendar/ · seo/
src/lib/            api.ts (fetch con cookie) · site.ts · cn.ts
src/app/globals.css tokens de diseño (@theme): navy · gold · cream, Bodoni Moda + Manrope
```

> Next 16: la protección de rutas va en `src/proxy.ts` (antes `middleware.ts`), se crea en F2.
