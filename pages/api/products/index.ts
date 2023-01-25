import type { NextApiRequest, NextApiResponse } from 'next';
import { Categoria, PrismaClient } from '@prisma/client'
import { IProducto } from '../../../interfaces'
const prisma = new PrismaClient()

type Data = {
    name: string
}

export default function (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            res.status(200).json({ name: 'GET' })
            break;
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

const registrarProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, description, category, price, stock, cover, images_list, rating, status } = req.body as IProducto;

    const producto = await prisma.producto.create({
        data: {
            name,
            description,
            stock,
            price,
            category,
            images: JSON.stringify(images_list) as string,
            cover: cover as string,
            status,
            rating: Number.parseInt(rating),
        }
    });

    return res.status(200).json({ status: 200, message: 'Producto registrado', data: producto })
}