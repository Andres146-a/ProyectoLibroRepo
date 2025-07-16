import { get } from 'http';
import { reporteRepository } from '../repositories/reporte.repository';

export const reporteService = {
  async obtenerReporteMasVendidos() {
    return await reporteRepository.getLibrosMasVendidosPorCategoria();
  },
  getVentasMensuales: async () => {
    return await reporteRepository.ventasMensuales();
  },
    getLibrosBajaRotacion: async () => {
    return await reporteRepository.librosBajaRotacion();
  },
  getLibrosBestSellers: async () => {
  return await reporteRepository.librosBestSellers();
},
  getVentasMensualesFiltradas: async (sucursal: string, rangoDias: number) => {
    return await reporteRepository.ventasMensualesFiltradas(sucursal, rangoDias);
  },
  getVentasSemanales: async () => {
  return await reporteRepository.ventasSemanales();
}


};
