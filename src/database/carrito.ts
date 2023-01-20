import { PrismaClient, Prisma } from '@prisma/client';
import { ICheckoutCartItem } from 'src/@types/product';

const prisma = new PrismaClient();

export async function getCarrito(){
  const carrito = await prisma.carrito.findMany();
  return carrito;
}

export async function updateCarritoSumary(
  id: number,
  subtotal: number,
  total: number,
  descuento: number,
  totalItems: number
) {
  const carrito = await prisma.carrito.update({
    where: {
      id,
    },
    data: {
      subtotal,
      total,
      descuento,
      totalItems,
    },
  });
  return carrito;
}

export async function addProductoToCarrito(
    nombre: string, description: string, cover: string, disponible: number, price: number
    , cantidad number, 
) {
  const carrito = await prisma.carrito.findMany();
  return carrito;
}
