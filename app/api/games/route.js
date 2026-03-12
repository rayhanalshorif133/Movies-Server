import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const searchByTitle = searchParams.get('title') || '';
    const searchByType = searchParams.get('type') || '';

    const supabase = await createClient();
    let query = supabase.from('games').select('*');

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
    try {
        const supabase = await createClient();
        const body = await request.json();

        const {
            title,
            url,
            size,
            asset_type,
            game_engine,
            gmail,
            thumbnail_image,
            asset_images,
            asset_gif_images,
            part_name
        } = body;

        // Validation (Optional but recommended)
        if (!title || !url) {
            return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
        }

        // Supabase-e data insert kora
        const { data, error } = await supabase
            .from('games')
            .insert([
                {
                    title,
                    url,
                    size: size ? parseFloat(size) : 0,
                    asset_type: asset_type || 'asset',
                    game_type: game_engine, 
                    gmail: gmail,
                    thumbnail_image: thumbnail_image,
                    asset_images: Array.isArray(asset_images) ? asset_images : [],
                    asset_gif_images: Array.isArray(asset_gif_images) ? asset_gif_images : [],
                }
            ])
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: "Asset created successfully", data }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}