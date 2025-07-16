// validarEditorial.ts
// Validación para Email de Editorial - Casi lo mismo que en Autor.
export function validarEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gob|mil|info|biz|co|ec|es)$/i;
  return regex.test(email);
}

// Validación para Nombre de Editorial - Acepta letras, espacios y tildes.
export function validarNombre(nombre: string): boolean {
  const limpio = nombre.trim();
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\-\'\.]+$/; // letras, números, espacios, guiones, apóstrofes
  return regex.test(limpio) && limpio.length >= 2 && limpio.length <= 100;
}


// Validación para Teléfono de Editorial - Acepta números, espacios, guiones y paréntesis.
// Permite números de 1 a 10 dígitos, sin espacios ni caracteres especiales y solo para Ecuador. 
// En el sentido de que no se podria usar el  +505 de Nicaragua, por ejemplo.
// No se valida el formato internacional, solo números locales.
// Ejemplo: "0987654321", "098-765-4321", "
export function validarTelefono(telefono: string): boolean {
  if (!telefono) return false;

  // Solo permite dígitos del 0 al 9, con una longitud entre 7 y 15
  const regex = /^\d{7,15}$/;

  return regex.test(telefono);
}
export function validarSitioWeb(sitioWeb: string): boolean {
  const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.(com|org|net|edu|gob|mil|info|biz|co|ec|es)$/i;
  return regex.test(sitioWeb) && sitioWeb.length <= 255;
}

export function validarFormulario(nombre: any, email: any, telefono: any, sitioWeb: any): string[] {
  const errores: string[] = [];

  const nombreLimpio = String(nombre).trim();
  const emailLimpio = String(email).trim();
  const telefonoLimpio = String(telefono).trim();
  const sitioWebLimpio = String(sitioWeb).trim();

  if (!nombreLimpio) errores.push('• El campo NOMBRE es obligatorio.');
  else if (!validarNombre(nombreLimpio)) errores.push('• El NOMBRE debe tener entre 2 y 100 caracteres y solo letras, espacios, guiones o apóstrofes.');

  if (!emailLimpio) errores.push('• El campo EMAIL es obligatorio.');
  else if (/\s/.test(emailLimpio)) errores.push('• El EMAIL no debe contener espacios.');
  else if (!validarEmail(emailLimpio)) errores.push('• El EMAIL no tiene un formato válido.');

  if (!telefonoLimpio) errores.push('• El campo TELÉFONO es obligatorio.');
  else if (!validarTelefono(telefonoLimpio)) errores.push('• El TELÉFONO debe contener entre 7 y 15 dígitos (puede incluir +, -, espacios o paréntesis).');

  if (!sitioWebLimpio) errores.push('• El campo SITIO WEB es obligatorio.');
  else if (!validarSitioWeb(sitioWebLimpio)) errores.push('• El SITIO WEB debe tener un formato válido (ej: https://editorial.com).');

  return errores;
}

