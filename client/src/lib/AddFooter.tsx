import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';

export default function AddFooter() {
    return (
        <div className='flex flex-col min-h-screen'>
            <main className='flex-1 w-full'>
                <div className='max-w-7xl mx-auto px-4 py-6'>
                    <Outlet />
                </div>
            </main>

            <footer className='w-full'>
                <Footer />
            </footer>
        </div>
    );
}
