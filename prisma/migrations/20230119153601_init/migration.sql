-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` VARCHAR(10) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `clave` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_identificacion_key`(`identificacion`),
    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
