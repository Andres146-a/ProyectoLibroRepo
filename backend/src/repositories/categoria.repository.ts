import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CategoriaRepository {
  async getAll(): Promise<any[]> {
    return await prisma.categoria.findMany({
      orderBy: { Nombre: 'asc' },
      select: {
        id_Categoria: true,
        Nombre: true
      }
    });
  }
}
