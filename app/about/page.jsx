'use client';

import "../styles/about.css";

import Navbar from "@/components/Navbar";
import SvgSymbols from "@/components/SvgSymbols";
import SmoothScroll from "@/components/SmoothScroll";
import CursorBubble from "@/components/CursorBubble";
import TransitionScribble from "@/components/TransitionScribble";
import { useEffect, useRef } from "react";

const stats = [
  { num: "2+", label: "Conventions" },
  { num: "1941", label: "Parent Body" },
  { num: "∞", label: "Impact" },
];

const conv2025 = [
  "Distinguished academicians from prestigious technical institutions.",
  "Guest Speakers: MN Dastur, IIFON, Trisita Engineering, EEGRAB, Google, SecureT360, Dataspace, IEM Labs.",
  "Expert Sessions: Artificial Intelligence, Cybersecurity, Data Science & networking opportunities.",
];

const conv2024 = [
  "Professionals from Google, TCS, Black Hills Information Security, and Dastur InfoScience.",
  "Student innovation showcase — Drone Medicine Model demonstration.",
  "Official launch of the ISTE HIT Students' Chapter Website.",
];

const vision = [
  {num: "01",title: "Technical Community",body: "Establish a strong and inclusive technical ecosystem that equips students with practical knowledge, problem-solving skills, and continuous learning opportunities."},
  {num: "02",title: "Academia–Industry Integration",body: "Bridge the gap between academic learning and industry expectations through hands-on projects, expert interactions, and real-world exposure."},
  {num: "03",title: "Leadership & Collaboration",body: "Develop leadership capabilities and promote teamwork by encouraging active participation, peer learning, and cross-disciplinary collaboration."},
  {num: "04",title: "Ethical Innovation",body: "Promote responsible and sustainable technological development, ensuring ethical practices and long-term societal impact."}
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = 0;
    el.style.transform = "translateY(22px)";
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}

export default function AboutPage() {
  return (
    <div className="root">
      <SvgSymbols />
      <SmoothScroll />
      <CursorBubble />

      {/* HERO */}
      <header className="hero">
        <Navbar />
        <div className="hero-glow" />
        <p className="hero-eyebrow">ISTE HIT Students' Chapter · Est. 2023</p>
        <h1 className="hero-h1">
          About <em>Our</em> Chapter
        </h1>
        <p className="hero-desc">
          Building a dynamic technical community — empowering students...
        </p>

        <div className="hero-rule" />
      </header>

      {/* ABOUT */}
      <FadeIn>
        <section className="about">
          <div className="about-side">
            <span className="side-label">OVERVIEW</span>
          </div>

          <div className="about-content">
            <span className="body-label">Who We Are</span>
            <p className="body-text">
              Established in 1941, the Indian Society for Technical Education (ISTE)
              aims to advance technical education in India. <br /> In 2023, the ISTE HIT
              Students’ Chapter was founded, offering workshops led by Prof. Priyatosh
              Jana sir.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* JOURNEY */}
      <FadeIn delay={60}>
        <section className="journey">
          <h2 className="journey-heading">Our Journey</h2>

          <div className="conv-grid">
            <div className="conv-dark">
              <p className="year amber">2025</p>
              <ul className="conv-list">
                {conv2025.map((item) => (
                  <li key={item}><span className="symbol1">✦</span>{item}</li>
                ))}
              </ul>
            </div>

            <div className="conv-light">
              <p className="year faded">2024</p>
              <ul className="conv-list">
                {conv2024.map((item) => (
                  <li key={item}><span className="symbol2">✦</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* VISION */}
      <FadeIn delay={80}>
        <section className="vision">
          <h2 className="vision-heading">
            Vision & <em>Mission</em>
          </h2>

          <div className="vision-grid">
            {vision.map((v) => (
              <div key={v.num} className="vision-item">
                <span className="vision-item-heading"><strong>{v.title}:</strong></span>
                <p>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <TransitionScribble />
    </div>
  );
}