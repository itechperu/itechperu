'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Card, TextInput, Button, Text, Icon } from '@gravity-ui/uikit';
import { Eye, EyeSlash } from '@gravity-ui/icons';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/admin');
                router.refresh();
            }
        } catch (err) {
            setError('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 0%, #1a1b26 0%, #000000 100%)',
            padding: '20px'
        }}>
            <Container maxWidth="s">
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{
                        width: 60,
                        height: 60,
                        background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 0 30px rgba(34,197,94,0.3)'
                    }}>
                        <span style={{ fontSize: '32px', fontWeight: 900, color: '#fff' }}>iT</span>
                    </div>
                    <Text variant="display-1" style={{
                        display: 'block',
                        fontWeight: 800,
                        marginBottom: 12,
                        background: 'linear-gradient(to right, #FFD700, #FDB931, #FFD700)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))',
                        animation: 'shine 3s linear infinite'
                    }}>
                        Super Admin
                    </Text>
                    <Text variant="body-2" style={{ color: '#94a3b8', display: 'block', fontSize: '16px' }}>
                        Panel de administración iTech Peru
                    </Text>
                </div>
                <style jsx global>{`
                    @keyframes shine {
                        to {
                            background-position: 200% center;
                        }
                    }
                `}</style>

                <Card className="glass-panel" style={{ padding: '40px', borderRadius: '24px' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 24 }}>
                            <Text variant="subheader-1" style={{ color: '#fff', marginBottom: 8, display: 'block' }}>
                                Email
                            </Text>
                            <TextInput
                                size="xl"
                                value={email}
                                onUpdate={setEmail}
                                type="email"
                                placeholder="admin@itech.pe"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div style={{ marginBottom: 32 }}>
                            <Text variant="subheader-1" style={{ color: '#fff', marginBottom: 8, display: 'block' }}>
                                Contraseña
                            </Text>
                            <TextInput
                                size="xl"
                                value={password}
                                onUpdate={setPassword}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                style={{ width: '100%' }}
                                endContent={
                                    <Button
                                        view="flat"
                                        size="l"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ border: 'none', background: 'transparent' }}
                                    >
                                        <Icon data={showPassword ? EyeSlash : Eye} />
                                    </Button>
                                }
                            />
                        </div>

                        {error && (
                            <div style={{
                                padding: '12px 16px',
                                borderRadius: '12px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                marginBottom: 24
                            }}>
                                <Text style={{ color: '#ef4444' }}>{error}</Text>
                            </div>
                        )}

                        <Button
                            view="action"
                            size="xl"
                            width="max"
                            type="submit"
                            loading={loading}
                            style={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                                borderRadius: '12px',
                                fontWeight: 700,
                                marginBottom: 16
                            }}
                        >
                            Iniciar Sesión
                        </Button>

                        <div style={{ textAlign: 'center' }}>
                            <Text style={{ color: '#94a3b8', fontSize: '14px' }}>
                                ¿No tienes cuenta?{' '}
                                <Link href="/auth/register" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>
                                    Registrarse
                                </Link>
                            </Text>
                        </div>
                    </form>
                </Card>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
                        ← Volver a la tienda
                    </Link>
                </div>
            </Container>
        </main>
    );
}
