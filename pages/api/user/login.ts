import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'database/prismaClient';

import { jwt } from 'utils';



type Data =
    {
        status: number
        message: string
        data?: any
    } |
    {
        user: {
            id: number,
            nombres: string,
            identificacion: string,
            correo: string,
            rol: string[]
        }
        token: string
    }

// eslint-disable-next-line
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

        if (user.clave !== clave) {
            return res.status(404).json({ status: 404, message: 'El usuario o la contraseña no son válidos - CLAVE' })
        }
        
        const token = await jwt.signToken(user)
        return res.status(200).json({
            user: {
                id: user.id,
                nombres: user.nombres,
                identificacion: user.identificacion,
                correo: user.correo,
                rol: JSON.parse(user.rol)
            },
            token
        });

    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message, data: error })
    } finally {
        await prisma.$disconnect();
    }

}
