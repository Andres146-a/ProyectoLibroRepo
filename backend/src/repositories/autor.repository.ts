import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const autorRepository = {
  findAll: async () => {
    return await prisma.autor.findMany({
      where: { Estado: 'ACTIVO' },
      orderBy: { Nombre: 'asc' }
    });
  }
    ,
  findById: async (id: number) => {
    return await prisma.autor.findUnique({ where: { id_Autor: id } });
  },
  create: async (data: any) => {            
    return await prisma.autor.create({ data });
  },
  update: async (id: number, data: any) => {
    return await prisma.autor.update({ where: { id_Autor: id }, data });
  },
  delete: async (id: number) => {
    return await prisma.autor.delete({ where: { id_Autor: id } });
  } 
};
