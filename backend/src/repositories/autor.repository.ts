import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const autorRepository = {
  findAll: async () => {
  return await prisma.autor.findMany({
    orderBy: { Nombre: 'asc' }
  });
}
,

  findById: async (id: number) => {
    return await prisma.autor.findUnique({ where: { id_Autor: id } });
  },

  create: async (data: any) => {
  console.log("📤 Body recibido para crear autor:", data);

  const autorCreado = await prisma.autor.create({
    data: {
      Nombre: data.Nombre,
      Email: data.Email,
      Estado: data.Estado
    }
  });

  console.log("✅ Autor creado en BD:", autorCreado);
  return autorCreado;
}
,

  update: async (id: number, data: any) => {
    console.log(`📥 PUT recibido para actualizar autor: ${id}`);
    console.log("📤 Body recibido:", data);

   const datosActualizar = {
    Nombre: data.Nombre,
    Email: data.Email,
    Estado: data.Estado
  };

    console.log("📤 Actualizando autor con:", datosActualizar);

    const autorActualizado = await prisma.autor.update({
      where: { id_Autor: id },
      data: datosActualizar
    });

    console.log("✅ Autor actualizado:", autorActualizado);
    return autorActualizado;
  },

  delete: async (id: number) => {
    console.log(`🗑️ Eliminando autor con ID: ${id}`);
    return await prisma.autor.delete({ where: { id_Autor: id } });
  }
};
