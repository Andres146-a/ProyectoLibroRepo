import { facturaRepository } from '../repositories/factura.repository';
import { Prisma } from '@prisma/client';
export const facturaService = {
    getFacturas: async () => {
        return await facturaRepository.findAll();
    },
    getFacturaById: async (id: number) => {
        return await facturaRepository.findById(id);
    },
  createFactura: async (data: any) => {
  const {  total, id_Cliente, detalles } = data;

  const facturaInput: Prisma.FacturaCreateInput = {
    fecha_compra: new Date(),
    total,
     cliente: {
    connect: { id_Cliente: id_Cliente } // ✅ usa `cliente.connect` con objeto
  },
    DetalleFactura: {
      create: detalles.map((detalle: any) => ({
        cantidad: detalle.cantidad,
        precio_uni: detalle.precio_uni,
        libro: {
          connect: { id_Libro: detalle.id_Libro }
        }
      }))
    }
  };

  return await facturaRepository.create(facturaInput);
},

    updateFactura: async (id: number, data: any) => {
        return await facturaRepository.update(id, data);
    },
    deleteFactura: async (id: number) => {
        return await facturaRepository.delete(id);
    }
};