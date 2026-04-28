'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG, NAV_LINKS } from '@/lib/data';
import { initWiggle, createOverlayHelpers } from '@/lib/animations';
import Magnetic from '@/components/Magnetic';
import TextRevealHover from '@/components/TextRevealHover';

/* ─── Inline style constants ─────────────────────────────────────────────── */
const CURSOR_POINTER = "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer";
const NAV_LINK_STYLE = { fontSize: '1.3rem', fontWeight: 600, textDecoration: 'none', color: 'inherit', display: 'inline-block' };

/* ─── Scroll-based navbar color toggle ───────────────────────────────────── */
/**
 * Switches navbar between on-dark / on-light classes based on which
 * section the user has scrolled into.
 */
function initNavbarColorToggle(navbar, footerEl) {
    if (!navbar || !footerEl) return () => { };

    navbar.classList.add('on-dark');
    navbar.classList.remove('on-light');

    const setDark = () => { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); };
    const setLight = () => { navbar.classList.add('on-light'); navbar.classList.remove('on-dark'); };

    const updateColor = () => {
        const scrollPos = window.scrollY + navbar.offsetHeight / 2;

        const sectionTop = (selector) => {
            const el = document.querySelector(selector);
            return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
        };

        const motionCardTop = sectionTop('.motion-cards-wrapper');
        const horizontalWordsTop = sectionTop('.horizontal-words-section');
        const showreelTop = sectionTop('#showreel-section');
        const serviceCardsTop = sectionTop('.service-cards-wrapper');
        const doubleMarqueeTop = sectionTop('.Double-marquee');
        const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

        if (scrollPos >= footerTop) setDark();
        else if (scrollPos >= doubleMarqueeTop) setLight();
        else if (scrollPos >= serviceCardsTop) setLight();
        else if (scrollPos >= motionCardTop) setLight();
        else if (scrollPos >= showreelTop) setDark();
        else if (scrollPos >= horizontalWordsTop) setLight();
        else setDark();
    };

    window.addEventListener('scroll', updateColor);
    updateColor();

    return () => window.removeEventListener('scroll', updateColor);
}

/* ─── Left popout (navigation links) ─────────────────────────────────────── */
function initLeftPopout(navLeft, workBox, workBlob, overlayHelpers) {
    if (!navLeft || !workBox || !workBlob) return () => { };

    const workInner = workBox.querySelector('.nav-popout-inner');
    const workItems = workInner ? Array.from(workInner.children) : [];

    // Measure origin from the blob icon center
    gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
    const boxRect = workBox.getBoundingClientRect();
    const blobRect = workBlob.getBoundingClientRect();
    const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
    const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
    const workOrigin = `${originX}px ${originY}px`;

    gsap.set(workBox, { visibility: 'hidden', scale: 0, opacity: 0, transformOrigin: workOrigin });
    gsap.set(workItems, { y: 10, opacity: 0 });
    gsap.set(workBlob, { transformOrigin: 'center center' });

    const onEnter = () => {
        gsap.killTweensOf(workBox);
        gsap.killTweensOf(workItems);
        gsap.killTweensOf(workBlob);
        overlayHelpers.show();
        gsap.to(workBlob, { rotation: '+=360', duration: 0.5, ease: 'power3.inOut' });
        gsap.set(workBox, { visibility: 'visible' });
        gsap.fromTo(workBox, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' });
        gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
    };

    const onLeave = () => {
        gsap.killTweensOf(workBox);
        gsap.killTweensOf(workItems);
        gsap.killTweensOf(workBlob);
        overlayHelpers.hide();
        gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });
        gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
        gsap.to(workBox, { scale: 0, opacity: 0, duration: 0.3, ease: 'expo.in', delay: 0.05, onComplete: () => gsap.set(workBox, { visibility: 'hidden' }) });
    };

    navLeft.addEventListener('mouseenter', onEnter);
    navLeft.addEventListener('mouseleave', onLeave);

    return () => {
        navLeft.removeEventListener('mouseenter', onEnter);
        navLeft.removeEventListener('mouseleave', onLeave);
    };
}

/* ─── Right popout (register CTA) ────────────────────────────────────────── */
function initRightPopout(navRight, registerBox, registerIcon, overlayHelpers) {
    if (!navRight || !registerBox) return () => { };

    const registerInner = registerBox.querySelector('.nav-popout-inner-right');
    const registerItems = registerInner ? Array.from(registerInner.children) : [];

    // Measure origin from the icon center, mirroring how left uses workBlob
    gsap.set(registerBox, { visibility: 'visible', scale: 1, opacity: 1 });
    const boxRect = registerBox.getBoundingClientRect();
    const iconRect = registerIcon ? registerIcon.getBoundingClientRect() : boxRect;
    const originX = (iconRect.left + iconRect.width / 2) - boxRect.left;
    const originY = (iconRect.top + iconRect.height / 2) - boxRect.top;
    const registerOrigin = `${originX}px ${originY}px`;

    gsap.set(registerBox, { visibility: 'hidden', scale: 0, opacity: 0, transformOrigin: registerOrigin });
    gsap.set(registerItems, { y: 10, opacity: 0 });
    if (registerIcon) gsap.set(registerIcon, { transformOrigin: 'center center' });

    const onEnter = () => {
        gsap.killTweensOf(registerBox);
        gsap.killTweensOf(registerItems);
        if (registerIcon) gsap.killTweensOf(registerIcon);
        overlayHelpers.show();
        gsap.set(registerBox, { visibility: 'visible' });
        gsap.fromTo(registerBox, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' });
        gsap.to(registerItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
    };

    const onLeave = () => {
        // No hover guard — mirrors left popout's unconditional close
        gsap.killTweensOf(registerBox);
        gsap.killTweensOf(registerItems);
        if (registerIcon) gsap.killTweensOf(registerIcon);
        overlayHelpers.hide();
        if (registerIcon) gsap.to(registerIcon, { rotation: 0, duration: 0.5, ease: 'power2.out' });
        gsap.to(registerItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
        gsap.to(registerBox, { scale: 0, opacity: 0, duration: 0.3, ease: 'expo.in', delay: 0.05, onComplete: () => gsap.set(registerBox, { visibility: 'hidden' }) });
    };

    // Only navRight drives open/close — no registerBox listeners (matches left pattern)
    navRight.addEventListener('mouseenter', onEnter);
    navRight.addEventListener('mouseleave', onLeave);

    return () => {
        navRight.removeEventListener('mouseenter', onEnter);
        navRight.removeEventListener('mouseleave', onLeave);
    };
}

/* ─── Navbar Component ───────────────────────────────────────────────────── */
export default function Navbar() {
    useEffect(() => {
        const cleanups = [];

        // Scroll-based color toggle
        const navbar = document.querySelector('.navbar');
        const footerEl = document.querySelector('.main-footer');
        cleanups.push(initNavbarColorToggle(navbar, footerEl));

        // Wiggle on logo
        const logoClickable = document.querySelector('.logo-container');
        if (logoClickable) cleanups.push(initWiggle(logoClickable, WIGGLE_CONFIG.logoClickable));

        // Overlay (shared by both popouts)
        const overlay = document.querySelector('.nav-overlay');
        const overlayHelpers = createOverlayHelpers(overlay);

        // Left popout — navigation links
        cleanups.push(initLeftPopout(
            document.querySelector('.nav-left'),
            document.querySelector('.nav-work-box'),
            document.querySelector('.nav-bar_Iste-logo'),
            overlayHelpers,
        ));

        // Right popout — register CTA
        cleanups.push(initRightPopout(
            document.querySelector('.nav-right'),
            document.querySelector('.nav-wa-box'),
            document.querySelector('.nav-bar_register'),
            overlayHelpers,
        ));

        return () => cleanups.forEach(fn => fn && fn());
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <Magnetic intensity={0.2}>
                    <div className="nav-left" style={{ cursor: CURSOR_POINTER }}>
                        <div className="nav-hover-trigger">
                            <div className="logo-container">
                                <img src="/assets/Iste.png" width="60" height="60" className="nav-bar_Iste-logo" alt="" aria-hidden="true" />
                            </div>

                            {/* Pop-out Box — Navigation Links */}
                            <div className="nav-popout nav-work-box">
                                <div className="nav-popout-inner">
                                    {NAV_LINKS.map(({ href, label }) => (
                                        <div key={href} className="nav-work-item">
                                            <a href={href} style={NAV_LINK_STYLE}>
                                                <TextRevealHover>{label}</TextRevealHover>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Magnetic>
                <div className="nav-center" style={{ cursor: CURSOR_POINTER }}>
                    <svg className="logo" width="400" height="auto" viewBox="0 0 3797 391" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3313_31)">
                            <path d="M2021.98 1.37249C2079.93 -0.957247 2129.86 8.89783 2128.07 34.561C2126.83 52.3701 2120.47 71.3545 2116.55 89.2208C2105.6 129.965 2124.98 170.993 2125.79 211.473C2126.72 258.338 2111.66 303.368 2127.85 350.441C2137.67 378.98 2066.63 391.226 2005.52 387.386C1910.26 381.402 1917.91 350.437 1932.65 320.231C1941.64 299.663 2011.4 219.363 1922.39 212.964C1839.6 207.014 1826.39 263.103 1828.83 285.478C1826.81 296.362 1831.48 307.217 1831.82 317.96C1832.6 342.645 1869.79 365.339 1811.86 382.015C1747.02 396.178 1658.38 385.742 1648.37 353.299C1632.64 302.318 1679.47 252.739 1699.47 203.076C1712.94 169.651 1709.75 136.285 1697.26 102.94C1692.22 77.4364 1660.34 38.6782 1698.11 15.6454C1725.05 -0.787055 1806.55 -2.58417 1842.83 8.7788C1874.27 19.3217 1866.56 37.4552 1862.01 51.6302C1855.75 71.1252 1820.86 145.265 1890.52 150.611C1999.46 158.974 1966 99.1331 1953.9 74.775C1938.96 44.7204 1918.82 6.44376 2021.98 1.37249Z" fill="currentColor" />
                            <path d="M406.672 0.539168C582.277 -5.19963 642.581 46.185 654.689 107.472C658.607 127.304 628.6 142.052 578.675 141.431C491.903 140.351 505.034 100.527 479.724 77.5174C468.743 67.5362 425.271 67.6914 408.305 75.4152C380.345 90.6987 411.062 115.507 436.224 128.531C498.574 160.497 579.665 182.839 635.106 217.15C672.747 240.004 693.216 266.791 694.032 294.262C695.877 355.119 601.342 390.7 453.052 391C393.486 390.817 332.67 384.5 288.353 367.409C244.358 350.443 224.434 323.974 223.295 299.847C222.542 283.858 229.036 263.627 257.896 251.723C278.412 243.262 305.612 241.221 333.938 241.233C454.802 241.285 377.827 295.927 428.835 315.245C440.352 319.608 460.387 321.396 475.884 320.955C488.728 320.59 506.72 316.242 514.707 312.135C526.652 305.99 529.709 295.568 528.969 288.018C522.172 218.756 251.004 189.679 232.733 98.5354C227.586 72.8633 237.808 43.3139 280.514 23.1964C312.328 8.20824 359.399 2.0206 406.672 0.539168Z" fill="currentColor" />
                            <path d="M3091.69 0.547116C3103.61 0.101804 3115.59 -0.0719089 3127.54 0.0268536C3274.2 0.868981 3329.27 41.6949 3324.36 95.2621C3323.29 120.712 3298.77 140.326 3228.14 138.581C3126.94 136.081 3202.36 71.5538 3119.75 68.7346C3083.55 68.6675 3065.64 82.2343 3068.1 94.8062C3078.57 148.238 3206.26 179.984 3269.11 224.081C3302.6 247.559 3320.29 274.19 3320.41 301.306C3320.94 348.99 3251.4 386.219 3128.63 389.67C3115.52 390.037 3102.71 389.982 3089.62 389.95C2962.06 388.827 2885.7 350.965 2877.15 302.041C2874.51 285.39 2879.63 266.952 2906.84 253.717C2932.86 241.791 2989.04 237.982 3021.29 248.867C3072.71 266.219 3018.01 320.628 3113.35 320.221C3151.44 319.882 3166.77 305.984 3163.77 292.456C3152.53 242.063 3026.89 211.34 2963.54 171.82C2931.21 151.709 2911.6 128.684 2906.43 104.778C2894.58 52.7652 2950.23 5.49758 3091.69 0.547116Z" fill="currentColor" />
                            <path d="M3564.47 0.574457C3737.99 -4.87246 3798.81 53.7678 3790.24 113.933C3786.57 139.685 3746.46 151.899 3685.33 150.076C3588.46 147.186 3659.98 75.3076 3591.41 74.386C3577.96 74.1993 3564.9 76.246 3555.25 80.0518C3511.48 97.1341 3507.93 155.488 3506.74 179.99C3505.38 208.131 3505.62 291.515 3552.64 310.789C3561.68 314.495 3572.75 316.849 3585.84 316.833C3599.15 316.815 3611.32 314.838 3620.62 310.926C3646.6 300.028 3635.46 281.03 3635.48 267.502C3635.48 259.142 3641.29 250.244 3656.62 244.304C3672.97 237.96 3695.85 236.755 3717.49 236.833C3767.77 238.891 3792.24 251.032 3796 271.277C3805.5 322.382 3747.65 385.214 3602.41 389.722C3549.92 391.349 3495.81 385.903 3455.56 371.722C3367.9 339.446 3351.95 284.255 3342.5 239.165C3335.69 184.127 3348.34 110.873 3387.57 57.6751C3395.38 47.096 3416.47 31.9024 3434.04 24.0385C3469.32 8.24707 3513.19 1.79841 3564.47 0.574457Z" fill="currentColor" />
                            <path d="M1247.16 2.24547C1247.47 2.22342 1247.78 2.20136 1248.08 2.17931C1312 2.65373 1383.83 -0.323243 1446.73 3.38917C1494.18 6.18978 1506.05 29.5445 1506.42 44.7476C1507.51 89.5725 1425.28 75.5747 1351.19 77.08C1289.66 78.3304 1277.26 102.873 1280.82 123.371C1294.01 179.97 1494.51 116.454 1497.97 177.139C1500.78 202.103 1497.29 219.627 1422.74 218.69C1389.05 218.267 1314.11 213.593 1291.48 226.292C1265.29 240.981 1262.71 263.232 1265.96 280.728C1272.32 314.88 1326.22 313.703 1393.21 310.609C1444.35 306.875 1496.88 304.508 1508.19 331.235C1520.03 358.45 1494.84 382.507 1420.77 385.699C1294.5 391.143 1127.33 392.51 1103.42 326.747C1085.21 277.136 1135.56 229.727 1146.53 181.03C1153.45 147.84 1136.76 114.997 1134.68 81.8075C1132.4 45.3482 1139.13 8.47632 1247.16 2.24547Z" fill="currentColor" />
                            <path d="M2414.37 2.08507C2476.17 0.988106 2545.4 2.37429 2608.15 1.85138C2650.04 1.50219 2700.25 1.49956 2741.98 2.72792C2755.93 3.2905 2769.48 5.40859 2780.12 9.31325C2816.68 22.7326 2825.59 63.7092 2796.5 79.1841C2781.83 86.9785 2735.05 83.8154 2713.7 83.9186C2703.3 83.9688 2689.37 84.3878 2681.02 88.191C2658.95 100.137 2670.47 131.211 2674.42 144.549C2683.75 176.206 2691.51 206.99 2679.61 238.534C2671.8 259.158 2661.31 277.13 2656.66 297.92C2651.66 320.281 2664.73 340.331 2665.16 360.865C2659.73 371.78 2644.19 382.456 2615.19 385.113C2395.13 405.261 2471.1 309.297 2497.9 261.079C2507.64 243.871 2516.19 226.552 2523.52 209.145C2527.61 198.971 2530.14 188.699 2531.04 178.395C2532.99 156.524 2528.14 117.402 2516.8 95.5779C2505.59 74.0034 2396.75 98.0063 2382.18 73.0009C2375.99 62.4201 2371.7 51.5553 2371.18 40.5521C2371.27 22.4178 2365.19 8.75418 2414.37 2.08507Z" fill="currentColor" />
                            <path d="M684.746 2.15646C804.944 -0.00925463 932.094 2.84782 1052.88 2.21114C1117.37 1.87077 1111.41 31.0144 1108.37 49.5766C1099.14 105.913 945.213 40.1456 971.074 110.416C975.861 123.91 978.841 138.158 984.531 151.55C1010.66 213.028 934.103 270.947 957.416 332.064C960.513 340.182 963.289 350.282 963.68 358.434C966.103 397.861 789.798 396.926 772.508 361.568C747.55 309.855 806.336 256.427 823.202 205.309C836.71 174.842 828.014 137.68 823.169 108.332C814.944 58.4978 769.178 82.2378 688.736 74.7328C655.461 71.6278 639.49 22.5403 657.046 11.0786C666.726 4.7578 665.88 4.95003 684.746 2.15646Z" fill="currentColor" />
                            <path d="M2230.01 2.07529C2357.74 -0.3876 2342.16 28.1962 2335.64 67.9075C2333.9 78.8428 2333.43 89.8045 2334.19 100.758C2336.32 134.802 2355.48 167.935 2355.68 202.566C2355.83 235.245 2345.75 265.453 2341.81 297.894C2339.48 317.127 2349.01 336.965 2353.69 356.05C2359.38 377.966 2315.2 386.761 2268 387.715C2228.44 387.519 2176.6 380.677 2168.89 362.391C2143.05 301.171 2208.87 242.15 2203.42 179.913C2201.92 163.786 2198.83 147.691 2194.13 131.666C2186.53 107.218 2149.37 36.3062 2175.01 17.0784C2186.83 8.21709 2207.3 4.78508 2230.01 2.07529Z" fill="currentColor" />
                            <path d="M85.9965 2.0912C92.3799 1.89633 98.7722 1.75525 105.171 1.6706C156.766 1.13887 194.38 9.34848 196.629 31.4678C198.947 54.2369 183.557 78.0678 185.984 101.204C189.087 124.21 196.154 147.852 203.332 170.716C217.223 215.554 188.314 257.997 185.176 302.388C182.566 339.332 245.303 387.04 101.537 387.777C27.8978 386.598 -1.34197 369.693 0.0470871 340.662C2.20687 295.556 49.4543 252.588 61.0522 208.008C72.7677 162.981 48.1981 117.101 26.2126 73.1913C17.6824 56.0313 5.36815 34.1194 27.5167 17.999C40.0966 8.84498 62.0275 4.62111 85.9965 2.0912Z" fill="currentColor" />
                        </g>
                        <defs>
                            <clipPath id="clip0_3313_31">
                                <rect width="3797" height="391" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <Magnetic intensity={0.2}>
                    <div className="nav-right" style={{ cursor: CURSOR_POINTER }}>
                        <div className="nav-hover-trigger">
                            <div className="logo-register-container" style={{ position: 'relative', zIndex: 105, display: 'flex', alignItems: 'center' }}>
                                <span className="nav-bar_register"><TextRevealHover>Register</TextRevealHover></span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="stroke-svg">
                                    <path d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"></path>
                                    <path d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                                </svg>
                            </div>

                            {/* Pop-out Box — Register CTA */}
                            <div className="nav-popout-right nav-wa-box">
                                <div className="nav-popout-inner-right" style={{ padding: '40px' }}>
                                    <h4 className="nav-wa-title">Join Now</h4>
                                    <p className="nav-wa-desc">Secure your spot for the Annual Convention.</p>
                                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdhoVhFIEbH41zrbEwhtgaKSBswWQNVhfMg9wo_YLKX0SS5QA/alreadyresponded" className="nav-work-btn">
                                        <span className="nav-work-btn__text"><TextRevealHover>Register Here</TextRevealHover></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Magnetic>
            </nav>
        </>
    );
}