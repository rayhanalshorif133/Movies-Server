import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Query parameters ber kora
  const page = parseInt(searchParams.get('page')) || 0;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';

  const supabase = await createClient();

  // Range calculate kora
  const from = page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('gmails')
    .select('*', { count: 'exact' });

  // Search filter jodi thake
  if (search) {
    query = query.ilike('email', `%${search}%`);
  }

  const { data, count, error } = await query
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    total: count,
    page,
    totalPages: Math.ceil(count / limit)
  });
}