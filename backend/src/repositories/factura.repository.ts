import { PrismaClient, Factura, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const facturaRepository = {
  // Crear una nueva factura con sus detalles
  create: async (data: Prisma.FacturaCreateInput): Promise<Factura> => {
    return await prisma.factura.create({ data });
  },

  // Obtener todas las facturas con cliente y detalles
  findAll: async (): Promise<Factura[]> => {
    return await prisma.factura.findMany({
      include: {
        cliente: true,
        DetalleFactura: true,
      },
    });
  },

  // Buscar una factura por ID incluyendo cliente y detalles
  findById: async (id: number): Promise<Factura | null> => {
    return await prisma.factura.findUnique({
      where: { id_Compra: id },
      include: {
        cliente: true,
        DetalleFactura: true,
      },
    });
  },

  // Actualizar una factura (solo campos válidos)
  update: async (
    id: number,
    data: Prisma.FacturaUpdateInput
  ): Promise<Factura> => {
    return await prisma.factura.update({
      where: { id_Compra: id },
      data,
    });
  },

  // Eliminar factura y sus detalles relacionados
  delete: async (id: number): Promise<Factura> => {
    await prisma.detalleFactura.deleteMany({
      where: { id_Compra: id },
    });

    return await prisma.factura.delete({
      where: { id_Compra: id },
    });
  },
};
