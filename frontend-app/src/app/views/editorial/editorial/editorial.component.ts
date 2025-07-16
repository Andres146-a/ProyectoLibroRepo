 
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { Editorial, EditorialUI } from '../../../models/editorial.model'
import { EditorialService } from '../../../services/editorial.service';
import { validarFormulario } from '../editorial/validacion';
import Swal from 'sweetalert2';

  @Component({
  selector: 'app-editorial',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent {
  
  editoriales: EditorialUI[] = [];
  editorialesFiltradas: EditorialUI[] = [];
  sidebarCollapsed = false;
  selectedOption: string = 'todos';
  opciones = ['todos', 'registrar', 'actualizar', 'eliminar'];
  buscarId: number = 0;
  buscarIdEliminar: number = 0;
  mostrarModal: boolean = false;
  editorialSeleccionada: Editorial | null = null;
  nombreActualizar = '';
  telefonoActualizar = '';
  emailActualizar = '';
  sitioWebActualizar = '';
  filtroEditorial: string = '';
  actualizacionHabilitada: boolean = false;
  filtroBusquedaEliminar: string = '';
filtroEstadoEliminar: string = 'TODOS';
filtroBusquedaModal: string = '';
filtroEstadoModal: string = 'TODOS';

  editorialActualizar: Editorial = {
    
  id_Editorial: 0,
  Nombre: '',
  Telefono: '',
  Email: '',
  SitioWeb: ''
};

  nuevaEditorial: Editorial = {
    id_Editorial: 0,
    Nombre: '',
    Telefono: '',
    Email: '',
    SitioWeb: ''
  };
  constructor(private editorialService: EditorialService) {}
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  ngOnInit(): void {
    this.cargarEditoriales();
    if (this.editorialSeleccionada) {
    this.telefonoActualizar = this.editorialSeleccionada.Telefono;
    this.emailActualizar = this.editorialSeleccionada.Email;
    this.sitioWebActualizar = this.editorialSeleccionada.SitioWeb;
  }
  }

cargarEditoriales() {
  this.editorialService.getEditoriales().subscribe(data => {
    this.editoriales = data.map(ed => ({ ...ed, seleccionado: false }));
    this.filtrarEditoriales();
  });
}
filtrarEditoriales() {
  const filtro = this.filtroEditorial.toLowerCase();
  this.editorialesFiltradas = this.editoriales.filter(ed =>
    ed.Nombre.toLowerCase().includes(filtro) ||
    ed.Email.toLowerCase().includes(filtro) ||
    ed.SitioWeb.toLowerCase().includes(filtro)
  );
}
agregarEditorial() {
  const { Nombre, Email, Telefono, SitioWeb } = this.nuevaEditorial;

const errores = validarFormulario(Nombre, Email, String(Telefono), SitioWeb);
if (errores.length > 0) {
  Swal.fire({
    icon: 'error',
    title: 'Faltan campos obligatorios',
    html: errores.join('<br>')
  });
  return;
}



  const editorialString: Editorial = {
    id_Editorial: 0,
    Nombre,
    Email,
    Telefono: String(Telefono),
    SitioWeb
  };

  this.editorialService.createEditorial(editorialString).subscribe({
  next: () => {
    this.cargarEditoriales();
    this.nuevaEditorial = { id_Editorial: 0, Nombre: '', Telefono: '', Email: '', SitioWeb: '' };
    Swal.fire({
      icon: 'success',
      title: '¡Editorial registrada!',
      text: 'La editorial se ha registrado correctamente.'
    });
  },
  error: () => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo registrar la editorial. Inténtalo nuevamente.'
    });
  }
});

}



  eliminarEditorial(id: number) {
    this.editorialService.deleteEditorial(id).subscribe(() => this.cargarEditoriales());
  }
  buscarEditorial() {
  this.editorialService.getEditorialById(this.buscarId).subscribe(
    data => {
      this.editorialSeleccionada = data;
    },
    err => {
      alert('Editorial no encontrada');
      this.editorialSeleccionada = { id_Editorial: 0, Nombre: '', Telefono: '', Email: '', SitioWeb: '' };
    }
  );
}

abrirModalBusqueda() {
  this.mostrarModal = true;
  if (this.editorialSeleccionada) {
    this.nombreActualizar = this.editorialSeleccionada.Nombre;
  }
}
cerrarModalBusqueda() {
  this.mostrarModal = false;
}
seleccionarEditorial(editorial: Editorial) {
  this.editorialSeleccionada = { ...editorial };
  this.nombreActualizar = editorial.Nombre;
  this.telefonoActualizar = editorial.Telefono;
  this.emailActualizar = editorial.Email;
  this.sitioWebActualizar = editorial.SitioWeb;
  this.mostrarModal = false;
   this.actualizacionHabilitada = true;
}
actualizarEditorial() {
  if (this.editorialSeleccionada) {
    const errores = validarFormulario(
      this.nombreActualizar,
      this.emailActualizar,
      this.telefonoActualizar,
      this.sitioWebActualizar
    );

    if (errores.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Faltan campos obligatorios',
        html: errores.join('<br>'),
        confirmButtonColor: '#d33'
      });
      return;
    }

    const editorialActualizada: Editorial = {
      id_Editorial: this.editorialSeleccionada.id_Editorial,
      Nombre: this.nombreActualizar,
      Telefono: this.telefonoActualizar,
      Email: this.emailActualizar,
      SitioWeb: this.sitioWebActualizar
    };

    this.actualizacionHabilitada = false; // Deshabilitar actualización después de enviar

    this.editorialService.updateEditorial(editorialActualizada.id_Editorial, editorialActualizada)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Editorial actualizada!',
            text: 'La editorial fue actualizada correctamente.',
            confirmButtonColor: '#6A00D5'
          });

          this.cargarEditoriales();
          this.editorialSeleccionada = null;
          this.nombreActualizar = '';
          this.telefonoActualizar = '';
          this.emailActualizar = '';
          this.sitioWebActualizar = '';
        },
        error: (error) => {
          console.error('Error al actualizar la editorial:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de actualización',
            text: 'Ocurrió un problema al actualizar la editorial.',
            confirmButtonColor: '#d33'
          });
        }
      });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Editorial no seleccionada',
      text: 'Debes seleccionar una editorial antes de actualizar.',
      confirmButtonColor: '#d33'
    });
  }
}


eliminarSeleccionadas() {
  const seleccionadas = this.editoriales.filter(ed => ed.seleccionado);
  if (seleccionadas.length === 0) {
  Swal.fire({
    icon: 'warning',
    title: 'Sin selección',
    text: 'Selecciona al menos una editorial para eliminar.'
  });
  return;
}


  Swal.fire({
  title: `¿Estás seguro de eliminar ${seleccionadas.length} editorial(es)?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Sí, eliminar',
  cancelButtonText: 'Cancelar'
}).then(result => {
  if (result.isConfirmed) {
    seleccionadas.forEach(ed => {
      this.editorialService.deleteEditorial(ed.id_Editorial).subscribe(() => {
        this.cargarEditoriales();
      });
    });
    Swal.fire({
      icon: 'success',
      title: 'Eliminadas',
      text: 'Las editoriales fueron eliminadas correctamente.'
    });
  }
});

}
//validaciones
//validaciones
nombre = '';
telefono = '';
email = '';
sitioWeb = '';
enviarFormulario() {
  const error = validarFormulario(this.nombre, this.email, this.telefono, this.sitioWeb);
  if (error) {
    alert(error);
  } else {
    console.log('Formulario válido');
  }
}

}

// Validar si el campo de búsqueda está vacío
