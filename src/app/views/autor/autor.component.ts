import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Autor } from '../../models/autor.model';
import { AutorService } from '../../services/autor.service';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css'],
 
})
export class AutorComponent implements OnInit {
  autores: any[] = [];
  selectedOption: string = 'registrar';
  sidebarCollapsed: boolean = false;
  opciones: string[] = ['registrar', 'actualizar', 'eliminar', 'todos'];
  ngOnInit(): void {

    this.autores = [{ nombre: 'Mari', email: 'mari@locura.com', seleccionado: false },
    { nombre: 'Erick', email: 'erick@guerreroz.com', seleccionado: false }];
  }
  toggleSidebar(): void {

      this.sidebarCollapsed = !this.sidebarCollapsed;

  }

  eliminarSeleccionados(): void {
    const confirmacion = confirm('¿Estás seguro de eliminar los autores seleccionados?');
    if (!confirmacion) return;
    this.autores = this.autores.filter(a => !a.seleccionado);
  }
}
