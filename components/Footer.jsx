'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { SOCIAL_ICONS, WIGGLE_CONFIG } from '@/lib/data';
import { initWiggle } from '@/lib/animations';

export default function Footer() {
    useEffect(() => {
        // ─── Map link underline draw/undraw ───
        const footerMapLink = document.querySelector('.footer-map-link');
        if (footerMapLink) {
            const mapSvgPaths = footerMapLink.querySelectorAll('.draw-btn__svg path');
            mapSvgPaths.forEach(path => {
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
            });
            const onEnter = () => gsap.fromTo(mapSvgPaths, { strokeDashoffset: (i, el) => el.getTotalLength() }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, overwrite: true });
            const onLeave = () => gsap.to(mapSvgPaths, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
            footerMapLink.addEventListener('mouseenter', onEnter);
            footerMapLink.addEventListener('mouseleave', onLeave);
        }

        // ─── Wiggle on footer interactive elements ───
        const wiggleTargets = [
            { selector: '.footer-column h3', key: 'jobHeading' },
            { selector: '.footer-map-link span', key: 'googleMap' },
            { selector: '.footer-socials a', key: 'socials' },
        ];
        wiggleTargets.forEach(({ selector, key }) => {
            document.querySelectorAll(selector).forEach(el => initWiggle(el, WIGGLE_CONFIG[key]));
        });

    }, []);

    return (
        <div className="footer-inner">
            <div className='footer-logo-box'>
                <img src="../assets/iste.png" alt="" className='footer-logo'/>
                <img src="../assets/Footer-Sticker SVG/footer-sticker-iste-logo.svg" alt="ISTE HIT SC" className='footer-wordmark'/>
            </div>
            <div className="footer-top">
                {/* Office */}
                <div className="footer-column">
                    <span className="footer-badge">location</span>
                    <address>
                        Haldia Institute of Technology,<br />
                        Purba Medinipur, Haldia,<br />
                        West Bengal-721657
                    </address>
                    <a href="https://maps.app.goo.gl/jYCdd6aUXgqhWvvs6" className="footer-map-link" target="_blank" rel="noopener noreferrer">
                        <span>Google Maps</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="draw-btn__svg">
                            <path d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"></path>
                            <path d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"></path>
                        </svg>
                    </a>
                </div>
                {/* socials */}
                <div className="footer-column">
                    <span className="footer-badge">socials</span>
                    <div className="footer-socials" id="footer-socials">
                        {SOCIAL_ICONS.map(({ href, label, svg }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="single-social"
                                aria-label={label}
                                dangerouslySetInnerHTML={{ __html: svg }}
                            />
                        ))}
                    </div>
                </div>
                {/* Jobs */}
                <div className="footer-column">
                    <span className="footer-badge">participate</span>
                    <h3>register now!</h3>
                </div>
            </div>
        </div>
    );
}