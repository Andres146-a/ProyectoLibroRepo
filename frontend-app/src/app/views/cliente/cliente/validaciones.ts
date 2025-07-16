

// Cédula: exactamente 10 dígitos numéricos
export function validarCedula(cedula: string): boolean {
  return /^\d{10}$/.test(cedula.trim());
}


// Nombre y Apellido: solo letras y espacios (máx. 50 caracteres)
export function validarNombreOApellido(nombre: string): boolean {
  const regex = /^[a-zA-ZÀ-ÿ\s]{1,50}$/;
  return regex.test(nombre.trim());
}

// Fecha de nacimiento válida
export function validarFechaNacimiento(fecha: string): string | null {
  if (!fecha) return 'Debe ingresar la fecha de nacimiento.';

  const fechaNacimiento = new Date(fecha);
  const hoy = new Date();
  if (isNaN(fechaNacimiento.getTime())) return 'La fecha ingresada no es válida.';

  if (fechaNacimiento > hoy) return 'La fecha no puede ser futura.';

  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  const dia = hoy.getDate() - fechaNacimiento.getDate();

  const edadReal = mes < 0 || (mes === 0 && dia < 0) ? edad - 1 : edad;
  if (edadReal < 18) return 'El cliente debe ser mayor de edad (mínimo 18 años).';

  return null; // todo válido
}

// Dirección: entre 5 y 100 caracteres
export function validarDireccion(direccion: string): boolean {
  return typeof direccion === 'string' && direccion.trim().length >= 5 && direccion.trim().length <= 100;
}

// Teléfono: exactamente 10 dígitos numéricos
export function validarTelefono(telefono: string): boolean {
  const regex = /^\d{10}$/;
  return regex.test(telefono);
}

// Estado: debe ser ACTIVO o INACTIVO (insensible a mayúsculas)
export function validarEstadoCliente(estado: string): boolean {
  const estadosValidos = ['ACTIVO', 'INACTIVO'];
  return estadosValidos.includes(estado.toUpperCase());
}

// Validación completa del formulario de registrar/actualizar cliente
export function validarFormularioCliente(
  cedula: string,
  nombre: string,
  apellido: string,
  fechaN: string,
  direccion: string,
  telefono: string,
  estado: string
): string[] {
  const errores: string[] = [];

  if (!cedula || !validarCedula(cedula)) errores.push('✔ La **CÉDULA** debe tener exactamente 10 dígitos numéricos.');
  if (!nombre || !validarNombreOApellido(nombre)) errores.push('✔ El **NOMBRE** solo debe contener letras y tener máximo 50 caracteres.');
  if (!apellido || !validarNombreOApellido(apellido)) errores.push('✔ El **APELLIDO** solo debe contener letras y tener máximo 50 caracteres.');
    const errorFecha = validarFechaNacimiento(fechaN);
  if (errorFecha) errores.push(`✔ ${errorFecha}`);

  if (!direccion || !validarDireccion(direccion)) errores.push('✔ La **DIRECCIÓN** debe tener entre 5 y 100 caracteres.');
  if (!telefono || !validarTelefono(telefono)) errores.push('✔ El **TELÉFONO** debe tener entre 7 y 15 dígitos numéricos.');
  if (!estado || !validarEstadoCliente(estado)) errores.push('✔ Debe seleccionarse un **ESTADO** válido (ACTIVO o INACTIVO).');

  return errores;
}


// Validación para eliminar clientes seleccionados
export function validarClientesSeleccionados(clientes: any[]): string | null {
  const seleccionados = clientes.filter(cliente => cliente.seleccionado);
  if (seleccionados.length === 0) {
    return 'Debes seleccionar al menos un cliente para eliminar.';
  }
  return null;
}
