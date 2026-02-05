'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Card, TextInput, Button, Text, Icon } from '@gravity-ui/uikit';
import { Eye, EyeSlash } from '@gravity-ui/icons';
import Link from 'next/link';
import { registerUser } from '@/lib/actions/auth';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            const result = await registerUser({ email, password, name });

            if (result.success) {
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                router.push('/auth/login');
            } else {
                setError(result.error || 'Error al registrar usuario');
            }
        } catch (err) {
            setError('Error al registrar usuario');
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
                    <Text variant="display-1" style={{ color: '#fff', fontWeight: 800, marginBottom: 8 }}>
                        Crear Cuenta
                    </Text>
                    <Text style={{ color: '#94a3b8' }}>
                        Regístrate para acceder al panel de administración
                    </Text>
                </div>

                <Card className="glass-panel" style={{ padding: '40px', borderRadius: '24px' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 20 }}>
                            <Text variant="subheader-1" style={{ color: '#fff', marginBottom: 8, display: 'block' }}>
                                Nombre Completo
                            </Text>
                            <TextInput
                                size="xl"
                                value={name}
                                onUpdate={setName}
                                placeholder="Juan Pérez"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div style={{ marginBottom: 20 }}>
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

                        <div style={{ marginBottom: 20 }}>
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

                        <div style={{ marginBottom: 32 }}>
                            <Text variant="subheader-1" style={{ color: '#fff', marginBottom: 8, display: 'block' }}>
                                Confirmar Contraseña
                            </Text>
                            <TextInput
                                size="xl"
                                value={confirmPassword}
                                onUpdate={setConfirmPassword}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                style={{ width: '100%' }}
                                endContent={
                                    <Button
                                        view="flat"
                                        size="l"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{ border: 'none', background: 'transparent' }}
                                    >
                                        <Icon data={showConfirmPassword ? EyeSlash : Eye} />
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
                            Registrarse
                        </Button>

                        <div style={{ textAlign: 'center' }}>
                            <Text style={{ color: '#94a3b8', fontSize: '14px' }}>
                                ¿Ya tienes cuenta?{' '}
                                <Link href="/auth/login" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>
                                    Iniciar Sesión
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
