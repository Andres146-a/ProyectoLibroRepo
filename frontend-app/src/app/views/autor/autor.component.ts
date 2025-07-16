import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Autor } from '../../models/autor.model';
import { AutorService } from '../../services/autor.service';
import { RouterModule } from '@angular/router'; 
import { validarFormularioAutor } from './validacion'; 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css'],
 
})
export class AutorComponent implements OnInit {
  autores: any[] = [];
  nuevoAutor: Partial<Autor> = {Nombre: '', Email: '', Estado: 'ACTIVO'};
  selectedOption: string = 'registrar';
  sidebarCollapsed: boolean = false;
  opciones: string[] = ['registrar', 'actualizar', 'eliminar', 'todos'];
  mostrarModalAutor: boolean = false;
  filtroBusquedaAutor: string = '';
  autoresSeleccionados: number[] = [];
  actualizacionHabilitada: boolean = false;
filtroEstado: string = 'TODOS';
filtroBusquedaEliminar: string = '';
filtroEstadoEliminar: string = 'TODOS';
filtroBusquedaModal: string = '';
filtroEstadoModal: string = 'TODOS';

  autorActualizar: Autor = {
    id_Autor: 0,
    Nombre: '',
    Email: '',
    Estado: ''
  };


  constructor(private autorService: AutorService) { }






  ngOnInit(): void {  
    console.log('Autores cargados');
    this.cargarAutores();
  }

  // Cargar autores desde el servicio
  cargarAutores(): void {
    this.autorService.getAll().subscribe((data) =>{
      this.autores = data;
      console.log('Autores cargados:', this.autores);
    })
 }
 
 
onCheckboxChange(event: Event, id: number) {
  const input = event.target as HTMLInputElement;
  const checked = input.checked;
  this.toggleSeleccionAutor(id, checked);
}
toggleSidebar(): void {

      this.sidebarCollapsed = !this.sidebarCollapsed;

  }
toggleSeleccionAutor(id: number, checked: boolean) {
  if (checked) {
    this.autoresSeleccionados.push(id);
  } else {
    this.autoresSeleccionados = this.autoresSeleccionados.filter(aid => aid !== id);
  }
}


get autoresFiltradosEliminar() {
  return this.autores.filter(autor => {
    const coincideBusqueda =
      autor.Nombre.toLowerCase().includes(this.filtroBusquedaEliminar.toLowerCase()) ||
      autor.Email.toLowerCase().includes(this.filtroBusquedaEliminar.toLowerCase());

    const coincideEstado =
      this.filtroEstadoEliminar === 'TODOS' || autor.Estado.toUpperCase() === this.filtroEstadoEliminar.toUpperCase(); // ✅ CORRECTO

    return coincideBusqueda && coincideEstado;
  });
}

get autoresFiltradosModal() {
  return this.autores.filter(autor => {
    const coincideBusqueda =
      autor.Nombre.toLowerCase().includes(this.filtroBusquedaModal.toLowerCase()) ||
      autor.Email.toLowerCase().includes(this.filtroBusquedaModal.toLowerCase());

    const coincideEstado =
      this.filtroEstadoModal === 'TODOS' || autor.Estado.toUpperCase() === this.filtroEstadoModal.toUpperCase(); // ✅ CORRECTO

    return coincideBusqueda && coincideEstado;
  });
}



// Registrar nuevo autor
registrarAutor(): void {
  const errores = validarFormularioAutor(
    this.nuevoAutor.Nombre || '',
    this.nuevoAutor.Email || '',
    this.nuevoAutor.Estado || ''
  );

  if (errores.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Faltan campos o son inválidos',
      html: errores.map(e => `• ${e}`).join('<br>')
    });
    return;
  }

  const autor: Partial<Autor> = {
    Nombre: this.nuevoAutor.Nombre,
    Email: this.nuevoAutor.Email,
    Estado: this.nuevoAutor.Estado
  };

  this.autorService.createAutor(autor).subscribe((data) => {
    Swal.fire({
      icon: 'success',
      title: 'Autor registrado',
      text: `El autor "${data.Nombre}" fue registrado exitosamente.`,
      timer: 2000,
      showConfirmButton: false
    });
    this.autores.push(data);
    this.nuevoAutor = { Nombre: '', Email: '', Estado: 'ACTIVO' };
    this.cargarAutores();
  });
}


  eliminarSeleccionados(): void {
    const confirmacion = confirm('¿Estás seguro de eliminar los autores seleccionados?');
    if (!confirmacion) return;
    this.autores = this.autores.filter(a => !a.seleccionado);
  }
abrirModalBusquedaAutor(): void {
  this.mostrarModalAutor = true;
}

cerrarModalBusquedaAutor(): void {
  this.mostrarModalAutor = false;
}

seleccionarAutor(autor: Autor): void {
  this.autorActualizar = { ...autor };
  this.actualizacionHabilitada = true;
  this.mostrarModalAutor = false;
}

actualizarAutor(): void {
  if (!this.autorActualizar.id_Autor) {
    Swal.fire({
      icon: 'warning',
      title: 'Ningún autor seleccionado',
      text: 'Debes seleccionar un autor para actualizar.'
    });
    return;
  }

  const errores = validarFormularioAutor(
    this.autorActualizar.Nombre || '',
    this.autorActualizar.Email || '',
    this.autorActualizar.Estado || ''
  );

  if (errores.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Faltan campos o son inválidos',
      html: errores.map(e => `• ${e}`).join('<br>')
    });
    return;
  }

  console.log('📤 Enviando actualización del autor con ID:', this.autorActualizar.id_Autor);
  console.log('📦 Datos del autor a actualizar:', this.autorActualizar);

  this.autorService.updateAutor(this.autorActualizar.id_Autor, this.autorActualizar).subscribe(() => {
    Swal.fire({
      icon: 'success',
      title: 'Autor actualizado correctamente',
      timer: 2000,
      showConfirmButton: false
    });
    this.cargarAutores();
    this.autorActualizar = { id_Autor: 0, Nombre: '', Email: '', Estado: '' };
  }, error => {
    console.error('Error al actualizar autor:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar autor',
      text: 'Ocurrió un problema al actualizar el autor.'
    });
  });
}



eliminarAutoresSeleccionados(): void {
  if (this.autoresSeleccionados.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Sin selección',
      text: 'Selecciona al menos un autor para eliminar.'
    });
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Los autores seleccionados serán eliminados permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const total = this.autoresSeleccionados.length;
      let eliminados = 0;

      this.autoresSeleccionados.forEach((id, index) => {
        this.autorService.deleteAutor(id).subscribe(() => {
          this.autores = this.autores.filter(a => a.id_Autor !== id);
          eliminados++;
          if (eliminados === total) {
            Swal.fire({
              icon: 'success',
              title: 'Autores eliminados',
              text: `${eliminados} autor(es) fueron eliminados correctamente.`,
              timer: 2000,
              showConfirmButton: false
            });
          }
        });
      });

      this.autoresSeleccionados = [];
    }
  });
}

}
