import { supabaseClient } from '@/utils/supabase/client';

export default async function handler(req, res) {
    const supabase = supabaseClient();
    const { email, password } = req.body;



    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return res.status(200).json({
            status: false,
            error: error.message,
        });
    }

    return res.status(200).json({
        status: true,
        data:data,
        message:"Success to login",
    });
}