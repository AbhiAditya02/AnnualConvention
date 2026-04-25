'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

export default function Navbar() {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        // ② Start white (on-dark) — video is dark background
        if (navbar) { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp
        const cleanups = [];
        const logoTruus = document.querySelector('.logo-truus');
        if (logoTruus) cleanups.push(initWiggle(logoTruus, WIGGLE_CONFIG.logoTruus));

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            // Temporarily show to measure both the box AND the blob icon center
            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            // Icon center relative to the box's own top-left
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            // Start collapsed, scaling FROM the icon center
            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();

                // Fast 360 blob spin — like it's spinning then releasing the box
                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(workBox, { visibility: 'visible' });
                // Box grows out smoothly from the icon center
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();

                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                // Items fade quickly
                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into icon smoothly
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
            });
        }

        // ─── Navbar Right (WhatsApp) Hover ───
        const navRight = document.querySelector('.nav-right');
        const waBox = document.querySelector('.nav-wa-box');
        const waSvgPath = document.querySelector('.nav-bar__whatsapp-svg path');

        if (navRight && waBox) {
            const waInner = waBox.querySelector('.nav-popout-inner');
            const waItems = waInner ? Array.from(waInner.children) : [];
            const waIcon = document.querySelector('.nav-bar__whatsapp-svg');

            // Temporarily show to measure both the box AND the WA icon center
            gsap.set(waBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const waBoxRect = waBox.getBoundingClientRect();
            const waIconRect = waIcon ? waIcon.getBoundingClientRect() : waBoxRect;
            // Icon center relative to the box's own top-left
            const waOriginX = (waIconRect.left + waIconRect.width / 2) - waBoxRect.left;
            const waOriginY = (waIconRect.top + waIconRect.height / 2) - waBoxRect.top;
            const waOrigin = `${waOriginX}px ${waOriginY}px`;

            // Start collapsed, scaling FROM the WA icon center
            gsap.set(waBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: waOrigin
            });
            gsap.set(waItems, { y: 10, opacity: 0 });

            const onEnterRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                showOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: '#0e6634ff', duration: 0.3 }); // Darker WA green

                gsap.set(waBox, { visibility: 'visible' });
                // Box grows out smoothly from the WA icon center
                gsap.fromTo(waBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(waItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                hideOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: 'currentColor', duration: 0.3 });

                // Items fade quickly
                gsap.to(waItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into WA icon smoothly
                gsap.to(waBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(waBox, { visibility: 'hidden' })
                });
            };

            navRight.addEventListener('mouseenter', onEnterRight);
            navRight.addEventListener('mouseleave', onLeaveRight);
            cleanups.push(() => {
                navRight.removeEventListener('mouseenter', onEnterRight);
                navRight.removeEventListener('mouseleave', onLeaveRight);
            });
        }

        // ─── Work Item: badge wiggle + image tilt on hover ───
        const workItems = document.querySelectorAll('.nav-work-item');
        workItems.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;

            const onItemEnter = () => {
                // Wiggle badge intensity 2
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                // Tilt image slightly right
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) { wiggleTween.kill(); }
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
            });
        });

        // ─── All Our Work btn: wiggle intensity 4 (bubble handled by CursorBubble) ───
        const workBtn = document.querySelector('.nav-work-btn');
        if (workBtn) {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnWiggle) { btnWiggle.kill(); }
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            workBtn.addEventListener('mouseenter', onBtnEnter);
            workBtn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                workBtn.removeEventListener('mouseenter', onBtnEnter);
                workBtn.removeEventListener('mouseleave', onBtnLeave);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <div className="nav-left" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container">
                            <img src="/assets/Navbar SVG/nav-work-blob.svg" width="60" height="55" className="nav-bar__work-blob-svg" alt="" aria-hidden="true" />
                            <span className="logo-work-text">work</span>
                        </div>

                        {/* Pop-out Box for Left Side */}
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                <div className="nav-work-item" style={{ padding: '4px 0', marginTop: '10px' }}>
                                    <a href="/" style={{ fontSize: '1.4rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Home</a>
                                </div>
                                <div className="nav-work-item" style={{ padding: '4px 0' }}>
                                    <a href="/schedules" style={{ fontSize: '1.4rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Schedules</a>
                                </div>
                                <div className="nav-work-item" style={{ padding: '4px 0' }}>
                                    <a href="/sponsors" style={{ fontSize: '1.4rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Sponsors</a>
                                </div>
                                <div className="nav-work-item" style={{ padding: '4px 0' }}>
                                    <a href="/gallery" style={{ fontSize: '1.4rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Gallery</a>
                                </div>
                                <div className="nav-work-item" style={{ padding: '4px 0' }}>
                                    <a href="/contact" style={{ fontSize: '1.4rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Contact Us</a>
                                </div>
                                <a href="#" className="nav-work-btn" style={{ marginTop: '20px', padding: '16px' }}><span className="nav-work-btn__text">All our work</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-center" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <svg className="logo-truus" width="150" height="40" viewBox="0 0 150 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M6.79986 10.5614L3.32816 10.5614C2.54248 10.5614 1.76932 10.3175 1.14394 9.83464C0.61125 9.42382 0.118633 8.8021 0.0184395 7.88305C-0.179442 6.06784 1.23161 6.04243 3.4676 6.04243C3.7306 6.04243 3.99445 6.05683 4.25745 6.05683L9.14271 6.05683L11.544 1.67339C11.544 1.67339 12.0258 0.572239 13.9462 0.140248C14.7427 -0.0393251 15.5676 -0.0418662 16.37 0.106366C16.37 0.106366 19.5428 0.810258 18.3864 3.37849L17.1891 5.93571L26.7968 5.93571C28.546 5.93571 29.5179 7.60099 28.6587 8.76906C28.637 8.79871 28.617 8.83005 28.5911 8.858C27.0114 10.5877 22.8283 10.5622 22.8283 10.5622L15.08 10.5622L11.6809 17.3547C11.3403 18.0332 11.0881 18.7557 10.9512 19.5045C10.6907 20.9292 10.7358 22.8918 12.6244 23.7126C15.7505 25.0704 19.7073 20.9123 19.7073 20.9123L29.4686 11.9218C30.2868 11.1687 31.2537 10.5953 32.3124 10.2759C33.8412 9.81431 35.8384 9.77281 37.1142 11.9014C37.1142 11.9014 39.6524 11.527 40.9332 11.3898C42.6824 11.2018 44.5118 11.4872 45.1581 13.4845C45.8043 15.4819 44.3139 17.0523 44.3139 17.0523L40.5967 21.1553C40.5967 21.1553 38.9594 22.8604 39.8762 23.4686C40.7011 24.0167 44.3106 24.8586 49.3495 19.823C50.3581 18.8421 51.8994 17.1141 52.5682 16.2467C53.9333 14.4756 57.658 9.67963 62.3253 11.1713C62.3253 11.1713 64.5296 11.6651 63.1653 14.2155L60.2171 19.5062C59.9917 19.911 59.818 20.3447 59.7178 20.7979C59.5625 21.4967 59.5291 22.4107 60.1645 22.9824C60.1645 22.9824 62.2611 24.9535 66.8875 20.3032L70.9295 15.9875C71.5832 15.2896 72.3747 14.7356 73.2615 14.3943C74.0396 14.0944 74.9789 13.9191 75.8915 14.2147C75.8915 14.2147 78.2686 14.5688 78.0524 18.4762L78.0524 20.9114C78.0524 20.9114 77.8077 24.7705 83.2148 21.3985C83.2148 21.3985 87.0263 19.3003 91.2579 13.8488C91.2579 13.8488 93.2534 10.7088 97.6644 11.0451C98.1194 11.0798 98.5695 11.178 98.9903 11.3576C99.5839 11.6117 100.313 11.998 100.542 13.0119C100.59 13.2203 100.557 13.6548 100.238 14.2028L100.044 14.5662C99.4946 15.5979 99.0504 16.2628 98.4726 17.2784C98.0844 17.9612 97.7537 18.6227 97.2352 19.6883C96.8779 20.4227 95.805 22.4818 97.3797 23.2247C99.2884 24.1251 102.083 22.0574 103.623 20.5455L107.704 16.284C107.704 16.284 110.383 13.1152 112.746 14.0927C112.746 14.0927 115.646 14.9084 115.027 19.9373C115.027 19.9373 114.703 22.5098 116.107 22.8596C117.511 23.2094 121.461 22.6029 125.231 19.0852C128.196 16.3187 129.838 14.2138 130.405 13.4405C130.728 13 131.086 12.5858 131.482 12.2131C132.659 11.106 134.961 9.43992 137.773 9.95068C138.338 10.0532 138.841 10.3869 139.124 10.8926C139.457 11.4864 139.62 12.4359 138.917 13.8496C138.917 13.8496 146.35 20.0542 143.239 25.1737C141.135 28.6364 136.073 31.5096 131.927 31.9704C129.616 32.227 126.632 30.7718 125.951 29.3141C125.951 29.3141 125.428 28.4026 126.311 27.4878C127.497 26.2613 128.952 25.1746 128.952 25.1746C128.952 25.1746 131.386 23.4017 133.397 24.8425C133.599 24.9874 133.822 25.1 134.056 25.1771C134.655 25.3745 135.522 25.3999 135.406 23.8235C135.357 23.1442 135.136 22.4903 134.786 21.9092C134.189 20.9182 133.241 19.7154 132.194 18.8421C132.194 18.8421 118.989 33.4044 110.466 29.8003C110.466 29.8003 107.687 28.7355 107.464 24.1988C107.464 24.1988 98.961 31.7485 93.8988 31.7485C88.8365 31.7485 86.9504 28.9566 86.5755 25.4168C86.5755 25.4168 79.3507 30.6524 74.8111 30.6524C71.5957 30.6524 70.9871 28.6313 70.249 24.0768C70.249 24.0768 62.58 32.5218 55.7226 31.5045C48.8652 30.4872 49.4806 25.5379 49.4806 25.5379C49.4806 25.5379 41.7256 32.2516 34.834 31.8696C34.834 31.8696 31.0567 31.8467 29.8226 29.237C28.7263 26.9203 29.77 24.9264 31.1134 22.9807C32.8276 20.498 33.2743 20.0584 33.2743 20.0584C33.2743 20.0584 34.7613 18.4025 34.1142 17.7452C33.5273 17.1488 32.451 17.735 31.6553 18.3279C31.161 18.6964 30.7118 19.1233 30.3077 19.5909C28.4207 21.7745 18.621 32.4913 8.54406 31.8696C-2.67259 31.1775 2.65519 18.654 3.86252 16.284"
                            fill="currentColor"></path>
                    </svg>
                </div>
                <div className="nav-right" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-register-container" style={{ position: 'relative', zIndex: 105, display: 'flex', alignItems: 'center' }}>
                            <span className="logo-register-text" style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>Register</span>
                        </div>

                        {/* Pop-out Box for Right Side */}
                        <div className="nav-popout nav-wa-box">
                            <div className="nav-popout-inner" style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '60px' }}>
                                <h4 className="nav-wa-title" style={{ marginTop: '0', marginBottom: '20px' }}>join us now</h4>
                                <p className="nav-wa-desc">Secure your spot for the upcoming event. Early registrations get special perks!</p>
                                <a href="/register" className="nav-work-btn" style={{ marginTop: '30px', width: '100%', padding: '16px', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 800, textDecoration: 'none', textAlign: 'center' }}>
                                    <span className="nav-work-btn__text">Register Here</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
