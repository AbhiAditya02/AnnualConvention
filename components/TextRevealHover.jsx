'use client';

import { useRef } from 'react';
import gsap from 'gsap';

export default function TextRevealHover({ children, style = {} }) {
    const container = useRef(null);

    const handleMouseEnter = () => {
        if (!container.current) return;
        const letters1 = container.current.querySelectorAll('.letter1');
        const letters2 = container.current.querySelectorAll('.letter2');
        gsap.killTweensOf([letters1, letters2]);
        
        gsap.to(letters1, { y: '-100%', duration: 0.4, stagger: 0.02, ease: 'power3.out' });
        gsap.to(letters2, { y: '0%', duration: 0.4, stagger: 0.02, ease: 'power3.out' });
    };

    const handleMouseLeave = () => {
        if (!container.current) return;
        const letters1 = container.current.querySelectorAll('.letter1');
        const letters2 = container.current.querySelectorAll('.letter2');
        gsap.killTweensOf([letters1, letters2]);
        
        gsap.to(letters1, { y: '0%', duration: 0.4, stagger: 0.02, ease: 'power3.out' });
        gsap.to(letters2, { y: '100%', duration: 0.4, stagger: 0.02, ease: 'power3.out' });
    };

    if (typeof children !== 'string') {
        return <span style={style}>{children}</span>;
    }

    return (
        <span 
            ref={container}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ ...style, position: 'relative', display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
            <span style={{ display: 'inline-flex' }}>
                {children.split('').map((char, i) => (
                    <span key={`1-${i}`} className="letter1" style={{ display: 'inline-block' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 0, display: 'inline-flex' }}>
                {children.split('').map((char, i) => (
                    <span key={`2-${i}`} className="letter2" style={{ display: 'inline-block', transform: 'translateY(100%)' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
        </span>
    );
}