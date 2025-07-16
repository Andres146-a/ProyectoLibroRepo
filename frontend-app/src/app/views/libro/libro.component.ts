import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro.model';
import { RouterModule } from '@angular/router'; 
import { validarFormularioLibro } from '../libro/validacion';
import { validarLibrosSeleccionados } from '../libro/validacion';
import { EditorialService} from '../../services/editorial.service'; 
import { AutorService } from '../../services/autor.service';
import { Editorial } from '../../models/editorial.model'; 
import { Autor } from '../../models/autor.model';
import { CategoriaService, Categoria } from '../../services/categoria.service';
import { validarSeleccionLibro, esFechaValida} from '../libro/validacion';
import Swal from 'sweetalert2';
function formatearFecha(fechaISO: string): string {
  if (!fechaISO) return '';
  
  // Tomamos solo la parte de la fecha (antes de la "T" si la hay)
  const fechaSolo = fechaISO.split('T')[0]; // "2015-02-02"

  const [a, m, d] = fechaSolo.split('-');
  return `${d}/${m}/${a}`;
}

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})

export class LibroComponent implements OnInit {
  actualizandoLibro: boolean = false;
  categorias: Categoria[] = [];


  libroActualizar: any = { id_Categoria: null };
// para actualizar
libroRegistro: any = {
  id_Categoria: null
};

  libros: any[] = [];
  estadoFiltro: string = 'TODOS';
  formatearFecha = formatearFecha; 
  sidebarCollapsed: boolean = false;
  selectedOption: string = 'registrar';
  opciones: string[] = ['registrar', 'actualizar', 'eliminar', 'todos'];
  idLibroSeleccionado: number | null = null;
  tituloActualizar = '';
  fechaPublicacionActualizar = '';
  bestSellersActualizar = false;
  cantidadActualizar = 0;
  precioActualizar = 0;
  estadoActualizar = '';
  categoriaActualizar = '';
  isbnLibroSeleccionado: number | null = null;
  mostrarModalLibro: boolean = false;
  filtroBusqueda: string = '';
  editoriales: Editorial[] = [];
  editorialSeleccionada: Editorial | null = null;
  intentoActualizarSinSeleccion: boolean = false;

  mostrarModalEditorial = false;
  mostrarModalAutores: boolean = false;
  autoresSeleccionados: Autor[] = [];
  autores: Autor[] = [];

  //Variables para la seccion de Registrar LIbro: 
  tituloRegistrar = '';
  bestSellerRegistrar = false;
  fechaPublicacionRegistrar = '';
  cantidadRegistrar: number | null = null;
precioRegistrar: number | null = null;
  estadoRegistrar = '';
  editorialSeleccionadaRegistro: Editorial | null = null;
  autoresSeleccionadosRegistro: Autor[] = [];
    constructor(private libroService: LibroService, private editorialService: EditorialService, private autorService: AutorService,  private categoriaService: CategoriaService) {}
 
  ngOnInit(): void {
    console.log('Libros cargados');
    this.cargarLibros();
     this.cargarEditoriales();
     this.cargarAutores();
    this.categoriaService.getCategorias().subscribe((data) => {
  this.categorias = data;
});

  }
cargarAutores(): void {
  this.autorService.getAll().subscribe((data) => {
    this.autores = data;
  });
}
eliminarLibroSeleccionado() {
  const error = validarLibrosSeleccionados(this.libros);

  if (error) {
  alert(error);
  return;
}


   // Confirmación del usuario
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar los libros seleccionados? Esta acción no se puede deshacer.');

  if (!confirmacion) {
    return; // Usuario canceló
  }
  // Filtrar los IDs de los libros seleccionados
  // Aquí asumimos que cada libro tiene un campo 'seleccionado' para marcarlo
  // y un campo 'id_Libro' para su identificador único.
  const idsAEliminar: number[] = this.libros
  .filter(libro => libro.seleccionado)
  .map(libro => libro.id_Libro);

this.libroService.deleteMany(idsAEliminar).subscribe(() => {
  alert('Libros eliminados correctamente');
  this.cargarLibros();
});
}
cargarEditoriales(): void {
    this.editorialService.getAll().subscribe((data) => {
      this.editoriales = data;
    });
  }

  abrirModalAutores(): void {
    this.mostrarModalAutores = true;
  }
  cerrarModalAutores(): void {
    this.mostrarModalAutores = false;
  }
  
  abrirModalEditorial(): void {
    this.mostrarModalEditorial = true;
  }
  abrirModalEditorialActualizar() {
  this.mostrarModalEditorial = true;
}
abrirModalAutorActualizar() {
  this.mostrarModalAutores = true;
}
limpiarFormularioRegistro(formulario?: any): void {
  // Reinicia campos del formulario
  if (formulario) formulario.reset();

  // Limpia campos manualmente
  this.tituloRegistrar = '';
  this.fechaPublicacionRegistrar = '';
  this.cantidadRegistrar = null;
  this.precioRegistrar = null;
  this.estadoRegistrar = '';
  this.bestSellerRegistrar = false; 
  this.editorialSeleccionadaRegistro = null;
  this.autoresSeleccionadosRegistro = [];
  this.libroRegistro.id_Categoria = null;
}


  cerrarModalEditorial(): void {
    this.mostrarModalEditorial = false;
  }

 seleccionarEditorial(editorial: Editorial): void {
  if (this.selectedOption === 'actualizar') {
    this.editorialSeleccionada = editorial;
  } else {
    this.editorialSeleccionadaRegistro = editorial;
  }
  this.cerrarModalEditorial();
}


actualizarLibro() {
  console.log('Categoría seleccionada antes de enviar:', this.libroActualizar.id_Categoria);

  if (this.actualizandoLibro) return; // 🚫 Evita doble envío
  this.actualizandoLibro = true;      // ✅ Activa bloqueo

   const camposFaltantes: string[] = [];

  if (!this.idLibroSeleccionado) {
    camposFaltantes.push('Libro no seleccionado');
  }
  if (!this.tituloActualizar?.trim()) {
    camposFaltantes.push('Título');
  }
  if (!this.fechaPublicacionActualizar) {
    camposFaltantes.push('Fecha de publicación');
  }
  if (this.cantidadActualizar === null || this.cantidadActualizar === undefined || this.cantidadActualizar <= 0) {
    camposFaltantes.push('Cantidad');
  }
  if (this.precioActualizar === null || this.precioActualizar === undefined || this.precioActualizar <= 0) {
    camposFaltantes.push('Precio');
  }
  if (!this.estadoActualizar?.trim()) {
    camposFaltantes.push('Estado');
  }
  if (!this.editorialSeleccionada) {
    camposFaltantes.push('Editorial');
  }
  if (!this.autoresSeleccionados || this.autoresSeleccionados.length === 0) {
    camposFaltantes.push('Autores');
  }
  if (!this.libroActualizar.id_Categoria || this.libroActualizar.id_Categoria <= 0) {
    camposFaltantes.push('Categoría');
  }

  if (camposFaltantes.length > 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Faltan campos por completar',
      html: `<ul style="text-align:left;">${camposFaltantes.map(campo => `<li>🔸 ${campo}</li>`).join('')}</ul>`,
      confirmButtonText: 'Entendido'
    });
    return;
  }

  // Si todo está bien, continua con la lógica de actualización
  console.log('Todos los campos están completos, se procede a actualizar...');
  const error = validarFormularioLibro(
    this.tituloActualizar,
    this.fechaPublicacionActualizar,
    this.cantidadActualizar,
    this.precioActualizar,
    this.estadoActualizar,
    this.editorialSeleccionada,
    this.bestSellersActualizar,
    this.libroActualizar.id_Categoria ?? null,
    this.autoresSeleccionados
  );

  if (Array.isArray(error) && error.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Faltan campos obligatorios',
      html: error.map(e => `• ${e}`).join('<br>')
    });
    this.actualizandoLibro = false; // 🔁 Libera en caso de error
    return;
  }

  if (!esFechaValida(this.fechaPublicacionActualizar)) {
    Swal.fire({
      icon: 'error',
      title: 'Fecha inválida',
      text: 'La fecha de publicación no puede ser futura.'
    });
    this.actualizandoLibro = false; // 🔁 Libera en caso de error
    return;
  }

  const datos = {
    titulo: this.tituloActualizar,
    fechaPublicacion: this.fechaPublicacionActualizar,
    cantidad: this.cantidadActualizar,
    precio: this.precioActualizar,
    estado: this.estadoActualizar,
    id_Editorial: this.editorialSeleccionada?.id_Editorial ?? undefined,
    bestSellers: this.bestSellersActualizar,
    autores: this.autoresSeleccionados.map(autor => autor.id_Autor),
    id_Categoria: this.libroActualizar.id_Categoria ?? undefined,

  };

  this.libroService.update(this.idLibroSeleccionado!, datos).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: '¡Libro actualizado!',
        text: 'El libro fue actualizado correctamente.',
        confirmButtonColor: '#6A00D5'
      });
      this.limpiarFormulario();
      this.cargarLibros();
      this.actualizandoLibro = false; // ✅ Libera tras éxito
    },
    error: (error) => {
      console.error('Error al actualizar libro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: 'Ocurrió un problema al actualizar el libro.'
      });
      this.actualizandoLibro = false; // ❗ También libera en error
    }
  });
}


quitarAutor(autor: Autor) {
  this.autoresSeleccionados = this.autoresSeleccionados.filter(a => a.id_Autor !== autor.id_Autor);
}

seleccionarEditorialActualizar(editorial: Editorial): void {
  this.editorialSeleccionada = editorial;
  this.cerrarModalEditorial();
}

seleccionarAutor(autor: Autor): void {
  if (this.selectedOption === 'actualizar') {
    if (!this.autoresSeleccionados.some(a => a.id_Autor === autor.id_Autor)) {
      this.autoresSeleccionados.push(autor);
    }
  } else {
    if (!this.autoresSeleccionadosRegistro.some(a => a.id_Autor === autor.id_Autor)) {
      this.autoresSeleccionadosRegistro.push(autor);
    }
  }
  this.cerrarModalAutores();
}

get nombresAutoresSeleccionados(): string {
  const autores = this.selectedOption === 'actualizar'
    ? this.autoresSeleccionados
    : this.autoresSeleccionadosRegistro;
  console.log('Autores usados:', autores); 
  return Array.isArray(autores) && autores.length > 0
    ? autores.map(a => `${a.Nombre}`).join(', ')
    : 'No asignados';
}
limpiarFormulario() {
  this.idLibroSeleccionado = null;
  this.tituloActualizar = '';
  this.fechaPublicacionActualizar = '';
  this.cantidadActualizar = 0;
  this.precioActualizar = 0;
  this.estadoActualizar = '';
  this.editorialSeleccionada = null;
  this.isbnLibroSeleccionado = null;
  this.bestSellersActualizar = false;
  this.autoresSeleccionados = [];
  this.libroActualizar.id_Categoria = null;

  this.intentoActualizarSinSeleccion = false;
}

cargarLibros() {
  this.libroService.listar().subscribe(data => {
    this.libros = data.map(libro => ({ ...libro, seleccionado: false }));
  });
}


  abrirModalBusquedaLibro() {
  this.mostrarModalLibro = true;
}

cerrarModalBusquedaLibro() {
  this.mostrarModalLibro = false;
}
evitarDecimal(event: KeyboardEvent) {
  if (event.key === '.' || event.key === ',') {
    event.preventDefault();
  }
}

// Seleccionar libro desde modal
seleccionarLibro(libro: any) {
  this.idLibroSeleccionado = libro.id_Libro;
  this.tituloActualizar = libro.Titulo;
  this.fechaPublicacionActualizar = libro.Fechap?.substring(0, 10) ?? '' ;
  this.cantidadActualizar = libro.cantidad;
  this.precioActualizar = parseFloat(libro.preciov);
  this.estadoActualizar = libro.Estado;
  
  this.bestSellersActualizar = libro.BestSellers;



  this.isbnLibroSeleccionado = libro.ISBN;
  // Obtener y asignar la editorial
  const editorial = this.editoriales.find(e => e.id_Editorial === libro.id_Editorial);
  this.editorialSeleccionada = editorial || null;

  // Obtener autores (por relación muchos a muchos)
  this.autorService.getAutoresByLibro(libro.id_Libro).subscribe((data) => {
    console.log('Autores seleccionados:', data);    
    this.autoresSeleccionados = data;
    this.selectedOption = 'actualizar'; 
  });
console.log('Libro seleccionado:', libro);
console.log('ID Categoría del libro seleccionado:', libro.id_Categoria);

  this.cerrarModalBusquedaLibro();
  // Asignar categoría solo después de asegurarte que ya están cargadas
// Asignar categoría solo después de asegurarte que ya están cargadas
if (!libro.id_Categoria) {
  console.warn('⚠️ El libro no tiene categoría asignada (id_Categoria es null)');
} else if (this.categorias.length > 0) {
  this.libroActualizar.id_Categoria = libro.id_Categoria;
} else {
  this.categoriaService.getCategorias().subscribe((cats) => {
    this.categorias = cats;
    setTimeout(() => {
      this.libroActualizar.id_Categoria = libro.id_Categoria;
      console.log('✅ Categoría asignada después de cargar:', libro.id_Categoria);
    }, 0);
  });
}


}


  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }



eliminarSeleccionados(): void {
  const error = validarLibrosSeleccionados(this.libros);
 if (error) {
  Swal.fire({
    icon: 'warning',
    title: 'Acción no permitida',
    text: error
  });
  return;
}



  const librosAEliminar = this.libros.filter(libro => libro.seleccionado);
  // Aquí puedes hacer delete múltiple o uno por uno
  librosAEliminar.forEach(libro => {
    this.libroService.delete(libro.id_Libro).subscribe(() => {
      this.cargarLibros();
    });
  });

  alert('Libros eliminados correctamente.');
}

get librosFiltrados() {
  const filtro = this.filtroBusqueda.toLowerCase();

  return this.libros.filter(libro =>
    (
      libro.Titulo.toLowerCase().includes(filtro) ||
      libro.ISBN.toLowerCase().includes(filtro) // ← ahora también busca por ISBN
    ) &&
    (this.estadoFiltro === 'TODOS' || libro.Estado === this.estadoFiltro)
  );
}



registrarLibro() {
  const errores = validarFormularioLibro(
    this.tituloRegistrar || '',
    this.fechaPublicacionRegistrar || '',
    this.cantidadRegistrar ?? 0,
    this.precioRegistrar ?? 0,
    this.estadoRegistrar || '',
    this.editorialSeleccionadaRegistro,
    this.bestSellerRegistrar,
    this.libroRegistro.id_Categoria,
    this.autoresSeleccionadosRegistro
    
  );

  if (errores.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Faltan campos obligatorios',
      html: errores.map(e => `• ${e}`).join('<br>')
    });
    return;
  }

  // ⛔ Validar que no sea fecha futura
  if (!esFechaValida(this.fechaPublicacionRegistrar)) {
    Swal.fire({
      icon: 'error',
      title: 'Fecha inválida',
      text: 'La fecha de publicación no puede ser futura.'
    });
    return;
  }
if (!this.libroRegistro.id_Categoria || this.libroRegistro.id_Categoria <= 0) {
  Swal.fire({ icon: 'error', title: 'Categoría inválida', text: 'Debes seleccionar una CATEGORÍA válida.'});
  return;
}


  const libro = {
    Titulo: this.tituloRegistrar,
    Fechap: this.fechaPublicacionRegistrar,
    cantidad: this.cantidadRegistrar ?? undefined,
    preciov: this.precioRegistrar ?? undefined,
    Estado: this.estadoRegistrar,
    id_Categoria: this.libroRegistro.id_Categoria ?? undefined,
    id_Editorial: this.editorialSeleccionadaRegistro?.id_Editorial ?? undefined,
    bestSellers: this.bestSellerRegistrar,  
    autores: this.autoresSeleccionadosRegistro.map(a => a.id_Autor)
  };

  this.libroService.create(libro).subscribe(() => {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Libro registrado correctamente'
    });
    this.limpiarFormularioRegistro();
    this.cargarLibros();
  });
}

verificarActualizar() {
  if (!this.idLibroSeleccionado) {
    console.log('🚫 No hay libro seleccionado');
    this.intentoActualizarSinSeleccion = true;
    return;
  }

  this.intentoActualizarSinSeleccion = false;
  this.actualizarLibro(); 
}



 }

