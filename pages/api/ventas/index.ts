import prisma from 'database/prismaClient';
import { VentaRequest } from 'interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'


export default function (req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            return obtenerVentasReq(req, res);
        case 'POST':
            return registrarVenta(req, res);
        case 'PUT':
            return res.status(200).json({ message: 'PUT' })
        case 'DELETE':
            return res.status(200).json({ message: 'DELETE' })
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}

export async function obtenerVentas(id?: number) {
    try {
        if (id) {
            const venta = await prisma.ventas.findUnique({
                where: {
                    id_venta: id
                }
            });
            return venta;
        }
        const ventas = await prisma.ventas.findMany();
        return ventas;
    } catch (error) {
        console.log(error);
        return [];
    }
    finally {
        await prisma.$disconnect();
    }
}

async function obtenerVentasReq(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query
        if (id) {
            const venta = await obtenerVentas(Number(id));
            return res.status(200).json(venta);
        }
        const ventas = await obtenerVentas();
        return res.status(200).json(ventas);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las ventas', error });
    }
}

async function registrarVenta(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {nombre, ruc, correo, whatsapp, cart } = req.body as VentaRequest;
        const result = await prisma.ventas.create({
            data: {
                nombres: nombre,
                identificacion: ruc,
                correo,
                whatsapp,
                productos: JSON.stringify(cart),
                fecha_creado: new Date(),
            }
        });
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al registrar la venta', error });
    }
    finally {
        await prisma.$disconnect();
    }
}

async function actualizarVenta(req: NextApiRequest, res: NextApiResponse) {
    try {
        const venta = req.body;
        const result = await prisma.ventas.update({
            where: {
                id_venta: venta.id_venta
            },
            data: venta
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la venta', error });
    }
    finally {
        await prisma.$disconnect();
    }
}

async function eliminarVenta(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const result = await prisma.ventas.delete({
            where: {
                id_venta: Number(id)
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la venta', error });
    }
    finally {
        await prisma.$disconnect();
    }
}
