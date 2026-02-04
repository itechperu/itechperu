"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Configuración para evitar errores de conexión en desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// --- FUNCIÓN 1: OBTENER PRODUCTOS ---
export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return products;
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return [];
    }
}

// --- FUNCIÓN 2: CREAR PRODUCTO ---
export async function createProduct(data: {
    name: string;
    price: number;
    condition: string;
    category: string;
    image: string;
}) {
    try {
        await prisma.product.create({
            data: {
                name: data.name,
                description: "Sin descripción",
                originalPrice: data.price,
                condition: data.condition,
                category: data.category,
                images: data.image,
                status: "AVAILABLE",
            },
        });

        // Actualizamos la tienda
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error creando producto:", error);
        return { success: false, error };
    }
}   