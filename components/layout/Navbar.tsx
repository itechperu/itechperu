'use client';

import React, { useState } from 'react';
import { Button, Icon, Text } from '@gravity-ui/uikit';
import { ShoppingBag, Person, Magnifier, Bars, Sun, Moon } from '@gravity-ui/icons';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useThemeContext } from '@/app/components/providers/Providers';

export function Navbar() {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useThemeContext();
    const isDark = theme === 'dark';

    return (
        <>
            <header className="glass-panel" style={{
                position: 'sticky',
                top: 'clamp(10px, 2vw, 20px)',
                margin: '0 clamp(10px, 2vw, 20px)',
                borderRadius: 'clamp(16px, 3vw, 24px)',
                zIndex: 100,
                transition: 'all 0.3s ease'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: 'clamp(10px, 2vw, 12px) clamp(16px, 3vw, 24px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>

                    {/* Logo Section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 16px)' }}>
                        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                                width: 'clamp(32px, 6vw, 40px)',
                                height: 'clamp(32px, 6vw, 40px)',
                                background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                                borderRadius: 'clamp(8px, 2vw, 12px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 900,
                                fontSize: 'clamp(16px, 3vw, 20px)',
                                boxShadow: '0 0 15px rgba(34,197,94,0.3)'
                            }}>iT</div>
                            <Text variant="header-2" style={{
                                fontWeight: 700,
                                letterSpacing: '1px',
                                color: 'var(--lp-text-primary)',
                                fontSize: 'clamp(16px, 3vw, 20px)',
                                display: 'none'
                            }} className="logo-text">
                                iTech<span style={{ color: '#22c55e' }}>Peru</span>
                            </Text>
                        </Link>
                    </div>

                    {/* Centered Navigation (Desktop) */}
                    <div style={{ gap: 32 }} className="desktop-nav">
                        {['iPhone', 'MacBook', 'iPad', 'Watch'].map((item) => (
                            <Link key={item} href={`/shop?cat=${item}`} style={{ textDecoration: 'none' }}>
                                <Text className="nav-link" style={{
                                    color: 'rgba(255,255,255,0.7)',
                                    transition: 'color 0.2s',
                                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                                }}>
                                    {item}
                                </Text>
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.5vw, 16px)' }}>
                        {/* Mobile Menu Button */}
                        <Button
                            view="flat"
                            size="l"
                            style={{ color: 'var(--lp-text-primary)' }}
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Icon data={Bars} size={20} />
                        </Button>

                        {/* Theme Toggle */}
                        <Button
                            view="flat"
                            size="l"
                            style={{ color: 'var(--lp-text-primary)' }}
                            onClick={toggleTheme}
                        >
                            <Icon data={isDark ? Sun : Moon} size={20} />
                        </Button>

                        {/* Search - Hidden on mobile */}
                        <Button view="flat" size="l" style={{ color: '#fff' }} className="desktop-action">
                            <Icon data={Magnifier} size={20} />
                        </Button>

                        {/* Auth Buttons - Hidden on mobile */}
                        <div className="desktop-action" style={{ display: 'flex', gap: 16 }}>
                            {session ? (
                                <>
                                    {(session.user as any)?.isAdmin && (
                                        <Link href="/admin">
                                            <Button view="outlined" size="l" style={{
                                                borderColor: 'rgba(34,197,94,0.3)',
                                                color: '#22c55e',
                                                borderRadius: '50px',
                                                fontSize: 'clamp(13px, 2.5vw, 15px)',
                                                padding: '0 clamp(16px, 3vw, 24px)'
                                            }}>
                                                Admin
                                            </Button>
                                        </Link>
                                    )}

                                    <Button
                                        view="outlined"
                                        size="l"
                                        onClick={() => signOut()}
                                        style={{
                                            borderColor: 'rgba(255,255,255,0.2)',
                                            color: '#fff',
                                            borderRadius: '50px',
                                            fontSize: 'clamp(13px, 2.5vw, 15px)',
                                            padding: '0 clamp(16px, 3vw, 24px)'
                                        }}
                                    >
                                        <Icon data={Person} size={18} style={{ marginRight: 8 }} />
                                        <span className="button-text">Salir</span>
                                    </Button>
                                </>
                            ) : (
                                <Link href="/auth/login">
                                    <Button view="outlined" size="l" style={{
                                        borderColor: 'rgba(255,255,255,0.2)',
                                        color: '#fff',
                                        borderRadius: '50px',
                                        fontSize: 'clamp(13px, 2.5vw, 15px)',
                                        padding: '0 clamp(16px, 3vw, 24px)'
                                    }}>
                                        <Icon data={Person} size={18} style={{ marginRight: 8 }} />
                                        <span className="button-text">Iniciar Sesión</span>
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Shopping Bag - Always visible */}
                        <Button view="action" size="l" style={{
                            background: 'linear-gradient(135deg, #22c55e, #10b981)',
                            color: '#fff',
                            borderRadius: '50px',
                            boxShadow: '0 0 20px rgba(34,197,94,0.3)',
                            minWidth: 'clamp(40px, 8vw, 48px)',
                            padding: '0 clamp(12px, 2vw, 16px)'
                        }}>
                            <Icon data={ShoppingBag} size={18} />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu glass-panel" style={{
                    position: 'fixed',
                    top: 'clamp(70px, 12vw, 90px)',
                    left: 'clamp(10px, 2vw, 20px)',
                    right: 'clamp(10px, 2vw, 20px)',
                    borderRadius: '20px',
                    padding: '20px',
                    zIndex: 99,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16
                }}>
                    {['iPhone', 'MacBook', 'iPad', 'Watch'].map((item) => (
                        <Link key={item} href={`/shop?cat=${item}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                padding: '12px 16px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                transition: 'all 0.2s'
                            }}>
                                <Text style={{ color: '#fff', fontSize: '16px' }}>{item}</Text>
                            </div>
                        </Link>
                    ))}

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />

                    {session ? (
                        <>
                            {(session.user as any)?.isAdmin && (
                                <Link href="/admin">
                                    <Button view="outlined" width="max" style={{
                                        borderColor: 'rgba(34,197,94,0.3)',
                                        color: '#22c55e',
                                        borderRadius: '12px'
                                    }}>
                                        Admin Panel
                                    </Button>
                                </Link>
                            )}
                            <Button
                                view="outlined"
                                width="max"
                                onClick={() => {
                                    signOut();
                                    setMobileMenuOpen(false);
                                }}
                                style={{
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    color: '#fff',
                                    borderRadius: '12px'
                                }}
                            >
                                Cerrar Sesión
                            </Button>
                        </>
                    ) : (
                        <Link href="/auth/login">
                            <Button view="outlined" width="max" style={{
                                borderColor: 'rgba(255,255,255,0.2)',
                                color: '#fff',
                                borderRadius: '12px'
                            }}>
                                Iniciar Sesión
                            </Button>
                        </Link>
                    )}
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (min-width: 768px) {
                    .desktop-nav { display: flex !important; }
                    .desktop-action { display: flex !important; }
                    .mobile-menu-btn { display: none !important; }
                    .logo-text { display: block !important; }
                }
                @media (max-width: 767px) {
                    .desktop-nav { display: none !important; }
                    .desktop-action { display: none !important; }
                    .mobile-menu-btn { display: flex !important; }
                    .button-text { display: none; }
                }
                @media (max-width: 480px) {
                    .logo-text { display: none !important; }
                }
                .nav-link:hover { 
                    color: #fff !important; 
                    text-shadow: 0 0 10px rgba(255,255,255,0.5); 
                }
                .mobile-menu > a > div:hover {
                    background: rgba(255,255,255,0.1);
                    transform: translateX(4px);
                }
            `}} />
        </>
    );
}
