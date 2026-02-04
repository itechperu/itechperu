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
export async function createProduct(formData: FormData) {
    try {
        const name: string = formData.get('name') as string;
        const price = parseFloat(formData.get('price') as string);
        const condition = formData.get('condition') as string;
        const category = formData.get('category') as string;
        const image = formData.get('image') as string;

        await prisma.product.create({
            data: {
                name,
                description: "Sin descripción",
                originalPrice: price,
                condition,
                category,
                images: image,
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