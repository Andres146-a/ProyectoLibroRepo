import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent {
  vistaPreviaActiva = false;

clienteNombre = 'Juan Pérez';
fecha = '2025-06-19';

itemsFactura = [
  { nombre: 'El Quijote', codigo: 'LIB001', cantidad: 2, precio: 15.00 },
  { nombre: 'Cien Años de Soledad', codigo: 'LIB002', cantidad: 1, precio: 20.00 },
  { nombre: '1984', codigo: 'LIB003', cantidad: 3, precio: 18.00 },
];

get subtotal() {
  return this.itemsFactura.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

get iva() {
  return this.subtotal * 0.15;
}

get total() {
  return this.subtotal + this.iva;
}

mostrarVistaPrevia() {
  this.vistaPreviaActiva = true;
}

cancelarVistaPrevia() {
  this.vistaPreviaActiva = false;
}

confirmarFactura() {
  // Aquí podrías generar el PDF, guardar en DB, etc.
  alert('Factura confirmada');
  this.vistaPreviaActiva = false;
}

  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
