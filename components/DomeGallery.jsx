'use client';

import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';

const DEFAULT_IMAGES = Array.from({ length: 42 }, (_, i) => ({
    src: `/assets/gallery-images/${i + 1}.webp`,
    alt: `ISTE HIT SC event gallery image ${i + 1}`,
}));

const DEFAULTS = {
    maxVerticalRotationDeg: 5,
    dragSensitivity: 20,
    enlargeTransitionMs: 300,
    segments: 35,
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeAngle = d => ((d % 360) + 360) % 360;
const wrapAngleSigned = deg => {
    const a = (((deg + 180) % 360) + 360) % 360;
    return a - 180;
};
const getDataNumber = (el, name, fallback) => {
    const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
    const n = attr == null ? NaN : parseFloat(attr);
    return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool, seg) {
    const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
    const evenYs = [-4, -2, 0, 2, 4];
    const oddYs = [-3, -1, 1, 3, 5];

    const coords = xCols.flatMap((x, c) => {
        const ys = c % 2 === 0 ? evenYs : oddYs;
        return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
    });

    const totalSlots = coords.length;
    if (pool.length === 0) {
        return coords.map(c => ({ ...c, src: '', alt: '' }));
    }

    if (pool.length > totalSlots) {
        console.warn(`[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`);
    }

    const normalizedImages = pool.map(image => {
        if (typeof image === 'string') {
            return { src: image, alt: '' };
        }
        return { src: image.src || '', alt: image.alt || '' };
    });

    const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

    for (let i = 1; i < usedImages.length; i++) {
        if (usedImages[i].src === usedImages[i - 1].src) {
            for (let j = i + 1; j < usedImages.length; j++) {
                if (usedImages[j].src !== usedImages[i].src) {
                    [usedImages[i], usedImages[j]] = [usedImages[j], usedImages[i]];
                    break;
                }
            }
        }
    }

    return coords.map((c, i) => ({
        ...c,
        src: usedImages[i].src,
        alt: usedImages[i].alt,
    }));
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
    const unit = 360 / segments / 2;
    const rotateY = unit * (offsetX + (sizeX - 1) / 2);
    const rotateX = unit * (offsetY - (sizeY - 1) / 2);
    return { rotateX, rotateY };
}

export default function DomeGallery({
    images = DEFAULT_IMAGES,
    fit = 0.5,
    fitBasis = 'auto',
    minRadius = 600,
    maxRadius = Infinity,
    padFactor = 0.25,
    overlayBlurColor = '#120F17',
    maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
    dragSensitivity = DEFAULTS.dragSensitivity,
    enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
    segments = DEFAULTS.segments,
    dragDampening = 2,
    openedImageWidth = '400px',
    openedImageHeight = '400px',
    imageBorderRadius = '30px',
    openedImageBorderRadius = '30px',
    grayscale = true,
}) {
    const rootRef = useRef(null);
    const mainRef = useRef(null);
    const sphereRef = useRef(null);
    const frameRef = useRef(null);
    const viewerRef = useRef(null);
    const scrimRef = useRef(null);
    const focusedElRef = useRef(null);
    const originalTilePositionRef = useRef(null);

    const rotationRef = useRef({ x: 0, y: 0 });
    const startRotRef = useRef({ x: 0, y: 0 });
    const startPosRef = useRef(null);
    const draggingRef = useRef(false);
    const cancelTapRef = useRef(false);
    const movedRef = useRef(false);
    const inertiaRAF = useRef(null);
    const pointerTypeRef = useRef('mouse');
    const tapTargetRef = useRef(null);
    const openingRef = useRef(false);
    const openStartedAtRef = useRef(0);
    const lastDragEndAt = useRef(0);
    const scrollLockedRef = useRef(false);
    const lockedRadiusRef = useRef(null);

    const applyTransform = useCallback((xDeg, yDeg) => {
        const el = sphereRef.current;
        if (el) {
            el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
        }
    }, []);

    const lockScroll = useCallback(() => {
        if (scrollLockedRef.current) return;
        scrollLockedRef.current = true;
        document.body.classList.add('dg-scroll-lock');
    }, []);

    const unlockScroll = useCallback(() => {
        if (!scrollLockedRef.current) return;
        if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
        scrollLockedRef.current = false;
        document.body.classList.remove('dg-scroll-lock');
    }, []);

    const items = useMemo(() => buildItems(images, segments), [images, segments]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ro = new ResizeObserver(entries => {
            const cr = entries[0].contentRect;
            const w = Math.max(1, cr.width);
            const h = Math.max(1, cr.height);
            const minDim = Math.min(w, h);
            const maxDim = Math.max(w, h);
            const aspect = w / h;
            let basis;

            switch (fitBasis) {
                case 'min':
                    basis = minDim;
                    break;
                case 'max':
                    basis = maxDim;
                    break;
                case 'width':
                    basis = w;
                    break;
                case 'height':
                    basis = h;
                    break;
                default:
                    basis = aspect >= 1.3 ? w : minDim;
            }

            let radius = basis * fit;
            radius = Math.min(radius, h * 1.35);
            radius = clamp(radius, minRadius, maxRadius);
            lockedRadiusRef.current = Math.round(radius);

            const viewerPad = Math.max(8, Math.round(minDim * padFactor));
            root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
            root.style.setProperty('--viewer-pad', `${viewerPad}px`);
            root.style.setProperty('--overlay-blur-color', overlayBlurColor);
            root.style.setProperty('--tile-radius', imageBorderRadius);
            root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
            root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
            applyTransform(rotationRef.current.x, rotationRef.current.y);

            const enlargedOverlay = viewerRef.current?.querySelector('.dg-enlarge');
            if (enlargedOverlay && frameRef.current && mainRef.current) {
                const frameR = frameRef.current.getBoundingClientRect();
                const mainR = mainRef.current.getBoundingClientRect();
                const hasCustomSize = openedImageWidth && openedImageHeight;

                if (hasCustomSize) {
                    const tempDiv = document.createElement('div');
                    tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
                    document.body.appendChild(tempDiv);
                    const tempRect = tempDiv.getBoundingClientRect();
                    document.body.removeChild(tempDiv);

                    enlargedOverlay.style.left = `${frameR.left - mainR.left + (frameR.width - tempRect.width) / 2}px`;
                    enlargedOverlay.style.top = `${frameR.top - mainR.top + (frameR.height - tempRect.height) / 2}px`;
                } else {
                    enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
                    enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
                    enlargedOverlay.style.width = `${frameR.width}px`;
                    enlargedOverlay.style.height = `${frameR.height}px`;
                }
            }
        });

        ro.observe(root);
        return () => ro.disconnect();
    }, [
        fit,
        fitBasis,
        minRadius,
        maxRadius,
        padFactor,
        overlayBlurColor,
        grayscale,
        imageBorderRadius,
        openedImageBorderRadius,
        openedImageWidth,
        openedImageHeight,
        applyTransform,
    ]);

    useEffect(() => {
        applyTransform(rotationRef.current.x, rotationRef.current.y);
    }, [applyTransform]);

    const stopInertia = useCallback(() => {
        if (inertiaRAF.current) {
            cancelAnimationFrame(inertiaRAF.current);
            inertiaRAF.current = null;
        }
    }, []);

    const startInertia = useCallback((vx, vy) => {
        const maxVelocity = 1.4;
        let vX = clamp(vx, -maxVelocity, maxVelocity) * 80;
        let vY = clamp(vy, -maxVelocity, maxVelocity) * 80;
        let frames = 0;
        const d = clamp(dragDampening ?? 0.6, 0, 1);
        const frictionMul = 0.94 + 0.055 * d;
        const stopThreshold = 0.015 - 0.01 * d;
        const maxFrames = Math.round(90 + 270 * d);

        const step = () => {
            vX *= frictionMul;
            vY *= frictionMul;
            if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
                inertiaRAF.current = null;
                return;
            }
            if (++frames > maxFrames) {
                inertiaRAF.current = null;
                return;
            }
            const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
            const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
            rotationRef.current = { x: nextX, y: nextY };
            applyTransform(nextX, nextY);
            inertiaRAF.current = requestAnimationFrame(step);
        };

        stopInertia();
        inertiaRAF.current = requestAnimationFrame(step);
    }, [applyTransform, dragDampening, maxVerticalRotationDeg, stopInertia]);

    const openItemFromElement = useCallback((el) => {
        if (openingRef.current) return;
        openingRef.current = true;
        openStartedAtRef.current = performance.now();
        lockScroll();

        const parent = el.parentElement;
        focusedElRef.current = el;
        el.setAttribute('data-focused', 'true');

        const offsetX = getDataNumber(parent, 'offsetX', 0);
        const offsetY = getDataNumber(parent, 'offsetY', 0);
        const sizeX = getDataNumber(parent, 'sizeX', 2);
        const sizeY = getDataNumber(parent, 'sizeY', 2);
        const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
        const parentY = normalizeAngle(parentRot.rotateY);
        const globalY = normalizeAngle(rotationRef.current.y);
        let rotY = -(parentY + globalY) % 360;
        if (rotY < -180) rotY += 360;
        const rotX = -parentRot.rotateX - rotationRef.current.x;

        parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
        parent.style.setProperty('--rot-x-delta', `${rotX}deg`);

        const refDiv = document.createElement('div');
        refDiv.className = 'dg-item__image dg-item__image--reference';
        refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
        parent.appendChild(refDiv);
        void refDiv.offsetHeight;

        const tileR = refDiv.getBoundingClientRect();
        const mainR = mainRef.current?.getBoundingClientRect();
        const frameR = frameRef.current?.getBoundingClientRect();

        if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
            openingRef.current = false;
            focusedElRef.current = null;
            parent.removeChild(refDiv);
            unlockScroll();
            return;
        }

        originalTilePositionRef.current = {
            left: tileR.left,
            top: tileR.top,
            width: tileR.width,
            height: tileR.height,
        };

        el.style.visibility = 'hidden';
        el.style.zIndex = 0;

        const overlay = document.createElement('div');
        overlay.className = 'dg-enlarge';
        overlay.style.position = 'absolute';
        overlay.style.left = frameR.left - mainR.left + 'px';
        overlay.style.top = frameR.top - mainR.top + 'px';
        overlay.style.width = frameR.width + 'px';
        overlay.style.height = frameR.height + 'px';
        overlay.style.opacity = '0';
        overlay.style.zIndex = '30';
        overlay.style.willChange = 'transform, opacity';
        overlay.style.transformOrigin = 'top left';
        overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
        overlay.style.borderRadius = openedImageBorderRadius;
        overlay.style.overflow = 'hidden';
        overlay.style.boxShadow = '0 10px 30px rgba(0,0,0,.35)';

        const img = document.createElement('img');
        img.src = parent.dataset.src || el.querySelector('img')?.src || '';
        img.alt = parent.dataset.alt || el.querySelector('img')?.alt || '';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.filter = grayscale ? 'grayscale(1)' : 'none';
        overlay.appendChild(img);
        viewerRef.current.appendChild(overlay);

        const tx0 = tileR.left - frameR.left;
        const ty0 = tileR.top - frameR.top;
        const sx0 = tileR.width / frameR.width;
        const sy0 = tileR.height / frameR.height;
        overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${isFinite(sx0) && sx0 > 0 ? sx0 : 1}, ${isFinite(sy0) && sy0 > 0 ? sy0 : 1})`;

        setTimeout(() => {
            if (!overlay.parentElement) return;
            overlay.style.opacity = '1';
            overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
            rootRef.current?.setAttribute('data-enlarging', 'true');
        }, 16);

        if (openedImageWidth || openedImageHeight) {
            const onFirstEnd = ev => {
                if (ev.propertyName !== 'transform') return;
                overlay.removeEventListener('transitionend', onFirstEnd);
                const prevTransition = overlay.style.transition;
                overlay.style.transition = 'none';
                const tempWidth = openedImageWidth || `${frameR.width}px`;
                const tempHeight = openedImageHeight || `${frameR.height}px`;
                overlay.style.width = tempWidth;
                overlay.style.height = tempHeight;
                const newRect = overlay.getBoundingClientRect();
                overlay.style.width = frameR.width + 'px';
                overlay.style.height = frameR.height + 'px';
                void overlay.offsetWidth;
                overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
                overlay.style.left = `${frameR.left - mainR.left + (frameR.width - newRect.width) / 2}px`;
                overlay.style.top = `${frameR.top - mainR.top + (frameR.height - newRect.height) / 2}px`;
                overlay.style.width = tempWidth;
                overlay.style.height = tempHeight;
                overlay.addEventListener('transitionend', () => {
                    overlay.style.transition = prevTransition;
                }, { once: true });
            };
            overlay.addEventListener('transitionend', onFirstEnd);
        }
    }, [
        enlargeTransitionMs,
        grayscale,
        lockScroll,
        openedImageBorderRadius,
        openedImageHeight,
        openedImageWidth,
        segments,
        unlockScroll,
    ]);

    useGesture({
        onDragStart: ({ event }) => {
            if (focusedElRef.current) return;
            stopInertia();
            pointerTypeRef.current = event.pointerType || 'mouse';
            if (pointerTypeRef.current === 'touch') event.preventDefault();
            if (pointerTypeRef.current === 'touch') lockScroll();
            draggingRef.current = true;
            cancelTapRef.current = false;
            movedRef.current = false;
            startRotRef.current = { ...rotationRef.current };
            startPosRef.current = { x: event.clientX, y: event.clientY };
            tapTargetRef.current = event.target.closest?.('.dg-item__image') || null;
        },
        onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
            if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
            if (pointerTypeRef.current === 'touch') event.preventDefault();

            const dxTotal = event.clientX - startPosRef.current.x;
            const dyTotal = event.clientY - startPosRef.current.y;

            if (!movedRef.current && dxTotal * dxTotal + dyTotal * dyTotal > 16) {
                movedRef.current = true;
            }

            const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
            const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

            if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
                rotationRef.current = { x: nextX, y: nextY };
                applyTransform(nextX, nextY);
            }

            if (last) {
                draggingRef.current = false;
                const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
                const tapThresh = pointerTypeRef.current === 'touch' ? 10 : 6;
                const isTap = dist2 <= tapThresh * tapThresh;
                let [vMagX, vMagY] = velArr;
                const [dirX, dirY] = dirArr;
                let vx = vMagX * dirX;
                let vy = vMagY * dirY;

                if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
                    const [mx, my] = movement;
                    vx = (mx / dragSensitivity) * 0.02;
                    vy = (my / dragSensitivity) * 0.02;
                }

                if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
                    startInertia(vx, vy);
                }

                startPosRef.current = null;
                cancelTapRef.current = !isTap;

                if (isTap && tapTargetRef.current && !focusedElRef.current) {
                    openItemFromElement(tapTargetRef.current);
                }

                tapTargetRef.current = null;
                if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120);
                if (movedRef.current) lastDragEndAt.current = performance.now();
                movedRef.current = false;
                if (pointerTypeRef.current === 'touch') unlockScroll();
            }
        },
    }, { target: mainRef, eventOptions: { passive: false } });

    useEffect(() => {
        const scrim = scrimRef.current;
        if (!scrim) return;

        const close = () => {
            if (performance.now() - openStartedAtRef.current < 250) return;
            const el = focusedElRef.current;
            if (!el) return;
            const parent = el.parentElement;
            const overlay = viewerRef.current?.querySelector('.dg-enlarge');
            if (!overlay) return;

            const refDiv = parent.querySelector('.dg-item__image--reference');
            const originalPos = originalTilePositionRef.current;

            if (!originalPos) {
                overlay.remove();
                if (refDiv) refDiv.remove();
                parent.style.setProperty('--rot-y-delta', '0deg');
                parent.style.setProperty('--rot-x-delta', '0deg');
                el.style.visibility = '';
                el.style.zIndex = 0;
                focusedElRef.current = null;
                rootRef.current?.removeAttribute('data-enlarging');
                openingRef.current = false;
                return;
            }

            const currentRect = overlay.getBoundingClientRect();
            const rootRect = rootRef.current.getBoundingClientRect();
            const closing = document.createElement('div');
            closing.className = 'dg-enlarge-closing';
            closing.style.cssText = `
                position: absolute;
                left: ${currentRect.left - rootRect.left}px;
                top: ${currentRect.top - rootRect.top}px;
                width: ${currentRect.width}px;
                height: ${currentRect.height}px;
                z-index: 9999;
                border-radius: ${openedImageBorderRadius};
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,.35);
                transition: all ${enlargeTransitionMs}ms ease-out;
                pointer-events: none;
                filter: ${grayscale ? 'grayscale(1)' : 'none'};
            `;

            const originalImg = overlay.querySelector('img');
            if (originalImg) {
                const img = originalImg.cloneNode();
                img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
                closing.appendChild(img);
            }

            overlay.remove();
            rootRef.current.appendChild(closing);
            void closing.getBoundingClientRect();

            requestAnimationFrame(() => {
                closing.style.left = originalPos.left - rootRect.left + 'px';
                closing.style.top = originalPos.top - rootRect.top + 'px';
                closing.style.width = originalPos.width + 'px';
                closing.style.height = originalPos.height + 'px';
                closing.style.opacity = '0';
            });

            closing.addEventListener('transitionend', () => {
                closing.remove();
                originalTilePositionRef.current = null;
                if (refDiv) refDiv.remove();
                parent.style.transition = 'none';
                el.style.transition = 'none';
                parent.style.setProperty('--rot-y-delta', '0deg');
                parent.style.setProperty('--rot-x-delta', '0deg');

                requestAnimationFrame(() => {
                    el.style.visibility = '';
                    el.style.opacity = '0';
                    el.style.zIndex = 0;
                    focusedElRef.current = null;
                    rootRef.current?.removeAttribute('data-enlarging');

                    requestAnimationFrame(() => {
                        parent.style.transition = '';
                        el.style.transition = 'opacity 300ms ease-out';
                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            setTimeout(() => {
                                el.style.transition = '';
                                el.style.opacity = '';
                                openingRef.current = false;
                                if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true') {
                                    document.body.classList.remove('dg-scroll-lock');
                                }
                            }, 300);
                        });
                    });
                });
            }, { once: true });
        };

        scrim.addEventListener('click', close);
        const onKey = e => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);

        return () => {
            scrim.removeEventListener('click', close);
            window.removeEventListener('keydown', onKey);
        };
    }, [enlargeTransitionMs, grayscale, openedImageBorderRadius]);

    useEffect(() => {
        return () => {
            stopInertia();
            document.body.classList.remove('dg-scroll-lock');
        };
    }, [stopInertia]);

    return (
        <div
            ref={rootRef}
            className="sphere-root"
            style={{
                '--segments-x': segments,
                '--segments-y': segments,
                '--overlay-blur-color': overlayBlurColor,
                '--tile-radius': imageBorderRadius,
                '--enlarge-radius': openedImageBorderRadius,
                '--image-filter': grayscale ? 'grayscale(1)' : 'none',
            }}
        >
            <style>{`
                .sphere-root {
                    --radius: 520px;
                    --viewer-pad: 72px;
                    --circ: calc(var(--radius) * 3.14);
                    --rot-y: calc((360deg / var(--segments-x)) / 2);
                    --rot-x: calc((360deg / var(--segments-y)) / 2);
                    --item-width: calc(var(--circ) / var(--segments-x));
                    --item-height: calc(var(--circ) / var(--segments-y));
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .sphere-root * { box-sizing: border-box; }
                .dg-main {
                    position: absolute;
                    inset: 0;
                    display: grid;
                    place-items: center;
                    overflow: hidden;
                    user-select: none;
                    background: transparent;
                }
                .dg-stage {
                    width: 100%;
                    height: 100%;
                    display: grid;
                    place-items: center;
                    position: absolute;
                    inset: 0;
                    margin: auto;
                    perspective: calc(var(--radius) * 2);
                    perspective-origin: 50% 50%;
                }
                .dg-sphere {
                    transform: translateZ(calc(var(--radius) * -1));
                    will-change: transform;
                    position: absolute;
                    transform-style: preserve-3d;
                }
                .dg-sphere-item {
                    width: calc(var(--item-width) * var(--item-size-x));
                    height: calc(var(--item-height) * var(--item-size-y));
                    position: absolute;
                    top: -999px;
                    bottom: -999px;
                    left: -999px;
                    right: -999px;
                    margin: auto;
                    transform-origin: 50% 50%;
                    backface-visibility: hidden;
                    transform-style: preserve-3d;
                    transition: transform 300ms;
                    transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg)))
                        rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg)))
                        translateZ(var(--radius));
                }
                .dg-item__image {
                    position: absolute;
                    inset: 10px;
                    display: block;
                    border-radius: var(--tile-radius, 12px);
                    overflow: hidden;
                    cursor: pointer;
                    background: #ddd;
                    backface-visibility: hidden;
                    transform: translateZ(0);
                    transform-style: preserve-3d;
                    transition: transform 300ms;
                    pointer-events: auto;
                }
                .dg-item__image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    pointer-events: none;
                    backface-visibility: hidden;
                    filter: var(--image-filter, grayscale(1));
                }
                .dg-item__image--reference {
                    pointer-events: none;
                    opacity: 0;
                }
                .sphere-root[data-enlarging="true"] .dg-scrim {
                    opacity: 1;
                    pointer-events: all;
                }
                .dg-overlay,
                .dg-blur-overlay,
                .dg-gradient-top,
                .dg-gradient-bottom {
                    position: absolute;
                    pointer-events: none;
                }
                .dg-overlay {
                    inset: 0;
                    z-index: 3;
                    background-image: radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color) 100%);
                }
                .dg-blur-overlay {
                    inset: 0;
                    z-index: 3;
                    -webkit-mask-image: radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color) 90%);
                    mask-image: radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color) 90%);
                    backdrop-filter: blur(3px);
                }
                .dg-gradient-top,
                .dg-gradient-bottom {
                    left: 0;
                    right: 0;
                    height: 120px;
                    z-index: 5;
                    background: linear-gradient(to bottom, transparent, var(--overlay-blur-color));
                }
                .dg-gradient-top {
                    top: 0;
                    transform: rotate(180deg);
                }
                .dg-gradient-bottom {
                    bottom: 0;
                }
                .dg-viewer {
                    position: absolute;
                    inset: 0;
                    z-index: 20;
                    pointer-events: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--viewer-pad);
                }
                .dg-scrim {
                    position: absolute;
                    inset: 0;
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 500ms;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(3px);
                }
                .dg-viewer-frame {
                    height: 100%;
                    aspect-ratio: 1;
                    display: flex;
                    border-radius: var(--enlarge-radius, 30px);
                }
                body.dg-scroll-lock {
                    overflow: hidden !important;
                    touch-action: none !important;
                    overscroll-behavior: contain !important;
                }
                @media (max-aspect-ratio: 1/1) {
                    .dg-viewer-frame {
                        width: 100%;
                        height: auto;
                    }
                }
            `}</style>

            <main
                ref={mainRef}
                className="dg-main"
                style={{
                    touchAction: 'none',
                    WebkitUserSelect: 'none',
                }}
            >
                <div className="dg-stage">
                    <div ref={sphereRef} className="dg-sphere">
                        {items.map((it, i) => (
                            <div
                                key={`${it.x},${it.y},${i}`}
                                className="dg-sphere-item"
                                data-src={it.src}
                                data-alt={it.alt}
                                data-offset-x={it.x}
                                data-offset-y={it.y}
                                data-size-x={it.sizeX}
                                data-size-y={it.sizeY}
                                style={{
                                    '--offset-x': it.x,
                                    '--offset-y': it.y,
                                    '--item-size-x': it.sizeX,
                                    '--item-size-y': it.sizeY,
                                }}
                            >
                                <div
                                    className="dg-item__image"
                                    role="button"
                                    tabIndex={0}
                                    aria-label={it.alt || 'Open image'}
                                    onClick={e => {
                                        if (draggingRef.current || movedRef.current) return;
                                        if (performance.now() - lastDragEndAt.current < 80) return;
                                        if (openingRef.current) return;
                                        openItemFromElement(e.currentTarget);
                                    }}
                                    onPointerUp={e => {
                                        if (e.pointerType !== 'touch') return;
                                        if (draggingRef.current || movedRef.current) return;
                                        if (performance.now() - lastDragEndAt.current < 80) return;
                                        if (openingRef.current) return;
                                        openItemFromElement(e.currentTarget);
                                    }}
                                >
                                    <img src={it.src} draggable={false} alt={it.alt} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dg-overlay" />
                <div className="dg-blur-overlay" />
                <div className="dg-gradient-top" />
                <div className="dg-gradient-bottom" />

                <div ref={viewerRef} className="dg-viewer">
                    <div ref={scrimRef} className="dg-scrim" />
                    <div ref={frameRef} className="dg-viewer-frame" />
                </div>
            </main>
        </div>
    );
}
