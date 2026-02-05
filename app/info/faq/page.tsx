'use client';

import React from 'react';
import { Container, Text } from '@gravity-ui/uikit';
import Link from 'next/link';

export default function FAQPage() {
    const faqs = [
        {
            question: "Â¿QuÃ© significa 'Refurbished' o 'Reacondicionado'?",
            answer: "Son equipos de segunda mano que han pasado por un riguroso proceso de inspecciÃ³n, limpieza y restauraciÃ³n. Cada dispositivo es probado en mÃ¡s de 50 puntos de control para garantizar que funcione como nuevo."
        },
        {
            question: "Â¿Los equipos tienen garantÃ­a?",
            answer: "SÃ­, todos nuestros productos incluyen 12 meses de garantÃ­a extendida. Esto cubre cualquier falla de hardware o defecto de fabricaciÃ³n."
        },
        {
            question: "Â¿QuÃ© incluye el proceso de certificaciÃ³n?",
            answer: "Nuestro proceso incluye: diagnÃ³stico completo de hardware y software, limpieza profunda, reemplazo de baterÃ­a (si es necesario), actualizaciÃ³n de componentes desgastados, y pruebas de rendimiento exhaustivas."
        },
        {
            question: "Â¿Puedo devolver un producto?",
            answer: "SÃ­, tienes 7 dÃ­as desde la recepciÃ³n del producto para devolverlo si no estÃ¡s satisfecho. El equipo debe estar en las mismas condiciones en que lo recibiste."
        },
        {
            question: "Â¿Los equipos son originales de Apple?",
            answer: "SÃ­, todos nuestros productos son 100% originales de Apple. Verificamos la autenticidad de cada componente durante el proceso de certificaciÃ³n."
        },
        {
            question: "Â¿CuÃ¡l es la diferencia entre las condiciones (Excelente, Muy Bueno, etc.)?",
            answer: "La condiciÃ³n se refiere al estado estÃ©tico del equipo. 'Excelente' tiene mÃ­nimas marcas de uso, 'Muy Bueno' puede tener pequeÃ±os rayones, etc. Todos funcionan perfectamente independientemente de la condiciÃ³n estÃ©tica."
        },
        {
            question: "Â¿Puedo comprar en cuotas?",
            answer: "Próximamente habilitaremos opciones de financiamiento. Por ahora aceptamos pago al contado mediante transferencia bancaria o tarjeta."
        },
        {
            question: "Â¿Hacen envÃ­os a provincias?",
            answer: "SÃ­, realizamos envÃ­os a todo el PerÃº. Los tiempos de entrega varÃ­an segÃºn la ubicaciÃ³n: Lima 24-48h, provincias 3-5 dÃ­as hÃ¡biles."
        }
    ];

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

                    <Text variant="display-2" style={{
                        color: 'var(--lp-text-primary)',
                        fontWeight: 800,
                        marginBottom: 20,
                        display: 'block',
                        fontSize: 'clamp(28px, 6vw, 48px)'
                    }}>
                        Preguntas Frecuentes
                    </Text>

                    <Text style={{
                        color: 'var(--lp-text-secondary)',
                        fontSize: 'clamp(16px, 3vw, 18px)',
                        display: 'block',
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 16px'
                    }}>
                        Todo lo que necesitas saber sobre nuestros equipos refurbished
                    </Text>
                </div>

                {/* FAQ List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {faqs.map((faq, index) => (
                        <div key={index} className="glass-panel" style={{
                            padding: 'clamp(24px, 5vw, 32px)',
                            borderRadius: '20px',
                            transition: 'all 0.3s'
                        }}>
                            <Text variant="header-2" style={{
                                color: 'var(--lp-text-primary)',
                                marginBottom: 16,
                                fontWeight: 700,
                                fontSize: 'clamp(16px, 3.5vw, 20px)',
                                lineHeight: 1.4
                            }}>
                                {faq.question}
                            </Text>
                            <Text style={{
                                color: 'var(--lp-text-secondary)',
                                lineHeight: 1.7,
                                fontSize: 'clamp(14px, 2.5vw, 16px)'
                            }}>
                                {faq.answer}
                            </Text>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="glass-panel" style={{
                    padding: 'clamp(32px, 6vw, 40px)',
                    borderRadius: '24px',
                    textAlign: 'center',
                    marginTop: 60,
                    background: 'rgba(34,197,94,0.05)'
                }}>
                    <Text variant="header-1" style={{
                        color: 'var(--lp-text-primary)',
                        fontSize: 'clamp(20px, 4vw, 28px)',
                        display: 'block',
                        marginBottom: 20
                    }}>
                        Â¿Tienes mÃ¡s preguntas?
                    </Text>

                    <Text style={{
                        color: 'var(--lp-text-secondary)',
                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                        display: 'block',
                        marginBottom: 28
                    }}>
                        Estamos aquÃ­ para ayudarte
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
