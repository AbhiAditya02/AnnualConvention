'use client';

import { useState, useEffect } from 'react';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import DomeGallery from '@/components/DomeGallery';

export default function GalleryPage() {
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => {
                setGalleryImages(data.images || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch gallery images:', err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />

            <header className="main-header" style={{ minHeight: '60vh', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', textAlign: 'center' }}>
                <Navbar />
                <div style={{ maxWidth: '900px', padding: '0 2rem' }}>
                    <h1 style={{ fontSize: '5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', fontFamily: 'Epilogue, sans-serif', marginBottom: '1.5rem' }}>Event Gallery</h1>
                </div>
            </header>

            <main>
                <section style={{ width: '100vw', height: '100vh', backgroundColor: '#120F17' }}>
                    {loading ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#fff', fontSize: '1.5rem', fontFamily: 'Epilogue, sans-serif' }}>
                            Loading gallery...
                        </div>
                    ) : galleryImages.length > 0 ? (
                        <DomeGallery
                            images={galleryImages}
                            segments={24}
                            grayscale={false}
                            minRadius={520}
                            imageBorderRadius="24px"
                            openedImageBorderRadius="24px"
                        />
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888', fontSize: '1.5rem', fontFamily: 'Epilogue, sans-serif' }}>
                            No images found. Upload images to the &quot;iste-gallery&quot; folder on Cloudinary.
                        </div>
                    )}
                </section>
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
