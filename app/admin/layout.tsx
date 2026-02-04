import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Redirect to login if not authenticated
    if (!session) {
        redirect("/auth/login");
    }

    // Check if user is admin
    if (!(session.user as any)?.isAdmin) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at 50% 0%, #1a1b26 0%, #000000 100%)',
                padding: '20px',
                textAlign: 'center'
            }}>
                <div>
                    <h1 style={{ color: '#fff', fontSize: '48px', marginBottom: '16px' }}>⛔</h1>
                    <h2 style={{ color: '#fff', marginBottom: '8px' }}>Acceso Denegado</h2>
                    <p style={{ color: '#94a3b8' }}>No tienes permisos de administrador</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
