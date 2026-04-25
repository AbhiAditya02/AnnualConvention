'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

export default function SponsorsPage() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            
            <header className="main-header" style={{ minHeight: '50vh', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
                <Navbar />
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', fontFamily: 'Epilogue, sans-serif' }}>Sponsors & Partners</h1>
                </div>
            </header>

            <main>
                <div className="content-section" style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-color)', color: 'var(--color-dark)' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>Why Sponsor Us?</h2>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', fontSize: '1.2rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li><strong>Massive Reach:</strong> Connect with tech enthusiasts, budding entrepreneurs, and professionals from across India.</li>
                                <li><strong>Targeted Marketing:</strong> Engage with a niche audience interested in AI, cybersecurity, and emerging technologies.</li>
                                <li><strong>Brand Credibility:</strong> Position your brand as a leader in the tech community.</li>
                                <li><strong>Long-Term Impact:</strong> Build lasting relationships with future tech innovators.</li>
                            </ul>
                            <p style={{ marginTop: '2rem', fontSize: '1.2rem', fontStyle: 'italic', color: '#555' }}>"We believe this partnership will be mutually beneficial and are excited about the opportunities it brings. We would love to discuss further details and tailor the sponsorship to align with your brand objectives."</p>
                        </div>

                        <h2 style={{ fontSize: '3.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3rem', textAlign: 'center', letterSpacing: '-1px' }}>Sponsorship Tiers 2026</h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {/* Silver */}
                            <div style={{ backgroundColor: 'var(--color-white)', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', borderTop: '8px solid #A8A8A8' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Silver Tier</h3>
                                <p style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--color-black)' }}>₹ 25,000</p>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <li>✓ Logo on event banners and brochures</li>
                                    <li>✓ Social media mentions and website listing</li>
                                    <li>✓ Acknowledgment during the event</li>
                                </ul>
                            </div>
                            
                            {/* Gold */}
                            <div style={{ backgroundColor: 'var(--color-white)', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', borderTop: '8px solid #FFD700', transform: 'scale(1.05)' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Gold Tier</h3>
                                <p style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--color-black)' }}>₹ 45,000</p>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <li>✓ All Silver perks included</li>
                                    <li>✓ Special networking session with top teams</li>
                                    <li>✓ Featured mention in opening and closing sessions</li>
                                    <li>✓ Company profile in the event booklet</li>
                                </ul>
                            </div>
                            
                            {/* Diamond */}
                            <div style={{ backgroundColor: 'var(--color-white)', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', borderTop: '8px solid #4b69f0' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Diamond Tier</h3>
                                <p style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--color-black)' }}>₹ 65,000</p>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <li>✓ All Gold perks included</li>
                                    <li>✓ Prime logo placement on all marketing materials</li>
                                    <li>✓ Dedicated speaking slot or presentation opportunity</li>
                                    <li>✓ Exclusive branding on event merchandise</li>
                                </ul>
                            </div>
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
