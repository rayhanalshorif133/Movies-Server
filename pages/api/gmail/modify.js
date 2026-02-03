import { supabaseClient } from '@/utils/supabase/client';

export default async function handler(req, res) {

    const supabase = supabaseClient();

    const { data: gmails, error: gmailError } = await supabase
        .from('gmails')
        .select('*');

    if (gmailError) {
        return res.status(500).json({ error: gmailError.message });
    }

    const results = await Promise.all(gmails.map(async (account) => {
        const { data: movieData } = await supabase
            .from('movies')
            .select('title, size')
            .eq('movie_source', account.name);

        const movieString = movieData && movieData.length > 0
            ? movieData.map(m => m.title).join(', ')
            : '';

        const totalSizeMB = movieData && movieData.length > 0
            ? movieData.reduce((sum, m) => sum + (parseFloat(m.size) || 0), 0)
            : 0;

        const usedSpaceGB = (totalSizeMB / 1024).toFixed(2);

        if (movieString !== account.movies || parseFloat(usedSpaceGB) !== parseFloat(account.used_space)) {
            await supabase
                .from('gmails')
                .update({
                    movies: movieString,
                    used_space: usedSpaceGB
                })
                .eq('id', account.id);
        }

        return {
            ...account,
            movies: movieString,
            used_space: usedSpaceGB,
            total_mb: totalSizeMB.toFixed(2) 
        };
    }));

    return res.status(200).json({
        status: true,
        message: 'Successfully Modify Gmails with Movies',
        data: results
    });
}