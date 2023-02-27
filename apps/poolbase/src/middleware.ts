import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // console.log('middleware', req.nextUrl.pathname);
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  // console.debug('middleware', req.nextUrl.pathname, session?.user, error);
  // Check auth condition
  if (session?.user) {
    // Authentication successful, forward request to protected route.
    res.headers.set('supabase-user-id', session.user.id);
    if (req.nextUrl.pathname === '/login') {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/base';
      return NextResponse.redirect(redirectUrl);
    }
    return res;
  }
  if (req.nextUrl.pathname.includes('/base')) {
    // Auth condition not met, redirect to login page.
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
}
