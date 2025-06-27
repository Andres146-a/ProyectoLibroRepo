import {Request, Response} from 'express';
import { editorialService } from '../services/editorial.service';

export const editorialController = { 
    //Busqueda Total de editoriales.
    async getAll (req: Request, res: Response) {
        const editoriales = await editorialService.getAll();
        res.json(editoriales);
    },
    //Busqueda total por ID
    async getById(req: Request, res: Response) {
        const id = Number(req.params['id']);
        const editorial = await editorialService.getById(id);
        if (editorial) {
            res.json(editorial);
        } else {
            res.status(404).json({ error: 'Editorial not found' });
        }
    },
    //Funcion Create para editoriales
    async create (req: Request, res: Response) {
        const nueva = await editorialService.create(req.body);
        res.status(201).json(nueva);
    },
    //Funcion Update para editoriales
    async update (req: Request, res: Response) {
      const id = Number(req.params['id']);
      const actualizada = await editorialService.update(id, req.body);
      res.json(actualizada);  
    },
    //Funcion Delete para editoriales
    async remove (req: Request, res: Response) {
        const id = Number(req.params['id']);
        await editorialService.remove(id);
        res.sendStatus(204);
    }
};