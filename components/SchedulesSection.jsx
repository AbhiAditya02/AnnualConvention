'use client';

import React from 'react';

export default function SchedulesSection() {
    return (
        <section id="schedules" className="content-section" style={{ padding: '8rem 2rem', backgroundColor: 'var(--bg-color)', color: 'var(--color-dark)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', fontFamily: 'Epilogue, sans-serif', marginBottom: '1rem' }}>Event Schedule</h2>
                <p style={{ fontSize: '1.8rem', color: '#666', fontWeight: 600 }}>ANNUAL CONVENTION 3.0 &bull; 07th & 08th May, 2026</p>
            </div>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '4rem' }}>
                
                {/* Convention Overview */}
                <div style={{ backgroundColor: 'var(--color-white)', padding: '5rem 4rem', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '2px solid #eaeaea' }}>Event Flow</h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <li style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ fontSize: '3rem', lineHeight: '1' }}>🪔</div>
                            <div>
                                <strong style={{ fontSize: '1.8rem', display: 'block', marginBottom: '0.5rem' }}>Ceremonial Lamp Lighting</strong>
                                <p style={{ fontSize: '1.3rem', color: '#666', lineHeight: '1.6' }}>Official kickoff to the convention.</p>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ fontSize: '3rem', lineHeight: '1' }}>🎤</div>
                            <div>
                                <strong style={{ fontSize: '1.8rem', display: 'block', marginBottom: '0.5rem' }}>Keynote Speeches</strong>
                                <p style={{ fontSize: '1.3rem', color: '#666', lineHeight: '1.6' }}>Insights from 10–12 guest speakers.</p>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ fontSize: '3rem', lineHeight: '1' }}>🎓</div>
                            <div>
                                <strong style={{ fontSize: '1.8rem', display: 'block', marginBottom: '0.5rem' }}>Expert Lectures</strong>
                                <p style={{ fontSize: '1.3rem', color: '#666', lineHeight: '1.6' }}>Interactive sessions focusing on emerging tech, AI, Data Science, and cybersecurity.</p>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ fontSize: '3rem', lineHeight: '1' }}>🚀</div>
                            <div>
                                <strong style={{ fontSize: '1.8rem', display: 'block', marginBottom: '0.5rem' }}>Hack the Hackers</strong>
                                <p style={{ fontSize: '1.3rem', color: '#666', lineHeight: '1.6' }}>Full-day ethical hacking and CTF competition.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Hackathon Details */}
                <div style={{ backgroundColor: 'var(--color-black-deep)', color: 'var(--color-white)', padding: '5rem 4rem', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '0', padding: '2rem', opacity: '0.05', fontWeight: 900, fontSize: '12rem', letterSpacing: '-5px', lineHeight: '1' }}>CTF</div>
                    
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <h3 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '2px solid #333' }}>Hack the Hackers</h3>
                        <p style={{ fontSize: '1.6rem', marginBottom: '3rem', lineHeight: '1.6', color: '#ccc' }}>
                            Organized in collaboration with <strong style={{ color: 'var(--color-white)' }}>ISOAH</strong> (Indian School of Anti Hacking).
                        </p>
                        
                        <ul style={{ listStyleType: 'square', paddingLeft: '2rem', fontSize: '1.4rem', lineHeight: '2', color: '#a3a3a3', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <li>Nationwide participation</li>
                            <li>Ethical Hacking & CTF format</li>
                            <li>Full-day competitive event</li>
                            <li>Free and open registration</li>
                            <li>Focus on innovation & analytical skills</li>
                            <li>Industry-aligned problem-solving</li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
}