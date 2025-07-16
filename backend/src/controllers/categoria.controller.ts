// controllers/categoria.controller.ts
import { Request, Response } from 'express';
import { CategoriaService } from '../services/categoria.service';

const categoriaService = new CategoriaService();

export const CategoriasController = async (req: Request, res: Response) => {
  try {
    const categorias = await categoriaService.obtenerCategorias();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};
