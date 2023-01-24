-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` VARCHAR(10) NOT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `nombres` VARCHAR(100) NOT NULL,
    `clave` VARCHAR(100) NOT NULL,
    `rol` VARCHAR(191) NOT NULL,
    `fechacreado` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
