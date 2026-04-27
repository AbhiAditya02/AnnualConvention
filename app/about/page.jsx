'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

export default function AboutPage() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />

            {/* ─── Hero Header ─── */}
            <header className="main-header" style={{ minHeight: '60vh', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', textAlign: 'center' }}>
                <Navbar />
                <div style={{ maxWidth: '800px', padding: '0 2rem' }}>
                    <h1 style={{ fontSize: '5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', fontFamily: 'Epilogue, sans-serif', marginBottom: '1.5rem' }}>About Us</h1>
                    <p style={{ fontSize: '1.5rem', color: '#a3a3a3', lineHeight: '1.6' }}>Building a dynamic technical community empowering students with knowledge, skills, and industry exposure.</p>
                </div>
            </header>

            <main>
                {/* ─── About ISTE HIT SC ─── */}
                <div className="content-section" style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-1px' }}>About ISTE HIT SC</h2>
                        <p style={{ fontSize: '1.3rem', lineHeight: '1.8', color: '#c0c0c0' }}>
                            The ISTE HIT Students' Chapter was founded in 2023 under the parent body established in 1941 to advance technical education in India. Workshops are led by Prof. Priyatosh Jana sir. Within one year, the chapter has successfully educated students in both technical and non-technical aspects.
                        </p>
                    </div>
                </div>

                {/* ─── Annual Conventions ─── */}
                <div className="content-section" style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-color)', color: 'var(--color-dark)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, textAlign: 'center', marginBottom: '4rem', letterSpacing: '-1px' }}>Our Journey</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                            {/* Convention 2025 */}
                            <div style={{ backgroundColor: 'var(--color-white)', padding: '4rem 3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', borderBottom: '2px solid #eaeaea', paddingBottom: '1rem' }}>Annual Convention 2025</h3>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.15rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7' }}>
                                    <li style={{ color: 'var(--color-dark)' }}>Participation from distinguished academicians from prestigious technical institutions.</li>
                                    <li style={{ color: 'var(--color-dark)' }}><strong>Guest Speakers from:</strong> MN Dastur, IIFON, Trisita Engineering, EEGRAB, Google, SecureT360, Dataspace, and IEM Labs.</li>
                                    <li style={{ color: 'var(--color-dark)' }}><strong>Expert Sessions Covered:</strong> Artificial Intelligence, Cybersecurity, Data Science, and networking opportunities.</li>
                                </ul>
                            </div>

                            {/* Convention 2024 */}
                            <div style={{ backgroundColor: 'var(--color-white)', padding: '4rem 3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', borderBottom: '2px solid #eaeaea', paddingBottom: '1rem' }}>Annual Convention 2024</h3>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.15rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7' }}>
                                    <li style={{ color: 'var(--color-dark)' }}>Participation from professionals at Google, TCS, Black Hills Information Security, and Dastur InfoScience.</li>
                                    <li style={{ color: 'var(--color-dark)' }}>Student innovation showcase, notably the demonstration of the Drone Medicine Model.</li>
                                    <li style={{ color: 'var(--color-dark)' }}>Official launch of the ISTE HIT Students' Chapter Website.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Vision & Mission ─── */}
                <div className="content-section" style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '3rem', letterSpacing: '-1px' }}>Vision & Mission</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.25rem', lineHeight: '1.8', color: '#c0c0c0' }}>
                            <p>To build a dynamic technical community empowering students with knowledge, skills, and industry exposure.</p>
                            <p>Bridging the gap between academia and industry through hands-on learning, research, and innovation-driven events.</p>
                            <p>Foster leadership, networking, and collaboration to nurture future-ready professionals.</p>
                            <p>Dedicated to ethical and sustainable technological advancements to shape tomorrow's engineers and innovators.</p>
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
