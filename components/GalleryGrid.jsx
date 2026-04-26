'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/gallery.css';

gsap.registerPlugin(ScrollTrigger);

// Ported from OnScrollLayoutFormations
const calculateInitialTransform = (element) => {
    const offsetDistance = 250;
    const maxRotation = 300;
    const maxZTranslation = 2000;
    
    // For robust Next.js / React measurement, we should ideally use window bounds at run time
    const viewportCenter = { width: window.innerWidth / 2, height: window.innerHeight / 2 };
    
    // getBoundingClientRect ensures we get proper relative coordinates even if nested
    const rect = element.getBoundingClientRect();
    const elementCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    const angle = Math.atan2(Math.abs(viewportCenter.height - elementCenter.y), Math.abs(viewportCenter.width - elementCenter.x));
    const translateX = Math.abs(Math.cos(angle) * offsetDistance);
    const translateY = Math.abs(Math.sin(angle) * offsetDistance);
    const maxDistance = Math.sqrt(Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2));
    const currentDistance = Math.sqrt(Math.pow(viewportCenter.width - elementCenter.x, 2) + Math.pow(viewportCenter.height - elementCenter.y, 2));
    const distanceFactor = currentDistance / maxDistance;

    const rotationX = ((elementCenter.y < viewportCenter.height ? -1 : 1) * (translateY / offsetDistance) * maxRotation * distanceFactor);
    const rotationY = ((elementCenter.x < viewportCenter.width ? 1 : -1) * (translateX / offsetDistance) * maxRotation * distanceFactor);
    const translateZ = maxZTranslation * distanceFactor;

    return {
        x: elementCenter.x < viewportCenter.width ? -translateX : translateX,
        y: elementCenter.y < viewportCenter.height ? -translateY : translateY,
        z: translateZ,
        rotateX: rotationX,
        rotateY: rotationY
    };
};

export default function GalleryGrid() {
    const sectionRef = useRef(null);

    // Replace these with your actual images or use the placeholders
    const images = Array.from({ length: 42 }, (_, i) => `/assets/gallery-images/${i + 1}.webp`);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const grid = sectionRef.current.querySelector('[data-grid-fourth]');
            const gridImages = grid.querySelectorAll('.grid__img');

            gsap.timeline({
                defaults: {
                    ease: 'expo'
                },
                scrollTrigger: {
                    trigger: grid,
                    start: 'center center',
                    end: '+=200%',
                    pin: grid.parentNode,
                    scrub: 0.2,
                }
            })
            .set(grid, { perspective: 1000 })
            .fromTo(gridImages, {
                x: (_, el) => calculateInitialTransform(el).x,
                y: (_, el) => calculateInitialTransform(el).y,
                z: (_, el) => calculateInitialTransform(el).z,
                rotateX: (_, el) => calculateInitialTransform(el).rotateX * .5,
                rotateY: (_, el) => calculateInitialTransform(el).rotateY,
                autoAlpha: 0,
                scale: 0.7,
            }, {
                x: 0,
                y: 0,
                z: 0,
                rotateX: 0,
                rotateY: 0,
                autoAlpha: 1,
                scale: 1,
                stagger: {
                    amount: 0.2,
                    grid: 'auto',
                    from: 'center'
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="gallery-grid-section">
            <div className="grid grid--spaced grid--small" data-grid-fourth>
                {images.map((src, index) => (
                    <div 
                        key={index} 
                        className="grid__img" 
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}
            </div>
        </section>
    );
}
