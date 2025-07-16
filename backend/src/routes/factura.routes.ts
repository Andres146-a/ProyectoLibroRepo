import { Router } from 'express';
import { facturaController } from '../controllers/factura.controller';

const router = Router();

router.get('/', facturaController.getAll);
router.get('/:id', facturaController.getById);
router.post('/', facturaController.create);
router.put('/:id', facturaController.update);
router.delete('/:id', facturaController.remove);

export default router;