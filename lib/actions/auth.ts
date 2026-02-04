'use server';

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function registerUser(data: {
    email: string;
    password: string;
    name: string;
}) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            return { success: false, error: "El usuario ya existe" };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                isAdmin: false, // First user can be manually set to admin in DB
            }
        });

        return { success: true, userId: user.id };
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, error: "Error al registrar usuario" };
    }
}

export async function makeUserAdmin(userId: string) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { isAdmin: true }
        });
        return { success: true };
    } catch (error) {
        console.error("Error making user admin:", error);
        return { success: false, error: "Error al actualizar usuario" };
    }
}
