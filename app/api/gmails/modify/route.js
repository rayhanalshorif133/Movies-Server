import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
 

  const supabase = await createClient();


  let { data, count, error } = supabase
    .from('gmails')
    .select('*', { count: 'exact' });

 

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