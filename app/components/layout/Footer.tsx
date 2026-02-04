'use client';

import React from 'react';
import { Text, Container } from '@gravity-ui/uikit';

export const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--g-color-line-generic)',
            padding: '40px 0',
            marginTop: 'auto',
            backgroundColor: 'var(--g-color-base-background)'
        }}>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>
                        <Text variant="header-1" style={{ marginBottom: 8 }}>iTech Peru</Text>
                        <Text color="secondary">© 2026 iTech Peru. Todos los derechos reservados.</Text>
                    </div>
                    <div>
                        <Text variant="subheader-1" style={{ marginBottom: 8 }}>Contacto</Text>
                        <Text color="secondary" style={{ display: 'block' }}>contacto@itechperu.com</Text>
                        <Text color="secondary" style={{ display: 'block' }}>Lima, Perú</Text>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
