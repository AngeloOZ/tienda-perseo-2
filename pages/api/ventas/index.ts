import type { NextApiRequest, NextApiResponse } from 'next'

import { createPaginator } from 'prisma-pagination';

import prisma from 'database/prismaClient';
import { VentaRequest } from 'interfaces';

export const config = {
    api: {
        responseLimit: false,
    },
}


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
                },
            });
            return venta;
        }
        const ventas = await prisma.ventas.findMany({ orderBy: { id_venta: 'desc' } });
        return ventas;
    } catch (error) {
        console.log(error);
        return [];
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function ventasPaginacion(limit: string, page: string) {
    try {
        const paginate = createPaginator({ perPage: limit, page });

        const ventas = await paginate(prisma.ventas);

        return ventas;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

async function obtenerVentasReq(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, page, limit } = req.query as { id?: string, page?: string, limit?: string }

        if (limit && page) {
            const ventas = await ventasPaginacion(limit, page);
            return res.status(200).json(ventas);
        }

        if (id) {
            const venta = await obtenerVentaId(Number(id));
            return res.status(200).json(venta);
        }

        const ventas = await obtenerVentas();
        return res.status(200).json(ventas);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las ventas', error });
    }
}

async function obtenerVentaId(id: number) {
    try {
        const ventaQuery = await prisma.ventas.findUnique({
            where: {
                id_venta: id
            },
        });

        if (!ventaQuery) return null;

        const venta = {
            ...ventaQuery,
            subtotal: 0,
            total: 0,
            totalIVA: 0,
        }

        const products = JSON.parse(venta.productos);

        // eslint-disable-next-line
        for (const product of products) {
            // eslint-disable-next-line
            const productoBase = await prisma.producto.findUnique({ where: { id: product.id } });

            product.price = productoBase?.price || 0;
            product.cover = productoBase?.cover || '';
            product.subtotal = product.price * product.quantity;
            product.stock = productoBase?.stock || 0;

            venta.subtotal += product.subtotal;
            venta.totalIVA += Math.round(product.subtotal * 0.12);
        }
        venta.total = venta.subtotal + venta.totalIVA;
        venta.productos = products;
        return venta;
    } catch (error) {
        console.log(error);
        return [];
    }
    finally {
        await prisma.$disconnect();
    }
}

async function registrarVenta(req: NextApiRequest, res: NextApiResponse) {
    try {

        await prisma.$transaction(async () => {

            const { nombre, ruc, correo, whatsapp, cart } = req.body as VentaRequest;

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

            cart.forEach(async (product) => {
                const productoBase = await prisma.producto.findUnique({ where: { id: product.id } });
                const stock = productoBase?.stock || 0;
                const newStock = stock - product.quantity;

                if (newStock == 0) {
                    await prisma.producto.update({
                        where: {
                            id: product.id
                        },
                        data: {
                            status: false,
                            stock: newStock
                        }
                    });
                } else {
                    await prisma.producto.update({
                        where: {
                            id: product.id
                        },
                        data: {
                            stock: newStock
                        }
                    });
                }
            });

            return res.status(201).json(result);
        });
    } catch (error) {
        console.log(error);
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
