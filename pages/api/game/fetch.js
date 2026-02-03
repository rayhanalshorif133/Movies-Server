import { supabaseClient } from "@/utils/supabase/client";

export default async function handler(req, res) {

    const supabase = supabaseClient();

    const { data, error } = await supabase
        .from('games')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
        status: true,
        count: data.length,
        message: 'Successfully Fetch games',
        data: data
    });
}
