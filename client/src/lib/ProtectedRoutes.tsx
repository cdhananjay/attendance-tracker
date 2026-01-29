import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ProtectedRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/api/auth/');
                if (data.ok) setIsLoggedIn(true);
                else setIsLoggedIn(false);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);
    if (isLoggedIn === null) return <div>Loading...</div>;
    return isLoggedIn ? (
        <div>
            {' '}
            <Navbar /> <Outlet />{' '}
        </div>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoutes;
