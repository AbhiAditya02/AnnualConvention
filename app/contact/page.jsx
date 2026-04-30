import React from "react";
import "../styles/ContactPage.css";
import Navbar from "@/components/Navbar";
import SvgSymbols from "@/components/SvgSymbols";
import SmoothScroll from "@/components/SmoothScroll";
import CursorBubble from "@/components/CursorBubble";
import TransitionScribble from "@/components/TransitionScribble";

const contacts = [
  { name: "Prof. Priyatosh Jana", phone: "9002780765", href: "tel:+9190027 80765", role: "OFFICER IN-CHARGE" },
  { name: "Rahul Kumar", phone: "7257887857", href: "tel:+9172578 87857", role: "CHAIR PERSON" },
  { name: "R. Niranjana", phone: "7859040801", href: "tel:+917859040801", role: "Grievance Officer" },
  { name: "Shivam Priyadarshi", phone: "6205422973", href: "tel:+916205422973", role: "Grievance Officer" },
];

const socials = [
  {
    platform: "Instagram",
    handle: "@iste.hit.sc",
    href: "https://instagram.com/iste.hit.sc",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    handle: "iste-hit-sc",
    href: "https://linkedin.com/company/iste-hit-sc",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    platform: "Email",
    handle: "hitiste.studentchapter\n@gmail.com",
    href: "mailto:hitiste.studentchapter@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
  {
    platform: "Website",
    handle: "Istehitsc.com",
    href: "https://Istehitsc.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="contact-page">
      <SvgSymbols />
      <SmoothScroll />
      <CursorBubble />

      {/* HERO */}
      <header className="hero">
        <Navbar />
        <div className="hero-inner">
          <h1 className="hero-title">
            Get In <span className="highlight">Touch</span>
          </h1>
          <p className="hero-desc">
            Have questions about the convention? Reach out to our organizing committee.
          </p>
        </div>
        <div className="hero-ticker">
          <div className="ticker-track">
            <span>CONTACT US &nbsp;·&nbsp; REACH OUT &nbsp;·&nbsp; CONNECT WITH US &nbsp;·&nbsp; CONTACT US &nbsp;·&nbsp; REACH OUT &nbsp;·&nbsp; CONNECT WITH US &nbsp;·&nbsp;</span>
            <span>CONTACT US &nbsp;·&nbsp; REACH OUT &nbsp;·&nbsp; CONNECT WITH US &nbsp;·&nbsp; CONTACT US &nbsp;·&nbsp; REACH OUT &nbsp;·&nbsp; CONNECT WITH US &nbsp;·&nbsp;</span>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="page-body">
        <main className="main">
          {/* MEMBER CARDS */}
          <div className="cards-grid">
            {contacts.map((c, i) => (
              <div className="member-card" key={i}>
                <div className="member-card__top">
                  <div className="member-avatar">
                    {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                </div>
                <div className="member-card__body">
                  <p className="member-role">{c.role}</p>
                  <h3 className="member-name">{c.name}</h3>
                </div>
                <a href={c.href} className="member-phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="phone-icon">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 5.51 5.51l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                  </svg>
                  {c.phone.replace(/^(\d{5})(\d+)/, "$1 $2")}
                </a>
              </div>
            ))}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="social-sidebar">
          <ul className="social-list">
            {socials.map((s) => (
              <li key={s.platform}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="social-card">
                  <div className="social-icon-wrap">
                    {s.icon}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <TransitionScribble />
    </div>
  );
}
