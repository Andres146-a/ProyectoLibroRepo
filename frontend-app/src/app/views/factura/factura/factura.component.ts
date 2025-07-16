import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { formatearPrecio, obtenerFechaHoraActual, validarFecha, campoNoVacio } from '../factura/validacion';
import { FacturaService } from '../../../services/factura.service';
import { LibroService } from '../../../services/libro.service';
import { ClienteService } from '../../../services/cliente.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  vistaPreviaActiva = false;
  confirmandoFactura = false;

  sidebarCollapsed = false;
  mostrarModalCliente = false;
  mostrarModalLibro = false;
  clienteNombre = '';
  productoNombre = '';
  tituloBusqueda: string = '';

  fechaHoraFactura = '';
  clientes: any[] = [];
  libros: any[] = [];
  clienteSeleccionado: any = null;
  libroSeleccionado: any = null;

  itemsFactura: { nombre: string; codigo: string; cantidad: number; precio: number }[] = [];

  constructor(
    private clienteService: ClienteService,
    private libroService: LibroService,
    private facturaService: FacturaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarLibros();
    this.actualizarFechaAutomatica();
  }

  actualizarFechaAutomatica() {
    this.fechaHoraFactura = obtenerFechaHoraActual();
    setInterval(() => {
      this.fechaHoraFactura = obtenerFechaHoraActual();
    }, 60000);
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        Swal.fire('Error', 'No se pudieron cargar los clientes.', 'error');
      }
    });
  }

  cargarLibros() {
    this.libroService.listar().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: (err) => {
        console.error('Error al cargar libros:', err);
        Swal.fire('Error', 'No se pudieron cargar los libros.', 'error');
      }
    });
  }

  get subtotal(): number {
    return this.itemsFactura.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  get iva(): number {
    return this.subtotal * 0.15;
  }

  get total(): number {
    return this.subtotal + this.iva;
  }

  mostrarVistaPrevia() {
    if (!this.clienteSeleccionado) {
      Swal.fire('Cliente requerido', 'Debes seleccionar un cliente.', 'warning');
      return;
    }
    if (this.itemsFactura.length === 0) {
      Swal.fire('Libros requeridos', 'Debes agregar al menos un libro a la factura.', 'warning');
      return;
    }
    this.vistaPreviaActiva = true;
  }

  cancelarVistaPrevia() {
    this.vistaPreviaActiva = false;
  }
confirmarFactura() {
  if (this.itemsFactura.length === 0) {
    Swal.fire('Error', 'No hay productos agregados a la factura.', 'error');
    return;
  }

  if (this.confirmandoFactura) return;
  this.confirmandoFactura = true;

  const facturaDTO = {
    total: this.total,
    id_Cliente: this.clienteSeleccionado.id_Cliente,
    detalles: this.itemsFactura.map((item) => ({
      cantidad: item.cantidad,
      precio_uni: item.precio,
      id_Libro: this.libros.find((l) => l.ISBN === item.codigo)?.id_Libro
    }))
  };

  this.facturaService.create(facturaDTO).subscribe({
    next: (respuesta) => {
      Swal.fire('¡Éxito!', 'Factura generada correctamente.', 'success').then(() => {
        // ✅ Generar PDF automáticamente después de guardar
        this.generarYImprimirPDF();

        // Limpiar estado del componente
        this.vistaPreviaActiva = false;
        this.itemsFactura = [];
        this.clienteSeleccionado = null;
        this.clienteNombre = '';
        this.confirmandoFactura = false;
      });
    },
    error: (err) => {
      console.error('Error al guardar la factura:', err);
      Swal.fire('Error', 'No se pudo guardar la factura.', 'error');
      this.confirmandoFactura = false;
    }
  });
}


  abrirModalCliente() {
    this.mostrarModalCliente = true;
  }

  cerrarModalCliente() {
    this.mostrarModalCliente = false;
  }

  abrirModalLibro() {
    this.mostrarModalLibro = true;
  }

  cerrarModalLibro() {
    this.mostrarModalLibro = false;
  }

  seleccionarCliente(cliente: any) {
    this.clienteNombre = `${cliente.Nombre} ${cliente.Apellido}`;
    this.clienteSeleccionado = cliente;
    this.cerrarModalCliente();
  }

  seleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
    this.productoNombre = libro.Titulo;
    this.agregarProducto({
      nombre: libro.Titulo,
      codigo: libro.ISBN,
      precio: +libro.preciov
    });
    this.cerrarModalLibro();
  }

  agregarProducto(producto: { nombre: string; codigo: string; precio: number }) {
    const existe = this.itemsFactura.find((item) => item.codigo === producto.codigo);
    if (existe) {
      if (existe.cantidad >= 100) {
        Swal.fire('Cantidad máxima', 'No puedes agregar más de 100 unidades del mismo libro.', 'warning');
        return;
      }
      existe.cantidad++;
    } else {
      this.itemsFactura.push({ ...producto, cantidad: 1 });
    }

    if (producto.precio <= 0 || isNaN(producto.precio)) {
      Swal.fire('Precio inválido', 'El precio del producto debe ser mayor a 0.', 'error');
    }
  }

  eliminarProducto(codigo: string) {
    this.itemsFactura = this.itemsFactura.filter((item) => item.codigo !== codigo);
  }

  incrementarCantidad(item: any) {
    item.cantidad++;
  }

  disminuirCantidad(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
    }
  }

  buscarLibroPorTituloOISBN(tituloOisbn: string) {
    const textoBusqueda = tituloOisbn.trim().toLowerCase();

    if (!this.clienteSeleccionado) {
      Swal.fire('Cliente requerido', 'Debes seleccionar un cliente antes de buscar libros.', 'warning');
      return;
    }

    if (textoBusqueda === '') {
      this.tituloBusqueda = '';
      this.mostrarModalLibro = true;
      return;
    }

    this.tituloBusqueda = textoBusqueda;

    if (this.librosFiltrados.length > 0) {
      this.mostrarModalLibro = true;
    } else {
      Swal.fire('No encontrado', 'Libro no encontrado con ese título o ISBN.', 'info');
    }
  }

  get clientesFiltrados() {
    return this.clientes.filter((c) => c?.Estado?.toLowerCase() === 'activo');
  }

  get librosFiltrados() {
    return this.libros.filter(
      (libro) =>
        libro.Titulo.toLowerCase().includes(this.tituloBusqueda.toLowerCase()) ||
        libro.ISBN.includes(this.tituloBusqueda)
    );
  }

  // 📄 Imprimir PDF desde vista previa
  // 📄 Imprimir PDF desde vista previa
generarYImprimirPDF() {
  const elemento = document.getElementById('contenido-pdf');
  if (!elemento) {
    Swal.fire('Error', 'No se encontró el contenido para imprimir.', 'error');
    return;
  }

  html2canvas(elemento).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.autoPrint(); // Quita esta línea si solo deseas guardar

    const pdfBlob = pdf.output('bloburl');
    window.open(pdfBlob, '_blank');
  });
}


  
}