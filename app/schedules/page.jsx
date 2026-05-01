'use client';

import { useState } from 'react';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import '../styles/schedules.css';

/* ─── Schedule Data ────────────────────────────────────────────────────── */
const SCHEDULE = {
    'Day 1 — 07 May': [
        { time: '10:00 AM', title: 'Hack the Hackers — CTF Kickoff', desc: 'National-level Capture The Flag competition begins. Teams report to labs.', tag: 'Hackathon', color: '' },
        { time: '10:00 AM', title: 'Inaugural Address & Keynote', desc: 'Opening remarks by the Chief Guest followed by a keynote on the event.', tag: 'Keynote', color: 'blue' },
        { time: '01:00 PM', title: 'Lunch Break', desc: 'Networking lunch with speakers and attendees.', tag: 'Break', color: 'green' },
        { time: '04:00 PM', title: 'Valedictory & Prize Distribution', desc: 'Closing ceremony, winner announcements, and certificate distribution.', tag: 'Closing', color: 'maroon' },
        { time: '05:00 PM', title: 'Vote of Thanks', desc: 'Formal closing by Prof. Priyatosh Jana and the ISTE HIT SC team.', tag: 'Closing', color: 'pink' },
    ],
    'Day 2 — 08 May': [
        { time: '09:00 AM', title: 'Registration', desc: 'On-spot registration and ID distribution.', tag: 'Opening', color: 'green' },
        { time: '10:00 AM', title: 'Ceremonial Lamp Lighting', desc: 'Traditional inauguration with faculty, chief guests, and student representatives.', tag: 'Ceremony', color: '' },
        { time: '10:00 AM', title: 'Guest Speaker Session', desc: 'Industry professionals from MN Dastur, IIFON, Google, and SecureT360 share insights.', tag: 'Speakers', color: 'blue' },
        { time: '01:00 PM', title: 'Lunch & Networking', desc: 'Connect with speakers, mentors, and fellow participants.', tag: 'Break', color: 'green' },
        { time: '03:00 PM', title: 'Cultural Evening', desc: 'Singing, dancing, recitation, speeches, and one-act plays by students.', tag: 'Culture', color: 'maroon' },
        { time: '05:00 PM', title: 'Vote of Thanks', desc: 'Formal closing by Prof. Priyatosh Jana and the ISTE HIT SC team.', tag: 'Closing', color: 'pink' },
    ],
};

const DAY_KEYS = Object.keys(SCHEDULE);

/* ─── Component ────────────────────────────────────────────────────────── */
export default function SchedulesPage() {
    const [activeDay, setActiveDay] = useState(0);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble /> 

            {/* ═══ Hero — matches showreel section dark style ═══ */}
            <header className="sched-hero main-header">
                <Navbar />
                <img src="/assets/VimeoHero SVG/pink-star.svg" alt="" className="sched-hero__star sched-hero__star--1" aria-hidden="true" />
                <img src="/assets/VimeoHero SVG/pink-star.svg" alt="" className="sched-hero__star sched-hero__star--2" aria-hidden="true" />

                <div className="sched-hero__inner">
                    <h1 className="sched-hero__title">event <em>schedule</em></h1>
                    <p className="sched-hero__date">Annual Convention 3.0 &bull; 07th &amp; 08th May, 2026</p>
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
            </main>

            <TransitionScribble />
        </>
    );
}
