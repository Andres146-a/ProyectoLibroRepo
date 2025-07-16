import { get } from 'http';
import { libroRepository } from '../repositories/libro.repository';
import { Libro} from '@prisma/client'; // Si usas Prisma directamente

export const libroService = {
  getAll: async () => {
    return await libroRepository.findAll();
  },
  getById: async (id: number) => {
    return await libroRepository.findById(id);
  },
  create: async (data: any) => {
    return await libroRepository.create(data);
  },
  update: async (id: number, data: any) => {
    return await libroRepository.update(id, data);
  },
  remove: async (id: number) => {
    await libroRepository.delete(id);
  },
  getAutoresPorLibro: async (id: number) => {
    return await libroRepository.getAutoresPorLibro(id);
  },
  deleteMany: (ids: number[]) => {
  return (libroRepository.deleteMany(ids));
}

};
