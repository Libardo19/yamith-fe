import { NextResponse, type NextRequest } from 'next/server'

/** Los borradores (/demo) sólo existen en local o si se habilitan con DEMO_ENABLED=true. */
const demoEnabled = process.env.NODE_ENV !== 'production' || process.env.DEMO_ENABLED === 'true'

/**
 * Chequeo optimista: sin cookie de sesión no se entra a /portal ni /admin.
 * La validación real (firma, rol, sesión revocada) la hace el API en cada request;
 * si falla, las pantallas redirigen a /login.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/demo' || pathname.startsWith('/demo/')) {
    return demoEnabled ? NextResponse.next() : NextResponse.redirect(new URL('/', request.url))
  }
  if (request.cookies.has('yc_session')) return NextResponse.next()
  const login = new URL('/login', request.url)
  login.searchParams.set('next', pathname)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*', '/demo', '/demo/:path*']
}
