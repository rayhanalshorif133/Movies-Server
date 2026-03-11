import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// 1. GET Method: Unique types gulo fetch korbe
export async function GET(request) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('galleries')
        .select('type')
        .not('type', 'is', null);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // JavaScript diye unique types ber kora
    const uniqueTypes = [...new Set(data.map(item => item.type))];

    return NextResponse.json(uniqueTypes);
}

// 2. POST Method: Notun dummy data insert korbe
export async function POST(request) {
    const supabase = await createClient();
    const body = await request.json();

    const { data, error } = await supabase
        .from('galleries')
        .insert([body]) 
        .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });

    
}