// validacion.ts

// Validación para Email de Autor - Casi lo mismo que en Editorial.
export function validarEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}


export function validarNombre(nombre: string): boolean {
  const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]{2,200}$/; // Letras, tildes, ñ, espacios, guiones, apóstrofes
  return regex.test(nombre);
}
export function validarEstado(estado: string, valoresPermitidos: string[]): boolean {
  return valoresPermitidos.includes(estado);
}
export function validarFormularioAutor(
  nombre: string,
  email: string,
  estado: string,
  estadosPermitidos: string[] = ['ACTIVO', 'INACTIVO']
): string[] {
  const errores: string[] = [];

  if (!nombre.trim()) {
    errores.push('• El campo NOMBRE es obligatorio.');
  } else if (!validarNombre(nombre.trim())) {
    errores.push('• El NOMBRE solo debe contener letras válidas (mínimo 2, máximo 200).');
  }

  if (!email.trim()) {
    errores.push('• El campo EMAIL es obligatorio.');
  } else if (!validarEmail(email.trim())) {
    errores.push('• El EMAIL no tiene un formato válido.');
  }

  if (!estado) {
    errores.push('• El campo ESTADO es obligatorio.');
  } else if (!validarEstado(estado, estadosPermitidos)) {
    errores.push('• El ESTADO seleccionado no es válido.');
  }

  return errores;
}
export function validarEstadoAutor(estado: string): boolean {
  const estadosValidos = ['ACTIVO', 'INACTIVO'];
  return estadosValidos.includes(estado.toUpperCase());
}



