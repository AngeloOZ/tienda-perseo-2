import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { jwt } from 'utils';

const prisma = new PrismaClient();

type Data =
    {
        status: number
        message: string
        data?: any
    } |
    {
        user: {
            id: number,
            nombre: string,
            identificacion: string,
            correo: string,
        }
        token: string
    }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res);
        default:
            return res.status(400).json({ status: 400, message: 'bad request' })

    }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { identificacion = '', clave = '' } = req.body;

        const user = await prisma.usuario.findUnique({ where: { identificacion } });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'El usuario o la contraseña no son válidos - IDEN' })
        }

        if (user.clave != clave) {
            return res.status(404).json({ status: 404, message: 'El usuario o la contraseña no son válidos - CLAVE' })
        }

        const token = await jwt.signToken(user)
        return res.status(200).json({
            user: {
                id: user.id,
                nombre: user.nombres,
                identificacion: user.identificacion,
                correo: user.correo,
            },
            token
        });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, data: error })
    } finally {
        await prisma.$disconnect();
    }

}
