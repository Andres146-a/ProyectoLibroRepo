import { Routes } from '@angular/router';
import { AutorComponent } from './views/autor/autor.component';
import { EditorialComponent } from './views/editorial/editorial/editorial.component';
import { LibroComponent } from './views/libro/libro.component';
import {ClienteComponent } from './views/cliente/cliente/cliente.component';   
import { NgModule } from '@angular/core';
import { FacturaComponent } from './views/factura/factura/factura.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportesComponent } from './views/reportes/reportes.component';
// ... importa los demás

export const routes: Routes = [
  { path: '', redirectTo: 'autor', pathMatch: 'full' },
  { path: 'autor', component: AutorComponent },
  { path: 'editorial', component: EditorialComponent },
  { path: 'libro', component: LibroComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'factura', component: FacturaComponent },
  { path: 'reportes', component: ReportesComponent },
];
 