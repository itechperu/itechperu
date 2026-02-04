'use client';

import React from 'react';
import { Button, Icon, Text } from '@gravity-ui/uikit';
import { ShoppingBag, Person } from '@gravity-ui/icons';
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
                <Link href="/shop">
                    <Button view="flat">Tienda</Button>
                </Link>

                <Button view="flat" size="l">
                    <Icon data={ShoppingBag} />
                </Button>

                <Link href="/admin/products">
                    <Button view="flat" size="l">
                        <Icon data={Person} />
                    </Button>
                </Link>
            </div>
        </nav>
    );
};
