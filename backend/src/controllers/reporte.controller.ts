import { Request, Response } from 'express';
import { reporteService } from '../services/reporte.service';

export const reporteController = {
  async librosMasVendidos(req: Request, res: Response) {
    try {
      const data = await reporteService.obtenerReporteMasVendidos() as any[];
          const dataLimpia = data.map((item: any) => ({
      ...item,
      totalVentas: Number(item.totalVentas)  // 👈 esto arregla el error
    }));
      res.json(dataLimpia);
    } catch (error) {
      console.error("❌ Error en reporteController.librosMasVendidos:", error);
      res.status(500).json({ error: 'Error al obtener el reporte' });
    }
  },
   async ventasMensuales(req: Request, res: Response) {
    try {
      const datos = await reporteService.getVentasMensuales();
      res.json(datos);
    } catch (error) {
      console.error('❌ Error en reporte ventas:', error);
      res.status(500).json({ error: 'Error al generar reporte de ventas mensuales' });
    }
  },
   async librosBajaRotacion(req: Request, res: Response) {
    try {
      const libros = await reporteService.getLibrosBajaRotacion();
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: '❌  Error al obtener libros de baja rotación' });
    }
  },
  async librosBestSellers(req: Request, res: Response) {
  try {
    const libros = await reporteService.getLibrosBestSellers();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libros Best Sellers' });
  }
},
async ventasMensualesFiltradas(req: Request, res: Response) {
  try {
    const { sucursal, rango } = req.query;

    const ventas = await reporteService.getVentasMensualesFiltradas(
      sucursal?.toString() || '',
      parseInt(rango?.toString() || '30')
    );

    res.json(ventas);
  } catch (error) {
    console.error('❌ Error al obtener ventas filtradas:', error);
    res.status(500).json({ error: 'Error al obtener ventas mensuales filtradas' });
  }
}
,
async ventasSemanales(req: Request, res: Response) {
  try {
    const ventas = await reporteService.getVentasSemanales();
    res.json(ventas);
  } catch (error) {
    console.error('❌ Error al obtener ventas semanales:', error);
    res.status(500).json({ error: 'Error al obtener ventas semanales' });
  }
}


};
