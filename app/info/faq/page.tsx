'use client';

import React from 'react';
import { Container, Text } from '@gravity-ui/uikit';
import Link from 'next/link';

export default function FAQPage() {
    const faqs = [
        {
            question: "¿Qué significa 'Refurbished' o 'Reacondicionado'?",
            answer: "Son equipos de segunda mano que han pasado por un riguroso proceso de inspección, limpieza y restauración. Cada dispositivo es probado en más de 50 puntos de control para garantizar que funcione como nuevo."
        },
        {
            question: "¿Los equipos tienen garantía?",
            answer: "Sí, todos nuestros productos incluyen 12 meses de garantía extendida. Esto cubre cualquier falla de hardware o defecto de fabricación."
        },
        {
            question: "¿Qué incluye el proceso de certificación?",
            answer: "Nuestro proceso incluye: diagnóstico completo de hardware y software, limpieza profunda, reemplazo de batería (si es necesario), actualización de componentes desgastados, y pruebas de rendimiento exhaustivas."
        },
        {
            question: "¿Puedo devolver un producto?",
            answer: "Sí, tienes 7 días desde la recepción del producto para devolverlo si no estás satisfecho. El equipo debe estar en las mismas condiciones en que lo recibiste."
        },
        {
            question: "¿Los equipos son originales de Apple?",
            answer: "Sí, todos nuestros productos son 100% originales de Apple. Verificamos la autenticidad de cada componente durante el proceso de certificación."
        },
        {
            question: "¿Cuál es la diferencia entre las condiciones (Excelente, Muy Bueno, etc.)?",
            answer: "La condición se refiere al estado estético del equipo. 'Excelente' tiene mínimas marcas de uso, 'Muy Bueno' puede tener pequeños rayones, etc. Todos funcionan perfectamente independientemente de la condición estética."
        },
        {
            question: "¿Puedo comprar en cuotas?",
            answer: "Próximamente habilitaremos opciones de financiamiento. Por ahora aceptamos pago al contado mediante transferencia bancaria o tarjeta."
        },
        {
            question: "¿Hacen envíos a provincias?",
            answer: "Sí, realizamos envíos a todo el Perú. Los tiempos de entrega varían según la ubicación: Lima 24-48h, provincias 3-5 días hábiles."
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
                            ← Volver a la tienda
                        </Text>
                    </Link>

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
                                color: '#fff',
                                marginBottom: 16,
                                fontWeight: 700,
                                fontSize: 'clamp(16px, 3.5vw, 20px)',
                                lineHeight: 1.4
                            }}>
                                {faq.question}
                            </Text>
                            <Text style={{
                                color: '#94a3b8',
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
                        color: '#fff',
                        fontSize: 'clamp(20px, 4vw, 28px)',
                        display: 'block',
                        marginBottom: 20
                    }}>
                        ¿Tienes más preguntas?
                    </Text>

                    <Text style={{
                        color: '#94a3b8',
                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                        display: 'block',
                        marginBottom: 28
                    }}>
                        Estamos aquí para ayudarte
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
                            Contáctanos
                        </button>
                    </Link>
                </div>
            </Container>
        </main>
    );
}
