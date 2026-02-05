'use client';

import React from 'react';
import { Button, Icon, Text, useTheme } from '@gravity-ui/uikit';
import { ShoppingBag, Person, Sun, Moon } from '@gravity-ui/icons';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid var(--g-color-line-generic)',
            backgroundColor: 'var(--g-color-base-background)'
        }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text variant="header-2">iTech Peru</Text>
            </Link>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <ThemeToggle />

                <Link href="/shop">
                    <Button view="flat">Tienda</Button>
                </Link>

                <Button view="flat" size="l">
                    <Icon data={ShoppingBag} />
                </Button>

                <Link href="/auth/login">
                    <Button view="flat" size="l">
                        <span style={{ marginRight: 6 }}>Iniciar Sesión</span>
                        <Icon data={Person} />
                    </Button>
                </Link>
            </div>
        </nav>
    );
};

function ThemeToggle() {
    const theme = useTheme() as any;
    const isDark = theme.theme === 'dark';

    return (
        <Button
            view="flat"
            size="l"
            onClick={() => theme.setTheme(isDark ? 'light' : 'dark')}
            title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
            <Icon data={isDark ? Sun : Moon} />
        </Button>
    );
}
