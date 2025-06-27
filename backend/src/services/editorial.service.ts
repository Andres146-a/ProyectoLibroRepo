import { editorialRepository } from '../repositories/editorial.repository';
import { Editorial } from '@prisma/client'; // Si usas Prisma directamente

export const editorialService = {
  getAll: async (): Promise<Editorial[]> => {
    return await editorialRepository.findAll();
  },

  getById: async (id: number): Promise<Editorial | null> => {
    return await editorialRepository.findById(id);
  },

  create: async (data: Editorial): Promise<Editorial> => {
    return await editorialRepository.create(data);
  },

  update: async (id: number, data: Editorial): Promise<Editorial> => {
    return await editorialRepository.update(id, data);
  },

  remove: async (id: number): Promise<void> => {
    await editorialRepository.delete(id);
  },
};
