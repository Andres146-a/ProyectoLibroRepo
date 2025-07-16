import { PrismaClient, Editorial } from '@prisma/client';

const prisma = new PrismaClient();

export const editorialRepository = {
  findAll: async () => {
  return await prisma.editorial.findMany({
    orderBy: { Nombre: 'asc' }
  });
},

  findById: async (id: number): Promise<Editorial | null> => {
    return await prisma.editorial.findUnique({ where: { id_Editorial: id } });
  },

  create: async (data: Editorial): Promise<Editorial> => {
  return await prisma.editorial.create({
    data: {
      Nombre: data.Nombre,
      Telefono: data.Telefono,
      Email: data.Email,
      SitioWeb: data.SitioWeb
    }
  });
},

  update: async (id: number, data: Editorial): Promise<Editorial> => {
    return await prisma.editorial.update({
      where: { id_Editorial: id },
      data,
    });
  },

  delete: async (id: number): Promise<void> => {
    await prisma.editorial.delete({ where: { id_Editorial: id } });
  },
};
