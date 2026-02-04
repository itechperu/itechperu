import React from 'react';
import { Container, Button, Text, Label, Card } from '@gravity-ui/uikit';
import { ShoppingBag, ArrowLeft } from '@gravity-ui/icons';
import Link from 'next/link';
import { getProductById } from '@/lib/actions/getProductById';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);

    if (!product) {
        notFound();
    }

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'EXCELENTE': return 'success';
            case 'BUENO': return 'info';
            case 'REGULAR': return 'warning';
            default: return 'unknown';
        }
    };

    return (
        <Container style={{ padding: '40px 20px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: 20, color: 'var(--g-color-text-secondary)' }}>
                <ArrowLeft style={{ marginRight: 8 }} />
                Volver a la tienda
            </Link>

            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                {/* Imagen */}
                <div style={{ flex: '1 1 400px', maxWidth: 600 }}>
                    <div style={{
                        width: '100%',
                        paddingBottom: '75%', // 4:3 Aspect Ratio
                        backgroundImage: `url(${product.images})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 12,
                        backgroundColor: '#333'
                    }} />
                </div>

                {/* Detalles */}
                <div style={{ flex: '1 1 300px' }}>
                    <Text variant="display-1" className="mb-2">{product.name}</Text>
                    <div style={{ marginBottom: 20 }}>
                        <Label size="m" theme={getConditionColor(product.condition)}>{product.condition}</Label>
                        <span style={{ marginLeft: 8 }}>
                            <Label size="m">{product.category}</Label>
                        </span>
                    </div>

                    <Text variant="body-2" color="secondary" className="mb-4" style={{ display: 'block', whiteSpace: 'pre-line' }}>
                        {product.description}
                    </Text>

                    <div style={{ marginTop: 40, padding: 24, border: '1px solid var(--g-color-line-generic)', borderRadius: 12 }}>
                        <Text variant="caption-1" color="secondary">Precio de Contado</Text>
                        <Text variant="display-2" style={{ display: 'block', marginBottom: 20 }}>
                            S/ {Number(product.originalPrice).toFixed(2)}
                        </Text>

                        <Button view="action" size="xl" width="max">
                            <ShoppingBag style={{ marginRight: 8 }} />
                            Añadir al Carrito
                        </Button>
                        <Text variant="caption-1" color="secondary" style={{ display: 'block', marginTop: 12, textAlign: 'center' }}>
                            Garantía de 6 meses incluida.
                        </Text>
                    </div>
                </div>
            </div>
        </Container>
    );
}
