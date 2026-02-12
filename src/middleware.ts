
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');

  // Se o usuário não estiver logado e tentar acessar qualquer rota admin, redirecione para /login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se o usuário estiver logado, continue para a rota solicitada
  return NextResponse.next();
}

// Configuração do matcher para aplicar o middleware apenas às rotas de admin
export const config = {
  matcher: '/admin/:path*',
};
