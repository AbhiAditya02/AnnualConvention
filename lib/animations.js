/**
 * lib/animations.js — Shared animation utilities for the ISTE HIT SC website.
 * Extracted from Navbar, Footer, and MotionCards to eliminate duplication.
 */

import { gsap } from 'gsap';

// ─── Wiggle Effect ──────────────────────────────────────────────────────────
/**
 * Adds a wiggle-on-hover effect to an element.
 * The target rotates back and forth while the cursor is inside the element.
 *
 * @param {HTMLElement} element   — The element to attach hover listeners to.
 * @param {number}      intensity — Rotation angle in degrees (e.g. 4 → ±4°).
 * @returns {() => void} Cleanup function that removes the event listeners.
 */
export function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });

    let tween;

    const onEnter = () => {
        tween = gsap.to(target, {
            rotation: intensity,
            duration: 0.17,
            repeat: -1,
            yoyo: true,
            ease: 'steps(1)',
        });
    };

    const onLeave = () => {
        if (tween) {
            tween.kill();
            gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' });
        }
    };

    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);

    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

// ─── Inertia Tracking ───────────────────────────────────────────────────────
/**
 * Attaches mouse-driven inertia physics to a set of elements.
 * On mouseleave the element slides/rotates based on cursor velocity,
 * then springs back to its original position.
 *
 * @param {string} selector           — CSS selector for target elements.
 * @param {number} velocityMultiplier — Scales the throw velocity (e.g. 20 for cards, 25 for labels).
 * @param {number} rotationMultiplier — Scales the rotation velocity (e.g. 1.5 for cards, 2 for labels).
 */
export function initInertia(selector, velocityMultiplier = 20, rotationMultiplier = 1.5) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
        let lastX = 0;
        let lastY = 0;
        let speedX = 0;
        let speedY = 0;

        const startRotation = gsap.getProperty(el, 'rotation');
        const startX = gsap.getProperty(el, 'x');
        const startY = gsap.getProperty(el, 'y');

        const onMove = (e) => {
            speedX = e.clientX - lastX;
            speedY = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
        };

        const onEnter = (e) => {
            speedX = 0;
            speedY = 0;
            lastX = e.clientX;
            lastY = e.clientY;
        };

        const onLeave = () => {
            gsap.to(el, {
                inertia: {
                    x: { velocity: speedX * velocityMultiplier, end: startX },
                    y: { velocity: speedY * velocityMultiplier, end: startY },
                    rotation: { velocity: speedX * rotationMultiplier, end: startRotation },
                },
            });
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
    });
}

// ─── Overlay Helpers ────────────────────────────────────────────────────────
/**
 * Creates show/hide helpers for a GSAP-animated overlay element.
 *
 * @param {HTMLElement} overlay — The overlay DOM element.
 * @returns {{ show: () => void, hide: () => void }}
 */
export function createOverlayHelpers(overlay) {
    if (!overlay) return { show: () => {}, hide: () => {} };

    gsap.set(overlay, { opacity: 0, visibility: 'hidden' });

    const show = () => {
        gsap.set(overlay, { visibility: 'visible' });
        gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    };

    const hide = () => {
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => gsap.set(overlay, { visibility: 'hidden' }),
        });
    };

    return { show, hide };
}
