-- CreateTable
CREATE TABLE `Autor` (
    `id_Autor` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NULL,
    `Estado` ENUM('ACTIVO', 'INACTIVO') NULL DEFAULT 'ACTIVO',

    PRIMARY KEY (`id_Autor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id_Cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `Cedula` VARCHAR(20) NOT NULL,
    `Nombre` VARCHAR(50) NOT NULL,
    `Apellido` VARCHAR(50) NOT NULL,
    `FechaN` DATE NULL,
    `Direccion` VARCHAR(100) NULL,
    `Telefono` VARCHAR(15) NULL,
    `Estado` ENUM('ACTIVO', 'INACTIVO') NULL DEFAULT 'ACTIVO',

    UNIQUE INDEX `Cedula`(`Cedula`),
    INDEX `idx_cliente_cedula`(`Cedula`),
    INDEX `idx_cliente_nombre_apellido`(`Nombre`, `Apellido`),
    PRIMARY KEY (`id_Cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleFactura` (
    `id_Detalle` INTEGER NOT NULL AUTO_INCREMENT,
    `compra` VARCHAR(50) NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_uni` DECIMAL(10, 2) NOT NULL,
    `id_Compra` INTEGER NULL,
    `id_Libro` INTEGER NULL,

    INDEX `idx_detalle_factura`(`id_Compra`),
    INDEX `idx_detalle_libro`(`id_Libro`),
    PRIMARY KEY (`id_Detalle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Editorial` (
    `id_Editorial` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(50) NOT NULL,
    `Telefono` VARCHAR(15) NULL,
    `Email` VARCHAR(50) NULL,
    `SitioWeb` VARCHAR(100) NULL,

    PRIMARY KEY (`id_Editorial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura` (
    `id_Compra` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_compra` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `total` DECIMAL(12, 2) NOT NULL,
    `id_Cliente` INTEGER NULL,

    INDEX `idx_factura_cliente`(`id_Cliente`),
    INDEX `idx_factura_fecha`(`fecha_compra`),
    PRIMARY KEY (`id_Compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Libro` (
    `id_Libro` INTEGER NOT NULL AUTO_INCREMENT,
    `Titulo` VARCHAR(100) NOT NULL,
    `Fechap` DATE NULL,
    `preciov` DECIMAL(10, 2) NOT NULL,
    `cantidad` INTEGER NULL DEFAULT 0,
    `id_Editorial` INTEGER NULL,
    `Estado` ENUM('DISPONIBLE', 'AGOTADO') NULL DEFAULT 'DISPONIBLE',
    `ISBN` VARCHAR(20) NOT NULL,

    INDEX `idx_libro_editorial`(`id_Editorial`),
    INDEX `idx_libro_titulo`(`Titulo`),
    PRIMARY KEY (`id_Libro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Libro_Autor` (
    `id_Libro` INTEGER NOT NULL,
    `id_Autor` INTEGER NOT NULL,

    INDEX `id_Autor`(`id_Autor`),
    PRIMARY KEY (`id_Libro`, `id_Autor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_ibfk_1` FOREIGN KEY (`id_Compra`) REFERENCES `Factura`(`id_Compra`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_ibfk_2` FOREIGN KEY (`id_Libro`) REFERENCES `Libro`(`id_Libro`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_ibfk_1` FOREIGN KEY (`id_Cliente`) REFERENCES `Cliente`(`id_Cliente`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Libro` ADD CONSTRAINT `Libro_ibfk_1` FOREIGN KEY (`id_Editorial`) REFERENCES `Editorial`(`id_Editorial`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Libro_Autor` ADD CONSTRAINT `Libro_Autor_ibfk_1` FOREIGN KEY (`id_Libro`) REFERENCES `Libro`(`id_Libro`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Libro_Autor` ADD CONSTRAINT `Libro_Autor_ibfk_2` FOREIGN KEY (`id_Autor`) REFERENCES `Autor`(`id_Autor`) ON DELETE CASCADE ON UPDATE NO ACTION;
