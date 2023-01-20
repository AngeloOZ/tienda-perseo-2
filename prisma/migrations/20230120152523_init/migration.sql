/*
  Warnings:

  - You are about to drop the column `fk_carrito` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the `carrito` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `producto` DROP FOREIGN KEY `Producto_fk_carrito_fkey`;

-- AlterTable
ALTER TABLE `producto` DROP COLUMN `fk_carrito`;

-- DropTable
DROP TABLE `carrito`;
