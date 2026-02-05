'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as GravityThemeProvider } from '@gravity-ui/uikit';
import { useState, useEffect, createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within Providers');
    }
    return context;
}

export function Providers({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('app-theme', newTheme);
    };

    return (
        <SessionProvider>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <GravityThemeProvider theme={theme}>
                    {children}
                </GravityThemeProvider>
            </ThemeContext.Provider>
        </SessionProvider>
    );
}