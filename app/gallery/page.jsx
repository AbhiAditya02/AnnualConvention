'use client';

import { useState, useEffect } from 'react';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import DomeGallery from '@/components/DomeGallery';
import '../styles/gallery.css';

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

            <header className="gallery-hero main-header">
                <Navbar />
                <div className="gallery-hero__inner">
                    <h1 className="gallery-hero__title">Glimpses from <br />Annual Convention 2.0</h1>
                </div>
            </header>

            <main>
                <section className="gallery-section">
                    {loading ? (
                        <div className="gallery-message gallery-message--loading">
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
                        <div className="gallery-message gallery-message--empty">
                            No images found. Upload images to the &quot;iste-gallery&quot; folder on Cloudinary.
                        </div>
                    )}
                </section>
            </main>

            <TransitionScribble />
        </>
    );
}
