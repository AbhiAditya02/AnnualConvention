'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

export default function ContactPage() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            
            <header className="main-header" style={{ minHeight: '60vh', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', textAlign: 'center' }}>
                <Navbar />
                <div style={{ maxWidth: '800px', padding: '0 2rem' }}>
                    <h1 style={{ fontSize: '5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', fontFamily: 'Epilogue, sans-serif', marginBottom: '1.5rem' }}>Get In Touch!</h1>
                    <p style={{ fontSize: '1.5rem', color: '#a3a3a3', lineHeight: '1.6' }}>Have questions about ANNUAL CONVENTION 3.0? Reach out to our organizing committee.</p>
                </div>
            </header>

            <main>
                <div className="content-section" style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-color)', color: 'var(--color-dark)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                        
                        <div style={{ backgroundColor: 'var(--color-white)', padding: '4rem 3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', borderBottom: '2px solid #eaeaea', paddingBottom: '1rem' }}>Contact Persons</h3>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <li><strong style={{ display: 'block', marginBottom: '0.2rem' }}>Prof. Priyatosh Jana:</strong><a href="tel:+919002780765" style={{ color: 'var(--color-darkblue)', textDecoration: 'none', fontWeight: 600 }}>9002780765</a></li>
                                <li><strong style={{ display: 'block', marginBottom: '0.2rem' }}>Rahul Kumar:</strong><a href="tel:+917257887857" style={{ color: 'var(--color-darkblue)', textDecoration: 'none', fontWeight: 600 }}>7257887857</a></li>
                                <li><strong style={{ display: 'block', marginBottom: '0.2rem' }}>R. Niranjana:</strong><a href="tel:+917859040801" style={{ color: 'var(--color-darkblue)', textDecoration: 'none', fontWeight: 600 }}>7859040801</a></li>
                                <li><strong style={{ display: 'block', marginBottom: '0.2rem' }}>Shivam Priyadarshi:</strong><a href="tel:+916205422973" style={{ color: 'var(--color-darkblue)', textDecoration: 'none', fontWeight: 600 }}>6205422973</a></li>
                            </ul>
                        </div>
                        
                        <div style={{ backgroundColor: 'var(--color-white)', padding: '4rem 3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', borderBottom: '2px solid #eaeaea', paddingBottom: '1rem' }}>Digital Reach</h3>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <li><strong style={{ display: 'block', marginBottom: '0.2rem' }}>Email:</strong><a href="mailto:hitiste.studentchapter@gmail.com" style={{ color: 'var(--color-darkblue)', textDecoration: 'none', fontWeight: 600 }}>hitiste.studentchapter@gmail.com</a></li>
                                <li><strong style={{ display: 'block', marginBottom: '0.2rem' }}>Website:</strong><a href="https://Istehitsc.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-darkblue)', textDecoration: 'none', fontWeight: 600 }}>Istehitsc.com</a></li>
                                
                                <li style={{ paddingTop: '1.5rem', marginTop: '0.5rem', borderTop: '2px solid #eaeaea' }}><strong style={{ display: 'block', marginBottom: '1rem', fontSize: '1.5rem' }}>Social Media</strong></li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span>YouTube:</span> <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>ISTEHITSC</span></li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span>Instagram:</span> <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>@iste.hit.sc</span></li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span>LinkedIn:</span> <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>iste-hit-sc</span></li>
                            </ul>
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
