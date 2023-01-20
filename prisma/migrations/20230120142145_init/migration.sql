/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `usuario`;

-- CreateTable
CREATE TABLE `Carrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subtotal` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `descuento` DOUBLE NULL,
    `totalItems` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` LONGTEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `cover` LONGTEXT NULL,
    `disponible` INTEGER NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL DEFAULT 0.0,
    `cantidad` INTEGER NOT NULL DEFAULT 0,
    `subtotal` DOUBLE NOT NULL DEFAULT 0.0,
    `fk_carrito` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_fk_carrito_fkey` FOREIGN KEY (`fk_carrito`) REFERENCES `Carrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
