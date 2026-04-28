'use client';
import "./Showreel.css";
import { useEffect } from 'react';

export default function Showreel() {

    useEffect(() => {
        const wrap = document.getElementById('showreel-section');
        const cardHack = document.getElementById('card-hack');
        const cardConv = document.getElementById('card-conv');
        const stickerData = [
            { id: 'sk1', dx: -0.025, dy: -0.018 },
            { id: 'sk2', dx:  0.028, dy: -0.02  },
            { id: 'sk3', dx:  0,     dy: -0.03  },
            { id: 'sk4', dx: -0.02,  dy:  0.015 },
            { id: 'sk5', dx:  0.02,  dy:  0.015 },
        ];
        const stickers = stickerData.map(s => ({
            el: document.getElementById(s.id),
            dx: s.dx,
            dy: s.dy,
        }));
        stickers.forEach(s => {
            if (s.el) s.el.setAttribute('data-base', s.el.style.transform);
        });

        let mx = 0, my = 0, cx = 0, cy = 0, raf;

        const onMove = e => {
            const r = wrap.getBoundingClientRect();
            mx = (e.clientX - r.left - r.width / 2) / r.width;
            my = (e.clientY - r.top - r.height / 2) / r.height;
        };
        const onLeave = () => { mx = 0; my = 0; };

        wrap.addEventListener('mousemove', onMove);
        wrap.addEventListener('mouseleave', onLeave);

        const tick = () => {
            cx += (mx - cx) * 0.07;
            cy += (my - cy) * 0.07;
            cardHack.style.transform = `rotate(${-6 + cx * 4}deg) translateX(60px) translateY(${cy * -12}px)`;
            cardConv.style.transform = `rotate(${5 + cx * -4}deg) translateX(-60px) translateY(${cy * -12}px)`;
            stickers.forEach(s => {
                if (!s.el) return;
                const base = s.el.getAttribute('data-base') || '';
                s.el.style.transform = base + ` translate(${cx * s.dx * 800}px, ${cy * s.dy * 800}px)`;
            });
            raf = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            wrap.removeEventListener('mousemove', onMove);
            wrap.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section className="showreel-section" id="showreel-section">

            {/* Sticker 1 — Camera */}
            <div className="sr-sticker sr-sticker--1" id="sk1">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" fill="#f5f0e8" stroke="#1a1a1a" strokeWidth="2"/>
                    <rect x="20" y="22" width="24" height="18" rx="3" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
                    <circle cx="32" cy="31" r="5" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
                    <circle cx="38" cy="25" r="1.5" fill="#1a1a1a"/>
                </svg>
            </div>

            {/* Sticker 2 — Smiley */}
            <div className="sr-sticker sr-sticker--2" id="sk2">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="28" r="24" fill="#c8e6f5" stroke="#1a1a1a" strokeWidth="2"/>
                    <circle cx="21" cy="24" r="2.5" fill="#1a1a1a"/>
                    <circle cx="35" cy="24" r="2.5" fill="#1a1a1a"/>
                    <path d="M20 33c2 4 14 4 16 0" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>

            {/* Sticker 3 — Star */}
            <div className="sr-sticker sr-sticker--3" id="sk3">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <path d="M22 4 L24.5 18 L38 22 L24.5 26 L22 40 L19.5 26 L6 22 L19.5 18 Z" fill="#f5e6c8" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Sticker 4 — Lightning */}
            <div className="sr-sticker sr-sticker--4" id="sk4">
                <svg width="50" height="56" viewBox="0 0 50 56" fill="none">
                    <polygon points="30,2 10,28 22,28 16,54 40,22 28,22" fill="#f5f0c8" stroke="#1a1a1a" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Sticker 5 — Heart sparkle */}
            <div className="sr-sticker sr-sticker--5" id="sk5">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <path d="M28 46 C28 46 8 34 8 20 C8 13 13 8 20 10 C24 11 28 16 28 16 C28 16 32 11 36 10 C43 8 48 13 48 20 C48 34 28 46 28 46Z" fill="#f5c8d4" stroke="#1a1a1a" strokeWidth="1.8"/>
                    <path d="M40 6 L41.5 10 L46 11 L41.5 12 L40 16 L38.5 12 L34 11 L38.5 10 Z" fill="#f5f0c8" stroke="#1a1a1a" strokeWidth="1"/>
                </svg>
            </div>

            <p className="sr-eyebrow">ISTE HIT SC</p>
            <h2 className="sr-title">
                About the <em>Event:</em>
                <span className="sr-title-line"></span>
            </h2>

            <div className="sr-arena">

                <div className="sr-card sr-card--hack" id="card-hack">
                    <span className="sr-card-icon">⚡</span>
                    <p className="sr-card-label">Hackathon</p>
                    <h3 className="sr-card-title">hackathon</h3>
                    <div className="sr-divider"></div>
                    <p className="sr-desc">Push your limits in cybersecurity, ethical hacking and real-world CTF challenges.</p>
                    <ul className="sr-list">
                        <li>National-Level Challenge</li>
                        <li>Ethical Hacking</li>
                        <li>Capture The Flag (CTF)</li>
                        <li>ISOAH Collaboration</li>
                        <li>Industry Tools &amp; Trends</li>
                    </ul>
                    <div className="sr-foot">
                        <div className="sr-venue">
                            <strong>Venue</strong>
                            <p>HIT, Haldia<br />West Bengal</p>
                        </div>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdhoVhFIEbH41zrbEwhtgaKSBswWQNVhfMg9wo_YLKX0SS5QA/alreadyresponded" className="sr-reg">Register →</a>
                    </div>
                </div>

                <div className="sr-card sr-card--conv" id="card-conv">
                    <span className="sr-card-icon">🎓</span>
                    <p className="sr-card-label">Convention</p>
                    <h3 className="sr-card-title">convention</h3>
                    <div className="sr-divider"></div>
                    <p className="sr-desc">Keynotes, expert lectures and sessions bridging academia with industry innovation.</p>
                    <ul className="sr-list">
                        <li>Keynote Speeches</li>
                        <li>Expert Lectures</li>
                        <li>Innovation Showcase</li>
                        <li>Networking Opportunities</li>
                        <li>Drone Medicine Model</li>
                    </ul>
                    <div className="sr-foot">
                        <div className="sr-venue">
                            <strong>Venue</strong>
                            <p>HIT, Haldia<br />West Bengal</p>
                        </div>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdhoVhFIEbH41zrbEwhtgaKSBswWQNVhfMg9wo_YLKX0SS5QA/alreadyresponded" className="sr-reg">Register →</a>
                    </div>
                </div>

            </div>

            <a href="/schedules" className="sr-sched">
                View Schedule
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </a>

        </section>
    );
}
