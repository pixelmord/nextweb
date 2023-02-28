import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabaseServerClient';

export async function GET(request: Request) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return NextResponse.json(session);
}
