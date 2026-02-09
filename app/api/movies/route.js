import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('query') || '';

    const supabase = await createClient();
    let query = supabase.from('movies').select('*');

    if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}