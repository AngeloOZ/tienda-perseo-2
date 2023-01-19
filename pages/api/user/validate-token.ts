import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { jwt } from 'utils';

const prisma = new PrismaClient();

type Data =
    {
        status: number
        message: string
    } |
    {
        id: number,
        nombre: string,
        identificacion: string,
        correo: string,
        token: string
    }

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
        if (token == '') {
            return res.status(403).json({ status: 403, message: "No se ha recibido ningún token" })
        }

        let id = await jwt.isValidToken(token);

        const user = await prisma.usuario.findUnique({ where: { id } });

        if (!user) {
            return res.status(404).json({ status: 404, message: "Usuario no encontrado" })
        }

        return res.status(200).json({
            id: user.id,
            nombre: user.nombres,
            identificacion: user.identificacion,
            correo: user.correo,
            token: await jwt.signToken(user)
        });

    } catch (error) {
        return res.status(400).json({ status: 400, message: "Token no válido" })
    } finally {
        prisma.$disconnect();
    }


}
