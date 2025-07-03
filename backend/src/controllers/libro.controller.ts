import {Request, Response} from 'express';
import { libroService } from '../services/libro.service';

export const libroController = {
    async getAll(req: Request, res: Response) {
        const libros = await libroService.getAll();
        res.json(libros);
    },
    async getById(req: Request, res: Response) {
        const id = Number(req.params['id']);
        const libro = await libroService.getById(id);
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).json({ error: 'Libro not found' });
        }
    },
    async create(req: Request, res: Response) {
        const nuevo = await libroService.create(req.body);
        res.status(201).json(nuevo);
    },
    async update(req: Request, res: Response) {
        const id = Number(req.params['id']);
        const actualizada = await libroService.update(id, req.body);
        res.json(actualizada);  
    },
    async remove(req: Request, res: Response) {
        const id = Number(req.params['id']);
        await libroService.remove(id);
        res.sendStatus(204);
    },
    async obtenerAutoresPorLibro(req: Request, res: Response) {
        const idLibro = Number(req.params['id']);
        const autores = await libroService.getAutoresPorLibro(idLibro);
        if (autores) {
            res.json(autores);
        } else {
            res.status(404).json({ error: 'Autores not found for this book' });
        }
    }   
};