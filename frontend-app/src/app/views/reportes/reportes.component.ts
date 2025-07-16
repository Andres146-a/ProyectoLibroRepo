import { Component, OnInit,  NgZone} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para ngModel
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ReporteService } from '../../services/reporte.service';
import { ValidacionesReportes } from './validaciones';
import Swal from 'sweetalert2';
interface LibroPorCategoria {
  codCategoria: string;
  nombreCategoria: string;
  libros: any[];
}


@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Agrega estos módulos
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements OnInit{
  sidebarCollapsed: boolean = false;
  datosReporteAgrupado: { [anio: string]: any[] } = {};
tipoFiltro: 'anio' | 'bajo' | 'mes' | 'semana' | 'best' | 'categoria' = 'anio';

datosReporteOriginal: { [anio: string]: any[] } = {};

datosSemanaComparativo: any[] = [];
semanaSeleccionada: string = '';
semanasDisponibles: string[] = Array.from({ length: 52 }, (_, i) => (i + 1).toString());


totalVentas: number = 0;
porcentajeCambioVentas: number = 0;

totalLibrosBajaRotacion: number = 0;
porcentajeTendenciaBaja: number = 0; // solo si deseas que sea dinámico también

totalCategorias: number = 0;
totalBestSellers: number = 0;



anioSeleccionado: string = '';
mesSeleccionado: string = '';
aniosDisponibles: string[] = [];
mesesDisponibles = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
datosReporteAgrupadoOriginal: { [anio: string]: any[] } = {};
datosMesComparativo: any[] = [];

datosReportePorCategoria: any[] = [];
  
  mostrarModal: boolean = false;
  tituloModal: string = '';
  columnas: string[] = [];
  datosReporte: any[] = [];
  datosReporteBestSellers: { [key: string]: any[] } = {};
  librosPorCategoria: any[] = [];
librosBajaRotacion: any[] = [];
librosBestSellers: any[] = [];

  sucursales = ['Sucursal Central', 'Sucursal Norte'];
  sucursalSeleccionada = 'Sucursal Central'; // 👈 Esto también estaba faltando
  rango = '30';
  
 constructor(private reporteService: ReporteService, private ngZone: NgZone) {}
 
  ngOnInit() {
    this.totalVentas = this.datosMesComparativo.reduce((acc, val) => acc + val.total_ventas, 0);

if (this.datosMesComparativo.length >= 2) {
  const actual = this.datosMesComparativo[this.datosMesComparativo.length - 1].total_ventas;
  const anterior = this.datosMesComparativo[this.datosMesComparativo.length - 2].total_ventas;
  this.porcentajeCambioVentas = anterior > 0 ? ((actual - anterior) / anterior) * 100 : 0;
}

this.totalLibrosBajaRotacion = this.librosBajaRotacion.length;
this.totalCategorias = this.datosReportePorCategoria.length;
this.totalBestSellers = Object.values(this.datosReporteBestSellers).flat().length;

    this.mesSeleccionado = '1';
  this.reporteService.getLibrosMasVendidosPorCategoria().subscribe(data => {
  const agrupado: any = {};
  for (const libro of data) {
    if (!agrupado[libro.codCategoria]) {
      agrupado[libro.codCategoria] = {
        codCategoria: libro.codCategoria,
        nombreCategoria: libro.nombreCategoria,
        libros: []
      };
    }
    agrupado[libro.codCategoria].libros.push(libro);
  }

  this.ngZone.run(() => {
    this.librosPorCategoria = Object.values(agrupado);

  });
});
}
 
esFiltroSemana(): boolean {
  return this.tipoFiltro === 'semana';
}

getModalIcon(): string {
  switch (this.tituloModal) {
    case '📅 Reporte de Ventas Mensuales':
      return '<i class="fas fa-chart-line"></i>';
    case '📚 Libros más Vendidos por Categoría':
      return '<i class="fas fa-tags"></i>';
    case '⭐ Libros Best Sellers':
      return '<i class="fas fa-star"></i>';
    case '🔻 Libros de Baja Rotación':
      return '<i class="fas fa-exclamation-triangle"></i>';
    default:
      return '<i class="fas fa-chart-bar"></i>';
  }
}

aplicarFiltros(): void {
  console.log('📌 Aplicando filtros: ', this.sucursalSeleccionada, this.rango);

  // Aquí puedes aplicar lógica para filtrar por sucursal/rango
  // Por ejemplo, volver a llamar a servicios con parámetros
  this.reporteService.getVentasMensualesFiltradas(this.sucursalSeleccionada, parseInt(this.rango))
    .subscribe(data => {
      this.datosReporteAgrupado = this.agruparVentasPorAnio(data);
      this.datosReporte = data;
      this.tituloModal = '📅 Reporte de Ventas Mensuales';
      this.mostrarModal = true;
    });
}

obtenerTotalVentas(grupo: any): number {
   console.log('▶️ Libros en categoría:', grupo.nombreCategoria, grupo.libros);
  return grupo.libros.reduce((sum: number, libro: any) => sum + libro.totalVentas, 0);
}
agruparVentasPorAnio(ventas: any[]): { [anio: string]: any[] } {
  const agrupado: { [anio: string]: any[] } = {};

  for (const venta of ventas) {
    const anio = venta.anio;
    if (!agrupado[anio]) {
      agrupado[anio] = [];
    }
    agrupado[anio].push(venta);
  }

  return agrupado;
}

agruparBestSellersPorRango(libros: any[]) {
  const rangos: Record<string, any[]> = {
    '🔥 1000+': [],
    '🔥 500-999': [],
    '🔥 100-499': [],
    '🔥 < 100': []
  };

  for (const libro of libros) {
    
    const ventas = Number(libro.ventas);
    if (ventas >= 1000) rangos['🔥 1000+'].push(libro);
    else if (ventas >= 500) rangos['🔥 500-999'].push(libro);
    else if (ventas >= 100) rangos['🔥 100-499'].push(libro);
    else rangos['🔥 < 100'].push(libro);
    console.log(libro.Titulo, '→ ventas:', libro.ventas, typeof libro.ventas);

  }

  return rangos;
}


abrirReporteVentasMensuales() {
  this.tituloModal = '📅 Reporte de Ventas Mensuales';

  this.reporteService.getVentasMensuales().subscribe(data => {
    this.datosReporte = data;
    const agrupado = this.agruparVentasPorAnio(data);

    for (const anio in agrupado) {
      agrupado[anio].forEach((venta) => {
        venta.mes = Number(venta.mes);
        venta.codigoReferencial = `${anio}-${String(venta.mes).padStart(2, '0')}`; // ✅ Aquí lo generas
      });
      agrupado[anio].sort((a, b) => a.mes - b.mes);
    }

    this.datosReporteAgrupado = agrupado;
    this.datosReporteOriginal = JSON.parse(JSON.stringify(agrupado));
    this.datosReporteAgrupadoOriginal = JSON.parse(JSON.stringify(agrupado));
    this.mostrarModal = true;
  });
}


cambiarFiltro(): void {
  this.anioSeleccionado = '';
  this.mesSeleccionado = '';
  this.datosReporteAgrupado = JSON.parse(JSON.stringify(this.datosReporteAgrupadoOriginal));

  switch (this.tipoFiltro) {
    case 'mes':
      this.filtrarPorMes();
      break;
    case 'semana':
      this.filtrarPorSemana();
      break;
  }
}

private convertirMesANumero(nombreMes: string): number {
  const nombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                   'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return nombres.indexOf(nombreMes) + 1;
}

abrirReporteVentasSemanales() {
  this.tituloModal = '📅 Reporte de Ventas Mensuales';
  this.tipoFiltro = 'semana';
  this.semanaSeleccionada = '1';

  this.reporteService.getVentasSemanales().subscribe((res: any[]) => {
    const agrupado = this.agruparVentasPorSemana(res); // ← ahora sí sin error

    this.datosReporteOriginal = agrupado;
    this.aniosDisponibles = Object.keys(agrupado);

    const semanasSet = new Set<number>();
    for (const registros of Object.values(agrupado)) {
      for (const registro of registros) {
        semanasSet.add(registro.semana);
      }
    }

    this.semanasDisponibles = Array.from(semanasSet)
      .sort((a, b) => a - b)
      .map(sem => sem.toString());
  });
}




filtrarPorMes() {
  // Validaciones antes de procesar
 
  if (!ValidacionesReportes.validarFiltroMes(this.mesSeleccionado, this.mesesDisponibles)) return;

  // Limpieza previa
  this.datosMesComparativo = [];

  const mesFiltrado = this.convertirMesANumero(this.mesSeleccionado);
  console.log('📌 Mes seleccionado (como nombre):', this.mesSeleccionado);
  console.log('📌 Mes filtrado (como número real):', mesFiltrado);

  for (const [anio, registros] of Object.entries(this.datosReporteOriginal)) {
    const mesData = registros.find((r: any) => Number(r.mes) === mesFiltrado);
    if (mesData) {
      this.datosMesComparativo.push({
        anio: anio,
        codigoReferencial: `${anio}-${String(mesFiltrado).padStart(2, '0')}`,
        ...mesData
      });
    }
  }

  this.datosMesComparativo.sort((a, b) => Number(a.anio) - Number(b.anio));
  console.log('📅 Datos comparativos por mes:', this.datosMesComparativo);
}




restablecerFiltro() {
  this.datosReporteAgrupado = { ...this.datosReporteOriginal };
  this.tipoFiltro = 'anio';
}

filtrarPorAnio(): void {
  if (this.anioSeleccionado && this.datosReporteAgrupadoOriginal[this.anioSeleccionado]) {
    this.datosReporteAgrupado = {
      [this.anioSeleccionado]: this.datosReporteAgrupadoOriginal[this.anioSeleccionado]
    };
  }
}
agruparVentasPorSemana(ventas: any[]): { [anio: string]: any[] }
{
  const agrupado: { [anio: string]: any[] } = {};

  for (const venta of ventas) {
    const anio = venta.anio;
    if (!agrupado[anio]) {
      agrupado[anio] = [];
    }
    agrupado[anio].push(venta);
  }

  // Ordenar semanas por año
  for (const anio in agrupado) {
    agrupado[anio].sort((a, b) => a.semana - b.semana);
  }

  return agrupado;
}




filtrarPorSemana() {
  
  this.datosSemanaComparativo = [];

  const semanaFiltrada = Number(this.semanaSeleccionada);
  const anioFiltrado = this.anioSeleccionado;

  if (anioFiltrado) {
    const registros = this.datosReporteOriginal[anioFiltrado];
    const semanaData = registros?.find((r: any) => Number(r.semana) === semanaFiltrada);
    if (semanaData) {
      this.datosSemanaComparativo.push({
        anio: anioFiltrado,
        ...semanaData
      });
    }
  } else {
    for (const [anio, registros] of Object.entries(this.datosReporteOriginal)) {
      const semanaData = registros.find((r: any) => Number(r.semana) === semanaFiltrada);
      if (semanaData) {
        this.datosSemanaComparativo.push({
          anio,
          ...semanaData
        });
      }
    }
  }

  this.datosSemanaComparativo.sort((a, b) => Number(a.anio) - Number(b.anio));
}


abrirModal(tipo: string) {
  this.aniosDisponibles = Object.keys(this.datosReporteAgrupado);
  this.tipoFiltro = 'anio'; // Resetea el filtro a 'anio'
  this.tituloModal = '';
  this.mostrarModal = true;

  switch (tipo) {
    
  case 'ventas':
  this.tituloModal = '📅 Reporte de Ventas Mensuales';
    this.tipoFiltro = 'mes'; // por defecto
      this.datosMesComparativo = []; // 🧼 limpia anteriores
      this.datosSemanaComparativo = [];

  this.reporteService.getVentasMensuales().subscribe(data => {
    this.datosReporte = data;
    this.datosReporteAgrupado = this.agruparVentasPorAnio(data);  
    
    for (const anio in this.datosReporteAgrupado) {
      this.datosReporteAgrupado[anio].forEach((venta) => {
        venta.mes = Number(venta.mes);
        venta.codigoReferencial = `${anio}-${String(venta.mes).padStart(2, '0')}`;
      });
      this.datosReporteAgrupado[anio].sort((a, b) => a.mes - b.mes);
    }

    // ✅ Ahora sí puedes obtener los años
    this.aniosDisponibles = Object.keys(this.datosReporteAgrupado);

    // ✅ Y copias profundas después de llenar datos
    this.datosReporteOriginal = JSON.parse(JSON.stringify(this.datosReporteAgrupado));
    this.datosReporteAgrupadoOriginal = JSON.parse(JSON.stringify(this.datosReporteAgrupado));

    this.mostrarModal = true;
     setTimeout(() => {
          this.mostrarModal = true;
        }, 100); 
  });
  break;


    case 'baja':
      
      this.tituloModal = '🔻 Libros de Baja Rotación';
      this.tipoFiltro = 'bajo';
     
      this.reporteService.getLibrosBajaRotacion().subscribe(data => {

        this.librosBajaRotacion = data;
        console.log('📉 Libros de baja rotación:', this.librosBajaRotacion);
      });
      break;

    case 'categoria':
      this.tituloModal = '📚 Libros más Vendidos por Categoría';
      this.tipoFiltro = 'categoria';
      this.reporteService.getLibrosMasVendidosPorCategoria().subscribe(data => {
        // Agrupamos los libros por categoría
            console.log('🔍 Libros recibidos por categoría:', data);
        const agrupado: any = {};
        for (const libro of data) {
          if (!agrupado[libro.codCategoria]) {
            agrupado[libro.codCategoria] = {
              codCategoria: libro.codCategoria, 
              nombreCategoria: libro.nombreCategoria,
              libros: []
            };
          }
          agrupado[libro.codCategoria].libros.push(libro);
        }
        this.datosReportePorCategoria = Object.values(agrupado);

        console.log('▶️ Agrupado por categoría:', this.datosReporteAgrupado);

      });
      break;

      case 'best':
      this.tituloModal = '⭐ Libros Best Sellers';
      this.tipoFiltro = 'best';
      this.reporteService.getLibrosBestSellers().subscribe(data => {
        console.log('📈 Libros Best Sellers:', data);
        this.datosReporteBestSellers = this.agruparBestSellersPorRango(data);
      });
      break;


  }
  
}
pluralizarLibro(cantidad: number): string {
  return cantidad === 1 ? 'libro' : 'libros';
}

getPrefijoCategoria(nombreCategoria: string): string {
  const mapa: { [key: string]: string } = {
    'Ficción': 'FIC',
    'Romance': 'ROM',
    'Ciencia Ficción': 'CIE',
    'Fantasía': 'FAN',
    'Drama': 'DRA',
    'Misterio': 'MIS',
    'Poesía': 'POE',
    'Terror': 'TER',
    'Biografía': 'BIO',
    'Historia': 'HIS',
    'Autoayuda': 'AUT',
    'Educativo': 'EDU',
   
  };

  return mapa[nombreCategoria] || 'GEN';
}


cargarVentasSemanales() {
  this.reporteService.getVentasSemanales().subscribe((res: any[]) => {
    const agrupado = this.agruparVentasPorSemana(res); // 👈 agrupamos por año

    this.datosReporteOriginal = agrupado; // ✅ ya es del tipo correcto

    this.aniosDisponibles = Object.keys(agrupado);

    const semanasSet = new Set<number>();
    for (const registros of Object.values(agrupado)) {
      for (const registro of registros) {
        semanasSet.add(registro.semana);
      }
    }

    this.semanasDisponibles = Array.from(semanasSet)
      .sort((a, b) => a - b)
      .map(sem => sem.toString());
  });
}

cerrarModal() {
  this.mostrarModal = false;
}
  librosDestacados = [
  {
    titulo: '1984',
    autor: 'George Orwell',
    precio: 18.75,
    ventas: 32,
    portada: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fd28ad30-8fbb-40cf-a7a5-5c72770835cb.png'
  },
  {
    titulo: 'El Principito',
    autor: 'Antoine de Saint-Exupéry',
    precio: 15.50,
    ventas: 38,
    portada: 'https://url-de-la-imagen.com/elprincipito.png'
  },
  // agrega más libros...
];
toggleSidebar(): void {

      this.sidebarCollapsed = !this.sidebarCollapsed;

  }
obtenerDatosSegunTipoFiltro(): any[] {
  if (this.tipoFiltro === 'mes') {
    return this.datosMesComparativo;
  } else if (this.tipoFiltro === 'anio') {
    return Object.values(this.datosReporteAgrupado).flat();
  } else if (this.tipoFiltro === 'bajo') {
    return this.librosBajaRotacion;
  } else if (this.tipoFiltro === 'categoria') {
    return this.datosReportePorCategoria;
  } else if (this.tipoFiltro === 'best') {
    // 🔥 ✅ Corrección aquí
    return Object.values(this.datosReporteBestSellers).flat();
  } else {
    return [];
  }
}


  cargandoPDF = false;
async exportarPDF(): Promise<void> {
  const datosDisponibles = this.obtenerDatosSegunTipoFiltro();

  const hayDatos =
    Array.isArray(datosDisponibles)
      ? datosDisponibles.length > 0
      : Object.values(datosDisponibles).some(arr => Array.isArray(arr) && arr.length > 0);
console.log('📦 Datos disponibles:', datosDisponibles);
console.log('✔️ hayDatos:', hayDatos);

  if (!hayDatos) {
    Swal.fire('⚠️ Sin datos', 'No hay datos para exportar a PDF.', 'info');
    return;
  }

  this.cargandoPDF = true;
  let id = '';

  if (this.tipoFiltro === 'mes') {
    id = 'contenidoMes';
  } else if (this.tipoFiltro === 'anio') {
    id = 'contenidoAnual';
  } else if (this.tipoFiltro === 'bajo') {
    id = 'contenidoBajaRotacion';
  } else if (this.tipoFiltro === 'best') {
    id = 'contenidoBestSellers';
  } else if (this.tipoFiltro === 'categoria') {
    id = 'idconfig';
  } else {
    alert('No hay contenido disponible para exportar.');
    this.cargandoPDF = false;
    return;
  }

  await new Promise(resolve => setTimeout(resolve, 50));
  const elemento = document.getElementById(id);

  if (!elemento) {
    console.error(`No se encontró el elemento con ID "${id}"`);
    alert('No se encontró el contenido para exportar.');
    this.cargandoPDF = false;
    return;
  }

  try {
    await this.waitForContent(elemento);
    elemento.classList.add('exportando');

    const canvas = await html2canvas(elemento, {
      scale: 2,
      useCORS: true,
      logging: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        this.handleIconsForExport(clonedDoc);
      }
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('El canvas generado tiene dimensiones 0');
    }

    await this.generatePDFFromCanvas(canvas);

  } catch (error) {
    console.error('Error en exportarPDF:', error);
    if (error instanceof Error) {
      alert(`Error al generar PDF: ${error.message}`);
    } else {
      alert('Error desconocido al generar el PDF.');
    }
  } finally {
    elemento.classList.remove('exportando');
    this.cargandoPDF = false;
  }
}


// Función auxiliar para esperar contenido
private async waitForContent(element: HTMLElement): Promise<void> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkInterval = setInterval(() => {
      attempts++;
      
      // Verificar contenido
      const hasContent = element.innerText?.trim().length > 50;
      const isVisible = window.getComputedStyle(element).display !== 'none' && 
                      window.getComputedStyle(element).visibility !== 'hidden';
      
      if (hasContent && isVisible) {
        clearInterval(checkInterval);
        resolve();
      } else if (attempts > 10) { // 10 intentos (5 segundos)
        clearInterval(checkInterval);
        reject(new Error('El contenido no se cargó correctamente'));
      }
    }, 500);
  });
}

// Función para manejar iconos en el clon
private handleIconsForExport(clonedDoc: Document): void {
  const icons = clonedDoc.querySelectorAll('i.fas, i.fa, [class*="fa-"]');
  icons.forEach(icon => {
    // Opción 1: Reemplazar con texto
    const altText = icon.getAttribute('title') || icon.getAttribute('aria-label') || '';
    if (altText) {
      const textSpan = clonedDoc.createElement('span');
      textSpan.textContent = altText;
      textSpan.style.margin = '0 3px';
      icon.parentNode?.replaceChild(textSpan, icon);
    }
    // Opción 2: Mantener el icono pero con estilo seguro
    else {
      (icon as HTMLElement).style.fontFamily = 'Arial, sans-serif';

    }
  });
}

// Función para generar PDF desde canvas
private async generatePDFFromCanvas(canvas: HTMLCanvasElement): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 290;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Agregar título
      pdf.setFontSize(16);
      pdf.text(this.tituloModal, 10, 15);
      pdf.setFontSize(10);
      pdf.text(`Exportado el: ${new Date().toLocaleDateString()}`, 10, 22);
      
      // Agregar imagen
      pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);
      
      // Guardar PDF
      const nombreArchivo = `${this.tituloModal.replace(/[^\w]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(nombreArchivo);
      
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

}