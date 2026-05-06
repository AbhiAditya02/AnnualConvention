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
    'Day 1 — 07 May': {
        heading: 'Hack The Hackers',
        events: [
            { title: 'Inaugural Address & Keynote', desc: 'Opening remarks by the Chief Guest followed by a keynote on the event.', tag: 'Keynote', color: 'blue' },
            { title: 'CTF Round 1 — Elimination Round', desc: 'Initial screening round where participating teams compete to qualify for the final CTF stage.', tag: 'Competition', color: 'black' },
            { title: 'Lunch Break', desc: 'Break for networking, and informal interaction among participants.', tag: 'Break', color: 'green' },
            { title: 'CTF Round 2 — Final Challenge', desc: 'Final Capture The Flag round featuring advanced cybersecurity challenges for shortlisted teams.', tag: 'CTF Finals', color: 'maroon' },
            { title: 'Winner Announcement & Prize Distribution', desc: 'Announcement of winners followed by prize and certificate distribution.', tag: 'Closing', color: 'pink' },
        ]
    },

    'Day 2 — 08 May': {
        heading: 'Annual Convention 3.0',
        events: [
            { title: 'Welcome / Opening Speech', desc: 'Formal inauguration of the convention with an opening address by the organizing committee.', tag: 'Opening', color: 'green' },
            { title: 'Ceremonial Lamp Lighting', desc: 'Traditional lamp lighting ceremony with guests, faculty members, and industry leaders.', tag: 'Ceremony', color: 'maroon' },
            { title: 'National Anthem', desc: 'Commencement of the convention with the national anthem.', tag: 'Patriotic', color: 'blue' },
            { title: 'Convention Website Showcase', desc: 'Presentation and live showcase of the official convention website and its features.', tag: 'Showcase', color: 'blue' },
            { title: 'Welcome Dance', desc: 'Cultural dance performance to welcome guests and participants.', tag: 'Culture', color: 'pink' },
            { title: 'ISTE Journey Video', desc: 'A visual presentation highlighting the journey, milestones, and achievements of ISTE.', tag: 'Presentation', color: 'blue' },
            { title: 'Guest Speeches', desc: 'Addresses and keynote speeches by invited dignitaries, faculty, and industry guests.', tag: 'Speakers', color: 'blue' },
            { title: 'Quiz Competition', desc: 'Interactive quiz session engaging participants in technical and general knowledge rounds.', tag: 'Activity', color: 'green' },
            { title: 'Group Song', desc: 'Musical group performance by students as part of the cultural segment.', tag: 'Culture', color: 'maroon' },
            { title: 'Felicitation of 4th Year Students', desc: 'Recognition and presentation of mementos to outgoing 4th year students.', tag: 'Felicitation', color: 'pink' },
            { title: 'Vote of Thanks', desc: 'Formal closing address expressing gratitude to guests, participants, and organizers.', tag: 'Closing', color: 'green' }
        ]
    }
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
                    <h2 className="sched-day-heading">
                        {SCHEDULE[DAY_KEYS[activeDay]].heading}
                    </h2>
                    <div className="sched-timeline__inner">
                        {SCHEDULE[DAY_KEYS[activeDay]].events.map((event, i) => (
                            <div key={i} className={`sched-event ${event.color ? `sched-event--${event.color}` : ''}`}>
                                <div className="sched-event__dot" />
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
