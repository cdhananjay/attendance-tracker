import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeToggleButton() {
    const { theme, setTheme } = useTheme();
    function toggleTheme() {
        if (theme == 'dark') setTheme('light');
        else setTheme('dark');
    }
    return (
        <Button onClick={() => toggleTheme()} variant="outline" size="icon">
            {theme == 'dark' && (
                <Moon
                    className={
                        'absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0'
                    }
                />
            )}
            {theme == 'light' && (
                <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
