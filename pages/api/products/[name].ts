import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Producto } from '@prisma/client';

const prisma = new PrismaClient();
type Data = {
  name: string;
};

export default function productForName(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET' && req.query?.name) {
    return obtenerProductoForName(req, res);
  }
  return res.status(405);
}

const obtenerProductoForName = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name } = req.query as { name: string };
    const producto = await prisma.producto.findUnique({
      where: {
        slug: name,
      },
      include: {
        categoria: true
      }
    });
    await prisma.$disconnect();
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message, data: error });
  } finally {
    await prisma.$disconnect();
  }
};

export const obtenerProductoSlug = async (slug: string): Promise<Producto | null> => {
  try {
    const producto = await prisma.producto.findUnique({
      where: {
        slug
      },
    });
    await prisma.$disconnect();
    return producto;
  } catch (error) {
    return null;
  }
}