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

            <h2 className="sr-title">
                About the <em>Event:</em>
                <span className="sr-title-line"></span>
            </h2>

            <div className="sr-arena">

                <div className="sr-card sr-card--hack" id="card-hack">
                    <span className="sr-card-icon">⚡<span className="sr-card-label">Hackathon</span></span>
                    
                    <h3 className="sr-card-title">Hack the hacker</h3>
                    <div className="sr-divider"></div>
                    <p className="sr-desc">Hack The Hackers is a fast-paced CTF hackathon where you solve real cybersecurity challenges, compete with top talents, win exciting prizes and experience the adrenaline of ethical hacking</p>
                    <ul className="sr-list">
                        <li>ISOAH Collaboration</li>
                        <li>National-Level Challenge</li>
                        <li>Capture The Flag (CTF)</li>
                        <li>Ethical Hacking</li>
                        <li>Industry Tools &amp; Trends</li>
                    </ul>
                    <div className="sr-foot">
                        <div className="sr-date">
                            <strong>Event Date</strong>
                            <p>7 <sup>th</sup> MAY 26</p>
                            <p>10 AM Onward</p>
                        </div>
                        <div className="sr-venue">
                            <strong>Venue</strong>
                            <p>HIT, Haldia<br />West Bengal</p>
                        </div>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeqER0V6yyJRKL1NMeF2pRQILv9d63zhiJ9Nfm9wqM7ROwATw/viewform" className="sr-reg">Register →</a>
                    </div>
                </div>

                <div className="sr-card sr-card--conv" id="card-conv">
                    <span className="sr-card-icon">🎓<span className="sr-card-label">Convention</span></span>
                    <h3 className="sr-card-title">Annual convention 3.0</h3>
                    <div className="sr-divider"></div>
                    <p className="sr-desc">The Annual Convention is a flagship event that brings together students, faculty and industry experts for keynote talks, tech insights and interactive sessions on emerging technologies and professional development.</p>
                    <ul className="sr-list">
                        <li>Keynote Speeches</li>
                        <li>Expert Lectures</li>
                        <li>Industry Insights</li>
                        <li>Networking Opportunities</li>
                        <li>Career Guidance</li>
                    </ul>
                    <div className="sr-foot">
                        <div className="sr-date">
                            <strong>Event Date</strong>
                            <p>8 <sup>th</sup> MAY 26</p>
                            <p>10 AM Onward</p>
                        </div>
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
