'use client';

import React from 'react';
import { Container, Text } from '@gravity-ui/uikit';
import Link from 'next/link';

export default function WarrantyPage() {
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
                            ← Volver a la tienda
                        </Text>
                    </Link>

                    <div style={{ fontSize: 'clamp(48px, 10vw, 64px)', marginBottom: 20 }}>🛡️</div>

                    <Text variant="display-2" style={{
                        color: '#fff',
                        fontWeight: 800,
                        marginBottom: 20,
                        display: 'block',
                        fontSize: 'clamp(28px, 6vw, 48px)'
                    }}>
                        Garantía Premium
                    </Text>

                    <Text style={{
                        color: '#94a3b8',
                        fontSize: 'clamp(16px, 3vw, 18px)',
                        display: 'block',
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 16px'
                    }}>
                        12 meses de protección total para tu tranquilidad
                    </Text>
                </div>

                {/* Warranty Coverage */}
                <div className="glass-panel" style={{
                    padding: 'clamp(24px, 5vw, 40px)',
                    borderRadius: '24px',
                    marginBottom: 32
                }}>
                    <Text variant="header-1" style={{
                        color: '#fff',
                        marginBottom: 24,
                        fontSize: 'clamp(20px, 4vw, 28px)'
                    }}>
                        ¿Qué cubre nuestra garantía?
                    </Text>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {[
                            { icon: '✅', title: 'Defectos de Hardware', desc: 'Cualquier falla en componentes internos (placa madre, procesador, memoria, etc.)' },
                            { icon: '✅', title: 'Problemas de Batería', desc: 'Si la batería no mantiene la carga según especificaciones' },
                            { icon: '✅', title: 'Pantalla y Display', desc: 'Píxeles muertos, manchas o problemas de visualización' },
                            { icon: '✅', title: 'Conectividad', desc: 'Problemas con WiFi, Bluetooth, puertos USB o carga' },
                            { icon: '✅', title: 'Sistema Operativo', desc: 'Fallos de software relacionados con el sistema' }
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                gap: 16,
                                padding: 'clamp(16px, 3vw, 20px)',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.02)',
                                flexDirection: 'row',
                                alignItems: 'flex-start'
                            }}>
                                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <Text variant="subheader-2" style={{
                                        color: '#fff',
                                        marginBottom: 8,
                                        fontSize: 'clamp(16px, 3vw, 18px)'
                                    }}>
                                        {item.title}
                                    </Text>
                                    <Text style={{
                                        color: '#94a3b8',
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

                {/* What's NOT Covered */}
                <div className="glass-panel" style={{
                    padding: 'clamp(24px, 5vw, 40px)',
                    borderRadius: '24px',
                    marginBottom: 32
                }}>
                    <Text variant="header-1" style={{
                        color: '#fff',
                        marginBottom: 24,
                        fontSize: 'clamp(20px, 4vw, 28px)'
                    }}>
                        ¿Qué NO cubre la garantía?
                    </Text>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            'Daños físicos por caídas, golpes o líquidos',
                            'Modificaciones no autorizadas o apertura del equipo',
                            'Daños causados por uso inadecuado o negligencia',
                            'Software de terceros o virus',
                            'Desgaste estético normal (rayones superficiales)'
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                gap: 12,
                                alignItems: 'flex-start',
                                padding: '8px 0'
                            }}>
                                <span style={{ color: '#ef4444', fontSize: '20px', flexShrink: 0 }}>❌</span>
                                <Text style={{
                                    color: '#94a3b8',
                                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                                    lineHeight: 1.6
                                }}>
                                    {item}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How to Claim */}
                <div className="glass-panel" style={{
                    padding: 'clamp(24px, 5vw, 40px)',
                    borderRadius: '24px',
                    marginBottom: 32
                }}>
                    <Text variant="header-1" style={{
                        color: '#fff',
                        marginBottom: 24,
                        fontSize: 'clamp(20px, 4vw, 28px)'
                    }}>
                        ¿Cómo hacer válida la garantía?
                    </Text>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {[
                            { step: '1', title: 'Contacta con nosotros', desc: 'Envía un email a soporte@itech.pe o llámanos' },
                            { step: '2', title: 'Describe el problema', desc: 'Explica detalladamente qué está fallando' },
                            { step: '3', title: 'Envío del equipo', desc: 'Te daremos una dirección para enviar el dispositivo' },
                            { step: '4', title: 'Reparación o reemplazo', desc: 'Evaluamos y reparamos o reemplazamos en 5-7 días' }
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'flex-start',
                                flexDirection: 'row'
                            }}>
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
                                    color: '#fff'
                                }}>
                                    {item.step}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Text variant="subheader-2" style={{
                                        color: '#fff',
                                        marginBottom: 8,
                                        fontSize: 'clamp(16px, 3vw, 18px)'
                                    }}>
                                        {item.title}
                                    </Text>
                                    <Text style={{
                                        color: '#94a3b8',
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

                {/* Contact CTA */}
                <div className="glass-panel" style={{
                    padding: 'clamp(32px, 6vw, 40px)',
                    borderRadius: '24px',
                    textAlign: 'center',
                    background: 'rgba(34,197,94,0.05)'
                }}>
                    <Text variant="header-1" style={{
                        color: '#fff',
                        fontSize: 'clamp(20px, 4vw, 28px)',
                        display: 'block',
                        marginBottom: 20
                    }}>
                        ¿Necesitas hacer válida tu garantía?
                    </Text>

                    <Text style={{
                        color: '#94a3b8',
                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                        display: 'block',
                        marginBottom: 28
                    }}>
                        Nuestro equipo está listo para ayudarte
                    </Text>

                    <Link href="/info/contacto">
                        <button style={{
                            background: 'linear-gradient(135deg, #22c55e, #10b981)',
                            color: '#fff',
                            padding: 'clamp(12px, 2vw, 14px) clamp(24px, 4vw, 32px)',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: 'clamp(14px, 2.5vw, 16px)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 0 30px rgba(34,197,94,0.3)'
                        }}>
                            Contactar Soporte
                        </button>
                    </Link>
                </div>
            </Container>
        </main>
    );
}
