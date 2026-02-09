import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const searchByTitle = searchParams.get('title') || '';
    const searchByType = searchParams.get('type') || '';

    const supabase = await createClient();
    let query = supabase.from('movies').select('*');

    if (searchByTitle) {
        query = query.ilike('title', `%${searchByTitle}%`);
    } 
    
    if (searchByType && searchByType != 'all' && searchByType != 'series') {
        query = query.eq('type', searchByType);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}