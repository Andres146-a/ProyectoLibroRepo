import { PrismaClient, Libro, Libro_Estado } from '@prisma/client';

import { customAlphabet } from 'nanoid';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const libroRepository = {
  findAll: async (): Promise<Libro[]> => {
    return await prisma.libro.findMany();
  },

  findById: async (id: number): Promise<Libro | null> => {
    return await prisma.libro.findUnique({ 
      where: { id_Libro: id },
      include: {
        editorial: true,
        Libro_Autor: true
      }
    });
  },

  create: async (data: any) => {
    const {
      Titulo,
      Fechap,
      preciov,
      cantidad,
      id_Editorial,
      Estado,
      autores
    } = data;

    const generarISBN = () => {
      const nanoid = customAlphabet('0123456789', 13);
      return nanoid();
    };
    const fechaValida = Fechap && !isNaN(Date.parse(Fechap)) ? new Date(Fechap) : null;

    if (!fechaValida) {
      throw new Error('Fecha de publicación inválida');
    }

    const estadoValido = Object.values(Libro_Estado).includes(Estado as Libro_Estado)
      ? Estado
      : Libro_Estado.DISPONIBLE;

    const nuevoLibro = await prisma.libro.create({
  data: {
    Titulo,
    Fechap: fechaValida,
    preciov,
    cantidad,
    id_Editorial,
    Estado: estadoValido,
    ISBN: generarISBN(), 
  } as Prisma.LibroUncheckedCreateInput
    });

    // Asociar autores si existen
    if (Array.isArray(autores)) {
      await Promise.all(
        autores.map((idAutor: number) =>
          prisma.libro_Autor.create({
            data: {
              id_Libro: nuevoLibro.id_Libro,
              id_Autor: idAutor
            }
          })
        )
      );
    }
  console.log({
    Titulo,
    Fechap,
    preciov,
    cantidad,
    id_Editorial,
    Estado,
  });

    return nuevoLibro;
  },
  update: async (id: number, data: Partial<Libro>): Promise<Libro> => {
    return await prisma.libro.update({
      where: { id_Libro: id },
      data: {
        Titulo: data.Titulo,
        Fechap: data.Fechap,
        preciov: data.preciov,
        cantidad: data.cantidad,
        id_Editorial: data.id_Editorial,
        Estado: data.Estado
      }
    });
  },

  delete: async (id: number): Promise<void> => {
    await prisma.libro.delete({ where: { id_Libro: id } });
    
  },
  deleteMany: async (ids: number[]): Promise<void> => {
    await prisma.libro.deleteMany({
      where: {
        id_Libro: {
          in: ids
        }
      }
    });
  },
  // Métodos adicionales específicos para Libro
  findByTitle: async (title: string): Promise<Libro[]> => {
    return await prisma.libro.findMany({
      where: { Titulo: { contains: title } },
      orderBy: { Titulo: 'asc' }
    });
  },

  findByEditorial: async (editorialId: number): Promise<Libro[]> => {
    return await prisma.libro.findMany({
      where: { id_Editorial: editorialId }
    });
  },

  updateStock: async (id: number, quantity: number): Promise<Libro> => {
    return await prisma.libro.update({
      where: { id_Libro: id },
      data: { cantidad: quantity }
    });
  },

  updateState: async (id: number, state: Libro_Estado): Promise<Libro> => {
    return await prisma.libro.update({
      where: { id_Libro: id },
      data: { Estado: state }
    });
  }
  ,
 getAutoresPorLibro: async (idLibro: number) => {
    const libroConAutores = await prisma.libro.findUnique({
      where: { id_Libro: idLibro },
      include: {
        Libro_Autor: {
          include: {
            Autor: true
          }
        }
      }
    });

    if (!libroConAutores) return null;

    // Extrae solo los autores
    return libroConAutores.Libro_Autor.map(la => la.Autor);
  }
};