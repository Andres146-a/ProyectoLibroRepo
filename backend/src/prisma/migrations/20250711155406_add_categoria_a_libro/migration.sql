-- AlterTable
ALTER TABLE `Libro` ADD COLUMN `id_Categoria` INTEGER NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id_Categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_Categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Libro` ADD CONSTRAINT `Libro_id_Categoria_fkey` FOREIGN KEY (`id_Categoria`) REFERENCES `Categoria`(`id_Categoria`) ON DELETE SET NULL ON UPDATE CASCADE;
