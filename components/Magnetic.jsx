'use client';

import { useEffect, useRef, cloneElement } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, intensity = 0.3 }) {
    const magnetic = useRef(null);

    useEffect(() => {
        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * intensity);
            yTo(y * intensity);
        };

        const mouseLeave = () => {
            gsap.to(magnetic.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            xTo(0);
            yTo(0);
        };

        const currentElement = magnetic.current;
        if (currentElement) {
            currentElement.addEventListener("mousemove", mouseMove);
            currentElement.addEventListener("mouseleave", mouseLeave);
            return () => {
                currentElement.removeEventListener("mousemove", mouseMove);
                currentElement.removeEventListener("mouseleave", mouseLeave);
            };
        }
    }, [intensity]);

    return cloneElement(children, { ref: magnetic });
}