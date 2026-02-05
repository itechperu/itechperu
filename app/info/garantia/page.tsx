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
                            â† Volver a la tienda
                        </Text>
                    </Link>

                    <div style={{ fontSize: 'clamp(48px, 10vw, 64px)', marginBottom: 20 }}>ðŸ›¡ï¸</div>

                    <Text variant="display-2" style={{
                        color: 'var(--lp-text-primary)',
                        fontWeight: 800,
                        marginBottom: 20,
                        display: 'block',
                        fontSize: 'clamp(28px, 6vw, 48px)'
                    }}>
                        GarantÃ­a Premium
                    </Text>

                    <Text style={{
                        color: 'var(--lp-text-secondary)',
                        fontSize: 'clamp(16px, 3vw, 18px)',
                        display: 'block',
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 16px'
                    }}>
                        12 meses de protecciÃ³n total para tu tranquilidad
                    </Text>
                </div>

                {/* Warranty Coverage */}
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
                        Â¿QuÃ© cubre nuestra garantÃ­a?
                    </Text>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {[
                            { icon: 'âœ…', title: 'Defectos de Hardware', desc: 'Cualquier falla en componentes internos (placa madre, procesador, memoria, etc.)' },
                            { icon: 'âœ…', title: 'Problemas de BaterÃ­a', desc: 'Si la baterÃ­a no mantiene la carga segÃºn especificaciones' },
                            { icon: 'âœ…', title: 'Pantalla y Display', desc: 'PÃ­xeles muertos, manchas o problemas de visualizaciÃ³n' },
                            { icon: 'âœ…', title: 'Conectividad', desc: 'Problemas con WiFi, Bluetooth, puertos USB o carga' },
                            { icon: 'âœ…', title: 'Sistema Operativo', desc: 'Fallos de software relacionados con el sistema' }
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

                {/* What's NOT Covered */}
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
                        Â¿QuÃ© NO cubre la garantÃ­a?
                    </Text>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            'DaÃ±os fÃ­sicos por caÃ­das, golpes o lÃ­quidos',
                            'Modificaciones no autorizadas o apertura del equipo',
                            'DaÃ±os causados por uso inadecuado o negligencia',
                            'Software de terceros o virus',
                            'Desgaste estÃ©tico normal (rayones superficiales)'
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                gap: 12,
                                alignItems: 'flex-start',
                                padding: '8px 0'
                            }}>
                                <span style={{ color: '#ef4444', fontSize: '20px', flexShrink: 0 }}>âŒ</span>
                                <Text style={{
                                    color: 'var(--lp-text-secondary)',
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
                        color: 'var(--lp-text-primary)',
                        marginBottom: 24,
                        fontSize: 'clamp(20px, 4vw, 28px)'
                    }}>
                        Â¿CÃ³mo hacer vÃ¡lida la garantÃ­a?
                    </Text>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {[
                            { step: '1', title: 'Contacta con nosotros', desc: 'EnvÃ­a un email a soporte@itech.pe o llÃ¡manos' },
                            { step: '2', title: 'Describe el problema', desc: 'Explica detalladamente quÃ© estÃ¡ fallando' },
                            { step: '3', title: 'EnvÃ­o del equipo', desc: 'Te daremos una direcciÃ³n para enviar el dispositivo' },
                            { step: '4', title: 'ReparaciÃ³n o reemplazo', desc: 'Evaluamos y reparamos o reemplazamos en 5-7 dÃ­as' }
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
                        Â¿Necesitas hacer vÃ¡lida tu garantÃ­a?
                    </Text>

                    <Text style={{
                        color: 'var(--lp-text-secondary)',
                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                        display: 'block',
                        marginBottom: 28
                    }}>
                        Nuestro equipo estÃ¡ listo para ayudarte
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
                            Contactar Soporte
                        </button>
                    </Link>
                </div>
            </Container>
        </main>
    );
}
