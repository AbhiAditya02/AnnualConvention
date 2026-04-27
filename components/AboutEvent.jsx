'use client';

import React from 'react';

export default function AboutEvent() {
    return (
        <section id="about" className="content-section" style={{ padding: '10rem 5%', backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '4rem', marginBottom: '2rem', lineHeight: '1.1' }}>About the event</h2>
                <p style={{ fontSize: '1.5rem', lineHeight: '1.6', opacity: 0.8 }}>
                    The ISTE HIT SC Annual Convention 3.0 is a flagship event that brings together technical minds, 
                    industry experts, and students to foster innovation and excellence. Join us for a series of 
                    workshops, hackathons, and networking sessions designed to empower the next generation of engineers.
                </p>
            </div>
        </section>
    );
}
