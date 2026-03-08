import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const supabase = await createClient();

  // 1. Fetch data from source table
  const { data: gmailsData, error: fetchError } = await supabase
    .from('gmails')
    .select('*'); // Only select what you actually need

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }


  return NextResponse.json({
    message: 'Successfully synced to gmail_inventory',
    syncedData: gmailsData
  });


}