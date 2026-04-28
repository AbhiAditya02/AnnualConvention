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

const conv2025 = {
  content: [
    "Distinguished academicians from prestigious technical institutions.",
    "Guest Speakers: MN Dastur, IIFON, Trisita Engineering, EEGRAB, Google, SecureT360, Dataspace, IEM Labs.",
    "Expert Sessions: Artificial Intelligence, Cybersecurity, Data Science & networking opportunities.",
  ],
  color: "#4471f8",
};

const conv2024 = {
  content: [
    "Professionals from Google, TCS, Black Hills Information Security, and Dastur InfoScience.",
    "Student innovation showcase — Drone Medicine Model demonstration.",
    "Official launch of the ISTE HIT Students' Chapter Website.",
  ],
  color: "orange",
};

const vision = [
  { num: "01", title: "Technical Community", body: "Establish a strong and inclusive technical ecosystem that equips students with practical knowledge, problem-solving skills, and continuous learning opportunities." },
  { num: "02", title: "Leadership & Collaboration", body: "Develop leadership capabilities and promote teamwork by encouraging active participation, peer learning, and cross-disciplinary collaboration." },
  { num: "03", title: "Ethical Innovation", body: "Promote responsible and sustainable technological development, ensuring ethical practices and long-term societal impact." }
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
        {/* <p className="hero-eyebrow">ISTE HIT Students' Chapter · Est. 2023</p> */}
        <h1 className="hero-h1">
          About <em>US</em>
        </h1>
        <p className="hero-desc">
          Building a dynamic technical community
          <br />empowering students with knowledge, skills, and industry exposure.
        </p>

        <div className="hero-rule" />
      </header>

      {/* ABOUT */}
      <FadeIn>
        <section className="about">
          <div className="about-side">
            <span className="side-label">Who are we</span>
          </div>

          <div className="about-illustration">
            {/* <video src="https://storyset.com/illustration/innovation/amico/animate?share=98818" className="illustration"></video> */}
            <img src="../assets/About SVG/Innovation.gif" alt="About Illustration" className="illustration" />
          </div>

          <div className="about-content">
            <span className="body-label">About ISTE HIT SC</span>
            <p className="body-text">
              The ISTE HIT Students' Chapter was founded in 2023 under the parent body
              established in 1941 to advance technical education in India. Workshops are led by
              Prof. Priyatosh Jana sir. Within one year, the chapter has successfully educated
              students in both technical and non-technical aspects - from hackathons and
              expert sessions to cultural showcases and innovation expos.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* JOURNEY */}
      <FadeIn delay={60}>
        <section className="journey">
          <h2 className="journey-heading">Our Journey</h2>

          <div className="conv-grid">
            <div className="conv-card" style={{ borderTop: `5px solid ${conv2025.color}`, backgroundColor: 'white' }}>
              <span className="conv-year-badge" style={{ color: conv2025.color }}>2025</span>
              <h3 className="conv-title">Annual Convention 3.0</h3>
              <ul className="conv-list" style={{ '--bullet-color': conv2025.color }}>
                {conv2025.content.map((item) => (
                  <li key={item} className="conv-list-items">{item}</li>
                ))}
              </ul>
            </div>

            <div className="conv-card" style={{ borderTop: `6px solid ${conv2024.color}`, backgroundColor: 'white' }}>
              <span className="conv-year-badge" style={{ color: conv2024.color }}>2024</span>
              <h3 className="conv-title">Annual Convention 2.0</h3>
              <ul className="conv-list" style={{ '--bullet-color': conv2024.color }}>
                {conv2024.content.map((item) => (
                  <li key={item} className="conv-list-items">{item}</li>
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
                <span className="vision-item-heading"><strong>{v.num}</strong></span>
                <p className="vision-item-body">
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