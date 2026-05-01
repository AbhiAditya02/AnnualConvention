'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const HEADING_TEXT = 'Building a dynamic technical community';

export default function HorizontalWords() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const textRef = container.querySelector('.horizontal-words__relative');

            // Select the individual stickers instead of just the wrapper
            // or we select the images directly if they are the elements we want to animate.
            // The original logic animated .horizontal-words__sticker-svg, but since you have multiple images:
            const stickers = container.querySelectorAll('.horizontal-words__sticker-watch, .horizontal-words__sticker-cursor, .horizontal-words__sticker-phone');

            // Note: To animate SVG paths with strokeDashoffset, the SVG must be inlined in the HTML,
            // not loaded via <img> tags. The current setup uses <img> tags, so direct path animation
            // as written below will not work unless the SVGs are converted to inline <svg> elements.
            // For the purpose of this exercise, we'll assume the intent is for inline SVGs or
            // that the querySelectorAll will find nothing and the animation will gracefully skip.
            const arrows = container.querySelectorAll('.horizontal-words__arrow-svg path, .horizontal-words__arrow-end-svg path');

            // --- ENTRANCE & PINNING LOGIC ---
            // To make letters start animating as we scroll down from VimeoHero,
            // we start the horizontal movement as soon as the section enters the viewport (top bottom).
            const entranceDistance = window.innerHeight;
            const getScrollDistance = () => {
                const totalWidth = textRef.scrollWidth;
                const viewportWidth = window.innerWidth;
                return totalWidth - viewportWidth;
            };

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: () => `+=${entranceDistance + getScrollDistance()}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            scrollTween
                .fromTo(textRef, {
                    x: window.innerWidth // Start words off-screen right
                }, {
                    x: 0,
                    ease: "none",
                    duration: 5
                })
                .to(textRef, {
                    x: () => -(textRef.scrollWidth - window.innerWidth),
                    ease: "none",
                    duration: 10
                });

            // Separate pinning logic so it only locks when the section hits the top
            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: () => `+=${getScrollDistance()}`,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true
            });
            // ------------------------------------

            // Bounce stickers into view as they scroll in
            stickers.forEach((sticker) => {
                gsap.from(sticker, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * 400,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: sticker,
                        containerAnimation: scrollTween,
                        start: 'left 100%',
                        end: 'left 80%',
                        scrub: 0.5
                    }
                });
            });

            // Animate Drawing SVG Arrows 
            arrows.forEach((arrowPath) => {
                if (arrowPath.getTotalLength) {
                    const pathLen = arrowPath.getTotalLength();
                    gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                    gsap.to(arrowPath, {
                        strokeDashoffset: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: arrowPath.parentElement,
                            containerAnimation: scrollTween,
                            start: 'left 100%',
                            end: 'left 80%', // This is the last arrow's end point
                            scrub: 0.5
                        }
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section">
            <div className="horizontal-words__relative">
                <div className="horizontal-words__sticker-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg"><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>
                    <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-thumps-up.svg" className="horizontal-words__sticker-watch" alt="thumbs up sticker" />
                    <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-cursor.svg" className="horizontal-words__sticker-cursor" alt="cursor sticker" />
                    <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-phone.svg" className="horizontal-words__sticker-phone" alt="phone sticker" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 127" fill="none" className="horizontal-words__arrow-end-svg"><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>

                    <h2 className="display horizontal-words__h2" aria-label={HEADING_TEXT}>
                        {HEADING_TEXT.split('').map((char, i) =>
                            char === ' ' ? ' ' : (
                                <div key={i} className="letter" aria-hidden="true" style={{ position: 'relative', display: 'inline-block' }}>{char}</div>
                            )
                        )}
                    </h2>
                </div>
            </div>

            <div className="horizontal-words__bottom-text">
                <div className="horizontal-words__bottom-text-l">
                    Empowering students with knowledge, skills and industry exposure<br />
                    Bridging the gap between academia and industry through hands-on<br />
                    learning, research, and innovation-driven events.
                </div>
            </div>
        </section>
    );
};
