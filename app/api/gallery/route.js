import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
    try {
        const result = await cloudinary.search
            .expression('folder:iste-gallery')
            .sort_by('public_id', 'asc')
            .max_results(100)
            .execute();

        const images = result.resources.map((img, i) => ({
            src: cloudinary.url(img.public_id, {
                width: 400,
                crop: 'fill',
                quality: 'auto',
                fetch_format: 'auto',
                secure: true,
                format: img.format,
            }),
            alt: `ISTE HIT SC Annual Convention gallery image ${i + 1}`,
        }));

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Cloudinary fetch error:', error);
        return NextResponse.json({ images: [], error: 'Failed to fetch images' }, { status: 500 });
    }
}
