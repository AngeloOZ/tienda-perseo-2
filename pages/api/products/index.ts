import type { NextApiRequest, NextApiResponse } from 'next';
import { Categoria, PrismaClient, Producto } from '@prisma/client'
import { IProducto } from '../../../interfaces'
const prisma = new PrismaClient()

type Data = {
    name: string
}

export default function (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            if (req.query?.id) {
                return obtenerProducto(req, res);
            }
            return obtenerProductos(req, res);
        case 'POST':
            return registrarProducto(req, res);
        case 'PUT':
            res.status(200).json({ name: 'PUT' })
            break;
        case 'DELETE':
            res.status(200).json({ name: 'DELETE' })
            break;
        default:
            res.status(200).json({ status: 400, message: 'method not allowed' })
    }
}

const obtenerProductos = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const productos = await obtenerProductosLocal();
        await prisma.$disconnect();
        return res.status(200).json(productos)
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message, data: error })
    } finally {
        await prisma.$disconnect();
    }
}

const obtenerProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query as { id: string };
        const producto = await prisma.producto.findUnique({
            where: {
                id: Number.parseInt(id)
            }
        });
        await prisma.$disconnect();
        return res.status(200).json(producto)
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message, data: error })
    } finally {
        await prisma.$disconnect();
    }
}

const registrarProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name, description, price, category, stock, cover, images_list, rating, status } = req.body as IProducto;

        const producto = await prisma.producto.create({
            data: {
                name,
                description,
                stock,
                price,
                images: JSON.stringify(images_list) as string,
                cover: cover as string,
                status,
                rating: Number.parseInt(rating),
                categoriaID: Number.parseInt(category)
            }
        });
        await prisma.$disconnect();
        return res.status(200).json({ status: 200, message: 'Producto registrado', data: producto })
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message, data: error })
    } finally {
        await prisma.$disconnect();
    }
}


export async function obtenerProductosLocal() {
    try {
        const productos = await prisma.producto.findMany({
            include: {
                categoria: true
            }
        });
        await prisma.$disconnect();
        return productos;
    } catch (error) {
        return [];
    } finally {
        await prisma.$disconnect();
    }
}