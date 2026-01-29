import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';

export default function AddFooter() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
