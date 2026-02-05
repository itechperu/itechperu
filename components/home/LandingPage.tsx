'use client';

import React, { useState } from 'react';
import { Container, Text, Button, Icon } from '@gravity-ui/uikit';
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import Link from 'next/link';
import { ProductList } from '@/app/components/ProductList';

interface LandingPageProps {
    products: any[];
}

export function LandingPage({ products }: LandingPageProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <main style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}>

            {/* Background Ambient Glows - Positioned safely */}
            <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }} />
            <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: 'clamp(400px, 60vw, 800px)', height: 'clamp(400px, 60vw, 800px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }} />

            {/* --- HERO SECTION --- */}
            <section style={{
                padding: 'clamp(80px, 15vw, 140px) 20px clamp(40px, 10vw, 80px)',
                textAlign: 'center',
                position: 'relative'
            }}>
                <Container maxWidth="m">
                    {/* Refurbished Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(6px, 1.5vw, 10px) clamp(16px, 3vw, 24px)',
                        borderRadius: '50px',
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        backdropFilter: 'blur(10px)',
                        marginBottom: 'clamp(24px, 5vw, 32px)'
                    }}>
                        <span style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>♻️</span>
                        <Text style={{
                            color: '#22c55e',
                            letterSpacing: '1.5px',
                            fontSize: 'clamp(11px, 2.5vw, 13px)',
                            fontWeight: 700,
                            textTransform: 'uppercase'
                        }}>
                            Certificado Refurbished Premium
                        </Text>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(36px, 8vw, 76px)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: 'clamp(20px, 4vw, 32px)',
                        background: 'linear-gradient(to bottom, var(--lp-text-gradient-start), var(--lp-text-gradient-end))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))',
                        padding: '0 10px'
                    }}>
                        Tecnología Premium<br />
                        <span style={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Reacondicionada</span>
                    </h1>

                    <Text variant="body-2" style={{
                        color: 'var(--lp-text-secondary)',
                        fontSize: 'clamp(16px, 4vw, 22px)',
                        maxWidth: '700px',
                        margin: '0 auto clamp(24px, 5vw, 40px)',
                        display: 'block',
                        lineHeight: 1.6,
                        padding: '0 16px'
                    }}>
                        Equipos Apple seleccionados, restaurados por expertos y certificados.<br className="hidden-mobile" />
                        <strong style={{ color: 'var(--lp-text-primary)' }}>Hasta 60% menos</strong> que nuevos. <strong style={{ color: '#22c55e' }}>100% de garantía</strong>.
                    </Text>

                    {/* Trust Pills - Horizontal Scroll on small mobile if needed, or wrap */}
                    <div style={{
                        display: 'flex',
                        gap: 'clamp(8px, 2vw, 16px)',
                        justifyContent: 'center',
                        marginBottom: 'clamp(32px, 6vw, 48px)',
                        flexWrap: 'wrap',
                        padding: '0 16px'
                    }}>
                        {['✓ Inspección 50 Puntos', '✓ Garantía 12 Meses', '✓ Batería Nueva'].map((badge, i) => (
                            <div key={i} style={{
                                padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 20px)',
                                borderRadius: '20px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: 'clamp(12px, 3vw, 15px)',
                                color: 'var(--lp-text-secondary)',
                                fontWeight: 500,
                                whiteSpace: 'nowrap'
                            }}>
                                {badge}
                            </div>
                        ))}
                    </div>

                    <div className="hero-buttons" style={{
                        display: 'flex',
                        gap: 'clamp(16px, 3vw, 24px)',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        padding: '0 16px'
                    }}>
                        <Link href="#products">
                            <Button view="action" size="xl" style={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                                color: '#fff',
                                padding: '0 clamp(32px, 6vw, 48px)',
                                borderRadius: '50px',
                                fontSize: 'clamp(14px, 3vw, 16px)',
                                fontWeight: 700,
                                boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)',
                                border: 'none',
                                height: 'clamp(48px, 10vw, 56px)',
                                width: '100%'
                            }} className="w-full-mobile">
                                Ver Equipos Certificados
                            </Button>
                        </Link>
                        <Link href="#proceso">
                            <Button view="outlined" size="xl" style={{
                                borderColor: 'var(--lp-glass-border)',
                                color: 'var(--lp-text-primary)',
                                borderRadius: '50px',
                                backdropFilter: 'blur(10px)',
                                padding: '0 clamp(24px, 5vw, 32px)',
                                fontSize: 'clamp(14px, 3vw, 16px)',
                                height: 'clamp(48px, 10vw, 56px)',
                                width: '100%'
                            }} className="w-full-mobile">
                                Cómo Funciona
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>

            {/* --- VISUAL DIVIDER --- */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)', margin: '0' }} />

            {/* --- REFURBISHMENT PROCESS --- */}
            <section id="proceso" style={{ padding: 'clamp(60px, 10vw, 100px) 20px', position: 'relative' }}>
                <Container>
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 70px)' }}>
                        <Text variant="display-2" style={{
                            color: 'var(--lp-text-primary)',
                            fontWeight: 800,
                            marginBottom: 20,
                            display: 'block',
                            fontSize: 'clamp(28px, 6vw, 48px)'
                        }}>
                            Proceso de Certificación
                        </Text>
                        <Text style={{
                            color: 'var(--lp-text-secondary)',
                            fontSize: 'clamp(16px, 3vw, 20px)',
                            display: 'block',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Cada equipo pasa por nuestro riguroso proceso de 50 puntos de inspección
                        </Text>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                        gap: 'clamp(24px, 4vw, 32px)'
                    }}>
                        {[
                            {
                                step: '01',
                                title: 'Inspección Técnica',
                                desc: 'Diagnóstico completo de hardware y software. Verificamos que todos los componentes sean originales y funcionen correctamente.',
                                icon: '🔍'
                            },
                            {
                                step: '02',
                                title: 'Restauración Premium',
                                desc: 'Limpieza profunda profesional, reemplazo de batería si es necesario y cambio de componentes desgastados por originales.',
                                icon: '⚙️'
                            },
                            {
                                step: '03',
                                title: 'Certificación Final',
                                desc: 'Pruebas exhaustivas de rendimiento, actualización del sistema operativo y sellado con garantía extendida de 12 meses.',
                                icon: '✓'
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel hover-card" style={{
                                padding: 'clamp(24px, 5vw, 40px) clamp(20px, 4vw, 32px)',
                                borderRadius: '24px',
                                transition: 'all 0.3s',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    fontSize: 'clamp(32px, 6vw, 48px)',
                                    fontWeight: 900,
                                    color: 'rgba(34,197,94,0.08)'
                                }}>
                                    {item.step}
                                </div>
                                <div style={{ fontSize: 'clamp(32px, 6vw, 48px)', marginBottom: 20 }}>{item.icon}</div>
                                <Text variant="header-2" style={{
                                    color: 'var(--lp-text-primary)',
                                    marginBottom: 12,
                                    display: 'block',
                                    fontSize: 'clamp(20px, 4vw, 24px)',
                                    fontWeight: 700
                                }}>
                                    {item.title}
                                </Text>
                                <Text style={{
                                    color: 'var(--lp-text-secondary)',
                                    lineHeight: 1.6,
                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                    flex: 1
                                }}>
                                    {item.desc}
                                </Text>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* --- BENEFITS GRID --- */}
            <section style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: 'rgba(34,197,94,0.02)' }}>
                <Container>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                        gap: 'clamp(20px, 4vw, 32px)'
                    }}>
                        {[
                            { title: 'Ahorro Inteligente', desc: 'Ahorra hasta 60% comparado con equipos nuevos, sin sacrificar calidad ni rendimiento. Misma tecnología, mejor precio.', icon: '💰' },
                            { title: 'Garantía Premium', desc: '12 meses de cobertura total contra defectos de fabricación. Soporte técnico especializado incluido de por vida.', icon: '🛡️' },
                            { title: 'Impacto Positivo', desc: 'Contribuye al medio ambiente reduciendo tu huella de carbono en aproximadamente 70kg de CO₂ por cada equipo reacondicionado.', icon: '🌱' }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel hover-card" style={{
                                padding: 'clamp(24px, 5vw, 40px)',
                                borderRadius: '24px',
                                transition: 'all 0.3s'
                            }}>
                                <div style={{ fontSize: 'clamp(32px, 5vw, 40px)', marginBottom: 20 }}>{item.icon}</div>
                                <Text variant="header-2" style={{
                                    color: '#fff',
                                    marginBottom: 12,
                                    display: 'block',
                                    fontSize: 'clamp(18px, 4vw, 22px)',
                                    fontWeight: 700
                                }}>
                                    {item.title}
                                </Text>
                                <Text style={{
                                    color: '#94a3b8',
                                    lineHeight: 1.6,
                                    fontSize: 'clamp(14px, 3vw, 16px)'
                                }}>
                                    {item.desc}
                                </Text>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* --- PRODUCT LIST --- */}
            <div id="products" style={{ position: 'relative', padding: 'clamp(60px, 10vw, 100px) 0' }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)', padding: '0 20px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        background: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        marginBottom: 16
                    }}>
                        <Text style={{
                            color: '#22c55e',
                            fontSize: 'clamp(11px, 2.5vw, 12px)',
                            fontWeight: 600,
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            Equipos Disponibles
                        </Text>
                    </div>
                    <Text variant="display-2" style={{
                        color: 'var(--lp-text-primary)',
                        fontWeight: 800,
                        display: 'block',
                        marginBottom: 16,
                        fontSize: 'clamp(28px, 6vw, 48px)'
                    }}>
                        Selección Premium
                    </Text>
                    <Text style={{
                        color: 'var(--lp-text-secondary)',
                        fontSize: 'clamp(16px, 3vw, 18px)',
                        display: 'block',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Todos certificados y listos para usar
                    </Text>
                </div>
                <ProductList products={products} />
            </div>

            {/* --- TESTIMONIALS SECTION --- */}
            <section style={{ padding: 'clamp(60px, 10vw, 100px) 20px', position: 'relative' }}>
                <Container maxWidth="l">
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
                        <Text variant="display-2" style={{
                            color: 'var(--lp-text-primary)',
                            fontWeight: 800,
                            marginBottom: 20,
                            display: 'block',
                            fontSize: 'clamp(28px, 6vw, 48px)'
                        }}>
                            Lo que dicen nuestros usuarios
                        </Text>
                        <Text style={{
                            color: 'var(--lp-text-secondary)',
                            fontSize: 'clamp(16px, 3vw, 18px)',
                            display: 'block',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Miles de peruanos ya confían en iTech Peru
                        </Text>
                    </div>

                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                        {/* Navigation Buttons */}
                        <div className="desktop-arrows" style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            right: 0,
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0 10px',
                            zIndex: 10
                        }}>
                            <Button view="flat" size="l" style={{
                                pointerEvents: 'auto',
                                borderRadius: '50%',
                                width: 48,
                                height: 48,
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--lp-text-primary)',
                                backdropFilter: 'blur(4px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }} onClick={() => {
                                const container = document.querySelector('.testimonials-scroll');
                                if (container) {
                                    // Scroll by roughly one card width
                                    const cardWidth = container.querySelector('.testimonial-card')?.clientWidth || 350;
                                    container.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
                                }
                            }}>
                                <Icon data={ChevronLeft} size={24} />
                            </Button>
                            <Button view="flat" size="l" style={{
                                pointerEvents: 'auto',
                                borderRadius: '50%',
                                width: 48,
                                height: 48,
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--lp-text-primary)',
                                backdropFilter: 'blur(4px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }} onClick={() => {
                                const container = document.querySelector('.testimonials-scroll');
                                if (container) {
                                    const cardWidth = container.querySelector('.testimonial-card')?.clientWidth || 350;
                                    container.scrollBy({ left: (cardWidth + 24), behavior: 'smooth' });
                                }
                            }}>
                                <Icon data={ChevronRight} size={24} />
                            </Button>
                        </div>

                        <div style={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: '24px',
                            padding: '20px 4px',
                            scrollSnapType: 'x mandatory',
                            scrollbarWidth: 'none',
                            alignItems: 'stretch'
                        }} className="testimonials-scroll">
                            {[
                                { text: "Vendí mi iPhone 13 Pro Max al toque. Me ofrecieron un precio justo y la transferencia fue inmediata. ¡Súper seguro!", author: "Javier M.", role: "Vendedor" },
                                { text: "Compré una MacBook Air M1 y está impecable, parece nueva. La atención por WhatsApp fue A1 en todo momento.", author: "Sofía R.", role: "Comprador" },
                                { text: "Tenía miedo de vender mi celular por Facebook, pero aquí vinieron a mi oficina, revisaron todo y me pagaron. Recomendado.", author: "Miguel Ángel C.", role: "Vendedor" },
                                { text: "El iPhone 12 que pedí llegó con batería al 100% y sin rayones. Además me dieron garantía de un año. ¡Gracias!", author: "Andrea V.", role: "Comprador" },
                                { text: "Excelente servicio de renovación. Entregué mi iPhone anterior y me llevé uno más moderno pagando la diferencia.", author: "Carlos T.", role: "Comprador" },
                                { text: "Me gusta que sean transparentes con el estado del equipo. Las fotos eran reales y el producto tal cual la descripción.", author: "Fiorella P.", role: "Comprador" },
                                { text: "Venta rápida y sin rodeos. Revisaron mi equipo en 15 minutos y procedieron con el pago. Muy profesionales.", author: "Ricardo O.", role: "Vendedor" },
                                { text: "Ya es el tercer equipo que compro para mi empresa con ustedes. Factura, garantía y buenos precios.", author: "Pedro S.", role: "Comprador Corporativo" },
                                { text: "Me salvó la vida el envío express, necesitaba el celular para un viaje y llegó en menos de 24 horas.", author: "Lucía G.", role: "Comprador" },
                                { text: "La atención post-venta es lo mejor. Tuve una duda con la configuración y me ayudaron al instante.", author: "Juan Diego L.", role: "Comprador" },
                                { text: "Vendí mi iPad que ya no usaba. Mejor precio que en las tiendas de Apple y mucho más rápido.", author: "Carmen B.", role: "Vendedor" },
                                { text: "Compré un Apple Watch reacondicionado y funciona perfecto para mis entrenamientos. ¡Un golazo!", author: "Roberto K.", role: "Comprador" },
                                { text: "Seguridad total. No tienes que encontrarte con extraños en la calle. Todo es formal y verificado.", author: "Elena M.", role: "Vendedor" },
                                { text: "Buscaba un iPhone para mi hija y encontré uno en estado 'Bueno' que se ve excelente. Ahorré bastante.", author: "Patricia Z.", role: "Comprador" },
                                { text: "El proceso de certificación me dio confianza. Saber que revisan 50 puntos antes de venderlo es clave.", author: "Jorge A.", role: "Comprador" },
                                { text: "Trato directo y amable. Se nota que saben de productos Apple. Resolvieron todas mis dudas.", author: "Mariana F.", role: "Vendedor" },
                                { text: "Tenía dudas sobre la batería, pero vino con 95% de condición. Dura todo el día sin problemas.", author: "Luis G.", role: "Comprador" },
                                { text: "Pude pagar con tarjeta de crédito en cuotas, lo cual me facilitó mucho la compra de mi nueva Mac.", author: "Vanessa Q.", role: "Comprador" },
                                { text: "Lo mejor es la garantía. Saber que si pasa algo responden es una tranquilidad que no te da marketplace.", author: "Fernando D.", role: "Comprador" },
                                { text: "Recomendadísimos. Vendí un iPhone y compré otro ahí mismo. Todo en una sola cita. Práctico y seguro.", author: "Augusto P.", role: "Cliente Frecuente" }
                            ].map((testimonial, i) => (
                                <div key={i} className="glass-panel hover-card testimonial-card" style={{
                                    flex: '0 0 auto',
                                    // Mobile default, overridden by CSS
                                    width: '85vw',
                                    padding: 'clamp(24px, 5vw, 32px)',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16,
                                    scrollSnapAlign: 'start',
                                    backgroundColor: 'rgba(10, 10, 15, 0.4)'
                                }}>
                                    {/* Stars */}
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span key={star} style={{ color: '#fbbf24', fontSize: '18px' }}>★</span>
                                        ))}
                                    </div>

                                    <Text style={{
                                        color: 'var(--lp-text-secondary)',
                                        fontStyle: 'italic',
                                        fontSize: '15px',
                                        lineHeight: 1.6,
                                        flex: 1
                                    }}>
                                        "{testimonial.text}"
                                    </Text>

                                    <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
                                        <Text style={{
                                            color: 'var(--lp-text-primary)',
                                            fontWeight: 700,
                                            display: 'block',
                                            marginBottom: 2
                                        }}>
                                            {testimonial.author}
                                        </Text>
                                        <Text style={{
                                            color: 'var(--lp-text-secondary)',
                                            fontSize: '13px',
                                            opacity: 0.8
                                        }}>
                                            {testimonial.role}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* --- FAQ SECTION --- */}
            <section style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }}>
                <Container maxWidth="m">
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
                        <Text variant="display-2" style={{
                            color: '#fff',
                            fontWeight: 800,
                            marginBottom: 20,
                            display: 'block',
                            fontSize: 'clamp(28px, 6vw, 48px)'
                        }}>
                            Preguntas Frecuentes
                        </Text>
                        <Text style={{
                            color: '#94a3b8',
                            fontSize: 'clamp(16px, 3vw, 18px)',
                            display: 'block',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Todo lo que necesitas saber sobre nuestros equipos
                        </Text>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            {
                                q: '¿Qué significa "Refurbished" o "Reacondicionado"?',
                                a: 'Son equipos de segunda mano que han pasado por un riguroso proceso de inspección, limpieza y restauración profesional. Cada dispositivo es probado en más de 50 puntos de control para garantizar que funcione como nuevo.'
                            },
                            {
                                q: '¿Los equipos tienen garantía?',
                                a: 'Sí, todos nuestros productos incluyen 12 meses de garantía extendida. Esto cubre cualquier falla de hardware o defecto de fabricación que pueda presentarse.'
                            },
                            {
                                q: '¿Son originales de Apple?',
                                a: 'Sí, todos nuestros productos son 100% originales de Apple. Verificamos la autenticidad de cada componente durante nuestro proceso de certificación de 50 puntos.'
                            },
                            {
                                q: '¿Cuál es la diferencia entre las condiciones?',
                                a: 'La condición se refiere únicamente al estado estético del equipo. "Excelente" tiene mínimas marcas de uso, "Muy Bueno" puede tener pequeños rayones superficiales. Todos funcionan perfectamente independientemente de la condición estética.'
                            },
                            {
                                q: '¿Puedo devolver un producto?',
                                a: 'Sí, tienes 7 días desde la recepción del producto para devolverlo si no estás completamente satisfecho. El equipo debe estar en las mismas condiciones en que lo recibiste.'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="glass-panel" style={{
                                padding: 'clamp(20px, 4vw, 28px)',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                border: openFaq === index ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.05)',
                                background: openFaq === index ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.03)'
                            }}
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                                    <Text variant="subheader-2" style={{
                                        color: '#fff',
                                        fontWeight: 600,
                                        fontSize: 'clamp(15px, 3.5vw, 18px)',
                                        flex: 1
                                    }}>
                                        {faq.q}
                                    </Text>
                                    <span style={{
                                        color: '#22c55e',
                                        fontSize: '24px',
                                        transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s',
                                        flexShrink: 0
                                    }}>
                                        ▼
                                    </span>
                                </div>
                                {openFaq === index && (
                                    <div style={{ marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                                        <Text style={{
                                            color: '#94a3b8',
                                            lineHeight: 1.7,
                                            display: 'block',
                                            fontSize: 'clamp(14px, 3vw, 16px)'
                                        }}>
                                            {faq.a}
                                        </Text>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 6vw, 40px)' }}>
                        <Link href="/info/faq">
                            <Button view="outlined" size="xl" style={{
                                borderColor: 'rgba(34,197,94,0.3)',
                                color: '#22c55e',
                                borderRadius: '50px',
                                padding: '0 clamp(24px, 5vw, 32px)',
                                fontSize: 'clamp(14px, 3vw, 16px)'
                            }}>
                                Ver Todas las Preguntas
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                .glass-panel:hover {
                    box-shadow: 0 15px 40px rgba(0,0,0,0.5);
                    border-color: rgba(34,197,94,0.3);
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                }
                
                /* Testimonial Card Width Logic */
                .testimonial-card {
                    --card-width: 100%; /* Default mobile - One card at a time */
                }
                
                @media (min-width: 768px) {
                    .testimonial-card {
                         --card-width: calc((100% - 24px) / 2); /* Tablet: 2 items */
                    }
                }
                
                @media (min-width: 1024px) {
                    .testimonial-card {
                        --card-width: calc((100% - 48px) / 3); /* Desktop: 3 items exactly (2 gaps of 24px) */
                    }
                }

                @media (max-width: 480px) {
                    .w-full-mobile {
                        width: 100% !important;
                        display: flex !important;
                        justify-content: center !important;
                    }
                    .hidden-mobile {
                        display: none;
                    }
                    /* Hide arrows on mobile to prefer swipe */
                    .desktop-arrows {
                        display: none !important;
                    }
                }
            `}} />
        </main>
    );
}
