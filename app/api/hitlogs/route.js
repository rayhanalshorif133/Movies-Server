import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const supabase = await createClient();

    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    const { data, error } = await supabase
        .from('hitlogs')
        .upsert(
            { ip_address: ip }, 
            { onConflict: 'ip_address' }
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
        .select()
        .single();

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(updatedData);
}