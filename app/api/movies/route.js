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


export async function POST(request) {
    const supabase = await createClient();
    const body = await request.json();

    /* 
    {
                title: movieTitle,
                poster: imageUrl,
                url: movieURL,
                movie_source: movieSource,
                type: movieType,
                size: movieSize ? parseFloat(movieSize) : 'N/A',
                dubbed_lang: dubbedLanguage,
                part_name: series_part_name,
                subtitle_url: subtitleInput,
                poster_in_drive: true, // Assuming the poster is also in Google Drive
            }
    */ 

    const { data, error } = await supabase
        .from('movies')
        .insert([body]) 
        .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}

export async function PUT(request) {
    const supabase = await createClient();
    const body = await request.json();
    const { id, ...updates } = body; // ID টা আলাদা করে নিয়ে বাকিগুলো আপডেট হবে

    if (!id) return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });

    const { data, error } = await supabase
        .from('movies')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });

    const supabase = await createClient();
    const { error } = await supabase
        .from('movies')
        .delete()
        .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message: "Movie deleted successfully" });
}

