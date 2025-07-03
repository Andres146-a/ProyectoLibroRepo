import {get}from 'http';
import {ClienteRepository } from '../repositories/cliente.repository';
import { Cliente } from '@prisma/client'; // Si usas Prisma directamente

export const clienteService = {
    getAll: async () => {
        return await ClienteRepository.findAll();
    },
    getById: async (id: number) => {
        return await ClienteRepository.findById(id);
    },
    create: async (data: any) => {
        return await ClienteRepository.create(data);
    },
    update: async (id: number, data: any) => {
        return await ClienteRepository.update(id, data);
    },
    remove: async (id: number) => {
        await ClienteRepository.delete(id);
    }
    // Puedes agregar más métodos según sea necesario
}