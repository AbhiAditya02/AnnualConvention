'use client';

import { useState } from 'react';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';
import '../styles/schedules.css';

/* ─── Schedule Data ────────────────────────────────────────────────────── */
const SCHEDULE = {
    'Day 1 — 07 May': [
        { time: '09:00 AM', title: 'Registration & Welcome Kit', desc: 'On-spot registration, ID distribution, and welcome kit handover.', tag: 'Opening', color: 'green' },
        { time: '10:00 AM', title: 'Ceremonial Lamp Lighting', desc: 'Traditional inauguration with faculty, chief guests, and student representatives.', tag: 'Ceremony', color: '' },
        { time: '10:30 AM', title: 'Inaugural Address & Keynote', desc: 'Opening remarks by the Chief Guest followed by a keynote on the future of technical education.', tag: 'Keynote', color: 'blue' },
        { time: '12:00 PM', title: 'Expert Lecture — Artificial Intelligence', desc: 'Deep dive into modern AI architectures, LLMs, and real-world applications.', tag: 'AI', color: '' },
        { time: '01:00 PM', title: 'Lunch Break', desc: 'Networking lunch with speakers and attendees.', tag: 'Break', color: 'green' },
        { time: '02:00 PM', title: 'Expert Lecture — Cybersecurity', desc: 'Threat landscapes, zero-trust architectures, and ethical hacking methodologies.', tag: 'Security', color: 'blue' },
        { time: '03:30 PM', title: 'Expert Lecture — Data Science', desc: 'From data pipelines to actionable insights — industry use cases and career paths.', tag: 'Data', color: 'pink' },
        { time: '05:00 PM', title: 'Cultural Evening', desc: 'Singing, dancing, recitation, speeches, and one-act plays by students.', tag: 'Culture', color: 'maroon' },
    ],
    'Day 2 — 08 May': [
        { time: '09:00 AM', title: 'Hack the Hackers — CTF Kickoff', desc: 'National-level Capture The Flag competition begins. Teams report to labs.', tag: 'Hackathon', color: '' },
        { time: '10:00 AM', title: 'Guest Speaker Session', desc: 'Industry professionals from MN Dastur, IIFON, Google, and SecureT360 share insights.', tag: 'Speakers', color: 'blue' },
        { time: '11:30 AM', title: 'Innovation Showcase', desc: 'Student projects on display — including the Drone Medicine Model demonstration.', tag: 'Innovation', color: 'green' },
        { time: '01:00 PM', title: 'Lunch & Networking', desc: 'Connect with speakers, mentors, and fellow participants.', tag: 'Break', color: 'green' },
        { time: '02:00 PM', title: 'CTF — Final Round', desc: 'Intensified challenges. Top teams battle for the podium.', tag: 'Hackathon', color: '' },
        { time: '04:00 PM', title: 'Valedictory & Prize Distribution', desc: 'Closing ceremony, winner announcements, and certificate distribution.', tag: 'Closing', color: 'maroon' },
        { time: '05:00 PM', title: 'Vote of Thanks', desc: 'Formal closing by Prof. Priyatosh Jana and the ISTE HIT SC team.', tag: 'Closing', color: 'pink' },
    ],
};

const HACKATHON_ITEMS = [
    'Nationwide participation',
    'Ethical Hacking & CTF format',
    'Full-day competitive event',
    'Free & open registration',
    'Focus on innovation & analytical skills',
    'Industry-aligned problem-solving',
];

const DAY_KEYS = Object.keys(SCHEDULE);

/* ─── Component ────────────────────────────────────────────────────────── */
export default function SchedulesPage() {
    const [activeDay, setActiveDay] = useState(0);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />

            {/* ═══ Hero ═══ */}
            <header className="sched-hero main-header">
                <Navbar />
                <img src="/assets/VimeoHero SVG/pink-star.svg" alt="" className="sched-hero__star sched-hero__star--1" aria-hidden="true" />
                <img src="/assets/VimeoHero SVG/pink-star.svg" alt="" className="sched-hero__star sched-hero__star--2" aria-hidden="true" />

                <div className="sched-hero__inner">
                    <span className="sched-hero__badge">Annual Convention 3.0</span>
                    <h1 className="sched-hero__title">Event <em>Schedule</em></h1>
                    <p className="sched-hero__date">07th &amp; 08th May, 2026</p>
                </div>
            </header>

            <main>
                {/* ═══ Day Tabs ═══ */}
                <div className="sched-tabs">
                    {DAY_KEYS.map((day, i) => (
                        <button
                            key={day}
                            className={`sched-tab ${activeDay === i ? 'sched-tab--active' : ''}`}
                            onClick={() => setActiveDay(i)}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* ═══ Timeline ═══ */}
                <section className="sched-timeline">
                    <div className="sched-timeline__inner">
                        {SCHEDULE[DAY_KEYS[activeDay]].map((event, i) => (
                            <div key={i} className={`sched-event ${event.color ? `sched-event--${event.color}` : ''}`}>
                                <div className="sched-event__dot" />
                                <span className="sched-event__time">{event.time}</span>
                                <div className="sched-event__card">
                                    <h3 className="sched-event__title">{event.title}</h3>
                                    <p className="sched-event__desc">{event.desc}</p>
                                    <span className="sched-event__tag">{event.tag}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ Hackathon Feature ═══ */}
                <section className="sched-hackathon">
                    <div className="sched-hackathon__card">
                        <div className="sched-hackathon__watermark">CTF</div>
                        <div className="sched-hackathon__content">
                            <span className="sched-hackathon__label">Hackathon</span>
                            <h2 className="sched-hackathon__title">Hack the Hackers</h2>
                            <p className="sched-hackathon__subtitle">
                                Organized in collaboration with <strong>ISOAH</strong> (Indian School of Anti Hacking). A full-day national-level ethical hacking competition in CTF format.
                            </p>
                            <div className="sched-hackathon__grid">
                                {HACKATHON_ITEMS.map((item) => (
                                    <div key={item} className="sched-hackathon__item">{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ═══ Footer ═══ */}
            <footer className="main-footer">
                <Footer />
            </footer>

            <TransitionScribble />
        </>
    );
}
