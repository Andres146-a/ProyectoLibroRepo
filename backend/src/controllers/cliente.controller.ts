import {Request, Response} from 'express';
import { clienteService} from '../services/cliente.servie';

export const clienteController = {
    async getAll(req: Request, res: Response) {
        const clientes = await clienteService.getAll();
        res.json(clientes);
    },

    async getById(req: Request, res: Response) {
        const id = Number(req.params['id']);
        const cliente = await clienteService.getById(id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente not found' });
        }
    },

    async create(req: Request, res: Response) {
        const nuevo = await clienteService.create(req.body);
        res.status(201).json(nuevo);
    },

    async update(req: Request, res: Response) {
        const id = Number(req.params['id']);
        const actualizada = await clienteService.update(id, req.body);
        res.json(actualizada);  
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params['id']);
        await clienteService.remove(id);
        res.sendStatus(204);
    }
};