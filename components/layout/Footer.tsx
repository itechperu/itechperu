'use client';

import React from 'react';
import { Text, Container } from '@gravity-ui/uikit';
import Link from 'next/link';

export function Footer() {
    return (
        <footer style={{
            backgroundColor: '#0a0a0a',
            color: 'var(--lp-text-primary)',
            padding: 'clamp(60px, 10vw, 80px) 0 20px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
            <Container>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                    gap: 'clamp(32px, 6vw, 48px)',
                    marginBottom: 'clamp(40px, 8vw, 60px)'
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{
                                width: 'clamp(32px, 6vw, 40px)',
                                height: 'clamp(32px, 6vw, 40px)',
                                background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--lp-text-primary)',
                                fontWeight: 900,
                                fontSize: 'clamp(16px, 3vw, 20px)',
                                boxShadow: '0 0 15px rgba(34,197,94,0.3)'
                            }}>iT</div>
                            <Text variant="header-2" style={{
                                color: 'var(--lp-text-primary)',
                                fontWeight: 700,
                                fontSize: 'clamp(18px, 3.5vw, 22px)'
                            }}>
                                iTech<span style={{ color: '#22c55e' }}>Peru</span>
                            </Text>
                        </div>
                        <Text style={{
                            color: 'var(--lp-text-secondary)',
                            lineHeight: 1.6,
                            fontSize: 'clamp(13px, 2.5vw, 14px)'
                        }}>
                            TecnologÃ­a premium reacondicionada. Compra inteligente, sostenible y con garantÃ­a.
                        </Text>
                        <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                            <span style={{
                                fontSize: 'clamp(20px, 4vw, 24px)',
                                cursor: 'pointer',
                                opacity: 0.7,
                                transition: 'opacity 0.2s'
                            }}>ðŸ“±</span>
                            <span style={{
                                fontSize: 'clamp(20px, 4vw, 24px)',
                                cursor: 'pointer',
                                opacity: 0.7,
                                transition: 'opacity 0.2s'
                            }}>ðŸ’¬</span>
                            <span style={{
                                fontSize: 'clamp(20px, 4vw, 24px)',
                                cursor: 'pointer',
                                opacity: 0.7,
                                transition: 'opacity 0.2s'
                            }}>ðŸ“§</span>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <Text variant="subheader-2" style={{
                            color: 'var(--lp-text-primary)',
                            marginBottom: 20,
                            display: 'block',
                            fontWeight: 700,
                            fontSize: 'clamp(16px, 3vw, 18px)'
                        }}>
                            Comprar
                        </Text>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12
                        }}>
                            {['iPhone', 'MacBook', 'iPad', 'Watch'].map((item) => (
                                <li key={item}>
                                    <Link href={`/shop?cat=${item}`} style={{
                                        color: 'var(--lp-text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        fontSize: 'clamp(13px, 2.5vw, 15px)'
                                    }}>
                                        {item === 'Watch' ? 'Apple Watch' : item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <Text variant="subheader-2" style={{
                            color: 'var(--lp-text-primary)',
                            marginBottom: 20,
                            display: 'block',
                            fontWeight: 700,
                            fontSize: 'clamp(16px, 3vw, 18px)'
                        }}>
                            Soporte
                        </Text>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12
                        }}>
                            {[
                                { label: 'Preguntas Frecuentes', href: '/info/faq' },
                                { label: 'GarantÃ­a', href: '/info/garantia' },
                                { label: 'EnvÃ­os', href: '/info/envios' },
                                { label: 'Contacto', href: '/info/contacto' }
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} style={{
                                        color: 'var(--lp-text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        fontSize: 'clamp(13px, 2.5vw, 15px)'
                                    }}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <Text variant="subheader-2" style={{
                            color: 'var(--lp-text-primary)',
                            marginBottom: 20,
                            display: 'block',
                            fontWeight: 700,
                            fontSize: 'clamp(16px, 3vw, 18px)'
                        }}>
                            Contacto
                        </Text>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12,
                            color: 'var(--lp-text-secondary)',
                            fontSize: 'clamp(13px, 2.5vw, 14px)'
                        }}>
                            <div>
                                <div style={{ marginBottom: 4, color: 'var(--lp-text-primary)', fontWeight: 600 }}>Email</div>
                                <a href="mailto:contacto@itech.pe" style={{
                                    color: 'var(--lp-text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: 'clamp(13px, 2.5vw, 14px)'
                                }}>
                                    contacto@itech.pe
                                </a>
                            </div>
                            <div>
                                <div style={{ marginBottom: 4, color: 'var(--lp-text-primary)', fontWeight: 600 }}>WhatsApp</div>
                                <a href="https://wa.me/51999999999" style={{
                                    color: 'var(--lp-text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: 'clamp(13px, 2.5vw, 14px)'
                                }}>
                                    +51 999 999 999
                                </a>
                            </div>
                            <div>
                                <div style={{ marginBottom: 4, color: 'var(--lp-text-primary)', fontWeight: 600 }}>Horario</div>
                                <div style={{ fontSize: 'clamp(13px, 2.5vw, 14px)' }}>Lun - Vie: 9AM - 7PM</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16
                }}>
                    <Text style={{
                        color: '#6b7280',
                        fontSize: 'clamp(12px, 2.5vw, 14px)'
                    }}>
                        Â© 2024 iTech Peru. Todos los derechos reservados.
                    </Text>
                    <div style={{
                        display: 'flex',
                        gap: 'clamp(16px, 3vw, 24px)',
                        fontSize: 'clamp(12px, 2.5vw, 14px)'
                    }}>
                        <Link href="/info/privacidad" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: 'clamp(12px, 2.5vw, 14px)'
                        }}>
                            Privacidad
                        </Link>
                        <Link href="/info/terminos" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: 'clamp(12px, 2.5vw, 14px)'
                        }}>
                            TÃ©rminos
                        </Link>
                    </div>
                </div>
            </Container>

            <style dangerouslySetInnerHTML={{
                __html: `
                footer a:hover {
                    color: #22c55e !important;
                }
                footer span:hover {
                    opacity: 1 !important;
                    transform: scale(1.1);
                }
            `}} />
        </footer>
    );
}
