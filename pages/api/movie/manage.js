import { supabaseClient } from '@/utils/supabase/client';
export default async function handler(req, res) {

    const supabase = supabaseClient();

    if (req.method == 'GET') {
        return res.status(200).json({
            status: false,
            message: 'This Route isn\'t allow GET method...!',
        });
    }

    const { data, error } = await supabase
        .from('movies')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
        status: true,
        count: data.length,
        message: 'Successfully Fetch movies',
        data: data
    });
}
