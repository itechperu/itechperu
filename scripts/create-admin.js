// Script para crear el primer usuario administrador
// Ejecutar con: node scripts/create-admin.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@itech.pe';
    const password = 'admin123'; // Cambiar en producción
    const name = 'Super Admin';

    try {
        // Check if admin already exists
        const existing = await prisma.user.findUnique({
            where: { email }
        });

        if (existing) {
            console.log('❌ El usuario admin ya existe');
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                isAdmin: true,
            }
        });

        console.log('✅ Usuario administrador creado exitosamente!');
        console.log('📧 Email:', email);
        console.log('🔑 Contraseña:', password);
        console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
