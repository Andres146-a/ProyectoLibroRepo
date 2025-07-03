import { autorRepository } from '../repositories/autor.repository';

export const autorService = {
  
  getAll: async () => {
    return await autorRepository.findAll();
  }
  ,
  getById: async (id: number) => {
    return await autorRepository.findById(id);
  },
  create: async (data: any) => {
    return await autorRepository.create(data);
  },
  update: async (id: number, data: any) => {
    return await autorRepository.update(id, data);
  },
  remove: async (id: number) => {
    await autorRepository.delete(id);
  }     
};
