import './globals.css';

const SITE_URL = 'https://ac.istehitsc.com';

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Annual Convention 3.0 — ISTE HIT Students\' Chapter',
        template: '%s | ISTE HIT SC',
    },
    description: 'ISTE HIT Students\' Chapter — Building a dynamic technical community empowering students with knowledge, skills, and industry exposure. Join Annual Convention 3.0 at Haldia Institute of Technology.',
    keywords: ['ISTE', 'HIT', 'Haldia Institute of Technology', 'Annual Convention', 'Student Chapter', 'Technical Community', 'Hackathon', 'ISTE HIT SC'],
    authors: [{ name: 'ISTE HIT Students\' Chapter' }],
    creator: 'ISTE HIT Students\' Chapter',
    icons: {
        icon: '/assets/favicon.png',
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: SITE_URL,
        siteName: 'ISTE HIT Students\' Chapter',
        title: 'Annual Convention 3.0 — ISTE HIT SC',
        description: 'Building a dynamic technical community empowering students with knowledge, skills, and industry exposure.',
        images: [
            {
                url: '/assets/Iste.png',
                width: 1200,
                height: 630,
                alt: 'ISTE HIT Students\' Chapter — Annual Convention 3.0',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Annual Convention 3.0 — ISTE HIT SC',
        description: 'Building a dynamic technical community empowering students with knowledge, skills, and industry exposure.',
        images: ['/assets/Iste.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: SITE_URL,
    },
};

export default function RootLayout({ children }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ISTE HIT Students\' Chapter',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/Iste.png`,
        description: 'Building a dynamic technical community empowering students with knowledge, skills, and industry exposure at Haldia Institute of Technology.',
        foundingDate: '2023',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Haldia Institute of Technology',
            addressLocality: 'Haldia',
            addressRegion: 'West Bengal',
            postalCode: '721657',
            addressCountry: 'IN',
        },
        sameAs: [
            'https://www.instagram.com/iste.hit.sc/',
            'https://www.linkedin.com/company/iste-hit-sc/',
        ],
    };

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://res.cloudinary.com" />
                <link rel="dns-prefetch" href="https://res.cloudinary.com" />
                <meta name="theme-color" content="#0a0a0a" />
                <meta name="google-site-verification" content="MckHw7q30JqKxC7vzeZxHfVvk2LxxZIaleuv8cIIg6Y" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
