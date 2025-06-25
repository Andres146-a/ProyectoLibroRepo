import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  libros: any[] = [];
  sidebarCollapsed: boolean = false;
  selectedOption: string = 'registrar';
  opciones: string[] = ['registrar', 'actualizar', 'eliminar', 'todos'];

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    console.log('Libros cargados');
    this.libros = [
  { titulo: 'Ejemplo 1', cantidad: 10, precio: 15.00, fechaPublicacion: '2023-01-01', seleccionado: false },
  { titulo: 'Ejemplo 2', cantidad: 5, precio: 20.00, fechaPublicacion: '2023-05-15', seleccionado: false },
  { titulo: 'El código limpio', cantidad: 3, precio: 30.00, fechaPublicacion: '2020-08-10', seleccionado: false },
  { titulo: 'Angular Pro', cantidad: 7, precio: 22.00, fechaPublicacion: '2022-04-22', seleccionado: false },
  { titulo: 'TS Avanzado', cantidad: 12, precio: 28.50, fechaPublicacion: '2021-12-01', seleccionado: false },
  { titulo: 'HTML y CSS', cantidad: 8, precio: 19.99, fechaPublicacion: '2019-10-17', seleccionado: false },
  { titulo: 'Desarrollo Web', cantidad: 9, precio: 24.00, fechaPublicacion: '2023-02-05', seleccionado: false },
  { titulo: 'Estructuras de Datos', cantidad: 15, precio: 18.00, fechaPublicacion: '2018-06-09', seleccionado: false },
  { titulo: 'Python Básico', cantidad: 11, precio: 20.00, fechaPublicacion: '2021-07-13', seleccionado: false },
  { titulo: 'Aprende Java', cantidad: 6, precio: 25.50, fechaPublicacion: '2022-01-21', seleccionado: false },
  { titulo: 'MySQL desde cero', cantidad: 13, precio: 27.00, fechaPublicacion: '2020-11-30', seleccionado: false },
  { titulo: 'Docker Essentials', cantidad: 4, precio: 31.00, fechaPublicacion: '2023-03-12', seleccionado: false },
  { titulo: 'Kubernetes Easy', cantidad: 2, precio: 29.90, fechaPublicacion: '2022-06-28', seleccionado: false },
  { titulo: 'Scrum Paso a Paso', cantidad: 5, precio: 14.99, fechaPublicacion: '2019-09-19', seleccionado: false },
  { titulo: 'Git & GitHub', cantidad: 10, precio: 16.00, fechaPublicacion: '2021-04-03', seleccionado: false },
  { titulo: 'Java Intermedio', cantidad: 7, precio: 23.00, fechaPublicacion: '2023-05-09', seleccionado: false },
  { titulo: 'Manual de VSCode', cantidad: 9, precio: 13.00, fechaPublicacion: '2020-07-20', seleccionado: false },
  { titulo: 'Fundamentos de UX', cantidad: 6, precio: 26.00, fechaPublicacion: '2022-10-18', seleccionado: false },
  { titulo: 'Diseño Web', cantidad: 8, precio: 21.99, fechaPublicacion: '2023-01-15', seleccionado: false },
  { titulo: 'Fundamentos de Redes', cantidad: 4, precio: 19.50, fechaPublicacion: '2018-03-11', seleccionado: false },
  { titulo: 'Node.js en Acción', cantidad: 6, precio: 32.00, fechaPublicacion: '2023-06-01', seleccionado: false }
];

  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  eliminarSeleccionados(): void {
    this.libros = this.libros.filter(libro => !libro.seleccionado);
  }
  
}

