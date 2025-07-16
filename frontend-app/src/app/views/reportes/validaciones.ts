import Swal from 'sweetalert2';

export class ValidacionesReportes {
  
  static validarFiltroAnio(anio: number | string, disponibles: number[]): boolean {
    if (!anio || !disponibles.includes(+anio)) {
      Swal.fire('⚠️ Filtro inválido', 'Selecciona un año válido.', 'warning');
      return false;
    }
    return true;
  }

  static validarFiltroMes(mes: string, disponibles: string[]): boolean {
    if (!mes || !disponibles.includes(mes)) {
      Swal.fire('⚠️ Filtro inválido', 'Selecciona un mes válido.', 'warning');
      return false;
    }
    return true;
  }

  static validarFiltroSemana(anio: number, mes: string, semana: number): boolean {
    if (!anio || !mes || semana === null || semana === undefined) {
      Swal.fire('⚠️ Filtro incompleto', 'Selecciona año, mes y semana.', 'warning');
      return false;
    }
    return true;
  }

  static validarDatosCategoria(grupo: any): boolean {
    if (!grupo || !grupo.libros || grupo.libros.length === 0) {
      Swal.fire('📚 Sin datos', 'No hay libros en esta categoría.', 'info');
      return false;
    }
    return true;
  }

  static validarTipoFiltro(tipo: string): boolean {
    const tiposPermitidos = ['anio', 'mes', 'semana', 'bajo', 'best', 'categoria'];
    if (!tiposPermitidos.includes(tipo)) {
      Swal.fire('❌ Tipo inválido', `El tipo de filtro "${tipo}" no es permitido.`, 'error');
      return false;
    }
    return true;
  }
}
