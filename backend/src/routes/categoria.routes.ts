import { Router } from 'express';
import { CategoriasController } from '../controllers/categoria.controller';

const router = Router();

router.get('/', CategoriasController);


export default router;
