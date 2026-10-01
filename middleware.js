import { NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'sih_auth_session';

const PROTECTED_PREFIXES = [
  '/projects',
  '/dashboard',
  '/schedule',
  '/review',
  '/activities',
  '/reports',
  '/chat',
  '/tables',
  '/audit',
];

// Pages only head_engineer can access
const HEAD_ENGINEER_ONLY = [
  '/projects',
  '/schedule',
  '/review',
  '/tables',
  '/audit',
];

function parseSession(cookieValue) {
  if (!cookieValue) return null;
  try {
    const decoded = atob(cookieValue);
    const parsed = JSON.parse(decoded);
    if (!parsed?.id || !parsed?.role) return null;
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) return null;
    return parsed;
  } catch (e) {
    return null;
  }
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip Next.js internals, API routes, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const sessionCookie = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const session = parseSession(sessionCookie);

  // Authenticated user visiting /login → send to their home page
  if (pathname === '/login') {
    if (session) {
      const home = session.role === 'head_engineer' ? '/projects' : '/dashboard';
      return NextResponse.redirect(new URL(home, req.url));
    }
    return NextResponse.next();
  }

  // Root / → redirect based on session
  if (pathname === '/') {
    if (session) {
      const home = session.role === 'head_engineer' ? '/projects' : '/dashboard';
      return NextResponse.redirect(new URL(home, req.url));
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Not authenticated → bounce to /login
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !session) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Site engineer trying to access head-engineer-only pages
  if (session && session.role === 'site_engineer') {
    const isHeadOnly = HEAD_ENGINEER_ONLY.some((prefix) => pathname.startsWith(prefix));
    if (isHeadOnly) {
      const dashboardUrl = new URL('/dashboard', req.url);
      dashboardUrl.searchParams.set('restricted', '1');
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
