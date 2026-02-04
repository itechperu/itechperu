"use client";

import React from 'react';
import { Card, Button, Text, Container } from '@gravity-ui/uikit';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    originalPrice: number;
    condition: string;
    category: string;
    images?: string;
}

export function ProductList({ products }: { products: any[] }) {
    return (
        <Container maxWidth="l" style={{ padding: '0 20px 100px' }}>
            {products.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                    <Text variant="display-1" style={{
                        color: '#fff',
                        marginBottom: 40,
                        fontWeight: 800
                    }}>
                        Próximamente<span className="loading-dots"></span>
                    </Text>

                    <div className="glass-panel" style={{ padding: '60px', borderRadius: '24px', maxWidth: '500px', margin: '0 auto' }}>
                        <div style={{ fontSize: '64px', marginBottom: 20 }}>📦</div>
                        <Text style={{ color: '#94a3b8' }}>
                            Estamos preparando equipos premium para ti
                        </Text>
                    </div>


                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .loading-dots::after {
                            content: '';
                            animation: dots 1.5s steps(4, end) infinite;
                        }
                        
                        @keyframes dots {
                            0%, 20% { content: ''; }
                            40% { content: '.'; }
                            60% { content: '..'; }
                            80%, 100% { content: '...'; }
                        }
                    `}} />
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '32px'
                }}>
                    {products.map((product) => {
                        // Calculate condition grade
                        const conditionColor = product.condition === 'EXCELENTE' ? '#22c55e' :
                            product.condition === 'MUY BUENO' ? '#3b82f6' : '#f59e0b';

                        return (
                            <Link key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                <div className="product-card-luxury" style={{ position: 'relative', height: '100%' }}>
                                    <div className="glass-panel" style={{
                                        padding: 0,
                                        borderRadius: '24px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}>
                                        {/* Image Container */}
                                        <div style={{
                                            height: '280px',
                                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            {/* Product Image */}
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundImage: product.images ? `url(${product.images})` : 'none',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                opacity: product.images ? 0.9 : 0.3,
                                                transition: 'transform 0.4s ease'
                                            }} className="product-image" />

                                            {/* Refurbished Badge */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 16,
                                                left: 16,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                padding: '6px 12px',
                                                borderRadius: '12px',
                                                background: 'rgba(0,0,0,0.7)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(34,197,94,0.3)'
                                            }}>
                                                <span style={{ fontSize: '14px' }}>♻️</span>
                                                <Text style={{ color: '#22c55e', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px' }}>
                                                    REFURBISHED
                                                </Text>
                                            </div>

                                            {/* Condition Badge */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                padding: '6px 12px',
                                                borderRadius: '12px',
                                                background: 'rgba(0,0,0,0.7)',
                                                backdropFilter: 'blur(10px)',
                                                border: `1px solid ${conditionColor}40`
                                            }}>
                                                <Text style={{
                                                    color: conditionColor,
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    {product.condition}
                                                </Text>
                                            </div>

                                            {/* Gradient Overlay */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                height: '50%',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                                            }} />
                                        </div>

                                        {/* Content */}
                                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ marginBottom: 4 }}>
                                                <Text style={{
                                                    color: '#22c55e',
                                                    fontSize: '11px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1.2px',
                                                    fontWeight: 600
                                                }}>
                                                    {product.category}
                                                </Text>
                                            </div>

                                            <Text variant="header-2" style={{
                                                color: '#fff',
                                                display: 'block',
                                                marginBottom: 16,
                                                fontWeight: 700,
                                                lineHeight: 1.3,
                                                flex: 1
                                            }}>
                                                {product.name}
                                            </Text>

                                            {/* Features */}
                                            <div style={{ marginBottom: 20 }}>
                                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                    {['✓ Certificado', '✓ Garantía 12M'].map((feature, i) => (
                                                        <span key={i} style={{
                                                            fontSize: '11px',
                                                            color: '#94a3b8',
                                                            padding: '4px 8px',
                                                            borderRadius: '6px',
                                                            background: 'rgba(148,163,184,0.1)'
                                                        }}>
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Price & CTA */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingTop: 20,
                                                borderTop: '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                <div>
                                                    <Text style={{ color: '#94a3b8', fontSize: '12px', marginBottom: 4 }}>
                                                        Desde
                                                    </Text>
                                                    <Text variant="header-1" style={{
                                                        color: '#fff',
                                                        textShadow: '0 0 20px rgba(255,255,255,0.2)',
                                                        fontWeight: 800
                                                    }}>
                                                        S/ {Number(product.originalPrice).toFixed(0)}
                                                    </Text>
                                                </div>
                                                <div style={{
                                                    width: 44,
                                                    height: 44,
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #22c55e, #10b981)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 12px rgba(34,197,94,0.3)',
                                                    transition: 'transform 0.2s'
                                                }} className="cta-arrow">
                                                    <span style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>→</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
            <style dangerouslySetInnerHTML={{
                __html: `
                .product-card-luxury:hover .glass-panel {
                    transform: translateY(-8px) scale(1.02);
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.6), 
                                0 0 0 1px rgba(34,197,94,0.2),
                                inset 0 0 0 1px rgba(255,255,255,0.1);
                }
                .product-card-luxury:hover .product-image {
                    transform: scale(1.1);
                }
                .product-card-luxury:hover .cta-arrow {
                    transform: translateX(4px);
                }
            `}} />
        </Container>
    );
}