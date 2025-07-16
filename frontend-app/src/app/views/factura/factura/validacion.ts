// src/utils/validaciones.ts
export function formatearPrecio(valor: number): string {
  return `$${valor.toFixed(2)}`;
}

export function obtenerFechaHoraActual(): string {
  const ahora = new Date();
  const fecha = ahora.toISOString().split("T")[0];
  const hora = ahora.toTimeString().split(" ")[0];
  return `${fecha} ${hora}`;
}
 
export function validarFecha(fechaStr: string): boolean {
  if (!fechaStr) return false;

  const fecha = new Date(fechaStr);
  if (isNaN(fecha.getTime())) return false;

  const hoy = new Date();

  if (fecha > hoy) return false;

  return true;
}

export function campoNoVacio(texto: string): boolean {
  return texto.trim().length > 0;
}
