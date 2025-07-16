import {Request, Response, RequestHandler} from 'express';
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
        console.log('📥 PUT recibido para actualizar libro:', id);
  console.log('📤 Body recibido:', req.body);
        const actualizada = await libroService.update(id, req.body);
        res.json(actualizada);  
    },
    async remove(req: Request, res: Response) {
        const id = Number(req.params['id']);
        await libroService.remove(id);
        res.sendStatus(204);
    },
   deleteMany:  (async (req, res) => {
      const ids: number[] = req.body.ids;
      if (!Array.isArray(ids) || !ids.every(id => typeof id === 'number')) {
        return res.status(400).json({ error: 'Invalid IDs format' });
      }
      try {
        const result = await libroService.deleteMany(ids);  
        res.status(200).json({ message: 'Libros eliminados correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }) as RequestHandler,
    obtenerAutoresPorLibro: (async (req, res) => {
      const idLibro = Number(req.params.id);
      console.log('ID del libro recibido:', idLibro);

  if (isNaN(idLibro)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const autores = await libroService.getAutoresPorLibro(idLibro);
    if (autores && autores.length > 0) {
      res.json(autores);
    } else {
      res.status(404).json({ error: 'Autores not found for this book' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}) as RequestHandler
};
