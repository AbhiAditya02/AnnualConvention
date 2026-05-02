"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initInertia } from "@/lib/animations";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

export default function MotionCards() {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const labelsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Inertia physics on cards and floating labels
            initInertia('.motion-card__card', 20, 1.5);
            initInertia('.motion-card__floating-label', 25, 2);

            // Entry Animations: Sticker Pop & Underline Draw
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            const topStickerImg = sectionRef.current.querySelector(".motion-card__sticker--top img");
            if (topStickerImg) {
                gsap.set(topStickerImg, { scale: 0, opacity: 0, rotation: -30 });
                tl.to(topStickerImg, { scale: 1, opacity: 1, rotation: 0, duration: 1.7, ease: "elastic.out(1, 0.4)" }, 0);
            }

            const underlinePath = sectionRef.current.querySelector(".motion-card__underline-path");
            if (underlinePath) {
                const pathLen = underlinePath.getTotalLength();
                gsap.set(underlinePath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                tl.to(underlinePath, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 0.2);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="motion-card-section" id="motion-card-section">
            {/* ─── Part 1: Bold Heading Text with SVG Sticker Placeholders ─── */}
            <div className="motion-card__heading">
                <h2 className="motion-card__title">
                    Celebrating Innovation, <br /> <span className="motion-card__title-part">Collaboration &amp; Growth</span>
                </h2>
                <p className="motion-card__subtitle">
                    Event Highlights !! 
                    {/* SVG sticker placeholder — top-right area */}
                    <span className="motion-card__sticker motion-card__sticker--top">
                        <img
                            src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
                            alt="Green heart hands sticker"
                            className="motion-card__sticker-img"
                        />
                    </span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="motion-card__underline-svg">
                    <path className="motion-card__underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* ─── Part 2: Cards with Colorful Bars & Blue Blob ─── */}
            <div className="motion-card__cards-area">
                {/* Blue SVG blob behind everything */}
                <div className="motion-card__blob">
                    <img
                        src="/assets/MotionCard SVG/motion-card-blob.svg"
                        alt=""
                        className="motion-card__blob-svg"
                    />
                </div>


                {/* 4 Photo Cards */}
                <div ref={cardsRef} className="motion-card__cards">
                    <div className="motion-card__card motion-card__card--1">
                        <div className="motion-card__card-image">
                            <img
                                src="/assets/MotionCard SVG/ideathon_web.webp"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Ideathon 2k25"
                                className="cover-image"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    <div className="motion-card__card motion-card__card--2">
                        <div className="motion-card__card-image">
                            <img
                                src="/assets/MotionCard SVG/convention1_web.webp"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Students in auditorium"
                                className="cover-image"
                                style={{ objectFit: 'cover' ,scale: '1.7'}}
                            />
                        </div>
                    </div>

                    <div className="motion-card__card motion-card__card--3">
                        <div className="motion-card__card-image">
                            <img
                                src="/assets/MotionCard SVG/convention2_web.webp"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Inauguration"
                                className="cover-image"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    <div className="motion-card__card motion-card__card--4">
                        <div className="motion-card__card-image">
                            <img
                                src="/assets/MotionCard SVG/convention3_web.webp"
                                loading="lazy"
                                width={1000}
                                height= 'auto'
                                alt="Chief Guest"
                                className="cover-image"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Floating labels — positioned freely over the cards area */}
                <div ref={labelsRef} className="motion-card__floating-labels">
                    <div className="motion-card__floating-label motion-card__floating-label--pink">
                        <p className="motion-card__floating-text"></p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--orange">
                        <p className="motion-card__floating-text"></p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--red">
                        <p className="motion-card__floating-text"></p>
                    </div>
                </div>
            </div>

            {/* ─── Part 3: Bottom Paragraph Text ─── */}
            <div className="motion-card__footer-text">
                <Magnetic intensity={0.3}>
                    <a href="/gallery" className="motion-card__btn">
                        <span className="nav-work-btn__text"> View Full Gallery → </span>
                    </a>
                </Magnetic>
            </div>
        </section>
    );
}
