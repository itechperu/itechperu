'use client';

import React from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';

export const GravityProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme="dark">
            {children}
        </ThemeProvider>
    );
};
