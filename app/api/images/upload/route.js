import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file'); // UI theke pathano file

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Google Auth Setup
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.NEXT_GOOGLE_SERVICE_ACCOUNT_KEY),
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });
        const drive = google.drive({ version: 'v3', auth });

        // File-ke Buffer-e convert kora
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileMetadata = {
            name: file.name,
            parents: ['19bCTJKjKADKPo07TzInkMeD9wMRvhFmT'], 
        };

        const media = {
            mimeType: file.type,
            body: require('stream').Readable.from(buffer),
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
            supportsAllDrives: true, // Eti add korun
        });

        return NextResponse.json({ success: true, fileId: response.data.id });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}