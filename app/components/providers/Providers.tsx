'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as GravityThemeProvider } from '@gravity-ui/uikit';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

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

function ThemeProviderWrapper({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('app-theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
        console.log('🎨 Changing theme from', theme, 'to', newTheme);
        setTheme(newTheme);
        localStorage.setItem('app-theme', newTheme);
    };

    // Prevent flash of wrong theme
    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => { } }}>
                <GravityThemeProvider theme="dark">
                    {children}
                </GravityThemeProvider>
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <GravityThemeProvider theme={theme}>
                {children}
            </GravityThemeProvider>
        </ThemeContext.Provider>
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProviderWrapper>
                {children}
            </ThemeProviderWrapper>
        </SessionProvider>
    );
}