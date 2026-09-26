import { NextResponse, type NextRequest } from 'next/server'

/**
 * Chequeo optimista: sin cookie de sesión no se entra a /portal ni /admin.
 * La validación real (firma, rol, sesión revocada) la hace el API en cada request;
 * si falla, las pantallas redirigen a /login.
 */
export function proxy(request: NextRequest) {
  if (request.cookies.has('yc_session')) return NextResponse.next()
  const login = new URL('/login', request.url)
  login.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*']
}
