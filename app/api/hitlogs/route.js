import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const supabase = await createClient();

    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    const { searchParams } = new URL(request.url);
    const pagename = searchParams.get('pagename');

    const { data, error } = await supabase
        .from('hitlogs')
        .upsert(
            { 
                ip_address: ip,
                page_name: pagename
            }, 
            { onConflict: 'ip_address,page_name' }
        )
        .select('counter')
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const currentCounter = data?.counter || 0;

    const { data: updatedData, error: updateError } = await supabase
        .from('hitlogs')
        .update({ counter: currentCounter + 1 })
        .eq('ip_address', ip)
        .eq('page_name', pagename)
        .select()
        .single();

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(updatedData);
}