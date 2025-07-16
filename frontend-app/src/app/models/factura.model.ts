export interface Factura {
  id_Compra: number;
  fecha_compra: string;
  total: number;
  id_Cliente: number;
  detalles: {
    cantidad: number;
    precio_uni: number;
    id_Libro: number;
  }[];
}
