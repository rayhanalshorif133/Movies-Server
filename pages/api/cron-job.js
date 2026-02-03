import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
    const supabase = createClient(
        process.env.NEXT_SUPABASE_URL,
        process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY
    );

    const randomTitle = "Job_" + Math.random().toString(36).substring(2, 8);

    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const currentTime = now.toTimeString().split(' ')[0]; // Format: HH:MM:SS

    const { data, error } = await supabase
        .from('cron_job')
        .insert([
            {
                title: randomTitle,
                count: 1,
                time: currentTime,
                date: currentDate
            },
        ])
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const { data: allData, error: allError } = await supabase
        .from('cron_job')
        .select('*')
        .order('id', { ascending: false });

    if (allError) {
        return res.status(500).json({ error: allError.message });
    }

    return res.status(200).json({
        success: true,
        message: 'Entry created automatically',
        count: allData.length,
        data: allData
    });
}