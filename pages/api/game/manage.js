import { createClient } from '@supabase/supabase-js'
export default async function handler(req, res) {

    const supabase = createClient(
        process.env.NEXT_SUPABASE_URL,
        process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY
    )

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
