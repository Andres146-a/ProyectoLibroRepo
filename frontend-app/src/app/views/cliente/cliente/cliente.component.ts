import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { validarFormularioCliente } from './validaciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  actualizacionHabilitada: boolean = false;

  sidebarCollapsed = false;
  selectedOption = 'registrar';
  opciones = ['registrar', 'actualizar', 'eliminar', 'todos'];

  clientes: Cliente[] = [];
  clientesFiltrados: any[] = [];
  filtroBusqueda: string = '';

  mostrarModalCliente = false;

  // Datos de registro
  clienteRegistrar: Cliente = {
    id_Cliente: 0,
    Cedula: '',
    Nombre: '',
    Apellido: '',
    FechaN: '',
    Direccion: '',
    Telefono: '',
    Estado: 'ACTIVO'
  };

  // Datos de actualización
  clienteActualizar: Cliente = {
    id_Cliente: 0,
    Cedula: '',
    Nombre: '',
    Apellido: '',
    FechaN: '',
    Direccion: '',
    Telefono: '',
    Estado: 'ACTIVO'
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.obtenerClientes();
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  obtenerClientes() {
    this.clienteService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
      this.clientesFiltrados = data.map(c => ({ ...c, seleccionado: false }));
    });
  }

  limpiarFormularioRegistro() {
    this.clienteRegistrar = {
      id_Cliente: 0,
      Cedula: '',
      Nombre: '',
      Apellido: '',
      FechaN: '',
      Direccion: '',
      Telefono: '',
      Estado: 'ACTIVO'
    };
  }

registrarCliente() {
  const clienteFormateado: Cliente = {
    ...this.clienteRegistrar,
    Cedula: String(this.clienteRegistrar.Cedula),
    Telefono: String(this.clienteRegistrar.Telefono),
    FechaN: this.clienteRegistrar.FechaN
  };

  const errores = validarFormularioCliente(
  clienteFormateado.Cedula,
  clienteFormateado.Nombre,
  clienteFormateado.Apellido,
  clienteFormateado.FechaN,
  clienteFormateado.Direccion,
  clienteFormateado.Telefono,
  clienteFormateado.Estado
);

if (errores.length > 0) {
  Swal.fire({
    icon: 'error',
    title: 'Errores de validación',
    html: errores.map(e => `<p>${e}</p>`).join(''),
  });
  return;
}


  this.clienteService.createCliente(clienteFormateado).subscribe(() => {
    this.obtenerClientes();
    Swal.fire('Éxito', 'Cliente registrado correctamente', 'success');
    this.limpiarFormularioRegistro();
  });
}


actualizarCliente() {
const errores = validarFormularioCliente(
  this.clienteActualizar.Cedula,
  this.clienteActualizar.Nombre,
  this.clienteActualizar.Apellido,
  this.clienteActualizar.FechaN,
  this.clienteActualizar.Direccion,
  this.clienteActualizar.Telefono,
  this.clienteActualizar.Estado
);

if (errores.length > 0) {
  Swal.fire({
    icon: 'error',
    title: 'Errores de validación',
    html: errores.map(e => `<p>${e}</p>`).join(''),
  });
  return;
}


  const datos = {
    Cedula: String(this.clienteActualizar.Cedula),
    Nombre: this.clienteActualizar.Nombre,
    Apellido: this.clienteActualizar.Apellido,
    FechaN: this.clienteActualizar.FechaN,
    Direccion: this.clienteActualizar.Direccion,
    Telefono: String(this.clienteActualizar.Telefono),
    Estado: this.clienteActualizar.Estado
  };

  this.clienteService.updateCliente(this.clienteActualizar.id_Cliente, datos).subscribe(() => {
    this.obtenerClientes();
     this.limpiarFormularioActualizacion();
    Swal.fire('Éxito', 'Cliente actualizado correctamente', 'success');
    
  });
}

  abrirModalBusquedaCliente() {
    this.mostrarModalCliente = true;
  }

  cerrarModalBusquedaCliente() {
    this.mostrarModalCliente = false;
  }

  seleccionarCliente(cliente: Cliente) {
    this.clienteActualizar = {
    ...cliente,
    FechaN: cliente.FechaN ? cliente.FechaN.toString().split('T')[0] : ''
  };
    this.mostrarModalCliente = false;
    this.actualizacionHabilitada = true;
  }

  eliminarClientesSeleccionados() {
  const seleccionados = this.clientesFiltrados.filter(c => c.seleccionado);
  if (seleccionados.length === 0) {
    Swal.fire('Atención', 'Selecciona al menos un cliente para eliminar.', 'warning');
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: `Vas a eliminar ${seleccionados.length} cliente(s). Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      seleccionados.forEach(cliente => {
        this.clienteService.deleteCliente(cliente.id_Cliente).subscribe(() => {
          this.obtenerClientes();
        });
      });

      Swal.fire('Eliminado', 'Los clientes han sido eliminados.', 'success');
    }
  });
}


advertenciaMostrada = false;
limpiarFormularioActualizacion() {
  this.clienteActualizar = {
    id_Cliente: 0,
    Cedula: '',
    Nombre: '',
    Apellido: '',
    FechaN: '',
    Direccion: '',
    Telefono: '',
    Estado: 'ACTIVO'
  };
  this.actualizacionHabilitada = false;
}

ngDoCheck() {
  if (this.selectedOption === 'actualizar' && !this.actualizacionHabilitada && !this.advertenciaMostrada) {
    this.advertenciaMostrada = true;

    Swal.fire({
      icon: 'info',
      title: 'Selecciona un cliente',
      text: 'Para actualizar un cliente, haz clic en el botón de búsqueda (lupa).',
      toast: true,
      position: 'top-end',
      timer: 4000,
      showConfirmButton: false
    });
  }

  if (this.selectedOption !== 'actualizar') {
    this.advertenciaMostrada = false;
  }
}

  aplicarFiltro() {
    this.clientesFiltrados = this.clientes
      .filter(cliente =>
        cliente.Nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        cliente.Apellido.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        cliente.Cedula.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
      )
      .map(c => ({ ...c, seleccionado: false }));
  }
}