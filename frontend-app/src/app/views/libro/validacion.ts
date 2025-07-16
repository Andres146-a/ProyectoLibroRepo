// validarLibro.ts

// Función que valida el título (letras, números, símbolos básicos)
export function validarTitulo(titulo: string): boolean {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.,\-()]+$/;
  const limpio = titulo.trim();
  return (
    !!limpio &&
    regex.test(limpio) &&
    limpio.length >= 2 &&
    limpio.length <= 100
  );
}

// Función que valida que la fecha sea válida
// validarLibro.ts
export function esFechaValida(fecha: string): boolean {
  if (!fecha) return false;

  let partes: string[] = [];
  let dia: number, mes: number, anio: number;

  if (fecha.includes('/')) {
    partes = fecha.split('/');
    if (partes.length !== 3) return false;
    [dia, mes, anio] = partes.map(Number);
  } else if (fecha.includes('-')) {
    partes = fecha.split('-');
    if (partes.length !== 3) return false;
    [anio, mes, dia] = partes.map(Number); // yyyy-mm-dd
  } else {
    return false;
  }

  if (isNaN(dia) || isNaN(mes) || isNaN(anio)) return false;
  if (anio < 1900 || anio > new Date().getFullYear()) return false;

  const fechaObj = new Date(anio, mes - 1, dia);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // para evitar errores por hora

  return (
    fechaObj.getFullYear() === anio &&
    fechaObj.getMonth() === mes - 1 &&
    fechaObj.getDate() === dia &&
    fechaObj <= hoy
  );
}
export function validarCategoria(idCategoria: number | null | undefined): boolean {
  return typeof idCategoria === 'number' && idCategoria > 0;
}

// Luego simplemente:
export const validarFecha = esFechaValida;



// Función que valida que la cantidad sea un entero ≥ 0
export function validarCantidad(cantidad: number): boolean {
  return Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= 10000;
}
export function validarEditorial(editorial: any): boolean {
  return editorial !== null && typeof editorial === 'object' && 'id_Editorial' in editorial;
}
export function validarAutores(autores: any[]): boolean {
  return Array.isArray(autores) && autores.length > 0;
}

// Función que valida que el precio sea un número > 0
export function validarPrecio(precio: number): boolean {
  const decimalRegex = /^\d+(\.\d{1,2})?$/;
  return (
    typeof precio === 'number' &&
    precio >= 0.01 &&
    precio <= 1000000 &&
    decimalRegex.test(precio.toString())
  );
}
// Función que valida que el estado sea uno válido
export function validarEstado(estado: string): boolean {
  const estadosValidos = ['DISPONIBLE', 'AGOTADO' ];
  return estadosValidos.includes(estado.toUpperCase());
}

 
// En esta funcion es para validar el formulario de Agregar y Actyalziar para crear o actualizar
export function validarFormularioLibro(
  titulo: string,
  fechaPublicacion: string,
  cantidad: number,
  precio: number,
  estado: string,
  editorial: any,
  bestSellers: boolean,
  idCategoria: number | null | undefined,
  autores: any[]
): string[] {
  const errores: string[] = [];

  if (!titulo.trim()) {
    errores.push('El TÍTULO es obligatorio.');
  } else if (!validarTitulo(titulo)) {
    errores.push('El TÍTULO debe tener entre 2 y 100 caracteres y no contener símbolos especiales no permitidos.');
  }
  
  if (!fechaPublicacion.trim()) {
    errores.push('La FECHA DE PUBLICACIÓN es obligatoria.');
  } else if (!validarFecha(fechaPublicacion)) {
    errores.push('La FECHA DE PUBLICACIÓN debe tener formato dd/mm/yyyy, ser válida, no futura, y tener un año entre 1900 y el actual.');
  }
 if (!validarCategoria(idCategoria)) {
    errores.push('Debes seleccionar una CATEGORÍA válida.');
  }
  if (!validarCantidad(cantidad)) {
    errores.push('La CANTIDAD debe ser un número entero entre 1 y 10,000.');
  }

  if (!validarPrecio(precio)) {
    errores.push('El PRECIO debe ser mayor a 0, tener hasta 2 decimales y no superar $1,000,000.');
  }

  if (!validarEstado(estado)) {
    errores.push('Selecciona un ESTADO válido.');
  }

  if (!validarEditorial(editorial)) {
    errores.push('Debes seleccionar una EDITORIAL.');
  }

  if (!validarAutores(autores)) {
    errores.push('Debes seleccionar al menos un AUTOR.');
  }

  return errores;
}


// Validación para eliminar libros seleccionados
export function validarLibrosSeleccionados(libros: any[]): string | null {
  const seleccionados = libros.filter(libro => libro.seleccionado);
  if (seleccionados.length === 0) return 'Debes seleccionar al menos un libro para eliminar.';
  return null;
}

export function validarSeleccionLibro(idLibroSeleccionado: number | null): string | null {
  if (idLibroSeleccionado === null || isNaN(idLibroSeleccionado)) {
    return 'Debes seleccionar un libro antes de actualizar.';
  }
  return null;
}