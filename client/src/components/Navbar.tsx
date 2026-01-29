import {
    LogOutIcon,
    BookOpen,
    Calendar,
    Home,
    Menu,
    Pen,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import axios from 'axios';
const Navbar = () => {
    const navigate = useNavigate();

    async function logoutUser() {
        try {
            const { data } = await axios.post('/api/auth/logout');
            if (data.ok) alert('logged out');
            else alert(data.message);
            navigate('/login', { replace: true });
        } catch (e) {
            alert(e);
        }
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={'flex justify-between items-center bg-card px-12 py-4'}>
            <h1 className={'text-3xl font-extrabold'}>
                <Link to={'/'}>Attendance Tracker</Link>
            </h1>
            <div className={'flex gap-2 justify-center items-center md:hidden'}>
                <ThemeToggleButton />
                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button className="w-14 h-14" variant="outline">
                            {isMenuOpen ? (
                                <X className="w-7! h-7!" />
                            ) : (
                                <Menu className="w-7! h-7!" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Home />
                            Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BookOpen />
                            Subjects
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigate('/timetable')}
                        >
                            <Calendar />
                            Timetable
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigate('/manualupdate')}
                        >
                            <Pen />
                            Manual Update
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={logoutUser}
                            variant="destructive"
                        >
                            <LogOutIcon />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div
                className={
                    'hidden md:flex flex-row justify-center items-center gap-3'
                }
            >
                <Button
                    className="h-9 px-8 text-xl font-bold flex items-center gap-3"
                    onClick={() => navigate('/')}
                    variant={'outline'}
                >
                    Dashboard
                    <Home className="w-6! h-6!" />
                </Button>
                <Button
                    className="h-9 px-8 text-xl font-bold flex items-center gap-3"
                    onClick={() => navigate('/subjects')}
                    variant={'outline'}
                >
                    Subjects
                    <BookOpen className="w-6! h-6!" />
                </Button>
                <Button
                    className="h-9 px-8 text-xl font-bold flex items-center gap-3"
                    onClick={() => navigate('/timetable')}
                    variant={'outline'}
                >
                    Timetable
                    <Calendar className="w-6! h-6!" />
                </Button>
                <Button
                    className="h-9 px-8 text-xl font-bold flex items-center gap-3"
                    onClick={() => navigate('/manualupdate')}
                    variant={'outline'}
                >
                    Manual Update
                    <Pen className="w-6! h-6!" />
                </Button>
            </div>
            <div className="hidden md:flex justify-center items-center">
                <div className="flex h-10 px-8 text-xl font-bold items-center gap-3">
                    <ThemeToggleButton />
                </div>

                <Button
                    className="flex h-10 px-8 text-xl font-bold items-center gap-3"
                    onClick={logoutUser}
                    variant="destructive"
                >
                    Logout
                    <LogOutIcon className="w-7! h-7!" />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
