import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SchedulesPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20 px-8 text-center">
                <h1 className="text-4xl font-bold">Schedules</h1>
                <p className="mt-4 text-lg">Event schedules will be updated here.</p>
            </div>
            <Footer />
        </main>
    );
}
