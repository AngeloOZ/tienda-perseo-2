/*
  Warnings:

  - You are about to drop the column `created_at` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `id_ci` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `names` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identificacion]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clave` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identificacion` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Usuario_id_ci_key` ON `usuario`;

-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `created_at`,
    DROP COLUMN `name`,
    ADD COLUMN `nombre` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `created_at`,
    DROP COLUMN `email`,
    DROP COLUMN `id_ci`,
    DROP COLUMN `names`,
    DROP COLUMN `password`,
    ADD COLUMN `clave` VARCHAR(100) NOT NULL,
    ADD COLUMN `correo` VARCHAR(100) NOT NULL,
    ADD COLUMN `fechacreado` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `identificacion` VARCHAR(10) NOT NULL,
    ADD COLUMN `nombres` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_identificacion_key` ON `Usuario`(`identificacion`);
