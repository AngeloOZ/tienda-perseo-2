import type { NextApiRequest, NextApiResponse } from 'next';

import { Categoria, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data =
    {
        message: string
    } |
    Categoria[]
// eslint-disable-next-line
export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    const categories = await prisma.categoria.findMany();
    await prisma.$disconnect();
    if (categories.length === 0) {
        res.status(404).json({ message: 'No categories found' })
    } else {
        res.status(200).json(categories)
    }
}