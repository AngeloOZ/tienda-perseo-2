import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'database/prismaClient';
import { jwt } from 'utils';


type Data =
    {
        status: number
        message: string
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
        case 'GET':
            return verifyJWT(req, res);
        default:
            return res.status(400).json({ status: 400, message: 'bad request' })

    }
}

async function verifyJWT(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { token = '' } = req.cookies;
    try {
        if (token === '') {
            return res.status(403).json({ status: 403, message: "No se ha recibido ningún token" })
        }

        const id = await jwt.isValidToken(token);

        const user = await prisma.usuario.findUnique({ where: { id } });

        if (!user) {
            return res.status(404).json({ status: 404, message: "Usuario no encontrado" })
        }

        return res.status(200).json({
            user: {
                id: user.id,
                nombres: user.nombres,
                identificacion: user.identificacion,
                correo: user.correo,
                rol: JSON.parse(user.rol)
            },
            token: await jwt.signToken(user)
        });

    } catch (error) {
        return res.status(400).json({ status: 400, message: "Token no válido" })
    } finally {
        prisma.$disconnect();
    }


}
