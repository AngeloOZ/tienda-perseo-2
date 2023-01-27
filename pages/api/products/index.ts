import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'
import { IProducto } from '../../../interfaces'
const prisma = new PrismaClient()


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
            return actualizarProducto(req, res);
        case 'DELETE':
            return eliminarProducto(req, res);
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
        const { name, description, price, category, stock, cover, images, rating, status } = req.body as IProducto;

        const producto = await prisma.producto.create({
            data: {
                name,
                description,
                stock,
                price,
                images: JSON.stringify(images) as string,
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

const actualizarProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { id, name, description, price, category, stock, cover, images, rating, status } = req.body as IProducto;

        const producto = await prisma.producto.update({
            where: { id },
            data: {
                name,
                description,
                stock,
                price,
                images: JSON.stringify(images) as string,
                cover: cover as string,
                status,
                rating: Number.parseInt(rating),
                categoriaID: Number.parseInt(category)
            }
        });
        await prisma.$disconnect();
        return res.status(200).json({ status: 200, message: 'Producto actualizado', data: producto })
    }
    catch(error){
        return res.status(500).json({ status: 500, message: error.message, data: error })
    }
    finally{
        prisma.$disconnect();
    }  
}

const eliminarProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { id } = req.query as { id: string };

        const producto = await prisma.producto.delete({
            where: { id: Number.parseInt(id) }
        });
        await prisma.$disconnect();
        return res.status(200).json({ status: 200, message: 'Producto eliminado', data: producto })
    }
    catch(error){
        return res.status(500).json({ status: 500, message: error.message, data: error })
    }
    finally{
        prisma.$disconnect();
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