/*
  Warnings:

  - You are about to drop the column `cantidad` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `disponible` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `producto` table. All the data in the column will be lost.
  - Added the required column `name` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producto` DROP COLUMN `cantidad`,
    DROP COLUMN `disponible`,
    DROP COLUMN `nombre`,
    DROP COLUMN `subtotal`,
    ADD COLUMN `available` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `name` LONGTEXT NOT NULL;
