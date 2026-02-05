'use client';

import React from 'react';
import { Container, Text } from '@gravity-ui/uikit';
import Link from 'next/link';

export default function ShippingPage() {
    return (
        <main style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at 50% 0%, #1a1b26 0%, #000000 100%)',
            padding: 'clamp(80px, 15vw, 100px) 20px'
        }}>
            <Container maxWidth="m">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <Link href="/" style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        marginBottom: 24,
                        textDecoration: 'none'
                    }}>
                        <Text style={{ color: '#22c55e', fontSize: '12px', fontWeight: 600 }}>
                            â† Volver a la tienda
                        </Text>
                    </Link>

                    <div style={{ fontSize: 'clamp(48px, 10vw, 64px)', marginBottom: 20 }}>ðŸš€</div>

                    <Text variant="display-2" style={{
                        color: 'var(--lp-text-primary)',
                        fontWeight: 800,
                        marginBottom: 20,
                        display: 'block',
                        fontSize: 'clamp(28px, 6vw, 48px)'
                    }}>
                        EnvÃ­os y Entregas
                    </Text>

                    <Text style={{
                        color: 'var(--lp-text-secondary)',
                        fontSize: 'clamp(16px, 3vw, 18px)',
                        display: 'block',
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 16px'
                    }}>
                        Recibe tu equipo de forma rÃ¡pida y segura
                    </Text>
                </div>

                {/* Shipping Options */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                    gap: 24,
                    marginBottom: 40
                }}>
                    <div className="glass-panel" style={{
                        padding: 'clamp(24px, 5vw, 32px)',
                        borderRadius: '20px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 'clamp(40px, 8vw, 48px)', marginBottom: 16 }}>âš¡</div>
                        <Text variant="header-2" style={{
                            color: 'var(--lp-text-primary)',
                            marginBottom: 12,
                            fontSize: 'clamp(18px, 3.5vw, 22px)'
                        }}>
                            EnvÃ­o Express Lima
                        </Text>
                        <Text style={{
                            color: '#22c55e',
                            fontSize: 'clamp(20px, 4vw, 24px)',
                            fontWeight: 700,
                            marginBottom: 8
                        }}>
                            24-48 horas
                        </Text>
                        <Text style={{
                            color: 'var(--lp-text-secondary)',
                            fontSize: 'clamp(13px, 2.5vw, 15px)'
                        }}>
                            Gratis en compras mayores a S/ 500
                        </Text>
                    </div>

                    <div className="glass-panel" style={{
                        padding: 'clamp(24px, 5vw, 32px)',
                        borderRadius: '20px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 'clamp(40px, 8vw, 48px)', marginBottom: 16 }}>ðŸ“¦</div>
                        <Text variant="header-2" style={{
                            color: 'var(--lp-text-primary)',
                            marginBottom: 12,
                            fontSize: 'clamp(18px, 3.5vw, 22px)'
                        }}>
                            EnvÃ­o Nacional
                        </Text>
                        <Text style={{
                            color: '#22c55e',
                            fontSize: 'clamp(20px, 4vw, 24px)',
                            fontWeight: 700,
                            marginBottom: 8
                        }}>
                            3-5 dÃ­as
                        </Text>
                        <Text style={{
                            color: 'var(--lp-text-secondary)',
                            fontSize: 'clamp(13px, 2.5vw, 15px)'
                        }}>
                            A todo el PerÃº vÃ­a courier certificado
                        </Text>
                    </div>

                    <div className="glass-panel" style={{
                        padding: 'clamp(24px, 5vw, 32px)',
                        borderRadius: '20px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 'clamp(40px, 8vw, 48px)', marginBottom: 16 }}>ðŸª</div>
                        <Text variant="header-2" style={{
                            color: 'var(--lp-text-primary)',
                            marginBottom: 12,
                            fontSize: 'clamp(18px, 3.5vw, 22px)'
                        }}>
                            Recojo en Tienda
                        </Text>
                        <Text style={{
                            color: '#22c55e',
                            fontSize: 'clamp(20px, 4vw, 24px)',
                            fontWeight: 700,
                            marginBottom: 8
                        }}>
                            Inmediato
                        </Text>
                        <Text style={{
                            color: 'var(--lp-text-secondary)',
                            fontSize: 'clamp(13px, 2.5vw, 15px)'
                        }}>
                            Coordina tu visita y recoge el mismo dÃ­a
                        </Text>
                    </div>
                </div>

                {/* Shipping Process */}
                <div className="glass-panel" style={{
                    padding: 'clamp(24px, 5vw, 40px)',
                    borderRadius: '24px',
                    marginBottom: 32
                }}>
                    <Text variant="header-1" style={{
                        color: 'var(--lp-text-primary)',
                        marginBottom: 24,
                        fontSize: 'clamp(20px, 4vw, 28px)'
                    }}>
                        Proceso de EnvÃ­o
                    </Text>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {[
                            { step: '1', title: 'ConfirmaciÃ³n de Pedido', desc: 'RecibirÃ¡s un email con los detalles de tu compra' },
                            { step: '2', title: 'PreparaciÃ³n', desc: 'Empacamos tu equipo con materiales premium de protecciÃ³n' },
                            { step: '3', title: 'EnvÃ­o', desc: 'Te enviamos el cÃ³digo de tracking para seguimiento en tiempo real' },
                            { step: '4', title: 'Entrega', desc: 'Recibes tu equipo con firma de conformidad' }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #22c55e, #10b981)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    fontWeight: 900,
                                    color: 'var(--lp-text-primary)'
                                }}>
                                    {item.step}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Text variant="subheader-2" style={{
                                        color: 'var(--lp-text-primary)',
                                        marginBottom: 8,
                                        fontSize: 'clamp(16px, 3vw, 18px)'
                                    }}>
                                        {item.title}
                                    </Text>
                                    <Text style={{
                                        color: 'var(--lp-text-secondary)',
                                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                                        lineHeight: 1.6
                                    }}>
                                        {item.desc}
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping Costs */}
                <div className="glass-panel" style={{
                    padding: 'clamp(24px, 5vw, 40px)',
                    borderRadius: '24px',
                    marginBottom: 32
                }}>
                    <Text variant="header-1" style={{
                        color: 'var(--lp-text-primary)',
                        marginBottom: 24,
                        fontSize: 'clamp(20px, 4vw, 28px)'
                    }}>
                        Costos de EnvÃ­o
                    </Text>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { zone: 'Lima Metropolitana', cost: 'GRATIS (compras +S/ 500)' },
                            { zone: 'Lima Metropolitana (compras -S/ 500)', cost: 'S/ 15' },
                            { zone: 'Provincias (Costa)', cost: 'S/ 25' },
                            { zone: 'Provincias (Sierra/Selva)', cost: 'S/ 35' }
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: 'clamp(12px, 2.5vw, 16px)',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.02)',
                                gap: 16,
                                flexWrap: 'wrap'
                            }}>
                                <Text style={{
                                    color: 'var(--lp-text-primary)',
                                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                                }}>
                                    {item.zone}
                                </Text>
                                <Text style={{
                                    color: item.cost.includes('GRATIS') ? '#22c55e' : '#fff',
                                    fontWeight: 700,
                                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                                }}>
                                    {item.cost}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Packaging */}
                <div className="glass-panel" style={{
                    padding: 'clamp(24px, 5vw, 40px)',
                    borderRadius: '24px',
                    marginBottom: 32
                }}>
                    <Text variant="header-1" style={{
                        color: 'var(--lp-text-primary)',
                        marginBottom: 24,
                        fontSize: 'clamp(20px, 4vw, 28px)'
                    }}>
                        Empaque Premium
                    </Text>

                    <Text style={{
                        color: 'var(--lp-text-secondary)',
                        marginBottom: 20,
                        lineHeight: 1.7,
                        fontSize: 'clamp(14px, 2.5vw, 16px)'
                    }}>
                        Cada equipo se envÃ­a en una caja reforzada con:
                    </Text>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                        gap: 16
                    }}>
                        {[
                            'ðŸ“¦ Caja doble pared',
                            'ðŸ›¡ï¸ ProtecciÃ³n de burbujas',
                            'ðŸ“± Funda protectora',
                            'ðŸ”’ Sello de seguridad',
                            'ðŸ“„ DocumentaciÃ³n incluida',
                            'â™»ï¸ Materiales reciclables'
                        ].map((item, i) => (
                            <div key={i} style={{
                                padding: 'clamp(10px, 2vw, 12px)',
                                borderRadius: '8px',
                                background: 'rgba(34,197,94,0.05)',
                                border: '1px solid rgba(34,197,94,0.1)',
                                textAlign: 'center'
                            }}>
                                <Text style={{
                                    color: 'var(--lp-text-primary)',
                                    fontSize: 'clamp(13px, 2.5vw, 14px)'
                                }}>
                                    {item}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="glass-panel" style={{
                    padding: 'clamp(32px, 6vw, 40px)',
                    borderRadius: '24px',
                    textAlign: 'center',
                    background: 'rgba(34,197,94,0.05)'
                }}>
                    <Text variant="header-1" style={{
                        color: 'var(--lp-text-primary)',
                        fontSize: 'clamp(20px, 4vw, 28px)',
                        display: 'block',
                        marginBottom: 20
                    }}>
                        Â¿Tienes dudas sobre tu envÃ­o?
                    </Text>

                    <Text style={{
                        color: 'var(--lp-text-secondary)',
                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                        display: 'block',
                        marginBottom: 28
                    }}>
                        ContÃ¡ctanos para mÃ¡s informaciÃ³n
                    </Text>

                    <Link href="/info/contacto">
                        <button style={{
                            background: 'linear-gradient(135deg, #22c55e, #10b981)',
                            color: 'var(--lp-text-primary)',
                            padding: 'clamp(12px, 2vw, 14px) clamp(24px, 4vw, 32px)',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: 'clamp(14px, 2.5vw, 16px)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 0 30px rgba(34,197,94,0.3)'
                        }}>
                            ContÃ¡ctanos
                        </button>
                    </Link>
                </div>
            </Container>
        </main>
    );
}
