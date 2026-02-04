'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@gravity-ui/uikit';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider theme="dark">
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}