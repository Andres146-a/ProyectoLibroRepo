import { PrismaClient, Cliente } from '@prisma/client';
import { customAlphabet } from 'nanoid';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const ClienteRepository = {
    findAll: async (): Promise<Cliente[]> => {
        return await prisma.cliente.findMany();
    },
    findById: async (id: number): Promise<Cliente | null> => {
        return await prisma.cliente.findUnique({
            where: { id_Cliente: id },
            include: {
                facturas: true,
            }
        });
    },
    create: async (data: any) => {
        const {
            Cedula,
            Nombre,
            Apellido,
            FechaN, 
            Direccion,
            Telefono,
            Estado, 
            facturas
        } = data;
 const fechaValida = FechaN && !isNaN(Date.parse(FechaN)) ? new Date(FechaN) : null;

    if (!fechaValida) {
      throw new Error('Fecha de publicación inválida');
    }

        return await prisma.cliente.create({
            data: {
                Cedula,
                Nombre,
                Apellido,
                FechaN: fechaValida,
                Direccion,
                Telefono,
                Estado,
                ...(facturas?.length && {
                    facturas: {
                        create: facturas
                    }
                })
            }
        });
    },
    update : async (id: number, data: Partial<Cliente>) => {
        return await prisma.cliente.update({
            where: { id_Cliente: id },
            data: {
                    ...(data.Cedula && { Cedula: data.Cedula }),
                    ...(data.Nombre && { Nombre: data.Nombre }),
                    ...(data.Apellido && { Apellido: data.Apellido }),
                    ...(data.FechaN && { FechaN: data.FechaN }),
                    ...(data.Direccion && { Direccion: data.Direccion }),
                    ...(data.Telefono && { Telefono: data.Telefono }),
                    ...(data.Estado && { Estado: data.Estado })
            }
        });

    },
    delete: async (id: number) => {
        await prisma.cliente.delete({
            where: { id_Cliente: id }
        });
    },
    deleteMany: async (ids: number[]): Promise<void> => {
    await prisma.libro.deleteMany({
      where: {
        id_Libro: {
          in: ids
        }
      }
    });
  }
};