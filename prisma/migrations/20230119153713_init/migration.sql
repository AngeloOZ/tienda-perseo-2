/*
  Warnings:

  - You are about to alter the column `nombres` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `clave` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `nombres` VARCHAR(100) NOT NULL,
    MODIFY `clave` VARCHAR(100) NOT NULL;
