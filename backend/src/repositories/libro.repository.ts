import { PrismaClient, Libro, Libro_Estado } from '@prisma/client';

import { customAlphabet } from 'nanoid';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const libroRepository = {
  findAll: async () => {
  return await prisma.libro.findMany({
    orderBy: { id_Libro: 'asc' }
  });
},

  findById: async (id: number): Promise<Libro | null> => {
    return await prisma.libro.findUnique({ 
      where: { id_Libro: id },
      include: {
        editorial: true,
        Libro_Autor: true,
      categoria: true
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
    bestSellers,
    Estado,
    autores,
    id_Categoria // ✅ ahora extraído directamente
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
    editorial: {
      connect: { id_Editorial }
    },
    ...(id_Categoria && {
      categoria: {
        connect: { id_Categoria }
      }
    }),
    BestSellers: bestSellers,
    Estado: estadoValido,
    ISBN: generarISBN()
  }
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
    bestSellers,
    Estado,
    id_Categoria
  });

    return nuevoLibro;
  },
  
 update: async (
  id: number,
  data: any
): Promise<Libro> => {
  // ✅ Mapeo explícito y seguro
  const titulo = data.titulo;
  const precio = data.precio;
  const cantidad = data.cantidad;
  const id_Editorial = data.id_Editorial;
  const estado = data.estado;
  const autores = data.autores;
  const fecha = data.fechaPublicacion;
  const bestSellers = data.bestSellers;
  const id_Categoria = data.id_Categoria;
  const fechaValida = fecha && !isNaN(Date.parse(fecha)) ? new Date(fecha) : undefined;
  const estadoValido = estado && Object.values(Libro_Estado).includes(estado as Libro_Estado)
    ? estado
    : undefined;

  console.log('📤 Actualizando libro con:', {
    id,
    titulo,
    fechaValida,
    precio,
    cantidad,
    id_Editorial,
    bestSellers,
    estadoValido,
    autores,
    id_Categoria
  });

 const libroActualizado = await prisma.libro.update({
  where: { id_Libro: id },
  data: {
  BestSellers: bestSellers,
  Titulo: titulo,
  Fechap: fechaValida,
  preciov: precio,
  cantidad,
  ...(id_Editorial && {
    editorial: {
      connect: { id_Editorial }
    }
  }),
  ...(id_Categoria && {
    categoria: {
      connect: { id_Categoria }
    }
  }),
  Estado: estadoValido
}

});


  await prisma.libro_Autor.deleteMany({ where: { id_Libro: id } });

  if (Array.isArray(autores)) {
    await Promise.all(
      autores.map((idAutor: number) =>
        prisma.libro_Autor.create({
          data: {
            id_Libro: id,
            id_Autor: idAutor
          }
        })
      )
    );
  }

  return prisma.libro.findUnique({
    where: { id_Libro: id },
    include: {
      Libro_Autor: { include: { Autor: true } },
      editorial: true,
      categoria: true
    }
  }) as Promise<Libro>;
}

,
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
    console.log('ID recibido en repository:', idLibro); 
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


    return libroConAutores.Libro_Autor.map(la => la.Autor);
  }
};