import { Request, Response } from 'express';
import { autorService } from '../services/autor.service';

export const autorController = {
  async getAll(req: Request, res: Response) {
    const autores = await autorService.getAll();
    res.json(autores);
  },
  async getById(req: Request, res: Response) {
    const id = Number(req.params['id']);
    const autor = await autorService.getById(id);
    if (autor) {
      res.json(autor);
    } else {
      res.status(404).json({ error: 'Autor not found' });
    }    
  } ,
 async create(req: Request, res: Response) {
  try {
    console.log('Datos recibidos para crear autor:', req.body);
    const nuevo = await autorService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear autor' });
  }
},
  async update(req: Request, res: Response) {
    
    const id = Number(req.params['id']);
    const actualizada = await autorService.update(id, req.body);
    console.log('📥 PUT recibido para actualizar autor:', id);
    console.log('📤 Body recibido para actualizar autor:', req.body);

    res.json(actualizada);
    
  },
  async remove(req: Request, res: Response) {
    const id = Number(req.params['id']);
    await autorService.remove(id);
    res.sendStatus(204);
  } 
};

