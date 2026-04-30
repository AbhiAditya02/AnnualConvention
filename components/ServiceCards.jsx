'use client';

import { useState } from 'react';
import { CARDS_DATA } from '@/lib/data';

export default function ServiceCards() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <>
            {/* Heading */}
            <div className="title-container">
                <h2 className="service-title">
                    what to <span className="service-italic-text">expect:</span>
                </h2>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="160"
                    viewBox="0 0 159 17"
                    fill="none"
                    className="service-underline-svg"
                >
                    <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Cards */}
            <div className="cards-wrapper" id="cards-wrapper">
                {CARDS_DATA.map((card, index) => (
                    <div
                        key={card.color}
                        className={`card card-${card.color} ${
                            hoveredIndex === index
                                ? "active"
                                : hoveredIndex !== null
                                ? index < hoveredIndex
                                    ? "move-left"
                                    : "move-right"
                                : ""
                        }`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className={`card-sticker sticker-${card.sticker}`}>
                            <img
                                src={`/assets/Card-Sticker SVG/sticker-${card.sticker}.svg`}
                                alt=""
                                width="100%"
                                loading="lazy"
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="card-title">{card.title}</h3>

                        <svg width="100%" height="10" className="card-divider-svg" aria-hidden="true">
                            <use href="#card-divider" />
                        </svg>

                        <ul className="card-list">
                            {card.services.map((service) => (
                                <li key={service} className="card-list-item">
                                    <span className='services-card__bullet'>✦</span>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}