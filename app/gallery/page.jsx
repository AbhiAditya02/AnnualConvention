'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

export default function GalleryPage() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            
            <header className="main-header" style={{ minHeight: '60vh', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', textAlign: 'center' }}>
                <Navbar />
                <div style={{ maxWidth: '900px', padding: '0 2rem' }}>
                    <h1 style={{ fontSize: '5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', fontFamily: 'Epilogue, sans-serif', marginBottom: '1.5rem' }}>Event Gallery</h1>
                    <p style={{ fontSize: '1.5rem', color: '#a3a3a3', lineHeight: '1.6' }}>Explore past highlights from our previous annual conventions and initiatives by the ISTE HIT Students' Chapter.</p>
                </div>
            </header>

            <main>
                <div className="content-section" style={{ padding: '8rem 2rem', backgroundColor: 'var(--bg-color)', color: 'var(--color-dark)' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                        
                        {/* 2025 Edition */}
                        <div style={{ borderLeft: '8px solid var(--color-black)', paddingLeft: '3rem' }}>
                            <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>Annual Convention 2025</h2>
                            <ul style={{ listStyleType: 'circle', paddingLeft: '2rem', fontSize: '1.5rem', lineHeight: '1.8', color: '#444', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <li>Participation from distinguished academicians from prestigious technical institutions.</li>
                                <li>Guest Speakers from: MN Dastur, IIFON, Trisita Engineering, EEGRAB, Google, SecureT360, Dataspace, and IEM Labs.</li>
                                <li>Expert Sessions Covered: Artificial Intelligence, Cybersecurity, Data Science, and networking opportunities.</li>
                            </ul>
                        </div>

                        {/* 2024 Edition */}
                        <div style={{ borderLeft: '8px solid var(--color-orange)', paddingLeft: '3rem' }}>
                            <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>Annual Convention 2024</h2>
                            <ul style={{ listStyleType: 'circle', paddingLeft: '2rem', fontSize: '1.5rem', lineHeight: '1.8', color: '#444', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <li>Participation from professionals at Google, TCS, Black Hills Information Security, and Dastur InfoScience.</li>
                                <li>Student innovation showcase, notably the demonstration of the Drone Medicine Model.</li>
                                <li>Official launch of the ISTE HIT Students’ Chapter Website.</li>
                            </ul>
                        </div>

                        {/* About Us section */}
                        <div style={{ backgroundColor: 'var(--color-white)', padding: '5rem', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginTop: '4rem', borderTop: '8px solid var(--color-darkblue)' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '2rem' }}>About ISTE HIT SC</h2>
                            <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: '#555', marginBottom: '3rem' }}>
                                The ISTE HIT Students’ Chapter was founded in 2023 under the parent body established in 1941 to advance technical education in India. Workshops are led by Prof. Priyatosh Jana sir. Within one year, the chapter has successfully educated students in both technical and non-technical aspects.
                            </p>
                            
                            <h3 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Vision & Mission</h3>
                            <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: '#555' }}>
                                To build a dynamic technical community empowering students with knowledge, skills, and industry exposure. Bridging the gap between academia and industry through hands-on learning, research, and innovation-driven events. Foster leadership, networking, and collaboration to nurture future-ready professionals. Dedicated to ethical and sustainable technological advancements to shape tomorrow’s engineers and innovators.
                            </p>
                        </div>

                    </div>
                </div>
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
