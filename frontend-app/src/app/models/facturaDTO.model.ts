export interface NuevaFacturaDTO {

  total: number;
  id_Cliente: number;
  detalles: {
    cantidad: number;
    precio_uni: number;
    id_Libro: number;
  }[];
}
