'use server';

import { PrismaClient } from "@prisma/client";

// Configuración para evitar errores de conexión en desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getProductById(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        return product;
    } catch (error) {
        console.error("Error obteniendo producto:", error);
        return null;
    }
}
