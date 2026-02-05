import { createSession } from '@/utils/session';
import { supabaseClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server'


export default async function handler(req, res) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    

    if (req.method !== 'POST') {
        return res.status(405).json({
            status: false,
            message: 'Method Not Allowed'
        });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: 'Email and password are required'
        });
    }

    const supabase = supabaseClient();

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(401).json({
                status: false,
                message: error.message
            });
        }

        createSession('admin_token',data.session?.access_token);


        return res.status(200).json({
            status: true,
            message: 'Login Success.!!!'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}
