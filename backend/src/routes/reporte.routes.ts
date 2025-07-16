import { Router } from 'express';
import { reporteController } from '../controllers/reporte.controller';

const router = Router();

router.get('/libros-mas-vendidos', reporteController.librosMasVendidos);
router.get('/ventas-mensuales', reporteController.ventasMensuales);
router.get('/baja-rotacion', reporteController.librosBajaRotacion);
router.get('/best-sellers', reporteController.librosBestSellers);
router.get('/ventas-semanales', reporteController.ventasSemanales);

export default router;
