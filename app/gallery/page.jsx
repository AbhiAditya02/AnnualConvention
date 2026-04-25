import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GalleryPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20 px-8 text-center">
                <h1 className="text-4xl font-bold">Gallery</h1>
                <p className="mt-4 text-lg">Event gallery.</p>
            </div>
            <Footer />
        </main>
    );
}
