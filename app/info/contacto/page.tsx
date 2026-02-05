'use client';

import React, { useState } from 'react';
import { Container, Text, TextInput, Button } from '@gravity-ui/uikit';
import Link from 'next/link';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

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

                    <div style={{ fontSize: 'clamp(48px, 10vw, 64px)', marginBottom: 20 }}>ðŸ’¬</div>

                    <Text variant="display-2" style={{
                        color: 'var(--lp-text-primary)',
                        fontWeight: 800,
                        marginBottom: 20,
                        display: 'block',
                        fontSize: 'clamp(28px, 6vw, 48px)'
                    }}>
                        ContÃ¡ctanos
                    </Text>

                    <Text style={{
                        color: 'var(--lp-text-secondary)',
                        fontSize: 'clamp(16px, 3vw, 18px)',
                        display: 'block',
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 16px'
                    }}>
                        Estamos aquÃ­ para ayudarte con cualquier consulta
                    </Text>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                    gap: 32
                }}>
                    {/* Contact Form */}
                    <div className="glass-panel" style={{
                        padding: 'clamp(24px, 5vw, 40px)',
                        borderRadius: '24px'
                    }}>
                        <Text variant="header-1" style={{
                            color: 'var(--lp-text-primary)',
                            marginBottom: 24,
                            fontSize: 'clamp(20px, 4vw, 28px)'
                        }}>
                            EnvÃ­anos un mensaje
                        </Text>

                        {submitted && (
                            <div style={{
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'rgba(34,197,94,0.1)',
                                border: '1px solid rgba(34,197,94,0.3)',
                                marginBottom: 24
                            }}>
                                <Text style={{
                                    color: '#22c55e',
                                    fontSize: 'clamp(13px, 2.5vw, 15px)'
                                }}>
                                    âœ… Mensaje enviado exitosamente. Te responderemos pronto.
                                </Text>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: 20 }}>
                                <Text style={{
                                    color: 'var(--lp-text-primary)',
                                    marginBottom: 8,
                                    display: 'block',
                                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                                }}>
                                    Nombre Completo
                                </Text>
                                <TextInput
                                    size="xl"
                                    value={formData.name}
                                    onUpdate={(value) => setFormData({ ...formData, name: value })}
                                    placeholder="Juan PÃ©rez"
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <Text style={{
                                    color: 'var(--lp-text-primary)',
                                    marginBottom: 8,
                                    display: 'block',
                                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                                }}>
                                    Email
                                </Text>
                                <TextInput
                                    size="xl"
                                    type="email"
                                    value={formData.email}
                                    onUpdate={(value) => setFormData({ ...formData, email: value })}
                                    placeholder="juan@email.com"
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <Text style={{
                                    color: 'var(--lp-text-primary)',
                                    marginBottom: 8,
                                    display: 'block',
                                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                                }}>
                                    TelÃ©fono
                                </Text>
                                <TextInput
                                    size="xl"
                                    value={formData.phone}
                                    onUpdate={(value) => setFormData({ ...formData, phone: value })}
                                    placeholder="+51 999 999 999"
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <Text style={{
                                    color: 'var(--lp-text-primary)',
                                    marginBottom: 8,
                                    display: 'block',
                                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                                }}>
                                    Mensaje
                                </Text>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Â¿En quÃ© podemos ayudarte?"
                                    rows={5}
                                    style={{
                                        width: '100%',
                                        padding: 'clamp(10px, 2vw, 12px) clamp(14px, 3vw, 16px)',
                                        borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'var(--lp-text-primary)',
                                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                                        fontFamily: 'inherit',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <Button
                                view="action"
                                size="xl"
                                width="max"
                                type="submit"
                                style={{
                                    background: 'linear-gradient(135deg, #22c55e, #10b981)',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                                    padding: 'clamp(12px, 2vw, 16px)'
                                }}
                            >
                                Enviar Mensaje
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <div className="glass-panel" style={{
                            padding: 'clamp(24px, 5vw, 32px)',
                            borderRadius: '24px',
                            marginBottom: 24
                        }}>
                            <Text variant="header-2" style={{
                                color: 'var(--lp-text-primary)',
                                marginBottom: 20,
                                fontSize: 'clamp(18px, 3.5vw, 22px)'
                            }}>
                                InformaciÃ³n de Contacto
                            </Text>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                    <div style={{ fontSize: '24px', flexShrink: 0 }}>ðŸ“§</div>
                                    <div style={{ flex: 1 }}>
                                        <Text style={{
                                            color: 'var(--lp-text-secondary)',
                                            fontSize: 'clamp(13px, 2.5vw, 14px)',
                                            marginBottom: 4
                                        }}>
                                            Email
                                        </Text>
                                        <Text style={{
                                            color: 'var(--lp-text-primary)',
                                            fontWeight: 600,
                                            fontSize: 'clamp(14px, 2.5vw, 16px)'
                                        }}>
                                            contacto@itech.pe
                                        </Text>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                    <div style={{ fontSize: '24px', flexShrink: 0 }}>ðŸ“±</div>
                                    <div style={{ flex: 1 }}>
                                        <Text style={{
                                            color: 'var(--lp-text-secondary)',
                                            fontSize: 'clamp(13px, 2.5vw, 14px)',
                                            marginBottom: 4
                                        }}>
                                            WhatsApp
                                        </Text>
                                        <Text style={{
                                            color: 'var(--lp-text-primary)',
                                            fontWeight: 600,
                                            fontSize: 'clamp(14px, 2.5vw, 16px)'
                                        }}>
                                            +51 999 999 999
                                        </Text>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                    <div style={{ fontSize: '24px', flexShrink: 0 }}>ðŸ“</div>
                                    <div style={{ flex: 1 }}>
                                        <Text style={{
                                            color: 'var(--lp-text-secondary)',
                                            fontSize: 'clamp(13px, 2.5vw, 14px)',
                                            marginBottom: 4
                                        }}>
                                            DirecciÃ³n
                                        </Text>
                                        <Text style={{
                                            color: 'var(--lp-text-primary)',
                                            fontWeight: 600,
                                            fontSize: 'clamp(14px, 2.5vw, 16px)',
                                            lineHeight: 1.5
                                        }}>
                                            Av. Javier Prado 123<br />
                                            San Isidro, Lima - PerÃº
                                        </Text>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                    <div style={{ fontSize: '24px', flexShrink: 0 }}>ðŸ•</div>
                                    <div style={{ flex: 1 }}>
                                        <Text style={{
                                            color: 'var(--lp-text-secondary)',
                                            fontSize: 'clamp(13px, 2.5vw, 14px)',
                                            marginBottom: 4
                                        }}>
                                            Horario de AtenciÃ³n
                                        </Text>
                                        <Text style={{
                                            color: 'var(--lp-text-primary)',
                                            fontWeight: 600,
                                            fontSize: 'clamp(14px, 2.5vw, 16px)',
                                            lineHeight: 1.5
                                        }}>
                                            Lun - Vie: 9:00 AM - 7:00 PM<br />
                                            SÃ¡b: 10:00 AM - 2:00 PM
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{
                            padding: 'clamp(24px, 5vw, 32px)',
                            borderRadius: '24px',
                            background: 'rgba(34,197,94,0.05)'
                        }}>
                            <Text variant="header-2" style={{
                                color: 'var(--lp-text-primary)',
                                marginBottom: 12,
                                fontSize: 'clamp(18px, 3.5vw, 22px)'
                            }}>
                                Respuesta RÃ¡pida
                            </Text>
                            <Text style={{
                                color: 'var(--lp-text-secondary)',
                                lineHeight: 1.6,
                                fontSize: 'clamp(14px, 2.5vw, 16px)'
                            }}>
                                Respondemos todos los mensajes en menos de 24 horas. Para consultas urgentes, contÃ¡ctanos por WhatsApp.
                            </Text>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
