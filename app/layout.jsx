import './globals.css';

export const metadata = {
    title: 'Annual Convention 26',
    description: 'ISTE HIT Students Chapter — Building a dynamic technical community empowering students with knowledge, skills, and industry exposure.',
    icons: {
        icon: '/assets/Iste.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
