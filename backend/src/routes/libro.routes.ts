import { Router } from 'express';
import {  libroController } from '../controllers/libro.controller';
const router = Router();

router.post('/deleteMany', libroController.deleteMany);
router.get('/autores/libro/:id', libroController.obtenerAutoresPorLibro);

router.get('/', libroController.getAll);
router.get('/:id', libroController.getById);
router.post('/', libroController.create);
router.put('/:id', libroController.update);
router.delete('/:id', libroController.remove);
export const libroRouter = router;