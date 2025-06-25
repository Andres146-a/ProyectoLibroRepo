import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editorial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent {
  sidebarCollapsed = false;
  selectedOption: string = 'todos';
  opciones = ['todos', 'registrar', 'actualizar', 'eliminar'];

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
