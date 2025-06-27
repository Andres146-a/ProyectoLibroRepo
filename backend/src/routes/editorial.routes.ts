import { Router } from 'express';
import { editorialController } from '../controllers/editorial.controller';
const router = Router();

router.get('/', editorialController.getAll);
router.get('/:id', editorialController.getById);
router.post('/', editorialController.create);
router.put('/:id', editorialController.update);
router.delete('/:id', editorialController.remove);

export default router;