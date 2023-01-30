import type { NextApiRequest, NextApiResponse } from 'next';

import { Categoria } from '@prisma/client';

import prisma from 'database/prismaClient';

// import prisma from 'database';

type Data =
    {
        message: string
    } |
    Categoria[];

// eslint-disable-next-line
export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET': {
            try {
                const categories = await obtenerCategorias();
                return res.status(200).json(categories);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        }
        case 'POST': {
            return registrarCategoria(req, res);
        }
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}


export async function obtenerCategorias() {
    try {
        const categories = await prisma.categoria.findMany();
        return categories;
    } catch (error) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

async function registrarCategoria(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { nombre, icono } = req.body;
        const categoria = await prisma.categoria.create({
            data: {
                nombre,
                icono
            }
        });
        return res.status(200).json(categoria);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
}

async function actualizarCategoria(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, nombre, icono } = req.body;
        const categoria = await prisma.categoria.update({
            where: { id },
            data: {
                nombre,
                icono
            }
        });
        return res.status(200).json(categoria);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
}

async function eliminarCategoria(req: NextApiRequest, res: NextApiResponse) {
    
}